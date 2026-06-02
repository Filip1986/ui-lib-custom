# Tiered Menu

**Selector:** `ui-lib-tiered-menu`
**Entry point:** `import { TieredMenu } from 'ui-lib-custom/tiered-menu'`

---

## Overview

TieredMenu component — a nested flyout menu supporting arbitrarily deep hierarchies. Works in two modes: - **Inline mode** (`popup="false"`, the default): the menu panel is always rendered in the document flow. Useful for sidebars or inline navigation. - **Popup mode** (`popup="true"`): the menu panel is a floating overlay anchored to a trigger element. Control visibility via `toggle(event)`, `show(event)`, and `hide()`. Usage (inline): `html <ui-lib-tiered-menu [model]="items" /> ` Usage (popup): `html <button (click)="menu.toggle($event)">Open menu</button> <ui-lib-tiered-menu #menu [model]="items" [popup]="true" /> `

## API

### Inputs

| Name         | Type               | Default                          | Description                                                                                                                                                                                         |
| ------------ | ------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --- |
| `ariaLabel`  | `string`           | `TIERED_MENU_DEFAULT_ARIA_LABEL` | Accessible label for the menu panel (aria-label).                                                                                                                                                   |
| `model`      | `TieredMenuItem[]` | `[]`                             | Array of menu items to display.                                                                                                                                                                     |
| `popup`      | `boolean`          | `false`                          | When true, the menu renders as a floating popup anchored to the trigger element passed to `toggle(event)` or `show(event)`. When false (default), the menu is rendered inline in the document flow. |
| `size`       | `TieredMenuSize`   | `'md'`                           | Size token: sm                                                                                                                                                                                      | md                                                                 | lg. |
| `styleClass` | `string            | null`                            | `null`                                                                                                                                                                                              | Extra CSS class appended to the host element.                      |
| `variant`    | `TieredMenuVariant | null`                            | `null`                                                                                                                                                                                              | Design-system variant; falls back to ThemeConfigService when null. |

### Outputs

| Name        | Type                         | Description                                                                 |
| ----------- | ---------------------------- | --------------------------------------------------------------------------- | --------------------------------------------- |
| `itemClick` | `TieredMenuItemCommandEvent` | Emitted when a non-disabled leaf item is clicked or activated via keyboard. |
| `menuHide`  | `void`                       | Emitted when the popup panel is hidden.                                     |
| `menuShow`  | `MouseEvent                  | KeyboardEvent`                                                              | Emitted when the popup panel becomes visible. |

## Content Projection

_none_

## Theming

| CSS Variable                           | Default                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| `--uilib-tiered-menu-focus-ring`       | `var(--uilib-color-primary, #6366f1)`                    |
| `--uilib-tiered-menu-font-size`        | `0.8125rem`                                              |
| `--uilib-tiered-menu-icon-size`        | `0.875rem`                                               |
| `--uilib-tiered-menu-item-bg-hover`    | `var(--uilib-surface-hover, #f3f4f6)`                    |
| `--uilib-tiered-menu-item-color`       | `var(--uilib-color-text, #1f2937)`                       |
| `--uilib-tiered-menu-item-color-hover` | `var(--uilib-color-primary, #6366f1)`                    |
| `--uilib-tiered-menu-item-padding`     | `0.3125rem 0.75rem`                                      |
| `--uilib-tiered-menu-item-radius`      | `0`                                                      |
| `--uilib-tiered-menu-min-width`        | `10rem`                                                  |
| `--uilib-tiered-menu-panel-bg`         | `var(--uilib-surface, #fff)`                             |
| `--uilib-tiered-menu-panel-border`     | `transparent`                                            |
| `--uilib-tiered-menu-panel-radius`     | `0.25rem`                                                |
| `--uilib-tiered-menu-panel-shadow`     | `var(--uilib-shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.18))` |
| `--uilib-tiered-menu-separator-color`  | `var(--uilib-color-border, #e5e7eb)`                     |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

### Keyboard Interactions

| Test description                                                                |
| ------------------------------------------------------------------------------- |
| <li> wrappers for leaf items have role=                                         |
| ArrowDown moves focus to next item                                              |
| ArrowDown wraps from last item to first                                         |
| ArrowLeft at root level (level=0) is a no-op for popup close                    |
| ArrowRight on a leaf item is a no-op                                            |
| ArrowRight on a parent item opens the flyout (aria-expanded becomes true)       |
| ArrowUp moves focus to previous item                                            |
| ArrowUp wraps from first item to last                                           |
| End moves focus to last item                                                    |
| Enter activates a leaf item                                                     |
| Escape on a menu item restores focus to the trigger                             |
| Escape on root sub closes any open flyout (activeIndex → -1)                    |
| Escape while popup is open causes isVisible() to become false                   |
| Home moves focus to first item                                                  |
| Space activates a leaf item                                                     |
| Tab in popup mode causes isVisible() to become false without preventing default |
| applies variant class to host                                                   |
| changes variant class when variant input changes                                |
| disabled item link has aria-disabled=                                           |
| disabled item link has tabindex=                                                |
| enabled items have tabindex=                                                    |
| exports TIERED_MENU_DEFAULT_ARIA_LABEL                                          |
| hide() restores focus to the trigger element                                    |
| icons are aria-hidden=                                                          |
| inline mode with disabled item passes axe                                       |
| inline mode with nested items passes axe                                        |
| inline mode with simple items passes axe                                        |
| leaf item links have role=                                                      |
| marks disabled items with aria-disabled                                         |
| nested <ul> has aria-label matching parent item label                           |
| nested <ul> has role=                                                           |
| nested submenu icon caret is aria-hidden                                        |
| panel is hidden after Escape in popup mode                                      |
| parent item has aria-expanded=                                                  |
| parent item with submenu has aria-haspopup=                                     |
| popup open state passes axe                                                     |
| renders submenu arrow for items with children                                   |
| root <ul> has aria-label from ariaLabel input                                   |
| root <ul> has role=                                                             |
| separator <li> does NOT have aria-hidden                                        |
| separator <li> has role=                                                        |
| separator is not focusable                                                      |
| sets aria-expanded=false on collapsed submenu parent                            |
| sets aria-haspopup on items with children                                       |
| submenu wrapper is rendered after ArrowRight on parent                          |
| trigger aria-controls matches menu.menuId                                       |
| trigger has correct aria-expanded before and after toggle                       |
| updates root <ul> aria-label reactively                                         |

## Usage Examples

```html
<!-- Inline (always visible) -->
<ui-lib-tiered-menu [model]="items" />

<!-- Popup triggered from a button -->
<button
  [attr.aria-haspopup]="'menu'"
  [attr.aria-expanded]="menu.isVisible()"
  [attr.aria-controls]="menu.menuId"
  (click)="menu.toggle($event)"
>
  Open menu
</button>
<ui-lib-tiered-menu #menu [model]="items" [popup]="true" (itemClick)="onAction($event)" />
```

---

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tiered-menu)
- [Demo page](/components/tiered-menu)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tiered-menu/README.md)
