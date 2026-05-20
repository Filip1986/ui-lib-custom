/**
 * migrate-snippets-batch.mjs
 *
 * Migrates demo pages from inline snippet strings to example-file pattern.
 *
 * For each page:
 *  1. Parses the HTML template to collect all [html]/[typescript] bindings in app-doc-code-example
 *  2. Resolves each binding expression to its string value from the TS component file
 *  3. Writes examples/<base>.example.html / .ts files
 *  4. Updates the HTML file: replaces old expressions with generated property names
 *  5. Updates the TS file: removes old snippet definitions, adds import + class properties
 *
 * Usage:
 *   node scripts/migrate-snippets-batch.mjs [page1 page2 ...]
 *   node scripts/migrate-snippets-batch.mjs   # processes all BATCH_PAGES
 *
 * After running, execute:
 *   node scripts/generate-snippets.mjs
 * to create snippets.generated.ts for every migrated page.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const PAGES_DIR = join(ROOT, 'projects', 'demo', 'src', 'app', 'pages');

const BATCH_PAGES = [
  'animated-on-scroll',
  'auto-focus',
  'badges',
  'cards',
  'checkboxes',
  'fieldset',
  'icon-field',
  'image-compare',
  'key-filter',
  'knob',
  'meter-group',
  'popover',
  'scoped-theming',
  'scroll-panel',
  'scroll-top',
  'select',
  'select-buttons',
  'slider',
  'split-button',
  'toggle-button',
];

// ─────────────────────────────────────────────────────────────────────────────
// Core: string-literal extraction (state-machine, handles ` ' ")
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extract the VALUE of a JS string literal starting at src[pos] (the opening delimiter).
 * Returns { value, end } where end is the index of the closing delimiter.
 */
function extractStringAt(src, pos) {
  const q = src[pos];
  if (q !== '`' && q !== "'" && q !== '"') throw new Error(`Not a string at ${pos}`);
  let value = '';
  let i = pos + 1;
  if (q === '`') {
    while (i < src.length) {
      const ch = src[i];
      if (ch === '\\') {
        const nx = src[++i]; i++;
        if (nx === '`') value += '`';
        else if (nx === '\\') value += '\\';
        else if (nx === 'n') value += '\n';
        else if (nx === 'r') value += '\r';
        else if (nx === 't') value += '\t';
        else if (nx === '$') value += '$';
        else { value += '\\'; value += nx; }
      } else if (ch === '$' && src[i + 1] === '{') {
        let depth = 1; value += '${'; i += 2;
        while (i < src.length && depth > 0) {
          const c = src[i++];
          if (c === '{') { depth++; value += c; }
          else if (c === '}') { depth--; value += depth > 0 ? c : '}'; }
          else value += c;
        }
      } else if (ch === '`') {
        return { value, end: i };
      } else { value += ch; i++; }
    }
  } else {
    while (i < src.length) {
      const ch = src[i];
      if (ch === '\\') {
        const nx = src[++i]; i++;
        if (nx === "'") value += "'";
        else if (nx === '"') value += '"';
        else if (nx === '\\') value += '\\';
        else if (nx === 'n') value += '\n';
        else if (nx === 'r') value += '\r';
        else if (nx === 't') value += '\t';
        else { value += '\\'; value += nx; }
      } else if (ch === q) { return { value, end: i }; }
      else { value += ch; i++; }
    }
  }
  throw new Error(`Unterminated string at ${pos}`);
}

/**
 * Scan src and return all string-literal spans: [{start, end}].
 * These positions must be excluded when searching for code patterns.
 */
function getStringSpans(src) {
  const spans = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    // Line comment
    if (c === '/' && src[i + 1] === '/') {
      const start = i;
      while (i < src.length && src[i] !== '\n') i++;
      spans.push({ start, end: i - 1 });
      continue;
    }
    // Block comment
    if (c === '/' && src[i + 1] === '*') {
      const start = i; i += 2;
      while (i < src.length && !(src[i - 1] === '*' && src[i] === '/')) i++;
      spans.push({ start, end: i++ });
      continue;
    }
    if (c === '`' || c === "'" || c === '"') {
      try {
        const { end } = extractStringAt(src, i);
        spans.push({ start: i, end });
        i = end + 1;
      } catch { i++; }
      continue;
    }
    i++;
  }
  return spans;
}

function isInSpan(pos, spans) {
  for (const { start, end } of spans) {
    if (pos >= start && pos <= end) return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Object-literal property extraction
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extract all string-valued properties from an object literal whose opening { is at startBrace.
 */
function extractObjectProps(src, startBrace) {
  const props = {};
  let i = startBrace + 1;
  while (i < src.length) {
    while (i < src.length && /\s/.test(src[i])) i++;
    if (src[i] === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (src[i] === '/' && src[i + 1] === '*') {
      i += 2; while (i < src.length && !(src[i - 1] === '*' && src[i] === '/')) i++; i++; continue;
    }
    if (src[i] === '}') break;

    // Key
    let key = '';
    if (src[i] === "'" || src[i] === '"' || src[i] === '`') {
      const { value, end } = extractStringAt(src, i); key = value; i = end + 1;
    } else {
      while (i < src.length && /[\w$]/.test(src[i])) key += src[i++];
    }
    if (!key) { i++; continue; }

    while (i < src.length && (src[i] === ':' || /[ \t]/.test(src[i]))) i++;
    while (i < src.length && /\s/.test(src[i])) i++;

    if (src[i] === '`' || src[i] === "'" || src[i] === '"') {
      try { const { value, end } = extractStringAt(src, i); props[key] = value; i = end + 1; }
      catch { /* skip */ }
    } else {
      // Skip non-string value
      let depth = 0;
      while (i < src.length) {
        const c = src[i];
        if (c === '{' || c === '(' || c === '[') { depth++; i++; }
        else if (c === '}' || c === ')' || c === ']') { if (depth === 0) break; depth--; i++; }
        else if ((c === ',' || c === ';') && depth === 0) break;
        else if (c === '`' || c === "'" || c === '"') {
          try { const { end } = extractStringAt(src, i); i = end + 1; } catch { i++; }
        } else i++;
      }
    }
    while (i < src.length && (src[i] === ',' || /\s/.test(src[i]))) i++;
  }
  return props;
}

// ─────────────────────────────────────────────────────────────────────────────
// Naming helpers
// ─────────────────────────────────────────────────────────────────────────────

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, (c) => '-' + c.toLowerCase()).replace(/^-/, '');
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML template parser — find all [html]/[typescript] binding pairs
// ─────────────────────────────────────────────────────────────────────────────

function parseHtmlBindings(htmlSrc) {
  const results = [];
  const tagRe = /<app-doc-code-example([\s\S]*?)(?:\/>|>)/g;
  let m;
  while ((m = tagRe.exec(htmlSrc)) !== null) {
    const attrs = m[1];
    const htmlBind = attrs.match(/\[html\]\s*=\s*"([^"]+)"/)?.[1]?.trim() ?? null;
    const tsBind = attrs.match(/\[typescript\]\s*=\s*"([^"]+)"/)?.[1]?.trim() ?? null;
    if (htmlBind || tsBind) results.push({ html: htmlBind, typescript: tsBind });
  }
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// Resolve a binding expression → string value from the TS source
// ─────────────────────────────────────────────────────────────────────────────

function findInRecord(tsSrc, recordName, key) {
  // Match "readonly name ... = {" — using [^=;]* to skip any type annotation, then require "="
  // This avoids matching the type-annotation brace in patterns like "snippets: { type } = { value }".
  const re = new RegExp(
    `(?:private|public|protected)?\\s*readonly\\s+${recordName}\\b[^=]*=\\s*\\{`,
    'g',
  );
  const spans = getStringSpans(tsSrc);
  let m;
  while ((m = re.exec(tsSrc)) !== null) {
    if (isInSpan(m.index, spans)) continue;
    // The '{' is the last character of the full match
    const bracePos = m.index + m[0].length - 1;
    const props = extractObjectProps(tsSrc, bracePos);
    if (key in props) return props[key];
  }
  return null;
}

function findDirectProperty(tsSrc, propName) {
  const spans = getStringSpans(tsSrc);
  const re = new RegExp(
    `(?:public|private|protected)?\\s+readonly\\s+${propName}\\s*:\\s*string\\s*=\\s*`,
    'g',
  );
  let m;
  while ((m = re.exec(tsSrc)) !== null) {
    if (isInSpan(m.index, spans)) continue;
    let pos = m.index + m[0].length;
    while (pos < tsSrc.length && /\s/.test(tsSrc[pos])) pos++;
    if (tsSrc[pos] === '`' || tsSrc[pos] === "'" || tsSrc[pos] === '"') {
      try { const { value } = extractStringAt(tsSrc, pos); return value; } catch { /* skip */ }
    }
  }
  return null;
}

function resolveExpression(expr, tsSrc) {
  if (!expr) return null;
  // Pattern A: snippet('key') / snippetTs('key')
  const getterM = expr.match(/^snippet(?:Ts)?\('(\w+)'\)$/);
  if (getterM) {
    const key = getterM[1];
    return findInRecord(tsSrc, expr.startsWith('snippetTs(') ? 'snippetsTs' : 'snippets', key);
  }
  // Pattern C: obj.key
  const dotM = expr.match(/^(\w+)\.(\w+)$/);
  if (dotM) return findInRecord(tsSrc, dotM[1], dotM[2]);
  // Pattern B: direct property
  return findDirectProperty(tsSrc, expr);
}

// ─────────────────────────────────────────────────────────────────────────────
// Parse binding expression → { base: camelCase, type: 'html'|'ts' }
// ─────────────────────────────────────────────────────────────────────────────

function parseBinding(expr) {
  if (!expr) return null;
  // snippet('key') → html
  const hg = expr.match(/^snippet\('(\w+)'\)$/);
  if (hg) return { base: hg[1], type: 'html' };
  // snippetTs('key') → ts  (strip trailing Ts from key if present, e.g. 'alphanumTs' → 'alphanum')
  const tg = expr.match(/^snippetTs\('(\w+)'\)$/);
  if (tg) {
    let key = tg[1];
    if (key.endsWith('Ts')) key = key.slice(0, -2);
    return { base: key, type: 'ts' };
  }
  // obj.keyTs → ts, obj.key → html
  const dot = expr.match(/^(\w+)\.(\w+)$/);
  if (dot) {
    const key = dot[2];
    if (key.endsWith('Ts')) return { base: key.slice(0, -2), type: 'ts' };
    return { base: key, type: 'html' };
  }
  // snippetFooTs → ts, base = fooTs without snippet and Ts
  const sp = expr.match(/^snippet([A-Z]\w*)$/);
  if (sp) {
    const rest = sp[1];
    if (rest.endsWith('Ts')) {
      const b = rest.slice(0, -2);
      return { base: b.charAt(0).toLowerCase() + b.slice(1), type: 'ts' };
    }
    return { base: rest.charAt(0).toLowerCase() + rest.slice(1), type: 'html' };
  }
  // Generic prop ending in Ts → ts
  if (expr.endsWith('Ts') && expr.length > 2) return { base: expr.slice(0, -2), type: 'ts' };
  // Generic → html
  return { base: expr, type: 'html' };
}

// ─────────────────────────────────────────────────────────────────────────────
// Build snippet pairs from HTML bindings
// ─────────────────────────────────────────────────────────────────────────────

function buildPairs(bindings, tsSrc) {
  const map = new Map();
  for (const { html: htmlExpr, typescript: tsExpr } of bindings) {
    for (const [expr, forcedType] of [[htmlExpr, 'html'], [tsExpr, 'ts']]) {
      if (!expr) continue;
      const parsed = parseBinding(expr);
      if (!parsed) continue;
      const { base } = parsed;
      if (!map.has(base)) map.set(base, {});
      const entry = map.get(base);
      if (forcedType === 'html') {
        entry.oldHtmlExpr = expr;
        const val = resolveExpression(expr, tsSrc);
        if (val !== null) entry.html = val;
      } else {
        entry.oldTsExpr = expr;
        const val = resolveExpression(expr, tsSrc);
        if (val !== null) entry.ts = val;
      }
    }
  }
  return map;
}

// ─────────────────────────────────────────────────────────────────────────────
// Write example files
// ─────────────────────────────────────────────────────────────────────────────

function writeExampleFiles(pageDir, pairs) {
  const exDir = join(pageDir, 'examples');
  if (!existsSync(exDir)) mkdirSync(exDir, { recursive: true });
  for (const [base, { html, ts }] of pairs) {
    const stem = camelToKebab(base);
    if (html != null) {
      const fixed = html.replace(/templateUrl:\s*['"`][^'"`]*['"`]/g, `templateUrl: './${stem}.example.html'`);
      writeFileSync(join(exDir, `${stem}.example.html`), fixed.trimEnd() + '\n', 'utf8');
      console.log(`    + ${stem}.example.html`);
    }
    if (ts != null) {
      const fixed = ts.replace(/templateUrl:\s*['"`][^'"`]*['"`]/g, `templateUrl: './${stem}.example.html'`);
      writeFileSync(join(exDir, `${stem}.example.ts`), fixed.trimEnd() + '\n', 'utf8');
      console.log(`    + ${stem}.example.ts`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Update HTML template — replace old binding expressions (longest first)
// ─────────────────────────────────────────────────────────────────────────────

function updateHtmlFile(htmlPath, pairs) {
  let src = readFileSync(htmlPath, 'utf8');

  // Collect all (from → to) replacements, sort longest-first to avoid partial replacements
  const reps = [];
  for (const [base, { oldHtmlExpr, oldTsExpr }] of pairs) {
    if (oldHtmlExpr) reps.push({ from: oldHtmlExpr, to: base + 'Html' });
    if (oldTsExpr)   reps.push({ from: oldTsExpr,   to: base + 'Ts'   });
  }
  reps.sort((a, b) => b.from.length - a.from.length);

  for (const { from, to } of reps) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Use a lookahead for the closing " so that a prefix like "badgeExample"
    // is not replaced inside "badgeExampleTs" when the latter appears first.
    src = src.replace(new RegExp(escaped + '(?=")', 'g'), to);
  }
  writeFileSync(htmlPath, src, 'utf8');
}

// ─────────────────────────────────────────────────────────────────────────────
// Update TS file — remove old snippets, insert import + class properties
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Remove a single direct class property (e.g. "public readonly snippetBasic: string = `...`;")
 * using the string-aware extractor so semicolons inside template literals don't confuse it.
 */
function removeDirectProp(src, propName) {
  const spans = getStringSpans(src);
  // Find "readonly propName: string ="  that is NOT inside a string
  const re = new RegExp(
    `[ \\t]*(?:public|private|protected)?\\s+readonly\\s+${propName}\\s*:\\s*string\\s*=\\s*`,
    'g',
  );
  let m;
  while ((m = re.exec(src)) !== null) {
    if (isInSpan(m.index, spans)) continue;
    // Walk back to start of line
    let lineStart = m.index;
    while (lineStart > 0 && src[lineStart - 1] !== '\n') lineStart--;
    // Find the string value's end
    let pos = m.index + m[0].length;
    while (pos < src.length && /[ \t]/.test(src[pos])) pos++;
    if (src[pos] !== '`' && src[pos] !== "'" && src[pos] !== '"') return src; // non-string value
    try {
      const { end } = extractStringAt(src, pos);
      pos = end + 1;
    } catch { return src; }
    // Skip optional whitespace + semicolon + newline
    while (pos < src.length && /[ \t]/.test(src[pos])) pos++;
    if (src[pos] === ';') pos++;
    if (pos < src.length && src[pos] === '\n') pos++;
    return src.slice(0, lineStart) + src.slice(pos);
  }
  return src;
}

/**
 * Remove a Record-style snippet object (snippets, snippetsTs, iconSnippets, …).
 * Also removes the associated getter methods snippet(key)/snippetTs(key).
 */
function removeRecordObject(src, objectName) {
  const spans = getStringSpans(src);
  const re = new RegExp(
    `(?:private|public)\\s+readonly\\s+${objectName}\\b[^=]*=\\s*\\{`,
    'g',
  );
  let m;
  while ((m = re.exec(src)) !== null) {
    if (isInSpan(m.index, spans)) continue;
    // Walk back to start of line
    let lineStart = m.index;
    while (lineStart > 0 && src[lineStart - 1] !== '\n') lineStart--;
    // Find the opening brace
    const braceIdx = src.lastIndexOf('{', m.index + m[0].length);
    let depth = 1;
    let i = braceIdx + 1;
    while (i < src.length && depth > 0) {
      const c = src[i];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      else if (c === '`' || c === "'" || c === '"') {
        try { const { end } = extractStringAt(src, i); i = end; } catch { /* skip */ }
      }
      i++;
    }
    // i is now after the closing '}'; skip "as const" and ";"
    while (i < src.length && /[ \t]/.test(src[i])) i++;
    if (src.slice(i, i + 8) === 'as const') i += 8;
    while (i < src.length && /[ \t]/.test(src[i])) i++;
    if (src[i] === ';') i++;
    if (i < src.length && src[i] === '\n') i++;
    src = src.slice(0, lineStart) + src.slice(i);
    // Reset spans after modification
    return removeRecordObject(src, objectName); // recurse in case of multiple
  }
  return src;
}

/** Remove getter methods: public snippet(key)/snippetTs(key). */
function removeGetterMethods(src) {
  return src.replace(
    /\n?[ \t]*public\s+snippet(?:Ts)?\s*\([^)]*\)\s*:\s*string\s*\{[^}]*\}/g,
    '',
  );
}

/** Find the end position of the last real top-level import statement. */
function findLastImportEnd(src) {
  const spans = getStringSpans(src);
  const re = /^import\s/gm;
  let lastEnd = -1;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (isInSpan(m.index, spans)) continue;
    // Find the terminating ; of this import
    let i = m.index;
    while (i < src.length) {
      if (src[i] === ';') { lastEnd = i + 1; break; }
      if (src[i] === '`' || src[i] === "'" || src[i] === '"') {
        try { const { end } = extractStringAt(src, i); i = end + 1; } catch { i++; }
      } else i++;
    }
  }
  return lastEnd;
}

function updateTsFile(tsPath, pairs) {
  let src = readFileSync(tsPath, 'utf8');

  // 1. Remove getter methods
  src = removeGetterMethods(src);

  // 2. Remove Record objects (snippets, snippetsTs, iconSnippets)
  src = removeRecordObject(src, 'snippets');
  src = removeRecordObject(src, 'snippetsTs');
  src = removeRecordObject(src, 'iconSnippets');

  // 3. Remove direct properties referenced in HTML bindings
  const directPropNames = new Set();
  for (const [, { oldHtmlExpr, oldTsExpr }] of pairs) {
    for (const expr of [oldHtmlExpr, oldTsExpr]) {
      if (!expr || expr.includes('.') || expr.includes('(')) continue;
      directPropNames.add(expr);
    }
  }
  for (const prop of directPropNames) {
    src = removeDirectProp(src, prop);
  }

  // 4. Collect exports needed from snippets.generated
  const exports = [];
  for (const [base, { html, ts }] of pairs) {
    if (html != null) exports.push(base + 'Html');
    if (ts != null)   exports.push(base + 'Ts');
  }

  // 5. Build class property lines
  const propLines = [];
  for (const [base, { html, ts }] of pairs) {
    if (html != null) propLines.push(`  public readonly ${base}Html: string = ${base}Html;`);
    if (ts != null)   propLines.push(`  public readonly ${base}Ts: string = ${base}Ts;`);
  }

  // 6. Insert import after last real top-level import
  const lastEnd = findLastImportEnd(src);
  if (lastEnd >= 0 && exports.length > 0) {
    const importBlock = `\nimport {\n${exports.map((e) => `  ${e},`).join('\n')}\n} from './snippets.generated';`;
    src = src.slice(0, lastEnd) + importBlock + src.slice(lastEnd);
  }

  // 7. Insert class properties immediately after the class opening brace
  if (propLines.length > 0) {
    const classMatch = src.match(/export\s+class\s+\w+[^{]*\{/);
    if (classMatch) {
      const braceIdx = src.indexOf('{', classMatch.index);
      const insertAt = braceIdx + 1;
      src = src.slice(0, insertAt) + '\n' + propLines.join('\n') + '\n' + src.slice(insertAt);
    }
  }

  writeFileSync(tsPath, src, 'utf8');
}

// ─────────────────────────────────────────────────────────────────────────────
// Process a single page
// ─────────────────────────────────────────────────────────────────────────────

function processPage(pageName) {
  const pageDir = join(PAGES_DIR, pageName);
  if (!existsSync(pageDir)) { console.warn(`  Page not found: ${pageName}`); return; }

  if (existsSync(join(pageDir, 'examples'))) {
    console.log(`  Already migrated (examples/ exists) — skipping.`); return;
  }

  const files = readdirSync(pageDir).filter((f) => statSync(join(pageDir, f)).isFile());
  const tsFile = files.find((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && !f.endsWith('.generated.ts'));
  const htmlFile = files.find((f) => f.endsWith('.html'));
  if (!tsFile || !htmlFile) { console.warn(`  Missing .ts or .html — skipping.`); return; }

  const tsPath = join(pageDir, tsFile);
  const htmlPath = join(pageDir, htmlFile);
  const tsSrc = readFileSync(tsPath, 'utf8');
  const htmlSrc = readFileSync(htmlPath, 'utf8');

  const bindings = parseHtmlBindings(htmlSrc);
  if (bindings.length === 0) { console.log(`  No app-doc-code-example found — skipping.`); return; }

  const pairs = buildPairs(bindings, tsSrc);
  if (pairs.size === 0) { console.warn(`  Could not resolve any snippet values.`); return; }

  for (const [base, entry] of pairs) {
    if (entry.html == null && entry.oldHtmlExpr)
      console.warn(`  WARN [${base}] HTML not resolved: ${entry.oldHtmlExpr}`);
    if (entry.ts == null && entry.oldTsExpr)
      console.warn(`  WARN [${base}] TS not resolved:   ${entry.oldTsExpr}`);
  }

  writeExampleFiles(pageDir, pairs);
  updateHtmlFile(htmlPath, pairs);
  console.log(`    updated HTML: ${htmlFile}`);
  updateTsFile(tsPath, pairs);
  console.log(`    updated TS:   ${tsFile}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const pages = args.length > 0 ? args : BATCH_PAGES;
console.log(`\nMigrating ${pages.length} pages...\n`);
for (const page of pages) {
  console.log(`[${page}]`);
  try { processPage(page); }
  catch (err) { console.error(`  ERROR: ${err.message}\n${err.stack}`); }
}
console.log('\nDone. Now run: node scripts/generate-snippets.mjs\n');
