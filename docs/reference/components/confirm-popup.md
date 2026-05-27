# Confirm Popup

**Selector:** `ui-lib-confirm-popup`
**Entry point:** `import { ConfirmPopup } from 'ui-lib-custom/confirm-popup'`

---

## Overview

ConfirmPopup — a lightweight anchored confirmation popup with accept/reject actions. Unlike ConfirmDialog, ConfirmPopup has no modal backdrop and anchors near the element that triggered it, with an arrow pointing at that element. Drive it programmatically via ConfirmPopupService or declaratively via inputs/outputs.

## API

### Inputs

| Name          | Type            | Default                               | Description                                                                    |
| ------------- | --------------- | ------------------------------------- | ------------------------------------------------------------------------------ |
| `acceptIcon`  | `string | null` | `null`                                | CSS class for an icon inside the accept button.                                |
| `acceptLabel` | `string`        | `'Yes'`                               | Accept button label.                                                           |
| `icon`        | `string | null` | `null`                                | CSS class for the icon rendered before the message.                            |
| `key`         | `string`        | `''`                                  | Key that matches incoming ConfirmPopupService calls to this specific instance. |
| `message`     | `string`        | `'Are you sure you want to proceed?'` | Confirmation message text (declarative fallback).                              |
| `rejectIcon`  | `string | null` | `null`                                | CSS class for an icon inside the reject button.                                |
| `rejectLabel` | `string`        | `'No'`                                | Reject button label.                                                           |
| `styleClass`  | `string | null` | `null`                                | Additional CSS classes applied to the host element.                            |

### Models (two-way bindable)

| Name      | Type      | Default | Description                                                            |
| --------- | --------- | ------- | ---------------------------------------------------------------------- |
| `visible` | `boolean` | `false` | Two-way visibility binding. Use `[(visible)]` for declarative control. |

### Outputs

| Name       | Type   | Description                                                            |
| ---------- | ------ | ---------------------------------------------------------------------- |
| `accepted` | `void` | Emitted when the user clicks the accept button.                        |
| `rejected` | `void` | Emitted when the user clicks the reject button or dismisses the popup. |

## Content Projection

_none_

## Theming

| CSS Variable                              | Default                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `--uilib-confirm-popup-arrow-size`        | `8px`                                                                                 |
| `--uilib-confirm-popup-bg`                | `var(--uilib-surface)`                                                                |
| `--uilib-confirm-popup-border`            | `0 solid transparent`                                                                 |
| `--uilib-confirm-popup-border-radius`     | `var(--uilib-radius-md, 6px)`                                                         |
| `--uilib-confirm-popup-btn-font-size`     | `var(--uilib-font-size-sm, 0.875rem)`                                                 |
| `--uilib-confirm-popup-btn-font-weight`   | `var(--uilib-font-weight-500, 500)`                                                   |
| `--uilib-confirm-popup-btn-padding`       | `var(--uilib-space-1-5, 0.375rem) var(--uilib-space-3, 0.75rem)`                      |
| `--uilib-confirm-popup-btn-radius`        | `var(--uilib-radius-md, 6px)`                                                         |
| `--uilib-confirm-popup-btn-warning-fg`    | `#1f2937`                                                                             |
| `--uilib-confirm-popup-content-padding`   | `var(--uilib-space-4, 1rem) var(--uilib-space-4, 1rem) var(--uilib-space-3, 0.75rem)` |
| `--uilib-confirm-popup-enter-duration`    | `180ms`                                                                               |
| `--uilib-confirm-popup-enter-easing`      | `cubic-bezier(0.16, 1, 0.3, 1)`                                                       |
| `--uilib-confirm-popup-footer-border-top` | `1px solid var(--uilib-border)`                                                       |
| `--uilib-confirm-popup-footer-gap`        | `var(--uilib-space-2, 0.5rem)`                                                        |
| `--uilib-confirm-popup-footer-padding`    | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)`                            |
| `--uilib-confirm-popup-icon-color`        | `var(--uilib-color-warning-500, #f59e0b)`                                             |
| `--uilib-confirm-popup-icon-size`         | `1.5rem`                                                                              |
| `--uilib-confirm-popup-shadow`            | `var(--uilib-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.15))`                          |
| `--uilib-confirm-popup-width`             | `20rem`                                                                               |
| `--uilib-confirm-popup-z-index`           | `var(--uilib-z-modal, 1050)`                                                          |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                   |
| ---------------------------------------------------------------------------------- |
| Escape closes the popup                                                            |
| accept button is present and focusable (defaultFocus=                              |
| arrow has aria-hidden=                                                             |
| axe passes in closed state                                                         |
| closed state passes axe                                                            |
| defaultFocus in service config takes precedence over component default             |
| focus is restored to service target when popup opened programmatically via service |
| focus is restored to trigger element when popup closes via Escape                  |
| focus is restored to trigger element when popup closes via accept button           |
| message icon has aria-hidden=                                                      |
| no role=                                                                           |
| open state passes axe (defaultFocus=                                               |
| overlay has aria-hidden=                                                           |
| panel aria-describedby resolves to message element                                 |
| panel aria-label equals the resolved message text                                  |
| panel has aria-modal=                                                              |
| panel has role=                                                                    |
| panel has tabindex=                                                                |
| reject button is present and focusable (defaultFocus=                              |
| service-driven open state passes axe                                               |
| service.close() closes popup and restores focus to trigger                         |
| service.confirm({ message }) opens popup with correct aria-label                   |
| should apply minimal variant class                                                 |
| should apply variant class to panel                                                |
| should close on Escape keydown                                                     |
| should link panel aria-describedby to message element                              |
| should not close on non-Escape keydown                                             |
| should render all severity variants                                                |
| should render the arrow element when visible                                       |
| should set aria-modal=                                                             |
| should set role=                                                                   |

## Usage Examples

Place the component once in your layout (e.g., app root). Trigger it from any component using `ConfirmPopupService.confirm()`, passing the event target for positioning.

```html
<!-- app.component.html -->
<ui-lib-confirm-popup />
```

```ts
// any.component.ts
constructor(private readonly confirmPopupService: ConfirmPopupService) {}

onDeleteClick(event: MouseEvent): void {
  this.confirmPopupService.confirm({
    target: event.currentTarget as HTMLElement,
    message: 'Are you sure you want to delete this item?',
    icon: 'pi pi-trash',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptSeverity: 'danger',
    accept: () => this.delete(),
  });
}
```

```html
<!-- trigger button -->
<button (click)="onDeleteClick($event)">Delete</button>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#confirm-popup)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/confirm-popup/README.md)

