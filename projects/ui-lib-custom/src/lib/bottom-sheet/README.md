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

## CSS custom properties

| Variable | Default | Description |
|---|---|---|
| `--uilib-bottom-sheet-panel-bg` | `var(--uilib-surface, #fff)` | Panel background color. |
| `--uilib-bottom-sheet-panel-shadow` | elevation shadow | Box-shadow above the panel. |
| `--uilib-bottom-sheet-border-radius` | `16px` | Top corner radius of the panel. |
| `--uilib-bottom-sheet-backdrop-bg` | `rgba(0,0,0,.48)` | Backdrop overlay colour. |
| `--uilib-bottom-sheet-z-index` | `var(--uilib-z-overlay, 1000)` | Stack order of the sheet. |
| `--uilib-bottom-sheet-transition-duration` | `0.32s` | Slide-in/out animation duration. |
| `--uilib-bottom-sheet-transition-easing` | `cubic-bezier(0.32, 0.72, 0, 1)` | Slide-in/out animation easing. |
| `--uilib-bottom-sheet-padding` | `var(--uilib-spacing-5, 1.25rem)` | Internal content padding. |
| `--uilib-bottom-sheet-header-bg` | `transparent` | Header background colour. |
| `--uilib-bottom-sheet-header-border` | `1px solid …` | Header bottom border. |
| `--uilib-bottom-sheet-title-color` | `var(--uilib-color-text-primary, #1a1a1a)` | Header title text colour. |
| `--uilib-bottom-sheet-title-font-size` | `1rem` | Header title font size. |
| `--uilib-bottom-sheet-title-font-weight` | `600` | Header title font weight. |
| `--uilib-bottom-sheet-close-color` | `var(--uilib-color-text-secondary, #6b7280)` | Close button icon colour. |
| `--uilib-bottom-sheet-close-hover-bg` | `var(--uilib-color-surface-hover, …)` | Close button hover background. |
| `--uilib-bottom-sheet-close-size` | `2rem` | Close button width/height. |

## ARIA attributes

| Attribute | Element | Description |
|---|---|---|
| `role="dialog"` | Panel | Marks the sheet as a dialog region. |
| `aria-modal="true"` | Panel | Signals to screen readers that content behind the sheet is inert (only when open). |
| `aria-labelledby` | Panel | References the header title element when `header` is provided. |
| `aria-hidden="true"` | Host, Backdrop | Hides the component (and backdrop) from screen readers when closed. |
| `aria-label="Close"` | Close button | Accessible name for the icon-only close button. |
| `aria-hidden="true"` | Close icon SVG | Marks the decorative SVG icon as presentational. |
| `tabindex="-1"` | Panel | Enables programmatic focus on the panel itself. |

## Keyboard interactions

| Key | Behaviour |
|---|---|
| `Escape` | Closes the sheet (when `closeOnEscape` is `true`) and returns focus to the previously focused element. |
| `Tab` | Cycles focus forward through all focusable elements inside the panel. Wraps from last to first. |
| `Shift+Tab` | Cycles focus backward. Wraps from first to last. |

## Accessibility

- **Focus trap** — When the sheet opens, focus is moved inside the panel and Tab/Shift+Tab are trapped within it. The `FocusTrap` utility from `ui-lib-custom/core` handles both trapping and restoration.
- **Focus restoration** — When the sheet closes, focus automatically returns to the element that was focused before the sheet opened.
- **`role="dialog"`** on the panel with `aria-modal="true"` when open.
- **`aria-labelledby`** pointing to the header title span (unique per instance) when `header` is provided.
- Unique per-instance IDs (`instanceId`, `titleId`) ensure correct ARIA associations in pages with multiple sheets.
- Scroll is locked on `<body>` while the sheet is open.
- Host element has `aria-hidden="true"` when closed.
- All animations respect `prefers-reduced-motion: reduce` — transitions are disabled when the user prefers reduced motion.

## Variants

| Variant | Border radius | Shadow | Notes |
|---|---|---|---|
| `material` | 20 px | Elevation + blur | Indigo close button accent |
| `bootstrap` | 4 px | Standard box-shadow | Sharp corners |
| `minimal` | 12 px | Subtle shadow | Clean, low-contrast |
