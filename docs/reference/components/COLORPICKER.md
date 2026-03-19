# ColorPicker Component

## Overview

`ColorPicker` provides visual color selection using a saturation/brightness panel and hue slider.
It supports popup and inline display modes, `hex`/`rgb`/`hsb` formats, and Angular forms via `ControlValueAccessor`.

**Import**

```typescript
import { ColorPicker } from 'ui-lib-custom';
```

**Selector:** `ui-lib-color-picker`

**Location:** `projects/ui-lib-custom/src/lib/color-picker/color-picker.ts`

---

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `ColorPickerValue` | `null` | Current value model (`hex` string, `RgbColor`, `HsbColor`, or `null`). |
| `format` | `'hex' \| 'rgb' \| 'hsb'` | `'hex'` | Output format emitted through CVA and `onChange`. |
| `inline` | `boolean` | `false` | When `true`, panel is always visible and trigger swatch is hidden. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant. Falls back to `ThemeConfigService.variant()` when `null`. |
| `disabled` | `boolean` | `false` | Disables pointer and keyboard interaction. |
| `inputId` | `string` | `''` | Hidden input id used for form/label integration. |
| `tabindex` | `number` | `0` | Trigger tab order in popup mode. |
| `appendTo` | `string \| HTMLElement` | `'body'` | Reserved API for future portal mounting. |

---

## Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `onChange` | `ColorPickerChangeEvent` | Emitted whenever color value changes from pointer/keyboard interaction. |
| `onShow` | `void` | Emitted when popup panel opens. |
| `onHide` | `void` | Emitted when popup panel closes. |

### Output Types

```typescript
export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HsbColor {
  h: number;
  s: number;
  b: number;
}

export type ColorPickerValue = string | RgbColor | HsbColor | null;

export interface ColorPickerChangeEvent {
  originalEvent: Event;
  value: ColorPickerValue;
}
```

---

## CSS Variable Tokens

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-colorpicker-trigger-width` | `2rem` | Trigger swatch width. |
| `--uilib-colorpicker-trigger-height` | `2rem` | Trigger swatch height. |
| `--uilib-colorpicker-trigger-border-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 4px))` | Trigger border radius. |
| `--uilib-colorpicker-trigger-border-color` | `var(--uilib-input-border, var(--uilib-border, #d1d5db))` | Trigger border color. |
| `--uilib-colorpicker-panel-width` | `196px` | Panel width. |
| `--uilib-colorpicker-panel-padding` | `0.75rem` | Panel padding. |
| `--uilib-colorpicker-panel-bg` | `var(--uilib-surface, #fff)` | Panel background. |
| `--uilib-colorpicker-panel-border-color` | `var(--uilib-border, #e5e7eb)` | Panel border color. |
| `--uilib-colorpicker-panel-border-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 6px))` | Panel border radius. |
| `--uilib-colorpicker-panel-shadow` | `0 4px 12px rgb(0 0 0 / 15%)` | Panel elevation shadow. |
| `--uilib-colorpicker-hue-slider-width` | `18px` | Hue slider width. |
| `--uilib-colorpicker-hue-slider-height` | `11rem` | Hue slider height. |
| `--uilib-colorpicker-selector-size` | `12px` | Saturation/brightness selector size. |
| `--uilib-colorpicker-transition-duration` | `200ms` | Trigger/panel transition duration. |

---

## Usage Examples

### Popup (default)

```html
<ui-lib-color-picker [(ngModel)]="hexColor" format="hex" />
<p>HEX #{{ hexColor }}</p>
```

### Inline mode

```html
<ui-lib-color-picker [inline]="true" [(ngModel)]="inlineColor" />
```

### RGB and HSB formats

```html
<ui-lib-color-picker format="rgb" [(ngModel)]="rgbColor" />
<ui-lib-color-picker format="hsb" [(ngModel)]="hsbColor" />
```

```text
const rgbColor: { r: number; g: number; b: number } = { r: 100, g: 102, b: 241 };
const hsbColor: { h: number; s: number; b: number } = { h: 239, s: 59, b: 95 };
```

### Reactive forms

```html
<form [formGroup]="form">
  <ui-lib-color-picker formControlName="accent" format="hex" />
</form>
```

```typescript
form = new FormGroup({
  accent: new FormControl<string | null>('6466f1'),
});
```

### Disabled

```html
<ui-lib-color-picker [disabled]="true" [(ngModel)]="disabledColor" />
```

---

## Accessibility

### Keyboard Support

| Context | Key | Behavior |
| --- | --- | --- |
| Trigger (popup) | `Enter`, `Space` | Opens popup panel |
| Panel | `Escape` | Closes popup panel and returns focus to trigger |
| Color area | `Arrow` keys | Adjusts saturation/brightness |
| Hue slider | `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` | Adjusts hue |

### ARIA and Current Limitations

- Host reflects `aria-disabled` when disabled.
- Trigger exposes expanded state and panel linkage in popup mode.
- Color area and hue slider use descriptive `aria-label` text.
- Current implementation does not expose full slider `aria-valuenow` metadata for the 2D panel/hue handle; this should be expanded in a future accessibility pass.

