# Mega Menu

**Selector:** `ui-lib-mega-menu`
**Entry point:** `import { MegaMenu } from 'ui-lib-custom/mega-menu'`

---

## Overview

MegaMenu component — a horizontal (or vertical) navigation bar where top-level items can open multi-column mega panels of sub-items. **Basic horizontal usage:** ```html <ui-lib-mega-menu [model]="navItems" /> ``` **Vertical usage:** ```html <ui-lib-mega-menu [model]="navItems" orientation="vertical" /> ```

## API

### Inputs

| Name          | Type                     | Default        | Description                                                                                                                                    |
| ------------- | ------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`   | `string | null`          | `null`         | Accessible label for the navigation landmark (`aria-label` on the `<nav>`). Defaults to the i18n `mega-menu.aria-label` key when not provided. |
| `model`       | `MegaMenuItem[]`         | `[]`           | Array of top-level navigation items.                                                                                                           |
| `orientation` | `MegaMenuOrientation`    | `'horizontal'` | Layout orientation of the navigation bar.                                                                                                      |
| `size`        | `MegaMenuSize`           | `'md'`         | Size token: sm | md | lg.                                                                                                                      |
| `styleClass`  | `string | null`          | `null`         | Extra CSS class appended to the host element.                                                                                                  |
| `variant`     | `MegaMenuVariant | null` | `null`         | Design-system variant; falls back to ThemeConfigService when null.                                                                             |

### Outputs

| Name          | Type                   | Description                                                                    |
| ------------- | ---------------------- | ------------------------------------------------------------------------------ |
| `itemClick`   | `MegaMenuCommandEvent` | Emitted when a non-disabled sub-item is activated.                             |
| `panelClosed` | `void`                 | Emitted when the currently open mega panel closes.                             |
| `panelOpened` | `MegaMenuItem`         | Emitted when a mega panel opens. Carries the top-level item that triggered it. |

## Content Projection

_none_

## Theming

| CSS Variable                                     | Default                                                  |
| ------------------------------------------------ | -------------------------------------------------------- |
| `--uilib-mega-menu-bar-bg`                       | `var(--uilib-surface-100, #f8f9fa)`                      |
| `--uilib-mega-menu-bar-border`                   | `1px solid var(--uilib-color-border, #dee2e6)`           |
| `--uilib-mega-menu-bar-border-radius`            | `var(--uilib-radius-md, 4px)`                            |
| `--uilib-mega-menu-caret-color`                  | `currentColor`                                           |
| `--uilib-mega-menu-caret-size`                   | `0.25rem`                                                |
| `--uilib-mega-menu-column-header-border-bottom`  | `1px solid var(--uilib-color-border, #dee2e6)`           |
| `--uilib-mega-menu-column-header-color`          | `var(--uilib-color-text-secondary, #6c757d)`             |
| `--uilib-mega-menu-column-header-font-size`      | `0.75rem`                                                |
| `--uilib-mega-menu-column-header-font-weight`    | `700`                                                    |
| `--uilib-mega-menu-column-header-letter-spacing` | `0.06em`                                                 |
| `--uilib-mega-menu-column-header-margin-bottom`  | `0.25rem`                                                |
| `--uilib-mega-menu-column-header-padding-bottom` | `0.5rem`                                                 |
| `--uilib-mega-menu-panel-bg`                     | `var(--uilib-surface-0, #ffffff)`                        |
| `--uilib-mega-menu-panel-border`                 | `1px solid var(--uilib-color-border, #dee2e6)`           |
| `--uilib-mega-menu-panel-border-radius`          | `var(--uilib-radius-md, 4px)`                            |
| `--uilib-mega-menu-panel-gap`                    | `2rem`                                                   |
| `--uilib-mega-menu-panel-min-width`              | `480px`                                                  |
| `--uilib-mega-menu-panel-padding`                | `1.25rem`                                                |
| `--uilib-mega-menu-panel-shadow`                 | `var(--uilib-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12))` |
| `--uilib-mega-menu-root-item-gap`                | `0.375rem`                                               |
| `--uilib-mega-menu-root-item-padding`            | `0.625rem 1rem`                                          |
| `--uilib-mega-menu-root-link-bg-active`          | `var(--uilib-surface-200, #e9ecef)`                      |
| `--uilib-mega-menu-root-link-bg-hover`           | `var(--uilib-surface-200, #e9ecef)`                      |
| `--uilib-mega-menu-root-link-border-radius`      | `var(--uilib-radius-sm, 3px)`                            |
| `--uilib-mega-menu-root-link-color`              | `var(--uilib-color-text-primary, #212529)`               |
| `--uilib-mega-menu-root-link-color-active`       | `var(--uilib-color-primary, #007bff)`                    |
| `--uilib-mega-menu-root-link-color-hover`        | `var(--uilib-color-primary, #007bff)`                    |
| `--uilib-mega-menu-root-link-font-size-lg`       | `1.0625rem`                                              |
| `--uilib-mega-menu-root-link-font-size-md`       | `0.9375rem`                                              |
| `--uilib-mega-menu-root-link-font-size-sm`       | `0.8125rem`                                              |
| `--uilib-mega-menu-root-link-font-weight`        | `500`                                                    |
| `--uilib-mega-menu-separator-color`              | `var(--uilib-color-border, #dee2e6)`                     |
| `--uilib-mega-menu-separator-margin`             | `0.25rem 0`                                              |
| `--uilib-mega-menu-sub-item-gap`                 | `0.5rem`                                                 |
| `--uilib-mega-menu-sub-item-padding`             | `0.5rem 0.75rem`                                         |
| `--uilib-mega-menu-sub-link-bg-hover`            | `var(--uilib-surface-100, #f8f9fa)`                      |
| `--uilib-mega-menu-sub-link-border-radius`       | `var(--uilib-radius-sm, 3px)`                            |
| `--uilib-mega-menu-sub-link-color`               | `var(--uilib-color-text-primary, #212529)`               |
| `--uilib-mega-menu-sub-link-color-hover`         | `var(--uilib-color-primary, #007bff)`                    |
| `--uilib-mega-menu-sub-link-disabled-opacity`    | `0.5`                                                    |
| `--uilib-mega-menu-sub-link-font-size`           | `0.875rem`                                               |
| `--uilib-mega-menu-transition`                   | `var(--uilib-transition-fast, 150ms ease)`               |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| ArrowDown moves focus to the next sub-item in the same column (wrapping)   |
| ArrowDown opens the panel and panel is present in DOM                      |
| ArrowLeft moves focus to the first item in the previous column             |
| ArrowLeft moves rovingIndex to the previous root item                      |
| ArrowRight moves focus to the first item in the next column                |
| ArrowRight moves rovingIndex to the next root item                         |
| ArrowUp moves focus to the previous sub-item in the same column (wrapping) |
| End key moves tabindex to the last root item                               |
| Escape from root item with open panel closes the panel                     |
| Escape from sub-item closes the panel                                      |
| Escape from sub-item restores focus to the triggering root item            |
| Home key moves tabindex to the first root item                             |
| a disabled root item has aria-disabled=                                    |
| a leaf root item does NOT have aria-controls                               |
| a leaf root item does NOT have aria-haspopup                               |
| a root item with sub-items has aria-controls pointing to the open panel id |
| a root item with sub-items has aria-expanded=                              |
| a root item with sub-items has aria-haspopup=                              |
| all other root items have tabindex=                                        |
| column <ul> elements have aria-label from the column header                |
| column <ul> elements have role=                                            |
| disabled items always have tabindex=                                       |
| disabled sub-item has aria-disabled=                                       |
| first root item has tabindex=                                              |
| has a <nav> element with the correct default aria-label                    |
| icon <span> inside a root link has aria-hidden=                            |
| mega panel has an aria-label linking it to the triggering item             |
| passes axe — Company panel open (column without header)                    |
| passes axe — Products panel open (has column headers)                      |
| passes axe — empty model (no items)                                        |
| passes axe — full model, all panels closed                                 |
| root <a> links have role=                                                  |
| root <li> wrappers have role=                                              |
| root <ul> has aria-orientation=                                            |
| root <ul> has role=                                                        |
| separator <li> has role=                                                   |
| should activate a sub-item on Enter key                                    |
| should apply bootstrap variant class                                       |
| should apply minimal variant class                                         |
| should apply variant class                                                 |
| should close the panel on Escape key pressed on a sub-item                 |
| should close the panel on Escape key pressed on root item                  |
| should have role=                                                          |
| should not set aria-haspopup on simple items without a panel               |
| should open the panel on Enter key                                         |
| should open the panel on Space key                                         |
| should render a <nav> element with aria-label                              |
| should set aria-disabled=                                                  |
| should set aria-expanded=                                                  |
| should set aria-haspopup on top-level items that have a panel              |
| should set role=                                                           |
| should use custom ariaLabel on the nav element                             |
| sub-item <a> links have role=                                              |
| sub-item <li> wrappers have role=                                          |
| tabindex=                                                                  |
| uses the ariaLabel input to set the aria-label                             |

## Usage Examples

```html
<!-- horizontal (default) -->
<ui-lib-mega-menu [model]="navItems" />

<!-- vertical sidebar -->
<ui-lib-mega-menu [model]="navItems" orientation="vertical" />

<!-- listen to panel events -->
<ui-lib-mega-menu
  [model]="navItems"
  (panelOpened)="onPanelOpened($event)"
  (panelClosed)="onPanelClosed()"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#mega-menu)
- [Demo page](/components/mega-menu)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/mega-menu/README.md)

