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
- **Active focus:** Stepper (#19), Slider (#27), and Rating (#30) accessibility hardening COMPLETE; next is Table (#32, Tier 4 Data Display)
- **Next queue:** Table hardening (Tier 4, #32) — role=grid, column sort aria-sort, row selection aria-selected, pagination
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `Stepper` -> ✅ complete + hardened (6-phase, score 9.0/10, 61 tests — 39 unit + 22 a11y)
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

Date: 2026-05-11 [Stepper component — accessibility hardening COMPLETE (#19)]
Changed:
  - projects/ui-lib-custom/src/lib/stepper/stepper.ts
      • Replaced local component id field with module-level `nextStepperId` + public `stepperId`
      • Added `ariaLabel` input (`'Progress'` default), exported `STEPPER_DEFAULT_ARIA_LABEL`
      • Added computed `stepItems` metadata for active/completed/disabled/error state
      • Added `getStepAriaLabel()` for rich screen-reader labels and `isStepDisabled()`
  - projects/ui-lib-custom/src/lib/stepper/stepper.html
      • Kept tablist pattern, added rich `aria-label` on each step tab, `aria-disabled` for locked steps
      • Rendered all tabpanel shells with stable ids so tabs always reference valid panels
      • Replaced DOM separator elements with CSS-only connectors to satisfy axe `aria-required-children`
  - projects/ui-lib-custom/src/lib/stepper/stepper.scss
      • Added error-state tokens/styles, connector pseudo-elements, pointer-events lockout, stronger reduced-motion handling
  - projects/ui-lib-custom/src/lib/stepper/stepper-panel.ts
      • Added `error` input for invalid step state
  - projects/ui-lib-custom/src/lib/stepper/stepper.types.ts
      • Added exported `StepperItem` accessibility metadata interface
  - projects/ui-lib-custom/src/lib/stepper/index.ts
      • Re-exported `StepperItem`
  - projects/ui-lib-custom/src/lib/stepper/stepper.a11y.spec.ts (CREATED — 22 tests)
      • Added role/aria-label/state coverage, linear lockout assertions, vertical semantics, multi-instance ids, axe checks
  - projects/ui-lib-custom/src/lib/stepper/stepper.spec.ts
      • Removed separator DOM assertion after connector moved to CSS pseudo-elements
  - projects/ui-lib-custom/src/lib/stepper/README.md
      • Documented ARIA pattern, `ariaLabel`, `error`, keyboard support, screen-reader label format, CSS vars
  - docs/COMPONENT_SCORES.md
      • Stepper queue entry: ⏳ Queued → ✅ Done
      • Stepper score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: Stepper hardening complete. Rich step announcements, locked linear mode semantics, error state support, and dedicated a11y coverage are all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/stepper/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=stepper --no-coverage (61/61 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: `aria-required-children` axe failure was resolved by moving connector lines from DOM separator elements to CSS pseudo-elements inside the step wrappers.
Next step: Table (#32) hardening — role=grid, aria-sort, row selection, and pagination announcements.

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
