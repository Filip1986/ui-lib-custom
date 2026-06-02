# DataGrid

**Selector:** `ui-lib-data-grid`  
**Entry point:** `import { DataGridComponent } from 'ui-lib-custom/data-grid'`  
**APG pattern:** <https://www.w3.org/WAI/ARIA/apg/patterns/grid/>

High-performance, signals-first data grid with virtual scroll, frozen columns,
column resizing, inline cell editing, and server-side lazy loading. Every
feature follows the WAI-ARIA grid keyboard pattern out of the box.

---

## Basic usage

```html
<ui-lib-data-grid [value]="rows" dataKey="id">
  <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
  <ui-lib-data-grid-column field="department" header="Department" [filterable]="true" />
  <ui-lib-data-grid-column field="salary" header="Salary" [sortable]="true" />
</ui-lib-data-grid>
```

```typescript
import { DataGridComponent, DataGridColumnComponent } from 'ui-lib-custom/data-grid';

@Component({
  imports: [DataGridComponent, DataGridColumnComponent],
  ...
})
export class MyComponent {
  readonly rows = signal<Employee[]>([...]);
}
```

---

## Column definitions

Columns are declared as `<ui-lib-data-grid-column>` children. The grid reads
them via `contentChildren()` and renders no DOM of its own for the column
elements — they are pure definition nodes.

### Column inputs

| Input               | Type                        | Default | Description                                                                  |
| ------------------- | --------------------------- | ------- | ---------------------------------------------------------------------------- |
| `field`             | `string`                    | `''`    | Dot-notation path to the row property rendered in this column.               |
| `header`            | `string`                    | `''`    | Header cell text when no custom header template is provided.                 |
| `footer`            | `string`                    | `''`    | Footer cell text when no custom footer template is provided.                 |
| `sortable`          | `boolean`                   | `false` | Clicking the header cycles through ascending → descending → none.            |
| `sortField`         | `string \| null`            | `null`  | Alternative field for sorting when it differs from `field`.                  |
| `filterable`        | `boolean`                   | `false` | Renders a filter input below the header.                                     |
| `filterField`       | `string \| null`            | `null`  | Alternative field for filtering when it differs from `field`.                |
| `filterPlaceholder` | `string`                    | `''`    | Placeholder text for the column filter input.                                |
| `width`             | `string \| null`            | `null`  | Explicit column width, e.g. `'200px'` or `'15%'`.                            |
| `minWidth`          | `string \| null`            | `null`  | Minimum column width during resize. Falls back to grid default (50 px).      |
| `frozen`            | `'start' \| 'end' \| false` | `false` | Pin the column to the inline-start (`'start'`) or inline-end (`'end'`) edge. |
| `resizable`         | `boolean \| null`           | `null`  | Override grid-level `resizableColumns` for this column.                      |
| `editable`          | `boolean`                   | `false` | Allow in-place editing when the grid's `editMode` is active.                 |
| `styleClass`        | `string \| null`            | `null`  | Extra CSS class(es) applied to every `<th>` and `<td>` in this column.       |

### Column template slots

Each slot is declared with `<ng-template>` inside `<ui-lib-data-grid-column>`.

| Directive                | Context type               | Description                                                                                 |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------- |
| `uiDataGridColumnHeader` | none                       | Custom header cell content.                                                                 |
| `uiDataGridColumnBody`   | `DataGridCellContext<T>`   | Custom body cell content. `$implicit` = row, `index`, `selected`, `editing`.                |
| `uiDataGridColumnEditor` | `DataGridEditorContext<T>` | Inline editor rendered when the cell enters edit mode. `$implicit` = row, `index`, `field`. |
| `uiDataGridColumnFooter` | none                       | Custom footer cell content.                                                                 |
| `uiDataGridColumnFilter` | none                       | Custom filter widget rendered below the header.                                             |

```html
<!-- Custom body cell -->
<ui-lib-data-grid-column field="status" header="Status">
  <ng-template uiDataGridColumnBody let-row>
    <ui-lib-tag [value]="row.status" />
  </ng-template>
</ui-lib-data-grid-column>

<!-- Custom inline editor -->
<ui-lib-data-grid-column field="role" header="Role" [editable]="true">
  <ng-template uiDataGridColumnEditor let-row let-field="field">
    <select [(ngModel)]="row[field]">
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  </ng-template>
</ui-lib-data-grid-column>
```

---

## Grid inputs

### Data

| Input          | Type             | Default | Description                                                                          |
| -------------- | ---------------- | ------- | ------------------------------------------------------------------------------------ |
| `value`        | `unknown[]`      | `[]`    | Array of row objects to display.                                                     |
| `totalRecords` | `number`         | `0`     | Total record count for server-side pagination. Required when `lazy` is `true`.       |
| `dataKey`      | `string \| null` | `null`  | Dot-notation key that uniquely identifies each row. Required for selection equality. |

### Sorting

| Input               | Type                 | Default | Description                                                                           |
| ------------------- | -------------------- | ------- | ------------------------------------------------------------------------------------- |
| `[(sortField)]`     | `string \| null`     | `null`  | Field currently sorted. Two-way bindable.                                             |
| `[(sortOrder)]`     | `1 \| -1 \| 0`       | `0`     | Current sort order: `1` = ascending, `-1` = descending, `0` = none. Two-way bindable. |
| `multiSortMode`     | `boolean`            | `false` | When `true`, Ctrl+click adds a column to the multi-sort stack.                        |
| `[(multiSortMeta)]` | `DataGridSortMeta[]` | `[]`    | Full multi-sort stack. Two-way bindable.                                              |

### Filtering

| Input                | Type                                                   | Default      | Description                                                                 |
| -------------------- | ------------------------------------------------------ | ------------ | --------------------------------------------------------------------------- |
| `[(globalFilter)]`   | `string`                                               | `''`         | Global filter string applied across all columns. Two-way bindable.          |
| `globalFilterFields` | `string[] \| null`                                     | `null`       | Specific fields to include in global filtering. `null` searches all fields. |
| `filterMatchMode`    | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | Text matching strategy.                                                     |
| `filterLocale`       | `string \| undefined`                                  | `undefined`  | BCP 47 locale for locale-sensitive string comparisons.                      |

### Selection

| Input              | Type                                           | Default | Description                                                                                     |
| ------------------ | ---------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `selectionMode`    | `'single' \| 'multiple' \| 'checkbox' \| null` | `null`  | Row selection mode. `null` disables selection.                                                  |
| `[(selection)]`    | `unknown`                                      | `null`  | Currently selected row(s). Single-mode: row object. Multiple/checkbox: array. Two-way bindable. |
| `metaKeySelection` | `boolean`                                      | `false` | When `true`, Ctrl/Meta must be held to add rows in multi-selection.                             |

### Pagination

| Input                | Type       | Default             | Description                                                   |
| -------------------- | ---------- | ------------------- | ------------------------------------------------------------- |
| `paginator`          | `boolean`  | `false`             | Renders the built-in paginator below the grid.                |
| `[(rows)]`           | `number`   | `25`                | Rows displayed per page. Two-way bindable.                    |
| `[(first)]`          | `number`   | `0`                 | Zero-based offset of the first visible row. Two-way bindable. |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50, 100]` | Options for the rows-per-page selector.                       |

### Virtual scroll

| Input           | Type             | Default | Description                                                  |
| --------------- | ---------------- | ------- | ------------------------------------------------------------ |
| `virtualScroll` | `boolean`        | `false` | Only renders visible rows. Requires a fixed `scrollHeight`.  |
| `rowHeight`     | `number`         | `48`    | Fixed row height in pixels. All rows must share this height. |
| `scrollHeight`  | `string \| null` | `null`  | CSS height for the scrollable body, e.g. `'480px'`.          |

### Lazy / server-side

| Input  | Type      | Default | Description                                                                                                               |
| ------ | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `lazy` | `boolean` | `false` | Server-side mode. `lazyLoad` fires on every sort/filter/page change; consumer must update `[value]` and `[totalRecords]`. |

### Column features

| Input                | Type                | Default    | Description                                                                            |
| -------------------- | ------------------- | ---------- | -------------------------------------------------------------------------------------- |
| `resizableColumns`   | `boolean`           | `false`    | All columns are resizable by drag unless overridden per column.                        |
| `columnResizeMode`   | `'fit' \| 'expand'` | `'expand'` | Resize behaviour: `'fit'` shrinks the adjacent column; `'expand'` changes total width. |
| `reorderableColumns` | `boolean`           | `false`    | Columns can be reordered by dragging their headers.                                    |

### Cell editing

| Input      | Type                      | Default | Description                                                                                                   |
| ---------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `editMode` | `'cell' \| 'row' \| null` | `null`  | `'cell'` — click/double-click a cell to edit. `'row'` — entire row enters edit mode. `null` disables editing. |

### Appearance

| Input           | Type                                             | Default               | Description                                                              |
| --------------- | ------------------------------------------------ | --------------------- | ------------------------------------------------------------------------ |
| `variant`       | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`                | Design variant override. Inherits from `ThemeConfigService` when `null`. |
| `size`          | `'sm' \| 'md' \| 'lg'`                           | `'md'`                | Component size token.                                                    |
| `stripedRows`   | `boolean`                                        | `false`               | Alternating rows receive a background tint.                              |
| `rowHover`      | `boolean`                                        | `false`               | Pointer cursor and hover highlight shown on rows.                        |
| `showGridlines` | `boolean`                                        | `false`               | Grid lines drawn between all cells.                                      |
| `stickyHeader`  | `boolean`                                        | `true`                | Header row remains visible during vertical scroll.                       |
| `emptyMessage`  | `string`                                         | `'No records found.'` | Message shown when there are no rows to display.                         |
| `caption`       | `string \| null`                                 | `null`                | Caption text rendered above the grid.                                    |
| `ariaLabel`     | `string \| null`                                 | `null`                | Accessible label for the grid element.                                   |
| `styleClass`    | `string \| null`                                 | `null`                | Extra CSS class(es) applied to the host element.                         |
| `id`            | `string \| null`                                 | `null`                | Optional explicit id override for the grid container.                    |

---

## Outputs

| Output             | Payload                         | Description                                                             |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------- |
| `sorted`           | `DataGridSortEvent`             | Sort order changed.                                                     |
| `filtered`         | `DataGridFilterEvent`           | A column or global filter changed.                                      |
| `rowSelected`      | `DataGridRowSelectEvent`        | A row was selected.                                                     |
| `rowUnselected`    | `DataGridRowUnselectEvent`      | A row was deselected.                                                   |
| `paged`            | `DataGridPageEvent`             | Page or rows-per-page changed.                                          |
| `lazyLoad`         | `DataGridLazyLoadEvent`         | Fired in lazy mode when data must be fetched (also fires once on init). |
| `cellEditInit`     | `DataGridCellEditInitEvent`     | Cell editing started.                                                   |
| `cellEditComplete` | `DataGridCellEditCompleteEvent` | Cell edit committed (Enter / Tab / blur).                               |
| `cellEditCancel`   | `DataGridCellEditCancelEvent`   | Cell edit cancelled (Escape).                                           |
| `columnResize`     | `DataGridColumnResizeEvent`     | Column drag-resize completed.                                           |

---

## Keyboard interactions

Follows the [WAI-ARIA Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/).

| Key                          | Action                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Tab` / `Shift+Tab`          | Move focus into / out of the grid.                                                                            |
| `Arrow Up` / `Arrow Down`    | Move focus between rows.                                                                                      |
| `Arrow Left` / `Arrow Right` | Move focus between cells within a row.                                                                        |
| `Enter` / `Space`            | On a sortable header: cycle sort order. On a data row: select / deselect. On an editable cell: begin editing. |
| `Escape`                     | Cancel active cell edit; return focus to the cell.                                                            |
| `Home`                       | Move focus to the first cell in the current row.                                                              |
| `End`                        | Move focus to the last cell in the current row.                                                               |
| `Ctrl + Home`                | Move focus to the first cell of the first row.                                                                |
| `Ctrl + End`                 | Move focus to the last cell of the last visible row.                                                          |
| `Page Up` / `Page Down`      | Previous / next page (with paginator); or scroll by viewport height (virtual scroll).                         |
| `Space`                      | Toggle the checkbox in checkbox-selection mode.                                                               |

---

## Usage examples

### Virtual scroll (large datasets)

```html
<ui-lib-data-grid
  [value]="rows()"
  dataKey="id"
  [virtualScroll]="true"
  scrollHeight="480px"
  [rowHeight]="48"
>
  <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
  <ui-lib-data-grid-column field="email" header="Email" [filterable]="true" />
</ui-lib-data-grid>
```

### Frozen columns

```html
<ui-lib-data-grid [value]="rows()" dataKey="id" scrollHeight="400px">
  <ui-lib-data-grid-column field="name" header="Name" frozen="start" width="180px" />
  <ui-lib-data-grid-column field="dept" header="Dept" />
  <ui-lib-data-grid-column field="salary" header="Salary" />
  <ui-lib-data-grid-column field="status" header="Status" frozen="end" width="120px" />
</ui-lib-data-grid>
```

### Server-side lazy load

```html
<ui-lib-data-grid
  [value]="rows()"
  dataKey="id"
  [lazy]="true"
  [totalRecords]="totalRecords()"
  [paginator]="true"
  [rows]="pageSize()"
  (lazyLoad)="onLazyLoad($event)"
>
  <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
  <ui-lib-data-grid-column field="status" header="Status" [filterable]="true" />
</ui-lib-data-grid>
```

```typescript
onLazyLoad(event: DataGridLazyLoadEvent): void {
  this.apiService.getPage({
    first: event.first,
    rows: event.rows,
    sort: event.sortField,
    order: event.sortOrder,
    filter: event.globalFilter,
  }).subscribe(result => {
    this.rows.set(result.data);
    this.totalRecords.set(result.total);
  });
}
```

### Row selection with two-way binding

```html
<ui-lib-data-grid
  [value]="rows()"
  dataKey="id"
  selectionMode="checkbox"
  [(selection)]="selected"
  (rowSelected)="onSelect($event)"
>
  <ui-lib-data-grid-column field="name" header="Name" />
</ui-lib-data-grid>
<p>{{ selected().length }} rows selected</p>
```

### Inline cell editing

```html
<ui-lib-data-grid [value]="rows()" dataKey="id" editMode="cell">
  <ui-lib-data-grid-column field="name" header="Name" [editable]="true" />
  <ui-lib-data-grid-column field="salary" header="Salary" [editable]="true">
    <ng-template uiDataGridColumnEditor let-row let-field="field">
      <input type="number" [(ngModel)]="row[field]" class="edit-input" />
    </ng-template>
  </ui-lib-data-grid-column>
</ui-lib-data-grid>
```

---

## CSS custom properties

All tokens are scoped to `.ui-lib-data-grid` and can be overridden in any
ancestor selector without increasing specificity.

| Token                                             | Default                   | Description                                    |
| ------------------------------------------------- | ------------------------- | ---------------------------------------------- |
| `--uilib-data-grid-border-color`                  | `#e5e7eb`                 | Outer border colour.                           |
| `--uilib-data-grid-border-radius`                 | `0.5rem`                  | Outer corner radius.                           |
| `--uilib-data-grid-border-width`                  | `1px`                     | Outer border width.                            |
| `--uilib-data-grid-header-bg`                     | `#f9fafb`                 | Header row background.                         |
| `--uilib-data-grid-header-color`                  | `#374151`                 | Header cell text colour.                       |
| `--uilib-data-grid-header-font-weight`            | `600`                     | Header cell font weight.                       |
| `--uilib-data-grid-header-padding-inline`         | `0.75rem`                 | Header cell inline padding.                    |
| `--uilib-data-grid-header-padding-block`          | `0.75rem`                 | Header cell block padding.                     |
| `--uilib-data-grid-header-sort-icon-color`        | `#9ca3af`                 | Inactive sort icon colour.                     |
| `--uilib-data-grid-header-sort-icon-active-color` | `#4f46e5`                 | Active sort icon colour.                       |
| `--uilib-data-grid-cell-bg`                       | `#ffffff`                 | Body cell background.                          |
| `--uilib-data-grid-cell-color`                    | `#111827`                 | Body cell text colour.                         |
| `--uilib-data-grid-cell-padding-inline`           | `0.75rem`                 | Body cell inline padding.                      |
| `--uilib-data-grid-cell-padding-block`            | `0.75rem`                 | Body cell block padding.                       |
| `--uilib-data-grid-cell-border-color`             | `#f3f4f6`                 | Cell row-separator colour.                     |
| `--uilib-data-grid-row-hover-bg`                  | `#eef2ff`                 | Row hover background.                          |
| `--uilib-data-grid-row-selected-bg`               | `#e0e7ff`                 | Selected row background.                       |
| `--uilib-data-grid-row-selected-color`            | `#111827`                 | Selected row text colour.                      |
| `--uilib-data-grid-row-stripe-bg`                 | `#f9fafb`                 | Alternate stripe row background.               |
| `--uilib-data-grid-frozen-shadow-start`           | `4px 0 8px -2px #e5e7eb`  | Shadow cast by frozen-start columns.           |
| `--uilib-data-grid-frozen-shadow-end`             | `-4px 0 8px -2px #e5e7eb` | Shadow cast by frozen-end columns.             |
| `--uilib-data-grid-resize-handle-color`           | `#d1d5db`                 | Column resize handle colour.                   |
| `--uilib-data-grid-resize-handle-hover-color`     | `#6366f1`                 | Column resize handle hover colour.             |
| `--uilib-data-grid-resize-handle-width`           | `4px`                     | Column resize handle hit-area width.           |
| `--uilib-data-grid-sort-badge-bg`                 | `#6366f1`                 | Multi-sort order badge background.             |
| `--uilib-data-grid-sort-badge-color`              | `#ffffff`                 | Multi-sort order badge text colour.            |
| `--uilib-data-grid-sort-icon-font-size`           | `0.7rem`                  | Sort icon font size.                           |
| `--uilib-data-grid-sort-badge-font-size`          | `0.625rem`                | Sort badge font size.                          |
| `--uilib-data-grid-filter-bg`                     | `#ffffff`                 | Column filter input background.                |
| `--uilib-data-grid-filter-border-color`           | `#d1d5db`                 | Column filter input border colour.             |
| `--uilib-data-grid-filter-focus-ring`             | `0 0 0 2px #a5b4fc`       | Column filter input focus ring.                |
| `--uilib-data-grid-edit-ring`                     | `inset 0 0 0 2px #6366f1` | Active cell-edit focus ring.                   |
| `--uilib-data-grid-editor-bg`                     | `#ffffff`                 | Inline editor background.                      |
| `--uilib-data-grid-caption-padding`               | `0.75rem`                 | Caption area padding.                          |
| `--uilib-data-grid-caption-color`                 | `#374151`                 | Caption text colour.                           |
| `--uilib-data-grid-caption-font-size`             | `0.875rem`                | Caption font size.                             |
| `--uilib-data-grid-empty-padding`                 | `2.5rem`                  | Empty-state cell padding.                      |
| `--uilib-data-grid-empty-color`                   | `#6b7280`                 | Empty-state text colour.                       |
| `--uilib-data-grid-focus-ring`                    | `0 0 0 3px #a5b4fc`       | Grid-level focus ring.                         |
| `--uilib-data-grid-font-size`                     | `0.875rem`                | Base font size (md).                           |
| `--uilib-data-grid-row-height`                    | `3rem`                    | Row height used in virtual scroll layout (md). |

---

## Accessibility

- `role="grid"` on the wrapper div; `role="row"` on every row; `role="columnheader"` on header cells; `role="gridcell"` on body cells.
- `aria-sort="ascending|descending|none"` updated on every sort cycle.
- `aria-rowcount` reflects total records (including server-side totals).
- `aria-rowindex` is set on every visible row (1-based, accounting for virtual scroll offset).
- `aria-colindex` is set on every cell (1-based).
- `aria-label` on checkbox inputs (`data-grid.select-all`, `data-grid.select-row`).
- All interactive non-button elements expose `tabindex="0"` and respond to `Enter`/`Space`.
- Fully keyboard-navigable per the WAI-ARIA Grid pattern; see Keyboard interactions above.
- Inherits `prefers-reduced-motion` support from global transition tokens.
