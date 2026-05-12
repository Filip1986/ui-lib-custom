# Skeleton

Content placeholder displayed while real content is loading. Renders an animated shimmer block in rectangle or circle shape.

## Package

```ts
import { Skeleton } from 'ui-lib-custom/skeleton';
```

## Selector

`ui-lib-skeleton`

## Inputs

| Input          | Type                                                      | Default             | Description                                                                 |
|----------------|-----------------------------------------------------------|---------------------|-----------------------------------------------------------------------------|
| `loading`      | `boolean`                                                 | `true`              | When `true`, shows the skeleton placeholder and loading semantics.          |
| `ariaLabel`    | `string`                                                  | `'Loading content'` | Accessible label announced while the skeleton is active.                   |
| `shape`        | `'rectangle' \| 'circle'`                                 | `'rectangle'`       | Shape of the placeholder.                                                  |
| `width`        | `string`                                                  | `'100%'`            | CSS width (e.g. `'12rem'`, `'100%'`). Overridden by `size`.               |
| `height`       | `string`                                                  | `'1rem'`            | CSS height (e.g. `'2rem'`). Overridden by `size`.                         |
| `size`         | `string \| null`                                          | `null`              | Sets both width and height to the same value. Useful for circles.         |
| `borderRadius` | `string \| null`                                          | `null`              | Custom border-radius, overrides the shape/variant default.                |
| `animation`    | `'wave' \| 'none'`                                        | `'wave'`            | Shimmer animation type. Use `'none'` to disable.                          |
| `variant`      | `'material' \| 'bootstrap' \| 'minimal' \| null`          | `null`              | Design variant. Falls back to `ThemeConfigService` when `null`.           |
| `styleClass`   | `string \| null`                                          | `null`              | Additional CSS classes applied to the host element.                       |

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

### Loading wrapper with projected content

```html
<ui-lib-skeleton [loading]="isLoading" ariaLabel="Loading account summary">
  <section class="account-summary">
    <h2>Account summary</h2>
    <p>{{ summaryText }}</p>
  </section>
</ui-lib-skeleton>
```

## CSS Variables

| Variable                              | Default                    | Description                         |
|---------------------------------------|----------------------------|-------------------------------------|
| `--uilib-skeleton-bg`                 | `var(--uilib-surface-200)` | Background colour                   |
| `--uilib-skeleton-shimmer-color`      | `var(--uilib-surface-50)`  | Shimmer highlight colour            |
| `--uilib-skeleton-border-radius`      | `var(--uilib-radius-md)`   | Corner radius                       |
| `--uilib-skeleton-animation-duration` | `1.5s`                     | Wave sweep duration                 |

## ARIA attributes

| Element | Attributes | Purpose |
|---------|------------|---------|
| `ui-lib-skeleton` host while `loading=true` | `id`, `role="status"`, `aria-live="polite"`, `aria-atomic="true"`, `aria-busy="true"`, `aria-label` | Announces an active loading region with a descriptive label. |
| `ui-lib-skeleton` host while `loading=false` | `id`, `aria-busy="false"` | Keeps a stable container id while removing temporary loading semantics. |
| `.ui-lib-skeleton__placeholder` | `aria-hidden="true"` | Hides the decorative placeholder block from assistive technology. |
| `.ui-lib-skeleton__shimmer` | `aria-hidden="true"` | Hides the decorative shimmer animation from assistive technology. |
| `.ui-lib-skeleton__content` while `loading=true` | `aria-hidden="true"`, `inert` | Prevents projected content from being announced or focused before it is ready. |

## Keyboard interaction

| Key | Behaviour |
|-----|-----------|
| `Tab` while loading | Skeleton host is not focusable and hidden projected content is inert. |
| `Tab` after loading | Focus moves to the first interactive element inside the projected content, if one exists. |

## Accessibility

- Decorative placeholder visuals are always hidden from assistive technologies with `aria-hidden="true"`.
- The loading container exposes `aria-busy` and a descriptive `ariaLabel` so screen readers hear a meaningful loading announcement instead of placeholder geometry.
- When `loading` becomes `false`, the placeholder is removed, loading semantics are cleared, and the projected content becomes available for reading and focus.
- Wave animation respects `prefers-reduced-motion: reduce` and stops animating for motion-sensitive users.
