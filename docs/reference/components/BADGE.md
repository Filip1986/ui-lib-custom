# Badge

**Selector:** `ui-lib-badge`
**Entry point:** `import { Badge } from 'ui-lib-custom/badge'`

---

## Overview

Badge - A performant badge/tag component for labels, status, and counts Single element rendering with OnPush strategy and signal-based inputs. Uses design tokens for consistent styling.

## API

### Inputs

| Name         | Type                  | Default     | Description                                                                      |
| ------------ | --------------------- | ----------- | -------------------------------------------------------------------------------- |
| `color`      | `BadgeColor`          | `'primary'` | Color theme of the badge                                                         |
| `decorative` | `boolean`             | `false`     | Whether the badge is decorative and should be hidden from assistive technologies |
| `dot`        | `boolean`             | `false`     | Whether the badge is a dot (small circular indicator)                            |
| `label`      | `string | null`       | `null`      | Accessible label for the badge, used when screen reader support is needed        |
| `pill`       | `boolean`             | `false`     | Whether the badge is a pill shape (fully rounded)                                |
| `size`       | `BadgeSize`           | `'md'`      | Size of the badge                                                                |
| `variant`    | `BadgeVariant | null` | `null`      | Visual variant of the badge                                                      |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                          | Default                                                               |
| ------------------------------------- | --------------------------------------------------------------------- |
| `--uilib-badge-bg`                    | `var(--uilib-surface-dark-3)`                                         |
| `--uilib-badge-bg-outline-resolved`   | `transparent`                                                         |
| `--uilib-badge-bg-resolved`           | `var(--uilib-badge-bg, var(--uilib-color-neutral-50))`                |
| `--uilib-badge-bg-subtle`             | `var(--uilib-surface-dark-2)`                                         |
| `--uilib-badge-bg-subtle-resolved`    | `var(--uilib-badge-bg-subtle, var(--uilib-color-neutral-50))`         |
| `--uilib-badge-border`                | `var(--uilib-border-dark)`                                            |
| `--uilib-badge-border-color-resolved` | `transparent`                                                         |
| `--uilib-badge-border-width-resolved` | `0`                                                                   |
| `--uilib-badge-dot-size`              | `0.5rem`                                                              |
| `--uilib-badge-fg`                    | `var(--uilib-text-dark-primary)`                                      |
| `--uilib-badge-fg-resolved`           | `var(--uilib-badge-fg, var(--uilib-color-neutral-900))`               |
| `--uilib-badge-font-size-resolved`    | `var(--uilib-font-size-sm)`                                           |
| `--uilib-badge-gap-resolved`          | `var(--uilib-space-1)`                                                |
| `--uilib-badge-padding-x-base`        | `0.5rem`                                                              |
| `--uilib-badge-padding-x-resolved`    | `calc( var(--uilib-badge-padding-x-base) * var(--uilib-density, 1) )` |
| `--uilib-badge-padding-y-base`        | `0.25rem`                                                             |
| `--uilib-badge-padding-y-resolved`    | `calc( var(--uilib-badge-padding-y-base) * var(--uilib-density, 1) )` |
| `--uilib-badge-radius-resolved`       | `var(--uilib-badge-radius, var(--uilib-shape-base, 6px))`             |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                        |
| ----------------------------------------------------------------------- |
| applies dark theme variables                                            |
| does not set a live role for non-dot badges                             |
| falls back to color as aria-label for dot badges without explicit label |
| has no axe violations in decorative state                               |
| has no axe violations in default state                                  |
| has no axe violations in informative dot status state                   |
| is not keyboard-focusable by default                                    |
| marks decorative badges as aria-hidden                                  |
| passes through explicit aria-label for informational badges             |
| sets aria attributes for dot badges                                     |
| sets aria-hidden for decorative badges                                  |
| uses outline variant styles                                             |
| uses solid variant styles by default                                    |
| uses subtle variant styles                                              |

## Usage Examples

```html
<!-- Inline text badge -->
<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>

<!-- Dot status indicator -->
<ui-lib-badge color="danger" [dot]="true" label="Error status" />

<!-- Decorative badge (ignored by assistive technology) -->
<ui-lib-badge [dot]="true" [decorative]="true" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#badge)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/badge/README.md)

