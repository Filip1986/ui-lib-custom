# Select

**Selector:** `ui-lib-select`
**Package:** `ui-lib-custom/select`
**Content projection:** no — none

> Implements `ControlValueAccessor`. Options are passed as a typed `SelectOption[]` array via the `options` input — not as projected `<option>` elements. In single mode, `ngModel` receives a scalar value; in multiple mode, it receives an array.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `SelectOption[]` | `[]` | `{ label: string, value: unknown, disabled?: boolean, group?: string }` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `multiple` | `boolean` | `false` | Enables multi-select; ngModel receives `unknown[]` |
| `searchable` | `boolean` | `false` | Adds a filter input inside the dropdown panel |
| `placeholder` | `string` | `'Select...'` | |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | Shows a spinner and blocks interaction |
| `optionTemplate` | `TemplateRef<unknown> \| null` | `null` | Custom template for each option row |
| `label` | `string` | `''` | Visible label element rendered above the control |
| `ariaLabel` | `string \| null` | `null` | |
| `ariaLabelledBy` | `string \| null` | `null` | |
| `invalid` | `boolean` | `false` | Sets `aria-invalid` |
| `required` | `boolean` | `false` | |

## Outputs

_none_

## Usage

```html
<!-- minimal example -->
<ui-lib-select
  label="Country"
  [options]="countryOptions"
  [(ngModel)]="selectedCountry"
/>

<!-- multi-select with search -->
<ui-lib-select
  label="Tags"
  [options]="tagOptions"
  [multiple]="true"
  [searchable]="true"
  [(ngModel)]="selectedTags"
/>
```
