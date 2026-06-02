# Ripple

**Selector:** `ui-lib-ripple`
**Entry point:** `import { Ripple } from 'ui-lib-custom/ripple'`

---

## Overview

The `Ripple` directive adds a Material-style circular wave effect to any element on click. It is a pure behaviour directive — no component wrapper is needed.

## API

### Inputs

| Name             | Type      | Default | Description                                                                                                                                                               |
| ---------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`       | `boolean` | `false` | When `true`, no ripple wave is produced on click.                                                                                                                         |
| `rippleColor`    | `string`  | `''`    | Override the CSS variable `--uilib-ripple-color` inline. Accepts any valid CSS colour value (e.g. `'rgba(0,0,0,0.12)'`). If not provided, the CSS variable value is used. |
| `rippleDuration` | `string`  | `''`    | Override the animation duration inline (e.g. `'500ms'`). If not provided, the CSS variable `--uilib-ripple-duration` value is used.                                       |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable              | Default                        |
| ------------------------- | ------------------------------ |
| `--uilib-ripple-color`    | `rgba(255, 255, 255, 0.35)`    |
| `--uilib-ripple-duration` | `600ms`                        |
| `--uilib-ripple-easing`   | `cubic-bezier(0.4, 0, 0.2, 1)` |

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                                  |
| ----------------------------------------------------------------- |
| does not add any ARIA role to the host element                    |
| does not add aria-label or aria-labelledby to the host element    |
| passes axe after a ripple wave is spawned                         |
| passes axe on a basic ripple host                                 |
| passes axe on a disabled ripple host                              |
| passes axe with multiple ripple hosts on the same page            |
| spawns a wave on keyboard-activated click (Enter/Space on button) |

## Usage Examples

```html
<!-- Basic usage — white semi-transparent ripple -->
<button uiLibRipple>Click me</button>

<!-- Dark ripple for light surfaces -->
<div uiLibRipple [rippleColor]="'rgba(0, 0, 0, 0.12)'">Card surface</div>

<!-- Custom duration -->
<button uiLibRipple rippleDuration="400ms">Fast ripple</button>

<!-- Disable ripple conditionally -->
<button uiLibRipple [disabled]="isLoading">Submit</button>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#ripple)
- [Demo page](/components/ripple)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/ripple/README.md)
