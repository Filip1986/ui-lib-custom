# Panel

**Selector:** `ui-lib-panel`
**Entry point:** `import { Panel } from 'ui-lib-custom/panel'`

---

## Overview

Panel — a flexible content container with an optional collapsible body. Supports header text or projected header content, an icon area for actions, an optional footer, and three design variants (material / bootstrap / minimal). Collapse animation uses the CSS grid-row technique.

## API

### Inputs

| Name         | Type                  | Default | Description                                                                   |
| ------------ | --------------------- | ------- | ----------------------------------------------------------------------------- |
| `header`     | `string`              | `''`    | Text to render in the header. Use `[panelHeader]` projection for custom HTML. |
| `styleClass` | `string | null`       | `null`  | Additional CSS classes to attach to the host element.                         |
| `toggleable` | `boolean`             | `false` | Whether the panel body can be collapsed/expanded by the user.                 |
| `variant`    | `PanelVariant | null` | `null`  | Visual variant — inherits from ThemeConfigService when not set.               |

### Models (two-way bindable)

| Name        | Type      | Default | Description                                                                       |
| ----------- | --------- | ------- | --------------------------------------------------------------------------------- |
| `collapsed` | `boolean` | `false` | Two-way binding for the collapsed state. Only meaningful when toggleable is true. |

### Outputs

| Name      | Type               | Description                                                        |
| --------- | ------------------ | ------------------------------------------------------------------ |
| `toggled` | `PanelToggleEvent` | Emitted after the collapsed state changes when toggleable is true. |

## Content Projection

| Selector        | Notes |
| --------------- | ----- |
| _(default)_     | —     |
| `[panelFooter]` | —     |
| `[panelHeader]` | —     |
| `[panelIcons]`  | —     |

## Theming

| CSS Variable                       | Default                               |
| ---------------------------------- | ------------------------------------- |
| `--uilib-panel-border-color`       | `var(--uilib-surface-300, #d1d5db)`   |
| `--uilib-panel-border-radius`      | `var(--uilib-radius-md, 6px)`         |
| `--uilib-panel-content-padding`    | `1rem`                                |
| `--uilib-panel-footer-bg`          | `var(--uilib-surface-50, #f9fafb)`    |
| `--uilib-panel-footer-padding`     | `0.75rem 1rem`                        |
| `--uilib-panel-header-bg`          | `var(--uilib-surface, #ffffff)`       |
| `--uilib-panel-header-color`       | `var(--uilib-color-text, #374151)`    |
| `--uilib-panel-header-font-size`   | `0.9375rem`                           |
| `--uilib-panel-header-font-weight` | `600`                                 |
| `--uilib-panel-header-padding`     | `0.75rem 1rem`                        |
| `--uilib-panel-toggle-color`       | `var(--uilib-color-primary, #6366f1)` |
| `--uilib-panel-toggle-hover-bg`    | `var(--uilib-surface-100, #f3f4f6)`   |
| `--uilib-panel-toggle-size`        | `1.75rem`                             |
| `--uilib-panel-transition`         | `200ms ease`                          |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

### Keyboard Interactions

| Test description                                                      |
| --------------------------------------------------------------------- |
| Enter key on toggle button collapses the panel                        |
| Space key on toggle button collapses the panel                        |
| all three variants: no axe violations                                 |
| basic panel: no axe violations                                        |
| content wrapper has aria-hidden=                                      |
| content wrapper has no aria-hidden on non-toggleable panel            |
| content wrapper has no aria-hidden when expanded                      |
| host has aria-labelledby pointing to the header element id            |
| host has role=                                                        |
| panel with custom header still has toggle button with aria-expanded   |
| should apply variant class                                            |
| should have aria-labelledby pointing to header id                     |
| should have role=region on host                                       |
| should not set aria-hidden when not collapsed                         |
| should set aria-controls on toggle button pointing to content wrapper |
| should set aria-expanded=false on toggle button when collapsed        |
| should set aria-expanded=true on toggle button when not collapsed     |
| should set aria-hidden on content when collapsed                      |
| should switch variant class                                           |
| toggle button can expand a collapsed panel via Enter key              |
| toggle button has aria-controls pointing to content wrapper id        |
| toggle button has aria-expanded=                                      |
| toggle icon has aria-hidden=                                          |
| toggleable collapsed panel: no axe violations                         |
| toggleable expanded panel: no axe violations                          |

## Usage Examples

```html
<!-- Static panel -->
<ui-lib-panel header="Summary">
  <p>Content inside the panel.</p>
</ui-lib-panel>

<!-- Toggleable panel (start collapsed) -->
<ui-lib-panel header="Details" [toggleable]="true" [collapsed]="true">
  <p>This content is hidden until the user expands the panel.</p>
</ui-lib-panel>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#panel)
- [Demo page](/components/panel)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/panel/README.md)

