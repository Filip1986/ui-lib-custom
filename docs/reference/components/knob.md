# Knob

**Selector:** `ui-lib-knob`
**Entry point:** `import { Knob } from 'ui-lib-custom/knob'`

---

## Overview

Knob — a circular dial form control for selecting a numeric value. Supports drag interaction, keyboard navigation, CVA (ngModel + reactive forms), three design variants, three sizes, and full CSS-variable theming.

## API

### Inputs

| Name            | Type         | Default                          | Description                                                            |
| --------------- | ------------ | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- |
| `ariaLabel`     | `string      | undefined`                       | `undefined`                                                            | Accessible label for the dial element.                                                                              |
| `disabled`      | `boolean`    | `KNOB_DEFAULTS.disabled`         | Whether the knob is disabled.                                          |
| `inputId`       | `string`     | `ui-lib-knob-${++knobIdCounter}` | Unique HTML id forwarded to the SVG element.                           |
| `max`           | `number`     | `KNOB_DEFAULTS.max`              | Maximum allowed value.                                                 |
| `min`           | `number`     | `KNOB_DEFAULTS.min`              | Minimum allowed value.                                                 |
| `readonly`      | `boolean`    | `KNOB_DEFAULTS.readonly`         | Whether the knob is read-only (interactive but value does not change). |
| `showValue`     | `boolean`    | `KNOB_DEFAULTS.showValue`        | Whether to render the numeric value label inside the dial.             |
| `size`          | `KnobSize`   | `KNOB_DEFAULTS.size`             | Component size token.                                                  |
| `step`          | `number`     | `KNOB_DEFAULTS.step`             | Increment/decrement step for keyboard interaction and drag snapping.   |
| `strokeWidth`   | `number`     | `KNOB_DEFAULTS.strokeWidth`      | Width of the SVG arc stroke in SVG user-unit coordinates.              |
| `tabindex`      | `number`     | `KNOB_DEFAULTS.tabindex`         | Tab index for keyboard focus.                                          |
| `textColor`     | `string      | null`                            | `null`                                                                 | Inline color override for the center value text label. Accepts any CSS color.                                       |
| `valueColor`    | `string      | null`                            | `null`                                                                 | Inline color override for the value (range) arc stroke. Accepts any CSS color.                                      |
| `valueTemplate` | `string      | null`                            | `null`                                                                 | Optional value format template. Use `{value}` as a placeholder for the number. Example: `'{value}%'` renders `42%`. |
| `variant`       | `KnobVariant | null`                            | `null`                                                                 | Design variant override. When null the active global theme variant is used. Accepts 'material'                      | 'bootstrap' | 'minimal'. |

### Models (two-way bindable)

| Name    | Type     | Default | Description                                               |
| ------- | -------- | ------- | --------------------------------------------------------- |
| `value` | `number` | `0`     | Current value. Two-way bindable via [(value)] or ngModel. |

### Outputs

| Name         | Type              | Description                                               |
| ------------ | ----------------- | --------------------------------------------------------- |
| `knobBlur`   | `FocusEvent`      | Emits when the knob loses focus.                          |
| `knobChange` | `KnobChangeEvent` | Emits whenever the value changes due to user interaction. |
| `knobFocus`  | `FocusEvent`      | Emits when the knob receives focus.                       |

## Content Projection

_none_

## Theming

| CSS Variable                       | Default                    |
| ---------------------------------- | -------------------------- |
| `--uilib-knob-disabled-opacity`    | `0.5`                      |
| `--uilib-knob-focus-ring-color`    | `rgba(99, 102, 241, 0.35)` |
| `--uilib-knob-focus-ring-width`    | `3px`                      |
| `--uilib-knob-range-color`         | `#6366f1`                  |
| `--uilib-knob-size-lg`             | `160px`                    |
| `--uilib-knob-size-md`             | `120px`                    |
| `--uilib-knob-size-sm`             | `80px`                     |
| `--uilib-knob-text-color`          | `#1f2937`                  |
| `--uilib-knob-text-size`           | `1.25rem`                  |
| `--uilib-knob-text-weight`         | `600`                      |
| `--uilib-knob-track-color`         | `#e0e0e0`                  |
| `--uilib-knob-transition-duration` | `0.15s`                    |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/slider/

### Keyboard Interactions

| Test description                                          |
| --------------------------------------------------------- |
| ArrowDown decrements by step                              |
| ArrowLeft decrements by step                              |
| ArrowRight increments by step                             |
| ArrowUp increments by step                                |
| aria-valuemin and aria-valuemax reflect configured bounds |
| aria-valuenow reflects current value                      |
| aria-valuetext provides a human-readable value            |
| axe passes at maximum value                               |
| axe passes at minimum value                               |
| axe passes in default state                               |
| axe passes when disabled                                  |
| decorative svg is aria-hidden                             |
| decorative svg is not focusable                           |
| disabled state prevents keyboard interaction              |
| disabled state sets aria-disabled=                        |
| host exposes role=                                        |
| should decrease value on ArrowDown                        |
| should decrease value on ArrowLeft                        |
| should emit change when value changes via keyboard        |
| should increase value on ArrowRight                       |
| should increase value on ArrowUp                          |
| should not exceed max on ArrowUp at max                   |
| should not go below min on ArrowDown at min               |
| should not respond to keyboard when disabled              |
| should not respond to keyboard when readonly              |
| should remove aria-disabled when not disabled             |
| should set aria-disabled when disabled                    |
| should set aria-label when provided                       |
| should set aria-valuemin and aria-valuemax                |
| should set aria-valuenow to the current value             |
| should set role=                                          |
| should set tabindex to -1 when disabled                   |

## Usage Examples

```html
<!-- basic usage with two-way binding -->
<uilib-knob [(value)]="volume" [min]="0" [max]="100" />

<!-- percentage display with ngModel -->
<uilib-knob [(ngModel)]="brightness" [max]="100" valueTemplate="{value}%" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#knob)
- [Demo page](/components/knob)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/knob/README.md)
