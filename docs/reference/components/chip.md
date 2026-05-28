# Chip

**Selector:** `ui-lib-chip`
**Entry point:** `import { Chip } from 'ui-lib-custom/chip'`

---

## Overview

Chip — compact element representing an attribute, tag, or action. Supports an optional icon, image, label, and a removable close button. Three sizes (sm / md / lg) and three design variants (material / bootstrap / minimal). Falls back to content projection when no label, icon, or image is set.

## API

### Inputs

| Name         | Type                 | Default         | Description                                                                                 |
| ------------ | -------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| `icon`       | `string | null`      | `null`          | CSS class string for a PrimeIcons icon (e.g. "pi pi-user").                                 |
| `image`      | `string | null`      | `null`          | URL of an image to display at the start of the chip.                                        |
| `imageAlt`   | `string`             | `'Chip'`        | Alt text for the chip image.                                                                |
| `label`      | `string | null`      | `null`          | Text label displayed inside the chip.                                                       |
| `removable`  | `boolean`            | `false`         | When true, a remove button is rendered at the end of the chip.                              |
| `removeIcon` | `string`             | `'pi pi-times'` | CSS class for the remove icon (defaults to "pi pi-times").                                  |
| `selectable` | `boolean`            | `false`         | When true, the chip can be toggled via click or Space / Enter.                              |
| `selected`   | `boolean`            | `false`         | Selected state when the chip is selectable. Pair with (selectedChange) for two-way binding. |
| `size`       | `ChipSize`           | `'md'`          | Size of the chip.                                                                           |
| `styleClass` | `string | null`      | `null`          | Additional CSS classes to attach to the host element.                                       |
| `variant`    | `ChipVariant | null` | `null`          | Visual variant — inherits from ThemeConfigService when not set.                             |

### Outputs

| Name             | Type         | Description                                                                 |
| ---------------- | ------------ | --------------------------------------------------------------------------- |
| `removed`        | `MouseEvent` | Emitted when the remove button is clicked.                                  |
| `selectedChange` | `boolean`    | Emitted when a selectable chip is toggled; provides the new selected value. |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                         | Default                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| `--uilib-chip-bg`                    | `var(--uilib-color-primary, #6366f1)`                                           |
| `--uilib-chip-border`                | `none`                                                                          |
| `--uilib-chip-border-radius`         | `var(--uilib-radius-full, 9999px)`                                              |
| `--uilib-chip-color`                 | `#ffffff`                                                                       |
| `--uilib-chip-font-size`             | `0.875rem`                                                                      |
| `--uilib-chip-font-size-lg`          | `1rem`                                                                          |
| `--uilib-chip-font-size-sm`          | `0.75rem`                                                                       |
| `--uilib-chip-font-weight`           | `500`                                                                           |
| `--uilib-chip-gap`                   | `0.375rem`                                                                      |
| `--uilib-chip-icon-font-size`        | `0.875em`                                                                       |
| `--uilib-chip-image-size`            | `1.5rem`                                                                        |
| `--uilib-chip-image-size-lg`         | `1.75rem`                                                                       |
| `--uilib-chip-image-size-sm`         | `1.25rem`                                                                       |
| `--uilib-chip-padding-x`             | `0.75rem`                                                                       |
| `--uilib-chip-padding-x-lg`          | `1rem`                                                                          |
| `--uilib-chip-padding-x-sm`          | `0.5rem`                                                                        |
| `--uilib-chip-padding-y`             | `0.25rem`                                                                       |
| `--uilib-chip-padding-y-lg`          | `0.375rem`                                                                      |
| `--uilib-chip-padding-y-sm`          | `0.125rem`                                                                      |
| `--uilib-chip-remove-bg`             | `transparent`                                                                   |
| `--uilib-chip-remove-bg-hover`       | `rgba(255, 255, 255, 0.2)`                                                      |
| `--uilib-chip-remove-color`          | `inherit`                                                                       |
| `--uilib-chip-remove-icon-font-size` | `0.65em`                                                                        |
| `--uilib-chip-transition`            | `var( --uilib-transition-base, background-color 0.2s ease, opacity 0.2s ease )` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                    |
| ------------------------------------------------------------------- |
| Enter key should emit selectedChange on a selectable chip           |
| Space key should emit selectedChange on a selectable chip           |
| basic chip should have no axe violations                            |
| chip icon should have aria-hidden=                                  |
| chip with icon should have no axe violations                        |
| chip with image should have no axe violations                       |
| non-removable chip should have role=                                |
| non-selectable chip should not have a tabindex attribute            |
| removable chip should have no axe violations                        |
| removable chip should have role=                                    |
| remove button icon should have aria-hidden=                         |
| remove button should have aria-label                                |
| selectable chip should have aria-selected=                          |
| selectable chip should have no axe violations                       |
| selectable chip should have tabindex=                               |
| selected chip should have no axe violations                         |
| should add selectable class when selectable is true                 |
| should add selected class when selectable and selected are true     |
| should apply base class and default size/variant classes            |
| should apply role=                                                  |
| should apply variant class when variant is set                      |
| should emit selectedChange when Enter is pressed on selectable chip |
| should emit selectedChange when Space is pressed on selectable chip |
| should not emit selectedChange on keydown when not selectable       |
| should set aria-label on host from label input                      |
| should set aria-selected=                                           |
| should set generic remove aria-label when no label                  |
| should set tabindex=                                                |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#chip)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/chip/README.md)

