# Menu

**Selector:** `ui-lib-menu`
**Package:** `ui-lib-custom/menu`
**Content projection:** no — none

> In popup mode the component itself must hold a template reference (`#menu`) and be called imperatively via `menu.toggle($event)` / `menu.show($event)` / `menu.hide()` — there is no `appendTo` / teleport support; the panel positions itself with fixed viewport coordinates.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `MenuItem[]` | `[]` | Items to display; group headers set `items` on a parent entry |
| `popup` | `boolean` | `false` | `true` renders a floating overlay instead of inline panel |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Menu'` | `aria-label` on the menu panel |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `MenuItemCommandEvent` | Fired on any non-disabled leaf item activation |
| `menuShow` | `MouseEvent` | Fired when the popup panel becomes visible |
| `menuHide` | `void` | Fired when the popup panel is hidden |

## Usage

```html
<!-- inline (always visible) -->
<ui-lib-menu [model]="items" />

<!-- popup attached to a button -->
<ui-lib-button label="Options" (click)="menu.toggle($event)" />
<ui-lib-menu #menu [model]="items" [popup]="true" (itemClick)="onAction($event)" />
```
