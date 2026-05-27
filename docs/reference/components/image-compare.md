# Image Compare

**Selector:** `ui-lib-image-compare`
**Entry point:** `import { ImageCompare } from 'ui-lib-custom/image-compare'`

---

## Overview

ImageCompare component — renders two images with a draggable slider divider so the user can compare a "before" (left) and "after" (right) image. The `value` model (0–100) represents the percentage from the left edge where the divider is positioned. Supports keyboard navigation (ArrowLeft/Right, PageUp/Down, Home/End), pointer capture for smooth dragging, three design variants, three size tokens, and full CSS-variable theming.

## API

### Inputs

| Name         | Type               | Default                    | Description                                           |
| ------------ | ------------------ | -------------------------- | ----------------------------------------------------- |
| `ariaLabel`  | `string`           | `IMAGE_COMPARE_ARIA_LABEL` | Accessible label for the slider handle.               |
| `disabled`   | `boolean`          | `false`                    | When true, pointer interaction is disabled.           |
| `leftAlt`    | `string`           | `''`                       | Accessible alt text for the left image.               |
| `leftImage`  | `string`           | `''`                       | URL of the left (before) image.                       |
| `rightAlt`   | `string`           | `''`                       | Accessible alt text for the right image.              |
| `rightImage` | `string`           | `''`                       | URL of the right (after) image.                       |
| `size`       | `ImageCompareSize` | `'md'`                     | Component size token.                                 |
| `styleClass` | `string | null`    | `null`                     | Additional CSS class(es) applied to the host element. |

### Models (two-way bindable)

| Name    | Type     | Default                       | Description                                                                                                   |
| ------- | -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `value` | `number` | `IMAGE_COMPARE_DEFAULT_VALUE` | Slider position as a percentage (0–100) from the left edge. Supports two-way binding: `[(value)]="position"`. |

### Outputs

| Name         | Type     | Description                                               |
| ------------ | -------- | --------------------------------------------------------- |
| `slideEnd`   | `number` | Emitted when the user releases the handle after dragging. |
| `slideStart` | `number` | Emitted when the user starts dragging the handle.         |

## Content Projection

_none_

## Theming

| CSS Variable                                | Default                              |
| ------------------------------------------- | ------------------------------------ |
| `--uilib-image-compare-divider-color`       | `#ffffff`                            |
| `--uilib-image-compare-divider-width`       | `2px`                                |
| `--uilib-image-compare-focus-ring`          | `0 0 0 3px rgba(99, 102, 241, 0.45)` |
| `--uilib-image-compare-handle-bg`           | `#ffffff`                            |
| `--uilib-image-compare-handle-color`        | `#374151`                            |
| `--uilib-image-compare-handle-icon-size-lg` | `1.375rem`                           |
| `--uilib-image-compare-handle-icon-size-md` | `1.125rem`                           |
| `--uilib-image-compare-handle-icon-size-sm` | `0.875rem`                           |
| `--uilib-image-compare-handle-shadow`       | `0 2px 8px rgba(0, 0, 0, 0.35)`      |
| `--uilib-image-compare-handle-size-lg`      | `3.5rem`                             |
| `--uilib-image-compare-handle-size-md`      | `2.75rem`                            |
| `--uilib-image-compare-handle-size-sm`      | `2rem`                               |
| `--uilib-image-compare-radius`              | `var(--uilib-radius-md, 0.375rem)`   |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                             |
| ------------------------------------------------------------ |
| ArrowLeft decrements aria-valuenow by 1                      |
| ArrowRight increments aria-valuenow by 1                     |
| End key sets aria-valuenow to 100                            |
| Home key sets aria-valuenow to 0                             |
| aria-valuemax is 100                                         |
| aria-valuemin is 0                                           |
| aria-valuenow reflects the current value                     |
| aria-valuetext provides a human-readable string of the value |
| aria-valuetext updates when value changes via keyboard       |
| axe passes at maximum value                                  |
| axe passes at minimum value                                  |
| axe passes in default state                                  |
| axe passes when disabled                                     |
| disabled state prevents keyboard interaction                 |
| disabled state sets aria-disabled=                           |
| divider line has aria-hidden=                                |
| handle SVG icon has aria-hidden=                             |
| handle has role=                                             |
| handle has the default aria-label                            |
| handle uses a custom aria-label when provided                |
| should apply focused class when handle is focused            |
| should apply variant class to the host element               |
| should decrease value by 1 on ArrowLeft key                  |
| should have aria-disabled on the handle when disabled        |
| should have aria-valuemax=                                   |
| should have aria-valuemin=                                   |
| should have role=                                            |
| should have the default aria-label on the handle             |
| should increase value by 1 on ArrowRight key                 |
| should not respond to keyboard when disabled                 |
| should remove focused class when handle is blurred           |
| should set aria-valuenow to the current value                |
| should switch variant class when variant input changes       |
| should update aria-valuenow when value changes               |

## Usage Examples

```html
<!-- basic before/after comparison -->
<ui-lib-image-compare
  leftImage="/before.jpg"
  leftAlt="Before"
  rightImage="/after.jpg"
  rightAlt="After"
/>

<!-- two-way binding to track position -->
<ui-lib-image-compare
  leftImage="/before.jpg"
  rightImage="/after.jpg"
  [(value)]="sliderPosition"
  (slideEnd)="onSlideEnd($event)"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#image-compare)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/image-compare/README.md)

