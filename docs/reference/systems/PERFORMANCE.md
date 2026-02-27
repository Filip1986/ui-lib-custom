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

## Performance Audit (2026-02-27)

### Change Detection Audit
- Verified `ChangeDetectionStrategy.OnPush` across library components.
- Verified `ViewEncapsulation.None` on all `ui-lib-*` components per conventions.
- Added Angular DevTools profiling notes in the demo app home page.
- No `ChangeDetectorRef.markForCheck()` usage found.
- `@HostListener` usage reviewed; no explicit Zone escape logic detected.

### Signal Audit
- Derived state now uses `computed()` for template bindings in Select and Input.
- Avoided reading signals via template helper methods where possible.

### CSS Performance Audit
- Removed persistent `will-change` from Accordion content to avoid idle GPU hints.
- No layout thrashing detected in component logic (no alternating reads/writes).

### Tree-Shaking Verification
- Ran `ng build demo --named-chunks` and confirmed named chunk output for demo routes.
- Secondary entry point chunk split requires manual verification with targeted imports.
- Use `npm run verify:tree-shaking` for a scripted check (see `scripts/README.md`).

### Demo App Profiling Notes
- Added profiling checklist section under Home page (`#profiling-notes`).

### Manual Visual/Performance QA (Pending)
- Chrome Desktop (latest)
- Chrome Mobile viewport (375px)
- Safari (if available)
- Theme Editor sidebar usability at 1280px
- 60fps animation smoothness

### Tests
- `ng test ui-lib-custom --watch=false` completed successfully (warnings from missing icons).
- Coverage threshold not verified in output; confirm report meets ≥90% requirement.
- Use `npm run test:coverage` and `npm run coverage:summary` (see `scripts/README.md`).

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
