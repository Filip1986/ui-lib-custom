# Table

**Selector:** `ui-lib-table` (container) / `ui-lib-table-column` (column definition)
**Package:** `ui-lib-custom/table`
**Content projection:** yes — `<ui-lib-table-column>` children are projected; structural template directives (`[uiTableCaption]`, `[uiTableHeader]`, `[uiTableBody]`, `[uiTableFooter]`, `[uiTableEmpty]`, `[uiTableExpansion]`) replace auto-generated sections; column-level: `[uiTableColumnHeader]`, `[uiTableColumnBody]`, `[uiTableColumnFooter]`, `[uiTableColumnFilter]`

> Sorting, filtering, and pagination all operate client-side on `value[]` by default. `dataKey` is required for row expansion and for correct equality checks in selection mode — omitting it disables both features silently.

---

## `ui-lib-table` — Container

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `unknown[]` | `[]` | Array of row objects |
| `dataKey` | `string \| null` | `null` | Dot-notation property path for unique row identity; required for expansion and selection |
| `sortField` | `string \| null` | `null` | **Two-way** (`model`). Active sort field |
| `sortOrder` | `1 \| -1 \| 0` | `1` | **Two-way** (`model`). Sort direction |
| `multiSortMode` | `boolean` | `false` | Ctrl+click adds columns to a multi-sort stack |
| `multiSortMeta` | `TableSortMeta[]` | `[]` | **Two-way** (`model`). Current multi-sort stack |
| `globalFilter` | `string` | `''` | **Two-way** (`model`). Filter string applied across all columns |
| `globalFilterFields` | `string[] \| null` | `null` | Columns to search; searches all columns when null |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | String match strategy |
| `filterLocale` | `string \| undefined` | `undefined` | BCP 47 locale for string comparisons |
| `globalFilterPlaceholder` | `string` | `'Search...'` | Placeholder for the global filter input |
| `selectionMode` | `'single' \| 'multiple' \| 'checkbox' \| null` | `null` | Row selection strategy |
| `selection` | `unknown` | `null` | **Two-way** (`model`). Selected row(s); single object or array depending on mode |
| `metaKeySelection` | `boolean` | `false` | Require Ctrl/Meta to toggle multi-select |
| `expandedRowKeys` | `Set<unknown>` | `new Set()` | **Two-way** (`model`). Row keys currently expanded |
| `paginator` | `boolean` | `false` | Renders the built-in paginator |
| `rows` | `number` | `10` | **Two-way** (`model`). Rows per page |
| `first` | `number` | `0` | **Two-way** (`model`). Zero-based first row offset |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50]` | Options for the rows-per-page selector |
| `currentPageReportTemplate` | `string` | `'{currentPage} of {totalPages}'` | Page report string; supports `{currentPage}`, `{totalPages}` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; inherits from `ThemeConfigService` when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `stripedRows` | `boolean` | `false` | Alternating row background tint |
| `rowHover` | `boolean` | `false` | Pointer cursor and hover highlight on rows |
| `showGridlines` | `boolean` | `false` | Grid lines between all cells |
| `scrollable` | `boolean` | `false` | Wraps table body in a scrollable container |
| `scrollHeight` | `string \| null` | `null` | CSS height of the scrollable viewport (e.g. `'400px'`) |
| `disabled` | `boolean` | `false` | Makes the entire table non-interactive |
| `emptyMessage` | `string` | `'No records found.'` | Default empty-state text |
| `caption` | `string \| null` | `null` | Caption text rendered above the table |
| `ariaLabel` | `string \| null` | `null` | Accessible label for the `<table>` element |
| `styleClass` | `string \| null` | `null` | Extra CSS class(es) on the host |

### Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `sorted` | `TableSortEvent` | Emitted when sort order changes |
| `filtered` | `TableFilterEvent` | Emitted when a filter value changes |
| `rowSelected` | `TableRowSelectEvent` | Emitted when a row is selected |
| `rowUnselected` | `TableRowUnselectEvent` | Emitted when a row is deselected |
| `rowExpanded` | `TableRowExpandEvent` | Emitted when a row is expanded |
| `rowCollapsed` | `TableRowCollapseEvent` | Emitted when a row is collapsed |
| `pageChanged` | `TablePageEvent` | Emitted when the page or rows-per-page changes |

---

## `ui-lib-table-column` — Column Definition

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `field` | `string` | `''` | Dot-notation path to the cell value |
| `header` | `string` | `''` | Column header text |
| `footer` | `string` | `''` | Column footer text |
| `sortable` | `boolean` | `false` | Enables header-click sorting |
| `sortField` | `string \| null` | `null` | Override field used for sorting |
| `filterable` | `boolean` | `false` | Shows a filter input in the filter row |
| `filterField` | `string \| null` | `null` | Override field used for filtering |
| `filterPlaceholder` | `string` | `'Search...'` | Placeholder for the column filter input |
| `width` | `string \| null` | `null` | Explicit column width (e.g. `'200px'`) |
| `frozen` | `boolean` | `false` | Sticky column on the left |
| `styleClass` | `string \| null` | `null` | Extra class on every `<td>` and `<th>` in this column |

---

## Usage

```html
<!-- Basic sortable table with pagination -->
<ui-lib-table [value]="products" dataKey="id" [paginator]="true" [rows]="10">
  <ui-lib-table-column field="name"  header="Name"  [sortable]="true" />
  <ui-lib-table-column field="price" header="Price" [sortable]="true" />
</ui-lib-table>

<!-- Checkbox selection with custom cell template -->
<ui-lib-table [value]="products" dataKey="id" selectionMode="checkbox" [(selection)]="selected">
  <ui-lib-table-column field="name" header="Name">
    <ng-template uiTableColumnBody let-row>{{ row.name | uppercase }}</ng-template>
  </ui-lib-table-column>
</ui-lib-table>
```
