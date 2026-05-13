# Layout Primitives

**Package:** `ui-lib-custom/layout`
**Content projection:** yes — all four primitives project all content via `<ng-content />`

> The layout folder exports four distinct components (`ui-lib-container`, `ui-lib-stack`, `ui-lib-inline`, `ui-lib-grid`), not a single "Layout" component. Each renders only its host element — there are no wrapper divs. Styles are applied directly via host bindings, making them zero-overhead layout primitives.

---

## Container

**Selector:** `ui-lib-container`

Centers content with a max-width constraint and uniform padding.
Single host element — no wrapper divs, no extra DOM nodes.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Max-width via `--uilib-container-<size>` |
| `centered` | `boolean` | `false` | Applies `margin: auto` to center horizontally |
| `inset` | `'sm' \| 'md' \| 'lg' \| 'xl' \| null` | `null` | Semantic uniform padding (preferred); maps to `--uilib-inset-*` |
| `padding` | `SpacingToken` | `4` | Back-compat numeric padding token; ignored when `inset` is set |

### Outputs

_none_

### Size presets

| Size | Max-width | CSS variable override |
|------|-----------|-----------------------|
| `sm` | 640 px | `--uilib-container-sm` |
| `md` | 768 px | `--uilib-container-md` |
| `lg` | 1024 px *(default)* | `--uilib-container-lg` |
| `xl` | 1280 px | `--uilib-container-xl` |
| `2xl` | 1536 px | `--uilib-container-2xl` |
| `full` | 100 % | `--uilib-container-full` |

### Custom max-width override

Override the max-width for any `size` by setting the corresponding CSS custom property on a parent
or on the host element itself:

```css
/* site-wide narrower xl breakpoint */
:root {
  --uilib-container-xl: 1200px;
}

/* scoped override via style binding */
```
```html
<ui-lib-container size="xl" style="--uilib-container-xl: 960px;">
  <!-- content constrained to 960 px -->
</ui-lib-container>
```

### Skip-link target support

Containers that serve as landmark regions (e.g. the main page body) are frequently targeted by
skip navigation links:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<ui-lib-container id="main-content" size="xl" [centered]="true" inset="md">
  <!-- page content -->
</ui-lib-container>
```

When a static `id` attribute is present on the host element, the container automatically adds
`tabindex="-1"` so keyboard users and assistive technology can programmatically focus it after
activating the skip link.  The container does **not** appear in the natural tab order.

> **Note:** Only static `id` attributes (plain HTML attribute syntax) trigger this behaviour.
> Dynamic bindings (`[id]="someId"`) do not affect `tabindex`; apply `tabindex="-1"` manually
> in that case.

### Accessibility notes

- Renders as a plain `<ui-lib-container>` custom element — **no** landmark role (`main`, `nav`,
  `aside`, etc.) is added.  Wrapping in `<main>`, `<nav>`, etc. is the consumer's responsibility.
- `overflow: hidden` is **never** applied.  Content at the edge of the max-width constraint
  remains reachable for screen-magnification users who pan horizontally.

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
