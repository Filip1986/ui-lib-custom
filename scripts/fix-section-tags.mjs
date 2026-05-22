/**
 * Fixes HTML files where the migration script converted </section> → </app-doc-section>
 * globally, but left <section id="X"> opening tags unconverted.
 *
 * Uses a token + stack approach to:
 *   1. Convert remaining <section id="X"...> to <app-doc-section id="X" title="TITLE">
 *   2. Revert wrongly-converted </app-doc-section> back to </section> for sections
 *      that have no id (e.g. layout wrappers like <section class="doc-demo rtl-demo">)
 *   3. Convert any </section> that pairs with a converted section (for fully un-touched files)
 *
 * Run from repo root: node scripts/fix-section-tags.mjs [--dry-run]
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

const AFFECTED_FILES = [
  'projects/demo/src/app/pages/buttons/buttons.component.html',
  'projects/demo/src/app/pages/cascade-select/cascade-select-demo.component.html',
  'projects/demo/src/app/pages/chart/chart-demo.component.html',
  'projects/demo/src/app/pages/color-picker/color-picker-demo.component.html',
  'projects/demo/src/app/pages/data-view/data-view-demo.component.html',
  'projects/demo/src/app/pages/date-picker/date-picker-demo.component.html',
  'projects/demo/src/app/pages/dialog/dialog.component.html',
  'projects/demo/src/app/pages/editor/editor-demo.component.html',
  'projects/demo/src/app/pages/icon-field/icon-field-demo.component.html',
  'projects/demo/src/app/pages/input-group/input-group-demo.component.html',
  'projects/demo/src/app/pages/input-mask/input-mask-demo.component.html',
  'projects/demo/src/app/pages/input-number/input-number-demo.component.html',
  'projects/demo/src/app/pages/input-otp/input-otp-demo.component.html',
  'projects/demo/src/app/pages/key-filter/key-filter-demo.component.html',
  'projects/demo/src/app/pages/knob/knob-demo.component.html',
  'projects/demo/src/app/pages/listbox/listbox-demo.component.html',
  'projects/demo/src/app/pages/slider/slider-demo.component.html',
  'projects/demo/src/app/pages/syntax-highlighter/syntax-highlighter-demo.component.html',
  'projects/demo/src/app/pages/tabs/tabs.component.html',
  'projects/demo/src/app/pages/textarea/textarea-demo.component.html',
  'projects/demo/src/app/pages/toggle-button/toggle-button-demo.component.html',
  'projects/demo/src/app/pages/tree-select/tree-select-demo.component.html',
];

function titleFromId(id) {
  const overrides = {
    api: 'API Reference',
    'api-reference': 'API Reference',
    'css-vars': 'CSS Custom Properties',
    'css-custom-properties': 'CSS Custom Properties',
    accessibility: 'Accessibility',
    a11y: 'Accessibility',
    keyboard: 'Keyboard Navigation',
    'keyboard-navigation': 'Keyboard Navigation',
    'rtl': 'RTL Support',
    'glass-shadow': 'Glass Shadow',
    framed: 'Framed',
  };
  if (overrides[id]) return overrides[id];
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildTitleMap(src) {
  const map = {};
  const sectionRe = /<section\b[^>]*\bid="([^"]+)"[^>]*>/g;
  let m;
  while ((m = sectionRe.exec(src)) !== null) {
    const id = m[1];
    if (map[id]) continue;
    const pos = m.index + m[0].length;
    const window = src.slice(pos, pos + 500);
    const heading = window.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/);
    if (heading) {
      let title = heading[1]
        .replace(/<[^>]+>/g, '')
        .trim()
        .replace(/^\d+\.\s+/, '')   // "1. Basic" → "Basic"
        .replace(/^[a-zA-Z]\.\s+/, '');  // "a. Basic" → "Basic"
      if (title) {
        map[id] = title;
        continue;
      }
    }
    map[id] = titleFromId(id);
  }
  return map;
}

function fixHtml(src) {
  const titleMap = buildTitleMap(src);

  // Tokenise: split on <section>, </section>, <app-doc-section>, </app-doc-section>
  const tokens = [];
  const tagRe = /<\/?(?:section|app-doc-section)\b[^>]*>/g;
  let lastIndex = 0;
  let match;

  while ((match = tagRe.exec(src)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: src.slice(lastIndex, match.index) });
    }
    const tag = match[0];
    if (tag.startsWith('</section')) {
      tokens.push({ type: 'section-close' });
    } else if (tag.startsWith('</app-doc-section')) {
      tokens.push({ type: 'ads-close' });
    } else if (tag.startsWith('<app-doc-section')) {
      tokens.push({ type: 'ads-open', value: tag });
    } else {
      // <section ...>
      const idMatch = tag.match(/\bid="([^"]+)"/);
      tokens.push({ type: 'section-open', id: idMatch?.[1] ?? null, value: tag });
    }
    lastIndex = match.index + tag.length;
  }
  if (lastIndex < src.length) {
    tokens.push({ type: 'text', value: src.slice(lastIndex) });
  }

  // Process tokens with a stack to emit correct output
  const stack = []; // each entry: 'ads' | { kind: 'id', id } | { kind: 'no-id' }
  const output = [];

  for (const tok of tokens) {
    switch (tok.type) {
      case 'text':
        output.push(tok.value);
        break;

      case 'ads-open':
        stack.push('ads');
        output.push(tok.value);
        break;

      case 'section-open':
        if (tok.id) {
          const title = titleMap[tok.id] ?? titleFromId(tok.id);
          stack.push({ kind: 'id', id: tok.id });
          output.push(`<app-doc-section id="${tok.id}" title="${title}">`);
        } else {
          stack.push({ kind: 'no-id' });
          output.push(tok.value);
        }
        break;

      case 'ads-close': {
        const top = stack.pop();
        if (top && top !== 'ads' && top.kind === 'no-id') {
          // A no-id section whose </section> was wrongly converted → revert
          output.push('</section>');
        } else {
          output.push('</app-doc-section>');
        }
        break;
      }

      case 'section-close': {
        const top = stack.pop();
        if (top && top !== 'ads' && top.kind === 'id') {
          // A section-with-id whose </section> was NOT yet converted → convert
          output.push('</app-doc-section>');
        } else {
          output.push('</section>');
        }
        break;
      }
    }
  }

  return output.join('');
}

let fixedCount = 0;
let skippedCount = 0;

for (const rel of AFFECTED_FILES) {
  const filePath = join(__dirname, '..', rel);
  let src;
  try {
    src = readFileSync(filePath, 'utf8');
  } catch {
    console.log(`⚠  File not found: ${rel}`);
    skippedCount++;
    continue;
  }

  // Only process files that have plain <section (opening, not closing) tags remaining
  if (!/<section[\s>]/.test(src)) {
    console.log(`⏭  No plain sections: ${rel}`);
    skippedCount++;
    continue;
  }

  const fixed = fixHtml(src);
  if (fixed === src) {
    console.log(`⏭  No change: ${rel}`);
    skippedCount++;
    continue;
  }

  console.log(`✅ Fixed: ${rel}`);
  if (!DRY_RUN) {
    writeFileSync(filePath, fixed, 'utf8');
  }
  fixedCount++;
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`Fixed: ${fixedCount}  |  Skipped: ${skippedCount}`);
if (DRY_RUN) console.log('\n[DRY RUN — no files written]');
