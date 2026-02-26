# Layout Primitives

## Overview

Layout primitives provide fast, predictable composition for common layout patterns without wrapper divs. They are standalone, signal-driven, and theme-aware through spacing tokens.

**Import**
```typescript
import { Stack, Inline, Grid, Container } from 'ui-lib-custom/layout';
```

**Location:** `projects/ui-lib-custom/src/lib/layout/`

---

## Stack

A vertical or horizontal flex layout with configurable alignment and spacing.

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Align items on the cross axis. |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | Justify items on the main axis. |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic spacing (preferred). |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token. |

### Example
```html
<ui-lib-stack [spacing]="'md'" align="start">
  <h3>Profile</h3>
  <p>Details go here.</p>
</ui-lib-stack>
```

---

## Inline

A horizontal flex row with wrapping, ideal for tags, chips, and button groups.

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | `'center'` | Align items on the cross axis. |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around'` | `'start'` | Justify items on the main axis. |
| `spacing` | `InlineToken \| SpacingToken \| number \| null` | `null` | Semantic spacing (preferred). |
| `gap` | `SpacingToken` | `2` | Back-compat numeric gap token. |

### Example
```html
<ui-lib-inline [spacing]="'sm'" align="center">
  <ui-lib-badge color="success">Active</ui-lib-badge>
  <span>Online</span>
</ui-lib-inline>
```

---

## Grid

A CSS Grid layout with tokenized column counts and optional auto-fit mode.

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `GridColumns` | `12` | Column count (tokenized). |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Align items along the block axis. |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Justify items along the inline axis. |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic spacing (preferred). |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token. |
| `minColumnWidth` | `string \| undefined` | `undefined` | Enables auto-fit grid when set. |

### Example
```html
<ui-lib-grid [columns]="3" [gap]="4">
  <ui-lib-card>One</ui-lib-card>
  <ui-lib-card>Two</ui-lib-card>
  <ui-lib-card>Three</ui-lib-card>
</ui-lib-grid>
```

Auto-fit:
```html
<ui-lib-grid minColumnWidth="220px" [spacing]="'md'">
  <ui-lib-card>Alpha</ui-lib-card>
  <ui-lib-card>Beta</ui-lib-card>
  <ui-lib-card>Gamma</ui-lib-card>
</ui-lib-grid>
```

---

## Container

A centered container with max-width constraints and configurable padding.

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `ContainerSize` | `'lg'` | Max-width token. |
| `centered` | `boolean` | `false` | Centers the container. |
| `inset` | `Exclude<InsetToken, 'xs'> \| null` | `null` | Semantic inset padding (preferred). |
| `padding` | `SpacingToken` | `4` | Back-compat padding token. |

### Example
```html
<ui-lib-container size="xl" [centered]="true">
  <ui-lib-stack [spacing]="'lg'">
    <h1>Dashboard</h1>
    <p>Content goes here.</p>
  </ui-lib-stack>
</ui-lib-container>
```

---

## Theming & CSS Variables

The primitives use spacing/inset tokens resolved via CSS variables:

- `--uilib-space-*`
- `--uilib-stack-*`
- `--uilib-inline-*`
- `--uilib-inset-*`
- `--uilib-container-*`

Override them at `:root` or within a theme scope.

---

## Accessibility

Layout primitives do not add ARIA attributes. Apply semantics to child elements as needed.

---

## Real-World Example

```html
<ui-lib-container size="xl" [centered]="true">
  <ui-lib-stack [spacing]="'lg'">
    <ui-lib-inline [spacing]="'sm'" align="center">
      <ui-lib-badge color="info">Beta</ui-lib-badge>
      <span>Release</span>
    </ui-lib-inline>
    <ui-lib-grid minColumnWidth="240px" [spacing]="'md'">
      <ui-lib-card>Card A</ui-lib-card>
      <ui-lib-card>Card B</ui-lib-card>
      <ui-lib-card>Card C</ui-lib-card>
    </ui-lib-grid>
  </ui-lib-stack>
</ui-lib-container>
```

