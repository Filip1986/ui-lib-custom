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
- **Active focus:** TreeTable (#33) and Timeline (#71) accessibility hardening COMPLETE (6-phase); Upload (#69), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** Tree hardening (Tier 4, #34) — `role=tree`, `role=treeitem`, expand/collapse keyboard, aria-label
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
- `Timeline` -> ✅ complete + hardened (6-phase, score 8.3/10, 48 tests — 33 unit + 15 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

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

Date: 2026-05-12 [Upload component — 6-phase hardening COMPLETE (#69)]
Changed:
  - projects/ui-lib-custom/src/lib/upload/upload.component.ts
      • Added module-level `let nextUploadId: number = 0` counter
      • Added `instanceId`, `fileInputId` (stable HTML id per instance)
      • Added `dragStatusMessage: WritableSignal<string>` for polite live-region announcements
      • Updated `onDragEnter` to set drag status message; `onDragLeave`/`onDrop` to clear it
  - projects/ui-lib-custom/src/lib/upload/upload.component.html
      • Added visually-hidden `<label [for]="fileInputId">` for the hidden file input
      • Added `[id]="fileInputId"` to `<input type="file">`
      • Updated drop zone `aria-label` from "File upload drop zone" to "File upload area"
      • Added `aria-live="polite"` / `aria-atomic="true"` drag-status live region
  - projects/ui-lib-custom/src/lib/upload/upload.component.scss
      • Added `.ui-lib-upload__sr-only` visually-hidden utility class
      • Added `@media (prefers-reduced-motion: reduce)` block — disables all transitions
  - projects/ui-lib-custom/src/lib/upload/upload.a11y.spec.ts (CREATED — 25 tests)
      • Toolbar semantics (5): role=toolbar, button text, aria-disabled default, disabled host
      • Drop zone semantics (3): role=region, aria-label, aria-disabled states
      • File input (4): aria-hidden, tabindex, unique id, label association
      • File list semantics (4): role=list, aria-label, listitem, aria-label per remove btn
      • Validation (2): role=alert + aria-live, dismiss button aria-label
      • Drag-over live region (4): presence, default empty, drag-enter, drag-leave
      • Unique IDs (1): two-instance ID uniqueness
      • Keyboard interaction (2): Choose focusable, remove focusable
      • axe-core checks (5): default, with files, with errors, disabled, drag-over
  - projects/ui-lib-custom/src/lib/upload/README.md
      • Added ARIA attributes table (28 rows), keyboard interaction table, CSS custom properties table, accessibility section
  - docs/COMPONENT_SCORES.md
      • Upload #69: ⏳ Queued → ✅ Done; scores API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9
State: Upload hardening complete. Unique instance IDs, drag-over live region, reduced-motion, file-input label, and 25-test a11y regression suite all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/upload/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=upload --no-coverage (66/66 PASS — 36 unit + 30 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: jsdom does not support DragEvent — used `fakeDragEvent()` stub. `children[0]` array access flagged by TypeScript `noUncheckedIndexedAccess`; replaced with `fixture.debugElement.query(By.directive(UploadComponent)).componentInstance`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [Tag component — 6-phase hardening COMPLETE (#53)]
Changed:
  - projects/ui-lib-custom/src/lib/tag/tag.ts
      • Added module-level `nextTagId` counter and unique host `tagId`
      • Added dismissible API: `dismissible`, `removeIcon`, and `removed` output
      • Added computed `removeAriaLabel` (`Remove {value} tag` fallback `Remove tag`) and dynamic host role (`status`/`group`)
  - projects/ui-lib-custom/src/lib/tag/tag.html
      • Added dismiss button template with mandatory aria-label and decorative remove icon `aria-hidden="true"`
  - projects/ui-lib-custom/src/lib/tag/tag.scss
      • Added dismiss button tokens and styles including `:focus-visible` ring
      • Added `@media (prefers-reduced-motion: reduce)` override for host + remove button transitions
  - projects/ui-lib-custom/src/lib/tag/tag.spec.ts
      • Expanded unit coverage for dismissible rendering, remove aria-labels, remove icon aria-hidden, removed output emission, role swap, and host id format
  - projects/ui-lib-custom/src/lib/tag/tag.a11y.spec.ts (CREATED — 14 tests)
      • Added axe-core checks, ARIA structure assertions, unique ID checks, dismiss button labeling semantics, and keyboard focusability coverage
  - projects/ui-lib-custom/src/lib/tag/README.md
      • Added dismissible API docs, outputs table, ARIA attributes table, keyboard interaction table, CSS custom properties updates, and accessibility notes
  - projects/demo/src/app/pages/tag/tag-demo.component.html
      • Added dismissible usage section and API table rows for `dismissible` and `removeIcon`
  - docs/COMPONENT_SCORES.md
      • Tag #53 queue status: ⏳ Queued → ✅ Done
      • Feedback & Status table row populated (API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9)
State: Tag hardening complete. Dismissible tags now expose specific remove button labels, decorative icons are hidden from AT, unique IDs are generated, focus-visible treatment exists for the interactive control, and reduced-motion handling is in place with dedicated a11y regression coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tag/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=tag --no-coverage (40/40 PASS — 26 unit + 14 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  npm run build:demo (PASS; pre-existing SCSS budget warnings only)
Terminal notes: Fresh clone required `npm install`. UI screenshot captured at `/tmp/tag-hardening.png`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [MeterGroup component — accessibility hardening COMPLETE (#57)]
Changed:
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.ts
      • Added module-level `nextMeterGroupId` counter and unique host `instanceId`
      • Added `ariaLabel` input and wired group ARIA label to template
      • Fixed segment percentage calculation to respect `min`/`max` range (`(value - min) / (max - min)`)
      • Added computed `totalValue` + `totalAnnouncement` for live total announcements
      • Added stable segment track helper and richer per-segment aria-label formatter
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.html
      • Updated segment `@for` loops to use stable track keys
      • Bound group `aria-label` to `ariaLabel` input
      • Updated segment `aria-label` output to include value-range phrasing
      • Added polite/atomic live region for total announcement text
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.scss
      • Added visually-hidden live-region utility class
      • Added `prefers-reduced-motion: reduce` override to disable meter transitions
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.spec.ts
      • Added tests for custom group aria-label, min/max-relative percentage calculation, and unique host IDs
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.a11y.spec.ts (CREATED — 18 tests)
      • Added ARIA structure, decorative aria-hidden, live region total updates, keyboard non-focusability, unique IDs, and axe checks
  - projects/ui-lib-custom/src/lib/meter-group/README.md
      • Added `ariaLabel` input docs, ARIA attributes table, keyboard interaction table, and expanded accessibility notes
  - docs/COMPONENT_SCORES.md
      • MeterGroup #57 queue status: ⏳ Queued → ✅ Done
      • MeterGroup score row populated (API 8, A11y 9, Perf 8, Comp 8, Theme 8, DX 8, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.3)
State: MeterGroup hardening complete. Segment ARIA labels now include value context, totals are announced through a live region, unique instance IDs are generated, reduced-motion support is in place, and dedicated a11y regression coverage is added.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/meter-group/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=meter-group --no-coverage (45/45 PASS — 27 unit + 18 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install`; screenshot captured at `/tmp/meter-group-hardening.png`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.
