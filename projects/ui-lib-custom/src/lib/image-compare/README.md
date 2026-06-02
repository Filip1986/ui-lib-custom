# ImageCompare

**Selector:** `ui-lib-image-compare`
**Package:** `ui-lib-custom/image-compare`
**Content projection:** no — none; images are provided via `leftImage` / `rightImage` inputs

> `value` is a `model()` signal (two-way bindable via `[(value)]`) representing the divider position as a percentage (0–100). Clicking anywhere on the container also repositions the divider — not just dragging the handle.

## Inputs

| Name         | Type                                             | Default                     | Notes                                                                      |
| ------------ | ------------------------------------------------ | --------------------------- | -------------------------------------------------------------------------- |
| `leftImage`  | `string`                                         | `''`                        | URL of the left (before) image                                             |
| `leftAlt`    | `string`                                         | `''`                        | Accessible alt text for the left image                                     |
| `rightImage` | `string`                                         | `''`                        | URL of the right (after) image                                             |
| `rightAlt`   | `string`                                         | `''`                        | Accessible alt text for the right image                                    |
| `value`      | `number`                                         | `50`                        | Two-way bindable via `[(value)]`; divider position as a percentage (0–100) |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`                      | Falls back to `ThemeConfigService` global variant when null                |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`                      | Size token                                                                 |
| `disabled`   | `boolean`                                        | `false`                     | Prevents pointer and keyboard interaction                                  |
| `styleClass` | `string \| null`                                 | `null`                      | Additional CSS class(es) on the host element                               |
| `ariaLabel`  | `string`                                         | `'Image comparison slider'` | Accessible label for the slider handle                                     |

## Outputs

| Name         | Payload  | Notes                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| `slideStart` | `number` | Emitted when the user starts dragging; payload is the current percentage value   |
| `slideEnd`   | `number` | Emitted when the user releases the handle; payload is the final percentage value |

## Usage

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

## Keyboard Interaction

| Key                       | Action                             |
| ------------------------- | ---------------------------------- |
| `ArrowRight` / `ArrowUp`  | Move divider right by 1%           |
| `ArrowLeft` / `ArrowDown` | Move divider left by 1%            |
| `PageUp`                  | Move divider right by 10%          |
| `PageDown`                | Move divider left by 10%           |
| `Home`                    | Move divider to 0% (fully left)    |
| `End`                     | Move divider to 100% (fully right) |

## ARIA Attributes

| Attribute        | Element         | Value                                                             |
| ---------------- | --------------- | ----------------------------------------------------------------- |
| `role`           | handle          | `slider`                                                          |
| `aria-label`     | handle          | Value of `ariaLabel` input (default: `'Image comparison slider'`) |
| `aria-valuenow`  | handle          | Current slider position (0–100)                                   |
| `aria-valuemin`  | handle          | `0`                                                               |
| `aria-valuemax`  | handle          | `100`                                                             |
| `aria-valuetext` | handle          | Human-readable description, e.g. `"45 percent"`                   |
| `aria-disabled`  | handle          | `"true"` when `disabled` input is true                            |
| `aria-hidden`    | divider line    | `"true"` — decorative element                                     |
| `aria-hidden`    | handle SVG icon | `"true"` — decorative icon                                        |

## CSS Custom Properties

| Property                                    | Default                            | Notes                              |
| ------------------------------------------- | ---------------------------------- | ---------------------------------- |
| `--uilib-image-compare-radius`              | `var(--uilib-radius-md, 0.375rem)` | Container corner radius            |
| `--uilib-image-compare-divider-width`       | `2px`                              | Width of the vertical divider line |
| `--uilib-image-compare-divider-color`       | `#ffffff`                          | Color of the divider line          |
| `--uilib-image-compare-handle-size-sm`      | `2rem`                             | Handle diameter for size `sm`      |
| `--uilib-image-compare-handle-size-md`      | `2.75rem`                          | Handle diameter for size `md`      |
| `--uilib-image-compare-handle-size-lg`      | `3.5rem`                           | Handle diameter for size `lg`      |
| `--uilib-image-compare-handle-bg`           | `#ffffff`                          | Handle background color            |
| `--uilib-image-compare-handle-color`        | `#374151`                          | Handle icon/stroke color           |
| `--uilib-image-compare-handle-shadow`       | `0 2px 8px rgba(0,0,0,.35)`        | Handle drop-shadow                 |
| `--uilib-image-compare-handle-icon-size-sm` | `0.875rem`                         | Icon size for size `sm`            |
| `--uilib-image-compare-handle-icon-size-md` | `1.125rem`                         | Icon size for size `md`            |
| `--uilib-image-compare-handle-icon-size-lg` | `1.375rem`                         | Icon size for size `lg`            |
| `--uilib-image-compare-focus-ring`          | `0 0 0 3px rgba(99,102,241,.45)`   | Focus ring shadow                  |

## Accessibility

- The draggable handle is a native ARIA `role="slider"` widget, meeting the [ARIA slider design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/).
- `aria-valuetext` provides a human-readable description (e.g. `"45 percent"`) for screen readers, supplementing the numeric `aria-valuenow`.
- Both images must have meaningful `alt` text via `leftAlt` / `rightAlt` inputs so screen reader users understand what is being compared.
- The divider line and handle icon are marked `aria-hidden="true"` because they are purely decorative.
- The component honours `prefers-reduced-motion: reduce` — handle transitions are disabled when this media query matches.
- When `disabled` is `true`, the handle receives `aria-disabled="true"` and all pointer/keyboard interaction is suppressed.
- Each component instance receives a unique generated `id` (e.g. `ui-lib-image-compare-1`) on the host element.
