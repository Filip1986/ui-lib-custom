# Slider

A linear track-based control for selecting a numeric value or range. Supports drag interaction,
click-to-jump, keyboard navigation, single and range modes, horizontal/vertical orientations,
three size tokens, three design variants, CVA (`ngModel` + reactive forms), and full
CSS-variable theming.

---

## Import

```ts
import { Slider } from 'ui-lib-custom/slider';
import type {
  SliderVariant,
  SliderSize,
  SliderOrientation,
  SliderChangeEvent,
  SliderSlideEndEvent,
} from 'ui-lib-custom/slider';
```

---

## Basic usage

```html
<ui-lib-slider [(ngModel)]="value" />
```

```ts
value: number = 40;
```

---

## Two-way model binding

```html
<!-- ngModel -->
<ui-lib-slider [(ngModel)]="value" />

<!-- model() signal via [(value)] -->
<ui-lib-slider [(value)]="value" />
```

---

## Range mode

Set `[range]="true"` to render two handles. The value becomes a `[start, end]` tuple.

```html
<ui-lib-slider [range]="true" [(ngModel)]="rangeValue" />
```

```ts
rangeValue: [number, number] = [20, 75];
```

---

## Reactive forms

```html
<form [formGroup]="form">
  <ui-lib-slider formControlName="volume" />
</form>
```

```ts
form = new FormGroup({
  volume: new FormControl<number>(60),
});
```

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| [number, number]` | `0` | Two-way model signal. Single number in single mode; `[start, end]` tuple in range mode. |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | `100` | Maximum allowed value. |
| `step` | `number` | `1` | Increment/decrement step for keyboard navigation and drag snapping. |
| `range` | `boolean` | `false` | When `true`, renders two handles and the value is a `[start, end]` tuple. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Track orientation. |
| `disabled` | `boolean` | `false` | Disables the slider entirely. |
| `readonly` | `boolean` | `false` | Makes the slider focusable but non-interactive (value does not change). |
| `animate` | `boolean` | `false` | Enables smooth CSS transitions on the fill bar and handle on value changes. |
| `tabindex` | `number` | `0` | Tab index forwarded to each handle element. Set to `-1` to exclude from tab order. |
| `ariaLabel` | `string \| null` | `null` | Accessible label forwarded to the handle `role="slider"` element(s). |
| `ariaLabelledBy` | `string \| null` | `null` | `aria-labelledby` attribute forwarded to the handle element(s). |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual design variant; falls back to `ThemeConfigService` when `null`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls track thickness and handle diameter. |
| `styleClass` | `string \| null` | `null` | Extra CSS class(es) appended to the host element. |

---

## Outputs

| Output | Payload type | Description |
|---|---|---|
| `onChange` | `SliderChangeEvent` | Emitted on every user-driven value change (drag move, click-to-jump, keyboard). |
| `onSlideEnd` | `SliderSlideEndEvent` | Emitted when the user releases a drag interaction (pointerup). |

### SliderChangeEvent

```ts
interface SliderChangeEvent {
  value: number | [number, number];
  originalEvent: Event;
}
```

### SliderSlideEndEvent

```ts
interface SliderSlideEndEvent {
  value: number | [number, number];
  originalEvent: Event;
}
```

---

## Programmatic control

### Step

```html
<!-- Snaps to 0, 25, 50, 75, 100 -->
<ui-lib-slider [step]="25" [(ngModel)]="value" />
```

### Min / Max

```html
<!-- Spans −50 to +50 in steps of 10 -->
<ui-lib-slider [min]="-50" [max]="50" [step]="10" [(ngModel)]="value" />
```

---

## Orientations

```html
<!-- Horizontal (default) -->
<ui-lib-slider [(ngModel)]="value" />

<!-- Vertical — drag upward to increase -->
<ui-lib-slider orientation="vertical" [(ngModel)]="value" />
```

The vertical slider height is controlled via `--uilib-slider-vertical-height` (default `200px`).

---

## Sizes

```html
<ui-lib-slider size="sm" [(ngModel)]="value" />
<ui-lib-slider size="md" [(ngModel)]="value" />
<ui-lib-slider size="lg" [(ngModel)]="value" />
```

| Size | Track thickness | Handle diameter |
|---|---|---|
| `sm` | `--uilib-slider-track-height-sm` (2 px) | `--uilib-slider-handle-size-sm` (14 px) |
| `md` | `--uilib-slider-track-height-md` (4 px) | `--uilib-slider-handle-size-md` (20 px) |
| `lg` | `--uilib-slider-track-height-lg` (6 px) | `--uilib-slider-handle-size-lg` (28 px) |

---

## Variants

```html
<ui-lib-slider variant="material"  [(ngModel)]="value" />
<ui-lib-slider variant="bootstrap" [(ngModel)]="value" />
<ui-lib-slider variant="minimal"   [(ngModel)]="value" />
```

| Variant | Fill colour | Handle style |
|---|---|---|
| `material` | `#6366f1` (indigo) | Round handle with drop shadow |
| `bootstrap` | `#0d6efd` (blue) | Rounded-square handle |
| `minimal` | `#111827` (dark grey) | No shadow, flat appearance |

---

## Disabled / Read-only

```html
<!-- Disabled: visually muted, pointer-events: none -->
<ui-lib-slider [disabled]="true" [(ngModel)]="value" />

<!-- Read-only: focusable, keyboard/drag ignored -->
<ui-lib-slider [readonly]="true" [(ngModel)]="value" />
```

---

## Animation

```html
<ui-lib-slider [animate]="true" [(ngModel)]="value" />
```

When `[animate]="true"`, the fill bar gain CSS transitions (`--uilib-slider-fill-transition`)
and the handle transitions its `left`/`bottom` position with a `0.15s ease`.

---

## CSS variable theming

Override any token on a parent element or the host directly:

```css
ui-lib-slider {
  --uilib-slider-fill-color: #10b981;          /* emerald fill */
  --uilib-slider-handle-border: 2px solid #10b981;
  --uilib-slider-focus-ring-color: rgba(16, 185, 129, 0.35);
  --uilib-slider-vertical-height: 300px;       /* taller vertical slider */
}
```

### Full token reference

| Token | Default | Description |
|---|---|---|
| `--uilib-slider-track-color` | `#e0e0e0` | Track background colour |
| `--uilib-slider-track-border-radius` | `2px` | Track corner radius |
| `--uilib-slider-fill-color` | `#6366f1` | Filled/active portion colour |
| `--uilib-slider-fill-transition` | `width 0.15s ease, …` | Transition applied when `[animate]="true"` |
| `--uilib-slider-handle-bg` | `#ffffff` | Handle background colour |
| `--uilib-slider-handle-border` | `2px solid #6366f1` | Handle border |
| `--uilib-slider-handle-border-radius` | `50%` | Handle corner radius |
| `--uilib-slider-handle-shadow` | `0 1px 4px …` | Handle box shadow |
| `--uilib-slider-handle-hover-scale` | `1.15` | Handle scale on `:hover` |
| `--uilib-slider-focus-ring-color` | `rgba(99,102,241,.35)` | Focus ring colour |
| `--uilib-slider-focus-ring-width` | `3px` | Focus ring width |
| `--uilib-slider-disabled-opacity` | `0.5` | Opacity when disabled |
| `--uilib-slider-vertical-height` | `200px` | Height of the vertical slider container |
| `--uilib-slider-track-height-sm` | `2px` | Track thickness for `size="sm"` |
| `--uilib-slider-track-height-md` | `4px` | Track thickness for `size="md"` |
| `--uilib-slider-track-height-lg` | `6px` | Track thickness for `size="lg"` |
| `--uilib-slider-handle-size-sm` | `14px` | Handle diameter for `size="sm"` |
| `--uilib-slider-handle-size-md` | `20px` | Handle diameter for `size="md"` |
| `--uilib-slider-handle-size-lg` | `28px` | Handle diameter for `size="lg"` |

---

## Dark mode

The component ships built-in dark mode token overrides activated via
`[data-theme='dark']` on any ancestor element:

```css
[data-theme='dark'] {
  --uilib-slider-track-color: #374151;
  --uilib-slider-fill-color: #818cf8;
  --uilib-slider-handle-bg: #1f2937;
  --uilib-slider-handle-border: 2px solid #818cf8;
  --uilib-slider-focus-ring-color: rgba(129, 140, 248, 0.4);
}
```

---

## Accessibility

### ARIA attributes

| Attribute | Element | Value |
|---|---|---|
| `role="slider"` | Handle | Identifies the focusable handle as a slider widget |
| `aria-valuemin` | Handle | Maps to the `min` input |
| `aria-valuemax` | Handle | Maps to the `max` input (start handle in range mode uses `rangeEndValue` as its max) |
| `aria-valuenow` | Handle | Reflects the current value |
| `aria-orientation` | Handle | `"horizontal"` or `"vertical"` |
| `aria-label` | Handle | Forwarded from `ariaLabel`; range mode defaults to `"Minimum value"` / `"Maximum value"` |
| `aria-labelledby` | Handle | Forwarded from `ariaLabelledBy` |
| `aria-disabled` | Handle + host | Set to `"true"` when disabled |
| `tabindex` | Handle | Forwarded from `tabindex` input; becomes `-1` when disabled |

### Keyboard navigation

| Key | Action |
|---|---|
| `ArrowRight` / `ArrowUp` | Increase value by one `step` |
| `ArrowLeft` / `ArrowDown` | Decrease value by one `step` |
| `PageUp` | Increase value by `step × 10` |
| `PageDown` | Decrease value by `step × 10` |
| `Home` | Jump to `min` (or to `rangeEndValue` when on the end handle) |
| `End` | Jump to `max` (or to `rangeStartValue` when on the start handle) |

> Keys are ignored when `disabled` or `readonly` is `true`.

---

## Live demo

[http://localhost:4200/slider](http://localhost:4200/slider)

---

## Source

`projects/ui-lib-custom/src/lib/slider/`

