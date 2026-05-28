# Progress Bar

**Selector:** `ui-lib-progress-bar`
**Entry point:** `import { ProgressBar } from 'ui-lib-custom/progress-bar'`

---

## Overview

ProgressBar — displays a horizontal bar indicating progress or loading state. Supports determinate mode (fixed percentage fill) and indeterminate mode (animated oscillating bar for unknown durations).  Three design variants and three size tokens integrate with the library theming system.

## API

### Inputs

| Name              | Type                        | Default         | Description                                                                                                                                            |
| ----------------- | --------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ariaLabel`       | `string | null`             | `null`          | Accessible label for the progress bar. Auto-set to "Loading" in indeterminate mode when not provided.                                                  |
| `ariaLabelledBy`  | `string | null`             | `null`          | ID of an external element that labels this progress bar (`aria-labelledby`).                                                                           |
| `ariaValueText`   | `string | null`             | `null`          | Human-readable value text announced by screen readers. Overrides the default computed text — useful for i18n (e.g., `"75 Prozent"` or `"Chargement"`). |
| `color`           | `string | null`             | `null`          | Custom CSS color applied directly to the fill element, overriding the CSS variable.                                                                    |
| `completionLabel` | `string | null`             | `null`          | Message read by a polite live region when progress reaches 100%. Defaults to `"Complete"` when not set.                                                |
| `label`           | `string | null`             | `null`          | Custom label text; overrides the computed percentage string when set.                                                                                  |
| `mode`            | `ProgressBarMode`           | `'determinate'` | Display mode.                                                                                                                                          |
| `showValue`       | `boolean`                   | `true`          | Whether to display the numeric percentage label inside the fill bar.                                                                                   |
| `size`            | `ProgressBarSize`           | `'md'`          | Component size token.                                                                                                                                  |
| `styleClass`      | `string | null`             | `null`          | Additional CSS classes applied to the host element.                                                                                                    |
| `value`           | `number`                    | `0`             | Progress value from 0 to 100. Clamped automatically.                                                                                                   |
| `variant`         | `ProgressBarVariant | null` | `null`          | Design variant — inherits from ThemeConfigService when not set.                                                                                        |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                           | Default                               |
| -------------------------------------- | ------------------------------------- |
| `--uilib-progress-bar-border-radius`   | `var(--uilib-radius-full, 9999px)`    |
| `--uilib-progress-bar-fill-bg`         | `var(--uilib-color-primary, #6366f1)` |
| `--uilib-progress-bar-height`          | `1.25rem`                             |
| `--uilib-progress-bar-height-lg`       | `1.75rem`                             |
| `--uilib-progress-bar-height-sm`       | `0.625rem`                            |
| `--uilib-progress-bar-label-color`     | `#fff`                                |
| `--uilib-progress-bar-label-font-size` | `0.75rem`                             |
| `--uilib-progress-bar-track-bg`        | `var(--uilib-surface-200, #e5e7eb)`   |
| `--uilib-progress-bar-transition`      | `width 0.4s ease`                     |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                  |
| ----------------------------------------------------------------- |
| aria-label defaults to                                            |
| aria-label reflects ariaLabel input                               |
| aria-labelledby is absent when not set                            |
| aria-labelledby reflects ariaLabelledBy input                     |
| aria-valuemax is                                                  |
| aria-valuemin is                                                  |
| aria-valuenow is absent (not                                      |
| aria-valuenow reflects current value in determinate mode          |
| ariaLabel input overrides the indeterminate default               |
| host element has role=                                            |
| live region announces                                             |
| live region announces custom completionLabel                      |
| live region has aria-atomic=                                      |
| passes axe — complete state (value=100)                           |
| passes axe — determinate state                                    |
| passes axe — indeterminate state                                  |
| passes axe — with custom ariaLabel                                |
| reflects a custom ariaValueText input                             |
| should apply variant class when variant is set                    |
| should have role=                                                 |
| should not set aria-valuenow in indeterminate mode                |
| should set aria-busy in indeterminate mode                        |
| should set aria-label to                                          |
| should set aria-valuemin and aria-valuemax                        |
| should set aria-valuenow to the clamped value in determinate mode |
| updates aria-valuetext reactively when value changes              |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#progress-bar)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/progress-bar/README.md)

