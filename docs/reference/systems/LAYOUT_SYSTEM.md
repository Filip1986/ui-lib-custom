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
    <uilib-stack [gap]="4" direction="vertical" align="stretch" justify="start">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </uilib-stack>
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
<uilib-stack [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</uilib-stack>

<!-- Horizontal stack -->
<uilib-stack direction="horizontal" [gap]="3">
  <button>Button 1</button>
  <button>Button 2</button>
</uilib-stack>

<!-- Centered stack -->
<uilib-stack [gap]="6" align="center" justify="center">
  <h1>Title</h1>
  <p>Subtitle</p>
</uilib-stack>

<!-- Space between -->
<uilib-stack direction="horizontal" justify="space-between">
  <div>Left</div>
  <div>Right</div>
</uilib-stack>
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
    <uilib-inline [gap]="2" align="center" justify="start">
      <span>Tag 1</span>
      <span>Tag 2</span>
      <span>Tag 3</span>
    </uilib-inline>
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
<uilib-inline [gap]="2">
  <span class="tag">JavaScript</span>
  <span class="tag">TypeScript</span>
  <span class="tag">Angular</span>
  <span class="tag">React</span>
</uilib-inline>

<!-- Centered badges -->
<uilib-inline [gap]="3" justify="center">
  <span class="badge">New</span>
  <span class="badge">Featured</span>
</uilib-inline>

<!-- Button group -->
<uilib-inline [gap]="2" align="center">
  <button>Edit</button>
  <button>Delete</button>
  <button>Share</button>
</uilib-inline>
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
    <uilib-grid [columns]="4" [gap]="4">
      <div>Cell 1</div>
      <div>Cell 2</div>
      <div>Cell 3</div>
      <div>Cell 4</div>
    </uilib-grid>

    <!-- Responsive grid -->
    <uilib-grid [gap]="4" minColumnWidth="200px">
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </uilib-grid>
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
<uilib-grid [columns]="4" [gap]="4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</uilib-grid>

<!-- 3-column grid with larger gap -->
<uilib-grid [columns]="3" [gap]="6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</uilib-grid>

<!-- Responsive grid (auto-fit) -->
<uilib-grid minColumnWidth="250px" [gap]="4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</uilib-grid>

<!-- 12-column layout system -->
<uilib-grid [columns]="12" [gap]="2">
  <div style="grid-column: span 8">Main content</div>
  <div style="grid-column: span 4">Sidebar</div>
</uilib-grid>
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
    <uilib-container size="lg" [padding]="6" [centered]="true">
      <h1>Welcome</h1>
      <p>Container content goes here</p>
    </uilib-container>
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
<uilib-container size="sm" [padding]="4">
  <p>Narrow content for readability</p>
</uilib-container>

<!-- Large container (default) -->
<uilib-container size="lg" [padding]="6">
  <h1>Dashboard</h1>
  <p>Main content area</p>
</uilib-container>

<!-- Full-width container -->
<uilib-container size="full" [padding]="8">
  <p>Full-width content</p>
</uilib-container>

<!-- Non-centered container -->
<uilib-container size="md" [centered]="false" [padding]="4">
  <p>Left-aligned container</p>
</uilib-container>
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
    <uilib-container size="lg" [padding]="6">
      <uilib-stack [gap]="6">
        <header>
          <uilib-stack [gap]="2">
            <h1>Dashboard</h1>
            <p>Welcome back!</p>
          </uilib-stack>
        </header>
        
        <uilib-grid [columns]="3" [gap]="4">
          <div class="card">
            <uilib-stack [gap]="3">
              <h3>Card 1</h3>
              <p>Content here</p>
              <uilib-inline [gap]="2">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
              </uilib-inline>
            </uilib-stack>
          </div>
          
          <div class="card">
            <uilib-stack [gap]="3">
              <h3>Card 2</h3>
              <p>More content</p>
            </uilib-stack>
          </div>
          
          <div class="card">
            <uilib-stack [gap]="3">
              <h3>Card 3</h3>
              <p>Even more content</p>
            </uilib-stack>
          </div>
        </uilib-grid>
      </uilib-stack>
    </uilib-container>
  `
})
```

---

## Performance Benefits

### 1. Single Element Rendering

Each layout component renders exactly **one DOM element** (the component's host):

```html
<!-- This: -->
<uilib-stack [gap]="4">
  <div>Item</div>
</uilib-stack>

<!-- Results in minimal DOM: -->
<uilib-stack style="display: flex; flex-direction: column; gap: 1rem;">
  <div>Item</div>
</uilib-stack>
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
<uilib-stack [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</uilib-stack>
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
<uilib-stack [gap]="4">
```

### ❌ DON'T: Use Arbitrary Values

```typescript
// Avoid
<uilib-stack [gap]="7"> <!-- Token 7 doesn't exist -->
```

### ✅ DO: Compose Components

```typescript
// Good - Semantic, composable
<uilib-container size="lg">
  <uilib-stack [gap]="6">
    <uilib-grid [columns]="3" [gap]="4">
      <!-- Content -->
    </uilib-grid>
  </uilib-stack>
</uilib-container>
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
<uilib-stack [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</uilib-stack>
```

### From Material Layout

```html
<!-- Before -->
<mat-grid-list cols="4" rowHeight="200px">
  <mat-grid-tile>Cell 1</mat-grid-tile>
</mat-grid-list>

<!-- After -->
<uilib-grid [columns]="4" [gap]="4">
  <div>Cell 1</div>
</uilib-grid>
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
<uilib-container size="lg" [padding]="6">
  <uilib-grid [columns]="3" [gap]="4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </uilib-grid>
</uilib-container>
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
