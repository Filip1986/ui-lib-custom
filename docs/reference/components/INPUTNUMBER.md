# InputNumber

Locale-aware numeric input with built-in parsing/formatting, spinner buttons, clear action, and Angular forms support.

---

## Overview

`InputNumber` is used when users must enter or adjust numeric values while preserving formatting rules (locale separators, currency formatting, prefixes/suffixes, bounds, and keyboard increments).

Use it for:
- Money and pricing fields
- Quantities and counters
- Percentages and metric values
- Settings with min/max constraints and step increments

---

## Import

```ts
import { InputNumberComponent } from 'ui-lib-custom/input-number';
```

---

## Basic Usage

```html
<uilib-input-number [(ngModel)]="amount" placeholder="Enter amount" />
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---:|---|
| `mode` | `'decimal' \| 'currency'` | `'decimal'` | Formatting mode. |
| `format` | `boolean` | `true` | Enables formatter output; when `false`, raw numeric text is shown (still parsed). |
| `locale` | `string \| undefined` | `undefined` | Locale for formatting/parsing separators. |
| `currency` | `string \| undefined` | `undefined` | ISO currency code (required for currency mode). |
| `currencyDisplay` | `'symbol' \| 'code' \| 'name' \| 'narrowSymbol'` | `'symbol'` | Currency token style forwarded to `Intl.NumberFormat`. |
| `localeMatcher` | `'best fit' \| 'lookup'` | `'best fit'` | Locale matching strategy forwarded to `Intl.NumberFormat`. |
| `useGrouping` | `boolean` | `true` | Enables thousands grouping separators. |
| `minFractionDigits` | `number \| null` | `null` | Minimum fractional digits in display. |
| `maxFractionDigits` | `number \| null` | `null` | Maximum fractional digits in display. |
| `prefix` | `string` | `''` | Text prepended to display value. |
| `suffix` | `string` | `''` | Text appended to display value. |
| `min` | `number \| null` | `null` | Lower bound; values clamp on input/spin/keyboard. |
| `max` | `number \| null` | `null` | Upper bound; values clamp on input/spin/keyboard. |
| `step` | `number` | `1` | Increment/decrement step size. |
| `showButtons` | `boolean` | `false` | Shows spinner controls. |
| `buttonLayout` | `'stacked' \| 'horizontal' \| 'vertical'` | `'stacked'` | Spinner button layout style. |
| `showClear` | `boolean` | `false` | Shows clear button when value exists and control is enabled. |
| `placeholder` | `string` | `''` | Native input placeholder. |
| `inputId` | `string` | auto-generated | Input id used for labels/ARIA linkage. |
| `disabled` | `boolean` | `false` | Component disabled state. |
| `readonly` | `boolean` | `false` | Prevents edits/spin actions while keeping focusability. |
| `invalid` | `boolean` | `false` | Applies invalid visual state class. |
| `filled` | `boolean` | `false` | Forces filled appearance state. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size scale. |
| `fluid` | `boolean` | `false` | Expands host to full width. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Explicit variant override; `null` uses global theme variant. |
| `ariaLabel` | `string \| undefined` | `undefined` | Sets `aria-label`. |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Sets `aria-labelledby`. |
| `ariaDescribedBy` | `string \| undefined` | `undefined` | Sets `aria-describedby`. |
| `tabindex` | `number` | `0` | Input tab order. |
| `autocomplete` | `string` | `'off'` | Native autocomplete behavior. |

### Model / CVA

| API | Type | Description |
|---|---|---|
| `value` | `number \| null` | Primary model signal, supports `[(value)]` and CVA integration. |
| `writeValue` | `(value: number \| null) => void` | CVA write hook. |
| `setDisabledState` | `(isDisabled: boolean) => void` | CVA disabled hook. |

### Outputs

| Output | Payload | Description |
|---|---|---|
| `onInput` | `{ originalEvent: InputEvent; value: number \| null }` | Fires on typed input parsing. |
| `onFocus` | `FocusEvent` | Fires on input focus. |
| `onBlur` | `FocusEvent` | Fires on blur after normalization/touched. |
| `onKeyDown` | `KeyboardEvent` | Fires on keydown (including blocked keys). |
| `onClear` | `void` | Fires when clear action resets value. |

---

## Formatting

Use decimal/currency modes and locale controls to match regional expectations.

```html
<uilib-input-number [(ngModel)]="amount" mode="currency" currency="EUR" locale="de-DE" />
<uilib-input-number [(ngModel)]="ratio" [minFractionDigits]="2" [maxFractionDigits]="4" />
<uilib-input-number [(ngModel)]="distance" [useGrouping]="false" suffix=" km" />
```

Behavior notes:
- Parsing accepts locale decimal/group separators.
- Prefix/suffix are ignored for numeric parsing and re-applied on format.
- Empty text or non-parsable value resolves to `null`.

---

## Spinner Buttons

Enable steppers with `showButtons` and choose one of three layouts.

```html
<uilib-input-number [(ngModel)]="qty" [showButtons]="true" buttonLayout="stacked" />
<uilib-input-number [(ngModel)]="qty" [showButtons]="true" buttonLayout="horizontal" />
<uilib-input-number [(ngModel)]="qty" [showButtons]="true" buttonLayout="vertical" />
```

- Hold mouse down to repeat (after short delay).
- `step` controls each increment/decrement amount.
- Button disabled state auto-reflects boundaries.

---

## Min/Max Boundaries

`min`/`max` clamp values for typed input, keyboard actions, and spinner actions.

```html
<uilib-input-number [(ngModel)]="score" [min]="0" [max]="100" [showButtons]="true" />
```

- Values above `max` normalize to `max`.
- Values below `min` normalize to `min`.
- Home/End keyboard shortcuts jump to min/max when configured.

---

## Form Integration

### Template-Driven

```html
<uilib-input-number [(ngModel)]="amount" [ngModelOptions]="{ standalone: true }" />
```

### Reactive Forms

```html
<form [formGroup]="form">
  <uilib-input-number formControlName="amount" [min]="0" [max]="1000" />
</form>
```

```ts
public readonly form: FormGroup<{ amount: FormControl<number | null> }> =
  new FormGroup({ amount: new FormControl<number | null>(null, { validators: [Validators.required] }) });
```

CVA support includes `registerOnChange`, `registerOnTouched`, `writeValue`, and `setDisabledState`.

---

## Accessibility

`InputNumber` renders an input with `role="spinbutton"` and ARIA numeric attributes.

- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` map from current numeric state.
- `ariaLabel`, `ariaLabelledBy`, `ariaDescribedBy` are passed through.

Keyboard interactions:
- `ArrowUp` / `ArrowDown`: step increment/decrement
- `PageUp` / `PageDown`: `step * 10`
- `Home` / `End`: set to min/max when available
- Non-numeric keys are blocked unless control/meta navigation keys

---

## CSS Variables

The component exposes these custom properties:

| Variable | Purpose |
|---|---|
| `--uilib-input-number-gap` | Host gap between wrapper/buttons |
| `--uilib-input-number-border-width` | Input wrapper border width |
| `--uilib-input-number-border-style` | Input wrapper border style |
| `--uilib-input-number-border-radius` | Overall control radius |
| `--uilib-input-number-height-sm` | Small input height |
| `--uilib-input-number-height-md` | Medium input height |
| `--uilib-input-number-height-lg` | Large input height |
| `--uilib-input-number-input-height` | Active input height token |
| `--uilib-input-number-padding-y-sm` | Small vertical padding |
| `--uilib-input-number-padding-y-md` | Medium vertical padding |
| `--uilib-input-number-padding-y-lg` | Large vertical padding |
| `--uilib-input-number-padding-x-sm` | Small horizontal padding |
| `--uilib-input-number-padding-x-md` | Medium horizontal padding |
| `--uilib-input-number-padding-x-lg` | Large horizontal padding |
| `--uilib-input-number-padding-y` | Active vertical padding |
| `--uilib-input-number-padding-x` | Active horizontal padding |
| `--uilib-input-number-font-family` | Font family |
| `--uilib-input-number-font-weight` | Font weight |
| `--uilib-input-number-font-size-sm` | Small font size |
| `--uilib-input-number-font-size-md` | Medium font size |
| `--uilib-input-number-font-size-lg` | Large font size |
| `--uilib-input-number-font-size` | Active font size |
| `--uilib-input-number-bg` | Background color |
| `--uilib-input-number-text` | Text color |
| `--uilib-input-number-border-color` | Border color |
| `--uilib-input-number-border-color-hover` | Border hover color |
| `--uilib-input-number-border-color-focus` | Border focus color |
| `--uilib-input-number-placeholder-color` | Placeholder color |
| `--uilib-input-number-prefix-color` | Prefix color |
| `--uilib-input-number-suffix-color` | Suffix color |
| `--uilib-input-number-button-bg` | Spinner button background |
| `--uilib-input-number-button-text` | Spinner button text color |
| `--uilib-input-number-button-border-color` | Spinner button border color |
| `--uilib-input-number-button-hover-background` | Spinner hover background |
| `--uilib-input-number-button-active-background` | Spinner active background |
| `--uilib-input-number-button-disabled-opacity` | Spinner disabled opacity |
| `--uilib-input-number-button-width-sm` | Small spinner width |
| `--uilib-input-number-button-width-md` | Medium spinner width |
| `--uilib-input-number-button-width-lg` | Large spinner width |
| `--uilib-input-number-button-width` | Active spinner width |
| `--uilib-input-number-clear-size` | Clear icon size |
| `--uilib-input-number-clear-color` | Clear icon color |
| `--uilib-input-number-clear-offset` | Clear icon offset |
| `--uilib-input-number-focus-ring` | Focus ring shadow |
| `--uilib-input-number-invalid-border-color` | Invalid border color |
| `--uilib-input-number-disabled-opacity` | Disabled host opacity |
| `--uilib-input-number-filled-bg` | Filled-state background |
| `--uilib-input-number-transition` | Transition shorthand |

---

## Design Variants

`InputNumber` supports variant classes via theme or explicit `variant` input:
- `material`
- `bootstrap`
- `minimal`

```html
<uilib-input-number variant="material" />
<uilib-input-number variant="bootstrap" />
<uilib-input-number variant="minimal" />
```

When `variant` is `null`, the global `ThemeConfigService` variant is used.

