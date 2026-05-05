# Menubar

**Selector:** `ui-lib-menubar`
**Package:** `ui-lib-custom/menubar`
**Content projection:** yes — `[menubarStart]` slot (left, e.g. logo) and `[menubarEnd]` slot (right, e.g. search/actions)

> Unlike PrimeNG's Menubar, the start/end slots are attribute-selected (`[menubarStart]` / `[menubarEnd]`), not `<ng-template>` — project any element directly with those attributes.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `MenubarItem[]` | `[]` | Top-level navigation items; items with `items` array open dropdown panels |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Navigation'` | `aria-label` on the `<nav>` landmark |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `MenubarCommandEvent` | Fired when a non-disabled leaf item is activated |

## Usage

```html
<!-- minimal -->
<ui-lib-menubar [model]="navItems" />

<!-- with start/end slots -->
<ui-lib-menubar [model]="navItems">
  <img menubarStart src="logo.png" alt="Logo" />
  <button menubarEnd>Sign in</button>
</ui-lib-menubar>
```
