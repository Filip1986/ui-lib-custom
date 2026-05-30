# Focus Trap

**Selector:** `ui-lib-focus-trap`
**Entry point:** `import { FocusTrap } from 'ui-lib-custom/focus-trap'`

---

## Overview

An Angular directive that constrains keyboard focus within a host element. Tab and Shift+Tab cycle only among the focusable descendants of the host, preventing focus from escaping — essential for accessible modals, dialogs, and side panels.

## API

### Inputs

| Name                   | Type                        | Default | Description                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`            | `boolean`                   | `true`  | When `true` (default), the trap moves focus to the element matching `initialFocusSelector`, or to the first focusable descendant, immediately on activation. Set `false` when a parent component manages initial focus.                                                                                                                                                      |
| `initialFocusSelector` | `string | null`             | `null`  | CSS selector identifying the element that should receive focus when the trap activates. Evaluated as `querySelector` on the host element. Falls back to the first focusable descendant when no match is found. Only used when `autoFocus` is `true`. In dev mode a console warning is emitted if no matching element is found. Example: `initialFocusSelector="#cancel-btn"` |
| `restoreFocus`         | `boolean`                   | `true`  | When `true` (default), deactivating the trap returns focus to whichever element was active before the trap activated. Set `false` when the activating element will no longer exist after close.                                                                                                                                                                              |
| `sentinelClass`        | `string | null`             | `null`  | Extra CSS class name(s) added to each sentinel `<span>` element. Primarily useful for debugging — add a class and style the sentinels to make them visible during development. Example: `sentinelClass="debug-sentinel"` then `.debug-sentinel { opacity: 1 !important; outline: 2px solid red; }`                                                                           |
| `uiLibFocusTrap`       | `boolean, boolean | string` | `true`  | When `true` (default), focus is trapped inside the host element. Supports attribute-only usage — `<div uiLibFocusTrap>` is equivalent to `[uiLibFocusTrap]="true"`. Set to `false` to deactivate at runtime.                                                                                                                                                                 |

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
| focuses the element matching initialFocusSelector on activation               |
| focuses the trap container when no focusable descendants exist                |
| keeps Shift+Tab navigation trapped from first to last                         |
| keeps Tab navigation trapped from last to first                               |
| keeps focus on container when end sentinel is focused and no focusables exist |
| marks sentinel nodes aria-hidden and tabbable                                 |
| moves focus to the first focusable child when activated                       |
| passes axe checks in default state                                            |
| passes axe checks in disabled state                                           |
| passes axe checks with initialFocusSelector                                   |
| passes axe checks with restoreFocus=false                                     |
| restores focus to the trigger when trap is deactivated                        |
| routes focus from end sentinel to the first focusable element                 |
| routes focus from start sentinel to the last focusable element                |
| should add the ui-lib-focus-trap host class                                   |
| should deactivate trap and restore focus on destroy                           |
| should fall back to first focusable element when selector matches nothing     |
| should focus the element matching the selector on activation                  |
| should move focus to the first focusable element on activation                |
| should not move focus on activation when autoFocus is false                   |
| should not restore focus to the trigger when restoreFocus is false            |
| should not trap focus when uiLibFocusTrap is false                            |
| should wrap focus from first to last on Shift+Tab                             |
| should wrap focus from last to first on Tab                                   |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#focus-trap)
- [Demo page](/components/focus-trap)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/focus-trap/README.md)

