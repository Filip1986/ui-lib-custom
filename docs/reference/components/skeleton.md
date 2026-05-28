# Skeleton

**Selector:** `ui-lib-skeleton`
**Entry point:** `import { Skeleton } from 'ui-lib-custom/skeleton'`

---

## Overview

Skeleton — content placeholder displayed while real content is loading. Renders an animated shimmer block in rectangle or circle shape. Use width, height, and size inputs to control dimensions. Combine multiple skeletons to mock realistic page layouts.

## API

### Inputs

| Name           | Type                     | Default             | Description                                                                                                                                           |
| -------------- | ------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`    | `SkeletonAnimation`      | `'wave'`            | Animation type. Use 'none' to disable the shimmer.                                                                                                    |
| `ariaLabel`    | `string`                 | `'Loading content'` | Accessible label announced while the loading placeholder is active.                                                                                   |
| `borderRadius` | `string | null`          | `null`              | Custom border-radius value. Overrides the shape-derived default.                                                                                      |
| `height`       | `string`                 | `'1rem'`            | Height of the skeleton. Accepts any valid CSS dimension string (e.g. '1rem', '4rem').                                                                 |
| `loading`      | `boolean`                | `true`              | Whether the skeleton placeholder is still loading.                                                                                                    |
| `shape`        | `SkeletonShape`          | `'rectangle'`       | Shape of the skeleton placeholder.                                                                                                                    |
| `size`         | `string | null`          | `null`              | Convenience shorthand that sets both width and height to the same value. Useful for circle shapes. When set, overrides width and height individually. |
| `styleClass`   | `string | null`          | `null`              | Additional CSS classes applied to the host element.                                                                                                   |
| `variant`      | `SkeletonVariant | null` | `null`              | Design variant — inherits from ThemeConfigService when not set.                                                                                       |
| `width`        | `string`                 | `'100%'`            | Width of the skeleton. Accepts any valid CSS dimension string (e.g. '100%', '12rem').                                                                 |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                          | Default                             |
| ------------------------------------- | ----------------------------------- |
| `--uilib-skeleton-animation-duration` | `1.5s`                              |
| `--uilib-skeleton-bg`                 | `var(--uilib-surface-200, #e5e7eb)` |
| `--uilib-skeleton-border-radius`      | `var(--uilib-radius-md, 0.375rem)`  |
| `--uilib-skeleton-shimmer-color`      | `var(--uilib-surface-50, #f9fafb)`  |

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                                         |
| ------------------------------------------------------------------------ |
| allows projected interactive content to receive focus when loaded        |
| announces loading with role=                                             |
| keeps the host element out of the tab order while loading                |
| passes axe in the default loading state                                  |
| passes axe when the loaded content is displayed                          |
| passes axe with a custom loading label                                   |
| sets aria-busy=                                                          |
| should apply bootstrap variant class when set                            |
| should apply material variant class by default (from ThemeConfigService) |
| should apply minimal variant class when set                              |
| should have aria-busy=                                                   |
| should render the placeholder as aria-hidden while loading               |
| should render the shimmer inner element as aria-hidden                   |

## Usage Examples

```html
<!-- Text line placeholder -->
<ui-lib-skeleton width="80%" height="1rem" />

<!-- Card skeleton -->
<div style="display:flex; gap:1rem; align-items:center">
  <ui-lib-skeleton shape="circle" size="3rem" />
  <div style="flex:1">
    <ui-lib-skeleton width="60%" height="1rem" styleClass="mb-2" />
    <ui-lib-skeleton width="40%" height="0.75rem" />
  </div>
</div>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#skeleton)
- [Demo page](/components/skeleton)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/skeleton/README.md)

