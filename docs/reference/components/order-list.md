# Order List

**Selector:** `ui-lib-order-list`
**Entry point:** `import { OrderList } from 'ui-lib-custom/order-list'`

---

## Overview

OrderList component — manages and reorders a collection of items.

## API

### Inputs

| Name                  | Type                        | Default            | Description                                                                                                                            |
| --------------------- | --------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`           | `string | null`             | `null`             | Accessible label for the listbox element.                                                                                              |
| `ariaLabelledBy`      | `string | null`             | `null`             | One or more element IDs that label the listbox element.                                                                                |
| `controlsPosition`    | `OrderListControlsPosition` | `'left'`           | Position of the reorder control buttons relative to the list.                                                                          |
| `disabled`            | `boolean`                   | `false`            | When `true`, all interaction is disabled.                                                                                              |
| `dragDrop`            | `boolean`                   | `false`            | When `true`, items can be reordered by dragging and dropping.                                                                          |
| `filterBy`            | `string | null`             | `null`             | Dot-notation property path to filter items against (e.g. `'name'` or `'address.city'`). When `null`, the filter input is not rendered. |
| `filterLocale`        | `string | undefined`        | `undefined`        | BCP 47 locale tag used for locale-sensitive string comparisons during filtering.                                                       |
| `filterMatchMode`     | `OrderListFilterMatchMode`  | `'contains'`       | Strategy used when matching filter query against item fields.                                                                          |
| `filterPlaceholder`   | `string`                    | `'Filter'`         | Placeholder text shown inside the filter input.                                                                                        |
| `header`              | `string | null`             | `null`             | Optional caption rendered above the list.                                                                                              |
| `metaKeySelection`    | `boolean`                   | `false`            | When `true`, Ctrl/Meta must be held to toggle multi-select.                                                                            |
| `moveBottomAriaLabel` | `string`                    | `'Move to bottom'` | Accessible label for the "Move to bottom" button.                                                                                      |
| `moveDownAriaLabel`   | `string`                    | `'Move down'`      | Accessible label for the "Move down" button.                                                                                           |
| `moveTopAriaLabel`    | `string`                    | `'Move to top'`    | Accessible label for the "Move to top" button.                                                                                         |
| `moveUpAriaLabel`     | `string`                    | `'Move up'`        | Accessible label for the "Move up" button.                                                                                             |
| `size`                | `OrderListSize`             | `'md'`             | Component size token.                                                                                                                  |
| `stripedRows`         | `boolean`                   | `false`            | When `true`, alternating rows are rendered with a background tint.                                                                     |
| `styleClass`          | `string | null`             | `null`             | Additional CSS class applied to the root element.                                                                                      |
| `trackBy`             | `string | null`             | `null`             | Property key used to identify items for selection equality and `@for` tracking. When `null`, item object identity is used.             |
| `variant`             | `OrderListVariant | null`   | `null`             | Theme variant override. When `null`, the variant is inherited from `ThemeConfigService`.                                               |

### Models (two-way bindable)

| Name        | Type        | Default | Description                                                                |
| ----------- | ----------- | ------- | -------------------------------------------------------------------------- |
| `selection` | `unknown[]` | `[]`    | The currently selected items.                                              |
| `value`     | `unknown[]` | `[]`    | The ordered list of items. Mutations are emitted as a new array reference. |

### Outputs

| Name               | Type                            | Description                                                    |
| ------------------ | ------------------------------- | -------------------------------------------------------------- |
| `dragDropped`      | `OrderListDragDropEvent`        | Emitted specifically after a drag-and-drop reorder.            |
| `filtered`         | `OrderListFilterEvent`          | Emitted when the filter query changes.                         |
| `reordered`        | `OrderListReorderEvent`         | Emitted after any reorder operation (button or drag-and-drop). |
| `selectionChanged` | `OrderListSelectionChangeEvent` | Emitted when the selection array changes.                      |

## Content Projection

_none_

## Theming

| CSS Variable                               | Default                                         |
| ------------------------------------------ | ----------------------------------------------- |
| `--uilib-order-list-bg`                    | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-order-list-border`                | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-order-list-control-bg`            | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-order-list-control-bg-hover`      | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.06))`    |
| `--uilib-order-list-control-border`        | `var(--uilib-order-list-border)`                |
| `--uilib-order-list-control-color`         | `var(--uilib-text-color, #1f2937)`              |
| `--uilib-order-list-control-gap`           | `0.25rem`                                       |
| `--uilib-order-list-control-radius`        | `var(--uilib-border-radius, 6px)`               |
| `--uilib-order-list-control-size`          | `2rem`                                          |
| `--uilib-order-list-disabled-opacity`      | `0.5`                                           |
| `--uilib-order-list-drop-indicator-color`  | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-order-list-drop-indicator-height` | `2px`                                           |
| `--uilib-order-list-filter-bg`             | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-order-list-filter-border`         | `var(--uilib-order-list-border)`                |
| `--uilib-order-list-filter-padding`        | `0.5rem 0.75rem`                                |
| `--uilib-order-list-filter-radius`         | `var(--uilib-border-radius, 6px)`               |
| `--uilib-order-list-focus-ring`            | `0 0 0 2px var(--uilib-primary-color, #3b82f6)` |
| `--uilib-order-list-font-size`             | `0.8125rem`                                     |
| `--uilib-order-list-gap`                   | `0.5rem`                                        |
| `--uilib-order-list-header-bg`             | `var(--uilib-surface-color-alt, #f8f9fa)`       |
| `--uilib-order-list-header-border`         | `var(--uilib-order-list-border)`                |
| `--uilib-order-list-header-font-weight`    | `600`                                           |
| `--uilib-order-list-header-padding`        | `0.625rem 0.875rem`                             |
| `--uilib-order-list-item-bg`               | `transparent`                                   |
| `--uilib-order-list-item-bg-hover`         | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.04))`    |
| `--uilib-order-list-item-bg-selected`      | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-order-list-item-bg-striped`       | `var(--uilib-surface-color-alt, #f8f9fa)`       |
| `--uilib-order-list-item-border-bottom`    | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-order-list-item-color`            | `var(--uilib-text-color, #1f2937)`              |
| `--uilib-order-list-item-color-selected`   | `#ffffff`                                       |
| `--uilib-order-list-item-drag-opacity`     | `0.4`                                           |
| `--uilib-order-list-item-padding`          | `0.625rem 0.875rem`                             |
| `--uilib-order-list-max-height`            | `24rem`                                         |
| `--uilib-order-list-min-height`            | `10rem`                                         |
| `--uilib-order-list-radius`                | `var(--uilib-border-radius, 6px)`               |
| `--uilib-order-list-transition`            | `background-color 0.15s ease, color 0.15s ease` |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

### Keyboard Interactions

| Test description                                             |
| ------------------------------------------------------------ |
| Alt+ArrowDown should move selected item down                 |
| Alt+ArrowDown should move selected items down                |
| Alt+ArrowUp should move selected item up                     |
| Alt+ArrowUp should move selected items up                    |
| ArrowDown from last item wraps to first                      |
| ArrowDown on last item should wrap to first                  |
| ArrowDown should advance focused index                       |
| ArrowDown should advance focusedIndex                        |
| ArrowUp from first item wraps to last                        |
| ArrowUp on first item should wrap to last                    |
| ArrowUp should decrement focusedIndex                        |
| ArrowUp should retreat focused index                         |
| End should focus last item                                   |
| End should move focus to last item                           |
| Enter should toggle selection of focused item                |
| Escape should clear selection                                |
| Home should focus first item                                 |
| Home should move focus to first item                         |
| Space should toggle selection of focused item                |
| each control button should have an aria-label                |
| each option should have aria-selected=                       |
| empty state should have aria-live=                           |
| reorder via Alt+ArrowDown should trigger a live announcement |
| reorder via Alt+ArrowUp should trigger a live announcement   |
| selected item should have aria-selected=                     |
| should have aria-multiselectable=                            |
| should include variant class                                 |
| should not process keyboard events when disabled             |
| should pass axe in default (empty selection) state           |
| should pass axe when disabled                                |
| should pass axe when header is present                       |
| should pass axe when the list is empty                       |
| should pass axe with all items selected                      |
| should pass axe with filter input rendered                   |
| should pass axe with one item selected                       |
| should reflect ariaLabel on the listbox                      |
| should render a listbox with role=                           |
| should render all items with role=                           |
| should return stable unique id string                        |
| should update focusedIndex when item receives focus          |

## Usage Examples

```html
<!-- basic reorderable list -->
<ui-lib-order-list [(value)]="items" [(selection)]="selected">
  <ng-template uiOrderListItem let-item>{{ item.label }}</ng-template>
</ui-lib-order-list>

<!-- with filter and drag-drop enabled -->
<ui-lib-order-list [(value)]="items" filterBy="name" [dragDrop]="true">
  <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
</ui-lib-order-list>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#order-list)
- [Demo page](/components/order-list)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/order-list/README.md)

