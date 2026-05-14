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
| `spacing` | `StackToken \| SpacingToken \| number \| null` | `null` | Semantic gap (preferred); maps to `--uilib-stack-*` |
| `gap` | `SpacingToken` | `4` | Back-compat numeric gap token; ignored when `spacing` is set |
| `rowGap` | `StackToken \| SpacingToken \| number \| null` | `null` | Optional row-gap override; falls back to resolved `gap` |
| `columnGap` | `StackToken \| SpacingToken \| number \| null` | `null` | Optional column-gap override; falls back to resolved `gap` |
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

### Grid accessibility constraints

- `ui-lib-grid` is a layout primitive and adds **no** landmark semantics by default (no `main`, `nav`, `region`, etc.).
- Keep DOM order aligned with reading order. Do **not** visually reorder items with CSS `order` in grid children unless you also provide an explicit accessibility justification and equivalent reading sequence.
- When responsive layouts collapse from multiple columns to one column, screen readers continue to follow DOM order; structure markup in the final intended reading sequence.
