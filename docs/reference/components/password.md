# Password

**Selector:** `ui-lib-password`
**Entry point:** `import { Password } from 'ui-lib-custom/password'`

---

## Overview

Password field with strength meter, mask toggle, and ControlValueAccessor integration.

## API

### Inputs

| Name              | Type                     | Default                         | Description                                                                                                     |
| ----------------- | ------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `appearance`      | `'outlined' | 'filled'`  | `'outlined'`                    | Visual appearance: outlined (default) or filled background.                                                     |
| `ariaLabel`       | `string | undefined`     | `undefined`                     | Accessible label string for the input.                                                                          |
| `ariaLabelledBy`  | `string | undefined`     | `undefined`                     | Space-separated IDs of elements that label this input.                                                          |
| `autocomplete`    | `string | undefined`     | `undefined`                     | Autocomplete attribute value for the native input.                                                              |
| `disabled`        | `boolean`                | `false`                         | Whether the control is disabled.                                                                                |
| `errorMessage`    | `string | undefined`     | `undefined`                     | Optional validation error text announced when `invalid` is true.                                                |
| `feedback`        | `boolean`                | `PASSWORD_DEFAULTS.feedback`    | Whether to display the strength meter panel when the input is focused.                                          |
| `fluid`           | `boolean`                | `false`                         | Whether the control spans the full width of its container.                                                      |
| `inputId`         | `string | undefined`     | `undefined`                     | ID applied to the inner input element — use with an associated label element.                                   |
| `inputStyleClass` | `string | undefined`     | `undefined`                     | Additional CSS class applied to the inner input element.                                                        |
| `invalid`         | `boolean`                | `false`                         | Whether the control is in an invalid state.                                                                     |
| `maxLength`       | `number | undefined`     | `undefined`                     | Maximum character length constraint on the input.                                                               |
| `mediumLabel`     | `string`                 | `PASSWORD_DEFAULTS.mediumLabel` | Strength panel label shown when the password is classified as medium.                                           |
| `mediumRegex`     | `string`                 | `PASSWORD_DEFAULTS.mediumRegex` | Regex used to classify a password as medium strength.                                                           |
| `name`            | `string | undefined`     | `undefined`                     | Name attribute for the native input.                                                                            |
| `placeholder`     | `string | undefined`     | `undefined`                     | Placeholder text for the native input.                                                                          |
| `promptLabel`     | `string`                 | `PASSWORD_DEFAULTS.promptLabel` | Strength panel label shown before the user starts typing.                                                       |
| `readonly`        | `boolean`                | `false`                         | Whether the control is read-only.                                                                               |
| `showClear`       | `boolean`                | `PASSWORD_DEFAULTS.showClear`   | Whether to show a clear button when the field has a value.                                                      |
| `size`            | `PasswordSize`           | `'md'`                          | Size token: sm, md, or lg.                                                                                      |
| `strongLabel`     | `string`                 | `PASSWORD_DEFAULTS.strongLabel` | Strength panel label shown when the password is classified as strong.                                           |
| `strongRegex`     | `string`                 | `PASSWORD_DEFAULTS.strongRegex` | Regex used to classify a password as strong.                                                                    |
| `tabindex`        | `number | undefined`     | `undefined`                     | Tab-order index for the input.                                                                                  |
| `toggleMask`      | `boolean`                | `PASSWORD_DEFAULTS.toggleMask`  | Whether to show a button that toggles password visibility.                                                      |
| `variant`         | `PasswordVariant | null` | `null`                          | Design variant: material, bootstrap, or minimal. Falls back to the global ThemeConfigService variant when null. |
| `weakLabel`       | `string`                 | `PASSWORD_DEFAULTS.weakLabel`   | Strength panel label shown when the password is classified as weak.                                             |

### Outputs

| Name      | Type    | Description                               |
| --------- | ------- | ----------------------------------------- |
| `blurred` | `Event` | Emitted when the input loses focus.       |
| `cleared` | `void`  | Emitted when the clear button is clicked. |
| `focused` | `Event` | Emitted when the input receives focus.    |

## Content Projection

_none_

## Theming

| CSS Variable                                       | Default                                                         |
| -------------------------------------------------- | --------------------------------------------------------------- |
| `--uilib-password-border-color`                    | `var(--uilib-color-neutral-300, #e0e0e0)`                       |
| `--uilib-password-border-color-focus`              | `#6366f1`                                                       |
| `--uilib-password-border-color-hover`              | `#bdbdbd`                                                       |
| `--uilib-password-border-radius`                   | `4px`                                                           |
| `--uilib-password-focus-ring`                      | `rgba(99, 102, 241, 0.15)`                                      |
| `--uilib-password-meter-color-transition-duration` | `0ms`                                                           |
| `--uilib-password-meter-transition-duration`       | `0ms`                                                           |
| `--uilib-password-panel-border-radius`             | `4px`                                                           |
| `--uilib-password-panel-shadow`                    | `0 2px 8px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06)` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| adds error id to aria-describedby when invalid message is present          |
| aria-describedby id matches the strength live region id                    |
| forwards aria-labelledby to the input                                      |
| input has aria-describedby pointing to strengthId when feedback is enabled |
| omits aria-describedby when feedback is disabled                           |
| omits aria-invalid when invalid is false                                   |
| sets aria-invalid=                                                         |
| should apply uilib-inputwrapper-focus on focus                             |
| should display prompt label when field is empty and focused                |
| should not render the strength panel when not focused                      |
| should remove uilib-inputwrapper-focus on blur                             |
| should render a visually-hidden live region with aria-live=                |
| should show the strength panel when focused with feedback enabled          |
| strength live region announces                                             |
| strength live region has aria-atomic=                                      |
| strength live region has aria-live=                                        |
| strength live region has role=                                             |
| strength visual bars (meter) have aria-hidden=                             |
| toggle button aria-pressed is false when password is hidden                |
| toggle button aria-pressed is true when password is visible                |
| toggle button has aria-label=                                              |
| toggle icon svg has aria-hidden=                                           |
| toggle icon svg has focusable=                                             |

## Usage Examples

```html
<!-- minimal example with label association -->
<label [for]="passRef.passwordId">Password</label>
<uilib-password #passRef [(ngModel)]="password" />

<!-- with toggle mask, feedback, and clear button -->
<label [for]="passRef.passwordId">New password</label>
<uilib-password
  #passRef
  variant="material"
  [toggleMask]="true"
  [showClear]="true"
  placeholder="Min 8 characters"
  [(ngModel)]="password"
/>

<!-- without strength feedback, with clear button -->
<label [for]="passRef.passwordId">Password</label>
<uilib-password
  #passRef
  [feedback]="false"
  [showClear]="true"
  placeholder="Password"
  [(ngModel)]="password"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#password)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/password/README.md)

