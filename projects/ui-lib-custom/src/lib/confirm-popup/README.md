# ConfirmPopup

An anchored confirmation popup that positions itself relative to the element that triggered it, with an arrow pointing at that element. Lighter than ConfirmDialog — no modal backdrop, compact layout, ideal for inline contextual confirmations.

## Package path

```ts
import { ConfirmPopup, ConfirmPopupService } from 'ui-lib-custom/confirm-popup';
```

## Selector

`ui-lib-confirm-popup`

## Usage

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

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `visible` | `model<boolean>` | `false` | Two-way visibility binding |
| `key` | `string` | `''` | Key for targeting when multiple instances exist |
| `message` | `string` | `'Are you sure you want to proceed?'` | Confirmation message text |
| `icon` | `string \| null` | `null` | CSS class for the message icon (e.g. `'pi pi-exclamation-triangle'`) |
| `acceptLabel` | `string` | `'Yes'` | Accept button label |
| `rejectLabel` | `string` | `'No'` | Reject button label |
| `acceptIcon` | `string \| null` | `null` | CSS class for icon inside accept button |
| `rejectIcon` | `string \| null` | `null` | CSS class for icon inside reject button |
| `acceptSeverity` | `ConfirmPopupButtonSeverity` | `'primary'` | Accept button colour severity |
| `rejectSeverity` | `ConfirmPopupButtonSeverity` | `'secondary'` | Reject button colour severity |
| `defaultFocus` | `ConfirmPopupDefaultFocus` | `'accept'` | Which button receives focus on open |
| `variant` | `ConfirmPopupVariant \| null` | `null` | Design variant; inherits from ThemeConfigService when null |
| `styleClass` | `string \| null` | `null` | Extra CSS classes on the host |

## Outputs

| Output | Payload | Description |
|---|---|---|
| `accepted` | `void` | Emitted when the accept button is clicked |
| `rejected` | `void` | Emitted when the reject button or overlay is clicked, or Escape is pressed |

## ConfirmPopupService

| Method | Signature | Description |
|---|---|---|
| `confirm` | `(config: ConfirmPopupConfig) => void` | Show a popup with the given config |
| `close` | `(key?: string) => void` | Programmatically close the popup |
| `confirmation` | `Signal<ConfirmPopupConfig \| null>` | Readable signal of the current config |

## ConfirmPopupConfig

| Property | Type | Description |
|---|---|---|
| `key` | `string?` | Match a specific popup instance |
| `target` | `HTMLElement \| EventTarget \| null?` | Element to anchor the popup to |
| `message` | `string?` | Confirmation message |
| `icon` | `string?` | Icon CSS class |
| `acceptLabel` | `string?` | Accept button label |
| `rejectLabel` | `string?` | Reject button label |
| `acceptIcon` | `string \| null?` | Accept button icon CSS class |
| `rejectIcon` | `string \| null?` | Reject button icon CSS class |
| `acceptSeverity` | `ConfirmPopupButtonSeverity?` | Accept button severity |
| `rejectSeverity` | `ConfirmPopupButtonSeverity?` | Reject button severity |
| `defaultFocus` | `ConfirmPopupDefaultFocus?` | Initial focused button |
| `accept` | `() => void?` | Callback on accept |
| `reject` | `() => void?` | Callback on reject/dismiss |

## Types

```ts
type ConfirmPopupVariant = 'material' | 'bootstrap' | 'minimal';
type ConfirmPopupButtonSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ConfirmPopupDefaultFocus = 'accept' | 'reject' | 'none';
type ConfirmPopupPlacement = 'above' | 'below';
```

## Positioning

The popup auto-positions above the target element by default. If there is insufficient space above, it positions below. An arrow points at the center of the target element. The panel is clamped within the viewport.

## Accessibility

- `role="alertdialog"` + `aria-modal="true"` on the panel
- `aria-describedby` links panel to message element
- Focus trap activated while popup is open
- Escape key closes the popup
- Focus moves to the configured `defaultFocus` button on open
