# ColorPicker

**Selector:** `ui-lib-color-picker`
**Package:** `ui-lib-custom/color-picker`
**Content projection:** none

> The `value` input is a plain `input()` (not `model()`), so two-way binding requires CVA (`[(ngModel)]` / reactive forms) rather than `[(value)]`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `ColorPickerValue` | `null` | Bound color value — hex string, `RgbColor`, or `HsbColor` depending on `format` |
| `format` | `'hex' \| 'rgb' \| 'hsb'` | `'hex'` | Output format for emitted values |
| `inline` | `boolean` | `false` | Renders the picker inline at its DOM position instead of as a popup |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to `ThemeConfigService.variant()` |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `inputId` | `string` | auto-generated | Custom `id` for the hidden `<input>` element |
| `tabindex` | `number` | `0` | `tabindex` of the trigger swatch button |
| `appendTo` | `string \| HTMLElement \| undefined` | `'body'` | Where to mount the popup panel — CSS selector, `HTMLElement`, or `'body'` |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `colorChange` | `ColorPickerChangeEvent` | Emitted on every color change (drag, keyboard, or text-input) |
| `show` | `void` | Popup panel opened (not emitted in inline mode) |
| `hide` | `void` | Popup panel closed (not emitted in inline mode) |

## Keyboard Access

| Key | Context | Action |
|-----|---------|--------|
| `Tab` / `Shift+Tab` | Any | Moves focus through trigger → panel → hue slider → Hex / H / S / B inputs |
| `Enter` / `Space` | Trigger | Opens the popup panel |
| `Enter` / `Space` | Panel | Confirms current color and closes the popup |
| `Escape` | Panel open | Closes the popup and returns focus to the trigger |
| `↑` / `↓` | Hue slider focused | Increases / decreases hue by 1° (+`Shift` for 10°) |
| `←` / `→` | Hue slider focused | Same as `↑` / `↓` |
| `←` / `→` | Color canvas focused | Increases / decreases saturation (+`Shift` for 10 steps) |
| `↑` / `↓` | Color canvas focused | Increases / decreases brightness (+`Shift` for 10 steps) |

> The color canvas is marked `aria-hidden="true"`. Screen-reader users navigate via the Hex and H/S/B number inputs in the panel.

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

