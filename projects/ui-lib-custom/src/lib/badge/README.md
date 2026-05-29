# Badge

**Selector:** `ui-lib-badge`
**Package:** `ui-lib-custom/badge`
**Content projection:** yes — the badge text is projected content (e.g. `<ui-lib-badge>3</ui-lib-badge>`)

> Unlike PrimeNG Badge (which attaches as an overlay to a host element), this component is a standalone inline element; content is projected directly rather than passed as a `value` input.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'solid' \| 'outline' \| 'subtle' \| null` | `null` | Visual style; when null, mapped from global theme (`material`→`solid`, `bootstrap`→`outline`, `minimal`→`subtle`) |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Semantic color of the badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size token |
| `pill` | `boolean` | `false` | Makes the badge fully rounded (capsule shape) |
| `dot` | `boolean` | `false` | Renders a small circular indicator with no text; sets `role="status"` automatically |
| `decorative` | `boolean` | `false` | Marks the badge as decorative only; sets `aria-hidden="true"` and removes live/status semantics |
| `pulse` | `boolean` | `false` | Adds a pulsing glow animation to the dot badge (attention indicator). Only meaningful when `dot=true`. Suppressed by `prefers-reduced-motion`. |
| `label` | `string \| null` | `null` | Accessible label for screen readers. Dot badges fall back to the i18n `badge.status-indicator` key. |
| `styleClass` | `string \| null` | `null` | Additional CSS classes applied to the host element. |

## Outputs

_none_

## Usage

```html
<!-- Inline text badge -->
<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>

<!-- Dot status indicator -->
<ui-lib-badge color="danger" [dot]="true" label="Error status" />

<!-- Pulsing dot — live status, e.g. "online" indicator -->
<ui-lib-badge color="success" [dot]="true" [pulse]="true" label="Online" />

<!-- Decorative badge (ignored by assistive technology) -->
<ui-lib-badge [dot]="true" [decorative]="true" />

<!-- Extra CSS class -->
<ui-lib-badge color="info" styleClass="my-custom-badge">Beta</ui-lib-badge>
```

## Accessibility

### ARIA behavior

| State | Role | ARIA attributes |
|------|------|-----------------|
| Default text badge | _none_ | `aria-label` only when `label` is provided |
| Dot informational badge | `status` | `aria-label`, `aria-live="polite"`, `aria-atomic="true"` |
| Decorative badge | _none_ | `aria-hidden="true"` |

### Keyboard interaction

Badge is non-interactive and is not keyboard-focusable by default (`tabIndex = -1`).

### CSS custom properties

| Variable | Purpose |
|---------|---------|
| `--uilib-badge-bg-resolved` | Effective background color |
| `--uilib-badge-bg-subtle-resolved` | Effective subtle background color |
| `--uilib-badge-fg-resolved` | Effective foreground color |
| `--uilib-badge-border-color-resolved` | Effective border color |
| `--uilib-badge-border-width-resolved` | Effective border width |
| `--uilib-badge-radius-resolved` | Effective border radius |
| `--uilib-badge-font-size-resolved` | Effective font size |
| `--uilib-badge-dot-size` | Dot diameter in dot mode |
| `--uilib-badge-pulse-spread` | Glow spread radius of the pulse animation (default `4px`) |
| `--uilib-badge-pulse-duration` | Duration of one pulse cycle (default `1.5s`) |
| `--uilib-badge-pulse-color` | Glow colour of the pulse (defaults to the badge background) |

## Internationalisation

| i18n key | Default (en) | Overridden by |
|---|---|---|
| `badge.status-indicator` | `Status indicator` | `label` input (takes precedence over the i18n fallback) |

The key is only used as the `aria-label` fallback for unlabelled dot badges. Text badges display consumer-projected content and require no translation.
