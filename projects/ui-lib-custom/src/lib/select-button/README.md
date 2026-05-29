# SelectButton

**Selector:** `ui-lib-select-button`
**Package:** `ui-lib-custom/select-button`
**Content projection:** yes — project `<ng-template #item let-option>` to customise each button's content

> By default, clicking an already-selected option in single-select mode re-selects it (selection is not cleared). Set `[allowEmpty]="true"` to allow deselection. The `value` input is a one-way binding for externally controlling the selection; for full form integration use `ngModel` / reactive forms via CVA.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `options` | `SelectButtonOption[]` | `[]` | Array of option objects |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `value` | `SelectButtonValue \| SelectButtonValue[] \| null` | `null` | One-way controlled value; use ngModel for two-way binding |
| `optionLabel` | `string` | `'label'` | Field name used to read the display label from each option object |
| `optionValue` | `string` | `'value'` | Field name used to read the value from each option object |
| `optionDisabled` | `string` | `'disabled'` | Field name used to read the disabled state from each option object |
| `multiple` | `boolean` | `false` | Allows selecting multiple options |
| `allowEmpty` | `boolean` | `false` | When true, clicking a selected option deselects it |
| `size` | `'sm' \| 'md' \| 'lg' \| 'small' \| 'medium' \| 'large'` | `'md'` | |
| `disabled` | `boolean` | `false` | |
| `invalid` | `boolean` | `false` | |
| `fluid` | `boolean` | `false` | Buttons stretch to fill the container |
| `ariaLabel` | `string \| null` | `null` | Accessible name for the button group. **Required** unless `ariaLabelledBy` is provided. Defaults to `'Select options'` when neither is set. |
| `ariaLabelledBy` | `string \| null` | `null` | ID of an external label element. When set, `aria-label` is suppressed. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `selectionChange` | `SelectButtonChangeEvent` | `{ value: SelectButtonValue \| SelectButtonValue[], originalEvent: Event }` |
| `valueChange` | `SelectButtonValue \| SelectButtonValue[] \| null` | Emits the new value alongside `selectionChange` |

## Usage

```html
<!-- minimal example -->
<ui-lib-select-button [options]="sizeOptions" ariaLabel="Size" [(ngModel)]="selectedSize" />

<!-- custom item template, multiple selection -->
<ui-lib-select-button [options]="tagOptions" [multiple]="true" ariaLabel="Formatting" [(ngModel)]="selectedTags">
  <ng-template #item let-option>{{ option.label }}</ng-template>
</ui-lib-select-button>

<!-- external label -->
<label id="view-label">View mode</label>
<ui-lib-select-button [options]="viewOptions" ariaLabelledBy="view-label" [(ngModel)]="viewMode" />
```

## Accessibility

### ARIA Pattern

The component adapts its ARIA role based on the `multiple` input:

| Mode | Host role | Button role | State attribute |
|------|-----------|-------------|-----------------|
| Single-select (`multiple=false`) | `radiogroup` | `radio` | `aria-checked` |
| Multi-select (`multiple=true`) | `group` | `checkbox` | `aria-checked` |

> **Important:** Always provide an accessible group name via `ariaLabel` or `ariaLabelledBy`.
> Omitting both will fall back to the generic label `'Select options'`, which may not convey
> meaningful context to screen-reader users.

### Keyboard Interaction

| Key | Behaviour |
|-----|-----------|
| `Tab` / `Shift+Tab` | Move focus to / away from the button group (single tab stop via roving tabindex) |
| `ArrowRight` / `ArrowDown` | Move focus to the next enabled option (wraps) |
| `ArrowLeft` / `ArrowUp` | Move focus to the previous enabled option (wraps) |
| `Home` | Move focus to the first enabled option |
| `End` | Move focus to the last enabled option |
| `Space` / `Enter` | Toggle the focused option |

### ARIA Attributes

| Attribute | Applied to | Value |
|-----------|-----------|-------|
| `role="radiogroup"` | Host | Single-select mode |
| `role="group"` | Host | Multi-select mode |
| `aria-label` | Host | Value of `ariaLabel` input (suppressed when `ariaLabelledBy` is set) |
| `aria-labelledby` | Host | Value of `ariaLabelledBy` input |
| `aria-disabled="true"` | Host | When `[disabled]="true"` |
| `aria-invalid="true"` | Host | When `[invalid]="true"` |
| `role="radio"` | Button | Single-select mode |
| `role="checkbox"` | Button | Multi-select mode |
| `aria-checked="true/false"` | Button | Reflects selection state |
| `aria-disabled="true"` | Button | When the option has `disabled: true` |
| `tabindex="0"` | Button | The active (focused or selected) button |
| `tabindex="-1"` | Button | All other buttons (roving tabindex) |

## CSS Custom Properties

| Token | Default | Notes |
|-------|---------|-------|
| `--uilib-select-button-gap` | `0` | Gap between buttons |
| `--uilib-select-button-border-radius` | `var(--uilib-shape-base, 6px)` | Outer corner radius |
| `--uilib-select-button-bg` | `var(--uilib-surface-100)` | Default button background |
| `--uilib-select-button-border` | `var(--uilib-border)` | Default button border |
| `--uilib-select-button-fg` | `var(--uilib-page-fg)` | Default button foreground |
| `--uilib-select-button-hover-bg` | `var(--uilib-surface-200)` | Button background on hover |
| `--uilib-select-button-selected-bg` | `var(--uilib-color-primary-500)` | Selected button background |
| `--uilib-select-button-selected-fg` | `var(--uilib-color-neutral-50)` | Selected button foreground |
| `--uilib-select-button-shadow` | `none` | Button shadow |
| `--uilib-select-button-disabled-opacity` | `0.6` | Opacity when disabled |
| `--uilib-select-button-invalid-border` | `var(--uilib-color-danger-600)` | Border when invalid |

## Internationalisation

This component contains no translatable strings — all visible text is supplied by the consumer via inputs or content projection. No UiLibI18nService integration is needed.
