# CascadeSelect

**Selector:** `ui-lib-cascade-select`
**Package:** `ui-lib-custom/cascade-select`
**Content projection:** yes — template directives for option, value, dropdownIcon, optionGroupIcon, header, footer, loading slots

> `optionGroupChildren` must be an array of field-name strings, one per nesting level (e.g. `['states', 'cities']`). This differs from PrimeNG where a single string is used for all levels.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `unknown[]` | `[]` | Root-level option objects |
| `optionLabel` | `string` | `'label'` | Field name for the option display label |
| `optionValue` | `string \| undefined` | `undefined` | Field name for the emitted value; omit to emit the whole object |
| `optionGroupLabel` | `string` | `'label'` | Field name for group display labels |
| `optionGroupChildren` | `string[]` | `[]` | Array of field names for children at each nesting level |
| `optionDisabled` | `string \| undefined` | `undefined` | Field name that marks an option as disabled |
| `placeholder` | `string` | `''` | Placeholder text when nothing is selected; falls back to the `cascade-select.placeholder` locale key (`'Select'`) |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| undefined` | `undefined` | Visual variant; falls back to ThemeConfigService |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `disabled` | `boolean` | `false` | Disable the component |
| `invalid` | `boolean` | `false` | Apply error styling |
| `loading` | `boolean` | `false` | Show loading spinner; disables interaction |
| `showClear` | `boolean` | `false` | Show a clear button when a value is selected |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `filled` | `boolean` | `false` | Filled background appearance |
| `tabindex` | `number` | `0` | Tab index |
| `inputId` | `string` | `''` | Custom `id` for the trigger control |
| `appendTo` | `string \| HTMLElement \| undefined` | `'body'` | Where to mount the dropdown panel |
| `ariaLabel` | `string \| null` | `null` | ARIA label |
| `ariaLabelledBy` | `string \| null` | `null` | ARIA labelledby |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `cascadeChange` | `CascadeSelectChangeEvent` | Leaf option selected. Named `cascadeChange` (not `change`) to avoid shadowing the native DOM `change` event. |
| `groupChange` | `CascadeSelectGroupChangeEvent` | User navigated into a sub-group |
| `show` | `CascadeSelectShowEvent` | Panel opened |
| `hide` | `CascadeSelectHideEvent` | Panel closed |
| `clear` | `void` | Clear button clicked |
| `cascadeSelectFocus` | `FocusEvent` | Component received focus. Named `cascadeSelectFocus` (not `focus`) to avoid shadowing the native DOM `focus` event. |
| `cascadeSelectBlur` | `FocusEvent` | Component lost focus. Named `cascadeSelectBlur` (not `blur`) to avoid shadowing the native DOM `blur` event. |

## Content Projection

Templates are projected using attribute directives placed on `<ng-template>` elements.

| Directive | Selector | Context | Purpose |
|-----------|----------|---------|---------|
| `CascadeSelectOptionDirective` | `[uiCascadeSelectOption]` | `$implicit: unknown` | Custom option row template |
| `CascadeSelectValueDirective` | `[uiCascadeSelectValue]` | `$implicit: unknown` | Custom selected-value display |
| `CascadeSelectOptionGroupIconDirective` | `[uiCascadeSelectOptionGroupIcon]` | `$implicit: unknown` | Custom sub-menu chevron icon |
| `CascadeSelectDropdownIconDirective` | `[uiCascadeSelectDropdownIcon]` | — | Custom dropdown-button icon |
| `CascadeSelectHeaderDirective` | `[uiCascadeSelectHeader]` | — | Slot above the option columns |
| `CascadeSelectFooterDirective` | `[uiCascadeSelectFooter]` | — | Slot below the option columns |
| `CascadeSelectLoadingDirective` | `[uiCascadeSelectLoading]` | — | Custom loading indicator |

## Usage

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

## Hierarchical data model

`CascadeSelect` expects a nested object tree. Root options are passed through `options`, and each
level uses the matching key from `optionGroupChildren`.

```typescript
interface CountryNode {
  name: string;
  code: string;
  states: Array<{
    name: string;
    cities: Array<{ cname: string; code: string }>;
  }>;
}
```

- `optionGroupChildren[0]` resolves the first nested level (`states`)
- `optionGroupChildren[1]` resolves the second nested level (`cities`)
- leaf values are emitted via `optionValue` when configured

## Keyboard navigation

| Key | Behavior |
|---|---|
| `ArrowDown` / `ArrowUp` | Opens panel (if closed) and moves active option within current level |
| `ArrowRight` | Opens the focused group and moves focus to first option in the child list |
| `ArrowLeft` | Closes the current sub-list and moves focus back to parent level |
| `Enter` / `Space` | Selects focused leaf option (or expands focused group) |
| `Escape` / `Tab` | Closes panel |
| `Home` / `End` | Moves focus to first/last enabled option in the current level |

## ARIA pattern

- Trigger host uses `role="combobox"` with `aria-haspopup="listbox"`, `aria-expanded`,
  `aria-controls`, and `aria-activedescendant`.
- Each visible level is rendered as `<ul role="listbox">`.
- Options are rendered as `<li role="option">`.
- Parent options expose `aria-haspopup="listbox"` and `aria-expanded`.
- `aria-activedescendant` always points at the currently keyboard-focused option, including
  nested sub-lists.

## Theming

All visual properties are exposed as CSS custom properties on the host element:

```css
ui-lib-cascade-select {
  --uilib-cascade-select-panel-max-height: 400px;
  --uilib-cascade-select-focus-ring-width: 2px;
}
```

| Token | Default | Description |
|-------|---------|-------------|
| `--uilib-cascade-select-focus-ring-width` | `3px` | Width of the keyboard focus ring |
| `--uilib-cascade-select-padding-y-base` | `0.5rem` | Vertical padding of the trigger control |
| `--uilib-cascade-select-padding-x-base` | `0.75rem` | Horizontal padding of the trigger control |
| `--uilib-cascade-select-panel-min-width` | `12.5rem` | Minimum width of each dropdown panel level |
| `--uilib-cascade-select-panel-max-height` | `16.25rem` | Maximum height of each panel level |
| `--uilib-cascade-select-panel-z-index` | `1000` | Z-index of the dropdown panel |
| `--uilib-cascade-select-option-padding` | `0.55rem 0.75rem` | Padding of each option row |
| `--uilib-cascade-select-option-disabled-opacity` | `0.55` | Opacity of disabled options |
| `--uilib-cascade-select-submenu-icon-size` | `0.75rem` | Size of the sub-menu chevron icon |
| `--uilib-cascade-select-panel-animation-duration` | `0.16s` | Duration of the panel open animation |
| `--uilib-cascade-select-level-animation-duration` | `0.18s` | Duration of a nested level slide-in animation |
| `--uilib-cascade-select-separator-color` | `color-mix(…)` | Color of the border between adjacent option columns |
| `--uilib-cascade-select-clear-hover-bg` | `color-mix(…)` | Background of the clear button on hover |

## Internationalisation

All user-visible strings resolve through `UiLibI18nService`.

| String | Locale key | Default (en) | Input override |
|--------|-----------|--------------|----------------|
| Placeholder text | `cascade-select.placeholder` | `Select` | `[placeholder]` |
| Clear button ARIA label | `cascade-select.clear` | `Clear selection` | — |
| Sub-level listbox label | `cascade-select.sublevel-label` | `Options for {label}` | — |
| Loading text (default slot) | `cascade-select.loading` | `Loading...` | `[loadingTemplate]` |

APG pattern: [Combobox with Listbox Popup](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
