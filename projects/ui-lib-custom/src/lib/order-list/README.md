# OrderList

**Selector:** `ui-lib-order-list`
**Package:** `ui-lib-custom/order-list`
**Content projection:** yes — item rows via `uiOrderListItem`, header via `uiOrderListHeader`, empty state via `uiOrderListEmpty`, filter area via `uiOrderListFilter`

> Both `value` and `selection` are `model()` signals — use `[(value)]` and `[(selection)]` for two-way binding. The filter input is only rendered when `filterBy` is set to a non-null property path. Without `trackBy`, selection equality uses object identity.

## Inputs

| Name                  | Type                                                   | Default            | Notes                                                                                  |
| --------------------- | ------------------------------------------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| `value`               | `unknown[]`                                            | `[]`               | The ordered list of items. Two-way bindable via `[(value)]`.                           |
| `selection`           | `unknown[]`                                            | `[]`               | Currently selected items. Two-way bindable via `[(selection)]`.                        |
| `header`              | `string \| null`                                       | `null`             | Caption rendered above the list.                                                       |
| `filterBy`            | `string \| null`                                       | `null`             | Dot-notation property path for filtering (e.g. `'name'`). Null hides the filter input. |
| `filterPlaceholder`   | `string`                                               | `'Filter'`         | Placeholder inside the filter input.                                                   |
| `filterMatchMode`     | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'`       | Filter matching strategy.                                                              |
| `filterLocale`        | `string \| undefined`                                  | `undefined`        | BCP 47 locale tag for locale-sensitive comparisons.                                    |
| `dragDrop`            | `boolean`                                              | `false`            | Enables drag-and-drop reordering.                                                      |
| `disabled`            | `boolean`                                              | `false`            | Disables all interaction.                                                              |
| `metaKeySelection`    | `boolean`                                              | `false`            | When true, Ctrl/Meta must be held to toggle multi-select.                              |
| `stripedRows`         | `boolean`                                              | `false`            | Alternating row background tint.                                                       |
| `controlsPosition`    | `'left' \| 'right'`                                    | `'left'`           | Position of reorder control buttons.                                                   |
| `variant`             | `'material' \| 'bootstrap' \| 'minimal' \| null`       | `null`             | Falls back to global theme when null.                                                  |
| `size`                | `'sm' \| 'md' \| 'lg'`                                 | `'md'`             | Component density.                                                                     |
| `trackBy`             | `string \| null`                                       | `null`             | Property key used for selection equality and `@for` tracking.                          |
| `ariaLabel`           | `string \| null`                                       | `null`             | Accessible label for the listbox element.                                              |
| `ariaLabelledBy`      | `string \| null`                                       | `null`             | One or more IDs that label the listbox.                                                |
| `moveTopAriaLabel`    | `string`                                               | `'Move to top'`    | ARIA label for the move-to-top button.                                                 |
| `moveUpAriaLabel`     | `string`                                               | `'Move up'`        | ARIA label for the move-up button.                                                     |
| `moveDownAriaLabel`   | `string`                                               | `'Move down'`      | ARIA label for the move-down button.                                                   |
| `moveBottomAriaLabel` | `string`                                               | `'Move to bottom'` | ARIA label for the move-to-bottom button.                                              |
| `styleClass`          | `string \| null`                                       | `null`             | Extra CSS class applied to the root element.                                           |

## Outputs

| Name               | Payload                         | Notes                                                |
| ------------------ | ------------------------------- | ---------------------------------------------------- |
| `reordered`        | `OrderListReorderEvent`         | Emitted after any reorder (button or drag-and-drop). |
| `selectionChanged` | `OrderListSelectionChangeEvent` | Emitted when the selection array changes.            |
| `filtered`         | `OrderListFilterEvent`          | Emitted when the filter query changes.               |
| `dragDropped`      | `OrderListDragDropEvent`        | Emitted specifically after a drag-and-drop reorder.  |

## Accessibility

### ARIA Roles & Attributes

| Element         | Role / Attribute                 | Value                        | Notes                                                               |
| --------------- | -------------------------------- | ---------------------------- | ------------------------------------------------------------------- |
| `<ul>`          | `role`                           | `listbox`                    | Container for reorderable items.                                    |
| `<ul>`          | `aria-multiselectable`           | `true`                       | Allows multi-item selection.                                        |
| `<ul>`          | `aria-label` / `aria-labelledby` | from inputs                  | Provide at least one.                                               |
| `<ul>`          | `id`                             | `ui-lib-order-list-N-list`   | Unique per instance.                                                |
| `<li>`          | `role`                           | `option`                     | Each reorderable item.                                              |
| `<li>`          | `aria-selected`                  | `true` / `false`             | Reflects selection state.                                           |
| `<li>`          | `id`                             | `ui-lib-order-list-N-item-M` | Unique item ID.                                                     |
| Control buttons | `aria-label`                     | configurable                 | Customisable via `moveTopAriaLabel`, `moveUpAriaLabel`, etc.        |
| Icon glyphs     | `aria-hidden`                    | `true`                       | Decorative — set by the `ui-lib-icon` component.                    |
| Empty `<p>`     | `aria-live`                      | `polite`                     | Announces empty state changes; rendered **outside** `role=listbox`. |

> **ARIA note:** The empty state element is intentionally rendered outside the `<ul role="listbox">` element because a listbox may only contain `role="option"` children. Placing a non-option inside a listbox is an ARIA violation.

### Keyboard Navigation

| Key                                | Action                                 |
| ---------------------------------- | -------------------------------------- |
| `ArrowDown`                        | Move focus to next item (wraps).       |
| `ArrowUp`                          | Move focus to previous item (wraps).   |
| `Home`                             | Move focus to first item.              |
| `End`                              | Move focus to last item.               |
| `Space` / `Enter`                  | Toggle selection of focused item.      |
| `Ctrl+A` / `Meta+A`                | Select all visible items.              |
| `Escape`                           | Clear selection.                       |
| `Alt+ArrowDown` / `Ctrl+ArrowDown` | Move selected items down one position. |
| `Alt+ArrowUp` / `Ctrl+ArrowUp`     | Move selected items up one position.   |
| `Alt+Home` / `Ctrl+Home`           | Move selected items to the top.        |
| `Alt+End` / `Ctrl+End`             | Move selected items to the bottom.     |

> Each reorder operation announces the new position via a polite live region (e.g. _"Apple moved to position 3 of 5."_).

## CSS Variables

| Token                                      | Default                                         | Description                                                                          |
| ------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--uilib-order-list-gap`                   | `0.5rem`                                        | Gap between controls column and list container.                                      |
| `--uilib-order-list-min-height`            | `10rem`                                         | Minimum height of the listbox.                                                       |
| `--uilib-order-list-max-height`            | `24rem`                                         | Maximum height before the listbox scrolls.                                           |
| `--uilib-order-list-bg`                    | `var(--uilib-surface-color)`                    | List container background.                                                           |
| `--uilib-order-list-border`                | `1px solid var(--uilib-border-color)`           | Border around the list container and controls.                                       |
| `--uilib-order-list-radius`                | `var(--uilib-border-radius)`                    | Corner radius of the list container.                                                 |
| `--uilib-order-list-item-padding`          | `0.625rem 0.875rem`                             | Padding inside each list item.                                                       |
| `--uilib-order-list-item-bg`               | `transparent`                                   | Default item background.                                                             |
| `--uilib-order-list-item-bg-hover`         | `var(--uilib-hover-bg)`                         | Item background on hover.                                                            |
| `--uilib-order-list-item-bg-selected`      | `var(--uilib-primary-color)`                    | Background of selected items.                                                        |
| `--uilib-order-list-item-color`            | `var(--uilib-text-color)`                       | Item text colour.                                                                    |
| `--uilib-order-list-item-color-selected`   | `#ffffff`                                       | Text colour of selected items.                                                       |
| `--uilib-order-list-item-border-bottom`    | `1px solid var(--uilib-border-color)`           | Divider between items.                                                               |
| `--uilib-order-list-item-drag-opacity`     | `0.4`                                           | Opacity of the item being dragged.                                                   |
| `--uilib-order-list-drop-indicator-color`  | `var(--uilib-primary-color)`                    | Colour of the drag-drop insertion line.                                              |
| `--uilib-order-list-drop-indicator-height` | `2px`                                           | Height of the drag-drop insertion line.                                              |
| `--uilib-order-list-item-bg-striped`       | `var(--uilib-surface-color-alt)`                | Background for alternating (odd) rows.                                               |
| `--uilib-order-list-filter-padding`        | `0.5rem 0.75rem`                                | Padding around the filter input.                                                     |
| `--uilib-order-list-filter-border`         | inherits list border                            | Border around the filter wrapper.                                                    |
| `--uilib-order-list-filter-bg`             | `var(--uilib-surface-color)`                    | Filter input background.                                                             |
| `--uilib-order-list-filter-radius`         | `var(--uilib-border-radius)`                    | Corner radius of the filter input.                                                   |
| `--uilib-order-list-header-bg`             | `var(--uilib-surface-color-alt)`                | Header area background.                                                              |
| `--uilib-order-list-header-padding`        | `0.625rem 0.875rem`                             | Padding inside the header.                                                           |
| `--uilib-order-list-header-font-weight`    | `600`                                           | Font weight of the header text.                                                      |
| `--uilib-order-list-header-border`         | inherits list border                            | Bottom border of the header.                                                         |
| `--uilib-order-list-control-size`          | `2rem`                                          | Width and height of each control button.                                             |
| `--uilib-order-list-control-bg`            | `var(--uilib-surface-color)`                    | Control button background.                                                           |
| `--uilib-order-list-control-color`         | `var(--uilib-text-color)`                       | Control button icon colour.                                                          |
| `--uilib-order-list-control-bg-hover`      | `var(--uilib-hover-bg)`                         | Control button background on hover.                                                  |
| `--uilib-order-list-control-radius`        | `var(--uilib-border-radius)`                    | Control button corner radius.                                                        |
| `--uilib-order-list-control-gap`           | `0.25rem`                                       | Gap between control buttons.                                                         |
| `--uilib-order-list-control-border`        | inherits list border                            | Border around each control button.                                                   |
| `--uilib-order-list-focus-ring`            | `0 0 0 2px var(--uilib-primary-color)`          | Focus ring (box-shadow) on interactive elements.                                     |
| `--uilib-order-list-disabled-opacity`      | `0.5`                                           | Host opacity when `disabled=true`.                                                   |
| `--uilib-order-list-transition`            | `background-color 0.15s ease, color 0.15s ease` | Transition for hover/selection colour changes. Disabled by `prefers-reduced-motion`. |

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
