# Alert

**Selector:** `ui-lib-alert`
**Package:** `ui-lib-custom/alert`
**Content projection:** yes — alert body text or arbitrary HTML projected into the message area

> When `variant` is omitted, the component inherits the active theme variant from `ThemeConfigService` — you do not need to set it explicitly in themed apps.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `severity` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Controls icon and colour treatment |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to theme service variant when `null` |
| `dismissible` | `boolean` | `false` | Renders a close icon; clicking it emits `dismissed` |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `dismissed` | `void` | Emitted when the user clicks the close icon; caller is responsible for removing the element |

## Usage

```html
<ui-lib-alert severity="warning" [dismissible]="true" (dismissed)="onClose()">
  Your session will expire in 5 minutes.
</ui-lib-alert>
```
