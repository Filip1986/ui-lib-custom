# Select Component

## Overview

A themeable combobox/select control with single or multiple selection, search filtering, and full ControlValueAccessor support. It uses standalone + OnPush + signals and CSS variables for runtime theming.

**Import**
```typescript
import { UiLibSelect } from 'ui-lib-custom/select';
```

**Location:** `projects/ui-lib-custom/src/lib/select/select.ts`

---

## Features

- ✅ Single or multiple selection with optional search.
- 🎨 Variant + size styling (material, bootstrap, minimal).
- ♿ Accessible combobox semantics and keyboard navigation.
- 🧪 Reactive + template-driven form support.
- 🎛️ CSS variable theming with density + shape tokens.

---

## Basic Usage

```html
<ui-lib-select [options]="options" placeholder="Select a role" />
```

```typescript
options: SelectOption[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | `[]` | Options to render. |
| `variant` | `SelectVariant \| null` | `null` | Visual variant (falls back to global variant). |
| `size` | `SelectSize` | `'md'` | Size scale (`sm`, `md`, `lg`). |
| `multiple` | `boolean` | `false` | Allow multiple selections. |
| `searchable` | `boolean` | `false` | Show search input when open. |
| `placeholder` | `string` | `'Select...'` | Placeholder text when no value is selected. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `loading` | `boolean` | `false` | Shows loading spinner and blocks interaction. |
| `optionTemplate` | `TemplateRef<unknown> \| null` | `null` | Custom option template. |
| `label` | `string` | `''` | Optional field label above the control. |
| `ariaLabel` | `string \| null` | `null` | ARIA label when no visible label exists. |
| `ariaLabelledBy` | `string \| null` | `null` | External label id to reference. |
| `invalid` | `boolean` | `false` | Invalid state for styling/ARIA. |
| `required` | `boolean` | `false` | Required state for ARIA. |

### Outputs

None. Use Angular forms bindings (`[(ngModel)]`, `formControlName`).

### Types

```typescript
type SelectVariant = 'material' | 'bootstrap' | 'minimal';
type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  label: string;
  value: unknown;
  group?: string;
  disabled?: boolean;
}
```

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

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-select-bg` | Control background. |
| `--uilib-select-border` | Control border color. |
| `--uilib-select-radius` | Control border radius. |
| `--uilib-select-dropdown-bg` | Dropdown background. |
| `--uilib-select-dropdown-shadow` | Dropdown shadow. |
| `--uilib-select-padding-y-base` | Base vertical padding (density scaled). |
| `--uilib-select-padding-x-base` | Base horizontal padding (density scaled). |
| `--uilib-select-search-padding-y-base` | Search container vertical padding. |
| `--uilib-select-search-padding-x-base` | Search container horizontal padding. |
| `--uilib-select-option-padding-y-base` | Option vertical padding. |
| `--uilib-select-option-padding-x-base` | Option horizontal padding. |
| `--uilib-select-group-padding-y-base` | Group label vertical padding. |
| `--uilib-select-group-padding-x-base` | Group label horizontal padding. |
| `--uilib-select-empty-padding-base` | Empty state padding. |
| `--uilib-select-option-hover` | Hover background for options. |
| `--uilib-select-search-input-padding-y` | Search input vertical padding. |
| `--uilib-select-search-input-padding-x` | Search input horizontal padding. |
| `--uilib-select-border-touched` | Border color when touched. |
| `--uilib-select-border-dirty` | Border color when dirty. |
| `--uilib-select-border-invalid` | Border color when invalid. |
| `--uilib-input-placeholder` | Placeholder and muted text color. |

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

## Accessibility

### Keyboard Interaction
| Key | Action |
| --- | --- |
| Enter / Space | Open dropdown, select focused option |
| ArrowDown / ArrowUp | Open dropdown and move focus |
| Home / End | Jump to first/last option |
| Escape | Close dropdown |
| Tab | Move focus out |

### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `role="combobox"` | Host identifies the control |
| `aria-expanded` | Reflects open state |
| `aria-controls` | Points to listbox id |
| `aria-activedescendant` | Points to focused option |
| `role="listbox"` | Dropdown container |
| `role="option"` | Each option item |

---

## Real-World Example

```html
<form [formGroup]="form" class="settings">
  <ui-lib-select
    label="Role"
    [options]="options"
    formControlName="role"
    required
  />
  <ui-lib-button type="submit">Save</ui-lib-button>
</form>
```
