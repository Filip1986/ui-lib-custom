# Tree

**Selector:** `ui-lib-tree`
**Entry point:** `import { Tree } from 'ui-lib-custom/tree'`

---

## Overview

Tree renders a hierarchical data structure with expand/collapse, three selection modes (single, multiple, checkbox), optional filtering, and full three-variant theming.

## API

### Inputs

| Name                | Type                 | Default       | Description                                                                                                                                         |
| ------------------- | -------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`         | `string`             | `''`          | Accessible label for the tree widget. Used as `aria-label` on the host.                                                                             |
| `filter`            | `boolean`            | `false`       | When `true`, a filter input is rendered above the tree.                                                                                             |
| `filterBy`          | `string`             | `'label'`     | Property on TreeNode to search when filtering. Default `'label'`.                                                                                   |
| `filterMode`        | `TreeFilterMode`     | `'lenient'`   | Filter matching strategy. `'lenient'` (default): a node is visible if it or any descendant matches. `'strict'`: only exact-match nodes are visible. |
| `filterPlaceholder` | `string`             | `'Search...'` | Placeholder text for the filter input.                                                                                                              |
| `hostId`            | `string | null`      | `null`        | Optional explicit host id. Falls back to the generated instance id.                                                                                 |
| `selectionMode`     | `TreeSelectionMode`  | `null`        | How nodes respond to click/checkbox interactions.                                                                                                   |
| `size`              | `TreeSize`           | `'md'`        | Size of node rows.                                                                                                                                  |
| `styleClass`        | `string`             | `''`          | Extra CSS class applied to the host element.                                                                                                        |
| `value`             | `TreeNode[]`         | `[]`          | Root-level nodes of the tree.                                                                                                                       |
| `variant`           | `TreeVariant | null` | `null`        | Design variant. Falls back to ThemeConfigService when `null`.                                                                                       |

### Models (two-way bindable)

| Name        | Type                           | Default | Description                                                          |
| ----------- | ------------------------------ | ------- | -------------------------------------------------------------------- |
| `selection` | `TreeNode | TreeNode[] | null` | `null`  | Currently selected node(s). Use `[(selection)]` for two-way binding. |

### Outputs

| Name         | Type                  | Description                                |
| ------------ | --------------------- | ------------------------------------------ |
| `nodeExpand` | `TreeNodeExpandEvent` | Emitted when a node's subtree is expanded. |
| `nodeSelect` | `TreeNodeSelectEvent` | Emitted when a node is selected.           |

## Content Projection

_none_

## Theming

| CSS Variable                           | Default                                                 |
| -------------------------------------- | ------------------------------------------------------- |
| `--uilib-tree-checkbox-bg`             | `var(--uilib-color-surface, #ffffff)`                   |
| `--uilib-tree-checkbox-bg-checked`     | `var(--uilib-color-primary, #1976d2)`                   |
| `--uilib-tree-checkbox-border`         | `2px solid var(--uilib-color-border, #bdbdbd)`          |
| `--uilib-tree-checkbox-border-checked` | `2px solid var(--uilib-color-primary, #1976d2)`         |
| `--uilib-tree-checkbox-color-checked`  | `#ffffff`                                               |
| `--uilib-tree-checkbox-size`           | `1rem`                                                  |
| `--uilib-tree-connector-color`         | `var(--uilib-color-border, #e0e0e0)`                    |
| `--uilib-tree-connector-width`         | `1px`                                                   |
| `--uilib-tree-filter-bg`               | `var(--uilib-color-surface, #ffffff)`                   |
| `--uilib-tree-filter-border`           | `1px solid var(--uilib-color-border, #e0e0e0)`          |
| `--uilib-tree-filter-border-focus`     | `1px solid var(--uilib-color-primary, #1976d2)`         |
| `--uilib-tree-filter-border-radius`    | `var(--uilib-radius-sm, 4px)`                           |
| `--uilib-tree-filter-color`            | `var(--uilib-color-text-primary, #212121)`              |
| `--uilib-tree-filter-padding`          | `0.375rem 2rem 0.375rem 0.625rem`                       |
| `--uilib-tree-font-size`               | `var(--uilib-font-size-base, 0.875rem)`                 |
| `--uilib-tree-line-height`             | `1.5`                                                   |
| `--uilib-tree-node-bg`                 | `transparent`                                           |
| `--uilib-tree-node-bg-hover`           | `var(--uilib-color-surface-hover, rgba(0, 0, 0, 0.04))` |
| `--uilib-tree-node-bg-selected`        | `var(--uilib-color-primary-light, #e3f2fd)`             |
| `--uilib-tree-node-border-radius`      | `var(--uilib-radius-sm, 4px)`                           |
| `--uilib-tree-node-color`              | `var(--uilib-color-text-primary, #212121)`              |
| `--uilib-tree-node-color-selected`     | `var(--uilib-color-primary, #1976d2)`                   |
| `--uilib-tree-node-padding-x`          | `0.5rem`                                                |
| `--uilib-tree-node-padding-y`          | `0.375rem`                                              |
| `--uilib-tree-row-gap`                 | `2px`                                                   |
| `--uilib-tree-toggle-bg-hover`         | `var(--uilib-color-surface-hover, rgba(0, 0, 0, 0.08))` |
| `--uilib-tree-toggle-color`            | `var(--uilib-color-text-secondary, #616161)`            |
| `--uilib-tree-toggle-size`             | `1.25rem`                                               |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| ArrowDown should move focus to the next treeitem                           |
| ArrowLeft on a leaf should move focus to the parent treeitem               |
| ArrowLeft on a root-level collapsed node should not move focus (no parent) |
| ArrowLeft on an expanded branch should collapse it                         |
| ArrowRight on a collapsed branch should expand it                          |
| ArrowRight on a leaf should do nothing                                     |
| ArrowRight on an expanded branch should focus the first child              |
| ArrowUp should move focus to the previous treeitem                         |
| End should move focus to the last visible treeitem                         |
| Home should move focus to the first treeitem                               |
| basic tree should pass axe                                                 |
| checkbox tree should pass axe                                              |
| multiple-selection tree should pass axe                                    |
| partially-checked checkbox tree should pass axe                            |
| should apply bootstrap variant class                                       |
| should apply material variant class by default                             |
| should apply minimal variant class                                         |
| should have aria-label on the filter input                                 |
| should have aria-label on the tree host                                    |
| should have aria-label=                                                    |
| should have role=                                                          |
| should not carry role=                                                     |
| should not render nested role=                                             |
| should not select a node with selectable=false                             |
| should not set aria-disabled on selectable items                           |
| should not set aria-expanded on leaf items                                 |
| should not set aria-multiselectable in single mode                         |
| should not set aria-multiselectable when selectionMode=null                |
| should not set aria-selected in checkbox mode (uses aria-checked)          |
| should not trigger type-ahead for non-printable keys                       |
| should render leaf spacers for leaf nodes                                  |
| should set aria-checked=                                                   |
| should set aria-disabled=                                                  |
| should set aria-expanded on branch rows                                    |
| should set aria-expanded=                                                  |
| should set aria-level=                                                     |
| should set aria-multiselectable=                                           |
| should set aria-posinset on all visible treeitems                          |
| should set aria-posinset=1 for the first child in a group                  |
| should set aria-selected in single mode                                    |
| should set aria-selected=                                                  |
| should set aria-setsize on all visible treeitems                           |
| should set correct aria-posinset for root nodes                            |
| should set correct aria-setsize for root nodes (3 root nodes)              |
| single-selection tree should pass axe                                      |
| toggle buttons should have tabindex=                                       |

## Usage Examples

```html
<!-- simple tree with single selection -->
<ui-lib-tree [value]="nodes" selectionMode="single" ariaLabel="File system" [(selection)]="selected">
  <ng-template uiTreeNode let-node>{{ node.label }}</ng-template>
</ui-lib-tree>

<!-- checkbox tree with filter -->
<ui-lib-tree [value]="nodes" selectionMode="checkbox" ariaLabel="Select files" [(selection)]="checked" [filter]="true">
  <ng-template uiTreeNode let-node>{{ node.label }}</ng-template>
</ui-lib-tree>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tree)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tree/README.md)

