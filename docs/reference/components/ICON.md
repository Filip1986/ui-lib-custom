# Icon

**Selector:** `ui-lib-icon`
**Entry point:** `import { Icon } from 'ui-lib-custom/icon'`

---

## Overview

Icon component that resolves semantic names to the active icon library.

## API

### Inputs

| Name        | Type              | Default | Description |
| ----------- | ----------------- | ------- | ----------- | --- |
| `ariaLabel` | `string           | null`   | `null`      | —   |
| `clickable` | `boolean`         | `false` | —           |
| `color`     | `string           | null`   | `null`      | —   |
| `library`   | `IconLibrary      | null`   | `null`      | —   |
| `semantic`  | `boolean`         | `false` | —           |
| `size`      | `IconSize`        | `'md'`  | —           |
| `variant`   | `ComponentVariant | null`   | `null`      | —   |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable         | Default                          |
| -------------------- | -------------------------------- |
| `--uilib-icon-color` | `var(--uilib-text-dark-primary)` |

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                                             |
| ---------------------------------------------------------------------------- |
| applies dark theme variables                                                 |
| binds color input to the host CSS variable token                             |
| blank ariaLabel icon (treated as decorative) has no accessibility violations |
| defaults to a decorative aria-hidden icon                                    |
| does not log a warning when clickable=true with ariaLabel provided           |
| is aria-hidden by default                                                    |
| is not keyboard-focusable by default                                         |
| is not keyboard-focusable in informative mode                                |
| logs a warning when clickable=true without ariaLabel                         |
| never becomes focusable when clickable is set                                |
| never becomes keyboard-focusable even when clickable is requested            |
| renders namespaced glyph element class                                       |
| sets informative semantics when ariaLabel is provided                        |
| treats blank ariaLabel values as decorative                                  |
| treats whitespace-only ariaLabel as decorative (trims to empty)              |
| trims blank ariaLabel values back to decorative mode                         |
| uses role=                                                                   |
| uses the provided ariaLabel and removes aria-hidden when informative         |

## Usage Examples

```html
<!-- Semantic icon (resolved from active library) -->
<ui-lib-icon name="chevron-right" size="md" />

<!-- Decorative icon inside a labeled control -->
<ui-lib-button ariaLabel="Close dialog" icon="close" />

<!-- Standalone informative icon -->
<ui-lib-icon name="alert-circle" ariaLabel="Warning" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#icon)
- [Demo page](/components/icon)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/icon/README.md)
