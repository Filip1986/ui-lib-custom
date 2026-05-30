# Button

**Selector:** `ui-lib-button`
**Entry point:** `import { Button } from 'ui-lib-custom/button'`

---

## Overview

Action button component with 12 appearances, 9 severities, and orthogonal pill / raised modifiers.

## API

### Inputs

| Name            | Type                                 | Default     | Description |
| --------------- | ------------------------------------ | ----------- | ----------- |
| `appearance`    | `ButtonAppearance`                   | `'solid'`   | —           |
| `ariaChecked`   | `boolean | null`                     | `null`      | —           |
| `ariaLabel`     | `string | null`                      | `null`      | —           |
| `ariaPressed`   | `boolean | null`                     | `null`      | —           |
| `badge`         | `string | number | null | undefined` | `null`      | —           |
| `badgeClass`    | `string | null`                      | `null`      | —           |
| `badgeSeverity` | `BadgeSeverity`                      | `'danger'`  | —           |
| `disabled`      | `boolean`                            | `false`     | —           |
| `fullWidth`     | `boolean`                            | `false`     | —           |
| `icon`          | `SemanticIcon | string | null`       | `null`      | —           |
| `iconOnly`      | `boolean`                            | `false`     | —           |
| `iconPosition`  | `IconPosition`                       | `'left'`    | —           |
| `loading`       | `boolean`                            | `false`     | —           |
| `loadingIcon`   | `SemanticIcon | string`              | `'spinner'` | —           |
| `loadingLabel`  | `string | null`                      | `null`      | —           |
| `pill`          | `boolean`                            | `false`     | —           |
| `raised`        | `boolean`                            | `false`     | —           |
| `role`          | `string | null`                      | `null`      | —           |
| `severity`      | `ButtonSeverity | null`              | `null`      | —           |
| `shadow`        | `string | null`                      | `null`      | —           |
| `size`          | `ButtonSize`                         | `'md'`      | —           |
| `softDisabled`  | `boolean`                            | `false`     | —           |
| `tabIndex`      | `number | null`                      | `null`      | —           |
| `type`          | `ButtonType`                         | `'button'`  | —           |
| `variant`       | `ButtonVariant | null`               | `null`      | —           |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                                  | Default                                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--uilib-button-badge-font-size`              | `var(--uilib-button-badge-font-size, var(--uilib-font-size-sm))`                                                        |
| `--uilib-button-badge-offset-x`               | `var(--uilib-button-badge-offset-x, var(--uilib-space-2))`                                                              |
| `--uilib-button-badge-offset-y`               | `var(--uilib-button-badge-offset-y, var(--uilib-space-2))`                                                              |
| `--uilib-button-badge-padding`                | `var( --uilib-button-badge-padding, var(--uilib-space-1) var(--uilib-space-2) )`                                        |
| `--uilib-button-badge-radius`                 | `var(--uilib-button-badge-radius, var(--uilib-shape-base, 6px))`                                                        |
| `--uilib-button-badge-shadow`                 | `var(--uilib-button-badge-shadow, var(--uilib-shadow-sm))`                                                              |
| `--uilib-button-bg`                           | `transparent`                                                                                                           |
| `--uilib-button-bg-active`                    | `var( --uilib-button-primary-bg-active, var(--uilib-button-primary-bg-hover) )`                                         |
| `--uilib-button-bg-hover`                     | `var(--uilib-button-primary-bg-hover)`                                                                                  |
| `--uilib-button-border`                       | `var(--uilib-button-primary-border)`                                                                                    |
| `--uilib-button-border-style`                 | `solid`                                                                                                                 |
| `--uilib-button-border-width`                 | `1px`                                                                                                                   |
| `--uilib-button-contrast-bg`                  | `var(--uilib-text-dark-primary)`                                                                                        |
| `--uilib-button-contrast-bg-hover`            | `var(--uilib-text-dark-secondary)`                                                                                      |
| `--uilib-button-contrast-border`              | `var(--uilib-text-dark-primary)`                                                                                        |
| `--uilib-button-contrast-fg`                  | `var(--uilib-color-neutral-950, #0b1220)`                                                                               |
| `--uilib-button-danger-bg`                    | `var(--uilib-color-danger-600)`                                                                                         |
| `--uilib-button-danger-bg-hover`              | `var(--uilib-color-danger-700)`                                                                                         |
| `--uilib-button-danger-border`                | `var(--uilib-color-danger-600)`                                                                                         |
| `--uilib-button-danger-fg`                    | `var(--uilib-color-neutral-950, #0b1220)`                                                                               |
| `--uilib-button-disabled-opacity`             | `0.5`                                                                                                                   |
| `--uilib-button-fg`                           | `var(--uilib-button-border, currentColor)`                                                                              |
| `--uilib-button-focus-color`                  | `var(--uilib-color-primary-500)`                                                                                        |
| `--uilib-button-focus-ring`                   | `0 0 0 3px var(--uilib-button-focus-ring-color)`                                                                        |
| `--uilib-button-focus-ring-color`             | `var(--uilib-color-primary-100)`                                                                                        |
| `--uilib-button-font-size`                    | `var(--uilib-button-font-size-small)`                                                                                   |
| `--uilib-button-font-size-large`              | `var(--uilib-font-size-lg)`                                                                                             |
| `--uilib-button-font-size-medium`             | `var(--uilib-font-size-md)`                                                                                             |
| `--uilib-button-font-size-small`              | `var(--uilib-font-size-sm)`                                                                                             |
| `--uilib-button-framed-active-translate-x`    | `var(--uilib-button-framed-stroke)`                                                                                     |
| `--uilib-button-framed-active-translate-y`    | `var(--uilib-button-framed-stroke)`                                                                                     |
| `--uilib-button-framed-bg`                    | `#ffc82c`                                                                                                               |
| `--uilib-button-framed-border-color`          | `#ffffff`                                                                                                               |
| `--uilib-button-framed-border-width`          | `var(--uilib-button-framed-stroke)`                                                                                     |
| `--uilib-button-framed-fg`                    | `#000000`                                                                                                               |
| `--uilib-button-framed-font-weight`           | `500`                                                                                                                   |
| `--uilib-button-framed-frame-active-offset-x` | `calc(2 * var(--uilib-button-framed-stroke))`                                                                           |
| `--uilib-button-framed-frame-active-offset-y` | `calc(2 * var(--uilib-button-framed-stroke))`                                                                           |
| `--uilib-button-framed-frame-border-width`    | `var(--uilib-button-framed-stroke)`                                                                                     |
| `--uilib-button-framed-frame-color`           | `#ffc82c`                                                                                                               |
| `--uilib-button-framed-frame-hover-offset-x`  | `calc(3 * var(--uilib-button-framed-stroke))`                                                                           |
| `--uilib-button-framed-frame-hover-offset-y`  | `calc(3 * var(--uilib-button-framed-stroke))`                                                                           |
| `--uilib-button-framed-frame-offset-x`        | `calc(2 * var(--uilib-button-framed-stroke))`                                                                           |
| `--uilib-button-framed-frame-offset-y`        | `calc(2 * var(--uilib-button-framed-stroke))`                                                                           |
| `--uilib-button-framed-letter-spacing`        | `-0.025em`                                                                                                              |
| `--uilib-button-framed-stroke`                | `4px`                                                                                                                   |
| `--uilib-button-gap`                          | `var(--uilib-space-2, 0.5rem)`                                                                                          |
| `--uilib-button-glass-shadow-active-x`        | `4px`                                                                                                                   |
| `--uilib-button-glass-shadow-active-y`        | `4px`                                                                                                                   |
| `--uilib-button-glass-shadow-bg`              | `rgba(255, 255, 255, 0.2)`                                                                                              |
| `--uilib-button-glass-shadow-bg-hover`        | `rgba(255, 255, 255, 0.28)`                                                                                             |
| `--uilib-button-glass-shadow-blur-amount`     | `8px`                                                                                                                   |
| `--uilib-button-glass-shadow-border-color`    | `rgba(255, 255, 255, 0.2)`                                                                                              |
| `--uilib-button-glass-shadow-border-hover`    | `rgba(255, 255, 255, 0.35)`                                                                                             |
| `--uilib-button-glass-shadow-fg`              | `#000`                                                                                                                  |
| `--uilib-button-glass-shadow-font-weight`     | `500`                                                                                                                   |
| `--uilib-button-glass-shadow-from`            | `#ff5f6d`                                                                                                               |
| `--uilib-button-glass-shadow-glow-blur`       | `0.2px`                                                                                                                 |
| `--uilib-button-glass-shadow-gradient-angle`  | `90deg`                                                                                                                 |
| `--uilib-button-glass-shadow-hover-x`         | `12px`                                                                                                                  |
| `--uilib-button-glass-shadow-hover-y`         | `12px`                                                                                                                  |
| `--uilib-button-glass-shadow-letter-spacing`  | `-0.025em`                                                                                                              |
| `--uilib-button-glass-shadow-opacity`         | `0.9`                                                                                                                   |
| `--uilib-button-glass-shadow-to`              | `#ffc371`                                                                                                               |
| `--uilib-button-glass-shadow-x`               | `8px`                                                                                                                   |
| `--uilib-button-glass-shadow-y`               | `8px`                                                                                                                   |
| `--uilib-button-icon-gap`                     | `var(--uilib-space-2)`                                                                                                  |
| `--uilib-button-info-bg`                      | `var(--uilib-color-info-600)`                                                                                           |
| `--uilib-button-info-bg-hover`                | `var(--uilib-color-info-700)`                                                                                           |
| `--uilib-button-info-border`                  | `var(--uilib-color-info-600)`                                                                                           |
| `--uilib-button-info-fg`                      | `var(--uilib-color-neutral-950, #0b1220)`                                                                               |
| `--uilib-button-letter-spacing`               | `normal`                                                                                                                |
| `--uilib-button-padding`                      | `var(--uilib-button-padding-small)`                                                                                     |
| `--uilib-button-padding-large`                | `var(--uilib-button-padding-y-large, var(--uilib-space-3)) var(--uilib-button-padding-x-large, var(--uilib-space-5))`   |
| `--uilib-button-padding-medium`               | `var(--uilib-button-padding-y-medium, var(--uilib-space-2)) var(--uilib-button-padding-x-medium, var(--uilib-space-4))` |
| `--uilib-button-padding-small`                | `var(--uilib-button-padding-y-small, var(--uilib-space-1)) var(--uilib-button-padding-x-small, var(--uilib-space-3))`   |
| `--uilib-button-padding-x-large`              | `calc( var(--uilib-button-padding-x-large-base, 3rem) * var(--uilib-density, 1) )`                                      |
| `--uilib-button-padding-x-medium`             | `calc( var(--uilib-button-padding-x-medium-base, 2rem) * var(--uilib-density, 1) )`                                     |
| `--uilib-button-padding-x-small`              | `calc( var(--uilib-button-padding-x-small-base, 1rem) * var(--uilib-density, 1) )`                                      |
| `--uilib-button-padding-y-large`              | `calc( var(--uilib-button-padding-y-large-base, 1.5rem) * var(--uilib-density, 1) )`                                    |
| `--uilib-button-padding-y-medium`             | `calc( var(--uilib-button-padding-y-medium-base, 1rem) * var(--uilib-density, 1) )`                                     |
| `--uilib-button-padding-y-small`              | `calc( var(--uilib-button-padding-y-small-base, 0.5rem) * var(--uilib-density, 1) )`                                    |
| `--uilib-button-primary-bg`                   | `var(--uilib-color-primary-dark)`                                                                                       |
| `--uilib-button-primary-bg-hover`             | `color-mix( in srgb, var(--uilib-color-primary-dark) 85%, #000000 )`                                                    |
| `--uilib-button-primary-border`               | `var(--uilib-color-primary-dark)`                                                                                       |
| `--uilib-button-primary-fg`                   | `var(--uilib-color-neutral-950, #0b1220)`                                                                               |
| `--uilib-button-radius`                       | `var(--uilib-shape-base, 6px)`                                                                                          |
| `--uilib-button-secondary-bg`                 | `var(--uilib-surface-dark-4)`                                                                                           |
| `--uilib-button-secondary-bg-hover`           | `var(--uilib-surface-dark-5)`                                                                                           |
| `--uilib-button-secondary-border`             | `var(--uilib-border-dark)`                                                                                              |
| `--uilib-button-secondary-fg`                 | `var(--uilib-text-dark-primary)`                                                                                        |
| `--uilib-button-shadow`                       | `var(--uilib-shadow-sm, none)`                                                                                          |
| `--uilib-button-shadow-hover`                 | `var(--uilib-shadow-md, var(--uilib-shadow-sm, none))`                                                                  |
| `--uilib-button-shadow-raised`                | `var( --uilib-button-shadow-raised, var(--uilib-button-shadow, var(--uilib-shadow-md, none)) )`                         |
| `--uilib-button-shadow-raised-hover`          | `var( --uilib-button-shadow-raised-hover, var(--uilib-button-shadow-hover, var(--uilib-shadow-lg, none)) )`             |
| `--uilib-button-success-bg`                   | `var(--uilib-color-success-600)`                                                                                        |
| `--uilib-button-success-bg-hover`             | `var(--uilib-color-success-700)`                                                                                        |
| `--uilib-button-success-border`               | `var(--uilib-color-success-600)`                                                                                        |
| `--uilib-button-success-fg`                   | `var(--uilib-color-neutral-950, #0b1220)`                                                                               |
| `--uilib-button-tactile-border`               | `#1a77d9`                                                                                                               |
| `--uilib-button-tactile-border-width`         | `2.5px`                                                                                                                 |
| `--uilib-button-tactile-fg`                   | `#fff`                                                                                                                  |
| `--uilib-button-tactile-from`                 | `#4aa6ff`                                                                                                               |
| `--uilib-button-tactile-radius`               | `1.25rem`                                                                                                               |
| `--uilib-button-tactile-to`                   | `#278eff`                                                                                                               |
| `--uilib-button-text-transform`               | `none`                                                                                                                  |
| `--uilib-button-transition`                   | `all 0.2s ease`                                                                                                         |
| `--uilib-button-warning-bg`                   | `var(--uilib-color-warning-600)`                                                                                        |
| `--uilib-button-warning-bg-hover`             | `var(--uilib-color-warning-700)`                                                                                        |
| `--uilib-button-warning-border`               | `var(--uilib-color-warning-600)`                                                                                        |
| `--uilib-button-warning-fg`                   | `var(--uilib-color-neutral-950, #0b1220)`                                                                               |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                      |
| --------------------------------------------------------------------- |
| applies dark theme variables                                          |
| applies each variant class                                            |
| applies global variant and allows per-instance override               |
| applies shadow CSS variables when shadow is set                       |
| axe: default text button passes                                       |
| axe: disabled state passes                                            |
| axe: icon-only button with aria-label passes                          |
| axe: loading state passes                                             |
| axe: softDisabled state passes                                        |
| axe: toggle button with aria-pressed passes                           |
| default button: aria-pressed is absent when ariaPressed is null       |
| disabled button: aria-disabled=                                       |
| disabled button: is removed from tab order via native disabled        |
| disables and sets aria state when disabled or loading                 |
| fires click on Enter and Space key presses                            |
| icon-only button: has aria-label when ariaLabel is provided           |
| keeps default classes for variant, size, severity, and appearance     |
| loading button: aria-busy=                                            |
| loading button: aria-disabled=                                        |
| loading button: falls back to ariaLabel when loadingLabel is absent   |
| loading button: uses loadingLabel as aria-label when provided         |
| renders focus ring on focus-visible                                   |
| renders focusable button with type attribute                          |
| sets a fallback aria-label for icon-only buttons                      |
| sets aria-disabled and aria-busy appropriately                        |
| sets aria-disabled and blocks pointer events when disabled            |
| sets aria-label during loading                                        |
| softDisabled button: aria-disabled=                                   |
| softDisabled button: remains in the tab order (keyboard-discoverable) |
| supports role, tabindex, and aria-pressed/checked overrides           |
| toggle button: aria-pressed=                                          |

## Usage Examples

```html
<!-- Minimal -->
<ui-lib-button>Save</ui-lib-button>

<!-- Two-axis: appearance + severity -->
<ui-lib-button appearance="outline" severity="danger" (click)="delete()">Delete</ui-lib-button>
<ui-lib-button appearance="soft"    severity="success">Confirm</ui-lib-button>
<ui-lib-button appearance="ghost"   severity="primary">Cancel</ui-lib-button>

<!-- Orthogonal modifiers compose with any appearance -->
<ui-lib-button appearance="outline" severity="primary" [pill]="true">Pill Outline</ui-lib-button>
<ui-lib-button appearance="solid"   severity="primary" [raised]="true">Raised</ui-lib-button>
<ui-lib-button appearance="soft"    severity="danger"  [pill]="true" [raised]="true">
  Pill + Raised
</ui-lib-button>

<!-- Expressive styles -->
<ui-lib-button appearance="elevated" severity="primary" icon="layers">Elevated</ui-lib-button>
<ui-lib-button appearance="gradient" severity="primary">Gradient</ui-lib-button>
<ui-lib-button appearance="glass"    severity="info"   [pill]="true">Glass Pill</ui-lib-button>
<ui-lib-button appearance="glass-shadow">Glass Shadow</ui-lib-button>
<ui-lib-button appearance="neon"     severity="success">Neon</ui-lib-button>
<ui-lib-button appearance="tactile"  severity="primary" icon="search">Tactile</ui-lib-button>

<!-- Link style -->
<ui-lib-button appearance="link" severity="primary">Learn more</ui-lib-button>

<!-- States -->
<ui-lib-button [loading]="isSaving" severity="success" loadingLabel="Saving…" (click)="save()">Save</ui-lib-button>
<ui-lib-button [disabled]="true" severity="primary">Disabled (removed from tab order)</ui-lib-button>
<ui-lib-button [softDisabled]="true" severity="primary">Soft Disabled (keyboard-discoverable)</ui-lib-button>

<!-- Icon-only (ariaLabel required) -->
<ui-lib-button icon="trash" [iconOnly]="true" severity="danger" ariaLabel="Delete item" />

<!-- Sizes -->
<ui-lib-button size="sm" severity="primary">Small</ui-lib-button>
<ui-lib-button size="md" severity="primary">Medium</ui-lib-button>
<ui-lib-button size="lg" severity="primary">Large</ui-lib-button>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#button)
- [Demo page](/components/button)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/button/README.md)

