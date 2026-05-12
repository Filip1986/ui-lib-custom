# ProgressSpinner

An animated circular spinner for indicating an indeterminate loading state.

## Package path

```ts
import { ProgressSpinner } from 'ui-lib-custom/progress-spinner';
```

## Selector

```html
<ui-lib-progress-spinner />
```

## Overview

`ProgressSpinner` renders an SVG circle with CSS-animated stroke-dashoffset and a continuously
rotating outer SVG element to produce a classic "arc chase" loading animation.
Three design variants map the spinner style to the global theme:

| Variant | Description |
|---|---|
| `material` | Colour-cycling arc (red → blue → green → orange) |
| `bootstrap` | Solid primary-blue arc with square line cap |
| `minimal` | Muted grey arc with round line cap |

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `strokeWidth` | `string` | `'2'` | SVG `stroke-width` of the circle arc |
| `fill` | `string` | `'none'` | SVG `fill` of the circle (transparent by default) |
| `animationDuration` | `string` | `'2s'` | Duration of one full rotation/dash cycle |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size token |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Variant override (falls back to global theme) |
| `styleClass` | `string \| null` | `null` | Extra CSS class(es) on the host element |
| `ariaLabel` | `string` | `'Loading...'` | Accessible label announced to screen readers |

## Outputs

None.

## Content projection

None — the component renders only an SVG internally.

## Accessibility

### ARIA attributes

| Attribute | Element | Value | Description |
|---|---|---|---|
| `role` | Host (`ui-lib-progress-spinner`) | `"status"` | Declares a polite live region — screen readers announce the label when the spinner mounts |
| `aria-label` | Host | `ariaLabel` input (default `"Loading..."`) | Accessible name read by screen readers |
| `aria-busy` | Host | `"true"` | Signals that the region is in a loading state for the lifetime of the component |
| `id` | Host | `uilib-progress-spinner-{n}` | Auto-generated unique ID per instance; use with `aria-describedby` or `aria-labelledby` if needed |
| `aria-hidden` | `<svg>` | `"true"` | Hides the SVG internals from AT; the meaningful label is on the host |
| `focusable` | `<svg>` | `"false"` | Prevents focus on the SVG in legacy browsers |

### Keyboard interaction

`ProgressSpinner` is a non-interactive indicator — it does not receive focus and has no keyboard behaviour.

### Reduced motion

`@media (prefers-reduced-motion: reduce)` is honoured: both the SVG rotation and the dash animation
are disabled. The arc is rendered at a fixed partial draw so the element is still visually recognisable.

### Screen reader experience

When the spinner mounts, `role="status"` (a polite live region) causes most screen readers to
announce the `aria-label` text once without interrupting the current utterance.

Always provide a meaningful label:

```html
<!-- Generic loading -->
<ui-lib-progress-spinner />

<!-- Context-specific label -->
<ui-lib-progress-spinner ariaLabel="Loading search results" />
```

## Usage examples

```html
<!-- Default spinner -->
<ui-lib-progress-spinner />

<!-- Large spinner with faster animation -->
<ui-lib-progress-spinner size="lg" animationDuration="1s" />

<!-- Bootstrap variant with custom stroke width -->
<ui-lib-progress-spinner variant="bootstrap" strokeWidth="4" />

<!-- Minimal variant with custom fill and accessible label -->
<ui-lib-progress-spinner variant="minimal" fill="#f3f4f6" ariaLabel="Fetching results" />

<!-- Small spinner inline with text -->
<span>Loading <ui-lib-progress-spinner size="sm" /></span>
```

## CSS custom properties

| Variable | Default | Description |
|---|---|---|
| `--uilib-progress-spinner-size-sm` | `32px` | Diameter for `size="sm"` |
| `--uilib-progress-spinner-size-md` | `56px` | Diameter for `size="md"` |
| `--uilib-progress-spinner-size-lg` | `96px` | Diameter for `size="lg"` |
| `--uilib-progress-spinner-color-a` | `#ef5350` | Material variant — phase 1 colour |
| `--uilib-progress-spinner-color-b` | `#42a5f5` | Material variant — phase 2 colour |
| `--uilib-progress-spinner-color-c` | `#66bb6a` | Material variant — phase 3 colour |
| `--uilib-progress-spinner-color-d` | `#ffa726` | Material variant — phase 4 colour |
| `--uilib-progress-spinner-color-bootstrap` | `#0d6efd` | Bootstrap variant arc colour (light mode) |
| `--uilib-progress-spinner-color-bootstrap-dark` | `#6ea8fe` | Bootstrap variant arc colour (dark mode) |
| `--uilib-progress-spinner-color-minimal` | `#9ca3af` | Minimal variant arc colour (light mode) |
| `--uilib-progress-spinner-color-minimal-dark` | `#6b7280` | Minimal variant arc colour (dark mode) |
