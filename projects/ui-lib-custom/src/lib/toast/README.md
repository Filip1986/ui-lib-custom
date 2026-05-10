# Toast

**Selector:** `ui-lib-toast`
**Package:** `ui-lib-custom/toast`
**Content projection:** none — data-driven via `ToastService`

> Toast is driven entirely by `ToastService.add()`. Place one `<ui-lib-toast />` in your app shell
> (outside the router outlet) and inject `ToastService` from anywhere to trigger notifications.

---

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `position` | `ToastPosition` | `'top-right'` | Screen position of the toast container |
| `life` | `number` | `3000` | Default auto-dismiss duration in ms; per-message `life` overrides this |
| `variant` | `ToastVariant \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `key` | `string \| null` | `null` | When set, only messages with a matching `key` are displayed |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |

## Outputs

_none_

---

## ToastService API

| Method | Signature | Description |
|--------|-----------|-------------|
| `add` | `(message: ToastMessage) => void` | Enqueue a notification. Auto-generates an `id` if one is not provided. |
| `remove` | `(id: string) => void` | Remove a message by its ID (called automatically after exit animation). |
| `clear` | `(key?: string) => void` | Clear all messages, or only those matching `key`. |

### `ToastMessage` interface

| Property | Type | Default | Notes |
|----------|------|---------|-------|
| `id` | `string` | auto | Unique identifier — auto-generated when omitted |
| `key` | `string` | — | Routes the message to the container with the matching `key` |
| `severity` | `'success' \| 'info' \| 'warn' \| 'error'` | `'info'` | Controls colour palette and default icon |
| `summary` | `string` | — | Bold headline of the notification |
| `detail` | `string` | — | Body text of the notification |
| `life` | `number` | container `life` | Per-message auto-dismiss duration in ms |
| `sticky` | `boolean` | `false` | When `true`, never auto-dismisses |
| `closable` | `boolean` | `true` | When `false`, the close button is hidden |
| `icon` | `string` | severity default | Custom icon name overriding the severity default |
| `styleClass` | `string` | — | Extra CSS class(es) on the item element |

---

## Usage

```html
<!-- app.html — place once, outside the router outlet -->
<router-outlet />
<ui-lib-toast position="top-right" />
```

```ts
// any component that needs to show a notification
private readonly toastService = inject(ToastService);

this.toastService.add({ severity: 'success', summary: 'Saved', detail: 'Changes persisted.' });
this.toastService.add({ severity: 'error', summary: 'Failed', sticky: true });
```

### Multiple containers with keys

```html
<ui-lib-toast position="top-right" />
<ui-lib-toast position="bottom-left" key="system" />
```

```ts
// Routes to the bottom-left container only
this.toastService.add({ key: 'system', severity: 'warn', summary: 'Low disk space' });
```

---

## Accessibility

### ARIA features

| Feature | Implementation |
|---------|---------------|
| Container landmark | `role="region" aria-label="Notifications"` on the host element |
| Error announcements | `role="alert"` on `error` severity items — implies `aria-live="assertive"` |
| Polite announcements | `role="status"` on `success`, `info`, `warn` items — implies `aria-live="polite"` |
| No redundant live regions | Container has no `aria-live`; only items carry live-region semantics |
| Contextual close label | Close button: `aria-label="Dismiss: {summary}"` — distinct per notification |
| Decorative icons | Severity icon and close icon both carry `aria-hidden="true"` |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` collapses animation duration to `0ms` |

### ARIA design rationale

The WAI-ARIA pattern for toast notifications requires different urgency per severity:

- **`role="alert"`** (`aria-live="assertive"`) is reserved for `error` messages that demand immediate attention.
- **`role="status"`** (`aria-live="polite"`) is used for all other severities — the screen reader announces them at the next available opportunity without interrupting the user.

Mixing `role="alert"` with an explicit `aria-live="polite"` attribute is invalid — `role="alert"` always implies assertive. The container carries no `aria-live` to avoid creating a parent live region that conflicts with the item-level semantics.

### Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next interactive element (close button) |
| `Shift+Tab` | Move focus to the previous interactive element |
| `Enter` / `Space` | Activate the focused close button — dismisses that notification |

> Toast items are non-modal and non-blocking. Focus is never automatically moved into the toast container. Users reach the close button naturally via sequential Tab navigation.

### Consumer responsibilities

- Always provide a meaningful `summary` — it becomes part of the close button's `aria-label` (`"Dismiss: {summary}"`).
- Use `severity: 'error'` only for genuine errors requiring immediate attention; it maps to `aria-live="assertive"` and will interrupt the user.
- For notifications that must persist until the user takes action, set `sticky: true` so the message is not auto-dismissed before it is read.

---

## Design variants

| Variant | Character |
|---------|-----------|
| `material` | Elevated white/dark surface, coloured icons, no border |
| `bootstrap` | Coloured tinted background with border, matching severity palette |
| `minimal` | White/dark surface with a coloured left accent stripe |

---

## CSS custom properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uilib-toast-width` | `22rem` | Width of the toast container |
| `--uilib-toast-gap` | `0.5rem` | Vertical gap between stacked toasts |
| `--uilib-toast-z-index` | `var(--uilib-z-overlay, 1100)` | Stack order |
| `--uilib-toast-offset` | `1.25rem` | Distance from the viewport edge |
| `--uilib-toast-animation-duration` | `300ms` | Enter/exit animation duration |
| `--uilib-toast-item-padding` | `0.875rem 1rem` | Padding inside each item |
| `--uilib-toast-item-radius` | `var(--uilib-radius-md)` | Border radius of each item |
| `--uilib-toast-item-shadow` | `var(--uilib-shadow-lg)` | Box shadow of each item |
| `--uilib-toast-item-font-size` | `0.875rem` | Font size of item text |

---

## Public properties

| Property | Type | Description |
|----------|------|-------------|
| `effectiveVariant` | `Signal<ToastVariant>` | Resolved variant — own input or ThemeConfigService fallback |
| `visibleMessages` | `Signal<ToastMessage[]>` | Currently visible messages, filtered by `key` |
