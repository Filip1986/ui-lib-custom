# OrderList

**Selector:** `ui-lib-order-list`
**Package:** `ui-lib-custom/order-list`
**Content projection:** yes — item rows via `uiOrderListItem`, header via `uiOrderListHeader`, empty state via `uiOrderListEmpty`, filter area via `uiOrderListFilter`

> Both `value` and `selection` are `model()` signals — use `[(value)]` and `[(selection)]` for two-way binding. The filter input is only rendered when `filterBy` is set to a non-null property path. Without `trackBy`, selection equality uses object identity.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `unknown[]` | `[]` | The ordered list of items. Two-way bindable via `[(value)]`. |
| `selection` | `unknown[]` | `[]` | Currently selected items. Two-way bindable via `[(selection)]`. |
| `header` | `string \| null` | `null` | Caption rendered above the list. |
| `filterBy` | `string \| null` | `null` | Dot-notation property path for filtering (e.g. `'name'`). Null hides the filter input. |
| `filterPlaceholder` | `string` | `'Filter'` | Placeholder inside the filter input. |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | Filter matching strategy. |
| `filterLocale` | `string \| undefined` | `undefined` | BCP 47 locale tag for locale-sensitive comparisons. |
| `dragDrop` | `boolean` | `false` | Enables drag-and-drop reordering. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `metaKeySelection` | `boolean` | `false` | When true, Ctrl/Meta must be held to toggle multi-select. |
| `stripedRows` | `boolean` | `false` | Alternating row background tint. |
| `controlsPosition` | `'left' \| 'right'` | `'left'` | Position of reorder control buttons. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |
| `trackBy` | `string \| null` | `null` | Property key used for selection equality and `@for` tracking. |
| `ariaLabel` | `string \| null` | `null` | Accessible label for the listbox element. |
| `ariaLabelledBy` | `string \| null` | `null` | One or more IDs that label the listbox. |
| `moveTopAriaLabel` | `string` | `'Move to top'` | ARIA label for the move-to-top button. |
| `moveUpAriaLabel` | `string` | `'Move up'` | ARIA label for the move-up button. |
| `moveDownAriaLabel` | `string` | `'Move down'` | ARIA label for the move-down button. |
| `moveBottomAriaLabel` | `string` | `'Move to bottom'` | ARIA label for the move-to-bottom button. |
| `styleClass` | `string \| null` | `null` | Extra CSS class applied to the root element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `reordered` | `OrderListReorderEvent` | Emitted after any reorder (button or drag-and-drop). |
| `selectionChanged` | `OrderListSelectionChangeEvent` | Emitted when the selection array changes. |
| `filtered` | `OrderListFilterEvent` | Emitted when the filter query changes. |
| `dragDropped` | `OrderListDragDropEvent` | Emitted specifically after a drag-and-drop reorder. |

## Usage

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
