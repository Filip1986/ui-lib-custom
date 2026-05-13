# IconButton

Icon-first button optimized for icon-only or compact actions. Wraps `ui-lib-icon` with button affordances.

## Import
```typescript
import { IconButton } from 'ui-lib-custom';
```

## Usage
```html
<ui-lib-icon-button icon="settings" ariaLabel="Settings" />
<ui-lib-icon-button icon="edit" ariaLabel="Edit item" variant="bootstrap" color="primary" />
<ui-lib-icon-button icon="delete" ariaLabel="Delete item" variant="minimal" color="danger" />
<ui-lib-icon-button icon="refresh" ariaLabel="Refresh data" [loading]="isRefreshing()" />
```

## Inputs
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string \| SemanticIcon` | **required** | Icon name (semantic or concrete) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control icon sizing |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Design variant |
| `color` | `'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning' \| null` | `null` | Optional color accent |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Disables the button, swaps to a spinner, and announces loading |
| `ariaLabel` | `string` | **required** | Accessibility label — mandatory for icon-only buttons |

## Notes
- Inherits color from context unless `color` is provided (via CSS classes/vars in the component).
- Uses `ui-lib-icon` internally; semantic names resolve per variant/library mappings.

---

## Implementation Notes

### Architecture

- Standalone Angular component with `ChangeDetectionStrategy.OnPush` and `ViewEncapsulation.None`.
- Composes a native `<button type="button">` around `ui-lib-icon`.
- Uses signal inputs with computed selectors for button classes, icon-size mapping, and loading-aware aria labels.
- Native button semantics carry disabled, busy, and accessible-name behavior.

### Composition Strategy

- `icon` input is forwarded directly to `ui-lib-icon`.
- `variant` is forwarded to keep icon library resolution aligned with design variant.
- Button size (`sm|md|lg`) is mapped to icon size using a typed computed map.

### Styling Strategy

- Button styles in `icon-button.scss` provide a minimum 44 × 44px tap target, focus-visible outline, and loading spinner animation.
- Disabled state is enforced visually while preserving native button behavior.
- Reduced-motion styles disable button transitions and spinner animation.

### Accessibility

- `ariaLabel` is mandatory for icon-only affordances; the icon name is never treated as the accessible label.
- The inner icon is decorative and rendered with `aria-hidden="true"`.
- Loading state announces `"Loading, please wait"` and disables the native button.

### Performance

- OnPush and computed signals keep update paths small.
- No subscriptions/effects/manual change detection.
- Minimal DOM (one host + one `ui-lib-icon` child).

### Testing Focus

- native button semantics, loading announcement, and disabled behavior
- variant/size/color/disabled class composition
- icon-size mapping consistency
- focus-visible and reduced-motion behavior
