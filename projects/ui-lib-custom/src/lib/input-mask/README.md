# InputMask

**Selector:** `uilib-input-mask`
**Package:** `ui-lib-custom/input-mask`
**Content projection:** no — renders its own `<input>` inline (no `templateUrl`; template is inline in the component decorator)

> The component uses an inline `template` string, not a separate `.html` file — this is a pre-existing exception to the project convention. The output names (`completed`, `focused`, `blurred`, `inputChanged`, `cleared`) differ from PrimeNG's `onComplete`, `onFocus`, `onBlur` conventions.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `mask` | `string` | `''` | Mask pattern string (e.g. `'99/99/9999'`, `'(999) 999-9999'`) |
| `slotChar` | `string` | `'_'` | Placeholder character for unfilled mask slots |
| `autoClear` | `boolean` | `true` | Clear the value if input is incomplete on blur |
| `keepBuffer` | `boolean` | `false` | Keep partial mask characters in the model value |
| `unmask` | `boolean` | `false` | Emit raw value without mask characters |
| `showClear` | `boolean` | `false` | Show a clear icon when the field has a value |
| `type` | `string` | `'text'` | Native input type |
| `characterPattern` | `string` | `'[A-Za-z]'` | Regex pattern used for the `a` mask slot |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `filled` | `boolean` | `false` | Filled background appearance |
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Make the input read-only |
| `placeholder` | `string \| undefined` | `undefined` | Input placeholder text |
| `autocomplete` | `string \| undefined` | `undefined` | Native autocomplete attribute |
| `name` | `string \| undefined` | `undefined` | Native name attribute |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `invalid` | `boolean` | `false` | Apply error styling |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `completed` | `InputMaskCompleteEvent` | All mask slots are filled |
| `focused` | `Event` | Input focused |
| `blurred` | `Event` | Input blurred |
| `inputChanged` | `Event` | Value changed while typing |
| `cleared` | `void` | Clear button clicked |

## Usage

```html
<!-- phone number mask -->
<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="phone" />

<!-- date mask, emitting unmasked value -->
<uilib-input-mask mask="99/99/9999" [unmask]="true" [(ngModel)]="rawDate" />
```
