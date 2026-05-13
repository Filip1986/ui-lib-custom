# IconButton

**Selector:** `ui-lib-icon-button`
**Package:** `ui-lib-custom/icon-button`
**Content projection:** no — none

> `icon` is a required input; omitting it is a compile-time error. Always supply `ariaLabel` — the component renders no visible text, so without it the button is inaccessible.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `icon` | `SemanticIcon \| string` | _(required)_ | Icon name passed to the inner `<ui-lib-icon>` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls host CSS size class and inner icon size |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual style variant |
| `color` | `'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning' \| null` | `null` | Optional colour modifier; omit for the default neutral colour |
| `disabled` | `boolean` | `false` | Sets the native `disabled` attribute and mirrors it with `aria-disabled` |
| `loading` | `boolean` | `false` | Disables the button, switches the icon to a spinner, and announces `"Loading, please wait"` |
| `ariaLabel` | `string` | _(required)_ | **Mandatory** for icon-only buttons; exposed as the button's accessible name |

## Outputs

_none_

## Usage

```html
<ui-lib-icon-button icon="close" ariaLabel="Close dialog" (click)="onClose()" />
<ui-lib-icon-button icon="refresh" ariaLabel="Refresh data" [loading]="isRefreshing()" />
```

## Sizes

| Size | Touch target | Notes |
|------|--------------|-------|
| `sm` | 44 × 44px minimum | Compact icon actions without violating touch-target guidance |
| `md` | 44 × 44px minimum | Default size |
| `lg` | 48 × 48px | Larger primary/icon actions |

## Accessibility

- `ariaLabel` is mandatory for icon-only buttons. The icon name is never used as the accessible label.
- The inner icon is decorative and rendered with `aria-hidden="true"`.
- Loading state announces `"Loading, please wait"` and disables the native button to prevent duplicate actions.
