# Animate On Scroll

**Selector:** `ui-lib-animate-on-scroll`
**Entry point:** `import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll'`

---

## Overview

The observer is created in `ngOnInit` with the values of `threshold` and `rootMargin` at that moment; changing these inputs after init has no effect. Silently no-ops when `IntersectionObserver` is unavailable (SSR / old browsers).

## API

### Inputs

| Name         | Type      | Default | Description                                                                                                               |
| ------------ | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `disabled`   | `boolean` | `false` | When `true`, the directive does nothing and no observer is created.                                                       |
| `enterClass` | `string`  | `''`    | CSS class(es) (space-separated) to add when the element enters the viewport.                                              |
| `leaveClass` | `string`  | `''`    | CSS class(es) (space-separated) to add when the element leaves the viewport. Only applied when `once` is false.           |
| `once`       | `boolean` | `true`  | When `true` (default), the directive unobserves the element after the first enter event so the animation plays only once. |
| `rootMargin` | `string`  | `'0px'` | IntersectionObserver rootMargin - margin around the root.                                                                 |
| `threshold`  | `number`  | `0.1`   | IntersectionObserver threshold - ratio of element visibility required to trigger (0-1).                                   |

### Outputs

| Name    | Type   | Description                                                                           |
| ------- | ------ | ------------------------------------------------------------------------------------- |
| `enter` | `void` | Emitted when the host element enters the viewport.                                    |
| `leave` | `void` | Emitted when the host element leaves the viewport. Only emitted when `once` is false. |

## Content Projection

_none_

## Theming

| CSS Variable                         | Default                                   |
| ------------------------------------ | ----------------------------------------- |
| `--uilib-animate-on-scroll-delay`    | `0ms`                                     |
| `--uilib-animate-on-scroll-distance` | `30px`                                    |
| `--uilib-animate-on-scroll-duration` | `var(--uilib-transition-duration, 600ms)` |
| `--uilib-animate-on-scroll-easing`   | `cubic-bezier(0.4, 0, 0.2, 1)`            |

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                                 |
| ---------------------------------------------------------------- |
| does not emit enter when reduced motion skips observer setup     |
| passes axe in the default state                                  |
| should add enterClass to the element when isIntersecting is true |
| should call unobserve after entering when once is true           |
| should emit the enter output when isIntersecting is true         |
| should not throw when enterClass is empty string                 |
| should remove enterClass when element leaves in repeat mode      |
| should remove leaveClass when element enters                     |

## Usage Examples

```html
<div class="uilib-aos-slide-up" uiLibAnimateOnScroll enterClass="uilib-aos-active">
  Animated content
</div>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#animate-on-scroll)
- [Demo page](/components/animate-on-scroll)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/animate-on-scroll/README.md)
