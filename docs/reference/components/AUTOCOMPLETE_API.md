# AutoComplete API

## Overview

`ui-lib-autocomplete` is a signal-first autocomplete component for `ui-lib-custom` that supports:
- single-value and object-backed selection
- chips-style multiple selection
- grouped options
- virtualized rendering for large lists
- template-based customization for list/chips/panel sections
- Angular forms integration via `ControlValueAccessor`

## Import

```typescript
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
```

## Inputs

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `suggestions` | `unknown[]` | `[]` | Current list of options rendered in the panel. |
| `optionLabel` | `string \| undefined` | `undefined` | Object key used to resolve option display label. |
| `optionValue` | `string \| undefined` | `undefined` | Object key used to resolve model value. |
| `optionDisabled` | `string \| undefined` | `undefined` | Object key used to resolve disabled option state. |
| `optionGroupLabel` | `string` | `'label'` | Group label key in grouped mode. |
| `optionGroupChildren` | `string` | `'items'` | Group item array key in grouped mode. |
| `dropdown` | `boolean` | `false` | Shows dropdown trigger button. |
| `dropdownMode` | `'blank' \| 'current'` | `'blank'` | Query source on dropdown click (`blank` clears query, `current` reuses input). |
| `multiple` | `boolean` | `false` | Enables chips mode with array model value. |
| `forceSelection` | `boolean` | `false` | Restricts final value to an item from suggestions. |
| `completeOnFocus` | `boolean` | `false` | Triggers `completeMethod` when input receives focus. |
| `autoClear` | `boolean` | `true` | Clears invalid free text in force-selection flows. |
| `unique` | `boolean` | `false` | Prevents duplicate chips/items in multiple mode. |
| `minLength` | `number` | `1` | Minimum query length before completion emits. |
| `delay` | `number` | `300` | Debounce delay (ms) for completion emission. |
| `maxlength` | `number \| null` | `null` | Native `maxlength` for the input element. |
| `virtualScroll` | `boolean` | `false` | Enables virtualized rendering path for flat option lists. |
| `virtualScrollItemSize` | `number` | `0` | Row height used by virtualization logic. |
| `addOnBlur` | `boolean` | `false` | Commits pending text as chip on blur (multiple mode). |
| `addOnTab` | `boolean` | `false` | Commits pending text as chip on Tab (multiple mode). |
| `separator` | `string \| RegExp \| undefined` | `undefined` | Tokenizes input into multiple chips by separator. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual variant. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant. |
| `placeholder` | `string` | `''` | Input placeholder text. |
| `showClear` | `boolean` | `false` | Shows clear button when value exists. |
| `fluid` | `boolean` | `false` | Makes host/container full width. |
| `filled` | `boolean` | `false` | Enables filled style treatment. |
| `group` | `boolean` | `false` | Interprets `suggestions` as grouped data. |
| `scrollHeight` | `string` | `'200px'` | Panel max-height and virtual viewport height. |
| `tabindex` | `number` | `0` | Input tabindex. |
| `inputId` | `string` | `''` | Optional explicit input id. |
| `appendTo` | `string \| HTMLElement \| undefined` | `undefined` | Reserved API for custom mount target handling. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `invalid` | `boolean` | `false` | Invalid state styling and ARIA. |
| `readonly` | `boolean` | `false` | Readonly input behavior. |
| `loading` | `boolean` | `false` | Shows loading state/template in panel. |
| `ariaLabel` | `string \| null` | `null` | Direct ARIA label for combobox/listbox context. |
| `ariaLabelledBy` | `string \| null` | `null` | ARIA labelledby id reference(s). |

## Outputs

| Name | Payload | Description |
| --- | --- | --- |
| `completeMethod` | `AutoCompleteCompleteEvent` | Emitted after debounce when query should be completed/fetched. |
| `select` | `AutoCompleteSelectEvent` | Emitted on option/chip selection. |
| `unselect` | `AutoCompleteUnselectEvent` | Emitted on chip removal/unselection. |
| `focus` | `FocusEvent` | Emitted on input focus. |
| `blur` | `FocusEvent` | Emitted on input blur. |
| `dropdownClick` | `AutoCompleteDropdownClickEvent` | Emitted when dropdown button is clicked. |
| `clearEvent` | `void` | Emitted after clear action. |
| `keyUp` | `KeyboardEvent` | Emitted on input keyup. |

## Template Slots

Slots are provided through marker directives exported from `ui-lib-custom/autocomplete`.

| Slot Directive | Implicit Context | Description |
| --- | --- | --- |
| `uiAutoCompleteItem` | `option` | Custom item row rendering. |
| `uiAutoCompleteSelectedItem` | `chip` | Custom chip/token rendering in multiple mode. |
| `uiAutoCompleteGroup` | `group` | Custom group header rendering. |
| `uiAutoCompleteHeader` | - | Panel header content. |
| `uiAutoCompleteFooter` | - | Panel footer content. |
| `uiAutoCompleteEmpty` | - | Empty-state content. |
| `uiAutoCompleteLoading` | - | Loading-state content. |
| `uiAutoCompleteDropdownIcon` | - | Dropdown button icon content. |
| `uiAutoCompleteRemoveTokenIcon` | - | Chip remove icon content. |

## CSS Custom Properties

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-autocomplete-border-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 6px))` | Container/panel radius. |
| `--uilib-autocomplete-padding-y` | density-scaled | Vertical input/container padding. |
| `--uilib-autocomplete-padding-x` | density-scaled | Horizontal input/container padding. |
| `--uilib-autocomplete-min-height` | `var(--uilib-input-min-height, 44px)` | Minimum control height. |
| `--uilib-autocomplete-bg` | `var(--uilib-input-bg, var(--uilib-surface))` | Control background. |
| `--uilib-autocomplete-border` | `var(--uilib-input-border, var(--uilib-border))` | Control border color. |
| `--uilib-autocomplete-border-focus` | `var(--uilib-input-border-focus, var(--uilib-color-primary-600))` | Focus/open border color. |
| `--uilib-autocomplete-text` | `var(--uilib-input-text, var(--uilib-page-fg))` | Control text color. |
| `--uilib-autocomplete-placeholder` | `var(--uilib-input-placeholder, var(--uilib-muted))` | Placeholder/icon muted color. |
| `--uilib-autocomplete-panel-bg` | `var(--uilib-select-dropdown-bg, var(--uilib-surface))` | Panel background. |
| `--uilib-autocomplete-panel-border` | `var(--uilib-autocomplete-border)` | Panel border color. |
| `--uilib-autocomplete-panel-shadow` | `var(--uilib-select-dropdown-shadow, var(--uilib-shadow-md, none))` | Panel shadow. |
| `--uilib-autocomplete-panel-max-height` | `260px` | Panel max-height fallback. |
| `--uilib-autocomplete-option-padding` | density-scaled | Option row spacing. |
| `--uilib-autocomplete-option-hover-bg` | primary tint | Option hover/active background. |
| `--uilib-autocomplete-option-selected-bg` | primary tint | Selected option background. |
| `--uilib-autocomplete-option-selected-text` | `var(--uilib-autocomplete-text)` | Selected option text color. |
| `--uilib-autocomplete-option-disabled-opacity` | `0.55` | Disabled option opacity. |
| `--uilib-autocomplete-chip-bg` | primary tint | Chip background. |
| `--uilib-autocomplete-chip-text` | `var(--uilib-autocomplete-text)` | Chip text color. |
| `--uilib-autocomplete-chip-border-radius` | `999px` | Chip radius. |
| `--uilib-autocomplete-chip-padding` | `0.2rem 0.5rem` | Chip internal spacing. |
| `--uilib-autocomplete-chip-gap` | `0.35rem` | Gap between chips. |
| `--uilib-autocomplete-chip-remove-hover-bg` | primary tint | Chip remove hover background. |
| `--uilib-autocomplete-dropdown-bg` | `transparent` | Dropdown button background. |
| `--uilib-autocomplete-dropdown-hover-bg` | primary tint | Dropdown button hover background. |
| `--uilib-autocomplete-dropdown-border` | `transparent` | Dropdown button border. |
| `--uilib-autocomplete-dropdown-icon-color` | placeholder color | Dropdown icon color. |
| `--uilib-autocomplete-clear-icon-color` | placeholder color | Clear/remove icon color. |
| `--uilib-autocomplete-clear-icon-hover-color` | text color | Clear/remove icon hover color. |
| `--uilib-autocomplete-group-label-bg` | `transparent` | Group header background. |
| `--uilib-autocomplete-group-label-text` | `var(--uilib-muted)` | Group header text color. |
| `--uilib-autocomplete-group-label-font-weight` | `600` | Group header weight. |
| `--uilib-autocomplete-sm-padding` | `0.35rem 0.5rem` | Small size container padding. |
| `--uilib-autocomplete-sm-font-size` | `0.875rem` | Small font size. |
| `--uilib-autocomplete-lg-padding` | `0.65rem 0.9rem` | Large size container padding. |
| `--uilib-autocomplete-lg-font-size` | `1.125rem` | Large font size. |

## Usage Examples

### Basic (single string)

```html
<ui-lib-autocomplete
  [(ngModel)]="value"
  [suggestions]="suggestions"
  (completeMethod)="complete($event)"
/>
```

### Object selection with `optionLabel`

```html
<ui-lib-autocomplete
  [(ngModel)]="countryCode"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="completeCountries($event)"
/>
```

### Dropdown button

```html
<ui-lib-autocomplete
  [dropdown]="true"
  dropdownMode="current"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="completeCountries($event)"
/>
```

### Force selection

```html
<ui-lib-autocomplete
  [forceSelection]="true"
  [autoClear]="true"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="completeCountries($event)"
/>
```

### Multiple/chips mode

```html
<ui-lib-autocomplete
  [(ngModel)]="selectedCodes"
  [multiple]="true"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="completeCountries($event)"
/>
```

### Chips with `addOnBlur` / `addOnTab` / `separator`

```html
<ui-lib-autocomplete
  [(ngModel)]="tags"
  [multiple]="true"
  [addOnBlur]="true"
  [addOnTab]="true"
  separator=","
  [unique]="true"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="completeCountries($event)"
/>
```

### Grouped options

```html
<ui-lib-autocomplete
  [group]="true"
  [suggestions]="groupedCities"
  [optionGroupLabel]="'label'"
  [optionGroupChildren]="'items'"
  optionLabel="label"
  optionValue="value"
  (completeMethod)="completeCities($event)"
/>
```

### Virtual scroll

```html
<ui-lib-autocomplete
  [virtualScroll]="true"
  [virtualScrollItemSize]="44"
  scrollHeight="240px"
  [suggestions]="largeItems"
  optionLabel="label"
  optionValue="value"
  (completeMethod)="completeLarge($event)"
/>
```

### Custom templates (item/chip/group/header/footer/empty)

```html
<ui-lib-autocomplete [multiple]="true" [group]="true" [suggestions]="grouped" (completeMethod)="complete($event)">
  <ng-template uiAutoCompleteHeader>
    <strong>Pick one</strong>
  </ng-template>

  <ng-template uiAutoCompleteGroup let-group>
    <span>{{ group.label }}</span>
  </ng-template>

  <ng-template uiAutoCompleteItem let-option>
    <span>{{ option.label }}</span>
  </ng-template>

  <ng-template uiAutoCompleteSelectedItem let-chip>
    <span>{{ chip }}</span>
  </ng-template>

  <ng-template uiAutoCompleteFooter>
    <small>Footer info</small>
  </ng-template>

  <ng-template uiAutoCompleteEmpty>
    <em>No matches.</em>
  </ng-template>
</ui-lib-autocomplete>
```

### Float label pattern

```html
<label for="country-ac">Country</label>
<ui-lib-autocomplete inputId="country-ac" [suggestions]="countries" optionLabel="name" optionValue="code" />
```

### Sizes

```html
<ui-lib-autocomplete size="small" />
<ui-lib-autocomplete size="medium" />
<ui-lib-autocomplete size="large" />
```

### Fluid

```html
<ui-lib-autocomplete [fluid]="true" />
```

### Filled variant mode

```html
<ui-lib-autocomplete [filled]="true" />
```

### Disabled and invalid states

```html
<ui-lib-autocomplete [disabled]="true" />
<ui-lib-autocomplete [invalid]="true" />
```

### Reactive forms

```html
<form [formGroup]="form">
  <ui-lib-autocomplete
    formControlName="country"
    [suggestions]="countries"
    optionLabel="name"
    optionValue="code"
    (completeMethod)="completeCountries($event)"
  />
</form>
```

### Template-driven forms

```html
<ui-lib-autocomplete
  [(ngModel)]="countryCode"
  [ngModelOptions]="{ standalone: true }"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="completeCountries($event)"
/>
```

### Accessibility patterns (`inputId`, `ariaLabelledBy`, `ariaLabel`)

```html
<label id="country-label" for="country-ac">Country</label>
<ui-lib-autocomplete
  inputId="country-ac"
  ariaLabelledBy="country-label"
  [suggestions]="countries"
  optionLabel="name"
  optionValue="code"
/>

<ui-lib-autocomplete ariaLabel="Country search" [suggestions]="countries" optionLabel="name" optionValue="code" />
```
