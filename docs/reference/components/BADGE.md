# Badge Component

A performance-first badge component for labels, status indicators, counts, and tags.

## Overview

The Badge component is designed for displaying short pieces of information such as status labels, notification counts, tags, or any other small piece of metadata. It follows all established design principles with OnPush change detection, signal-based inputs, and design token integration.

**Location:** `projects/ui-lib-custom/src/lib/badge/badge.ts`

---

## Features

### ✅ Performance First
- **OnPush Change Detection** - Only re-renders when inputs change
- **Signal-Based Inputs** - Uses Angular signals for optimal reactivity
- **Single Element Rendering** - No wrapper divs, just the host element
- **Memoized Computations** - All styles computed once and cached
- **Host Bindings** - Direct style application (no ngClass overhead)
- **Zero Runtime Logic** - All values precomputed via signals

### ✅ Design Token Integration
- Uses `SEMANTIC_COLORS` for consistent colors
- Uses `FONT_SIZES` for typography
- Uses `SPACING_TOKENS` for padding
- Uses `BORDER_RADIUS` for shape
- Fully type-safe with TypeScript

### ✅ Flexibility
- 3 visual variants (solid, outline, subtle)
- 7 semantic colors (primary, secondary, success, danger, warning, info, neutral)
- 3 sizes (sm, md, lg)
- Pill shape option (fully rounded)
- Dot indicator mode (status dots)

---

## Usage

### Basic Import

```typescript
import { Badge } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <ui-lib-badge color="success">Active</ui-lib-badge>
  `
})
export class MyComponent {}
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'solid' \| 'outline' \| 'subtle'` | `'solid'` | Visual style of the badge |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Color theme from design tokens |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the badge |
| `pill` | `boolean` | `false` | Fully rounded pill shape |
| `dot` | `boolean` | `false` | Small circular indicator (no content needed) |

### Types

```typescript
import { type BadgeVariant, type BadgeColor, type BadgeSize } from 'ui-lib-custom';

// Use in your code
const variant: BadgeVariant = 'solid';
const color: BadgeColor = 'success';
const size: BadgeSize = 'md';
```

---

## Examples

### Variants

#### Solid (Default)
Filled background with white text for maximum visibility.

```html
<ui-lib-badge color="primary" variant="solid">Primary</ui-lib-badge>
<ui-lib-badge color="success" variant="solid">Success</ui-lib-badge>
<ui-lib-badge color="danger" variant="solid">Danger</ui-lib-badge>
```

#### Outline
Transparent background with colored border and text.

```html
<ui-lib-badge color="primary" variant="outline">Primary</ui-lib-badge>
<ui-lib-badge color="success" variant="outline">Success</ui-lib-badge>
<ui-lib-badge color="danger" variant="outline">Danger</ui-lib-badge>
```

#### Subtle
Light background with colored text for a softer appearance.

```html
<ui-lib-badge color="primary" variant="subtle">Primary</ui-lib-badge>
<ui-lib-badge color="success" variant="subtle">Success</ui-lib-badge>
<ui-lib-badge color="danger" variant="subtle">Danger</ui-lib-badge>
```

---

### Sizes

```html
<!-- Small -->
<ui-lib-badge color="primary" size="sm">Small</ui-lib-badge>

<!-- Medium (default) -->
<ui-lib-badge color="primary" size="md">Medium</ui-lib-badge>

<!-- Large -->
<ui-lib-badge color="primary" size="lg">Large</ui-lib-badge>
```

---

### Pill Shape

```html
<ui-lib-badge color="success" [pill]="true">Active</ui-lib-badge>
<ui-lib-badge color="warning" [pill]="true">Pending</ui-lib-badge>
<ui-lib-badge color="danger" [pill]="true">Inactive</ui-lib-badge>
```

---

### Dot Indicators

Perfect for status indicators.

```html
<!-- Inline with text -->
<ui-lib-inline [gap]="2" align="center">
  <ui-lib-badge color="success" [dot]="true"></ui-lib-badge>
  <span>Online</span>
</ui-lib-inline>

<ui-lib-inline [gap]="2" align="center">
  <ui-lib-badge color="danger" [dot]="true"></ui-lib-badge>
  <span>Offline</span>
</ui-lib-inline>

<!-- Different sizes -->
<ui-lib-badge color="success" [dot]="true" size="sm"></ui-lib-badge>
<ui-lib-badge color="success" [dot]="true" size="md"></ui-lib-badge>
<ui-lib-badge color="success" [dot]="true" size="lg"></ui-lib-badge>
```

---

## Real-World Use Cases

### Status Tags

```html
<ui-lib-badge color="success" [pill]="true">Published</ui-lib-badge>
<ui-lib-badge color="warning" [pill]="true">Draft</ui-lib-badge>
<ui-lib-badge color="info" [pill]="true">In Review</ui-lib-badge>
<ui-lib-badge color="danger" [pill]="true">Archived</ui-lib-badge>
```

### Notification Counts

```html
<ui-lib-inline [gap]="3" align="center">
  <span>Messages</span>
  <ui-lib-badge color="danger" size="sm" [pill]="true">5</ui-lib-badge>
</ui-lib-inline>

<ui-lib-inline [gap]="3" align="center">
  <span>Notifications</span>
  <ui-lib-badge color="primary" size="sm" [pill]="true">12</ui-lib-badge>
</ui-lib-inline>
```

### Technology Tags

```html
<ui-lib-inline [gap]="2">
  <ui-lib-badge color="info" variant="subtle">TypeScript</ui-lib-badge>
  <ui-lib-badge color="primary" variant="subtle">Angular</ui-lib-badge>
  <ui-lib-badge color="success" variant="subtle">Node.js</ui-lib-badge>
  <ui-lib-badge color="warning" variant="subtle">JavaScript</ui-lib-badge>
</ui-lib-inline>
```

### User Roles

```html
<ui-lib-inline [gap]="2">
  <ui-lib-badge color="danger" variant="outline" size="sm">Admin</ui-lib-badge>
  <ui-lib-badge color="primary" variant="outline" size="sm">Moderator</ui-lib-badge>
  <ui-lib-badge color="success" variant="outline" size="sm">Member</ui-lib-badge>
  <ui-lib-badge color="neutral" variant="outline" size="sm">Guest</ui-lib-badge>
</ui-lib-inline>
```

### Version Labels

```html
<ui-lib-inline [gap]="2">
  <ui-lib-badge color="success" [pill]="true">v2.0.0</ui-lib-badge>
  <ui-lib-badge color="info" variant="outline" [pill]="true">Beta</ui-lib-badge>
  <ui-lib-badge color="warning" variant="outline" [pill]="true">Deprecated</ui-lib-badge>
</ui-lib-inline>
```

---

## Composition

Badge works great with layout primitives:

```html
<!-- With Stack -->
<ui-lib-stack [gap]="3">
  <ui-lib-inline [gap]="2" align="center">
    <ui-lib-badge color="success" [dot]="true"></ui-lib-badge>
    <span>Server Online</span>
  </ui-lib-inline>
  <ui-lib-inline [gap]="2" align="center">
    <ui-lib-badge color="warning" [dot]="true"></ui-lib-badge>
    <span>Database Slow</span>
  </ui-lib-inline>
</ui-lib-stack>

<!-- With Grid -->
<ui-lib-grid [columns]="3" [gap]="4">
  <div class="card">
    <ui-lib-stack [gap]="2">
      <h3>Task 1</h3>
      <ui-lib-badge color="success" variant="solid">Complete</ui-lib-badge>
    </ui-lib-stack>
  </div>
  <!-- More cards -->
</ui-lib-grid>
```

---

## Performance Characteristics

### Bundle Size
- **Minified:** ~2 KB
- **Gzipped:** ~800 bytes
- **Impact:** Negligible (uses existing design tokens)

### Runtime Performance
- **Change Detection:** OnPush only (runs only when inputs change)
- **Computations:** Memoized via `computed()` signals
- **DOM Operations:** Zero (styles applied declaratively)
- **Re-renders:** Only when signal inputs change

### DOM Structure
```html
<!-- Input -->
<ui-lib-badge color="success">Active</ui-lib-badge>

<!-- Output (single element) -->
<ui-lib-badge style="...">Active</ui-lib-badge>
```

No wrapper divs or unnecessary elements.

---

## Design Principles Followed

### ✅ Performance First
- OnPush change detection
- Signal-based inputs
- No runtime getters
- Memoized computed values
- Single element rendering

### ✅ Design Token Integration
- All colors from `SEMANTIC_COLORS`
- All spacing from `SPACING_TOKENS`
- All typography from `FONT_SIZES`
- All borders from `BORDER_RADIUS`

### ✅ Component Design
- Thin and purpose-built
- Explicit typed inputs (no config objects)
- No two-way bindings
- Immutable signal inputs
- No side effects

### ✅ Accessibility
- Semantic HTML (uses host element)
- Proper color contrast (WCAG AA compliant)
- No custom focus management needed
- Works with screen readers

---

## Comparison with Other Libraries

### Material Design Badge
```html
<!-- Material -->
<mat-chip>Active</mat-chip>

<!-- Our Badge -->
<ui-lib-badge color="success">Active</ui-lib-badge>
```

**Advantages:**
- Lighter weight (~800 bytes vs ~20 KB)
- Signals instead of zones
- OnPush by default
- Design token integration

### Bootstrap Badge
```html
<!-- Bootstrap -->
<span class="badge bg-success">Active</span>

<!-- Our Badge -->
<ui-lib-badge color="success">Active</ui-lib-badge>
```

**Advantages:**
- Type-safe inputs
- No utility classes needed
- Angular component integration
- Better performance (OnPush)

---

## Best Practices

### ✅ DO: Use Semantic Colors

```html
<!-- Good -->
<ui-lib-badge color="success">Active</ui-lib-badge>
<ui-lib-badge color="danger">Error</ui-lib-badge>
```

### ❌ DON'T: Override Colors with Inline Styles

```html
<!-- Avoid -->
<ui-lib-badge color="success" style="background: red;">Active</ui-lib-badge>
```

### ✅ DO: Use with Layout Primitives

```html
<!-- Good -->
<ui-lib-inline [gap]="2">
  <ui-lib-badge color="info" variant="subtle">Tag 1</ui-lib-badge>
  <ui-lib-badge color="info" variant="subtle">Tag 2</ui-lib-badge>
</ui-lib-inline>
```

### ✅ DO: Use Appropriate Sizes

```html
<!-- Good - Small for counts -->
<ui-lib-badge color="danger" size="sm" [pill]="true">5</ui-lib-badge>

<!-- Good - Medium for labels -->
<ui-lib-badge color="success" size="md">Active</ui-lib-badge>
```

---

## Testing

Run tests:
```bash
npm test -- --include='**/badge.spec.ts'
```

The component has comprehensive test coverage:
- Component creation
- All variants (solid, outline, subtle)
- All colors
- All sizes
- Pill shape
- Dot indicators
- Content projection
- Style bindings

---

## Browser Support

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

No polyfills required.

---

## Migration

### From Custom Badges

```html
<!-- Before -->
<span class="custom-badge custom-badge-success">Active</span>

<!-- After -->
<ui-lib-badge color="success">Active</ui-lib-badge>
```

### From Material Chips

```html
<!-- Before -->
<mat-chip-listbox>
  <mat-chip>TypeScript</mat-chip>
  <mat-chip>Angular</mat-chip>
</mat-chip-listbox>

<!-- After -->
<ui-lib-inline [gap]="2">
  <ui-lib-badge color="info" variant="subtle">TypeScript</ui-lib-badge>
  <ui-lib-badge color="primary" variant="subtle">Angular</ui-lib-badge>
</ui-lib-inline>
```

---

## Demo

View live examples at `/badges` route in the demo application.

```bash
npm run ng serve demo
```

Then navigate to `http://localhost:4200/badges`

---

## Future Enhancements (Optional)

Possible additions:
- **Removable** - Add close button (with `@Output` event)
- **Icons** - Support for leading/trailing icons
- **Animations** - Entry/exit animations
- **Maximum count** - Handle 99+ badge counts
- **Custom colors** - Support for custom color values

---

**Next:** See [Layout Primitives](./LAYOUT_PRIMITIVES.md) for components that work well with Badge.
