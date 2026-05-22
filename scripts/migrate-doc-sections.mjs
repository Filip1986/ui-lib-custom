/**
 * Migration script: converts <section class="demo-section" id="X" data-doc-anchor>
 * + <h2 class="demo-section__title">TITLE</h2> patterns to <app-doc-section> usage.
 *
 * Also adds DocSectionComponent import + declaration to each companion .ts file.
 *
 * Run from repo root:
 *   node scripts/migrate-doc-sections.mjs
 *
 * Dry-run (no writes):
 *   node scripts/migrate-doc-sections.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = join(__dirname, '../projects/demo/src/app/pages');
const DRY_RUN = process.argv.includes('--dry-run');

// Pages that need manual treatment (tabs layout or already migrated)
const SKIP_PAGES = new Set([
  'chip',       // already migrated
  'home',
  'vision',
  'roadmap',
  'themes',
  'accessibility',
  'dark-mode',
  'keyboard-guide',
  'icons',
  'scoped-theming',
  'shadows',
  'project-starter',
  'starter-template',
  'layouts',
  'coming-soon',
  'pro-coming-soon',
  'templates',
  'terminal',
]);

let migratedCount = 0;
let skippedCount = 0;
const warnings = [];

// Derive a human-readable title from a kebab-case id as a fallback
function titleFromId(id) {
  const overrides = {
    'api': 'API Reference',
    'api-reference': 'API Reference',
    'css-vars': 'CSS Custom Properties',
    'css-custom-properties': 'CSS Custom Properties',
    'accessibility': 'Accessibility',
    'a11y': 'Accessibility',
    'keyboard': 'Keyboard Navigation',
    'keyboard-navigation': 'Keyboard Navigation',
  };
  if (overrides[id]) return overrides[id];
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ─── HTML migration ────────────────────────────────────────────────────────

function migrateHtml(src) {
  let changed = false;
  let result = src;

  // Matches: <section class="demo-section" id="X" data-doc-anchor>
  const sectionOpenRe =
    /<section\s+class="demo-section"\s+id="([^"]+)"\s+data-doc-anchor\s*>/g;

  let match;
  const replacements = [];

  while ((match = sectionOpenRe.exec(result)) !== null) {
    const fullMatch = match[0];
    const id = match[1];
    const matchStart = match.index;

    // Find the <h2 class="demo-section__title"> immediately after (within 600 chars)
    const searchWindow = result.slice(matchStart + fullMatch.length, matchStart + fullMatch.length + 600);
    const h2Re = /^\s*<h2\s+class="demo-section__title">([\s\S]*?)<\/h2>/;
    const h2Match = h2Re.exec(searchWindow);

    let h2Full = null;
    let h2Start = null;
    let title;

    if (h2Match) {
      h2Full = h2Match[0];
      h2Start = matchStart + fullMatch.length + h2Match.index;
      title = h2Match[1].trim();
    } else {
      // No h2 found — derive title from id and note it
      title = titleFromId(id);
      warnings.push(`  ℹ  No <h2> for id="${id}" — using derived title "${title}"`);
    }

    replacements.push({
      sectionTag: fullMatch,
      sectionStart: matchStart,
      h2Tag: h2Full,
      h2Start,
      id,
      title,
    });
  }

  // Apply replacements in reverse order so indices stay valid
  for (const rep of replacements.reverse()) {
    // Remove the <h2> line only if one was found
    if (rep.h2Tag !== null && rep.h2Start !== null) {
      result =
        result.slice(0, rep.h2Start) +
        result.slice(rep.h2Start + rep.h2Tag.length);
    }

    // Replace section opening tag
    result =
      result.slice(0, rep.sectionStart) +
      `<app-doc-section id="${rep.id}" title="${rep.title}">` +
      result.slice(rep.sectionStart + rep.sectionTag.length);

    changed = true;
  }

  if (!changed) return null;

  // Replace all </section> with </app-doc-section>
  // Only do this if we actually made section replacements above
  result = result.replace(/<\/section>/g, '</app-doc-section>');

  return result;
}

// ─── TS migration ─────────────────────────────────────────────────────────

function migrateTs(src, htmlPath) {
  // Skip if already imported
  if (src.includes('DocSectionComponent')) return null;

  // Detect relative import depth based on html path
  // pages/<name>/<file>.component.ts → ../../shared/...
  const relPrefix = '../../shared/doc-page/doc-section.component';

  // Find last import line to insert after it
  const importBlockRe = /^(import\s[\s\S]*?;)\s*$/gm;
  let lastImportMatch = null;
  let m;
  while ((m = importBlockRe.exec(src)) !== null) {
    lastImportMatch = m;
  }

  if (!lastImportMatch) {
    warnings.push(`  ⚠  Could not find import block in ${basename(htmlPath)} TS — skipped`);
    return null;
  }

  const insertPos = lastImportMatch.index + lastImportMatch[0].length;
  const newImport = `\nimport { DocSectionComponent } from '${relPrefix}';`;

  let result = src.slice(0, insertPos) + newImport + src.slice(insertPos);

  // Add to imports array — look for the imports: [ array
  const importsArrayRe = /(\bimports:\s*\[)([\s\S]*?)(\])/;
  const importsMatch = importsArrayRe.exec(result);
  if (!importsMatch) {
    warnings.push(`  ⚠  Could not find imports array in ${basename(htmlPath)} TS — DocSectionComponent not added`);
    return result; // still return with just the import statement
  }

  // Insert DocSectionComponent before the closing ] of imports array
  // Find a good insertion point: after the last item in the array
  const arrayContent = importsMatch[2];
  // Add after last existing import in the array
  const updatedArray = arrayContent.replace(/(\w+)(\s*,?\s*)$/, (m2, last, trail) => {
    return `${last},\n    DocSectionComponent${trail}`;
  });

  result = result.replace(importsArrayRe, `${importsMatch[1]}${updatedArray}${importsMatch[3]}`);

  return result;
}

// ─── Walk pages dir ───────────────────────────────────────────────────────

const pageDirs = readdirSync(PAGES_DIR).filter((name) => {
  const full = join(PAGES_DIR, name);
  return statSync(full).isDirectory() && !SKIP_PAGES.has(name);
});

for (const pageDir of pageDirs) {
  const dir = join(PAGES_DIR, pageDir);
  const files = readdirSync(dir).filter((f) => f.endsWith('.component.html') && !f.includes('example'));

  for (const htmlFile of files) {
    const htmlPath = join(dir, htmlFile);
    const tsPath = htmlPath.replace('.html', '.ts');

    const htmlSrc = readFileSync(htmlPath, 'utf8');

    // Skip pages without any demo-section patterns
    if (!htmlSrc.includes('class="demo-section"')) {
      skippedCount++;
      continue;
    }

    const newHtml = migrateHtml(htmlSrc);

    if (!newHtml) {
      skippedCount++;
      continue;
    }

    console.log(`✅ ${pageDir}/${htmlFile}`);

    if (!DRY_RUN) {
      writeFileSync(htmlPath, newHtml, 'utf8');
    }

    // Migrate TS file
    let tsSrc;
    try {
      tsSrc = readFileSync(tsPath, 'utf8');
    } catch {
      warnings.push(`  ⚠  No TS file found at ${tsPath}`);
      migratedCount++;
      continue;
    }

    const newTs = migrateTs(tsSrc, htmlPath);
    if (newTs && newTs !== tsSrc) {
      console.log(`   ↳ TS updated`);
      if (!DRY_RUN) {
        writeFileSync(tsPath, newTs, 'utf8');
      }
    }

    migratedCount++;
  }
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`Migrated: ${migratedCount}  |  Skipped: ${skippedCount}`);
if (warnings.length) {
  console.log(`\nWarnings:`);
  warnings.forEach((w) => console.log(w));
}
if (DRY_RUN) console.log('\n[DRY RUN — no files written]');
