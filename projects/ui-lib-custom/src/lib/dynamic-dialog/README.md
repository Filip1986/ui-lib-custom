# DynamicDialog

Programmatically open any Angular component inside a modal dialog shell.  
Built on `DialogService.open()` — no `<ui-lib-dynamic-dialog>` tag needed in templates.

## Package path

```ts
import {
  DialogService,
  DynamicDialogRef,
  DYNAMIC_DIALOG_CONFIG,
} from 'ui-lib-custom/dynamic-dialog';
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

| Property          | Type                                                 | Default    | Description                                                                     |
| ----------------- | ---------------------------------------------------- | ---------- | ------------------------------------------------------------------------------- |
| `header`          | `string`                                             | `''`       | Dialog title text (renders `aria-labelledby`)                                   |
| `width`           | `string`                                             | —          | CSS width of the panel (e.g. `'40rem'`)                                         |
| `height`          | `string`                                             | —          | CSS height of the panel (e.g. `'80vh'`)                                         |
| `modal`           | `boolean`                                            | `true`     | Show semi-transparent backdrop; also controls `aria-modal`                      |
| `closable`        | `boolean`                                            | `true`     | Show × close button in header                                                   |
| `dismissableMask` | `boolean`                                            | `false`    | Click backdrop to close                                                         |
| `blockScroll`     | `boolean`                                            | `true`     | Lock body scroll while open                                                     |
| `styleClass`      | `string \| null`                                     | `null`     | Extra CSS class on the host                                                     |
| `data`            | `unknown`                                            | —          | Arbitrary data for the guest component                                          |
| `variant`         | `'material' \| 'bootstrap' \| 'minimal' \| null`     | inherited  | Design variant override                                                         |
| `position`        | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Viewport anchor position                                                        |
| `ariaLabel`       | `string`                                             | `'Dialog'` | Accessible name when no visible `header` is set (maps to `aria-label`)          |
| `ariaDescribedby` | `string`                                             | —          | ID of an element that describes the dialog purpose (maps to `aria-describedby`) |

## DynamicDialogRef

| Member                         | Description                                            |
| ------------------------------ | ------------------------------------------------------ |
| `onClose: Observable<unknown>` | Emits once (with optional data) when the dialog closes |
| `close(data?: unknown): void`  | Close the dialog and pass optional return data         |

## Injection tokens

| Token                   | Type                  | Description                            |
| ----------------------- | --------------------- | -------------------------------------- |
| `DYNAMIC_DIALOG_CONFIG` | `DynamicDialogConfig` | Config provided to the guest component |
| `DynamicDialogRef`      | `DynamicDialogRef`    | Ref provided to the guest component    |

## Content projection

None — the guest component is loaded dynamically by `DialogService.open()`.

## CSS Custom Properties

| Variable                                    | Default                                             | Description                                                               |
| ------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| `--uilib-dynamic-dialog-bg`                 | `var(--uilib-surface, #fff)`                        | Panel background                                                          |
| `--uilib-dynamic-dialog-radius`             | `var(--uilib-radius-lg, 12px)`                      | Panel border radius                                                       |
| `--uilib-dynamic-dialog-shadow`             | elevation shadow                                    | Panel box-shadow                                                          |
| `--uilib-dynamic-dialog-backdrop-bg`        | `rgba(0, 0, 0, 0.4)`                                | Backdrop colour                                                           |
| `--uilib-dynamic-dialog-header-padding`     | `1.25rem 1.5rem 1rem`                               | Header padding                                                            |
| `--uilib-dynamic-dialog-header-border`      | `var(--uilib-surface-border, #e9ecef)`              | Header bottom border colour                                               |
| `--uilib-dynamic-dialog-content-padding`    | `1.5rem`                                            | Content area padding                                                      |
| `--uilib-dynamic-dialog-min-width`          | `300px`                                             | Minimum panel width                                                       |
| `--uilib-dynamic-dialog-max-width`          | `90vw`                                              | Maximum panel width                                                       |
| `--uilib-dynamic-dialog-max-height`         | `90vh`                                              | Maximum panel height                                                      |
| `--uilib-dynamic-dialog-offset`             | `2rem`                                              | Edge offset for non-center positions                                      |
| `--uilib-dynamic-dialog-title-size`         | `1.125rem`                                          | Header title font size                                                    |
| `--uilib-dynamic-dialog-title-color`        | `var(--uilib-page-fg, #212121)`                     | Header title text colour                                                  |
| `--uilib-dynamic-dialog-close-btn-size`     | `2rem`                                              | Close button width/height                                                 |
| `--uilib-dynamic-dialog-close-btn-radius`   | `var(--uilib-radius-full, 9999px)`                  | Close button border radius                                                |
| `--uilib-dynamic-dialog-close-color`        | `var(--uilib-page-fg-muted, #6c757d)`               | Close button icon colour                                                  |
| `--uilib-dynamic-dialog-close-hover-bg`     | `rgba(0, 0, 0, 0.06)`                               | Close button hover background                                             |
| `--uilib-dynamic-dialog-transition`         | `200ms ease`                                        | Close button transition (set to `none` under `prefers-reduced-motion`)    |
| `--uilib-dynamic-dialog-panel-animation`    | `uilib-dynamic-dialog-enter 0.2s cubic-bezier(...)` | Panel enter animation (set to `none` under `prefers-reduced-motion`)      |
| `--uilib-dynamic-dialog-backdrop-animation` | `uilib-dynamic-dialog-fade-in 0.2s ease`            | Backdrop fade-in animation (set to `none` under `prefers-reduced-motion`) |
| `--uilib-dynamic-dialog-shadow-material`    | Material elevation shadow stack                     | Panel shadow in Material variant                                          |
| `--uilib-dynamic-dialog-shadow-bootstrap`   | `0 0.5rem 1rem rgba(0,0,0,0.15)`                    | Panel shadow in Bootstrap variant                                         |
| `--uilib-dynamic-dialog-shadow-minimal`     | `0 4px 12px rgba(0,0,0,0.08)`                       | Panel shadow in Minimal variant                                           |
