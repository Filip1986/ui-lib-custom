# Layout Primitives

Performance-first layout components built with Angular Signals and OnPush change detection.

## Overview

The layout primitives provide a foundation for building complex layouts without writing ad-hoc CSS. Each component renders a **single DOM element** with zero runtime overhead, using:

- ✅ **Signals** for optimal change detection
- ✅ **OnPush** change detection strategy
- ✅ **Host bindings** for direct style application
- ✅ **Design tokens** for consistent spacing
- ✅ **No Tailwind in templates** - only semantic components

## Components

### Stack

A flexible vertical or horizontal layout primitive with configurable gap and alignment.

**Usage:**

```typescript
import { Stack } from 'ui-lib-custom';

@Component({
  imports: [Stack],
  template: `
    <ui-lib-stack [gap]="4" direction="vertical" align="stretch" justify="start">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </ui-lib-stack>
  `
})
```

**Inputs:**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack direction |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | Main-axis justification |
| `gap` | `SpacingToken` | `4` | Gap between items (design token) |

**Examples:**

```html
<!-- Vertical stack (default) -->
<ui-lib-stack [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</ui-lib-stack>

<!-- Horizontal stack -->
<ui-lib-stack direction="horizontal" [gap]="3">
  <button>Button 1</button>
  <button>Button 2</button>
</ui-lib-stack>

<!-- Centered stack -->
<ui-lib-stack [gap]="6" align="center" justify="center">
  <h1>Title</h1>
  <p>Subtitle</p>
</ui-lib-stack>

<!-- Space between -->
<ui-lib-stack direction="horizontal" justify="space-between">
  <div>Left</div>
  <div>Right</div>
</ui-lib-stack>
```

---

### Inline

An inline layout with wrapping, perfect for tags, chips, or button groups.

**Usage:**

```typescript
import { Inline } from 'ui-lib-custom';

@Component({
  imports: [Inline],
  template: `
    <ui-lib-inline [gap]="2" align="center" justify="start">
      <span>Tag 1</span>
      <span>Tag 2</span>
      <span>Tag 3</span>
    </ui-lib-inline>
  `
})
```

**Inputs:**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | `'center'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around'` | `'start'` | Main-axis justification |
| `gap` | `SpacingToken` | `2` | Gap between items |

**Examples:**

```html
<!-- Tags that wrap -->
<ui-lib-inline [gap]="2">
  <span class="tag">JavaScript</span>
  <span class="tag">TypeScript</span>
  <span class="tag">Angular</span>
  <span class="tag">React</span>
</ui-lib-inline>

<!-- Centered badges -->
<ui-lib-inline [gap]="3" justify="center">
  <span class="badge">New</span>
  <span class="badge">Featured</span>
</ui-lib-inline>

<!-- Button group -->
<ui-lib-inline [gap]="2" align="center">
  <button>Edit</button>
  <button>Delete</button>
  <button>Share</button>
</ui-lib-inline>
```

---

### Grid

A CSS Grid layout primitive with configurable columns and responsive behavior.

**Usage:**

```typescript
import { Grid } from 'ui-lib-custom';

@Component({
  imports: [Grid],
  template: `
    <!-- Fixed columns -->
    <ui-lib-grid [columns]="4" [gap]="4">
      <div>Cell 1</div>
      <div>Cell 2</div>
      <div>Cell 3</div>
      <div>Cell 4</div>
    </ui-lib-grid>

    <!-- Responsive grid -->
    <ui-lib-grid [gap]="4" minColumnWidth="200px">
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </ui-lib-grid>
  `
})
```

**Inputs:**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `columns` | `GridColumns` (1-12) | `12` | Number of columns |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Block-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Inline-axis alignment |
| `gap` | `SpacingToken` | `4` | Gap between cells |
| `minColumnWidth` | `string \| undefined` | `undefined` | Min column width for auto-fit |

**Examples:**

```html
<!-- 4-column grid -->
<ui-lib-grid [columns]="4" [gap]="4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</ui-lib-grid>

<!-- 3-column grid with larger gap -->
<ui-lib-grid [columns]="3" [gap]="6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ui-lib-grid>

<!-- Responsive grid (auto-fit) -->
<ui-lib-grid minColumnWidth="250px" [gap]="4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</ui-lib-grid>

<!-- 12-column layout system -->
<ui-lib-grid [columns]="12" [gap]="2">
  <div style="grid-column: span 8">Main content</div>
  <div style="grid-column: span 4">Sidebar</div>
</ui-lib-grid>
```

---

### Container

A centered container with max-width constraints and padding.

**Usage:**

```typescript
import { Container } from 'ui-lib-custom';

@Component({
  imports: [Container],
  template: `
    <ui-lib-container size="lg" [padding]="6" [centered]="true">
      <h1>Welcome</h1>
      <p>Container content goes here</p>
    </ui-lib-container>
  `
})
```

**Inputs:**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `size` | `ContainerSize` | `'lg'` | Max width (sm/md/lg/xl/2xl/full) |
| `centered` | `boolean` | `true` | Whether to center the container |
| `padding` | `SpacingToken` | `4` | Horizontal padding |

**Container Sizes:**

| Size | Max Width |
|------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
| `full` | 100% |

**Examples:**

```html
<!-- Small container -->
<ui-lib-container size="sm" [padding]="4">
  <p>Narrow content for readability</p>
</ui-lib-container>

<!-- Large container (default) -->
<ui-lib-container size="lg" [padding]="6">
  <h1>Dashboard</h1>
  <p>Main content area</p>
</ui-lib-container>

<!-- Full-width container -->
<ui-lib-container size="full" [padding]="8">
  <p>Full-width content</p>
</ui-lib-container>

<!-- Non-centered container -->
<ui-lib-container size="md" [centered]="false" [padding]="4">
  <p>Left-aligned container</p>
</ui-lib-container>
```

---

## Design Tokens

All spacing uses a consistent token system based on rem units:

| Token | Value | Pixels (16px base) |
|-------|-------|-------------------|
| `0` | 0 | 0px |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |

**Why design tokens?**
- Consistent spacing across the application
- Easy to maintain and update
- Enforces design system constraints
- Type-safe (TypeScript will catch invalid tokens)

---

## Composition

Layout primitives can be composed together for complex layouts:

```typescript
@Component({
  imports: [Container, Stack, Grid, Inline],
  template: `
    <ui-lib-container size="lg" [padding]="6">
      <ui-lib-stack [gap]="6">
        <header>
          <ui-lib-stack [gap]="2">
            <h1>Dashboard</h1>
            <p>Welcome back!</p>
          </ui-lib-stack>
        </header>
        
        <ui-lib-grid [columns]="3" [gap]="4">
          <div class="card">
            <ui-lib-stack [gap]="3">
              <h3>Card 1</h3>
              <p>Content here</p>
              <ui-lib-inline [gap]="2">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
              </ui-lib-inline>
            </ui-lib-stack>
          </div>
          
          <div class="card">
            <ui-lib-stack [gap]="3">
              <h3>Card 2</h3>
              <p>More content</p>
            </ui-lib-stack>
          </div>
          
          <div class="card">
            <ui-lib-stack [gap]="3">
              <h3>Card 3</h3>
              <p>Even more content</p>
            </ui-lib-stack>
          </div>
        </ui-lib-grid>
      </ui-lib-stack>
    </ui-lib-container>
  `
})
```

---

## Performance Benefits

### 1. Single Element Rendering

Each layout component renders exactly **one DOM element** (the component's host):

```html
<!-- This: -->
<ui-lib-stack [gap]="4">
  <div>Item</div>
</ui-lib-stack>

<!-- Results in minimal DOM: -->
<ui-lib-stack style="display: flex; flex-direction: column; gap: 1rem;">
  <div>Item</div>
</ui-lib-stack>
```

No wrapper divs, no unnecessary nesting.

### 2. Zero Runtime Overhead

All computed values use **Signals** with memoization:

```typescript
// Computed once, cached until inputs change
protected _gapValue = computed(() => SPACING_TOKENS[this.gap()]);
```

### 3. OnPush Change Detection

All components use `ChangeDetectionStrategy.OnPush`, only re-checking when:
- Input signals change
- Events are emitted
- Manual detection is triggered

### 4. Direct Style Application

Styles are applied directly via host bindings, avoiding:
- ngClass overhead
- Runtime class concatenation
- CSS selector matching

---

## Best Practices

### ✅ DO: Use Layout Primitives

```typescript
// Good
<ui-lib-stack [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</ui-lib-stack>
```

### ❌ DON'T: Write Ad-hoc Flex

```typescript
// Avoid
<div style="display: flex; flex-direction: column; gap: 1rem;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### ✅ DO: Use Design Tokens

```typescript
// Good
<ui-lib-stack [gap]="4">
```

### ❌ DON'T: Use Arbitrary Values

```typescript
// Avoid
<ui-lib-stack [gap]="7"> <!-- Token 7 doesn't exist -->
```

### ✅ DO: Compose Components

```typescript
// Good - Semantic, composable
<ui-lib-container size="lg">
  <ui-lib-stack [gap]="6">
    <ui-lib-grid [columns]="3" [gap]="4">
      <!-- Content -->
    </ui-lib-grid>
  </ui-lib-stack>
</ui-lib-container>
```

### ❌ DON'T: Use Tailwind in Templates

```typescript
// Avoid - Against library principles
<div class="flex flex-col gap-4">
  <div class="grid grid-cols-3 gap-4">
    <!-- Content -->
  </div>
</div>
```

---

## Migration Guide

### From Tailwind

```html
<!-- Before -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- After -->
<ui-lib-stack [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</ui-lib-stack>
```

### From Material Layout

```html
<!-- Before -->
<mat-grid-list cols="4" rowHeight="200px">
  <mat-grid-tile>Cell 1</mat-grid-tile>
</mat-grid-list>

<!-- After -->
<ui-lib-grid [columns]="4" [gap]="4">
  <div>Cell 1</div>
</ui-lib-grid>
```

### From Bootstrap

```html
<!-- Before -->
<div class="container">
  <div class="row">
    <div class="col-4">Column 1</div>
    <div class="col-4">Column 2</div>
    <div class="col-4">Column 3</div>
  </div>
</div>

<!-- After -->
<ui-lib-container size="lg" [padding]="6">
  <ui-lib-grid [columns]="3" [gap]="4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </ui-lib-grid>
</ui-lib-container>
```

---

## TypeScript Usage

### Importing

```typescript
import { Stack, Inline, Grid, Container } from 'ui-lib-custom';
// Or individually:
import { Stack } from 'ui-lib-custom';
```

### Type Imports

```typescript
import { 
  SpacingToken, 
  ContainerSize, 
  GridColumns,
  StackDirection,
  StackAlign,
  StackJustify 
} from 'ui-lib-custom';

// Use in your component
spacing: SpacingToken = 4;
containerSize: ContainerSize = 'lg';
```

---

## Browser Support

Layout primitives use modern CSS features:
- Flexbox (all modern browsers)
- CSS Grid (all modern browsers)
- CSS Custom Properties (all modern browsers)

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

No polyfills required for modern browsers.

---

## Testing

All layout primitives include comprehensive test coverage. Run tests with:

```bash
npm test -- --include='**/layout/*.spec.ts'
```

---

## Demo

View live examples at `/layouts` route in the demo application.

```bash
npm run ng serve demo
```

Then navigate to `http://localhost:4200/layouts` (or whatever port is assigned).
