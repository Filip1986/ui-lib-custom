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

### Column definition shape

Use one `<ui-lib-table-column>` per visible column. The effective column definition is:

```ts
interface TableColumnDefinition {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string | null;
}
```

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

## Selection modes

| Mode | Behavior |
|------|----------|
| `null` | No row selection; rows do not expose `aria-selected` |
| `'single'` | One selected row at a time; the grid exposes `aria-multiselectable="false"` |
| `'multiple'` | Click/keyboard selection across multiple rows; the grid exposes `aria-multiselectable="true"` |
| `'checkbox'` | Selection uses a checkbox column and `aria-multiselectable="true"` |

## Keyboard navigation

Interactive tables render with `role="grid"` and use roving tabindex across header and body cells.

| Key | Behavior |
|-----|----------|
| `Tab` / `Shift+Tab` | Enter or leave the grid from the currently active cell |
| `ArrowLeft` / `ArrowRight` | Move focus between cells in the same row |
| `ArrowUp` / `ArrowDown` | Move focus to the previous or next row in the same column |
| `Home` / `End` | Move focus to the first or last cell in the current row |
| `Ctrl+Home` / `Ctrl+End` | Move focus to the first or last focusable cell in the grid |
| `Enter` / `Space` | Activate the focused sortable header or selectable row |

## ARIA structure

```text
table[role="grid|table"]
├─ thead[role="rowgroup"]
│  └─ tr[role="row"]
│     └─ th[role="columnheader"]
└─ tbody[role="rowgroup"]
   ├─ tr[role="row"][aria-selected][aria-expanded]
   │  └─ td[role="gridcell|cell"]
   └─ tr[role="row"] (expanded content)
```

## Accessibility notes

- Sortable headers expose `aria-sort` and a polite live region announces `"Table sorted by {column}, {direction}."`
- Selectable grids expose `aria-multiselectable`, and selectable body rows expose `aria-selected="true|false"`
- Expandable rows expose `aria-expanded` on the row and toggle button, with `aria-controls` pointing to the generated expanded-row ID
- Paginated tables announce `"Page N of M"` through a polite live region in addition to the embedded paginator semantics

## Pagination notes

- When `[paginator]="true"`, the table exposes `aria-rowcount` for the full filtered dataset.
- Visible body rows receive `aria-rowindex` so assistive technology can announce their position in the paginated result set.
- Built-in pagination remains client-side; use `pageChanged` to coordinate server-side data fetching if needed.

## CSS custom properties

| Variable | Purpose |
|----------|---------|
| `--uilib-table-border-color` | Grid and wrapper border color |
| `--uilib-table-header-bg` | Header row background |
| `--uilib-table-row-bg-hover` | Hovered row background |
| `--uilib-table-row-bg-selected` | Selected row background |
| `--uilib-table-selection-border-color` | Focus ring and selection accent |
| `--uilib-table-sort-icon-color-active` | Active sort indicator color |
| `--uilib-table-caption-bg` | Caption background |
| `--uilib-table-paginator-margin-top` | Space above the embedded paginator |
