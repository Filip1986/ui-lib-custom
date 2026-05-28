# Popover

**Selector:** `ui-lib-popover`
**Entry point:** `import { Popover } from 'ui-lib-custom/popover'`

---

## Overview

Popover — a lightweight floating panel anchored to a trigger element. Accepts arbitrary content via `<ng-content>`. Controlled programmatically via the `show()`, `hide()`, and `toggle()` methods (call them from a template ref or `viewChild`), or declaratively via the `[(visible)]` model binding.

## API

### Inputs

| Name              | Type                    | Default | Description                                                             |
| ----------------- | ----------------------- | ------- | ----------------------------------------------------------------------- |
| `closeOnEscape`   | `boolean`               | `true`  | When true (default), pressing Escape closes the popover.                |
| `dismissable`     | `boolean`               | `true`  | When true (default), clicking outside the panel closes the popover.     |
| `header`          | `string | null`         | `null`  | Optional header text displayed at the top of the panel.                 |
| `showCloseButton` | `boolean`               | `false` | When true, a close button (×) is rendered in the header area.           |
| `styleClass`      | `string | null`         | `null`  | Additional CSS classes applied to the host element.                     |
| `variant`         | `PopoverVariant | null` | `null`  | Design variant override; inherits from ThemeConfigService when not set. |

### Models (two-way bindable)

| Name      | Type      | Default | Description                                                            |
| --------- | --------- | ------- | ---------------------------------------------------------------------- |
| `visible` | `boolean` | `false` | Two-way visibility binding. Use `[(visible)]` for declarative control. |

### Outputs

| Name     | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| `hidden` | `void` | Emitted after the popover is hidden.       |
| `shown`  | `void` | Emitted after the popover becomes visible. |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                           | Default                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| `--uilib-popover-arrow-size`           | `8px`                                                        |
| `--uilib-popover-bg`                   | `var(--uilib-surface)`                                       |
| `--uilib-popover-border`               | `0 solid transparent`                                        |
| `--uilib-popover-border-radius`        | `var(--uilib-radius-md, 6px)`                                |
| `--uilib-popover-close-btn-color`      | `var(--uilib-page-fg-muted, #6b7280)`                        |
| `--uilib-popover-close-btn-hover-bg`   | `var(--uilib-surface-alt)`                                   |
| `--uilib-popover-close-btn-size`       | `1.5rem`                                                     |
| `--uilib-popover-content-padding`      | `var(--uilib-space-4, 1rem)`                                 |
| `--uilib-popover-enter-duration`       | `180ms`                                                      |
| `--uilib-popover-enter-easing`         | `cubic-bezier(0.16, 1, 0.3, 1)`                              |
| `--uilib-popover-header-border-bottom` | `1px solid var(--uilib-border)`                              |
| `--uilib-popover-header-font-size`     | `var(--uilib-font-size-sm, 0.875rem)`                        |
| `--uilib-popover-header-font-weight`   | `var(--uilib-font-weight-600, 600)`                          |
| `--uilib-popover-header-padding`       | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)`   |
| `--uilib-popover-max-width`            | `28rem`                                                      |
| `--uilib-popover-min-width`            | `14rem`                                                      |
| `--uilib-popover-shadow`               | `var(--uilib-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.15))` |
| `--uilib-popover-z-index`              | `var(--uilib-z-modal, 1050)`                                 |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Keyboard Interactions

| Test description                                                                  |
| --------------------------------------------------------------------------------- |
| Escape closes the popover when closeOnEscape=true                                 |
| Escape does NOT close when closeOnEscape=false                                    |
| action button is present and focusable after open                                 |
| arrow has aria-hidden=                                                            |
| axe passes in closed state                                                        |
| close button has aria-label=                                                      |
| close button icon has aria-hidden=                                                |
| closed state passes axe                                                           |
| focus is restored to trigger element when popover closes via Escape               |
| focus is restored to trigger element when popover closes via close button         |
| focus is restored to trigger element when popover closes via overlay click        |
| no focus restoration error when popover closed declaratively without prior show() |
| no role=                                                                          |
| open state (no header) passes axe                                                 |
| open state (with close button) passes axe                                         |
| open state (with header) passes axe                                               |
| overlay has aria-hidden=                                                          |
| panel aria-label is null when header is set (mutual exclusion)                    |
| panel has aria-label=                                                             |
| panel has aria-labelledby pointing to title span when header is set               |
| panel has aria-modal=                                                             |
| panel has role=                                                                   |
| panel has tabindex=                                                               |
| should apply bootstrap variant class to panel                                     |
| should apply material variant class to panel                                      |
| should apply minimal variant class to panel                                       |
| should close on Escape key when closeOnEscape is true                             |
| should have aria-label=                                                           |
| should have aria-modal=                                                           |
| should have role=                                                                 |
| should not close on Escape when closeOnEscape is false                            |
| should render the arrow element when panel is visible                             |
| title span id matches aria-labelledby value                                       |

## Usage Examples

```html
<ui-lib-button (click)="op.toggle($event)">Show Info</ui-lib-button>

<ui-lib-popover #op>
  <div style="padding: 1rem">
    <strong>Did you know?</strong>
    <p>Popovers stay open until dismissed.</p>
  </div>
</ui-lib-popover>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#popover)
- [Demo page](/components/popover)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/popover/README.md)

