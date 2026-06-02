# Data Grid

**Selector:** `ui-lib-data-grid`
**Entry point:** `import { DataGrid, DataGridColumn } from 'ui-lib-custom/data-grid'`

---

## Overview

DataGrid component — high-performance grid with virtual scroll, column pinning, column resizing, inline cell editing, and server-side lazy loading.

## API

### Inputs

| Name                 | Type                      | Default                                         | Description                                                                                                                                                                                         |
| -------------------- | ------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`          | `string                   | null`                                           | `null`                                                                                                                                                                                              | Accessible label for the grid element.                                                                            |
| `caption`            | `string                   | null`                                           | `null`                                                                                                                                                                                              | Caption text rendered above the grid.                                                                             |
| `columnResizeMode`   | `DataGridResizeMode`      | `DATA_GRID_DEFAULTS.RESIZE_MODE`                | Resize mode applied when `resizableColumns` is `true`.                                                                                                                                              |
| `dataKey`            | `string                   | null`                                           | `null`                                                                                                                                                                                              | Dot-notation property key that uniquely identifies each row. Required for selection equality and `@for` tracking. |
| `editMode`           | `DataGridEditMode`        | `DATA_GRID_DEFAULTS.EDIT_MODE`                  | Cell edit mode. When `null`, editing is disabled.                                                                                                                                                   |
| `emptyMessage`       | `string`                  | `DATA_GRID_DEFAULTS.EMPTY_MESSAGE`              | Message shown in the empty state when no `[uiDataGridEmpty]` template is provided.                                                                                                                  |
| `filterLocale`       | `string                   | undefined`                                      | `undefined`                                                                                                                                                                                         | BCP 47 locale for locale-sensitive string comparisons.                                                            |
| `filterMatchMode`    | `DataGridFilterMatchMode` | `DATA_GRID_DEFAULTS.FILTER_MATCH_MODE`          | Match strategy for text filters.                                                                                                                                                                    |
| `globalFilterFields` | `string[]                 | null`                                           | `null`                                                                                                                                                                                              | Specific column fields to include in the global filter. When `null`, all fields are searched.                     |
| `id`                 | `string                   | null`                                           | `null`                                                                                                                                                                                              | Optional explicit id override for the grid container.                                                             |
| `lazy`               | `boolean`                 | `false`                                         | When `true`, the grid operates in server-side mode. The `lazyLoad` output fires whenever sort, filter, or pagination changes — the consumer must update `[value]` and `[totalRecords]` accordingly. |
| `metaKeySelection`   | `boolean`                 | `false`                                         | When `true`, Ctrl/Meta must be held to toggle multi-row selection.                                                                                                                                  |
| `multiSortMode`      | `boolean`                 | `false`                                         | When `true`, Ctrl+click adds a column to the multi-sort stack.                                                                                                                                      |
| `paginator`          | `boolean`                 | `false`                                         | When `true`, renders the built-in paginator below the grid.                                                                                                                                         |
| `reorderableColumns` | `boolean`                 | `false`                                         | When `true`, columns can be reordered by dragging their headers.                                                                                                                                    |
| `resizableColumns`   | `boolean`                 | `false`                                         | When `true`, all columns are resizable via drag unless overridden per column.                                                                                                                       |
| `rowHeight`          | `number`                  | `DATA_GRID_DEFAULTS.ROW_HEIGHT`                 | Fixed row height in pixels used for virtual scroll calculations. All data rows must have this exact height when `virtualScroll` is `true`.                                                          |
| `rowHover`           | `boolean`                 | `false`                                         | When `true`, the pointer cursor and hover highlight are shown on rows.                                                                                                                              |
| `rowsPerPageOptions` | `number[]`                | `[ ...DATA_GRID_DEFAULTS.ROWS_PER_PAGE_OPTIONS` | Options for the rows-per-page selector.                                                                                                                                                             |
| `scrollHeight`       | `string                   | null`                                           | `null`                                                                                                                                                                                              | Explicit CSS height for the scrollable body viewport, e.g. `'400px'`.                                             |
| `selectionMode`      | `DataGridSelectionMode`   | `DATA_GRID_DEFAULTS.SELECTION_MODE`             | Row selection mode.                                                                                                                                                                                 |
| `showGridlines`      | `boolean`                 | `false`                                         | When `true`, grid lines are drawn between all cells.                                                                                                                                                |
| `size`               | `DataGridSize`            | `DATA_GRID_DEFAULTS.SIZE`                       | Component size token.                                                                                                                                                                               |
| `stickyHeader`       | `boolean`                 | `true`                                          | When `true`, the header row is always visible during vertical scroll.                                                                                                                               |
| `stripedRows`        | `boolean`                 | `false`                                         | When `true`, alternating rows receive a background tint.                                                                                                                                            |
| `styleClass`         | `string                   | null`                                           | `null`                                                                                                                                                                                              | Additional CSS class(es) applied to the host element.                                                             |
| `totalRecords`       | `number`                  | `0`                                             | Total number of records for server-side pagination. Only required when `lazy` is `true`.                                                                                                            |
| `value`              | `unknown[]`               | `[]`                                            | Array of row objects to display.                                                                                                                                                                    |
| `variant`            | `DataGridVariant          | null`                                           | `null`                                                                                                                                                                                              | Design variant override; inherits from `ThemeConfigService` when `null`.                                          |
| `virtualScroll`      | `boolean`                 | `false`                                         | When `true`, only visible rows are rendered (requires a fixed `scrollHeight`).                                                                                                                      |

### Models (two-way bindable)

| Name            | Type                 | Default                            | Description                                                                                  |
| --------------- | -------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `first`         | `number`             | `0`                                | Zero-based offset of the first visible row. Use `[(first)]` for two-way binding.             |
| `globalFilter`  | `string`             | `''`                               | Global filter string applied across all columns. Use `[(globalFilter)]` for two-way binding. |
| `multiSortMeta` | `DataGridSortMeta[]` | `[]`                               | Current multi-sort stack. Use `[(multiSortMeta)]` for two-way binding.                       |
| `rows`          | `number`             | `DATA_GRID_DEFAULTS.ROWS_PER_PAGE` | Number of rows displayed per page. Use `[(rows)]` for two-way binding.                       |
| `selection`     | `unknown`            | `null`                             | Currently selected row(s). Use `[(selection)]` for two-way binding.                          |
| `sortField`     | `string              | null`                              | `null`                                                                                       | Field currently used for sorting. Use `[(sortField)]` for two-way binding. |
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

---

### Column Inputs (`ui-lib-data-grid-column`)

Column definitions are render-less components placed as direct children of `<ui-lib-data-grid>`.

| Name                | Type              | Default | Description                                                                              |
| ------------------- | ----------------- | ------- | ---------------------------------------------------------------------------------------- |
| `field`             | `string`          | `''`    | Dot-notation path used to read the cell value from a row object.                         |
| `header`            | `string`          | `''`    | Column header text when no `[uiDataGridColumnHeader]` template is provided.              |
| `footer`            | `string`          | `''`    | Column footer text when no `[uiDataGridColumnFooter]` template is provided.              |
| `sortable`          | `boolean`         | `false` | When `true`, clicking the header cycles through sort orders.                             |
| `sortField`         | `string \| null`  | `null`  | Override field used for sorting. Falls back to `field`.                                  |
| `filterable`        | `boolean`         | `false` | When `true`, renders a per-column filter input below the header.                         |
| `filterField`       | `string \| null`  | `null`  | Override field used for filtering. Falls back to `field`.                                |
| `filterPlaceholder` | `string`          | `''`    | Placeholder for the column filter input.                                                 |
| `width`             | `string \| null`  | `null`  | Explicit column width, e.g. `'200px'` or `'15%'`.                                        |
| `minWidth`          | `string \| null`  | `null`  | Minimum width during resize. Falls back to `DATA_GRID_DEFAULTS.MIN_COLUMN_WIDTH`.        |
| `frozen`            | `DataGridFrozen`  | `false` | Pin the column to `'start'` or `'end'`, or leave it scrollable with `false`.             |
| `resizable`         | `boolean \| null` | `null`  | Per-column resize override. Inherits from the grid-level `resizableColumns` when `null`. |
| `editable`          | `boolean`         | `false` | When `true`, cells are editable (requires `editMode` on the parent grid).                |
| `styleClass`        | `string \| null`  | `null`  | Additional CSS class(es) applied to every `<td>` and `<th>` in this column.              |

### Column Template Slots

| Directive                  | Context                    | Purpose                                      |
| -------------------------- | -------------------------- | -------------------------------------------- |
| `[uiDataGridColumnHeader]` | none                       | Custom header cell content                   |
| `[uiDataGridColumnBody]`   | `DataGridCellContext<T>`   | Custom body cell content                     |
| `[uiDataGridColumnEditor]` | `DataGridEditorContext<T>` | Inline cell editor (activated by F2 / Enter) |
| `[uiDataGridColumnFooter]` | none                       | Custom footer cell content                   |
| `[uiDataGridColumnFilter]` | none                       | Custom column filter widget                  |

---

## Content Projection

_none_ (columns are provided via `<ui-lib-data-grid-column>` child elements)

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

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/grid/

### Keyboard Interactions

| Key                 | Action                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `Tab` / `Shift+Tab` | Move between focusable elements (header cells, filter inputs, data cells) |
| `Enter` / `Space`   | Toggle sort on focused sortable column header                             |
| `Enter`             | Select focused row (when `selectionMode` is set)                          |
| `F2` / `Enter`      | Enter cell edit mode on an editable cell                                  |
| `Escape`            | Cancel cell edit                                                          |
| `Tab`               | Commit cell edit and advance to the next editable cell                    |
| `Enter`             | Commit cell edit                                                          |

### ARIA Attributes

| Attribute             | Element                 | Description                                         |
| --------------------- | ----------------------- | --------------------------------------------------- |
| `role="grid"`         | Grid wrapper            | Identifies the grid widget                          |
| `role="row"`          | Header row, data rows   | Row role on every row                               |
| `role="columnheader"` | `<th>` cells            | Header cells                                        |
| `role="gridcell"`     | `<td>` cells            | Data cells                                          |
| `aria-label`          | Grid wrapper            | Set via the `ariaLabel` input                       |
| `aria-rowcount`       | Grid wrapper            | Total record count (updates live on filter/page)    |
| `aria-rowindex`       | Data rows               | 1-based row index (offset-aware for virtual scroll) |
| `aria-colindex`       | Cells                   | 1-based column index                                |
| `aria-sort`           | Sortable column headers | `"ascending"`, `"descending"`, or `"none"`          |
| `aria-label`          | Filter inputs           | `"Filter by <header>"`                              |

## Usage Examples

```html
<!-- Minimal sortable grid -->
<ui-lib-data-grid [value]="rows" ariaLabel="Products">
  <ui-lib-data-grid-column field="id" header="ID" [sortable]="true" width="80px" />
  <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
  <ui-lib-data-grid-column field="price" header="Price" [sortable]="true" width="120px" />
</ui-lib-data-grid>

<!-- Virtual scroll + frozen columns + checkbox selection -->
<ui-lib-data-grid
  [value]="largeDataset"
  [virtualScroll]="true"
  scrollHeight="500px"
  [rowHeight]="48"
  selectionMode="checkbox"
  [(selection)]="selectedRows"
  dataKey="id"
  ariaLabel="Users"
>
  <ui-lib-data-grid-column field="id" header="ID" frozen="start" width="80px" />
  <ui-lib-data-grid-column field="username" header="Username" [sortable]="true" />
  <ui-lib-data-grid-column field="email" header="Email" [filterable]="true" />
  <ui-lib-data-grid-column field="role" header="Role" frozen="end" width="120px" />
</ui-lib-data-grid>
```

## Real-World Usage

### Server-side lazy loading with paginator

```typescript
@Component({
  template: `
    <ui-lib-data-grid
      [value]="users()"
      [totalRecords]="total()"
      [lazy]="true"
      [paginator]="true"
      [rows]="25"
      [rowsPerPageOptions]="[10, 25, 50]"
      dataKey="id"
      ariaLabel="Users"
      (lazyLoad)="load($event)"
    >
      <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
      <ui-lib-data-grid-column field="email" header="Email" [sortable]="true" [filterable]="true" />
      <ui-lib-data-grid-column field="role" header="Role" width="120px" />
    </ui-lib-data-grid>
  `,
})
export class UserTableComponent {
  protected users = signal<User[]>([]);
  protected total = signal(0);

  private userService = inject(UserService);

  protected load(event: DataGridLazyLoadEvent): void {
    this.userService
      .getUsers({ offset: event.first, limit: event.rows, sortField: event.sortField })
      .subscribe(({ items, total }) => {
        this.users.set(items);
        this.total.set(total);
      });
  }
}
```

### Inline cell editing with custom editor template

```html
<ui-lib-data-grid
  [value]="products()"
  editMode="cell"
  dataKey="id"
  ariaLabel="Products"
  (cellEditComplete)="onEditComplete($event)"
>
  <ui-lib-data-grid-column field="name" header="Product Name" [editable]="true">
    <ng-template uiDataGridColumnEditor let-row let-field="field">
      <input type="text" [(ngModel)]="row[field]" />
    </ng-template>
  </ui-lib-data-grid-column>

  <ui-lib-data-grid-column field="price" header="Price" [editable]="true">
    <ng-template uiDataGridColumnBody let-row>{{ row.price | currency }}</ng-template>
    <ng-template uiDataGridColumnEditor let-row let-field="field">
      <input type="number" [(ngModel)]="row[field]" min="0" step="0.01" />
    </ng-template>
  </ui-lib-data-grid-column>

  <ui-lib-data-grid-column field="status" header="Status" width="140px">
    <ng-template uiDataGridColumnBody let-row>
      <ui-lib-tag [value]="row.status" [severity]="statusSeverity(row.status)" />
    </ng-template>
  </ui-lib-data-grid-column>
</ui-lib-data-grid>
```

## Edge Cases

### Empty state (filtered vs. no data)

```html
<ui-lib-data-grid [value]="[]" ariaLabel="Products">
  <ui-lib-data-grid-column field="name" header="Name" />
  <ng-template uiDataGridEmpty let-ctx>
    @if (ctx.filtered) {
    <p>No products match your search.</p>
    } @else {
    <p>No products yet.</p>
    }
  </ng-template>
</ui-lib-data-grid>
```

### 10 000+ rows with virtual scroll

```html
<!-- rowHeight must match the actual rendered row height in pixels exactly -->
<ui-lib-data-grid
  [value]="tenThousandRows"
  [virtualScroll]="true"
  scrollHeight="600px"
  [rowHeight]="48"
  dataKey="id"
  ariaLabel="Large dataset"
>
  <ui-lib-data-grid-column field="index" header="#" width="60px" />
  <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
</ui-lib-data-grid>
```

### Read-only / report grid

```html
<ui-lib-data-grid
  [value]="rows"
  ariaLabel="Q1 2026 Summary"
  caption="Q1 2026 Summary"
  [showGridlines]="true"
  [stripedRows]="true"
>
  <ui-lib-data-grid-column field="category" header="Category" />
  <ui-lib-data-grid-column field="revenue" header="Revenue" />
</ui-lib-data-grid>
```

## Migration from PrimeNG Table

| PrimeNG `p-table`                             | `ui-lib-data-grid`                                               |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `[value]`                                     | `[value]` (same)                                                 |
| `[lazy]="true"` + `(onLazyLoad)`              | `[lazy]="true"` + `(lazyLoad)`                                   |
| `[paginator]="true"` + `[rows]`               | `[paginator]="true"` + `[(rows)]`                                |
| `[(selection)]` + `selectionMode`             | `[(selection)]` + `selectionMode` (same)                         |
| `editMode="cell"`                             | `editMode="cell"` (same)                                         |
| `[virtualScroll]` + `[virtualScrollItemSize]` | `[virtualScroll]` + `[rowHeight]`                                |
| `<p-column field="x" header="Y">`             | `<ui-lib-data-grid-column field="x" header="Y" />`               |
| `<ng-template pTemplate="body" let-row>`      | `<ng-template uiDataGridColumnBody let-row>`                     |
| `<ng-template pTemplate="editor" let-row>`    | `<ng-template uiDataGridColumnEditor let-row let-field="field">` |
| `<ng-template pTemplate="emptymessage">`      | `<ng-template uiDataGridEmpty let-ctx>`                          |
| `(onRowSelect)` / `(onRowUnselect)`           | `(rowSelected)` / `(rowUnselected)`                              |
| `(onSort)`                                    | `(sorted)`                                                       |
| `(onFilter)`                                  | `(filtered)`                                                     |
| `(onPage)`                                    | `(paged)`                                                        |
| `(onColResize)`                               | `(columnResize)`                                                 |

**Key differences:**

- All inputs/outputs use Angular Signal API (`input()`, `model()`, `output()`).
- `[(rows)]` is a two-way bindable `model()` signal, not `@Input`.
- `selectionMode="checkbox"` automatically prepends the checkbox column.
- `lazyLoad` event includes `globalFilter`, per-column `filters` map, and full `multiSortMeta` stack.

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#data-grid)
- [Demo page](/components/data-grid)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/data-grid/README.md)
