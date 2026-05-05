# MegaMenu

**Selector:** `ui-lib-mega-menu`
**Package:** `ui-lib-custom/mega-menu`
**Content projection:** no — none

> Sub-items live inside `MegaMenuItem.items` as an array of `MegaMenuSubColumn` objects, each holding an `items: MegaMenuSubItem[]` array — this two-level nesting (columns within panels) differs from PrimeNG's flat `items` model.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `MegaMenuItem[]` | `[]` | Top-level items; items with `items` array open multi-column mega panels |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Bar orientation |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Navigation'` | `aria-label` on the `<nav>` landmark |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `MegaMenuCommandEvent` | Fired when a non-disabled sub-item is activated |

## Usage

```html
<!-- horizontal (default) -->
<ui-lib-mega-menu [model]="navItems" />

<!-- vertical sidebar -->
<ui-lib-mega-menu [model]="navItems" orientation="vertical" />
```
