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
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual style variant; falls back to the global theme variant when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height: `'sm'` (36 px) · `'md'` (44 px) · `'lg'` (52 px) |
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
| `optionSelect` | `AutoCompleteSelectEvent` | Option selected from the suggestion list. Named `optionSelect` (not `select`) to avoid shadowing the native DOM `select` event. |
| `unselect` | `AutoCompleteUnselectEvent` | Chip removed (multiple mode) |
| `autocompleteFocus` | `FocusEvent` | Input received focus. Named `autocompleteFocus` (not `focus`) to avoid shadowing the native DOM `focus` event. |
| `autocompleteBlur` | `FocusEvent` | Input lost focus. Named `autocompleteBlur` (not `blur`) to avoid shadowing the native DOM `blur` event. |
| `dropdownClick` | `AutoCompleteDropdownClickEvent` | Dropdown toggle button clicked |
| `clearEvent` | `void` | Clear button clicked |
| `autocompleteKeyUp` | `KeyboardEvent` | Key-up on the inner input. Named `autocompleteKeyUp` (not `keyUp`) to avoid shadowing the native DOM `keyup` event. |

## Content Projection

All slots use structural directive markers inside `<ui-lib-autocomplete>`.

| Directive | Selector | Context | Purpose |
|-----------|----------|---------|---------|
| `AutoCompleteItemDirective` | `*uilib-autocompleteItem` | `$implicit: unknown` | Custom option row template |
| `AutoCompleteSelectedItemDirective` | `*uilib-autocompleteSelectedItem` | `$implicit: unknown` | Custom chip template (multiple mode) |
| `AutoCompleteGroupDirective` | `*uilib-autocompleteGroup` | `$implicit: unknown` | Custom group-header template |
| `AutoCompleteHeaderDirective` | `*uilib-autocompleteHeader` | — | Slot above the option list |
| `AutoCompleteFooterDirective` | `*uilib-autocompleteFooter` | — | Slot below the option list |
| `AutoCompleteEmptyDirective` | `*uilib-autocompleteEmpty` | — | Custom empty-state message |
| `AutoCompleteLoadingDirective` | `*uilib-autocompleteLoading` | — | Custom loading indicator |
| `AutoCompleteDropdownIconDirective` | `*uilib-autocompleteDropdownIcon` | — | Custom dropdown-button icon |
| `AutoCompleteRemoveTokenIconDirective` | `*uilib-autocompleteRemoveTokenIcon` | — | Custom chip remove-button icon |

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

<!-- custom item template -->
<ui-lib-autocomplete
  [suggestions]="results"
  (completeMethod)="search($event)"
  [(ngModel)]="selectedItem"
>
  <ng-template *uilib-autocompleteItem="let opt">
    <span [innerHTML]="highlight(opt.name, query)"></span>
  </ng-template>
</ui-lib-autocomplete>
```

## Theming

All visual properties are exposed as CSS custom properties on the host element:

```css
ui-lib-autocomplete {
  --uilib-autocomplete-panel-max-height: 320px;
  --uilib-autocomplete-chip-border-radius: 4px;
}
```

| Token | Default | Description |
|-------|---------|-------------|
| `--uilib-autocomplete-panel-max-height` | `260px` | Maximum height of the dropdown panel |
| `--uilib-autocomplete-panel-z-index` | `1000` | Z-index of the dropdown panel |
| `--uilib-autocomplete-padding-y-base` | `0.5rem` | Vertical padding of the input wrapper |
| `--uilib-autocomplete-padding-x-base` | `0.75rem` | Horizontal padding of the input wrapper |
| `--uilib-autocomplete-option-padding-y-base` | `0.55rem` | Vertical padding of each option |
| `--uilib-autocomplete-option-padding-x-base` | `0.75rem` | Horizontal padding of each option |
| `--uilib-autocomplete-option-min-height` | `(input min-height)` | Minimum height of each option row (also used for mobile touch targets) |
| `--uilib-autocomplete-btn-min-size` | `2.25rem` | Minimum width and height of the clear, dropdown, and chip-remove buttons |
| `--uilib-autocomplete-focus-ring-width` | `3px` | Width of the keyboard focus ring |
| `--uilib-autocomplete-chip-bg` | `color-mix(…)` | Chip background color |
| `--uilib-autocomplete-chip-border-radius` | `999px` | Chip border radius |
| `--uilib-autocomplete-chip-padding` | `0.2rem 0.5rem` | Chip inner padding |
| `--uilib-autocomplete-chip-gap` | `0.35rem` | Gap between chips |
| `--uilib-autocomplete-group-label-font-weight` | `600` | Group header font weight |

## Internationalisation

All user-visible strings resolve through `UiLibI18nService`. Each string has a locale key that can be translated by providing a custom locale object.

| String | Locale key | Default (en) | Notes |
|--------|-----------|--------------|-------|
| Listbox accessible name fallback | `autocomplete.suggestions` | `Suggestions` | Used when no `ariaLabel` is provided |
| Empty-state message | `autocomplete.empty` | `No results found` | Shown when `suggestions` is empty |
| Single result announcement | `autocomplete.results.one` | `1 result available` | Screen-reader live region |
| Multiple results announcement | `autocomplete.results.count` | `{count} results available` | Screen-reader live region; `{count}` is replaced |
| Selected-chips region label | `autocomplete.chips-label` | `Selected items` | — |
| Clear button label | `autocomplete.clear` | `Clear` | — |
| Dropdown button label | `autocomplete.dropdown` | `Show suggestions` | — |
| Chip remove button | `autocomplete.remove-chip` | `Remove {label}` | `{label}` is the chip display text |

APG pattern: [Combobox with List Autocomplete](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
