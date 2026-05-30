# Dialog

**Selector:** `ui-lib-dialog`
**Entry point:** `import { Dialog } from 'ui-lib-custom/dialog'`

---

## Overview

Dialog component with modal/backdrop and responsive behavior.

## API

### Inputs

| Name              | Type                        | Default                            | Description                                                                         |
| ----------------- | --------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `ariaDescribedBy` | `string | undefined`        | `undefined`                        | Optional aria-describedby pointing to an element that describes the dialog purpose. |
| `ariaLabelledBy`  | `string | undefined`        | `undefined`                        | Optional aria-labelledby override.                                                  |
| `blockScroll`     | `boolean`                   | `DIALOG_DEFAULTS.BlockScroll`      | Enables body scroll lock while a modal dialog is visible.                           |
| `breakpoints`     | `Record<string, string>`    | `{ ...DIALOG_DEFAULTS.Breakpoints` | Responsive max-width -> width map, e.g. { '960px': '75vw', '640px': '90vw' }.       |
| `closable`        | `boolean`                   | `DIALOG_DEFAULTS.Closable`         | Controls whether the close button is shown.                                         |
| `closeOnEscape`   | `boolean`                   | `DIALOG_DEFAULTS.CloseOnEscape`    | Enables closing the dialog with Escape key.                                         |
| `dismissableMask` | `boolean`                   | `DIALOG_DEFAULTS.DismissableMask`  | Enables closing the dialog by clicking the modal backdrop.                          |
| `draggable`       | `boolean`                   | `DIALOG_DEFAULTS.Draggable`        | Enables dialog dragging (placeholder for v1 core behavior).                         |
| `header`          | `string`                    | `DIALOG_DEFAULTS.Header`           | Optional header text fallback when no projected header is supplied.                 |
| `headless`        | `boolean`                   | `DIALOG_DEFAULTS.Headless`         | Enables headless rendering mode.                                                    |
| `maximizable`     | `boolean`                   | `DIALOG_DEFAULTS.Maximizable`      | Enables maximize/minimize controls.                                                 |
| `modal`           | `boolean`                   | `DIALOG_DEFAULTS.Modal`            | Enables modal mode and backdrop rendering.                                          |
| `position`        | `DialogPosition`            | `DIALOG_DEFAULTS.Position`         | Dialog viewport placement.                                                          |
| `styleClass`      | `string | null`             | `null`                             | Optional additional CSS class(es) applied to the dialog panel element.              |
| `variant`         | `DialogVariant | undefined` | `undefined`                        | Optional component variant override.                                                |

### Models (two-way bindable)

| Name      | Type      | Default                   | Description                                                            |
| --------- | --------- | ------------------------- | ---------------------------------------------------------------------- |
| `visible` | `boolean` | `DIALOG_DEFAULTS.Visible` | Controls dialog visibility. Supports two-way binding with [(visible)]. |

### Outputs

| Name       | Type                     | Description                          |
| ---------- | ------------------------ | ------------------------------------ |
| `hide`     | `void`                   | Emitted after the dialog is hidden.  |
| `maximize` | `{ maximized: boolean }` | Emitted when maximize state changes. |
| `show`     | `void`                   | Emitted after the dialog is shown.   |

## Content Projection

| Selector                | Notes |
| ----------------------- | ----- |
| _(default)_             | —     |
| `[uiLibDialogFooter]`   | —     |
| `[uiLibDialogHeader]`   | —     |
| `[uiLibDialogHeadless]` | —     |

## Theming

| CSS Variable                             | Default                                                              |
| ---------------------------------------- | -------------------------------------------------------------------- |
| `--uilib-dialog-action-hover-material`   | `var(--uilib-surface-dark-3)`                                        |
| `--uilib-dialog-backdrop-enter-duration` | `150ms`                                                              |
| `--uilib-dialog-backdrop-enter-easing`   | `ease-out`                                                           |
| `--uilib-dialog-bg`                      | `var(--uilib-surface)`                                               |
| `--uilib-dialog-border`                  | `0 solid transparent`                                                |
| `--uilib-dialog-border-bootstrap`        | `var(--uilib-border-dark)`                                           |
| `--uilib-dialog-border-minimal`          | `var(--uilib-border-dark)`                                           |
| `--uilib-dialog-border-radius`           | `var(--uilib-radius-lg, var(--uilib-shape-base))`                    |
| `--uilib-dialog-close-btn-active-bg`     | `color-mix( in srgb, var(--uilib-muted, #6b7280) 18%, transparent )` |
| `--uilib-dialog-close-btn-color`         | `var(--uilib-muted)`                                                 |
| `--uilib-dialog-close-btn-hover-bg`      | `var(--uilib-surface-alt)`                                           |
| `--uilib-dialog-close-btn-size`          | `2rem`                                                               |
| `--uilib-dialog-close-btn-transition`    | `var(--uilib-transition-fast, 150ms ease)`                           |
| `--uilib-dialog-content-padding`         | `var(--uilib-space-5, 1.25rem)`                                      |
| `--uilib-dialog-enter-duration`          | `200ms`                                                              |
| `--uilib-dialog-enter-easing`            | `ease-out`                                                           |
| `--uilib-dialog-enter-start-scale`       | `0.9`                                                                |
| `--uilib-dialog-enter-start-translate-y` | `-8px`                                                               |
| `--uilib-dialog-footer-border-top`       | `1px solid var(--uilib-border)`                                      |
| `--uilib-dialog-footer-padding`          | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)`           |
| `--uilib-dialog-header-bg`               | `var(--uilib-surface-alt)`                                           |
| `--uilib-dialog-header-color`            | `var(--uilib-page-fg)`                                               |
| `--uilib-dialog-header-font-size`        | `var(--uilib-font-size-lg)`                                          |
| `--uilib-dialog-header-font-weight`      | `var(--uilib-font-weight-500, 500)`                                  |
| `--uilib-dialog-header-padding`          | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)`           |
| `--uilib-dialog-shadow`                  | `var(--uilib-dialog-shadow-material, var(--uilib-shadow-lg, none))`  |
| `--uilib-dialog-z-index`                 | `var(--uilib-z-modal, 1050)`                                         |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                      |
| ------------------------------------------------------------------------------------- |
| close button should have aria-label                                                   |
| dialog has aria-labelledby pointing to a valid element                                |
| dialog has role=                                                                      |
| documents intentional axe rule skips                                                  |
| enter and space on maximize button toggle maximize                                    |
| enter on close button closes the dialog                                               |
| escape closes the dialog when closeOnEscape is true                                   |
| maximize button should have correct aria-label (toggles)                              |
| modal dialog has aria-modal=                                                          |
| non-modal dialog does not have aria-modal                                             |
| non-modal dialog moves focus into the panel when opened via visible transition        |
| non-modal dialog restores focus to the trigger when closed                            |
| panel has aria-describedby when ariaDescribedBy input is provided                     |
| runs axe on the dialog in visible + modal state with no violations                    |
| runs axe on the dialog in visible + non-modal state with no violations                |
| runs axe on the dialog with custom header content with no violations                  |
| shift+tab at first focusable element wraps to last                                    |
| should apply center positioning by default                                            |
| should close on Escape key when closeOnEscape is true                                 |
| should have aria-labelledby pointing to the title element                             |
| should have aria-modal when modal is true                                             |
| should have role=                                                                     |
| should not add aria-describedby when ariaDescribedBy is not set                       |
| should not close on Escape when closeOnEscape is false                                |
| should set aria-describedby on the panel when ariaDescribedBy is provided             |
| should set aria-modal=                                                                |
| space on close button closes the dialog                                               |
| tab at last focusable element wraps to first                                          |
| tab does not escape modal dialog                                                      |
| when dialog closes, focus returns to the trigger element                              |
| when dialog has no focusable elements, focus is on the dialog panel itself            |
| when modal dialog opens, focus moves to the first focusable element inside the dialog |

## Usage Examples

```html
<!-- basic modal dialog -->
<ui-lib-dialog [(visible)]="isOpen" [modal]="true" header="Confirm action">
  <p>Are you sure you want to continue?</p>
  <div uiLibDialogFooter>
    <ui-lib-button label="Cancel" (buttonClick)="isOpen = false" />
    <ui-lib-button label="Confirm" severity="primary" (buttonClick)="confirm()" />
  </div>
</ui-lib-dialog>

<!-- draggable, maximizable dialog with custom header -->
<ui-lib-dialog [(visible)]="isOpen" [modal]="true" [draggable]="true" [maximizable]="true">
  <span uiLibDialogHeader>My custom header</span>
  <p>Dialog body content.</p>
</ui-lib-dialog>

<!-- non-modal (no backdrop), positioned top-right, Bootstrap variant -->
<ui-lib-dialog
  [(visible)]="isOpen"
  position="top-right"
  variant="bootstrap"
  header="Notification"
>
  <p>Your export is ready.</p>
</ui-lib-dialog>

<!-- headless — full control over panel rendering -->
<ui-lib-dialog [(visible)]="isOpen" [headless]="true">
  <div uiLibDialogHeadless class="my-custom-panel" role="dialog" aria-label="Custom dialog">
    <p>Fully custom shell.</p>
    <button (click)="isOpen = false">Close</button>
  </div>
</ui-lib-dialog>

<!-- responsive width with breakpoints -->
<ui-lib-dialog
  [(visible)]="isOpen"
  [modal]="true"
  header="Settings"
  [breakpoints]="{ '960px': '75vw', '640px': '90vw' }"
>
  <p>Responsive content.</p>
</ui-lib-dialog>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#dialog)
- [Demo page](/components/dialog)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/dialog/README.md)

