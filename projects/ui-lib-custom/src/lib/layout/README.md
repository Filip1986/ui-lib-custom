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

### CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-container-sm` | `640px` | Max inline-size for `size="sm"` |
| `--uilib-container-md` | `768px` | Max inline-size for `size="md"` |
| `--uilib-container-lg` | `1024px` | Max inline-size for `size="lg"` (default) |
| `--uilib-container-xl` | `1280px` | Max inline-size for `size="xl"` |
| `--uilib-container-2xl` | `1536px` | Max inline-size for `size="2xl"` |
| `--uilib-container-full` | `100%` | Max inline-size for `size="full"` |
| `--uilib-container-fg` | `var(--uilib-text-dark-primary)` | Foreground color override (dark-mode context) |

---

## Stack

**Selector:** `ui-lib-stack`

Vertical or horizontal flex layout with design-token spacing.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `as` | `'div' \| 'span' \| 'ul' \| 'ol' \| 'nav' \| 'section' \| 'main' \| 'aside'` | `'div'` | Semantic rendered element |
| `tag` | `'div' \| 'span' \| 'ul' \| 'ol' \| 'nav' \| 'section' \| 'main' \| 'aside' \| null` | `null` | Alias for `as`; `as` takes precedence when both are set |
| `ariaLabel` | `string \| null` | `null` | Required when `as="nav"` to provide an accessible name |
| `role` | `string \| null` | `null` | Optional ARIA role for non-list tags (for example `role="list"`) |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Maps to `flex-direction: column / row` |
| `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` | Maps to `flex-wrap` |
| `align` | `StackAlign` | `'stretch'` | `align-items` value |
| `justify` | `StackJustify` | `'start'` | `justify-content` value |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-stack-*` |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token; ignored when `spacing` is set |

### Outputs

_none_

### Accessibility notes

- Default render target is a neutral `<div>` and does not add landmark semantics.
- Use semantic tags explicitly with `as`/`tag` (for example `ul`, `nav`, `main`) when needed.
- When `as="nav"`, always provide `ariaLabel` so the navigation landmark has an accessible name.
- For list behavior, prefer native list tags (`as="ul"`/`as="ol"`). For non-list tags, you can set `role="list"`.
- With `wrap`/`wrap-reverse`, keep DOM order equal to the intended reading order. Do **not** use CSS
  `order` to visually rearrange items independently from source order.

### Recipes

```html
<!-- Vertical form layout -->
<ui-lib-stack spacing="md">
  <label for="email">Email</label>
  <input id="email" />
  <label for="password">Password</label>
  <input id="password" type="password" />
</ui-lib-stack>

<!-- Horizontal action row -->
<ui-lib-stack direction="horizontal" justify="space-between" align="center" spacing="sm">
  <button type="button">Cancel</button>
  <button type="submit">Save</button>
</ui-lib-stack>

<!-- Semantic list -->
<ui-lib-stack as="ul" spacing="sm">
  <li>Alpha</li>
  <li>Beta</li>
  <li>Gamma</li>
</ui-lib-stack>

<!-- Navigation landmark -->
<ui-lib-stack as="nav" ariaLabel="Primary navigation" direction="horizontal" spacing="md">
  <a href="/overview">Overview</a>
  <a href="/components">Components</a>
  <a href="/tokens">Tokens</a>
</ui-lib-stack>
```

---

## Inline

**Selector:** `ui-lib-inline`

Horizontal, wrapping flex layout — ideal for tags, chips, and button groups.

> Use **Inline** for horizontal, wrapping flows. Use **Stack** for linear vertical/horizontal
> spacing where wrap behavior is not the primary need.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `as` | `'div' \| 'span' \| 'ul' \| 'ol'` | `'div'` | Semantic rendered element |
| `tag` | `'div' \| 'span' \| 'ul' \| 'ol' \| null` | `null` | Alias for `as`; `as` takes precedence when both are set |
| `align` | `InlineAlign` | `'center'` | `align-items` value |
| `justify` | `InlineJustify` | `'start'` | `justify-content` value |
| `spacing` | `InlineToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-inline-*` |
| `gap` | `SpacingToken` | `2` | Back-compat numeric gap token; ignored when `spacing` is set |

### Outputs

_none_

### Accessibility notes

- Default render target is a neutral `<div>` (no landmark role added).
- Set `as="span"` to keep inline flow semantics for inline text/content contexts.
- When items wrap, keep DOM order equal to intended reading order. Do **not** use visual reordering
  (`order`) to rearrange content independently of source order.

### Recipes

```html
<!-- Inline chips in text flow -->
<p>
  Filters:
  <ui-lib-inline as="span" spacing="sm">
    <span>Frontend</span>
    <span>Accessibility</span>
    <span>Angular</span>
  </ui-lib-inline>
</p>

<!-- Semantic list rendering -->
<ui-lib-inline as="ul" spacing="sm">
  <li>Fast</li>
  <li>Typed</li>
  <li>Accessible</li>
</ui-lib-inline>
```

---

## Grid

**Selector:** `ui-lib-grid`

CSS Grid layout with fixed column count or responsive auto-fit.

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `columns` | `GridColumns (1–12) \| string` | `12` | Number of equal columns via `repeat(N, 1fr)` or custom template string (e.g. `2fr minmax(200px, 1fr)`) |
| `align` | `GridAlign` | `'stretch'` | `align-items` value |
| `justify` | `GridJustify` | `'stretch'` | `justify-items` value |
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | **Preferred** semantic gap; maps to `--uilib-stack-*` t-shirt sizes (`xs` · `sm` · `md` · `lg` · `xl`) |
| `gap` | `SpacingToken` | `4` | Legacy numeric gap token (backward-compat); **ignored when `spacing` is set** |
| `rowGap` | `StackToken \| SpacingToken \| number \| null` | `null` | Optional row-gap override; falls back to resolved `gap` |
| `columnGap` | `StackToken \| SpacingToken \| number \| null` | `null` | Optional column-gap override; falls back to resolved `gap` |
| `minColumnWidth` | `string \| undefined` | `undefined` | When set, uses `repeat(auto-fit, minmax(value, 1fr))` instead of fixed columns — **takes precedence over `columns`** |

> **`spacing` vs `gap`:** Prefer `spacing` for all new code. It uses the semantic t-shirt-size scale
> (`xs`/`sm`/`md`/`lg`/`xl`) and maps to `--uilib-stack-*` CSS variables.  The numeric `gap` input
> is kept for backward compatibility only.

### Outputs

_none_

### Responsive auto-fit grids

Use `minColumnWidth` to create a self-collapsing grid that never needs breakpoint media queries:

```html
<!-- collapses naturally when viewport is narrower than 3 × 280 px -->
<ui-lib-grid minColumnWidth="280px" spacing="md">
  <ui-lib-card>...</ui-lib-card>
  <ui-lib-card>...</ui-lib-card>
  <ui-lib-card>...</ui-lib-card>
</ui-lib-grid>
```

When `minColumnWidth` is set it overrides the `columns` input regardless of value.

### Child spanning

Children can span multiple columns using the standard `grid-column` CSS property:

```html
<ui-lib-grid [columns]="4" spacing="sm">
  <div style="grid-column: span 2">Wide item</div>
  <div>Normal</div>
  <div>Normal</div>
</ui-lib-grid>
```

### CSS custom property overrides

The resolved gap is published as `--uilib-grid-gap` on the host element, allowing consumers to
override spacing locally without changing inputs:

```html
<ui-lib-grid [columns]="3" spacing="md" style="--uilib-grid-gap: 2rem;">
  <!-- custom gap applied -->
</ui-lib-grid>
```

### Accessibility notes

- `ui-lib-grid` is a **layout primitive** — it emits **no** ARIA role.  Never add `role="grid"` to a
  layout grid; that role declares an interactive ARIA data-grid widget.  Landmark roles (`main`,
  `nav`, `region`, etc.) are the consumer's responsibility.
- **`overflow: hidden` is never applied.** Grid children remain fully accessible to screen-
  magnification users who pan the viewport.
- Keep **DOM order aligned with reading order** at every column count.  When the grid collapses from
  multiple columns to one column on narrow viewports, screen readers follow DOM order; structure
  markup in the final intended reading sequence before authoring multi-column layouts.

> ⚠️ **A11y — CSS `order` is banned on Grid children.** The CSS `order` property changes the visual
> position of a grid item without changing its position in the DOM.  Screen readers follow DOM order,
> not visual order, so using `order` creates a mismatch between what sighted users see and what
> assistive technology announces.  `ui-lib-grid` does **not** expose an `order` input for this
> reason.  If you apply `order` to a child element via custom CSS, you must ensure the DOM order
> still represents a logical reading sequence.

> ⚠️ **A11y — `minColumnWidth` and responsive collapse.** When `repeat(auto-fit, …)` causes the
> grid to collapse from multiple columns to a single column on narrow viewports, all content
> becomes a single vertical stack.  Screen readers always follow the DOM order, so verify that the
> source order is logical when read top-to-bottom.  Never rely on `order` to fix reading-order
> problems at any column count.

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

<!-- responsive auto-fit grid — collapses automatically, no breakpoints needed -->
<ui-lib-grid minColumnWidth="200px" spacing="md">
  <!-- cards -->
</ui-lib-grid>
```
