# Alert

**Selector:** `ui-lib-alert`
**Package:** `ui-lib-custom/alert`
**Content projection:** yes — alert body text or arbitrary HTML projected into the message area

> When `variant` is omitted, the component inherits the active theme variant from `ThemeConfigService` — you do not need to set it explicitly in themed apps.

## Inputs

| Name           | Type                                             | Default  | Notes                                                                       |
| -------------- | ------------------------------------------------ | -------- | --------------------------------------------------------------------------- |
| `severity`     | `'success' \| 'error' \| 'warning' \| 'info'`    | `'info'` | Controls icon and colour treatment                                          |
| `variant`      | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Falls back to theme service variant when `null`                             |
| `dismissible`  | `boolean`                                        | `false`  | Renders a close icon; clicking it emits `dismissed`                         |
| `dismissLabel` | `string \| null`                                 | `null`   | Optional i18n label for the dismiss button. Falls back to `"Dismiss alert"` |

## Outputs

| Name        | Payload | Notes                                                                                       |
| ----------- | ------- | ------------------------------------------------------------------------------------------- |
| `dismissed` | `void`  | Emitted when the user clicks the close icon; caller is responsible for removing the element |

## Usage

```html
<ui-lib-alert severity="warning" [dismissible]="true" (dismissed)="onClose()">
  Your session will expire in 5 minutes.
</ui-lib-alert>
```

## Severity & Live Region Behavior

| Severity  | Role     | `aria-live` |
| --------- | -------- | ----------- |
| `error`   | `alert`  | `assertive` |
| `warning` | `alert`  | `assertive` |
| `success` | `status` | `polite`    |
| `info`    | `status` | `polite`    |

The host always sets `aria-atomic="true"` so screen readers announce the full message when text updates.

## Accessibility Notes

- The severity icon is decorative and uses `aria-hidden="true"`.
- The dismiss button uses a native `<button type="button">` and always has an accessible name.
- Use `dismissLabel` for localization/i18n in non-English applications.

## CSS Custom Properties

All token defaults are for the `info` severity. Severity modifier classes override the three surface tokens; variant classes override structural tokens only.

| Variable                                | Default                                          | Purpose                                                       |
| --------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| `--uilib-alert-bg`                      | `var(--uilib-color-info-50, #eff6ff)`            | Alert surface background                                      |
| `--uilib-alert-fg`                      | `var(--uilib-color-info-700, #1d4ed8)`           | Alert text/icon colour                                        |
| `--uilib-alert-border`                  | `1px solid var(--uilib-color-info-300, #93c5fd)` | Alert border                                                  |
| `--uilib-alert-border-radius`           | `var(--uilib-radius-md, 8px)`                    | Corner radius                                                 |
| `--uilib-alert-shadow`                  | `none`                                           | Box shadow (material variant adds elevation)                  |
| `--uilib-alert-padding`                 | `var(--uilib-inline-md, 1rem)`                   | Inner padding                                                 |
| `--uilib-alert-gap`                     | `var(--uilib-inline-sm, 0.5rem)`                 | Gap between icon / content / close button                     |
| `--uilib-alert-info-bg`                 | `var(--uilib-color-info-50, #eff6ff)`            | Info severity background override                             |
| `--uilib-alert-info-fg`                 | `var(--uilib-color-info-700, #1d4ed8)`           | Info severity foreground override                             |
| `--uilib-alert-success-bg`              | `var(--uilib-color-success-50, #f0fdf4)`         | Success severity background override                          |
| `--uilib-alert-success-fg`              | `var(--uilib-color-success-700, #15803d)`        | Success severity foreground override                          |
| `--uilib-alert-warning-bg`              | `var(--uilib-color-warning-50, #fffbeb)`         | Warning severity background override                          |
| `--uilib-alert-warning-fg`              | `var(--uilib-color-warning-700, #b45309)`        | Warning severity foreground override                          |
| `--uilib-alert-error-bg`                | `var(--uilib-color-danger-50, #fef2f2)`          | Error severity background override                            |
| `--uilib-alert-error-fg`                | `var(--uilib-color-danger-700, #b91c1c)`         | Error severity foreground override                            |
| `--uilib-alert-close-btn-bg-hover`      | `rgba(0,0,0,0.08)`                               | Dismiss button hover background                               |
| `--uilib-alert-close-btn-bg-active`     | `rgba(0,0,0,0.14)`                               | Dismiss button pressed background                             |
| `--uilib-alert-close-btn-border-radius` | `var(--uilib-radius-sm, 4px)`                    | Dismiss button corner radius                                  |
| `--uilib-alert-transition`              | `var(--uilib-transition-fast, 150ms ease)`       | Dismiss button transition; zeroed by `prefers-reduced-motion` |
