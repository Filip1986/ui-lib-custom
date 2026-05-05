# Layout Primitives

**Package:** `ui-lib-custom/layout`
**Content projection:** yes — all four primitives project all content via `<ng-content />`

> The layout folder exports four distinct components (`ui-lib-container`, `ui-lib-stack`, `ui-lib-inline`, `ui-lib-grid`), not a single "Layout" component. Each renders only its host element — there are no wrapper divs. Styles are applied directly via host bindings, making them zero-overhead layout primitives.

---

## Container

**Selector:** `ui-lib-container`

Centers content with a max-width constraint and uniform padding.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Max-width via `--uilib-container-<size>` |
| `centered` | `boolean` | `false` | Applies `margin: auto` to center horizontally |
| `inset` | `InsetToken \| null` | `null` | Semantic uniform padding (preferred); maps to `--uilib-inset-*` |
| `padding` | `SpacingToken` | `4` | Back-compat numeric padding token; ignored when `inset` is set |

### Outputs

_none_

---

## Stack

**Selector:** `ui-lib-stack`

Vertical or horizontal flex layout with design-token spacing.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Maps to `flex-direction: column / row` |
| `align` | `StackAlign` | `'stretch'` | `align-items` value |
| `justify` | `StackJustify` | `'start'` | `justify-content` value |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-stack-*` |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token; ignored when `spacing` is set |

### Outputs

_none_

---

## Inline

**Selector:** `ui-lib-inline`

Horizontal, wrapping flex layout — ideal for tags, chips, and button groups.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `align` | `InlineAlign` | `'center'` | `align-items` value |
| `justify` | `InlineJustify` | `'start'` | `justify-content` value |
| `spacing` | `InlineToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-inline-*` |
| `gap` | `SpacingToken` | `2` | Back-compat numeric gap token; ignored when `spacing` is set |

### Outputs

_none_

---

## Grid

**Selector:** `ui-lib-grid`

CSS Grid layout with fixed column count or responsive auto-fit.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `columns` | `GridColumns` (1–12) | `12` | Number of equal columns via `repeat(N, 1fr)` |
| `align` | `GridAlign` | `'stretch'` | `align-items` value |
| `justify` | `GridJustify` | `'stretch'` | `justify-items` value |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-stack-*` |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token; ignored when `spacing` is set |
| `minColumnWidth` | `string \| undefined` | `undefined` | When set, uses `repeat(auto-fit, minmax(value, 1fr))` instead of fixed columns |

### Outputs

_none_

---

## Usage

```html
<!-- centered page shell -->
<ui-lib-container size="xl" [centered]="true" inset="md">
  <ui-lib-stack direction="vertical" spacing="lg">
    <ui-lib-grid [columns]="3" spacing="md">
      <!-- grid cells -->
    </ui-lib-grid>
    <ui-lib-inline spacing="sm">
      <!-- inline chips -->
    </ui-lib-inline>
  </ui-lib-stack>
</ui-lib-container>

<!-- responsive auto-fit grid -->
<ui-lib-grid minColumnWidth="200px" spacing="md">
  <!-- cards -->
</ui-lib-grid>
```
