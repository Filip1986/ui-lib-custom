# Focus Trap

**Selector:** `ui-lib-focus-trap`
**Entry point:** `import { FocusTrap } from 'ui-lib-custom/focus-trap'`

---

## Overview

An Angular directive that constrains keyboard focus within a host element. Tab and Shift+Tab cycle only among the focusable descendants of the host, preventing focus from escaping — essential for accessible modals, dialogs, and side panels.

## API

### Inputs

| Name             | Type                        | Default | Description                                                                                                                                                                                                  |
| ---------------- | --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `uiLibFocusTrap` | `boolean, boolean | string` | `true`  | When `true` (default), focus is trapped inside the host element. Supports attribute-only usage — `<div uiLibFocusTrap>` is equivalent to `[uiLibFocusTrap]="true"`. Set to `false` to deactivate at runtime. |

### Outputs

_none_

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                              |
| ----------------------------------------------------------------------------- |
| assigns unique sentinel ids per focus trap instance                           |
| does not trap focus when disabled                                             |
| focuses the trap container when no focusable descendants exist                |
| keeps Shift+Tab navigation trapped from first to last                         |
| keeps Tab navigation trapped from last to first                               |
| keeps focus on container when end sentinel is focused and no focusables exist |
| marks sentinel nodes aria-hidden and tabbable                                 |
| moves focus to the first focusable child when activated                       |
| passes axe checks in default state                                            |
| passes axe checks in disabled state                                           |
| restores focus to the trigger when trap is deactivated                        |
| routes focus from end sentinel to the first focusable element                 |
| routes focus from start sentinel to the last focusable element                |
| should add the ui-lib-focus-trap host class                                   |
| should deactivate trap and restore focus on destroy                           |
| should move focus to the first focusable element on activation                |
| should not trap focus when uiLibFocusTrap is false                            |
| should wrap focus from first to last on Shift+Tab                             |
| should wrap focus from last to first on Tab                                   |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#focus-trap)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/focus-trap/README.md)

