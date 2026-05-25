# Fluid

**Selector:** `ui-lib-fluid`
**Entry point:** `import { Fluid } from 'ui-lib-custom/fluid'`

---

## Overview

FluidDirective — applies the `ui-lib-fluid` CSS class to any host element.When the host element carries `.ui-lib-fluid`, all descendant form controls(inputs, textareas, selects, buttons, and `ui-lib-*` components) are stretchedto full width via the cascade.Usage:```html<!-- Always fluid (attribute presence = true) --><div uiLibFluid>…</div><!-- Conditionally fluid --><div [uiLibFluid]="isFluid">…</div>```/
@Directive({
  selector: '[uiLibFluid]',
  standalone: true,
  host: {
    '[class.ui-lib-fluid]': 'uiLibFluid()',
  },
})
export class FluidDirective {
  /**When `true` (default), the `ui-lib-fluid` class is added to the host element,making its descendant form controls take full width.Supports attribute-only usage — `<div uiLibFluid>` is equivalent to`[uiLibFluid]="true"`./
  public readonly uiLibFluid: InputSignalWithTransform<boolean, boolean | string> = input<
    boolean,
    boolean | string
  >(true, { transform: booleanAttribute });
}

/**Fluid — layout wrapper that stretches all descendant form controls to full width.Renders a block container with the `ui-lib-fluid` CSS class applied. Any`<input>`, `<textarea>`, `<select>`, `<button>`, or `ui-lib-*` form componentnested inside will expand to 100 % of the available width.For applying fluid behaviour to an existing element without an extra wrapper,use the {@link FluidDirective} (`[uiLibFluid]`) attribute directive instead.@example```html<!-- Wrap a form so every field is full-width --><ui-lib-fluid>  <input type="text" placeholder="Name" />  <ui-lib-button label="Submit" /></ui-lib-fluid><!-- Directive form — no extra DOM element --><form uiLibFluid>  <input type="email" placeholder="Email" /></form>```

## API

### Inputs

| Name         | Type                        | Default | Description                                                                                                                                                                                                                         |
| ------------ | --------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styleClass` | `string | null`             | `null`  | /** Additional CSS classes to attach to the host element. */                                                                                                                                                                        |
| `uiLibFluid` | `boolean, boolean | string` | `true`  | /**When `true` (default), the `ui-lib-fluid` class is added to the host element,making its descendant form controls take full width.Supports attribute-only usage — `<div uiLibFluid>` is equivalent to`[uiLibFluid]="true"`./ |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                              |
| ------------------------------------------------------------- |
| Fluid component adds no role attribute to the host element    |
| FluidDirective adds no role or aria-label to the host element |
| passes axe with Fluid component in default state              |
| passes axe with FluidDirective disabled (uiLibFluid=false)    |
| passes axe with FluidDirective in default state               |
| passes axe with nested Fluid containers                       |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#fluid)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/fluid/README.md)

