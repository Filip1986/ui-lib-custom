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
- **Active focus:** constants extraction pass complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `VirtualScroller` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Tree` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `TreeTable` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Table` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `Timeline` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `OrderList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `OrganizationChart` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `Paginator` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `PickList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- Documentation gaps still tracked for: `Input`, `Select`, `Card`, `Layout`
- Pending secondary entry points: `icon-button`, `alert`
- `VirtualScroller` docs written: `docs/reference/components/VIRTUAL_SCROLLER.md`

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Older handoffs are archived in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

---

Date: 2026-04-25
Changed:
  - projects/ui-lib-custom/src/lib/data-view/data-view.constants.ts (removed dead DATA_VIEW_DEFAULT_ROWS_PER_PAGE_OPTIONS and DATA_VIEW_CSS_CLASS_PREFIX; kept DATA_VIEW_DEFAULT_ROWS_PER_PAGE)
  - projects/ui-lib-custom/src/lib/data-view/data-view.component.ts (wired DATA_VIEW_DEFAULT_ROWS_PER_PAGE as default for rows input and internalRows signal)
  - projects/ui-lib-custom/src/lib/timeline/timeline.constants.ts (removed dead TIMELINE_CSS_CLASS_PREFIX)
  - projects/ui-lib-custom/src/lib/virtual-scroller/virtual-scroller.component.ts (repaired two truncation issues: restored missing isTouchDevice() and isElementVisible() methods; completed trackItem() body; fixed viewChild declarations to use { read: ElementRef } + ElementRef as value import to resolve no-unsafe-call lint errors)
State: knip fully clean (0 findings). Constants extraction pass complete across all 19 constants files.
  All three lint issues on virtual-scroller component resolved. 132/132 tests passing across
  virtual-scroller, entry-points, data-view, timeline suites.
Verification: npx knip --reporter compact (0 findings),
  npx eslint projects/ui-lib-custom/src/lib/virtual-scroller/ --max-warnings 0 (CLEAN),
  npx jest --testPathPatterns="virtual-scroller|entry-points|data-view|timeline" (132/132 PASS).
Terminal notes: All file edits via Python open(..., w, newline=LF). virtual-scroller.component.ts had
  two layers of truncation: trackItem() was cut at end (repaired by appending closing body), AND
  isTouchDevice()/isElementVisible() methods were missing entirely (restored as private helpers before
  onWindowResize()). The no-unsafe-call errors on Signal<ElementRef<...>> resolved by switching
  viewChild calls to { read: ElementRef } pattern (matches cascade-select convention).
Next step: Overlay follow-ups (appendTo / z-index manager), then component v2 enhancements by priority.


Date: 2026-04-25
Changed:
  - projects/ui-lib-custom/src/lib/order-list/order-list.constants.ts (removed dead ORDER_LIST_CLASSNAMES, ORDER_LIST_ARIA_LABELS, orderListId)
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.constants.ts (removed dead TREE_TABLE_HOST_CLASS, TREE_TABLE_VARIANT_PREFIX, TREE_TABLE_SIZE_PREFIX)
  - projects/demo/src/app/pages/order-list/order-list-demo.component.ts (removed spurious export from DemoProduct interface)
  - projects/demo/src/app/pages/pick-list/pick-list-demo.component.ts (removed spurious export from DemoCountry interface)
  - projects/demo/src/app/pages/table/table-demo.component.ts (removed spurious export from Product interface)
  - docs/reference/components/VIRTUAL_SCROLLER.md (new -- full API reference doc)
  - docs/reference/components/README.md (repaired truncation; added rows for OrderList through VirtualScroller)
State: knip baseline established and fully clean (0 findings). All 5 dead-export issues resolved by
  deletion (unused internal constants) or export removal (demo-local interfaces). ESLint clean on all
  touched files. 230/230 tests passing across order-list, pick-list, table, tree-table suites.
  VirtualScroller reference doc complete.
Verification: npx knip --reporter compact (0 findings),
  npx eslint (all 5 changed files, --max-warnings 0, CLEAN),
  npx jest --testPathPatterns="order-list|pick-list|table|tree-table" (230/230 PASS).
Terminal notes: All file edits via Python open(..., w, newline=LF). npx.cmd not available -- use npx directly.
Next step: Constants extraction pass (audit remaining constants.ts files for internal-only exports), then overlay follow-ups (appendTo / z-index manager).


Date: 2026-04-25
Changed:
  - projects/ui-lib-custom/src/lib/virtual-scroller/ (all 7 files: types, directives,
    component ts/html/scss, spec, index.ts)
  - projects/ui-lib-custom/virtual-scroller/ (ng-package.json, package.json, public-api.ts -- secondary entry point)
  - projects/ui-lib-custom/package.json (exports + typesVersions for virtual-scroller)
  - projects/ui-lib-custom/test/entry-points.spec.ts (virtual-scroller import test added)
  - projects/demo/src/app/pages/scroller/ (full demo -- TS, HTML, SCSS -- 6 scenarios)
  - AI_AGENT_CONTEXT.md (VirtualScroller marked complete)
State: VirtualScroller fully complete. Viewport-based virtual scrolling algorithm ported from PrimeNG,
  vertical/horizontal/both orientations, lazy loading with lazyLoad output, external loading state,
  custom item/content/loader/loaderIcon templates via content directives (uiScrollerItem,
  uiScrollerContent, uiScrollerLoader, uiScrollerLoaderIcon), numToleratedItems buffer, showSpacer,
  inline mode, disabled mode (bypasses virtualization), CSS-transform positioning, NgZone-outside
  scroll listener, rangeVersion trick to bridge mutable scroll math with signal-driven template,
  three variants (material/bootstrap/minimal), WAI-ARIA role="log"/aria-live="off", tabindex support,
  21/21 unit tests passing, 6-scenario demo (vertical 10k, horizontal 1k, lazy, skeleton loader,
  disabled, large items 5k), entry-point wired and 36/36 entry-point tests passing.
Verification: npx eslint projects/ui-lib-custom/src/lib/virtual-scroller/ --max-warnings 0 (CLEAN),
  npx eslint projects/demo/src/app/pages/scroller/ --max-warnings 0 (CLEAN),
  npx jest --testPathPatterns=virtual-scroller (21/21 PASS),
  npx jest --testPathPatterns=entry-points (36/36 PASS).
Terminal notes: All file writes via Python open(..., w, newline=LF). ESLint required two full
  component rewrites (246 errors on first pass): all `const` variables need explicit type annotations
  (@typescript-eslint/typedef), lifecycle methods need `public` modifier, all inputs/outputs need
  explicit `InputSignal<T>` / `OutputEmitterRef<T>` type annotations, type-only imports must use
  `import type`. Promise.resolve().then() calls need `void` prefix. TS5076 build error on `||` + `??`
  mix fixed by adding explicit parentheses. npx.cmd not available in bash -- use npx directly.
Next step: Begin knip baseline + dead-code cleanup pass.

