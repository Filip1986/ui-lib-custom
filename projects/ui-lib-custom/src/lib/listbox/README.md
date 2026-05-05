# Listbox

**Selector:** `ui-lib-listbox`
**Package:** `ui-lib-custom/listbox`
**Content projection:** yes — `#itemTemplate`, `#groupTemplate`, `#emptyTemplate`, `#emptyFilterTemplate` via `@ContentChild` (not structural directives)

> Custom templates use Angular template reference variable syntax (`<ng-template #itemTemplate let-ctx>`) rather than attribute directives — this differs from the PrimeNG pattern where named directives are used. `filterValue` is a `model()` signal and supports `[(filterValue)]` for external filter control.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `unknown[]` | `[]` | Array of option objects |
| `optionLabel` | `string` | `'label'` | Field name for the display label |
| `optionValue` | `string` | `'value'` | Field name for the emitted value |
| `optionDisabled` | `string` | `'disabled'` | Field name that marks an option as disabled |
| `optionGroupLabel` | `string` | `'label'` | Field name for group header labels |
| `optionGroupChildren` | `string` | `'items'` | Field name for children inside a group |
| `group` | `boolean` | `false` | Treat `options` as a list of groups |
| `multiple` | `boolean` | `false` | Allow selecting multiple options |
| `filter` | `boolean` | `false` | Show a filter input above the list |
| `filterBy` | `string` | `''` | Field(s) to filter against; defaults to `optionLabel` |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith'` | `'contains'` | Filter matching strategy |
| `filterPlaceholder` | `string` | `''` | Placeholder for the filter input |
| `filterValue` | `string` | `''` | Two-way bindable filter query via `[(filterValue)]` |
| `emptyMessage` | `string` | `'No results found'` | Message when `options` is empty |
| `emptyFilterMessage` | `string` | `'No results found'` | Message when filter matches nothing |
| `scrollHeight` | `string` | `'200px'` | Height of the scrollable options container |
| `disabled` | `boolean` | `false` | Disable the component |
| `readonly` | `boolean` | `false` | Prevent value changes without greying out |
| `showToggleAll` | `boolean` | `false` | Show a "select all" checkbox header (multiple mode) |
| `checkbox` | `boolean` | `false` | Show a checkbox beside each item (multiple mode) |
| `striped` | `boolean` | `false` | Alternate row background tint |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to ThemeConfigService |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `ariaLabel` | `string` | `''` | ARIA label for the listbox element |
| `ariaLabelledBy` | `string` | `''` | ID of an external labelling element |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `selectionChange` | `ListboxChangeEvent` | Emitted when the selection changes |
| `filterChange` | `ListboxFilterEvent` | Emitted when the filter query changes |

## Usage

```html
<!-- basic single-select listbox -->
<ui-lib-listbox [options]="cities" optionLabel="name" [(ngModel)]="selectedCity" />

<!-- multi-select with filter and checkboxes -->
<ui-lib-listbox
  [options]="cities"
  optionLabel="name"
  [multiple]="true"
  [filter]="true"
  [checkbox]="true"
  [(ngModel)]="selectedCities"
/>
```
