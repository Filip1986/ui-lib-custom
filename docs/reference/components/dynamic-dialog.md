# Dynamic Dialog

**Selector:** `ui-lib-dynamic-dialog`
**Entry point:** `import { DynamicDialog } from 'ui-lib-custom/dynamic-dialog'`

---

## Overview

Internal shell component rendered by DialogService.open(). This component is NOT intended to be placed in templates directly. Use DialogService.open(SomeComponent, config) instead.

## API

### Inputs

| Name            | Type                   | Default | Description |
| --------------- | ---------------------- | ------- | ----------- |
| `componentType` | `Type<unknown> | null` | `null`  | —           |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                                | Default                                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `--uilib-dynamic-dialog-backdrop-animation` | `uilib-dynamic-dialog-fade-in 0.2s ease`                                                                       |
| `--uilib-dynamic-dialog-close-btn-radius`   | `var(--uilib-radius-full, 9999px)`                                                                             |
| `--uilib-dynamic-dialog-close-btn-size`     | `2rem`                                                                                                         |
| `--uilib-dynamic-dialog-header-gap`         | `0.5rem`                                                                                                       |
| `--uilib-dynamic-dialog-panel-animation`    | `uilib-dynamic-dialog-enter 0.2s cubic-bezier(0.4, 0, 0.2, 1)`                                                 |
| `--uilib-dynamic-dialog-shadow-bootstrap`   | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`                                                                            |
| `--uilib-dynamic-dialog-shadow-material`    | `0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)` |
| `--uilib-dynamic-dialog-shadow-minimal`     | `0 4px 12px rgba(0, 0, 0, 0.08)`                                                                               |
| `--uilib-dynamic-dialog-transition`         | `200ms ease`                                                                                                   |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                            |
| ------------------------------------------------------------------------------------------- |
| Escape key closes the dialog                                                                |
| Escape key from inside guest component content closes the dialog                            |
| Shift+Tab wraps from first focusable element back to last inside the panel                  |
| Tab wraps from last focusable element back to first inside the panel                        |
| activateFocusTrap() focuses the panel itself when no focusable child exists                 |
| activateFocusTrap() moves focus to the first focusable element inside the panel             |
| close button SVG icon is aria-hidden                                                        |
| close button has aria-label=                                                                |
| close button receives focus via FocusTrap when closable=true and no other focusable element |
| documents intentional axe rule skips                                                        |
| non-Escape key does not close the dialog                                                    |
| panel has aria-describedby when ariaDescribedby is configured                               |
| panel has aria-label=                                                                       |
| panel has aria-labelledby pointing to the title element when header is provided             |
| panel has aria-modal=                                                                       |
| panel has no aria-describedby when ariaDescribedby is not configured                        |
| panel has no aria-label when header text is present (aria-labelledby takes over)            |
| panel has no aria-labelledby when no header is provided                                     |
| panel has no aria-modal when modal=false                                                    |
| panel has role=                                                                             |
| panel has tabindex=                                                                         |
| panel uses config.ariaLabel when no header is provided                                      |
| passes axe when ariaDescribedby is configured                                               |
| passes axe when modal=false (non-modal) with header                                         |
| passes axe when modal=true with header                                                      |
| passes axe when no header and ariaLabel is provided                                         |
| restores focus to the trigger element when the dialog closes                                |
| should NOT close when a key other than Escape is pressed                                    |
| should apply the default center position class when position is not specified               |
| should apply the variant class to the panel                                                 |
| should call ref.close() when Escape is pressed on the panel                                 |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#dynamic-dialog)
- [Demo page](/components/dynamic-dialog)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/dynamic-dialog/README.md)

