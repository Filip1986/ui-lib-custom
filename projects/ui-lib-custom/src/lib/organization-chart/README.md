# OrganizationChart

**Selector:** `ui-lib-organization-chart`
**Package:** `ui-lib-custom/organization-chart`
**Content projection:** yes — node templates projected via `uiOrgChartNode` directive; multiple templates can be registered with a `type` attribute to match `OrganizationChartNode.type`

> `selection` is a `model()` signal — use `[(selection)]` for two-way binding. Node expand/collapse state is stored directly on `OrganizationChartNode.expanded` (mutation on the data object), matching PrimeNG's API. Nodes default to expanded unless `expanded: false` is explicitly set.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `OrganizationChartNode[]` | `[]` | Root-level nodes of the tree. |
| `selectionMode` | `'single' \| 'multiple' \| null` | `null` | How nodes respond to click interactions. |
| `collapsible` | `boolean` | `false` | When true, nodes with children render an expand/collapse toggle. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `styleClass` | `string` | `''` | Extra CSS class applied to the host element. |
| `selection` | `OrganizationChartNode \| OrganizationChartNode[] \| null` | `null` | Selected node(s). Two-way bindable via `[(selection)]`. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `nodeSelect` | `OrganizationChartNodeSelectEvent` | Emitted when a node is selected. |
| `nodeUnselect` | `OrganizationChartNodeSelectEvent` | Emitted when a node is unselected. |
| `nodeExpand` | `OrganizationChartNodeExpandEvent` | Emitted when a node's subtree is expanded. |
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
<ui-lib-organization-chart [value]="nodes" selectionMode="single" [(selection)]="selected" [collapsible]="true">
  <ng-template uiOrgChartNode type="manager" let-node>{{ node.label }} (Mgr)</ng-template>
  <ng-template uiOrgChartNode let-node>{{ node.label }}</ng-template>
</ui-lib-organization-chart>
```
