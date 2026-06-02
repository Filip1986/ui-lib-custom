# Alert

**Selector:** `ui-lib-alert`
**Entry point:** `import { Alert } from 'ui-lib-custom/alert'`

---

## Overview

Alert component for status messaging with optional dismiss action.

## API

### Inputs

| Name           | Type            | Default  | Description |
| -------------- | --------------- | -------- | ----------- | --- |
| `dismissible`  | `boolean`       | `false`  | —           |
| `dismissLabel` | `string         | null`    | `null`      | —   |
| `severity`     | `AlertSeverity` | `'info'` | —           |
| `variant`      | `AlertVariant   | null`    | `null`      | —   |

### Outputs

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| `dismissed` | `void` | —           |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable       | Default                |
| ------------------ | ---------------------- |
| `--uilib-alert-bg` | `var(--uilib-surface)` |
| `--uilib-alert-fg` | `currentColor`         |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/alert/

### Keyboard Interactions

| Test description                                                |
| --------------------------------------------------------------- |
| applies dark theme variables                                    |
| close button has native button semantics and default aria-label |
| includes variant class for                                      |
| passes axe for error severity                                   |
| passes axe for info severity                                    |
| passes axe for success severity                                 |
| passes axe for warning severity                                 |
| sets aria-atomic=                                               |
| uses explicit variant input when provided                       |
| uses global theme variant when no variant input provided        |
| uses global variant when no variant input provided              |
| uses role=                                                      |

## Usage Examples

```html
<ui-lib-alert severity="warning" [dismissible]="true" (dismissed)="onClose()">
  Your session will expire in 5 minutes.
</ui-lib-alert>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#alert)
- [Demo page](/components/alert)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/alert/README.md)
