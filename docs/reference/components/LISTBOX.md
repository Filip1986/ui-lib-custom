# Listbox

A scrollable list of options with single or multiple selection, inline filtering,
option groups, checkbox mode, and full keyboard navigation.
Implements `ControlValueAccessor` for `ngModel` and reactive-form integration.

---

## Import

```ts
import { ListboxComponent } from 'ui-lib-custom/listbox';
```

---

## Basic Usage

```html
<ui-lib-listbox [options]="cities" [(ngModel)]="selectedCity" />
```

---

## API

### Inputs

| Input                  | Type                                                      | Default           | Description |
|------------------------|-----------------------------------------------------------|-------------------|-------------|
| `options`              | `unknown[]`                                               | `[]`              | Array of option objects. |
| `optionLabel`          | `string`                                                  | `'label'`          | Field name used as the display label. |
| `optionValue`          | `string`                                                  | `'value'`          | Field name used to extract the value. |
| `optionDisabled`       | `string`                                                  | `'disabled'`       | Field name that marks an option as disabled. |
| `optionGroupLabel`     | `string`                                                  | `'label'`          | Field name for the group header label (when `group=true`). |
| `optionGroupChildren`  | `string`                                                  | `'items'`          | Field name for the children array inside a group. |
| `group`                | `boolean`                                                 | `false`           | Treat `options` as a grouped list. |
| `multiple`             | `boolean`                                                 | `false`           | Allow selecting multiple options. |
| `filter`               | `boolean`                                                 | `false`           | Show a filter input above the list. |
| `filterBy`             | `string`                                                  | `''` (= optionLabel) | Field to filter against. |
| `filterMatchMode`      | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'`       | Filter matching strategy. |
| `filterPlaceholder`    | `string`                                                  | `'Search...'`      | Placeholder for the filter input. |
| `filterValue`          | `string` *(two-way)*                                      | `''`              | Current filter query (supports `[(filterValue)]`). |
| `emptyMessage`         | `string`                                                  | `'No items found.'` | Message when the options list is empty. |
| `emptyFilterMessage`   | `string`                                                  | `'No results match your filter.'` | Message when the filter yields no results. |
| `scrollHeight`         | `string`                                                  | `'200px'`          | Max height of the scrollable list container (any valid CSS length). |
| `disabled`             | `boolean`                                                 | `false`           | Disables all interaction. |
| `readonly`             | `boolean`                                                 | `false`           | Prevents value changes without greying out the component. |
| `showToggleAll`        | `boolean`                                                 | `false`           | Show a "Select all" checkbox in the header (requires `multiple=true`). |
| `checkbox`             | `boolean`                                                 | `false`           | Render a checkbox beside each item (requires `multiple=true`). |
| `striped`              | `boolean`                                                 | `false`           | Apply alternating row background tint. |
| `variant`              | `'material' \| 'bootstrap' \| 'minimal' \| null`       | `null` (→ global) | Visual design variant. Falls back to `ThemeConfigService.variant()`. |
| `size`                 | `'sm' \| 'md' \| 'lg'`                                  | `'md'`             | Size token controlling padding and font size. |
| `ariaLabel`            | `string`                                                  | `''`              | Accessible label for the `role="listbox"` element. |
| `ariaLabelledBy`       | `string`                                                  | `''`              | ID of an external element that labels this listbox. |

### Outputs

| Output            | Payload                 | Description |
|-------------------|-------------------------|-------------|
| `selectionChange` | `ListboxChangeEvent`    | Emitted when the selected value(s) change. |
| `filterChange`    | `ListboxFilterEvent`    | Emitted when the filter query changes. |

### Content Templates

| Template ref        | Context type           | Description |
|---------------------|------------------------|-------------|
| `#itemTemplate`     | `ListboxItemContext`   | Custom template for each option row. |
| `#groupTemplate`    | `ListboxGroupContext`  | Custom template for group header rows. |
| `#emptyTemplate`    | `void`                 | Custom content when the list is empty. |
| `#emptyFilterTemplate` | `void`             | Custom content when the filter yields no results. |

---

## Custom Item Template

```html
<ui-lib-listbox [options]="countries" [(ngModel)]="selected">
  <ng-template #itemTemplate let-item [let-selected]="selected">
    <span class="flag flag-{{ item.value }}"></span>
    <span>{{ item.label }}</span>
    @if (selected) { <span class="check">✓</span> }
  </ng-template>
</ui-lib-listbox>
```

---

## Grouped Options

```ts
groupedCities = [
  {
    label: 'Germany',
    items: [
      { label: 'Berlin', value: 'berlin' },
      { label: 'Munich', value: 'munich' },
    ],
  },
  {
    label: 'France',
    items: [
      { label: 'Paris', value: 'paris' },
    ],
  },
];
```

```html
<ui-lib-listbox
  [options]="groupedCities"
  [group]="true"
  optionGroupLabel="label"
  optionGroupChildren="items"
  [(ngModel)]="selectedCity"
/>
```

---

## Multiple + Checkbox + Toggle All

```html
<ui-lib-listbox
  [options]="items"
  [multiple]="true"
  [checkbox]="true"
  [showToggleAll]="true"
  [(ngModel)]="selectedItems"
/>
```

---

## Reactive Forms

```html
<form [formGroup]="form">
  <ui-lib-listbox [options]="cities" formControlName="city" />
</form>
```

---

## Theming

All visual tokens are exposed as CSS custom properties on `.ui-lib-listbox`.
Override any token on the host element or a parent scope:

```css
ui-lib-listbox {
  --uilib-listbox-item-bg-selected: #7c3aed;
  --uilib-listbox-item-color-selected: #fff;
  --uilib-listbox-border-radius: 8px;
  --uilib-listbox-item-padding: 0.75rem 1rem;
}
```

### Key CSS Variables

| Variable                             | Default                          | Description |
|--------------------------------------|----------------------------------|-------------|
| `--uilib-listbox-bg`                 | `var(--uilib-surface-color)`     | List background. |
| `--uilib-listbox-border`             | `1px solid var(--uilib-border-color)` | Outer border. |
| `--uilib-listbox-border-radius`      | `var(--uilib-border-radius)`     | Corner radius. |
| `--uilib-listbox-item-padding`       | `0.5rem 0.875rem`                | Option row padding (overridden by size tokens). |
| `--uilib-listbox-item-bg-selected`   | `var(--uilib-primary-color)`     | Selected item background. |
| `--uilib-listbox-item-color-selected` | `#ffffff`                       | Selected item text color. |
| `--uilib-listbox-item-bg-hover`      | `var(--uilib-hover-bg)`          | Hovered item background. |
| `--uilib-listbox-item-bg-focused`    | `var(--uilib-hover-bg)`          | Keyboard-focused item background. |
| `--uilib-listbox-focus-ring`         | `0 0 0 2px var(--uilib-primary-color)` | Focus ring on the list container. |
| `--uilib-listbox-item-font-size`     | `0.875rem`                       | Option text size. |
| `--uilib-listbox-item-bg-striped`    | `var(--uilib-surface-color-alt)` | Even-row tint when `striped=true`. |

---

## Accessibility

- The scrollable container has `role="listbox"` with `aria-multiselectable` in multiple mode.
- Each option has `role="option"`, `aria-selected`, `aria-disabled`, `aria-posinset`, and `aria-setsize`.
- `aria-activedescendant` on the list tracks the keyboard-focused option.
- `aria-label` / `aria-labelledby` are forwarded from inputs.
- The filter input has `role="searchbox"` and `aria-label="Filter options"`.
- The toggle-all checkbox has `aria-label="Select all options"`.

### Keyboard

| Key          | Action |
|--------------|--------|
| `ArrowDown`  | Move focus to next option (skips disabled). |
| `ArrowUp`    | Move focus to previous option (skips disabled). |
| `Home`       | Move focus to first non-disabled option. |
| `End`        | Move focus to last non-disabled option. |
| `Enter`      | Select / deselect the focused option. |
| `Space`      | Select / deselect the focused option. |
| `Tab`        | Move focus out of the listbox. |
