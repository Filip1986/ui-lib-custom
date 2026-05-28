# Menu

**Selector:** `ui-lib-menu`
**Entry point:** `import { Menu } from 'ui-lib-custom/menu'`

---

## Overview

Menu component — a panel of navigable items. Supports both static (inline) and popup modes. Items can be grouped under labelled headers, separated by dividers, or rendered as direct entries with icons and command callbacks. **Static usage:** ```html <ui-lib-menu [model]="items" /> ``` **Popup usage (attach to a button):** ```html <ui-lib-button label="Options" (click)="menu.toggle($event)" /> <ui-lib-menu #menu [model]="items" [popup]="true" /> ```

## API

### Inputs

| Name         | Type                 | Default                   | Description                                                                                                                                                                                               |
| ------------ | -------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`  | `string`             | `MENU_DEFAULT_ARIA_LABEL` | Accessible label for the menu panel (aria-label).                                                                                                                                                         |
| `model`      | `MenuItem[]`         | `[]`                      | Array of menu items or group-header items to display.                                                                                                                                                     |
| `popup`      | `boolean`            | `false`                   | When true, the menu renders as a floating popup anchored to the trigger element. Use `toggle(event)`, `show(event)`, or `hide()` to control it. When false (default), the panel is always visible inline. |
| `size`       | `MenuSize`           | `'md'`                    | Size token: sm | md | lg.                                                                                                                                                                                 |
| `styleClass` | `string | null`      | `null`                    | Extra CSS class appended to the host element.                                                                                                                                                             |
| `variant`    | `MenuVariant | null` | `null`                    | Design-system variant; falls back to ThemeConfigService when null.                                                                                                                                        |

### Outputs

| Name        | Type                   | Description                                                                 |
| ----------- | ---------------------- | --------------------------------------------------------------------------- |
| `itemClick` | `MenuItemCommandEvent` | Emitted when a non-disabled leaf item is clicked or activated via keyboard. |
| `menuHide`  | `void`                 | Emitted when the popup menu is hidden.                                      |
| `menuShow`  | `MouseEvent`           | Emitted when the popup menu becomes visible.                                |

## Content Projection

_none_

## Theming

| CSS Variable                              | Default                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| `--uilib-menu-bg`                         | `var(--uilib-surface-overlay, var(--uilib-surface))`                            |
| `--uilib-menu-border`                     | `1px solid var(--uilib-color-neutral-200, var(--uilib-border))`                 |
| `--uilib-menu-focus-shadow`               | `0 0 0 2px color-mix(in srgb, var(--uilib-color-primary-500) 35%, transparent)` |
| `--uilib-menu-font-size`                  | `var(--uilib-font-size-md, 0.875rem)`                                           |
| `--uilib-menu-font-size-lg`               | `var(--uilib-font-size-lg, 1rem)`                                               |
| `--uilib-menu-font-size-md`               | `var(--uilib-font-size-md, 0.875rem)`                                           |
| `--uilib-menu-font-size-sm`               | `var(--uilib-font-size-sm, 0.75rem)`                                            |
| `--uilib-menu-group-label-color`          | `var(--uilib-color-neutral-500, var(--uilib-muted))`                            |
| `--uilib-menu-group-label-font-size`      | `0.75em`                                                                        |
| `--uilib-menu-group-label-font-weight`    | `600`                                                                           |
| `--uilib-menu-group-label-letter-spacing` | `0.05em`                                                                        |
| `--uilib-menu-group-label-padding-x`      | `var(--uilib-spacing-3, 0.75rem)`                                               |
| `--uilib-menu-group-label-padding-y`      | `var(--uilib-spacing-2, 0.5rem)`                                                |
| `--uilib-menu-group-label-text-transform` | `uppercase`                                                                     |
| `--uilib-menu-icon-gap`                   | `var(--uilib-spacing-2, 0.5rem)`                                                |
| `--uilib-menu-icon-size`                  | `1em`                                                                           |
| `--uilib-menu-item-bg-hover`              | `var(--uilib-color-neutral-100, var(--uilib-surface-b))`                        |
| `--uilib-menu-item-color`                 | `var(--uilib-color-neutral-800, var(--uilib-page-fg))`                          |
| `--uilib-menu-item-color-disabled`        | `var(--uilib-color-neutral-400, var(--uilib-muted))`                            |
| `--uilib-menu-item-color-hover`           | `var(--uilib-color-neutral-900, var(--uilib-page-fg))`                          |
| `--uilib-menu-item-padding-x`             | `var(--uilib-spacing-3, 0.75rem)`                                               |
| `--uilib-menu-item-padding-y`             | `var(--uilib-spacing-2, 0.5rem)`                                                |
| `--uilib-menu-item-padding-y-lg`          | `var(--uilib-spacing-3, 0.75rem)`                                               |
| `--uilib-menu-item-padding-y-sm`          | `var(--uilib-spacing-1, 0.25rem)`                                               |
| `--uilib-menu-min-width`                  | `12rem`                                                                         |
| `--uilib-menu-padding`                    | `var(--uilib-spacing-1, 0.25rem)`                                               |
| `--uilib-menu-radius`                     | `var(--uilib-radius-md, 0.375rem)`                                              |
| `--uilib-menu-separator-color`            | `var(--uilib-color-neutral-200, var(--uilib-border))`                           |
| `--uilib-menu-separator-my`               | `var(--uilib-spacing-1, 0.25rem)`                                               |
| `--uilib-menu-shadow`                     | `var(--uilib-shadow-md, none)`                                                  |
| `--uilib-menu-z-index`                    | `var(--uilib-z-overlay, 1000)`                                                  |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/

### Keyboard Interactions

| Test description                                                         |
| ------------------------------------------------------------------------ |
| ArrowDown moves focus to the next item                                   |
| ArrowDown wraps from the last item to the first item                     |
| ArrowUp wraps from the first item to the last item                       |
| End moves focus to the last item                                         |
| Enter activates a popup item and closes the popup                        |
| Enter activates a static item                                            |
| Escape on an item closes the popup and restores focus to the trigger     |
| Home moves focus to the first item                                       |
| Space activates a popup item and closes the popup                        |
| Space activates a static item                                            |
| Tab closes the popup menu                                                |
| Tab does not prevent default so focus can continue naturally             |
| Tab does nothing in static mode                                          |
| activating an item closes the popup without restoring trigger focus      |
| clicking outside closes the popup without restoring focus to the trigger |
| disabled items always have tabindex=                                     |
| disabled items are omitted from the flat focusable list                  |
| disabled items are skipped by keyboard navigation                        |
| disabled items expose aria-disabled=                                     |
| first enabled item has tabindex=                                         |
| global Escape closes the popup and restores focus to the trigger         |
| group item wrappers use role=                                            |
| group labels are aria-hidden                                             |
| group links use role=                                                    |
| group lists use role=                                                    |
| group lists use their label as aria-label                                |
| group separators do not use aria-hidden                                  |
| group separators use role=                                               |
| grouped menus apply the tab stop to the first focusable child item       |
| item wrappers use role=                                                  |
| links use role=                                                          |
| opening the popup focuses the first menu item                            |
| panel has role=                                                          |
| panel uses the ariaLabel input                                           |
| passes axe in popup mode while open                                      |
| passes axe in popup mode with grouped items                              |
| passes axe in static mode                                                |
| passes axe with grouped items                                            |
| root list uses role=                                                     |
| roving tabindex updates when focus moves to another item                 |
| should activate item on Enter key                                        |
| should activate item on Space key                                        |
| should apply aria-hidden to group label elements                         |
| should apply aria-label to group-list                                    |
| should apply aria-label to panel                                         |
| should apply role=                                                       |
| should apply roving tabindex to enabled items                            |
| should apply variant class                                               |
| should close popup on Escape key                                         |
| should not apply aria-hidden to separator elements                       |
| should set aria-disabled on disabled item links                          |
| should set tabindex=-1 on disabled item links                            |
| should switch variant class reactively                                   |
| should update aria-label reactively                                      |
| subsequent enabled items have tabindex=                                  |
| top-level separators do not use aria-hidden                              |
| top-level separators use role=                                           |

## Usage Examples

```html
<!-- inline (always visible) -->
<ui-lib-menu [model]="items" />

<!-- popup attached to a button -->
<ui-lib-button label="Options" (click)="menu.toggle($event)" />
<ui-lib-menu #menu [model]="items" [popup]="true" (itemClick)="onAction($event)" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#menu)
- [Demo page](/components/menu)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/menu/README.md)

