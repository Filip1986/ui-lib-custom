# PanelMenu

**Selector:** `ui-lib-panel-menu`
**Package:** `ui-lib-custom/panel-menu`
**Content projection:** no — none

> Initial expansion state is read once from `PanelMenuItem.expanded` on first render; after that, expansion is managed internally. Setting `expanded` on items after initial load has no effect — use `multiple` to control whether multiple panels can be open simultaneously.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `PanelMenuItem[]` | `[]` | Root items; items with `items` array render as collapsible accordion panels |
| `multiple` | `boolean` | `false` | When `true`, multiple panels can be open at once |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Panel Menu'` | `aria-label` on the root container |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `PanelMenuCommandEvent` | Fired when a non-disabled leaf item is activated |
| `panelToggle` | `PanelMenuPanelToggleEvent` | Fired when a root panel's expansion state changes; includes `{ item, expanded, key }` |

## Usage

```html
<!-- accordion, single panel open at a time -->
<ui-lib-panel-menu [model]="items" />

<!-- allow multiple panels open simultaneously -->
<ui-lib-panel-menu [model]="items" [multiple]="true" (itemClick)="onNav($event)" />
```
