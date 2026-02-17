# SelectButton API

## Overview
SelectButton presents a list of options as a segmented button group. It supports single or multiple selection, integrates with forms, and exposes a template slot for custom item rendering.

## API Reference

### Inputs (signal-based)

#### Core
- `options = input<SelectButtonOption[]>([])`\
  Option items to render.
- `value = input<any | any[]>()`\
  Selected value(s) for controlled usage.
- `optionLabel = input<string>('label')`\
  Property name used for display text.
- `optionValue = input<string>('value')`\
  Property name used for value binding.
- `optionDisabled = input<string>('disabled')`\
  Property name used for per-option disabled state.

#### Behavior
- `multiple = input<boolean>(false)`\
  Enables multi-select mode.
- `allowEmpty = input<boolean>(true)`\
  Allows clearing selection in single mode.

#### Appearance
- `variant = input<SelectButtonVariant>('material')`\
  Visual variant.
- `size = input<SelectButtonSize>('medium')`\
  Visual size.
- `disabled = input<boolean>(false)`\
  Disables the entire control.
- `invalid = input<boolean>(false)`\
  Marks as invalid for forms.
- `fluid = input<boolean>(false)`\
  Stretches to full width.

#### Accessibility
- `ariaLabelledBy = input<string | null>(null)`\
  Sets `aria-labelledby` on the host.

### Outputs
- `onChange = output<SelectButtonChangeEvent>()`\
  Fires on selection change.
- `valueChange = output<any | any[]>()`\
  Two-way binding support for `[(value)]`.

## Types

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

## Template Slot

### Item Template
Use the `#item` template to customize item rendering.

```html
<ui-lib-select-button [options]="options" [(value)]="selected">
  <ng-template #item let-option>
    <ui-lib-icon [name]="option.icon" />
    {{ option.label }}
  </ng-template>
</ui-lib-select-button>
```

Template context:
- `$implicit`: `SelectButtonOption`

## CSS Custom Properties

### Core
- `--uilib-selectbutton-gap`
- `--uilib-selectbutton-border-radius`
- `--uilib-selectbutton-border`
- `--uilib-selectbutton-fg`
- `--uilib-selectbutton-selected-border`
- `--uilib-selectbutton-selected-fg`
- `--uilib-selectbutton-invalid-border`
- `--uilib-selectbutton-disabled-opacity`

### Variant-based
- `--uilib-selectbutton-{variant}-bg`
- `--uilib-selectbutton-{variant}-selected-bg`
- `--uilib-selectbutton-{variant}-hover-bg`

### Size-based
- `--uilib-selectbutton-{size}-padding`
- `--uilib-selectbutton-{size}-font-size`

## Usage Examples

### Single Selection (default)
```html
<ui-lib-select-button
  [options]="options"
  [(value)]="selected"
/>
```

### Multiple Selection
```html
<ui-lib-select-button
  [options]="options"
  [multiple]="true"
  [(value)]="selectedValues"
/>
```

### Disabling Options
```html
<ui-lib-select-button
  [options]="options"
  optionDisabled="disabled"
  [(value)]="selected"
/>
```

### Invalid State
```html
<ui-lib-select-button
  [options]="options"
  [invalid]="true"
  [(value)]="selected"
/>
```

### Full Width (Fluid)
```html
<ui-lib-select-button
  [options]="options"
  [fluid]="true"
  [(value)]="selected"
/>
```

### Custom Item Template
```html
<ui-lib-select-button [options]="options" [(value)]="selected">
  <ng-template #item let-option>
    <ui-lib-icon [name]="option.icon" />
    {{ option.label }}
  </ng-template>
</ui-lib-select-button>
```

### Forms (ControlValueAccessor)
```html
<form [formGroup]="form">
  <ui-lib-select-button
    formControlName="status"
    [options]="options"
  />
</form>
```

## Accessibility Notes
- Single selection uses `role="radiogroup"` and `role="radio"` per option.
- Multiple selection uses `role="group"` and `role="checkbox"` per option.
- Roving `tabindex` is used so the group is a single tab stop.
- Space/Enter toggles the focused option; Arrow keys move focus.

## Architecture Decisions

### ControlValueAccessor Strategy
- Implement CVA directly on the SelectButton to support `ngModel` and `formControlName`.
- For `multiple = false`, emit a single value (or `null` if `allowEmpty`).
- For `multiple = true`, emit an array of selected values.

### Keyboard Navigation
- Roving tabindex: only one option is tabbable at a time.
- Arrow keys move focus across enabled options; disabled options are skipped.
- Home/End move to first/last enabled option.

### Variant Styling Cascade
- Host exposes variant-specific CSS vars and applies `btn-group`-like classes.
- Option buttons inherit size and variant styling through CSS variables.

### Template Context
- The `#item` template receives `$implicit` as the full `SelectButtonOption`.
- Consumers can access custom fields (e.g., `icon`, `meta`) without extra APIs.
