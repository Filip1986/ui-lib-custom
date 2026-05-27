# Listbox

**Selector:** `ui-lib-listbox`
**Entry point:** `import { Listbox } from 'ui-lib-custom/listbox'`

---

## Overview

Listbox component — displays a scrollable list of options with single or multiple selection, optional inline filtering, option groups, and full keyboard navigation. Implements `ControlValueAccessor` for seamless `ngModel` and reactive-form integration.

## API

### Inputs

| Name                  | Type                    | Default                                | Description                                                                                                                          |
| --------------------- | ----------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ariaLabel`           | `string`                | `''`                                   | Accessible label for the listbox element.                                                                                            |
| `ariaLabelledBy`      | `string`                | `''`                                   | ID of an external element that labels this listbox.                                                                                  |
| `checkbox`            | `boolean`               | `false`                                | When true and `multiple` is enabled, renders a checkbox beside each item.                                                            |
| `disabled`            | `boolean`               | `false`                                | When true, disables all interaction.                                                                                                 |
| `emptyFilterMessage`  | `string`                | `LISTBOX_DEFAULTS.EmptyFilterMessage`  | Message shown when the filter produces no matches.                                                                                   |
| `emptyMessage`        | `string`                | `LISTBOX_DEFAULTS.EmptyMessage`        | Message shown when the options array is empty.                                                                                       |
| `filter`              | `boolean`               | `false`                                | When true, shows a filter input above the list.                                                                                      |
| `filterBy`            | `string`                | `''`                                   | Field name to filter against. Defaults to `optionLabel`.                                                                             |
| `filterPlaceholder`   | `string`                | `LISTBOX_DEFAULTS.FilterPlaceholder`   | Placeholder text for the filter input.                                                                                               |
| `group`               | `boolean`               | `false`                                | When true, the `options` array is treated as a list of groups.                                                                       |
| `multiple`            | `boolean`               | `false`                                | When true, multiple options can be selected simultaneously.                                                                          |
| `optionDisabled`      | `string`                | `LISTBOX_DEFAULTS.OptionDisabled`      | Field name used to determine whether an option is disabled.                                                                          |
| `optionGroupChildren` | `string`                | `LISTBOX_DEFAULTS.OptionGroupChildren` | Field name that contains the children array inside each option group.                                                                |
| `optionGroupLabel`    | `string`                | `LISTBOX_DEFAULTS.OptionGroupLabel`    | Field name used as the display label for each option group.                                                                          |
| `optionLabel`         | `string`                | `LISTBOX_DEFAULTS.OptionLabel`         | Field name used as the display label for each option.                                                                                |
| `options`             | `unknown[]`             | `[]`                                   | Array of option objects to display in the list.                                                                                      |
| `optionValue`         | `string`                | `LISTBOX_DEFAULTS.OptionValue`         | Field name used to extract the value for each option.                                                                                |
| `readonly`            | `boolean`               | `false`                                | When true, prevents value changes but does not grey out the component.                                                               |
| `scrollHeight`        | `string`                | `LISTBOX_DEFAULTS.ScrollHeight`        | CSS height for the scrollable options container.                                                                                     |
| `showToggleAll`       | `boolean`               | `false`                                | When true and `multiple` is enabled, shows a "Toggle all" checkbox in the header to select or deselect every enabled option at once. |
| `size`                | `ListboxSize`           | `'md'`                                 | Size token controlling padding and font size.                                                                                        |
| `striped`             | `boolean`               | `false`                                | When true, alternating rows receive a subtle background tint.                                                                        |
| `variant`             | `ListboxVariant | null` | `null`                                 | Visual design variant. Falls back to the global ThemeConfigService variant.                                                          |

### Models (two-way bindable)

| Name          | Type     | Default | Description                                          |
| ------------- | -------- | ------- | ---------------------------------------------------- |
| `filterValue` | `string` | `''`    | Two-way binding for the current filter query string. |

### Outputs

| Name           | Type                 | Description                            |
| -------------- | -------------------- | -------------------------------------- |
| `filterChange` | `ListboxFilterEvent` | Emitted when the filter query changes. |

## Content Projection

_none_

## Theming

| CSS Variable                                     | Default                                         |
| ------------------------------------------------ | ----------------------------------------------- |
| `--uilib-listbox-bg`                             | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-listbox-border`                         | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-listbox-border-radius`                  | `var(--uilib-border-radius, 6px)`               |
| `--uilib-listbox-checkbox-bg-checked`            | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-listbox-checkbox-border`                | `2px solid var(--uilib-border-color, #ced4da)`  |
| `--uilib-listbox-checkbox-border-checked`        | `2px solid var(--uilib-primary-color, #3b82f6)` |
| `--uilib-listbox-checkbox-border-radius`         | `3px`                                           |
| `--uilib-listbox-checkbox-color-checked`         | `#ffffff`                                       |
| `--uilib-listbox-checkbox-size`                  | `1rem`                                          |
| `--uilib-listbox-disabled-opacity`               | `0.5`                                           |
| `--uilib-listbox-empty-color`                    | `var(--uilib-text-muted-color, #6c757d)`        |
| `--uilib-listbox-empty-font-size`                | `0.875rem`                                      |
| `--uilib-listbox-empty-padding`                  | `1rem`                                          |
| `--uilib-listbox-filter-bg`                      | `var(--uilib-surface-color, #ffffff)`           |
| `--uilib-listbox-filter-border-bottom`           | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-listbox-filter-focus-ring`              | `0 0 0 2px var(--uilib-primary-color, #3b82f6)` |
| `--uilib-listbox-filter-icon-color`              | `var(--uilib-text-muted-color, #6c757d)`        |
| `--uilib-listbox-filter-input-color`             | `var(--uilib-text-color, #1f2937)`              |
| `--uilib-listbox-filter-input-placeholder-color` | `var(--uilib-text-muted-color, #9ca3af)`        |
| `--uilib-listbox-filter-padding`                 | `0.5rem 0.75rem`                                |
| `--uilib-listbox-focus-ring`                     | `0 0 0 2px var(--uilib-primary-color, #3b82f6)` |
| `--uilib-listbox-group-color`                    | `var(--uilib-text-muted-color, #6c757d)`        |
| `--uilib-listbox-group-font-size`                | `0.75rem`                                       |
| `--uilib-listbox-group-font-weight`              | `600`                                           |
| `--uilib-listbox-group-letter-spacing`           | `0.05em`                                        |
| `--uilib-listbox-group-padding`                  | `0.375rem 0.75rem`                              |
| `--uilib-listbox-group-text-transform`           | `uppercase`                                     |
| `--uilib-listbox-header-bg`                      | `var(--uilib-surface-color-alt, #f8f9fa)`       |
| `--uilib-listbox-header-border-bottom`           | `1px solid var(--uilib-border-color, #dee2e6)`  |
| `--uilib-listbox-header-padding`                 | `0.5rem 0.75rem`                                |
| `--uilib-listbox-item-bg`                        | `transparent`                                   |
| `--uilib-listbox-item-bg-focused`                | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.06))`    |
| `--uilib-listbox-item-bg-hover`                  | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.04))`    |
| `--uilib-listbox-item-bg-selected`               | `var(--uilib-primary-color, #3b82f6)`           |
| `--uilib-listbox-item-bg-striped`                | `var(--uilib-surface-color-alt, #f8f9fa)`       |
| `--uilib-listbox-item-border-radius`             | `0`                                             |
| `--uilib-listbox-item-color`                     | `var(--uilib-text-color, #1f2937)`              |
| `--uilib-listbox-item-color-disabled`            | `var(--uilib-text-muted-color, #9ca3af)`        |
| `--uilib-listbox-item-color-selected`            | `#ffffff`                                       |
| `--uilib-listbox-item-cursor-disabled`           | `not-allowed`                                   |
| `--uilib-listbox-item-font-size`                 | `var(--uilib-listbox-item-font-size-md)`        |
| `--uilib-listbox-item-font-size-lg`              | `1rem`                                          |
| `--uilib-listbox-item-font-size-md`              | `0.875rem`                                      |
| `--uilib-listbox-item-font-size-sm`              | `0.8125rem`                                     |
| `--uilib-listbox-item-gap`                       | `0.5rem`                                        |
| `--uilib-listbox-item-padding`                   | `var(--uilib-listbox-item-padding-md)`          |
| `--uilib-listbox-item-padding-lg`                | `0.75rem 1rem`                                  |
| `--uilib-listbox-item-padding-md`                | `0.5rem 0.875rem`                               |
| `--uilib-listbox-item-padding-sm`                | `0.375rem 0.625rem`                             |
| `--uilib-listbox-list-padding`                   | `0.25rem 0`                                     |
| `--uilib-listbox-shadow`                         | `none`                                          |
| `--uilib-listbox-transition`                     | `background-color 0.15s ease, color 0.15s ease` |
| `--uilib-listbox-width`                          | `100%`                                          |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                  |
| ----------------------------------------------------------------- |
| ArrowDown updates aria-activedescendant                           |
| ArrowUp moves aria-activedescendant backward                      |
| End focuses the last enabled option id                            |
| Enter selects the focused option                                  |
| Home focuses the first option id                                  |
| Space selects the focused option                                  |
| announces result count when filtering                             |
| announces selected option count in multiple mode                  |
| announces selected option label in single-select mode             |
| announces selection cleared when active item is deselected        |
| announces zero selected options when toggle-all is switched off   |
| aria-activedescendant always points to an existing option element |
| clears aria-activedescendant when filter removes all options      |
| marks group headers as decorative for screen readers              |
| passes axe in default state                                       |
| passes axe in filtered-empty state                                |
| passes axe in grouped state                                       |
| passes axe in multiple + checkbox + toggle-all state              |
| renders a polite live region with atomic announcements            |
| sets aria-activedescendant after list receives focus              |
| sets aria-multiselectable=                                        |
| sets role=                                                        |
| should apply variant class for                                    |
| should focus the first item with Home key                         |
| should have role=                                                 |
| should move focus down with ArrowDown                             |
| should move focus up with ArrowUp                                 |
| should select focused item with Enter                             |
| should select focused item with Space                             |
| should set aria-disabled on host when disabled=true               |
| should set aria-disabled on the list container when disabled      |
| should set aria-label from ariaLabel input                        |
| should set aria-multiselectable=                                  |
| should set aria-posinset and aria-setsize on option items         |
| should set aria-selected=                                         |
| uses aria-label from input                                        |
| uses aria-labelledby when provided                                |

## Usage Examples

```html
<ui-lib-listbox [options]="cities" optionLabel="name" [(ngModel)]="selectedCity" />

<ui-lib-listbox
  [options]="cities"
  optionLabel="name"
  [multiple]="true"
  [filter]="true"
  [checkbox]="true"
  [showToggleAll]="true"
  [(ngModel)]="selectedCities"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#listbox)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/listbox/README.md)

