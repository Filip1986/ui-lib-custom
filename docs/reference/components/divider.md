# Divider

**Selector:** `ui-lib-divider`
**Entry point:** `import { Divider } from 'ui-lib-custom/divider'`

---

## Overview

Divider — a visual separator that can be horizontal or vertical, with optional label/icon content projected into the middle. Supports three line types (solid / dashed / dotted), five alignment options, three sizes, and three design variants (material / bootstrap / minimal).

## API

### Inputs

| Name          | Type                 | Default        | Description                                                                                                               |
| ------------- | -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `align`       | `DividerAlign        | null`          | `null`                                                                                                                    | Alignment of the projected content along the divider. - Horizontal: `'left'`                            | `'center'` | `'right'` (default: `'center'`) - Vertical: `'top'` | `'center'` | `'bottom'` (default: `'center'`) Defaults to `null`, which resolves to `'center'`. |
| `ariaLabel`   | `string              | null`          | `null`                                                                                                                    | Accessible label announced by assistive technologies. Set this when divider content is meaningful text. |
| `decorative`  | `boolean`            | `false`        | Marks divider as decorative-only. When true (and no ariaLabel is set), the divider is hidden from assistive technologies. |
| `orientation` | `DividerOrientation` | `'horizontal'` | Direction of the divider line. Defaults to `'horizontal'`.                                                                |
| `styleClass`  | `string              | null`          | `null`                                                                                                                    | Additional CSS classes to attach to the host element.                                                   |
| `type`        | `DividerType`        | `'solid'`      | Visual style of the divider line. Defaults to `'solid'`.                                                                  |
| `variant`     | `DividerVariant      | null`          | `null`                                                                                                                    | Visual variant — inherits from ThemeConfigService when not set.                                         |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                          | Default                             |
| ------------------------------------- | ----------------------------------- |
| `--uilib-divider-border-style`        | `solid`                             |
| `--uilib-divider-color`               | `var(--uilib-surface-300, #d1d5db)` |
| `--uilib-divider-content-color`       | `var(--uilib-color-text, #374151)`  |
| `--uilib-divider-content-font-family` | `var(--uilib-font-ui, inherit)`     |
| `--uilib-divider-content-font-size`   | `0.875rem`                          |
| `--uilib-divider-content-font-weight` | `400`                               |
| `--uilib-divider-content-padding`     | `0.5rem`                            |
| `--uilib-divider-margin-h`            | `var(--uilib-spacing-4, 1rem)`      |
| `--uilib-divider-margin-v`            | `var(--uilib-spacing-4, 1rem)`      |
| `--uilib-divider-thickness`           | `1px`                               |
| `--uilib-divider-vertical-min-height` | `5rem`                              |

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                                              |
| ----------------------------------------------------------------------------- |
| does not expose live-region announcements                                     |
| is not keyboard-focusable by default                                          |
| sets aria-label for labeled divider                                           |
| should apply variant class when provided                                      |
| should default align to center when align is null                             |
| should have aria-orientation=                                                 |
| should have role=                                                             |
| should keep divider exposed when decorative is true but ariaLabel is provided |
| should set aria-hidden=                                                       |
| should set aria-label when ariaLabel is provided                              |
| should trim aria-label and remove it when empty                               |
| uses role=                                                                    |

## Usage Examples

```html
<!-- Horizontal divider (default) -->
<ui-lib-divider />

<!-- Labelled divider -->
<ui-lib-divider align="center">or</ui-lib-divider>

<!-- Vertical divider (inside flex row) -->
<div style="display:flex; height:40px; align-items:center; gap:1rem">
  <span>Left</span>
  <ui-lib-divider layout="vertical" />
  <span>Right</span>
</div>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#divider)
- [Demo page](/components/divider)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/divider/README.md)
