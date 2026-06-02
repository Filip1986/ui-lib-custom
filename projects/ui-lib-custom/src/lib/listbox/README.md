# Listbox

**Selector:** `ui-lib-listbox`  
**Package:** `ui-lib-custom/listbox`  
**Content projection:** yes — template reference variables queried via `@ContentChild`

| Template ref           | Replaces                                  | Context                                                               |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| `#itemTemplate`        | Option row content                        | `{ $implicit: ListboxOptionRow, selected: boolean, option: unknown }` |
| `#groupTemplate`       | Group header content                      | `{ $implicit: unknown, label: string }`                               |
| `#emptyTemplate`       | Empty-state cell (no options)             | none                                                                  |
| `#emptyFilterTemplate` | Empty-state cell (filter matched nothing) | none                                                                  |

> `$implicit` in `#itemTemplate` is a `ListboxOptionRow` which carries `label`, `value`, `disabled`, `optionIndex`, and `option` (the raw object from the consumer's `options` array). Use `option` to access all original option properties in your template.

## Inputs

| Name                  | Type                                                   | Default       | Notes                                                                               |
| --------------------- | ------------------------------------------------------ | ------------- | ----------------------------------------------------------------------------------- |
| `options`             | `unknown[]`                                            | `[]`          | Array of option objects                                                             |
| `optionLabel`         | `string`                                               | `'label'`     | Field name for display label                                                        |
| `optionValue`         | `string`                                               | `'value'`     | Field name for emitted value                                                        |
| `optionDisabled`      | `string`                                               | `'disabled'`  | Field name for disabled state                                                       |
| `optionGroupLabel`    | `string`                                               | `'label'`     | Field name for group header label                                                   |
| `optionGroupChildren` | `string`                                               | `'items'`     | Field name for group children                                                       |
| `group`               | `boolean`                                              | `false`       | Treats `options` as grouped data                                                    |
| `multiple`            | `boolean`                                              | `false`       | Enables multi-select                                                                |
| `filter`              | `boolean`                                              | `false`       | Shows filter input                                                                  |
| `filterBy`            | `string`                                               | `''`          | Field used for filter matching                                                      |
| `filterMatchMode`     | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'`  | Filter strategy                                                                     |
| `filterPlaceholder`   | `string`                                               | `'Search...'` | Filter placeholder                                                                  |
| `filterValue`         | `string`                                               | `''`          | Two-way bindable via `[(filterValue)]`                                              |
| `emptyMessage`        | `string \| null`                                       | `null`        | Empty-state message; uses the i18n `listbox.empty` string when null                 |
| `emptyFilterMessage`  | `string \| null`                                       | `null`        | Empty filtered-state message; uses the i18n `listbox.empty.filter` string when null |
| `scrollHeight`        | `string`                                               | `'200px'`     | Max height of scroll container                                                      |
| `disabled`            | `boolean`                                              | `false`       | Disables all interaction                                                            |
| `readonly`            | `boolean`                                              | `false`       | Prevents value changes                                                              |
| `showToggleAll`       | `boolean`                                              | `false`       | Shows select-all checkbox header in multi mode                                      |
| `checkbox`            | `boolean`                                              | `false`       | Shows checkbox marker per row in multi mode                                         |
| `striped`             | `boolean`                                              | `false`       | Alternate row styling                                                               |
| `variant`             | `'material' \| 'bootstrap' \| 'minimal' \| null`       | `null`        | Uses ThemeConfigService when null                                                   |
| `size`                | `'sm' \| 'md' \| 'lg'`                                 | `'md'`        | Density preset                                                                      |
| `ariaLabel`           | `string \| null`                                       | `null`        | Accessible name for listbox; uses the i18n `listbox.label` string when null         |
| `ariaLabelledBy`      | `string \| null`                                       | `null`        | External labelling element id                                                       |

## Outputs

| Name              | Payload              | Notes                    |
| ----------------- | -------------------- | ------------------------ |
| `selectionChange` | `ListboxChangeEvent` | Emits on select/deselect |
| `filterChange`    | `ListboxFilterEvent` | Emits on filter input    |

## ARIA behavior

| Element             | ARIA                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| List container      | `role="listbox"`, `aria-multiselectable`, `aria-label`/`aria-labelledby`, `aria-activedescendant`, `aria-disabled`, `aria-readonly` |
| Option row          | `role="option"`, `aria-selected`, `aria-disabled`, `aria-setsize`, `aria-posinset`                                                  |
| Group header        | `role="presentation"`, `aria-hidden="true"`                                                                                         |
| Select-all checkbox | Native checkbox with `aria-label="Select all options"`                                                                              |
| Live region         | `aria-live="polite"`, `aria-atomic="true"` for filter/selection announcements                                                       |
| Decorative icons    | `aria-hidden="true"`, `focusable="false"`                                                                                           |

## Keyboard interactions

| Key               | Behavior                                     |
| ----------------- | -------------------------------------------- |
| `ArrowDown`       | Moves focus to next enabled option           |
| `ArrowUp`         | Moves focus to previous enabled option       |
| `Home`            | Moves focus to first enabled option          |
| `End`             | Moves focus to last enabled option           |
| `Enter` / `Space` | Selects or toggles the focused option        |
| `Tab`             | Leaves the listbox (native browser behavior) |

## CSS Custom Properties

| Variable                                 | Default                                                                                                     | Purpose                                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `--uilib-listbox-bg`                     | `var(--uilib-surface-color, #fff)`                                                                          | Surface background                                                |
| `--uilib-listbox-border`                 | `1px solid var(--uilib-border-color, #dee2e6)`                                                              | Outer border                                                      |
| `--uilib-listbox-border-radius`          | `var(--uilib-border-radius, 6px)`                                                                           | Outer corner radius                                               |
| `--uilib-listbox-shadow`                 | `none`                                                                                                      | Outer box shadow                                                  |
| `--uilib-listbox-focus-ring`             | `0 0 0 2px var(--uilib-primary-color, #3b82f6)`                                                             | Focus ring on list container                                      |
| `--uilib-listbox-filter-focus-ring`      | `0 0 0 2px var(--uilib-primary-color, #3b82f6)`                                                             | Focus ring on filter input                                        |
| `--uilib-listbox-item-padding`           | `0.5rem 0.875rem`                                                                                           | Option row padding (md size)                                      |
| `--uilib-listbox-item-bg-hover`          | `rgba(0,0,0,0.04)`                                                                                          | Hover row background                                              |
| `--uilib-listbox-item-bg-focused`        | `rgba(0,0,0,0.06)`                                                                                          | Keyboard-focused row background                                   |
| `--uilib-listbox-item-bg-selected`       | `var(--uilib-primary-color, #3b82f6)`                                                                       | Selected row background                                           |
| `--uilib-listbox-item-color-selected`    | `#ffffff`                                                                                                   | Selected row text colour                                          |
| `--uilib-listbox-item-border-radius`     | `0`                                                                                                         | Option row corner radius                                          |
| `--uilib-listbox-checkbox-size`          | `1rem`                                                                                                      | Checkbox marker size                                              |
| `--uilib-listbox-checkbox-border-radius` | `3px`                                                                                                       | Checkbox corner radius                                            |
| `--uilib-listbox-group-color`            | `var(--uilib-text-muted-color, #6c757d)`                                                                    | Group header text colour                                          |
| `--uilib-listbox-empty-color`            | `var(--uilib-text-muted-color, #6c757d)`                                                                    | Empty-state text colour                                           |
| `--uilib-listbox-transition`             | `background-color var(--uilib-transition-fast, 150ms ease), color var(--uilib-transition-fast, 150ms ease)` | Item/checkbox transition; auto-zeroed by `prefers-reduced-motion` |

## Usage

```html
<!-- Simple single selection -->
<ui-lib-listbox [options]="cities" optionLabel="name" [(ngModel)]="selectedCity" />

<!-- Multi-select with filter, checkboxes, and select-all toggle -->
<ui-lib-listbox
  [options]="cities"
  optionLabel="name"
  [multiple]="true"
  [filter]="true"
  [checkbox]="true"
  [showToggleAll]="true"
  [(ngModel)]="selectedCities"
/>

<!-- Custom item template — access the raw option via `option` or via `$implicit.option` -->
<ui-lib-listbox [options]="products" optionLabel="name" optionValue="id" [(ngModel)]="selectedId">
  <ng-template #itemTemplate let-row let-selected="selected" let-raw="option">
    <span class="icon {{ raw.icon }}"></span>
    <span>{{ row.label }}</span>
    <span class="price">{{ raw.price | currency }}</span>
    @if (selected) { <span class="badge">✓</span> }
  </ng-template>
</ui-lib-listbox>

<!-- Grouped options with custom group header -->
<ui-lib-listbox
  [options]="groupedCities"
  [group]="true"
  optionLabel="name"
  [(ngModel)]="selectedCity"
>
  <ng-template #groupTemplate let-group let-label="label">
    <strong>{{ label }}</strong> ({{ group.$implicit?.items?.length }} cities)
  </ng-template>
</ui-lib-listbox>
```

## Accessibility notes

- Every instance generates unique ids for listbox and option elements.
- Keyboard focus is managed with `aria-activedescendant`.
- Reduced-motion users get transition-free row and checkbox updates.
- Custom templates should keep option text meaningful so announcements remain clear.
