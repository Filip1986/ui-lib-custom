# Icon Button

**Selector:** `ui-lib-icon-button`
**Entry point:** `import { IconButton } from 'ui-lib-custom/icon-button'`

---

## Overview

Icon-only button component with size and variant support.

## API

### Inputs

| Name       | Type                     | Default                   | Description |
| ---------- | ------------------------ | ------------------------- | ----------- |
| `color`    | `IconButtonColor | null` | `null`                    | —           |
| `disabled` | `boolean`                | `false`                   | —           |
| `loading`  | `boolean`                | `false`                   | —           |
| `size`     | `IconButtonSize`         | `SHARED_DEFAULTS.Size`    | —           |
| `variant`  | `IconButtonVariant`      | `SHARED_DEFAULTS.Variant` | —           |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                           | Default                                    |
| -------------------------------------- | ------------------------------------------ |
| `--uilib-icon-button-disabled-opacity` | `0.5`                                      |
| `--uilib-icon-button-min-target-size`  | `2.75rem`                                  |
| `--uilib-icon-button-size`             | `var(--uilib-icon-button-min-target-size)` |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/button/

### Keyboard Interactions

| Test description                                                              |
| ----------------------------------------------------------------------------- |
| announces loading state through the aria-label                                |
| axe: default state passes                                                     |
| axe: disabled state passes                                                    |
| axe: loading state passes                                                     |
| creates with namespaced base classes                                          |
| does not expose aria-busy when not loading                                    |
| does not log a development error when ariaLabel is present                    |
| keeps enabled buttons keyboard discoverable                                   |
| logs a development error when ariaLabel is empty                              |
| marks the inner icon as aria-hidden                                           |
| mirrors disabled state with aria-disabled                                     |
| mirrors loading state with aria-disabled                                      |
| removes disabled buttons from normal keyboard interaction via native disabled |
| renders namespaced icon element class with aria-hidden                        |
| uses the provided aria-label on the native button                             |

## Usage Examples

```html
<ui-lib-icon-button icon="close" ariaLabel="Close dialog" (click)="onClose()" />
<ui-lib-icon-button icon="refresh" ariaLabel="Refresh data" [loading]="isRefreshing()" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#icon-button)
- [Demo page](/components/icon-button)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/icon-button/README.md)

