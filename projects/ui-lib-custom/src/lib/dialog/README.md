# Dialog

**Selector:** `ui-lib-dialog`
**Package:** `ui-lib-custom/dialog`
**Content projection:** yes — `[uiLibDialogHeader]` for the title area, default slot for body content, `[uiLibDialogFooter]` for footer actions, and `[uiLibDialogHeadless]` replaces the entire panel when `headless` is true

> Unlike PrimeNG Dialog, `modal` defaults to `false` — passing `[modal]="true"` is required to get the backdrop and body-scroll lock.

## Inputs

| Name              | Type                                                                                                                 | Default     | Notes                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `visible`         | `boolean`                                                                                                            | `false`     | Two-way bindable via `[(visible)]`                                                |
| `header`          | `string`                                                                                                             | `''`        | Fallback text when no `[uiLibDialogHeader]` content is projected                  |
| `modal`           | `boolean`                                                                                                            | `false`     | Renders backdrop; required for focus trap and scroll lock                         |
| `closable`        | `boolean`                                                                                                            | `true`      | Shows the close button in the header                                              |
| `closeOnEscape`   | `boolean`                                                                                                            | `true`      | Closes on Escape key press                                                        |
| `dismissableMask` | `boolean`                                                                                                            | `false`     | Closes when clicking the backdrop                                                 |
| `draggable`       | `boolean`                                                                                                            | `false`     | Allows the dialog to be dragged by its header                                     |
| `maximizable`     | `boolean`                                                                                                            | `false`     | Shows a maximize/minimize button                                                  |
| `blockScroll`     | `boolean`                                                                                                            | `true`      | Locks body scroll while a modal dialog is open                                    |
| `position`        | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'center'`  | Viewport placement                                                                |
| `breakpoints`     | `Record<string, string>`                                                                                             | `{}`        | Responsive width map, e.g. `{ '960px': '75vw', '640px': '90vw' }`                 |
| `variant`         | `'material' \| 'bootstrap' \| 'minimal' \| undefined`                                                                | `undefined` | Falls back to `ThemeConfigService` global variant                                 |
| `headless`        | `boolean`                                                                                                            | `false`     | Disables built-in shell; projects `[uiLibDialogHeadless]` content instead         |
| `ariaLabelledBy`  | `string \| undefined`                                                                                                | `undefined` | Explicit `aria-labelledby` override; auto-generated from header text when omitted |
| `ariaDescribedBy` | `string \| undefined`                                                                                                | `undefined` | `aria-describedby` pointing to a description element                              |
| `styleClass`      | `string \| null`                                                                                                     | `null`      | Additional CSS class(es) applied to the dialog panel                              |

## Outputs

| Name       | Payload                  | Notes                                    |
| ---------- | ------------------------ | ---------------------------------------- |
| `show`     | `void`                   | Emitted after the dialog becomes visible |
| `hide`     | `void`                   | Emitted after the dialog is hidden       |
| `maximize` | `{ maximized: boolean }` | Emitted when maximize state changes      |

## Content Projection Slots

| Selector                | Purpose                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| `[uiLibDialogHeader]`   | Replaces the built-in header text (`header` input is ignored when this is projected)      |
| _(default)_             | Main body content inside the scrollable content area                                      |
| `[uiLibDialogFooter]`   | Action buttons or other footer content; the footer collapses (`display: none`) when empty |
| `[uiLibDialogHeadless]` | Projected when `[headless]="true"` — replaces the entire built-in panel shell             |

## Keyboard Behavior

The dialog follows the [WAI-ARIA Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

| Key           | Behavior                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `Escape`      | Closes the dialog (when `closeOnEscape` is `true`, default)                                        |
| `Tab`         | Moves focus to the next focusable element inside the panel (focus is trapped inside modal dialogs) |
| `Shift + Tab` | Moves focus to the previous focusable element inside the panel                                     |

**Focus management:**

- **Modal dialogs** (`[modal]="true"`): Focus is trapped inside the panel using `FocusTrap`. When the dialog closes, focus is automatically restored to the element that triggered the open.
- **Non-modal dialogs**: On open, focus moves to the first interactive element in the panel (or the panel itself as fallback). On close, focus is restored to the previously focused element.
- **Maximize button**: When present, `aria-label` toggles between `dialog.maximize` and `dialog.minimize` i18n keys.

## ARIA Attributes

| Attribute          | Value             | Notes                                                                                                                                    |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `role="dialog"`    | static            | Set on the panel element                                                                                                                 |
| `aria-modal`       | `"true"`          | Present only when `[modal]="true"`                                                                                                       |
| `aria-labelledby`  | auto-generated id | Points to the title element; auto-generated from `header` text or `[uiLibDialogHeader]` content; can be overridden with `ariaLabelledBy` |
| `aria-describedby` | consumer-supplied | Use `ariaDescribedBy` to point to a description element that explains the dialog purpose                                                 |

The backdrop (`div.ui-lib-dialog-backdrop`) has `pointer-events: auto` so click-to-dismiss works even though the host uses `pointer-events: none` as a layout container.

## Variants

Three visual variants are available — set globally via `ThemeConfigService.variant` or per-instance with the `variant` input:

| Variant              | Appearance                                                                          |
| -------------------- | ----------------------------------------------------------------------------------- |
| `material` (default) | Elevated with `--uilib-shadow-lg`; rounded corners; circular close/maximize buttons |
| `bootstrap`          | Bordered panel + header bottom border; no scale animation on enter; medium radius   |
| `minimal`            | Thin border; flat header (same background as content); instant enter animation      |

## CSS Custom Properties

Override any token on the host element or a parent container:

| Token                                    | Default                                                   | Description                                                                           |
| ---------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `--uilib-dialog-bg`                      | `var(--uilib-surface)`                                    | Panel background                                                                      |
| `--uilib-dialog-border-radius`           | `var(--uilib-radius-lg)`                                  | Panel corner radius                                                                   |
| `--uilib-dialog-shadow`                  | `var(--uilib-shadow-lg)`                                  | Panel box-shadow                                                                      |
| `--uilib-dialog-border`                  | `0 solid transparent`                                     | Panel border shorthand                                                                |
| `--uilib-dialog-header-bg`               | `var(--uilib-surface-alt)`                                | Header background                                                                     |
| `--uilib-dialog-header-color`            | `var(--uilib-page-fg)`                                    | Header text color                                                                     |
| `--uilib-dialog-header-font-size`        | `var(--uilib-font-size-lg)`                               | Header title font size                                                                |
| `--uilib-dialog-header-font-weight`      | `var(--uilib-font-weight-500, 500)`                       | Header title font weight                                                              |
| `--uilib-dialog-header-padding`          | `1rem 1.25rem`                                            | Header padding (block inline)                                                         |
| `--uilib-dialog-content-padding`         | `1.25rem`                                                 | Content area padding                                                                  |
| `--uilib-dialog-footer-padding`          | `1rem 1.25rem`                                            | Footer padding (block inline)                                                         |
| `--uilib-dialog-footer-border-top`       | `1px solid var(--uilib-border)`                           | Footer top border                                                                     |
| `--uilib-dialog-close-btn-size`          | `2rem`                                                    | Width and height of close/maximize buttons                                            |
| `--uilib-dialog-close-btn-color`         | `var(--uilib-muted)`                                      | Close/maximize button icon color                                                      |
| `--uilib-dialog-close-btn-hover-bg`      | `var(--uilib-surface-alt)`                                | Close/maximize button hover background                                                |
| `--uilib-dialog-close-btn-active-bg`     | `color-mix(in srgb, var(--uilib-muted) 18%, transparent)` | Close/maximize button active/pressed background                                       |
| `--uilib-dialog-close-btn-transition`    | `var(--uilib-transition-fast, 150ms ease)`                | Close/maximize button background transition (auto-zeroed by `prefers-reduced-motion`) |
| `--uilib-dialog-z-index`                 | `var(--uilib-z-modal, 1050)`                              | Stacking order for the host overlay container                                         |
| `--uilib-dialog-enter-duration`          | `200ms`                                                   | Panel enter animation duration (variant-specific, set by component)                   |
| `--uilib-dialog-enter-easing`            | `ease-out`                                                | Panel enter animation easing                                                          |
| `--uilib-dialog-enter-start-scale`       | `0.9`                                                     | Panel enter scale-from value (material) / `1` (bootstrap, minimal)                    |
| `--uilib-dialog-enter-start-translate-y` | `-8px`                                                    | Panel enter translate-from value (material) / `0px` (bootstrap, minimal)              |
| `--uilib-dialog-backdrop-enter-duration` | `150ms`                                                   | Backdrop fade-in duration                                                             |
| `--uilib-dialog-backdrop-enter-easing`   | `ease-out`                                                | Backdrop fade-in easing                                                               |

> **Reduced motion:** `--uilib-dialog-close-btn-transition` inherits from `--uilib-transition-fast` which is zeroed to `0ms` in the global `@media (prefers-reduced-motion: reduce)` block inside `themes.scss`. All animation durations are driven by tokens set on the host element at runtime, so they are automatically overridden when the OS motion preference is active.

## Usage

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
<ui-lib-dialog [(visible)]="isOpen" position="top-right" variant="bootstrap" header="Notification">
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
