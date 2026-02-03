# Layout Primitives

Performance-first layout components for the ui-lib-custom library.

## Architecture

All layout components follow these principles:

1. **Single Element Rendering**: Each component renders only its host element (no wrapper divs)
2. **OnPush Change Detection**: All components use `ChangeDetectionStrategy.OnPush`
3. **Signal-Based**: All inputs are signals, computed values use `computed()`
4. **Host Bindings**: Styles applied directly to host via host config
5. **Design Tokens**: All spacing uses predefined tokens (no arbitrary values)

## Components

- **Stack** (`stack.ts`) - Vertical/horizontal flex layout
- **Inline** (`inline.ts`) - Horizontal wrapping layout
- **Grid** (`grid.ts`) - CSS Grid with fixed or responsive columns
- **Container** (`container.ts`) - Centered container with max-width

## Files

```
layout/
├── index.ts              # Barrel export (public API)
├── tokens.ts             # Design tokens (spacing, sizes, columns)
├── stack.ts              # Stack component
├── stack.spec.ts         # Stack tests
├── inline.ts             # Inline component
├── inline.spec.ts        # Inline tests
├── grid.ts               # Grid component
├── grid.spec.ts          # Grid tests
├── container.ts          # Container component
├── container.spec.ts     # Container tests
└── README.md            # This file
```

## Design Tokens

### Spacing Tokens

Defined in `tokens.ts` as `SPACING_TOKENS`:

- Values: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20
- Units: rem (relative to root font size)
- Type: `SpacingToken`

### Container Sizes

Defined in `tokens.ts` as `CONTAINER_MAX_WIDTHS`:

- Values: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px), full (100%)
- Type: `ContainerSize`

### Grid Columns

Defined in `tokens.ts` as `GRID_COLUMNS`:

- Values: 1-12
- Type: `GridColumns`

## Performance Characteristics

### Bundle Size

- **Stack**: ~600 bytes (minified + gzipped)
- **Inline**: ~550 bytes
- **Grid**: ~700 bytes
- **Container**: ~500 bytes
- **Tokens**: ~200 bytes
- **Total**: ~2.5KB for all layout primitives

### Runtime Performance

- **Change Detection**: OnPush only (runs only when inputs change)
- **Computations**: Memoized via `computed()` signals
- **DOM Operations**: Zero (styles applied declaratively)
- **Re-renders**: Only when signal inputs change

## Code Example

### Stack Component

```typescript
@Component({
  selector: 'ui-lib-stack',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.display]': '"flex"',
    '[style.flex-direction]': '_flexDirection()',
    '[style.align-items]': 'align()',
    '[style.justify-content]': '_justifyContent()',
    '[style.gap]': '_gapValue()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stack {
  direction = input<StackDirection>('vertical');
  align = input<StackAlign>('stretch');
  justify = input<StackJustify>('start');
  gap = input<SpacingToken>(4);

  protected _flexDirection = computed(() => (this.direction() === 'vertical' ? 'column' : 'row'));

  protected _justifyContent = computed(() => {
    const map = { start: 'flex-start' /* ... */ };
    return map[this.justify()];
  });

  protected _gapValue = computed(() => SPACING_TOKENS[this.gap()]);
}
```

### Why This Architecture?

1. **No Wrapper Elements**: Component host IS the layout container
   - Less DOM nodes = better performance
   - Simpler CSS selector matching
2. **Static Template**: Just `<ng-content />`
   - No template compilation overhead
   - No dynamic content
3. **Computed Signals**: Values memoized automatically
   - Only recompute when inputs change
   - No manual change detection needed
4. **Host Bindings**: Direct style application
   - Faster than ngClass
   - No runtime class string concatenation

## Testing

Run tests:

```bash
npm test -- --include='**/layout/*.spec.ts'
```

Each component has comprehensive tests covering:

- Creation and initialization
- Input signal changes
- Style binding application
- Content projection
- Edge cases

## Adding New Components

To add a new layout primitive:

1. Create the component file (e.g., `spacer.ts`)
2. Use the same architecture pattern:
   - OnPush change detection
   - Signal inputs
   - Computed values
   - Host bindings
   - Static template
3. Create tests (e.g., `spacer.spec.ts`)
4. Export from `index.ts`
5. Document in `docs/reference/LAYOUT_PRIMITIVES.md`

## Maintenance

### Adding Spacing Tokens

Edit `tokens.ts`:

```typescript
export const SPACING_TOKENS = {
  // ... existing
  24: '6rem',
} as const;
```

### Modifying Component

Always maintain:

- OnPush change detection
- Signal-based inputs
- Computed derived values
- Host style bindings
- Single element rendering

### Breaking Changes

Avoid breaking changes. To add features:

- Add new optional inputs (with defaults)
- Create new components for new patterns
- Keep existing API stable

## Documentation

- **Full API**: `docs/reference/LAYOUT_PRIMITIVES.md`
- **Quick Start**: `docs/getting-started/LAYOUT_QUICK_START.md`
- **Implementation**: `docs/reference/LAYOUT_IMPLEMENTATION.md`
- **Demo**: `projects/demo/src/app/pages/layouts/`

## Questions?

See the full documentation in the `docs/` directory or check the live demo at `/layouts` route.
