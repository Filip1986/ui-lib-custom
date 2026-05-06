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

| Input | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` (model) | `false` | Two-way visibility binding |
| `key` | `string` | `''` | Targets service calls to this specific instance |
| `header` | `string` | `'Confirmation'` | Dialog title |
| `message` | `string` | `'Are you sure you want to proceed?'` | Confirmation message |
| `icon` | `string \| null` | `null` | CSS class for message icon (e.g. `'pi pi-trash'`) |
| `acceptLabel` | `string` | `'Yes'` | Accept button label |
| `rejectLabel` | `string` | `'No'` | Reject button label |
| `acceptIcon` | `string \| null` | `null` | CSS class for accept button icon |
| `rejectIcon` | `string \| null` | `null` | CSS class for reject button icon |
| `acceptSeverity` | `ConfirmDialogButtonSeverity` | `'primary'` | Accept button colour scheme |
| `rejectSeverity` | `ConfirmDialogButtonSeverity` | `'secondary'` | Reject button colour scheme |
| `closable` | `boolean` | `true` | Show/hide the × close button |
| `dismissableMask` | `boolean` | `false` | Close (reject) on backdrop click |
| `blockScroll` | `boolean` | `true` | Lock body scroll while open |
| `position` | `ConfirmDialogPosition` | `'center'` | Panel position on the viewport |
| `defaultFocus` | `ConfirmDialogDefaultFocus` | `'accept'` | Initial focused button |
| `variant` | `ConfirmDialogVariant \| null` | `null` | Design variant override |
| `styleClass` | `string \| null` | `null` | Extra CSS classes on the host |

## Outputs

| Output | Type | Description |
|---|---|---|
| `accepted` | `void` | Emitted when the user clicks Accept |
| `rejected` | `void` | Emitted when the user clicks Reject or closes the dialog |

## ConfirmationService API

| Method | Description |
|---|---|
| `confirm(config: ConfirmationConfig)` | Show a confirmation dialog |
| `close(key?: string)` | Programmatically close the dialog |

## ConfirmationConfig

| Property | Type | Description |
|---|---|---|
| `key` | `string` | Targets a specific dialog by key |
| `header` | `string` | Dialog title |
| `message` | `string` | Confirmation message |
| `icon` | `string` | Message icon CSS class |
| `acceptLabel` | `string` | Accept button label |
| `rejectLabel` | `string` | Reject button label |
| `acceptIcon` | `string \| null` | Accept button icon |
| `rejectIcon` | `string \| null` | Reject button icon |
| `acceptSeverity` | `ConfirmDialogButtonSeverity` | Accept button colour |
| `rejectSeverity` | `ConfirmDialogButtonSeverity` | Reject button colour |
| `closable` | `boolean` | Show close button |
| `dismissableMask` | `boolean` | Close on backdrop click |
| `blockScroll` | `boolean` | Lock body scroll |
| `position` | `ConfirmDialogPosition` | Panel position |
| `defaultFocus` | `ConfirmDialogDefaultFocus` | Initial focused button |
| `accept` | `() => void` | Accept callback |
| `reject` | `() => void` | Reject callback |

## Types

```ts
type ConfirmDialogVariant = 'material' | 'bootstrap' | 'minimal';
type ConfirmDialogButtonSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ConfirmDialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
type ConfirmDialogDefaultFocus = 'accept' | 'reject' | 'none';
```

## Accessibility

- `role="alertdialog"` on the panel
- `aria-modal="true"` on the panel
- `aria-labelledby` references the header element
- `aria-describedby` references the message element
- Focus trapped inside the panel via `FocusTrap`
- Initial focus on the configured button (`defaultFocus`)
- Closes on `Escape` key
- All buttons have visible focus rings
