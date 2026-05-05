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
| `disabled` | `boolean` | `false` | Sets `aria-disabled` and the disabled CSS class on the host |
| `ariaLabel` | `string \| null` | `null` | Required for accessibility — exposed as `aria-label` on the host element |

## Outputs

_none_

## Usage

```html
<ui-lib-icon-button icon="close" ariaLabel="Close dialog" (click)="onClose()" />
```
