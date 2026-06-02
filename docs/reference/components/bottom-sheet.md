# Bottom Sheet

**Selector:** `ui-lib-bottom-sheet`
**Entry point:** `import { BottomSheet } from 'ui-lib-custom/bottom-sheet'`

---

## Overview

BottomSheet — a slide-up overlay panel anchored to the bottom of the viewport. Bind `[(visible)]` to open/close the sheet. Project your content inside the component; use the `[bottomSheetFooter]` attribute on a child element for a sticky footer slot.

## API

### Inputs

| Name              | Type                | Default | Description                                                       |
| ----------------- | ------------------- | ------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| `closeOnBackdrop` | `boolean`           | `true`  | Whether a click on the backdrop closes the sheet.                 |
| `closeOnEscape`   | `boolean`           | `true`  | Whether pressing Escape closes the sheet.                         |
| `header`          | `string`            | `''`    | Optional header text rendered in the sheet header bar.            |
| `showBackdrop`    | `boolean`           | `true`  | Whether to render the semi-transparent backdrop behind the sheet. |
| `styleClass`      | `string             | null`   | `null`                                                            | Additional CSS classes applied to the host element.             |
| `variant`         | `BottomSheetVariant | null`   | `null`                                                            | Visual variant — inherits from ThemeConfigService when not set. |

### Models (two-way bindable)

| Name      | Type      | Default | Description                                                            |
| --------- | --------- | ------- | ---------------------------------------------------------------------- |
| `visible` | `boolean` | `false` | Whether the sheet is open. Supports two-way binding via `[(visible)]`. |

### Outputs

| Name     | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `hidden` | `void` | Emits after the sheet finishes closing. |
| `shown`  | `void` | Emits after the sheet finishes opening. |

## Content Projection

| Selector              | Notes |
| --------------------- | ----- |
| _(default)_           | —     |
| `[bottomSheetFooter]` | —     |

## Theming

| CSS Variable                               | Default                                                           |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `--uilib-bottom-sheet-backdrop-bg`         | `rgba(0, 0, 0, 0.48)`                                             |
| `--uilib-bottom-sheet-border-radius`       | `16px`                                                            |
| `--uilib-bottom-sheet-close-color`         | `var(--uilib-color-text-secondary, #6b7280)`                      |
| `--uilib-bottom-sheet-close-hover-bg`      | `var(--uilib-color-surface-hover, rgba(0, 0, 0, 0.06))`           |
| `--uilib-bottom-sheet-close-size`          | `2rem`                                                            |
| `--uilib-bottom-sheet-header-bg`           | `transparent`                                                     |
| `--uilib-bottom-sheet-header-border`       | `1px solid var(--uilib-color-surface-border, rgba(0, 0, 0, 0.1))` |
| `--uilib-bottom-sheet-padding`             | `var(--uilib-spacing-5, 1.25rem)`                                 |
| `--uilib-bottom-sheet-panel-bg`            | `var(--uilib-surface, #ffffff)`                                   |
| `--uilib-bottom-sheet-panel-shadow`        | `0 -4px 24px rgba(0, 0, 0, 0.18)`                                 |
| `--uilib-bottom-sheet-title-color`         | `var(--uilib-color-text-primary, #1a1a1a)`                        |
| `--uilib-bottom-sheet-title-font-size`     | `1rem`                                                            |
| `--uilib-bottom-sheet-title-font-weight`   | `600`                                                             |
| `--uilib-bottom-sheet-transition-duration` | `0.32s`                                                           |
| `--uilib-bottom-sheet-transition-easing`   | `cubic-bezier(0.32, 0.72, 0, 1)`                                  |
| `--uilib-bottom-sheet-z-index`             | `var(--uilib-z-overlay, 1000)`                                    |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| Escape key closes the sheet when closeOnEscape is true                     |
| Escape key does NOT close the sheet when closeOnEscape is false            |
| backdrop has aria-hidden=                                                  |
| close button icon SVG is decorative (aria-hidden=                          |
| focus returns to trigger element when sheet closes                         |
| focus wraps at the first focusable element (Shift+Tab → last)              |
| focus wraps at the last focusable element (Tab → first)                    |
| host does not hide content from screen readers when sheet is open          |
| host has aria-hidden=                                                      |
| panel does not have a redundant aria-hidden attribute                      |
| panel does not have aria-modal when sheet is closed                        |
| panel has aria-labelledby pointing to the title element when header is set |
| panel has aria-modal=                                                      |
| panel has no aria-labelledby when header is empty                          |
| panel has role=                                                            |
| passes axe on closed sheet — no violations                                 |
| passes axe on open sheet with close button visible — no violations         |
| passes axe on open sheet with header — no violations                       |
| should apply bootstrap variant class                                       |
| should apply material variant class                                        |
| should apply minimal variant class                                         |
| should have aria-hidden false when open                                    |
| should have aria-hidden true when closed                                   |
| should have role=dialog on panel                                           |
| title element has an id matching panel aria-labelledby                     |
| when sheet has no focusable elements, focus falls back to the panel        |

## Usage Examples

```html
<!-- Trigger + BottomSheet declared in same template -->
<ui-lib-button (click)="sheet.open()">Open Sheet</ui-lib-button>

<ui-lib-bottom-sheet #sheet>
  <h2 uilib-bottom-sheet-title>Share</h2>
  <p>Choose how to share this item.</p>
  <div uilib-bottom-sheet-actions>
    <ui-lib-button (click)="sheet.close()">Cancel</ui-lib-button>
    <ui-lib-button severity="primary" (click)="share()">Share</ui-lib-button>
  </div>
</ui-lib-bottom-sheet>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#bottom-sheet)
- [Demo page](/components/bottom-sheet)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/bottom-sheet/README.md)
