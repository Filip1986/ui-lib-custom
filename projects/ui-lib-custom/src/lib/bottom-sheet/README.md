# BottomSheet

A slide-up overlay panel anchored to the bottom of the viewport. Use it for contextual actions, share menus, and quick forms — inspired by Angular Material's `MatBottomSheet` but rendered as a self-contained component without CDK overlay infrastructure.

## Package path

```ts
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';
import type { BottomSheetVariant } from 'ui-lib-custom/bottom-sheet';
```

## Selector

```html
<ui-lib-bottom-sheet />
```

## Minimal usage

```html
<ui-lib-bottom-sheet [(visible)]="isOpen">
  <p>Sheet body content.</p>
</ui-lib-bottom-sheet>
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `visible` | `model<boolean>` | `false` | Controls open/close state. Supports two-way binding via `[(visible)]`. |
| `header` | `string` | `''` | Optional header text. When non-empty, renders a title bar with a close button. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant. Inherits from `ThemeConfigService` when `null`. |
| `showBackdrop` | `boolean` | `true` | Whether to show the semi-transparent backdrop behind the panel. |
| `closeOnBackdrop` | `boolean` | `true` | Whether clicking the backdrop closes the sheet. |
| `closeOnEscape` | `boolean` | `true` | Whether pressing `Escape` closes the sheet. |
| `styleClass` | `string \| null` | `null` | Additional CSS classes applied to the host element. |

## Outputs

| Output | Type | Description |
|---|---|---|
| `shown` | `void` | Emits after the sheet transitions to open. |
| `hidden` | `void` | Emits after the sheet transitions to closed. |

## Content projection

| Selector | Description |
|---|---|
| `(default)` | Main body content. Rendered inside a scrollable content area. |
| `[bottomSheetFooter]` | Sticky footer pinned to the bottom of the panel. Hidden when empty. |

## Usage examples

### With header and footer

```html
<ui-lib-bottom-sheet [(visible)]="isOpen" header="Share">
  <p>Choose a destination to share.</p>
  <div bottomSheetFooter>
    <button (click)="isOpen.set(false)">Cancel</button>
    <button (click)="share()">Share</button>
  </div>
</ui-lib-bottom-sheet>
```

### Explicit variant

```html
<ui-lib-bottom-sheet [(visible)]="isOpen" variant="material" header="Options">
  <p>Material-styled sheet with larger radius and elevation.</p>
</ui-lib-bottom-sheet>
```

### Locked (no backdrop dismiss)

```html
<ui-lib-bottom-sheet [(visible)]="isOpen" [closeOnBackdrop]="false">
  <p>Must be dismissed via the close button or programmatically.</p>
</ui-lib-bottom-sheet>
```

## CSS variables

| Variable | Default | Description |
|---|---|---|
| `--uilib-bottom-sheet-panel-bg` | `var(--uilib-surface, #fff)` | Panel background color. |
| `--uilib-bottom-sheet-panel-shadow` | elevation shadow | Box-shadow above the panel. |
| `--uilib-bottom-sheet-border-radius` | `16px` | Top corner radius of the panel. |
| `--uilib-bottom-sheet-backdrop-bg` | `rgba(0,0,0,.48)` | Backdrop overlay colour. |
| `--uilib-bottom-sheet-z-index` | `var(--uilib-z-overlay, 1000)` | Stack order of the sheet. |
| `--uilib-bottom-sheet-transition-duration` | `0.32s` | Slide-in/out animation duration. |
| `--uilib-bottom-sheet-padding` | `var(--uilib-spacing-5, 1.25rem)` | Internal content padding. |
| `--uilib-bottom-sheet-title-font-size` | `1rem` | Header title font size. |
| `--uilib-bottom-sheet-title-font-weight` | `600` | Header title font weight. |
| `--uilib-bottom-sheet-close-size` | `2rem` | Close button width/height. |

## Accessibility

- `role="dialog"` on the panel with `aria-modal="true"` when open.
- `aria-label` set to the `header` input value when provided.
- The panel receives focus when opened (via `tabindex="-1"` + programmatic focus).
- `Escape` key closes the sheet (configurable via `closeOnEscape`).
- Scroll is locked on `<body>` while the sheet is open.
- Host element has `aria-hidden="true"` when closed.

## Variants

| Variant | Border radius | Shadow | Notes |
|---|---|---|---|
| `material` | 20 px | Elevation + blur | Indigo close button accent |
| `bootstrap` | 4 px | Standard box-shadow | Sharp corners |
| `minimal` | 12 px | Subtle shadow | Clean, low-contrast |
