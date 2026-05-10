# Select

**Selector:** `ui-lib-select`
**Package:** `ui-lib-custom/select`
**Content projection:** `optionTemplate` input (`TemplateRef`) for custom option rendering

> Implements `ControlValueAccessor`. Options are passed as a typed `SelectOption[]` array via the `options` input — not as projected `<option>` elements. In single mode, `ngModel` receives a scalar value; in multiple mode, it receives an array.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `SelectOption[]` | `[]` | `{ label: string, value: unknown, disabled?: boolean, group?: string }` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `multiple` | `boolean` | `false` | Enables multi-select; ngModel receives `unknown[]` |
| `searchable` | `boolean` | `false` | Adds a filter input inside the dropdown panel; announces result count via live region |
| `placeholder` | `string` | `'Select...'` | |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | Shows a spinner and blocks interaction |
| `optionTemplate` | `TemplateRef<unknown> \| null` | `null` | Custom template for each option row; receives `$implicit` as `SelectOption` |
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

<!-- custom option template -->
<ui-lib-select label="User" [options]="users" [(ngModel)]="selectedUser">
  <ng-template #optionTemplate let-opt>
    <img [src]="opt.value.avatar" alt="" aria-hidden="true" />
    <span>{{ opt.label }}</span>
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
