# Tree

**Selector:** `ui-lib-tree`
**Package:** `ui-lib-custom/tree`
**Content projection:** yes — node templates projected via `uiTreeNode` directive; multiple templates can be registered with a `type` attribute matching `TreeNode.type`; the `'default'` type template is used as a fallback

> `selection` is a `model()` signal — use `[(selection)]` for two-way binding. Node expand/collapse state is stored directly on `TreeNode.expanded` (mutation on the data object), matching PrimeNG's API. In `checkbox` mode, clicking the label does nothing — only the checkbox control triggers selection cascading.

## Inputs

| Name                | Type                                             | Default     | Notes                                                                                                                  |
| ------------------- | ------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `value`             | `TreeNode[]`                                     | `[]`        | Root-level nodes of the tree.                                                                                          |
| `selectionMode`     | `'single' \| 'multiple' \| 'checkbox' \| null`   | `null`      | How nodes respond to interactions.                                                                                     |
| `selection`         | `TreeNode \| TreeNode[] \| null`                 | `null`      | Selected node(s). Two-way bindable via `[(selection)]`.                                                                |
| `variant`           | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`      | Falls back to global theme when null.                                                                                  |
| `size`              | `'sm' \| 'md' \| 'lg'`                           | `'md'`      | Node row density.                                                                                                      |
| `filter`            | `boolean`                                        | `false`     | When true, renders a filter input above the tree.                                                                      |
| `filterBy`          | `string`                                         | `'label'`   | `TreeNode` property to search when filtering.                                                                          |
| `filterMode`        | `'lenient' \| 'strict'`                          | `'lenient'` | `lenient`: visible if node or any descendant matches. `strict`: visible only if the node itself matches.               |
| `filterPlaceholder` | `string \| null`                                 | `null`      | Placeholder for the filter input; uses the i18n `tree.filter-placeholder` string when null.                            |
| `emptyMessage`      | `string \| null`                                 | `null`      | Empty-state text when no nodes are present; uses the i18n `tree.empty` string when null.                               |
| `ariaLabel`         | `string \| null`                                 | `null`      | Accessible label for the tree widget (`aria-label` on the host); falls back to the i18n `tree.label` string when null. |
| `hostId`            | `string \| null`                                 | `null`      | Explicit `id` for the host element; auto-generated (`ui-lib-tree-N`) when null.                                        |
| `styleClass`        | `string \| null`                                 | `null`      | Extra CSS class on the host element.                                                                                   |

## Outputs

| Name           | Payload                 | Notes                                       |
| -------------- | ----------------------- | ------------------------------------------- |
| `nodeSelect`   | `TreeNodeSelectEvent`   | Emitted when a node is selected.            |
| `nodeUnselect` | `TreeNodeSelectEvent`   | Emitted when a node is unselected.          |
| `nodeExpand`   | `TreeNodeExpandEvent`   | Emitted when a node's subtree is expanded.  |
| `nodeCollapse` | `TreeNodeCollapseEvent` | Emitted when a node's subtree is collapsed. |

## ARIA attributes

| Element              | Attribute              | Value                                                     |
| -------------------- | ---------------------- | --------------------------------------------------------- |
| `ui-lib-tree` (host) | `role`                 | `"tree"`                                                  |
| `ui-lib-tree` (host) | `aria-label`           | value of `ariaLabel` input (when non-empty)               |
| `ui-lib-tree` (host) | `aria-multiselectable` | `"true"` in `multiple`/`checkbox` modes; absent otherwise |
| `ui-lib-tree` (host) | `id`                   | unique per-instance id (`ui-lib-tree-N`)                  |
| Node row `<div>`     | `role`                 | `"treeitem"`                                              |
| Node row `<div>`     | `aria-level`           | depth + 1 (1-based)                                       |
| Node row `<div>`     | `aria-setsize`         | total siblings at this level                              |
| Node row `<div>`     | `aria-posinset`        | 1-based position in sibling group                         |
| Node row `<div>`     | `aria-expanded`        | `"true"` / `"false"` on branch nodes; absent on leaves    |
| Node row `<div>`     | `aria-selected`        | `"true"` / `"false"` in single/multiple modes             |
| Node row `<div>`     | `aria-checked`         | `"true"` / `"false"` / `"mixed"` in checkbox mode         |
| Node row `<div>`     | `aria-disabled`        | `"true"` when `node.selectable === false`                 |
| Children `<ul>`      | `role`                 | `"group"`                                                 |
| Toggle `<button>`    | `aria-label`           | `"Expand"` / `"Collapse"`                                 |
| Icon `<span>`        | `aria-hidden`          | `"true"`                                                  |
| Checkbox `<span>`    | `aria-hidden`          | `"true"` (state is carried on the treeitem)               |

## Keyboard interaction

| Key                           | Behaviour                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ArrowDown`                   | Moves focus to the next visible treeitem.                                                                                     |
| `ArrowUp`                     | Moves focus to the previous visible treeitem.                                                                                 |
| `ArrowRight`                  | On collapsed branch: expands it (focus stays). On expanded branch: moves focus to first child. On leaf: no action.            |
| `ArrowLeft`                   | On expanded branch: collapses it (focus stays). On collapsed branch or leaf: moves focus to the parent treeitem.              |
| `Home`                        | Moves focus to the first treeitem.                                                                                            |
| `End`                         | Moves focus to the last visible treeitem.                                                                                     |
| `Tab`                         | Exits the tree and moves focus to the next focusable element.                                                                 |
| Printable char (`a-z`, `0-9`) | Type-ahead: focus moves to the next visible treeitem whose label starts with that character (case-insensitive, wraps around). |
| `Enter` / `Space`             | Activates the node (select/deselect or toggle checkbox).                                                                      |

## CSS custom properties

| Variable                              | Default                                         | Purpose                                                                   |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| `--uilib-tree-font-size`              | `var(--uilib-font-size-base, 0.875rem)`         | Node label font size                                                      |
| `--uilib-tree-line-height`            | `1.5`                                           | Node row line height                                                      |
| `--uilib-tree-row-gap`                | `2px`                                           | Vertical gap between node rows                                            |
| `--uilib-tree-node-padding-y`         | `0.375rem`                                      | Node row vertical padding                                                 |
| `--uilib-tree-node-padding-x`         | `0.5rem`                                        | Node row horizontal padding                                               |
| `--uilib-tree-node-border-radius`     | `var(--uilib-radius-sm, 4px)`                   | Node row corner radius                                                    |
| `--uilib-tree-node-bg`                | `transparent`                                   | Default node row background                                               |
| `--uilib-tree-node-bg-hover`          | `rgba(0,0,0,0.04)`                              | Node row hover background                                                 |
| `--uilib-tree-node-bg-selected`       | `var(--uilib-color-primary-light, #e3f2fd)`     | Selected node row background                                              |
| `--uilib-tree-node-color`             | `var(--uilib-color-text-primary, #212121)`      | Default node row text colour                                              |
| `--uilib-tree-node-color-selected`    | `var(--uilib-color-primary, #1976d2)`           | Selected node row text colour                                             |
| `--uilib-tree-node-selection-shadow`  | `none`                                          | Box shadow on selected node row (bootstrap variant applies an inset ring) |
| `--uilib-tree-toggle-size`            | `1.25rem`                                       | Expand/collapse button size                                               |
| `--uilib-tree-toggle-color`           | `var(--uilib-color-text-secondary, #616161)`    | Toggle icon colour                                                        |
| `--uilib-tree-toggle-bg-hover`        | `rgba(0,0,0,0.08)`                              | Toggle button hover background                                            |
| `--uilib-tree-toggle-border-radius`   | `var(--uilib-radius-full, 9999px)`              | Toggle button corner radius                                               |
| `--uilib-tree-checkbox-size`          | `1rem`                                          | Checkbox indicator size                                                   |
| `--uilib-tree-checkbox-border-radius` | `var(--uilib-radius-sm, 3px)`                   | Checkbox corner radius                                                    |
| `--uilib-tree-checkbox-bg`            | `var(--uilib-color-surface, #ffffff)`           | Unchecked checkbox background                                             |
| `--uilib-tree-checkbox-bg-checked`    | `var(--uilib-color-primary, #1976d2)`           | Checked checkbox fill                                                     |
| `--uilib-tree-filter-bg`              | `var(--uilib-color-surface, #ffffff)`           | Filter input background                                                   |
| `--uilib-tree-filter-color`           | `var(--uilib-color-text-primary, #212121)`      | Filter input text colour                                                  |
| `--uilib-tree-filter-border`          | `1px solid var(--uilib-color-border, #e0e0e0)`  | Filter input border                                                       |
| `--uilib-tree-filter-border-focus`    | `1px solid var(--uilib-color-primary, #1976d2)` | Filter input focused border                                               |
| `--uilib-tree-filter-border-radius`   | `var(--uilib-radius-sm, 4px)`                   | Filter input corner radius                                                |
| `--uilib-tree-transition`             | `var(--uilib-transition-fast, 150ms ease)`      | All row/button/icon transitions; auto-zeroed by `prefers-reduced-motion`  |

## Accessibility

The `<ui-lib-tree>` component implements the [WAI-ARIA Tree View Pattern (APG 1.2)](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

- `role="tree"` lives on the custom-element host; the inner `<ul>` carries `role="none"` to avoid nesting two tree roles.
- Every visible `role="treeitem"` carries `aria-level`, `aria-setsize`, and `aria-posinset` so screen readers can announce the node's position within its sibling group and its nesting depth.
- In `checkbox` mode, `aria-checked` (`true` / `false` / `mixed`) is placed on the `role="treeitem"` element itself — not on a nested `role="checkbox"` child. The visual checkbox indicator is `aria-hidden="true"`.
- Full keyboard navigation conforms to WAI-ARIA: ArrowDown/Up traverse all visible items, ArrowRight expands or moves to first child, ArrowLeft collapses or moves to parent, Home/End jump to first/last item, and printable-character type-ahead jumps to the next matching item.
- `prefers-reduced-motion: reduce` zeroes `--uilib-tree-transition` on the host, disabling all expand/collapse transitions without element-level `!important` overrides.
- Each instance gets a unique `id` via a module-level counter (`ui-lib-tree-N`).
- The empty-state message is driven by the `emptyMessage` input (falling back to the i18n `tree.empty` string), so it is localisable for every supported locale.

## Usage

```html
<!-- simple tree with single selection -->
<ui-lib-tree
  [value]="nodes"
  selectionMode="single"
  ariaLabel="File system"
  [(selection)]="selected"
>
  <ng-template uiTreeNode let-node>{{ node.label }}</ng-template>
</ui-lib-tree>

<!-- checkbox tree with filter -->
<ui-lib-tree
  [value]="nodes"
  selectionMode="checkbox"
  ariaLabel="Select files"
  [(selection)]="checked"
  [filter]="true"
>
  <ng-template uiTreeNode let-node>{{ node.label }}</ng-template>
</ui-lib-tree>

<!-- custom empty-state message -->
<ui-lib-tree [value]="[]" emptyMessage="No matching results found." ariaLabel="Search results">
</ui-lib-tree>

<!-- per-type node templates (falls back to 'default' template for unrecognised types) -->
<ui-lib-tree
  [value]="nodes"
  selectionMode="single"
  ariaLabel="Document tree"
  [(selection)]="selected"
>
  <ng-template uiTreeNode type="folder" let-node>
    <span class="icon-folder">{{ node.label }}</span>
  </ng-template>
  <ng-template uiTreeNode type="default" let-node>
    <span class="icon-file">{{ node.label }}</span>
  </ng-template>
</ui-lib-tree>
```
