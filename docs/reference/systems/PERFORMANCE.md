# Performance Guide

## Bundle Size

### Full Library

| Build | Size | Gzipped |
| --- | --- | --- |
| ESM | XX KB | XX KB |
| FESM | XX KB | XX KB |

### Per-Component (with secondary entry points)

| Component | Size | Gzipped |
| --- | --- | --- |
| Button | X KB | X KB |
| Card | X KB | X KB |
| Badge | X KB | X KB |
| Accordion | X KB | X KB |
| Tabs | X KB | X KB |
| Select | X KB | X KB |
| Input | X KB | X KB |
| Layout (all) | X KB | X KB |
| Theme | X KB | X KB |
| Tokens | X KB | X KB |

> Fill in sizes after running `docs/guides/BUNDLE_SIZE_TRACKING.md`.

## Runtime Performance

### Change Detection
All components use:
- OnPush change detection strategy.
- Signal-based inputs.
- Computed signals for derived state.
- No zone.js triggers from internal operations.

### DOM Efficiency
- Host-first rendering (minimal DOM nodes).
- No wrapper elements.
- CSS-only animations (no JS animation loops).
- Lazy content rendering where applicable.

### Memory
- No retained subscriptions.
- Proper cleanup on destroy.
- Efficient event delegation.

## Best Practices for Consumers

### Import Optimization
```typescript
// ✅ Best: Import from secondary entry points
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';

// ❌ Avoid: Importing entire library
import { Button, Card } from 'ui-lib-custom';
```

### Lazy Loading Components
```typescript
// Lazy load heavy components
const Select = await import('ui-lib-custom/select');
```

### Large Lists
- Use virtual scrolling for long lists in Select.
- Consider pagination for data tables.

