# Select Component

## Overview

A themeable combobox/select control with single or multiple selection, search filtering, and full `ControlValueAccessor` support. Uses standalone + OnPush + signals and CSS variables for runtime theming.

**Selector:** `ui-lib-select`
**Package:** `ui-lib-custom/select`

```typescript
import { UiLibSelect } from 'ui-lib-custom/select';
```

> Options are passed as a typed `SelectOption[]` array via the `options` input — not as projected `<option>` elements. In single mode, `ngModel` receives a scalar value; in multiple mode, it receives an array.

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | `[]` | Options to render |
| `variant` | `SelectVariant \| null` | `null` | Visual style; inherits from global theme when null |
| `size` | `SelectSize` | `'md'` | Size scale |
| `multiple` | `boolean` | `false` | Enables multi-select; `ngModel` receives `unknown[]` |
| `searchable` | `boolean` | `false` | Adds a filter input inside the dropdown; announces result count via live region |
| `placeholder` | `string` | `'Select...'` | Placeholder text when no value is selected |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `loading` | `boolean` | `false` | Shows a spinner and blocks interaction |
| `optionTemplate` | `TemplateRef<unknown> \| null` | `null` | Custom template for each option row; receives `$implicit` as `SelectOption` |
| `label` | `string` | `''` | Visible label element rendered above the control |
| `ariaLabel` | `string \| null` | `null` | Sets `aria-label` on the host combobox element |
| `ariaLabelledBy` | `string \| null` | `null` | Sets `aria-labelledby` on the host combobox element |
| `invalid` | `boolean` | `false` | Sets `aria-invalid` and invalid border styling |
| `required` | `boolean` | `false` | Sets `aria-required` on the host element |

### Outputs

None. Use Angular forms bindings: `[(ngModel)]` or `formControlName`.

### Types

```typescript
type SelectVariant = 'material' | 'bootstrap' | 'minimal';
type SelectSize    = 'sm' | 'md' | 'lg';

interface SelectOption {
  label:     string;
  value:     unknown;
  group?:    string;    // group name; options sharing a group are rendered under a group header
  disabled?: boolean;
}
```

---

## Usage

### Minimal

```html
<ui-lib-select label="Country" [options]="countryOptions" [(ngModel)]="selectedCountry" />
```

### Multi-select with search

```html
<ui-lib-select
  label="Tags"
  [options]="tagOptions"
  [multiple]="true"
  [searchable]="true"
  [(ngModel)]="selectedTags"
/>
```

### Custom option template

```html
<ui-lib-select label="User" [options]="users" [(ngModel)]="selectedUser">
  <ng-template #optionTemplate let-opt>
    <img [src]="opt.value.avatar" alt="" aria-hidden="true" />
    <span>{{ opt.label }}</span>
  </ng-template>
</ui-lib-select>
```

The template variable receives each `SelectOption` as `$implicit` (via `let-opt`).

---

## Form Integration

### Template-driven

```html
<ui-lib-select name="role" [options]="options" [(ngModel)]="role" />
```

### Reactive Forms

```html
<form [formGroup]="form">
  <ui-lib-select formControlName="role" [options]="options" />
</form>
```

---

## Option Grouping

Set the `group` property on `SelectOption` items. Options sharing the same `group` string are wrapped in a WAI-ARIA `role="group"` container with `aria-label` equal to the group name. The visual group header is rendered via CSS `::before { content: attr(aria-label) }` — no extra DOM elements are added inside the listbox, ensuring clean `aria-required-children` compliance.

```typescript
groupedOptions: SelectOption[] = [
  { label: 'Alpha', value: 'a', group: 'Greek' },
  { label: 'Beta',  value: 'b', group: 'Greek' },
  { label: 'One',   value: 1,   group: 'Numbers' },
];
```

```html
<ui-lib-select label="Choose a symbol" [options]="groupedOptions" [(ngModel)]="selected" />
```

---

## Keyboard Navigation

| Key | Action |
|---|---|
| `Enter` / `Space` | Open panel (when closed) · Select focused option (when open) |
| `Escape` | Close panel and restore focus to trigger |
| `ArrowDown` | Open panel (when closed) · Move focus to next option |
| `ArrowUp` | Open panel (when closed, if value set) · Move focus to previous option |
| `Home` | Move focus to first option |
| `End` | Move focus to last option |
| `Tab` | Close panel; focus moves away naturally |

---

## Accessibility — ARIA Pattern

Implements the WAI-ARIA **combobox / listbox** pattern (ARIA 1.2).

| Element | Roles & Attributes |
|---|---|
| Host (trigger) | `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` (listbox id, only when open), `aria-activedescendant` |
| Dropdown panel | `role="listbox"`, `aria-label`, `aria-multiselectable` (when `multiple`) |
| Each option | `role="option"`, `aria-selected`, `aria-setsize`, `aria-posinset`, `aria-disabled` |
| Option groups | `role="group"`, `aria-label` (group name) |
| Search input | `role="combobox"`, `aria-autocomplete="list"`, `aria-controls` (listbox id) |
| Live region | Announces filtered option count when typing in search |
| Clear button | `aria-label="Clear selection"`, decorative SVG is `aria-hidden` |
| Arrow icon | `aria-hidden="true"` |

---

## Theming & CSS Variables

| Variable | Purpose |
|---|---|
| `--uilib-select-bg` | Control background |
| `--uilib-select-border` | Control border color |
| `--uilib-select-radius` | Control border radius |
| `--uilib-select-dropdown-bg` | Dropdown panel background |
| `--uilib-select-dropdown-shadow` | Dropdown panel shadow |
| `--uilib-select-padding-y-base` | Base vertical padding (density scaled) |
| `--uilib-select-padding-x-base` | Base horizontal padding (density scaled) |
| `--uilib-select-search-padding-y-base` | Search container vertical padding |
| `--uilib-select-search-padding-x-base` | Search container horizontal padding |
| `--uilib-select-option-padding-y-base` | Option vertical padding |
| `--uilib-select-option-padding-x-base` | Option horizontal padding |
| `--uilib-select-group-padding-y-base` | Group label vertical padding |
| `--uilib-select-group-padding-x-base` | Group label horizontal padding |
| `--uilib-select-empty-padding-base` | Empty state padding |
| `--uilib-select-option-hover` | Hover background for options |
| `--uilib-select-search-input-padding-y` | Search input vertical padding |
| `--uilib-select-search-input-padding-x` | Search input horizontal padding |
| `--uilib-select-border-touched` | Border color when form control is touched |
| `--uilib-select-border-dirty` | Border color when form control is dirty |
| `--uilib-select-border-invalid` | Border color when form control is invalid |
| `--uilib-input-placeholder` | Placeholder and muted text color |

### Theme Override Example

```scss
[data-theme='brand-x'] {
  --uilib-select-bg: #0f172a;
  --uilib-select-border: #334155;
  --uilib-select-dropdown-bg: #111827;
  --uilib-select-option-hover: rgba(148, 163, 184, 0.2);
}
```

---

## Real-World Example

```html
<form [formGroup]="form" class="settings">
  <ui-lib-select
    label="Role"
    [options]="roleOptions"
    formControlName="role"
    [required]="true"
  />
  <ui-lib-button type="submit">Save</ui-lib-button>
</form>
```

---

## Related

- [`INPUT.md`](INPUT.md)
- [`CHECKBOX.md`](CHECKBOX.md)
- [`AUTOCOMPLETE_API.md`](AUTOCOMPLETE_API.md)
