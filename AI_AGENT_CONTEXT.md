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
- **Active focus:** Table accessibility hardening COMPLETE (6-phase, #32); next is TreeTable (#33, Tier 4 Data Display)
- **Next queue:** TreeTable hardening (Tier 4, #33) — `role=treegrid`, hierarchy semantics, expanded state, keyboard navigation
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `Tabs` -> ✅ complete + hardened (6-phase, score 9.0/10)
- `RadioButton` -> ✅ complete + hardened (6-phase, 64 tests — 40 unit + 24 a11y)
- `Password` -> ✅ complete + hardened (6-phase, 73 tests — 49 unit + 24 a11y)
- `Slider` -> ✅ complete + hardened (6-phase, 75 tests — 47 unit + 28 a11y)
- `Rating` -> ✅ complete + hardened (6-phase, 75 tests — 53 unit + 22 a11y)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [Table component — accessibility hardening COMPLETE (#32)]
Changed:
  - projects/ui-lib-custom/src/lib/table/table.component.ts
      • Replaced the old component-only ID with module-level `nextTableId: number`, `tableId`, and `captionId`
      • Added dynamic `tableRole` (`grid` for sortable/selectable tables, `table` otherwise)
      • Added caption-based `aria-labelledby`, `aria-multiselectable`, paginated `aria-rowcount`, and roving grid focus helpers
      • Added keyboard cell navigation with Arrow/Home/End handling for interactive grid mode
  - projects/ui-lib-custom/src/lib/table/table.component.html
      • Added rowgroup/row/columnheader/gridcell semantics, `aria-rowindex` / `aria-colindex`, row selection state, and empty-state live region
      • Wired roving tabindex attributes/data hooks to auto-generated header and body cells
  - projects/ui-lib-custom/src/lib/table/table.component.scss
      • Added focus-visible styling for focusable cells and a reduced-motion override for row/filter/expander transitions
  - projects/ui-lib-custom/src/lib/table/table.component.spec.ts
      • Updated sortable-header tabindex expectations to match roving tabindex behavior
  - projects/ui-lib-custom/src/lib/table/table.a11y.spec.ts (CREATED — 33 tests)
      • Added ARIA structure, accessible-name, sorting, selection, keyboard navigation, pagination, disabled-state, empty-state, unique-id, and axe coverage
  - projects/ui-lib-custom/src/lib/table/README.md
      • Added column definition shape, selection modes, keyboard navigation, pagination notes, and CSS custom properties documentation
  - docs/COMPONENT_SCORES.md
      • Table: ⏳ Queued → ✅ Done; score row populated (avg 8.6)
State: Table hardening complete. Dynamic grid/table semantics, caption wiring, roving grid keyboard navigation,
  reduced-motion support, and dedicated a11y regression coverage are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/table/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=table --no-coverage (125/125 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation; GitHub Actions CI run 25663127263 is green on attempt 2 (lint/build/typecheck/test/storybook).
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

Date: 2026-05-11 [Tabs component — 6-phase Hardening COMPLETE (#17)]
Changed:
  - projects/ui-lib-custom/src/lib/tabs/tabs.ts
      • Switched to module-scoped instance IDs (`tabsId`) and kept public `tabId()` / `panelId()` helpers stable per instance
      • Added `activation` input (`'auto' | 'manual'`) and `ariaLabel` input for tablist labelling
      • Hardened keyboard behavior: wrap-around arrow navigation, Home/End support, manual activation support, disabled-tab skipping, and Tab-to-panel focus handoff
      • Added reduced-motion-aware scroll behavior for focus and scroll buttons
  - projects/ui-lib-custom/src/lib/tabs/tabs.html
      • Bound `aria-label` on the tablist
      • Made `aria-selected` and `aria-disabled` explicit string semantics on tab buttons
  - projects/ui-lib-custom/src/lib/tabs/tabs.scss
      • Removed CSS-driven inactive panel hiding in favor of the existing `[hidden]` behavior
      • Added `prefers-reduced-motion` overrides for transitions and scrolling
  - projects/ui-lib-custom/src/lib/tabs/tabs.types.ts
      • Added `TabsActivation` public type
  - projects/ui-lib-custom/src/lib/tabs/index.ts
      • Re-exported `TabsActivation`
  - projects/ui-lib-custom/src/lib/tabs/tabs.a11y.spec.ts
      • Expanded coverage for ARIA wiring, unique IDs across instances, auto/manual activation, vertical orientation, Home/End, disabled-tab skipping, Tab-to-panel focus flow, and axe-core
  - projects/ui-lib-custom/src/lib/tabs/README.md
      • Documented activation mode, aria-label, keyboard support, disabled handling, and key CSS custom properties
  - docs/COMPONENT_SCORES.md
      • Tabs: ⏳ Queued → ✅ Done
State: Tabs hardening complete. IDs are unique across instances, keyboard interaction supports auto/manual activation, inactive panels rely on `[hidden]`, and dedicated accessibility coverage is in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tabs/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=tabs --no-coverage (41/41 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before lint/test/build commands were available.
Next step: Accordion (#18).

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
