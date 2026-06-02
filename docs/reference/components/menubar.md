# Menubar

**Selector:** `ui-lib-menubar`
**Entry point:** `import { Menubar } from 'ui-lib-custom/menubar'`

---

## Overview

Menubar component — a PrimeNG-inspired horizontal navigation bar where top-level items can open single-column dropdown submenus. Submenus support arbitrary nesting depth (nested panels open to the right). **Basic usage:** `html <ui-lib-menubar [model]="items" /> ` **With start/end slots:** `html <ui-lib-menubar [model]="items"> <img menubarStart src="logo.png" alt="Logo" /> <button menubarEnd>Sign in</button> </ui-lib-menubar> `

## API

### Inputs

| Name         | Type            | Default                      | Description                                                                 |
| ------------ | --------------- | ---------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --- |
| `ariaLabel`  | `string`        | `MENUBAR_DEFAULT_ARIA_LABEL` | Accessible label for the navigation landmark (`aria-label` on the `<nav>`). |
| `model`      | `MenubarItem[]` | `[]`                         | Array of top-level navigation items.                                        |
| `size`       | `MenubarSize`   | `'md'`                       | Size token: sm                                                              | md                                                                     | lg. |
| `styleClass` | `string         | null`                        | `null`                                                                      | Extra CSS class appended to the host element.                          |
| `variant`    | `MenubarVariant | null`                        | `null`                                                                      | Design-system variant; falls back to `ThemeConfigService` when `null`. |

### Outputs

| Name        | Type                  | Description                                         |
| ----------- | --------------------- | --------------------------------------------------- |
| `itemClick` | `MenubarCommandEvent` | Emitted when a non-disabled leaf item is activated. |

## Content Projection

| Selector         | Notes |
| ---------------- | ----- |
| `[menubarEnd]`   | —     |
| `[menubarStart]` | —     |

## Theming

| CSS Variable                                | Default                                                  |
| ------------------------------------------- | -------------------------------------------------------- |
| `--uilib-menubar-bar-bg`                    | `var(--uilib-surface-100, #f8f9fa)`                      |
| `--uilib-menubar-bar-border`                | `1px solid var(--uilib-color-border, #dee2e6)`           |
| `--uilib-menubar-bar-border-radius`         | `var(--uilib-radius-md, 4px)`                            |
| `--uilib-menubar-bar-padding`               | `0.25rem`                                                |
| `--uilib-menubar-caret-color`               | `currentColor`                                           |
| `--uilib-menubar-caret-size`                | `0.25rem`                                                |
| `--uilib-menubar-panel-bg`                  | `var(--uilib-surface-0, #ffffff)`                        |
| `--uilib-menubar-panel-border`              | `1px solid var(--uilib-color-border, #dee2e6)`           |
| `--uilib-menubar-panel-border-radius`       | `var(--uilib-radius-md, 4px)`                            |
| `--uilib-menubar-panel-min-width`           | `12rem`                                                  |
| `--uilib-menubar-panel-padding`             | `0.25rem`                                                |
| `--uilib-menubar-panel-shadow`              | `var(--uilib-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12))` |
| `--uilib-menubar-root-link-bg-active`       | `var(--uilib-surface-200, #e9ecef)`                      |
| `--uilib-menubar-root-link-bg-hover`        | `var(--uilib-surface-200, #e9ecef)`                      |
| `--uilib-menubar-root-link-border-radius`   | `var(--uilib-radius-sm, 3px)`                            |
| `--uilib-menubar-root-link-color`           | `var(--uilib-color-text-primary, #212529)`               |
| `--uilib-menubar-root-link-color-active`    | `var(--uilib-color-primary, #007bff)`                    |
| `--uilib-menubar-root-link-color-hover`     | `var(--uilib-color-primary, #007bff)`                    |
| `--uilib-menubar-root-link-font-size-lg`    | `1.0625rem`                                              |
| `--uilib-menubar-root-link-font-size-md`    | `0.9375rem`                                              |
| `--uilib-menubar-root-link-font-size-sm`    | `0.8125rem`                                              |
| `--uilib-menubar-root-link-font-weight`     | `500`                                                    |
| `--uilib-menubar-root-link-gap`             | `0.375rem`                                               |
| `--uilib-menubar-root-link-padding`         | `0.625rem 1rem`                                          |
| `--uilib-menubar-separator-color`           | `var(--uilib-color-border, #dee2e6)`                     |
| `--uilib-menubar-separator-margin`          | `0.25rem 0`                                              |
| `--uilib-menubar-sub-caret-color`           | `var(--uilib-color-text-secondary, #6c757d)`             |
| `--uilib-menubar-sub-link-bg-hover`         | `var(--uilib-surface-100, #f8f9fa)`                      |
| `--uilib-menubar-sub-link-border-radius`    | `var(--uilib-radius-sm, 3px)`                            |
| `--uilib-menubar-sub-link-color`            | `var(--uilib-color-text-primary, #212529)`               |
| `--uilib-menubar-sub-link-color-hover`      | `var(--uilib-color-primary, #007bff)`                    |
| `--uilib-menubar-sub-link-disabled-opacity` | `0.5`                                                    |
| `--uilib-menubar-sub-link-font-size`        | `0.875rem`                                               |
| `--uilib-menubar-sub-link-gap`              | `0.5rem`                                                 |
| `--uilib-menubar-sub-link-padding`          | `0.5rem 0.875rem`                                        |
| `--uilib-menubar-toggle-bar-gap`            | `4px`                                                    |
| `--uilib-menubar-toggle-bar-height`         | `2px`                                                    |
| `--uilib-menubar-toggle-bar-width`          | `1.25rem`                                                |
| `--uilib-menubar-toggle-color`              | `var(--uilib-color-text-primary, #212529)`               |
| `--uilib-menubar-transition`                | `var(--uilib-transition-fast, 150ms ease)`               |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

### Keyboard Interactions

| Test description                                                     |
| -------------------------------------------------------------------- |
| ArrowDown / ArrowUp helpers: submenu panel is present after open     |
| ArrowDown moves focus to the next sub-item (wrap)                    |
| ArrowDown opens the panel and the first sub-item is focusable        |
| ArrowLeft moves focus to the previous root item                      |
| ArrowRight moves focus to the next root item                         |
| ArrowUp moves focus to the previous sub-item (wrap)                  |
| End moves focus to the last root item                                |
| Escape from submenu closes the panel                                 |
| Home moves focus to the first root item                              |
| a disabled item has aria-disabled=                                   |
| a leaf item does NOT have aria-haspopup attribute                    |
| an item with subitems has aria-expanded=                             |
| an item with subitems has aria-haspopup=                             |
| aria-controls points to the root list id (matches [attr.id] on <ul>) |
| disabled items always have tabindex=                                 |
| disabled submenu item has aria-disabled=                             |
| first root item has tabindex=                                        |
| has a <nav> element with the correct aria-label                      |
| has aria-expanded=                                                   |
| has aria-label=                                                      |
| icon <span> inside a sub-link has aria-hidden=                       |
| other root items have tabindex=                                      |
| passes axe — empty model (no items)                                  |
| passes axe — with first panel open                                   |
| passes axe — with full model, all panels closed                      |
| passes axe — with nested sub-panel open                              |
| root <a> links have role=                                            |
| root <li> wrappers have role=                                        |
| root <ul> has role=                                                  |
| root <ul> has the correct id matching the toggle aria-controls       |
| root separator has role=                                             |
| should apply custom ariaLabel                                        |
| should apply variant class to the host                               |
| should close panel on Escape keydown at root level                   |
| should close panel on global Escape keydown                          |
| should export MENUBAR_DEFAULT_ARIA_LABEL constant                    |
| should have aria-expanded=                                           |
| should invoke leaf root item command on Space keydown                |
| should open panel on ArrowDown keydown on a root item with sub-items |
| should open panel on Enter keydown on a root item with sub-items     |
| should render a nav element with aria-label                          |
| should render a root list with role=                                 |
| should set aria-disabled on disabled root link                       |
| should set aria-expanded on open root items                          |
| should set aria-haspopup=                                            |
| should update variant class when variant input changes               |
| submenu <a> links have role=                                         |
| submenu <li> wrappers have role=                                     |
| submenu <ul> has aria-orientation=                                   |
| submenu <ul> has role=                                               |
| submenu separator has role=                                          |
| tabindex=                                                            |
| uses the ariaLabel input to set the aria-label                       |

## Usage Examples

```html
<!-- minimal -->
<ui-lib-menubar [model]="navItems" />

<!-- with start/end slots -->
<ui-lib-menubar [model]="navItems">
  <img menubarStart src="logo.png" alt="Logo" />
  <button menubarEnd>Sign in</button>
</ui-lib-menubar>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#menubar)
- [Demo page](/components/menubar)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/menubar/README.md)
