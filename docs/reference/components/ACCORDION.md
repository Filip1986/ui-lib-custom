# Accordion

**Selector:** `ui-lib-accordion`
**Entry point:** `import { Accordion } from 'ui-lib-custom/accordion'`

---

## Overview

Accordion container managing panel expansion state.

## API

### Inputs

| Name                    | Type                      | Default    | Description |
| ----------------------- | ------------------------- | ---------- | ----------- |
| `defaultExpandedPanels` | `string[]`                | `[]`       | —           |
| `expandedPanels`        | `string[]`                | `[]`       | —           |
| `expandMode`            | `AccordionExpandMode`     | `'single'` | —           |
| `size`                  | `AccordionSize`           | `'md'`     | —           |
| `variant`               | `AccordionVariant | null` | `null`     | —           |

### Outputs

| Name             | Type                   | Description |
| ---------------- | ---------------------- | ----------- |
| `expandedChange` | `AccordionChangeEvent` | —           |
| `panelToggle`    | `AccordionChangeEvent` | —           |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                         | Default                                      |
| ------------------------------------ | -------------------------------------------- |
| `--uilib-accordion-border-radius`    | `var(--uilib-shape-base, 6px)`               |
| `--uilib-accordion-content-bg`       | `var(--uilib-surface-dark-1)`                |
| `--uilib-accordion-content-padding`  | `var(--uilib-accordion-content-padding-sm)`  |
| `--uilib-accordion-gap`              | `var(--uilib-space-2, 0.5rem)`               |
| `--uilib-accordion-header-bg`        | `var(--uilib-surface-dark-2)`                |
| `--uilib-accordion-header-bg-hover`  | `var(--uilib-surface-dark-3)`                |
| `--uilib-accordion-header-font-size` | `var(--uilib-accordion-header-font-size-sm)` |
| `--uilib-accordion-header-padding`   | `var(--uilib-accordion-header-padding-sm)`   |
| `--uilib-accordion-icon-size`        | `var(--uilib-accordion-icon-size-sm)`        |
| `--uilib-accordion-panel-bg`         | `var(--uilib-surface)`                       |
| `--uilib-accordion-panel-border`     | `1px solid transparent`                      |
| `--uilib-accordion-panel-radius`     | `var(--uilib-shape-base, 6px)`               |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| applies dark theme variables                                               |
| applies variant and size classes and updates on change                     |
| does not toggle a disabled panel on Enter key                              |
| exposes proper ARIA relationships                                          |
| keeps disabled header buttons in the tab sequence (no tabindex=-1)         |
| links each header button aria-controls to the panel region id              |
| links each header button id to the panel region aria-labelledby            |
| moves focus to next panel on ArrowDown                                     |
| moves focus to previous panel on ArrowUp                                   |
| passes axe with all panels collapsed                                       |
| passes axe with multiple panels expanded                                   |
| passes axe with one panel expanded                                         |
| renders header buttons with aria-expanded=                                 |
| sets aria-disabled=                                                        |
| sets aria-expanded=false on the previously open panel when a new one opens |
| sets role=                                                                 |
| skips disabled panels during keyboard navigation                           |
| supports Arrow, Home, End navigation between headers                       |
| toggles a panel on Enter key                                               |
| toggles a panel on Space key                                               |
| toggles with Enter and Space keys                                          |
| updates aria-expanded to                                                   |

## Usage Examples

```html
<!-- Single-expand accordion -->
<ui-lib-accordion>
  <ui-lib-accordion-panel header="Section 1" value="s1">Content one</ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Section 2" value="s2">Content two</ui-lib-accordion-panel>
</ui-lib-accordion>

<!-- Multiple expand, pre-opened -->
<ui-lib-accordion expandMode="multiple" [defaultExpandedPanels]="['s1']">
  <ui-lib-accordion-panel header="Alpha" value="s1" [showIcon]="true">Alpha body</ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Beta"  value="s2" [showIcon]="true">Beta body</ui-lib-accordion-panel>
</ui-lib-accordion>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#accordion)
- [Demo page](/components/accordion)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/accordion/README.md)

