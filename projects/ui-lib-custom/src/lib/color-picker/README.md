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
| `ariaLabel` | `string \| null` | `null` | Overrides the trigger button's default i18n `aria-label`. Ignored when `ariaLabelledBy` is set. |
| `ariaLabelledBy` | `string \| null` | `null` | `id` of an external element that labels the trigger button. When set, `aria-labelledby` is applied and `aria-label` is omitted. |

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

## Theming

All visual properties are exposed as CSS custom properties on the host element:

```css
ui-lib-color-picker {
  --uilib-colorpicker-trigger-width: 2.5rem;
  --uilib-colorpicker-panel-width: 220px;
}
```

| Token | Default | Description |
|-------|---------|-------------|
| `--uilib-colorpicker-trigger-width` | `2rem` | Width of the swatch trigger button |
| `--uilib-colorpicker-trigger-height` | `2rem` | Height of the swatch trigger button |
| `--uilib-colorpicker-panel-width` | `196px` | Width of the color picker panel |
| `--uilib-colorpicker-panel-padding` | `0.75rem` | Inner padding of the panel |
| `--uilib-colorpicker-panel-shadow` | `0 4px 12px rgb(0 0 0 / 15%)` | Box shadow of the panel |
| `--uilib-colorpicker-panel-z-index` | `1000` | Z-index of the popup panel |
| `--uilib-colorpicker-hue-slider-width` | `18px` | Width of the hue slider track |
| `--uilib-colorpicker-hue-slider-height` | `11rem` | Height of the hue slider track |
| `--uilib-colorpicker-selector-size` | `12px` | Size of the color canvas drag handle |
| `--uilib-colorpicker-focus-ring-width` | `3px` | Width of the keyboard focus ring |
| `--uilib-colorpicker-label-font-size` | `0.6875rem` | Font size of the channel input labels |

## Internationalisation

All ARIA labels are provided through `UiLibI18nService` (entry point `ui-lib-custom/i18n`). Override individual strings by injecting the service and calling `extend()`, or swap the whole bundle with `setBundle()`:

```ts
import { inject } from '@angular/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';

inject(UiLibI18nService).extend({ 'colorpicker.panel': 'Colour picker' });
```

See the [Internationalisation Guide](../../../../../docs/guides/I18N_GUIDE.md) for the full key catalogue and recipes.

| String | Locale key | Default (en) |
|--------|-----------|--------------|
| Trigger button ARIA label | `colorpicker.trigger` | `Color: {color}, click to open picker` |
| Toggle button ARIA label | `colorpicker.toggle` | `Open color picker` |
| Panel ARIA label | `colorpicker.panel` | `Color picker` |
| Hue slider ARIA label | `colorpicker.hue` | `Hue slider` |
| Hex input ARIA label | `colorpicker.hex.input` | `Hex color value` |
| Red channel input ARIA label | `colorpicker.red.input` | `Red channel` |
| Green channel input ARIA label | `colorpicker.green.input` | `Green channel` |
| Blue channel input ARIA label | `colorpicker.blue.input` | `Blue channel` |
| Alpha channel input ARIA label | `colorpicker.alpha.input` | `Alpha channel` |
| Hex label text | `colorpicker.label.hex` | `Hex` |
| Hue channel label text | `colorpicker.label.h` | `H` |
| Saturation channel label text | `colorpicker.label.s` | `S` |
| Brightness channel label text | `colorpicker.label.b` | `B` |

APG pattern: [Color Picker (custom widget)](https://www.w3.org/WAI/ARIA/apg/)
