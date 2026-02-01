# IconButton

Icon-first button optimized for icon-only or compact actions. Wraps `ui-lib-icon` with button affordances.

## Import
```typescript
import { IconButton } from 'ui-lib-custom';
```

## Usage
```html
<ui-lib-icon-button icon="settings" ariaLabel="Settings" />
<ui-lib-icon-button icon="edit" variant="bootstrap" color="primary" />
<ui-lib-icon-button icon="delete" variant="minimal" color="danger" />
```

## Inputs
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string \| SemanticIcon` | **required** | Icon name (semantic or concrete) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control icon sizing |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Design variant |
| `color` | `'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning' \| null` | `null` | Optional color accent |
| `disabled` | `boolean` | `false` | Disabled state |
| `ariaLabel` | `string \| null` | `null` | Accessibility label (required for icon-only buttons) |

## Notes
- Inherits color from context unless `color` is provided (via CSS classes/vars in the component).
- Uses `ui-lib-icon` internally; semantic names resolve per variant/library mappings.
