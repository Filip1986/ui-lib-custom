# OrganizationChart

**Selector:** `ui-lib-organization-chart`
**Package:** `ui-lib-custom/organization-chart`
**Content projection:** yes — node templates projected via `uiOrgChartNode` directive; multiple templates can be registered with a `type` attribute to match `OrganizationChartNode.type`

> `selection` is a `model()` signal — use `[(selection)]` for two-way binding. Node expand/collapse state is stored directly on `OrganizationChartNode.expanded` (mutation on the data object), matching PrimeNG's API. Nodes default to expanded unless `expanded: false` is explicitly set.

## Inputs

| Name            | Type                                                       | Default          | Notes                                                            |
| --------------- | ---------------------------------------------------------- | ---------------- | ---------------------------------------------------------------- |
| `value`         | `OrganizationChartNode[]`                                  | `[]`             | Root-level nodes of the tree.                                    |
| `selectionMode` | `'single' \| 'multiple' \| null`                           | `null`           | How nodes respond to click interactions.                         |
| `collapsible`   | `boolean`                                                  | `false`          | When true, nodes with children render an expand/collapse toggle. |
| `variant`       | `'material' \| 'bootstrap' \| 'minimal' \| null`           | `null`           | Falls back to global theme when null.                            |
| `styleClass`    | `string`                                                   | `''`             | Extra CSS class applied to the host element.                     |
| `ariaLabel`     | `string`                                                   | `'Organization'` | Accessible name applied to the root tree element.                |
| `selection`     | `OrganizationChartNode \| OrganizationChartNode[] \| null` | `null`           | Selected node(s). Two-way bindable via `[(selection)]`.          |

## Outputs

| Name           | Payload                            | Notes                                       |
| -------------- | ---------------------------------- | ------------------------------------------- |
| `nodeSelect`   | `OrganizationChartNodeSelectEvent` | Emitted when a node is selected.            |
| `nodeUnselect` | `OrganizationChartNodeSelectEvent` | Emitted when a node is unselected.          |
| `nodeExpand`   | `OrganizationChartNodeExpandEvent` | Emitted when a node's subtree is expanded.  |
| `nodeCollapse` | `OrganizationChartNodeExpandEvent` | Emitted when a node's subtree is collapsed. |

## Usage

```html
<!-- read-only chart -->
<ui-lib-organization-chart [value]="nodes">
  <ng-template uiOrgChartNode let-node>
    <strong>{{ node.label }}</strong>
  </ng-template>
</ui-lib-organization-chart>

<!-- selectable with type-specific templates -->
<ui-lib-organization-chart
  [value]="nodes"
  selectionMode="single"
  [(selection)]="selected"
  [collapsible]="true"
>
  <ng-template uiOrgChartNode type="manager" let-node>{{ node.label }} (Mgr)</ng-template>
  <ng-template uiOrgChartNode let-node>{{ node.label }}</ng-template>
</ui-lib-organization-chart>
```

## Node data shape

`OrganizationChartNode` is recursive and supports:

- `key: string`
- `label?: string`
- `data?: unknown`
- `children?: OrganizationChartNode[]`
- `expanded?: boolean` (defaults to expanded)
- `selected?: boolean` (optional preselection hint in your data model)
- `selectable?: boolean` (defaults to selectable)

## Keyboard accessibility

When focus is on a node (`role="treeitem"`):

- `ArrowDown` / `ArrowUp`: move focus to next/previous visible node
- `ArrowRight`: expand collapsed node or move to first child
- `ArrowLeft`: collapse expanded node or move focus to parent
- `Home` / `End`: first/last visible node
- `Enter` / `Space`: select focused node (when selection mode is enabled)
- Type-ahead: alphanumeric key focuses next visible node whose label starts with that character

## Linear reading fallback slot

You can project a linear fallback representation for assistive or alternate reading flows:

```html
<ui-lib-organization-chart [value]="nodes">
  <div listFallback>
    <h3>Organization list</h3>
    <ul>
      <li>CEO</li>
      <li>VP Engineering</li>
      <li>VP Sales</li>
    </ul>
  </div>
</ui-lib-organization-chart>
```
