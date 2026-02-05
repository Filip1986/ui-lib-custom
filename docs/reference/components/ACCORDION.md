# Accordion

## Overview
Accessible, theme-ready accordion built from `ui-lib-accordion` (container) and `ui-lib-accordion-panel` (item). Supports single or multiple expansion, three visual variants, and keyboard navigation per WAI-ARIA.

## Features
- Standalone + OnPush + signal-based inputs
- Compound pattern with projected headers/content
- Variants: material, bootstrap, minimal
- Sizes: sm, md, lg
- Expansion: single or multiple; controlled/uncontrolled
- Full ARIA + keyboard (Arrow keys, Home/End, Enter/Space)
- CSS-variable theming and CSS-only expand animation

## Usage

### Import
```typescript
import { Accordion, AccordionPanel } from 'ui-lib-custom';
```

### Basic Example
```html
<ui-lib-accordion variant="material" expandMode="single">
  <ui-lib-accordion-panel header="Shipping" value="shipping">
    Standard (5-7 days), express (2-3 days), and overnight options.
  </ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Returns" value="returns">
    Items can be returned within 30 days of purchase.
  </ui-lib-accordion-panel>
</ui-lib-accordion>
```

## API Reference

### Inputs (Accordion)
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `AccordionVariant` | `'material'` | Visual style: material \| bootstrap \| minimal. |
| `size` | `AccordionSize` | `'md'` | Spacing scale: sm \| md \| lg. |
| `expandMode` | `AccordionExpandMode` | `'single'` | Expansion behavior: single or multiple. |
| `expandedPanels` | `string[]` | `[]` | Controlled list of expanded panel ids. |
| `defaultExpandedPanels` | `string[]` | `[]` | Uncontrolled initial expanded ids. |

### Outputs (Accordion)
| Name | Payload | Description |
| --- | --- | --- |
| `expandedChange` | `AccordionChangeEvent` | Fired when expansion set changes. |
| `panelToggle` | `AccordionChangeEvent` | Fired for every toggle interaction. |

### Inputs (AccordionPanel)
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `header` | `string` | `''` | Header text when no custom template. |
| `value` | `string \| null` | `null` | Unique id; auto-generated when null. |
| `disabled` | `boolean` | `false` | Disables focus and toggle. |
| `expanded` | `boolean` | `false` | Initial expanded state when uncontrolled. |

### Types
```typescript
import { type AccordionVariant, type AccordionSize, type AccordionExpandMode, type AccordionChangeEvent } from 'ui-lib-custom';
```

## Examples

### All Variants
```html
<ui-lib-accordion variant="material"> ... </ui-lib-accordion>
<ui-lib-accordion variant="bootstrap"> ... </ui-lib-accordion>
<ui-lib-accordion variant="minimal"> ... </ui-lib-accordion>
```

### Controlled Mode
```html
<ui-lib-accordion
  expandMode="multiple"
  [expandedPanels]="expanded"
  (expandedChange)="expanded = ($event.expanded ? [...expanded, $event.panelId] : expanded.filter(id => id !== $event.panelId))"
>
  <ui-lib-accordion-panel header="One" value="one" />
  <ui-lib-accordion-panel header="Two" value="two" />
</ui-lib-accordion>
```

### Custom Headers
```html
<ui-lib-accordion>
  <ui-lib-accordion-panel value="faq-1">
    <div accordionHeader class="header-row">
      <ui-lib-icon name="help-circle" />
      <span>FAQ Item</span>
    </div>
    Content goes here.
  </ui-lib-accordion-panel>
</ui-lib-accordion>
```

### Disabled Panels
```html
<ui-lib-accordion>
  <ui-lib-accordion-panel header="Active" value="a" />
  <ui-lib-accordion-panel header="Locked" value="b" [disabled]="true" />
  <ui-lib-accordion-panel header="Another" value="c" />
</ui-lib-accordion>
```

### Nested Accordions
```html
<ui-lib-accordion>
  <ui-lib-accordion-panel header="Parent" value="parent">
    <ui-lib-accordion size="sm" expandMode="multiple">
      <ui-lib-accordion-panel header="Child A" value="child-a">Nested content A</ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Child B" value="child-b">Nested content B</ui-lib-accordion-panel>
    </ui-lib-accordion>
  </ui-lib-accordion-panel>
</ui-lib-accordion>
```

## Theming
Component CSS variables (set on host or theme scope):
- `--uilib-accordion-gap`
- `--uilib-accordion-border-radius`
- `--uilib-accordion-panel-bg`
- `--uilib-accordion-panel-border`
- `--uilib-accordion-panel-radius`
- `--uilib-accordion-header-padding`
- `--uilib-accordion-header-bg`
- `--uilib-accordion-header-bg-hover`
- `--uilib-accordion-header-color`
- `--uilib-accordion-header-font-weight`
- `--uilib-accordion-content-padding`
- `--uilib-accordion-content-bg`
- `--uilib-accordion-icon-size`
- `--uilib-accordion-icon-color`
- `--uilib-accordion-icon-transition`
- `--uilib-accordion-focus-ring`
- `--uilib-accordion-transition-duration`
- `--uilib-accordion-transition-easing`

## Accessibility
- Header uses `role="button"`, `aria-expanded`, `aria-controls`, `aria-disabled`.
- Panel content uses `role="region"` + `aria-labelledby` and `hidden` when collapsed.
- Keyboard: Arrow Up/Down (and Left/Right) move focus; Home/End jump to first/last; Enter/Space toggle.
- Focus stays on headers; disabled panels are skipped in navigation.

## Best Practices
- Provide stable `value` ids for panels to keep controlled mode predictable.
- Prefer `expandMode="single"` for FAQ-like flows; use `multiple` for filter groups.
- Keep header content concise; move long text into panel body.
- Do not place interactive controls directly inside headers unless they are part of the toggle affordance.
- When nesting, set smaller `size` on inner accordions to preserve hierarchy.

## Testing
Run unit tests:
```powershell
powershell -ExecutionPolicy Bypass -NoLogo -Command "cd D:/Work/Personal/Github/ui-lib-custom; npm test -- --runTestsByPath projects/ui-lib-custom/src/lib/accordion/accordion.spec.ts projects/ui-lib-custom/src/lib/accordion/accordion-panel.spec.ts"
```

## Browser Support
- Evergreen browsers (Chromium, Firefox, Safari, Edge)
- Respect `prefers-reduced-motion` when users disable animations
