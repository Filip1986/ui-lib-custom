# CascadeSelect

**Selector:** `ui-lib-cascade-select`
**Entry point:** `import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select'`

---

## Overview

Hierarchical single-value combobox with multi-level flyout columns. Each nesting level maps to an
entry in `[optionGroupChildren]` — unlike PrimeNG where a single field name is reused at every
depth. Suggestions are never filtered internally; the host controls the data tree.

## API

### Inputs

| Name                  | Type                                 | Default     | Description |
| --------------------- | ------------------------------------ | ----------- | ----------- |
| `appendTo`            | `string \| HTMLElement \| undefined` | `'body'`    | Where to mount the detached dropdown panel; `'body'` appends to `document.body`. |
| `ariaLabel`           | `string \| null`                     | `null`      | Sets `aria-label` on the host combobox element. |
| `ariaLabelledBy`      | `string \| null`                     | `null`      | Sets `aria-labelledby` on the host combobox to reference an external label. |
| `disabled`            | `boolean`                            | `false`     | Disables the control; sets `aria-disabled` on the host. |
| `filled`              | `boolean`                            | `false`     | Apply a filled background appearance. |
| `fluid`               | `boolean`                            | `false`     | Stretch the component to fill its container width. |
| `inputId`             | `string`                             | `''`        | Custom `id` for the trigger control (for external `<label for="">` association). |
| `invalid`             | `boolean`                            | `false`     | Applies error border styling and sets `aria-invalid="true"` on the host. |
| `loading`             | `boolean`                            | `false`     | Shows a loading spinner and disables all interaction. |
| `optionDisabled`      | `string \| undefined`               | `undefined` | Field name that, when truthy, marks the option as non-selectable. |
| `optionGroupChildren` | `string[]`                           | `[]`        | Array of field names for children at each nesting level (e.g. `['states', 'cities']`). |
| `optionGroupLabel`    | `string`                             | `'label'`   | Field name used as the display label for group options. |
| `optionLabel`         | `string`                             | `'label'`   | Field name used as the display label for leaf options. |
| `options`             | `unknown[]`                          | `[]`        | Root-level option objects for the first column. |
| `optionValue`         | `string \| undefined`               | `undefined` | Field name whose value is emitted on selection. `undefined` emits the whole option object. |
| `placeholder`         | `string`                             | `'Select'`  | Placeholder text shown when no value is selected. |
| `showClear`           | `boolean`                            | `false`     | Show a clear (×) button when the field has a value. |
| `size`                | `'sm' \| 'md' \| 'lg'`             | `'md'`      | Control height: `'sm'` (36 px) · `'md'` (44 px) · `'lg'` (52 px). |
| `tabindex`            | `number`                             | `0`         | Tab index of the host element. |
| `variant`             | `'material' \| 'bootstrap' \| 'minimal' \| undefined` | `undefined` | Visual style variant; falls back to the global `ThemeConfigService` variant when `undefined`. |

### Outputs

| Name                 | Type                            | Description |
| -------------------- | ------------------------------- | ----------- |
| `cascadeChange`      | `CascadeSelectChangeEvent`      | Leaf option selected. Named `cascadeChange` (not `change`) to avoid shadowing the native DOM `change` event. |
| `cascadeSelectBlur`  | `FocusEvent`                    | Host lost focus. Named `cascadeSelectBlur` (not `blur`) to avoid shadowing the native DOM `blur` event. |
| `cascadeSelectFocus` | `FocusEvent`                    | Host received focus. Named `cascadeSelectFocus` (not `focus`) to avoid shadowing the native DOM `focus` event. |
| `clear`              | `void`                          | Clear (×) button was clicked. |
| `groupChange`        | `CascadeSelectGroupChangeEvent` | User navigated into a sub-group level. |
| `hide`               | `CascadeSelectHideEvent`        | Dropdown panel was closed. |
| `show`               | `CascadeSelectShowEvent`        | Dropdown panel was opened. |

## Content Projection

Templates are projected using attribute directives placed on `<ng-template>` elements inside `<ui-lib-cascade-select>`.

| Directive                              | Selector attribute              | Context                                 | Purpose |
| -------------------------------------- | ------------------------------- | --------------------------------------- | ------- |
| `CascadeSelectOptionDirective`         | `[uiCascadeSelectOption]`       | `$implicit: unknown` (option)           | Custom option row template |
| `CascadeSelectValueDirective`          | `[uiCascadeSelectValue]`        | `$implicit: unknown` (selectedOption)   | Custom selected-value display |
| `CascadeSelectOptionGroupIconDirective`| `[uiCascadeSelectOptionGroupIcon]` | `$implicit: unknown` (groupOption)   | Custom sub-menu chevron icon |
| `CascadeSelectDropdownIconDirective`   | `[uiCascadeSelectDropdownIcon]` | —                                       | Custom dropdown-button icon |
| `CascadeSelectHeaderDirective`         | `[uiCascadeSelectHeader]`       | —                                       | Slot above the option columns |
| `CascadeSelectFooterDirective`         | `[uiCascadeSelectFooter]`       | —                                       | Slot below the option columns |
| `CascadeSelectLoadingDirective`        | `[uiCascadeSelectLoading]`      | —                                       | Custom loading indicator |

```html
<!-- Custom option row showing flag + label -->
<ui-lib-cascade-select [options]="countries" [optionGroupChildren]="['states', 'cities']" [(ngModel)]="value">
  <ng-template [uiCascadeSelectOption] let-opt>
    <span>{{ opt.flag }} {{ opt.name }}</span>
  </ng-template>
</ui-lib-cascade-select>
```

## Theming

| CSS Variable                                        | Default |
| --------------------------------------------------- | ------- |
| `--uilib-cascade-select-focus-ring-color`           | `var(--uilib-color-primary-500)` |
| `--uilib-cascade-select-focus-ring-width`           | `3px` |
| `--uilib-cascade-select-bg`                         | `var(--uilib-input-bg, var(--uilib-surface))` |
| `--uilib-cascade-select-border`                     | `var(--uilib-input-border, var(--uilib-border))` |
| `--uilib-cascade-select-border-focus`               | `var(--uilib-input-border-focus, var(--uilib-color-primary-600))` |
| `--uilib-cascade-select-radius`                     | `var(--uilib-input-radius, var(--uilib-shape-base, 0.375rem))` |
| `--uilib-cascade-select-text`                       | `var(--uilib-input-text, var(--uilib-page-fg))` |
| `--uilib-cascade-select-placeholder`               | `var(--uilib-input-placeholder, var(--uilib-muted))` |
| `--uilib-cascade-select-padding-y-base`            | `0.5rem` |
| `--uilib-cascade-select-padding-x-base`            | `0.75rem` |
| `--uilib-cascade-select-padding-y`                 | `calc(var(--uilib-cascade-select-padding-y-base) * var(--uilib-density, 1))` |
| `--uilib-cascade-select-padding-x`                 | `calc(var(--uilib-cascade-select-padding-x-base) * var(--uilib-density, 1))` |
| `--uilib-cascade-select-min-height`                | `var(--uilib-input-min-height, 2.75rem)` |
| `--uilib-cascade-select-panel-bg`                  | `var(--uilib-select-dropdown-bg, var(--uilib-surface))` |
| `--uilib-cascade-select-panel-border`              | `var(--uilib-cascade-select-border)` |
| `--uilib-cascade-select-panel-shadow`              | `var(--uilib-select-dropdown-shadow, var(--uilib-shadow-md, none))` |
| `--uilib-cascade-select-panel-min-width`           | `12.5rem` |
| `--uilib-cascade-select-panel-max-height`          | `16.25rem` |
| `--uilib-cascade-select-panel-z-index`             | `1000` |
| `--uilib-cascade-select-panel-animation-duration`  | `0.16s` |
| `--uilib-cascade-select-level-animation-duration`  | `0.18s` |
| `--uilib-cascade-select-option-padding`            | `0.55rem 0.75rem` |
| `--uilib-cascade-select-option-hover-bg`           | `color-mix(in srgb, var(--uilib-color-primary-600) 8%, transparent)` |
| `--uilib-cascade-select-option-selected-bg`        | `color-mix(in srgb, var(--uilib-color-primary-600) 14%, transparent)` |
| `--uilib-cascade-select-option-disabled-opacity`   | `0.55` |
| `--uilib-cascade-select-submenu-icon-size`         | `0.75rem` |
| `--uilib-cascade-select-submenu-gap`               | `0` |
| `--uilib-cascade-select-transition`                | `border-color 0.15s ease, box-shadow 0.15s ease` |
| `--uilib-cascade-select-loading-size`              | `1rem` |

## Accessibility

**APG pattern:** [Combobox Pattern (ARIA 1.2)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

### Keyboard Interactions

| Key | Context | Action |
|-----|---------|--------|
| `↓` / `↑` | Trigger focused | Open panel and focus first / last option |
| `↓` / `↑` | Panel open | Move `aria-activedescendant` to next / previous option in current level |
| `→` | Group option focused | Expand group and move focus to first child option |
| `←` | Child level focused | Collapse child list and return focus to parent level |
| `Home` / `End` | Panel open | Jump to first / last enabled option in current level |
| `Enter` / `Space` | Option focused | Select leaf option (or expand focused group) |
| `Escape` / `Tab` | Panel open | Close all panels; return focus to trigger |

### ARIA Wiring

- Host element carries `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- Each visible level is a `<ul role="listbox">` with `aria-label` set to the parent label or placeholder
- Each option is a `<li role="option">` with `aria-selected`, `aria-disabled`
- Group options additionally carry `aria-haspopup="listbox"` and `aria-expanded`
- `aria-activedescendant` always tracks the keyboard-focused option across all levels
- `aria-invalid` propagated from `invalid` input
- `aria-disabled` on host when `disabled` or `loading`

## Usage Examples

```html
<!-- two-level cascade (countries → cities) -->
<ui-lib-cascade-select
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  placeholder="Select a city"
  [(ngModel)]="selectedCity"
/>

<!-- with clear button + custom option template -->
<ui-lib-cascade-select
  [options]="data"
  [optionGroupChildren]="['children']"
  [showClear]="true"
  [(ngModel)]="value"
>
  <ng-template [uiCascadeSelectOption] let-opt>
    <span class="flag">{{ opt.flag }}</span> {{ opt.name }}
  </ng-template>
</ui-lib-cascade-select>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#cascade-select)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/cascade-select/README.md)
