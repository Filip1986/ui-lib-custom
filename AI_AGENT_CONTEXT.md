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
- **Active focus:** Slider (#27) and Rating (#30) accessibility hardening COMPLETE; next is Table (#32, Tier 4 Data Display)
- **Next queue:** Table hardening (Tier 4, #32) — role=grid, column sort aria-sort, row selection aria-selected, pagination
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `RadioButton` -> ✅ complete + hardened (6-phase, 64 tests — 40 unit + 24 a11y)
- `Password` -> ✅ complete + hardened (6-phase, 73 tests — 49 unit + 24 a11y)
- `Slider` -> ✅ complete + hardened (6-phase, 75 tests — 47 unit + 28 a11y)
- `Rating` -> ✅ complete + hardened (6-phase, 75 tests — 53 unit + 22 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [Slider component — 6-phase Hardening COMPLETE (#27)]
Changed:
  - projects/ui-lib-custom/src/lib/slider/slider.ts
      • Added module-level `let nextSliderId: number = 0` counter
      • Added `public readonly sliderId: string = 'ui-lib-slider-' + (++nextSliderId)`
      • Added `singleValueText`, `startValueText`, `endValueText` protected computed signals
        returning `String(value)` — used as `aria-valuetext` on all handle elements
  - projects/ui-lib-custom/src/lib/slider/slider.html
      • Added `[attr.aria-valuetext]` binding to single handle, range start, and range end handles
      • Added `aria-hidden="true"` to `.ui-lib-slider__fill` (decorative fill bar)
  - projects/ui-lib-custom/src/lib/slider/slider.scss
      • Added `@media (prefers-reduced-motion: reduce)` block at file end:
        disables `--uilib-slider-fill-transition`, all `.ui-lib-slider__handle` transitions,
        and animate-modifier transitions
  - projects/ui-lib-custom/src/lib/slider/slider.a11y.spec.ts (CREATED — 28 tests)
      • role="slider" on handle
      • aria-valuenow/min/max/valuetext assertions
      • aria-orientation horizontal/vertical
      • Keyboard nav: ArrowRight/Up/Left/Down, PageUp/Down, Home, End
      • Fill aria-hidden="true"
      • Disabled: aria-disabled="true" on handle; keyboard blocked
      • Range mode: Minimum/Maximum value aria-labels, constrained valuemin/valuemax,
        independent handle keyboard navigation
      • axe-core: default, min, max, disabled, vertical, range mode
  - projects/ui-lib-custom/src/lib/slider/README.md
      • Added Keyboard Navigation table and Accessibility section
  - docs/COMPONENT_SCORES.md
      • Slider #27: ⏳ Queued → ✅ Done
State: Slider fully hardened. 75 tests pass (47 unit + 28 a11y). Build clean.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/slider/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=slider --no-coverage (75/75 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: npm install required in fresh clone before running validation commands.
Next step: Rating hardening (Tier 3, #30) — role=radiogroup or role=slider, keyboard interaction.

Date: 2026-05-11 [Rating component — accessibility hardening COMPLETE (#30)]
Changed:
  - projects/ui-lib-custom/src/lib/rating/rating.ts
      • Changed host `role: 'radiogroup'` (static) to `'[attr.role]': 'hostRole()'` (dynamic)
      • Added `hostRole` computed signal: returns `'img'` when `readonly()`, `'radiogroup'` otherwise
      • Added `hostAriaLabelValue` computed signal: descriptive "Rating: N out of M stars" in read-only mode, consumer `ariaLabel` otherwise
      • Updated `[attr.aria-label]` and `[attr.aria-labelledby]` host bindings to use new computed values
      • Fixed `getStarAriaLabel` to return "N star" / "N stars" format (was "N of M")
      • Fixed `getStarTabIndex` to return -1 when `readonly()` (was only checking `isDisabled()`)
  - projects/ui-lib-custom/src/lib/rating/rating.html
      • Wrapped entire template in `@if (!readonly()) { ... } @else { ... }`
      • Interactive branch: cancel button + stars with `role="radio"`, ARIA attrs, event handlers
      • Read-only branch: decorative-only stars with `aria-hidden="true"`, no interactive attrs
  - projects/ui-lib-custom/src/lib/rating/rating.scss
      • Added `@media (prefers-reduced-motion: reduce)` block: `transition: none` on star/cancel + `transform: none` on hover
  - projects/ui-lib-custom/src/lib/rating/rating.spec.ts
      • Updated `getStarAriaLabel` test to match new "N star(s)" format (was "N of M")
  - projects/ui-lib-custom/src/lib/rating/rating.a11y.spec.ts (CREATED — 22 tests)
      • Interactive: radiogroup role, aria-label, star role=radio, aria-checked, "N star(s)" aria-labels, star-icon aria-hidden
      • Roving tabindex: first star tab=0 when no value; selected star tab=0, others tab=-1
      • Keyboard: ArrowRight increments, ArrowLeft decrements, clamp at min/max
      • Read-only: host role=img, descriptive aria-label, no interactive stars, all stars aria-hidden, cancel hidden
      • axe-core: default state, value selected, read-only, disabled
  - projects/ui-lib-custom/src/lib/rating/README.md
      • Added ARIA Pattern A documentation, read-only mode behavior, pattern rationale, keyboard nav table, CVA section
  - docs/COMPONENT_SCORES.md
      • Rating: ⏳ Queued → ✅ Done
State: Rating hardening complete. Dynamic role (radiogroup/img), read-only ARIA branch, reduced-motion SCSS, 22 new a11y tests.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/rating/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=rating --no-coverage (75/75 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for all CLI tools; npm install required first in fresh clone.
Next step: Table (#32) hardening — start Tier 4 Data Display.

Date: 2026-05-11 [RadioButton component — 6-phase Hardening COMPLETE (#23)]
Changed:
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.ts
      • Added `onNativeKeydown(event: KeyboardEvent)`: ArrowDown/Right moves to next
        non-disabled sibling in the group (by name attribute), wrapping; ArrowUp/Left moves
        to previous; both call `.focus()` + `.click()` on the target native input
      • CSS.escape() with jsdom-safe fallback for name attribute selector safety
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.html
      • Added `[attr.aria-disabled]="isDisabled() ? 'true' : null"` to native input
      • Added `[attr.aria-required]="required() ? 'true' : null"` to native input
      • Added `(keydown)="onNativeKeydown($event)"` binding to native input
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.scss
      • Added `@media (prefers-reduced-motion: reduce)` block: `transition: none` on __box and __icon
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.a11y.spec.ts (CREATED — 24 tests)
      • ID/label association: unique IDs, label for/id, aria-labelledby→label element, unique label IDs
      • Group ARIA: role=radiogroup, aria-labelledby→group label, aria-required reflects groupRequired
      • aria-required/aria-disabled on individual native inputs
      • Tabindex: enabled radios have tabindex=0 (browsers implement roving natively), disabled→-1
      • Keyboard navigation: ArrowDown/Right/Up/Left select + move focus; wrap from last→first,
        first→last; disabled radio skipped in navigation
      • axe-core: no selection, one selected, disabled item, group aria-required
  - projects/ui-lib-custom/src/lib/radio-button/README.md
      • Added Keyboard Navigation table (Tab/Shift+Tab/Arrow/Space)
      • Added Accessibility section with two group labeling patterns (fieldset/legend + role=radiogroup)
      • Added ReactiveFormsModule usage example and disabled option example
  - docs/COMPONENT_SCORES.md
      • RadioButton: ⏳ Queued → ✅ Done
State: RadioButton fully hardened. 64 tests pass (40 unit + 24 a11y). Build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/radio-button/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=radio-button --no-coverage (64/64 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for jest/ng; npx works for eslint after npm install.
Next step: Rating hardening (Tier 3, #30).

Date: 2026-05-11 [Knob component — accessibility hardening COMPLETE (#31)]
Changed:
  - projects/ui-lib-custom/src/lib/knob/knob.component.ts
      • Moved slider semantics to host (`role=slider`, `aria-valuenow/min/max/valuetext`, keyboard + pointer handlers)
      • Added `getValueText()` helper for `aria-valuetext`
      • Added requestAnimationFrame-throttled drag updates and RAF cleanup on pointer-up/destroy
  - projects/ui-lib-custom/src/lib/knob/knob.component.html
      • Marked SVG as decorative (`aria-hidden="true"`, `focusable="false"`)
      • Removed interactive ARIA/event bindings from SVG
  - projects/ui-lib-custom/src/lib/knob/knob.component.scss
      • Added `prefers-reduced-motion: reduce` block (`--uilib-knob-transition-duration: 0ms`)
  - projects/ui-lib-custom/src/lib/knob/knob.component.spec.ts
      • Updated ARIA assertions to target knob host element semantics
  - projects/ui-lib-custom/src/lib/knob/knob.a11y.spec.ts (CREATED — 21 tests)
      • Added role/ARIA assertions, keyboard equivalence coverage, disabled behavior, decorative SVG checks
      • Added axe checks for default, min, max, and disabled states
  - projects/ui-lib-custom/src/lib/knob/README.md
      • Added accessibility behavior and keyboard support table
  - docs/COMPONENT_SCORES.md
      • Knob queue status set to ✅ Done; score row populated (avg 8.2)
State: Knob hardening complete with host-level slider semantics, keyboard parity for drag operations,
  decorative SVG semantics, reduced-motion support, and dedicated a11y test coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/knob/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=knob --no-coverage (56/56 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Installed dependencies via `npm install` in fresh clone before running validation commands.
Next step: Table (#32) hardening — start Tier 4 Data Display.
