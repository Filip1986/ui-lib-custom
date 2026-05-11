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
- `Stepper` -> ✅ complete + hardened (6-phase, score 9.0/10, 61 tests — 39 unit + 22 a11y)
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

Date: 2026-05-11 [Merge conflict resolution refresh for table hardening PR]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved the new conflict against origin/main by keeping the latest Table → TreeTable session state
      • Preserved the incoming Stepper hardening handoff and trimmed active handoffs back to the newest three entries
  - docs/COMPONENT_SCORES.md
  - projects/ui-lib-custom/src/lib/stepper/README.md
  - projects/ui-lib-custom/src/lib/stepper/index.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper-panel.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.html
  - projects/ui-lib-custom/src/lib/stepper/stepper.scss
  - projects/ui-lib-custom/src/lib/stepper/stepper.spec.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.types.ts
      • Brought in the latest origin/main Stepper hardening changes as part of the merge
State: Branch is merged with the latest origin/main again. The only manual conflict resolution was in AI_AGENT_CONTEXT.md; incoming Stepper changes are preserved as-is.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/stepper/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=stepper --no-coverage (61/61 PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  npm run typecheck (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
Terminal notes: Fresh clone again required `npm install` before local validation because `node_modules/.bin/*` tools were absent.
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

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

