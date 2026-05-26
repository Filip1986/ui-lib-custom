# Color Picker

**Selector:** `ui-lib-color-picker`
**Entry point:** `import { ColorPicker } from 'ui-lib-custom/color-picker'`
**APG pattern:** [Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) (popup mode)

> The `value` input is a plain `input()` (not `model()`), so two-way binding requires CVA
> (`[(ngModel)]` / reactive forms) rather than `[(value)]`.

---

## Overview

The ColorPicker presents a floating popup (or inline panel) containing a 2-D saturation/brightness
canvas, a hue slider, and Hex / H / S / B text inputs. It implements `ControlValueAccessor` so it
integrates directly with Angular forms.

---

## API

### Inputs

| Name        | Type                                  | Default       | Description |
|-------------|---------------------------------------|---------------|-------------|
| `value`     | `ColorPickerValue`                    | `null`        | Bound color value — hex string, `RgbColor`, or `HsbColor` depending on `format`. |
| `format`    | `'hex' \| 'rgb' \| 'hsb'`            | `'hex'`       | Output format for emitted color values. `'hex'` → 6-char string; `'rgb'` → `RgbColor`; `'hsb'` → `HsbColor`. |
| `inline`    | `boolean`                             | `false`       | When `true`, renders the panel at its natural DOM position rather than as a floating popup. |
| `variant`   | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Design variant override. Falls back to `ThemeConfigService.variant()` when `null`. |
| `disabled`  | `boolean`                             | `false`       | Disables all interaction and pointer/drag handling. Synced with CVA `setDisabledState`. |
| `inputId`   | `string`                              | auto-generated | Custom `id` for the hidden `<input>` element. An auto-generated id is used when empty. |
| `tabindex`  | `number`                              | `0`           | `tabindex` of the trigger swatch button. |
| `appendTo`  | `string \| HTMLElement \| undefined`  | `'body'`      | Where to mount the floating popup panel — CSS selector, `HTMLElement`, or `'body'`. |

### Outputs

| Name          | Payload                  | Description |
|---------------|--------------------------|-------------|
| `colorChange` | `ColorPickerChangeEvent` | Emitted on every color change — pointer drag, keyboard navigation on the hue slider or canvas, or text-input blur. Carries `originalEvent` and the formatted `value`. |
| `show`        | `void`                   | Emitted when the popup panel opens. Not emitted in inline mode. |
| `hide`        | `void`                   | Emitted when the popup panel closes. Not emitted in inline mode. |

### Types

```typescript
type ColorFormat = 'hex' | 'rgb' | 'hsb';
type ColorPickerVariant = 'material' | 'bootstrap' | 'minimal';
type ColorPickerValue = string | RgbColor | HsbColor | null;

interface RgbColor { r: number; g: number; b: number; }
interface HsbColor { h: number; s: number; b: number; }
interface ColorPickerChangeEvent { originalEvent: Event; value: ColorPickerValue; }
```

### Content Projection

None — the color picker has no template slots.

---

## Keyboard Interactions

| Key | Context | Action |
|-----|---------|--------|
| `Tab` / `Shift+Tab` | Any | Cycles focus: trigger → panel → hue slider → Hex / H / S / B inputs |
| `Enter` / `Space` | Trigger focused | Opens the popup panel |
| `Enter` / `Space` | Panel focused | Confirms current color and closes the popup |
| `Escape` | Panel open | Closes the popup and returns focus to the trigger button |
| `↑` / `↓` | Hue slider focused | Increases / decreases hue by 1° (+`Shift` for 10° jumps) |
| `←` / `→` | Hue slider focused | Same as `↑` / `↓` |
| `←` / `→` | Color canvas focused | Increases / decreases saturation (+`Shift` for 10 steps) |
| `↑` / `↓` | Color canvas focused | Increases / decreases brightness (+`Shift` for 10 steps) |

> The color canvas is marked `aria-hidden="true"`. Screen-reader users navigate the color via the
> Hex and H/S/B number inputs at the bottom of the panel.

---

## ARIA Wiring

| Element | Attribute | Value | Notes |
|---------|-----------|-------|-------|
| Trigger button | `role` | (implicit `button`) | Swatch button that opens the popup |
| Trigger button | `aria-label` | `"Color: #RRGGBB, click to open picker"` | Announces current color and purpose |
| Trigger button | `aria-haspopup` | `"dialog"` | Signals that activation opens a dialog |
| Trigger button | `aria-expanded` | `"true"` / `"false"` | Reflects open/closed state of the panel |
| Trigger button | `aria-controls` | panel id | Links trigger to panel when panel is open |
| Panel | `role` | `"dialog"` | Popup panel is a dialog |
| Panel | `aria-label` | `"Color picker"` | Names the dialog for screen readers |
| Panel | `aria-modal` | `"false"` | Panel does not trap focus |
| Hue slider | `role` | `"slider"` | Hue strip is an accessible range slider |
| Hue slider | `aria-label` | `"Hue"` | Names the slider |
| Hue slider | `aria-valuemin` | `"0"` | Minimum hue |
| Hue slider | `aria-valuemax` | `"359"` | Maximum hue |
| Hue slider | `aria-valuenow` | current hue (0–359) | Live-updated as hue changes |
| Hue slider | `aria-valuetext` | `"N degrees"` | Human-readable hue description |
| Color canvas | `aria-hidden` | `"true"` | Hidden from assistive technology; keyboard access via text inputs |
| Text inputs | `<label for>` | linked to each input id | Hex / H / S / B labels are properly associated |

---

## CSS Custom Properties

```scss
--uilib-colorpicker-trigger-width         // Swatch button width (default: 2rem)
--uilib-colorpicker-trigger-height        // Swatch button height (default: 2rem)
--uilib-colorpicker-trigger-border-radius // Swatch button border radius
--uilib-colorpicker-trigger-border-color  // Swatch button border color
--uilib-colorpicker-panel-width           // Panel width (default: 196px)
--uilib-colorpicker-panel-padding         // Panel inner padding
--uilib-colorpicker-panel-bg              // Panel background color
--uilib-colorpicker-panel-border-color    // Panel border color
--uilib-colorpicker-panel-border-radius   // Panel corner radius
--uilib-colorpicker-panel-shadow          // Panel box-shadow
--uilib-colorpicker-panel-z-index         // Panel stacking context
--uilib-colorpicker-hue-slider-width      // Width of the hue strip
--uilib-colorpicker-hue-slider-height     // Height of the hue strip
--uilib-colorpicker-selector-size         // Diameter of the color-canvas crosshair
--uilib-colorpicker-transition-duration   // Animation duration (defaults to --uilib-transition-duration-fast)
--uilib-colorpicker-focus-ring-color      // Focus-ring color across all focusable elements
--uilib-colorpicker-focus-ring-width      // Focus-ring width (Bootstrap variant overrides to 4px)
--uilib-colorpicker-label-font-size       // Font size of Hex/H/S/B labels and inputs
```

---

## Usage Examples

```html
<!-- Popup picker bound via ngModel (hex output) -->
<ui-lib-color-picker format="hex" [(ngModel)]="selectedColor" />

<!-- Inline picker with RGB output -->
<ui-lib-color-picker [inline]="true" format="rgb" [(ngModel)]="selectedColor" />

<!-- Reactive form -->
<ui-lib-color-picker formControlName="brandColor" format="hex" />

<!-- Append to specific container -->
<ui-lib-color-picker appendTo=".my-scroll-container" [(ngModel)]="color" />
```

---

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#color-picker)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [A11y session script](../a11y-sessions/color-picker.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/color-picker/README.md)
