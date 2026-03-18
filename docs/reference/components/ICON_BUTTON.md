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

---

## Implementation Notes

### Architecture

- Standalone Angular component with `ChangeDetectionStrategy.OnPush` and `ViewEncapsulation.None`.
- Composes `ui-lib-icon` as its only rendered child.
- Uses signal inputs with computed selectors for host classes and icon-size mapping.
- Host element carries interaction semantics (`role="button"`, `tabindex="0"`, `aria-disabled`).

### Composition Strategy

- `icon` input is forwarded directly to `ui-lib-icon`.
- `variant` is forwarded to keep icon library resolution aligned with design variant.
- Button size (`sm|md|lg`) is mapped to icon size using a typed computed map.

### Styling Strategy

- Host styles in `icon-button.scss` provide inline-flex centering, compact padding, and focus-visible outline.
- Disabled state is enforced visually and behaviorally (`opacity`, `pointer-events: none`).
- Icon child disables pointer events so host remains the interaction target.

### Accessibility

- `ariaLabel` should be provided for icon-only affordances.
- Keyboard users receive focus ring via `:focus-visible`.
- Disabled state is mirrored in `aria-disabled`.

### Performance

- OnPush and computed signals keep update paths small.
- No subscriptions/effects/manual change detection.
- Minimal DOM (one host + one `ui-lib-icon` child).

### Testing Focus

- variant/size/color/disabled class composition
- host ARIA attributes and disabled behavior
- icon-size mapping consistency
- focus-visible and pointer behavior

