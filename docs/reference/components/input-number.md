# Input Number

**Selector:** `ui-lib-input-number`
**Entry point:** `import { InputNumber } from 'ui-lib-custom/input-number'`

---

## Overview

Numeric input with locale-aware parsing/formatting, CVA support, and spinner controls.

## API

### Inputs

| Name                | Type                                          | Default                                           | Description |
| ------------------- | --------------------------------------------- | ------------------------------------------------- | ----------- |
| `ariaDescribedBy`   | `string | undefined`                          | `undefined`                                       | —           |
| `ariaLabel`         | `string | undefined`                          | `undefined`                                       | —           |
| `ariaLabelledBy`    | `string | undefined`                          | `undefined`                                       | —           |
| `autocomplete`      | `string`                                      | `'off'`                                           | —           |
| `buttonLayout`      | `InputNumberButtonLayout`                     | `INPUT_NUMBER_DEFAULTS.buttonLayout`              | —           |
| `currency`          | `string | undefined`                          | `undefined`                                       | —           |
| `currencyDisplay`   | `InputNumberCurrencyDisplay`                  | `INPUT_NUMBER_DEFAULTS.currencyDisplay`           | —           |
| `disabled`          | `boolean`                                     | `false`                                           | —           |
| `filled`            | `boolean`                                     | `false`                                           | —           |
| `fluid`             | `boolean`                                     | `false`                                           | —           |
| `format`            | `boolean`                                     | `INPUT_NUMBER_DEFAULTS.format`                    | —           |
| `inputId`           | `string`                                      | ``ui-lib-input-number-${++inputNumberIdCounter}`` | —           |
| `invalid`           | `boolean`                                     | `false`                                           | —           |
| `label`             | `string | undefined`                          | `undefined`                                       | —           |
| `locale`            | `string | undefined`                          | `undefined`                                       | —           |
| `localeMatcher`     | `InputNumberLocaleMatcher`                    | `INPUT_NUMBER_DEFAULTS.localeMatcher`             | —           |
| `max`               | `number | null`                               | `INPUT_NUMBER_DEFAULTS.max`                       | —           |
| `maxFractionDigits` | `number | null`                               | `INPUT_NUMBER_DEFAULTS.maxFractionDigits`         | —           |
| `min`               | `number | null`                               | `INPUT_NUMBER_DEFAULTS.min`                       | —           |
| `minFractionDigits` | `number | null`                               | `INPUT_NUMBER_DEFAULTS.minFractionDigits`         | —           |
| `mode`              | `InputNumberMode`                             | `INPUT_NUMBER_DEFAULTS.mode`                      | —           |
| `placeholder`       | `string`                                      | `''`                                              | —           |
| `prefix`            | `string`                                      | `''`                                              | —           |
| `readonly`          | `boolean`                                     | `false`                                           | —           |
| `required`          | `boolean`                                     | `false`                                           | —           |
| `showButtons`       | `boolean`                                     | `INPUT_NUMBER_DEFAULTS.showButtons`               | —           |
| `showClear`         | `boolean`                                     | `INPUT_NUMBER_DEFAULTS.showClear`                 | —           |
| `size`              | `'sm' | 'md' | 'lg'`                          | `'md'`                                            | —           |
| `step`              | `number`                                      | `INPUT_NUMBER_DEFAULTS.step`                      | —           |
| `suffix`            | `string`                                      | `''`                                              | —           |
| `tabindex`          | `number`                                      | `0`                                               | —           |
| `useGrouping`       | `boolean`                                     | `INPUT_NUMBER_DEFAULTS.useGrouping`               | —           |
| `variant`           | `'material' | 'bootstrap' | 'minimal' | null` | `null`                                            | —           |

### Models (two-way bindable)

| Name    | Type            | Default | Description |
| ------- | --------------- | ------- | ----------- |
| `value` | `number | null` | `null`  | —           |

### Outputs

| Name            | Type            | Description |
| --------------- | --------------- | ----------- |
| `clear`         | `void`          | —           |
| `numberBlur`    | `FocusEvent`    | —           |
| `numberFocus`   | `FocusEvent`    | —           |
| `numberKeyDown` | `KeyboardEvent` | —           |

## Content Projection

_none_

## Theming

| CSS Variable                                    | Default                                                                                                                                                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-input-number-bg`                       | `var(--uilib-input-bg, var(--uilib-surface, #ffffff))`                                                                                                                                                                  |
| `--uilib-input-number-border-color`             | `var(--uilib-input-border, var(--uilib-border, #d1d5db))`                                                                                                                                                               |
| `--uilib-input-number-border-color-focus`       | `var( --uilib-input-border-focus, var(--uilib-color-primary-600, #1e88e5) )`                                                                                                                                            |
| `--uilib-input-number-border-color-hover`       | `var( --uilib-input-border-hover, var(--uilib-input-number-border-color) )`                                                                                                                                             |
| `--uilib-input-number-border-radius`            | `var(--uilib-radius-md, 0.5rem)`                                                                                                                                                                                        |
| `--uilib-input-number-border-style`             | `solid`                                                                                                                                                                                                                 |
| `--uilib-input-number-border-width`             | `var(--uilib-border-width, 1px)`                                                                                                                                                                                        |
| `--uilib-input-number-button-active-background` | `color-mix( in srgb, var(--uilib-color-primary-600, #1e88e5) 18%, var(--uilib-input-number-button-bg) )`                                                                                                                |
| `--uilib-input-number-button-bg`                | `var(--uilib-surface-alt, var(--uilib-input-number-bg))`                                                                                                                                                                |
| `--uilib-input-number-button-border-color`      | `var(--uilib-input-number-border-color)`                                                                                                                                                                                |
| `--uilib-input-number-button-disabled-opacity`  | `var(--uilib-disabled-opacity, 0.45)`                                                                                                                                                                                   |
| `--uilib-input-number-button-hover-background`  | `color-mix( in srgb, var(--uilib-color-primary-600, #1e88e5) 10%, var(--uilib-input-number-button-bg) )`                                                                                                                |
| `--uilib-input-number-button-text`              | `var(--uilib-input-number-text)`                                                                                                                                                                                        |
| `--uilib-input-number-button-width`             | `var(--uilib-input-number-button-width-md)`                                                                                                                                                                             |
| `--uilib-input-number-button-width-lg`          | `var(--uilib-size-10, 2.5rem)`                                                                                                                                                                                          |
| `--uilib-input-number-button-width-md`          | `var(--uilib-size-9, 2.25rem)`                                                                                                                                                                                          |
| `--uilib-input-number-button-width-sm`          | `var(--uilib-size-8, 2rem)`                                                                                                                                                                                             |
| `--uilib-input-number-clear-color`              | `var(--uilib-input-number-placeholder-color)`                                                                                                                                                                           |
| `--uilib-input-number-clear-offset`             | `var(--uilib-space-2, 0.5rem)`                                                                                                                                                                                          |
| `--uilib-input-number-clear-size`               | `var(--uilib-font-size-base, 1rem)`                                                                                                                                                                                     |
| `--uilib-input-number-disabled-opacity`         | `var(--uilib-disabled-opacity, 0.6)`                                                                                                                                                                                    |
| `--uilib-input-number-filled-bg`                | `var(--uilib-surface-alt, #f3f4f6)`                                                                                                                                                                                     |
| `--uilib-input-number-focus-ring`               | `0 0 0 var(--uilib-focus-ring-width, 2px) color-mix(in srgb, var(--uilib-input-number-border-color-focus) 28%, transparent)`                                                                                            |
| `--uilib-input-number-font-family`              | `var(--uilib-font-ui, system-ui, sans-serif)`                                                                                                                                                                           |
| `--uilib-input-number-font-size`                | `var(--uilib-input-number-font-size-md)`                                                                                                                                                                                |
| `--uilib-input-number-font-size-lg`             | `var(--uilib-font-size-lg, 1.125rem)`                                                                                                                                                                                   |
| `--uilib-input-number-font-size-md`             | `var(--uilib-font-size-md, 1rem)`                                                                                                                                                                                       |
| `--uilib-input-number-font-size-sm`             | `var(--uilib-font-size-sm, 0.875rem)`                                                                                                                                                                                   |
| `--uilib-input-number-font-weight`              | `var(--uilib-font-weight-400, 400)`                                                                                                                                                                                     |
| `--uilib-input-number-gap`                      | `var(--uilib-space-2, 0.5rem)`                                                                                                                                                                                          |
| `--uilib-input-number-height-lg`                | `var(--uilib-size-12, 3.125rem)`                                                                                                                                                                                        |
| `--uilib-input-number-height-md`                | `var(--uilib-size-11, 2.75rem)`                                                                                                                                                                                         |
| `--uilib-input-number-height-sm`                | `var(--uilib-size-9, 2.25rem)`                                                                                                                                                                                          |
| `--uilib-input-number-input-height`             | `var(--uilib-input-number-height-md)`                                                                                                                                                                                   |
| `--uilib-input-number-invalid-border-color`     | `var(--uilib-color-danger-600, #e53935)`                                                                                                                                                                                |
| `--uilib-input-number-padding-x`                | `var(--uilib-input-number-padding-x-md)`                                                                                                                                                                                |
| `--uilib-input-number-padding-x-lg`             | `var(--uilib-space-4, 1rem)`                                                                                                                                                                                            |
| `--uilib-input-number-padding-x-md`             | `var(--uilib-space-3, 0.75rem)`                                                                                                                                                                                         |
| `--uilib-input-number-padding-x-sm`             | `var(--uilib-space-2, 0.5rem)`                                                                                                                                                                                          |
| `--uilib-input-number-padding-y`                | `var(--uilib-input-number-padding-y-md)`                                                                                                                                                                                |
| `--uilib-input-number-padding-y-lg`             | `var(--uilib-space-3, 0.75rem)`                                                                                                                                                                                         |
| `--uilib-input-number-padding-y-md`             | `var(--uilib-space-2, 0.5rem)`                                                                                                                                                                                          |
| `--uilib-input-number-padding-y-sm`             | `var(--uilib-space-1, 0.25rem)`                                                                                                                                                                                         |
| `--uilib-input-number-placeholder-color`        | `var( --uilib-input-placeholder, var(--uilib-muted, #6b7280) )`                                                                                                                                                         |
| `--uilib-input-number-prefix-color`             | `var(--uilib-input-number-placeholder-color)`                                                                                                                                                                           |
| `--uilib-input-number-suffix-color`             | `var(--uilib-input-number-placeholder-color)`                                                                                                                                                                           |
| `--uilib-input-number-text`                     | `var(--uilib-input-text, var(--uilib-page-fg, #1f2933))`                                                                                                                                                                |
| `--uilib-input-number-transition`               | `border-color var(--uilib-transition-fast, 150ms ease), box-shadow var(--uilib-transition-fast, 150ms ease), background-color var(--uilib-transition-fast, 150ms ease), color var(--uilib-transition-fast, 150ms ease)` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                  |
| ----------------------------------------------------------------- |
| ArrowDown decrements by step                                      |
| ArrowDown decrements the value                                    |
| ArrowUp increments by step                                        |
| ArrowUp increments the value                                      |
| aria-valuemin, aria-valuemax, aria-valuenow set correctly         |
| ariaLabel applied                                                 |
| ariaLabelledBy applied                                            |
| at max value passes axe                                           |
| at min value passes axe                                           |
| decrement button aria-label contains                              |
| decrement button does not have aria-disabled when above min       |
| decrement button has aria-disabled=                               |
| default state (no value, no buttons) passes axe                   |
| increment and decrement buttons have aria-disabled=               |
| increment button aria-label contains                              |
| increment button aria-label falls back to                         |
| increment button aria-label includes the label input              |
| increment button does not have aria-disabled when below max       |
| increment button has aria-disabled=                               |
| input element has role=                                           |
| input has role=                                                   |
| invalid state passes axe                                          |
| keyboard increment is disabled when readonly                      |
| omits aria-invalid when invalid is false                          |
| omits aria-label when ariaLabel is not provided                   |
| omits aria-required when required is false                        |
| omits aria-valuemax when max is null                              |
| omits aria-valuemin when min is null                              |
| provides aria-valuetext when a value is set                       |
| reflects current value on aria-valuenow                           |
| sets aria-invalid=                                                |
| sets aria-label on the input when ariaLabel is provided           |
| sets aria-labelledby on the input when ariaLabelledBy is provided |
| sets aria-required=                                               |
| sets aria-valuemax from max input                                 |
| sets aria-valuemin from min input                                 |
| sets aria-valuenow to null when value is null                     |
| sets aria-valuetext to null when no value is set                  |

## Usage Examples

```html
<!-- basic decimal input -->
<ui-lib-input-number [(ngModel)]="price" [min]="0" [maxFractionDigits]="2" />

<!-- currency with spinner buttons -->
<ui-lib-input-number
  mode="currency"
  currency="USD"
  label="Amount"
  [showButtons]="true"
  [(value)]="amount"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#input-number)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/input-number/README.md)

