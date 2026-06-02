# PanelMenu

**Selector:** `ui-lib-panel-menu`  
**Package:** `ui-lib-custom/panel-menu`  
**Content projection:** none

`PanelMenu` uses an **accordion + menu** accessibility pattern:

- Root container is a labeled navigation landmark.
- Root items with children are accordion header **buttons** (not links).
- Expanded panel content is a labelled region containing nested `menu`/`menuitem` structures.

> Initial expansion state is read once from `PanelMenuItem.expanded` on first render; subsequent expansion is managed internally.

## Inputs

| Name         | Type                                             | Default        | Notes                                                              |
| ------------ | ------------------------------------------------ | -------------- | ------------------------------------------------------------------ |
| `model`      | `PanelMenuItem[]`                                | `[]`           | Root items; items with `items` become collapsible accordion panels |
| `multiple`   | `boolean`                                        | `false`        | `false`: one open root panel at a time; `true`: many can stay open |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`         | Falls back to `ThemeConfigService` when `null`                     |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`         | Size token                                                         |
| `styleClass` | `string \| null`                                 | `null`         | Extra CSS class on host                                            |
| `ariaLabel`  | `string`                                         | `'Panel Menu'` | Accessible label on root navigation landmark                       |

## Outputs

| Name          | Payload                     | Notes                                                                |
| ------------- | --------------------------- | -------------------------------------------------------------------- |
| `itemClick`   | `PanelMenuCommandEvent`     | Fired when a non-disabled leaf item is activated                     |
| `panelToggle` | `PanelMenuPanelToggleEvent` | Fired when a root panel expands/collapses: `{ item, expanded, key }` |

## Usage

```html
<ui-lib-panel-menu [model]="items" />

<ui-lib-panel-menu
  [model]="items"
  [multiple]="true"
  ariaLabel="Project navigation"
  (itemClick)="onNavigate($event)"
/>
```

## Keyboard interactions

| Key                                    | Behavior                                                |
| -------------------------------------- | ------------------------------------------------------- |
| `Enter` / `Space` on root header       | Toggle root panel                                       |
| `ArrowDown` / `ArrowUp` on root header | Move focus to next/previous enabled root header (wraps) |
| `Home` / `End` on root header          | Move focus to first/last enabled root header            |
| `ArrowDown` / `ArrowUp` on sub-item    | Move focus within current sub-menu                      |
| `Escape` on sub-item                   | Returns focus to the owning root header                 |
| `Tab` / `Shift+Tab`                    | Native browser tab order                                |

## Accessibility structure

| Element                | Semantics                                                                   |
| ---------------------- | --------------------------------------------------------------------------- |
| Root container         | `role="navigation"` + `aria-label`                                          |
| Root list wrapper      | Structural container for root panels/separators                             |
| Root expandable header | `<button>` + `aria-expanded` + `aria-controls` + `aria-haspopup="menu"`     |
| Root panel content     | `role="region"` + `id` + `aria-labelledby` + collapsed `aria-hidden="true"` |
| Sub-list               | `role="menu"`                                                               |
| Leaf sub-item          | `role="menuitem"`                                                           |
| Separator              | `role="separator"` (no `aria-hidden`)                                       |

## CSS custom properties

| Variable                                 | Purpose                           |
| ---------------------------------------- | --------------------------------- |
| `--uilib-panel-menu-bg`                  | Panel background                  |
| `--uilib-panel-menu-border`              | Root panel border                 |
| `--uilib-panel-menu-radius`              | Root panel corner radius          |
| `--uilib-panel-menu-header-bg`           | Root header background            |
| `--uilib-panel-menu-header-bg-hover`     | Root header hover background      |
| `--uilib-panel-menu-header-bg-active`    | Expanded root header background   |
| `--uilib-panel-menu-header-color`        | Root header text color            |
| `--uilib-panel-menu-item-bg-hover`       | Sub-item hover background         |
| `--uilib-panel-menu-item-color`          | Sub-item text color               |
| `--uilib-panel-menu-indent`              | Nested indentation per depth      |
| `--uilib-panel-menu-transition-duration` | Expand/collapse transition timing |
| `--uilib-panel-menu-focus-shadow`        | Focus-visible ring shadow         |

## Accessibility notes

- Every component instance generates unique IDs for root header/content pairs (`aria-controls` ↔ `id`, `aria-labelledby` ↔ header `id`).
- Root header buttons keep toggle behavior semantic and screen-reader friendly.
- Motion transitions are reduced/disabled under `prefers-reduced-motion: reduce`.
