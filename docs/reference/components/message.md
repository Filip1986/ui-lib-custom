# Message

**Selector:** `ui-lib-message`
**Entry point:** `import { Message } from 'ui-lib-custom/message'`

---

## Overview

Message component — inline severity-based status message with optional close action. Supports six severity levels (success, info, warn, error, secondary, contrast), three design variants (material, bootstrap, minimal), and three sizes (sm, md, lg). Content can be supplied via the `text` input or via content projection. The component exposes a stable `id` (via `messageId` input or auto-generated) so parent form controls can wire up `aria-describedby` for inline validation messages.

## API

### Inputs

| Name         | Type              | Default  | Description                                                    |
| ------------ | ----------------- | -------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `closable`   | `boolean`         | `false`  | When true, a close button is rendered.                         |
| `icon`       | `string           | null`    | `null`                                                         | Custom icon name to override the default severity icon. Accepts any semantic icon name from the icon library.                                                                                                             |
| `messageId`  | `string           | null`    | `null`                                                         | Optional explicit `id` for the host element. When omitted an auto-generated `ui-lib-message-{n}` id is used. Consumers should bind this to the same value they pass to `aria-describedby` on the associated form control. |
| `severity`   | `MessageSeverity` | `'info'` | Severity level — controls the colour palette and default icon. |
| `size`       | `MessageSize`     | `'md'`   | Size of the message.                                           |
| `styleClass` | `string           | null`    | `null`                                                         | Additional CSS class(es) to attach to the host element.                                                                                                                                                                   |
| `text`       | `string           | null`    | `null`                                                         | Optional text content. Can be combined with content projection or used standalone.                                                                                                                                        |
| `variant`    | `MessageVariant   | null`    | `null`                                                         | Design variant. When omitted, falls back to the global ThemeConfigService variant.                                                                                                                                        |

### Outputs

| Name    | Type   | Description                                 |
| ------- | ------ | ------------------------------------------- |
| `close` | `void` | Emitted when the close button is activated. |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                   | Default                            |
| ------------------------------ | ---------------------------------- |
| `--uilib-message-bg`           | `transparent`                      |
| `--uilib-message-border-color` | `transparent`                      |
| `--uilib-message-border-width` | `1px`                              |
| `--uilib-message-close-color`  | `currentColor`                     |
| `--uilib-message-fg`           | `inherit`                          |
| `--uilib-message-font-size-lg` | `1rem`                             |
| `--uilib-message-font-size-md` | `0.875rem`                         |
| `--uilib-message-font-size-sm` | `0.8125rem`                        |
| `--uilib-message-gap-lg`       | `0.625rem`                         |
| `--uilib-message-gap-md`       | `0.5rem`                           |
| `--uilib-message-gap-sm`       | `0.375rem`                         |
| `--uilib-message-icon-color`   | `currentColor`                     |
| `--uilib-message-padding-lg`   | `0.875rem 1.125rem`                |
| `--uilib-message-padding-md`   | `0.625rem 0.875rem`                |
| `--uilib-message-padding-sm`   | `0.375rem 0.625rem`                |
| `--uilib-message-radius`       | `var(--uilib-radius-md, 0.375rem)` |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/alert/

### Keyboard Interactions

| Test description                                   |
| -------------------------------------------------- |
| applies variant class for                          |
| has a stable auto-generated id on the host element |
| has aria-atomic=                                   |
| has aria-live=                                     |
| has role=                                          |
| passes axe for error severity                      |
| passes axe for info severity                       |
| passes axe for success severity                    |
| passes axe for warn severity                       |
| passes axe with closable button                    |
| sets aria-atomic=                                  |
| sets aria-live=                                    |
| severity icon is decorative (aria-hidden=          |
| uses role=                                         |

## Usage Examples

```html
<!-- simple text message -->
<ui-lib-message severity="success" text="Operation completed successfully." />

<!-- closable warning with projected content -->
<ui-lib-message severity="warn" [closable]="true" (closed)="showWarning = false">
  Unsaved changes will be <strong>lost</strong>.
</ui-lib-message>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#message)
- [Demo page](/components/message)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/message/README.md)
