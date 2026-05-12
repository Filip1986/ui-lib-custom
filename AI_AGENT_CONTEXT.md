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
- **Active focus:** ScrollPanel (#62), TreeTable (#33), Tree (#34), Timeline (#71) and Upload (#69) accessibility hardening COMPLETE (6-phase); Tag (#53), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** TreeSelect hardening (Tier 4, #35) — combobox + tree popup pattern
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)
- **Prompt library status:** 48 session hardening prompts created (2026-05-11) for all queued components (#14–#76). Index: `docs/prompts/HARDENING_PROMPT_INDEX.md`. Accumulated lessons documented in `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

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
- `Ripple` -> ✅ complete + hardened (6-phase, score 8.7/10, 29 tests — 19 unit + 10 a11y)
- `BlockUI` -> ✅ complete + hardened (6-phase, score 9.0/10, 38 tests — 22 unit + 15 a11y + 1 updated)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)
- `TreeTable` -> ✅ complete + hardened (6-phase, score 8.5/10, 85 tests — 41 unit + 44 a11y)
- `Tree` -> ✅ complete + hardened (6-phase, score 8.6/10, 93 tests — 38 unit + 55 a11y)
- `Timeline` -> ✅ complete + hardened (6-phase, score 8.3/10, 48 tests — 33 unit + 15 a11y)
- `Upload` -> ✅ complete + hardened (6-phase, score 8.9/10, 66 tests — 36 unit + 30 a11y)
- `Tag` -> ✅ complete + hardened (6-phase, score 8.9/10, 40 tests — 26 unit + 14 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [Skeleton PR — merge conflict resolution COMPLETE]
Changed:
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Resolved additive archive conflict by keeping the Skeleton handoff alongside entries already on `origin/main`
      • Archived the prior Upload handoff to keep only the newest 3 entries in the active context file
  - projects/ui-lib-custom/src/lib/table/table.a11y.spec.ts
      • Resolved formatting-only merge conflict in pagination live-region coverage without changing assertions
State: The Skeleton PR branch now has a true merge commit against the current `origin/main`. Remaining conflicts were limited to the archive handoff log and a formatting-only overlap in the Table accessibility spec.
Verification:
  node_modules/.bin/jest --testPathPatterns=table.a11y --no-coverage (88/88 PASS — table + tree-table a11y suites)
  npm run typecheck (PASS)
Terminal notes: Fresh clone was shallow again, so `git fetch --unshallow origin` and `git fetch origin main:refs/remotes/origin/main` were required before performing the real merge. Fresh session also required `npm install` before Jest and the pinned TypeScript toolchain were available.
Next step: No further action for this PR unless `origin/main` advances again and introduces new conflicts.

Date: 2026-05-12 [ScrollPanel — 6-phase hardening COMPLETE (#62)]
Changed:
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.ts
      • Added module-level `let nextScrollPanelId: number = 0` counter and unique `componentId`/`contentId`
      • Added `ariaLabel` input (`string | null`, default `null`) wired to `__content` via `[attr.aria-label]`
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.html
      • Added `role="region"`, `tabindex="0"`, `[id]="contentId"`, `[attr.aria-label]="ariaLabel()"` to `__content` div
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.scss
      • Added `outline: none` + `:focus-visible` ring on `__content`
  - projects/ui-lib-custom/src/lib/scroll-panel/README.md
      • Added `ariaLabel` input to inputs table
      • Added ARIA attributes table, keyboard interaction table, expanded accessibility section
      • Updated usage examples to show `ariaLabel` in context
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.a11y.spec.ts (CREATED — 16 tests)
      • axe-core checks (3): labelled, unlabelled, all variants
      • ARIA structure (6): role=region, tabindex=0, aria-label present/absent, id format, unique IDs
      • Dynamic label (2): aria-label updates on signal change, removed on null
      • Keyboard (3): focusable, ArrowDown no error, PageDown no error
      • Multi-variant (1): all 3 variants expose role+tabindex
  - docs/COMPONENT_SCORES.md
      • ScrollPanel #62: ⏳ Queued → ✅ Done
      • Layout table row: 9/9/9/8/9/9/9/9/9/9 avg 8.9
State: ScrollPanel hardening complete. Scrollable region is now keyboard-accessible (tabindex=0, role=region), has an ariaLabel input for screen reader context, unique stable IDs per instance, and :focus-visible ring for visible focus indicator.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/scroll-panel/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=scroll-panel --no-coverage (29/29 PASS — 13 unit + 16 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Next step: Continue with Tier 6 queue — Tag (#53), Skeleton (#55), Divider (#58) or Toolbar (#59).

Date: 2026-05-12 [TreeTable component — accessibility hardening COMPLETE (#33)]
Changed:
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.types.ts
      • Added `setsize: number` and `posinset: number` fields to `TreeTableFlatNode`
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.component.ts
      • Added module-level `let nextTreeTableId: number = 0` counter
      • Added `ElementRef` injection and `instanceId` property
      • Added `ariaLabel` input signal (falls back to caption, then 'Tree table')
      • Updated `buildFlatList` to compute `setsize` and `posinset` per sibling group
      • Fixed `onKeydown` to scope row query to host element (was `document.querySelectorAll`)
      • Added `ArrowRight` expand/navigate-child and `ArrowLeft` collapse/parent keyboard handlers
      • Added `findNodeByKey` private helper for keyboard expand/collapse
      • Added `focusParentRow` private helper for ArrowLeft parent navigation
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.component.html
      • Updated `aria-label` binding to use `ariaLabel() || caption() || 'Tree table'`
      • Added `[attr.aria-setsize]`, `[attr.aria-posinset]`, `[attr.aria-rowindex]`, `[attr.data-key]` on body rows
      • Added `role="gridcell"` on checkbox selection `<td>` with `aria-colindex="1"`
      • Added `[attr.role]` on data `<td>` (rowheader on expander column, gridcell on others) + `[attr.aria-colindex]`
      • Added `aria-label="Select all rows"` + visually-hidden text to header checkbox span
      • Added `aria-label="Select row"` to row checkbox spans
      • Added `.uilib-tree-table-sr-only` span inside header selection `<th>` for `empty-table-header` axe rule
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.component.scss
      • Added `.uilib-tree-table-sr-only` visually-hidden utility class
      • Added `@media (prefers-reduced-motion: reduce)` block disabling all transitions
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.a11y.spec.ts (CREATED — 44 tests)
      • ARIA structure (treegrid role, aria-label, ariaLabel input, caption fallback, default fallback)
      • Row roles and aria-level at each depth (level 1, 2, 3)
      • aria-expanded true/false/absent for expanded/collapsed/leaf rows; expand and collapse via toggle
      • aria-setsize and aria-posinset for root rows, child rows, single-child grandchildren
      • Cell roles (rowheader, gridcell, checkbox gridcell, aria-colindex)
      • Keyboard: ArrowDown/Up navigation, clamping, ArrowRight expand, ArrowRight navigate-child, ArrowRight leaf no-op, ArrowLeft collapse, ArrowLeft parent navigation, ArrowLeft root no-op, Home/End
      • Unique instanceId per instance, format check
      • Empty table structure
      • axe-core: empty, one-level, two-level expanded, collapsed, checkbox modes
  - projects/ui-lib-custom/src/lib/tree-table/README.md
      • Added `ariaLabel` input, ARIA structure diagram, ARIA attributes table, keyboard interaction table, CSS vars table, accessibility notes
  - docs/COMPONENT_SCORES.md
      • TreeTable #33: ⏳ Queued → ✅ Done
      • Data Display table: TreeTable row populated (API 9, A11y 9, Perf 8, Comp 8, Theme 8, DX 9, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.5)
State: TreeTable hardening complete. aria-setsize/posinset, role="rowheader"/gridcell, ArrowRight/ArrowLeft keyboard navigation, ElementRef-scoped row queries, prefers-reduced-motion SCSS, and SR-only accessible names for checkbox spans all in place. 44-test a11y regression suite covers full treegrid WAI-ARIA pattern.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree-table/ --max-warnings 0 (PASS)
  npx jest --testPathPatterns=tree-table --no-coverage (85/85 PASS — 41 unit + 44 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  npx jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: axe-core 4.11.1 flagged checkbox `<span role="checkbox">` with no accessible name (`aria-toggle-field-name`) and the `<th>` with only `aria-label` but no text content (`empty-table-header`). Fixed by adding `aria-label="Select all rows/row"` to spans and a `.uilib-tree-table-sr-only` span inside the header th.
Next step: Tree (#34) hardening — `role=tree`, `role=treeitem`, expand/collapse keyboard navigation.

