# AnimateOnScroll

**Selector:** `[uiLibAnimateOnScroll]` — directive
**Package:** `ui-lib-custom/animate-on-scroll`
**Content projection:** no — none

> The observer is created in `ngOnInit` with the values of `threshold` and `rootMargin` at that moment; changing these inputs after init has no effect. Silently no-ops when `IntersectionObserver` is unavailable (SSR / old browsers).

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
