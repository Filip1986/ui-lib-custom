/**
 * Converts demo pages still using the old example-section layout to the standard
 * app-doc-section pattern used by every other demo page.
 *
 * OLD pattern:
 *   <div class="examples">                              ← wrapper div (removed)
 *     <section id="X" data-doc-anchor class="example-section">
 *       <h3>1. Title</h3>                              ← heading removed; title→attr
 *       <p class="example-description">...</p>         ← class normalised
 *       <ui-lib-panel variant="minimal">...</ui-lib-panel>
 *       <app-doc-code-example ... />
 *     </section>
 *   </div>
 *
 * NEW pattern:
 *   <app-doc-section id="X" title="Title">
 *     <p class="demo-section__description">...</p>
 *     <ui-lib-panel variant="minimal">...</ui-lib-panel>
 *     <app-doc-code-example ... />
 *   </app-doc-section>
 *
 * Also:
 *   - Removes <app-doc-demo-viewport> wrappers (image, image-compare, float-label)
 *   - Converts remaining <section class="demo-section" id="X"> tags (float-label)
 *   - Ensures DocSectionComponent is imported + in @Component.imports
 *   - Adds missing { id: 'css-vars' } / { id: 'accessibility' } to sections[]
 *
 * Run:      node scripts/migrate-example-sections.mjs
 * Dry-run:  node scripts/migrate-example-sections.mjs --dry-run
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

const PAGES_DIR = join(__dirname, '../projects/demo/src/app/pages');

// Pages to migrate and their main component files
const PAGES = [
  { folder: 'autocomplete', ts: 'autocomplete-demo.component.ts', html: 'autocomplete-demo.component.html' },
  { folder: 'float-label',  ts: 'float-label-demo.ts',            html: 'float-label-demo.html' },
  { folder: 'image',        ts: 'image-demo.component.ts',         html: 'image-demo.component.html' },
  { folder: 'image-compare',ts: 'image-compare-demo.component.ts', html: 'image-compare-demo.component.html' },
  { folder: 'order-list',   ts: 'order-list-demo.component.ts',    html: 'order-list-demo.component.html' },
  { folder: 'organization-chart', ts: 'organization-chart-demo.component.ts', html: 'organization-chart-demo.component.html' },
  { folder: 'pick-list',    ts: 'pick-list-demo.component.ts',     html: 'pick-list-demo.component.html' },
  { folder: 'split-button', ts: 'split-button-demo.component.ts',  html: 'split-button-demo.component.html' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse the sections[] array from a TS source file → Map<id, label> */
function parseSectionsMap(tsSrc) {
  const map = new Map();
  // Match entries like: { id: 'foo', label: 'Bar' } or { id: 'foo', label: "Bar" }
  const re = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*label:\s*['"]([^'"]+)['"]\s*\}/g;
  let m;
  while ((m = re.exec(tsSrc)) !== null) {
    map.set(m[1], m[2]);
  }
  return map;
}

/** Derive a readable title from an h3 string, stripping numeric/letter prefixes */
function titleFromH3(h3Text) {
  return h3Text
    .replace(/<[^>]+>/g, '') // strip tags
    .trim()
    .replace(/^\d+\.\s+/, '')   // "1. Basic" → "Basic"
    .replace(/^[a-z]\.\s+/i, ''); // "a. Basic" → "Basic"
}

/** Strip template literals to avoid false positives when searching for @Component */
function stripTemplateLiterals(src) {
  return src.replace(/`[\s\S]*?`/g, (m) => ' '.repeat(m.length));
}

// ─── HTML transformer ─────────────────────────────────────────────────────────

function transformHtml(src, sectionsMap) {
  // Normalise to LF so all regexes work regardless of file line endings.
  const hasCrlf = src.includes('\r\n');
  let result = hasCrlf ? src.replace(/\r\n/g, '\n') : src;

  // ── 1. Remove <app-doc-demo-viewport ...>...</app-doc-demo-viewport> ──────
  // These wrap the <div class="examples"> on image/image-compare/float-label.
  // Replace the open/close tags but keep the content.
  result = result.replace(/<app-doc-demo-viewport[^>]*>\n?/g, '');
  result = result.replace(/<\/app-doc-demo-viewport>\n?/g, '');

  // ── 2. Remove <div class="examples">...</div> wrapper ────────────────────
  // Remove the opening tag (may have extra whitespace/newline after)
  result = result.replace(/[ \t]*<div class="examples">\n?/g, '');
  // Remove the closing tag (may be on its own line)
  result = result.replace(/[ \t]*<\/div>(\s*\n)(?=\s*\n|\s*<!--|\s*<app-doc-section|\s*<app-doc-quality|\s*<div class="demo-page-rail"|\s*<\/app-doc-page-layout)/, '$1');

  // ── 3. Convert <section id="X" data-doc-anchor class="example-section"> ──
  //     → <app-doc-section id="X" title="TITLE">
  result = result.replace(
    /<section\s+id="([^"]+)"\s+data-doc-anchor\s+class="example-section">/g,
    (_, id) => {
      const label = sectionsMap.get(id) ?? titleFromId(id);
      return `<app-doc-section id="${id}" title="${label}">`;
    },
  );
  // Also handle reversed attribute order
  result = result.replace(
    /<section\s+id="([^"]+)"\s+class="example-section"\s+data-doc-anchor>/g,
    (_, id) => {
      const label = sectionsMap.get(id) ?? titleFromId(id);
      return `<app-doc-section id="${id}" title="${label}">`;
    },
  );

  // ── 4. Convert remaining <section class="demo-section" id="X" data-doc-anchor>
  //     (old-style section not covered by example-section pattern)
  result = result.replace(
    /<section\s+class="demo-section"\s+id="([^"]+)"\s+data-doc-anchor>/g,
    (_, id) => {
      const label = sectionsMap.get(id) ?? titleFromId(id);
      return `<app-doc-section id="${id}" title="${label}">`;
    },
  );

  // ── 5. Remove <h2 class="demo-section__title">...</h2> (replaced by title attr)
  result = result.replace(/[ \t]*<h2 class="demo-section__title">[^<]*<\/h2>\n?/g, '');

  // ── 6. Remove <h3>...</h3> that directly follow an <app-doc-section> open tag
  //     (these were the section headings; title is now the attribute)
  //     Replace the entire opening+h3 block with just the section tag + newline
  //     so the next element keeps its own indentation intact.
  result = result.replace(
    /(<app-doc-section[^>]*>)\n[ \t]*<h3>[^<]*<\/h3>\n?/g,
    '$1\n',
  );

  // ── 7. Convert </section> → </app-doc-section>
  //     At this point all remaining </section> tags belong to converted sections.
  result = result.replace(/<\/section>/g, '</app-doc-section>');

  // ── 8. Normalise description paragraph classes
  result = result
    .replace(/class="section-text"/g, 'class="demo-section__description"')
    .replace(/class="example-description"/g, 'class="demo-section__description"');

  // Restore original line endings if needed.
  if (hasCrlf) result = result.replace(/\n/g, '\r\n');

  return result;
}

function titleFromId(id) {
  const overrides = {
    'api': 'API Reference', 'api-reference': 'API Reference',
    'css-vars': 'CSS Custom Properties', 'accessibility': 'Accessibility',
    'rtl': 'RTL Support',
  };
  return overrides[id] ?? id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// ─── TS transformer ───────────────────────────────────────────────────────────

const DOC_SECTION_IMPORT =
  `import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';`;

function insertAfterLastImport(src, line) {
  const preambleEnd = Math.min(
    src.indexOf('@Component(') !== -1 ? src.indexOf('@Component(') : Infinity,
    src.indexOf('export class') !== -1 ? src.indexOf('export class') : Infinity,
  );
  const preamble = isFinite(preambleEnd) ? src.slice(0, preambleEnd) : src;
  const importRe = /^import(?:\s+type)?\s+[\s\S]*?from\s+['"][^'"]+['"];/gm;
  let lastEnd = -1, m;
  while ((m = importRe.exec(preamble)) !== null) lastEnd = m.index + m[0].length;
  if (lastEnd === -1) return src;
  return src.slice(0, lastEnd) + '\n' + line + src.slice(lastEnd);
}

function addToImportsArray(src, componentName) {
  if (new RegExp(`\\bimports:\\s*\\[[\\s\\S]*?\\b${componentName}\\b`).test(src)) return src;
  const stripped = stripTemplateLiterals(src);
  const idx = stripped.lastIndexOf('@Component(');
  if (idx === -1) return src;
  const afterDecorator = src.slice(idx);
  const arrMatch = afterDecorator.match(/\bimports:\s*\[([\s\S]*?)\]/);
  if (!arrMatch) return src;
  const insertPos = idx + arrMatch.index + arrMatch[0].length - 1;
  const comma = arrMatch[1].trim().endsWith(',') ? '' : ',';
  return src.slice(0, insertPos) + `${comma}\n    ${componentName},\n  ` + src.slice(insertPos);
}

function addSectionsEntry(src, idToAdd, label, afterId) {
  if (src.includes(`id: '${idToAdd}'`)) return src;
  // Try inserting after a specific id's entry
  if (afterId) {
    const anchor = `{ id: '${afterId}'`;
    const idx = src.indexOf(anchor);
    if (idx !== -1) {
      const entryEnd = src.indexOf('},', idx);
      if (entryEnd !== -1) {
        const indent = src.slice(Math.max(0, idx - 6), idx).match(/[ \t]*$/)?.[0] ?? '    ';
        return (
          src.slice(0, entryEnd + 2) +
          `\n${indent}{ id: '${idToAdd}', label: '${label}' },` +
          src.slice(entryEnd + 2)
        );
      }
    }
  }
  // Fallback: insert before closing ]; of the sections array
  const secIdx = src.indexOf('sections:');
  if (secIdx === -1) return src;
  const afterSec = src.slice(secIdx);
  const closeIdx = afterSec.indexOf('];');
  if (closeIdx === -1) return src;
  const abs = secIdx + closeIdx;
  const indent = src.slice(Math.max(0, abs - 4), abs).match(/[ \t]*$/)?.[0] ?? '    ';
  return src.slice(0, abs) + `${indent}{ id: '${idToAdd}', label: '${label}' },\n  ` + src.slice(abs);
}

function transformTs(tsSrc, htmlSrc) {
  let result = tsSrc;

  // Add DocSectionComponent import + array entry if missing
  if (!result.includes('DocSectionComponent')) {
    result = insertAfterLastImport(result, DOC_SECTION_IMPORT);
    result = addToImportsArray(result, 'DocSectionComponent');
  } else {
    result = addToImportsArray(result, 'DocSectionComponent');
  }

  // Add sections[] entries for any sections now in HTML but missing in TS
  const hasCssVarsHtml = htmlSrc.includes('id="css-vars"');
  const hasA11yHtml = htmlSrc.includes('id="accessibility"');

  if (hasCssVarsHtml) {
    result = addSectionsEntry(result, 'css-vars', 'CSS Custom Properties', 'api-reference');
    result = addSectionsEntry(result, 'css-vars', 'CSS Custom Properties', 'api');
  }
  if (hasA11yHtml) {
    result = addSectionsEntry(result, 'accessibility', 'Accessibility', 'css-vars');
    result = addSectionsEntry(result, 'accessibility', 'Accessibility', 'api-reference');
    result = addSectionsEntry(result, 'accessibility', 'Accessibility', 'api');
  }

  return result;
}

// ─── Main loop ────────────────────────────────────────────────────────────────

let processed = 0;
const warnings = [];

for (const page of PAGES) {
  const dir = join(PAGES_DIR, page.folder);
  const tsPath = join(dir, page.ts);
  const htmlPath = join(dir, page.html);

  if (!existsSync(tsPath) || !existsSync(htmlPath)) {
    warnings.push(`⚠  ${page.folder}: file not found (ts=${existsSync(tsPath)} html=${existsSync(htmlPath)})`);
    continue;
  }

  const tsSrc = readFileSync(tsPath, 'utf8');
  const htmlSrc = readFileSync(htmlPath, 'utf8');

  if (!htmlSrc.includes('class="example-section"') && !htmlSrc.includes('class="demo-section"')) {
    console.log(`⏭  ${page.folder}: no example-section or demo-section tags — already migrated?`);
    continue;
  }

  const sectionsMap = parseSectionsMap(tsSrc);

  const newHtml = transformHtml(htmlSrc, sectionsMap);
  const newTs = transformTs(tsSrc, newHtml); // pass newHtml so we can check which sections are present

  const tsChanged = newTs !== tsSrc;
  const htmlChanged = newHtml !== htmlSrc;

  if (!tsChanged && !htmlChanged) {
    warnings.push(`⚠  ${page.folder}: nothing changed — check manually`);
    continue;
  }

  const parts = [htmlChanged && 'html', tsChanged && 'ts'].filter(Boolean).join('+');
  console.log(`✅ ${page.folder} (${parts}, ${sectionsMap.size} sections)`);

  if (!DRY_RUN) {
    if (htmlChanged) writeFileSync(htmlPath, newHtml, 'utf8');
    if (tsChanged) writeFileSync(tsPath, newTs, 'utf8');
  }
  processed++;
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`Processed: ${processed}`);
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach((w) => console.log(w));
}
if (DRY_RUN) console.log('\n[DRY RUN — no files written]');
