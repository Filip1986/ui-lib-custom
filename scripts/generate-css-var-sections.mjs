/**
 * Generates CSS Custom Properties sections across all demo pages.
 *
 * For each library component that has --uilib-* variables in its SCSS:
 *   1. Extracts variable names and generates human-readable descriptions
 *   2. Finds the matching demo page
 *   3. Injects cssVarRows data + DocCssVarsTableComponent import into the TS
 *   4. Adds { id: 'css-vars', title: 'CSS Custom Properties' } to sections[]
 *   5. Injects <app-doc-section id="css-vars"> block into the HTML
 *
 * Already-migrated pages (those with id="css-vars") are skipped.
 *
 * Run:           node scripts/generate-css-var-sections.mjs
 * Dry-run:       node scripts/generate-css-var-sections.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

const LIB_DIR = join(__dirname, '../projects/ui-lib-custom/src/lib');
const PAGES_DIR = join(__dirname, '../projects/demo/src/app/pages');

// ─── Components to skip (no visual CSS vars or no demo page) ─────────────────

const SKIP_COMPONENTS = new Set([
  'a11y', 'animate-on-scroll', 'auto-focus', 'bind', 'class-names',
  'core', 'design-tokens.ts', 'fluid', 'focus-trap', 'form-field',
  'layout', 'styles', 'style-class', 'testing', 'themes', 'theming',
  'terminal', 'virtual-scroller', 'ui-lib-custom.spec.ts', 'ui-lib-custom.ts',
]);

// System-level CSS variable prefixes — skip these when found in component SCSS
const SYSTEM_PREFIXES = [
  '--uilib-color-', '--uilib-surface', '--uilib-spacing-', '--uilib-radius-',
  '--uilib-shadow-', '--uilib-font-', '--uilib-page-', '--uilib-transition-',
  '--uilib-z-', '--uilib-space-', '--uilib-shape-', '--uilib-muted',
  '--uilib-focus-', '--uilib-text-border-',
];

// Lib folder → demo page folder overrides (where names differ)
const DEMO_FOLDER_MAP = {
  'button': 'buttons',
  'card': 'cards',
  'checkbox': 'checkboxes',
  'badge': 'badges',
  'select-button': 'select-buttons',
  'galleria': 'gallery',
};

// ─── Description generator ───────────────────────────────────────────────────

// Property-path → readable English (matched against the part AFTER stripping
// the component prefix and any trailing size/state/variant suffixes).
const PROP_DESCRIPTIONS = {
  // Colour / background
  'bg': 'Background colour',
  'color': 'Text colour',
  'fill': 'Fill colour',
  'fill-color': 'Fill colour',
  'track-color': 'Track colour',
  'overlay-bg': 'Overlay background',
  'backdrop': 'Backdrop',

  // Borders
  'border': 'Border shorthand',
  'border-color': 'Border colour',
  'border-radius': 'Border radius',
  'border-width': 'Border width',
  'border-style': 'Border style',
  'radius': 'Border radius',

  // Spacing
  'padding': 'Padding',
  'padding-y': 'Vertical padding',
  'padding-x': 'Horizontal padding',
  'padding-top': 'Top padding',
  'padding-bottom': 'Bottom padding',
  'padding-start': 'Inline-start padding',
  'gap': 'Gap',
  'margin': 'Margin',
  'offset': 'Offset',
  'indent': 'Indent',

  // Typography
  'font-size': 'Font size',
  'font-weight': 'Font weight',
  'font-family': 'Font family',
  'line-height': 'Line height',
  'letter-spacing': 'Letter spacing',
  'text-transform': 'Text transform',

  // Dimensions
  'width': 'Width',
  'height': 'Height',
  'size': 'Size',
  'min-width': 'Minimum width',
  'max-width': 'Maximum width',
  'min-height': 'Minimum height',
  'max-height': 'Maximum height',
  'thumb-size': 'Thumb size',
  'track-height': 'Track height',
  'track-width': 'Track width',

  // Effects
  'shadow': 'Box shadow',
  'transition': 'Transition',
  'opacity': 'Opacity',
  'z-index': 'Z-index',

  // Focus / accessibility
  'outline': 'Focus outline',
  'outline-offset': 'Focus outline offset',
  'outline-color': 'Focus outline colour',
  'focus-ring': 'Focus ring',
  'focus-ring-color': 'Focus ring colour',
  'focus-ring-width': 'Focus ring width',
  'focus-color': 'Focus colour',
  'focus-outline': 'Focus outline',
  'focus-shadow': 'Focus shadow',

  // Interactive states
  'cursor': 'Cursor',
  'disabled-opacity': 'Disabled opacity',

  // Sub-element patterns
  'arrow-size': 'Arrow size',
  'arrow-color': 'Arrow colour',
  'badge-bg': 'Badge background colour',
  'badge-color': 'Badge text colour',
  'badge-size': 'Badge size',
  'badge-font-size': 'Badge font size',
  'check-color': 'Checkmark colour',
  'check-bg': 'Checkmark background',
  'close-color': 'Close button colour',
  'close-size': 'Close button size',
  'dot-size': 'Dot size',
  'dot-color': 'Dot colour',
  'enter-duration': 'Enter animation duration',
  'enter-easing': 'Enter animation easing',
  'exit-duration': 'Exit animation duration',
  'exit-easing': 'Exit animation easing',
  'fill-transition': 'Fill transition',
  'handle-bg': 'Handle background colour',
  'handle-border': 'Handle border',
  'handle-border-radius': 'Handle border radius',
  'handle-shadow': 'Handle shadow',
  'handle-hover-scale': 'Handle hover scale factor',
  'header-bg': 'Header background colour',
  'header-color': 'Header text colour',
  'header-font-size': 'Header font size',
  'header-font-weight': 'Header font weight',
  'header-padding': 'Header padding',
  'icon-color': 'Icon colour',
  'icon-size': 'Icon size',
  'image-size': 'Image size',
  'indicator-color': 'Active indicator colour',
  'indicator-size': 'Active indicator size',
  'label-color': 'Label colour',
  'label-font-size': 'Label font size',
  'overlay-border-radius': 'Overlay border radius',
  'overlay-padding': 'Overlay padding',
  'overlay-shadow': 'Overlay shadow',
  'remove-bg': 'Remove button background colour',
  'remove-bg-hover': 'Remove button hover background colour',
  'remove-color': 'Remove button icon colour',
  'stripe-bg': 'Stripe background colour',
  'thumb-bg': 'Thumb background colour',
  'thumb-border': 'Thumb border',
  'title-color': 'Title text colour',
  'title-font-size': 'Title font size',
  'title-font-weight': 'Title font weight',
  'toggle-color': 'Toggle icon colour',
  'toggle-hover-bg': 'Toggle hover background colour',
  'toggle-size': 'Toggle button size',
  'track-bg': 'Track background colour',
  'track-border-radius': 'Track border radius',
  'track-shadow': 'Track shadow',
  'track-transition': 'Track transition',
  'content-bg': 'Content background colour',
  'content-color': 'Content text colour',
  'content-padding': 'Content area padding',
  'footer-bg': 'Footer background colour',
  'footer-color': 'Footer text colour',
  'footer-padding': 'Footer padding',
  'header-border-color': 'Header border colour',
  'item-bg': 'Item background colour',
  'item-color': 'Item text colour',
  'item-font-size': 'Item font size',
  'item-font-weight': 'Item font weight',
  'item-gap': 'Item gap',
  'item-padding': 'Item padding',
  'item-radius': 'Item border radius',
  'item-shadow': 'Item box shadow',
  'panel-bg': 'Panel background colour',
  'panel-border-color': 'Panel border colour',
  'panel-border-radius': 'Panel border radius',
  'panel-shadow': 'Panel box shadow',
};

// State / size / variant suffixes — checked from the END of the property path
// Order matters: longer/more-specific patterns must come before shorter ones
const SUFFIX_ORDER = [
  ['-material', ' — material variant'],
  ['-bootstrap', ' — bootstrap variant'],
  ['-minimal', ' — minimal variant'],
  ['-hover', ' (hover)'],
  ['-focus', ' (focus)'],
  ['-active', ' (active)'],
  ['-disabled', ' (disabled)'],
  ['-checked', ' (checked)'],
  ['-selected', ' (selected)'],
  ['-error', ' (error)'],
  ['-invalid', ' (invalid)'],
  ['-open', ' (open)'],
  ['-expanded', ' (expanded)'],
  ['-filled', ' (filled)'],
  ['-pressed', ' (pressed)'],
  ['-large', ' — lg'],
  ['-medium', ' — md'],
  ['-small', ' — sm'],
  ['-lg', ' — lg'],
  ['-md', ' — md'],
  ['-sm', ' — sm'],
];

/**
 * Converts a CSS variable name to a human-readable description.
 * @param {string} varName   Full variable name, e.g. "--uilib-chip-font-size-sm"
 * @param {string} compName  Library component folder name, e.g. "chip"
 */
function describeVar(varName, compName) {
  // Strip exactly the component prefix (e.g. "--uilib-chip-")
  const prefix = `--uilib-${compName}-`;
  let prop = varName.startsWith(prefix) ? varName.slice(prefix.length) : varName;

  // Strip known suffixes from the end
  let suffix = '';
  for (const [key, label] of SUFFIX_ORDER) {
    if (prop.endsWith(key)) {
      prop = prop.slice(0, -key.length);
      suffix = label;
      break;
    }
  }

  // 1. Exact match in property map
  if (PROP_DESCRIPTIONS[prop]) {
    return PROP_DESCRIPTIONS[prop] + suffix;
  }

  // 2. Sub-element: split off the last segment and look up as property
  //    e.g. "header-bg" → subEl="header", lastProp="bg" → "Header background colour"
  const parts = prop.split('-').filter(Boolean);
  if (parts.length >= 2) {
    const lastProp = parts.slice(-1)[0];
    const subEl = parts.slice(0, -1).join('-');
    if (PROP_DESCRIPTIONS[lastProp]) {
      const subLabel = subEl.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
      return `${subLabel} ${PROP_DESCRIPTIONS[lastProp].toLowerCase()}${suffix}`;
    }
    // 3. Try the last two segments as the property key
    //    e.g. "header-font-size" → subEl2="header", lastTwo="font-size"
    if (parts.length >= 3) {
      const lastTwoProp = parts.slice(-2).join('-');
      const subEl2 = parts.slice(0, -2).join('-');
      if (PROP_DESCRIPTIONS[lastTwoProp]) {
        const subLabel2 = subEl2.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
        return `${subLabel2} ${PROP_DESCRIPTIONS[lastTwoProp].toLowerCase()}${suffix}`;
      }
    }
  }

  // 4. Fallback: title-case the kebab path
  return prop.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ') + suffix;
}

// ─── SCSS variable extractor ─────────────────────────────────────────────────

function extractCssVars(scssContent, compName) {
  const vars = new Map(); // name → first occurrence (deduplicate)

  // Match CSS custom property declarations: --uilib-*: value;
  // The property name ends at the colon; we don't need the value.
  const re = /^\s*(--uilib-[a-z][a-z0-9-]*):/gm;
  let match;

  while ((match = re.exec(scssContent)) !== null) {
    const name = match[1];
    // Skip system tokens
    if (SYSTEM_PREFIXES.some((p) => name.startsWith(p))) continue;
    if (!vars.has(name)) {
      vars.set(name, { variable: name, description: describeVar(name, compName) });
    }
  }

  return [...vars.values()];
}

// ─── Demo page finder ─────────────────────────────────────────────────────────

function findDemoPage(libFolder) {
  const candidates = [
    DEMO_FOLDER_MAP[libFolder] ?? libFolder,
    libFolder + 's',            // button → buttons (fallback)
    libFolder.replace(/-/g, ''), // select-button → selectbutton (not useful but harmless)
  ];

  for (const candidate of candidates) {
    const dir = join(PAGES_DIR, candidate);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;

    // Find the main .component.ts (not example files)
    const files = readdirSync(dir).filter(
      (f) => f.endsWith('.component.ts') && !f.includes('example') && !f.includes('spec'),
    );
    if (files.length === 0) continue;

    // Prefer the file named *-demo.component.ts, otherwise take the first match
    const ts = files.find((f) => f.includes('demo')) ?? files[0];
    const html = ts.replace('.ts', '.html');

    return {
      folder: candidate,
      tsPath: join(dir, ts),
      htmlPath: join(dir, html),
    };
  }
  return null;
}

// ─── TS injector ─────────────────────────────────────────────────────────────

const TS_IMPORT_LINE =
  `import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';`;
const TS_TYPE_IMPORT_LINE =
  `import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';`;

function injectTs(src, vars) {
  let result = src;

  // ── 1. Import statements ────────────────────────────────────────────────
  if (!result.includes('DocCssVarsTableComponent')) {
    // Only scan the preamble (before the first @Component or export class) so
    // we don't accidentally match import statements inside template-string literals.
    const preambleEnd =
      Math.min(
        result.indexOf('@Component(') !== -1 ? result.indexOf('@Component(') : Infinity,
        result.indexOf('export class') !== -1 ? result.indexOf('export class') : Infinity,
      );
    const preamble = preambleEnd < Infinity ? result.slice(0, preambleEnd) : result;

    const importRe = /^import(?:\s+type)?\s+[\s\S]*?from\s+['"][^'"]+['"];/gm;
    let lastEnd = -1;
    let m;
    while ((m = importRe.exec(preamble)) !== null) {
      lastEnd = m.index + m[0].length;
    }
    if (lastEnd !== -1) {
      result =
        result.slice(0, lastEnd) +
        '\n' + TS_IMPORT_LINE +
        '\n' + TS_TYPE_IMPORT_LINE +
        result.slice(lastEnd);
    }
  }

  // ── 2. imports: [ array — add DocCssVarsTableComponent ─────────────────
  if (result.includes('DocCssVarsTableComponent') && !result.match(/imports:\s*\[[\s\S]*?DocCssVarsTableComponent/)) {
    // Find the MAIN @Component by stripping template-string literals first so
    // that fake `@Component(` patterns inside snippet strings are ignored.
    const stripped = result.replace(/`[\s\S]*?`/g, (m) => ' '.repeat(m.length));
    const lastComponentIdx = stripped.lastIndexOf('@Component(');
    if (lastComponentIdx !== -1) {
      const afterDecorator = result.slice(lastComponentIdx);
      const importArrayMatch = afterDecorator.match(/\bimports:\s*\[([\s\S]*?)\]/);
      if (importArrayMatch) {
        const insertPos = lastComponentIdx + importArrayMatch.index + importArrayMatch[0].length - 1;
        const comma = importArrayMatch[1].trim().endsWith(',') ? '' : ',';
        result =
          result.slice(0, insertPos) +
          `${comma}\n    DocCssVarsTableComponent,\n  ` +
          result.slice(insertPos);
      }
    }
  }

  // ── 3. cssVarRows property — add before class closing } ────────────────
  if (!result.includes('cssVarRows')) {
    const rowsTs = vars
      .map(({ variable, description }) => `    { variable: '${variable}', description: '${description}.' },`)
      .join('\n');
    const property =
      `\n  public readonly cssVarRows: CssVarRow[] = [\n${rowsTs}\n  ];\n`;

    // Find the last top-level `}` (class closing brace)
    const lastBrace = result.lastIndexOf('\n}');
    if (lastBrace !== -1) {
      result = result.slice(0, lastBrace) + property + result.slice(lastBrace);
    }
  }

  // ── 4. sections array — add css-vars entry before api ──────────────────
  if (!result.includes("id: 'css-vars'")) {
    // Insert before "{ id: 'api'" or "{ id: 'keyboard'" — whichever comes first
    const anchors = ["{ id: 'api'", "{ id: 'keyboard'", ']; // end of sections'];
    for (const anchor of anchors) {
      const idx = result.indexOf(anchor);
      if (idx !== -1) {
        const indent = result.slice(Math.max(0, idx - 4), idx).match(/^\s*/)?.[0] ?? '    ';
        result =
          result.slice(0, idx) +
          `{ id: 'css-vars', label: 'CSS Custom Properties' },\n${indent}` +
          result.slice(idx);
        break;
      }
    }
  }

  return result;
}

// ─── HTML injector ───────────────────────────────────────────────────────────

const HTML_SECTION = `
  <!-- ── CSS Custom Properties ─────────────────────────────────────────── -->
  <app-doc-section
    id="css-vars"
    title="CSS Custom Properties"
    description="Override any of these on the host element or an ancestor to theme the component without touching its internals."
  >
    <app-doc-css-vars-table [rows]="cssVarRows" [showDefault]="false" />
  </app-doc-section>
`;

function injectHtml(src) {
  // Insert before the quality badge, rail div, or closing page-layout tag
  const anchors = [
    '<app-doc-quality-badge',
    '<div class="demo-page-rail"',
    '</app-doc-page-layout>',
  ];

  for (const anchor of anchors) {
    const idx = src.indexOf(anchor);
    if (idx !== -1) {
      return src.slice(0, idx) + HTML_SECTION + src.slice(idx);
    }
  }

  return src; // nothing matched — return unchanged
}

// ─── Main loop ───────────────────────────────────────────────────────────────

let processed = 0;
let skipped = 0;
const warnings = [];

const libFolders = readdirSync(LIB_DIR).filter((name) => {
  if (SKIP_COMPONENTS.has(name)) return false;
  const full = join(LIB_DIR, name);
  return statSync(full).isDirectory();
});

for (const libFolder of libFolders) {
  const scssPath =
    existsSync(join(LIB_DIR, libFolder, `${libFolder}.scss`))
      ? join(LIB_DIR, libFolder, `${libFolder}.scss`)
      : existsSync(join(LIB_DIR, libFolder, `${libFolder}.component.scss`))
        ? join(LIB_DIR, libFolder, `${libFolder}.component.scss`)
        : null;
  if (!scssPath) {
    skipped++;
    continue;
  }

  const scss = readFileSync(scssPath, 'utf8');
  const vars = extractCssVars(scss, libFolder);

  if (vars.length === 0) {
    skipped++;
    continue;
  }

  const demo = findDemoPage(libFolder);
  if (!demo) {
    warnings.push(`⚠  No demo page found for lib component: ${libFolder}`);
    skipped++;
    continue;
  }

  if (!existsSync(demo.htmlPath)) {
    warnings.push(`⚠  HTML not found: ${demo.htmlPath}`);
    skipped++;
    continue;
  }

  const htmlSrc = readFileSync(demo.htmlPath, 'utf8');

  // Skip if already has the section or isn't a doc-page-layout page
  if (htmlSrc.includes('id="css-vars"')) {
    skipped++;
    continue;
  }
  if (!htmlSrc.includes('app-doc-page-layout') && !htmlSrc.includes('app-doc-section')) {
    warnings.push(`⚠  ${demo.folder}: not a standard doc-page — skip`);
    skipped++;
    continue;
  }

  const tsSrc = readFileSync(demo.tsPath, 'utf8');

  const newTs = injectTs(tsSrc, vars);
  const newHtml = injectHtml(htmlSrc);

  const tsChanged = newTs !== tsSrc;
  const htmlChanged = newHtml !== htmlSrc;

  if (!tsChanged && !htmlChanged) {
    warnings.push(`⚠  ${demo.folder}: nothing injected (check manually)`);
    skipped++;
    continue;
  }

  console.log(`✅ ${demo.folder} (${vars.length} vars)`);

  if (!DRY_RUN) {
    if (tsChanged) writeFileSync(demo.tsPath, newTs, 'utf8');
    if (htmlChanged) writeFileSync(demo.htmlPath, newHtml, 'utf8');
  }

  processed++;
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`Processed: ${processed}  |  Skipped: ${skipped}`);
if (warnings.length) {
  console.log(`\nWarnings:`);
  warnings.forEach((w) => console.log(w));
}
if (DRY_RUN) console.log('\n[DRY RUN — no files written]');
