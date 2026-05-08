# Fieldset

A labelled content container that optionally collapses its body. Inspired by PrimeNG's Fieldset component.

## Package path

```ts
import { Fieldset } from 'ui-lib-custom/fieldset';
```

## Selector

`ui-lib-fieldset`

## Inputs

| Input        | Type                                    | Default      | Description                                                      |
|--------------|-----------------------------------------|--------------|------------------------------------------------------------------|
| `legend`     | `string`                                | `''`         | Text to render in the legend / header area.                     |
| `toggleable` | `boolean`                               | `false`      | When `true` the user can collapse and expand the body.          |
| `collapsed`  | `boolean` (model — two-way bindable)    | `false`      | Current collapsed state. Bind with `[(collapsed)]`.             |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant. Falls back to `ThemeConfigService.variant()`. |
| `styleClass` | `string \| null`                        | `null`       | Extra CSS classes applied to the host element.                  |

## Outputs

| Output    | Type                   | Description                                           |
|-----------|------------------------|-------------------------------------------------------|
| `toggled` | `FieldsetToggleEvent`  | Emitted after collapse state changes. Carries `{ collapsed: boolean }`. |

## Content projection

| Slot                    | Description                                      |
|-------------------------|--------------------------------------------------|
| `[fieldsetLegend]`      | Custom HTML for the legend area (replaces/supplements the `legend` input text). |
| *(default)*             | Body content rendered inside the fieldset panel. |

## Usage examples

### Basic

```html
<ui-lib-fieldset legend="Personal Information">
  <p>Name, address, contact details here.</p>
</ui-lib-fieldset>
```

### Toggleable with two-way binding

```html
<ui-lib-fieldset legend="Advanced Options" [toggleable]="true" [(collapsed)]="isCollapsed">
  <p>Advanced settings here.</p>
</ui-lib-fieldset>
```

### Pre-collapsed

```html
<ui-lib-fieldset legend="Details" [toggleable]="true" [collapsed]="true">
  <p>Hidden by default.</p>
</ui-lib-fieldset>
```

### Custom legend via content projection

```html
<ui-lib-fieldset [toggleable]="true">
  <span fieldsetLegend>
    <i class="pi pi-user"></i> User Profile
  </span>
  <p>Profile content here.</p>
</ui-lib-fieldset>
```

### Explicit variant

```html
<ui-lib-fieldset legend="Bootstrap Style" variant="bootstrap" [toggleable]="true">
  <p>Content.</p>
</ui-lib-fieldset>
```

## Accessibility

- Host element has `role="group"` and `aria-labelledby` pointing to the legend element.
- When `toggleable` is `true`:
  - The legend element gets `role="button"`, `tabindex="0"`, and `aria-expanded`.
  - The content wrapper gets `aria-hidden="true"` when collapsed.
  - `aria-controls` on the legend references the content wrapper's `id`.
  - Keyboard: **Enter** or **Space** on the focused legend triggers toggle.
