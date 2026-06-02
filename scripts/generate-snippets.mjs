/**
 * Pre-build snippet generator.
 *
 * Scans every pages/<component>/examples/ folder for *.example.ts / .html / .scss files,
 * reads each one, and writes a snippets.generated.ts barrel next to the demo component.
 *
 * Usage:
 *   node scripts/generate-snippets.mjs
 *
 * Run automatically via `preserve:demo` and `prebuild:demo` npm hooks.
 */

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = join(rootDir, 'projects', 'demo', 'src', 'app', 'pages');

const EXT_SUFFIX = { ts: 'Ts', html: 'Html', scss: 'Scss' };
const EXAMPLE_RE = /^(.+)\.example\.(ts|html|scss)$/;

function toCamelCase(kebab) {
  return kebab.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function exportName(filename) {
  const match = EXAMPLE_RE.exec(filename);
  if (!match) return null;
  const [, stem, ext] = match;
  return toCamelCase(stem) + EXT_SUFFIX[ext];
}

function escapeTemplateLiteral(content) {
  return content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function processPage(pageDir) {
  const examplesDir = join(pageDir, 'examples');
  if (!existsSync(examplesDir)) return;

  const files = readdirSync(examplesDir)
    .filter((f) => EXAMPLE_RE.test(f))
    .sort();

  if (files.length === 0) return;

  const lines = [
    '/* eslint-disable */',
    '// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.',
    '// Do not edit manually.',
    '',
  ];

  for (const filename of files) {
    const name = exportName(filename);
    if (!name) continue;
    const raw = readFileSync(join(examplesDir, filename), 'utf8').trimEnd();
    lines.push(`export const ${name} = \`${escapeTemplateLiteral(raw)}\`;`);
    lines.push('');
  }

  const output = lines.join('\n');
  const outPath = join(pageDir, 'snippets.generated.ts');
  writeFileSync(outPath, output, 'utf8');
  console.log(
    `  generated: projects/demo/src/app/pages/${basename(pageDir)}/snippets.generated.ts`,
  );
}

const pages = readdirSync(pagesDir).filter((name) => statSync(join(pagesDir, name)).isDirectory());

console.log('Generating demo snippets...');
for (const page of pages) {
  processPage(join(pagesDir, page));
}
console.log('Done.');
