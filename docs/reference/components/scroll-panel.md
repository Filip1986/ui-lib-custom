# Scroll Panel

**Selector:** `ui-lib-scroll-panel`
**Entry point:** `import { ScrollPanel } from 'ui-lib-custom/scroll-panel'`

---

## Overview

ScrollPanel — a styled scrollable container with custom CSS scrollbar theming.Wraps projected content in an overflow container and applies variant-awarecustom scrollbar styles via CSS custom properties. Width and height should beconstrained by the consumer via CSS or inline styles on the host element.The scrollable content region exposes `role="region"` and `tabindex="0"` sokeyboard users can focus it and scroll with Arrow / Page keys. Provide`ariaLabel` to give the region a meaningful accessible name.@example<!-- Basic usage — constrain height via CSS --><ui-lib-scroll-panel ariaLabel="Product description" style="height: 250px;">  <p>Long content...</p></ui-lib-scroll-panel><!-- With explicit variant --><ui-lib-scroll-panel [variant]="'material'" ariaLabel="Gallery" style="height: 300px; width: 400px;">  <img src="large-image.jpg" /></ui-lib-scroll-panel>

## API

### Inputs

| Name         | Type            | Default | Description                                                                                                                                                                                          |
| ------------ | --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`  | `string | null` | `null`  | /**Accessible label for the scrollable region (`aria-label` on the innercontent wrapper). Recommended whenever the panel is a meaningful landmark.Falls back to `null` (no label) when omitted./ |
| `styleClass` | `string | null` | `null`  | /** Additional CSS classes to attach to the host element. */                                                                                                                                         |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                                    | Default                               |
| ----------------------------------------------- | ------------------------------------- |
| `--uilib-scroll-panel-bg`                       | `var(--uilib-surface, #ffffff)`       |
| `--uilib-scroll-panel-border-color`             | `var(--uilib-surface-300, #d1d5db)`   |
| `--uilib-scroll-panel-border-radius`            | `var(--uilib-radius-md, 6px)`         |
| `--uilib-scroll-panel-scrollbar-radius`         | `4px`                                 |
| `--uilib-scroll-panel-scrollbar-thumb-bg`       | `var(--uilib-surface-400, #9ca3af)`   |
| `--uilib-scroll-panel-scrollbar-thumb-bg-hover` | `var(--uilib-color-primary, #6366f1)` |
| `--uilib-scroll-panel-scrollbar-track-bg`       | `var(--uilib-surface-100, #f3f4f6)`   |
| `--uilib-scroll-panel-scrollbar-width`          | `8px`                                 |
| `--uilib-scroll-panel-transition`               | `200ms ease`                          |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                  |
| ----------------------------------------------------------------- |
| ArrowDown keydown event is dispatched without error               |
| all three variants expose role=                                   |
| all three variants: no axe violations                             |
| aria-label is removed when ariaLabel signal is set to null        |
| aria-label updates when ariaLabel signal changes                  |
| content wrapper can receive focus                                 |
| content wrapper has aria-label when ariaLabel input is provided   |
| content wrapper has no aria-label when ariaLabel input is omitted |
| content wrapper has role=                                         |
| content wrapper has tabindex=                                     |
| labelled panel: no axe violations                                 |
| should apply a default variant class from ThemeConfigService      |
| should apply the bootstrap variant class                          |
| should apply the material variant class                           |
| should apply the minimal variant class                            |
| should not apply multiple variant classes simultaneously          |
| should switch variant class when variant input changes            |
| unlabelled panel: no axe violations                               |

## Usage Examples

```html
<!-- Basic — set height via CSS or inline style -->
<ui-lib-scroll-panel ariaLabel="Product description" style="height: 250px;">
  <p>Long scrollable content...</p>
</ui-lib-scroll-panel>

<!-- Fixed dimensions with horizontal + vertical scroll -->
<ui-lib-scroll-panel ariaLabel="Wide image viewer" style="height: 200px; width: 300px;">
  <img src="wide-image.png" style="width: 600px;" />
</ui-lib-scroll-panel>

<!-- Explicit variant -->
<ui-lib-scroll-panel [variant]="'bootstrap'" ariaLabel="News feed" style="height: 300px;">
  @for (item of items; track item.id) {
    <p>{{ item.text }}</p>
  }
</ui-lib-scroll-panel>

<!-- styleClass escape hatch -->
<ui-lib-scroll-panel styleClass="my-panel" ariaLabel="Custom panel" style="height: 400px;">
  Content
</ui-lib-scroll-panel>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#scroll-panel)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/scroll-panel/README.md)

