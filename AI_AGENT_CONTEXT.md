# AI Agent Context

> Active session context only.
> Stable architecture, conventions, and workflows live in `AGENTS.md`.
> Historical handoffs live in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

---

## Purpose and Scope

Use this file for:
- Current focus, queue, and blockers
- Quick status deltas for in-flight components/docs
- Recent handoffs (latest 1-3 sessions)

Do not duplicate stable project rules here; link to `AGENTS.md` instead.

---

## Active Session State

- **Current milestone:** Component foundation hardening + documentation completeness
- **Active focus:** MegaMenu accessibility hardening COMPLETE (6-phase, #16); next is Tabs (#17)
- **Next queue:** Tabs hardening (Tier 2, #17) — role=tablist/tab/tabpanel, arrow nav, aria-selected
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [MegaMenu component — 6-phase Hardening COMPLETE (#16)]
Changed:
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.ts
      • Added module-level `let nextMegaMenuId: number = 0` counter
      • Added `menuId`, `panelId` public readonly strings for ARIA wiring
      • Added `rovingIndex: WritableSignal<number>` for root-level roving tabindex
      • Added `panelOpened: OutputEmitterRef<MegaMenuItem>` and `panelClosed: OutputEmitterRef<void>` outputs
      • Added `getRootTabIndex(item, index): string` for template tabindex binding
      • Added `getRootItemClass(item, index): string` to clean up template class logic
      • Updated `onTopItemClick` to set rovingIndex, emit panelOpened/panelClosed
      • Updated `onTopItemKeyDown`: ArrowRight/Left navigate root items; ArrowDown/Up for vertical;
        Home/End; all paths set rovingIndex; Enter/Space focus first panel item via afterNextRender
      • Updated `onSubItemKeyDown`: ArrowUp/Down within column, ArrowLeft/Right between columns, Escape restores focus
      • Updated click-outside handler to call `closePanel(false)` (no focus restore)
      • Updated global Escape handler to call `closePanel(true)` (restore focus)
      • Updated `closePanel(returnFocus=true)`: restores focus to triggering root link on keyboard close
      • Added `focusRootItem(index)`: sets rovingIndex + calls `.focus()` with wrap-around
      • Added `focusPanelItemInDirection(direction, fromEl)`: column-aware panel keyboard nav
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.html
      • CRITICAL: `aria-haspopup="true"` → `aria-haspopup="menu"` (correct WAI-ARIA value)
      • CRITICAL: Added `[attr.aria-orientation]="orientation()"` to root `<ul role="menubar">`
      • CRITICAL: Added `[attr.aria-controls]="item.items?.length ? panelId : null"` on root links
      • CRITICAL: Added `[attr.id]="panelId"` on mega panel `<div>`
      • CRITICAL: Added `[attr.aria-label]="item.label ? (item.label + ' submenu') : null"` on panel
      • CRITICAL: Added `[attr.aria-label]="column.header || null"` on column `<ul role="menu">`
      • Changed root link tabindex from `item.disabled ? '-1' : '0'` to `getRootTabIndex(item, $index)`
      • Replaced duplicate `@if (item.url)` / `@else` <a> blocks with single `<a [href]="...">` pattern
      • Replaced messy `[class]`/`[class.x]`/`class` combination on `<li>` with `[class]="getRootItemClass(...)"`
      • Fixed `track $index` in `@for` loops to track by label/header
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.scss
      • Added `@media (prefers-reduced-motion: reduce)` block with `--uilib-mega-menu-transition: 0ms`
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.a11y.spec.ts (CREATED — 44 tests)
      • Nav landmark, menubar ARIA structure, aria-controls/panelId wiring
      • Mega panel: aria-label, column role="menu" + aria-label, sub-item ARIA
      • Roving tabindex: default first, ArrowRight/Left/Home/End move tab stop
      • Panel keyboard nav: ArrowDown/Up within column, ArrowRight/Left between columns
      • Focus restore: Escape from sub-item returns focus to triggering root item
      • panelOpened output: subscription test
      • axe-core: empty, closed, Products panel open, Company panel open
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.spec.ts
      • Updated `aria-haspopup` test expectation from `'true'` to `'menu'` (correct value)
  - projects/ui-lib-custom/src/lib/mega-menu/README.md
      • Added MegaMenuSubColumn / MegaMenuSubItem tables, public API table, ARIA pattern table,
        keyboard nav table, column aria-label guidance
  - docs/COMPONENT_SCORES.md
      • MegaMenu: ⏳ Queued → ✅ Done; score row 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: MegaMenu fully hardened. 95 tests pass (51 unit + 44 a11y). Build clean.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/mega-menu/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=mega-menu --no-coverage (95/95 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for all CLI tools; npm install required first.
Next step: Tabs hardening (Tier 2, #17) — role=tablist/tab/tabpanel, arrow nav, aria-selected.
Date: 2026-05-11 [InputNumber component — Phase 3 Accessibility Hardening COMPLETE (#26)]
Changed:
  - projects/ui-lib-custom/src/lib/input-number/input-number.component.ts
      • Added `label` signal input (used in spinner button aria-labels: "Increment {label}")
      • Added `required` signal input — sets `aria-required="true"` on the inner input
      • Added `formattedValue` computed signal — reactive `aria-valuetext` from `value()` + `numberFormatConfig()`
      • Input element: added `[attr.aria-valuetext]`, `[attr.aria-required]`, `[attr.aria-invalid]`
      • All spinner buttons: replaced `[disabled]` with `[attr.aria-disabled]` + `[attr.aria-label]`
      • Added `onSpinKeyDown(event, direction)` handler — Enter/Space activates spinner buttons from keyboard
      • Updated `onSpinMouseDown` — guards against disabled/at-min/at-max states explicitly
  - projects/ui-lib-custom/src/lib/input-number/input-number.component.scss
      • Updated `:hover/:active` button selectors to also exclude `[aria-disabled='true']`
      • Added `[aria-disabled='true']` selector for disabled button styles
      • Added `@media (prefers-reduced-motion: reduce)` — sets `--uilib-input-number-transition: none`
  - projects/ui-lib-custom/src/lib/input-number/input-number.a11y.spec.ts (CREATED — 27 tests)
      • role=spinbutton, aria-valuenow, aria-valuemin/max, aria-valuetext, aria-label/labelledby
      • aria-required, aria-invalid, button type=button, button aria-labels (Increment/Decrement)
      • aria-disabled on buttons at min/max/disabled; keyboard nav (ArrowUp/Down, PageUp/Down, Home/End)
      • axe-core: default, at-min, at-max, invalid states
  - projects/ui-lib-custom/src/lib/input-number/input-number.component.spec.ts
      • Updated "buttons disabled when at boundary" test to check aria-disabled attribute
  - projects/ui-lib-custom/src/lib/input-number/README.md
      • Added `label` and `required` inputs to the inputs table
      • Added Keyboard Navigation table (ArrowUp/Down, PageUp/Down, Home/End)
      • Added Accessibility section: aria-valuetext format table, spinner button label pattern, aria-disabled note
  - docs/COMPONENT_SCORES.md
      • InputNumber: ⏳ Queued → ✅ Done; score row 9.0/10 avg 🟢
State: InputNumber Phase 3 (Accessibility) complete. 27 a11y tests + 119 existing tests all pass.
  Next queue item: Slider (#27) — role=slider, aria-valuenow/min/max/valuetext, arrow key step.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/input-number/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=input-number --no-coverage (146/146 PASS — 119 unit + 27 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors, zero warnings)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  npm run typecheck (PASS via pre-push hook)
Terminal notes: node_modules/.bin/eslint works after npm install. npx eslint tries to install
  a new version which fails. Always use node_modules/.bin/ prefix for all CLI tools.
Next step: Slider (#27) — role=slider, aria-valuenow/min/max/valuetext, arrow key step.
Date: 2026-05-11 [ColorPicker component — Phase 3 Accessibility Hardening COMPLETE (#28)]
Changed:
  - projects/ui-lib-custom/src/lib/color-picker/color-picker.constants.ts
      • Added HexInputSuffix, HueInputSuffix, SatInputSuffix, BrightInputSuffix to COLOR_PICKER_IDS
  - projects/ui-lib-custom/src/lib/color-picker/color-picker.ts
      • Added hexInputId, hueInputId, satInputId, brightInputId computed signals
      • Added hexDisplayValue computed signal (6-char hex without '#' for hex input binding)
      • Added onHexInputChange, onHueInputChange, onSatInputChange, onBrightInputChange handlers
  - projects/ui-lib-custom/src/lib/color-picker/color-picker.html
      • CRITICAL: Trigger — added aria-haspopup="dialog"; updated aria-label to 'Color: {hex}, click to open picker'
      • CRITICAL: Panel — added role="dialog", aria-label="Color picker", aria-modal="false"
      • CRITICAL: Color area — added aria-hidden="true", changed tabindex to static "-1"
      • CRITICAL: Hue slider — added role="slider", aria-label="Hue", aria-valuemin/max/now/text
      • NEW: Controls wrapper div (ui-lib-colorpicker__controls) for flex row layout
      • NEW: Keyboard-accessible inputs section with hex text input + H/S/B number inputs, all with associated <label> elements
  - projects/ui-lib-custom/src/lib/color-picker/color-picker.scss
      • Panel changed from flex-row to flex-column; added .ui-lib-colorpicker__controls flex row
      • Added styles for .ui-lib-colorpicker__inputs, __input-row, __input-group, __input-label,
        __text-input, __number-input (focus rings, compact sizing, spinner removal)
  - projects/ui-lib-custom/src/lib/color-picker/color-picker.a11y.spec.ts (CREATED — 30 tests)
      • Trigger: type=button, aria-haspopup=dialog, aria-label contains color, aria-expanded
      • Panel: role=dialog, aria-label="Color picker", aria-modal=false
      • Color area: aria-hidden=true, tabindex=-1
      • Hue slider: role=slider, aria-label, aria-valuemin/max/now/text
      • Hex input: label associated via for/id; value is 6-char hex
      • H/S/B inputs: all labels associated; values in correct ranges
      • Escape: closes picker, restores focus to trigger
      • axe-core: closed state, open state, inline mode — all pass
  - projects/ui-lib-custom/src/lib/color-picker/README.md
      • Added Keyboard Access section, Supported Formats table
  - docs/COMPONENT_SCORES.md
      • ColorPicker: ⏳ Queued → ✅ Done; score row 8.2/10 avg 🟢
State: ColorPicker Phase 3 (Accessibility) complete. 30 a11y tests + 55 existing tests all pass.
  Next queue item: Password (#29) — strength meter live region, toggle visibility button label.
Verification:
  eslint projects/ui-lib-custom/src/lib/color-picker/ --max-warnings 0 (CLEAN, EXIT:0)
  jest --testPathPatterns=color-picker --no-coverage (85/85 PASS — 55 unit + 30 a11y)
  jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  ng build ui-lib-custom — Built, zero errors
Terminal notes: node_modules/.bin/eslint works after npm install. npx eslint tries to install
  a new version which fails. Always use node_modules/.bin/ prefix for all CLI tools.
Next step: Password (#29) — strength meter live region, show/hide toggle button aria-label.

