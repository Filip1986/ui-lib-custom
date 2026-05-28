# Data Grid

**Selector:** `ui-lib-data-grid`
**Entry point:** `import { DataGrid } from 'ui-lib-custom/data-grid'`

---

## Overview

DataGrid component — high-performance grid with virtual scroll, column pinning, column resizing, inline cell editing, and server-side lazy loading.

## API

### Inputs

| Name                 | Type                      | Default                                         | Description                                                                                                                                                                                         |
| -------------------- | ------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`          | `string | null`           | `null`                                          | Accessible label for the grid element.                                                                                                                                                              |
| `caption`            | `string | null`           | `null`                                          | Caption text rendered above the grid.                                                                                                                                                               |
| `columnResizeMode`   | `DataGridResizeMode`      | `DATA_GRID_DEFAULTS.RESIZE_MODE`                | Resize mode applied when `resizableColumns` is `true`.                                                                                                                                              |
| `dataKey`            | `string | null`           | `null`                                          | Dot-notation property key that uniquely identifies each row. Required for selection equality and `@for` tracking.                                                                                   |
| `editMode`           | `DataGridEditMode`        | `DATA_GRID_DEFAULTS.EDIT_MODE`                  | Cell edit mode. When `null`, editing is disabled.                                                                                                                                                   |
| `emptyMessage`       | `string`                  | `DATA_GRID_DEFAULTS.EMPTY_MESSAGE`              | Message shown in the empty state when no `[uiDataGridEmpty]` template is provided.                                                                                                                  |
| `filterLocale`       | `string | undefined`      | `undefined`                                     | BCP 47 locale for locale-sensitive string comparisons.                                                                                                                                              |
| `filterMatchMode`    | `DataGridFilterMatchMode` | `DATA_GRID_DEFAULTS.FILTER_MATCH_MODE`          | Match strategy for text filters.                                                                                                                                                                    |
| `globalFilterFields` | `string[] | null`         | `null`                                          | Specific column fields to include in the global filter. When `null`, all fields are searched.                                                                                                       |
| `id`                 | `string | null`           | `null`                                          | Optional explicit id override for the grid container.                                                                                                                                               |
| `lazy`               | `boolean`                 | `false`                                         | When `true`, the grid operates in server-side mode. The `lazyLoad` output fires whenever sort, filter, or pagination changes — the consumer must update `[value]` and `[totalRecords]` accordingly. |
| `metaKeySelection`   | `boolean`                 | `false`                                         | When `true`, Ctrl/Meta must be held to toggle multi-row selection.                                                                                                                                  |
| `multiSortMode`      | `boolean`                 | `false`                                         | When `true`, Ctrl+click adds a column to the multi-sort stack.                                                                                                                                      |
| `paginator`          | `boolean`                 | `false`                                         | When `true`, renders the built-in paginator below the grid.                                                                                                                                         |
| `reorderableColumns` | `boolean`                 | `false`                                         | When `true`, columns can be reordered by dragging their headers.                                                                                                                                    |
| `resizableColumns`   | `boolean`                 | `false`                                         | When `true`, all columns are resizable via drag unless overridden per column.                                                                                                                       |
| `rowHeight`          | `number`                  | `DATA_GRID_DEFAULTS.ROW_HEIGHT`                 | Fixed row height in pixels used for virtual scroll calculations. All data rows must have this exact height when `virtualScroll` is `true`.                                                          |
| `rowHover`           | `boolean`                 | `false`                                         | When `true`, the pointer cursor and hover highlight are shown on rows.                                                                                                                              |
| `rowsPerPageOptions` | `number[]`                | `[ ...DATA_GRID_DEFAULTS.ROWS_PER_PAGE_OPTIONS` | Options for the rows-per-page selector.                                                                                                                                                             |
| `scrollHeight`       | `string | null`           | `null`                                          | Explicit CSS height for the scrollable body viewport, e.g. `'400px'`.                                                                                                                               |
| `selectionMode`      | `DataGridSelectionMode`   | `DATA_GRID_DEFAULTS.SELECTION_MODE`             | Row selection mode.                                                                                                                                                                                 |
| `showGridlines`      | `boolean`                 | `false`                                         | When `true`, grid lines are drawn between all cells.                                                                                                                                                |
| `size`               | `DataGridSize`            | `DATA_GRID_DEFAULTS.SIZE`                       | Component size token.                                                                                                                                                                               |
| `stickyHeader`       | `boolean`                 | `true`                                          | When `true`, the header row is always visible during vertical scroll.                                                                                                                               |
| `stripedRows`        | `boolean`                 | `false`                                         | When `true`, alternating rows receive a background tint.                                                                                                                                            |
| `styleClass`         | `string | null`           | `null`                                          | Additional CSS class(es) applied to the host element.                                                                                                                                               |
| `totalRecords`       | `number`                  | `0`                                             | Total number of records for server-side pagination. Only required when `lazy` is `true`.                                                                                                            |
| `value`              | `unknown[]`               | `[]`                                            | Array of row objects to display.                                                                                                                                                                    |
| `variant`            | `DataGridVariant | null`  | `null`                                          | Design variant override; inherits from `ThemeConfigService` when `null`.                                                                                                                            |
| `virtualScroll`      | `boolean`                 | `false`                                         | When `true`, only visible rows are rendered (requires a fixed `scrollHeight`).                                                                                                                      |

### Models (two-way bindable)

| Name            | Type                 | Default                            | Description                                                                                  |
| --------------- | -------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `first`         | `number`             | `0`                                | Zero-based offset of the first visible row. Use `[(first)]` for two-way binding.             |
| `globalFilter`  | `string`             | `''`                               | Global filter string applied across all columns. Use `[(globalFilter)]` for two-way binding. |
| `multiSortMeta` | `DataGridSortMeta[]` | `[]`                               | Current multi-sort stack. Use `[(multiSortMeta)]` for two-way binding.                       |
| `rows`          | `number`             | `DATA_GRID_DEFAULTS.ROWS_PER_PAGE` | Number of rows displayed per page. Use `[(rows)]` for two-way binding.                       |
| `selection`     | `unknown`            | `null`                             | Currently selected row(s). Use `[(selection)]` for two-way binding.                          |
| `sortField`     | `string | null`      | `null`                             | Field currently used for sorting. Use `[(sortField)]` for two-way binding.                   |
| `sortOrder`     | `DataGridSortOrder`  | `DATA_GRID_DEFAULTS.SORT_ORDER`    | Current sort order. Use `[(sortOrder)]` for two-way binding.                                 |

### Outputs

| Name               | Type                            | Description                                                    |
| ------------------ | ------------------------------- | -------------------------------------------------------------- |
| `cellEditCancel`   | `DataGridCellEditCancelEvent`   | Emitted when a cell edit is cancelled.                         |
| `cellEditComplete` | `DataGridCellEditCompleteEvent` | Emitted when a cell edit is committed.                         |
| `cellEditInit`     | `DataGridCellEditInitEvent`     | Emitted when a cell edit is initiated.                         |
| `columnResize`     | `DataGridColumnResizeEvent`     | Emitted when a column is resized.                              |
| `filtered`         | `DataGridFilterEvent`           | Emitted when a column or global filter changes.                |
| `lazyLoad`         | `DataGridLazyLoadEvent`         | Emitted in lazy mode when sort, filter, or pagination changes. |
| `paged`            | `DataGridPageEvent`             | Emitted when the page or rows-per-page changes.                |
| `rowSelected`      | `DataGridRowSelectEvent`        | Emitted when a row is selected.                                |
| `rowUnselected`    | `DataGridRowUnselectEvent`      | Emitted when a row is deselected.                              |
| `sorted`           | `DataGridSortEvent`             | Emitted when the sort order changes.                           |

## Content Projection

_none_

## Theming

| CSS Variable                                      | Default                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| `--uilib-data-grid-border-color`                  | `var(--uilib-color-neutral-200, #e5e7eb)`                                      |
| `--uilib-data-grid-border-radius`                 | `var(--uilib-radius-md, 0.5rem)`                                               |
| `--uilib-data-grid-border-width`                  | `1px`                                                                          |
| `--uilib-data-grid-caption-color`                 | `var(--uilib-color-neutral-700, #374151)`                                      |
| `--uilib-data-grid-caption-font-size`             | `var(--uilib-font-size-sm, 0.875rem)`                                          |
| `--uilib-data-grid-caption-padding`               | `var(--uilib-spacing-3, 0.75rem)`                                              |
| `--uilib-data-grid-cell-bg`                       | `var(--uilib-surface-page, #ffffff)`                                           |
| `--uilib-data-grid-cell-border-color`             | `var(--uilib-color-neutral-100, #f3f4f6)`                                      |
| `--uilib-data-grid-cell-color`                    | `var(--uilib-color-neutral-900, #111827)`                                      |
| `--uilib-data-grid-cell-padding-block`            | `var(--uilib-spacing-3, 0.75rem)`                                              |
| `--uilib-data-grid-cell-padding-inline`           | `var(--uilib-spacing-3, 0.75rem)`                                              |
| `--uilib-data-grid-edit-ring`                     | `0 0 0 2px inset var(--uilib-color-primary-500, #6366f1)`                      |
| `--uilib-data-grid-editor-bg`                     | `var(--uilib-surface-page, #ffffff)`                                           |
| `--uilib-data-grid-empty-color`                   | `var(--uilib-color-neutral-500, #6b7280)`                                      |
| `--uilib-data-grid-empty-padding`                 | `var(--uilib-spacing-10, 2.5rem)`                                              |
| `--uilib-data-grid-filter-bg`                     | `var(--uilib-surface-page, #ffffff)`                                           |
| `--uilib-data-grid-filter-border-color`           | `var(--uilib-color-neutral-300, #d1d5db)`                                      |
| `--uilib-data-grid-filter-focus-ring`             | `0 0 0 2px var(--uilib-color-primary-300, #a5b4fc)`                            |
| `--uilib-data-grid-focus-ring`                    | `var( --uilib-focus-ring, 0 0 0 3px var(--uilib-color-primary-300, #a5b4fc) )` |
| `--uilib-data-grid-font-size`                     | `var(--uilib-font-size-sm, 0.875rem)`                                          |
| `--uilib-data-grid-frozen-shadow-end`             | `-4px 0 8px -2px var(--uilib-color-neutral-200, #e5e7eb)`                      |
| `--uilib-data-grid-frozen-shadow-start`           | `4px 0 8px -2px var(--uilib-color-neutral-200, #e5e7eb)`                       |
| `--uilib-data-grid-header-bg`                     | `var(--uilib-color-neutral-50, #f9fafb)`                                       |
| `--uilib-data-grid-header-color`                  | `var(--uilib-color-neutral-700, #374151)`                                      |
| `--uilib-data-grid-header-font-weight`            | `600`                                                                          |
| `--uilib-data-grid-header-padding-block`          | `var(--uilib-spacing-3, 0.75rem)`                                              |
| `--uilib-data-grid-header-padding-inline`         | `var(--uilib-spacing-3, 0.75rem)`                                              |
| `--uilib-data-grid-header-sort-icon-active-color` | `var(--uilib-color-primary-600, #4f46e5)`                                      |
| `--uilib-data-grid-header-sort-icon-color`        | `var(--uilib-color-neutral-400, #9ca3af)`                                      |
| `--uilib-data-grid-resize-handle-color`           | `var(--uilib-color-neutral-300, #d1d5db)`                                      |
| `--uilib-data-grid-resize-handle-hover-color`     | `var(--uilib-color-primary-500, #6366f1)`                                      |
| `--uilib-data-grid-resize-handle-width`           | `4px`                                                                          |
| `--uilib-data-grid-row-height`                    | `3rem`                                                                         |
| `--uilib-data-grid-row-hover-bg`                  | `var(--uilib-color-primary-50, #eef2ff)`                                       |
| `--uilib-data-grid-row-selected-bg`               | `var(--uilib-color-primary-100, #e0e7ff)`                                      |
| `--uilib-data-grid-row-selected-color`            | `var(--uilib-color-neutral-900, #111827)`                                      |
| `--uilib-data-grid-row-stripe-bg`                 | `var(--uilib-color-neutral-50, #f9fafb)`                                       |
| `--uilib-data-grid-sort-badge-bg`                 | `var(--uilib-color-primary-500, #6366f1)`                                      |
| `--uilib-data-grid-sort-badge-color`              | `var(--uilib-color-neutral-0, #ffffff)`                                        |
| `--uilib-data-grid-sort-badge-font-size`          | `0.625rem`                                                                     |
| `--uilib-data-grid-sort-icon-font-size`           | `0.7rem`                                                                       |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                            |
| ----------------------------------------------------------- |
| Enter on a row with selectionMode=                          |
| Enter on a sortable header sorts ascending                  |
| Enter twice on a sortable header sorts descending           |
| Space on a sortable header sorts ascending                  |
| applies aria-rowcount equal to total records                |
| applies variant class                                       |
| aria-rowcount updates when data changes                     |
| body cells have role=                                       |
| cells in first row have aria-colindex starting at 1         |
| column filter input has aria-label                          |
| empty row has role=                                         |
| filtered rows update aria-rowcount                          |
| first data row has aria-rowindex=                           |
| grid aria-rowcount matches totalRecords in client-side mode |
| grid has aria-label                                         |
| grid has aria-rowcount equal to total rows                  |
| has role=                                                   |
| header cells have role=                                     |
| header has aria-sort=                                       |
| header row has role=                                        |
| last data row has aria-rowindex equal to row count + 1      |
| non-sortable column header has no aria-sort attribute       |
| passes axe after sorting                                    |
| passes axe in empty state                                   |
| passes axe on default state                                 |
| passes axe with checkbox selection                          |
| passes axe with filter inputs visible                       |
| passes axe with paginator                                   |
| row checkboxes have aria-label                              |
| select-all checkbox has aria-label                          |
| selecting all then deselecting updates aria state           |
| sets aria-colindex on data cells                            |
| sets aria-rowcount to total number of rows                  |
| sets aria-rowindex on rows based on virtual offset          |
| sets aria-sort attribute on sorted column header            |
| unsorted sortable header has aria-sort=                     |
| updates aria-rowcount when data changes                     |
| wrapper has role=                                           |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#data-grid)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/data-grid/README.md)

