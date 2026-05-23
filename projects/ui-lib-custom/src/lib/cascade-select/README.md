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
| `placeholder` | `string` | `''` | Placeholder text when nothing is selected |
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
| `change` | `CascadeSelectChangeEvent` | Leaf option selected |
| `groupChange` | `CascadeSelectGroupChangeEvent` | User navigated into a sub-group |
| `show` | `CascadeSelectShowEvent` | Panel opened |
| `hide` | `CascadeSelectHideEvent` | Panel closed |
| `clear` | `void` | Clear button clicked |
| `focus` | `FocusEvent` | Component focused |
| `blur` | `FocusEvent` | Component blurred |

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
