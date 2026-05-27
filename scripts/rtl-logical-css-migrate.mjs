/**
 * scripts/rtl-logical-css-migrate.mjs
 *
 * One-shot migration: replace directional CSS properties with logical equivalents
 * in all library SCSS files.  Run once, then delete.
 *
 * Safe replacements (these preserve visual output in LTR while enabling RTL):
 *   margin-left:       → margin-inline-start:
 *   margin-right:      → margin-inline-end:
 *   padding-left:      → padding-inline-start:
 *   padding-right:     → padding-inline-end:
 *   border-left:       → border-inline-start:
 *   border-right:      → border-inline-end:
 *   border-left-*:     → border-inline-start-*:
 *   border-right-*:    → border-inline-end-*:
 *   text-align: left   → text-align: start
 *   text-align: right  → text-align: end
 *
 * Positional left/right are NOT touched here — those require per-component review.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const LIB_DIR = new URL('../projects/ui-lib-custom/src/lib', import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, '$1'); // fix Windows path /D:/... → D:/...

const REPLACEMENTS = [
  // margin
  [/\bmargin-left(\s*:)/g, 'margin-inline-start$1'],
  [/\bmargin-right(\s*:)/g, 'margin-inline-end$1'],
  // padding
  [/\bpadding-left(\s*:)/g, 'padding-inline-start$1'],
  [/\bpadding-right(\s*:)/g, 'padding-inline-end$1'],
  // border sub-properties (must precede border shorthand to avoid double-match)
  [/\bborder-left-(width|color|style)(\s*:)/g, 'border-inline-start-$1$2'],
  [/\bborder-right-(width|color|style)(\s*:)/g, 'border-inline-end-$1$2'],
  // border shorthands
  [/\bborder-left(\s*[:{])/g, 'border-inline-start$1'],
  [/\bborder-right(\s*[:{])/g, 'border-inline-end$1'],
  // text-align
  [/\btext-align\s*:\s*left\b/g, 'text-align: start'],
  [/\btext-align\s*:\s*right\b/g, 'text-align: end'],
];

/** Collect all .scss files under a directory recursively. */
function collectScss(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectScss(full));
    } else if (extname(entry) === '.scss') {
      results.push(full);
    }
  }
  return results;
}

const files = collectScss(LIB_DIR);
let totalFiles = 0;
let totalReplacements = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  let updated = original;

  for (const [pattern, replacement] of REPLACEMENTS) {
    updated = updated.replace(pattern, replacement);
  }

  if (updated !== original) {
    // Count changes
    const changes = countDiff(original, updated);
    writeFileSync(file, updated, 'utf8');
    const rel = file.replace(LIB_DIR + '\\', '').replace(LIB_DIR + '/', '');
    console.log(`  ✔ ${rel} (${changes} replacement${changes !== 1 ? 's' : ''})`);
    totalFiles++;
    totalReplacements += changes;
  }
}

console.log(`\nDone — ${totalFiles} files updated, ${totalReplacements} replacements.`);

function countDiff(a, b) {
  // Simple heuristic: count lines that differ
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  let count = 0;
  const len = Math.max(aLines.length, bLines.length);
  for (let i = 0; i < len; i++) {
    if (aLines[i] !== bLines[i]) count++;
  }
  return count;
}
