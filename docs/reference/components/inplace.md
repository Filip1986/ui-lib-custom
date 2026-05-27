# Inplace

**Selector:** `ui-lib-inplace`
**Entry point:** `import { Inplace } from 'ui-lib-custom/inplace'`

---

## Overview

Inplace — inline editing component that toggles between a display and content slot. The display trigger is a native `<button>` with `aria-expanded` and `aria-controls` so screen readers announce the toggle state correctly.  On activation, focus moves to the first focusable element inside the content slot; on deactivation it returns to the display button.  Pressing Escape while the content is active also deactivates. Supports three design variants (material / bootstrap / minimal) and falls back to the global ThemeConfigService.

## API

### Inputs

| Name           | Type                    | Default           | Description                                                                  |
| -------------- | ----------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `closable`     | `boolean`               | `false`           | When true, a close button is rendered inside the content slot to deactivate. |
| `closeIcon`    | `string`                | `'pi pi-times'`   | Icon class for the close button (e.g. "pi pi-times").                        |
| `closeLabel`   | `string`                | `'Close editor'`  | Accessible label for the close button. Override for i18n.                    |
| `disabled`     | `boolean`               | `false`           | When true, no interaction is allowed and the display slot appears disabled.  |
| `displayLabel` | `string`                | `'Click to edit'` | Accessible label for the display button. Override for i18n.                  |
| `styleClass`   | `string | null`         | `null`            | Additional CSS classes to attach to the host element.                        |
| `variant`      | `InplaceVariant | null` | `null`            | Visual variant — inherits from ThemeConfigService when not set.              |

### Models (two-way bindable)

| Name     | Type      | Default | Description                                                        |
| -------- | --------- | ------- | ------------------------------------------------------------------ |
| `active` | `boolean` | `false` | Whether the inplace editor is currently active (two-way bindable). |

### Outputs

| Name          | Type   | Description                                                                       |
| ------------- | ------ | --------------------------------------------------------------------------------- |
| `activated`   | `void` | Emitted when the inplace editor transitions to the active (editing) state.        |
| `deactivated` | `void` | Emitted when the inplace editor transitions back to the display (inactive) state. |

## Content Projection

| Selector           | Notes |
| ------------------ | ----- |
| `[inplaceContent]` | —     |
| `[inplaceDisplay]` | —     |

## Theming

| CSS Variable                                 | Default                                          |
| -------------------------------------------- | ------------------------------------------------ |
| `--uilib-inplace-close-button-bg`            | `transparent`                                    |
| `--uilib-inplace-close-button-bg-hover`      | `rgba(0, 0, 0, 0.08)`                            |
| `--uilib-inplace-close-button-border-radius` | `var(--uilib-radius-full, 9999px)`               |
| `--uilib-inplace-close-button-color`         | `var(--uilib-color-text, #374151)`               |
| `--uilib-inplace-close-button-size`          | `1.75rem`                                        |
| `--uilib-inplace-content-gap`                | `0.5rem`                                         |
| `--uilib-inplace-disabled-opacity`           | `0.5`                                            |
| `--uilib-inplace-display-bg-hover`           | `rgba(0, 0, 0, 0.04)`                            |
| `--uilib-inplace-display-border`             | `1px dashed transparent`                         |
| `--uilib-inplace-display-border-hover`       | `1px dashed var(--uilib-color-primary, #6366f1)` |
| `--uilib-inplace-display-border-radius`      | `var(--uilib-radius-sm, 0.375rem)`               |
| `--uilib-inplace-display-cursor`             | `pointer`                                        |
| `--uilib-inplace-display-padding`            | `0.25rem 0.375rem`                               |
| `--uilib-inplace-display-transition`         | `background-color 0.15s ease`                    |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                   |
| ------------------------------------------------------------------ |
| Enter key on display button activates the editor                   |
| Escape key inside content wrapper deactivates the editor           |
| Space key on display button activates the editor                   |
| all three variants: no accessibility violations                    |
| aria-expanded transitions from false to true on activation         |
| aria-expanded transitions from true to false on deactivation       |
| close button has aria-label                                        |
| close button icon span has aria-hidden=                            |
| display button has a default aria-label                            |
| display button has aria-controls pointing to content wrapper id    |
| display button has aria-expanded=                                  |
| display button still exposes aria-expanded when disabled           |
| should activate on Enter keydown on display slot                   |
| should activate on Space keydown on display slot                   |
| should apply base class and default variant class on host          |
| should apply variant class when variant is set                     |
| should deactivate on Escape keydown inside the content area        |
| should have aria-controls on display button pointing to content id |
| should have aria-expanded=                                         |
| should have aria-label on display button                           |
| should have display button in tab order when not disabled          |
| should remove display button from tab order when disabled          |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#inplace)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/inplace/README.md)

