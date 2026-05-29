# AnimateOnScroll

**Selector:** `[uiLibAnimateOnScroll]` — directive
**Package:** `ui-lib-custom/animate-on-scroll`
**Content projection:** no — none

> The observer is created in `ngOnInit` with the values of `threshold` and `rootMargin` at that moment; changing these inputs after init has no effect. Silently no-ops when `IntersectionObserver` is unavailable (SSR / old browsers).
>
> **Accessibility first:** when `prefers-reduced-motion: reduce` is active, the directive skips all animation behavior and forces the element into a visible static state (`opacity: 1`, `transform: none`).

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `enterClass` | `string` | `''` | Space-separated CSS classes added when element enters viewport |
| `leaveClass` | `string` | `''` | Space-separated CSS classes added when element leaves; only used when `once` is `false` |
| `threshold` | `number` | `0.1` | Intersection ratio (0–1) required to trigger |
| `rootMargin` | `string` | `'0px'` | CSS margin around the intersection root |
| `once` | `boolean` | `true` | Unobserves after first enter; animation plays only once |
| `disabled` | `boolean` | `false` | When `true`, no observer is created |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `enter` | `void` | Emitted when host element enters the viewport |
| `leave` | `void` | Emitted when host element leaves the viewport (`once` must be `false`) |

## Usage

```html
<div class="uilib-aos-slide-up" uiLibAnimateOnScroll enterClass="uilib-aos-active">
  Animated content
</div>
```

## CSS Custom Properties

These tokens are scoped to the built-in preset classes (not `:root`). Override them on any ancestor element to customise or stagger animations.

| Property | Default | Description |
|----------|---------|-------------|
| `--uilib-animate-on-scroll-duration` | `600ms` | Transition duration for all preset animations. Set to `0ms` under `prefers-reduced-motion`. |
| `--uilib-animate-on-scroll-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Easing function for all preset transitions |
| `--uilib-animate-on-scroll-distance` | `30px` | Translate/scale offset for slide/zoom presets |
| `--uilib-animate-on-scroll-delay` | `0ms` | Per-element delay — override on individual elements to create stagger effects |

## Accessibility & Progressive Enhancement

- **Reduced motion (WCAG 2.3.3):** users with `prefers-reduced-motion: reduce` never get animated-in content. The directive exits early and keeps content visible.
- **No observer fallback:** if `IntersectionObserver` is unavailable, the directive avoids hidden states by forcing visible static presentation.
- **Built-in preset safety:** `animate-on-scroll.scss` includes a reduced-motion media query that disables transitions/animations and keeps preset classes visible.
- **Custom class guidance:** if you provide custom `enterClass`/`leaveClass`, keep your non-animated base state readable and visible so older/non-JS environments still render meaningful content.

## Threshold Guidance

- `threshold = 0`: triggers as soon as any pixel intersects.
- `threshold = 0.1` (default): good general-purpose balance.
- `threshold = 0.5` or higher: waits for more of the element to be visible before entering.
