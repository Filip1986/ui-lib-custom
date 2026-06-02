/**
 * scripts/fill-apg-patterns.mjs
 *
 * One-off script: replaces the `<!-- TODO: add WAI-ARIA APG pattern URL -->` marker
 * in every docs/reference/components/<name>.md with the correct URL.
 *
 * Usage:  node scripts/fill-apg-patterns.mjs
 *
 * Sources:
 *   https://www.w3.org/WAI/ARIA/apg/patterns/
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = resolve(__dirname, '../docs/reference/components');

const APG_BASE = 'https://www.w3.org/WAI/ARIA/apg/patterns';

/** Map from doc filename (no ext) → APG pattern URL or 'decorative' */
const APG_MAP = {
  // ── Form controls ──────────────────────────────────────────────────────────
  button: `${APG_BASE}/button/`,
  checkbox: `${APG_BASE}/checkbox/`,
  'radio-button': `${APG_BASE}/radio/`,
  'select-button': `${APG_BASE}/radio/`, // radio group semantics
  'toggle-button': `${APG_BASE}/button/`,
  'toggle-switch': `${APG_BASE}/switch/`,
  slider: `${APG_BASE}/slider/`,
  rating: `${APG_BASE}/slider/`, // star-rating uses slider/radio semantics
  knob: `${APG_BASE}/slider/`,
  'input-number': `${APG_BASE}/spinbutton/`,
  'input-mask': `${APG_BASE}/combobox/`, // text input with masking; no dedicated APG
  'input-otp': `${APG_BASE}/combobox/`, // OTP input; closest is combobox flow
  input: 'no-dedicated-apg', // plain text input
  textarea: 'no-dedicated-apg',
  password: 'no-dedicated-apg',
  'float-label': 'decorative',

  // ── Selection / picker ─────────────────────────────────────────────────────
  select: `${APG_BASE}/combobox/`,
  autocomplete: `${APG_BASE}/combobox/`,
  'cascade-select': `${APG_BASE}/combobox/`,
  listbox: `${APG_BASE}/listbox/`,
  'tree-select': `${APG_BASE}/combobox/`, // combobox + treeview hybrid
  'date-picker': `${APG_BASE}/dialog-modal/`, // calendar wrapped in dialog
  'color-picker': 'no-dedicated-apg', // no APG pattern; use live-region + label
  'key-filter': 'no-dedicated-apg',
  'input-group': 'no-dedicated-apg',
  'icon-field': 'no-dedicated-apg',
  'float-label': 'decorative',
  password: 'no-dedicated-apg',

  // ── Data display ───────────────────────────────────────────────────────────
  table: `${APG_BASE}/table/`,
  'data-grid': `${APG_BASE}/grid/`,
  'tree-table': `${APG_BASE}/treegrid/`,
  tree: `${APG_BASE}/treeview/`,
  'data-view': 'no-dedicated-apg', // card/list layout, no widget pattern
  'virtual-scroller': 'no-dedicated-apg',
  paginator: 'no-dedicated-apg', // navigation region

  // ── Navigation ─────────────────────────────────────────────────────────────
  tabs: `${APG_BASE}/tabs/`,
  accordion: `${APG_BASE}/accordion/`,
  breadcrumb: `${APG_BASE}/breadcrumb/`,
  menubar: `${APG_BASE}/menubar/`,
  menu: `${APG_BASE}/menu-button/`,
  'tiered-menu': `${APG_BASE}/menubar/`,
  'mega-menu': `${APG_BASE}/menubar/`,
  'context-menu': `${APG_BASE}/menu-button/`,
  'panel-menu': `${APG_BASE}/disclosure/`,
  stepper: `${APG_BASE}/disclosure/`,
  dock: `${APG_BASE}/toolbar/`,
  toolbar: `${APG_BASE}/toolbar/`,

  // ── Overlays & dialogs ─────────────────────────────────────────────────────
  dialog: `${APG_BASE}/dialog-modal/`,
  'dynamic-dialog': `${APG_BASE}/dialog-modal/`,
  'confirm-dialog': `${APG_BASE}/dialog-modal/`,
  'confirm-popup': `${APG_BASE}/dialog-modal/`,
  drawer: `${APG_BASE}/dialog-modal/`,
  'bottom-sheet': `${APG_BASE}/dialog-modal/`,
  popover: `${APG_BASE}/dialog-modal/`,
  tooltip: `${APG_BASE}/tooltip/`,

  // ── Feedback / status ──────────────────────────────────────────────────────
  alert: `${APG_BASE}/alert/`,
  message: `${APG_BASE}/alert/`,
  toast: `${APG_BASE}/alert/`,
  'progress-bar': 'no-dedicated-apg', // uses progressbar role; no APG page
  'progress-spinner': 'no-dedicated-apg',
  skeleton: 'decorative',
  'block-ui': 'no-dedicated-apg',

  // ── Layout & wrappers ──────────────────────────────────────────────────────
  card: 'no-dedicated-apg',
  panel: `${APG_BASE}/disclosure/`,
  fieldset: 'no-dedicated-apg',
  divider: 'decorative',
  'scroll-panel': 'no-dedicated-apg',
  'scroll-top': 'no-dedicated-apg',
  inplace: `${APG_BASE}/disclosure/`,
  'split-button': `${APG_BASE}/menu-button/`,
  'speed-dial': `${APG_BASE}/menu-button/`,

  // ── Media / rich ───────────────────────────────────────────────────────────
  carousel: `${APG_BASE}/carousel/`,
  galleria: `${APG_BASE}/carousel/`,
  image: 'decorative',
  'image-compare': 'no-dedicated-apg',
  avatar: 'decorative',
  icon: 'decorative',
  'icon-button': `${APG_BASE}/button/`,
  upload: 'no-dedicated-apg',
  editor: 'no-dedicated-apg',
  chart: 'no-dedicated-apg',

  // ── Misc display ───────────────────────────────────────────────────────────
  badge: 'decorative',
  tag: 'decorative',
  chip: `${APG_BASE}/button/`, // dismissible chip = button semantics
  timeline: 'no-dedicated-apg',
  'meter-group': 'no-dedicated-apg', // uses meter role
  'order-list': `${APG_BASE}/listbox/`,
  'pick-list': `${APG_BASE}/listbox/`,
  'organization-chart': 'no-dedicated-apg',
  terminal: 'no-dedicated-apg',
  'select-button': `${APG_BASE}/radio/`,
  rating: `${APG_BASE}/radio/`,

  // ── Utility directives ─────────────────────────────────────────────────────
  'animate-on-scroll': 'decorative',
  'auto-focus': 'no-dedicated-apg',
  bind: 'no-dedicated-apg',
  'class-names': 'no-dedicated-apg',
  'focus-trap': 'no-dedicated-apg',
  fluid: 'no-dedicated-apg',
  ripple: 'decorative',
  'style-class': 'no-dedicated-apg',
  'key-filter': 'no-dedicated-apg',

  // ── Additional misc ───────────────────────────────────────────────────────
  'button-group': `${APG_BASE}/toolbar/`,
  'panel-menu': `${APG_BASE}/disclosure/`,
  'input-otp': 'no-dedicated-apg',
};

const TODO_RE = /\*\*APG pattern:\*\* <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->/g;

function apgLabel(value) {
  if (value === 'decorative') return 'Decorative — no APG pattern';
  if (value === 'no-dedicated-apg') return 'No dedicated APG pattern';
  return value;
}

let updated = 0;
let skipped = 0;

import { readdirSync } from 'node:fs';

for (const file of readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))) {
  const name = file.replace(/\.md$/, '').toLowerCase();
  const path = resolve(DOCS_DIR, file);
  const content = readFileSync(path, 'utf8');

  if (!content.includes('<!-- TODO: add WAI-ARIA APG pattern URL')) {
    skipped++;
    continue;
  }

  const apgValue = APG_MAP[name];
  if (!apgValue) {
    console.warn(`  ⚠️  No APG mapping for "${name}" — leaving TODO`);
    skipped++;
    continue;
  }

  const replacement = `**APG pattern:** ${apgLabel(apgValue)}`;
  const newContent = content.replace(TODO_RE, replacement);
  writeFileSync(path, newContent, 'utf8');
  console.log(`  ✓ ${file}  →  ${apgLabel(apgValue)}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
