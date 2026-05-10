# ConfirmDialog

A modal confirmation overlay with configurable accept/reject actions. Supports both declarative (input/output) and programmatic (service-driven) usage.

## Package path

```ts
import { ConfirmDialog, ConfirmationService } from 'ui-lib-custom/confirm-dialog';
```

## Selector

`ui-lib-confirm-dialog`

## Usage

### Programmatic (via ConfirmationService)

Place the component once in your layout, then trigger it from any component via `ConfirmationService`:

```html
<!-- In app shell or page template -->
<ui-lib-confirm-dialog />
```

```ts
// In any component
constructor(private readonly confirmationService: ConfirmationService) {}

deleteItem(): void {
  this.confirmationService.confirm({
    header: 'Delete Item',
    message: 'This action cannot be undone.',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Delete',
    acceptSeverity: 'danger',
    accept: () => this.doDelete(),
    reject: () => console.log('Cancelled'),
  });
}
```

### Declarative (via inputs/outputs)

```html
<ui-lib-confirm-dialog
  [(visible)]="isOpen"
  header="Confirm Action"
  message="Are you sure you want to proceed?"
  acceptLabel="Yes"
  rejectLabel="No"
  (accepted)="onAccept()"
  (rejected)="onReject()"
/>
```

### Multiple dialogs with keys

Use the `key` input and `ConfirmationConfig.key` to target a specific dialog:

```html
<ui-lib-confirm-dialog key="delete" />
<ui-lib-confirm-dialog key="logout" />
```

```ts
this.confirmationService.confirm({ key: 'delete', message: 'Delete this item?' });
```

## Inputs

| Input             | Type                           | Default                               | Description                                       |
|-------------------|--------------------------------|---------------------------------------|---------------------------------------------------|
| `visible`         | `boolean` (model)              | `false`                               | Two-way visibility binding                        |
| `key`             | `string`                       | `''`                                  | Targets service calls to this specific instance   |
| `header`          | `string`                       | `'Confirmation'`                      | Dialog title                                      |
| `message`         | `string`                       | `'Are you sure you want to proceed?'` | Confirmation message                              |
| `icon`            | `string \| null`               | `null`                                | CSS class for message icon (e.g. `'pi pi-trash'`) |
| `acceptLabel`     | `string`                       | `'Yes'`                               | Accept button label                               |
| `rejectLabel`     | `string`                       | `'No'`                                | Reject button label                               |
| `acceptIcon`      | `string \| null`               | `null`                                | CSS class for accept button icon                  |
| `rejectIcon`      | `string \| null`               | `null`                                | CSS class for reject button icon                  |
| `acceptSeverity`  | `ConfirmDialogButtonSeverity`  | `'primary'`                           | Accept button colour scheme                       |
| `rejectSeverity`  | `ConfirmDialogButtonSeverity`  | `'secondary'`                         | Reject button colour scheme                       |
| `closable`        | `boolean`                      | `true`                                | Show/hide the × close button                      |
| `dismissableMask` | `boolean`                      | `false`                               | Close (reject) on backdrop click                  |
| `blockScroll`     | `boolean`                      | `true`                                | Lock body scroll while open                       |
| `position`        | `ConfirmDialogPosition`        | `'center'`                            | Panel position on the viewport                    |
| `defaultFocus`    | `ConfirmDialogDefaultFocus`    | `'accept'`                            | Initial focused button                            |
| `variant`         | `ConfirmDialogVariant \| null` | `null`                                | Design variant override                           |
| `styleClass`      | `string \| null`               | `null`                                | Extra CSS classes on the host                     |

## Outputs

| Output       | Type     | Description                                              |
|--------------|----------|----------------------------------------------------------|
| `accepted`   | `void`   | Emitted when the user clicks Accept                      |
| `rejected`   | `void`   | Emitted when the user clicks Reject or closes the dialog |

## ConfirmationService API

| Method                                | Description                         |
|---------------------------------------|-------------------------------------|
| `confirm(config: ConfirmationConfig)` | Show a confirmation dialog          |
| `close(key?: string)`                 | Programmatically close the dialog   |

## ConfirmationConfig

| Property          | Type                          | Description                      |
|-------------------|-------------------------------|----------------------------------|
| `key`             | `string`                      | Targets a specific dialog by key |
| `header`          | `string`                      | Dialog title                     |
| `message`         | `string`                      | Confirmation message             |
| `icon`            | `string`                      | Message icon CSS class           |
| `acceptLabel`     | `string`                      | Accept button label              |
| `rejectLabel`     | `string`                      | Reject button label              |
| `acceptIcon`      | `string \| null`              | Accept button icon               |
| `rejectIcon`      | `string \| null`              | Reject button icon               |
| `acceptSeverity`  | `ConfirmDialogButtonSeverity` | Accept button colour             |
| `rejectSeverity`  | `ConfirmDialogButtonSeverity` | Reject button colour             |
| `closable`        | `boolean`                     | Show close button                |
| `dismissableMask` | `boolean`                     | Close on backdrop click          |
| `blockScroll`     | `boolean`                     | Lock body scroll                 |
| `position`        | `ConfirmDialogPosition`       | Panel position                   |
| `defaultFocus`    | `ConfirmDialogDefaultFocus`   | Initial focused button           |
| `accept`          | `() => void`                  | Accept callback                  |
| `reject`          | `() => void`                  | Reject callback                  |

## Types

```ts
type ConfirmDialogVariant = 'material' | 'bootstrap' | 'minimal';
type ConfirmDialogButtonSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ConfirmDialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
type ConfirmDialogDefaultFocus = 'accept' | 'reject' | 'none';
```

## Accessibility

ConfirmDialog meets WCAG 2.1 AA requirements for modal dialogs. All features below are built-in and require no extra configuration.

| Feature              | Detail                                                                                                                              |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `role="alertdialog"` | Panel has the correct ARIA landmark role for confirmation dialogs                                                                   |
| `aria-modal="true"`  | Signals to assistive technologies that this is a modal context                                                                      |
| `aria-labelledby`    | Points to the header `<span>` — screen readers announce the title on open                                                           |
| `aria-describedby`   | Points to the message `<div>` — screen readers read the message text                                                                |
| Focus trap           | `FocusTrap` constrains Tab/Shift+Tab to the dialog panel while open                                                                 |
| Default focus        | The button named by `defaultFocus` receives focus immediately after open                                                            |
| Focus restoration    | When the dialog closes (Escape, accept, reject, or close button), focus returns to the element that had it before the dialog opened |
| Escape key           | Closes the dialog (equivalent to clicking the reject button)                                                                        |
| `aria-label="Close"` | The × close button has an accessible label visible to screen readers                                                                |
| Inline SVG icon      | Close button icon is `aria-hidden="true"` and `focusable="false"`                                                                   |
| Message icon         | `<i class="...">` icon is `aria-hidden="true"`                                                                                      |
| Backdrop             | Decorative overlay has `aria-hidden="true"`                                                                                         |
| Scroll lock          | Body scroll is locked while the dialog is open (when `blockScroll=true`)                                                            |
| Reduced motion       | `@media (prefers-reduced-motion: reduce)` sets animation duration to `0ms`                                                          |
| Focus rings          | All buttons have visible `:focus-visible` outlines (2px primary-colour ring)                                                        |

### Keyboard navigation

| Key               | Action                                      |
|-------------------|---------------------------------------------|
| `Tab`             | Move focus forward through dialog controls  |
| `Shift+Tab`       | Move focus backward through dialog controls |
| `Enter` / `Space` | Activate the focused button                 |
| `Escape`          | Close the dialog (reject path)              |
