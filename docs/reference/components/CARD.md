# Card

**Selector:** `ui-lib-card`
**Entry point:** `import { Card } from 'ui-lib-custom/card'`

---

## Overview

Card container component with optional header, footer, and theme scope.

## API

### Inputs

| Name         | Type                           | Default    | Description                    |
| ------------ | ------------------------------ | ---------- | ------------------------------ |
| `ariaLabel`  | `string | null`                | `null`     | —                              |
| `bordered`   | `boolean`                      | `false`    | —                              |
| `closable`   | `boolean`                      | `false`    | —                              |
| `elevation`  | `CardElevation`                | `'medium'` | —                              |
| `footerBg`   | `string | null`                | `null`     | —                              |
| `headerBg`   | `string | null`                | `null`     | —                              |
| `headerIcon` | `SemanticIcon | string | null` | `null`     | —                              |
| `hoverable`  | `boolean`                      | `false`    | —                              |
| `shadow`     | `string | null`                | `null`     | —                              |
| `showFooter` | `boolean | null`               | `null`     | —                              |
| `showHeader` | `boolean | null`               | `null`     | —                              |
| `subtitle`   | `string | null`                | `null`     | —                              |
| `theme`      | `ThemeScopeInput | null`       | `null`     | Optional scoped theme override |
| `variant`    | `CardVariant | null`           | `null`     | —                              |

### Outputs

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| `closed` | `void` | —           |

## Content Projection

| Selector          | Notes |
| ----------------- | ----- |
| _(default)_       | —     |
| `[card-footer]`   | —     |
| `[card-header]`   | —     |
| `[card-subtitle]` | —     |

## Theming

| CSS Variable                            | Default                                                                                                                                             |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-card-bg`                       | `var(--uilib-surface-dark-2)`                                                                                                                       |
| `--uilib-card-body-padding`             | `calc(var(--uilib-card-body-padding-base) * var(--uilib-density, 1))`                                                                               |
| `--uilib-card-body-padding-base`        | `1rem`                                                                                                                                              |
| `--uilib-card-border`                   | `var(--uilib-card-border, var(--uilib-border))`                                                                                                     |
| `--uilib-card-border-width`             | `0`                                                                                                                                                 |
| `--uilib-card-footer-bg`                | `var(--uilib-card-footer-bg, var(--uilib-surface-alt))`                                                                                             |
| `--uilib-card-footer-padding`           | `calc( var(--uilib-card-footer-padding-y-base) * var(--uilib-density, 1) ) calc(var(--uilib-card-footer-padding-x-base) * var(--uilib-density, 1))` |
| `--uilib-card-footer-padding-x-base`    | `1rem`                                                                                                                                              |
| `--uilib-card-footer-padding-y-base`    | `0.5rem`                                                                                                                                            |
| `--uilib-card-header-bg`                | `var(--uilib-card-header-bg, var(--uilib-surface-alt))`                                                                                             |
| `--uilib-card-header-padding`           | `calc( var(--uilib-card-header-padding-y-base) * var(--uilib-density, 1) ) calc(var(--uilib-card-header-padding-x-base) * var(--uilib-density, 1))` |
| `--uilib-card-header-padding-x-base`    | `1rem`                                                                                                                                              |
| `--uilib-card-header-padding-y-base`    | `0.75rem`                                                                                                                                           |
| `--uilib-card-media-subtitle-font-size` | `0.95rem`                                                                                                                                           |
| `--uilib-card-media-title-font-size`    | `1.125rem`                                                                                                                                          |
| `--uilib-card-radius`                   | `var(--uilib-radius-md)`                                                                                                                            |
| `--uilib-card-shadow`                   | `var(--uilib-card-shadow-none, none)`                                                                                                               |
| `--uilib-card-shadow-hover`             | `var(--uilib-card-shadow-low, var(--uilib-card-shadow-none, none))`                                                                                 |
| `--uilib-card-text-color`               | `var(--uilib-text-dark-primary)`                                                                                                                    |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                      |
| --------------------------------------------------------------------- |
| adds role and tabindex for hoverable cards                            |
| applies dark theme variables                                          |
| applies each variant class                                            |
| applies variant and variables for scoped theme object                 |
| applies variant, elevation, and bordered classes                      |
| basic card: no axe violations                                         |
| closable card: no axe violations                                      |
| fires click on Enter key                                              |
| fires click on Space key                                              |
| hoverable card: Enter key triggers click                              |
| hoverable card: Space key triggers click                              |
| hoverable card: aria-label updates when signal changes                |
| hoverable card: does not have aria-labelledby                         |
| hoverable card: has aria-label from ariaLabel input                   |
| hoverable card: has role=                                             |
| hoverable card: has tabindex=                                         |
| hoverable card: no axe violations                                     |
| multi-variant cards: no axe violations                                |
| non-hoverable card with header: has aria-labelledby pointing to title |
| non-hoverable card with header: title div has a stable non-empty id   |
| non-hoverable card: Enter key does not trigger click                  |
| non-hoverable card: no role attribute                                 |
| non-hoverable card: no tabindex attribute                             |
| sets role, tabindex, and aria-label when hoverable                    |

## Usage Examples

```html
<!-- Basic card with header and body -->
<ui-lib-card variant="material" [bordered]="true">
  <span card-header>Card Title</span>
  <p>Body content goes here.</p>
</ui-lib-card>

<!-- Plain-text subtitle via input -->
<ui-lib-card subtitle="Secondary description">
  <span card-header>Card Title</span>
  <p>Body content.</p>
</ui-lib-card>

<!-- Rich subtitle with inline markup via projection slot -->
<ui-lib-card>
  <span card-header>Appearances</span>
  <span card-subtitle>
    Use <code>appearance</code> to switch between <code>solid</code>, <code>outline</code>, and <code>ghost</code>.
  </span>
  <p>Body content.</p>
</ui-lib-card>

<!-- Closable card with footer -->
<ui-lib-card [closable]="true" (closed)="onClose()">
  <span card-header>Dismissible</span>
  Main content.
  <span card-footer>Footer text</span>
</ui-lib-card>

<!-- Clickable/hoverable card — provide ariaLabel for screen readers -->
<ui-lib-card [hoverable]="true" ariaLabel="Open user profile" (click)="openProfile()">
  <span card-header>Jane Smith</span>
  <p>Click to view full profile</p>
</ui-lib-card>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#card)
- [Demo page](/components/card)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/card/README.md)

