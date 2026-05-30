# Cascade Select

**Selector:** `ui-lib-cascade-select`
**Entry point:** `import { CascadeSelect } from 'ui-lib-custom/cascade-select'`

---

## Overview

CascadeSelect component with hierarchical single-value selection.

## API

### Inputs

| Name                  | Type                               | Default                               | Description                                                                                                         |
| --------------------- | ---------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `appendTo`            | `string | HTMLElement | undefined` | `'body'`                              | Where to mount the detached dropdown panel; `'body'` appends to `document.body`. Default: `'body'`.                 |
| `ariaLabel`           | `string | null`                    | `null`                                | Sets `aria-label` on the host combobox. Default: `null`.                                                            |
| `ariaLabelledBy`      | `string | null`                    | `null`                                | Sets `aria-labelledby` on the host combobox to reference an external label. Default: `null`.                        |
| `disabled`            | `boolean`                          | `false`                               | Disables the control; sets `aria-disabled` on the host. Default: `false`.                                           |
| `filled`              | `boolean`                          | `false`                               | Apply a filled background appearance. Default: `false`.                                                             |
| `fluid`               | `boolean`                          | `false`                               | Stretch the component to fill its container width. Default: `false`.                                                |
| `inputId`             | `string`                           | `''`                                  | Custom `id` for the trigger control (for external `<label for="">` association). Default: `''`.                     |
| `invalid`             | `boolean`                          | `false`                               | Applies error border styling and sets `aria-invalid="true"` on the host. Default: `false`.                          |
| `loading`             | `boolean`                          | `false`                               | Shows a loading spinner and disables all interaction. Default: `false`.                                             |
| `optionDisabled`      | `string | undefined`               | `undefined`                           | Field name that, when truthy on an option, marks it as non-selectable. Default: `undefined`.                        |
| `optionGroupChildren` | `string[]`                         | `[]`                                  | Array of field names for children at each nesting level (e.g. `['states', 'cities']`). Default: `[]`.               |
| `optionGroupLabel`    | `string`                           | `'label'`                             | Field name used as the display label for group-level options. Default: `'label'`.                                   |
| `optionLabel`         | `string`                           | `'label'`                             | Field name used as the display label for leaf options. Default: `'label'`.                                          |
| `options`             | `unknown[]`                        | `[]`                                  | Root-level option objects for the first column. Default: `[]`.                                                      |
| `optionValue`         | `string | undefined`               | `undefined`                           | Field name whose value is emitted on selection. `undefined` emits the whole option object. Default: `undefined`.    |
| `placeholder`         | `string`                           | `CASCADE_SELECT_DEFAULTS.Placeholder` | Placeholder text shown when no value is selected. Default: `'Select'`.                                              |
| `showClear`           | `boolean`                          | `false`                               | Show a clear (×) button when the field has a value. Default: `false`.                                               |
| `size`                | `CascadeSelectSize`                | `CASCADE_SELECT_DEFAULTS.Size`        | Control height: `'sm'` (36 px) · `'md'` (44 px) · `'lg'` (52 px). Default: `'md'`.                                  |
| `tabindex`            | `number`                           | `0`                                   | Tab index of the host element. Default: `0`.                                                                        |
| `variant`             | `CascadeSelectVariant | undefined` | `undefined`                           | Visual style variant. Falls back to the global `ThemeConfigService` variant when `undefined`. Default: `undefined`. |

### Outputs

| Name                 | Type                            | Description                                                                                                                    |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `cascadeChange`      | `CascadeSelectChangeEvent`      | Emitted when a leaf option is selected. Named `cascadeChange` (not `change`) to avoid shadowing the native DOM `change` event. |
| `cascadeSelectBlur`  | `FocusEvent`                    | Host lost focus. Named `cascadeSelectBlur` (not `blur`) to avoid shadowing the native DOM `blur` event.                        |
| `cascadeSelectFocus` | `FocusEvent`                    | Host received focus. Named `cascadeSelectFocus` (not `focus`) to avoid shadowing the native DOM `focus` event.                 |
| `clear`              | `void`                          | Emitted when the clear (×) button is clicked.                                                                                  |
| `groupChange`        | `CascadeSelectGroupChangeEvent` | Emitted when the user navigates into a sub-group at any level.                                                                 |
| `hide`               | `CascadeSelectHideEvent`        | Emitted when the dropdown panel is closed.                                                                                     |
| `show`               | `CascadeSelectShowEvent`        | Emitted when the dropdown panel is opened.                                                                                     |

## Content Projection

_none_

## Theming

| CSS Variable                                      | Default                                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `--uilib-cascade-select-bg`                       | `var(--uilib-input-bg, var(--uilib-surface))`                                                            |
| `--uilib-cascade-select-border`                   | `var(--uilib-input-border, var(--uilib-border))`                                                         |
| `--uilib-cascade-select-border-focus`             | `var( --uilib-input-border-focus, var(--uilib-color-primary-600) )`                                      |
| `--uilib-cascade-select-clear-hover-bg`           | `color-mix( in srgb, var(--uilib-color-primary-600) 12%, transparent )`                                  |
| `--uilib-cascade-select-focus-ring-color`         | `var(--uilib-color-primary-500)`                                                                         |
| `--uilib-cascade-select-focus-ring-width`         | `3px`                                                                                                    |
| `--uilib-cascade-select-level-animation-duration` | `0.18s`                                                                                                  |
| `--uilib-cascade-select-loading-size`             | `1rem`                                                                                                   |
| `--uilib-cascade-select-min-height`               | `var(--uilib-input-min-height, 2.75rem)`                                                                 |
| `--uilib-cascade-select-option-disabled-opacity`  | `0.55`                                                                                                   |
| `--uilib-cascade-select-option-hover-bg`          | `var( --uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600) 8%, transparent) )` |
| `--uilib-cascade-select-option-padding`           | `0.55rem 0.75rem`                                                                                        |
| `--uilib-cascade-select-option-selected-bg`       | `color-mix( in srgb, var(--uilib-color-primary-600) 14%, transparent )`                                  |
| `--uilib-cascade-select-padding-x`                | `calc( var(--uilib-cascade-select-padding-x-base) * var(--uilib-density, 1) )`                           |
| `--uilib-cascade-select-padding-x-base`           | `0.75rem`                                                                                                |
| `--uilib-cascade-select-padding-y`                | `calc( var(--uilib-cascade-select-padding-y-base) * var(--uilib-density, 1) )`                           |
| `--uilib-cascade-select-padding-y-base`           | `0.5rem`                                                                                                 |
| `--uilib-cascade-select-panel-animation-duration` | `0.16s`                                                                                                  |
| `--uilib-cascade-select-panel-bg`                 | `var(--uilib-select-dropdown-bg, var(--uilib-surface))`                                                  |
| `--uilib-cascade-select-panel-border`             | `var(--uilib-cascade-select-border)`                                                                     |
| `--uilib-cascade-select-panel-max-height`         | `16.25rem`                                                                                               |
| `--uilib-cascade-select-panel-min-width`          | `12.5rem`                                                                                                |
| `--uilib-cascade-select-panel-shadow`             | `var( --uilib-select-dropdown-shadow, var(--uilib-shadow-md, none) )`                                    |
| `--uilib-cascade-select-panel-z-index`            | `1000`                                                                                                   |
| `--uilib-cascade-select-placeholder`              | `var(--uilib-input-placeholder, var(--uilib-muted))`                                                     |
| `--uilib-cascade-select-radius`                   | `var(--uilib-input-radius, var(--uilib-shape-base, 0.375rem))`                                           |
| `--uilib-cascade-select-separator-color`          | `color-mix( in srgb, var(--uilib-cascade-select-panel-border) 60%, transparent )`                        |
| `--uilib-cascade-select-submenu-gap`              | `0`                                                                                                      |
| `--uilib-cascade-select-submenu-icon-size`        | `0.75rem`                                                                                                |
| `--uilib-cascade-select-text`                     | `var(--uilib-input-text, var(--uilib-page-fg))`                                                          |
| `--uilib-cascade-select-transition`               | `border-color 0.15s ease, box-shadow 0.15s ease`                                                         |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                            |
| --------------------------------------------------------------------------- |
| ArrowDown and ArrowUp move active option within level                       |
| ArrowDown moves focus to the next option when panel is already open         |
| ArrowDown opens the panel from closed state                                 |
| ArrowLeft closes the current sub-list level                                 |
| ArrowRight expands group and ArrowLeft returns to parent level              |
| ArrowRight moves aria-activedescendant to first sub-item                    |
| ArrowRight opens a sub-list                                                 |
| ArrowUp moves focus to the previous option                                  |
| Enter selects a focused leaf option                                         |
| Enter selects focused leaf option                                           |
| Escape closes panel                                                         |
| Escape closes the panel                                                     |
| Space selects a focused leaf option                                         |
| Tab closes panel                                                            |
| applies aria-label to top level listbox                                     |
| applies generic wrapper focus and filled classes for FloatLabel integration |
| does not set aria-haspopup for leaf options                                 |
| emits groupChange when entering a group                                     |
| forwards ariaLabel and ariaLabelledBy to host attrs                         |
| forwards ariaLabel to host                                                  |
| forwards ariaLabelledBy to host                                             |
| has combobox role                                                           |
| has no aria-activedescendant while closed                                   |
| has no axe violations when closed                                           |
| has no axe violations when open at level 1                                  |
| has no axe violations when open at level 2                                  |
| invalid input applies aria-invalid and class                                |
| keeps aria-activedescendant pointing to an existing option id               |
| keeps aria-controls on the combobox                                         |
| keeps aria-expanded false on parent option before opening child list        |
| nested listbox uses parent label as aria-label                              |
| renders options with role option                                            |
| renders parent options with aria-haspopup listbox                           |
| second ArrowRight opens level 2 sub-list                                    |
| sets aria-activedescendant after ArrowDown navigation                       |
| sets aria-expanded true when open                                           |
| sets aria-haspopup to listbox                                               |
| sets aria-selected true for selected leaf                                   |
| sets parent option aria-expanded true while sub-list is open                |
| shows submenu arrow for groups and no arrow for leaf options                |
| skips disabled options during keyboard navigation                           |
| starts with aria-expanded false                                             |
| updates aria-activedescendant while navigating                              |

## Usage Examples

```html
<!-- two-level cascade (countries -> cities) -->
<ui-lib-cascade-select
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  placeholder="Select a city"
  [(ngModel)]="selectedCity"
/>

<!-- with clear button -->
<ui-lib-cascade-select
  [options]="data"
  [optionGroupChildren]="['children']"
  [showClear]="true"
  [(ngModel)]="value"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#cascade-select)
- [Demo page](/components/cascade-select)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/cascade-select/README.md)

