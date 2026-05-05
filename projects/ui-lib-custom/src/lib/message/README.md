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

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `close` | `void` | Emitted when the close button is activated; the caller is responsible for removing the message |

## Usage

```html
<!-- simple text message -->
<ui-lib-message severity="success" text="Operation completed successfully." />

<!-- closable warning with projected content -->
<ui-lib-message severity="warn" [closable]="true" (close)="showWarning = false">
  Unsaved changes will be <strong>lost</strong>.
</ui-lib-message>
```
