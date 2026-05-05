# TreeTable

**Selector:** `ui-lib-tree-table`
**Package:** `ui-lib-custom/tree-table`
**Content projection:** yes — columns are declared as `<ui-lib-tree-table-column>` child components inside the tree-table

> `selection`, `sortField`, and `sortOrder` are `model()` signals and support two-way binding. Node expand/collapse state is stored directly on `TreeTableNode.expanded` (mutation on the data object). The expander toggle and depth indentation are rendered in the column that has `[expander]="true"` — defaults to column index 0. Client-side sorting is applied per-level (siblings only), not globally across the flat list.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `TreeTableNode[]` | `[]` | Root-level nodes to display. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Row height / density. |
| `selectionMode` | `'single' \| 'multiple' \| 'checkbox' \| null` | `null` | How rows respond to click interactions. |
| `selection` | `TreeTableNode \| TreeTableNode[] \| null` | `null` | Selected node(s). Two-way bindable via `[(selection)]`. |
| `sortField` | `string \| null` | `null` | Active sort field. Two-way bindable via `[(sortField)]`. |
| `sortOrder` | `1 \| -1 \| 0` | `0` | Sort direction. Two-way bindable via `[(sortOrder)]`. |
| `globalFilter` | `boolean` | `false` | Renders a global filter input above the table. |
| `globalFilterPlaceholder` | `string` | `'Search...'` | Placeholder for the global filter input. |
| `scrollable` | `boolean` | `false` | Makes the table body scrollable. |
| `scrollHeight` | `string \| null` | `null` | CSS height for the scrollable body (e.g. `'400px'`). |
| `caption` | `string` | `''` | Caption text above the table. |
| `styleClass` | `string` | `''` | Extra CSS class on the host element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `nodeExpand` | `TreeTableNodeExpandEvent` | Emitted when a row is expanded. |
| `nodeCollapse` | `TreeTableNodeCollapseEvent` | Emitted when a row is collapsed. |
| `nodeSelect` | `TreeTableNodeSelectEvent` | Emitted when a node is selected. |
| `nodeUnselect` | `TreeTableNodeSelectEvent` | Emitted when a node is unselected. |
| `sortChange` | `TreeTableSortEvent` | Emitted when sort column or direction changes. |

## Usage

```html
<!-- basic expandable table -->
<ui-lib-tree-table [value]="nodes">
  <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
  <ui-lib-tree-table-column field="size" header="Size" />
</ui-lib-tree-table>

<!-- sortable with checkbox selection -->
<ui-lib-tree-table [value]="nodes" selectionMode="checkbox" [(selection)]="selected">
  <ui-lib-tree-table-column field="name" header="Name" [expander]="true" [sortable]="true" />
  <ui-lib-tree-table-column field="type" header="Type" [sortable]="true" />
</ui-lib-tree-table>
```
