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

## Keyboard Access

The 2D saturation/brightness canvas area is marked `aria-hidden="true"` and is not in the keyboard tab order. Full keyboard access is provided through the numeric and text inputs at the bottom of the panel:

| Input | Label | Range | Action |
|-------|-------|-------|--------|
| Hex | `Hex` | 6-char hex | Type a hex value (e.g. `ff0000`) and press Enter or blur |
| Hue | `H` | 0 – 359 | Type or use arrow keys on the number input |
| Saturation | `S` | 0 – 100 | Type or use arrow keys on the number input |
| Brightness | `B` | 0 – 100 | Type or use arrow keys on the number input |

The hue slider div also supports arrow keys when focused directly (keyboard accelerator: +Shift for 10-step jumps).

**Escape** closes the popup panel and returns focus to the trigger button.

## Supported Formats

| Format | Output type | Example |
|--------|-------------|---------|
| `'hex'` | `string` (6-char, no `#`) | `'ff0000'` |
| `'rgb'` | `{ r, g, b }` | `{ r: 255, g: 0, b: 0 }` |
| `'hsb'` | `{ h, s, b }` | `{ h: 0, s: 100, b: 100 }` |

## Usage

```html
<!-- popup color picker bound via ngModel -->
<ui-lib-color-picker format="hex" [(ngModel)]="selectedColor" />

<!-- inline picker -->
<ui-lib-color-picker [inline]="true" format="rgb" [(ngModel)]="selectedColor" />
```

