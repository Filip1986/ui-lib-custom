# Confirm Dialog

**Selector:** `ui-lib-confirm-dialog`
**Entry point:** `import { ConfirmDialog } from 'ui-lib-custom/confirm-dialog'`

---

## Overview

ConfirmDialog — a modal confirmation overlay with configurable accept/reject actions.

Can be driven declaratively via inputs/outputs or programmatically via ConfirmationService.
Place `<ui-lib-confirm-dialog>` once in your layout; trigger it from any component using
`ConfirmationService.confirm({ ... })`.

@example
<!-- In template -->
<ui-lib-confirm-dialog />

<!-- In component -->
this.confirmationService.confirm({
  header: 'Confirm Delete',
  message: 'This action cannot be undone.',
  accept: () => this.delete(),
});

## API

### Inputs

| Name              | Type            | Default                               | Description                                                                               |
| ----------------- | --------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `acceptIcon`      | `string | null` | `null`                                | /** CSS class for an icon inside the accept button.                                       |
| `acceptLabel`     | `string`        | `'Yes'`                               | /** Accept button label.                                                                  |
| `blockScroll`     | `boolean`       | `true`                                | /** Whether body scroll is locked while the dialog is open.                               |
| `closable`        | `boolean`       | `true`                                | /** Whether the close (×) button is rendered in the header.                               |
| `dismissableMask` | `boolean`       | `false`                               | /** Whether clicking the backdrop closes the dialog (invoking reject).                    |
| `header`          | `string`        | `'Confirmation'`                      | /** Dialog header / title text (declarative fallback).                                    |
| `icon`            | `string | null` | `null`                                | /** CSS class for the icon rendered before the message.                                   |
| `key`             | `string`        | `''`                                  | /** Key that matches incoming ConfirmationService calls to this specific dialog instance. |
| `message`         | `string`        | `'Are you sure you want to proceed?'` | /** Confirmation message text (declarative fallback).                                     |
| `rejectIcon`      | `string | null` | `null`                                | /** CSS class for an icon inside the reject button.                                       |
| `rejectLabel`     | `string`        | `'No'`                                | /** Reject button label.                                                                  |
| `styleClass`      | `string | null` | `null`                                | /** Additional CSS classes applied to the host element.                                   |

### Models (two-way bindable)

| Name      | Type      | Default | Description                                                                |
| --------- | --------- | ------- | -------------------------------------------------------------------------- |
| `visible` | `boolean` | `false` | /** Two-way visibility binding. Use `[(visible)]` for declarative control. |

### Outputs

| Name       | Type   | Description                                                              |
| ---------- | ------ | ------------------------------------------------------------------------ |
| `accepted` | `void` | /** Emitted when the user clicks the accept button.                      |
| `rejected` | `void` | /** Emitted when the user clicks the reject button or closes the dialog. |

## Content Projection

_none_

## Theming

| CSS Variable                                     | Default                                                    |
| ------------------------------------------------ | ---------------------------------------------------------- |
| `--uilib-confirm-dialog-backdrop-enter-duration` | `150ms`                                                    |
| `--uilib-confirm-dialog-backdrop-enter-easing`   | `ease-out`                                                 |
| `--uilib-confirm-dialog-bg`                      | `var(--uilib-surface)`                                     |
| `--uilib-confirm-dialog-border`                  | `0 solid transparent`                                      |
| `--uilib-confirm-dialog-border-radius`           | `var(--uilib-radius-lg, 8px)`                              |
| `--uilib-confirm-dialog-btn-font-size`           | `var(--uilib-font-size-sm, 0.875rem)`                      |
| `--uilib-confirm-dialog-btn-font-weight`         | `var(--uilib-font-weight-500, 500)`                        |
| `--uilib-confirm-dialog-btn-padding`             | `var(--uilib-space-2, 0.5rem) var(--uilib-space-4, 1rem)`  |
| `--uilib-confirm-dialog-btn-radius`              | `var(--uilib-radius-md, 6px)`                              |
| `--uilib-confirm-dialog-btn-warning-fg`          | `#1f2937`                                                  |
| `--uilib-confirm-dialog-close-btn-color`         | `var(--uilib-muted)`                                       |
| `--uilib-confirm-dialog-close-btn-hover-bg`      | `var(--uilib-surface-alt)`                                 |
| `--uilib-confirm-dialog-close-btn-size`          | `2rem`                                                     |
| `--uilib-confirm-dialog-content-padding`         | `var(--uilib-space-5, 1.25rem)`                            |
| `--uilib-confirm-dialog-enter-duration`          | `200ms`                                                    |
| `--uilib-confirm-dialog-enter-easing`            | `ease-out`                                                 |
| `--uilib-confirm-dialog-footer-border-top`       | `1px solid var(--uilib-border)`                            |
| `--uilib-confirm-dialog-footer-gap`              | `var(--uilib-space-2, 0.5rem)`                             |
| `--uilib-confirm-dialog-footer-padding`          | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)` |
| `--uilib-confirm-dialog-header-bg`               | `var(--uilib-surface-alt)`                                 |
| `--uilib-confirm-dialog-header-color`            | `var(--uilib-page-fg)`                                     |
| `--uilib-confirm-dialog-header-font-size`        | `var(--uilib-font-size-lg, 1.125rem)`                      |
| `--uilib-confirm-dialog-header-font-weight`      | `var(--uilib-font-weight-500, 500)`                        |
| `--uilib-confirm-dialog-header-padding`          | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)` |
| `--uilib-confirm-dialog-icon-color`              | `var(--uilib-color-warning-500, #f59e0b)`                  |
| `--uilib-confirm-dialog-icon-size`               | `2rem`                                                     |
| `--uilib-confirm-dialog-shadow`                  | `var(--uilib-shadow-lg, none)`                             |
| `--uilib-confirm-dialog-width`                   | `min(100%, 30rem)`                                         |
| `--uilib-confirm-dialog-z-index`                 | `var(--uilib-z-modal, 1050)`                               |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                         |
| ------------------------------------------------------------------------ |
| Escape closes the dialog                                                 |
| axe passes in closed state                                               |
| backdrop has aria-hidden=                                                |
| close button (closable=true) has aria-label=                             |
| close button icon has aria-hidden=                                       |
| closed state passes axe                                                  |
| defaultFocus in service config takes precedence over component default   |
| defaultFocus=                                                            |
| focus is restored to trigger element when dialog closes via Escape       |
| focus is restored to trigger element when dialog closes via accept       |
| no role=                                                                 |
| open state passes axe (defaultFocus=                                     |
| open state with service-driven config passes axe                         |
| panel aria-describedby resolves to message element                       |
| panel aria-labelledby resolves to header text element                    |
| panel has aria-modal=                                                    |
| panel has role=                                                          |
| service.close() closes the dialog and restores focus to trigger          |
| service.confirm({ header, message }) opens dialog with correct ARIA text |
| should apply variant class to panel                                      |
| should close on Escape key                                               |
| should set aria-describedby pointing to message id                       |
| should set aria-labelledby pointing to header id                         |
| should set aria-modal=                                                   |
| should set role=                                                         |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#confirm-dialog)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/confirm-dialog/README.md)

