# Checkbox

**Selector:** `ui-lib-checkbox`
**Entry point:** `import { Checkbox } from 'ui-lib-custom/checkbox'`

---

## Overview

Checkbox component with accessible labeling and indeterminate support.

## API

### Inputs

| Name            | Type                     | Default      | Description |
| --------------- | ------------------------ | ------------ | ----------- |
| `appearance`    | `CheckboxAppearance`     | `'outlined'` | —           |
| `ariaLabel`     | `string | null`          | `null`       | —           |
| `autofocus`     | `boolean`                | `false`      | —           |
| `binary`        | `boolean`                | `false`      | —           |
| `checkboxIcon`  | `string | null`          | `null`       | —           |
| `description`   | `string | null`          | `null`       | —           |
| `disabled`      | `boolean`                | `false`      | —           |
| `falseValue`    | `unknown`                | `false`      | —           |
| `indeterminate` | `boolean`                | `false`      | —           |
| `inputClass`    | `string | null`          | `null`       | —           |
| `inputId`       | `string | null`          | `null`       | —           |
| `label`         | `string | null`          | `null`       | —           |
| `name`          | `string | null`          | `null`       | —           |
| `readonly`      | `boolean`                | `false`      | —           |
| `required`      | `boolean`                | `false`      | —           |
| `size`          | `CheckboxSize`           | `'md'`       | —           |
| `tabindex`      | `number`                 | `0`          | —           |
| `trueValue`     | `unknown`                | `true`       | —           |
| `value`         | `unknown | null`         | `null`       | —           |
| `variant`       | `CheckboxVariant | null` | `null`       | —           |

### Models (two-way bindable)

| Name      | Type      | Default | Description |
| --------- | --------- | ------- | ----------- |
| `checked` | `boolean` | `false` | —           |

### Outputs

| Name             | Type                  | Description |
| ---------------- | --------------------- | ----------- |
| `checkboxBlur`   | `FocusEvent`          | —           |
| `checkboxChange` | `CheckboxChangeEvent` | —           |
| `checkboxFocus`  | `FocusEvent`          | —           |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                             | Default                                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-checkbox-bg`                    | `var(--uilib-checkbox-bg-color, var(--uilib-surface))`                                                                                   |
| `--uilib-checkbox-bg-checked`            | `var( --uilib-checkbox-bg-checked-color, var(--uilib-color-primary-500) )`                                                               |
| `--uilib-checkbox-border`                | `var(--uilib-checkbox-border-color, var(--uilib-color-neutral-400))`                                                                     |
| `--uilib-checkbox-border-active`         | `var( --uilib-checkbox-border-active-color, var(--uilib-color-primary-600) )`                                                            |
| `--uilib-checkbox-border-hover`          | `var( --uilib-checkbox-border-hover-color, var(--uilib-color-primary-500) )`                                                             |
| `--uilib-checkbox-check-color`           | `var(--uilib-color-neutral-50)`                                                                                                          |
| `--uilib-checkbox-description-color`     | `var( --uilib-checkbox-description-color, var(--uilib-color-neutral-600) )`                                                              |
| `--uilib-checkbox-description-font-size` | `var(--uilib-font-size-sm, 0.875rem)`                                                                                                    |
| `--uilib-checkbox-filled-bg`             | `var( --uilib-checkbox-filled-bg-color, color-mix(in srgb, var(--uilib-color-neutral-500) 10%, var(--uilib-surface)) )`                  |
| `--uilib-checkbox-filled-border-color`   | `var( --uilib-checkbox-filled-border-color, color-mix(in srgb, var(--uilib-checkbox-border-active) 35%, var(--uilib-checkbox-border)) )` |
| `--uilib-checkbox-focus-ring`            | `0 0 0 3px color-mix(in srgb, var(--uilib-checkbox-border-hover) 30%, transparent)`                                                      |
| `--uilib-checkbox-font`                  | `var(--uilib-font-ui, inherit)`                                                                                                          |
| `--uilib-checkbox-font-size-md`          | `var(--uilib-font-size-md, 1rem)`                                                                                                        |
| `--uilib-checkbox-font-size-sm`          | `var(--uilib-font-size-sm, 0.875rem)`                                                                                                    |
| `--uilib-checkbox-gap`                   | `var(--uilib-space-3, 0.75rem)`                                                                                                          |
| `--uilib-checkbox-padding-base`          | `0rem`                                                                                                                                   |
| `--uilib-checkbox-radius`                | `var(--uilib-shape-base, 6px)`                                                                                                           |
| `--uilib-checkbox-size`                  | `var(--uilib-checkbox-size-sm)`                                                                                                          |
| `--uilib-checkbox-size-lg`               | `1.5rem`                                                                                                                                 |
| `--uilib-checkbox-size-md`               | `1.25rem`                                                                                                                                |
| `--uilib-checkbox-size-sm`               | `1rem`                                                                                                                                   |
| `--uilib-checkbox-transition-duration`   | `150ms`                                                                                                                                  |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                             |
| ---------------------------------------------------------------------------- |
| applies dark theme variables                                                 |
| applies each variant class                                                   |
| applies filled appearance class for all variants                             |
| applies variant, size, and checked classes                                   |
| associates label via aria-labelledby                                         |
| autofocuses the host when autofocus is true                                  |
| emits onBlur when host loses focus                                           |
| emits onFocus when host receives focus                                       |
| keeps aria-labelledby linked to the internal label id                        |
| keeps checkmark and indeterminate icons aria-hidden                          |
| keeps native input screen-reader accessible and visual box presentation-only |
| marks control as touched on focusout                                         |
| omits aria-disabled when enabled                                             |
| omits aria-required when not required                                        |
| reflects disabled input as aria-disabled=true                                |
| reflects required input as aria-required=true                                |
| registerOnTouched fires on focusout                                          |
| sets aria-checked=false initially                                            |
| sets aria-checked=mixed when indeterminate is true                           |
| sets aria-checked=true after checking                                        |
| sets aria-describedby when description exists                                |
| uses aria-label when no visible label is provided                            |
| uses aria-label when provided                                                |
| uses custom tabindex when enabled and -1 when disabled                       |

## Usage Examples

```html
<!-- simple boolean checkbox -->
<ui-lib-checkbox label="Accept terms" [(checked)]="accepted" />

<!-- group mode — ngModel holds a string[] -->
<ui-lib-checkbox label="Angular" [value]="'angular'" [(ngModel)]="selected" />
<ui-lib-checkbox label="React" [value]="'react'" [(ngModel)]="selected" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#checkbox)
- [Demo page](/components/checkbox)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/checkbox/README.md)

