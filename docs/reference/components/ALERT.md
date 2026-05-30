# Alert

**Selector:** `ui-lib-alert`
**Entry point:** `import { Alert } from 'ui-lib-custom/alert'`

---

## Overview

Alert component for status messaging with optional dismiss action.

## API

### Inputs

| Name           | Type                  | Default  | Description |
| -------------- | --------------------- | -------- | ----------- |
| `dismissible`  | `boolean`             | `false`  | —           |
| `dismissLabel` | `string | null`       | `null`   | —           |
| `severity`     | `AlertSeverity`       | `'info'` | —           |
| `variant`      | `AlertVariant | null` | `null`   | —           |

### Outputs

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| `dismissed` | `void` | —           |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                            | Default                                             |
| --------------------------------------- | --------------------------------------------------- |
| `--uilib-alert-bg`                      | `var(--uilib-color-info-50, #eff6ff)`               |
| `--uilib-alert-border`                  | `1px solid var(--uilib-color-info-300, #93c5fd)`    |
| `--uilib-alert-border-radius`           | `var(--uilib-radius-md, 8px)`                       |
| `--uilib-alert-close-btn-bg`            | `transparent`                                       |
| `--uilib-alert-close-btn-bg-active`     | `rgba(0, 0, 0, 0.14)`                               |
| `--uilib-alert-close-btn-bg-hover`      | `rgba(0, 0, 0, 0.08)`                               |
| `--uilib-alert-close-btn-border-radius` | `var(--uilib-radius-sm, 4px)`                       |
| `--uilib-alert-error-bg`                | `var(--uilib-color-danger-50, #fef2f2)`             |
| `--uilib-alert-error-border`            | `1px solid var(--uilib-color-danger-300, #fca5a5)`  |
| `--uilib-alert-error-fg`                | `var(--uilib-color-danger-700, #b91c1c)`            |
| `--uilib-alert-fg`                      | `var(--uilib-color-info-700, #1d4ed8)`              |
| `--uilib-alert-gap`                     | `var(--uilib-inline-sm, 0.5rem)`                    |
| `--uilib-alert-info-bg`                 | `var(--uilib-color-info-50, #eff6ff)`               |
| `--uilib-alert-info-border`             | `1px solid var(--uilib-color-info-300, #93c5fd)`    |
| `--uilib-alert-info-fg`                 | `var(--uilib-color-info-700, #1d4ed8)`              |
| `--uilib-alert-padding`                 | `var(--uilib-inline-md, 1rem)`                      |
| `--uilib-alert-shadow`                  | `none`                                              |
| `--uilib-alert-success-bg`              | `var(--uilib-color-success-50, #f0fdf4)`            |
| `--uilib-alert-success-border`          | `1px solid var(--uilib-color-success-300, #86efac)` |
| `--uilib-alert-success-fg`              | `var(--uilib-color-success-700, #15803d)`           |
| `--uilib-alert-transition`              | `var(--uilib-transition-fast, 150ms ease)`          |
| `--uilib-alert-warning-bg`              | `var(--uilib-color-warning-50, #fffbeb)`            |
| `--uilib-alert-warning-border`          | `1px solid var(--uilib-color-warning-300, #fcd34d)` |
| `--uilib-alert-warning-fg`              | `var(--uilib-color-warning-700, #b45309)`           |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

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

