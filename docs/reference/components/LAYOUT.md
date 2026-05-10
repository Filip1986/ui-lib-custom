# Layout Primitives

## Overview

Four zero-overhead layout primitives for the most common composition patterns. Each renders only its host element — there are no wrapper divs. Styles are applied via host bindings, so they add no extra DOM nodes.

**Package:** `ui-lib-custom/layout`

```typescript
import { Stack, Inline, Grid, Container } from 'ui-lib-custom/layout';
```

> The layout entry point exports four distinct components. Each accepts all projected content via a single `<ng-content />`.

---

## Container

**Selector:** `ui-lib-container`

Centers content with a max-width constraint and uniform padding.

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `ContainerSize` | `'lg'` | Max-width token |
| `centered` | `boolean` | `false` | Applies `margin: auto` to center horizontally |
| `inset` | `InsetToken \| null` | `null` | Semantic uniform padding (preferred); maps to `--uilib-inset-*` tokens |
| `padding` | `SpacingToken` | `4` | Back-compat numeric padding token; ignored when `inset` is set |

### Types

```typescript
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
type InsetToken    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

### Example

```html
<ui-lib-container size="xl" [centered]="true" inset="md">
  <h1>Dashboard</h1>
  <p>Content goes here.</p>
</ui-lib-container>
```

---

## Stack

**Selector:** `ui-lib-stack`

Vertical or horizontal flex layout with design-token spacing.

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `direction` | `StackDirection` | `'vertical'` | `flex-direction: column` or `row` |
| `align` | `StackAlign` | `'stretch'` | `align-items` value |
| `justify` | `StackJustify` | `'start'` | `justify-content` value |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-stack-*` tokens |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token; ignored when `spacing` is set |

### Types

```typescript
type StackDirection = 'vertical' | 'horizontal';
type StackAlign     = 'start' | 'center' | 'end' | 'stretch';
type StackJustify   = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
```

### Example

```html
<ui-lib-stack direction="vertical" spacing="md" align="start">
  <h3>Profile</h3>
  <p>Details go here.</p>
</ui-lib-stack>

<ui-lib-stack direction="horizontal" spacing="sm" align="center">
  <ui-lib-avatar />
  <span>John Doe</span>
</ui-lib-stack>
```

---

## Inline

**Selector:** `ui-lib-inline`

Horizontal, wrapping flex layout — ideal for tags, chips, and button groups.

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `align` | `InlineAlign` | `'center'` | `align-items` value |
| `justify` | `InlineJustify` | `'start'` | `justify-content` value |
| `spacing` | `InlineToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-inline-*` tokens |
| `gap` | `SpacingToken` | `2` | Back-compat numeric gap token; ignored when `spacing` is set |

### Types

```typescript
type InlineAlign   = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type InlineJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around';
```

### Example

```html
<ui-lib-inline spacing="sm" align="center">
  <ui-lib-badge color="success">Active</ui-lib-badge>
  <ui-lib-badge color="info">Beta</ui-lib-badge>
  <span>Online</span>
</ui-lib-inline>
```

---

## Grid

**Selector:** `ui-lib-grid`

CSS Grid layout with fixed column count or responsive auto-fit.

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `columns` | `GridColumns` (1–12) | `12` | Fixed column count via `repeat(N, 1fr)` |
| `align` | `GridAlign` | `'stretch'` | `align-items` value |
| `justify` | `GridJustify` | `'stretch'` | `justify-items` value |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-stack-*` tokens |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token; ignored when `spacing` is set |
| `minColumnWidth` | `string \| undefined` | `undefined` | When set, switches to `repeat(auto-fit, minmax(value, 1fr))` — ignores `columns` |

### Types

```typescript
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridAlign   = 'start' | 'center' | 'end' | 'stretch';
type GridJustify = 'start' | 'center' | 'end' | 'stretch';
```

### Example — fixed columns

```html
<ui-lib-grid [columns]="3" spacing="md">
  <ui-lib-card>One</ui-lib-card>
  <ui-lib-card>Two</ui-lib-card>
  <ui-lib-card>Three</ui-lib-card>
</ui-lib-grid>
```

### Example — responsive auto-fit

```html
<ui-lib-grid minColumnWidth="220px" spacing="md">
  <ui-lib-card>Alpha</ui-lib-card>
  <ui-lib-card>Beta</ui-lib-card>
  <ui-lib-card>Gamma</ui-lib-card>
</ui-lib-grid>
```

---

## Theming & CSS Variables

The primitives use spacing and inset tokens resolved via CSS custom properties. Override them at `:root` or within any theme scope.

| Variable pattern | Used by | Purpose |
|---|---|---|
| `--uilib-container-sm/md/lg/xl/2xl` | Container | Max-width values per size token |
| `--uilib-inset-xs/sm/md/lg/xl` | Container | Uniform padding values per inset token |
| `--uilib-stack-xs/sm/md/lg/xl` | Stack, Grid | Gap values per stack spacing token |
| `--uilib-inline-xs/sm/md/lg/xl` | Inline | Gap values per inline spacing token |
| `--uilib-space-{n}` | All | Numeric spacing tokens (1–16 scale) |

---

## Accessibility

Layout primitives add no ARIA attributes. Apply semantics directly to child elements:

- Use landmark elements (`<main>`, `<nav>`, `<section>`) inside layout primitives as needed.
- Heading hierarchy belongs to projected content, not the layout wrapper.
- Grid cells do not imply any ARIA grid role — use `ui-lib-table` for data grids.

---

## Real-World Example

```html
<ui-lib-container size="xl" [centered]="true" inset="lg">
  <ui-lib-stack direction="vertical" spacing="xl">

    <ui-lib-inline spacing="sm" align="center">
      <ui-lib-badge color="info">Beta</ui-lib-badge>
      <span>v2.0 Release</span>
    </ui-lib-inline>

    <ui-lib-grid minColumnWidth="240px" spacing="md">
      <ui-lib-card>Card A</ui-lib-card>
      <ui-lib-card>Card B</ui-lib-card>
      <ui-lib-card>Card C</ui-lib-card>
    </ui-lib-grid>

    <ui-lib-stack direction="horizontal" spacing="sm" justify="end">
      <ui-lib-button variant="minimal">Cancel</ui-lib-button>
      <ui-lib-button>Save</ui-lib-button>
    </ui-lib-stack>

  </ui-lib-stack>
</ui-lib-container>
```

---

## Related

- [`docs/reference/systems/LAYOUT_SYSTEM.md`](../systems/LAYOUT_SYSTEM.md)
- [`docs/reference/systems/DESIGN_TOKENS.md`](../systems/DESIGN_TOKENS.md)
- [`CARD.md`](CARD.md)
