# Color Picker

**Selector:** `ui-lib-color-picker`
**Entry point:** `import { ColorPicker } from 'ui-lib-custom/color-picker'`

---

## Overview

The `value` input is a plain `input()` (not `model()`), so two-way binding requires CVA (`ngModel` / reactive forms) rather than `[(value)]`.

## API

### Inputs

| Name       | Type                        | Default                          | Description |
| ---------- | --------------------------- | -------------------------------- | ----------- |
| `appendTo` | `ColorPickerAppendTo`       | `COLOR_PICKER_DEFAULTS.AppendTo` | —           |
| `disabled` | `boolean`                   | `COLOR_PICKER_DEFAULTS.Disabled` | —           |
| `format`   | `ColorFormat`               | `COLOR_PICKER_DEFAULTS.Format`   | —           |
| `inline`   | `boolean`                   | `COLOR_PICKER_DEFAULTS.Inline`   | —           |
| `inputId`  | `string`                    | `COLOR_PICKER_DEFAULTS.InputId`  | —           |
| `tabindex` | `number`                    | `COLOR_PICKER_DEFAULTS.TabIndex` | —           |
| `value`    | `ColorPickerValue`          | `null`                           | —           |
| `variant`  | `ColorPickerVariant | null` | `null`                           | —           |

### Outputs

| Name          | Type                     | Description |
| ------------- | ------------------------ | ----------- |
| `colorChange` | `ColorPickerChangeEvent` | —           |
| `hide`        | `void`                   | —           |
| `show`        | `void`                   | —           |

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

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
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/color-picker/README.md)

