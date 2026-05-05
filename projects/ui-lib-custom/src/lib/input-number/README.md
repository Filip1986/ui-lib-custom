# InputNumber

**Selector:** `uilib-input-number`
**Package:** `ui-lib-custom/input-number`
**Content projection:** no — renders its own `<input>` and spinner buttons inline (template is inline in the component decorator)

> `value` is a `model()` signal — use `[(value)]` for two-way binding in addition to standard `ngModel` / reactive forms. Output names follow the PrimeNG `on*` prefix convention (`onInput`, `onFocus`, etc.) — listen with `(onInput)="..."`.

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
| `ariaLabel` | `string \| undefined` | `undefined` | ARIA label |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | ARIA labelledby |
| `ariaDescribedBy` | `string \| undefined` | `undefined` | ARIA describedby |
| `tabindex` | `number` | `0` | Tab index |
| `autocomplete` | `string` | `'off'` | Native autocomplete attribute |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onInput` | `{ originalEvent: InputEvent; value: number \| null }` | Fired on each input change |
| `onFocus` | `FocusEvent` | Input focused |
| `onBlur` | `FocusEvent` | Input blurred |
| `onKeyDown` | `KeyboardEvent` | Key pressed inside the input |
| `onClear` | `void` | Clear button clicked |

## Usage

```html
<!-- basic decimal input -->
<uilib-input-number [(ngModel)]="price" [min]="0" [maxFractionDigits]="2" />

<!-- currency with spinner buttons -->
<uilib-input-number
  mode="currency"
  currency="USD"
  [showButtons]="true"
  [(value)]="amount"
/>
```
