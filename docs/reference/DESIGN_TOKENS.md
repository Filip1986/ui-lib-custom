# Design Token System

A comprehensive design token system for consistent spacing, sizing, colors, typography, and visual styling across the UI library.

## Overview

Design tokens are the single source of truth for design decisions in the library. They ensure consistency, enable easy theming, and provide a type-safe API for styling.

**Location:** `projects/ui-lib-custom/src/lib/design-tokens.ts`

---

## Token Categories

### 🎨 **Color Tokens**

#### Color Palettes

Each semantic color has a full palette from 50 (lightest) to 900 (darkest):

**Available Palettes:**
- `COLOR_PRIMARY` - Brand/primary colors
- `COLOR_NEUTRAL` - Grayscale colors
- `COLOR_SUCCESS` - Success states
- `COLOR_DANGER` - Error/danger states
- `COLOR_WARNING` - Warning states
- `COLOR_INFO` - Informational states

**Example:**
```typescript
import { COLOR_PRIMARY, COLOR_SUCCESS } from 'ui-lib-custom';

const primaryColor = COLOR_PRIMARY[700];  // #1976d2
const successColor = COLOR_SUCCESS[500];  // #4caf50
```

#### Semantic Colors

Pre-defined semantic color mappings for common use cases:

```typescript
import { SEMANTIC_COLORS } from 'ui-lib-custom';

SEMANTIC_COLORS.primary          // Main brand color
SEMANTIC_COLORS['primary-hover'] // Primary hover state
SEMANTIC_COLORS.success          // Success color
SEMANTIC_COLORS.danger           // Danger/error color
SEMANTIC_COLORS.text             // Main text color
SEMANTIC_COLORS.border           // Border color
SEMANTIC_COLORS.background       // Background color
```

**Complete Semantic Color List:**
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #1976d2 | Main brand color |
| `primary-hover` | #1565c0 | Primary hover state |
| `primary-light` | #2196f3 | Light primary variant |
| `primary-dark` | #0d47a1 | Dark primary variant |
| `secondary` | #757575 | Secondary actions |
| `secondary-hover` | #616161 | Secondary hover |
| `success` | #388e3c | Success states |
| `success-hover` | #2e7d32 | Success hover |
| `danger` | #d32f2f | Error/danger states |
| `danger-hover` | #c62828 | Danger hover |
| `warning` | #f57c00 | Warning states |
| `warning-hover` | #ef6c00 | Warning hover |
| `info` | #0288d1 | Info states |
| `info-hover` | #0277bd | Info hover |
| `text` | #212121 | Primary text |
| `text-secondary` | #757575 | Secondary text |
| `text-disabled` | #bdbdbd | Disabled text |
| `border` | #e0e0e0 | Default border |
| `border-light` | #eeeeee | Light border |
| `border-dark` | #bdbdbd | Dark border |
| `background` | #ffffff | Background |
| `background-alt` | #fafafa | Alt background |
| `background-dark` | #212121 | Dark background |

#### Bootstrap Colors

For Bootstrap compatibility:

```typescript
import { BOOTSTRAP_COLORS } from 'ui-lib-custom';

BOOTSTRAP_COLORS.primary   // #0d6efd
BOOTSTRAP_COLORS.success   // #198754
BOOTSTRAP_COLORS.danger    // #dc3545
```

---

### 📏 **Spacing Tokens**

Consistent spacing scale based on 4px increments:

```typescript
import { SPACING_TOKENS, type SpacingToken } from 'ui-lib-custom';

const gap: SpacingToken = 4; // 1rem (16px)
```

**Spacing Scale:**
| Token | Value | Pixels | Common Usage |
|-------|-------|--------|--------------|
| 0 | 0 | 0px | No spacing |
| 1 | 0.25rem | 4px | Tight spacing |
| 2 | 0.5rem | 8px | Small gaps |
| 3 | 0.75rem | 12px | Compact layouts |
| 4 | 1rem | 16px | **Default spacing** |
| 5 | 1.25rem | 20px | Medium spacing |
| 6 | 1.5rem | 24px | Comfortable spacing |
| 8 | 2rem | 32px | Large spacing |
| 10 | 2.5rem | 40px | Extra large |
| 12 | 3rem | 48px | Section spacing |
| 16 | 4rem | 64px | Major sections |
| 20 | 5rem | 80px | Page sections |

**Usage:**
```typescript
<uilib-stack [gap]="4">  <!-- 16px gap -->
<uilib-container [padding]="6">  <!-- 24px padding -->
```

---

### 📐 **Sizing Tokens**

#### Container Sizes

Max-width constraints for content containers:

```typescript
import { CONTAINER_MAX_WIDTHS, type ContainerSize } from 'ui-lib-custom';
```

| Size | Max Width | Use Case |
|------|-----------|----------|
| `sm` | 640px | Forms, narrow content |
| `md` | 768px | Blog posts, articles |
| `lg` | 1024px | **Default**, main content |
| `xl` | 1280px | Wide layouts |
| `2xl` | 1536px | Full dashboards |
| `full` | 100% | Edge-to-edge |

#### Grid Columns

Column counts for grid layouts:

```typescript
import { GRID_COLUMNS, type GridColumns } from 'ui-lib-custom';
```

Available: `1, 2, 3, 4, 5, 6, 8, 10, 12`

---

### 🔤 **Typography Tokens**

#### Font Sizes

```typescript
import { FONT_SIZES, type FontSize } from 'ui-lib-custom';
```

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `xs` | 0.75rem | 12px | Fine print |
| `sm` | 0.875rem | 14px | Small text |
| `base` | 1rem | 16px | Body text |
| `lg` | 1.125rem | 18px | Large text |
| `xl` | 1.25rem | 20px | Subheadings |
| `2xl` | 1.5rem | 24px | Headings |
| `3xl` | 1.875rem | 30px | Large headings |
| `4xl` | 2.25rem | 36px | Display |
| `5xl` | 3rem | 48px | Hero |

#### Font Weights

```typescript
import { FONT_WEIGHTS, type FontWeight } from 'ui-lib-custom';
```

| Token | Value |
|-------|-------|
| `light` | 300 |
| `normal` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |

#### Line Heights

```typescript
import { LINE_HEIGHTS, type LineHeight } from 'ui-lib-custom';
```

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | 1.25 | Headings |
| `normal` | 1.5 | Body text |
| `relaxed` | 1.75 | Long-form content |
| `loose` | 2 | Poetry, quotes |

---

### 🎭 **Border Tokens**

#### Border Radius

```typescript
import { BORDER_RADIUS, type BorderRadius } from 'ui-lib-custom';
```

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `none` | 0 | 0px | Sharp corners |
| `sm` | 0.125rem | 2px | Subtle rounding |
| `base` | 0.25rem | 4px | **Default** |
| `md` | 0.375rem | 6px | Cards |
| `lg` | 0.5rem | 8px | Modals |
| `xl` | 0.75rem | 12px | Large cards |
| `2xl` | 1rem | 16px | Hero sections |
| `full` | 9999px | ∞ | Pills, circles |

#### Border Width

```typescript
import { BORDER_WIDTH, type BorderWidth } from 'ui-lib-custom';
```

| Token | Value |
|-------|-------|
| `0` | 0 |
| `1` | 1px |
| `2` | 2px |
| `4` | 4px |

---

### 🌫️ **Shadow Tokens**

Box shadows for elevation:

```typescript
import { SHADOWS, type Shadow } from 'ui-lib-custom';
```

| Token | Usage |
|-------|-------|
| `none` | No shadow |
| `sm` | Subtle elevation |
| `base` | Cards |
| `md` | Dropdowns |
| `lg` | Modals |
| `xl` | Popovers |
| `2xl` | Hero elements |
| `inner` | Inset shadow |

**Example Values:**
```typescript
SHADOWS.sm   // '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
SHADOWS.md   // '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
```

---

### ⚡ **Transition Tokens**

#### Duration

```typescript
import { TRANSITION_DURATION, type TransitionDuration } from 'ui-lib-custom';
```

| Token | Value | Usage |
|-------|-------|-------|
| `fast` | 150ms | Micro-interactions |
| `base` | 200ms | **Default** |
| `slow` | 300ms | Smooth transitions |
| `slower` | 500ms | Animated sequences |

#### Timing Functions

```typescript
import { TRANSITION_TIMING, type TransitionTiming } from 'ui-lib-custom';
```

Available: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`

---

### 📚 **Z-Index Tokens**

Stacking context management:

```typescript
import { Z_INDEX, type ZIndex } from 'ui-lib-custom';
```

| Token | Value | Usage |
|-------|-------|-------|
| `base` | 0 | Normal flow |
| `dropdown` | 1000 | Dropdowns |
| `sticky` | 1020 | Sticky elements |
| `fixed` | 1030 | Fixed positioning |
| `backdrop` | 1040 | Modal backdrops |
| `modal` | 1050 | Modals |
| `popover` | 1060 | Popovers |
| `tooltip` | 1070 | Tooltips |

---

## Usage Examples

### In TypeScript

```typescript
import { 
  SEMANTIC_COLORS, 
  SPACING_TOKENS, 
  FONT_SIZES,
  SHADOWS 
} from 'ui-lib-custom';

// Use in component logic
const buttonColor = SEMANTIC_COLORS.primary;
const gap = SPACING_TOKENS[4];
const fontSize = FONT_SIZES.lg;
```

### In Angular Components

```typescript
import { Component } from '@angular/core';
import { SEMANTIC_COLORS, type SemanticColor } from 'ui-lib-custom';

@Component({
  template: `
    <div [style.color]="textColor">
      Styled text
    </div>
  `
})
export class MyComponent {
  textColor = SEMANTIC_COLORS.primary;
}
```

### With Layout Primitives

```typescript
<uilib-stack [gap]="6">  <!-- Uses SPACING_TOKENS[6] -->
<uilib-container size="lg" [padding]="4">  <!-- Uses tokens -->
<uilib-grid [columns]="3" [gap]="4">  <!-- Grid + spacing tokens -->
```

### In SCSS (Advanced)

You can create SCSS variables from TypeScript tokens:

```typescript
// tokens.scss (generated from design-tokens.ts)
$color-primary: #1976d2;
$spacing-4: 1rem;
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

---

## Type Safety

All tokens have TypeScript types for compile-time safety:

```typescript
import { SpacingToken, SemanticColor, FontSize } from 'ui-lib-custom';

function setGap(gap: SpacingToken) {
  // gap can only be valid spacing token keys
}

function setColor(color: SemanticColor) {
  // color can only be valid semantic color keys
}

setGap(4);  // ✅ Valid
setGap(7);  // ❌ TypeScript error - 7 is not a valid token
```

---

## Benefits

### ✅ Consistency
- All components use the same values
- Design decisions are centralized
- Easy to maintain and update

### ✅ Type Safety
- TypeScript prevents invalid values
- IDE autocomplete for all tokens
- Compile-time error checking

### ✅ Theming
- Easy to create theme variants
- Override tokens for different themes
- Consistent theming API

### ✅ Maintainability
- Single source of truth
- Change once, update everywhere
- Clear naming conventions

### ✅ Performance
- No runtime computation
- Constants are inlined
- Tree-shakeable exports

---

## Best Practices

### ✅ DO: Use Semantic Colors

```typescript
// Good
import { SEMANTIC_COLORS } from 'ui-lib-custom';
const color = SEMANTIC_COLORS.primary;
```

### ❌ DON'T: Use Hardcoded Colors

```typescript
// Avoid
const color = '#1976d2';
```

### ✅ DO: Use Spacing Tokens

```typescript
// Good
<uilib-stack [gap]="4">
```

### ❌ DON'T: Use Arbitrary Values

```typescript
// Avoid
<div style="gap: 15px">
```

### ✅ DO: Use Type Imports

```typescript
// Good
import { type SpacingToken, type SemanticColor } from 'ui-lib-custom';

function myFunction(gap: SpacingToken, color: SemanticColor) { }
```

---

## Extending the System

### Adding New Tokens

To add new design tokens:

1. Edit `projects/ui-lib-custom/src/lib/design-tokens.ts`
2. Add to the appropriate section
3. Maintain type definitions
4. Document in this file
5. Update tests if needed

**Example:**
```typescript
export const SPACING_TOKENS = {
  // ...existing tokens
  24: '6rem',  // 96px
} as const;
```

### Creating Theme Variants

```typescript
// theme-dark.ts
import { SEMANTIC_COLORS } from 'ui-lib-custom';

export const DARK_THEME = {
  ...SEMANTIC_COLORS,
  background: '#212121',
  text: '#ffffff',
  // Override other colors
};
```

---

## Migration from Hardcoded Values

### Before (Hardcoded)

```scss
// button.scss
$button-padding: 0.5rem 1rem;
$button-color: #1976d2;
$button-radius: 4px;

.button {
  padding: $button-padding;
  background: $button-color;
  border-radius: $button-radius;
}
```

### After (Design Tokens)

```typescript
// button.component.ts
import { SEMANTIC_COLORS, SPACING_TOKENS, BORDER_RADIUS } from 'ui-lib-custom';

@Component({
  host: {
    '[style.padding]': 'buttonPadding',
    '[style.background]': 'buttonColor',
    '[style.border-radius]': 'buttonRadius',
  }
})
export class Button {
  buttonPadding = `${SPACING_TOKENS[2]} ${SPACING_TOKENS[4]}`;
  buttonColor = SEMANTIC_COLORS.primary;
  buttonRadius = BORDER_RADIUS.base;
}
```

---

## Reference

**Full Token Export:**
```typescript
export * from './design-tokens';  // All tokens available
```

**Import What You Need:**
```typescript
import { 
  // Colors
  COLOR_PRIMARY,
  COLOR_SUCCESS,
  SEMANTIC_COLORS,
  
  // Spacing
  SPACING_TOKENS,
  
  // Typography
  FONT_SIZES,
  FONT_WEIGHTS,
  
  // Visual
  SHADOWS,
  BORDER_RADIUS,
  
  // Types
  type SemanticColor,
  type SpacingToken,
  type FontSize,
} from 'ui-lib-custom';
```

---

**Next:** See [Layout Primitives](./LAYOUT_PRIMITIVES.md) for components that use these tokens.
