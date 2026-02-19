# SelectButton Component

Segmented button control for single or multiple selection.

## Overview
- Standalone, OnPush, signal-based inputs.
- Single or multiple selection.
- Variant and size support (material, bootstrap, minimal; small/medium/large).
- Form-friendly (ControlValueAccessor) and accessible states.
- Themed with CSS custom properties from `design-tokens.ts` and theme presets.

**Import**
```typescript
import { SelectButton } from 'ui-lib-custom';
```

---
## Basic Usage
```html
<ui-lib-select-button
  [options]="options"
  [(value)]="selection"
/>
```

---
## API Reference
Location: `projects/ui-lib-custom/src/lib/select-button/select-button.ts`

### Inputs (signals)
| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SelectButtonOption[]` | `[]` | Option items to render |
| `value` | `any \| any[] \| null \| undefined` | `undefined` | Controlled value(s) |
| `optionLabel` | `string` | `'label'` | Field name for label |
| `optionValue` | `string` | `'value'` | Field name for value |
| `optionDisabled` | `string` | `'disabled'` | Field name for disabled |
| `multiple` | `boolean` | `false` | Enable multi-select |
| `allowEmpty` | `boolean` | `true` | Allow deselect in single mode |
| `variant` | `SelectButtonVariant` | `'material'` | Visual variant |
| `size` | `SelectButtonSize` | `'medium'` | Visual size |
| `disabled` | `boolean` | `false` | Disable control |
| `invalid` | `boolean` | `false` | Invalid state for forms |
| `fluid` | `boolean` | `false` | Full-width mode |
| `ariaLabelledBy` | `string \| null` | `null` | `aria-labelledby` for host |

### Outputs
| Output | Type | Description |
| --- | --- | --- |
| `onChange` | `SelectButtonChangeEvent` | Fires on selection change |
| `valueChange` | `any \| any[]` | Two-way binding support |

### Types
```typescript
export interface SelectButtonOption {
  label?: string;
  value?: any;
  disabled?: boolean;
  icon?: string;
  [key: string]: any;
}

export interface SelectButtonChangeEvent {
  originalEvent: Event;
  value: any | any[];
}

export type SelectButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type SelectButtonSize = 'small' | 'medium' | 'large';
```

---
## Usage Examples

### Multiple selection
```html
<ui-lib-select-button
  [options]="options"
  [multiple]="true"
  [(value)]="selectedValues"
/>
```

### Custom templates with icons
```html
<ui-lib-select-button [options]="justifyOptions" [(value)]="justifyValue">
  <ng-template #item let-option>
    <ui-lib-icon [name]="option.icon" />
    {{ option.label }}
  </ng-template>
</ui-lib-select-button>
```

### Sizes
```html
<ui-lib-select-button [options]="options" size="small" [(value)]="value" />
<ui-lib-select-button [options]="options" size="medium" [(value)]="value" />
<ui-lib-select-button [options]="options" size="large" [(value)]="value" />
```

### Fluid mode
```html
<ui-lib-select-button [options]="options" [fluid]="true" [(value)]="value" />
```

### Disabled options
```html
<ui-lib-select-button
  [options]="options"
  optionDisabled="disabled"
  [(value)]="value"
/>
```

### Form integration
```html
<!-- Template-driven -->
<ui-lib-select-button [options]="options" [(ngModel)]="selection" />

<!-- Reactive -->
<form [formGroup]="form">
  <ui-lib-select-button [options]="options" formControlName="selection" />
</form>
```

---
## Accessibility
- Host role: `group`.
- Options use `aria-pressed` to reflect selection.
- `aria-labelledby` supported for external labels.
- Keyboard: Tab focuses the group, Space/Enter toggles the focused option.

---
## CSS Custom Properties
### Core
- `--uilib-select-button-gap`
- `--uilib-select-button-border-radius`
- `--uilib-select-button-material-border-radius`
- `--uilib-select-button-bootstrap-border-radius`
- `--uilib-select-button-minimal-border-radius`
- `--uilib-select-button-border`
- `--uilib-select-button-fg`
- `--uilib-select-button-selected-fg`
- `--uilib-select-button-invalid-border`
- `--uilib-select-button-disabled-opacity`

### Variant-based
- `--uilib-select-button-{variant}-bg`
- `--uilib-select-button-{variant}-selected-bg`
- `--uilib-select-button-{variant}-selected-fg`
- `--uilib-select-button-{variant}-hover-bg`
- `--uilib-select-button-{variant}-border`
- `--uilib-select-button-{variant}-shadow`

### Size-based
- `--uilib-select-button-{size}-padding`
- `--uilib-select-button-{size}-font-size`
- `--uilib-select-button-{size}-min-height`

---
## Files
- `projects/ui-lib-custom/src/lib/select-button/select-button.ts`
- `projects/ui-lib-custom/src/lib/select-button/select-button.html`
- `projects/ui-lib-custom/src/lib/select-button/select-button.scss`
- `projects/ui-lib-custom/src/lib/select-button/select-button.types.ts`
