# Dock

**Selector:** `ui-lib-dock`
**Package:** `ui-lib-custom/dock`
**Content projection:** no — none

> The magnification effect scales up to `DOCK_MAGNIFICATION_SPREAD` (2) neighbours on each side of the hovered item; the scale falls off linearly. Set `[magnification]="false"` for a static bar with no animation.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `DockItem[]` | `[]` | Items to display in the dock |
| `position` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Position of the dock relative to its container |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `magnification` | `boolean` | `true` | Enables hover magnification effect |
| `magnificationLevel` | `number` | `1.5` | Scale factor at the directly hovered item (1.2–2.5 recommended) |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `DockItemCommandEvent` | Fired when a dock item is clicked or activated via keyboard |

## Usage

```html
<!-- bottom dock (default) -->
<ui-lib-dock [items]="dockItems" (itemClick)="onDockItem($event)" />

<!-- top dock, no magnification -->
<ui-lib-dock [items]="dockItems" position="top" [magnification]="false" />
```
