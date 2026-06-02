# Color Picker

**Selector:** `ui-lib-color-picker`
**Entry point:** `import { ColorPicker } from 'ui-lib-custom/color-picker'`

---

## Overview

The `value` input is a plain `input()` (not `model()`), so two-way binding requires CVA (`[(ngModel)]` / reactive forms) rather than `[(value)]`.

## API

### Inputs

| Name       | Type                  | Default                          | Description                                                                                                                                                         |
| ---------- | --------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `appendTo` | `ColorPickerAppendTo` | `COLOR_PICKER_DEFAULTS.AppendTo` | Where to mount the floating popup panel. `'body'`, a CSS selector string, or an `HTMLElement`. Default: `'body'`.                                                   |
| `disabled` | `boolean`             | `COLOR_PICKER_DEFAULTS.Disabled` | Disables all interaction and drag handling. Synced with CVA `setDisabledState`. Default: `false`.                                                                   |
| `format`   | `ColorFormat`         | `COLOR_PICKER_DEFAULTS.Format`   | Output format for emitted color values. `'hex'` → 6-char string; `'rgb'` → `RgbColor`; `'hsb'` → `HsbColor`. Default: `'hex'`.                                      |
| `inline`   | `boolean`             | `COLOR_PICKER_DEFAULTS.Inline`   | When `true`, renders the picker panel inline at its natural DOM position instead of as a floating popup. Default: `false`.                                          |
| `inputId`  | `string`              | `COLOR_PICKER_DEFAULTS.InputId`  | Custom `id` for the hidden `<input>` element used by form frameworks. An auto-generated id is used when this is empty.                                              |
| `tabindex` | `number`              | `COLOR_PICKER_DEFAULTS.TabIndex` | `tabindex` of the trigger swatch button. Default: `0`.                                                                                                              |
| `value`    | `ColorPickerValue`    | `null`                           | Bound color value. Accepts a hex string, `RgbColor`, or `HsbColor` object depending on `format`. Does not use `model()` — bind via `[(ngModel)]` or reactive forms. |
| `variant`  | `ColorPickerVariant   | null`                            | `null`                                                                                                                                                              | Design variant override. Falls back to `ThemeConfigService.variant()` when `null`. |

### Outputs

| Name          | Type                     | Description                                                                                                                                                  |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `colorChange` | `ColorPickerChangeEvent` | Emitted on every color change — pointer drag, keyboard, or text-input blur. Payload carries `originalEvent` and the formatted `value` according to `format`. |
| `hide`        | `void`                   | Emitted when the popup panel closes. Not emitted in inline mode.                                                                                             |
| `show`        | `void`                   | Emitted when the popup panel opens. Not emitted in inline mode.                                                                                              |

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                        |
| ------------------------------------------------------- |
| Escape key closes the picker panel                      |
| applies variant class names                             |
| blocks keyboard interaction when disabled               |
| closes on Escape key and returns focus to trigger       |
| color area has aria-hidden=                             |
| color area has tabindex=                                |
| focus returns to trigger after Escape closes the picker |
| hue slider has aria-label=                              |
| hue slider has aria-valuemax=                           |
| hue slider has aria-valuemin=                           |
| hue slider has aria-valuenow reflecting current hue     |
| hue slider has aria-valuetext in degrees                |
| hue slider has role=                                    |
| inline mode passes axe                                  |
| inline panel has aria-modal=                            |
| inline panel has role=                                  |
| opens panel with Space/Enter on trigger                 |
| panel has aria-label=                                   |
| panel has aria-modal=                                   |
| panel has role=                                         |
| popup closed state passes axe                           |
| popup open state passes axe                             |
| trigger aria-label includes current color value         |
| trigger has aria-expanded=                              |
| trigger has aria-haspopup=                              |
| trigger is tabbable                                     |
| updates hue with arrow keys on hue slider               |
| updates saturation/brightness with arrows on color area |

## Usage Examples

```html
<!-- popup color picker bound via ngModel -->
<ui-lib-color-picker format="hex" [(ngModel)]="selectedColor" />

<!-- inline picker -->
<ui-lib-color-picker [inline]="true" format="rgb" [(ngModel)]="selectedColor" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#color-picker)
- [Demo page](/components/color-picker)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/color-picker/README.md)
