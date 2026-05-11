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
- **Active focus:** InputNumber accessibility hardening COMPLETE (Phase 3, #26); next is Slider (#27)
- **Next queue:** Slider hardening (Tier 3, #27) — role=slider, aria-valuenow/min/max/valuetext, arrow key step
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

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

Date: 2026-05-11 [DatePicker — 6-phase hardening Phase 3 COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/date-picker/date-picker.ts
      + module counter `nextDatePickerId` and `instanceId` property
      + `liveRegionId` computed signal (`resolvedInputId() + '-live'`)
      + `weekDayFullLabels` computed signal (full day names ordered by firstDayOfWeek)
      + `currentMonthYearLabel` computed signal (`monthLabel() + ' ' + yearLabel()`)
      + `prevMonthLabel` computed signal ("Month Year" for prev month)
      + `nextMonthLabel` computed signal ("Month Year" for next month)
      + `getDateAriaLabel()` improved — includes "today" and "selected" suffixes
      + `resolvedInputId()` fallback now includes instance ID for uniqueness
  - projects/ui-lib-custom/src/lib/date-picker/date-picker.html
      + prev/next button aria-labels updated to "Previous month, <Month Year>"
      + `<th role="columnheader">` now has `[attr.abbr]` and `[attr.aria-label]` with full day names
      + live region `<div aria-live="polite" aria-atomic="true">` added to panel footer
  - projects/ui-lib-custom/src/lib/date-picker/date-picker.scss
      + `.ui-lib-datepicker__live-region` visually-hidden style block added
  - projects/ui-lib-custom/src/lib/date-picker/date-picker.a11y.spec.ts (CREATED)
      + 38 tests across: trigger ARIA, dialog ARIA, nav buttons, grid ARIA, unique IDs,
        keyboard interaction, focus management, axe-core
  - projects/ui-lib-custom/src/lib/date-picker/date-picker.spec.ts
      + prev-button aria-label assertion updated from `.toBe('Previous month')` to `.toMatch(/^Previous month,/)`
  - docs/COMPONENT_SCORES.md — DatePicker (#24) ⏳ → ✅ Done
State: DatePicker 6-phase hardening Phase 3 complete. All 138 tests pass (38 new a11y tests).
  prefers-reduced-motion was already present. Build clean, zero warnings.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/date-picker/ --max-warnings 0 (CLEAN)
  node_modules/.bin/jest --testPathPatterns=date-picker --no-coverage (138/138 PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom (BUILD OK, zero warnings)
Terminal notes: Dependencies not pre-installed — ran `npm install` first.
  Module counter resets per TestBed, so resolved IDs in tests use instance-based suffix.
Next step: CascadeSelect followup (#25) — verify existing a11y spec covers all required patterns.

