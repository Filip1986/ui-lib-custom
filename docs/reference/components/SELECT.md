# Select

**Selector:** `ui-lib-select`
**Entry point:** `import { UiLibSelect } from 'ui-lib-custom/select'`

---

## Overview

Select component with single or multiple selection and optional search.

## API

### Inputs

| Name             | Type                   | Default | Description |
| ---------------- | ---------------------- | ------- | ----------- |
| `options`        | `SelectOption[]`       | `[]`    | Option array. Each item: `{ label, value, disabled?, group? }`. |
| `variant`        | `SelectVariant \| null` | `null`  | Visual style: `'material' \| 'bootstrap' \| 'minimal'`. Falls back to global theme when `null`. |
| `size`           | `SelectSize`           | `'md'`  | Control height: `'sm'` (32 px) · `'md'` (40 px) · `'lg'` (48 px). |
| `multiple`       | `boolean`              | `false` | Enable multi-selection. `ngModel` receives `unknown[]`. |
| `searchable`     | `boolean`              | `false` | Shows a filter input inside the panel; announces result count via live region. |
| `placeholder`    | `string`               | `'Select...'` | Text shown when no value is selected. |
| `disabled`       | `boolean`              | `false` | Disables the control and sets `aria-disabled`. |
| `loading`        | `boolean`              | `false` | Shows a spinner and blocks interaction; communicates loading state via `aria-disabled`. |
| `label`          | `string`               | `''`    | Visible label rendered above the control. Automatically linked via `aria-labelledby`. |
| `ariaLabel`      | `string \| null`       | `null`  | Sets `aria-label` on the host combobox element. Use when no visible label is rendered. |
| `ariaLabelledBy` | `string \| null`       | `null`  | Sets `aria-labelledby` to an external element id. Overrides the auto-generated label link. |
| `invalid`        | `boolean`              | `false` | Sets `aria-invalid="true"` and applies the error border colour. |
| `required`       | `boolean`              | `false` | Sets `aria-required="true"` on the host element. |

### Outputs

_none_

## Content Projection

| Slot | Template variable | Context type | Description |
|------|-------------------|--------------|-------------|
| Option template | `#optionTemplate` | `SelectOptionTemplateContext` | Custom render for each option row. Context: `$implicit` (SelectOption), `index`, `selected`, `disabled`, `active`. |

## Theming

| CSS Variable                           | Default                                                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `--uilib-select-bg`                    | `var(--uilib-surface-dark-1)`                                                                            |
| `--uilib-select-border`                | `var(--uilib-border-dark)`                                                                               |
| `--uilib-select-dropdown-bg`           | `var(--uilib-surface-dark-3)`                                                                            |
| `--uilib-select-empty-padding`         | `calc( var(--uilib-select-empty-padding-base) * var(--uilib-density, 1) )`                               |
| `--uilib-select-empty-padding-base`    | `0.75rem`                                                                                                |
| `--uilib-select-group-padding-x`       | `calc( var(--uilib-select-group-padding-x-base) * var(--uilib-density, 1) )`                             |
| `--uilib-select-group-padding-x-base`  | `0.75rem`                                                                                                |
| `--uilib-select-group-padding-y`       | `calc( var(--uilib-select-group-padding-y-base) * var(--uilib-density, 1) )`                             |
| `--uilib-select-group-padding-y-base`  | `0.25rem`                                                                                                |
| `--uilib-select-option-hover`          | `var( --uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600) 8%, transparent) )` |
| `--uilib-select-option-padding-x`      | `calc( var(--uilib-select-option-padding-x-base) * var(--uilib-density, 1) )`                            |
| `--uilib-select-option-padding-x-base` | `0.75rem`                                                                                                |
| `--uilib-select-option-padding-y`      | `calc( var(--uilib-select-option-padding-y-base) * var(--uilib-density, 1) )`                            |
| `--uilib-select-option-padding-y-base` | `0.5rem`                                                                                                 |
| `--uilib-select-option-selected`       | `color-mix( in srgb, var(--uilib-color-primary-dark) 20%, transparent )`                                 |
| `--uilib-select-padding-x`             | `calc(var(--uilib-select-padding-x-base) * var(--uilib-density, 1))`                                     |
| `--uilib-select-padding-x-base`        | `0.75rem`                                                                                                |
| `--uilib-select-padding-y`             | `calc(var(--uilib-select-padding-y-base) * var(--uilib-density, 1))`                                     |
| `--uilib-select-padding-y-base`        | `0.55rem`                                                                                                |
| `--uilib-select-panel-max-height`      | `260px`                                                                                                  |
| `--uilib-select-panel-z-index`         | `var(--uilib-z-dropdown, 10)`                                                                            |
| `--uilib-select-search-padding-x`      | `calc( var(--uilib-select-search-padding-x-base) * var(--uilib-density, 1) )`                            |
| `--uilib-select-search-padding-x-base` | `0.75rem`                                                                                                |
| `--uilib-select-search-padding-y`      | `calc( var(--uilib-select-search-padding-y-base) * var(--uilib-density, 1) )`                            |
| `--uilib-select-search-padding-y-base` | `0.5rem`                                                                                                 |

## Accessibility

**APG pattern:** [Combobox Pattern (ARIA 1.2)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

### Keyboard Interactions

| Test description                                                     |
| -------------------------------------------------------------------- |
| ArrowDown should move aria-activedescendant forward when open        |
| ArrowDown should open the panel when closed                          |
| ArrowUp should open the panel when closed                            |
| End should move focus to last option                                 |
| Enter should select the focused option and close the panel           |
| Escape should close the panel                                        |
| Escape should restore focus to the host element                      |
| Home should move focus to first option                               |
| all options should still have role=                                  |
| applies dark theme variables                                         |
| applies each variant class                                           |
| aria-activedescendant should match an option element id              |
| arrow icon should have aria-hidden=                                  |
| clear button SVG should have aria-hidden=                            |
| each group container should have aria-label matching group name      |
| group header div should have aria-hidden=                            |
| grouped options should be wrapped in role=                           |
| host should NOT have aria-activedescendant when closed               |
| host should NOT have aria-controls when panel is closed              |
| host should have aria-controls pointing to listbox element when open |
| host should have aria-disabled=                                      |
| host should have aria-expanded=                                      |
| host should have aria-haspopup=                                      |
| host should have aria-labelledby pointing to label id                |
| host should have role=                                               |
| host should have tabindex=                                           |
| listbox should have aria-multiselectable=                            |
| live region should announce result count when filtering              |
| live region should exist (for result count announcements)            |
| onKeydown typeahead focuses matching enabled option                  |
| openPanel sets focusedIndex to -1 when all options are disabled      |
| options inside groups should have correct aria-setsize               |
| options should have aria-posinset reflecting 1-based index           |
| options should have aria-setsize reflecting total count              |
| options should have role=                                            |
| panel should NOT open when disabled (keyboard blocked)               |
| panel should have role=                                              |
| search input should have aria-autocomplete=                          |
| search input should have aria-controls pointing to the listbox       |
| selected option should have aria-selected=                           |
| setActiveIndex sets focus when the option is enabled                 |
| sets aria-disabled and blocks interaction when disabled              |
| sets aria-invalid when invalid                                       |
| should close with Escape and return focus to the trigger             |
| should close with Escape key                                         |
| should have aria-expanded                                            |
| should have combobox role                                            |
| should have listbox role on dropdown                                 |
| should have option role on each option                               |
| should select option with Enter key                                  |
| should update aria-activedescendant on arrow navigation              |
| unselected options should have aria-selected=                        |

## Usage Examples

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

<!-- grouped options -->
<ui-lib-select
  label="Choose a symbol"
  [options]="groupedOptions"
  [(ngModel)]="selectedSymbol"
/>
<!-- where groupedOptions = [
  { label: 'Alpha', value: 'a', group: 'Greek' },
  { label: 'Beta',  value: 'b', group: 'Greek' },
  { label: 'One',   value: 1,   group: 'Numbers' },
] -->

<!-- custom option template -->
<ui-lib-select label="User" [options]="users" [(ngModel)]="selectedUser">
  <ng-template #optionTemplate let-opt>
    <img [src]="opt.value.avatar" alt="" aria-hidden="true" />
    <span>{{ opt.label }}</span>
  </ng-template>
</ui-lib-select>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#select)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/select/README.md)

