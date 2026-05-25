# Progress Spinner

**Selector:** `ui-lib-progress-spinner`
**Entry point:** `import { ProgressSpinner } from 'ui-lib-custom/progress-spinner'`

---

## Overview

Module-level counter for unique ProgressSpinner host IDs. */
let nextProgressSpinnerId: number = 0;

export type { ProgressSpinnerSize, ProgressSpinnerVariant } from './progress-spinner.types';

/**
ProgressSpinner — an animated circular spinner indicating an indeterminate loading state.

Renders an SVG circle with a CSS-animated stroke-dashoffset that produces a
continuously running "arc chase" effect.  The outer SVG also rotates to add
the characteristic spinning motion.

Three design variants map to the global theme: `material` (colour-cycling arc),
`bootstrap` (solid primary blue), and `minimal` (muted grey).

@example
<!-- Default spinner -->
<ui-lib-progress-spinner />

<!-- Custom size and animation speed -->
<ui-lib-progress-spinner size="lg" animationDuration="1.5s" />

<!-- Custom stroke and fill -->
<ui-lib-progress-spinner strokeWidth="4" fill="#f5f5f5" />

## API

### Inputs

| Name                | Type                  | Default                                       | Description                                                                                                                                             |
| ------------------- | --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animationDuration` | `string`              | `PROGRESS_SPINNER_DEFAULTS.animationDuration` | /**
Duration of one animation cycle (rotation + dash).
Accepts any valid CSS `<time>` value, e.g. `'1s'`, `'750ms'`.
Default: `'2s'`.                   |
| `ariaLabel`         | `string`              | `'Loading...'`                                | /** Accessible label announced to screen readers. Default: `'Loading...'`.                                                                              |
| `fill`              | `string`              | `PROGRESS_SPINNER_DEFAULTS.fill`              | /**
Fill color of the SVG circle.
Accepts any CSS color string.  Use `'none'` for a transparent interior.
Default: `'none'`.                            |
| `size`              | `ProgressSpinnerSize` | `PROGRESS_SPINNER_DEFAULTS.size`              | /** Component size token (`'sm'` | `'md'` | `'lg'`). Default: `'md'`.                                                                                   |
| `strokeWidth`       | `string`              | `PROGRESS_SPINNER_DEFAULTS.strokeWidth`       | /**
Width of the SVG circle stroke in SVG user-unit coordinates.
Corresponds to the `stroke-width` attribute on the `<circle>` element.
Default: `'2'`. |
| `styleClass`        | `string | null`       | `null`                                        | /** Additional CSS class(es) to apply to the host element.                                                                                              |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                       | Default |
| ---------------------------------- | ------- |
| `--uilib-progress-spinner-size-lg` | `96px`  |
| `--uilib-progress-spinner-size-md` | `56px`  |
| `--uilib-progress-spinner-size-sm` | `32px`  |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                            |
| ----------------------------------------------------------- |
| SVG has aria-hidden=                                        |
| SVG has focusable=                                          |
| host element has aria-busy=                                 |
| host element has aria-label defaulting to                   |
| host element has role=                                      |
| passes axe — custom ariaLabel                               |
| passes axe — default state                                  |
| passes axe — size=                                          |
| passes axe — two spinners on the same page have unique ids  |
| reflects a custom ariaLabel                                 |
| should apply variant class bootstrap                        |
| should apply variant class material                         |
| should apply variant class minimal                          |
| should reflect a custom ariaLabel                           |
| should set aria-busy=                                       |
| should set default aria-label                               |
| should set role=                                            |
| updates aria-label reactively when ariaLabel signal changes |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#progress-spinner)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/progress-spinner/README.md)

