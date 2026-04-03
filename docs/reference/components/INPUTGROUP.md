# InputGroup Component
## Overview
`InputGroupComponent` and `InputGroupAddonComponent` provide CSS-driven composition for grouped form controls.
- `uilib-input-group` is the flex layout wrapper.
- `uilib-input-group-addon` is the addon cell for text, icons, checkboxes, or buttons.
- Both components are intentionally runtime-light wrappers with no custom inputs or outputs.
## Import
```typescript
import { InputGroupAddonComponent, InputGroupComponent } from 'ui-lib-custom/input-group';
```
**Selectors**
- `uilib-input-group`
- `uilib-input-group-addon`
**Location:** `projects/ui-lib-custom/src/lib/input-group/`
---
## API
### `InputGroupComponent` Inputs
| Input | Type | Default | Description |
| --- | --- | --- | --- |
| *(none)* | - | - | Pure layout wrapper; use Angular host `[class]` or `[style]` bindings when needed. |
### `InputGroupAddonComponent` Inputs
| Input | Type | Default | Description |
| --- | --- | --- | --- |
| *(none)* | - | - | Pure addon wrapper; no dedicated API surface required for v1. |
### Outputs
Neither component emits outputs.
---
## CSS Variable Tokens
| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-input-group-addon-background` | `var(--uilib-surface-100, #f3f4f6)` | Addon background color. |
| `--uilib-input-group-addon-border-color` | `var(--uilib-surface-border, #e5e7eb)` | Addon border color. |
| `--uilib-input-group-addon-color` | `var(--uilib-text-muted-color, #6b7280)` | Addon text and icon color. |
| `--uilib-input-group-addon-padding` | `0.5rem 0.75rem` | Addon inner spacing. |
| `--uilib-input-group-addon-min-width` | `2.5rem` | Minimum addon width for short labels/icons. |
| `--uilib-input-group-addon-border-radius` | `var(--uilib-border-radius, 6px)` | Edge radius restored on first and last visual segments. |
---
## Usage Examples
### Basic currency input
```html
<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
</uilib-input-group>
```
### Addon with button
```html
<uilib-input-group>
  <ui-lib-input placeholder="Search products" />
  <uilib-input-group-addon>
    <ui-lib-button appearance="solid" size="sm">Search</ui-lib-button>
  </uilib-input-group-addon>
</uilib-input-group>
```
### FloatLabel integration
```html
<uilib-input-group>
  <uilib-input-group-addon>@</uilib-input-group-addon>
  <uilib-float-label variant="over">
    <ui-lib-input placeholder=" " />
    <label>Email</label>
  </uilib-float-label>
</uilib-input-group>
```
---
## Integration Notes
- **FloatLabel:** `uilib-float-label` works directly inside InputGroup; border-radius stitching is handled with CSS selectors for wrapped controls.
- **IconField:** `uilib-icon-field` can be projected as a grouped child; InputGroup styles target nested control surfaces for seamless edges.
- **Button in addon:** use `ui-lib-button` inside `uilib-input-group-addon`; addon padding collapses to let the button fill the cell cleanly.
---
## PrimeNG Divergences
| Area | PrimeNG | `ui-lib-custom` |
| --- | --- | --- |
| Selectors | `p-inputgroup`, `p-inputgroupaddon` | `uilib-input-group`, `uilib-input-group-addon` |
| Extra style inputs | `styleClass`/`style` available on wrappers | No custom style inputs; rely on native Angular `[class]`/`[style]` |
| Fluid behavior | Optional Prime utility classes | Width and composition handled by CSS wrappers (`width: 100%` + fluid selector support) |
| API scope | Additional pass-through utility hooks | Minimal wrapper API focused on layout composition |
---
## Accessibility Notes
- InputGroup wrappers are structural and do not replace control semantics.
- Keep accessible names on inner controls (`<label>`, `aria-label`, `aria-labelledby`).
- Addon content is typically decorative/contextual; if interactive content is placed in addons (for example buttons), ensure it has proper text/ARIA labeling.
- Focus visibility is preserved via focused-segment z-index layering so adjacent borders do not clip focus indicators.
