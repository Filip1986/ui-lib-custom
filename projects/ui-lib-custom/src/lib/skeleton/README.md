# Skeleton

Content placeholder displayed while real content is loading. Renders an animated shimmer block in rectangle or circle shape.

## Package

```ts
import { Skeleton } from 'ui-lib-custom/skeleton';
```

## Selector

`ui-lib-skeleton`

## Inputs

| Input          | Type                              | Default       | Description                                                              |
|----------------|-----------------------------------|---------------|--------------------------------------------------------------------------|
| `shape`        | `'rectangle' \| 'circle'`         | `'rectangle'` | Shape of the placeholder.                                                |
| `width`        | `string`                          | `'100%'`      | CSS width (e.g. `'12rem'`, `'100%'`). Overridden by `size`.             |
| `height`       | `string`                          | `'1rem'`      | CSS height (e.g. `'2rem'`). Overridden by `size`.                       |
| `size`         | `string \| null`                  | `null`        | Sets both width and height to the same value. Useful for circles.        |
| `borderRadius` | `string \| null`                  | `null`        | Custom border-radius, overrides the shape/variant default.               |
| `animation`    | `'wave' \| 'none'`                | `'wave'`      | Shimmer animation type. Use `'none'` to disable.                         |
| `variant`      | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Design variant. Falls back to `ThemeConfigService` when `null`.  |
| `styleClass`   | `string \| null`                  | `null`        | Additional CSS classes applied to the host element.                      |

## Usage examples

### Basic rectangle

```html
<ui-lib-skeleton width="100%" height="1.5rem" />
```

### Circle avatar placeholder

```html
<ui-lib-skeleton shape="circle" size="4rem" />
```

### Card layout placeholder

```html
<div class="card-placeholder">
  <ui-lib-skeleton shape="circle" size="3rem" />
  <div>
    <ui-lib-skeleton width="8rem" height="1rem" />
    <ui-lib-skeleton width="5rem" height="0.75rem" />
  </div>
</div>
<ui-lib-skeleton width="100%" height="10rem" />
<ui-lib-skeleton width="100%" height="1rem" />
<ui-lib-skeleton width="80%" height="1rem" />
```

### No animation

```html
<ui-lib-skeleton width="100%" height="2rem" animation="none" />
```

## CSS Variables

| Variable                           | Default                         | Description              |
|------------------------------------|---------------------------------|--------------------------|
| `--uilib-skeleton-bg`              | `var(--uilib-surface-200)`      | Background colour        |
| `--uilib-skeleton-shimmer-color`   | `var(--uilib-surface-50)`       | Shimmer highlight colour |
| `--uilib-skeleton-border-radius`   | `var(--uilib-radius-md)`        | Corner radius            |
| `--uilib-skeleton-animation-duration` | `1.5s`                       | Wave sweep duration      |

## Accessibility

The host element carries `aria-hidden="true"` so skeleton placeholders are invisible to assistive technologies. No additional ARIA attributes are required.
