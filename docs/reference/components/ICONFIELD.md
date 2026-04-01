# IconField Component

## Overview

`IconFieldComponent` and `InputIconComponent` provide an input icon composition primitive for leading/trailing icons around native inputs or `ui-lib-input`.

- `uilib-icon-field` is the layout wrapper (`iconPosition: 'left' | 'right'`).
- `uilib-input-icon` is the icon container (icon-font `styleClass` or projected template content).

## Import

```typescript
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';
```

**Selectors**

- `uilib-icon-field`
- `uilib-input-icon`

**Location:** `projects/ui-lib-custom/src/lib/icon-field/`

---

## API

### `IconFieldComponent` Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Controls icon side and projected input padding side. |

### `InputIconComponent` Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `styleClass` | `string \| null` | `null` | CSS class list for class-based icon rendering, for example `pi pi-search`. |

### Outputs

Neither component emits outputs; both are composition/layout wrappers.

---

## CSS Variable Tokens

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-icon-field-icon-color` | `var(--uilib-text-muted-color, #6b7280)` | Icon color for `uilib-input-icon`. |
| `--uilib-icon-field-icon-margin` | `0.75rem` | Horizontal offset from input edge. |
| `--uilib-icon-field-icon-size` | `1rem` | Icon font/template size. |
| `--uilib-icon-field-input-padding-with-icon` | `2.5rem` | Input side padding when icon is present. |
| `--uilib-icon-field-input-padding-with-icon-sm` | `2rem` | Small input icon padding. |
| `--uilib-icon-field-input-padding-with-icon-lg` | `3rem` | Large input icon padding. |

---

## Usage Examples

### Basic

```html
<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <input type="text" placeholder="Search" />
</uilib-icon-field>

<uilib-icon-field iconPosition="right">
  <uilib-input-icon styleClass="pi pi-spinner pi-spin" />
  <input type="text" placeholder="Loading" />
</uilib-icon-field>
```

### Template Content

```html
<uilib-icon-field iconPosition="left">
  <uilib-input-icon>
    <svg viewBox="0 0 24 24" aria-hidden="true"><!-- custom icon --></svg>
  </uilib-input-icon>
  <input type="text" placeholder="SVG icon" />
</uilib-icon-field>

<uilib-icon-field iconPosition="right">
  <uilib-input-icon>
    <ui-lib-icon name="search" />
  </uilib-input-icon>
  <ui-lib-input placeholder="ui-lib-icon child" />
</uilib-icon-field>
```

### FloatLabel Integration

```html
<uilib-float-label variant="over">
  <uilib-icon-field iconPosition="left">
    <uilib-input-icon styleClass="pi pi-envelope" />
    <input type="text" placeholder=" " />
  </uilib-icon-field>
  <label>Email</label>
</uilib-float-label>
```

### Sizes

```html
<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input size="sm" placeholder="Small" />
</uilib-icon-field>

<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input size="md" placeholder="Medium" />
</uilib-icon-field>

<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input size="lg" placeholder="Large" />
</uilib-icon-field>
```

---

## Accessibility Notes

- Icons in `uilib-input-icon` are decorative by default; no extra ARIA role is required.
- `ui-lib-icon-field` styles `pointer-events: none` on icon container so pointer interaction passes through to input controls.
- Keep actual accessible naming on the input (`label`, `aria-label`, `aria-labelledby`) rather than on icon wrappers.

---

## PrimeNG Divergences Summary

| Area | PrimeNG | `ui-lib-custom` |
| --- | --- | --- |
| Selectors | `p-iconField`, `p-inputIcon` | `uilib-icon-field`, `uilib-input-icon` |
| Icon rendering | Primarily class-based icon | Class-based (`styleClass`) or template projection (`<ng-content>`) |
| Input ecosystem | `pInputText` directive patterns | Supports both native `<input>` and `<ui-lib-input>` |
| Size integration | Inherits from Prime input ecosystem | Inherits from projected input size classes; no dedicated size input |
| Theming tokens | Prime theme variables | `--uilib-icon-field-*` CSS token surface |

