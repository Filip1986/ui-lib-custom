# Tree

**Selector:** `ui-lib-tree`
**Package:** `ui-lib-custom/tree`
**Content projection:** yes — node templates projected via `uiTreeNode` directive; multiple templates can be registered with a `type` attribute matching `TreeNode.type`; the `'default'` type template is used as a fallback

> `selection` is a `model()` signal — use `[(selection)]` for two-way binding. Node expand/collapse state is stored directly on `TreeNode.expanded` (mutation on the data object), matching PrimeNG's API. In `checkbox` mode, clicking the label does nothing — only the checkbox control triggers selection cascading.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `TreeNode[]` | `[]` | Root-level nodes of the tree. |
| `selectionMode` | `'single' \| 'multiple' \| 'checkbox' \| null` | `null` | How nodes respond to interactions. |
| `selection` | `TreeNode \| TreeNode[] \| null` | `null` | Selected node(s). Two-way bindable via `[(selection)]`. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Node row density. |
| `filter` | `boolean` | `false` | When true, renders a filter input above the tree. |
| `filterBy` | `string` | `'label'` | `TreeNode` property to search when filtering. |
| `filterMode` | `'lenient' \| 'strict'` | `'lenient'` | `lenient`: visible if node or any descendant matches. `strict`: visible only if the node itself matches. |
| `filterPlaceholder` | `string` | `'Search...'` | Placeholder for the filter input. |
| `styleClass` | `string` | `''` | Extra CSS class on the host element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `nodeSelect` | `TreeNodeSelectEvent` | Emitted when a node is selected. |
| `nodeUnselect` | `TreeNodeSelectEvent` | Emitted when a node is unselected. |
| `nodeExpand` | `TreeNodeExpandEvent` | Emitted when a node's subtree is expanded. |
| `nodeCollapse` | `TreeNodeCollapseEvent` | Emitted when a node's subtree is collapsed. |

## Usage

```html
<!-- simple tree with single selection -->
<ui-lib-tree [value]="nodes" selectionMode="single" [(selection)]="selected">
  <ng-template uiTreeNode let-node>{{ node.label }}</ng-template>
</ui-lib-tree>

<!-- checkbox tree with filter -->
<ui-lib-tree [value]="nodes" selectionMode="checkbox" [(selection)]="checked" [filter]="true">
  <ng-template uiTreeNode let-node>{{ node.label }}</ng-template>
</ui-lib-tree>
```
