# Input Mask

**Selector:** `ui-lib-input-mask`
**Entry point:** `import { InputMask } from 'ui-lib-custom/input-mask'`

---

## Overview

InputMask component with CVA integration and mask-aware keyboard handling.

## API

### Inputs

| Name               | Type            | Default                                | Description |
| ------------------ | --------------- | -------------------------------------- | ----------- | ----- | ------ | --------------------------------------------------------------------------- |
| `ariaLabel`        | `string         | null`                                  | `null`      | —     |
| `ariaLabelledBy`   | `string         | null`                                  | `null`      | —     |
| `autoClear`        | `boolean`       | `INPUT_MASK_DEFAULTS.autoClear`        | —           |
| `autocomplete`     | `string         | undefined`                             | `undefined` | —     |
| `characterPattern` | `string`        | `INPUT_MASK_DEFAULTS.characterPattern` | —           |
| `disabled`         | `boolean`       | `false`                                | —           |
| `errorMessage`     | `string         | null`                                  | `null`      | —     |
| `filled`           | `boolean`       | `false`                                | —           |
| `fluid`            | `boolean`       | `false`                                | —           |
| `id`               | `string         | null`                                  | `null`      | —     |
| `invalid`          | `boolean`       | `false`                                | —           |
| `keepBuffer`       | `boolean`       | `INPUT_MASK_DEFAULTS.keepBuffer`       | —           |
| `mask`             | `string`        | `''`                                   | —           |
| `maskHint`         | `string         | null`                                  | `null`      | —     |
| `name`             | `string         | undefined`                             | `undefined` | —     |
| `placeholder`      | `string         | undefined`                             | `undefined` | —     |
| `readonly`         | `boolean`       | `false`                                | —           |
| `showClear`        | `boolean`       | `INPUT_MASK_DEFAULTS.showClear`        | —           |
| `size`             | `InputMaskSize` | `'md'`                                 | —           |
| `slotChar`         | `string`        | `INPUT_MASK_DEFAULTS.slotChar`         | —           |
| `type`             | `string`        | `INPUT_MASK_DEFAULTS.type`             | —           |
| `unmask`           | `boolean`       | `INPUT_MASK_DEFAULTS.unmask`           | —           |
| `variant`          | `'material'     | 'bootstrap'                            | 'minimal'   | null` | `null` | Design variant override. When null the active global theme variant is used. |

### Outputs

| Name           | Type                     | Description |
| -------------- | ------------------------ | ----------- |
| `blurred`      | `Event`                  | —           |
| `cleared`      | `void`                   | —           |
| `completed`    | `InputMaskCompleteEvent` | —           |
| `focused`      | `Event`                  | —           |
| `inputChanged` | `Event`                  | —           |

## Content Projection

| Selector  | Notes |
| --------- | ----- |
| `[error]` | —     |

## Theming

| CSS Variable                              | Default                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `--uilib-input-mask-bg`                   | `var(--uilib-surface, transparent)`                                                                     |
| `--uilib-input-mask-border-color`         | `var(--uilib-border, currentColor)`                                                                     |
| `--uilib-input-mask-border-radius`        | `var(--uilib-radius-md, 0.5rem)`                                                                        |
| `--uilib-input-mask-clear-icon-size`      | `1rem`                                                                                                  |
| `--uilib-input-mask-disabled-opacity`     | `0.6`                                                                                                   |
| `--uilib-input-mask-error-color`          | `var(--uilib-color-danger-600, currentColor)`                                                           |
| `--uilib-input-mask-filled-bg`            | `color-mix( in srgb, var(--uilib-input-mask-bg) 84%, var(--uilib-color-neutral-900, currentColor) 4% )` |
| `--uilib-input-mask-focus-border-color`   | `var(--uilib-color-primary-600, currentColor)`                                                          |
| `--uilib-input-mask-focus-ring`           | `0 0 0 0.1875rem color-mix(in srgb, var(--uilib-input-mask-focus-border-color) 28%, transparent)`       |
| `--uilib-input-mask-font-size`            | `var(--uilib-font-size-base, 1rem)`                                                                     |
| `--uilib-input-mask-icon-color`           | `var(--uilib-muted, currentColor)`                                                                      |
| `--uilib-input-mask-invalid-border-color` | `var(--uilib-color-danger-600, currentColor)`                                                           |
| `--uilib-input-mask-padding-x`            | `var(--uilib-space-3, 0.75rem)`                                                                         |
| `--uilib-input-mask-padding-y`            | `var(--uilib-space-2, 0.5rem)`                                                                          |
| `--uilib-input-mask-placeholder-color`    | `var(--uilib-muted, currentColor)`                                                                      |
| `--uilib-input-mask-text-color`           | `var(--uilib-page-fg, currentColor)`                                                                    |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

### Keyboard Interactions

| Test description                                                               |
| ------------------------------------------------------------------------------ |
| announces blocked characters through the screen-reader live region             |
| announces blocked characters via polite live region                            |
| axe: has no accessibility violations for a labeled default input mask          |
| axe: has no accessibility violations for disabled and readonly states          |
| axe: has no accessibility violations when invalid is set                       |
| backspace removes the previous editable character and shifts left              |
| binds aria-label and aria-labelledby attributes when provided                  |
| delete removes the current editable character and shifts left                  |
| emits focused, blurred, completed, and cleared events                          |
| includes both hint and error ids in aria-describedby when invalid              |
| keeps aria-describedby focused on hint when not invalid                        |
| keeps complete masks aria-valid after blur                                     |
| links aria-describedby to generated hint id and renders default mask hint text |
| links aria-describedby to generated hint id by default                         |
| links externally invalid state to error id in aria-describedby                 |
| marks incomplete masks as aria-invalid on blur when autoClear is false         |
| positions caret on focus and advances caret over literals on typing            |
| renders error element with role alert for invalid state                        |
| sets aria-invalid and links error id when blur leaves mask incomplete          |
| sets aria-invalid on externally invalid mask                                   |
| sets aria-label when ariaLabel input is provided                               |
| sets aria-labelledby when ariaLabelledBy input is provided                     |
| updates float-label integration classes for filled and focus states            |
| uses aria-valuetext for user-entered characters                                |

## Usage Examples

```html
<!-- phone number mask -->
<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="phone" />

<!-- date mask, emitting unmasked value -->
<uilib-input-mask mask="99/99/9999" [unmask]="true" [(ngModel)]="rawDate" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#input-mask)
- [Demo page](/components/input-mask)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/input-mask/README.md)
