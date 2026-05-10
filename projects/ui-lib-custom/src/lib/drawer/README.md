# Drawer

A panel that slides in from the edge of the viewport, similar to PrimeNG's Drawer/Sidebar.

## Package path

```ts
import { Drawer } from 'ui-lib-custom/drawer';
```

## Selector

`ui-lib-drawer`

## Inputs

| Input              | Type                                      | Default     | Description                                                          |
|--------------------|-------------------------------------------|-------------|----------------------------------------------------------------------|
| `visible`          | `model<boolean>`                          | `false`     | Two-way binding; controls open/close state.                          |
| `header`           | `input<string>`                           | `''`        | Header text. Omit to hide the built-in header bar.                   |
| `position`         | `input<'left'\|'right'\|'top'\|'bottom'>` | `'right'`   | Which edge the drawer slides in from.                                |
| `size`             | `input<string>`                           | `'300px'`   | Panel width (left/right) or height (top/bottom).                     |
| `modal`            | `input<boolean>`                          | `true`      | Whether to show the semi-transparent backdrop.                       |
| `closeOnBackdrop`  | `input<boolean>`                          | `true`      | Close when the backdrop is clicked.                                  |
| `closeOnEscape`    | `input<boolean>`                          | `true`      | Close on Escape key press.                                           |
| `blockScroll`      | `input<boolean>`                          | `true`      | Lock body scroll while open.                                         |
| `showCloseButton`  | `input<boolean>`                          | `true`      | Show the × close button in the header.                               |
| `ariaDescribedby`  | `input<string \| undefined>`              | `undefined` | `id` of a description element; sets `aria-describedby` on the panel. |
| `variant`          | `input<DrawerVariant \| null>`            | `null`      | Design variant; inherits from ThemeConfigService.                    |
| `styleClass`       | `input<string \| null>`                   | `null`      | Extra CSS classes on the host element.                               |

## Outputs

| Output   | Type             | Description                          |
|----------|------------------|--------------------------------------|
| `shown`  | `output<void>`   | Emits after the drawer opens.        |
| `hidden` | `output<void>`   | Emits after the drawer closes.       |

## Content projection

| Slot              | Selector          | Description                          |
|-------------------|-------------------|--------------------------------------|
| Body              | *(default)*       | Scrollable main content area.        |
| Custom header     | `[drawerHeader]`  | Replaces the built-in header slot.   |
| Footer            | `[drawerFooter]`  | Sticky footer area.                  |

## Types

```ts
type DrawerVariant = 'material' | 'bootstrap' | 'minimal';
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
```

## CSS variables

| Variable                             | Description                         |
|--------------------------------------|-------------------------------------|
| `--uilib-drawer-size`                | Panel width or height               |
| `--uilib-drawer-panel-bg`            | Panel background colour             |
| `--uilib-drawer-panel-shadow`        | Panel box shadow                    |
| `--uilib-drawer-backdrop-bg`         | Backdrop colour                     |
| `--uilib-drawer-z-index`             | Z-index layer                       |
| `--uilib-drawer-transition-duration` | Slide animation duration            |
| `--uilib-drawer-padding`             | Content padding                     |
| `--uilib-drawer-header-border`       | Header bottom border                |
| `--uilib-drawer-title-color`         | Title text colour                   |
| `--uilib-drawer-close-color`         | Close button icon colour            |

## Usage example

```html
<ui-lib-drawer [(visible)]="isOpen" header="Settings" position="right" size="380px">
  <p>Your settings content here.</p>
  <div drawerFooter>
    <ui-lib-button (click)="isOpen.set(false)">Close</ui-lib-button>
  </div>
</ui-lib-drawer>

<ui-lib-button (click)="isOpen.set(true)">Open Drawer</ui-lib-button>
```

## Accessibility

- Panel has `role="dialog"`.
- `aria-modal="true"` is set when `modal=true` AND the drawer is open (non-modal drawers omit `aria-modal`).
- When `header` is non-empty, the panel uses `aria-labelledby` pointing to the title `<span>`.
- When `header` is empty, `aria-label="Drawer"` provides a fallback accessible name.
- Pass `ariaDescribedby` to associate a description region with the panel.
- The close button uses an inline SVG icon with `aria-hidden="true"` + `aria-label="Close"`.
- Keyboard focus is trapped inside the panel while open (`FocusTrap`). Tab/Shift+Tab cycle within focusable elements.
- When the drawer closes, focus is automatically restored to the element that was focused before the drawer opened.
- Escape key closes the drawer (configurable via `closeOnEscape`).
- The host element has `aria-hidden="true"` when closed so background content is hidden from AT.
- Body scroll is locked while open (configurable via `blockScroll`).
- `@media (prefers-reduced-motion: reduce)` disables the slide animation.
