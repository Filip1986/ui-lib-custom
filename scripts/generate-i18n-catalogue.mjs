/**
 * Generates the translation-key catalogue table inside `docs/guides/I18N_GUIDE.md`
 * from the canonical English bundle (`en.ts`), so the guide can never drift from
 * the actual keys the library ships.
 *
 * The bundle is the single source of truth: keys, their English defaults, and the
 * `{placeholder}` tokens each value interpolates are all read straight from it.
 * Section headings come from the `// ── … ──` comment dividers in `en.ts`.
 *
 * The generated table is written between these markers in the guide:
 *   <!-- AUTO-GENERATED:i18n-keys:start -->
 *   <!-- AUTO-GENERATED:i18n-keys:end -->
 *
 * Run after editing `en.ts`:  node scripts/generate-i18n-catalogue.mjs
 * Verify in CI without writing: node scripts/generate-i18n-catalogue.mjs --check
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EN_PATH = join(ROOT, 'projects/ui-lib-custom/src/lib/i18n/en.ts');
const GUIDE_PATH = join(ROOT, 'docs/guides/I18N_GUIDE.md');

const START_MARKER = '<!-- AUTO-GENERATED:i18n-keys:start -->';
const END_MARKER = '<!-- AUTO-GENERATED:i18n-keys:end -->';

/** Parse `en.ts` into ordered sections of `{ key, value, placeholders }` entries. */
function parseBundle(source) {
  const start = source.indexOf('{');
  const end = source.lastIndexOf('} as const');
  const body = source.slice(start + 1, end);

  // Match either a `// …` section divider or a `'key': '…' | "…"` pair (value may
  // wrap onto the next line, so `\s*` spans newlines between the colon and value).
  const token = /\/\/[^\n]*|'([^']+)'\s*:\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g;
  const sectionRe = /^\/\/\s*[─\-\s]*([^─\n]+?)[─\-\s]*$/;

  const sections = [];
  let current = { title: 'General', entries: [] };

  let match;
  while ((match = token.exec(body)) !== null) {
    const [full, key, rawValue] = match;
    if (key === undefined) {
      // Section divider comment — start a new group when it carries a title.
      const titleMatch = full.match(sectionRe);
      const title = titleMatch ? titleMatch[1].trim() : '';
      if (title && !/eslint|prettier|@/.test(full)) {
        if (current.entries.length > 0) sections.push(current);
        current = { title, entries: [] };
      }
      continue;
    }
    const value = rawValue.slice(1, -1); // strip surrounding quotes
    const placeholders = [...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
    current.entries.push({ key, value, placeholders });
  }
  if (current.entries.length > 0) sections.push(current);
  return sections;
}

/** Render the parsed sections as a Markdown block. */
function renderTable(sections) {
  const total = sections.reduce((sum, s) => sum + s.entries.length, 0);
  const lines = [
    START_MARKER,
    '',
    `> **${total} keys** across ${sections.length} groups. Generated from \`en.ts\` —`,
    '> do not edit by hand. Run `npm run docs:i18n` after editing the bundle.',
  ];

  for (const section of sections) {
    lines.push('', `#### ${section.title}`, '');
    lines.push('| Key | English default | Placeholders |');
    lines.push('| --- | --- | --- |');
    for (const { key, value, placeholders } of section.entries) {
      const ph = placeholders.length ? placeholders.map((p) => `\`{${p}}\``).join(', ') : '—';
      const safeValue = value.replace(/\|/g, '\\|');
      lines.push(`| \`${key}\` | ${safeValue} | ${ph} |`);
    }
  }

  lines.push('', END_MARKER);
  return lines.join('\n');
}

async function main() {
  const check = process.argv.includes('--check');
  const sections = parseBundle(readFileSync(EN_PATH, 'utf-8'));
  const table = renderTable(sections);

  const guide = readFileSync(GUIDE_PATH, 'utf-8');
  const startIdx = guide.indexOf(START_MARKER);
  const endIdx = guide.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1) {
    console.error(
      `✖ Could not find the AUTO-GENERATED markers in ${GUIDE_PATH}.\n` +
        `  Add a block containing:\n  ${START_MARKER}\n  ${END_MARKER}`,
    );
    process.exit(1);
  }

  const spliced = guide.slice(0, startIdx) + table + guide.slice(endIdx + END_MARKER.length);
  // Run the result through Prettier so the written file matches the repo's
  // Markdown formatting (table column alignment) — otherwise lint-staged would
  // reformat it on commit and `--check` could never agree with the file on disk.
  const prettierConfig = await resolveConfig(GUIDE_PATH);
  const updated = await format(spliced, { ...prettierConfig, parser: 'markdown' });

  if (updated === guide) {
    console.log('✅ i18n key catalogue is up to date.');
    return;
  }
  if (check) {
    console.error('✖ i18n key catalogue is stale. Run: npm run docs:i18n');
    process.exit(1);
  }
  writeFileSync(GUIDE_PATH, updated);
  const total = sections.reduce((sum, s) => sum + s.entries.length, 0);
  console.log(`✅ Wrote ${total} keys (${sections.length} groups) to ${GUIDE_PATH}.`);
}

main();
