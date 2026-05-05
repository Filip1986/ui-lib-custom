# RadioButton

**Selector:** `ui-lib-radio-button`
**Package:** `ui-lib-custom/radio-button`
**Content projection:** yes — alternative to the `label` input

> Radio buttons in a group must share the same `name` attribute. The component implements `ControlValueAccessor` — bind the shared group value via `ngModel` or a reactive `FormControl` on each radio; the one whose `value` matches becomes checked automatically.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string \| null` | `null` | Visible label text; projected content is an alternative |
| `inputId` | `string \| null` | `null` | Forwarded to the native `<input>` id |
| `name` | `string \| null` | `null` | Must be identical across all buttons in a group |
| `value` | `unknown` | `null` | The value this radio button represents in the group |
| `required` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | |
| `tabindex` | `number` | `0` | |
| `autofocus` | `boolean` | `false` | |
| `ariaLabel` | `string \| null` | `null` | Used when no visible label is provided |
| `ariaLabelledby` | `string \| null` | `null` | Explicit override; takes precedence over the auto-generated label id |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `RadioButtonChangeEvent` | `{ value: unknown, originalEvent: Event }` — fires only when this button is selected |
| `focus` | `FocusEvent` | |
| `blur` | `FocusEvent` | |

## Usage

```html
<!-- group bound via ngModel -->
<ui-lib-radio-button name="size" label="Small" [value]="'sm'" [(ngModel)]="selectedSize" />
<ui-lib-radio-button name="size" label="Medium" [value]="'md'" [(ngModel)]="selectedSize" />
<ui-lib-radio-button name="size" label="Large" [value]="'lg'" [(ngModel)]="selectedSize" />
```
