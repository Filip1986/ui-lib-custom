# Tree Table

**Selector:** `ui-lib-tree-table`
**Entry point:** `import { TreeTable } from 'ui-lib-custom/tree-table'`

---

## Overview

TreeTable renders hierarchical data as an expandable table. Each `TreeTableNode` maps to a row; its `data` object provides column values. Columns are declared with `<ui-lib-tree-table-column>` child components.

## API

### Inputs

| Name                      | Type                     | Default                                     | Description                                                                                                 |
| ------------------------- | ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`               | `string`                 | `''`                                        | Accessible name for the treegrid. Falls back to `caption` text, then to `'Tree table'` when both are empty. |
| `caption`                 | `string`                 | `''`                                        | Caption text rendered above the table.                                                                      |
| `globalFilter`            | `boolean`                | `false`                                     | When `true`, renders a global filter input above the table.                                                 |
| `globalFilterPlaceholder` | `string`                 | `'Search...'`                               | Placeholder for the global filter input.                                                                    |
| `scrollable`              | `boolean`                | `false`                                     | When `true`, the table body is scrollable and `scrollHeight` constrains it.                                 |
| `scrollHeight`            | `string                  | null`                                       | `null`                                                                                                      | CSS height value for the scrollable body, e.g. `'400px'` or `'60vh'`. Only applied when `scrollable` is `true`. |
| `selectionMode`           | `TreeTableSelectionMode` | `null`                                      | How rows respond to click interactions.                                                                     |
| `size`                    | `TreeTableSize`          | `TREE_TABLE_DEFAULTS.SIZE as TreeTableSize` | Row height / density.                                                                                       |
| `styleClass`              | `string`                 | `''`                                        | Extra CSS class applied to the host element.                                                                |
| `value`                   | `TreeTableNode[]`        | `[]`                                        | Root-level nodes to display.                                                                                |
| `variant`                 | `TreeTableVariant        | null`                                       | `null`                                                                                                      | Design variant. Falls back to `ThemeConfigService.variant()` when `null`.                                       |

### Models (two-way bindable)

| Name        | Type                 | Default                                                | Description                                                      |
| ----------- | -------------------- | ------------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `selection` | `TreeTableNode       | TreeTableNode[]                                        | null`                                                            | `null`                                                                     | Currently selected node(s). Use `[(selection)]` for two-way binding. |
| `sortField` | `string              | null`                                                  | `null`                                                           | Field currently used for sorting. Use `[(sortField)]` for two-way binding. |
| `sortOrder` | `TreeTableSortOrder` | `TREE_TABLE_DEFAULTS.SORT_ORDER as TreeTableSortOrder` | Current sort direction. Use `[(sortOrder)]` for two-way binding. |

### Outputs

| Name           | Type                         | Description                                        |
| -------------- | ---------------------------- | -------------------------------------------------- |
| `nodeCollapse` | `TreeTableNodeCollapseEvent` | Emitted when a node row is collapsed.              |
| `nodeExpand`   | `TreeTableNodeExpandEvent`   | Emitted when a node row is expanded.               |
| `nodeSelect`   | `TreeTableNodeSelectEvent`   | Emitted when a node is selected.                   |
| `nodeUnselect` | `TreeTableNodeSelectEvent`   | Emitted when a node is unselected.                 |
| `sortChange`   | `TreeTableSortEvent`         | Emitted when the sort column or direction changes. |

## Content Projection

_none_

## Theming

| CSS Variable                                 | Default                                                 |
| -------------------------------------------- | ------------------------------------------------------- |
| `--uilib-tree-table-border`                  | `1px solid var(--uilib-color-border, #e0e0e0)`          |
| `--uilib-tree-table-border-radius`           | `var(--uilib-radius-md, 6px)`                           |
| `--uilib-tree-table-cell-padding`            | `0.5rem 0.75rem`                                        |
| `--uilib-tree-table-checkbox-bg`             | `var(--uilib-color-surface, #ffffff)`                   |
| `--uilib-tree-table-checkbox-bg-checked`     | `var(--uilib-color-primary, #1976d2)`                   |
| `--uilib-tree-table-checkbox-border`         | `2px solid var(--uilib-color-border, #bdbdbd)`          |
| `--uilib-tree-table-checkbox-border-checked` | `2px solid var(--uilib-color-primary, #1976d2)`         |
| `--uilib-tree-table-checkbox-color-checked`  | `#ffffff`                                               |
| `--uilib-tree-table-checkbox-size`           | `1rem`                                                  |
| `--uilib-tree-table-filter-bg`               | `var(--uilib-color-surface, #ffffff)`                   |
| `--uilib-tree-table-filter-border`           | `1px solid var(--uilib-color-border, #e0e0e0)`          |
| `--uilib-tree-table-filter-border-focus`     | `1px solid var(--uilib-color-primary, #1976d2)`         |
| `--uilib-tree-table-filter-border-radius`    | `var(--uilib-radius-sm, 4px)`                           |
| `--uilib-tree-table-filter-color`            | `var(--uilib-color-text-primary, #212121)`              |
| `--uilib-tree-table-filter-icon-font-size`   | `var(--uilib-font-size-sm, 0.875rem)`                   |
| `--uilib-tree-table-filter-padding`          | `0.375rem 2.25rem 0.375rem 0.625rem`                    |
| `--uilib-tree-table-font-size`               | `var(--uilib-font-size-base, 0.875rem)`                 |
| `--uilib-tree-table-header-bg`               | `var(--uilib-color-surface-alt, #f5f5f5)`               |
| `--uilib-tree-table-header-bg-sorted`        | `var(--uilib-color-primary-light, #e3f2fd)`             |
| `--uilib-tree-table-header-border`           | `1px solid var(--uilib-color-border, #e0e0e0)`          |
| `--uilib-tree-table-header-color`            | `var(--uilib-color-text-primary, #212121)`              |
| `--uilib-tree-table-header-color-sorted`     | `var(--uilib-color-primary, #1976d2)`                   |
| `--uilib-tree-table-header-font-weight`      | `600`                                                   |
| `--uilib-tree-table-header-padding`          | `0.625rem 0.75rem`                                      |
| `--uilib-tree-table-indent-size`             | `1.5rem`                                                |
| `--uilib-tree-table-leaf-spacer-width`       | `1.25rem`                                               |
| `--uilib-tree-table-line-height`             | `1.5`                                                   |
| `--uilib-tree-table-row-bg`                  | `var(--uilib-color-surface, #ffffff)`                   |
| `--uilib-tree-table-row-bg-alt`              | `var(--uilib-color-surface-alt, #fafafa)`               |
| `--uilib-tree-table-row-bg-hover`            | `var(--uilib-color-surface-hover, rgba(0, 0, 0, 0.04))` |
| `--uilib-tree-table-row-bg-selected`         | `var(--uilib-color-primary-light, #e3f2fd)`             |
| `--uilib-tree-table-row-border`              | `1px solid var(--uilib-color-border, #e0e0e0)`          |
| `--uilib-tree-table-row-color`               | `var(--uilib-color-text-primary, #212121)`              |
| `--uilib-tree-table-row-color-selected`      | `var(--uilib-color-primary, #1976d2)`                   |
| `--uilib-tree-table-sort-icon-color`         | `var(--uilib-color-text-secondary, #9e9e9e)`            |
| `--uilib-tree-table-sort-icon-color-active`  | `var(--uilib-color-primary, #1976d2)`                   |
| `--uilib-tree-table-sort-icon-font-size`     | `var(--uilib-font-size-xs, 0.75rem)`                    |
| `--uilib-tree-table-toggle-bg-hover`         | `var(--uilib-color-surface-hover, rgba(0, 0, 0, 0.08))` |
| `--uilib-tree-table-toggle-color`            | `var(--uilib-color-text-secondary, #616161)`            |
| `--uilib-tree-table-toggle-size`             | `1.25rem`                                               |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/

### Keyboard Interactions

| Test description                                                               |
| ------------------------------------------------------------------------------ |
| ArrowDown is clamped at the last row                                           |
| ArrowDown moves focus to the next visible row                                  |
| ArrowLeft on a child row moves focus to the parent                             |
| ArrowLeft on a root-level collapsed node does nothing                          |
| ArrowLeft on an expanded parent collapses it                                   |
| ArrowRight on a collapsed parent expands it                                    |
| ArrowRight on a leaf row does nothing                                          |
| ArrowRight on an expanded parent moves focus to first child                    |
| ArrowUp is clamped at the first row                                            |
| ArrowUp moves focus to the previous visible row                                |
| End moves focus to the last row                                                |
| Home moves focus to the first row                                              |
| a grandchild is the only sibling (aria-setsize=1, aria-posinset=1)             |
| all visible rows have aria-setsize and aria-posinset attributes                |
| cells have aria-colindex attributes                                            |
| checkbox selection column td has role=                                         |
| children have sequential aria-posinset starting at 1                           |
| children of an expanded parent have correct aria-setsize (2)                   |
| collapsed parent row has aria-expanded=                                        |
| collapsing a node changes aria-expanded to                                     |
| direct children of an expanded parent have aria-level=                         |
| each tree-table instance has a unique instanceId                               |
| empty table still has role=                                                    |
| every visible body row has role=                                               |
| expanded parent row has aria-expanded=                                         |
| expanding a node changes aria-expanded to                                      |
| first data cell in each row has role=                                          |
| grandchildren have aria-level=                                                 |
| leaf row has no aria-expanded attribute                                        |
| non-first data cells have role=                                                |
| passes axe for a flat (one-level) tree table                                   |
| passes axe for a fully expanded two-level tree                                 |
| passes axe for a tree with a collapsed root node                               |
| passes axe for an empty tree table                                             |
| passes axe with checkbox selection mode                                        |
| renders an empty table without body rows when value is empty                   |
| root rows have correct aria-setsize (3)                                        |
| root rows have sequential aria-posinset starting at 1                          |
| root-level rows have aria-level=                                               |
| should apply bootstrap variant class                                           |
| should apply host class ui-lib-tree-table                                      |
| should apply material variant class                                            |
| should apply minimal variant class                                             |
| should have aria-expanded on branch rows                                       |
| should have aria-level on each row                                             |
| should have role=                                                              |
| should render leaf spacers for visible leaf nodes                              |
| should render sort icons on sortable columns                                   |
| table element has role=                                                        |
| treegrid falls back to caption text for aria-label                             |
| treegrid falls back to default label when neither ariaLabel nor caption is set |
| treegrid has aria-label when ariaLabel input is set                            |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tree-table)
- [Demo page](/components/tree-table)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tree-table/README.md)
