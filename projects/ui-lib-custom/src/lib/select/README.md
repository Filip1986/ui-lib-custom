# Select

**Selector:** `ui-lib-select`
**Package:** `ui-lib-custom/select`
**Content projection:** `#optionTemplate` slot — place `<ng-template #optionTemplate let-opt>` inside `<ui-lib-select>` for custom option rendering.

> Implements `ControlValueAccessor`. Options are passed as a typed `SelectOption[]` array via the `options` input — not as projected `<option>` elements. In single mode, `ngModel` receives a scalar value; in multiple mode, it receives an array.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `SelectOption[]` | `[]` | `{ label: string, value: unknown, disabled?: boolean, group?: string }` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `multiple` | `boolean` | `false` | Enables multi-select; ngModel receives `unknown[]` |
| `searchable` | `boolean` | `false` | Adds a filter input inside the dropdown panel; announces result count via live region |
| `placeholder` | `string` | `''` | Shown when no value is selected; falls back to the `select.placeholder` locale key (`'Select an option'`) |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | Shows a spinner and blocks interaction |
| ~~`optionTemplate`~~ | _removed_ | — | Replaced by `#optionTemplate` content-child slot (see below). |
| `label` | `string` | `''` | Visible label element rendered above the control |
| `ariaLabel` | `string \| null` | `null` | Sets `aria-label` on the host combobox element |
| `ariaLabelledBy` | `string \| null` | `null` | Sets `aria-labelledby` on the host combobox element |
| `invalid` | `boolean` | `false` | Sets `aria-invalid` on the host element |
| `required` | `boolean` | `false` | Sets `aria-required` on the host element |

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

<!-- custom option template — rich context: $implicit, index, selected, disabled, active -->
<ui-lib-select label="User" [options]="users" [(ngModel)]="selectedUser">
  <ng-template #optionTemplate let-opt let-selected="selected" let-active="active">
    <img [src]="opt.value.avatar" alt="" aria-hidden="true" />
    <span [class.fw-bold]="selected">{{ opt.label }}</span>
  </ng-template>
</ui-lib-select>
```

## Option Grouping

Set the `group` property on `SelectOption` items. Options with the same `group` string are wrapped in a WAI-ARIA `role="group"` container with `aria-label` equal to the group name. The visual group header is rendered via CSS `::before { content: attr(aria-label) }` — no extra DOM elements are added inside the listbox, ensuring clean `aria-required-children` compliance.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open panel (when closed) · Select focused option (when open) |
| `Escape` | Close panel and restore focus to trigger |
| `ArrowDown` | Open panel (when closed) · Move focus to next option |
| `ArrowUp` | Open panel (when closed, if value set) · Move focus to previous option |
| `Home` | Move focus to first option |
| `End` | Move focus to last option |
| `Tab` | Close panel (focus moves away naturally) |

## ARIA Pattern

Implements WAI-ARIA **combobox/listbox** pattern (ARIA 1.2):

- Host element: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` → listbox (only when open), `aria-activedescendant`
- Panel: `role="listbox"`, `aria-label`, `aria-multiselectable` (when `multiple`)
- Options: `role="option"`, `aria-selected`, `aria-setsize`, `aria-posinset`, `aria-disabled`
- Groups: `role="group"` → `aria-label` (group name)
- Search input (when `searchable`): `role="combobox"`, `aria-autocomplete="list"`, `aria-controls` → listbox
- Live region: announces filtered option count when typing in search
- Clear button: `aria-label="Clear selection"` with decorative SVG icon (`aria-hidden`)
- Arrow icon: `aria-hidden="true"`

## Theming

All visual properties are exposed as CSS custom properties on the host element. Override at any scope:

```css
ui-lib-select {
  --uilib-select-panel-max-height: 320px;
  --uilib-select-focus-ring-width: 3px;
}
```

| Token | Default | Description |
|-------|---------|-------------|
| `--uilib-select-panel-max-height` | `260px` | Maximum height of the dropdown panel |
| `--uilib-select-panel-z-index` | `var(--uilib-z-dropdown, 10)` | Z-index of the dropdown panel |
| `--uilib-select-padding-y-base` | `0.55rem` | Vertical padding of the trigger control |
| `--uilib-select-padding-x-base` | `0.75rem` | Horizontal padding of the trigger control |
| `--uilib-select-option-padding-y-base` | `0.5rem` | Vertical padding of each option row |
| `--uilib-select-option-padding-x-base` | `0.75rem` | Horizontal padding of each option row |
| `--uilib-select-group-padding-y-base` | `0.25rem` | Vertical padding of a group header |
| `--uilib-select-group-padding-x-base` | `0.75rem` | Horizontal padding of a group header |
| `--uilib-select-empty-padding-base` | `0.75rem` | Padding of the empty-state message |
| `--uilib-select-focus-ring-width` | `2px` | Width of the keyboard focus ring |
| `--uilib-select-label-font-weight` | `600` | Font weight of the visible label |
| `--uilib-select-label-gap` | `0.35rem` | Gap between label and control |
| `--uilib-select-control-gap` | `0.5rem` | Gap between value and actions area |
| `--uilib-select-arrow-font-size` | `0.8rem` | Font size of the chevron icon |

## Internationalisation

All user-visible strings resolve through `UiLibI18nService`. Each string has a locale key that can be translated by providing a custom locale object. Per-instance overrides are available via the inputs listed below.

| String | Locale key | Default (en) | Input override |
|--------|-----------|--------------|----------------|
| Placeholder text | `select.placeholder` | `Select an option` | `[placeholder]` |
| Empty options message | `select.empty` | `No options available` | — |
| Search input placeholder | `select.search.placeholder` | `Search options` | — |
| Search input ARIA label | `select.search.aria` | `Search options` | — |
| Clear button ARIA label | `select.clear` | `Clear selection` | — |
| Toggle button ARIA label | `select.toggle` | `Toggle dropdown` | — |
| Selected count announcement | `select.selected.count` | `{count} items selected` | — |

APG pattern: [Combobox with Listbox Popup](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
