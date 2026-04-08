# InputMask Research (PrimeNG v19.1.4 -> ui-lib-custom)

## Scope and Evidence

This research is based on local npm package artifact inspection only:

- `.tmp/primeng19/package/inputmask/inputmask.d.ts`
- `.tmp/primeng19/package/inputmask/inputmask.interface.d.ts`
- `.tmp/primeng19/package/fesm2022/primeng-inputmask.mjs`
- `.tmp/primeng19/package/inputmask/style/inputmaskstyle.d.ts`

PrimeNG package inspected: `primeng@19.1.4`.

---

## PrimeNG InputMask Feature Inventory

### Public Inputs (type + default)

From `inputmask.d.ts` + `primeng-inputmask.mjs`:

- `type: string = 'text'`
- `slotChar: string = '_'`
- `autoClear: boolean = true`
- `showClear: boolean = false`
- `style: { [klass: string]: any } | null | undefined` (no explicit default)
- `inputId: string | undefined` (no explicit default)
- `styleClass: string | undefined` (no explicit default)
- `placeholder: string | undefined` (no explicit default)
- `size: 'large' | 'small'` (no explicit default)
- `maxlength: number | undefined` (no explicit default)
- `tabindex: string | undefined` (no explicit default)
- `title: string | undefined` (no explicit default)
- `variant: 'filled' | 'outlined'` (no explicit default)
- `ariaLabel: string | undefined` (no explicit default)
- `ariaLabelledBy: string | undefined` (no explicit default)
- `ariaRequired: boolean | undefined` (no explicit default)
- `disabled: boolean | undefined` (no explicit default)
- `readonly: boolean | undefined` (no explicit default)
- `unmask: boolean | undefined` (no explicit default)
- `name: string | undefined` (no explicit default)
- `required: boolean | undefined` (no explicit default)
- `characterPattern: string = '[A-Za-z]'`
- `autofocus: boolean | undefined` (no explicit default)
- `autoFocus` setter (deprecated alias) -> forwards to `autofocus`, logs deprecation
- `autocomplete: string | undefined` (no explicit default)
- `keepBuffer: boolean = false`
- `mask: string | null | undefined` (setter re-initializes mask and resets value)

### Public Outputs

- `onComplete: EventEmitter<any>`
- `onFocus: EventEmitter<Event>`
- `onBlur: EventEmitter<Event>`
- `onInput: EventEmitter<Event>`
- `onKeydown: EventEmitter<Event>`
- `onClear: EventEmitter<any>`

### Templates / Projection API

- `clearicon` template slot via `PrimeTemplate` and `InputMaskTemplates.clearicon()`
- `clearIconTemplate` query and fallback `_clearIconTemplate`

### CVA Integration

Implements `ControlValueAccessor` with standard methods:

- `writeValue(value)` sets internal `value`, syncs native input, runs `checkVal()`, updates `filled`
- `registerOnChange(fn)` stores `onModelChange`
- `registerOnTouched(fn)` stores `onModelTouched`
- `setDisabledState(val)` toggles `disabled` + `markForCheck`

Value propagation:

- `updateModel(e)` emits either masked string or unmasked string:
  - `updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value`
  - assigns `this.value` and calls `onModelChange(this.value)`

Notes:

- `clear()` sets input to empty string, sets `value = null`, emits `onModelChange(null)`, emits `onClear`.
- `onInputBlur()` calls `onModelTouched()`.

### Mask Engine Internals

#### Core data structures

Initialized in `initMask()`:

- `defs`
  - `'9' -> '[0-9]'`
  - `'a' -> characterPattern`
  - `'*' -> `${characterPattern}|[0-9]``
- `tests: (RegExp | null)[]`
- `buffer: string[]`
- `defaultBuffer: string`
- `partialPosition`, `firstNonMaskPos`, `lastRequiredNonMaskPos`, `len`

Parsing behavior:

- `?` marks optional suffix region
  - decrements `len`
  - sets `partialPosition` to `?` index
- token chars (`9`, `a`, `*`) push regex entries into `tests`
- literals push `null` into `tests` and literal chars into `buffer`
- placeholders are populated by `getPlaceholder(i)` from `slotChar`

#### Navigation helpers

- `seekNext(pos)`: next index where `tests[index]` is regex
- `seekPrev(pos)`: previous index where `tests[index]` is regex

#### Shifting logic

- `shiftL(begin, end)`:
  - left-compacts following valid chars over deleted range
  - replaces shifted-out positions with placeholders
  - writes buffer and updates caret
- `shiftR(pos)`:
  - right-shifts chars when inserting
  - cascades carry until invalid or end

#### Validation and normalization

- `checkVal(allow?: boolean)`:
  - reparses raw input into mask `buffer`
  - tracks `lastMatch`
  - if `allow=true` -> writes buffer immediately
  - if invalid before required boundary:
    - `autoClear=true` or buffer unchanged from default -> clears input
    - else keeps visible partial value
  - else truncates to last valid match
  - returns caret placement target index

### Caret Management

`caret(first?, last?)`:

- set mode: writes selection range
- get mode: returns `{ begin, end }`
- guard: no-op if element not visible/focused (`offsetParent` + activeElement check)
- uses `setSelectionRange` fallback to text range APIs

### Android Chrome Handling

- `androidChrome` detected via UA (`/chrome/i && /android/i`)
- `onInputChange()` routes to:
  - `handleAndroidInput(event)` when Android Chrome
  - `handleInputChange(event)` otherwise
- `handleAndroidInput` compares `oldVal` vs current value to detect delete vs insert
- uses async `setTimeout(0)` caret restoration + model update + completion emit

### Optional Segment Handling (`?`)

- `partialPosition` starts as mask length, then becomes `?` position
- `len` decremented for `?` so operational mask excludes marker
- `lastRequiredNonMaskPos` only tracks tokens before optional boundary
- `isCompleted()` checks placeholders only through required positions

### `unmask` Behavior

- `unmask=true` model value is `getUnmaskedValue()` (tokens only, literals removed)
- `unmask=false` model value is formatted input string

### `autoClear` on Blur

`onInputBlur`:

- if `keepBuffer=false`, runs `checkVal()`
- invalid incomplete values are cleared when `autoClear=true`
- if value changed from focus snapshot / internal value, dispatches synthetic native `change` event

### `keepBuffer` Behavior

Effects in multiple operations:

- `clearBuffer()` only clears placeholders when `keepBuffer=false`
- delete behavior changes `shiftL` range (`end - 2` vs `end - 1`)
- focus caret initialization uses raw value length when `keepBuffer=true`

### `slotChar` Placeholder Behavior

- `getPlaceholder(i)` returns `slotChar[i]` if available, else `slotChar[0]`
- enables custom per-position placeholder strings (e.g., `mm/dd/yyyy`-style slot text)

### Clear Icon (`showClear`)

Template condition:

- visible when `value != null && filled && showClear && !disabled`
- default icon: `TimesIcon`
- custom icon: `clearicon` template
- click executes `clear()` and emits `onClear`

### Completion Detection

- `isCompleted()` scans required token range for any placeholder residue
- emits `onComplete` on successful key/input paths

### Filled State Detection

- `filled = nativeInput.value != ''`
- used for class `p-filled` and clear icon visibility

### Character Pattern Customization

- `characterPattern` rewires `a` token and contributes to `*` token
- default `'[A-Za-z]'`

---

## PrimeNG Internals with Behavioral Relevance

- `mask` setter immediately reinitializes and calls `writeValue('')` + `onModelChange(this.value)`.
- `readonly` short-circuits input handlers.
- Escape key restores `focusText` snapshot.
- Backspace/Delete path uses `seekPrev/seekNext`, `clearBuffer`, `shiftL`, then model update.
- Paste path uses `(paste)="handleInputChange($event)"`.
- Uses `NgClass`, `NgIf`, `NgStyle`, `pInputText`, `pAutoFocus`, and `PrimeTemplate` infrastructure.

---

## Gap Analysis: PrimeNG vs ui-lib-custom (Intentional Divergences)

### API differences we should keep

1. `size`
   - PrimeNG: `'small' | 'large'`
   - ui-lib-custom: `'sm' | 'md' | 'lg'`

2. `filled`/`variant`
   - PrimeNG: `variant: 'filled' | 'outlined'`
   - ui-lib-custom: `filled` is boolean state; `variant` remains theme family (`material`/`bootstrap`/`minimal`)

3. Inputs API style
   - PrimeNG uses `@Input()`
   - ui-lib-custom must use signal inputs (`input()`, `model()`, `output()`)

4. Styling/host props
   - PrimeNG has `style`, `styleClass`, `inputId`
   - ui-lib-custom should rely on host class composition and native attribute forwarding instead

5. Autofocus API
   - PrimeNG supports deprecated `autoFocus`
   - ui-lib-custom should support only `autofocus`

6. Base inheritance
   - PrimeNG extends `BaseComponent`
   - ui-lib-custom should use plain standalone component patterns

7. Template system
   - PrimeNG uses `PrimeTemplate` + `ContentChildren`
   - ui-lib-custom should use signal `contentChild()` / standard projection where needed

8. Template directives
   - PrimeNG uses `NgClass` / `NgIf` / `NgStyle`
   - ui-lib-custom should use class bindings and Angular block syntax (`@if`)

### Additional parity decisions

- Keep mask grammar and engine semantics (DigitalBush-style behavior) for correctness:
  - `9`, `a`, `*`, `?`, literals
  - buffer/tests arrays
  - `shiftL/shiftR`
  - caret-positioned editing
- Keep Android special path because this is historically brittle and PrimeNG still ships it.

---

## Proposed ui-lib-custom API Mapping

### Inputs (proposed)

- `mask: string`
- `slotChar: string = '_'`
- `autoClear: boolean = true`
- `keepBuffer: boolean = false`
- `unmask: boolean = false`
- `characterPattern: string = '[A-Za-z]'`
- `type: 'text' | 'tel' | 'password' = 'text'`
- `placeholder: string = ''`
- `name: string | null = null`
- `autocomplete: string | null = null`
- `maxlength: number | null = null`
- `tabindex: number | null = null`
- `readonly: boolean = false`
- `disabled: boolean = false`
- `required: boolean = false`
- `autofocus: boolean = false`
- `showClear: boolean = false`
- `size: 'sm' | 'md' | 'lg' = 'md'`
- `variant: 'material' | 'bootstrap' | 'minimal' | null = null`
- `filled: boolean = false` (explicit style-state input)
- a11y passthrough: `ariaLabel`, `ariaLabelledBy`, `ariaDescribedBy`, `ariaRequired`

### Model + outputs (proposed)

- `model<string | null>()` for CVA/ngModel interop value
- `onComplete = output<void>()`
- `onFocus = output<FocusEvent>()`
- `onBlur = output<FocusEvent>()`
- `onInput = output<Event>()`
- `onKeydown = output<KeyboardEvent>()`
- `onClear = output<void>()`

### Template/projection (proposed)

- Optional clear icon slot using a lightweight projected marker directive (or plain `[clearIcon]` slot)
- No PrimeTemplate compatibility layer

---

## Reuse Opportunities from Existing Library

### `projects/ui-lib-custom/src/lib/input/input.ts`

Reusable patterns:

- Signal input/CVA setup (`input()`, explicit typed callbacks)
- Theme variant resolution through `ThemeConfigService`
- Host class computed strategy for size/variant/state
- `@ViewChild` native input focus helper
- Existing `showClear` and disabled-safe `clear()` behavior
- Existing forms coverage approach (ngModel + reactive tests)

### `projects/ui-lib-custom/src/lib/input/input.html`

Reusable structure:

- Native input attribute forwarding pattern
- Clear button rendering with state gates
- Block syntax (`@if`) pattern

### `projects/ui-lib-custom/src/lib/float-label/float-label.ts`

Reusable idea:

- Lightweight wrapper + class-driven state composition (if mask component is paired with float label)

### `projects/ui-lib-custom/src/lib/icon-field/input-icon.ts`

Reusable idea:

- Class composition helper for projected icon container and custom styleClass-like extension without explicit `styleClass` input

---

## Architecture Decisions for `uilib-input-mask`

1. Preserve PrimeNG-compatible mask engine semantics (buffer/tests/caret/shift/check) for user expectation parity.
2. Keep engine local to component first (private methods), then extract to utility only if a second consumer appears.
3. Implement CVA with explicit typed callbacks and `model` synchronization.
4. Keep Android Chrome path (`handleAndroidInput`) behind platform checks.
5. Avoid template infrastructure debt:
   - use projection or signal `contentChild` for clear icon customization
   - no PrimeTemplate clone
6. Keep visual API aligned with library (`size`, `variant`, `filled` boolean, tokens-first CSS).
7. Add InputMask-specific design tokens before final SCSS hardening.

---

## Risks / Implementation Watch-outs

- Caret math off-by-one errors with optional segments and delete ranges.
- `keepBuffer` interactions are subtle in `shiftL`, `clearBuffer`, and focus placement.
- Android path can diverge from desktop behavior; requires focused tests.
- CVA model shape differs when `unmask=true`; tests should assert both modes.
- PrimeNG template has `aria-labelledBy` (spelling mismatch vs standard `aria-labelledby`), so do not mirror this typo in ui-lib API.

---

## Test Plan Guidance (for implementation phase)

Minimum unit coverage should include:

- Mask parsing (`9/a/*/?/literals`) and placeholder buffer build
- insert/delete behavior (`shiftR/shiftL`) + caret movement
- optional segment completion logic (`isCompleted`)
- `autoClear` + `keepBuffer` combinations on blur/delete
- `unmask` true/false model emissions
- Android input path routing (handler invocation and caret scheduling)
- `showClear` behavior and clear event
- template-driven + reactive forms integration
- a11y attributes + focus/blur output events

---

## Suggested Phase-2 Implementation Sequence

1. Define `input-mask.types.ts` unions/events and public API shape.
2. Implement component shell + CVA + host classes.
3. Port mask engine internals with explicit typing.
4. Wire key/focus/blur/input/paste handlers and Android path.
5. Add clear icon projection option and token-backed styling.
6. Build comprehensive tests (including Android and optional segment edge cases).

