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
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |
| `styleClass` | `string \| null` | `null` | Extra CSS class appended to the host element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onChange` | `SliderChangeEvent` | Emitted on every user-driven value change during drag or keyboard interaction. |
| `onSlideEnd` | `SliderSlideEndEvent` | Emitted when the user releases a drag interaction. |

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
```
