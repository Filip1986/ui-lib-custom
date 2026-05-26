# AutoComplete

**Selector:** `ui-lib-autocomplete`
**Entry point:** `import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete'`

---

## Overview

Combobox-pattern autocomplete with single and multiple (chip) selection modes, grouped suggestions,
virtual scrolling for large lists, and nine content-projection slots for full customisation.
Suggestions are **never filtered internally** — update `[suggestions]` in response to every
`(completeMethod)` event.

## API

### Inputs

| Name                    | Type                               | Default     | Description |
| ----------------------- | ---------------------------------- | ----------- | ----------- |
| `addOnBlur`             | `boolean`                          | `false`     | Commit free-text as a chip on blur (multiple mode). |
| `addOnTab`              | `boolean`                          | `false`     | Commit free-text as a chip on Tab key (multiple mode). |
| `appendTo`              | `string \| HTMLElement \| undefined` | `'body'`  | Where to mount the detached dropdown panel; `'body'` appends to `document.body`. |
| `ariaLabel`             | `string \| null`                   | `null`      | Sets `aria-label` on the inner `<input>`. |
| `ariaLabelledBy`        | `string \| null`                   | `null`      | Sets `aria-labelledby` on the inner `<input>` to reference an external label. |
| `autoClear`             | `boolean`                          | `true`      | When `forceSelection` finds no match on blur, clear the input instead of restoring the previous value. |
| `completeOnFocus`       | `boolean`                          | `false`     | Fire `completeMethod` when the input receives focus. |
| `delay`                 | `number`                           | `300`       | Debounce delay in ms before `completeMethod` fires. |
| `disabled`              | `boolean`                          | `false`     | Disables the control; sets `aria-disabled` on the input. |
| `dropdown`              | `boolean`                          | `false`     | Show a dropdown toggle button alongside the input. |
| `dropdownMode`          | `'blank' \| 'current'`             | `'blank'`   | `'blank'` clears the query when the dropdown opens; `'current'` keeps existing text. |
| `filled`                | `boolean`                          | `false`     | Apply a filled background appearance. |
| `fluid`                 | `boolean`                          | `false`     | Stretch the component to fill its container width. |
| `forceSelection`        | `boolean`                          | `false`     | Restrict value to items from `suggestions` only; rejects free text on blur. |
| `group`                 | `boolean`                          | `false`     | Treat `suggestions` as an array of grouped data objects. |
| `inputId`               | `string`                           | `''`        | Custom `id` for the inner `<input>` (for external `<label for="">` association). |
| `invalid`               | `boolean`                          | `false`     | Applies error border styling and sets `aria-invalid="true"` on the input. |
| `loading`               | `boolean`                          | `false`     | Shows a loading state in the panel while suggestions are being fetched. |
| `maxlength`             | `number \| null`                   | `null`      | Native `maxlength` attribute on the inner `<input>`. |
| `minLength`             | `number`                           | `1`         | Minimum query length before `completeMethod` fires. |
| `multiple`              | `boolean`                          | `false`     | Enable chip (multi-value) mode; `ngModel` receives an array. |
| `optionDisabled`        | `string \| undefined`              | `undefined` | Field name that, when truthy, marks the option as non-selectable. |
| `optionGroupChildren`   | `string`                           | `'items'`   | Field name for the children array inside each group object. |
| `optionGroupLabel`      | `string`                           | `'label'`   | Field name for group header labels when `group=true`. |
| `optionLabel`           | `string \| undefined`              | `undefined` | Field name used as the display label for object options. |
| `optionValue`           | `string \| undefined`              | `undefined` | Field name whose value is emitted when an option is selected. `undefined` emits the whole object. |
| `placeholder`           | `string`                           | `''`        | Placeholder text shown in the input when empty. |
| `readonly`              | `boolean`                          | `false`     | Makes the input read-only (query text not editable). |
| `scrollHeight`          | `string`                           | `'200px'`   | Max height of the dropdown panel. |
| `separator`             | `string \| RegExp \| undefined`    | `undefined` | Character(s) that auto-tokenize free text into chips (multiple mode). |
| `showClear`             | `boolean`                          | `false`     | Show a clear (×) button when the field has a value. |
| `size`                  | `'sm' \| 'md' \| 'lg'`            | `'md'`      | Control height: `'sm'` (36px) · `'md'` (44px) · `'lg'` (52px). |
| `suggestions`           | `unknown[]`                        | `[]`        | Options shown in the dropdown panel. Never filtered internally — update on every `completeMethod` event. |
| `tabindex`              | `number`                           | `0`         | Tab index of the inner `<input>`. |
| `unique`                | `boolean`                          | `false`     | Prevent duplicate chips in multiple mode. |
| `variant`               | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual style variant; falls back to the global theme variant when `null`. |
| `virtualScroll`         | `boolean`                          | `false`     | Enable virtual scrolling for large suggestion lists. Requires `virtualScrollItemSize`. |
| `virtualScrollItemSize` | `number`                           | `0`         | Item height in px; required when `virtualScroll=true`. |

### Outputs

| Name                | Type                             | Description |
| ------------------- | -------------------------------- | ----------- |
| `autocompleteBlur`  | `FocusEvent`                     | Input lost focus. Named with prefix to avoid shadowing the native DOM `blur` event. |
| `autocompleteFocus` | `FocusEvent`                     | Input received focus. Named with prefix to avoid shadowing the native DOM `focus` event. |
| `autocompleteKeyUp` | `KeyboardEvent`                  | Key-up on the inner input. |
| `clearEvent`        | `void`                           | Clear (×) button was clicked. |
| `completeMethod`    | `AutoCompleteCompleteEvent`      | Fired (debounced) when the user types; update `[suggestions]` in response. |
| `dropdownClick`     | `AutoCompleteDropdownClickEvent` | Dropdown toggle button was clicked. |
| `optionSelect`      | `AutoCompleteSelectEvent`        | An option was selected. Named `optionSelect` (not `select`) to avoid shadowing the native DOM event. |
| `unselect`          | `AutoCompleteUnselectEvent`      | A chip was removed (multiple mode). |

## Content Projection

Content is projected using structural directive markers inside `<ui-lib-autocomplete>`.

| Directive                         | Selector attribute                    | Context                              | Purpose |
| --------------------------------- | ------------------------------------- | ------------------------------------ | ------- |
| `AutoCompleteItemDirective`       | `*uilib-autocompleteItem`             | `$implicit: unknown` (suggestion)    | Custom option row template |
| `AutoCompleteSelectedItemDirective` | `*uilib-autocompleteSelectedItem`   | `$implicit: unknown` (chip value)    | Custom chip template (multiple mode) |
| `AutoCompleteGroupDirective`      | `*uilib-autocompleteGroup`            | `$implicit: unknown` (group object)  | Custom group-header template |
| `AutoCompleteHeaderDirective`     | `*uilib-autocompleteHeader`           | —                                    | Slot rendered above the option list |
| `AutoCompleteFooterDirective`     | `*uilib-autocompleteFooter`           | —                                    | Slot rendered below the option list |
| `AutoCompleteEmptyDirective`      | `*uilib-autocompleteEmpty`            | —                                    | Custom empty-state message |
| `AutoCompleteLoadingDirective`    | `*uilib-autocompleteLoading`          | —                                    | Custom loading indicator |
| `AutoCompleteDropdownIconDirective` | `*uilib-autocompleteDropdownIcon`   | —                                    | Custom dropdown-button icon |
| `AutoCompleteRemoveTokenIconDirective` | `*uilib-autocompleteRemoveTokenIcon` | —                                 | Custom chip remove-button icon |

```html
<!-- Custom item template with highlighted match -->
<ui-lib-autocomplete [suggestions]="results" (completeMethod)="search($event)" [(ngModel)]="value">
  <ng-template *uilib-autocompleteItem="let opt">
    <span [innerHTML]="highlight(opt.name, query)"></span>
  </ng-template>
</ui-lib-autocomplete>
```

## Theming

| CSS Variable                                   | Default |
| ---------------------------------------------- | ------- |
| `--uilib-autocomplete-focus-ring-color`        | `var(--uilib-color-primary-500)` |
| `--uilib-autocomplete-focus-ring-width`        | `3px` |
| `--uilib-autocomplete-bg`                      | `var(--uilib-input-bg, var(--uilib-surface))` |
| `--uilib-autocomplete-border`                  | `var(--uilib-input-border, var(--uilib-border))` |
| `--uilib-autocomplete-border-focus`            | `var(--uilib-input-border-focus, var(--uilib-color-primary-600))` |
| `--uilib-autocomplete-border-radius`           | `var(--uilib-input-radius, var(--uilib-shape-base, 6px))` |
| `--uilib-autocomplete-chip-bg`                 | `color-mix(in srgb, var(--uilib-color-primary-600) 12%, transparent)` |
| `--uilib-autocomplete-chip-border-radius`      | `999px` |
| `--uilib-autocomplete-chip-gap`                | `0.35rem` |
| `--uilib-autocomplete-chip-padding`            | `0.2rem 0.5rem` |
| `--uilib-autocomplete-chip-remove-hover-bg`    | `color-mix(in srgb, var(--uilib-color-primary-600) 18%, transparent)` |
| `--uilib-autocomplete-chip-text`               | `var(--uilib-autocomplete-text)` |
| `--uilib-autocomplete-clear-icon-color`        | `var(--uilib-autocomplete-placeholder)` |
| `--uilib-autocomplete-clear-icon-hover-color`  | `var(--uilib-autocomplete-text)` |
| `--uilib-autocomplete-dropdown-bg`             | `transparent` |
| `--uilib-autocomplete-dropdown-border`         | `transparent` |
| `--uilib-autocomplete-dropdown-hover-bg`       | `color-mix(in srgb, var(--uilib-color-primary-600) 10%, transparent)` |
| `--uilib-autocomplete-dropdown-icon-color`     | `var(--uilib-autocomplete-placeholder)` |
| `--uilib-autocomplete-group-label-bg`          | `transparent` |
| `--uilib-autocomplete-group-label-font-weight` | `600` |
| `--uilib-autocomplete-group-label-text`        | `var(--uilib-muted)` |
| `--uilib-autocomplete-min-height`              | `var(--uilib-input-min-height, 44px)` |
| `--uilib-autocomplete-option-disabled-opacity` | `0.55` |
| `--uilib-autocomplete-option-hover-bg`         | `color-mix(in srgb, var(--uilib-color-primary-600) 8%, transparent)` |
| `--uilib-autocomplete-option-padding-x-base`   | `0.75rem` |
| `--uilib-autocomplete-option-padding-y-base`   | `0.55rem` |
| `--uilib-autocomplete-option-selected-bg`      | `color-mix(in srgb, var(--uilib-color-primary-600) 14%, transparent)` |
| `--uilib-autocomplete-option-selected-text`    | `var(--uilib-autocomplete-text)` |
| `--uilib-autocomplete-panel-bg`                | `var(--uilib-select-dropdown-bg, var(--uilib-surface))` |
| `--uilib-autocomplete-panel-max-height`        | `260px` |
| `--uilib-autocomplete-panel-shadow`            | `var(--uilib-shadow-md, none)` |
| `--uilib-autocomplete-panel-z-index`           | `1000` |
| `--uilib-autocomplete-placeholder`             | `var(--uilib-input-placeholder, var(--uilib-muted))` |
| `--uilib-autocomplete-text`                    | `var(--uilib-input-text, var(--uilib-page-fg))` |

## Accessibility

**APG pattern:** [Combobox Pattern (ARIA 1.2)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

### Keyboard Interactions

| Key | Context | Action |
|-----|---------|--------|
| `↓` | On input | Open panel and move to first option |
| `↓ / ↑` | Panel open | Move `aria-activedescendant` to next/previous option |
| `Home / End` | Panel open | Jump to first / last option |
| `Enter` | Option focused | Select option and close panel |
| `Escape` | Panel open | Close panel, return focus to input |
| `Backspace` | Multiple, empty input | Focus last chip; second Backspace removes it |
| `← / →` | Multiple, chips focused | Navigate between chips |
| `Delete / Backspace` | On focused chip | Remove chip, focus adjacent chip or input |
| `Tab` | `addOnTab=true` | Commit free-text as chip |

### ARIA Wiring

- Inner `<input>` carries `role="combobox"`, `aria-autocomplete="list"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- Panel carries `role="listbox"` with `aria-label`
- Each option carries `role="option"`, `aria-selected`, `aria-posinset`, `aria-setsize`, `aria-disabled`
- Chip list carries `role="group"` with `aria-label="Selected items"`
- Live region announces result counts (`aria-live="polite"`, `aria-atomic="true"`)
- `aria-invalid` propagated from `invalid` input
- `aria-disabled` on chip list when disabled

## Usage Examples

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

<!-- grouped with custom item template -->
<ui-lib-autocomplete
  [suggestions]="groupedResults"
  [group]="true"
  optionLabel="name"
  (completeMethod)="search($event)"
  [(ngModel)]="value"
>
  <ng-template *uilib-autocompleteItem="let opt">
    <span class="flag">{{ opt.flag }}</span> {{ opt.name }}
  </ng-template>
</ui-lib-autocomplete>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#autocomplete)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/autocomplete/README.md)
