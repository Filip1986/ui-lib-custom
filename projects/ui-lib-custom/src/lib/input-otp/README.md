# InputOtp

**Selector:** `uilib-input-otp`
**Package:** `ui-lib-custom/input-otp`
**Content projection:** no — none

> Unlike PrimeNG's InputOtp, outputs use plain camelCase names (`changed`, `focused`, `blurred`, `completed`) instead of `onChange`, `onFocus`, etc. The `completed` output fires only when every cell is filled — use it rather than watching `ngModel` for the "submit" moment.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `length` | `number` | `4` | Number of individual OTP cells to render |
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
```
