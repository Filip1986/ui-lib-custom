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

| Input            | Type                          | Default                               | Description                                                          |
|------------------|-------------------------------|---------------------------------------|----------------------------------------------------------------------|
| `visible`        | `model<boolean>`              | `false`                               | Two-way visibility binding                                           |
| `key`            | `string`                      | `''`                                  | Key for targeting when multiple instances exist                      |
| `message`        | `string`                      | `'Are you sure you want to proceed?'` | Confirmation message text                                            |
| `icon`           | `string \| null`              | `null`                                | CSS class for the message icon (e.g. `'pi pi-exclamation-triangle'`) |
| `acceptLabel`    | `string`                      | `'Yes'`                               | Accept button label                                                  |
| `rejectLabel`    | `string`                      | `'No'`                                | Reject button label                                                  |
| `acceptIcon`     | `string \| null`              | `null`                                | CSS class for icon inside accept button                              |
| `rejectIcon`     | `string \| null`              | `null`                                | CSS class for icon inside reject button                              |
| `acceptSeverity` | `ConfirmPopupButtonSeverity`  | `'primary'`                           | Accept button colour severity                                        |
| `rejectSeverity` | `ConfirmPopupButtonSeverity`  | `'secondary'`                         | Reject button colour severity                                        |
| `defaultFocus`   | `ConfirmPopupDefaultFocus`    | `'accept'`                            | Which button receives focus on open                                  |
| `variant`        | `ConfirmPopupVariant \| null` | `null`                                | Design variant; inherits from ThemeConfigService when null           |
| `styleClass`     | `string \| null`              | `null`                                | Extra CSS classes on the host                                        |

## Outputs

| Output       | Payload  | Description                                                                |
|--------------|----------|----------------------------------------------------------------------------|
| `accepted`   | `void`   | Emitted when the accept button is clicked                                  |
| `rejected`   | `void`   | Emitted when the reject button or overlay is clicked, or Escape is pressed |

## ConfirmPopupService

| Method           | Signature                              | Description                             |
|------------------|----------------------------------------|-----------------------------------------|
| `confirm`        | `(config: ConfirmPopupConfig) => void` | Show a popup with the given config      |
| `close`          | `(key?: string) => void`               | Programmatically close the popup        |
| `confirmation`   | `Signal<ConfirmPopupConfig \| null>`   | Readable signal of the current config   |

## ConfirmPopupConfig

| Property         | Type                                  | Description                     |
|------------------|---------------------------------------|---------------------------------|
| `key`            | `string?`                             | Match a specific popup instance |
| `target`         | `HTMLElement \| EventTarget \| null?` | Element to anchor the popup to  |
| `message`        | `string?`                             | Confirmation message            |
| `icon`           | `string?`                             | Icon CSS class                  |
| `acceptLabel`    | `string?`                             | Accept button label             |
| `rejectLabel`    | `string?`                             | Reject button label             |
| `acceptIcon`     | `string \| null?`                     | Accept button icon CSS class    |
| `rejectIcon`     | `string \| null?`                     | Reject button icon CSS class    |
| `acceptSeverity` | `ConfirmPopupButtonSeverity?`         | Accept button severity          |
| `rejectSeverity` | `ConfirmPopupButtonSeverity?`         | Reject button severity          |
| `defaultFocus`   | `ConfirmPopupDefaultFocus?`           | Initial focused button          |
| `accept`         | `() => void?`                         | Callback on accept              |
| `reject`         | `() => void?`                         | Callback on reject/dismiss      |

## Types

```ts
type ConfirmPopupVariant = 'material' | 'bootstrap' | 'minimal';
type ConfirmPopupButtonSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ConfirmPopupDefaultFocus = 'accept' | 'reject' | 'none';
type ConfirmPopupPlacement = 'above' | 'below';
```

## Service injection patterns

### Angular standalone (recommended)

```ts
// any.component.ts (standalone)
import { Component, inject } from '@angular/core';
import { ConfirmPopupService } from 'ui-lib-custom/confirm-popup';

@Component({ /* … */ })
export class MyComponent {
  private readonly confirmPopupService = inject(ConfirmPopupService);

  onDeleteClick(event: MouseEvent): void {
    this.confirmPopupService.confirm({
      target: event.currentTarget as HTMLElement,
      message: 'Delete this item permanently?',
      acceptLabel: 'Delete',
      acceptSeverity: 'danger',
      accept: () => this.deleteItem(),
    });
  }
}
```

### Constructor injection

```ts
constructor(private readonly confirmPopupService: ConfirmPopupService) {}
```

## Multiple instances

Use `key` when you need separate popup instances in the same layout (e.g., one in the header, one in the table):

```html
<!-- app.component.html -->
<ui-lib-confirm-popup key="header-popup" />
<ui-lib-confirm-popup key="table-popup" />
```

```ts
// Target a specific instance
this.confirmPopupService.confirm({
  key: 'table-popup',
  target: event.currentTarget as HTMLElement,
  message: 'Remove this row?',
  accept: () => this.removeRow(),
});

// Close a specific instance programmatically
this.confirmPopupService.close('table-popup');
```

## Common patterns

### Danger confirmation (delete)

```ts
this.confirmPopupService.confirm({
  target: event.currentTarget as HTMLElement,
  message: 'This action cannot be undone.',
  icon: 'warning',
  acceptLabel: 'Delete',
  acceptSeverity: 'danger',
  rejectLabel: 'Cancel',
  defaultFocus: 'reject',           // safer default for destructive actions
  accept: () => this.delete(),
});
```

### Low-friction confirmation (publish)

```ts
this.confirmPopupService.confirm({
  target: event.currentTarget as HTMLElement,
  message: 'Publish this draft?',
  acceptLabel: 'Publish',
  acceptSeverity: 'success',
  rejectLabel: 'Not now',
  defaultFocus: 'accept',
  accept: () => this.publish(),
});
```

### Programmatic close

```ts
// Close without a user action (e.g., when navigating away)
this.confirmPopupService.close();
```

### Reading current state (reactive)

```ts
// confirmPopupService.confirmation is a Signal<ConfirmPopupConfig | null>
const isOpen = computed(() => this.confirmPopupService.confirmation() !== null);
```

## CSS Custom Properties

Override visual styling at any scope without modifying component source.

```css
/* Global override */
:root {
  --uilib-confirm-popup-min-width: 280px;
  --uilib-confirm-popup-radius: 8px;
  --uilib-confirm-popup-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-confirm-popup-radius` | `var(--uilib-shape-base, 6px)` | Panel border radius |
| `--uilib-confirm-popup-min-width` | `240px` | Minimum popup width |
| `--uilib-confirm-popup-shadow` | `var(--uilib-shadow-lg, …)` | Panel drop shadow |
| `--uilib-confirm-popup-bg` | `var(--uilib-surface)` | Panel background |
| `--uilib-confirm-popup-border` | `var(--uilib-border)` | Panel border colour |
| `--uilib-confirm-popup-arrow-size` | `8px` | Pointer arrow size |
| `--uilib-confirm-popup-enter-duration` | `0.15s` | Open animation duration; `0ms` when `prefers-reduced-motion: reduce` |
| `--uilib-confirm-popup-leave-duration` | `0.1s` | Close animation duration |

## Positioning

The popup auto-positions above the target element by default. If there is insufficient space above, it positions below. An arrow points at the center of the target element. The panel is clamped within the viewport.

## Accessibility

### ARIA features

| Feature              | Detail                                                                                                                    |
|----------------------|---------------------------------------------------------------------------------------------------------------------------|
| `role="alertdialog"` | Applied to the panel element                                                                                              |
| `aria-modal="true"`  | Panel is marked as a modal region                                                                                         |
| `aria-label`         | Computed from the resolved message text — gives the `alertdialog` its required accessible name (no visible header exists) |
| `aria-describedby`   | Points to the content element containing the message text                                                                 |
| Focus trap           | Tab/Shift+Tab constrained to panel focusable elements while open                                                          |
| `defaultFocus`       | Which button receives focus when the popup opens (`'accept'` / `'reject'` / `'none'`)                                     |
| Focus restoration    | When the popup closes (accept, reject, Escape, or overlay click), focus returns to the element that opened it             |
| Arrow div            | `aria-hidden="true"` — decorative only                                                                                    |
| Message icon         | `aria-hidden="true"` — decorative only                                                                                    |
| Overlay div          | `aria-hidden="true"` — click-catcher is hidden from assistive technology                                                  |
| Reduced motion       | `@media (prefers-reduced-motion: reduce)` sets `--uilib-confirm-popup-enter-duration: 0ms`                                |
| `:focus-visible`     | Focus rings on all interactive buttons                                                                                    |

### Keyboard navigation

| Key           | Behaviour                                                       |
|---------------|-----------------------------------------------------------------|
| Tab           | Move focus to next focusable element within the popup           |
| Shift+Tab     | Move focus to previous focusable element within the popup       |
| Enter / Space | Activate the focused button (accept or reject)                  |
| Escape        | Close the popup (reject path); focus returns to trigger element |
