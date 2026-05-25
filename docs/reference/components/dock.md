# Dock

**Selector:** `ui-lib-dock`
**Entry point:** `import { Dock } from 'ui-lib-custom/dock'`

---

## Overview

Maximum scale factor applied to the directly hovered dock item when
magnification is enabled and `magnificationLevel` is not explicitly set.
/
export const DOCK_DEFAULT_MAGNIFICATION_LEVEL: number = 1.5;

/**
Number of neighbouring items on each side of the hovered item that
receive a reduced (cascading) magnification effect.
/
export const DOCK_MAGNIFICATION_SPREAD: number = 2;

/**
Dock component — a macOS-style icon bar with a hover magnification effect.

Items magnify when hovered: the directly hovered item scales to
`magnificationLevel`, and up to `DOCK_MAGNIFICATION_SPREAD` neighbours on
each side scale proportionally. Supports bottom / top / left / right
positioning, three design variants, and three size tokens.

## API

### Inputs

| Name                 | Type                 | Default                            | Description                                                                                                                                    |
| -------------------- | -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`          | `string`             | `'Dock'`                           | /**
Accessible label for the dock's `<nav>` landmark.
Displayed to screen-reader users and shown in accessibility trees.
Defaults to `'Dock'`. |
| `items`              | `DockItem[]`         | `[]`                               | /** Items to display in the dock.                                                                                                              |
| `magnification`      | `boolean`            | `true`                             | /**
Whether the magnification effect is active on hover.
Set to false for a static, non-animating dock.                                        |
| `magnificationLevel` | `number`             | `DOCK_DEFAULT_MAGNIFICATION_LEVEL` | /**
Maximum scale factor applied to the directly hovered item.
Values between 1.2 and 2.5 work well visually.                                  |
| `position`           | `DockPosition`       | `'bottom'`                         | /** Position of the dock relative to its container.                                                                                            |
| `size`               | `DockSize`           | `'md'`                             | /** Size token: sm | md | lg.                                                                                                                  |
| `styleClass`         | `string | null`      | `null`                             | /** Extra CSS class appended to the host element.                                                                                              |
| `variant`            | `DockVariant | null` | `null`                             | /** Design-system variant; falls back to ThemeConfigService when null.                                                                         |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                       | Default                                                                          |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| `--uilib-dock-bg`                  | `rgba(255, 255, 255, 0.7)`                                                       |
| `--uilib-dock-border-color`        | `rgba(0, 0, 0, 0.08)`                                                            |
| `--uilib-dock-gap`                 | `var(--uilib-spacing-2, 0.5rem)`                                                 |
| `--uilib-dock-icon-size`           | `var(--uilib-dock-icon-size-md)`                                                 |
| `--uilib-dock-icon-size-lg`        | `2.25rem`                                                                        |
| `--uilib-dock-icon-size-md`        | `1.75rem`                                                                        |
| `--uilib-dock-icon-size-sm`        | `1.25rem`                                                                        |
| `--uilib-dock-item-bg`             | `transparent`                                                                    |
| `--uilib-dock-item-bg-hover`       | `var(--uilib-color-neutral-100, #f3f4f6)`                                        |
| `--uilib-dock-item-color`          | `var(--uilib-color-neutral-700, #374151)`                                        |
| `--uilib-dock-item-color-disabled` | `var(--uilib-color-neutral-300, #d1d5db)`                                        |
| `--uilib-dock-item-color-hover`    | `var(--uilib-color-neutral-900, #111827)`                                        |
| `--uilib-dock-item-radius`         | `var(--uilib-radius-lg, 0.75rem)`                                                |
| `--uilib-dock-item-size`           | `var(--uilib-dock-item-size-md)`                                                 |
| `--uilib-dock-item-size-lg`        | `4.5rem`                                                                         |
| `--uilib-dock-item-size-md`        | `3.5rem`                                                                         |
| `--uilib-dock-item-size-sm`        | `2.5rem`                                                                         |
| `--uilib-dock-item-transition`     | `transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.12s ease` |
| `--uilib-dock-padding`             | `var(--uilib-spacing-3, 0.75rem)`                                                |
| `--uilib-dock-radius`              | `var(--uilib-radius-xl, 1.25rem)`                                                |
| `--uilib-dock-shadow`              | `var(--uilib-shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12))`                         |
| `--uilib-dock-tooltip-bg`          | `var(--uilib-color-neutral-900, #111827)`                                        |
| `--uilib-dock-tooltip-color`       | `#ffffff`                                                                        |
| `--uilib-dock-tooltip-font-size`   | `0.75rem`                                                                        |
| `--uilib-dock-tooltip-padding`     | `0.25rem 0.625rem`                                                               |
| `--uilib-dock-tooltip-radius`      | `var(--uilib-radius-md, 0.375rem)`                                               |
| `--uilib-dock-tooltip-shadow`      | `var(--uilib-shadow-sm, 0 1px 4px rgba(0, 0, 0, 0.15))`                          |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                |
| ------------------------------------------------------------------------------- |
| DockItem accepts ariaLabel property                                             |
| URL anchor item gets aria-label from item.label                                 |
| button item gets aria-label from item.label                                     |
| custom ariaLabel input is reflected on the nav element                          |
| disabled button has aria-disabled=                                              |
| disabled button has the disabled HTML attribute (not tabbable)                  |
| disabled buttons are not focusable (have disabled attribute)                    |
| enabled button items are focusable (no tabindex=-1 or disabled attr by default) |
| icons inside URL anchors have aria-hidden=                                      |
| icons inside interactive items have aria-hidden=                                |
| item with no label and no ariaLabel has no aria-label attribute                 |
| item.ariaLabel takes priority over item.label for accessible name               |
| nav aria-label defaults to                                                      |
| nav has an aria-label attribute                                                 |
| routerLink anchor item gets aria-label from item.label                          |
| should apply variant class                                                      |
| should emit itemClick on Enter key                                              |
| should emit itemClick on Space key                                              |
| should not emit itemClick on Enter when item is disabled                        |
| should set hoveredIndex on mouseenter                                           |
| should update variant class when variant changes                                |
| static span items do not have interactive role                                  |
| tooltip labels have aria-hidden=                                                |

## Usage Examples

```html
<!-- bottom dock (default) -->
<ui-lib-dock [items]="dockItems" (itemClick)="onDockItem($event)" />

<!-- top dock, no magnification -->
<ui-lib-dock [items]="dockItems" position="top" [magnification]="false" />

<!-- custom aria-label for multiple docks on one page -->
<ui-lib-dock [items]="navItems" ariaLabel="Primary navigation dock" />
<ui-lib-dock [items]="toolItems" ariaLabel="Tool shortcuts" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#dock)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/dock/README.md)

