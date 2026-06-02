# Toast

**Selector:** `ui-lib-toast`
**Package:** `ui-lib-custom/toast`
**Content projection:** no — none

> Toast is driven entirely by `ToastService.add()` — place one `<ui-lib-toast />` instance in the app shell (outside the router outlet) and inject `ToastService` wherever you need to trigger a notification.

## Inputs

| Name         | Type                                                                                              | Default       | Notes                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| `position`   | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Screen position of the toast container                                                          |
| `life`       | `number`                                                                                          | `3000`        | Default auto-dismiss duration in ms; individual messages can override via their `life` property |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null`                                                  | `null`        | Falls back to `ThemeConfigService` global variant when null                                     |
| `key`        | `string \| null`                                                                                  | `null`        | When set, only messages with a matching `key` are shown; enables multiple toast regions         |
| `styleClass` | `string \| null`                                                                                  | `null`        | Additional CSS class(es) on the host element                                                    |

## Outputs

_none_

## `ToastMessage` Interface

| Property     | Type                                       | Default          | Description                                                |
| ------------ | ------------------------------------------ | ---------------- | ---------------------------------------------------------- |
| `id`         | `string \| undefined`                      | auto-generated   | Unique identifier. Auto-generated if omitted.              |
| `key`        | `string \| undefined`                      | —                | Routes this message to the matching `Toast` container key. |
| `severity`   | `'success' \| 'info' \| 'warn' \| 'error'` | `'info'`         | Controls colour palette and default icon.                  |
| `summary`    | `string \| undefined`                      | —                | Bold headline text shown above detail.                     |
| `detail`     | `string \| undefined`                      | —                | Body text for the notification.                            |
| `life`       | `number \| undefined`                      | container `life` | Auto-dismiss duration ms — overrides container default.    |
| `sticky`     | `boolean \| undefined`                     | `false`          | When true, the toast never auto-dismisses.                 |
| `closable`   | `boolean \| undefined`                     | `true`           | When false, the dismiss button is hidden.                  |
| `icon`       | `string \| undefined`                      | severity default | Custom icon name — overrides the severity default.         |
| `styleClass` | `string \| undefined`                      | —                | Additional CSS class(es) on the item element.              |

## Usage

```html
<!-- app.component.html — place once, outside the router outlet -->
<router-outlet />
<ui-lib-toast position="top-right" />
```

```ts
// any component that needs to show a notification
private readonly toastService = inject(ToastService);

this.toastService.add({ severity: 'success', summary: 'Saved', detail: 'Changes persisted.' });
this.toastService.add({ severity: 'error', summary: 'Failed', sticky: true });
```

## Multiple Containers Pattern

Use the `key` input to route messages to specific toast containers — useful when you need
notifications in different screen regions simultaneously.

```html
<!-- App shell — two toast regions -->
<ui-lib-toast position="top-right" key="global" />
<ui-lib-toast position="bottom-center" key="form-feedback" />
```

```typescript
// Route to specific container
toastService.add({ key: 'form-feedback', severity: 'error', summary: 'Validation failed' });
toastService.add({ key: 'global', severity: 'success', summary: 'Profile saved' });
```

## Notification Lifecycle

1. **Enter** — `ToastService.add()` inserts a message into the signal queue; the component renders it and plays the `uilib-toast-enter` keyframe animation.
2. **Auto-dismiss** — After `life` ms (or `message.life` if overridden), `dismiss()` is called automatically (skipped for `sticky: true` messages).
3. **Exit** — `dismiss()` applies the `--closing` CSS class which plays the `uilib-toast-exit` keyframe, then removes the message from the service after `300ms`.

## CSS Custom Properties

| Property                           | Default                            | Description                                                                                     |
| ---------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--uilib-toast-width`              | `22rem`                            | Width of the toast container                                                                    |
| `--uilib-toast-gap`                | `0.5rem`                           | Gap between stacked toasts                                                                      |
| `--uilib-toast-z-index`            | `var(--uilib-z-overlay, 1100)`     | Stack order                                                                                     |
| `--uilib-toast-offset`             | `1.25rem`                          | Distance from screen edge                                                                       |
| `--uilib-toast-animation-duration` | `300ms`                            | Enter/exit animation duration (set to `0ms` automatically for `prefers-reduced-motion: reduce`) |
| `--uilib-toast-item-padding`       | `0.875rem 1rem`                    | Inner padding of each item                                                                      |
| `--uilib-toast-item-radius`        | `var(--uilib-radius-md, 0.375rem)` | Item corner radius                                                                              |
| `--uilib-toast-item-font-size`     | `0.875rem`                         | Item text size                                                                                  |

## Accessibility

### ARIA features

| Feature                      | Detail                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `role="region"`              | Applied to the `<ui-lib-toast>` host element — identifies the notification area as a page landmark.                                                                                                                 |
| `aria-label="Notifications"` | Names the region for screen reader landmark navigation.                                                                                                                                                             |
| `role="alert"`               | Applied to **error** severity items — implies `aria-live="assertive"` and `aria-atomic="true"`. Screen readers interrupt immediately to announce the content.                                                       |
| `role="status"`              | Applied to **success**, **info**, and **warn** items — implies `aria-live="polite"` and `aria-atomic="true"`. Screen readers announce when idle.                                                                    |
| Close button `aria-label`    | `"Dismiss: {summary}"` — includes the notification summary so users can identify which toast they are closing when multiple toasts are visible. Falls back to `"Dismiss: {detail}"` then `"Dismiss: notification"`. |
| Icon `aria-hidden`           | The severity icon and close button icon are both `aria-hidden="true"` — they are decorative and convey no additional information to screen reader users beyond what the text provides.                              |
| Reduced motion               | `@media (prefers-reduced-motion: reduce)` sets `--uilib-toast-animation-duration: 0ms` — slide animations are disabled for users who prefer reduced motion.                                                         |

> **Note:** The container (`<ui-lib-toast>`) does **not** have `aria-live` or `aria-atomic` — `role="region"` is a structural landmark, not a live region. Each child item manages its own announcement urgency via `role="alert"` or `role="status"`, both of which imply `aria-atomic="true"`.

### Keyboard navigation

| Key               | Behaviour                                                                            |
| ----------------- | ------------------------------------------------------------------------------------ |
| Tab               | Cycles through visible dismiss buttons (one per closable toast)                      |
| Enter / Space     | Activates the focused dismiss button — starts exit animation, then removes the toast |
| No Escape handler | Toasts are non-modal — no global Escape handler needed. Focus is never trapped.      |

### Severity and urgency

- **Error** → `role="alert"` — assertive, interrupts immediately. Use for failures requiring immediate user attention.
- **Warn / Info / Success** → `role="status"` — polite, waits for a pause. Use for confirmations and informational messages.
- Do **not** misuse `role="alert"` for routine confirmations — it is reserved for genuinely critical information.
