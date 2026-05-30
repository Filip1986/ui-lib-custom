# Slider

**Selector:** `ui-lib-slider`
**Package:** `ui-lib-custom/slider`
**Content projection:** no — none

> `value` is a `model()` signal — use `[(value)]` for two-way binding. In range mode (`[range]="true"`), `value` must be a `[number, number]` tuple; in single mode it must be a plain `number`. The CVA `writeValue(null)` resets to `min` (single) or `[min, max]` (range). Implements `ControlValueAccessor`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number \| [number, number]` | `0` | Current value. Two-way bindable via `[(value)]` or `ngModel`. Use a tuple in range mode. |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | `100` | Maximum allowed value. |
| `step` | `number` | `1` | Increment/decrement step for keyboard and drag snapping. |
| `range` | `boolean` | `false` | When true, renders two handles and `value` is `[start, end]`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Track orientation. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `readonly` | `boolean` | `false` | Focusable but value does not change. |
| `animate` | `boolean` | `false` | Adds CSS transition animation on value changes. |
| `tabindex` | `number` | `0` | Tab index forwarded to each handle. |
| `ariaLabel` | `string \| null` | `null` | Accessible label forwarded to handle element(s). |
| `ariaLabelledBy` | `string \| null` | `null` | `aria-labelledby` forwarded to handle element(s). |
| `valueTextFn` | `(value: number) => string` | `(value) => String(value)` | Formats `aria-valuetext` for screen readers in single and range modes. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |
| `styleClass` | `string \| null` | `null` | Extra CSS class appended to the host element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `SliderChangeEvent` | Emitted on every user-driven value change during drag or keyboard interaction. |
| `slideEnd` | `SliderSlideEndEvent` | Emitted when the user releases a drag interaction. |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowUp` | Increment by `step` |
| `ArrowLeft` / `ArrowDown` | Decrement by `step` |
| `PageUp` | Increment by `step × 10` |
| `PageDown` | Decrement by `step × 10` |
| `Home` | Jump to minimum value |
| `End` | Jump to maximum value |

## Accessibility

- Handle: `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `aria-orientation`, `aria-disabled`
- Fill bar: `aria-hidden="true"` (decorative)
- Range mode: start handle uses `aria-label="Minimum value"` and its `aria-valuemax` is constrained to the current end value; end handle uses `aria-label="Maximum value"` and its `aria-valuemin` is constrained to the current start value
- Disabled: `aria-disabled="true"` on the handle; keyboard interaction is blocked
- Respects `prefers-reduced-motion` — transitions are disabled when the user prefers reduced motion

### ARIA attribute behavior

| Attribute | Source |
|---|---|
| `aria-valuenow` | Current numeric value for the active handle |
| `aria-valuemin` / `aria-valuemax` | Global min/max in single mode; cross-constrained by the opposite thumb in range mode |
| `aria-valuetext` | `valueTextFn(value)` for human-readable announcements |
| `aria-orientation` | `horizontal` or `vertical` from the `orientation` input |
| `aria-label` / `aria-labelledby` | Forwarded from inputs; range mode falls back to `Minimum value` / `Maximum value` when no label is supplied |

## Usage

```html
<!-- basic single-value slider -->
<ui-lib-slider [(value)]="volume" [min]="0" [max]="100" />

<!-- range slider with ngModel -->
<ui-lib-slider [range]="true" [(value)]="priceRange" [min]="0" [max]="1000" [step]="10" />

<!-- vertical slider -->
<ui-lib-slider orientation="vertical" [(value)]="level" />

<!-- with accessible label -->
<ui-lib-slider ariaLabel="Volume" [(value)]="volume" />

<!-- custom spoken value text -->
<ui-lib-slider
  ariaLabel="Volume"
  [valueTextFn]="formatVolumeValue"
  [(value)]="volume"
/>
```

```ts
public readonly formatVolumeValue = (value: number): string => `${value}%`;
```

## CSS custom properties

| Variable | Purpose |
|---|---|
| `--uilib-slider-track-color` | Track background color |
| `--uilib-slider-fill-color` | Filled-range color |
| `--uilib-slider-handle-bg` | Thumb background |
| `--uilib-slider-handle-border` | Thumb border |
| `--uilib-slider-focus-ring-color` | `:focus-visible` ring color |
| `--uilib-slider-fill-transition` | Fill animation timing; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-slider-handle-transition` | Handle hover/shadow transition; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-slider-animate-handle-transition` | Handle position transition when `animate=true`; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-slider-track-padding` | Hit-box padding on the track container (`12px`) |
| `--uilib-slider-vertical-height` | Vertical slider height |
