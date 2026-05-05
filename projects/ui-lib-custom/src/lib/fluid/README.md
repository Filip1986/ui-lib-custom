# Fluid

A layout wrapper that stretches all descendant form controls to 100 % of the available width. Available as both a block component (`<ui-lib-fluid>`) and an attribute directive (`[uiLibFluid]`).

Inspired by PrimeNG's `p-fluid` / `[pFluid]` API.

---

## Package path

```ts
import { Fluid, FluidDirective } from 'ui-lib-custom/fluid';
```

---

## Selector

| Export | Selector | Type |
|---|---|---|
| `Fluid` | `ui-lib-fluid` | Component |
| `FluidDirective` | `[uiLibFluid]` | Directive |

---

## Component Inputs — `<ui-lib-fluid>`

| Input | Type | Default | Description |
|---|---|---|---|
| `styleClass` | `string \| null` | `null` | Additional CSS classes appended to the host element. |

---

## Directive Input — `[uiLibFluid]`

| Input | Type | Default | Description |
|---|---|---|---|
| `uiLibFluid` | `boolean` | `true` | When `true` the `ui-lib-fluid` CSS class is applied to the host element. Supports attribute-only usage (`<div uiLibFluid>`). |

---

## Content Projection

`<ui-lib-fluid>` projects all children via `<ng-content />`. No named slots are required.

---

## CSS Variables

The Fluid component does not introduce its own design tokens. The `.ui-lib-fluid` class applies `width: 100%; box-sizing: border-box` to the following descendant selectors:

- `input`, `textarea`, `select`
- `button` (excluding internal utility buttons)
- `ui-lib-button`, `ui-lib-input`, `ui-lib-textarea`, `ui-lib-select`, `ui-lib-listbox`, `ui-lib-tree-select`
- `ui-lib-date-picker`, `ui-lib-color-picker`, `ui-lib-password`
- `ui-lib-input-group`, `ui-lib-icon-field`, `ui-lib-float-label`
- `ui-lib-input-number`, `ui-lib-input-mask`
- `ui-lib-toggle-button`, `ui-lib-select-button`, `ui-lib-split-button`
- `ui-lib-cascade-select`, `ui-lib-autocomplete`

---

## Usage Examples

### Component wrapper

```html
<ui-lib-fluid>
  <input type="text" placeholder="Full name" />
  <ui-lib-button label="Submit" />
</ui-lib-fluid>
```

### Directive on an existing element (no extra DOM node)

```html
<form uiLibFluid>
  <input type="email" placeholder="Email" />
  <button type="submit">Sign Up</button>
</form>
```

### Conditional fluid layout

```html
<div [uiLibFluid]="isFormExpanded()">
  <input type="search" placeholder="Search…" />
</div>
```

### Additional host CSS classes

```html
<ui-lib-fluid styleClass="my-form-fluid">
  <input type="text" />
</ui-lib-fluid>
```

---

## Accessibility

The Fluid component and directive are purely presentational — they add a CSS class that broadens form control widths. They carry no ARIA roles or attributes of their own. Ensure that any form controls inside are labelled correctly with `<label>` elements or `aria-label` / `aria-labelledby`.

