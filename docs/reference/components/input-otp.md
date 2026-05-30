# Input Otp

**Selector:** `ui-lib-input-otp`
**Entry point:** `import { InputOtp } from 'ui-lib-custom/input-otp'`

---

## Overview

InputOtp component — renders N individual input cells for one-time password entry. Supports CVA (ngModel / reactive forms), keyboard navigation, paste, mask, and integer-only modes.

## API

### Inputs

| Name                      | Type                                          | Default                          | Description                                                                 |
| ------------------------- | --------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `ariaLabel`               | `string | null`                               | `null`                           | Accessible name for the OTP group container.                                |
| `ariaLabelledBy`          | `string | null`                               | `null`                           | Optional external label element id for the OTP group container.             |
| `digitAriaLabelConnector` | `string`                                      | `''`                             | Connector text for cell position labels, used for i18n customization.       |
| `digitAriaLabelPrefix`    | `string`                                      | `''`                             | Prefix for cell position labels, used for i18n customization.               |
| `disabled`                | `boolean`                                     | `INPUT_OTP_DEFAULTS.disabled`    | Disables all input cells.                                                   |
| `filled`                  | `boolean`                                     | `INPUT_OTP_DEFAULTS.filled`      | Applies filled background appearance to each cell.                          |
| `id`                      | `string | null`                               | `null`                           | Optional explicit id for the OTP group container.                           |
| `integerOnly`             | `boolean`                                     | `INPUT_OTP_DEFAULTS.integerOnly` | When true, only digit characters (0-9) are accepted.                        |
| `invalid`                 | `boolean`                                     | `INPUT_OTP_DEFAULTS.invalid`     | Applies invalid (error) styling to all cells.                               |
| `length`                  | `number`                                      | `INPUT_OTP_DEFAULTS.length`      | Number of OTP input cells to render.                                        |
| `mask`                    | `boolean`                                     | `INPUT_OTP_DEFAULTS.mask`        | When true, each cell renders as a password field (dots).                    |
| `pasteAnnouncement`       | `string`                                      | `''`                             | Text announced in live region after a successful paste.                     |
| `readonly`                | `boolean`                                     | `INPUT_OTP_DEFAULTS.readonly`    | Makes all input cells read-only.                                            |
| `size`                    | `InputOtpSize`                                | `INPUT_OTP_DEFAULTS.size`        | Size variant: 'sm' | 'md' | 'lg'.                                           |
| `styleClass`              | `string | undefined`                          | `undefined`                      | Extra CSS class applied to each cell input element.                         |
| `tabindex`                | `number | null`                               | `null`                           | Tab index forwarded to each cell input.                                     |
| `variant`                 | `'material' | 'bootstrap' | 'minimal' | null` | `null`                           | Design variant override. When null the active global theme variant is used. |

### Outputs

| Name        | Type                  | Description                                             |
| ----------- | --------------------- | ------------------------------------------------------- |
| `blurred`   | `FocusEvent`          | Emitted when any cell loses focus.                      |
| `changed`   | `InputOtpChangeEvent` | Emitted whenever the OTP value changes.                 |
| `completed` | `string`              | Emitted when all cells are filled (OTP entry complete). |
| `focused`   | `FocusEvent`          | Emitted when any cell receives focus.                   |

## Content Projection

| Selector          | Notes |
| ----------------- | ----- |
| `[inputOtpError]` | —     |

## Theming

| CSS Variable                             | Default                                                                                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-input-otp-bg`                   | `var(--uilib-surface, transparent)`                                                                                                                                     |
| `--uilib-input-otp-border-color`         | `var(--uilib-border, currentColor)`                                                                                                                                     |
| `--uilib-input-otp-border-radius`        | `var(--uilib-radius-md, 0.5rem)`                                                                                                                                        |
| `--uilib-input-otp-cell-height`          | `2.5rem`                                                                                                                                                                |
| `--uilib-input-otp-cell-width`           | `2.5rem`                                                                                                                                                                |
| `--uilib-input-otp-disabled-opacity`     | `0.6`                                                                                                                                                                   |
| `--uilib-input-otp-filled-bg`            | `color-mix( in srgb, var(--uilib-input-otp-bg) 84%, var(--uilib-color-neutral-900, currentColor) 4% )`                                                                  |
| `--uilib-input-otp-focus-border-color`   | `var(--uilib-color-primary-600, currentColor)`                                                                                                                          |
| `--uilib-input-otp-focus-ring`           | `0 0 0 0.1875rem color-mix(in srgb, var(--uilib-input-otp-focus-border-color) 28%, transparent)`                                                                        |
| `--uilib-input-otp-font-size`            | `var(--uilib-font-size-base, 1rem)`                                                                                                                                     |
| `--uilib-input-otp-font-weight`          | `500`                                                                                                                                                                   |
| `--uilib-input-otp-gap`                  | `var(--uilib-space-2, 0.5rem)`                                                                                                                                          |
| `--uilib-input-otp-invalid-border-color` | `var(--uilib-color-danger-600, currentColor)`                                                                                                                           |
| `--uilib-input-otp-placeholder-color`    | `var(--uilib-muted, currentColor)`                                                                                                                                      |
| `--uilib-input-otp-text-color`           | `var(--uilib-page-fg, currentColor)`                                                                                                                                    |
| `--uilib-input-otp-transition`           | `border-color var(--uilib-transition-fast, 150ms ease), box-shadow var(--uilib-transition-fast, 150ms ease), background-color var(--uilib-transition-fast, 150ms ease)` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                              |
| ----------------------------------------------------------------------------- |
| does not set aria-invalid by default                                          |
| each cell has position-aware aria-label                                       |
| focus advances to next cell on valid input                                    |
| focus retreats to previous cell on Backspace from empty cell                  |
| host has default aria-label                                                   |
| host uses aria-labelledby and clears aria-label when configured               |
| host uses role=                                                               |
| marks each cell aria-invalid when invalid is true                             |
| passes axe in default state                                                   |
| passes axe in filled state                                                    |
| passes axe in invalid state                                                   |
| paste fills all cells and focuses the last filled cell                        |
| paste updates polite live region announcement                                 |
| removes aria-describedby when invalid state is cleared                        |
| renders error content with role=                                              |
| should apply aria-label to host by default                                    |
| should call focusCell(index+1) on ArrowRight                                  |
| should call focusCell(index-1) on ArrowLeft                                   |
| should clear host aria-describedby when invalid=false                         |
| should clear prev cell and move back on Backspace when current cell is empty  |
| should connect host aria-describedby to alert error element when invalid=true |
| should emit focused event on cell focus                                       |
| should focus last cell after filling all cells from paste                     |
| should generate a stable host id                                              |
| should move focus to next cell when valid input is entered                    |
| should move focus to previous cell on Backspace when current cell is empty    |
| should prevent default on ArrowUp and ArrowDown                               |
| should set aria-invalid on every cell when invalid=true                       |
| should set aria-label on each cell                                            |
| should set role=                                                              |
| should update the live paste announcement text after paste                    |
| should use aria-labelledby and omit aria-label when ariaLabelledBy is set     |
| supports custom group aria-label input                                        |
| uses configured paste announcement text                                       |

## Usage Examples

```html
<!-- 6-digit numeric OTP -->
<uilib-input-otp [length]="6" [integerOnly]="true" [(ngModel)]="otpValue" />

<!-- masked OTP with completion handler -->
<uilib-input-otp [length]="4" [mask]="true" (completed)="onComplete($event)" />

<!-- invalid state + projected error content -->
<uilib-input-otp [invalid]="otpInvalid" ariaLabel="Verification code" [(ngModel)]="otpValue">
  <span inputOtpError>Please enter the 6-digit code.</span>
</uilib-input-otp>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#input-otp)
- [Demo page](/components/input-otp)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/input-otp/README.md)

