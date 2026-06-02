# Fieldset

**Selector:** `ui-lib-fieldset`
**Entry point:** `import { Fieldset } from 'ui-lib-custom/fieldset'`

---

## Overview

Fieldset — a labelled content container that optionally collapses its body. Supports three design variants (material / bootstrap / minimal) and a toggleable collapse animation driven by the CSS grid-row trick.

## API

### Inputs

| Name         | Type             | Default | Description                                                                           |
| ------------ | ---------------- | ------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `legend`     | `string`         | `''`    | Text to render in the legend area. Use `[fieldsetLegend]` projection for custom HTML. |
| `styleClass` | `string          | null`   | `null`                                                                                | Additional CSS classes to attach to the host element.           |
| `toggleable` | `boolean`        | `false` | Whether the fieldset body can be collapsed/expanded by the user.                      |
| `variant`    | `FieldsetVariant | null`   | `null`                                                                                | Visual variant — inherits from ThemeConfigService when not set. |

### Models (two-way bindable)

| Name        | Type      | Default | Description                                                                       |
| ----------- | --------- | ------- | --------------------------------------------------------------------------------- |
| `collapsed` | `boolean` | `false` | Two-way binding for the collapsed state. Only meaningful when toggleable is true. |

### Outputs

| Name      | Type                  | Description                                                        |
| --------- | --------------------- | ------------------------------------------------------------------ |
| `toggled` | `FieldsetToggleEvent` | Emitted after the collapsed state changes when toggleable is true. |

## Content Projection

| Selector           | Notes |
| ------------------ | ----- |
| _(default)_        | —     |
| `[fieldsetLegend]` | —     |

## Theming

| CSS Variable                          | Default                               |
| ------------------------------------- | ------------------------------------- |
| `--uilib-fieldset-border-color`       | `var(--uilib-surface-300, #d1d5db)`   |
| `--uilib-fieldset-border-radius`      | `var(--uilib-radius-md, 6px)`         |
| `--uilib-fieldset-content-padding`    | `1rem`                                |
| `--uilib-fieldset-legend-bg`          | `var(--uilib-surface, #ffffff)`       |
| `--uilib-fieldset-legend-color`       | `var(--uilib-color-text, #374151)`    |
| `--uilib-fieldset-legend-font-size`   | `0.9375rem`                           |
| `--uilib-fieldset-legend-font-weight` | `600`                                 |
| `--uilib-fieldset-legend-padding`     | `0.75rem 1rem`                        |
| `--uilib-fieldset-toggle-color`       | `var(--uilib-color-primary, #6366f1)` |
| `--uilib-fieldset-toggle-hover-bg`    | `var(--uilib-surface-100, #f3f4f6)`   |
| `--uilib-fieldset-transition`         | `200ms ease`                          |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                              |
| ------------------------------------------------------------- |
| Enter key on legend collapses the fieldset                    |
| Space key on legend collapses the fieldset                    |
| all three variants: no axe violations                         |
| basic fieldset: no axe violations                             |
| content wrapper has aria-hidden=                              |
| content wrapper has no aria-hidden on non-toggleable fieldset |
| content wrapper has no aria-hidden when expanded              |
| fieldset with custom legend still has aria-expanded on legend |
| host has aria-labelledby pointing to the legend element id    |
| host has role=                                                |
| legend can expand a collapsed fieldset via Enter key          |
| legend has aria-controls pointing to content wrapper id       |
| legend has aria-expanded=                                     |
| legend has no role when fieldset is not toggleable            |
| legend has role=                                              |
| should apply variant class when provided                      |
| should connect legend aria-controls to content wrapper id     |
| should have aria-labelledby pointing to the legend element    |
| should have role=                                             |
| should not have role=                                         |
| should not set aria-hidden when not collapsed                 |
| should set aria-expanded=                                     |
| should set aria-hidden on content wrapper when collapsed      |
| should set role=                                              |
| should set tabindex=                                          |
| toggle icon has aria-hidden=                                  |
| toggleable collapsed fieldset: no axe violations              |
| toggleable expanded fieldset: no axe violations               |

## Usage Examples

```html
<!-- Static fieldset -->
<ui-lib-fieldset legend="Address">
  <div>Street: 123 Main St</div>
</ui-lib-fieldset>

<!-- Collapsible fieldset -->
<ui-lib-fieldset legend="Advanced Options" [toggleable]="true" [collapsed]="true">
  <p>These settings are rarely needed.</p>
</ui-lib-fieldset>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#fieldset)
- [Demo page](/components/fieldset)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/fieldset/README.md)
