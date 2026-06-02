# Panel Menu

**Selector:** `ui-lib-panel-menu`
**Entry point:** `import { PanelMenu } from 'ui-lib-custom/panel-menu'`

---

## Overview

PanelMenu — a vertical, accordion-style navigation menu driven by a `model` array. Root items with an `items` array act as collapsible panels; leaf items (no `items`) are directly activatable. `html <ui-lib-panel-menu [model]="items" /> `

## API

### Inputs

| Name         | Type              | Default                         | Description                                                                                                                        |
| ------------ | ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --- |
| `ariaLabel`  | `string`          | `PANEL_MENU_DEFAULT_ARIA_LABEL` | Accessible label applied to the root container (aria-label).                                                                       |
| `model`      | `PanelMenuItem[]` | `[]`                            | Array of root-level items.                                                                                                         |
| `multiple`   | `boolean`         | `false`                         | When `true`, multiple root panels can be expanded simultaneously. When `false` (default) expanding one panel collapses all others. |
| `size`       | `PanelMenuSize`   | `'md'`                          | Size token: sm                                                                                                                     | md                                                                 | lg. |
| `styleClass` | `string           | null`                           | `null`                                                                                                                             | Extra CSS class appended to the host element.                      |
| `variant`    | `PanelMenuVariant | null`                           | `null`                                                                                                                             | Design-system variant; falls back to ThemeConfigService when null. |

### Outputs

| Name          | Type                        | Description                                                            |
| ------------- | --------------------------- | ---------------------------------------------------------------------- |
| `itemClick`   | `PanelMenuCommandEvent`     | Emitted when a leaf item is activated (clicked or keyboard-activated). |
| `panelToggle` | `PanelMenuPanelToggleEvent` | Emitted when a root panel's expansion state changes.                   |

## Content Projection

_none_

## Theming

| CSS Variable                             | Default                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--uilib-panel-menu-bg`                  | `var(--uilib-surface-overlay, #ffffff)`                                                  |
| `--uilib-panel-menu-border`              | `1px solid var(--uilib-color-neutral-200, #e5e7eb)`                                      |
| `--uilib-panel-menu-content-bg`          | `var(--uilib-surface-overlay, #ffffff)`                                                  |
| `--uilib-panel-menu-focus-shadow`        | `0 0 0 2px color-mix(in srgb, var(--uilib-color-primary-500, #3b82f6) 35%, transparent)` |
| `--uilib-panel-menu-font-size`           | `var(--uilib-font-size-md, 0.875rem)`                                                    |
| `--uilib-panel-menu-font-size-lg`        | `var(--uilib-font-size-lg, 1rem)`                                                        |
| `--uilib-panel-menu-font-size-md`        | `var(--uilib-font-size-md, 0.875rem)`                                                    |
| `--uilib-panel-menu-font-size-sm`        | `var(--uilib-font-size-sm, 0.75rem)`                                                     |
| `--uilib-panel-menu-header-bg`           | `var(--uilib-color-neutral-50, #f9fafb)`                                                 |
| `--uilib-panel-menu-header-bg-active`    | `var(--uilib-color-primary-50, #eff6ff)`                                                 |
| `--uilib-panel-menu-header-bg-hover`     | `var(--uilib-color-neutral-100, #f3f4f6)`                                                |
| `--uilib-panel-menu-header-color`        | `var(--uilib-color-neutral-800, #1f2937)`                                                |
| `--uilib-panel-menu-header-color-active` | `var(--uilib-color-primary-700, #1d4ed8)`                                                |
| `--uilib-panel-menu-header-color-hover`  | `var(--uilib-color-neutral-900, #111827)`                                                |
| `--uilib-panel-menu-header-font-weight`  | `600`                                                                                    |
| `--uilib-panel-menu-header-padding-x`    | `var(--uilib-spacing-4, 1rem)`                                                           |
| `--uilib-panel-menu-header-padding-y`    | `var(--uilib-spacing-3, 0.75rem)`                                                        |
| `--uilib-panel-menu-icon-gap`            | `var(--uilib-spacing-2, 0.5rem)`                                                         |
| `--uilib-panel-menu-icon-size`           | `1em`                                                                                    |
| `--uilib-panel-menu-indent`              | `1rem`                                                                                   |
| `--uilib-panel-menu-item-bg-hover`       | `var(--uilib-color-neutral-100, #f3f4f6)`                                                |
| `--uilib-panel-menu-item-color`          | `var(--uilib-color-neutral-700, #374151)`                                                |
| `--uilib-panel-menu-item-color-disabled` | `var(--uilib-color-neutral-400, #9ca3af)`                                                |
| `--uilib-panel-menu-item-color-hover`    | `var(--uilib-color-neutral-900, #111827)`                                                |
| `--uilib-panel-menu-item-padding-x`      | `var(--uilib-spacing-4, 1rem)`                                                           |
| `--uilib-panel-menu-item-padding-y`      | `var(--uilib-spacing-2, 0.5rem)`                                                         |
| `--uilib-panel-menu-radius`              | `var(--uilib-radius-md, 0.375rem)`                                                       |
| `--uilib-panel-menu-separator-color`     | `var(--uilib-color-neutral-200, #e5e7eb)`                                                |
| `--uilib-panel-menu-separator-my`        | `var(--uilib-spacing-1, 0.25rem)`                                                        |
| `--uilib-panel-menu-transition-duration` | `0.25s`                                                                                  |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

### Keyboard Interactions

| Test description                                            |
| ----------------------------------------------------------- |
| ArrowDown and ArrowUp navigate within open panel sub-menu   |
| ArrowDown moves focus to the next header                    |
| ArrowUp moves focus to the previous header                  |
| End moves focus to the last header                          |
| Enter toggles panel open/closed                             |
| Escape returns focus to the panel header                    |
| Home moves focus to the first header                        |
| Space toggles panel open/closed                             |
| applies bootstrap variant class                             |
| applies material variant class                              |
| applies minimal variant class                               |
| closed panel has aria-hidden=                               |
| defaults to PANEL_MENU_DEFAULT_ARIA_LABEL                   |
| disabled header has aria-disabled=                          |
| disabled sub-item has aria-disabled=                        |
| open panel does not have aria-hidden                        |
| panel content has aria-labelledby matching header id        |
| panel content has role=                                     |
| panel header has aria-controls pointing to a valid panel id |
| panel header has aria-expanded=                             |
| panel header id matches aria-labelledby on content region   |
| passes axe with all panels closed                           |
| passes axe with disabled panel and disabled sub-item        |
| passes axe with first panel open                            |
| passes axe with multiple panels open when multiple=true     |
| renders a navigation container with aria role and label     |
| root has aria-label from ariaLabel input                    |
| root has role=                                              |
| separator does not have aria-hidden=                        |
| separator has role=                                         |
| sub-item links have role=                                   |
| sub-list inside open panel has role=                        |

## Usage Examples

```html
<ui-lib-panel-menu [model]="items" />

<ui-lib-panel-menu
  [model]="items"
  [multiple]="true"
  ariaLabel="Project navigation"
  (itemClick)="onNavigate($event)"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#panel-menu)
- [Demo page](/components/panel-menu)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/panel-menu/README.md)
