# Autocomplete

**Selector:** `ui-lib-autocomplete`
**Entry point:** `import { Autocomplete } from 'ui-lib-custom/autocomplete'`

---

## Overview

PrimeNG-inspired autocomplete with single and multiple selection modes.

## API

### Inputs

| Name                    | Type                               | Default     | Description |
| ----------------------- | ---------------------------------- | ----------- | ----------- |
| `addOnBlur`             | `boolean`                          | `false`     | —           |
| `addOnTab`              | `boolean`                          | `false`     | —           |
| `appendTo`              | `string | HTMLElement | undefined` | `'body'`    | —           |
| `ariaLabel`             | `string | null`                    | `null`      | —           |
| `ariaLabelledBy`        | `string | null`                    | `null`      | —           |
| `autoClear`             | `boolean`                          | `true`      | —           |
| `completeOnFocus`       | `boolean`                          | `false`     | —           |
| `delay`                 | `number`                           | `300`       | —           |
| `disabled`              | `boolean`                          | `false`     | —           |
| `dropdown`              | `boolean`                          | `false`     | —           |
| `dropdownMode`          | `AutoCompleteDropdownMode`         | `'blank'`   | —           |
| `filled`                | `boolean`                          | `false`     | —           |
| `fluid`                 | `boolean`                          | `false`     | —           |
| `forceSelection`        | `boolean`                          | `false`     | —           |
| `group`                 | `boolean`                          | `false`     | —           |
| `inputId`               | `string`                           | `''`        | —           |
| `invalid`               | `boolean`                          | `false`     | —           |
| `loading`               | `boolean`                          | `false`     | —           |
| `maxlength`             | `number | null`                    | `null`      | —           |
| `minLength`             | `number`                           | `1`         | —           |
| `multiple`              | `boolean`                          | `false`     | —           |
| `optionDisabled`        | `string | undefined`               | `undefined` | —           |
| `optionGroupChildren`   | `string`                           | `'items'`   | —           |
| `optionGroupLabel`      | `string`                           | `'label'`   | —           |
| `optionLabel`           | `string | undefined`               | `undefined` | —           |
| `optionValue`           | `string | undefined`               | `undefined` | —           |
| `placeholder`           | `string`                           | `''`        | —           |
| `readonly`              | `boolean`                          | `false`     | —           |
| `scrollHeight`          | `string`                           | `'200px'`   | —           |
| `separator`             | `string | RegExp | undefined`      | `undefined` | —           |
| `showClear`             | `boolean`                          | `false`     | —           |
| `size`                  | `AutoCompleteSize`                 | `'md'`      | —           |
| `suggestions`           | `unknown[]`                        | `[]`        | —           |
| `tabindex`              | `number`                           | `0`         | —           |
| `unique`                | `boolean`                          | `false`     | —           |
| `virtualScroll`         | `boolean`                          | `false`     | —           |
| `virtualScrollItemSize` | `number`                           | `0`         | —           |

### Outputs

| Name                | Type                             | Description |
| ------------------- | -------------------------------- | ----------- |
| `autocompleteBlur`  | `FocusEvent`                     | —           |
| `autocompleteFocus` | `FocusEvent`                     | —           |
| `autocompleteKeyUp` | `KeyboardEvent`                  | —           |
| `clearEvent`        | `void`                           | —           |
| `dropdownClick`     | `AutoCompleteDropdownClickEvent` | —           |
| `unselect`          | `AutoCompleteUnselectEvent`      | —           |

## Content Projection

_none_

## Theming

| CSS Variable                                   | Default                                                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `--uilib-autocomplete-bg`                      | `var(--uilib-input-bg, var(--uilib-surface))`                                                            |
| `--uilib-autocomplete-border`                  | `var(--uilib-input-border, var(--uilib-border))`                                                         |
| `--uilib-autocomplete-border-focus`            | `var( --uilib-input-border-focus, var(--uilib-color-primary-600) )`                                      |
| `--uilib-autocomplete-border-radius`           | `var(--uilib-input-radius, var(--uilib-shape-base, 6px))`                                                |
| `--uilib-autocomplete-chip-bg`                 | `color-mix( in srgb, var(--uilib-color-primary-600) 12%, transparent )`                                  |
| `--uilib-autocomplete-chip-border-radius`      | `999px`                                                                                                  |
| `--uilib-autocomplete-chip-gap`                | `0.35rem`                                                                                                |
| `--uilib-autocomplete-chip-padding`            | `0.2rem 0.5rem`                                                                                          |
| `--uilib-autocomplete-chip-remove-hover-bg`    | `color-mix( in srgb, var(--uilib-color-primary-600) 18%, transparent )`                                  |
| `--uilib-autocomplete-chip-text`               | `var(--uilib-autocomplete-text)`                                                                         |
| `--uilib-autocomplete-clear-icon-color`        | `var(--uilib-autocomplete-placeholder)`                                                                  |
| `--uilib-autocomplete-clear-icon-hover-color`  | `var(--uilib-autocomplete-text)`                                                                         |
| `--uilib-autocomplete-dropdown-bg`             | `transparent`                                                                                            |
| `--uilib-autocomplete-dropdown-border`         | `transparent`                                                                                            |
| `--uilib-autocomplete-dropdown-hover-bg`       | `color-mix( in srgb, var(--uilib-color-primary-600) 10%, transparent )`                                  |
| `--uilib-autocomplete-dropdown-icon-color`     | `var(--uilib-autocomplete-placeholder)`                                                                  |
| `--uilib-autocomplete-group-label-bg`          | `transparent`                                                                                            |
| `--uilib-autocomplete-group-label-font-weight` | `600`                                                                                                    |
| `--uilib-autocomplete-group-label-text`        | `var(--uilib-muted)`                                                                                     |
| `--uilib-autocomplete-lg-font-size`            | `1.125rem`                                                                                               |
| `--uilib-autocomplete-lg-padding`              | `0.65rem 0.9rem`                                                                                         |
| `--uilib-autocomplete-min-height`              | `var(--uilib-input-min-height, 44px)`                                                                    |
| `--uilib-autocomplete-option-disabled-opacity` | `0.55`                                                                                                   |
| `--uilib-autocomplete-option-hover-bg`         | `var( --uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600) 8%, transparent) )` |
| `--uilib-autocomplete-option-padding`          | `var(--uilib-autocomplete-option-padding-y) var(--uilib-autocomplete-option-padding-x)`                  |
| `--uilib-autocomplete-option-padding-x`        | `calc( var(--uilib-autocomplete-option-padding-x-base) * var(--uilib-density, 1) )`                      |
| `--uilib-autocomplete-option-padding-x-base`   | `0.75rem`                                                                                                |
| `--uilib-autocomplete-option-padding-y`        | `calc( var(--uilib-autocomplete-option-padding-y-base) * var(--uilib-density, 1) )`                      |
| `--uilib-autocomplete-option-padding-y-base`   | `0.55rem`                                                                                                |
| `--uilib-autocomplete-option-selected-bg`      | `color-mix( in srgb, var(--uilib-color-primary-600) 14%, transparent )`                                  |
| `--uilib-autocomplete-option-selected-text`    | `var(--uilib-autocomplete-text)`                                                                         |
| `--uilib-autocomplete-padding-x`               | `calc( var(--uilib-autocomplete-padding-x-base) * var(--uilib-density, 1) )`                             |
| `--uilib-autocomplete-padding-x-base`          | `0.75rem`                                                                                                |
| `--uilib-autocomplete-padding-y`               | `calc( var(--uilib-autocomplete-padding-y-base) * var(--uilib-density, 1) )`                             |
| `--uilib-autocomplete-padding-y-base`          | `0.5rem`                                                                                                 |
| `--uilib-autocomplete-panel-bg`                | `var(--uilib-select-dropdown-bg, var(--uilib-surface))`                                                  |
| `--uilib-autocomplete-panel-border`            | `var(--uilib-autocomplete-border)`                                                                       |
| `--uilib-autocomplete-panel-max-height`        | `260px`                                                                                                  |
| `--uilib-autocomplete-panel-shadow`            | `var( --uilib-select-dropdown-shadow, var(--uilib-shadow-md, none) )`                                    |
| `--uilib-autocomplete-panel-z-index`           | `1000`                                                                                                   |
| `--uilib-autocomplete-placeholder`             | `var(--uilib-input-placeholder, var(--uilib-muted))`                                                     |
| `--uilib-autocomplete-sm-font-size`            | `0.875rem`                                                                                               |
| `--uilib-autocomplete-sm-padding`              | `0.35rem 0.5rem`                                                                                         |
| `--uilib-autocomplete-text`                    | `var(--uilib-input-text, var(--uilib-page-fg))`                                                          |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                            |
| --------------------------------------------------------------------------- |
| ArrowDown and ArrowUp move active option                                    |
| ArrowDown moves aria-activedescendant to next option                        |
| ArrowDown opens panel                                                       |
| ArrowDown opens panel if closed                                             |
| ArrowUp moves to a different option                                         |
| End moves focus to last option                                              |
| Enter selects focused option and closes panel                               |
| Escape closes panel                                                         |
| Escape closes the panel                                                     |
| Home moves focus to first option                                            |
| addOnTab adds current query as chip                                         |
| all option children have role=                                              |
| applies ariaLabel and ariaLabelledBy and inputId                            |
| applies combobox and aria attributes to input                               |
| applies generic wrapper focus and filled classes for FloatLabel integration |
| applies listbox and option roles                                            |
| aria-activedescendant is null when panel is closed                          |
| aria-controls is null when panel is closed                                  |
| aria-controls points to listbox id when open                                |
| chip items have descriptive aria-label                                      |
| chip remove button has aria-label containing                                |
| chip-list has aria-label=                                                   |
| chip-list has role=                                                         |
| chips have role option and aria-label                                       |
| clear button has aria-label=                                                |
| clear button uses inline SVG with aria-hidden=                              |
| closed state passes axe                                                     |
| completeOnFocus emits completion on focus                                   |
| disabled state passes axe                                                   |
| dropdown button has aria-label=                                             |
| dropdown button uses inline SVG with aria-hidden=                           |
| dropdown with clear button passes axe                                       |
| first option is focused via aria-activedescendant                           |
| group containers have correct aria-label                                    |
| group containers have role=                                                 |
| grouped options open state passes axe                                       |
| input has aria-autocomplete=                                                |
| input has aria-expanded=                                                    |
| input has aria-haspopup=                                                    |
| input has role=                                                             |
| live region announces                                                       |
| live region has aria-live=                                                  |
| multiple mode open panel passes axe                                         |
| multiple mode with chips passes axe                                         |
| open state with flat options passes axe                                     |
| options have aria-posinset starting at 1                                    |
| options have aria-selected=                                                 |
| options have aria-setsize equal to total option count                       |
| options have aria-setsize spanning total of all grouped items               |
| options have role=                                                          |
| panel does not open on ArrowDown when disabled                              |
| panel has role=                                                             |
| removes last chip on Backspace with empty input                             |
| renders with each variant class                                             |
| selects active option on Enter key                                          |
| updates aria-activedescendant while navigating                              |

## Usage Examples

```html
<!-- minimal example -->
<ui-lib-autocomplete
  [suggestions]="results"
  (completeMethod)="search($event)"
  [(ngModel)]="selectedItem"
/>

<!-- dropdown button + multiple chips -->
<ui-lib-autocomplete
  [suggestions]="results"
  [dropdown]="true"
  [multiple]="true"
  optionLabel="name"
  (completeMethod)="search($event)"
  [(ngModel)]="selectedItems"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#autocomplete)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/autocomplete/README.md)

