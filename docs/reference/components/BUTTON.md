# Button Component

PrimeNG-inspired button with OnPush change detection, signal-based inputs, host-first DOM, and design-token-driven theming.

## Overview
- Standalone component with zero wrapper elements; classes applied directly to the native `button`.
- Supports variants (Material, Bootstrap, Minimal), severities, sizes, modifiers (raised, rounded, text, outlined, link), badges, icons, loading, and grouping.
- Themed via CSS custom properties sourced from `design-tokens.ts`.

**Import**
```typescript
import { Button } from 'ui-lib-custom';
```

---
## Basic Usage
```html
<ui-lib-button>Primary</ui-lib-button>
<ui-lib-button severity="success">Save</ui-lib-button>
<ui-lib-button appearance="outline" severity="danger">Delete</ui-lib-button>
```
Common patterns:
- Primary action: `<ui-lib-button severity="primary">Submit</ui-lib-button>`
- Ghost/text action: `<ui-lib-button [text]="true">Cancel</ui-lib-button>`
- Icon action: `<ui-lib-button icon="check">Done</ui-lib-button>`

---
## API Reference
Location: `projects/ui-lib-custom/src/lib/button/button.ts`

### Inputs (signals)
| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | `'material'` | Visual theme: material, bootstrap, minimal |
| `appearance` | `ButtonAppearance` | `'solid'` | solid, outline, ghost (base appearance) |
| `size` | `ButtonSize` | `'medium'` | small, medium, large |
| `severity` | `ButtonSeverity \| null` | `null` | Preferred color token (overrides `color`) |
| `color` | `ButtonColor` | `'primary'` | Backward-compatible alias; used if `severity` is null |
| `type` | `ButtonType` | `'button'` | Native button type |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows spinner and disables interaction |
| `fullWidth` | `boolean` | `false` | Stretches to container width |
| `icon` | `SemanticIcon \| string \| null` | `null` | Icon name |
| `iconPosition` | `IconPosition` | `'left'` | left, right, top, bottom |
| `iconOnly` | `boolean` | `false` | Icon-only styling |
| `raised` | `boolean` | `false` | Elevated shadow |
| `rounded` | `boolean` | `false` | Pill shape |
| `text` | `boolean` | `false` | Text/ghost style (overrides appearance) |
| `outlined` | `boolean` | `false` | Outline style (overrides appearance) |
| `link` | `boolean` | `false` | Link-like style |
| `contrast` | `boolean` | `false` | Forces contrast severity |
| `shadow` | `string \| null` | `null` | Custom shadow CSS var override |
| `badge` | `string \| number \| null` | `null` | Badge content |
| `badgeColor` | `BadgeSeverity` | `'danger'` | Badge color alias |
| `badgeSeverity` | `BadgeSeverity \| null` | `null` | Badge severity (preferred over `badgeColor`) |
| `badgeClass` | `string \| null` | `null` | Extra class for badge wrapper |
| `loadingIcon` | `SemanticIcon \| string` | `'spinner'` | Icon to use when loading |

### Exported Types
`ButtonVariant`, `ButtonAppearance`, `ButtonSeverity`, `ButtonSize`, `ButtonColor`, `ButtonType`, `IconPosition`, `BadgeSeverity`.

### Classes Applied
- Base: `btn`, `btn-{variant}`, `btn-{size}`, `btn-{severity}`, `btn-appearance-{appearance}`, `btn-icon-{position}`
- Modifiers: `btn-raised`, `btn-rounded`, `btn-text`, `btn-outlined`, `btn-link`, `btn-icon-only`, `btn-vertical`, `btn-full-width`, `btn-loading`, `btn-disabled`, `btn-has-icon`, `btn-has-badge`
- Badge: `btn-badge` on badge, wrapper `btn-badge-wrapper`

---
## Variants
```html
<!-- Material (default) -->
<ui-lib-button>Material</ui-lib-button>

<!-- Bootstrap -->
<ui-lib-button variant="bootstrap" severity="success">Save</ui-lib-button>

<!-- Minimal -->
<ui-lib-button variant="minimal" [outlined]="true">Minimal Outline</ui-lib-button>
```

---
## Modifiers
```html
<ui-lib-button [raised]="true">Raised</ui-lib-button>
<ui-lib-button [rounded]="true">Rounded</ui-lib-button>
<ui-lib-button [text]="true">Text</ui-lib-button>
<ui-lib-button [outlined]="true">Outlined</ui-lib-button>
<ui-lib-button [link]="true">Link</ui-lib-button>
```
Combining:
```html
<ui-lib-button [raised]="true" [rounded]="true" severity="primary">CTA</ui-lib-button>
<ui-lib-button [text]="true" [rounded]="true">Ghost Pill</ui-lib-button>
```

---
## Severities / Colors
Options: `primary`, `secondary`, `success`, `info`, `warn`/`warning`, `help`, `danger`, `contrast`.
```html
<ui-lib-button severity="info">Info</ui-lib-button>
<ui-lib-button severity="help">Help</ui-lib-button>
<ui-lib-button severity="warning">Warn</ui-lib-button>
<ui-lib-button [contrast]="true">High Contrast</ui-lib-button>
```
Usage tips:
- `primary`: main actions
- `secondary`: neutral/secondary actions
- `success`: confirmations
- `info`/`help`: informational
- `warning`: caution
- `danger`: destructive
- `contrast`: dark bg / high emphasis

---
## Icons
```html
<ui-lib-button icon="check">With Icon</ui-lib-button>
<ui-lib-button icon="arrow-right" iconPosition="right">Next</ui-lib-button>
<ui-lib-button icon="user" iconPosition="top">Profile</ui-lib-button>
<ui-lib-button icon="menu" [iconOnly]="true" aria-label="Menu"></ui-lib-button>
<ui-lib-button [loading]="true" loadingIcon="spinner">Saving</ui-lib-button>
```

---
## Badge Integration
```html
<ui-lib-button badge="3" badgeColor="info" icon="bell">Alerts</ui-lib-button>
<ui-lib-button badge="99+" [rounded]="true" severity="danger">Inbox</ui-lib-button>
<ui-lib-button badge="1" [iconOnly]="true" icon="mail"></ui-lib-button>
```
Positioning uses `btn-badge-wrapper` (absolute, top-end); uses `ui-lib-badge` with `size="sm"`, pill by default.

---
## Button Groups
```html
<ui-lib-button-group>
  <ui-lib-button>Save</ui-lib-button>
  <ui-lib-button severity="danger">Delete</ui-lib-button>
  <ui-lib-button [text]="true">Cancel</ui-lib-button>
</ui-lib-button-group>

<ui-lib-button-group [vertical]="true">
  <ui-lib-button>Top</ui-lib-button>
  <ui-lib-button>Middle</ui-lib-button>
  <ui-lib-button>Bottom</ui-lib-button>
</ui-lib-button-group>
```
Groups collapse borders, support vertical orientation, and honor size/variant hooks via `btn-group-*` classes.

---
## Sizes
```html
<ui-lib-button size="small">Small</ui-lib-button>
<ui-lib-button size="medium">Medium</ui-lib-button>
<ui-lib-button size="large">Large</ui-lib-button>
```
Responsive: use `fullWidth` for fluid layouts; size tokens map to padding/font vars.

---
## States
- Loading: `loading=true` adds spinner, disables button, sets `aria-busy="true"`.
- Disabled: `disabled=true` sets native disabled and `aria-disabled="true"`.
- Focus/Active: focus ring via CSS vars (`--uilib-button-focus-*`); active state uses `--uilib-button-bg-active`.

---
## Accessibility
- Role: native `button` role maintained.
- ARIA: `aria-disabled` when disabled; `aria-busy` when loading.
- Keyboard: Tab to focus; Enter/Space to activate (native button behavior).
- Labeling: set `aria-label` when icon-only; ensure badge counts are also in text where critical.
- Focus visible: customizable via `--uilib-button-focus-*` vars.

---
## Performance
- Change detection: `OnPush`.
- Signals for all inputs and derived state; class strings precomputed via `computed()`.
- Minimal DOM: single `button` element; optional `ui-lib-icon` and `ui-lib-badge` children only when used.

---
## Real-world Examples
```html
<!-- Form actions -->
<ui-lib-button type="submit" severity="primary" [raised]="true">Submit</ui-lib-button>
<ui-lib-button [text]="true">Cancel</ui-lib-button>

<!-- Toolbar -->
<ui-lib-button-group>
  <ui-lib-button icon="bold" [iconOnly]="true" aria-label="Bold" />
  <ui-lib-button icon="italic" [iconOnly]="true" aria-label="Italic" />
  <ui-lib-button icon="underline" [iconOnly]="true" aria-label="Underline" />
</ui-lib-button-group>

<!-- Navigation -->
<ui-lib-button variant="minimal" [link]="true">Learn more</ui-lib-button>

<!-- Alerts/notifications -->
<ui-lib-button icon="bell" badge="5" badgeColor="danger">Notifications</ui-lib-button>
```
