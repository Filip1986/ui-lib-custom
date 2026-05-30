# Context Menu

**Selector:** `ui-lib-context-menu`
**Entry point:** `import { ContextMenu } from 'ui-lib-custom/context-menu'`

---

## Overview

ContextMenu component — an overlay menu triggered on right-click (or programmatically via `show(event)` / `toggle(event)`). Supports nested submenus, keyboard navigation, disabled items, separators, and three design-system variants. Usage: ```html <div (contextmenu)="menu.show($event)">Right-click me</div> <ui-lib-context-menu #menu [model]="items" /> ```

## API

### Inputs

| Name         | Type                        | Default | Description                                                                                                                                                                                                              |
| ------------ | --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ariaLabel`  | `string | null`             | `null`  | Accessible label for the context menu panel (`aria-label`). Defaults to the i18n `context-menu.aria-label` key when not provided.                                                                                        |
| `global`     | `boolean`                   | `false` | When true, the component automatically listens to the `contextmenu` event on the document, showing the menu on any right-click in the page. Defaults to false; use `show(event)` / `toggle(event)` for targeted control. |
| `model`      | `ContextMenuItem[]`         | `[]`    | Array of menu items to display in the context menu.                                                                                                                                                                      |
| `size`       | `ContextMenuSize`           | `'md'`  | Size token: sm | md | lg.                                                                                                                                                                                                |
| `styleClass` | `string | null`             | `null`  | Extra CSS class appended to the host element.                                                                                                                                                                            |
| `variant`    | `ContextMenuVariant | null` | `null`  | Design-system variant; falls back to ThemeConfigService when null.                                                                                                                                                       |

### Outputs

| Name        | Type                          | Description                                                                 |
| ----------- | ----------------------------- | --------------------------------------------------------------------------- |
| `itemClick` | `ContextMenuItemCommandEvent` | Emitted when a non-disabled leaf item is clicked or activated via keyboard. |
| `menuHide`  | `void`                        | Emitted when the menu is hidden.                                            |
| `menuShow`  | `MouseEvent`                  | Emitted when the menu becomes visible.                                      |

## Content Projection

_none_

## Theming

| CSS Variable                               | Default                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `--uilib-context-menu-bg`                  | `var(--uilib-surface-overlay, #ffffff)`                                                          |
| `--uilib-context-menu-border`              | `1px solid var(--uilib-color-neutral-200, #e5e7eb)`                                              |
| `--uilib-context-menu-focus-shadow`        | `0 0 0 2px color-mix(in srgb, var(--uilib-color-primary-500, #3b82f6) 35%, transparent)`         |
| `--uilib-context-menu-font-size`           | `var(--uilib-font-size-md, 0.875rem)`                                                            |
| `--uilib-context-menu-font-size-lg`        | `var(--uilib-font-size-lg, 1rem)`                                                                |
| `--uilib-context-menu-font-size-md`        | `var(--uilib-font-size-md, 0.875rem)`                                                            |
| `--uilib-context-menu-font-size-sm`        | `var(--uilib-font-size-sm, 0.75rem)`                                                             |
| `--uilib-context-menu-icon-gap`            | `var(--uilib-spacing-2, 0.5rem)`                                                                 |
| `--uilib-context-menu-icon-size`           | `1em`                                                                                            |
| `--uilib-context-menu-item-bg-active`      | `var(--uilib-color-primary-50, #eff6ff)`                                                         |
| `--uilib-context-menu-item-bg-hover`       | `var(--uilib-color-neutral-100, #f3f4f6)`                                                        |
| `--uilib-context-menu-item-color`          | `var(--uilib-color-neutral-800, #1f2937)`                                                        |
| `--uilib-context-menu-item-color-active`   | `var(--uilib-color-primary-600, #2563eb)`                                                        |
| `--uilib-context-menu-item-color-disabled` | `var(--uilib-color-neutral-400, #9ca3af)`                                                        |
| `--uilib-context-menu-item-color-hover`    | `var(--uilib-color-neutral-900, #111827)`                                                        |
| `--uilib-context-menu-item-padding-x`      | `var(--uilib-spacing-3, 0.75rem)`                                                                |
| `--uilib-context-menu-item-padding-y`      | `var(--uilib-spacing-2, 0.5rem)`                                                                 |
| `--uilib-context-menu-item-padding-y-lg`   | `var(--uilib-spacing-3, 0.75rem)`                                                                |
| `--uilib-context-menu-item-padding-y-sm`   | `var(--uilib-spacing-1, 0.25rem)`                                                                |
| `--uilib-context-menu-min-width`           | `10rem`                                                                                          |
| `--uilib-context-menu-padding`             | `var(--uilib-spacing-1, 0.25rem)`                                                                |
| `--uilib-context-menu-radius`              | `var(--uilib-radius-md, 0.375rem)`                                                               |
| `--uilib-context-menu-separator-color`     | `var(--uilib-color-neutral-200, #e5e7eb)`                                                        |
| `--uilib-context-menu-separator-my`        | `var(--uilib-spacing-1, 0.25rem)`                                                                |
| `--uilib-context-menu-shadow`              | `var( --uilib-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) )` |
| `--uilib-context-menu-submenu-offset`      | `2px`                                                                                            |
| `--uilib-context-menu-z-index`             | `var(--uilib-z-overlay, 1000)`                                                                   |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                            |
| --------------------------------------------------------------------------- |
| ArrowDown moves focus to the next item and wraps                            |
| ArrowLeft closes an open submenu                                            |
| ArrowRight opens submenu when item has children                             |
| ArrowUp moves focus to the previous item and wraps                          |
| End moves focus to the last item                                            |
| Escape closes the menu                                                      |
| Home moves focus to the first item                                          |
| Tab closes the menu without preventing default                              |
| decorative icon spans use aria-hidden=                                      |
| disabled items always have tabindex=                                        |
| disabled items expose aria-disabled=                                        |
| first enabled item has tabindex=                                            |
| item links have role=                                                       |
| item wrappers have role=                                                    |
| opens and focuses the first enabled item                                    |
| other enabled items have tabindex=                                          |
| panel defaults to CONTEXT_MENU_DEFAULT_ARIA_LABEL when ariaLabel is not set |
| panel has aria-label from ariaLabel input                                   |
| panel has role=                                                             |
| parent item has aria-expanded=                                              |
| parent item has aria-haspopup=                                              |
| passes axe when menu is hidden                                              |
| passes axe when menu is open with disabled items                            |
| passes axe when menu is open with items                                     |
| passes axe when menu is open with separator items                           |
| passes axe when submenu is open                                             |
| restores focus to the trigger on Escape close                               |
| separator has role=                                                         |
| should activate item on Enter key                                           |
| should activate item on Space key                                           |
| should apply variant-bootstrap class                                        |
| should apply variant-material class                                         |
| should apply variant-minimal class                                          |
| should close submenu on ArrowLeft                                           |
| should hide on Escape key                                                   |
| should open submenu on ArrowRight for items with children                   |
| should render panel with role=                                              |
| should render separators with role=                                         |
| should set aria-disabled on disabled items                                  |
| should set aria-haspopup=                                                   |
| should set panel aria-label from ariaLabel input                            |
| submenu separator has role=                                                 |
| tabindex=                                                                   |

## Usage Examples

```html
<!-- targeted right-click zone -->
<div (contextmenu)="menu.show($event)">Right-click me</div>
<ui-lib-context-menu #menu [model]="items" />

<!-- global: intercepts all right-clicks on the page -->
<ui-lib-context-menu [model]="items" [global]="true" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#context-menu)
- [Demo page](/components/context-menu)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/context-menu/README.md)

