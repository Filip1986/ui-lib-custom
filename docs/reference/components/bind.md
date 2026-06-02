# Bind

**Selector:** `ui-lib-bind`
**Entry point:** `import { Bind } from 'ui-lib-custom/bind'`

---

## Overview

Properties are applied via `Renderer2.setProperty`, not `setAttribute`, so

## API

### Inputs

| Name        | Type                      | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `uiLibBind` | `Record<string, unknown>` | `{}`    | An object whose enumerable own properties are applied as DOM properties on the host element. Use DOM property names (`tabIndex`, `ariaHidden`, `htmlFor`) rather than lowercase attribute names (`tabindex`, `aria-hidden`, `for`). `Record<string, unknown>` is intentionally broad so callers can supply any valid native/custom host property. Pass an empty object (`{}`) or set an individual key to `null` to clear previously bound properties. |

### Outputs

_none_

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| passes axe with uiLibBind applied to a basic element                       |
| should normalize kebab-case aria keys to reflected DOM properties          |
| should remove reflected aria attributes when the directive still owns them |
| should set a numeric DOM property like tabIndex                            |
| should set reflected ariaHidden state when using DOM property names        |

## Usage Examples

```html
<div [uiLibBind]="{ id: 'hero', title: 'Hello world' }"></div>
<input [uiLibBind]="dynamicProps" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#bind)
- [Demo page](/components/bind)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/bind/README.md)
