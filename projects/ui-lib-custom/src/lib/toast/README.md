# Toast

**Selector:** `ui-lib-toast`
**Package:** `ui-lib-custom/toast`
**Content projection:** no — none

> Toast is driven entirely by `ToastService.add()` — place one `<ui-lib-toast />` instance in the app shell (outside the router outlet) and inject `ToastService` wherever you need to trigger a notification.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center' \| 'center'` | `'top-right'` | Screen position of the toast container |
| `life` | `number` | `3000` | Default auto-dismiss duration in ms; individual messages can override via their `life` property |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `key` | `string \| null` | `null` | When set, only messages with a matching `key` are shown; enables multiple toast regions |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |

## Outputs

_none_

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
