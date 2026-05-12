# InputOtp

**Selector:** `uilib-input-otp`
**Package:** `ui-lib-custom/input-otp`
**Content projection:** yes — `[inputOtpError]` slot for invalid-state message

> Unlike PrimeNG's InputOtp, outputs use plain camelCase names (`changed`, `focused`, `blurred`, `completed`) instead of `onChange`, `onFocus`, etc. The `completed` output fires only when every cell is filled — use it rather than watching `ngModel` for the "submit" moment.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `id` | `string \| null` | `null` | Optional id for the OTP group container |
| `length` | `number` | `4` | Number of individual OTP cells to render |
| `ariaLabel` | `string \| null` | `'One-time passcode'` | Accessible name for the OTP group (`role="group"`) |
| `ariaLabelledBy` | `string \| null` | `null` | External label element id for the OTP group; when set, `ariaLabel` is omitted |
| `digitAriaLabelPrefix` | `string` | `'Digit'` | Prefix used for per-cell labels (`Digit 1 of 6`) |
| `digitAriaLabelConnector` | `string` | `'of'` | Connector used for per-cell labels (`Digit 1 of 6`) |
| `pasteAnnouncement` | `string` | `'Code entered.'` | Polite live-region message announced after successful paste |
| `mask` | `boolean` | `false` | Render cells as password fields (dots) |
| `integerOnly` | `boolean` | `false` | Accept only digit characters (0–9) |
| `filled` | `boolean` | `false` | Filled background on each cell |
| `disabled` | `boolean` | `false` | Disable all cells |
| `readonly` | `boolean` | `false` | Make all cells read-only |
| `invalid` | `boolean` | `false` | Apply error styling to all cells |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `tabindex` | `number \| null` | `null` | Tab index forwarded to each cell input |
| `styleClass` | `string \| undefined` | `undefined` | Extra CSS class applied to each cell input |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `changed` | `InputOtpChangeEvent` | Any cell value changed |
| `focused` | `FocusEvent` | Any cell received focus |
| `blurred` | `FocusEvent` | Any cell lost focus |
| `completed` | `string` | All cells filled; payload is the full OTP string |

## Usage

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

## Accessibility Notes

- Host element exposes `role="group"` and supports both `ariaLabel` and `ariaLabelledBy`.
- Every cell has a position-aware accessible name (for example, `Digit 1 of 6`).
- When `invalid` is true, each cell gets `aria-invalid="true"` and the host `aria-describedby` points to the projected `inputOtpError` element (`role="alert"`).
- Pasting announces `pasteAnnouncement` through a polite live region.

## Paste Behavior

- Paste can be performed in any cell; values are distributed left-to-right across all OTP cells.
- When `integerOnly` is true, non-digit characters are removed during paste.
- After paste, focus moves to the next logical cell (or the last cell when fully populated), and the live region announces completion.

## `inputMode` Behavior

| `integerOnly` | Cell `inputMode` |
|---------------|------------------|
| `false`       | `text`           |
| `true`        | `numeric`        |
