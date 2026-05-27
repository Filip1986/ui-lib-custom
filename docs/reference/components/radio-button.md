# Radio Button

**Selector:** `ui-lib-radio-button`
**Entry point:** `import { RadioButton } from 'ui-lib-custom/radio-button'`

---

## Overview

RadioButton component with accessible labeling and group selection support via ControlValueAccessor.

## API

### Inputs

| Name              | Type              | Default | Description                                                  |
| ----------------- | ----------------- | ------- | ------------------------------------------------------------ |
| `ariaDescribedby` | `string | null`   | `null`  | Links to helper/error text element ids.                      |
| `ariaLabel`       | `string | null`   | `null`  | ARIA label when no visible label is provided.                |
| `ariaLabelledby`  | `string | null`   | `null`  | Explicit aria-labelledby override.                           |
| `autofocus`       | `boolean`         | `false` | Automatically focuses the input after view init.             |
| `disabled`        | `boolean`         | `false` | Whether the radio button is disabled.                        |
| `inputId`         | `string | null`   | `null`  | Id forwarded to the native `<input>` element.                |
| `invalid`         | `boolean`         | `false` | Explicit invalid state for accessibility and styling.        |
| `label`           | `string | null`   | `null`  | Label text rendered next to the radio button.                |
| `name`            | `string | null`   | `null`  | Name attribute shared across the radio group.                |
| `readonly`        | `boolean`         | `false` | When true the radio button is visible but cannot be changed. |
| `required`        | `boolean`         | `false` | Whether the native input is required.                        |
| `size`            | `RadioButtonSize` | `'md'`  | Size token: sm | md | lg.                                    |
| `tabindex`        | `number`          | `0`     | Tab index for keyboard navigation.                           |
| `value`           | `unknown`         | `null`  | The value this radio button represents in the group model.   |

### Outputs

| Name         | Type         | Description                                |
| ------------ | ------------ | ------------------------------------------ |
| `radioBlur`  | `FocusEvent` | Emitted when the native input loses focus. |
| `radioFocus` | `FocusEvent` | Emitted when the native input gains focus. |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                               | Default                                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `--uilib-radio-button-bg`                  | `var(--uilib-surface)`                                                                  |
| `--uilib-radio-button-bg-checked`          | `var(--uilib-color-primary-500)`                                                        |
| `--uilib-radio-button-border-active`       | `var(--uilib-color-primary-600)`                                                        |
| `--uilib-radio-button-border-color`        | `var(--uilib-color-neutral-400)`                                                        |
| `--uilib-radio-button-border-hover`        | `var(--uilib-color-primary-500)`                                                        |
| `--uilib-radio-button-dot-color`           | `var(--uilib-color-neutral-50)`                                                         |
| `--uilib-radio-button-focus-ring`          | `0 0 0 3px color-mix(in srgb, var(--uilib-radio-button-border-hover) 30%, transparent)` |
| `--uilib-radio-button-font`                | `var(--uilib-font-ui, inherit)`                                                         |
| `--uilib-radio-button-gap`                 | `var(--uilib-space-3, 0.75rem)`                                                         |
| `--uilib-radio-button-label-color`         | `inherit`                                                                               |
| `--uilib-radio-button-size`                | `var(--uilib-radio-button-size-sm)`                                                     |
| `--uilib-radio-button-size-lg`             | `1.5rem`                                                                                |
| `--uilib-radio-button-size-md`             | `1.25rem`                                                                               |
| `--uilib-radio-button-size-sm`             | `1rem`                                                                                  |
| `--uilib-radio-button-transition-duration` | `0ms`                                                                                   |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                 |
| -------------------------------------------------------------------------------- |
| ArrowDown moves focus to the next radio and selects it                           |
| ArrowDown wraps from last radio to first                                         |
| ArrowLeft moves focus to the previous radio and selects it                       |
| ArrowRight moves focus to the next radio and selects it                          |
| ArrowUp moves focus to the previous radio and selects it                         |
| ArrowUp wraps from first radio to last                                           |
| applies default variant and size classes                                         |
| applies each variant class                                                       |
| applies tabindex to native input                                                 |
| disabled radio always has tabindex=                                              |
| disabled radio is skipped in ArrowDown navigation                                |
| does not set aria-labelledby when ariaLabel is provided                          |
| emits focus event                                                                |
| enabled radios have tabindex=                                                    |
| group wrapper has aria-labelledby pointing to its label                          |
| group wrapper has role=                                                          |
| group wrapper omits aria-invalid and aria-describedby when groupInvalid is false |
| group wrapper omits aria-required when groupRequired is false                    |
| group wrapper reflects aria-required when groupRequired is true                  |
| group wrapper sets aria-invalid and aria-describedby when groupInvalid is true   |
| has no accessibility violations with group aria-required                         |
| native input has aria-disabled=                                                  |
| native input omits aria-disabled when not disabled                               |
| native input reflects aria-required=                                             |
| native input sets aria-invalid and aria-describedby when invalid is true         |
| selected radio keeps tabindex=                                                   |
| sets aria-describedby when provided                                              |
| sets aria-invalid when invalid is true                                           |
| sets aria-label on the native input                                              |
| sets aria-labelledby on each native input pointing to its label element          |
| sets aria-labelledby to label element id when label is provided                  |
| sets custom aria-labelledby when provided                                        |
| sets tabindex to -1 when disabled                                                |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#radio-button)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/radio-button/README.md)

