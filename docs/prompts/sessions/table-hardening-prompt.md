# Table — 6-Phase Hardening Prompt
**Component:** `ui-lib-custom/table` · `<ui-lib-table>`
**Queue position:** Tier 4, #32
**Generated:** 2026-05-11
**Key a11y concern:** `role=grid`, column sort `aria-sort`, row selection `aria-selected`, pagination announcements, expandable rows, keyboard grid navigation.
**Based on lessons from:** All Tier 1–3 hardenings.
---
## Step 1 — Read before starting
1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/table/README.md`
3. Full source: `table.component.ts`, `table.component.html`, `table.component.scss`, `table-column.component.ts`, `table-templates.directive.ts`, `table.types.ts`, `table.constants.ts`, `table.component.spec.ts`
4. Hardened siblings: `projects/ui-lib-custom/src/lib/listbox/listbox.component.ts` (aria-activedescendant pattern)
---
## Step 2 — What is already present (verified from source)
Already present (DO NOT REGRESS):
- `role="grid"` + `aria-label`/`aria-labelledby`/`aria-rowcount`/`aria-multiselectable`
- `role="rowgroup"` on thead/tbody
- `role="row"` + `aria-rowindex` on rows
- `role="columnheader"` + `aria-sort`/`aria-colindex`/`aria-disabled`/tabindex on TH
- `role="gridcell"` + `aria-colindex`/`aria-disabled`/tabindex on TD
- `aria-hidden="true"` on sort icon
- `aria-label="Select all rows"` on select-all checkbox
- `aria-label="Row expansion"` on expansion column
Missing (MUST ADD):
- `aria-selected` on selected rows ⚠️
- `aria-expanded` + `aria-controls` on expandable row toggles ⚠️
- Sort state live region announcement ⚠️
- Pagination page-change live region ⚠️
- Empty state `aria-live` announcement ⚠️
- `prefers-reduced-motion` ⚠️
---
## Step 3 — Phase 3 (A11y) — Required fixes
### Issue 1 — `aria-selected` on selected rows (CRITICAL)
Add `[attr.aria-selected]="isRowSelected(row) ? 'true' : 'false'"` on `<tr role="row">` elements with row selection enabled.
### Issue 2 — `aria-expanded` + `aria-controls` on expandable rows (CRITICAL)
- Expand toggle button: `[attr.aria-expanded]`, `[attr.aria-controls]="getExpandedRowId(rowIndex)"`, `[attr.aria-label]`
- Expanded sub-row: `[id]="getExpandedRowId(rowIndex)"`
- Add `getExpandedRowId(index: number): string` helper using the table's instance ID.
- Module-level counter: `let nextTableId: number = 0` → `public readonly tableId: string`
### Issue 3 — Sort announcement (MODERATE)
Add `<span aria-live="polite" aria-atomic="true" class="sr-only">{{ sortAnnouncement() }}</span>` where `sortAnnouncement` is a `computed<string>` that returns "Table sorted by {column}, {direction}".
### Issue 4 — Pagination announcement (MODERATE)
Add `<span aria-live="polite" class="sr-only">{{ paginationAnnouncement() }}</span>` that announces "Page N of M".
### Issue 5 — Empty state (MODERATE)
Ensure the empty-state row/cell has `aria-live="polite"` or is announced by a live region.
### Issue 6 — `prefers-reduced-motion` (MODERATE)
Add at end of SCSS: disable sort icon transitions and row expand animations.
### Issue 7 — Grid keyboard navigation audit (CRITICAL)
Verify the grid implements full WAI-ARIA Grid keyboard pattern:
- Arrow keys between cells within the grid
- `Enter` to activate a cell (edit mode if applicable)
- `Home`/`End` for first/last cell in a row
- `Ctrl+Home`/`Ctrl+End` for first/last cell in the grid
- `Tab` exits the grid
Report any gaps and fix them.
---
### Deliverable — `table.a11y.spec.ts` (update or create)
Aim for 35–50 tests covering:
- Grid ARIA structure (role, rowcount, colindex, rowindex)
- Sort state (aria-sort cycle, live region)
- Row selection (aria-selected, aria-multiselectable)
- Expandable rows (aria-expanded, aria-controls)
- Empty state announcement
- Pagination announcement
- Keyboard grid navigation (arrow keys, Tab exits)
- axe-core checks (empty, with data, sorted, selected, expanded)
---
## Phases 1, 2, 4, 5, 6 (Summary)
**Phase 1 (Architecture):** Add `let nextTableId` counter. Verify sort/page signals are reactive.
**Phase 2 (DX):** README — ARIA structure diagram, keyboard table, sort/selection patterns, CSS vars.
**Phase 4 (Performance):** `@for ... track row.id` (stable key), `computed` for announcements, virtual scroll `aria-rowcount` accuracy.
**Phase 5 (Composability):** Template slots for cells, headers, row expansion, empty state.
**Phase 6 (Polish):** Sort icon animation, selection visual, `:focus-visible` on interactive cells, reduced motion.
---
## Commands
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/table/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=table --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```
Update `docs/COMPONENT_SCORES.md` → Table #32 ✅ Done. Next: TreeTable (#33).
