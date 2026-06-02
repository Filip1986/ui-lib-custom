# PickList

**Selector:** `ui-lib-pick-list`
**Package:** `ui-lib-custom/pick-list`
**Content projection:** yes — item rows via `uiPickListItem` (shared by both lists), source header via `uiPickListSourceHeader`, target header via `uiPickListTargetHeader`, empty state via `uiPickListEmpty`

> `source`, `target`, `sourceSelection`, and `targetSelection` are all `model()` signals — use `[()]` for two-way binding. The single `uiPickListItem` template is rendered in both the source and target lists. Without `trackBy`, selection equality uses object identity.

## Inputs

| Name                        | Type                                                   | Default                     | Notes                                                                          |
| --------------------------- | ------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------ |
| `source`                    | `unknown[]`                                            | `[]`                        | Source list items. Two-way bindable via `[(source)]`.                          |
| `target`                    | `unknown[]`                                            | `[]`                        | Target list items. Two-way bindable via `[(target)]`.                          |
| `sourceSelection`           | `unknown[]`                                            | `[]`                        | Selected items in the source list. Two-way bindable via `[(sourceSelection)]`. |
| `targetSelection`           | `unknown[]`                                            | `[]`                        | Selected items in the target list. Two-way bindable via `[(targetSelection)]`. |
| `sourceHeader`              | `string \| null`                                       | `null`                      | Caption above the source list.                                                 |
| `targetHeader`              | `string \| null`                                       | `null`                      | Caption above the target list.                                                 |
| `filterBy`                  | `string \| null`                                       | `null`                      | Dot-notation property path for filtering. Null hides filter inputs.            |
| `filterMatchMode`           | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'`                | Filter matching strategy.                                                      |
| `filterLocale`              | `string \| undefined`                                  | `undefined`                 | BCP 47 locale for locale-sensitive comparisons.                                |
| `sourceFilterPlaceholder`   | `string`                                               | `'Filter'`                  | Placeholder inside the source filter input.                                    |
| `targetFilterPlaceholder`   | `string`                                               | `'Filter'`                  | Placeholder inside the target filter input.                                    |
| `showSourceControls`        | `boolean`                                              | `true`                      | Shows reorder controls for the source list.                                    |
| `showTargetControls`        | `boolean`                                              | `true`                      | Shows reorder controls for the target list.                                    |
| `disabled`                  | `boolean`                                              | `false`                     | Disables all interaction.                                                      |
| `metaKeySelection`          | `boolean`                                              | `false`                     | When true, Ctrl/Meta must be held to toggle multi-select.                      |
| `stripedRows`               | `boolean`                                              | `false`                     | Alternating row background tint.                                               |
| `dragDrop`                  | `boolean`                                              | `false`                     | Enables drag-and-drop reordering and cross-list transfer.                      |
| `variant`                   | `'material' \| 'bootstrap' \| 'minimal' \| null`       | `null`                      | Falls back to global theme when null.                                          |
| `size`                      | `'sm' \| 'md' \| 'lg'`                                 | `'md'`                      | Component density.                                                             |
| `trackBy`                   | `string \| null`                                       | `null`                      | Property key for selection equality and `@for` tracking.                       |
| `styleClass`                | `string \| null`                                       | `null`                      | Extra CSS class on the root element.                                           |
| `sourceAriaLabel`           | `string \| null`                                       | `null`                      | Accessible label for the source listbox. Falls back to `'Source list'`.        |
| `targetAriaLabel`           | `string \| null`                                       | `null`                      | Accessible label for the target listbox. Falls back to `'Target list'`.        |
| `moveAllToTargetAriaLabel`  | `string`                                               | `'Move all to target'`      | Aria-label for the "Move all → target" transfer button.                        |
| `moveToTargetAriaLabel`     | `string`                                               | `'Move selected to target'` | Aria-label for the "Move selected → target" button.                            |
| `moveToSourceAriaLabel`     | `string`                                               | `'Move selected to source'` | Aria-label for the "Move selected → source" button.                            |
| `moveAllToSourceAriaLabel`  | `string`                                               | `'Move all to source'`      | Aria-label for the "Move all → source" transfer button.                        |
| `sourceMoveTopAriaLabel`    | `string`                                               | `'Move to top'`             | Aria-label for the source "Move to top" reorder button.                        |
| `sourceMoveUpAriaLabel`     | `string`                                               | `'Move up'`                 | Aria-label for the source "Move up" reorder button.                            |
| `sourceMoveDownAriaLabel`   | `string`                                               | `'Move down'`               | Aria-label for the source "Move down" reorder button.                          |
| `sourceMoveBottomAriaLabel` | `string`                                               | `'Move to bottom'`          | Aria-label for the source "Move to bottom" reorder button.                     |
| `targetMoveTopAriaLabel`    | `string`                                               | `'Move to top'`             | Aria-label for the target "Move to top" reorder button.                        |
| `targetMoveUpAriaLabel`     | `string`                                               | `'Move up'`                 | Aria-label for the target "Move up" reorder button.                            |
| `targetMoveDownAriaLabel`   | `string`                                               | `'Move down'`               | Aria-label for the target "Move down" reorder button.                          |
| `targetMoveBottomAriaLabel` | `string`                                               | `'Move to bottom'`          | Aria-label for the target "Move to bottom" reorder button.                     |

## Outputs

| Name                     | Payload                        | Notes                                              |
| ------------------------ | ------------------------------ | -------------------------------------------------- |
| `movedToTarget`          | `PickListMoveToTargetEvent`    | Emitted when selected source items move to target. |
| `movedAllToTarget`       | `PickListMoveAllToTargetEvent` | Emitted when all source items move to target.      |
| `movedToSource`          | `PickListMoveToSourceEvent`    | Emitted when selected target items move to source. |
| `movedAllToSource`       | `PickListMoveAllToSourceEvent` | Emitted when all target items move to source.      |
| `sourceSelectionChanged` | `PickListSelectionChangeEvent` | Emitted when source selection changes.             |
| `targetSelectionChanged` | `PickListSelectionChangeEvent` | Emitted when target selection changes.             |
| `sourceFiltered`         | `PickListFilterEvent`          | Emitted when source filter query changes.          |
| `targetFiltered`         | `PickListFilterEvent`          | Emitted when target filter query changes.          |
| `reordered`              | `PickListReorderEvent`         | Emitted after a reorder within either list.        |

## Usage

```html
<!-- basic transfer list -->
<ui-lib-pick-list [(source)]="available" [(target)]="selected">
  <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
</ui-lib-pick-list>

<!-- with headers and filter -->
<ui-lib-pick-list
  [(source)]="available"
  [(target)]="selected"
  sourceHeader="Available"
  targetHeader="Selected"
  filterBy="name"
>
  <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
</ui-lib-pick-list>

<!-- with custom accessible labels -->
<ui-lib-pick-list
  [(source)]="available"
  [(target)]="selected"
  sourceAriaLabel="Available items"
  targetAriaLabel="Selected items"
>
  <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
</ui-lib-pick-list>
```

## Accessibility

### ARIA

| Element             | Role / Attribute       | Value                                         |
| ------------------- | ---------------------- | --------------------------------------------- |
| Source `<ul>`       | `role`                 | `listbox`                                     |
| Source `<ul>`       | `aria-label`           | value of `sourceAriaLabel` or `'Source list'` |
| Source `<ul>`       | `aria-multiselectable` | `true`                                        |
| Target `<ul>`       | `role`                 | `listbox`                                     |
| Target `<ul>`       | `aria-label`           | value of `targetAriaLabel` or `'Target list'` |
| Target `<ul>`       | `aria-multiselectable` | `true`                                        |
| List items          | `role`                 | `option`                                      |
| List items          | `aria-selected`        | `true` / `false`                              |
| Transfer buttons    | `aria-label`           | descriptive label (i18n-friendly via inputs)  |
| Reorder buttons     | `aria-label`           | descriptive label (i18n-friendly via inputs)  |
| Decorative icons    | `aria-hidden`          | `true`                                        |
| Transfer operations | `LiveAnnouncerService` | announces count of items moved (polite)       |

### Keyboard

| Key                                | Context           | Behaviour                                   |
| ---------------------------------- | ----------------- | ------------------------------------------- |
| `ArrowDown`                        | Focused list      | Move focus to next item (wraps to first)    |
| `ArrowUp`                          | Focused list      | Move focus to previous item (wraps to last) |
| `Home`                             | Focused list      | Move focus to first item                    |
| `End`                              | Focused list      | Move focus to last item                     |
| `Space` / `Enter`                  | Focused list item | Toggle selection of focused item            |
| `Ctrl+A`                           | Focused list      | Select all visible items                    |
| `Escape`                           | Focused list      | Clear selection                             |
| `Ctrl+ArrowRight`                  | Source list       | Transfer selected items to target           |
| `Ctrl+ArrowLeft`                   | Target list       | Transfer selected items to source           |
| `Ctrl+ArrowDown` / `Alt+ArrowDown` | Focused item      | Move selected item(s) down one position     |
| `Ctrl+ArrowUp` / `Alt+ArrowUp`     | Focused item      | Move selected item(s) up one position       |
| `Ctrl+End` / `Alt+End`             | Focused item      | Move selected item(s) to bottom             |
| `Ctrl+Home` / `Alt+Home`           | Focused item      | Move selected item(s) to top                |

### Multi-select

- **Default mode** (`metaKeySelection=false`): click toggles individual items; `Shift+click` selects a contiguous range from the last clicked item.
- **Meta-key mode** (`metaKeySelection=true`): `Ctrl/Meta+click` toggles individual items; `Shift+click` extends the range; plain click replaces the selection.
- **Keyboard equivalent for range**: use `Space`/`Enter` after navigating to select items individually (range via `Ctrl+A` selects all).

## CSS Custom Properties

| Token                                     | Default                                         | Description                                       |
| ----------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| `--uilib-pick-list-gap`                   | `0.5rem`                                        | Gap between panels and transfer controls          |
| `--uilib-pick-list-min-height`            | `10rem`                                         | Minimum height of each listbox                    |
| `--uilib-pick-list-max-height`            | `24rem`                                         | Maximum height of each listbox (overflow scrolls) |
| `--uilib-pick-list-bg`                    | `var(--uilib-surface-color)`                    | Listbox background                                |
| `--uilib-pick-list-border`                | `1px solid var(--uilib-border-color)`           | Listbox and control borders                       |
| `--uilib-pick-list-radius`                | `var(--uilib-border-radius)`                    | Border radius                                     |
| `--uilib-pick-list-item-padding`          | `0.625rem 0.875rem`                             | Item row padding                                  |
| `--uilib-pick-list-item-bg`               | `transparent`                                   | Default item background                           |
| `--uilib-pick-list-item-bg-hover`         | `var(--uilib-hover-bg)`                         | Hovered item background                           |
| `--uilib-pick-list-item-bg-selected`      | `var(--uilib-primary-color)`                    | Selected item background                          |
| `--uilib-pick-list-item-color`            | `var(--uilib-text-color)`                       | Item text colour                                  |
| `--uilib-pick-list-item-color-selected`   | `#ffffff`                                       | Selected item text colour                         |
| `--uilib-pick-list-item-border-bottom`    | `1px solid var(--uilib-border-color)`           | Item separator                                    |
| `--uilib-pick-list-item-bg-striped`       | `var(--uilib-surface-color-alt)`                | Odd-row tint for `stripedRows`                    |
| `--uilib-pick-list-item-drag-opacity`     | `0.4`                                           | Opacity of item being dragged                     |
| `--uilib-pick-list-drop-indicator-color`  | `var(--uilib-primary-color)`                    | Drag drop indicator line colour                   |
| `--uilib-pick-list-drop-indicator-height` | `2px`                                           | Drag drop indicator line height                   |
| `--uilib-pick-list-filter-padding`        | `0.5rem 0.75rem`                                | Filter row padding                                |
| `--uilib-pick-list-filter-bg`             | `var(--uilib-surface-color)`                    | Filter input background                           |
| `--uilib-pick-list-filter-radius`         | `var(--uilib-border-radius)`                    | Filter input border radius                        |
| `--uilib-pick-list-header-bg`             | `var(--uilib-surface-color-alt)`                | Header row background                             |
| `--uilib-pick-list-header-padding`        | `0.625rem 0.875rem`                             | Header row padding                                |
| `--uilib-pick-list-header-font-weight`    | `600`                                           | Header font weight                                |
| `--uilib-pick-list-control-size`          | `2rem`                                          | Reorder button size                               |
| `--uilib-pick-list-control-bg`            | `var(--uilib-surface-color)`                    | Reorder button background                         |
| `--uilib-pick-list-control-color`         | `var(--uilib-text-color)`                       | Reorder button icon colour                        |
| `--uilib-pick-list-control-bg-hover`      | `var(--uilib-hover-bg)`                         | Reorder button hover background                   |
| `--uilib-pick-list-control-radius`        | `var(--uilib-border-radius)`                    | Reorder button border radius                      |
| `--uilib-pick-list-control-gap`           | `0.25rem`                                       | Gap between reorder buttons                       |
| `--uilib-pick-list-transfer-size`         | `2.25rem`                                       | Transfer button size                              |
| `--uilib-pick-list-transfer-bg`           | `var(--uilib-primary-color)`                    | Transfer button background                        |
| `--uilib-pick-list-transfer-color`        | `#ffffff`                                       | Transfer button icon colour                       |
| `--uilib-pick-list-transfer-bg-hover`     | `var(--uilib-primary-color-dark)`               | Transfer button hover background                  |
| `--uilib-pick-list-transfer-radius`       | `var(--uilib-border-radius)`                    | Transfer button border radius                     |
| `--uilib-pick-list-transfer-gap`          | `0.375rem`                                      | Gap between transfer buttons                      |
| `--uilib-pick-list-focus-ring`            | `0 0 0 2px var(--uilib-primary-color)`          | Focus ring style (box-shadow)                     |
| `--uilib-pick-list-disabled-opacity`      | `0.5`                                           | Opacity when disabled                             |
| `--uilib-pick-list-transition`            | `background-color 0.15s ease, color 0.15s ease` | Transition for interactive states                 |
