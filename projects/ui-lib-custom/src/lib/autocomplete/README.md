# AutoComplete

**Selector:** `ui-lib-autocomplete`
**Package:** `ui-lib-custom/autocomplete`
**Content projection:** yes — template directives for item, selectedItem, group, header, footer, empty, loading, dropdownIcon, removeTokenIcon slots

> Unlike PrimeNG AutoComplete, suggestions are never filtered internally — you must handle `completeMethod` and update `[suggestions]` yourself every time.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `suggestions` | `unknown[]` | `[]` | The options to display in the dropdown panel |
| `optionLabel` | `string \| undefined` | `undefined` | Field name to use as display label |
| `optionValue` | `string \| undefined` | `undefined` | Field name to use as the emitted value |
| `optionDisabled` | `string \| undefined` | `undefined` | Field name that marks an option as disabled |
| `optionGroupLabel` | `string` | `'label'` | Field name for group headers |
| `optionGroupChildren` | `string` | `'items'` | Field name for children inside a group |
| `dropdown` | `boolean` | `false` | Show a dropdown toggle button |
| `dropdownMode` | `'blank' \| 'current'` | `'blank'` | What to do with the query when the dropdown button is clicked |
| `multiple` | `boolean` | `false` | Enable chip (multi-value) mode |
| `forceSelection` | `boolean` | `false` | Restrict value to items from `suggestions` only |
| `completeOnFocus` | `boolean` | `false` | Trigger `completeMethod` when the input receives focus |
| `autoClear` | `boolean` | `true` | Clear the input when `forceSelection` finds no match on blur |
| `unique` | `boolean` | `false` | Prevent duplicate chips in multiple mode |
| `minLength` | `number` | `1` | Minimum query length before `completeMethod` fires |
| `delay` | `number` | `300` | Debounce delay in ms |
| `maxlength` | `number \| null` | `null` | Native maxlength on the input |
| `virtualScroll` | `boolean` | `false` | Enable virtual scrolling for large suggestion lists |
| `virtualScrollItemSize` | `number` | `0` | Item height in px required for virtual scroll |
| `addOnBlur` | `boolean` | `false` | Commit free-text as a chip on blur (multiple mode) |
| `addOnTab` | `boolean` | `false` | Commit free-text as a chip on Tab (multiple mode) |
| `separator` | `string \| RegExp \| undefined` | `undefined` | Character(s) that auto-tokenize free text into chips |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size token |
| `placeholder` | `string` | `''` | Input placeholder text |
| `showClear` | `boolean` | `false` | Show a clear button when the field has a value |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `filled` | `boolean` | `false` | Filled background appearance |
| `group` | `boolean` | `false` | Treat `suggestions` as grouped data |
| `scrollHeight` | `string` | `'200px'` | Max height of the dropdown panel |
| `tabindex` | `number` | `0` | Tab index of the input |
| `inputId` | `string` | `''` | Custom `id` for the inner `<input>` |
| `appendTo` | `string \| HTMLElement \| undefined` | `'body'` | Where to mount the dropdown panel |
| `disabled` | `boolean` | `false` | Disable the component |
| `invalid` | `boolean` | `false` | Apply error styling |
| `readonly` | `boolean` | `false` | Make the input read-only |
| `loading` | `boolean` | `false` | Show loading state |
| `ariaLabel` | `string \| null` | `null` | ARIA label |
| `ariaLabelledBy` | `string \| null` | `null` | ARIA labelledby |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `completeMethod` | `AutoCompleteCompleteEvent` | Fired (debounced) when user types; update `[suggestions]` in response |
| `select` | `AutoCompleteSelectEvent` | Option selected |
| `unselect` | `AutoCompleteUnselectEvent` | Chip removed (multiple mode) |
| `focus` | `FocusEvent` | Input focused |
| `blur` | `FocusEvent` | Input blurred |
| `dropdownClick` | `AutoCompleteDropdownClickEvent` | Dropdown toggle button clicked |
| `clearEvent` | `void` | Clear button clicked |
| `keyUp` | `KeyboardEvent` | Key-up on the input |

## Usage

```html
<!-- minimal example -->
<ui-lib-autocomplete
  [suggestions]="results"
  (completeMethod)="search($event)"
  [(ngModel)]="selectedItem"
/>

<!-- dropdown button + multiple chips -->
<ui-lib-autocomplete
  [suggestions]="results"
  [dropdown]="true"
  [multiple]="true"
  optionLabel="name"
  (completeMethod)="search($event)"
  [(ngModel)]="selectedItems"
/>
```
