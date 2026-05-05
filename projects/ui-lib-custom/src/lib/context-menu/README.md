# ContextMenu

**Selector:** `ui-lib-context-menu`
**Package:** `ui-lib-custom/context-menu`
**Content projection:** no — none

> The menu always calls `event.preventDefault()` inside `show()`, suppressing the native browser context menu. Set `[global]="true"` to intercept right-clicks anywhere on the page, or wire `(contextmenu)="menu.show($event)"` on a specific element.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `ContextMenuItem[]` | `[]` | Items to display; items with `items` array render a fly-out submenu |
| `global` | `boolean` | `false` | When `true`, listens to `contextmenu` on the document automatically |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Context Menu'` | `aria-label` on the menu panel |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `ContextMenuItemCommandEvent` | Fired when a non-disabled leaf item is activated |
| `menuShow` | `MouseEvent` | Fired when the panel becomes visible |
| `menuHide` | `void` | Fired when the panel is hidden |

## Usage

```html
<!-- targeted right-click zone -->
<div (contextmenu)="menu.show($event)">Right-click me</div>
<ui-lib-context-menu #menu [model]="items" />

<!-- global: intercepts all right-clicks on the page -->
<ui-lib-context-menu [model]="items" [global]="true" />
```
