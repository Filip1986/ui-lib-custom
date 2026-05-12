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
| `dismissLabel` | `string \| null` | `null` | Optional i18n label for the dismiss button. Falls back to `"Dismiss alert"` |

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

## Severity & Live Region Behavior

| Severity | Role | `aria-live` |
|----------|------|-------------|
| `error` | `alert` | `assertive` |
| `warning` | `alert` | `assertive` |
| `success` | `status` | `polite` |
| `info` | `status` | `polite` |

The host always sets `aria-atomic="true"` so screen readers announce the full message when text updates.

## Accessibility Notes

- The severity icon is decorative and uses `aria-hidden="true"`.
- The dismiss button uses a native `<button type="button">` and always has an accessible name.
- Use `dismissLabel` for localization/i18n in non-English applications.

## CSS Custom Properties

| Variable | Purpose |
|----------|---------|
| `--uilib-alert-bg` | Alert background color |
| `--uilib-alert-fg` | Alert foreground/text color |
