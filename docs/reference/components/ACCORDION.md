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
import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionToggleIcon,
} from 'ui-lib-custom';
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
| `iconPosition` | `AccordionIconPosition` | `'end'` | Icon placement: start or end. |
| `expandIcon` | `string` | `'chevron-up'` | Icon name when expanded. |
| `collapseIcon` | `string` | `'chevron-down'` | Icon name when collapsed. |
| `showIcon` | `boolean` | `true` | Toggles icon visibility in the header. |

### Template Directives
| Name | Context | Description |
| --- | --- | --- |
| `accordionHeader` | n/a | Custom header content for a panel. |
| `accordionToggleIcon` | `{ expanded: boolean }` | Custom toggle icon content. |

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

### Custom Toggle Icon
```html
<ui-lib-accordion>
  <ui-lib-accordion-panel header="Filters">
    <ng-template accordionToggleIcon let-expanded="expanded">
      <ui-lib-icon [name]="expanded ? 'minus' : 'plus'" />
    </ng-template>
    Filter content goes here.
  </ui-lib-accordion-panel>
</ui-lib-accordion>
```

### Icon Position
```html
<ui-lib-accordion>
  <ui-lib-accordion-panel header="Start Icon" iconPosition="start" />
  <ui-lib-accordion-panel header="End Icon" iconPosition="end" />
</ui-lib-accordion>
```

## Theming
Component CSS variables (set on host or theme scope):

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-accordion-gap` | `var(--uilib-space-2, 0.5rem)` | Gap between panels. |
| `--uilib-accordion-border-radius` | `var(--uilib-radius-md, 0.5rem)` | Container radius for Bootstrap/Minimal edges. |
| `--uilib-accordion-panel-bg` | `var(--uilib-surface, #ffffff)` | Panel background color. |
| `--uilib-accordion-panel-border` | `1px solid var(--uilib-border, #e5e7eb)` | Panel border. |
| `--uilib-accordion-panel-radius` | `var(--uilib-radius-md, 0.5rem)` | Panel corner radius. |
| `--uilib-accordion-header-padding-sm` | `var(--uilib-space-3, 0.75rem)` | Header padding for small size. |
| `--uilib-accordion-header-padding-md` | `var(--uilib-space-4, 1rem)` | Header padding for medium size. |
| `--uilib-accordion-header-padding-lg` | `var(--uilib-space-5, 1.25rem)` | Header padding for large size. |
| `--uilib-accordion-header-padding` | `var(--uilib-accordion-header-padding-md, var(--uilib-space-4, 1rem))` | Effective header padding. |
| `--uilib-accordion-header-bg` | `var(--uilib-surface, transparent)` | Header background. |
| `--uilib-accordion-header-bg-hover` | `var(--uilib-surface-hover, color-mix(in srgb, currentColor 6%, transparent))` | Header hover background. |
| `--uilib-accordion-header-color` | `var(--uilib-page-fg, #111827)` | Header text color. |
| `--uilib-accordion-header-font-weight` | `var(--uilib-font-weight-500, 500)` | Header font weight. |
| `--uilib-accordion-content-padding` | `var(--uilib-space-4, 1rem)` | Content padding. |
| `--uilib-accordion-content-bg` | `var(--uilib-surface, #ffffff)` | Content background. |
| `--uilib-accordion-icon-size-sm` | `var(--uilib-icon-size-sm, 1rem)` | Icon size for small. |
| `--uilib-accordion-icon-size-md` | `var(--uilib-icon-size-md, 1.25rem)` | Icon size for medium. |
| `--uilib-accordion-icon-size-lg` | `var(--uilib-icon-size-lg, 1.5rem)` | Icon size for large. |
| `--uilib-accordion-icon-size` | `var(--uilib-accordion-icon-size-md, var(--uilib-icon-size-md, 1.25rem))` | Effective icon size. |
| `--uilib-accordion-icon-color` | `var(--uilib-muted, #6b7280)` | Default icon color. |
| `--uilib-accordion-icon-color-hover` | `var(--uilib-primary, #2563eb)` | Icon color on header hover. |
| `--uilib-accordion-icon-color-expanded` | `var(--uilib-primary, #2563eb)` | Icon color when expanded. |
| `--uilib-accordion-icon-rotation` | `var(--uilib-rotation-0, 0deg)` | Rotation applied when expanded. |
| `--uilib-accordion-icon-transition` | `transform var(--uilib-transition-fast, 200ms ease)` | Icon transition. |
| `--uilib-accordion-icon-gap` | `var(--uilib-space-2, 0.5rem)` | Gap between title and icon. |
| `--uilib-accordion-icon-align` | `center` | Icon vertical alignment. |
| `--uilib-accordion-focus-ring` | `0 0 0 2px var(--uilib-focus-ring-color, #2563eb55)` | Focus ring style. |
| `--uilib-accordion-transition-duration` | `var(--uilib-transition-fast-duration, 200ms)` | Content transition duration. |
| `--uilib-accordion-transition-easing` | `var(--uilib-transition-ease-out, ease-out)` | Content transition easing. |

### Theme Override Example
```scss
[data-theme='brand-x'] {
  --uilib-accordion-panel-bg: #0f172a;
  --uilib-accordion-header-color: #e2e8f0;
  --uilib-accordion-header-bg-hover: rgba(148, 163, 184, 0.2);
  --uilib-accordion-icon-color: #94a3b8;
  --uilib-accordion-icon-color-hover: #38bdf8;
  --uilib-accordion-icon-color-expanded: #38bdf8;
  --uilib-accordion-icon-rotation: 0deg;
  --uilib-accordion-header-padding-md: 1.25rem;
  --uilib-accordion-icon-size-md: 1.5rem;
}
```

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

## Breaking Changes
- Icon placement now defaults to `end`. Set `iconPosition="start"` to keep the old layout.
