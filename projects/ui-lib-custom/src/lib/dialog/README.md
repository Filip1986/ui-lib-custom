# Dialog

**Selector:** `ui-lib-dialog`
**Package:** `ui-lib-custom/dialog`
**Content projection:** yes — `[uiLibDialogHeader]` for the title area, default slot for body content, `[uiLibDialogFooter]` for footer actions, and `[uiLibDialogHeadless]` replaces the entire panel when `headless` is true

> Unlike PrimeNG Dialog, `modal` defaults to `false` — passing `[modal]="true"` is required to get the backdrop and body-scroll lock.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `visible` | `boolean` | `false` | Two-way bindable via `[(visible)]` |
| `header` | `string` | `''` | Fallback text when no `[uiLibDialogHeader]` content is projected |
| `modal` | `boolean` | `false` | Renders backdrop; required for focus trap and scroll lock |
| `closable` | `boolean` | `true` | Shows the close button in the header |
| `closeOnEscape` | `boolean` | `true` | Closes on Escape key press |
| `dismissableMask` | `boolean` | `false` | Closes when clicking the backdrop |
| `draggable` | `boolean` | `false` | Allows the dialog to be dragged by its header |
| `maximizable` | `boolean` | `false` | Shows a maximize/minimize button |
| `blockScroll` | `boolean` | `true` | Locks body scroll while a modal dialog is open |
| `position` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'center'` | Viewport placement |
| `breakpoints` | `Record<string, string>` | `{}` | Responsive width map, e.g. `{ '960px': '75vw' }` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| undefined` | `undefined` | Falls back to `ThemeConfigService` global variant |
| `headless` | `boolean` | `false` | Disables built-in shell; projects `[uiLibDialogHeadless]` content instead |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Explicit `aria-labelledby` override |
| `styleClass` | `string \| null` | — | Not present; use the host element directly |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `show` | `void` | Emitted after the dialog becomes visible |
| `hide` | `void` | Emitted after the dialog is hidden |
| `maximize` | `{ maximized: boolean }` | Emitted when maximize state changes |

## Usage

```html
<!-- basic modal dialog -->
<ui-lib-dialog [(visible)]="isOpen" [modal]="true" header="Confirm action">
  <p>Are you sure you want to continue?</p>
  <div uiLibDialogFooter>
    <ui-lib-button label="Cancel" (click)="isOpen = false" />
    <ui-lib-button label="Confirm" severity="primary" (click)="confirm()" />
  </div>
</ui-lib-dialog>

<!-- draggable, maximizable dialog with custom header -->
<ui-lib-dialog [(visible)]="isOpen" [modal]="true" [draggable]="true" [maximizable]="true">
  <span uiLibDialogHeader>My custom header</span>
  <p>Dialog body content.</p>
</ui-lib-dialog>
```
