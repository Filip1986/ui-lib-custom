/**
 * CI lint: flags hardcoded English strings used as ARIA / form attribute values
 * in component TypeScript and HTML files.
 *
 * Fails if any .ts or .html file under projects/ui-lib-custom/src/lib/ contains
 * a literal English string as the value of:
 *   - aria-label, aria-labelledby, aria-description, aria-placeholder
 *   - label (template attribute), placeholder
 * ...where the value is not an Angular binding expression and not an empty string.
 *
 * Allow-listed files (token/type definitions that are not rendered UI):
 *   - design-tokens.ts, public-api.ts, *.types.ts, *.spec.ts, *.a11y.spec.ts
 *
 * Usage: node scripts/check-i18n.mjs
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LIB_DIR = join(ROOT, 'projects', 'ui-lib-custom', 'src', 'lib');

const ALLOWLISTED_FILENAMES = new Set([
  'design-tokens.ts',
  'public-api.ts',
  'index.ts',
]);

const ALLOWLISTED_SUFFIXES = ['.spec.ts', '.a11y.spec.ts', '.types.ts', '.d.ts'];

/** Patterns that indicate a hardcoded English string in a template attribute. */
const HTML_PATTERNS = [
  // Catches: aria-label="Some English text"  (not an Angular binding [aria-label]="...")
  /\baria-label="([^"]{3,})"/g,
  /\baria-description="([^"]{3,})"/g,
  /\baria-placeholder="([^"]{3,})"/g,
  /\bplaceholder="([^"]{3,})"/g,
];

/** Patterns for TypeScript source: aria-label / label / placeholder set as string literals */
const TS_PATTERNS = [
  // setAttribute('aria-label', 'English text')
  /setAttribute\(['"]aria-label['"],\s*['"]([A-Z][^'"]{2,})['"]/g,
  // ariaLabel = 'English text'  (property assignment)
  /\.ariaLabel\s*=\s*['"]([A-Z][^'"]{2,})['"]/g,
  // aria-label="English text" inside template literal (`` `aria-label="English text"` ``)
  /`[^`]*aria-label="([A-Z][^'"]{2,})"[^`]*`/g,
];

const ENGLISH_WORD = /^[A-Z][a-zA-Z0-9 ,.'!?()-]{2,}$/;

function isAllowlisted(filePath) {
  const name = basename(filePath);
  if (ALLOWLISTED_FILENAMES.has(name)) return true;
  return ALLOWLISTED_SUFFIXES.some((s) => name.endsWith(s));
}

function walkDir(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkDir(full, results);
    } else {
      const ext = extname(full);
      if (ext === '.ts' || ext === '.html') results.push(full);
    }
  }
  return results;
}

function checkFile(filePath) {
  if (isAllowlisted(filePath)) return [];
  const source = readFileSync(filePath, 'utf-8');
  const ext = extname(filePath);
  const violations = [];
  const patterns = ext === '.html' ? HTML_PATTERNS : TS_PATTERNS;

  for (const regex of patterns) {
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(source)) !== null) {
      const value = match[1].trim();
      // Skip Angular binding interpolation, empty strings, and non-English values
      if (!value || value.startsWith('{{') || value.startsWith('{') || !ENGLISH_WORD.test(value)) {
        continue;
      }
      const lineNumber = source.slice(0, match.index).split('\n').length;
      violations.push({
        file: relative(ROOT, filePath),
        line: lineNumber,
        value,
        pattern: regex.source.slice(0, 40),
      });
    }
  }
  return violations;
}

function run() {
  const files = walkDir(LIB_DIR);
  const allViolations = [];

  for (const file of files) {
    allViolations.push(...checkFile(file));
  }

  if (allViolations.length === 0) {
    console.log(`✅ No hardcoded English strings found in ARIA/label attributes (${files.length} files checked).`);
    process.exit(0);
  }

  console.error(`\n❌ Hardcoded English strings found in ${allViolations.length} location(s):\n`);
  for (const v of allViolations) {
    console.error(`  ${v.file}:${v.line}  →  "${v.value}"`);
  }
  console.error(
    '\nFix: expose each string as a component input so consumers can provide a translated value.',
  );
  console.error('See docs/reference/systems/BUNDLE_BUDGET.md and Category 12 in SCORING_CRITERIA.md.');
  process.exit(1);
}

run();
