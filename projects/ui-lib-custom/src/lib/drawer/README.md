# Drawer

A panel that slides in from the edge of the viewport, similar to PrimeNG's Drawer/Sidebar.

## Package path

```ts
import { Drawer } from 'ui-lib-custom/drawer';
```

## Selector

`ui-lib-drawer`

## Inputs

| Input            | Type                                      | Default     | Description                                          |
|------------------|-------------------------------------------|-------------|------------------------------------------------------|
| `visible`        | `model<boolean>`                          | `false`     | Two-way binding; controls open/close state.          |
| `header`         | `input<string>`                           | `''`        | Header text. Omit to hide the built-in header bar.   |
| `position`       | `input<'left'\|'right'\|'top'\|'bottom'>` | `'right'`   | Which edge the drawer slides in from.                |
| `size`           | `input<string>`                           | `'300px'`   | Panel width (left/right) or height (top/bottom).     |
| `modal`          | `input<boolean>`                          | `true`      | Whether to show the semi-transparent backdrop.       |
| `closeOnBackdrop`| `input<boolean>`                          | `true`      | Close when the backdrop is clicked.                  |
| `closeOnEscape`  | `input<boolean>`                          | `true`      | Close on Escape key press.                           |
| `blockScroll`    | `input<boolean>`                          | `true`      | Lock body scroll while open.                         |
| `showCloseButton`| `input<boolean>`                          | `true`      | Show the X close button in the header.               |
| `variant`        | `input<DrawerVariant \| null>`            | `null`      | Design variant; inherits from ThemeConfigService.    |
| `styleClass`     | `input<string \| null>`                   | `null`      | Extra CSS classes on the host element.               |

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

| Variable                         | Description                       |
|----------------------------------|-----------------------------------|
| `--uilib-drawer-size`            | Panel width or height             |
| `--uilib-drawer-panel-bg`        | Panel background colour           |
| `--uilib-drawer-panel-shadow`    | Panel box shadow                  |
| `--uilib-drawer-backdrop-bg`     | Backdrop colour                   |
| `--uilib-drawer-z-index`         | Z-index layer                     |
| `--uilib-drawer-transition-duration` | Slide animation duration      |
| `--uilib-drawer-padding`         | Content padding                   |
| `--uilib-drawer-header-border`   | Header bottom border              |
| `--uilib-drawer-title-color`     | Title text colour                 |
| `--uilib-drawer-close-color`     | Close button icon colour          |

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

- Panel has `role="dialog"` and `aria-modal="true"` when open.
- `aria-label` is set from the `header` input.
- Escape key closes the drawer (configurable via `closeOnEscape`).
- Focus moves to the panel on open.
- Body scroll locked while open (configurable via `blockScroll`).
