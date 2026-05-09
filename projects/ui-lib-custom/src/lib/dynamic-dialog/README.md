# DynamicDialog

Programmatically open any Angular component inside a modal dialog shell.  
Built on `DialogService.open()` — no `<ui-lib-dynamic-dialog>` tag needed in templates.

## Package path

```ts
import { DialogService, DynamicDialogRef, DYNAMIC_DIALOG_CONFIG } from 'ui-lib-custom/dynamic-dialog';
import type { DynamicDialogConfig } from 'ui-lib-custom/dynamic-dialog';
```

## Usage

### 1. Open a dialog

```ts
// In your component
constructor(private readonly dialogService: DialogService) {}

openUserProfile(): void {
  const ref = this.dialogService.open(UserProfileComponent, {
    header: 'User Profile',
    width: '40rem',
    data: { userId: 42 },
  });

  ref.onClose.subscribe((result) => {
    console.log('Closed with:', result);
  });
}
```

### 2. Guest component (renders inside the dialog)

```ts
@Component({
  standalone: true,
  template: `
    <p>User ID: {{ config.data['userId'] }}</p>
    <button (click)="close()">Close</button>
  `,
})
export class UserProfileComponent {
  protected readonly config: DynamicDialogConfig = inject(DYNAMIC_DIALOG_CONFIG);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  close(): void {
    this.ref.close({ saved: true });
  }
}
```

## DynamicDialogConfig

| Property | Type | Default | Description |
|---|---|---|---|
| `header` | `string` | `''` | Dialog title text |
| `width` | `string` | — | CSS width of the panel (e.g. `'40rem'`) |
| `height` | `string` | — | CSS height of the panel (e.g. `'80vh'`) |
| `modal` | `boolean` | `true` | Show semi-transparent backdrop |
| `closable` | `boolean` | `true` | Show × close button in header |
| `dismissableMask` | `boolean` | `false` | Click backdrop to close |
| `blockScroll` | `boolean` | `true` | Lock body scroll while open |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `data` | `unknown` | — | Arbitrary data for the guest component |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | inherited | Design variant override |
| `position` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Viewport anchor position |

## DynamicDialogRef

| Member | Description |
|---|---|
| `onClose: Observable<unknown>` | Emits once (with optional data) when the dialog closes |
| `close(data?: unknown): void` | Close the dialog and pass optional return data |

## Injection tokens

| Token | Type | Description |
|---|---|---|
| `DYNAMIC_DIALOG_CONFIG` | `DynamicDialogConfig` | Config provided to the guest component |
| `DynamicDialogRef` | `DynamicDialogRef` | Ref provided to the guest component |

## Content projection

None — the guest component is loaded dynamically by `DialogService.open()`.

## CSS variables

| Variable | Default | Description |
|---|---|---|
| `--uilib-dynamic-dialog-bg` | `var(--uilib-surface)` | Panel background |
| `--uilib-dynamic-dialog-radius` | `12px` | Panel border radius |
| `--uilib-dynamic-dialog-shadow` | elevation shadow | Panel box-shadow |
| `--uilib-dynamic-dialog-backdrop-bg` | `rgba(0,0,0,0.4)` | Backdrop colour |
| `--uilib-dynamic-dialog-header-padding` | `1.25rem 1.5rem 1rem` | Header padding |
| `--uilib-dynamic-dialog-content-padding` | `1.5rem` | Content area padding |
| `--uilib-dynamic-dialog-min-width` | `300px` | Minimum panel width |
| `--uilib-dynamic-dialog-max-width` | `90vw` | Maximum panel width |
| `--uilib-dynamic-dialog-max-height` | `90vh` | Maximum panel height |
| `--uilib-dynamic-dialog-offset` | `2rem` | Edge offset for non-center positions |
