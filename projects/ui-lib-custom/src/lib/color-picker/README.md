# ColorPicker

**Selector:** `ui-lib-color-picker`
**Package:** `ui-lib-custom/color-picker`
**Content projection:** no — none

> The `onChange` output conflicts with Angular's CVA naming convention and is suppressed with an ESLint comment — listen to it as `(onChange)="..."`. The `value` input is a plain `input()` (not `model()`), so two-way binding requires CVA (`ngModel` / reactive forms) rather than `[(value)]`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `string \| null` | `null` | Initial color value (hex, rgb, or hsb string depending on `format`) |
| `format` | `'hex' \| 'rgb' \| 'hsb'` | `'hex'` | Output format for emitted values |
| `inline` | `boolean` | `false` | Render the picker inline instead of as a popup |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to ThemeConfigService |
| `disabled` | `boolean` | `false` | Disable the component |
| `inputId` | `string` | auto-generated | Custom `id` for the hidden input element |
| `tabindex` | `number` | `0` | Tab index of the trigger button |
| `appendTo` | `string \| HTMLElement \| null` | `'body'` | Where to mount the popup panel |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onChange` | `ColorPickerChangeEvent` | Emitted on every color change (drag or keyboard) |
| `onShow` | `void` | Popup panel opened |
| `onHide` | `void` | Popup panel closed |

## Usage

```html
<!-- popup color picker bound via ngModel -->
<ui-lib-color-picker format="hex" [(ngModel)]="selectedColor" />

<!-- inline picker -->
<ui-lib-color-picker [inline]="true" format="rgb" [(ngModel)]="selectedColor" />
```
