# InputNumber Research (PrimeNG v19)

Source analyzed:
- `C:\tmp\inputnumber-research\package\inputnumber\inputnumber.d.ts`
- `C:\tmp\inputnumber-research\package\inputnumber\inputnumber.interface.d.ts`
- `C:\tmp\inputnumber-research\package\fesm2022\primeng-inputnumber.mjs`

## 1) API Surface

### Component selectors and role
- Selectors: `p-inputNumber`, `p-inputnumber`, `p-input-number`
- Core input element role: `spinbutton`
- CVA provider: `INPUTNUMBER_VALUE_ACCESSOR`

### Inputs (public)

| Input | Type | Default (from implementation) | Notes |
|---|---|---:|---|
| `showButtons` | `boolean` | `false` | Shows increment/decrement buttons |
| `format` | `boolean` | `true` | Enables locale formatting |
| `buttonLayout` | `'stacked' \| 'horizontal' \| 'vertical'` (declared as `string`) | `'stacked'` | Changes button DOM layout |
| `inputId` | `string \| undefined` | `undefined` | For `<label for>` wiring |
| `styleClass` | `string \| undefined` | `undefined` | Host class |
| `style` | `Record<string, any> \| null \| undefined` | `undefined` | Host inline style |
| `placeholder` | `string \| undefined` | `undefined` | Placeholder text |
| `size` | `'large' \| 'small'` | `undefined` | Forwarded to `pSize` |
| `maxlength` | `number \| undefined` | `undefined` | Max characters |
| `tabindex` | `number \| undefined` | `undefined` | Tab order |
| `title` | `string \| undefined` | `undefined` | Tooltip/title |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | ARIA |
| `ariaDescribedBy` | `string \| undefined` | `undefined` | ARIA |
| `ariaLabel` | `string \| undefined` | `undefined` | ARIA |
| `ariaRequired` | `boolean \| undefined` | `undefined` | ARIA |
| `name` | `string \| undefined` | `undefined` | Form field name |
| `required` | `boolean \| undefined` | `undefined` | Required state |
| `autocomplete` | `string \| undefined` | `undefined` | Browser autocomplete |
| `min` | `number \| undefined` | `undefined` | Lower bound |
| `max` | `number \| undefined` | `undefined` | Upper bound |
| `incrementButtonClass` | `string \| undefined` | `undefined` | Increment button class |
| `decrementButtonClass` | `string \| undefined` | `undefined` | Decrement button class |
| `incrementButtonIcon` | `string \| undefined` | `undefined` | Increment icon CSS class |
| `decrementButtonIcon` | `string \| undefined` | `undefined` | Decrement icon CSS class |
| `readonly` | `boolean` | `false` | Prevents edits/spin |
| `step` | `number` | `1` | Spin increment |
| `allowEmpty` | `boolean` | `true` | Allows `null` instead of forcing `0` |
| `locale` | `string \| undefined` | `undefined` | Locale for formatter/parser |
| `localeMatcher` | `any` | `undefined` | Intl locale matching |
| `mode` | `'decimal' \| 'currency'` (declared loosely as `string \| any`) | `'decimal'` | Formatting mode |
| `currency` | `string \| undefined` | `undefined` | ISO-4217 code |
| `currencyDisplay` | `string \| undefined \| any` | `undefined` | symbol/code/name |
| `useGrouping` | `boolean` | `true` | Thousands/group separators |
| `variant` | `'filled' \| 'outlined'` | `undefined` | Input visual variant |
| `minFractionDigits` | `number \| undefined` | `undefined` | Intl minimum fraction digits |
| `maxFractionDigits` | `number \| undefined` | `undefined` | Intl maximum fraction digits |
| `prefix` | `string \| undefined` | `undefined` | Text prepended to display |
| `suffix` | `string \| undefined` | `undefined` | Text appended to display |
| `inputStyle` | `any` | `undefined` | Input inline style |
| `inputStyleClass` | `string \| undefined` | `undefined` | Input class |
| `showClear` | `boolean` | `false` | Clear icon toggle |
| `autofocus` | `boolean \| undefined` | `undefined` | Auto-focus |
| `disabled` | `boolean \| undefined` (accessor) | `undefined` | Clears timers, drops focus when true |
| `fluid` | `boolean` | `false` | Full-width mode |

### Outputs (public)

| Output | Type | Emission behavior |
|---|---|---|
| `onInput` | `EventEmitter<InputNumberInputEvent>` | Emitted when parsed value changes (`handleOnInput`) |
| `onFocus` | `EventEmitter<Event>` | Emitted in `onInputFocus` |
| `onBlur` | `EventEmitter<Event>` | Emitted in `onInputBlur` |
| `onKeyDown` | `EventEmitter<KeyboardEvent>` | Emitted at end of `onInputKeyDown` |
| `onClear` | `EventEmitter<void>` | Emitted in `clear()` |

`InputNumberInputEvent` shape:
- `originalEvent: Event`
- `value: number | string | null`
- `formattedValue: string`

### Templates (public)

| Template key | Purpose |
|---|---|
| `clearicon` | Custom clear icon |
| `incrementbuttonicon` | Custom increment icon |
| `decrementbuttonicon` | Custom decrement icon |

### Public class methods (declared on component)

| Method | Purpose |
|---|---|
| `writeValue(value)` | CVA model -> view update |
| `registerOnChange(fn)` | CVA onChange registration |
| `registerOnTouched(fn)` | CVA onTouched registration |
| `setDisabledState(val)` | CVA disabled state |
| `clear()` | Sets model value to `null`, emits `onClear` |
| `focus/blur lifecycle handlers` | Input focus/blur propagation and formatting |
| `spin/repeat` | Spinner operation and hold-repeat |
| `formatValue/parseValue` | String<->number conversion core |

### Internal-only members exposed in `.d.ts`
These are technically visible but clearly implementation details, not stable API: regex/parser fields (`_numeral`, `_group`, `_decimal`, `_currency`, `_prefix`, `_suffix`, `_index`), cursor/edit helpers (`insert`, `deleteRange`, `initCursor`, `concatValues`), and control flags (`isSpecialChar`, `timer`, `lastValue`, `initialized`).

Deprecated markers were not present in analyzed typings.

---

## 2) Formatting Engine Analysis

PrimeNG builds a locale-aware parser/formatter pair around `Intl.NumberFormat`.

### Formatter construction
- `getOptions()` returns:
  - `localeMatcher`
  - `style: mode` (`decimal` or `currency`)
  - `currency`
  - `currencyDisplay`
  - `useGrouping`
  - `minimumFractionDigits`
  - `maximumFractionDigits`
- `constructParser()` creates:
  1. `numberFormat = new Intl.NumberFormat(locale, options)`
  2. localized numerals map (`9876543210` reversed -> digit index map)
  3. regexes for grouping, decimal sign, minus sign, currency symbol, prefix, suffix

### Parsing strategy
`parseValue(text)` pipeline:
1. Strip suffix regex
2. Strip prefix regex
3. Trim and remove spaces
4. Strip currency regex
5. Remove grouping separators
6. Normalize localized minus sign to `-`
7. Normalize localized decimal separator to `.`
8. Map locale numerals to ASCII digits
9. Interpret:
   - `'-'` stays as interim string `'-'`
   - numeric text -> number
   - invalid -> `null`

### Prefix/suffix and currency interaction
- If explicit `prefix`/`suffix` are provided, they take precedence for stripping and formatting.
- If omitted, parser infers locale-dependent prefix/suffix from formatter output for `1`.
- Currency symbol detection uses a separate regex from an Intl currency formatter with `minimumFractionDigits: 0`/`maximumFractionDigits: 0`.
- Effective removal order in parser is suffix -> prefix -> spaces -> currency -> group/decimal/numerals conversion.

### `null` vs `0` vs empty handling
- `formatValue(null|undefined)` returns empty string.
- `allowEmpty = false` coerces falsy parsed values to `0` in `updateValue()` and `formattedValue()`.
- Intermediate minus sign (`'-'`) is supported while editing, but `validateValue('-')` returns `null` for committed states.
- `clear()` sets model to `null` regardless of `allowEmpty`; coercion can happen on later edit/commit paths.

---

## 3) Spinner Logic

### Increment/decrement mechanics
- `spin(event, dir)` computes `step * dir`.
- Current value source: `parseValue(input.value) || 0`.
- New value path: `validateValue(current + step)` then `updateInput` + `updateModel` + `handleOnInput`.
- Length guard: if `maxlength` would be exceeded by formatted output, spin is skipped.

### Hold repeat behavior
- `repeat(event, interval, dir)`:
  - first call uses `500ms` delay
  - recursive calls use `40ms`
  - each cycle triggers `spin`
- Starts on `mousedown` (except right-click), stops on `mouseup`/`mouseleave`/`keyup`.

### Keyboard support (input field)
- Implemented:
  - `ArrowUp`: `spin(+1)`
  - `ArrowDown`: `spin(-1)`
  - `Home`: set to `min` if defined
  - `End`: set to `max` if defined
  - `Enter`/`Tab`: parse -> clamp -> reformat -> update model
- Not observed in v19 InputNumber source:
  - `PageUp` / `PageDown` (`step * 10`) handling

### Boundaries
- Clamping is centralized in `validateValue`:
  - below `min` => `min`
  - above `max` => `max`
- Clamping occurs during spin and on blur/key commit paths (`Enter`/`Tab`/blur), not only on blur.

---

## 4) Button Layouts

### Stacked (default)
- Input plus a right-side `.p-inputnumber-button-group` containing two vertical buttons.
- Group is absolutely positioned in the input area.
- Clear icon shown when `buttonLayout != 'vertical' && showClear && value`.

### Horizontal
- Two sibling buttons around the input (decrement left, increment right via CSS order).
- Input sits between buttons; borders/radii adjusted for connected control look.

### Vertical
- Component flex-direction column.
- Increment button on top, input centered middle, decrement bottom.
- Clear icon intentionally suppressed in template (`buttonLayout != 'vertical'` condition).

### Icon templates
- For each button: explicit icon class input takes precedence.
- Fallback to built-in `AngleUpIcon` / `AngleDownIcon`.
- Template override hooks: `incrementbuttonicon`, `decrementbuttonicon`.

---

## 5) CVA Integration

Implemented through standard accessor methods and internal gating for `updateOn: 'blur'`.

- `writeValue(value)`:
  - sets `this.value = value ? Number(value) : value`
  - note: this preserves `0` as `0` because `value ?` branch is false for zero
  - marks for check
- `registerOnChange(fn)` and `registerOnTouched(fn)` store callbacks
- `setDisabledState(val)` delegates to `disabled` setter and marks for check
- `onModelTouched()` is called in `onInputBlur`

When model change callback fires (`onModelChange`):
- `updateModel(event, value)` compares old/new values
- if control uses `updateOn: 'blur'` and input is focused, it defers callback until blur
- otherwise it calls immediately

`onInput` output emission vs CVA:
- `onInput` emits from `handleOnInput` when parsed value changed
- CVA callback can be immediate or blur-deferred depending on `ngControl.control.updateOn`

---

## 6) Divergences for `ui-lib-custom`

PrimeNG behavior to map into project conventions:

1. Variant naming
- PrimeNG: `variant: 'filled' | 'outlined'`
- `ui-lib-custom`: use `appearance` for visual style + separate `filled: boolean`

2. Size vocabulary
- PrimeNG: `'small' | 'large'` (and implicit default)
- `ui-lib-custom`: `size: 'sm' | 'md' | 'lg'`

3. Fluid behavior
- PrimeNG: `fluid` + parent `p-fluid` detection
- `ui-lib-custom`: keep explicit `fluid` boolean only (no Prime wrapper coupling)

4. Inputs/outputs API style
- PrimeNG uses decorators + `EventEmitter`
- `ui-lib-custom` requires signal APIs: `input()`, `model()`, `output()`

5. Icon system
- PrimeNG defaults to PrimeIcons/components
- `ui-lib-custom` should use Ng Icons and component tokenized icon slots

6. Style escape hatches
- PrimeNG exposes `inputStyle` / `inputStyleClass`
- `ui-lib-custom` direction: avoid these, rely on host class + CSS vars/tokens

7. Cross-entry usage
- PrimeNG internal class-based infrastructure
- `ui-lib-custom` must avoid cross-entry relative imports; use package paths (`ui-lib-custom/core`, etc.)

8. Template syntax
- PrimeNG template still uses `*ngIf`
- `ui-lib-custom` requires Angular block syntax (`@if`, `@for`, `@switch`) for new/touched code

9. Public typing strictness
- PrimeNG exposes many loosely typed props (`any`, broad `string`)
- `ui-lib-custom` should constrain public inputs with string unions and explicit types

10. Clear icon behavior
- PrimeNG clear icon hidden in vertical button layout
- Keep/adjust intentionally in `ui-lib-custom` after UX decision (document whichever path chosen)

---

## 7) Deferred Features (proposed v1 cuts)

These are candidates to defer from v1 for lower risk and faster delivery.

1. Rich caret-preserving edit engine parity
- PrimeNG has heavy cursor math for insert/delete/group separators.
- V1 can use a simpler parse-on-input + normalize-on-blur strategy, then iterate.

2. Full locale numeral script edge-case parity
- PrimeNG supports locale numerals through regex/digit-map conversion.
- Keep in service design, but edge locale matrix can be phased into v1.1 tests.

3. `updateOn: 'blur'` nuanced CVA behavior
- PrimeNG has explicit ngControl-aware gating.
- If initial implementation uses simpler immediate model updates, track as follow-up parity task.

4. Icon template slots with three override channels
- V1 can support fixed Ng Icon defaults first, then add template override points.

5. `inputStyle`/`inputStyleClass` escape hatches
- Explicitly not aligned with project styling conventions; skip in v1.

6. Parent container auto-fluid detection
- PrimeNG detects enclosing `p-fluid`.
- Skip and keep deterministic explicit `fluid` input.

7. Keyboard `PageUp`/`PageDown` acceleration
- Not present in analyzed PrimeNG v19 source; if desired by product UX, add later as enhancement.

---

## Notes for Prompt 2
- Extract number parse/format logic into `NumberFormatService` (pure TS, no Angular deps).
- Keep parser construction and regex derivation unit-tested independently from component rendering.
- Preserve explicit behavior decisions for: `allowEmpty`, intermediate `'-'`, min/max clamping timing, and clear-icon visibility in vertical layout.

