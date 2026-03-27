# FloatLabel Architecture (Prompt 1)

> Status: Design phase document (no implementation code).

## Scope and Inputs

This document defines the API and CSS architecture for `ui-lib-float-label` and audits current form controls for required state hooks.

Reviewed sources:

- `AI_AGENT_CONTEXT.md`
- `LIBRARY_CONVENTIONS.md` (Active Conventions)
- `projects/ui-lib-custom/src/lib/input/input.ts`
- `projects/ui-lib-custom/src/lib/input/input.html`
- `projects/ui-lib-custom/src/lib/select/select.ts`
- `projects/ui-lib-custom/src/lib/select/select.html`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.ts`
- `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.ts`

## Goals

- Provide PrimeNG-like floating label behavior as a lightweight wrapper utility.
- Keep behavior CSS-driven (`:has(...)`) with minimal TS logic.
- Support variants `over`, `in`, and `on` from a single component.
- Define a stable contract for native controls and wrapper controls.

## Existing Form Component State Audit

## State class matrix (current)

| Component | Filled state class today | Focus/Open state class today | Notes for FloatLabel |
|---|---|---|---|
| `ui-lib-input` | No generic host `filled` class; internal `.ui-input-floating-active` exists on inner wrapper (`input.ts`/`input.html`) | No generic host focus class; focus tracked by signal and `:focus-within` on `.ui-input-field` | Not directly compatible with PrimeNG-style wrapper hooks; needs standard hooks if used inside `ui-lib-float-label`. |
| `ui-lib-select` | No `--filled`/`--has-value` class; empty state represented in template via `.ui-lib-select__placeholder` | No open/focus class in `hostClasses()`; `open()` controls panel rendering only | Missing both wrapper hooks required for robust `:has(...)` detection. |
| `ui-lib-autocomplete` | Yes: `ui-lib-autocomplete--filled` (style mode) and `ui-lib-autocomplete--has-value` (actual value state) | Yes: `ui-lib-autocomplete--open` (panel visible) | Closest to FloatLabel requirements; still lacks generic cross-control alias class names. |
| `ui-lib-cascade-select` | Yes: `ui-lib-cascade-select--filled` (style mode), but no class tied to actual selected value (`hasValue()`) | Yes: `ui-lib-cascade-select--open` | Needs separate value-state class (`--has-value`) for reliable label float on selection. |

## Audit conclusion

Current controls are inconsistent for wrapper-driven floating labels. `AutoComplete` is mostly ready, while `Input`, `Select`, and `CascadeSelect` need normalized state hooks.

## Public API Design

`float-label.types.ts`

```typescript
export type FloatLabelVariant = 'over' | 'in' | 'on';
```

`float-label.ts` (contract)

- `variant: InputSignal<FloatLabelVariant>`
- Default variant: `'over'`
- No outputs
- No services
- No template refs

Conventions alignment:

- String union type (no enum)
- Standalone component
- `ChangeDetectionStrategy.OnPush`
- `ViewEncapsulation.None`

## Host Architecture

- Selector: `uilib-float-label`
- Host element is the wrapper container (no extra inner wrapper)
- Template: `<ng-content />`
- Host classes:
  - `uilib-float-label` (always)
  - `uilib-float-label--over` when `variant='over'`
  - `uilib-float-label--in` when `variant='in'`
  - `uilib-float-label--on` when `variant='on'`

Expected projected content pattern:

```html
<uilib-float-label>
  <!-- one form control (native or wrapper component) -->
  <input id="email" />
  <label for="email">Email</label>
</uilib-float-label>
```

(Equivalent pattern supported for `textarea`, `ui-lib-select`, `ui-lib-autocomplete`, `ui-lib-cascade-select`.)

## CSS State Strategy (`:has(...)`)

`ui-lib-float-label` uses a single active-state model:

- label is active/floated when control is focused OR filled OR autofilled
- label is invalid-colored when invalid

## 1) Native input and textarea detection

Focus selectors:

- `uilib-float-label:has(> input:focus)`
- `uilib-float-label:has(> textarea:focus)`

Filled selectors (hybrid native-first):

- `uilib-float-label:has(> input:not(:placeholder-shown))`
- `uilib-float-label:has(> textarea:not(:placeholder-shown))`
- `uilib-float-label:has(> input[required]:valid)` (fallback for cases where placeholder behavior is not reliable)
- `uilib-float-label:has(> textarea[required]:valid)`

Autofill selectors:

- `uilib-float-label:has(> input:-webkit-autofill)`
- `uilib-float-label:has(> textarea:-webkit-autofill)`

Placeholder-present selectors (collision handling):

- `uilib-float-label:has(> input[placeholder])`
- `uilib-float-label:has(> textarea[placeholder])`

Strategy detail:

- Default: hide projected input placeholder when label is resting (`placeholder-color: transparent`).
- When active/focused: restore placeholder color to tokenized value.
- This prevents placeholder + resting label overlap.

Invalid selectors:

- `uilib-float-label:has(> input.ng-invalid.ng-dirty)`
- `uilib-float-label:has(> textarea.ng-invalid.ng-dirty)`
- `uilib-float-label:has(> input.ng-invalid.ng-touched)`
- `uilib-float-label:has(> textarea.ng-invalid.ng-touched)`

## 2) Wrapper component detection (Select, AutoComplete, CascadeSelect)

Primary wrapper selectors (existing + required):

- Focus/open:
  - `uilib-float-label:has(> .uilib-inputwrapper-focus)` (new generic alias)
  - `uilib-float-label:has(> ui-lib-autocomplete.ui-lib-autocomplete--open)`
  - `uilib-float-label:has(> ui-lib-select.ui-lib-select--open)` (new)
  - `uilib-float-label:has(> ui-lib-cascade-select.ui-lib-cascade-select--open)`
- Filled/value:
  - `uilib-float-label:has(> .uilib-inputwrapper-filled)` (new generic alias)
  - `uilib-float-label:has(> ui-lib-autocomplete.ui-lib-autocomplete--has-value)`
  - `uilib-float-label:has(> ui-lib-select.ui-lib-select--has-value)` (new)
  - `uilib-float-label:has(> ui-lib-cascade-select.ui-lib-cascade-select--has-value)` (new)
- Invalid:
  - `uilib-float-label:has(> .ng-invalid.ng-dirty)`
  - `uilib-float-label:has(> .ng-invalid.ng-touched)`

Recommendation:

- Keep control-specific classes for backward compatibility.
- Add generic aliases (`uilib-inputwrapper-focus`, `uilib-inputwrapper-filled`) across wrapper controls so FloatLabel CSS does not depend on control-specific naming forever.

## Variant-specific behavior

## `over` (default)

- Resting label sits in the input content area.
- Active label moves above top border region.
- No control padding adjustments required by default.

## `in`

- Resting label sits in content area.
- Active label shifts to top-inside position.
- Projected control requires extra top padding so user value does not collide with floating label.

Padding strategy for projected children:

- Native controls:
  - `uilib-float-label--in > input`
  - `uilib-float-label--in > textarea`
- Wrapper controls:
  - `uilib-float-label--in > ui-lib-select .ui-lib-select__control`
  - `uilib-float-label--in > ui-lib-autocomplete .ui-autocomplete-container`
  - `uilib-float-label--in > ui-lib-cascade-select .ui-lib-cascade-select__trigger`

Apply `padding-top` via FloatLabel tokens to each target selector.

## `on`

- Active label sits on top border line with a small background pill.
- Pill is produced with label background + horizontal padding + radius.
- Label z-index must be above control border.

## CSS Variable Token Contract

All variables use `--uilib-float-label-*`.

## Label colors

- `--uilib-float-label-color-rest`
- `--uilib-float-label-color-active`
- `--uilib-float-label-color-focus`
- `--uilib-float-label-color-invalid`

## Typography

- `--uilib-float-label-font-size-rest`
- `--uilib-float-label-font-size-active`
- `--uilib-float-label-font-weight-rest`
- `--uilib-float-label-font-weight-active`

## Positioning

- `--uilib-float-label-offset-x`
- `--uilib-float-label-over-active-top`
- `--uilib-float-label-in-active-top`

## Motion

- `--uilib-float-label-transition-duration`
- `--uilib-float-label-transition-timing`

## On variant (pill)

- `--uilib-float-label-on-radius`
- `--uilib-float-label-on-active-bg`
- `--uilib-float-label-on-active-padding`

## In variant (control spacing)

- `--uilib-float-label-in-control-padding-top`

## PrimeNG Divergences (Explicit)

| Area | PrimeNG `floatlabel` | `ui-lib-float-label` design |
|---|---|---|
| State hooks | Leans on Prime classes like `p-filled` | Uses hybrid strategy: native selectors + standardized wrapper classes (`uilib-inputwrapper-*`) plus existing `ui-lib-*` state classes. |
| Wrapper ecosystem | Prime controls already emit expected classes | Current `ui-lib` controls are mixed; this design introduces a normalization prerequisite. |
| IftaLabel relationship | Separate `ifta-label` component exists | No separate component planned; `variant='in'` is the canonical equivalent. |
| Placeholder handling | Prime theme-driven behavior | Explicit placeholder-collision strategy is included in FloatLabel contract. |

## Prerequisites Before Prompt 3 Implementation

Required for robust cross-control behavior:

1. `ui-lib-input`
   - Add generic host-level aliases:
     - `uilib-inputwrapper-focus` when focused
     - `uilib-inputwrapper-filled` when value is non-empty
   - Optional compatibility aliases:
     - `ui-lib-input--open` not needed
     - `ui-lib-input--has-value` optional if we standardize around generic aliases

2. `ui-lib-select`
   - Add host class `ui-lib-select--has-value` based on selected value.
   - Add host class `ui-lib-select--open` based on `open()`.
   - Add generic aliases: `uilib-inputwrapper-focus` (open/focus) and `uilib-inputwrapper-filled` (has value).

3. `ui-lib-autocomplete`
   - Keep existing `ui-lib-autocomplete--has-value` and `--open`.
   - Add generic aliases: `uilib-inputwrapper-focus` (open or focus) and `uilib-inputwrapper-filled` (hasValue).

4. `ui-lib-cascade-select`
   - Add host class `ui-lib-cascade-select--has-value` from existing `hasValue()` signal.
   - Keep `ui-lib-cascade-select--open`.
   - Add generic aliases: `uilib-inputwrapper-focus` (open/focus) and `uilib-inputwrapper-filled` (hasValue).

5. Token plumbing prerequisites
   - Add FloatLabel values to `projects/ui-lib-custom/src/lib/design-tokens.ts` first.
   - Map tokens to CSS vars in `ThemeConfigService` before component styling lands.

6. Documentation prerequisites
   - Add FloatLabel CSS variable entries under `docs/reference/systems/CSS_VARIABLES.md` when implementation starts.

## Implementation Guardrails for Prompt 2/3

- Keep component template as content-only (`<ng-content />`).
- Do not add behavior services or imperative DOM state observers for label state.
- Keep public API to `variant` only.
- Prefer package-path imports across entry points.
- Keep all public types as string unions.

## Prompt 1 Outcome

Design is approved when:

- API contract is unchanged from this document.
- Cross-control wrapper state prerequisites are accepted.
- Token contract is accepted as the source of visual values.
- PrimeNG divergences are acknowledged and intentional.

