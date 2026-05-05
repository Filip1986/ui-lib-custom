# CascadeSelect

**Selector:** `ui-lib-cascade-select`
**Package:** `ui-lib-custom/cascade-select`
**Content projection:** yes — template directives for option, value, dropdownIcon, optionGroupIcon, header, footer, loading slots

> `optionGroupChildren` must be an array of field-name strings, one per nesting level (e.g. `['states', 'cities']`). This differs from PrimeNG where a single string is used for all levels. Output names follow the `on*` prefix convention.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `unknown[]` | `[]` | Root-level option objects |
| `optionLabel` | `string` | `'label'` | Field name for the option display label |
| `optionValue` | `string \| undefined` | `undefined` | Field name for the emitted value; omit to emit the whole object |
| `optionGroupLabel` | `string` | `'label'` | Field name for group display labels |
| `optionGroupChildren` | `string[]` | `[]` | Array of field names for children at each nesting level |
| `optionDisabled` | `string \| undefined` | `undefined` | Field name that marks an option as disabled |
| `placeholder` | `string` | `''` | Placeholder text when nothing is selected |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| undefined` | `undefined` | Visual variant; falls back to ThemeConfigService |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `disabled` | `boolean` | `false` | Disable the component |
| `invalid` | `boolean` | `false` | Apply error styling |
| `loading` | `boolean` | `false` | Show loading spinner; disables interaction |
| `showClear` | `boolean` | `false` | Show a clear button when a value is selected |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `filled` | `boolean` | `false` | Filled background appearance |
| `tabindex` | `number` | `0` | Tab index |
| `inputId` | `string` | `''` | Custom `id` for the trigger control |
| `appendTo` | `string \| HTMLElement \| undefined` | `'body'` | Where to mount the dropdown panel |
| `ariaLabel` | `string \| null` | `null` | ARIA label |
| `ariaLabelledBy` | `string \| null` | `null` | ARIA labelledby |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onChange` | `CascadeSelectChangeEvent` | Leaf option selected |
| `onGroupChange` | `CascadeSelectGroupChangeEvent` | User navigated into a sub-group |
| `onShow` | `CascadeSelectShowEvent` | Panel opened |
| `onHide` | `CascadeSelectHideEvent` | Panel closed |
| `onClear` | `void` | Clear button clicked |
| `onFocus` | `FocusEvent` | Component focused |
| `onBlur` | `FocusEvent` | Component blurred |

## Usage

```html
<!-- two-level cascade (countries -> cities) -->
<ui-lib-cascade-select
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  placeholder="Select a city"
  [(ngModel)]="selectedCity"
/>

<!-- with clear button -->
<ui-lib-cascade-select
  [options]="data"
  [optionGroupChildren]="['children']"
  [showClear]="true"
  [(ngModel)]="value"
/>
```
