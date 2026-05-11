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
- **Active focus:** Card accessibility hardening COMPLETE (6-phase, #51); also merged: Chart (#72), Chip (#54), ContextMenu (#14)
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
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [Card component — accessibility hardening COMPLETE (#51)]
Changed:
  - projects/ui-lib-custom/src/lib/card/card.ts
      • Added module-scope `let nextCardId: number = 0` for unique instance IDs
      • Added `public readonly titleId: string` initialized in constructor to `ui-lib-card-title-${nextCardId++}`
  - projects/ui-lib-custom/src/lib/card/card.html
      • Added `[attr.aria-labelledby]` — links card container to its title when not hoverable and header is visible
      • Added `[id]="titleId"` on the `.ui-lib-card__title` div for the labelledby target
  - projects/ui-lib-custom/src/lib/card/card.scss
      • Added `:focus-visible` ring on `&--hoverable` (outline + box-shadow glow using `--uilib-color-primary` / `--uilib-focus-ring`)
      • Applied the `card-dark-theme` mixin via `[data-theme='dark']` selectors (both host-scoped and parent-scoped)
      • Added `@media (prefers-reduced-motion: reduce)` — disables `transition` and removes `translateY` transforms
  - projects/ui-lib-custom/src/lib/card/card.a11y.spec.ts (EXPANDED — 24 tests, up from 1)
      • Added ARIA structure (role, tabindex, aria-label, aria-labelledby, title ID format)
      • Added keyboard interaction (Enter/Space trigger click; non-hoverable doesn't)
      • Added closable card accessible label coverage
      • Added unique IDs, multi-instance ID uniqueness, and dynamic label (signal) update
      • Added axe checks for basic, hoverable, closable, and multi-variant states
  - projects/ui-lib-custom/src/lib/card/README.md
      • Added ARIA attributes table, keyboard interaction table, CSS custom properties table
      • Added full Accessibility section with examples, guidelines, and reduced-motion note
  - docs/COMPONENT_SCORES.md
      • Card: ⏳ Queued → ✅ Done; score row added to Layout table (avg 9.0/10)
State: Card hardening complete. Focus ring, dark mode, reduced motion, unique IDs, aria-labelledby, and 24 a11y tests all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/card/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=card --no-coverage (34/34 PASS — 10 unit + 24 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available.
Next step: Badge (#52) hardening — Tier 6, positioning variants, `aria-label` passthrough.

Date: 2026-05-11 [Chart component — accessibility hardening COMPLETE (#72)]
Changed:
  - projects/ui-lib-custom/src/lib/chart/chart.component.ts
      • Added module-level `nextChartId: number` for unique instance IDs
      • Added `chartId`, `tableId`, `datasetRows`, and `tableLabels` computed properties
      • Added `showDataTable` input (default `true`) to control the visually-hidden data table
      • Added `prefers-reduced-motion` detection → sets `animation: false` in Chart.js options when preferred
      • Added `formatDataValue` helper for multi-type data point normalisation
  - projects/ui-lib-custom/src/lib/chart/chart.component.html
      • Added `aria-describedby` on canvas (links to the data table when `showDataTable` is true)
      • Added visually-hidden `<table>` with `<caption>`, `<thead>` (label columns + "Dataset" header), and `<tbody>` (one row per dataset)
  - projects/ui-lib-custom/src/lib/chart/chart.component.scss
      • Added `.ui-lib-chart__sr-table` visually-hidden class
      • Added `@media (prefers-reduced-motion: reduce)` override for canvas transitions/animations
  - projects/ui-lib-custom/src/lib/chart/chart.types.ts
      • Added `ChartDatasetRow` and `ChartAccessibleDataset` interfaces
  - projects/ui-lib-custom/src/lib/chart/chart.a11y.spec.ts (CREATED — 21 tests)
      • ARIA structure, data table rendering, unique IDs, reduced-motion, and axe-core coverage
  - projects/ui-lib-custom/src/lib/chart/README.md
      • Added ARIA table, keyboard table, CSS custom properties table, and accessibility section
  - docs/COMPONENT_SCORES.md
      • Chart: ⏳ Queued → ✅ Done; score row populated (avg 8.9)
State: Chart hardening complete. Visually-hidden data table, aria-describedby linkage, unique IDs, reduced-motion
  support, and 21 a11y regression tests are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/chart/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=chart --no-coverage (96/96 PASS — 75 unit + 21 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: `npm install` required in fresh clone before tools are available.
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

Date: 2026-05-11 [Chip component — 6-phase hardening COMPLETE (#54)]
Changed:
  - projects/ui-lib-custom/src/lib/chip/chip.ts
      • Added module-level `nextChipId` unique ID counter; exposed stable `chipId` string on host via `[id]` binding
      • Added `selectable` and `selected` inputs, `selectedChange` output
      • Added `hostRole` computed signal: `'group'` when removable (avoids nested-interactive ARIA violation), `'option'` otherwise
      • Added `ariaSelected` computed signal: `'true'`/`'false'` for non-removable selectable chips; null otherwise
      • Added `tabIndex` computed signal: `0` for selectable chips, null otherwise
      • Added `onHostClick` and `onHostKeyDown` host event handlers (Space / Enter toggles selection)
      • Changed `onRemoveClick` to call `event.stopPropagation()` before emitting
      • Changed host from static `role: 'option'` to dynamic `[attr.role]: 'hostRole()'`
  - projects/ui-lib-custom/src/lib/chip/chip.scss
      • Added `.ui-lib-chip--selectable` block with `cursor: pointer` and `:focus-visible` ring
      • Added `.ui-lib-chip--selected` block with `filter: brightness(1.15)`
      • Added `@media (prefers-reduced-motion: reduce)` block disabling all chip transitions
  - projects/ui-lib-custom/src/lib/chip/chip.spec.ts
      • Updated TestHostComponent to wire `selectable`, `selected`, and `selectedChange`
      • Replaced `'should apply role="option" on host'` with explicit non-removable/removable role tests
      • Added 10 new unit tests
  - projects/ui-lib-custom/src/lib/chip/chip.a11y.spec.ts (CREATED — 18 tests)
  - projects/ui-lib-custom/src/lib/chip/README.md
  - docs/COMPONENT_SCORES.md
      • Chip #54: ⏳ Queued → ✅ Done; score row populated (avg 8.5)
State: Chip hardening complete. Dynamic role, selectable toggle, prefers-reduced-motion, focus-visible, unique IDs, and 18 a11y tests in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/chip/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=chip --no-coverage (48/48 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass (or resume from queue).
