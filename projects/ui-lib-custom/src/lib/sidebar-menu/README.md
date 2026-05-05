# SidebarMenu

**Selector:** `ui-lib-sidebar-menu`
**Package:** `ui-lib-custom/sidebar-menu`
**Content projection:** yes — two named slots:
- `[sidebar-brand]` — logo or app name rendered at the top of the sidebar
- `[sidebar-footer]` — content rendered at the bottom of the sidebar

> When `collapsed` is `true` the component is externally controlled; when `collapsible` is `true` the component manages its own collapsed state internally — do not combine both for the same sidebar instance.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'classic' \| 'compact' \| 'modern'` | `'classic'` | Visual style variant |
| `items` | `SidebarMenuItem[]` | `[]` | Menu item tree; items may have nested `children` for one level of submenu |
| `collapsed` | `boolean` | `false` | External control of collapsed state; icons remain visible, labels are hidden |
| `collapsible` | `boolean` | `false` | Renders a toggle button that lets the user collapse/expand the sidebar |

## Outputs

_none_

## Usage

```html
<ui-lib-sidebar-menu variant="classic" [items]="navItems" [collapsible]="true">
  <span sidebar-brand>My App</span>
</ui-lib-sidebar-menu>
```
