# InputNumber

**Selector:** `ui-lib-input-number`
**Package:** `ui-lib-custom/input-number`
**Content projection:** no — renders its own `<input>` and spinner buttons via `input-number.component.html`

> `value` is a `model()` signal — use `[(value)]` for two-way binding in addition to standard `ngModel` / reactive forms.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number \| null` | `null` | Two-way bindable via `[(value)]` |
| `mode` | `'decimal' \| 'currency'` | `'decimal'` | Formatting mode |
| `format` | `boolean` | `true` | Apply locale-aware formatting to the display value |
| `locale` | `string \| undefined` | `undefined` | BCP-47 locale tag; defaults to browser locale |
| `currency` | `string \| undefined` | `undefined` | ISO 4217 currency code (used when `mode='currency'`) |
| `currencyDisplay` | `'symbol' \| 'code' \| 'name'` | `'symbol'` | How to render the currency symbol |
| `localeMatcher` | `'best fit' \| 'lookup'` | `'best fit'` | Intl locale-matching algorithm |
| `useGrouping` | `boolean` | `true` | Show thousands separators |
| `minFractionDigits` | `number \| null` | `null` | Minimum decimal digits |
| `maxFractionDigits` | `number \| null` | `null` | Maximum decimal digits |
| `prefix` | `string` | `''` | Text rendered before the input value |
| `suffix` | `string` | `''` | Text rendered after the input value |
| `min` | `number \| null` | `null` | Minimum allowed value |
| `max` | `number \| null` | `null` | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement step for spinner buttons |
| `showButtons` | `boolean` | `false` | Show increment/decrement spinner buttons |
| `buttonLayout` | `'stacked' \| 'horizontal' \| 'vertical'` | `'stacked'` | Spinner button arrangement |
| `showClear` | `boolean` | `false` | Show a clear button when a value is set |
| `placeholder` | `string` | `''` | Input placeholder text |
| `inputId` | `string` | auto-generated | Custom `id` for the inner `<input>` |
| `disabled` | `boolean` | `false` | Disable the component |
| `readonly` | `boolean` | `false` | Make the input read-only |
| `invalid` | `boolean` | `false` | Apply error styling |
| `filled` | `boolean` | `false` | Filled background appearance |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to ThemeConfigService |
| `ariaLabel` | `string \| undefined` | `undefined` | ARIA label on the inner `<input>` |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | ARIA labelledby |
| `ariaDescribedBy` | `string \| undefined` | `undefined` | ARIA describedby |
| `label` | `string \| undefined` | `undefined` | Semantic label used in spinner button aria-labels (e.g. "Increment price") |
| `required` | `boolean` | `false` | Sets `aria-required="true"` on the inner `<input>` |
| `tabindex` | `number` | `0` | Tab index |
| `autocomplete` | `string` | `'off'` | Native autocomplete attribute |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `valueChange` | `{ originalEvent: InputEvent; value: number \| null }` | Fired on each user-driven value change. Named `valueChange` (not `input`) to avoid shadowing the native DOM `input` event. |
| `numberFocus` | `FocusEvent` | Input received focus. Named `numberFocus` (not `focus`) to avoid shadowing the native DOM `focus` event. |
| `numberBlur` | `FocusEvent` | Input lost focus. Named `numberBlur` (not `blur`) to avoid shadowing the native DOM `blur` event. |
| `numberKeyDown` | `KeyboardEvent` | Key pressed inside the input. Named `numberKeyDown` (not `keyDown`) to avoid shadowing the native DOM `keydown` event. |
| `clear` | `void` | Clear button clicked |

## Usage

```html
<!-- basic decimal input -->
<ui-lib-input-number [(ngModel)]="price" [min]="0" [maxFractionDigits]="2" />

<!-- currency with spinner buttons -->
<ui-lib-input-number
  mode="currency"
  currency="USD"
  label="Amount"
  [showButtons]="true"
  [(value)]="amount"
/>
```

## Keyboard Navigation

When the input element is focused:

| Key | Action |
|-----|--------|
| `ArrowUp` | Increment by `step` |
| `ArrowDown` | Decrement by `step` |
| `PageUp` | Increment by `step × 10` |
| `PageDown` | Decrement by `step × 10` |
| `Home` | Jump to `min` (if set) |
| `End` | Jump to `max` (if set) |

Spinner buttons also respond to `Enter` and `Space` when keyboard focused.

## Accessibility

### `aria-valuetext` for formatted values

`aria-valuenow` always contains the raw number, while `aria-valuetext` mirrors the
human-readable display value so that screen readers announce the formatted string:

| Format | Raw `aria-valuenow` | `aria-valuetext` example |
|--------|---------------------|--------------------------|
| decimal | `1500` | `"1,500"` |
| currency USD | `1500` | `"$1,500.00"` |
| percent suffix | `75` | `"75%"` |
| custom suffix | `22` | `"22 °C"` |

When no value is set, `aria-valuetext` is omitted (null), which prevents screen readers
from announcing an empty string.

### Spinner button labels

The `label` input is used to compose descriptive `aria-label` values for the spinner
buttons, making them more informative to screen reader users:

```html
<!-- produces: "Increment price" / "Decrement price" -->
<ui-lib-input-number label="price" [showButtons]="true" [(value)]="amount" />
```

When `label` is not set, the buttons fall back to `"Increment value"` / `"Decrement value"`.

### `aria-disabled` on spinner buttons

Spinner buttons use `aria-disabled="true"` (not the HTML `disabled` attribute) when at
min or max. This keeps them in the tab sequence while communicating unavailability to
assistive technology.
