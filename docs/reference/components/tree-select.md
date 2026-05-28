# Tree Select

**Selector:** `ui-lib-tree-select`
**Entry point:** `import { TreeSelect } from 'ui-lib-custom/tree-select'`

---

## Overview

TreeSelect renders a hierarchical tree structure inside a dropdown panel, allowing single, multiple, or checkbox-based selection.

## API

### Inputs

| Name                | Type                       | Default                                  | Description                                                                   |
| ------------------- | -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `ariaLabel`         | `string | null`            | `null`                                   | ARIA label for the trigger.                                                   |
| `ariaLabelledBy`    | `string | null`            | `null`                                   | References an external element that labels this component.                    |
| `disabled`          | `boolean`                  | `false`                                  | When `true`, the component is non-interactive.                                |
| `emptyMessage`      | `string`                   | `TREE_SELECT_DEFAULTS.emptyMessage`      | Message shown when the node list is empty.                                    |
| `filter`            | `boolean`                  | `false`                                  | When `true`, a filter input is rendered inside the panel.                     |
| `filterPlaceholder` | `string`                   | `TREE_SELECT_DEFAULTS.filterPlaceholder` | Placeholder for the filter input inside the panel.                            |
| `invalid`           | `boolean`                  | `false`                                  | When `true`, applies the invalid visual state and `aria-invalid`.             |
| `loading`           | `boolean`                  | `false`                                  | When `true`, a loading spinner is shown and the component is non-interactive. |
| `nodes`             | `TreeNode[]`               | `[]`                                     | Root-level tree nodes to display in the panel.                                |
| `placeholder`       | `string`                   | `TREE_SELECT_DEFAULTS.placeholder`       | Placeholder text shown when no node is selected.                              |
| `required`          | `boolean`                  | `false`                                  | When `true`, sets `aria-required`.                                            |
| `selectionMode`     | `TreeSelectSelectionMode`  | `'single'`                               | Controls how nodes respond to user interaction.                               |
| `showClear`         | `boolean`                  | `false`                                  | When `true`, shows a clear button when a value is selected.                   |
| `size`              | `TreeSelectSize`           | `'md'`                                   | Size of the trigger element.                                                  |
| `styleClass`        | `string`                   | `''`                                     | Extra CSS class applied to the host element.                                  |
| `variant`           | `TreeSelectVariant | null` | `null`                                   | Design variant. Falls back to ThemeConfigService when `null`.                 |

### Models (two-way bindable)

| Name           | Type                           | Default | Description                                                          |
| -------------- | ------------------------------ | ------- | -------------------------------------------------------------------- |
| `panelVisible` | `boolean`                      | `false` | Controls panel visibility. Settable programmatically.                |
| `selection`    | `TreeNode | TreeNode[] | null` | `null`  | Currently selected node(s). Use `[(selection)]` for two-way binding. |

### Outputs

| Name           | Type                    | Description                                                 |
| -------------- | ----------------------- | ----------------------------------------------------------- |
| `cleared`      | `void`                  | Emitted when the selection is cleared via the clear button. |
| `hide`         | `TreeSelectHideEvent`   | Emitted when the dropdown panel is hidden.                  |
| `nodeCollapse` | `TreeNodeCollapseEvent` | Emitted when a tree node is collapsed.                      |
| `nodeExpand`   | `TreeNodeExpandEvent`   | Emitted when a tree node is expanded.                       |
| `nodeSelect`   | `TreeNodeSelectEvent`   | Emitted when a tree node is selected.                       |
| `nodeUnselect` | `TreeNodeSelectEvent`   | Emitted when a tree node is unselected.                     |
| `show`         | `TreeSelectShowEvent`   | Emitted when the dropdown panel is shown.                   |
| `treeChange`   | `TreeSelectChangeEvent` | Emitted when the selection changes.                         |

## Content Projection

_none_

## Theming

| CSS Variable                                | Default                               |
| ------------------------------------------- | ------------------------------------- |
| `--uilib-tree-select-chevron-font-size`     | `0.8rem`                              |
| `--uilib-tree-select-clear-font-size`       | `1.1em`                               |
| `--uilib-tree-select-font-size`             | `var(--uilib-font-size-md, 1rem)`     |
| `--uilib-tree-select-font-size-lg`          | `var(--uilib-font-size-lg, 1.125rem)` |
| `--uilib-tree-select-font-size-sm`          | `var(--uilib-font-size-sm, 0.875rem)` |
| `--uilib-tree-select-panel-max-height`      | `320px`                               |
| `--uilib-tree-select-panel-radius`          | `var(--uilib-radius-md, 4px)`         |
| `--uilib-tree-select-panel-z-index`         | `var(--uilib-z-overlay, 100)`         |
| `--uilib-tree-select-trigger-min-height-lg` | `48px`                                |
| `--uilib-tree-select-trigger-min-height-md` | `40px`                                |
| `--uilib-tree-select-trigger-min-height-sm` | `32px`                                |
| `--uilib-tree-select-trigger-padding-x`     | `0.5rem`                              |
| `--uilib-tree-select-trigger-padding-y`     | `0.35rem`                             |
| `--uilib-tree-select-trigger-radius`        | `var(--uilib-radius-md, 4px)`         |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                 |
| ---------------------------------------------------------------- |
| applies aria-label to the popup tree                             |
| closes after single selection and restores focus to the combobox |
| closes on Tab from the combobox host                             |
| closes with Escape and restores focus to the combobox            |
| collapses an expanded branch with ArrowLeft                      |
| expands a collapsed branch with ArrowRight                       |
| exposes role=                                                    |
| focuses the first child with ArrowRight on an expanded branch    |
| moves focus to the filter input when filter mode is enabled      |
| moves focus to the parent with ArrowLeft on a leaf node          |
| moves to the next visible tree item with ArrowDown               |
| moves to the previous visible tree item with ArrowUp             |
| opens with ArrowDown and moves focus into the tree               |
| opens with Enter and moves focus into the tree                   |
| passes axe in checkbox + filter mode                             |
| passes axe when closed                                           |
| passes axe when open                                             |
| points aria-controls to the popup tree id                        |
| renders a polite live region for selection announcements         |
| renders a tree popup with role=                                  |
| renders role=                                                    |
| sets aria-checked on treeitems in checkbox mode                  |
| sets aria-expanded on branches and omits it on leaves            |
| sets aria-level on nested nodes                                  |
| sets aria-multiselectable in checkbox mode                       |
| sets aria-posinset within each sibling group                     |
| sets aria-selected in single-select mode                         |
| sets aria-setsize within each sibling group                      |
| should apply --variant-${variant} class                          |
| should close panel on Escape key                                 |
| should have aria-disabled=                                       |
| should have aria-expanded=                                       |
| should have aria-haspopup=                                       |
| should have combobox role on host                                |
| should have tabindex -1 when disabled                            |
| should have tabindex 0 by default                                |
| should open panel on Enter key                                   |
| should open panel on Space key                                   |
| should set aria-controls to the popup tree id when open          |
| should set aria-expanded=                                        |
| should set aria-invalid when invalid=true                        |
| should set aria-label when provided                              |
| should set aria-required when required=true                      |
| toggles aria-expanded on the host                                |
| uses aria-haspopup=                                              |
| uses aria-labelledby on the host when provided                   |

## Usage Examples

```html
<ui-lib-tree-select
  [nodes]="treeData"
  selectionMode="single"
  [(selection)]="selectedNode"
  placeholder="Choose a category"
/>

<ui-lib-tree-select
  [nodes]="treeData"
  selectionMode="checkbox"
  [filter]="true"
  [showClear]="true"
  [(selection)]="selectedNodes"
  ariaLabel="Project files"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tree-select)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tree-select/README.md)

