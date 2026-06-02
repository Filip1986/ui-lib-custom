# Scroll Top

**Selector:** `ui-lib-scroll-top`
**Entry point:** `import { ScrollTop } from 'ui-lib-custom/scroll-top'`

---

## Overview

ScrollTop — a floating "back to top" button that appears after the user scrolls past a configurable threshold. Can target the global window (default, `position: fixed`) or a parent scrollable container (`position: absolute`). Three sizes (sm / md / lg) and three design variants (material / bootstrap / minimal).

## API

### Inputs

| Name              | Type                | Default            | Description                                                                                       |
| ----------------- | ------------------- | ------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `behavior`        | `ScrollTopBehavior` | `'smooth'`         | Native scroll-behavior applied when scrolling back to top.                                        |
| `buttonAriaLabel` | `string`            | `''`               | Accessible label for the button. Falls back to the active locale's 'scroll-top.label' when empty. |
| `icon`            | `string`            | `'pi pi-arrow-up'` | CSS class(es) for the icon (e.g. "pi pi-arrow-up").                                               |
| `size`            | `ScrollTopSize`     | `'md'`             | Size of the button.                                                                               |
| `styleClass`      | `string             | null`              | `null`                                                                                            | Additional CSS classes to attach to the host element.           |
| `target`          | `ScrollTopTarget`   | `'window'`         | Target to listen for scroll events on: the global window or the parent element.                   |
| `threshold`       | `number`            | `400`              | Scroll distance in pixels before the button becomes visible.                                      |
| `variant`         | `ScrollTopVariant   | null`              | `null`                                                                                            | Visual variant — inherits from ThemeConfigService when not set. |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                       | Default                                    |
| ---------------------------------- | ------------------------------------------ |
| `--uilib-scroll-top-bg`            | `var(--uilib-color-primary, #6366f1)`      |
| `--uilib-scroll-top-bg-hover`      | `var(--uilib-color-primary-dark, #4f46e5)` |
| `--uilib-scroll-top-border`        | `none`                                     |
| `--uilib-scroll-top-border-radius` | `50%`                                      |
| `--uilib-scroll-top-bottom`        | `2rem`                                     |
| `--uilib-scroll-top-color`         | `#ffffff`                                  |
| `--uilib-scroll-top-icon-size`     | `1.25rem`                                  |
| `--uilib-scroll-top-icon-size-lg`  | `1.5rem`                                   |
| `--uilib-scroll-top-icon-size-sm`  | `1rem`                                     |
| `--uilib-scroll-top-right`         | `2rem`                                     |
| `--uilib-scroll-top-shadow`        | `0 4px 12px rgba(0, 0, 0, 0.2)`            |
| `--uilib-scroll-top-shadow-hover`  | `0 6px 16px rgba(0, 0, 0, 0.28)`           |
| `--uilib-scroll-top-size`          | `3rem`                                     |
| `--uilib-scroll-top-size-lg`       | `3.75rem`                                  |
| `--uilib-scroll-top-size-sm`       | `2.25rem`                                  |
| `--uilib-scroll-top-transition`    | `opacity 0.3s ease, transform 0.3s ease`   |
| `--uilib-scroll-top-z-index`       | `var(--uilib-z-overlay, 1000)`             |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                         |
| ------------------------------------------------------------------------ |
| should allow focus on the visible button for keyboard users              |
| should apply variant class when variant is set                           |
| should fall back to the default aria-label when buttonAriaLabel is blank |
| should fall back to the default aria-label when the input is blank       |
| should keep the button out of the tab order when hidden                  |
| should keep the hidden button out of the keyboard tab order              |
| should pass axe checks for the parent target variant                     |
| should pass axe checks when visible                                      |
| should pass axe checks while hidden by default                           |
| should reactively update a custom aria-label                             |
| should render a button with the correct aria-label                       |
| should render a button with the default aria-label                       |
| should restore keyboard focusability when the button becomes visible     |
| should restore the button tab order when visible                         |
| should update aria-label when buttonAriaLabel input changes              |

## Usage Examples

```html
<!-- Renders a floating button that appears after scrolling 400px -->
<ui-lib-scroll-top [threshold]="400" />

<!-- Inside a scrollable container -->
<div #scrollTarget style="height: 300px; overflow-y: auto">
  <p *ngFor="let i of items">Row {{ i }}</p>
  <ui-lib-scroll-top [target]="scrollTarget" />
</div>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#scroll-top)
- [Demo page](/components/scroll-top)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/scroll-top/README.md)
