# Message

**Selector:** `ui-lib-message`
**Package:** `ui-lib-custom/message`
**Content projection:** yes — default slot inside the message text area (can be used alongside or instead of the `text` input)

> Message supports two content strategies simultaneously: supply `text` as an input for simple strings, or project rich HTML into the default slot — both are rendered inside the same `<span>`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `severity` | `'success' \| 'info' \| 'warn' \| 'error' \| 'secondary' \| 'contrast'` | `'info'` | Controls colour palette and default icon |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size token |
| `text` | `string \| null` | `null` | Optional inline text content |
| `icon` | `string \| null` | `null` | Custom icon name; overrides the default severity icon |
| `closable` | `boolean` | `false` | Renders a close button when true |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `messageId` | `string \| null` | `null` | Explicit `id` for the host element. When omitted, an auto-generated `ui-lib-message-{n}` id is used. Pass the same value to `aria-describedby` on the associated form control for inline validation. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `close` | `void` | Emitted when the close button is activated; the caller is responsible for removing the message |

## Accessibility

| Severity | `role` | `aria-live` |
|----------|--------|-------------|
| `error`, `warn` | `alert` | `assertive` |
| `success`, `info`, `secondary`, `contrast` | `status` | `polite` |

`aria-atomic="true"` is always present so screen readers announce the full message on any update.

The severity icon is decorative and always carries `aria-hidden="true"`.

## Usage

```html
<!-- simple text message -->
<ui-lib-message severity="success" text="Operation completed successfully." />

<!-- closable warning with projected content -->
<ui-lib-message severity="warn" [closable]="true" (close)="showWarning = false">
  Unsaved changes will be <strong>lost</strong>.
</ui-lib-message>
```

### Inline form validation (`aria-describedby`)

Associate a `<ui-lib-message>` with a form field so screen readers announce the validation error when the field is focused:

```html
<!-- 1. Define a shared ID -->
<input
  id="email"
  type="email"
  [attr.aria-describedby]="emailError() ? 'email-error' : null"
  [attr.aria-invalid]="emailError() ? 'true' : null"
/>

<!-- 2. Pass the same ID via messageId -->
@if (emailError()) {
  <ui-lib-message
    messageId="email-error"
    severity="error"
    [text]="emailError()"
  />
}
```

## CSS Custom Properties

| Property | Default | Description |
|---|---|---|
| `--uilib-message-bg` | `transparent` | Background colour (overridden per severity) |
| `--uilib-message-fg` | `inherit` | Text colour (overridden per severity) |
| `--uilib-message-border-color` | `transparent` | Border colour (overridden per severity) |
| `--uilib-message-icon-color` | `currentColor` | Severity icon colour |
| `--uilib-message-close-color` | `currentColor` | Close button colour |
| `--uilib-message-radius` | `var(--uilib-radius-md, 0.375rem)` | Border radius |
| `--uilib-message-border-width` | `1px` | Border width |
| `--uilib-message-padding-sm` | `0.375rem 0.625rem` | Padding at `size="sm"` |
| `--uilib-message-padding-md` | `0.625rem 0.875rem` | Padding at `size="md"` (default) |
| `--uilib-message-padding-lg` | `0.875rem 1.125rem` | Padding at `size="lg"` |
| `--uilib-message-font-size-sm` | `0.8125rem` | Font size at `size="sm"` |
| `--uilib-message-font-size-md` | `0.875rem` | Font size at `size="md"` (default) |
| `--uilib-message-font-size-lg` | `1rem` | Font size at `size="lg"` |
| `--uilib-message-gap-sm` | `0.375rem` | Icon-to-content gap at `size="sm"` |
| `--uilib-message-gap-md` | `0.5rem` | Icon-to-content gap at `size="md"` (default) |
| `--uilib-message-gap-lg` | `0.625rem` | Icon-to-content gap at `size="lg"` |
| `--uilib-message-transition` | `var(--uilib-transition-fast, 150ms ease)` | Close button hover transition; zeroed by `prefers-reduced-motion` |

