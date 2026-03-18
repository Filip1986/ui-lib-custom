# Icon Implementation Notes

## Architecture

- Standalone Angular component with `ChangeDetectionStrategy.OnPush` and `ViewEncapsulation.None`.
- Thin rendering wrapper around `NgIcon` from `@ng-icons/core`.
- Signal-based inputs and computed selectors drive all derived behavior:
  - resolved icon name
  - resolved icon size
  - accessibility label behavior
  - aria-hidden behavior
- Uses `IconService` for library resolution, semantic mapping, and token-aware sizing.

## Name Resolution Flow

1. Resolve target icon library from explicit `library`, then `variant`, then theme/default config.
2. Determine whether input `name` is semantic:
   - explicit `semantic=true`, or
   - value is included in `SEMANTIC_ICONS`.
3. If semantic, map through library-specific icon mapping in `IconService`.
4. Normalize concrete icon names to library-prefixed names when needed.
5. Preserve already-prefixed names across known libraries.

This keeps semantic icon usage stable across visual variants.

## Service Integration

`IconService` owns mutable icon configuration and theme bridging:

- default icon library and size
- variant-to-library mapping
- semantic icon lookup tables
- theme preset icon size overrides (`ThemeConfigService`)

`Icon` component stays stateless and delegates all mapping logic to the service.

## Template Strategy

- Minimal template (`icon.html`) with one `ng-icon` node.
- Binds precomputed values:
  - `[name]="resolvedName()"`
  - `[size]="resolvedSize()"`
  - `[color]="color() ?? undefined"`
- Host bindings manage interactive semantics (`role`, `tabindex`, keyboard handling) when `clickable` is true.

## Accessibility

- Non-interactive default:
  - `aria-hidden="true"` when no label is provided.
- Interactive mode (`clickable=true`):
  - `role="button"`
  - `tabindex="0"`
  - Enter/Space triggers click
  - fallback `aria-label="Icon"` when omitted

## Styling Strategy

- Base host styles in `icon.scss`:
  - inline-flex alignment
  - color from `--uilib-icon-color`
  - transition from `--uilib-icon-transition`
- Clickable mode adds cursor affordance.
- Glyph element remains layout-neutral (`display: inline-flex`).

## Performance

- OnPush + computed signals avoid unnecessary recomputation.
- No subscriptions, effects, or manual change detection.
- Single rendered node keeps DOM overhead minimal.

## Testing Coverage

Primary behavior to keep covered in icon tests:

- semantic and non-semantic name resolution
- variant/library resolution paths
- keyboard activation in clickable mode
- aria-hidden vs aria-label behavior
- size resolution from config/theme

## Known Tradeoffs

- Clickability relies on host click handling; no dedicated output API.
- Fallback label "Icon" is generic; product-level labels are recommended.
- Mapping correctness depends on semantic dictionaries being kept in sync.

## Future Enhancements

- Optional stricter validation for unknown icon names in development builds.
- Add optional explicit interactive output (`onActivate`) for consistency with other components.
- Expand mapping diagnostics to aid library migration.

