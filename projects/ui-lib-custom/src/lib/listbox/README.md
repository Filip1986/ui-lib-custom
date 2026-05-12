# Listbox

**Selector:** `ui-lib-listbox`  
**Package:** `ui-lib-custom/listbox`  
**Content projection:** yes — `#itemTemplate`, `#groupTemplate`, `#emptyTemplate`, `#emptyFilterTemplate`

> Custom templates use Angular template reference variables (`<ng-template #itemTemplate let-ctx>`) rather than attribute directives.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `unknown[]` | `[]` | Array of option objects |
| `optionLabel` | `string` | `'label'` | Field name for display label |
| `optionValue` | `string` | `'value'` | Field name for emitted value |
| `optionDisabled` | `string` | `'disabled'` | Field name for disabled state |
| `optionGroupLabel` | `string` | `'label'` | Field name for group header label |
| `optionGroupChildren` | `string` | `'items'` | Field name for group children |
| `group` | `boolean` | `false` | Treats `options` as grouped data |
| `multiple` | `boolean` | `false` | Enables multi-select |
| `filter` | `boolean` | `false` | Shows filter input |
| `filterBy` | `string` | `''` | Field used for filter matching |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | Filter strategy |
| `filterPlaceholder` | `string` | `'Search...'` | Filter placeholder |
| `filterValue` | `string` | `''` | Two-way bindable via `[(filterValue)]` |
| `emptyMessage` | `string` | `'No items found.'` | Empty-state message |
| `emptyFilterMessage` | `string` | `'No results match your filter.'` | Empty filtered-state message |
| `scrollHeight` | `string` | `'200px'` | Max height of scroll container |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `readonly` | `boolean` | `false` | Prevents value changes |
| `showToggleAll` | `boolean` | `false` | Shows select-all checkbox header in multi mode |
| `checkbox` | `boolean` | `false` | Shows checkbox marker per row in multi mode |
| `striped` | `boolean` | `false` | Alternate row styling |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Uses ThemeConfigService when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Density preset |
| `ariaLabel` | `string` | `''` | Accessible name for listbox |
| `ariaLabelledBy` | `string` | `''` | External labelling element id |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `selectionChange` | `ListboxChangeEvent` | Emits on select/deselect |
| `filterChange` | `ListboxFilterEvent` | Emits on filter input |

## ARIA behavior

| Element | ARIA |
|---------|------|
| List container | `role="listbox"`, `aria-multiselectable`, `aria-label`/`aria-labelledby`, `aria-activedescendant`, `aria-disabled`, `aria-readonly` |
| Option row | `role="option"`, `aria-selected`, `aria-disabled`, `aria-setsize`, `aria-posinset` |
| Group header | `role="presentation"`, `aria-hidden="true"` |
| Select-all checkbox | Native checkbox with `aria-label="Select all options"` |
| Live region | `aria-live="polite"`, `aria-atomic="true"` for filter/selection announcements |
| Decorative icons | `aria-hidden="true"`, `focusable="false"` |

## Keyboard interactions

| Key | Behavior |
|-----|----------|
| `ArrowDown` | Moves focus to next enabled option |
| `ArrowUp` | Moves focus to previous enabled option |
| `Home` | Moves focus to first enabled option |
| `End` | Moves focus to last enabled option |
| `Enter` / `Space` | Selects or toggles the focused option |
| `Tab` | Leaves the listbox (native browser behavior) |

## CSS Custom Properties

| Variable | Purpose |
|----------|---------|
| `--uilib-listbox-bg` | Surface background |
| `--uilib-listbox-border` | Outer border |
| `--uilib-listbox-border-radius` | Outer radius |
| `--uilib-listbox-focus-ring` | Focus ring on list container |
| `--uilib-listbox-filter-focus-ring` | Focus ring on filter input |
| `--uilib-listbox-item-bg-hover` | Hover background |
| `--uilib-listbox-item-bg-focused` | Keyboard focus row background |
| `--uilib-listbox-item-bg-selected` | Selected row background |
| `--uilib-listbox-item-color-selected` | Selected row foreground |
| `--uilib-listbox-checkbox-size` | Checkbox marker size |
| `--uilib-listbox-transition` | Item/checkbox transition timing |

## Usage

```html
<ui-lib-listbox [options]="cities" optionLabel="name" [(ngModel)]="selectedCity" />

<ui-lib-listbox
  [options]="cities"
  optionLabel="name"
  [multiple]="true"
  [filter]="true"
  [checkbox]="true"
  [showToggleAll]="true"
  [(ngModel)]="selectedCities"
/>
```

## Accessibility notes

- Every instance generates unique ids for listbox and option elements.
- Keyboard focus is managed with `aria-activedescendant`.
- Reduced-motion users get transition-free row and checkbox updates.
- Custom templates should keep option text meaningful so announcements remain clear.
