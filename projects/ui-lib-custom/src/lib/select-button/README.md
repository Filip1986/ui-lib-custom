# SelectButton

**Selector:** `ui-lib-select-button`
**Package:** `ui-lib-custom/select-button`
**Content projection:** yes — project `<ng-template #item let-option>` to customise each button's content

> By default, clicking an already-selected option in single-select mode re-selects it (selection is not cleared). Set `[allowEmpty]="true"` to allow deselection. The `value` input is a one-way binding for externally controlling the selection; for full form integration use `ngModel` / reactive forms via CVA.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `SelectButtonOption[]` | `[]` | Array of option objects |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `value` | `SelectButtonValue \| SelectButtonValue[] \| null` | `null` | One-way controlled value; use ngModel for two-way binding |
| `optionLabel` | `string` | `'label'` | Field name used to read the display label from each option object |
| `optionValue` | `string` | `'value'` | Field name used to read the value from each option object |
| `optionDisabled` | `string` | `'disabled'` | Field name used to read the disabled state from each option object |
| `multiple` | `boolean` | `false` | Allows selecting multiple options |
| `allowEmpty` | `boolean` | `false` | When true, clicking a selected option deselects it |
| `size` | `'sm' \| 'md' \| 'lg' \| 'small' \| 'medium' \| 'large'` | `'md'` | |
| `disabled` | `boolean` | `false` | |
| `invalid` | `boolean` | `false` | |
| `fluid` | `boolean` | `false` | Buttons stretch to fill the container |
| `ariaLabelledBy` | `string \| null` | `null` | |
| `ariaLabel` | `string \| null` | `null` | Defaults to `'Select options'` when `ariaLabelledBy` is not set |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `selectionChange` | `SelectButtonChangeEvent` | `{ value: SelectButtonValue \| SelectButtonValue[], originalEvent: Event }` |
| `valueChange` | `SelectButtonValue \| SelectButtonValue[] \| null` | Emits the new value alongside `selectionChange` |

## Usage

```html
<!-- minimal example -->
<ui-lib-select-button [options]="sizeOptions" [(ngModel)]="selectedSize" />

<!-- custom item template, multiple selection -->
<ui-lib-select-button [options]="tagOptions" [multiple]="true" [(ngModel)]="selectedTags">
  <ng-template #item let-option>{{ option.label }}</ng-template>
</ui-lib-select-button>
```
