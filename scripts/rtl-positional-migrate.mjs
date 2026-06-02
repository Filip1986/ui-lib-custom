/**
 * scripts/rtl-positional-migrate.mjs
 *
 * Second pass: convert positional left/right → inset-inline-start/end.
 *
 * Rules applied:
 *   left: 0      → inset-inline-start: 0
 *   right: 0     → inset-inline-end: 0
 *   left: auto   → inset-inline-start: auto
 *   right: auto  → inset-inline-end: auto
 *   left: 100%   → inset-inline-start: 100%
 *   right: 100%  → inset-inline-end: 100%
 *   left: <Nrem/px> → inset-inline-start: <Nrem/px>  (positive pixel/rem values)
 *   right: <Nrem/px> → inset-inline-end: <Nrem/px>
 *   left: var(…)    → inset-inline-start: var(…)
 *   right: var(…)   → inset-inline-end: var(…)
 *   left: calc(…)   → inset-inline-start: calc(…)
 *   right: calc(…)  → inset-inline-end: calc(…)
 *
 * Skipped:
 *   left: 50%  / right: 50%   — geometric centering (used with transform: translateX)
 *   left: -2px                 — color-picker hue handle offset
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const LIB_DIR = new URL('../projects/ui-lib-custom/src/lib', import.meta.url).pathname.replace(
  /^\/([A-Za-z]:)/,
  '$1',
);

// Each rule: [regex, replacement].
// The regex must NOT match 50% (centering) or -2px (color-picker hue handle).
const RULES = [
  // 0 and auto
  [/^(\s+)left:\s*0(;.*)$/gm, '$1inset-inline-start: 0$2'],
  [/^(\s+)right:\s*0(;.*)$/gm, '$1inset-inline-end: 0$2'],
  [/^(\s+)left:\s*auto(;.*)$/gm, '$1inset-inline-start: auto$2'],
  [/^(\s+)right:\s*auto(;.*)$/gm, '$1inset-inline-end: auto$2'],
  // 100%
  [/^(\s+)left:\s*100%(;.*)$/gm, '$1inset-inline-start: 100%$2'],
  [/^(\s+)right:\s*100%(;.*)$/gm, '$1inset-inline-end: 100%$2'],
  // positive rem/px values (not 50%, not negative)
  [/^(\s+)left:\s*(\d[\d.]*(?:rem|px|em))(;.*)$/gm, '$1inset-inline-start: $2$3'],
  [/^(\s+)right:\s*(\d[\d.]*(?:rem|px|em))(;.*)$/gm, '$1inset-inline-end: $2$3'],
  // var(…)
  [/^(\s+)left:\s*(var\([^)]+\)(?:[^;]*)?)(;.*)$/gm, '$1inset-inline-start: $2$3'],
  [/^(\s+)right:\s*(var\([^)]+\)(?:[^;]*)?)(;.*)$/gm, '$1inset-inline-end: $2$3'],
  // calc(…) — multiline safe: match up to ;
  [/^(\s+)left:\s*(calc\([^;]+)(;.*)$/gm, '$1inset-inline-start: $2$3'],
  [/^(\s+)right:\s*(calc\([^;]+)(;.*)$/gm, '$1inset-inline-end: $2$3'],
];

function collectScss(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) results.push(...collectScss(full));
    else if (extname(entry) === '.scss') results.push(full);
  }
  return results;
}

const files = collectScss(LIB_DIR);
let totalFiles = 0;
let totalReplacements = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  let updated = original;

  for (const [pattern, replacement] of RULES) {
    // Reset lastIndex since we reuse regexes with the global flag
    pattern.lastIndex = 0;
    updated = updated.replace(pattern, replacement);
  }

  if (updated !== original) {
    const changes = countDiff(original, updated);
    writeFileSync(file, updated, 'utf8');
    const rel = file.replace(LIB_DIR + '\\', '').replace(LIB_DIR + '/', '');
    console.log(`  ✔ ${rel} (${changes} replacement${changes !== 1 ? 's' : ''})`);
    totalFiles++;
    totalReplacements += changes;
  }
}

console.log(`\nDone — ${totalFiles} files updated, ${totalReplacements} positional replacements.`);

function countDiff(a, b) {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  let count = 0;
  const len = Math.max(aLines.length, bLines.length);
  for (let i = 0; i < len; i++) {
    if (aLines[i] !== bLines[i]) count++;
  }
  return count;
}
