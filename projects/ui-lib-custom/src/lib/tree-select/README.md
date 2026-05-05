# TreeSelect

**Selector:** `ui-lib-tree-select`
**Package:** `ui-lib-custom/tree-select`
**Content projection:** no — none

> Both `selection` and `panelVisible` are `model()` signals and support two-way binding with `[()]`. The component also implements CVA, so it works with `ngModel` and reactive forms — but the model value type is `TreeNode | TreeNode[] | null`, not a plain primitive.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `nodes` | `TreeNode[]` | `[]` | Root-level tree nodes to display |
| `selectionMode` | `'single' \| 'multiple' \| 'checkbox'` | `'single'` | Selection behaviour |
| `selection` | `TreeNode \| TreeNode[] \| null` | `null` | Two-way bindable via `[(selection)]` |
| `panelVisible` | `boolean` | `false` | Two-way bindable panel visibility via `[(panelVisible)]` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to ThemeConfigService |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `placeholder` | `string` | `''` | Placeholder when nothing is selected |
| `disabled` | `boolean` | `false` | Disable the component |
| `loading` | `boolean` | `false` | Show loading state; disables interaction |
| `filter` | `boolean` | `false` | Show a filter input inside the panel |
| `filterPlaceholder` | `string` | `''` | Placeholder for the filter input |
| `showClear` | `boolean` | `false` | Show a clear button when a value is selected |
| `styleClass` | `string` | `''` | Extra CSS class applied to the host element |
| `ariaLabel` | `string \| null` | `null` | ARIA label |
| `ariaLabelledBy` | `string \| null` | `null` | ARIA labelledby |
| `invalid` | `boolean` | `false` | Apply error styling |
| `required` | `boolean` | `false` | Set `aria-required` |
| `emptyMessage` | `string` | `'No results found'` | Message when `nodes` is empty |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `selectionChange` | `TreeSelectChangeEvent` | Selection changed |
| `show` | `TreeSelectShowEvent` | Panel opened |
| `hide` | `TreeSelectHideEvent` | Panel closed |
| `nodeSelect` | `TreeNodeSelectEvent` | A tree node was selected |
| `nodeUnselect` | `TreeNodeSelectEvent` | A tree node was unselected |
| `nodeExpand` | `TreeNodeExpandEvent` | A tree node was expanded |
| `nodeCollapse` | `TreeNodeCollapseEvent` | A tree node was collapsed |
| `cleared` | `void` | Clear button clicked |

## Usage

```html
<!-- single selection -->
<ui-lib-tree-select
  [nodes]="treeData"
  selectionMode="single"
  [(selection)]="selectedNode"
  placeholder="Choose a category"
/>

<!-- checkbox multi-selection with filter -->
<ui-lib-tree-select
  [nodes]="treeData"
  selectionMode="checkbox"
  [filter]="true"
  [(selection)]="selectedNodes"
/>
```
