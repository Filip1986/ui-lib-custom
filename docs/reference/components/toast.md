# Toast

**Selector:** `ui-lib-toast`
**Entry point:** `import { Toast } from 'ui-lib-custom/toast'`

---

## Overview

Toast component — fixed-position notification overlay driven by ToastService. Place one instance in your app shell template (outside the router outlet). Call ToastService.add() from anywhere in the app to display a notification.

## API

### Inputs

| Name         | Type            | Default       | Description                                                                                                         |
| ------------ | --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `key`        | `string         | null`         | `null`                                                                                                              | Container key — when set, only messages with a matching `key` are displayed. Use multiple Toast containers with different keys for different screen regions. |
| `life`       | `number`        | `3000`        | Default auto-dismiss duration in milliseconds. Individual messages can override this via their own `life` property. |
| `position`   | `ToastPosition` | `'top-right'` | Screen position of the toast container.                                                                             |
| `styleClass` | `string         | null`         | `null`                                                                                                              | Additional CSS class(es) to attach to the host element.                                                                                                      |
| `variant`    | `ToastVariant   | null`         | `null`                                                                                                              | Design variant. When null, falls back to the global ThemeConfigService variant.                                                                              |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                       | Default                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--uilib-toast-animation-duration` | `300ms`                                                                                         |
| `--uilib-toast-detail-font-size`   | `0.875em`                                                                                       |
| `--uilib-toast-gap`                | `0.5rem`                                                                                        |
| `--uilib-toast-item-bg`            | `var(--uilib-surface, #ffffff)`                                                                 |
| `--uilib-toast-item-border-color`  | `transparent`                                                                                   |
| `--uilib-toast-item-border-width`  | `1px`                                                                                           |
| `--uilib-toast-item-close-color`   | `currentColor`                                                                                  |
| `--uilib-toast-item-fg`            | `inherit`                                                                                       |
| `--uilib-toast-item-font-size`     | `0.875rem`                                                                                      |
| `--uilib-toast-item-gap`           | `0.625rem`                                                                                      |
| `--uilib-toast-item-icon-color`    | `currentColor`                                                                                  |
| `--uilib-toast-item-padding`       | `0.875rem 1rem`                                                                                 |
| `--uilib-toast-item-radius`        | `var(--uilib-radius-md, 0.375rem)`                                                              |
| `--uilib-toast-item-shadow`        | `var( --uilib-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.1) )` |
| `--uilib-toast-offset`             | `1.25rem`                                                                                       |
| `--uilib-toast-slide-x`            | `1rem`                                                                                          |
| `--uilib-toast-slide-y`            | `0rem`                                                                                          |
| `--uilib-toast-width`              | `22rem`                                                                                         |
| `--uilib-toast-z-index`            | `var(--uilib-z-overlay, 1100)`                                                                  |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/alert/

### Keyboard Interactions

| Test description                                                                      |
| ------------------------------------------------------------------------------------- |
| should NOT have aria-atomic attribute on the host element                             |
| should NOT have aria-live attribute on items (role drives announcement urgency)       |
| should NOT have aria-live attribute on the host element                               |
| should apply the variant class when variant is set                                    |
| should dismiss the toast when the close button is activated via click (Enter/Space)   |
| should give each close button a distinct aria-label when multiple toasts are visible  |
| should have aria-hidden=                                                              |
| should have aria-label=                                                               |
| should have role=                                                                     |
| should have the close button focusable (no tabindex=-1 or disabled)                   |
| should include summary in the close button aria-label for a sticky toast              |
| should include the message summary in the close button aria-label                     |
| should not have aria-live attribute on toast items (role drives announcement urgency) |
| should pass axe — empty state (no toasts)                                             |
| should pass axe — sticky toast with closable=false                                    |
| should pass axe — with error toast visible                                            |
| should pass axe — with multiple mixed-severity toasts visible                         |
| should pass axe — with success toast visible                                          |
| should set role=                                                                      |
| should use detail as fallback aria-label when summary is absent                       |
| should use role=                                                                      |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#toast)
- [Demo page](/components/toast)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/toast/README.md)
