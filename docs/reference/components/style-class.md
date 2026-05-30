# Style Class

**Selector:** `ui-lib-style-class`
**Entry point:** `import { StyleClass } from 'ui-lib-custom/style-class'`

---

## Overview

Toggle Panel

## API

### Inputs

| Name                 | Type      | Default | Description                                                                                                                                          |
| -------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enterActiveClass`   | `string`  | `''`    | CSS class(es) added during the enter transition (e.g. a keyframe animation class).                                                                   |
| `enterDoneClass`     | `string`  | `''`    | CSS class(es) kept on the target after the enter transition finishes. If empty, `enterToClass` is kept instead.                                      |
| `enterFromClass`     | `string`  | `''`    | CSS class(es) applied to the target at the very start of the enter transition.                                                                       |
| `enterToClass`       | `string`  | `''`    | CSS class(es) applied to the target at the end of the enter transition.                                                                              |
| `hideOnOutsideClick` | `boolean` | `false` | When `true`, clicking anywhere outside the target element while it is in the entered state triggers the leave transition (or removes `toggleClass`). |
| `leaveActiveClass`   | `string`  | `''`    | CSS class(es) added during the leave transition (e.g. a keyframe animation class).                                                                   |
| `leaveDoneClass`     | `string`  | `''`    | CSS class(es) kept on the target after the leave transition finishes. If empty, `leaveToClass` is kept instead.                                      |
| `leaveFromClass`     | `string`  | `''`    | CSS class(es) applied to the target at the very start of the leave transition.                                                                       |
| `leaveToClass`       | `string`  | `''`    | CSS class(es) applied to the target at the end of the leave transition.                                                                              |
| `toggleClass`        | `string`  | `''`    | A single CSS class that is toggled on the target on every click. When set, the full enter/leave lifecycle is bypassed.                               |

### Outputs

_none_

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                  |
| --------------------------------------------------------------------------------- |
| does not add enter animation classes when prefers-reduced-motion is enabled       |
| passes axe in the default closed toggle state                                     |
| passes axe in the open toggle state                                               |
| restores aria-expanded=false after closing in toggle mode                         |
| restores aria-hidden=true after closing in toggle mode                            |
| sets aria-expanded=false and aria-hidden=true initially in transition mode        |
| sets aria-expanded=false on the trigger initially in toggle mode                  |
| sets aria-expanded=true after opening in toggle mode                              |
| sets aria-hidden=false after opening in toggle mode                               |
| sets aria-hidden=true on the target initially in toggle mode                      |
| should add enterFromClass synchronously on click                                  |
| should apply enterDoneClass after timeout fallback                                |
| should apply enterDoneClass when animationend fires before timeout                |
| should apply enterDoneClass when transitionend fires before timeout               |
| should swap enterFrom→enterActive after rAF                                       |
| updates aria-expanded=false and aria-hidden=true when leaving in transition mode  |
| updates aria-expanded=true and aria-hidden=false when entering in transition mode |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#style-class)
- [Demo page](/components/style-class)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/style-class/README.md)

