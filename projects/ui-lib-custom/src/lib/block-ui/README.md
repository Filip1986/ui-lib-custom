# BlockUI

**Selector:** `ui-lib-block-ui`
**Package:** `ui-lib-custom/block-ui`
**Content projection:** yes — default slot for the protected content; `[blockTemplate]` attribute selector for custom mask content (e.g. a spinner) shown when blocked

> `blocked` is a `model()` signal (two-way bindable via `[(blocked)]`). Setting it to `true` overlays the mask and applies `inert` to the protected content, preventing keyboard focus from entering the blocked area.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `blocked` | `boolean` | `false` | Two-way bindable via `[(blocked)]`; toggles the overlay mask |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `baseZIndex` | `number` | `0` | Base z-index for the mask layer; `0` uses the CSS variable default |

## Outputs

_none_

## CSS Custom Properties

| Property | Default | Notes |
|----------|---------|-------|
| `--uilib-block-ui-mask-bg` | `rgba(0,0,0,0.4)` | Mask background colour (overridden per variant) |
| `--uilib-block-ui-mask-bg-material` | `rgba(0,0,0,0.3)` | Mask colour for the `material` variant |
| `--uilib-block-ui-mask-bg-bootstrap` | `rgba(0,0,0,0.5)` | Mask colour for the `bootstrap` variant |
| `--uilib-block-ui-mask-bg-minimal` | `rgba(0,0,0,0.15)` | Mask colour for the `minimal` variant |
| `--uilib-block-ui-transition-duration` | `0.2s` | Fade duration; overridden to `0` under `prefers-reduced-motion` |
| `--uilib-block-ui-transition` | `opacity var(…) ease` | Full transition shorthand |
| `--uilib-block-ui-z-index` | `var(--uilib-z-overlay, 100)` | Z-index of the mask layer |

## ARIA Attributes

| Element | Attribute | When |
|---------|-----------|------|
| `ui-lib-block-ui` (host) | `aria-busy="true"` | `blocked = true` |
| `ui-lib-block-ui` (host) | `aria-busy="false"` | `blocked = false` |
| `ui-lib-block-ui` (host) | `aria-disabled="true"` | `blocked = true` (attribute removed when false) |
| `.ui-lib-block-ui__mask` | `role="status"` | always |
| `.ui-lib-block-ui__mask` | `aria-live="polite"` | always |
| `.ui-lib-block-ui__mask` | `aria-hidden="true"` | `blocked = false` (attribute removed when blocked) |
| `.ui-lib-block-ui__content` | `inert=""` | `blocked = true` (attribute removed when false) |

## Keyboard Interaction

| Interaction | Behaviour |
|-------------|-----------|
| `Tab` / `Shift+Tab` | Keyboard focus cannot enter the blocked content while `blocked = true` — the content wrapper receives `inert`, making all descendants non-focusable |
| Any key | No special handling on the mask overlay; all standard keyboard interactions remain available outside the blocked area |

## Accessibility Notes

- **Focus prevention:** The protected content wrapper (`div.ui-lib-block-ui__content`) receives the `inert` HTML attribute when `blocked = true`. This prevents all interactive descendants (buttons, links, inputs) from receiving keyboard focus or pointer events.
- **Live region:** The mask element carries `role="status"` and `aria-live="polite"`. Screen readers will announce any text projected via `[blockTemplate]` when the component becomes blocked (e.g. "Loading…").
- **`aria-busy`:** Signals to assistive technologies that the container is still loading/processing, suppressing interaction expectations on the blocked area.
- **`aria-disabled`:** Additional signal that the interactive elements within the container are currently unavailable, complementing the `inert` focus trap.
- **Reduced motion:** The opacity transition is disabled when the user's OS preference is `prefers-reduced-motion: reduce`.

## Usage

```html
<!-- basic usage — toggle blocked state from the parent -->
<ui-lib-block-ui [(blocked)]="isLoading">
  <p>Protected content</p>
</ui-lib-block-ui>

<!-- custom mask content with a spinner -->
<ui-lib-block-ui [(blocked)]="isSaving">
  <form>...</form>
  <span blockTemplate>
    <ui-lib-spinner /> Saving…
  </span>
</ui-lib-block-ui>
```

