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
| `label` | `string \| null` | `null` | Accessible label for screen readers; dot badges fall back to the `color` value |

## Outputs

_none_

## Usage

```html
<!-- Inline text badge -->
<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>

<!-- Dot status indicator -->
<ui-lib-badge color="danger" [dot]="true" label="Error status" />

<!-- Decorative badge (ignored by assistive technology) -->
<ui-lib-badge [dot]="true" [decorative]="true" />
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
