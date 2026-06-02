# Input

**Selector:** `ui-lib-input`
**Entry point:** `import { Input } from 'ui-lib-custom/input'`

---

## Overview

Text input component with floating labels and validation states.

## API

### Inputs

| Name                 | Type              | Default                | Description |
| -------------------- | ----------------- | ---------------------- | ----------- | --- |
| `ariaLabel`          | `string           | null`                  | `null`      | —   |
| `ariaLabelledBy`     | `string           | null`                  | `null`      | —   |
| `disabled`           | `boolean`         | `false`                | —           |
| `error`              | `string           | null`                  | `null`      | —   |
| `hint`               | `string           | null`                  | `null`      | —   |
| `id`                 | `string           | null`                  | `null`      | —   |
| `invalid`            | `boolean`         | `false`                | —           |
| `label`              | `string`          | `''`                   | —           |
| `labelFloat`         | `InputLabelFloat` | `'over'`               | —           |
| `maxLength`          | `number           | null`                  | `null`      | —   |
| `name`               | `string           | null`                  | `null`      | —   |
| `placeholder`        | `string`          | `''`                   | —           |
| `readonly`           | `boolean`         | `false`                | —           |
| `required`           | `boolean`         | `false`                | —           |
| `showClear`          | `boolean`         | `false`                | —           |
| `showCounter`        | `boolean`         | `false`                | —           |
| `showTogglePassword` | `boolean`         | `false`                | —           |
| `size`               | `InputSize`       | `SHARED_DEFAULTS.Size` | —           |
| `type`               | `InputType`       | `'text'`               | —           |
| `variant`            | `InputVariant     | null`                  | `null`      | —   |

### Outputs

_none_

## Content Projection

| Selector   | Notes |
| ---------- | ----- |
| `[prefix]` | —     |
| `[suffix]` | —     |

## Theming

| CSS Variable                        | Default                                                             |
| ----------------------------------- | ------------------------------------------------------------------- |
| `--uilib-input-bg`                  | `var(--uilib-surface-dark-1)`                                       |
| `--uilib-input-border`              | `var(--uilib-border-dark)`                                          |
| `--uilib-input-border-focus`        | `var(--uilib-color-primary-dark)`                                   |
| `--uilib-input-border-hover`        | `var(--uilib-border-dark-light)`                                    |
| `--uilib-input-font-size-lg`        | `var(--uilib-font-size-lg, 1.125rem)`                               |
| `--uilib-input-font-size-md`        | `var(--uilib-font-size-md, 1rem)`                                   |
| `--uilib-input-font-size-sm`        | `var(--uilib-font-size-sm, 0.875rem)`                               |
| `--uilib-input-label-bg`            | `var(--uilib-surface-dark-1)`                                       |
| `--uilib-input-meta-font-size`      | `var(--uilib-font-size-sm, 0.875rem)`                               |
| `--uilib-input-min-height`          | `36px`                                                              |
| `--uilib-input-padding-x`           | `calc(var(--uilib-input-padding-x-base) * var(--uilib-density, 1))` |
| `--uilib-input-padding-x-base`      | `0.75rem`                                                           |
| `--uilib-input-padding-y`           | `calc(var(--uilib-input-padding-y-base) * var(--uilib-density, 1))` |
| `--uilib-input-padding-y-base`      | `0.5rem`                                                            |
| `--uilib-input-placeholder`         | `var(--uilib-text-dark-secondary)`                                  |
| `--uilib-input-text`                | `var(--uilib-text-dark-primary)`                                    |
| `--uilib-input-transition-duration` | `0ms`                                                               |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                         |
| ------------------------------------------------------------------------ |
| announces new error messages once                                        |
| applies dark theme variables                                             |
| applies each variant class                                               |
| applies error state and aria-invalid                                     |
| aria-describedby includes both errorId and hintId when both are present  |
| clears aria-describedby when error is removed and no hint exists         |
| clears aria-invalid when error is removed                                |
| clears aria-readonly when readonly is unset                              |
| focusInput focuses input when click is not on a button                   |
| focusInput ignores clicks on buttons                                     |
| marks touched on blur after keyboard focus                               |
| omits aria-describedby when no error and no hint                         |
| omits aria-invalid by default                                            |
| omits aria-label when ariaLabel is null                                  |
| omits aria-labelledby when ariaLabelledBy is null                        |
| omits aria-readonly by default                                           |
| omits aria-required by default                                           |
| required indicator (\*) carries aria-hidden=                             |
| sets aria-describedby to errorId when error is shown                     |
| sets aria-describedby to hintId when hint is shown                       |
| sets aria-describedby to the error element                               |
| sets aria-invalid=                                                       |
| sets aria-label on the native input when ariaLabel is provided           |
| sets aria-labelledby on the native input when ariaLabelledBy is provided |
| sets aria-readonly=                                                      |
| sets aria-required=                                                      |

## Usage Examples

```html
<!-- minimal example -->
<ui-lib-input label="Email" type="email" [(ngModel)]="email" />

<!-- with hint text -->
<ui-lib-input label="Email" hint="We'll never share your email" [(ngModel)]="email" />

<!-- with prefix icon, error, and character counter -->
<ui-lib-input
  label="Username"
  [error]="usernameError"
  [showCounter]="true"
  [maxLength]="30"
  [(ngModel)]="username"
>
  <span prefix>@</span>
</ui-lib-input>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#input)
- [Demo page](/components/input)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/input/README.md)
