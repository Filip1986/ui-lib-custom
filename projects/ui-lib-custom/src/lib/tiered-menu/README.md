# TieredMenu

**Selector:** `ui-lib-tiered-menu`
**Package:** `ui-lib-custom/tiered-menu`
**Content projection:** no — none

> Supports arbitrarily deep flyout nesting via `TieredMenuItem.items`; in popup mode the panel is positioned with `window.scrollX/Y` offsets so it works in scrolled pages, unlike the viewport-only positioning used by `Menu`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `TieredMenuItem[]` | `[]` | Root items; items with `items` array open nested flyout panels |
| `popup` | `boolean` | `false` | `true` renders a floating overlay; control with `toggle()` / `show()` / `hide()` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Menu'` | `aria-label` on the menu panel |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `TieredMenuItemCommandEvent` | Fired when a non-disabled leaf item is activated |
| `menuShow` | `MouseEvent \| KeyboardEvent` | Fired when the popup panel becomes visible |
| `menuHide` | `void` | Fired when the popup panel is hidden |

## Usage

```html
<!-- inline (always visible, e.g. sidebar) -->
<ui-lib-tiered-menu [model]="items" />

<!-- popup triggered from a button -->
<button (click)="menu.toggle($event)">Open menu</button>
<ui-lib-tiered-menu #menu [model]="items" [popup]="true" />
```
