# Rating

**Selector:** `ui-lib-rating`
**Entry point:** `import { Rating } from 'ui-lib-custom/rating'`

---

## Overview

Rating component that lets users select a star value from 1 to N via click or keyboard.
Implements ControlValueAccessor for ngModel and reactive form integration.

## API

### Inputs

| Name              | Type                            | Default | Description                                                                    |
| ----------------- | ------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `ariaLabel`       | `string | null`                 | `null`  | /** Accessible label for the radiogroup element.                               |
| `ariaLabelledby`  | `string | null`                 | `null`  | /** Explicit aria-labelledby override; overrides ariaLabel when set.           |
| `autofocus`       | `boolean`                       | `false` | /** When true, the first focusable star receives focus after the first render. |
| `cancel`          | `boolean`                       | `true`  | /** When true, a cancel button is shown to clear the current value.            |
| `disabled`        | `boolean`                       | `false` | /** Disables the component entirely.                                           |
| `iconCancelClass` | `string | null`                 | `null`  | /** Custom CSS class appended to the cancel icon.                              |
| `iconOffClass`    | `string | null`                 | `null`  | /** Custom CSS class appended to an empty star icon.                           |
| `iconOffStyle`    | `Record<string, string> | null` | `null`  | /** Inline styles applied to an empty star icon element.                       |
| `iconOnClass`     | `string | null`                 | `null`  | /** Custom CSS class appended to a filled star icon.                           |
| `iconOnStyle`     | `Record<string, string> | null` | `null`  | /** Inline styles applied to a filled star icon element.                       |
| `readonly`        | `boolean`                       | `false` | /** Makes the component read-only: visible but not interactive.                |
| `size`            | `RatingSize`                    | `'md'`  | /** Size token: sm | md | lg.                                                  |
| `stars`           | `number`                        | `5`     | /** Number of star icons to render.                                            |
| `variant`         | `RatingVariant | null`          | `null`  | /** Design-system variant; falls back to ThemeConfigService when null.         |

### Models (two-way bindable)

| Name    | Type            | Default | Description                                                       |
| ------- | --------------- | ------- | ----------------------------------------------------------------- |
| `value` | `number | null` | `null`  | /** Current rating value. Supports two-way binding via [(value)]. |

### Outputs

| Name           | Type                | Description                                                                                                                      |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `cleared`      | `Event`             | /** Emitted when the rating is cleared (cancel button, toggle-deselect, or Delete key).                                          |
| `rate`         | `RatingRateEvent`   | /**
Emitted when a star is selected. The value is always a positive integer.
Use `cleared` to detect when the rating is cleared. |
| `ratingBlur`   | `FocusEvent`        | /** Emitted when any star loses focus.                                                                                           |
| `ratingChange` | `RatingChangeEvent` | /** Emitted whenever the rating value changes (including clears).                                                                |
| `ratingFocus`  | `FocusEvent`        | /** Emitted when any star receives focus.                                                                                        |

## Content Projection

_none_

## Theming

| CSS Variable                         | Default                                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `--uilib-rating-cancel-color`        | `var(--uilib-color-neutral-400, #9ca3af)`                                                |
| `--uilib-rating-cancel-hover-color`  | `var(--uilib-color-danger-500, #ef4444)`                                                 |
| `--uilib-rating-focus-shadow`        | `0 0 0 2px color-mix(in srgb, var(--uilib-color-primary-500, #f59e0b) 40%, transparent)` |
| `--uilib-rating-gap`                 | `0.25rem`                                                                                |
| `--uilib-rating-star-hover-color`    | `var(--uilib-color-primary-400, #fbbf24)`                                                |
| `--uilib-rating-star-off-color`      | `var(--uilib-color-neutral-300, #d1d5db)`                                                |
| `--uilib-rating-star-on-color`       | `var(--uilib-color-primary-500, #f59e0b)`                                                |
| `--uilib-rating-star-size`           | `var(--uilib-rating-star-size-sm)`                                                       |
| `--uilib-rating-star-size-lg`        | `2rem`                                                                                   |
| `--uilib-rating-star-size-md`        | `1.5rem`                                                                                 |
| `--uilib-rating-star-size-sm`        | `1rem`                                                                                   |
| `--uilib-rating-transition-duration` | `0ms`                                                                                    |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                            |
| --------------------------------------------------------------------------- |
| ArrowDown decrements the value by one                                       |
| ArrowLeft clamps at minimum value (1)                                       |
| ArrowLeft decreases rating by one                                           |
| ArrowLeft decrements the value by one                                       |
| ArrowLeft does not go below 1                                               |
| ArrowRight clamps at maximum stars count                                    |
| ArrowRight does not exceed stars count                                      |
| ArrowRight increases rating by one                                          |
| ArrowRight increments the value by one                                      |
| ArrowUp increments the value by one                                         |
| all decorative stars carry aria-hidden=                                     |
| all stars have aria-checked=                                                |
| applies default variant and size classes                                    |
| applies each variant class                                                  |
| does not emit onFocus when disabled                                         |
| does not warn when ariaLabelledby provides the accessible name              |
| each star aria-label includes the star number and maximum                   |
| each star has aria-posinset and aria-setsize                                |
| each star has role=                                                         |
| each star has role=radio                                                    |
| emits onBlur when a star loses focus                                        |
| emits onFocus when a star receives focus                                    |
| fills stars up to the hovered position on mouseenter                        |
| first star has tabindex=0 when no value is selected                         |
| getStarAriaLabel returns                                                    |
| has role=radiogroup on the host                                             |
| host aria-label describes the rating value in read-only mode                |
| host aria-label reflects the consumer-supplied ariaLabel                    |
| host aria-label uses 0 when value is null in read-only mode                 |
| host has role=                                                              |
| host prefers aria-labelledby over aria-label when both inputs are available |
| only the selected star has aria-checked=true                                |
| passes axe in default interactive state (no value selected)                 |
| passes axe in disabled state                                                |
| passes axe in read-only mode                                                |
| passes axe with a value selected                                            |
| selected star has aria-checked=                                             |
| selected star has tabindex=0; others have tabindex=-1                       |
| sets aria-label on the host                                                 |
| star icons are aria-hidden                                                  |
| warns in dev mode when neither ariaLabel nor ariaLabelledby is provided     |

## Usage Examples

```html
<!-- basic five-star rating with ngModel -->
<ui-lib-rating [(ngModel)]="rating" />

<!-- ten stars, no cancel button, reactive form -->
<ui-lib-rating [stars]="10" [cancel]="false" [formControl]="ratingControl" (ratingChange)="onRate($event)" />

<!-- read-only display (role="img", aria-label describes the value) -->
<ui-lib-rating [readonly]="true" [(ngModel)]="rating" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#rating)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/rating/README.md)

