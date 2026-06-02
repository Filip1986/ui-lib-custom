# TreeTable

**Selector:** `ui-lib-tree-table`
**Package:** `ui-lib-custom/tree-table`
**Content projection:** yes — columns are declared as `<ui-lib-tree-table-column>` child components inside the tree-table

> `selection`, `sortField`, and `sortOrder` are `model()` signals and support two-way binding. Node expand/collapse state is stored directly on `TreeTableNode.expanded` (mutation on the data object). The expander toggle and depth indentation are rendered in the column that has `[expander]="true"` — defaults to column index 0. Client-side sorting is applied per-level (siblings only), not globally across the flat list.

## Inputs

| Name                      | Type                                             | Default       | Notes                                                                                                                    |
| ------------------------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `value`                   | `TreeTableNode[]`                                | `[]`          | Root-level nodes to display.                                                                                             |
| `variant`                 | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`        | Falls back to global theme when null.                                                                                    |
| `size`                    | `'sm' \| 'md' \| 'lg'`                           | `'md'`        | Row height / density.                                                                                                    |
| `selectionMode`           | `'single' \| 'multiple' \| 'checkbox' \| null`   | `null`        | How rows respond to click interactions.                                                                                  |
| `selection`               | `TreeTableNode \| TreeTableNode[] \| null`       | `null`        | Selected node(s). Two-way bindable via `[(selection)]`.                                                                  |
| `sortField`               | `string \| null`                                 | `null`        | Active sort field. Two-way bindable via `[(sortField)]`.                                                                 |
| `sortOrder`               | `1 \| -1 \| 0`                                   | `0`           | Sort direction. Two-way bindable via `[(sortOrder)]`.                                                                    |
| `globalFilter`            | `boolean`                                        | `false`       | Renders a global filter input above the table.                                                                           |
| `globalFilterPlaceholder` | `string`                                         | `'Search...'` | Placeholder for the global filter input.                                                                                 |
| `scrollable`              | `boolean`                                        | `false`       | Makes the table body scrollable.                                                                                         |
| `scrollHeight`            | `string \| null`                                 | `null`        | CSS height for the scrollable body (e.g. `'400px'`).                                                                     |
| `caption`                 | `string`                                         | `''`          | Caption text above the table. Also used as `aria-label` fallback.                                                        |
| `ariaLabel`               | `string`                                         | `''`          | Explicit accessible name for the treegrid. Overrides `caption` fallback. Defaults to `'Tree table'` when both are empty. |
| `styleClass`              | `string`                                         | `''`          | Extra CSS class on the host element.                                                                                     |

## Outputs

| Name           | Payload                      | Notes                                          |
| -------------- | ---------------------------- | ---------------------------------------------- |
| `nodeExpand`   | `TreeTableNodeExpandEvent`   | Emitted when a row is expanded.                |
| `nodeCollapse` | `TreeTableNodeCollapseEvent` | Emitted when a row is collapsed.               |
| `nodeSelect`   | `TreeTableNodeSelectEvent`   | Emitted when a node is selected.               |
| `nodeUnselect` | `TreeTableNodeSelectEvent`   | Emitted when a node is unselected.             |
| `sortChange`   | `TreeTableSortEvent`         | Emitted when sort column or direction changes. |

## Usage

```html
<!-- basic expandable table -->
<ui-lib-tree-table [value]="nodes" ariaLabel="File system">
  <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
  <ui-lib-tree-table-column field="size" header="Size" />
</ui-lib-tree-table>

<!-- sortable with checkbox selection -->
<ui-lib-tree-table
  [value]="nodes"
  selectionMode="checkbox"
  [(selection)]="selected"
  ariaLabel="File system"
>
  <ui-lib-tree-table-column field="name" header="Name" [expander]="true" [sortable]="true" />
  <ui-lib-tree-table-column field="type" header="Type" [sortable]="true" />
</ui-lib-tree-table>
```

## ARIA Structure

```
table[role="treegrid"][aria-label]
  thead[role="rowgroup"]
    tr[role="row"]
      th[scope="col"][role="columnheader"]      (data columns)
      th[scope="col"][aria-sort]                (sortable columns)
  tbody[role="rowgroup"]
    tr[role="row"][aria-level][aria-setsize][aria-posinset][aria-expanded?][aria-rowindex][data-key]
      td[role="rowheader"][aria-colindex]       (first / expander column)
      td[role="gridcell"][aria-colindex]        (other data columns)
      td[role="gridcell"][aria-colindex="1"]    (checkbox column, if selectionMode="checkbox")
```

**Key attributes per row:**

| Attribute       | Value                | Notes                                                    |
| --------------- | -------------------- | -------------------------------------------------------- |
| `aria-level`    | `1`–`N`              | 1-based nesting depth. Root rows = 1.                    |
| `aria-setsize`  | integer              | Number of visible siblings under the same parent.        |
| `aria-posinset` | integer              | 1-based position among visible siblings.                 |
| `aria-expanded` | `"true"` / `"false"` | Present only on rows with children. Absent on leaf rows. |
| `aria-rowindex` | integer              | 1-based row position (header = 1, body rows start at 2). |
| `data-key`      | string               | Node key — used internally for keyboard navigation.      |

## Keyboard Interaction

| Key               | Behavior                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ArrowDown`       | Move focus to the next visible row.                                                                              |
| `ArrowUp`         | Move focus to the previous visible row.                                                                          |
| `ArrowRight`      | If collapsed parent: expand it (focus stays). If expanded parent: move focus to first child. If leaf: no action. |
| `ArrowLeft`       | If expanded parent: collapse it (focus stays). If collapsed/leaf at depth > 1: move focus to parent row.         |
| `Home`            | Move focus to the first visible row.                                                                             |
| `End`             | Move focus to the last visible row.                                                                              |
| `Enter` / `Space` | Activate row (select/deselect in selection modes).                                                               |
| `Tab`             | Exits the treegrid to the next focusable element in the page.                                                    |

## CSS Custom Properties

| Property                                | Default                 | Description                         |
| --------------------------------------- | ----------------------- | ----------------------------------- |
| `--uilib-tree-table-header-bg`          | `#f5f5f5`               | Header row background.              |
| `--uilib-tree-table-header-color`       | `#333`                  | Header text colour.                 |
| `--uilib-tree-table-header-border`      | `1px solid #e0e0e0`     | Header bottom border.               |
| `--uilib-tree-table-row-bg`             | `#ffffff`               | Body row background.                |
| `--uilib-tree-table-row-bg-alt`         | `#fafafa`               | Alternating row background.         |
| `--uilib-tree-table-row-bg-hover`       | `rgba(0,0,0,0.04)`      | Row hover background.               |
| `--uilib-tree-table-row-bg-selected`    | `rgba(25,118,210,0.12)` | Selected row background.            |
| `--uilib-tree-table-row-color`          | `#333`                  | Body row text colour.               |
| `--uilib-tree-table-row-color-selected` | `#1976d2`               | Selected row text colour.           |
| `--uilib-tree-table-row-border`         | `1px solid #e0e0e0`     | Row bottom border.                  |
| `--uilib-tree-table-font-size`          | `0.875rem`              | Table font size.                    |
| `--uilib-tree-table-toggle-size`        | `1.25rem`               | Expand/collapse toggle button size. |
| `--uilib-tree-table-indent-size`        | `1.5rem`                | Indent per depth level.             |

## Accessibility Notes

- The table always has `role="treegrid"` and a computed accessible name (`ariaLabel` → `caption` → `'Tree table'`).
- Every row carries `aria-level`, `aria-setsize`, and `aria-posinset` — screen readers use these to announce the row's position in the hierarchy.
- Parent rows carry `aria-expanded="true"` or `"false"`. Leaf rows have no `aria-expanded` attribute.
- The first data cell per row uses `role="rowheader"`; all other cells use `role="gridcell"`.
- Checkbox spans always have an `aria-label` (`"Select all rows"` / `"Select row"`) so toggle-field accessible-name rules are satisfied.
- Keyboard navigation follows the [WAI-ARIA Treegrid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/): arrow keys move between and into/out of hierarchy levels.
- `prefers-reduced-motion: reduce` disables all transitions on rows, toggles, and checkboxes.
- Each instance gets a unique stable `instanceId` (`ui-lib-tree-table-N`) for reliable automated testing.
