# Layout Primitives - Quick Start Guide

Get started with layout primitives in under 5 minutes.

## Installation

The layout primitives are part of the `ui-lib-custom` package:

```bash
npm install ui-lib-custom
```

## Import

Import the components you need:

```typescript
import { Stack, Inline, Grid, Container } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Stack, Inline, Grid, Container],
  // ...
})
export class MyComponent {}
```

## Basic Usage

### Stack - Vertical or Horizontal Layout

```typescript
@Component({
  template: `
    <!-- Vertical stack -->
    <uilib-stack [gap]="4">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </uilib-stack>

    <!-- Horizontal stack -->
    <uilib-stack direction="horizontal" [gap]="3">
      <button>Cancel</button>
      <button>Submit</button>
    </uilib-stack>
  `
})
```

### Inline - Wrapping Tags/Chips

```typescript
@Component({
  template: `
    <uilib-inline [gap]="2">
      <span class="tag">JavaScript</span>
      <span class="tag">TypeScript</span>
      <span class="tag">Angular</span>
    </uilib-inline>
  `
})
```

### Grid - Multi-Column Layout

```typescript
@Component({
  template: `
    <!-- 3-column grid -->
    <uilib-grid [columns]="3" [gap]="4">
      <div>Cell 1</div>
      <div>Cell 2</div>
      <div>Cell 3</div>
    </uilib-grid>

    <!-- Responsive grid -->
    <uilib-grid minColumnWidth="200px" [gap]="4">
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </uilib-grid>
  `
})
```

### Container - Centered Content

```typescript
@Component({
  template: `
    <uilib-container size="lg" [padding]="6">
      <h1>Welcome</h1>
      <p>Your content here</p>
    </uilib-container>
  `
})
```

## Common Patterns

### Card Grid

```typescript
@Component({
  template: `
    <uilib-container size="xl" [padding]="6">
      <uilib-grid [columns]="3" [gap]="4">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
      </uilib-grid>
    </uilib-container>
  `
})
```

### Form Layout

```typescript
@Component({
  template: `
    <uilib-container size="sm" [padding]="6">
      <uilib-stack [gap]="6">
        <h1>Login</h1>
        
        <uilib-stack [gap]="4">
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Password">
          
          <uilib-stack direction="horizontal" justify="space-between">
            <button>Cancel</button>
            <button>Login</button>
          </uilib-stack>
        </uilib-stack>
      </uilib-stack>
    </uilib-container>
  `
})
```

### Dashboard Layout

```typescript
@Component({
  template: `
    <uilib-container size="xl" [padding]="6">
      <uilib-stack [gap]="6">
        <header>
          <h1>Dashboard</h1>
        </header>
        
        <uilib-grid [columns]="4" [gap]="4">
          <div class="stat-card">Stat 1</div>
          <div class="stat-card">Stat 2</div>
          <div class="stat-card">Stat 3</div>
          <div class="stat-card">Stat 4</div>
        </uilib-grid>
        
        <uilib-grid [columns]="2" [gap]="6">
          <div class="chart">Chart 1</div>
          <div class="chart">Chart 2</div>
        </uilib-grid>
      </uilib-stack>
    </uilib-container>
  `
})
```

## Spacing Cheat Sheet

Use these spacing tokens for `gap` and `padding`:

| Token | Size | Use Case |
|-------|------|----------|
| `1` | 4px | Tight spacing |
| `2` | 8px | Tags, chips |
| `3` | 12px | Compact layouts |
| `4` | 16px | Default spacing |
| `6` | 24px | Comfortable spacing |
| `8` | 32px | Large spacing |
| `12` | 48px | Section dividers |

## Container Sizes

| Size | Max Width | Use Case |
|------|-----------|----------|
| `sm` | 640px | Forms, narrow content |
| `md` | 768px | Blog posts, articles |
| `lg` | 1024px | Default (recommended) |
| `xl` | 1280px | Wide content |
| `2xl` | 1536px | Full dashboards |
| `full` | 100% | Edge-to-edge |

## Next Steps

- [Full API Reference](./LAYOUT_PRIMITIVES.md)
- [View Live Demo](http://localhost:4200/layouts)
- [Architecture Guide](../architecture/ARCHITECTURE.md)

## Tips

1. **Start with Container**: Wrap your page content in a container for consistent max-width
2. **Use Stack for most layouts**: It's the most versatile primitive
3. **Compose freely**: Layout primitives are designed to be nested
4. **Stick to design tokens**: Don't use arbitrary spacing values
5. **Grid for cards**: Use Grid for multi-column card layouts
6. **Inline for tags**: Use Inline for any horizontal list that should wrap

## Need Help?

Check the full documentation at `docs/reference/LAYOUT_PRIMITIVES.md` for detailed examples and API reference.
