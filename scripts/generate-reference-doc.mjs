/**
 * Reference doc generator for ui-lib-custom components.
 *
 * Given a component name, produces docs/reference/components/<name>.md by consuming:
 *   1. projects/ui-lib-custom/src/lib/<name>/README.md
 *   2. projects/ui-lib-custom/src/lib/<name>/<name>.ts   (signal inputs / outputs)
 *   3. projects/ui-lib-custom/src/lib/<name>/<name>.scss  (--uilib-* CSS vars)
 *   4. projects/ui-lib-custom/src/lib/<name>/<name>.html  (ng-content selectors)
 *   5. projects/ui-lib-custom/src/lib/<name>/<name>.spec.ts (a11y / keyboard test titles)
 *
 * Uses regex-based parsing (no AST dep) against the consistent patterns enforced
 * by LIBRARY_CONVENTIONS.md. All tables are sorted alphabetically for idempotency.
 *
 * Usage:
 *   node scripts/generate-reference-doc.mjs <name>
 *   node scripts/generate-reference-doc.mjs --all
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LIB_DIR = join(ROOT, 'projects', 'ui-lib-custom', 'src', 'lib');
const DOCS_DIR = join(ROOT, 'docs', 'reference', 'components');

// Directories that are not standalone components
const SKIP_DIRS = new Set([
  'a11y', 'code-snippet', 'core', 'design-tokens.ts', 'i18n', 'layout',
  'styles', 'syntax-highlighter', 'testing', 'themes', 'theming',
  'ui-lib-custom.spec.ts', 'ui-lib-custom.ts',
]);

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function getComponentDirs() {
  return readdirSync(LIB_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SKIP_DIRS.has(d.name))
    .filter((d) => existsSync(join(LIB_DIR, d.name, 'index.ts')))
    .map((d) => d.name)
    .sort();
}

function readFile(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

// ---------------------------------------------------------------------------
// README parsing
// ---------------------------------------------------------------------------

function parseReadme(source) {
  if (!source) return { overview: '', selector: '', packagePath: '', apgPattern: '' };

  const lines = source.split('\n');

  // Front-matter field: "apg-pattern: <url>"
  const apgLine = lines.find((l) => /^apg-pattern:/i.test(l.trim()));
  const apgPattern = apgLine ? apgLine.replace(/^apg-pattern:\s*/i, '').trim() : '';

  // Selector from "**Selector:** `ui-lib-<name>`"
  const selLine = lines.find((l) => /\*\*Selector\*\*/.test(l));
  const selector = selLine ? (selLine.match(/`([^`]+)`/) || [])[1] || '' : '';

  // Package from "**Package:** `ui-lib-custom/<name>`"
  const pkgLine = lines.find((l) => /\*\*Package\*\*/.test(l));
  const packagePath = pkgLine ? (pkgLine.match(/`([^`]+)`/) || [])[1] || '' : '';

  return { overview: '', selector, packagePath, apgPattern };
}

/**
 * Extract the overview from the class-level JSDoc in the TypeScript source.
 * Falls back to the first blockquote in the README, then to a generic placeholder.
 */
function extractOverview(tsSrc, readmeSrc, displayName) {
  // 1. Class-level JSDoc — find the LAST /** ... */ block immediately before
  //    @Component(. Split on @Component( so we never pick up module-level
  //    variable comments that appear earlier in the file.
  if (tsSrc) {
    const atComponentIdx = tsSrc.indexOf('@Component(');
    if (atComponentIdx !== -1) {
      const beforeComponent = tsSrc.slice(0, atComponentIdx);
      // Find the LAST /** ... */ block in the text before @Component(.
      // The greedy [\s\S]* prefix forces the engine to consume everything up to
      // the last /** occurrence, so we only capture the class-level doc.
      const jsdocMatch = beforeComponent.match(/[\s\S]*\/\*\*([\s\S]*?)\*\/\s*\n?\s*$/);
      if (jsdocMatch) {
        const text = jsdocMatch[1]
          .replace(/\r\n/g, '\n')           // normalise Windows CRLF → LF
          .replace(/\r/g, '\n')             // normalise stray CR → LF
          .replace(/^\s*\* ?/gm, '')        // strip leading "* " from each line
          .replace(/@\w+[\s\S]*/g, '')      // strip @example, @param, @returns etc.
          .replace(/\n{2,}/g, '\n')         // collapse consecutive blank lines
          .replace(/\s*\n\s*/g, ' ')        // fold remaining newlines to spaces
          .trim();
        if (text) return text;
      }
    }
  }
  // 2. First blockquote in README (contains architectural notes)
  if (readmeSrc) {
    const bqMatch = readmeSrc.match(/^>\s*(.+)/m);
    if (bqMatch) return bqMatch[1].trim();
  }
  // 3. First real paragraph in README (skip header lines)
  if (readmeSrc) {
    const lines = readmeSrc.split('\n');
    const paraLines = [];
    let inPara = false;
    for (const line of lines) {
      if (/^#/.test(line) || /^\*\*(Selector|Package|Content projection)\*\*/.test(line)) {
        if (inPara) break;
        continue;
      }
      if (/^>/.test(line)) { if (inPara) break; continue; }
      if (line.trim() === '') { if (inPara) break; continue; }
      inPara = true;
      paraLines.push(line.trim());
    }
    const text = paraLines.join(' ').trim();
    if (text) return text;
  }
  return `${displayName} component.`;
}

// ---------------------------------------------------------------------------
// TypeScript source parsing — signals
// ---------------------------------------------------------------------------

/**
 * Walk source lines, collecting full multi-line declarations by tracking
 * open parentheses / angle-bracket depth (only parens for default-value
 * extraction since < can appear in comparisons).
 */
function collectDeclarationLines(lines, startIdx) {
  const declLines = [];
  let parenDepth = 0;
  let hasSemi = false;
  for (let i = startIdx; i < lines.length; i++) {
    const l = lines[i];
    declLines.push(l);
    for (const ch of l) {
      if (ch === '(') parenDepth++;
      else if (ch === ')') parenDepth--;
    }
    if (l.includes(';') && parenDepth <= 0) { hasSemi = true; break; }
  }
  return { declLines, hasSemi };
}

function extractJsdocBefore(lines, idx) {
  let k = idx - 1;
  while (k >= 0 && lines[k].trim() === '') k--;
  if (k < 0 || !lines[k].trim().endsWith('*/')) return '';
  const jdLines = [];
  while (k >= 0 && !lines[k].trim().startsWith('/**')) { jdLines.unshift(lines[k]); k--; }
  if (k >= 0) jdLines.unshift(lines[k]);
  return jdLines
    .join('\n')
    .replace(/\r\n/g, '\n')           // normalise Windows CRLF
    .replace(/\r/g, '\n')             // normalise stray CR
    .replace(/^\s*\/\*\*\s?/, '')     // strip leading whitespace + /**
    .replace(/\s*\*\/\s*$/, '')       // strip */ + trailing whitespace
    .replace(/^\s*\*\s?/gm, '')       // strip leading " * " from each continuation line
    .replace(/@\w[\s\S]*/g, '')       // strip @example, @param, @returns etc. (same as extractOverview)
    .replace(/\s+/g, ' ')             // collapse any remaining whitespace
    .trim();
}

function extractDefaultValue(fullDecl) {
  // Match last input/model/output(...) call's first argument
  const m = fullDecl.match(/(?:input|model|output)\s*(?:<[^(]*)?\(([^)]*)\)/s);
  if (!m) return '';
  const raw = m[1].trim();
  // Remove trailing comma-separated extra args (e.g. transform functions)
  return raw.split(',')[0].trim();
}

function extractSignalType(fullDecl) {
  // Try to extract T from InputSignal<T>, ModelSignal<T>, OutputEmitterRef<T>
  const m = fullDecl.match(/(?:InputSignal|ModelSignal|OutputEmitterRef|OutputRef)<(.+?)>\s*=/s);
  if (!m) {
    // Fall back to the generic on the call itself: input<T>(...)
    const callM = fullDecl.match(/(?:input|model|output)<(.+?)>\s*\(/s);
    return callM ? callM[1].trim() : '—';
  }
  return m[1].trim();
}

function parseSignals(source) {
  const lines = source.split('\n');
  const signals = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Only consider public readonly signal lines
    if (!/public\s+readonly\s+\w+/.test(line)) continue;
    if (!/ =\s*(?:input|model|output)[<(]/.test(line + (lines[i + 1] || '') + (lines[i + 2] || ''))) continue;

    const { declLines } = collectDeclarationLines(lines, i);
    const fullDecl = declLines.join(' ').replace(/\s+/g, ' ');

    const nameM = fullDecl.match(/public\s+readonly\s+(\w+)/);
    if (!nameM) continue;
    const name = nameM[1];

    const isInput = /= input[<(]/.test(fullDecl);
    const isModel = /= model[<(]/.test(fullDecl);
    const isOutput = /= output[<(]/.test(fullDecl);
    if (!isInput && !isModel && !isOutput) continue;

    const kind = isOutput ? 'output' : isModel ? 'model' : 'input';
    const type = extractSignalType(fullDecl);
    const defaultVal = kind === 'output' ? '—' : (extractDefaultValue(fullDecl) || '—');
    const jsdoc = extractJsdocBefore(lines, i);

    signals.push({ name, kind, type, default: defaultVal, jsdoc });
  }

  // Sort alphabetically for idempotency
  return signals.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// HTML parsing — ng-content selectors
// ---------------------------------------------------------------------------

function parseContentSlots(source) {
  const slots = [];
  const re = /<ng-content(?:\s+select="([^"]*)")?[^/]*/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const selector = m[1] || '(default)';
    if (!slots.includes(selector)) slots.push(selector);
  }
  return slots.sort();
}

// ---------------------------------------------------------------------------
// SCSS parsing — --uilib-* CSS variables
// ---------------------------------------------------------------------------

function parseCssVars(source, componentName) {
  const prefix = `--uilib-${componentName}-`;
  const vars = {};
  // Match variable declarations that may span multiple lines
  const normalized = source.replace(/\n\s+/g, ' ');
  const re = new RegExp(`(${escapeRegex(prefix)}[\\w-]+):\\s*([^;]+);`, 'g');
  let m;
  while ((m = re.exec(normalized)) !== null) {
    const varName = m[1].trim();
    const rawVal = m[2].trim();
    if (!vars[varName]) vars[varName] = rawVal;
  }
  return Object.entries(vars)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => ({ name, value }));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Spec parsing — a11y / keyboard test titles
// ---------------------------------------------------------------------------

function parseA11yTests(source) {
  const re = /it\s*\(\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g;
  const titles = [];
  let m;
  while ((m = re.exec(source)) !== null) {
    const title = m[1];
    if (/keyboard|arrow|tab|focus|enter|space|escape|aria|role|axe|screen.?reader|announce/i.test(title)) {
      titles.push(title);
    }
  }
  return [...new Set(titles)].sort();
}

// ---------------------------------------------------------------------------
// Component name → title
// ---------------------------------------------------------------------------

function toTitle(name) {
  return name.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
}

function toDisplayName(name) {
  return name.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// ---------------------------------------------------------------------------
// Markdown table helpers
// ---------------------------------------------------------------------------

function mdTable(headers, rows) {
  if (rows.length === 0) return '_none_\n';
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => String(r[i] ?? '').length))
  );
  const pad = (s, w) => String(s ?? '').padEnd(w);
  const sep = widths.map((w) => '-'.repeat(w)).join(' | ');
  const head = headers.map((h, i) => pad(h, widths[i])).join(' | ');
  const body = rows.map((r) => r.map((c, i) => pad(c, widths[i])).join(' | '));
  return `| ${head} |\n| ${sep} |\n${body.map((r) => `| ${r} |`).join('\n')}\n`;
}

// ---------------------------------------------------------------------------
// Main doc generator
// ---------------------------------------------------------------------------

function generateDoc(componentName) {
  const libPath = join(LIB_DIR, componentName);
  const displayName = toDisplayName(componentName);
  const className = toTitle(componentName);

  // Candidate TS file names (some components use .component.ts)
  const tsFile =
    existsSync(join(libPath, `${componentName}.ts`))
      ? join(libPath, `${componentName}.ts`)
      : existsSync(join(libPath, `${componentName}.component.ts`))
        ? join(libPath, `${componentName}.component.ts`)
        : '';

  const htmlFile =
    existsSync(join(libPath, `${componentName}.html`))
      ? join(libPath, `${componentName}.html`)
      : existsSync(join(libPath, `${componentName}.component.html`))
        ? join(libPath, `${componentName}.component.html`)
        : '';

  const scssFile =
    existsSync(join(libPath, `${componentName}.scss`))
      ? join(libPath, `${componentName}.scss`)
      : existsSync(join(libPath, `${componentName}.component.scss`))
        ? join(libPath, `${componentName}.component.scss`)
        : '';

  const specFile =
    existsSync(join(libPath, `${componentName}.spec.ts`))
      ? join(libPath, `${componentName}.spec.ts`)
      : existsSync(join(libPath, `${componentName}.component.spec.ts`))
        ? join(libPath, `${componentName}.component.spec.ts`)
        : '';

  const a11ySpecFile = existsSync(join(libPath, `${componentName}.a11y.spec.ts`))
    ? join(libPath, `${componentName}.a11y.spec.ts`)
    : '';

  const readmeSrc = readFile(join(libPath, 'README.md'));
  const tsSrc = tsFile ? readFile(tsFile) : '';
  const htmlSrc = htmlFile ? readFile(htmlFile) : '';
  const scssSrc = scssFile ? readFile(scssFile) : '';
  const specSrc = specFile ? readFile(specFile) : '';
  const a11ySpecSrc = a11ySpecFile ? readFile(a11ySpecFile) : '';

  const readme = parseReadme(readmeSrc);
  const selector = readme.selector || `ui-lib-${componentName}`;
  const packagePath = readme.packagePath || `ui-lib-custom/${componentName}`;
  const overview = extractOverview(tsSrc, readmeSrc, displayName);
  const apgPattern = readme.apgPattern;

  const signals = tsSrc ? parseSignals(tsSrc) : [];
  const inputs = signals.filter((s) => s.kind === 'input');
  const models = signals.filter((s) => s.kind === 'model');
  const outputs = signals.filter((s) => s.kind === 'output');
  const contentSlots = htmlSrc ? parseContentSlots(htmlSrc) : [];
  const cssVars = scssSrc ? parseCssVars(scssSrc, componentName) : [];
  const a11yTests = [
    ...(specSrc ? parseA11yTests(specSrc) : []),
    ...(a11ySpecSrc ? parseA11yTests(a11ySpecSrc) : []),
  ].sort().filter((t, i, arr) => arr.indexOf(t) === i);

  // Build the document
  const lines = [];

  lines.push(`# ${displayName}`);
  lines.push('');
  lines.push(`**Selector:** \`${selector}\``);
  lines.push(`**Entry point:** \`import { ${className} } from '${packagePath}'\``);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Overview
  lines.push('## Overview');
  lines.push('');
  lines.push(overview);
  lines.push('');

  // API — inputs
  lines.push('## API');
  lines.push('');
  lines.push('### Inputs');
  lines.push('');
  if (inputs.length > 0) {
    lines.push(mdTable(
      ['Name', 'Type', 'Default', 'Description'],
      inputs.map((s) => [
        `\`${s.name}\``,
        s.type ? `\`${s.type}\`` : '—',
        s.default !== '—' ? `\`${s.default}\`` : '—',
        s.jsdoc || '—',
      ]),
    ));
  } else {
    lines.push('_none_');
    lines.push('');
  }

  // API — model (two-way)
  if (models.length > 0) {
    lines.push('### Models (two-way bindable)');
    lines.push('');
    lines.push(mdTable(
      ['Name', 'Type', 'Default', 'Description'],
      models.map((s) => [
        `\`${s.name}\``,
        s.type ? `\`${s.type}\`` : '—',
        s.default !== '—' ? `\`${s.default}\`` : '—',
        s.jsdoc || '—',
      ]),
    ));
  }

  // API — outputs
  lines.push('### Outputs');
  lines.push('');
  if (outputs.length > 0) {
    lines.push(mdTable(
      ['Name', 'Type', 'Description'],
      outputs.map((s) => [
        `\`${s.name}\``,
        s.type ? `\`${s.type}\`` : '—',
        s.jsdoc || '—',
      ]),
    ));
  } else {
    lines.push('_none_');
    lines.push('');
  }

  // Content projection
  lines.push('## Content Projection');
  lines.push('');
  if (contentSlots.length > 0) {
    lines.push(mdTable(
      ['Selector', 'Notes'],
      contentSlots.map((slot) => [
        slot === '(default)' ? '_(default)_' : `\`${slot}\``,
        '—',
      ]),
    ));
  } else {
    lines.push('_none_');
    lines.push('');
  }

  // Theming
  lines.push('## Theming');
  lines.push('');
  if (cssVars.length > 0) {
    lines.push(mdTable(
      ['CSS Variable', 'Default'],
      cssVars.map(({ name, value }) => [`\`${name}\``, `\`${value}\``]),
    ));
  } else {
    lines.push('_No component-level CSS variables detected._');
    lines.push('');
  }

  // Accessibility
  lines.push('## Accessibility');
  lines.push('');
  if (apgPattern) {
    lines.push(`**APG pattern:** ${apgPattern}`);
  } else {
    lines.push('**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->');
  }
  lines.push('');

  // Keyboard interactions
  lines.push('### Keyboard Interactions');
  lines.push('');
  if (a11yTests.length > 0) {
    lines.push(mdTable(
      ['Test description'],
      a11yTests.map((t) => [t]),
    ));
  } else {
    lines.push('<!-- TODO: list keyboard interactions or link to APG pattern -->');
    lines.push('');
  }

  // Usage examples — pulled from README
  lines.push('## Usage Examples');
  lines.push('');
  const usageSection = extractUsageSection(readmeSrc);
  if (usageSection) {
    lines.push(usageSection);
    lines.push('');
  } else {
    lines.push('<!-- TODO: add usage examples -->');
    lines.push('');
  }

  // Related
  lines.push('## Related');
  lines.push('');
  lines.push(`- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#${componentName})`);
  lines.push(`- [Demo page](/components/${componentName})`);
  lines.push(`- [Design tokens](../systems/DESIGN_TOKENS.md)`);
  lines.push(`- [Co-located README](../../../projects/ui-lib-custom/src/lib/${componentName}/README.md)`);
  lines.push('');
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Extract usage/examples section from README
// ---------------------------------------------------------------------------

function extractUsageSection(readmeSrc) {
  if (!readmeSrc) return '';
  const lines = readmeSrc.split('\n');
  let inSection = false;
  const out = [];
  for (const line of lines) {
    if (/^##+ Usage/i.test(line) || /^##+ Examples?/i.test(line)) { inSection = true; continue; }
    if (inSection && /^##+ /.test(line)) break;
    if (inSection) out.push(line);
  }
  return out.join('\n').trim();
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node scripts/generate-reference-doc.mjs <name> [--all]');
  process.exit(1);
}

const all = args.includes('--all');
const targets = all ? getComponentDirs() : args.filter((a) => !a.startsWith('--'));

let generated = 0;
let skipped = 0;

for (const name of targets) {
  const libPath = join(LIB_DIR, name);
  if (!existsSync(libPath)) {
    console.warn(`  skip  ${name} — directory not found`);
    skipped++;
    continue;
  }
  if (!existsSync(join(libPath, 'index.ts'))) {
    console.warn(`  skip  ${name} — no index.ts`);
    skipped++;
    continue;
  }

  try {
    const doc = generateDoc(name);
    const outPath = join(DOCS_DIR, `${name}.md`);
    writeFileSync(outPath, doc, 'utf8');
    console.log(`  wrote ${outPath.replace(ROOT + '\\', '').replace(ROOT + '/', '')}`);
    generated++;
  } catch (err) {
    console.error(`  ERROR ${name}: ${err.message}`);
  }
}

console.log(`\nDone: ${generated} generated, ${skipped} skipped.`);
