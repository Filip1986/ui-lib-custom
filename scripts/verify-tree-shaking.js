const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const minimalAppDir = path.join(rootDir, 'projects', 'minimal', 'src', 'app');
const appTsPath = path.join(minimalAppDir, 'app.ts');
const appHtmlPath = path.join(minimalAppDir, 'app.html');
const reportPath = path.join(rootDir, 'scripts', 'tree-shaking-report.json');

const sharedAllowed = new Set(['core', 'theming', 'themes', 'tokens', 'a11y', 'styles']);
const entryFolders = [
  'accordion',
  'badge',
  'button',
  'button-group',
  'card',
  'checkbox',
  'icon',
  'icon-button',
  'input',
  'layout',
  'select',
  'select-button',
  'tabs',
  'sidebar-menu',
  'login',
  'login-form',
];

const entries = [
  {
    key: 'button',
    importPath: 'ui-lib-custom/button',
    imports: ['Button'],
    template: '<ui-lib-button>Button</ui-lib-button>',
    allowed: ['button', 'badge', 'icon'],
  },
  {
    key: 'card',
    importPath: 'ui-lib-custom/card',
    imports: ['Card'],
    template: '<ui-lib-card><div card-header>Card</div>Body</ui-lib-card>',
    allowed: ['card', 'icon'],
  },
  {
    key: 'input',
    importPath: 'ui-lib-custom/input',
    imports: ['UiLibInput'],
    template: '<ui-lib-input label="Email" />',
    allowed: ['input', 'a11y'],
  },
  {
    key: 'select',
    importPath: 'ui-lib-custom/select',
    imports: ['UiLibSelect'],
    template: '<ui-lib-select [options]="[{ label: \'One\', value: 1 }]" />',
    allowed: ['select'],
  },
  {
    key: 'select-button',
    importPath: 'ui-lib-custom/select-button',
    imports: ['SelectButton'],
    template: '<ui-lib-select-button [options]="[{ label: \'One\', value: 1 }]" />',
    allowed: ['select-button', 'icon'],
  },
  {
    key: 'tabs',
    importPath: 'ui-lib-custom/tabs',
    imports: ['Tabs', 'Tab', 'TabPanel'],
    template: [
      '<ui-lib-tabs>',
      '  <ui-lib-tab value="one" label="One" />',
      '  <ui-lib-tab value="two" label="Two" />',
      '  <ui-lib-tab-panel value="one">One</ui-lib-tab-panel>',
      '  <ui-lib-tab-panel value="two">Two</ui-lib-tab-panel>',
      '</ui-lib-tabs>',
    ].join('\n'),
    allowed: ['tabs', 'icon'],
  },
  {
    key: 'accordion',
    importPath: 'ui-lib-custom/accordion',
    imports: ['Accordion', 'AccordionPanel'],
    template: [
      '<ui-lib-accordion>',
      '  <ui-lib-accordion-panel header="One">One</ui-lib-accordion-panel>',
      '</ui-lib-accordion>',
    ].join('\n'),
    allowed: ['accordion', 'icon'],
  },
  {
    key: 'badge',
    importPath: 'ui-lib-custom/badge',
    imports: ['Badge'],
    template: '<ui-lib-badge>Badge</ui-lib-badge>',
    allowed: ['badge'],
  },
  {
    key: 'checkbox',
    importPath: 'ui-lib-custom/checkbox',
    imports: ['Checkbox'],
    template: '<ui-lib-checkbox label="Agree" />',
    allowed: ['checkbox', 'a11y'],
  },
  {
    key: 'icon',
    importPath: 'ui-lib-custom/icon',
    imports: ['Icon'],
    template: '<ui-lib-icon name="plus" />',
    allowed: ['icon'],
  },
  {
    key: 'icon-button',
    importPath: 'ui-lib-custom/icon-button',
    imports: ['IconButton'],
    template: '<ui-lib-icon-button icon="plus" ariaLabel="Add" />',
    allowed: ['icon-button', 'icon'],
  },
  {
    key: 'layout',
    importPath: 'ui-lib-custom/layout',
    imports: ['Stack'],
    template: ['<ui-lib-stack>', '  <div>One</div>', '  <div>Two</div>', '</ui-lib-stack>'].join(
      '\n'
    ),
    allowed: ['layout'],
  },
];

const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('Usage: node scripts/verify-tree-shaking.js [--dry-run] [--keep-temp]');
  process.exit(0);
}

const dryRun = args.includes('--dry-run');
const keepTemp = args.includes('--keep-temp');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function writeFile(filePath, contents) {
  fs.writeFileSync(filePath, contents, 'utf-8');
}

function buildAppTs(entry) {
  return [
    "import { ChangeDetectionStrategy, Component } from '@angular/core';",
    `import { ${entry.imports.join(', ')} } from '${entry.importPath}';`,
    '',
    '@Component({',
    "  selector: 'app-root',",
    '  standalone: true,',
    `  imports: [${entry.imports.join(', ')}],`,
    "  templateUrl: './app.html',",
    "  styleUrl: './app.scss',",
    '  changeDetection: ChangeDetectionStrategy.OnPush,',
    '})',
    'export class App {}',
    '',
  ].join('\n');
}

function findStatsJson(distDir) {
  if (!fs.existsSync(distDir)) return null;
  const stack = [distDir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && entry.name === 'stats.json') {
        return fullPath;
      }
    }
  }
  return null;
}

function collectModules(stats) {
  if (Array.isArray(stats.modules)) return stats.modules;
  if (Array.isArray(stats.children)) {
    return stats.children.flatMap((child) => child.modules || []);
  }
  return [];
}

function extractLibFolders(modules) {
  const folders = new Set();
  modules.forEach((module) => {
    const name = module.name || module.identifier || '';
    if (typeof name !== 'string') return;
    const normalized = name.replace(/\\/g, '/');
    const marker = 'projects/ui-lib-custom/src/lib/';
    const index = normalized.indexOf(marker);
    if (index === -1) return;
    const rest = normalized.slice(index + marker.length);
    const folder = rest.split('/')[0];
    if (folder) folders.add(folder);
  });
  return folders;
}

function runBuild() {
  const result = childProcess.spawnSync(
    'npx',
    ['ng', 'build', 'minimal', '--named-chunks', '--stats-json'],
    { cwd: rootDir, stdio: 'inherit', shell: true }
  );
  if (result.status !== 0) {
    throw new Error('Build failed.');
  }
}

function ensureAllowed(entry, folders) {
  const allowed = new Set([...sharedAllowed, ...entry.allowed]);
  const disallowed = [];
  folders.forEach((folder) => {
    if (!entryFolders.includes(folder)) return;
    if (!allowed.has(folder)) {
      disallowed.push(folder);
    }
  });
  return disallowed;
}

function summarize(entriesResult) {
  const failed = entriesResult.filter((entry) => entry.disallowed.length > 0);
  const summary = {
    ok: failed.length === 0,
    entries: entriesResult,
  };
  writeFile(reportPath, JSON.stringify(summary, null, 2));
  if (!summary.ok) {
    console.error('Tree-shaking verification failed. See scripts/tree-shaking-report.json');
    process.exit(1);
  }
  console.log('Tree-shaking verification passed.');
}

function run() {
  if (dryRun) {
    console.log('Planned entries:', entries.map((entry) => entry.key).join(', '));
    return;
  }

  const originalTs = readFile(appTsPath);
  const originalHtml = readFile(appHtmlPath);
  const results = [];

  try {
    entries.forEach((entry) => {
      writeFile(appTsPath, buildAppTs(entry));
      writeFile(appHtmlPath, entry.template);
      runBuild();

      const statsPath = findStatsJson(path.join(rootDir, 'dist', 'minimal'));
      if (!statsPath) {
        throw new Error('stats.json not found after build.');
      }

      const stats = JSON.parse(readFile(statsPath));
      const modules = collectModules(stats);
      const folders = extractLibFolders(modules);
      const disallowed = ensureAllowed(entry, folders);

      results.push({
        entry: entry.key,
        disallowed,
        present: Array.from(folders).sort(),
      });
    });
  } finally {
    if (!keepTemp) {
      writeFile(appTsPath, originalTs);
      writeFile(appHtmlPath, originalHtml);
    }
  }

  summarize(results);
}

run();
