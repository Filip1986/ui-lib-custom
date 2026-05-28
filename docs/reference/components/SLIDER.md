# Slider

**Selector:** `ui-lib-slider`
**Entry point:** `import { Slider } from 'ui-lib-custom/slider'`

---

## Overview

Slider - a linear track-based control for selecting a numeric value or range. Supports drag interaction, click-to-jump, keyboard navigation, horizontal/vertical orientation, single-value and range modes, three design variants, three sizes, CVA (ngModel + reactive forms), and full CSS-variable theming.

## API

### Inputs

| Name             | Type                        | Default                       | Description                                                                 |
| ---------------- | --------------------------- | ----------------------------- | --------------------------------------------------------------------------- |
| `animate`        | `boolean`                   | `SLIDER_DEFAULTS.animate`     | When true, fill bar and handle animate on value changes.                    |
| `ariaLabel`      | `string | null`             | `null`                        | Accessible label forwarded to the handle element(s).                        |
| `ariaLabelledBy` | `string | null`             | `null`                        | aria-labelledby attribute forwarded to the handle element(s).               |
| `disabled`       | `boolean`                   | `SLIDER_DEFAULTS.disabled`    | Whether the slider is disabled.                                             |
| `max`            | `number`                    | `SLIDER_DEFAULTS.max`         | Maximum allowed value.                                                      |
| `min`            | `number`                    | `SLIDER_DEFAULTS.min`         | Minimum allowed value.                                                      |
| `orientation`    | `SliderOrientation`         | `SLIDER_DEFAULTS.orientation` | Track orientation - 'horizontal' or 'vertical'.                             |
| `range`          | `boolean`                   | `SLIDER_DEFAULTS.range`       | When true, value is a [start, end] tuple and two handles are rendered.      |
| `readonly`       | `boolean`                   | `SLIDER_DEFAULTS.readonly`    | Whether the slider is read-only - focusable but value does not change.      |
| `size`           | `SliderSize`                | `SLIDER_DEFAULTS.size`        | Size token - 'sm' | 'md' | 'lg'.                                            |
| `step`           | `number`                    | `SLIDER_DEFAULTS.step`        | Increment/decrement step for keyboard navigation and drag snapping.         |
| `styleClass`     | `string | null`             | `null`                        | Additional CSS class(es) appended to the host element.                      |
| `tabindex`       | `number`                    | `SLIDER_DEFAULTS.tabindex`    | Tab index forwarded to each handle element.                                 |
| `valueTextFn`    | `(value: number) => string` | `value: number`               | Formats the spoken `aria-valuetext` for each handle.                        |
| `variant`        | `SliderVariant | null`      | `null`                        | Design variant override. When null the active global theme variant is used. |

### Models (two-way bindable)

| Name    | Type                        | Default | Description                                                             |
| ------- | --------------------------- | ------- | ----------------------------------------------------------------------- |
| `value` | `number | [number, number]` | `0`     | Current value. Single mode: a number. Range mode: a [start, end] tuple. |

### Outputs

| Name           | Type                  | Description                                      |
| -------------- | --------------------- | ------------------------------------------------ |
| `slideEnd`     | `SliderSlideEndEvent` | Emits when the user releases a drag interaction. |
| `sliderChange` | `SliderChangeEvent`   | Emits on every user-driven value change.         |

## Content Projection

_none_

## Theming

| CSS Variable                          | Default                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------- |
| `--uilib-slider-disabled-opacity`     | `0.5`                                                                     |
| `--uilib-slider-fill-color`           | `#6366f1`                                                                 |
| `--uilib-slider-fill-transition`      | `width 0.15s ease, left 0.15s ease, height 0.15s ease, bottom 0.15s ease` |
| `--uilib-slider-focus-ring-color`     | `rgba(99, 102, 241, 0.35)`                                                |
| `--uilib-slider-focus-ring-width`     | `3px`                                                                     |
| `--uilib-slider-handle-bg`            | `#ffffff`                                                                 |
| `--uilib-slider-handle-border`        | `2px solid #6366f1`                                                       |
| `--uilib-slider-handle-border-radius` | `50%`                                                                     |
| `--uilib-slider-handle-hover-scale`   | `1.15`                                                                    |
| `--uilib-slider-handle-shadow`        | `0 1px 4px rgba(0, 0, 0, 0.25)`                                           |
| `--uilib-slider-handle-size-lg`       | `28px`                                                                    |
| `--uilib-slider-handle-size-md`       | `20px`                                                                    |
| `--uilib-slider-handle-size-sm`       | `14px`                                                                    |
| `--uilib-slider-track-border-radius`  | `2px`                                                                     |
| `--uilib-slider-track-color`          | `#e0e0e0`                                                                 |
| `--uilib-slider-track-height-lg`      | `6px`                                                                     |
| `--uilib-slider-track-height-md`      | `4px`                                                                     |
| `--uilib-slider-track-height-sm`      | `2px`                                                                     |
| `--uilib-slider-vertical-height`      | `200px`                                                                   |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/slider/

### Keyboard Interactions

| Test description                                                |
| --------------------------------------------------------------- |
| ArrowDown decreases value by step                               |
| ArrowDown decrements the value by step                          |
| ArrowLeft decreases value by step                               |
| ArrowLeft decrements the value by step                          |
| ArrowLeft does not go below min                                 |
| ArrowLeft on end handle decreases end value                     |
| ArrowRight does not exceed max                                  |
| ArrowRight increases value by step                              |
| ArrowRight increments the value by step                         |
| ArrowRight on start handle increases start value                |
| ArrowUp increases value by step                                 |
| ArrowUp increments the value by step                            |
| FormControl initial value propagates to aria-valuenow           |
| aria-orientation is                                             |
| aria-valuemax reflects the max input                            |
| aria-valuemin reflects the min input                            |
| aria-valuenow reflects the current value                        |
| aria-valuenow updates when value changes via keyboard           |
| aria-valuetext provides a human-readable string of the value    |
| aria-valuetext uses valueTextFn formatting                      |
| axe passes at maximum value                                     |
| axe passes at minimum value                                     |
| axe passes in default state                                     |
| axe passes in range mode                                        |
| axe passes when disabled                                        |
| axe passes with vertical orientation                            |
| disabled state prevents keyboard interaction                    |
| disabled state sets aria-disabled=                              |
| disabled state via CVA removes from tab order                   |
| fill element has aria-hidden=                                   |
| handle formats aria-valuetext with valueTextFn                  |
| handle has aria-orientation=horizontal by default               |
| handle has aria-orientation=vertical when vertical              |
| handle has aria-valuemax attribute                              |
| handle has aria-valuemin attribute                              |
| handle has aria-valuenow matching current value                 |
| handle has role=                                                |
| handle has role=slider                                          |
| handle tabindex is -1 when disabled                             |
| keyboard does nothing when disabled                             |
| keyboard does nothing when readonly                             |
| keyboard input updates ngModel value                            |
| ngModel write propagates to aria-valuenow                       |
| range handles format aria-valuetext with valueTextFn            |
| range handles have fallback aria-labels                         |
| range mode: end handle aria-valuemin is the current start value |
| range mode: end handle has aria-label=                          |
| range mode: end handle responds to ArrowLeft independently      |
| range mode: start handle aria-valuemax is the current end value |
| range mode: start handle has aria-label=                        |
| range mode: start handle responds to ArrowRight independently   |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#slider)
- [Demo page](/components/slider)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/slider/README.md)

