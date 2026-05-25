# Pick List

**Selector:** `ui-lib-pick-list`
**Entry point:** `import { PickList } from 'ui-lib-custom/pick-list'`

---

## Overview

Monotonic counter for unique element IDs. */
let pickListIdCounter: number = 0;

/**
PickList component — transfers items between a source list and a target list.

@example
```html
<ui-lib-pick-list [(source)]="available" [(target)]="selected">
  <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
</ui-lib-pick-list>
```

## API

### Inputs

| Name                        | Type                     | Default            | Description                                                                                                                           |
| --------------------------- | ------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`                  | `boolean`                | `false`            | /** When `true`, all interaction is disabled.                                                                                         |
| `dragDrop`                  | `boolean`                | `false`            | /** When `true`, items can be reordered and transferred by dragging and dropping.                                                     |
| `filterBy`                  | `string | null`          | `null`             | /**
Dot-notation property path used to filter items (e.g. `'name'` or `'address.city'`).
When `null`, filter inputs are not rendered. |
| `filterLocale`              | `string | undefined`     | `undefined`        | /** BCP 47 locale tag used for locale-sensitive string comparisons during filtering.                                                  |
| `metaKeySelection`          | `boolean`                | `false`            | /** When `true`, Ctrl/Meta must be held to toggle multi-select.                                                                       |
| `showSourceControls`        | `boolean`                | `true`             | /** When `true`, shows reorder controls for the source list.                                                                          |
| `showTargetControls`        | `boolean`                | `true`             | /** When `true`, shows reorder controls for the target list.                                                                          |
| `size`                      | `PickListSize`           | `'md'`             | /** Component size token.                                                                                                             |
| `sourceAriaLabel`           | `string | null`          | `null`             | /** Accessible label for the source listbox element.                                                                                  |
| `sourceFilterPlaceholder`   | `string`                 | `'Filter'`         | /** Placeholder text shown inside the source list filter input.                                                                       |
| `sourceHeader`              | `string | null`          | `null`             | /** Caption rendered above the source list.                                                                                           |
| `sourceMoveBottomAriaLabel` | `string`                 | `'Move to bottom'` | /** Accessible label for the source "Move to bottom" reorder button.                                                                  |
| `sourceMoveDownAriaLabel`   | `string`                 | `'Move down'`      | /** Accessible label for the source "Move down" reorder button.                                                                       |
| `sourceMoveTopAriaLabel`    | `string`                 | `'Move to top'`    | /** Accessible label for the source "Move to top" reorder button.                                                                     |
| `sourceMoveUpAriaLabel`     | `string`                 | `'Move up'`        | /** Accessible label for the source "Move up" reorder button.                                                                         |
| `stripedRows`               | `boolean`                | `false`            | /** When `true`, alternating rows are rendered with a background tint.                                                                |
| `styleClass`                | `string | null`          | `null`             | /** Additional CSS class applied to the root element.                                                                                 |
| `targetAriaLabel`           | `string | null`          | `null`             | /** Accessible label for the target listbox element.                                                                                  |
| `targetFilterPlaceholder`   | `string`                 | `'Filter'`         | /** Placeholder text shown inside the target list filter input.                                                                       |
| `targetHeader`              | `string | null`          | `null`             | /** Caption rendered above the target list.                                                                                           |
| `targetMoveBottomAriaLabel` | `string`                 | `'Move to bottom'` | /** Accessible label for the target "Move to bottom" reorder button.                                                                  |
| `targetMoveDownAriaLabel`   | `string`                 | `'Move down'`      | /** Accessible label for the target "Move down" reorder button.                                                                       |
| `targetMoveTopAriaLabel`    | `string`                 | `'Move to top'`    | /** Accessible label for the target "Move to top" reorder button.                                                                     |
| `targetMoveUpAriaLabel`     | `string`                 | `'Move up'`        | /** Accessible label for the target "Move up" reorder button.                                                                         |
| `trackBy`                   | `string | null`          | `null`             | /**
Property key used to identify items for selection equality and `@for` tracking.
When `null`, item object identity is used.        |
| `variant`                   | `PickListVariant | null` | `null`             | /**
Theme variant override. When `null`, the variant is inherited from `ThemeConfigService`.                                          |

### Models (two-way bindable)

| Name              | Type        | Default | Description                                                         |
| ----------------- | ----------- | ------- | ------------------------------------------------------------------- |
| `source`          | `unknown[]` | `[]`    | /** The source list of items. Mutations emit a new array reference. |
| `sourceSelection` | `unknown[]` | `[]`    | /** The currently selected items in the source list.                |
| `target`          | `unknown[]` | `[]`    | /** The target list of items. Mutations emit a new array reference. |
| `targetSelection` | `unknown[]` | `[]`    | /** The currently selected items in the target list.                |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                              | Default                                         |
| ----------------------------------------- | ----------------------------------------------- |
| `--uilib-pick-list-bg`                    | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-pick-list-border`                | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-pick-list-control-bg`            | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-pick-list-control-bg-hover`      | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.06))`    |
| `--uilib-pick-list-control-border`        | `var(--uilib-pick-list-border)`                 |
| `--uilib-pick-list-control-color`         | `var(--uilib-text-color, #1f2937)`              |
| `--uilib-pick-list-control-gap`           | `0.25rem`                                       |
| `--uilib-pick-list-control-radius`        | `var(--uilib-border-radius, 6px)`               |
| `--uilib-pick-list-control-size`          | `2rem`                                          |
| `--uilib-pick-list-disabled-opacity`      | `0.5`                                           |
| `--uilib-pick-list-drop-indicator-color`  | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-pick-list-drop-indicator-height` | `2px`                                           |
| `--uilib-pick-list-filter-bg`             | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-pick-list-filter-border`         | `var(--uilib-pick-list-border)`                 |
| `--uilib-pick-list-filter-padding`        | `0.5rem 0.75rem`                                |
| `--uilib-pick-list-filter-radius`         | `var(--uilib-border-radius, 6px)`               |
| `--uilib-pick-list-focus-ring`            | `0 0 0 2px var(--uilib-primary-color, #3b82f6)` |
| `--uilib-pick-list-font-size`             | `0.8125rem`                                     |
| `--uilib-pick-list-gap`                   | `0.5rem`                                        |
| `--uilib-pick-list-header-bg`             | `var(--uilib-surface-color-alt, #f8f9fa)`       |
| `--uilib-pick-list-header-border`         | `var(--uilib-pick-list-border)`                 |
| `--uilib-pick-list-header-font-weight`    | `600`                                           |
| `--uilib-pick-list-header-padding`        | `0.625rem 0.875rem`                             |
| `--uilib-pick-list-item-bg`               | `transparent`                                   |
| `--uilib-pick-list-item-bg-hover`         | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.04))`    |
| `--uilib-pick-list-item-bg-selected`      | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-pick-list-item-bg-striped`       | `var(--uilib-surface-color-alt, #f8f9fa)`       |
| `--uilib-pick-list-item-border-bottom`    | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-pick-list-item-color`            | `var(--uilib-text-color, #1f2937)`              |
| `--uilib-pick-list-item-color-selected`   | `#ffffff`                                       |
| `--uilib-pick-list-item-drag-opacity`     | `0.4`                                           |
| `--uilib-pick-list-item-padding`          | `0.625rem 0.875rem`                             |
| `--uilib-pick-list-max-height`            | `24rem`                                         |
| `--uilib-pick-list-min-height`            | `10rem`                                         |
| `--uilib-pick-list-radius`                | `var(--uilib-border-radius, 6px)`               |
| `--uilib-pick-list-transfer-bg`           | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-pick-list-transfer-bg-hover`     | `var(--uilib-primary-color-dark, #2563eb)`      |
| `--uilib-pick-list-transfer-color`        | `#ffffff`                                       |
| `--uilib-pick-list-transfer-gap`          | `0.375rem`                                      |
| `--uilib-pick-list-transfer-radius`       | `var(--uilib-border-radius, 6px)`               |
| `--uilib-pick-list-transfer-size`         | `2.25rem`                                       |
| `--uilib-pick-list-transition`            | `background-color 0.15s ease, color 0.15s ease` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                         |
| -------------------------------------------------------- |
| ArrowDown moves focus to the next source item            |
| ArrowUp moves focus to the previous source item          |
| Ctrl+ArrowLeft transfers selected target item to source  |
| Ctrl+ArrowRight transfers selected source item to target |
| End key moves focus to the last source item              |
| Enter toggles selection of the focused source item       |
| Escape clears source selection                           |
| Home key moves focus to the first source item            |
| Space toggles selection of the focused source item       |
| marks all icons inside buttons as aria-hidden            |
| moveAllToSource announces all moved items                |
| moveAllToTarget announces all moved items                |
| moveToSource announces the number of moved items         |
| moveToTarget announces the number of moved items         |
| passes axe in default state                              |
| passes axe when disabled                                 |
| passes axe with bootstrap variant                        |
| passes axe with empty source list                        |
| passes axe with filter enabled                           |
| passes axe with items selected in source                 |
| passes axe with items selected in target                 |
| passes axe with material variant                         |
| passes axe with minimal variant                          |
| reflects custom sourceAriaLabel on the source listbox    |
| reflects custom targetAriaLabel on the target listbox    |
| renders list items with role=option                      |
| renders source listbox with role=listbox                 |
| renders target listbox with role=listbox                 |
| reorder control buttons have descriptive aria-labels     |
| sets aria-multiselectable=                               |
| sets aria-selected=                                      |
| should apply ${variant} variant class                    |
| should apply variant class                               |
| transfer buttons have descriptive aria-labels            |
| uses default aria-label                                  |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#pick-list)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/pick-list/README.md)

