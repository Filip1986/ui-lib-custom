# Drawer

**Selector:** `ui-lib-drawer`
**Entry point:** `import { Drawer } from 'ui-lib-custom/drawer'`

---

## Overview

Drawer — a panel that slides in from the edge of the viewport. Bind `[(visible)]` to open/close. Project content inside; use `[drawerHeader]` for a custom header or `[drawerFooter]` for a sticky footer.

## API

### Inputs

| Name              | Type             | Default    | Description                                                              |
| ----------------- | ---------------- | ---------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `ariaDescribedby` | `string          | undefined` | `undefined`                                                              | `id` of an element that describes the drawer panel. When provided, the value is set on the panel's `aria-describedby` attribute. |
| `blockScroll`     | `boolean`        | `true`     | Whether to lock body scroll while the drawer is open.                    |
| `closeOnBackdrop` | `boolean`        | `true`     | Whether a click on the backdrop closes the drawer.                       |
| `closeOnEscape`   | `boolean`        | `true`     | Whether pressing Escape closes the drawer.                               |
| `header`          | `string`         | `''`       | Optional header text. Omit to hide the built-in header bar.              |
| `modal`           | `boolean`        | `true`     | Whether to render the semi-transparent backdrop behind the drawer.       |
| `position`        | `DrawerPosition` | `'right'`  | Which edge the drawer slides in from.                                    |
| `showCloseButton` | `boolean`        | `true`     | Whether to show the built-in close button in the header.                 |
| `size`            | `string`         | `'300px'`  | Panel width (left/right) or height (top/bottom). Accepts any CSS length. |
| `styleClass`      | `string          | null`      | `null`                                                                   | Additional CSS classes applied to the host element.                                                                              |
| `variant`         | `DrawerVariant   | null`      | `null`                                                                   | Visual design variant — inherits from ThemeConfigService when not set.                                                           |

### Models (two-way bindable)

| Name      | Type      | Default | Description                                                             |
| --------- | --------- | ------- | ----------------------------------------------------------------------- |
| `visible` | `boolean` | `false` | Whether the drawer is open. Supports two-way binding via `[(visible)]`. |

### Outputs

| Name     | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| `hidden` | `void` | Emits after the drawer finishes closing. |
| `shown`  | `void` | Emits after the drawer finishes opening. |

## Content Projection

| Selector         | Notes |
| ---------------- | ----- |
| _(default)_      | —     |
| `[drawerFooter]` | —     |
| `[drawerHeader]` | —     |

## Theming

| CSS Variable                         | Default                                                           |
| ------------------------------------ | ----------------------------------------------------------------- |
| `--uilib-drawer-backdrop-bg`         | `rgba(0, 0, 0, 0.48)`                                             |
| `--uilib-drawer-border-radius`       | `0px`                                                             |
| `--uilib-drawer-close-color`         | `var(--uilib-color-text-secondary, #6b7280)`                      |
| `--uilib-drawer-close-hover-bg`      | `var(--uilib-color-surface-hover, rgba(0, 0, 0, 0.06))`           |
| `--uilib-drawer-close-size`          | `2rem`                                                            |
| `--uilib-drawer-header-bg`           | `transparent`                                                     |
| `--uilib-drawer-header-border`       | `1px solid var(--uilib-color-surface-border, rgba(0, 0, 0, 0.1))` |
| `--uilib-drawer-padding`             | `var(--uilib-spacing-5, 1.25rem)`                                 |
| `--uilib-drawer-panel-bg`            | `var(--uilib-surface, #ffffff)`                                   |
| `--uilib-drawer-panel-shadow`        | `0 8px 32px rgba(0, 0, 0, 0.18)`                                  |
| `--uilib-drawer-size`                | `300px`                                                           |
| `--uilib-drawer-title-color`         | `var(--uilib-color-text-primary, #1a1a1a)`                        |
| `--uilib-drawer-title-font-size`     | `1rem`                                                            |
| `--uilib-drawer-title-font-weight`   | `600`                                                             |
| `--uilib-drawer-transition-duration` | `0.3s`                                                            |
| `--uilib-drawer-transition-easing`   | `cubic-bezier(0.32, 0.72, 0, 1)`                                  |
| `--uilib-drawer-z-index`             | `var(--uilib-z-overlay, 1000)`                                    |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Keyboard Interactions

| Test description                                                            |
| --------------------------------------------------------------------------- |
| Escape closes the drawer when closeOnEscape is true                         |
| Escape does not close the drawer when closeOnEscape is false                |
| documents intentional axe rule skips                                        |
| focus wraps at the first focusable element (Shift+Tab → last)               |
| focus wraps at the last focusable element (Tab → first)                     |
| host aria-hidden is removed when drawer is open                             |
| host has aria-hidden=                                                       |
| modal drawer has aria-modal=                                                |
| non-modal drawer does not have aria-modal when open                         |
| panel does not have a redundant aria-hidden attribute                       |
| panel does not have aria-describedby by default                             |
| panel has aria-describedby when ariaDescribedby input is provided           |
| panel has aria-label=                                                       |
| panel has aria-labelledby pointing to the title element when header is set  |
| panel has role=                                                             |
| panel should not have a redundant aria-hidden attribute                     |
| passes axe on drawer in visible + modal state with no violations            |
| passes axe on drawer in visible + non-modal state with no violations        |
| passes axe on drawer without header text (aria-label fallback)              |
| should apply material variant class                                         |
| should apply minimal variant class                                          |
| should apply variant class from input                                       |
| should close on Escape key when closeOnEscape is true                       |
| should have role=                                                           |
| should have tabindex=                                                       |
| should not close on Escape key when closeOnEscape is false                  |
| should not set aria-describedby when ariaDescribedby is not provided        |
| should not set aria-modal when closed                                       |
| should not set aria-modal when visible but modal=false                      |
| should remove aria-hidden from host when open                               |
| should set aria-describedby when ariaDescribedby is provided                |
| should set aria-hidden=                                                     |
| should set aria-labelledby pointing to the title element when header is set |
| should set aria-modal=                                                      |
| should use aria-label=                                                      |
| when drawer has no focusable elements, focus goes to the panel itself       |
| when the drawer closes, focus is restored to the trigger element            |

## Usage Examples

```html
<ui-lib-drawer [(visible)]="isOpen" header="Settings" position="right" size="380px">
  <p>Your settings content here.</p>
  <div drawerFooter>
    <ui-lib-button (click)="isOpen.set(false)">Close</ui-lib-button>
  </div>
</ui-lib-drawer>

<ui-lib-button (click)="isOpen.set(true)">Open Drawer</ui-lib-button>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#drawer)
- [Demo page](/components/drawer)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/drawer/README.md)
