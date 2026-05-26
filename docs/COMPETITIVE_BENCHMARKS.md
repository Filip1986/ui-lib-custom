# Competitive Benchmarks

> **Evidence file for Scoring Category 11 — Competitive Parity & Differentiation.**
> Every component that reaches production quality must have an entry in this file.
> The scoring criteria live in [`docs/SCORING_CRITERIA.md`](SCORING_CRITERIA.md).

---

## Purpose

This file answers two questions for every component:

1. **Parity** — does this component do everything the best competing implementations do?
2. **Beyond** — where does it go further than any of them?

It is not a marketing document. It is an engineering audit. Gaps are documented honestly.
Exclusions are justified with a reason. Differentiators are stated precisely.

---

## Reference Libraries

| Library              | Why it is a benchmark                                                                                                           | Docs                    |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| **Angular Material** | The Angular-native incumbent. Canonical baseline for what Angular developers expect.                                            | material.angular.io     |
| **PrimeNG**          | The most feature-complete Angular UI library in active use. The feature-richness baseline.                                      | primeng.org             |
| **Radix UI**         | The accessibility gold standard in any framework. Built directly around WAI-ARIA APG patterns. If Radix does it, it is correct. | radix-ui.com/primitives |
| **Ark UI**           | Modern headless component library (React/Vue/Solid). Best composability and API shape reference.                                | ark-ui.com              |
| **Melt UI**          | Headless Svelte library. Best reference for builder-pattern composability and slot architecture.                                | melt-ui.com             |

---

## Legend

| Symbol       | Meaning                                                                            |
|--------------|------------------------------------------------------------------------------------|
| ✅            | Implemented — at full parity with the reference                                    |
| 🚀           | **Beyond** — this library does something the reference does not, or does it better |
| ⚠️           | Partial — implemented but incomplete or with a known limitation                    |
| ❌            | Gap — reference has this; this library does not yet — active backlog item          |
| `—` Excluded | Consciously decided not to implement — reason documented inline                    |
| `N/A`        | The reference library has no equivalent or the concept does not apply              |

**A component only passes Category 11 when there are zero unresolved ❌ gaps.**
A `—` Excluded entry is not a gap — it is a decision. Gaps that are accepted must be promoted to exclusions with a written reason.

---

## Library-Wide Differentiators

These are capabilities that apply to **every** component in this library and that no Angular
reference library currently offers. They count toward the 🚀 "no reference library offers this"
checkbox for every component automatically — you do not need to re-document them per component.

| Differentiator                                                     | Angular Material                  | PrimeNG                   | Radix UI        | Ark UI            | Notes                             |
|--------------------------------------------------------------------|-----------------------------------|---------------------------|-----------------|-------------------|-----------------------------------|
| Signal-native inputs (`input()`, `model()`, `output()`)            | ❌ uses `@Input()`                 | ❌ uses `@Input()`         | N/A             | N/A               | Angular 17+ signal API throughout |
| Zoneless-compatible (`provideZonelessChangeDetection()`)           | ⚠️ partial                        | ❌                         | N/A             | N/A               | Every component tested zoneless   |
| SSR-safe out of the box (no `document`/`window` on server)         | ✅                                 | ⚠️ partial                | N/A             | N/A               | Guards enforced by convention     |
| Three runtime visual variants (material / bootstrap / minimal)     | ❌ one design system               | ❌ one design system       | ❌ unstyled only | ❌ unstyled only   | Variant switchable at runtime     |
| Design-token-driven via CSS custom properties (`--uilib-*`)        | ⚠️ uses MDC tokens, less flexible | ⚠️ partial token coverage | ❌               | ❌                 | Full token surface exposed        |
| `ViewEncapsulation.None` — cascade-friendly, no `::ng-deep` needed | ❌ Emulated encapsulation          | ❌ Emulated encapsulation  | N/A             | N/A               | Consumer can override freely      |
| Standalone-only, no NgModule                                       | ✅ (recent)                        | ✅ (recent)                | N/A             | N/A               | Native from day one               |
| Angular block syntax (`@if`, `@for`, `@switch`) throughout         | ⚠️ migrating                      | ⚠️ migrating              | N/A             | N/A               | 100% block syntax from day one    |

---

## How This File Relates to COMPETITIVE_STRATEGY.md

> **This file and [`COMPETITIVE_STRATEGY.md`](COMPETITIVE_STRATEGY.md) are sister documents with different purposes.**
>
> | This file | COMPETITIVE_STRATEGY.md |
> |---|---|
> | Internal engineering tool | External positioning strategy |
> | Tracks parity & 🚀 differentiators per component | Describes how to publish benchmark claims publicly |
> | Benchmarks against **any UI library** (React, Svelte, Angular) — the best reference, regardless of framework | Benchmarks against **Angular ecosystem only** (Angular Material, PrimeNG, Ng-Zorro) — libraries users are actually choosing between |
> | Feeds Category 11 scores in `COMPONENT_SCORES.md` | Feeds the "Built Different" section on the landing page |
> | Run continuously during hardening | Executed during Phase 4 (Public Beta) |
>
> The evidence built in this file **becomes the content** of the competitive strategy at launch.
> See [`ROADMAP.md`](ROADMAP.md) Phase 4 for when this data goes public.

---

## Per-Component Comparison Tables

Add a new entry for each component when it enters the hardening workflow.
Entries are in alphabetical order within each category grouping.

---

### How to Fill In a New Entry

1. Find the equivalent component in each reference library (or note `N/A`).
2. Read its full feature list, input/output API, keyboard model, and ARIA implementation.
3. For each row: mark ✅ ❌ ⚠️ 🚀 or N/A. Be honest.
4. Add a **Gaps** section listing every ❌ row and the decision: implement it or exclude it with a reason.
5. Add a **Differentiators** section listing every 🚀 row with a one-sentence explanation.
6. Record the reference URLs at the bottom of the entry.

---

### Template

```markdown
### ComponentName

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|---|---|---|---|---|---|
| Feature description | ✅/❌/⚠️/N/A | ✅/❌/⚠️/N/A | ✅/❌/⚠️/N/A | ✅/❌/⚠️/N/A | ✅/🚀/⚠️/❌ |

#### Gaps (❌ rows — must be resolved before Category 11 passes)
- **Feature name**: [implement by date] / [— Excluded: reason]

#### Differentiators (🚀 rows)
- **Feature name**: [one sentence explaining what this library does that the reference does not]

#### Reference URLs
- Angular Material: [URL or "no equivalent"]
- PrimeNG: [URL or "no equivalent"]
- Radix UI: [URL or "no equivalent"]
- Ark UI: [URL or "no equivalent"]
- APG Pattern: [URL]
```

---

## Core Inputs

---

### Button

| Feature / Behaviour                         | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|---------------------------------------------|------------------|---------|----------|--------|-------------------|
| Filled / solid variant                      | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Outlined variant                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Text / ghost variant                        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Size variants (sm / md / lg)                | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Icon-only button                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Icon + label button                         | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Leading icon slot                           | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Trailing icon slot                          | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Loading / busy state                        | ❌                | ✅       | ❌        | ✅      | ✅                 |
| `aria-busy` on loading                      | ❌                | ⚠️      | ❌        | ⚠️     | 🚀                |
| `aria-disabled` (not HTML `disabled`)       | ⚠️               | ⚠️      | ✅        | ✅      | ✅                 |
| Ripple effect                               | ✅                | ✅       | ❌        | ❌      | ✅                 |
| Danger / destructive severity               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Link-style button (`routerLink` compatible) | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API (`input()`)               | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                         | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants               | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-busy` on loading**: Angular Material and PrimeNG set a visual spinner but do not set `aria-busy="true"` on the button element, so screen readers do not announce the busy state. This library sets it correctly.
- **Signal-native API**: Both Angular incumbents use `@Input()` decorators. This library uses `input()` / `model()` throughout, enabling signal composition with no adapter layer.
- **Three runtime visual variants**: No other Angular library lets you switch between Material, Bootstrap, and Minimal aesthetics at runtime via a single CSS variable change.

#### Reference URLs
- Angular Material: https://material.angular.io/components/button/overview
- PrimeNG: https://primeng.org/button
- Radix UI: https://www.radix-ui.com/primitives/docs/components/slot (no dedicated Button primitive — uses native `<button>`)
- Ark UI: https://ark-ui.com — no dedicated Button primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/

---

### Select

| Feature / Behaviour                                        | Angular Material | PrimeNG    | Radix UI | Ark UI | **ui-lib-custom** |
|------------------------------------------------------------|------------------|------------|----------|--------|-------------------|
| Single selection                                           | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Multi-selection with chips                                 | ✅                | ✅          | ❌        | ✅      | ✅                 |
| Searchable / filterable options                            | ❌                | ✅          | ❌        | ✅      | ✅                 |
| Option groups                                              | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Custom option template                                     | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Custom trigger / selected-value template                   | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Virtualized option list                                    | ❌                | ✅          | ❌        | ❌      | ✅                 |
| APG Combobox keyboard model (arrows, Home/End, type-ahead) | ✅                | ⚠️ partial | ✅        | ✅      | ✅                 |
| `aria-activedescendant` pattern                            | ✅                | ⚠️ partial | ✅        | ✅      | ✅                 |
| `aria-expanded` on trigger                                 | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Focus returns to trigger on close                          | ✅                | ⚠️         | ✅        | ✅      | ✅                 |
| `ControlValueAccessor` (Reactive Forms)                    | ✅                | ✅          | N/A      | N/A    | ✅                 |
| `disabled` individual options                              | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Loading state for async options                            | ❌                | ✅          | ❌        | ❌      | ✅                 |
| Signal-native API (`input()`)                              | ❌                | ❌          | N/A      | N/A    | 🚀                |
| Zoneless compatible                                        | ❌                | ❌          | N/A      | N/A    | 🚀                |
| Three runtime visual variants                              | ❌                | ❌          | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Virtualized option list**: Angular Material's Select does not virtualize long lists. This library renders only the visible options for unbounded datasets.
- **Loading state for async options**: A first-class loading input that shows a spinner inside the panel — none of the React-ecosystem libraries support this natively.
- **Signal-native API**: Full `input()` / `model()` — consumers get type-safe signal composition for free.

#### Reference URLs
- Angular Material: https://material.angular.io/components/select/overview
- PrimeNG: https://primeng.org/select
- Radix UI: https://www.radix-ui.com/primitives/docs/components/select
- Ark UI: https://ark-ui.com/react/docs/components/select
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

---

### Input

| Feature / Behaviour                                    | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Text, email, password, number types                    | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Label association (`<label for>` or `aria-labelledby`) | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Floating label                                         | ✅                | ✅       | ❌        | ❌      | ✅                 |
| Prefix / suffix icon slots                             | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Prefix / suffix text slots                             | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Helper text below input                                | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Error message via `aria-describedby`                   | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-invalid` on error state                          | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Character count                                        | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `ControlValueAccessor`                                 | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Clearable (× button)                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Password visibility toggle with accessible label       | ⚠️               | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                      | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                    | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                          | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None._

#### Differentiators
- **Error message via `aria-describedby`**: PrimeNG attaches validation messages visually but does not consistently wire `aria-describedby` on the input to the error element. This library wires it correctly and cleans up the reference when the error clears.

#### Reference URLs
- Angular Material: https://material.angular.io/components/input/overview
- PrimeNG: https://primeng.org/inputtext
- Radix UI: N/A (no form input primitive — uses native `<input>`)
- Ark UI: https://ark-ui.com/react/docs/components/pin-input (closest)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (native `<input>` — ARIA authoring notes apply)

---

### AutoComplete

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI   | Ark UI     | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|------------|------------|-------------------|
| Single-value combobox                                        | ✅                | ✅       | ✅          | ✅          | ✅                 |
| Multiple selection (chip list)                               | ✅                | ✅       | ⚠️         | ✅          | ✅                 |
| `role=combobox` + `aria-expanded`                            | ✅                | ✅       | ✅          | ✅          | ✅                 |
| `aria-activedescendant` pointing to focused option           | ✅                | ⚠️      | ✅          | ✅          | ✅                 |
| `aria-live` announcement when result count changes           | ❌                | ⚠️      | ❌          | ⚠️         | 🚀                |
| Grouped options with group label                             | ✅                | ✅       | N/A        | ✅          | ✅                 |
| Typed `ng-template` slot for custom option rendering         | ❌                | ✅       | N/A        | N/A        | 🚀                |
| Dropdown button to show all options                          | ❌                | ✅       | N/A        | ✅          | ✅                 |
| `forceSelection` mode (freetext blocked)                     | ❌                | ✅       | N/A        | N/A        | ✅                 |
| Clear button with accessible label                           | ❌                | ✅       | ✅          | ✅          | ✅                 |
| Minimum query length before suggestions appear               | ❌                | ✅       | N/A        | N/A        | ✅                 |
| Virtual scroll for large option lists                        | ❌                | ✅       | N/A        | N/A        | ✅                 |
| `ControlValueAccessor`                                       | ✅                | ✅       | N/A        | N/A        | ✅                 |
| Loading state while suggestions are fetched                  | ❌                | ✅       | N/A        | N/A        | ✅                 |
| Signal-native API (`input()`, `model()`, `output()`)         | ❌                | ❌       | N/A        | N/A        | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A        | N/A        | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌          | ❌          | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-live` result count announcement**: When suggestions load or filter, the count is announced in a visually-hidden live region. Angular Material omits this entirely; PrimeNG and Ark UI announce inconsistently. Screen-reader users always know how many options are available.
- **Typed `ng-template` option slot**: The option template slot is `TemplateRef<AutoCompleteOptionContext>` — consumers get full IDE autocomplete on the implicit context object. Angular Material's autocomplete has no equivalent typed-template mechanism.
- **Signal-native API**: `model()` binding for value, `output()` for events — composes natively with Angular signals without zone-based change detection.

#### Reference URLs
- Angular Material: https://material.angular.io/components/autocomplete/overview
- PrimeNG: https://primeng.org/autocomplete
- Radix UI: https://www.radix-ui.com/primitives/docs/components/combobox (no dedicated AutoComplete — uses Combobox)
- Ark UI: https://ark-ui.com/react/docs/components/combobox
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

---

### Checkbox

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Checked / unchecked states                                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Indeterminate state                                          | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-checked=mixed` on indeterminate                        | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| Label association via `<label>` + `for`                      | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Disabled state with `aria-disabled`                          | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Checkbox group with `role=group` + `aria-labelledby`         | ✅                | ✅       | N/A      | N/A    | 🚀                |
| `aria-required` propagation                                  | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| Ripple / focus-visible ring                                  | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `ControlValueAccessor`                                       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Custom check icon slot                                       | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API (`model()` for two-way binding)            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-checked=mixed` correctness**: PrimeNG renders the indeterminate visual state but does not reliably set `aria-checked=mixed` on the underlying `<input type=checkbox>`. This library sets it correctly so screen readers announce "mixed" rather than "unchecked".
- **`role=group` on checkbox group**: The group wrapper correctly uses `role=group` with `aria-labelledby` pointing to the group heading, giving screen readers the grouping context. Angular Material's checkbox group is a visual convention only.
- **Signal-native `model()` binding**: Two-way binding uses `model<boolean>()` — composes directly with `signal` and `computed` without any zone or `ngModel` adapter.

#### Reference URLs
- Angular Material: https://material.angular.io/components/checkbox/overview
- PrimeNG: https://primeng.org/checkbox
- Radix UI: https://www.radix-ui.com/primitives/docs/components/checkbox
- Ark UI: https://ark-ui.com/react/docs/components/checkbox
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

---

### DatePicker

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Calendar popup triggered from input                          | ✅                | ✅       | ❌        | ✅      | ✅                 |
| Inline calendar mode (no popup)                              | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Month / year header navigation                               | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Calendar grid keyboard nav (arrow keys, Enter, Escape)       | ✅                | ✅       | N/A      | ✅      | ✅                 |
| `role=grid` on calendar with `aria-label` on each cell       | ✅                | ⚠️      | N/A      | ✅      | ✅                 |
| Today indicator                                              | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Min / max date constraints                                   | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Disabled individual dates                                    | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Date range selection (start + end)                           | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Multiple non-contiguous date selection                       | ❌                | ✅       | N/A      | ❌      | — Excluded: niche use case, adds significant ARIA complexity; prioritised for backlog |
| Time picker integration                                      | ❌                | ✅       | N/A      | ✅      | — Excluded: separate `TimePicker` component planned; mixing date+time in one popup degrades keyboard UX |
| Month-view and year-view picker                              | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Manual text input with format mask                           | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Live region announcing selected date                         | ⚠️               | ⚠️      | N/A      | ✅      | 🚀                |
| `aria-describedby` linking input to format hint              | ⚠️               | ❌       | N/A      | ✅      | ✅                 |
| `ControlValueAccessor`                                       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
- **Multiple non-contiguous date selection**: — Excluded: niche enterprise use case that adds significant ARIA complexity (`aria-multiselectable=true` + `aria-selected` on every cell). Prioritised for the backlog; not blocking Category 11 passage.
- **Time picker integration**: — Excluded: a dedicated `TimePicker` component is planned. Mixing date and time in a single popup degrades keyboard UX and bloats the date-picker API; the two components compose together instead.

#### Differentiators
- **Live region for selected date**: When a date is selected via keyboard or pointer, the formatted date is announced in a visually-hidden `aria-live=polite` region. Angular Material and PrimeNG rely on focus movement alone — screen readers must navigate to the input to hear what was selected.
- **`aria-describedby` format hint**: The text input is linked via `aria-describedby` to a visually-hidden format hint (e.g. "DD/MM/YYYY"). Angular Material omits this; PrimeNG does not wire it accessibly.
- **Signal-native API**: `model<Date | null>()` binding, range as `model<DateRange>()` — composes natively with signal graphs.

#### Reference URLs
- Angular Material: https://material.angular.io/components/datepicker/overview
- PrimeNG: https://primeng.org/datepicker
- Radix UI: N/A — no DatePicker primitive (team recommends third-party)
- Ark UI: https://ark-ui.com/react/docs/components/date-picker
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

---

### Rating

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=radiogroup` on the container                           | ❌ (no Rating)   | ⚠️ div with no group role | N/A | ✅ | 🚀 |
| `role=radio` per star item                                   | ❌                | ⚠️ span with no role | N/A | ✅ | 🚀 |
| `aria-checked` on the selected star                          | ❌                | ⚠️      | N/A      | ✅      | 🚀                |
| `aria-label` per star item (e.g. "1 star", "2 stars")        | ❌                | ❌       | N/A      | ✅      | 🚀                |
| Arrow key navigation between stars (← / →)                  | ❌                | ❌       | N/A      | ✅      | 🚀                |
| Clearable — allow deselecting the current rating             | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Read-only / display-only mode                                | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Disabled state with `aria-disabled`                          | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Number of stars configurable                                 | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Custom star icon template                                    | ❌                | ✅       | N/A      | ✅      | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` two-way binding)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — Angular Material has no Rating component; all PrimeNG features are matched and several a11y gaps are resolved._

#### Differentiators
- **`role=radiogroup` / `role=radio` pattern**: The WAI-ARIA APG's closest pattern for a rating widget is a group of radio buttons. PrimeNG implements Rating as interactive `<span>` elements with click handlers but no ARIA group role or `role=radio` — leaving screen reader users without any semantic context for the widget. This library follows the radiogroup pattern so screen readers announce "1 star, radio button, 1 of 5" for each item.
- **Arrow key navigation**: Moving focus between stars with ← / → matches the radiogroup keyboard contract. PrimeNG requires individual Tab stops on each star (no arrow key navigation), breaking the expected radio group interaction model.
- **`aria-label` per star item**: Each star receives a computed accessible label (e.g., "1 star", "2 stars") so screen readers can announce the star's value when it receives keyboard focus, even before selection.
- **Signal-native API**: `model<number>()` for `[(value)]` two-way binding — no `@Input()`/`@Output()` adapter needed.

#### Reference URLs
- Angular Material: https://material.angular.io — no Rating component
- PrimeNG: https://primeng.org/rating
- Radix UI: N/A — no Rating primitive
- Ark UI: https://ark-ui.com/react/docs/components/rating-group
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/ (Rating follows the radiogroup keyboard model)

---

### Password

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Password strength meter                                      | ❌ (no Password) | ✅ visual only | N/A | N/A | ✅ |
| Strength meter as `role=status` with `aria-live=polite`      | ❌                | ❌       | N/A      | N/A    | 🚀                |
| "Show / Hide password" toggle button                         | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Toggle button `aria-label` updates to reflect current state  | ❌                | ⚠️      | N/A      | N/A    | 🚀                |
| Toggle button `aria-pressed` communicates pressed state      | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-describedby` on input wired to strength feedback       | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `input[type=password]` / `type=text` toggle on reveal        | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `autocomplete=current-password` / `new-password` support     | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-invalid` on invalid state                              | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` two-way binding)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no Password component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **Strength meter as `role=status` live region**: The password strength meter container has `role=status` and `aria-live=polite`. When the strength level changes (e.g., from "weak" to "medium"), the updated label is announced automatically by screen readers. PrimeNG's strength meter is purely visual — no ARIA role or live region — so screen reader users receive zero feedback about their password strength as they type.
- **Toggle button state with `aria-pressed` + dynamic `aria-label`**: The "Show/Hide password" button uses `aria-pressed` (true/false) and its `aria-label` updates between "Show password" and "Hide password" to match the current state. PrimeNG's toggle button has an inconsistent accessible label that does not accurately communicate which action will occur next.
- **`aria-describedby` wired to strength feedback**: The password input's `aria-describedby` points to the strength meter container, creating a formal programmatic relationship. Screen readers can read the current strength feedback on demand when the input has focus, without waiting for the live region to announce it.

#### Reference URLs
- Angular Material: https://material.angular.io — no Password component
- PrimeNG: https://primeng.org/password
- Radix UI: N/A — no Password primitive
- Ark UI: N/A — no Password primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (toggle button pattern for the show/hide control)

---

### Slider

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=slider`                                                | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-valuenow` / `aria-valuemin` / `aria-valuemax`          | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-valuetext` from a value-format function                | ⚠️ partial       | ⚠️      | ✅        | ✅      | 🚀                |
| Arrow key step (← / → / ↑ / ↓)                              | ✅                | ✅       | ✅        | ✅      | ✅                 |
| PageUp / PageDown for larger step                            | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Home / End for min / max                                     | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Range slider (two thumbs)                                    | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Range slider — independent `aria-label` per thumb            | ⚠️               | ⚠️      | ✅        | ✅      | 🚀                |
| Tick marks / stops                                           | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Vertical orientation                                         | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Disabled state with `aria-disabled`                          | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` for value)                      | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-valuetext` from format function**: A `valueText` input accepts a `(value: number) => string` function that generates a human-readable label (e.g., `v => v + ' decibels'`). The result is set as `aria-valuetext` automatically. Angular Material supports a `displayWith` function but does not consistently propagate it to `aria-valuetext`; PrimeNG does not compute `aria-valuetext` from any formatting configuration.
- **Range slider per-thumb `aria-label`**: In range mode, each thumb gets an independently configurable `aria-label` (e.g., "Minimum price", "Maximum price") so screen readers distinguish between the two handles. Angular Material and PrimeNG provide only a single label that applies to both thumbs or the container.
- **Signal-native API**: `model<number>()` for single value, `model<[number, number]>()` for range — both fully two-way bindable as signals composing with `computed()` without zone triggers.

#### Reference URLs
- Angular Material: https://material.angular.io/components/slider/overview
- PrimeNG: https://primeng.org/slider
- Radix UI: https://www.radix-ui.com/primitives/docs/components/slider
- Ark UI: https://ark-ui.com/react/docs/components/slider
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/

---

### CascadeSelect

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Multi-level cascading dropdown panels                        | ❌ (no CascadeSelect) | ✅ | N/A | N/A | ✅ |
| `role=combobox` on the trigger input                         | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-haspopup=listbox` on trigger                           | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-expanded` on trigger                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `aria-activedescendant` tracked through all levels           | ❌                | ⚠️ loses track at sub-levels | N/A | N/A | 🚀 |
| Arrow key navigation within each level                       | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Right-arrow opens the next nested level                      | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Left-arrow / Escape returns to the parent level              | ❌                | ⚠️      | N/A      | N/A    | 🚀                |
| Escape from the top level closes entirely                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom option `ng-template`                                  | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` two-way binding)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no CascadeSelect equivalent; PrimeNG is the only real reference and all features are matched._

#### Differentiators
- **`aria-activedescendant` tracked through all levels**: As the user navigates into cascading sub-panels, `aria-activedescendant` on the trigger input is continuously updated to point to the currently focused option — even across panel boundaries. PrimeNG partially implements `aria-activedescendant` but loses tracking when the user descends into sub-levels, causing screen readers to fall silent on the highlighted option.
- **Left-arrow / Escape returns to parent level**: Pressing ← or Escape from within a sub-panel collapses that panel and restores focus to the parent option, following the multi-level combobox hybrid keyboard contract. PrimeNG handles this inconsistently — in some configurations, Escape closes the entire dropdown rather than just the current sub-panel.
- **Signal-native API**: `model<T>()` for `[(value)]` — the selected item composes with `computed()` signals for dependent field derivation without RxJS subscription management.

#### Reference URLs
- Angular Material: https://material.angular.io — no CascadeSelect equivalent
- PrimeNG: https://primeng.org/cascadeselect
- Radix UI: N/A — no CascadeSelect primitive
- Ark UI: N/A — no CascadeSelect primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ (CascadeSelect is a multi-level combobox variant)

---

### InputNumber

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=spinbutton`                                            | ⚠️ not exposed   | ✅       | ✅        | ✅      | ✅                 |
| `aria-valuenow` / `aria-valuemin` / `aria-valuemax`          | ⚠️               | ✅       | ✅        | ✅      | ✅                 |
| `aria-valuetext` derived from locale-formatted value         | ❌                | ⚠️      | ✅        | ✅      | 🚀                |
| Up / Down arrow increments / decrements                      | ⚠️               | ✅       | ✅        | ✅      | ✅                 |
| PageUp / PageDown for a larger step                          | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Home / End for min / max                                     | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Increment / Decrement buttons with descriptive `aria-label`  | ⚠️               | ⚠️      | ✅        | ✅      | 🚀                |
| Locale-aware number formatting                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Currency mode with locale formatting                         | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Prefix / Suffix display text                                 | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` two-way binding)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — Angular Material has no InputNumber component; all ❌ reference rows are matched._

#### Differentiators
- **`aria-valuetext` from locale-formatted value**: When a number is displayed with locale formatting (e.g., currency "€1,234.50" or a percentage "75%"), `aria-valuetext` is set to the formatted string so screen readers announce "1234 euros 50 cents" or "75 percent" rather than the raw integer from `aria-valuenow`. PrimeNG does not compute `aria-valuetext` from its locale formatter; screen readers announce the raw numeric value.
- **Increment/Decrement buttons with descriptive `aria-label`**: The ± buttons carry specific `aria-label` values that include the step size and, where the field has a label, the field name (e.g., "Increase quantity by 1", "Decrease quantity by 1"). PrimeNG's increment/decrement buttons have generic or absent accessible names.
- **Signal-native API**: `model<number | null>()` for `[(value)]` — composes with `computed()` for derived totals and dependent field validation without zone triggers.

#### Reference URLs
- Angular Material: https://material.angular.io — no InputNumber component (native `<input type="number">` used directly)
- PrimeNG: https://primeng.org/inputnumber
- Radix UI: https://www.radix-ui.com/primitives/docs/components/number-field
- Ark UI: https://ark-ui.com/react/docs/components/number-input
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/

---

### InputMask

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Masked input with character-position enforcement             | ❌ (no InputMask) | ✅      | N/A      | N/A    | ✅                 |
| `aria-describedby` on input wired to format hint             | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Visually-hidden format hint text associated programmatically | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-invalid` on invalid / incomplete input                 | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-label` / `aria-labelledby` passthrough                 | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| Placeholder character configurable                           | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `unmask` mode (emits raw value without mask characters)      | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Optional segment support within a mask                       | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` two-way binding)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no InputMask component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **`aria-describedby` wired to format hint**: The input has `aria-describedby` pointing to a visually-hidden element that describes the expected format (e.g., "Format: DD/MM/YYYY"). Screen readers announce this description when the field receives focus, so users know what pattern to enter before making an error. PrimeNG does not programmatically associate any format hint with the input element.
- **Visually-hidden format hint**: A `<span class="sr-only">` with the mask pattern is rendered adjacent to the input and linked via `aria-describedby`. This satisfies WCAG SC 1.3.1 (Info and Relationships) and SC 3.3.2 (Labels or Instructions) for format-constrained inputs.
- **Signal-native API**: `model<string>()` for `[(value)]` — the masked or unmasked value composes with signal-based form validation without zone triggers or RxJS subscription management.

#### Reference URLs
- Angular Material: https://material.angular.io — no InputMask component
- PrimeNG: https://primeng.org/inputmask
- Radix UI: N/A — no InputMask primitive
- Ark UI: N/A — no InputMask primitive (Ark's Pin Input covers OTP; general mask is not provided)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (ARIA authoring guidance for format-constrained text inputs)

---

### ColorPicker

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Hue-saturation gradient canvas                               | ❌ (no ColorPicker) | ✅    | N/A      | ✅      | ✅                 |
| Hue slider                                                   | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Opacity / alpha slider                                       | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Hex input field                                              | ❌                | ✅       | N/A      | ✅      | ✅                 |
| RGB / HSB / HSL channel input fields                         | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Hue/saturation area as `role=slider` with keyboard nav       | ❌                | ❌       | N/A      | ✅      | 🚀                |
| `aria-valuetext` with colour name / hex string               | ❌                | ❌       | N/A      | ✅      | 🚀                |
| Arrow key navigation of the gradient canvas                  | ❌                | ❌       | N/A      | ✅      | ✅                 |
| Inline + popup (overlay) modes                               | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Preset colour swatches                                       | ❌                | ❌       | N/A      | ✅      | ✅                 |
| `ControlValueAccessor` (ngModel / reactive forms)            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` two-way binding)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no ColorPicker component; all ❌ reference rows are matched._

#### Differentiators
- **Hue/saturation canvas as `role=slider`**: The 2D gradient canvas is exposed as `role=slider` — the correct ARIA pattern for a bidirectional interactive widget. Arrow keys move the selection point on two axes; `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` communicate the current saturation level. PrimeNG's canvas area has no ARIA role and no keyboard navigation, making it completely inaccessible to keyboard-only and screen reader users.
- **`aria-valuetext` with colour description**: The hue slider and saturation area carry `aria-valuetext` containing the resulting hex value or colour name (e.g., "Sky blue, #87CEEB"), giving screen reader users a human-readable description of the selected colour rather than a raw number.
- **Signal-native API**: `model<string>()` for `[(value)]` — the hex/RGB string composes with `computed()` signals for live contrast checking, dependent input validation, and preview updates.

#### Reference URLs
- Angular Material: https://material.angular.io — no ColorPicker component
- PrimeNG: https://primeng.org/colorpicker
- Radix UI: N/A — no ColorPicker primitive
- Ark UI: https://ark-ui.com/react/docs/components/color-picker
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/ (each colour axis follows the slider pattern)

---

## Overlay & Modal

---

### Dialog

| Feature / Behaviour                           | Angular Material | PrimeNG    | Radix UI | Ark UI | **ui-lib-custom** |
|-----------------------------------------------|------------------|------------|----------|--------|-------------------|
| `role=dialog`                                 | ✅                | ✅          | ✅        | ✅      | ✅                 |
| `aria-modal=true`                             | ✅                | ⚠️         | ✅        | ✅      | ✅                 |
| `aria-labelledby` wired to header             | ✅                | ⚠️         | ✅        | ✅      | ✅                 |
| `aria-describedby` wired to body              | ✅                | ❌          | ✅        | ✅      | ✅                 |
| Focus trap (CDK or equivalent)                | ✅                | ⚠️ partial | ✅        | ✅      | ✅                 |
| Initial focus on first focusable element      | ✅                | ⚠️         | ✅        | ✅      | ✅                 |
| Focus returns to trigger on close             | ✅                | ⚠️         | ✅        | ✅      | ✅                 |
| Escape key closes dialog                      | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Backdrop click closes dialog (configurable)   | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Scroll lock on open                           | ✅                | ✅          | ✅        | ✅      | ✅                 |
| Enter / exit animations                       | ✅                | ✅          | ✅        | ✅      | ✅                 |
| `prefers-reduced-motion` respected            | ⚠️               | ❌          | ✅        | ✅      | ✅                 |
| Maximisable                                   | ❌                | ✅          | ❌        | ❌      | ✅                 |
| Draggable / resizable                         | ❌                | ✅          | ❌        | ❌      | ✅                 |
| Programmatic open / close API (service-based) | ❌                | ✅          | ❌        | ✅      | ✅                 |
| Signal-native API                             | ❌                | ❌          | N/A      | N/A    | 🚀                |
| Zoneless compatible                           | ❌                | ❌          | N/A      | N/A    | 🚀                |
| Three runtime visual variants                 | ❌                | ❌          | ❌        | ❌      | 🚀                |

#### Gaps
_None._

#### Differentiators
- **`aria-describedby` wired to body**: PrimeNG does not wire `aria-describedby` on the dialog element to its body region. Screen readers therefore do not automatically read the dialog content on open. This library wires it correctly.
- **`prefers-reduced-motion`**: PrimeNG dialog animations do not respect `prefers-reduced-motion`. This library suppresses or replaces all dialog animations when reduced motion is preferred.

#### Reference URLs
- Angular Material: https://material.angular.io/components/dialog/overview
- PrimeNG: https://primeng.org/dialog
- Radix UI: https://www.radix-ui.com/primitives/docs/components/dialog
- Ark UI: https://ark-ui.com/react/docs/components/dialog
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

---

### Tooltip

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `aria-describedby` wiring (not `title` attribute)            | ⚠️               | ⚠️      | ✅        | ✅      | 🚀                |
| Reference cleaned up on hide (no stale `aria-describedby`)   | ⚠️               | ⚠️      | ✅        | ✅      | 🚀                |
| Trigger on hover                                             | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Trigger on focus (keyboard accessible)                       | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Show / hide delay                                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Positioning (top / bottom / left / right + auto-flip)        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Rich content via `ng-template`                               | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Escape key dismisses open tooltip                            | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| Does not intercept pointer events on trigger                 | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `prefers-reduced-motion` — animation disabled                | ⚠️               | ⚠️      | ✅        | ✅      | ✅                 |
| Tooltip on disabled elements (wrapper span strategy)         | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-describedby` lifecycle correctness**: Angular Material uses the `title` attribute for some tooltip implementations, which is read inconsistently by screen readers. PrimeNG wires `aria-describedby` but does not reliably remove the reference when the tooltip hides. This library adds the reference on show and removes it on hide, exactly as Radix UI does.
- **Stale reference cleanup**: The tooltip content element uses a stable `id`; the trigger element's `aria-describedby` is added and removed on each show/hide cycle — no stale references linger if the tooltip is destroyed mid-cycle.
- **Signal-native API**: Tooltip text/content bound via `input()` — supports computed signal values without `async` pipe.

#### Reference URLs
- Angular Material: https://material.angular.io/components/tooltip/overview
- PrimeNG: https://primeng.org/tooltip
- Radix UI: https://www.radix-ui.com/primitives/docs/components/tooltip
- Ark UI: https://ark-ui.com/react/docs/components/tooltip
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

---

### ConfirmDialog

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=alertdialog`                                           | ❌                | ✅       | ✅        | ✅      | ✅                 |
| `aria-modal=true`                                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Focus lands on primary action on open                        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Focus restored to trigger on close                           | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Focus trapped inside while open                              | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Escape key closes without confirming                         | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Custom confirm / reject labels                               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Severity / icon variants (warn / danger / info)              | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Service-based API for programmatic trigger                   | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Custom content via `ng-template`                             | ❌                | ✅       | ✅        | ✅      | ✅                 |
| `prefers-reduced-motion` — animation disabled                | ⚠️               | ⚠️      | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`role=alertdialog` correctness**: Angular Material's dialog uses `role=dialog` even for confirmation prompts. `role=alertdialog` signals to screen readers that the dialog is blocking and requires immediate response — this is the semantically correct role for a confirm action.
- **Severity variants**: Warn, danger, and info icon variants give users a visual and semantic cue about the weight of the action. Angular Material has no built-in variant system for confirmation dialogs.
- **Signal-native service API**: The `ConfirmationService.confirm()` call accepts signal-derived options. Accept/reject outcomes are handled via observables or signal subscriptions without zone-based change detection.

#### Reference URLs
- Angular Material: https://material.angular.io/components/dialog/overview (general Dialog — no dedicated ConfirmDialog)
- PrimeNG: https://primeng.org/confirmdialog
- Radix UI: https://www.radix-ui.com/primitives/docs/components/alert-dialog
- Ark UI: https://ark-ui.com/react/docs/components/dialog (no dedicated confirm — use Dialog)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/

---

### Drawer

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=dialog` + `aria-modal=true`                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Position variants (left / right / top / bottom)              | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Focus trapped while open                                     | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Focus restored to trigger on close                           | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Escape key closes                                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Backdrop click closes                                        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Scroll lock on body while open                               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Dismissible close button with accessible label               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Size variants (sm / md / lg / full-screen)                   | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Header / footer / content projection slots                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Slide-in / out animation                                     | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `prefers-reduced-motion` — animation disabled                | ⚠️               | ⚠️      | ✅        | ✅      | ✅                 |
| Signal-native API (`model()` for open state)                 | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`model()` open state**: The `open` binding is a `model<boolean>()` — two-way binding with `[(open)]` composes natively with signals without needing `EventEmitter` or `(visibleChange)` adapter patterns.
- **`prefers-reduced-motion` correctness**: Angular Material and PrimeNG both omit the reduced-motion handling for the slide animation. This library disables the transform/opacity transition entirely when the user prefers reduced motion, matching Radix and Ark behaviour.
- **Three runtime visual variants**: Material, Bootstrap, and Minimal appearances are switchable at runtime — no rebuild required.

#### Reference URLs
- Angular Material: https://material.angular.io/components/sidenav/overview
- PrimeNG: https://primeng.org/drawer
- Radix UI: https://www.radix-ui.com/primitives/docs/components/dialog (Sheet/Drawer built on Dialog primitive)
- Ark UI: https://ark-ui.com/react/docs/components/drawer
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

---

### Popover

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `aria-haspopup=dialog` on trigger                            | ❌                | ⚠️ no `aria-haspopup` set | ✅ | ✅ | 🚀 |
| `aria-expanded` on trigger                                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-controls` pointing to the panel                        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `role=dialog` on the popup panel                             | ⚠️ OverlayPanel variant | ⚠️ no role | ✅ | ✅ | 🚀 |
| `aria-labelledby` on the dialog                              | ❌                | ❌       | ✅        | ✅      | ✅                 |
| Focus moves into the popup on open                           | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| Escape closes popup + returns focus to trigger               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Click outside closes popup                                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Focus trap (modal popover mode)                              | ❌                | ❌       | ✅        | ✅      | ✅                 |
| Positioning (top / bottom / left / right + alignment)        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Custom content via content projection                        | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `model()` for `[(visible)]` two-way binding                  | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `prefers-reduced-motion` — enter/exit animation disabled     | ⚠️               | ⚠️      | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-haspopup=dialog` on trigger**: When the popover contains rich, arbitrary content (not a menu), `aria-haspopup=dialog` is the correct value to communicate to screen readers that the trigger opens a dialog-like panel. PrimeNG's OverlayPanel sets no `aria-haspopup` value, leaving screen readers without any hint of what will appear on activation.
- **`role=dialog` on the panel**: PrimeNG renders a plain `<div>` with no ARIA role on its OverlayPanel; Radix UI and Ark UI both use `role=dialog`. This library uses `role=dialog` with `aria-labelledby` wired to any heading inside, giving screen readers a proper entry announcement on focus movement into the popover.
- **`model()` for `[(visible)]`**: The open/closed state is a `model<boolean>()` signal — consumers get two-way binding via `[(visible)]` with no `@Output() visibleChange` event handler boilerplate.

#### Reference URLs
- Angular Material: https://material.angular.io/cdk/overlay/overview (no dedicated Popover component)
- PrimeNG: https://primeng.org/popover
- Radix UI: https://www.radix-ui.com/primitives/docs/components/popover
- Ark UI: https://ark-ui.com/react/docs/components/popover
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (Popover follows the non-modal dialog pattern)

---

### ConfirmPopup

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=alertdialog` (not just `dialog`)                       | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `aria-labelledby` wired to the header / message heading      | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-describedby` wired to the message text                 | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| Default focus on the accept / confirm button                 | ❌                | ⚠️ inconsistent | N/A | N/A | 🚀 |
| Escape closes + returns focus to trigger                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Click outside closes + returns focus                         | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Focus returns to the exact trigger element on close          | ❌                | ⚠️      | N/A      | N/A    | 🚀                |
| Anchored positioning to a trigger element                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Severity variants (warn / danger / info)                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom icon input                                            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Service-based API (`ConfirmationService`)                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `model()` for `[(visible)]` two-way binding                  | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no anchored confirm dialog; PrimeNG is the only real reference and all its features are matched._

#### Differentiators
- **Default focus on the accept button**: When ConfirmPopup opens, focus moves directly to the accept/confirm action rather than the cancel button or the container. This is the correct behavior per WAI-ARIA `alertdialog` guidance — the purpose of the widget is to prompt for a decision, so the affirmative action is focus-ready immediately. PrimeNG manages initial focus inconsistently across its confirm components.
- **Focus return to the exact trigger element**: When the popup is dismissed (by confirming, cancelling, pressing Escape, or clicking outside), focus returns precisely to the element that triggered it. PrimeNG handles this inconsistently — focus can drop to the document body when a trigger is conditionally rendered.
- **Signal-native API**: `model<boolean>()` for `[(visible)]`; confirmation and rejection callbacks wired as `output<void>()` signals — no `@Input()`/`@Output()` adapter layer needed.

#### Reference URLs
- Angular Material: https://material.angular.io — no ConfirmPopup equivalent (dialog used for confirmations)
- PrimeNG: https://primeng.org/confirmpopup
- Radix UI: N/A — no anchored alert dialog primitive
- Ark UI: N/A — no ConfirmPopup primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/

---

### DynamicDialog

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Programmatic creation via a service                          | ✅ MatDialog     | ✅ DialogService | N/A | N/A | ✅ |
| Dynamically loaded component as dialog content               | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `role=dialog` on the container                               | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `aria-modal=true`                                            | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Focus trap within the dialog                                 | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Focus returns to the exact trigger on close                  | ✅                | ⚠️      | N/A      | N/A    | 🚀                |
| `aria-labelledby` wired to dynamic title                     | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Escape closes dialog                                         | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Data injection into the dynamic component                    | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Typed result / close event generics                          | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Close callback injectable inside the dynamic component       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Typed signal-based data injection                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Focus returns to the exact trigger on close**: When a dynamically created dialog is dismissed, focus returns to the element that called `DialogService.open()`. PrimeNG's `DialogService` does not reliably restore focus to the trigger — focus can land on the document body or the element focused at service construction time, depending on how the call site is structured.
- **Typed signal-based data injection**: Data passed to the dynamic component is typed via generics and exposed inside the hosted component as a signal — `dialogData = inject(DIALOG_DATA) as Signal<T>`. Angular Material uses `MAT_DIALOG_DATA` with a non-signal injection token; PrimeNG uses `DynamicDialogConfig.data` typed as `any`.
- **Signal-native API**: The `DialogService` ref exposes `onClose` as an `OutputRef<R>` signal emitter — no Observable subscription needed to react to dialog results.

#### Reference URLs
- Angular Material: https://material.angular.io/components/dialog/overview
- PrimeNG: https://primeng.org/dynamicdialog
- Radix UI: N/A — no programmatic dialog service
- Ark UI: N/A — no programmatic dialog service
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

---

### BottomSheet

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Slides in from the bottom of the viewport                    | ✅                | ❌ (no BottomSheet) | N/A | ✅ | ✅ |
| `role=dialog`                                                | ⚠️ uses `role=region` | ❌ | N/A | ✅ | 🚀 |
| `aria-modal=true`                                            | ❌                | ❌       | N/A      | ✅      | ✅                 |
| Focus trap                                                   | ⚠️               | ❌       | N/A      | ✅      | ✅                 |
| Focus returns to trigger on close                            | ⚠️               | ❌       | N/A      | ✅      | 🚀                |
| Escape closes the sheet                                      | ✅                | ❌       | N/A      | ✅      | ✅                 |
| Drag-to-dismiss gesture                                      | ❌                | ❌       | N/A      | ✅      | ✅                 |
| Snap points (partial open states)                            | ❌                | ❌       | N/A      | ✅      | ✅                 |
| `aria-labelledby` wired to sheet header                      | ❌                | ❌       | N/A      | ✅      | ✅                 |
| `prefers-reduced-motion` — slide animation disabled          | ✅                | ❌       | N/A      | ✅      | ✅                 |
| `model()` for `[(visible)]` two-way binding                  | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — PrimeNG has no BottomSheet; Angular Material is the primary reference and all its features are matched._

#### Differentiators
- **`role=dialog` + `aria-modal=true`**: Angular Material's `MatBottomSheet` uses `role=region` — a landmark section, not a modal dialog. Screen readers treat a `region` as a non-modal page section, allowing Tab focus to escape to the rest of the page. This library uses `role=dialog` + `aria-modal=true`, which prevents AT from perceiving the page behind the sheet as navigable while it is open, matching the intended modal interaction model.
- **Focus return to trigger on close**: When the sheet is dismissed, focus returns precisely to the element that opened it. Angular Material's BottomSheet handles this inconsistently when opened from dynamically positioned buttons.
- **`model()` for `[(visible)]`**: The open/closed state is a `model<boolean>()` signal — consumers bind via `[(visible)]` with no `@Output()` event handler boilerplate.

#### Reference URLs
- Angular Material: https://material.angular.io/components/bottom-sheet/overview
- PrimeNG: https://primeng.org — no BottomSheet component
- Radix UI: N/A — Radix recommends composing Dialog for sheet UX
- Ark UI: https://ark-ui.com/react/docs/components/drawer (Ark's Drawer covers the bottom-sheet pattern)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (BottomSheet is a viewport-anchored dialog variant)

---

## Navigation & Menus

---

### Tabs

| Feature / Behaviour                           | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|-----------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=tablist` / `role=tab` / `role=tabpanel` | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-selected` on active tab                 | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-controls` tab → panel                   | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| `aria-labelledby` panel → tab                 | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| Arrow key navigation (left/right)             | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Home / End key navigation                     | ✅                | ❌       | ✅        | ✅      | ✅                 |
| Disabled tab (not focusable, `aria-disabled`) | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Lazy tab panel rendering                      | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Scrollable tab strip (overflow)               | ✅                | ✅       | ❌        | ❌      | ✅                 |
| Closable / removable tabs                     | ❌                | ✅       | ❌        | ✅      | ✅                 |
| Tab with icon                                 | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Tab with badge count                          | ❌                | ✅       | ❌        | ❌      | ✅                 |
| Signal-native API                             | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                           | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                 | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None._

#### Reference URLs
- Angular Material: https://material.angular.io/components/tabs/overview
- PrimeNG: https://primeng.org/tabs
- Radix UI: https://www.radix-ui.com/primitives/docs/components/tabs
- Ark UI: https://ark-ui.com/react/docs/components/tabs
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

---

### Accordion

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Single-expand mode (only one panel open at a time)           | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Multi-expand mode (any number of panels open)                | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `role=button` on panel headers                               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-expanded` on trigger                                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-controls` linking trigger to panel                     | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| `aria-labelledby` on panel (region role)                     | ❌                | ⚠️      | ✅        | ✅      | 🚀                |
| Arrow-key navigation between headers (↑ / ↓)                | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Home / End jump to first / last header                       | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Disabled panel                                               | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Custom header `ng-template`                                  | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Custom content `ng-template`                                 | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Expand / collapse animation                                  | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `prefers-reduced-motion` — animation disabled                | ⚠️               | ⚠️      | ✅        | ✅      | ✅                 |
| `ControlValueAccessor` / programmatic open control           | ⚠️               | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Full APG keyboard pattern**: Angular Material and PrimeNG do not implement the arrow-key and Home/End navigation between accordion headers specified by the WAI-ARIA Accordion pattern. This library follows Radix and Ark in implementing the full keyboard contract.
- **`aria-labelledby` on panel region**: Each expanded panel has `role=region` with `aria-labelledby` pointing to its header button. Angular Material omits this; PrimeNG wires it inconsistently. Screen readers can navigate directly to open sections using landmark navigation.
- **Signal-native API**: `model<string[]>()` for the active panel list — composes with `computed()` and `effect()` without glue code.

#### Reference URLs
- Angular Material: https://material.angular.io/components/expansion/overview
- PrimeNG: https://primeng.org/accordion
- Radix UI: https://www.radix-ui.com/primitives/docs/components/accordion
- Ark UI: https://ark-ui.com/react/docs/components/accordion
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

---

### Breadcrumb

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `<nav>` landmark with `aria-label`                           | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `<ol>` ordered list structure                                | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `aria-current=page` on the last (active) item               | ✅                | ⚠️      | N/A      | N/A    | 🚀                |
| Separator between items (configurable)                       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Custom separator `ng-template`                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Router link integration                                      | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Icon support per item                                        | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Home item slot                                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-current=page` correctness**: PrimeNG renders the last breadcrumb item as a non-link span but does not set `aria-current=page` on it. This library sets `aria-current=page` on the final item, which is the canonical way screen readers identify the current location in a breadcrumb trail.
- **Custom separator template**: Developers can supply an `ng-template` for the separator — icons, slash characters, or SVG chevrons — with full type-safe template context.
- **Signal-native API**: Items bound via `input<MenuItem[]>()` — the array can be a `computed()` signal derived from router state, with no zone triggers.

#### Reference URLs
- Angular Material: https://material.angular.io/components/breadcrumb/overview (no dedicated component — breadcrumb is built manually)
- PrimeNG: https://primeng.org/breadcrumb
- Radix UI: N/A — no Breadcrumb primitive
- Ark UI: N/A — no Breadcrumb primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/

---

### Menu

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=menu` on the popup                                     | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `role=menuitem` on items                                     | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `role=menuitemcheckbox` / `role=menuitemradio`               | ❌                | ✅       | ✅        | ✅      | ✅                 |
| `role=separator` between groups                              | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Arrow key navigation (↑ / ↓)                                | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Home / End jump to first / last item                         | ✅                | ❌       | ✅        | ✅      | 🚀                |
| Typeahead character search                                   | ❌                | ❌       | ✅        | ✅      | 🚀                |
| `aria-haspopup=menu` on trigger                              | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-expanded` on trigger                                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Submenu with `role=menu` + `aria-haspopup`                   | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Left-arrow closes submenu + returns focus to parent          | ✅                | ⚠️      | ✅        | ✅      | 🚀                |
| Disabled item with `aria-disabled` (not HTML `disabled`)     | ✅                | ⚠️      | ✅        | ✅      | ✅                 |
| Custom item `ng-template`                                    | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Typeahead character search**: Pressing a letter key jumps focus to the first menu item beginning with that character — exactly as the WAI-ARIA APG Menu pattern specifies. Angular Material and PrimeNG do not implement this, leaving keyboard users unable to navigate long menus efficiently.
- **Home / End navigation**: PrimeNG does not implement Home/End keys in menus. This library follows the APG contract in full.
- **Left-arrow submenu close**: Pressing ← inside an open submenu closes it and returns focus to the parent item. PrimeNG handles this inconsistently across its menu family.

#### Reference URLs
- Angular Material: https://material.angular.io/components/menu/overview
- PrimeNG: https://primeng.org/menu
- Radix UI: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
- Ark UI: https://ark-ui.com/react/docs/components/menu
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu/

---

### Stepper

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=tablist` on the step list                              | ✅ (CDK Stepper) | ⚠️ `<ul>` with no ARIA | N/A | ✅ | ✅ |
| `role=tab` per step indicator                                | ✅                | ⚠️      | N/A      | ✅      | ✅                 |
| `aria-selected` on the active step                           | ✅                | ❌       | N/A      | ✅      | ✅                 |
| `aria-current=step` on the active step                       | ❌                | ❌       | N/A      | ✅      | 🚀                |
| `aria-controls` wiring (step tab → step panel)               | ✅                | ❌       | N/A      | ✅      | ✅                 |
| `role=tabpanel` on step content                              | ✅                | ❌       | N/A      | ✅      | ✅                 |
| Linear mode (enforces sequential completion)                 | ✅                | ❌       | N/A      | ✅      | ✅                 |
| Non-linear / free navigation mode                            | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Horizontal + vertical orientation                            | ✅                | ❌       | N/A      | ✅      | ✅                 |
| Step icon / custom icon slot                                 | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Step header `ng-template`                                    | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Step content `ng-template`                                   | ✅                | ✅       | N/A      | ✅      | ✅                 |
| `@defer` on inactive step content                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Signal-native API (`model()` for active step)                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — Angular Material's CDK Stepper is the main reference; all features are matched. PrimeNG's "Steps" component is purely visual navigation with no content panel management or ARIA step contract._

#### Differentiators
- **`aria-current=step`**: The active step indicator receives `aria-current=step` — the value screen readers specifically recognise for communicating current position in a wizard or multi-step flow. Angular Material uses `aria-selected` from the tablist pattern alone; PrimeNG sets neither attribute. The `aria-current=step` value is what assistive technology announces as "current step".
- **`@defer` on inactive step content**: Step content panels not currently visible are deferred with Angular's `@defer` block, preventing unnecessary component initialisation for steps the user has not yet reached. Neither Angular Material's CDK Stepper nor PrimeNG's Steps defer inactive panel rendering.
- **Signal-native API**: `model<number>()` for `[(activeStep)]` — the current step index is two-way bindable as a signal, composable with `computed()` signals that derive step validation state from form controls.

#### Reference URLs
- Angular Material: https://material.angular.io/components/stepper/overview
- PrimeNG: https://primeng.org/steps
- Radix UI: N/A — no Stepper primitive
- Ark UI: https://ark-ui.com/react/docs/components/steps
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/ (Stepper follows tablist/tabpanel with `aria-current=step`)

---

### Menubar

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=menubar` on the root element                           | ❌ (no Menubar)  | ✅       | ✅ NavigationMenu | ✅ | ✅ |
| `role=menuitem` on top-level items                           | ❌                | ✅       | ✅        | ✅      | ✅                 |
| `aria-haspopup=true` on items with submenus                  | ❌                | ✅       | ✅        | ✅      | ✅                 |
| `aria-expanded` on items with open submenus                  | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Left / Right arrow navigates top-level items                 | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Down-arrow opens submenu from a top-level item               | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Up / Down arrow navigates within an open submenu             | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Home / End within an open submenu                            | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Typeahead character search within a submenu                  | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Left-arrow closes submenu + returns focus to parent item     | ❌                | ⚠️      | ✅        | ✅      | 🚀                |
| Escape closes submenu + returns focus to top-level           | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Custom item `ng-template`                                    | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — Angular Material has no Menubar component; all ❌ reference rows are matched._

#### Differentiators
- **Home / End in open submenus**: PrimeNG's Menubar does not implement Home/End keys within open dropdown submenus. This library follows the full APG Menubar keyboard contract, allowing users to jump immediately to the first or last item in any open submenu.
- **Typeahead character search in submenus**: Pressing a letter key within an open submenu moves focus to the first matching item — the APG Menu pattern requires this; PrimeNG's Menubar does not implement it.
- **Left-arrow submenu close**: Pressing ← inside an open submenu reliably closes it and returns focus to the parent menubar item. PrimeNG handles this inconsistently across its menu family.

#### Reference URLs
- Angular Material: https://material.angular.io — no Menubar component
- PrimeNG: https://primeng.org/menubar
- Radix UI: https://www.radix-ui.com/primitives/docs/components/navigation-menu
- Ark UI: https://ark-ui.com/react/docs/components/menu
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

---

### ContextMenu

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Triggered by right-click / long-press                        | ❌ (no ContextMenu) | ✅   | ✅        | ✅      | ✅                 |
| Keyboard trigger (Menu key / Shift+F10)                      | ❌                | ❌       | ✅        | ✅      | 🚀                |
| `aria-haspopup=menu` on the target element                   | ❌                | ⚠️      | ✅        | ✅      | 🚀                |
| `aria-expanded` on the target element                        | ❌                | ❌       | ✅        | ✅      | 🚀                |
| `role=menu` on the popup                                     | ❌                | ✅       | ✅        | ✅      | ✅                 |
| `role=menuitem` on items                                     | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Arrow key navigation (↑ / ↓)                                | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Home / End jump to first / last item                         | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Typeahead character search                                   | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Nested submenu with `role=menu` + keyboard nav               | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Escape closes menu + returns focus to target                 | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Custom item `ng-template`                                    | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — Angular Material has no ContextMenu component; all ❌ reference rows are matched._

#### Differentiators
- **Keyboard trigger (Menu key / Shift+F10)**: Pressing the Menu key or Shift+F10 while the target element is focused opens the context menu — the correct keyboard-accessible alternative to right-clicking. PrimeNG does not implement this keyboard trigger, making its context menus keyboard-inaccessible. This library follows the APG "context menu button" activation pattern.
- **`aria-haspopup=menu` + `aria-expanded` on the target**: The context menu target element receives `aria-haspopup=menu` and `aria-expanded` (false/true), giving screen reader users advance notice that the element can open a menu and communicating its current open state. PrimeNG does not add these attributes to the target element.
- **Home / End + typeahead**: The same full keyboard contract as the Menu component — PrimeNG's ContextMenu omits both Home/End and typeahead, leaving keyboard users with no way to jump in long menus.

#### Reference URLs
- Angular Material: https://material.angular.io — no ContextMenu component
- PrimeNG: https://primeng.org/contextmenu
- Radix UI: https://www.radix-ui.com/primitives/docs/components/context-menu
- Ark UI: https://ark-ui.com/react/docs/components/menu
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu/ (ContextMenu uses the Menu pattern triggered by context action)

---

### MegaMenu

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Multi-column dropdown layout                                 | ❌ (no MegaMenu) | ✅       | N/A      | N/A    | ✅                 |
| `role=menubar` on the root                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Column group labeled with `aria-label` (group semantics)     | ❌                | ⚠️ visual heading only | N/A | N/A | 🚀 |
| Column heading with configurable semantic role               | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Left / Right arrow navigates top-level items                 | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Down / Up arrow navigates within column items                | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Escape closes panel + returns focus to trigger               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom item `ng-template`                                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Horizontal + vertical orientation                            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no MegaMenu component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **Column groups with `aria-label`**: Each column group in the mega-menu panel receives an `aria-label` derived from the column header text (e.g., "Products group", "Services group"), so screen readers announce the group when focus enters a column. PrimeNG renders column headers as decorative visual text with no ARIA labeling of the enclosing group element.
- **Column heading with configurable semantic role**: Column heading elements can be rendered as decorative (`aria-hidden=true`) or semantic (`role=heading` with a configurable level), preventing unintentional document heading outline pollution. PrimeNG renders all column headers with an identical structure and no role control.
- **Signal-native API**: Menu model bound via `input<MegaMenuModel[]>()` — the structure can be derived from a `computed()` signal reflecting server-side permissions without NgRx or BehaviorSubjects.

#### Reference URLs
- Angular Material: https://material.angular.io — no MegaMenu component
- PrimeNG: https://primeng.org/megamenu
- Radix UI: N/A — no MegaMenu primitive (NavigationMenu can be composed into a mega-menu layout)
- Ark UI: N/A — no MegaMenu primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ (MegaMenu extends the Menubar pattern with multi-column submenu layouts)

---

## Data Display

---

### Table

| Feature / Behaviour                                | Angular Material       | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|----------------------------------------------------|------------------------|---------|----------|--------|-------------------|
| `role=grid`                                        | ⚠️ uses `role=table`   | ✅       | N/A      | N/A    | ✅                 |
| Sortable columns (`aria-sort`)                     | ✅                      | ✅       | N/A      | N/A    | ✅                 |
| Row selection (`aria-selected`)                    | ✅                      | ✅       | N/A      | N/A    | ✅                 |
| Multi-row selection with checkbox                  | ✅                      | ✅       | N/A      | N/A    | ✅                 |
| Column resizing                                    | ❌                      | ✅       | N/A      | N/A    | ✅                 |
| Column reordering                                  | ❌                      | ✅       | N/A      | N/A    | ✅                 |
| Row expansion                                      | ❌                      | ✅       | N/A      | N/A    | ✅                 |
| Frozen / sticky columns                            | ❌                      | ✅       | N/A      | N/A    | ✅                 |
| Virtual scrolling (rows)                           | ❌                      | ✅       | N/A      | N/A    | ✅                 |
| Paginator integration                              | ✅                      | ✅       | N/A      | N/A    | ✅                 |
| Row reordering (drag)                              | ❌                      | ✅       | N/A      | N/A    | ✅                 |
| Keyboard row navigation (arrow keys)               | ⚠️                     | ⚠️      | N/A      | N/A    | ✅                 |
| Live region for sort / filter change announcements | ❌                      | ❌       | N/A      | N/A    | 🚀                |
| Signal-native API                                  | ❌                      | ❌       |  N/A     | N/A    | 🚀                |
| Zoneless compatible                                | ❌                      | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                      | ❌                      | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None._

#### Differentiators
- **`role=grid`**: Angular Material's `mat-table` uses `role=table` which is read-only semantics. A grid (`role=grid`) communicates interactive rows correctly to screen readers, enabling proper navigation announcements.
- **Live region for sort / filter announcements**: Neither Angular Material nor PrimeNG announces sort direction changes or filter result counts to screen readers. This library uses a live region to announce these state changes.

#### Reference URLs
- Angular Material: https://material.angular.io/components/table/overview
- PrimeNG: https://primeng.org/table
- Radix UI: N/A — no table primitive
- Ark UI: N/A — no table primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/grid/

---

### Listbox

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=listbox` on the container                              | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `role=option` on items                                       | ✅                | ✅       | ✅        | ✅      | ✅                 |
| `aria-selected` on selected items                            | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Single selection                                             | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Multiple selection (`aria-multiselectable=true`)             | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Arrow key navigation (↑ / ↓)                                | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Home / End jump to first / last option                       | ✅                | ❌       | ✅        | ✅      | 🚀                |
| Typeahead character search                                   | ❌                | ❌       | ✅        | ✅      | 🚀                |
| Grouped options with group label                             | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Filter / search input                                        | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom option `ng-template`                                  | ❌                | ✅       | ✅        | ✅      | ✅                 |
| Disabled option with `aria-disabled`                         | ✅                | ✅       | ✅        | ✅      | ✅                 |
| Checkbox selection style                                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Virtual scroll for large lists                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `ControlValueAccessor`                                       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Typeahead character search**: Pressing a letter key jumps focus to the first option beginning with that character — the WAI-ARIA Listbox pattern requires this; PrimeNG omits it entirely. Angular Material's listbox does not implement it either.
- **Home / End navigation**: PrimeNG does not implement Home/End for listbox keyboard navigation. This library follows the full APG Listbox keyboard contract.
- **Signal-native `model()` for selection**: Single selection uses `model<T>()`, multiple selection uses `model<T[]>()` — both compose directly with signals without `ngModel` boilerplate.

#### Reference URLs
- Angular Material: https://material.angular.io/components/list/overview
- PrimeNG: https://primeng.org/listbox
- Radix UI: https://www.radix-ui.com/primitives/docs/components/select (Listbox-like primitive)
- Ark UI: https://ark-ui.com/react/docs/components/listbox
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

---

### Avatar

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|---|---|---|---|---|---|
| Image display | ❌ (no Avatar component) | ✅ | ✅ | ✅ | ✅ |
| Text / initials display | ❌ | ✅ | ✅ (Fallback) | ✅ | ✅ |
| Icon display | ❌ | ✅ | ❌ | ⚠️ custom slot only | ✅ |
| Circle shape | ❌ | ✅ | ✅ | ✅ | ✅ |
| Square shape | ❌ | ✅ | N/A | ✅ | ✅ |
| Size variants (sm / md / lg) | ❌ | ✅ (normal/large/xlarge names) | N/A | N/A | ✅ |
| AvatarGroup — stacked/overlapping display | ❌ | ✅ | ❌ | ❌ | ✅ |
| Overflow count badge (`+N`) in group | ❌ | ✅ | ❌ | ❌ | ✅ |
| `role="img"` + `aria-label` on initials / icon avatars | ❌ | ⚠️ `<span>` with no role | ⚠️ headless — consumer must add | ✅ | ✅ |
| Multi-level alt fallback (`imageAlt` → `name` → `label` → `'Avatar'`) | ❌ | ❌ | ⚠️ image/fallback only, no name chain | ⚠️ | 🚀 |
| AvatarGroup `role="list"` / each avatar `role="listitem"` | ❌ | ⚠️ no explicit list role | ❌ | ❌ | 🚀 |
| Overflow badge with dedicated accessible label input | ❌ | ⚠️ no explicit SR label on +N | ❌ | ❌ | 🚀 |
| `ariaLabel` hard-override input | ❌ | ❌ | N/A | ✅ | ✅ |
| Signal-native API (`input()`) | ❌ | ❌ | N/A | N/A | 🚀 |
| Three runtime visual variants | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Zoneless compatible | ❌ | ❌ | N/A | N/A | 🚀 |

#### Gaps
_None — all ❌ reference rows are matched. Angular Material has no Avatar component; we exceed PrimeNG on a11y and Radix UI on grouping semantics._

#### Differentiators
- **Multi-level alt fallback chain**: When only initials or an icon is shown, the accessible label resolves automatically as `imageAlt` → `name` → `label` → `'Avatar'`. PrimeNG renders a `<span>` with no `role` or label at all for initials; Radix only chains between image and fallback text with no `name` concept.
- **AvatarGroup list semantics**: `ui-lib-avatar-group` uses `role="list"` and upgrades each avatar inside it to `role="listitem"`, so screen readers announce "Group, N items" and allow list navigation. Neither PrimeNG nor Angular Material applies these semantics.
- **Overflow badge with `overflowAriaLabel`**: The `+N` overflow indicator is exposed as a `listitem` with a programmable accessible label (`overflowAriaLabel` input). PrimeNG renders `+N` as plain text with no SR label.
- **Signal-native API**: `input()` / `model()` throughout — no `@Input()` decorator adapter layer needed.
- **Three runtime variants**: Switch between Material, Bootstrap, and Minimal at runtime via a CSS variable — no other Angular library offers this.

#### Reference URLs
- Angular Material: https://material.angular.io — no dedicated Avatar component
- PrimeNG: https://primeng.org/avatar
- Radix UI: https://www.radix-ui.com/primitives/docs/components/avatar
- Ark UI: https://ark-ui.com/docs/components/avatar
- APG Pattern: N/A (display-only component — no APG widget pattern)

---

### Carousel

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|---|---|---|---|---|---|
| Data-driven item rendering | ❌ (no Carousel) | ✅ | N/A | N/A | ✅ |
| `numVisible` / `numScroll` | ❌ | ✅ | N/A | N/A | ✅ |
| Circular navigation | ❌ | ✅ | N/A | N/A | ✅ |
| Autoplay with configurable interval | ❌ | ✅ | N/A | N/A | ✅ |
| Responsive breakpoint options | ❌ | ✅ | N/A | N/A | ✅ |
| Horizontal + vertical orientation | ❌ | ✅ | N/A | N/A | ✅ |
| Prev / Next navigation buttons | ❌ | ✅ | N/A | N/A | ✅ |
| Dot indicator buttons | ❌ | ✅ | N/A | N/A | ✅ |
| Custom item template | ❌ | ✅ | N/A | N/A | ✅ |
| Custom prev / next icon templates | ❌ | ✅ | N/A | N/A | ✅ |
| Custom header / footer templates | ❌ | ✅ | N/A | N/A | ✅ |
| `role="region"` + `aria-label` landmark | ❌ | ✅ | N/A | N/A | ✅ |
| `aria-roledescription="carousel"` on host | ❌ | ⚠️ partial | N/A | N/A | ✅ |
| `role="group"` + `aria-roledescription="slide"` per visible item | ❌ | ⚠️ partial | N/A | N/A | ✅ |
| `aria-label="Slide N of M"` on each slide | ❌ | ⚠️ | N/A | N/A | ✅ |
| `aria-current="true"` on active indicator dot | ❌ | ⚠️ | N/A | N/A | ✅ |
| `aria-hidden="true"` on inactive slides | ❌ | ⚠️ | N/A | N/A | ✅ |
| WCAG 2.1 SC 2.2.2 pause/resume button for autoplay | ❌ | ❌ | N/A | N/A | 🚀 |
| `aria-live="polite"` during autoplay announcements | ❌ | ❌ | N/A | N/A | 🚀 |
| `prefers-reduced-motion` disables autoplay in JavaScript | ❌ | ❌ | N/A | N/A | 🚀 |
| i18n inputs for all button labels | ❌ | ⚠️ partial | N/A | N/A | 🚀 |
| Signal-native API (`input()`) | ❌ | ❌ | N/A | N/A | 🚀 |
| Zoneless compatible | ❌ | ❌ | N/A | N/A | 🚀 |
| Three runtime visual variants | ❌ | ❌ | N/A | N/A | 🚀 |

#### Gaps
_None. Angular Material has no Carousel component. PrimeNG's Carousel is the only real reference; all its features are matched and several WCAG requirements are exceeded._

#### Differentiators
- **WCAG 2.1 SC 2.2.2 pause/resume button**: PrimeNG's Carousel has autoplay but no built-in pause control — WCAG requires animated content that auto-starts to have a pause mechanism. This library renders a dedicated pause/resume toggle button that appears only when `autoplayInterval > 0`.
- **`aria-live="polite"` during autoplay**: While autoplay is running the slide viewport gets `aria-live="polite"` so screen readers announce slide transitions without interrupting the user. PrimeNG does not add this attribute.
- **`prefers-reduced-motion` disables autoplay in JavaScript**: PrimeNG suppresses CSS transitions via the media query but does not stop the JavaScript interval. This library detects `prefers-reduced-motion: reduce` in JavaScript and prevents auto-advancement entirely, satisfying WCAG 2.3.3 (AAA) and respecting the user's OS setting at the interaction level.
- **Full i18n label inputs**: `prevAriaLabel`, `nextAriaLabel`, `pauseLabel`, `playLabel` — every button label is consumer-controllable for localisation. PrimeNG exposes partial labels.
- **Signal-native API + three runtime variants** (see library-wide differentiators).

#### Reference URLs
- Angular Material: https://material.angular.io — no Carousel component
- PrimeNG: https://primeng.org/carousel
- Radix UI: N/A — no Carousel primitive
- Ark UI: N/A — no Carousel primitive
- APG Pattern: N/A — no dedicated APG carousel pattern; closest is https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ (W3C WAI, not APG widget library)

---

### Galleria

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|---|---|---|---|---|---|
| Main image display | ❌ (no Galleria) | ✅ | N/A | N/A | ✅ |
| Thumbnail strip | ❌ | ✅ | N/A | N/A | ✅ |
| Thumbnail strip position (bottom / top / left / right) | ❌ | ✅ | N/A | N/A | ✅ |
| Dot indicators | ❌ | ✅ | N/A | N/A | ✅ |
| Indicators overlaid on the active item | ❌ | ✅ | N/A | N/A | ✅ |
| Fullscreen / lightbox overlay | ❌ | ✅ | N/A | N/A | ✅ |
| Autoplay with configurable transition interval | ❌ | ✅ | N/A | N/A | ✅ |
| Responsive thumbnail breakpoints | ❌ | ✅ | N/A | N/A | ✅ |
| Circular navigation | ❌ | ✅ | N/A | N/A | ✅ |
| `showItemNavigatorsOnHover` | ❌ | ✅ | N/A | N/A | ✅ |
| Custom item template | ❌ | ✅ | N/A | N/A | ✅ |
| Custom thumbnail template | ❌ | ✅ | N/A | N/A | ✅ |
| Custom caption template | ❌ | ✅ | N/A | N/A | ✅ |
| Custom header / footer templates | ❌ | ✅ | N/A | N/A | ✅ |
| Custom indicator template | ❌ | ✅ | N/A | N/A | ✅ |
| `role="region"` + `aria-label` on gallery | ❌ | ✅ | N/A | N/A | ✅ |
| Thumbnail `role="tab"` + `aria-selected` | ❌ | ⚠️ partial | N/A | N/A | ✅ |
| Keyboard: `ArrowLeft/Right/Home/End` on thumbnails | ❌ | ⚠️ partial | N/A | N/A | ✅ |
| Fullscreen overlay as `role="dialog"` + `aria-modal="true"` | ❌ | ⚠️ partial | N/A | N/A | 🚀 |
| Focus trap in fullscreen dialog | ❌ | ⚠️ partial | N/A | N/A | 🚀 |
| `activeIndex` as `model()` signal (two-way bindable) | ❌ | ❌ | N/A | N/A | 🚀 |
| `visible` (fullscreen state) as `model()` signal | ❌ | ❌ | N/A | N/A | 🚀 |
| i18n inputs for all navigation labels | ❌ | ⚠️ partial | N/A | N/A | 🚀 |
| Signal-native API (`input()`) | ❌ | ❌ | N/A | N/A | 🚀 |
| Zoneless compatible | ❌ | ❌ | N/A | N/A | 🚀 |
| Three runtime visual variants | ❌ | ❌ | N/A | N/A | 🚀 |

#### Gaps
_None. Angular Material has no image gallery component. PrimeNG Galleria is the sole reference; all features are matched and several accessibility requirements are exceeded._

#### Differentiators
- **Fullscreen `role="dialog"` + `aria-modal="true"` + focus trap**: When fullscreen mode activates, the overlay is a proper `role="dialog"` with `aria-modal="true"` and a full focus trap. PrimeNG's fullscreen overlay lacks `aria-modal` and does not implement a focus trap — keyboard users can Tab into page content behind the overlay.
- **`activeIndex` and `visible` as `model()` signals**: Both the active item index and fullscreen state are two-way bindable via `[(activeIndex)]` and `[(visible)]` using Angular's signal-based `model()` — no event listener boilerplate needed. PrimeNG uses `@Output() activeIndexChange` and `@Output() visibleChange` with `@Input()` decoration, requiring the bracket-parens `[( )]` pattern via separate inputs/outputs rather than a single signal binding.
- **i18n label inputs**: `ariaLabel`, `lightboxLabel`, `prevLabel`, `nextLabel` — every accessible button and region label is overridable for localisation.
- **Signal-native API + three runtime variants** (see library-wide differentiators).

#### Reference URLs
- Angular Material: https://material.angular.io — no image gallery component
- PrimeNG: https://primeng.org/galleria
- Radix UI: N/A — no Galleria primitive
- Ark UI: N/A — no Galleria primitive
- APG Pattern: N/A — no APG pattern for image galleries

---

### Knob

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|---|---|---|---|---|---|
| SVG-based dial visualization | ❌ (no Knob) | ✅ | N/A | N/A | ✅ |
| Configurable `min` / `max` / `step` | ❌ | ✅ | N/A | N/A | ✅ |
| Value label inside the dial | ❌ | ✅ | N/A | N/A | ✅ |
| Value format string (e.g. `'{value}%'`) | ❌ | ✅ | N/A | N/A | ✅ |
| Stroke width configuration | ❌ | ✅ | N/A | N/A | ✅ |
| Value arc color override | ❌ | ✅ | N/A | N/A | ✅ |
| Center text color override | ❌ | ✅ | N/A | N/A | ✅ |
| Readonly state | ❌ | ✅ | N/A | N/A | ✅ |
| Disabled state | ❌ | ✅ | N/A | N/A | ✅ |
| `ControlValueAccessor` (ngModel / reactive forms) | ❌ | ✅ | N/A | N/A | ✅ |
| `role="slider"` with `aria-valuemin/max/now` | ❌ | ✅ | N/A | N/A | ✅ |
| `aria-valuetext` derived from value format string | ❌ | ⚠️ partial | N/A | N/A | 🚀 |
| `ariaLabel` input for custom SR name | ❌ | ⚠️ partial | N/A | N/A | ✅ |
| Keyboard: `ArrowUp/Right` increase, `ArrowDown/Left` decrease | ❌ | ✅ | N/A | N/A | ✅ |
| Keyboard: `PageUp` / `PageDown` (10× step) | ❌ | ✅ | N/A | N/A | ✅ |
| Keyboard: `Home` / `End` (jump to min / max) | ❌ | ✅ | N/A | N/A | ✅ |
| Decorative SVG hidden from AT (`aria-hidden="true"`) | ❌ | ⚠️ | N/A | N/A | ✅ |
| Signal-native API (`input()`, `model()`) | ❌ | ❌ | N/A | N/A | 🚀 |
| Zoneless compatible | ❌ | ❌ | N/A | N/A | 🚀 |
| Three runtime visual variants | ❌ | ❌ | N/A | N/A | 🚀 |

#### Gaps
_None. Angular Material has no Knob component. PrimeNG Knob is the only reference; all features are matched or exceeded._

#### Differentiators
- **`aria-valuetext` from value format string**: When `valueTemplate="{value}%"` is set, the component automatically sets `aria-valuetext="75%"` so screen readers announce the formatted value (e.g. "75 percent") rather than a raw number. PrimeNG's Knob sets `aria-valuenow` but does not compute `aria-valuetext` from the `valueTemplate` — screen readers announce the raw integer unless the consumer wires additional ARIA manually.
- **Decorative SVG fully hidden**: The SVG arc and label are `aria-hidden="true"` with `focusable="false"`. PrimeNG's Knob SVG is not consistently marked decorative across all themes, risking duplicate announcements in some screen reader / browser combinations.
- **Signal-native API**: `input()` / `model()` signals with `[(value)]` two-way binding — no decorator adapter required.
- **Three runtime visual variants**: Switch between Material, Bootstrap, and Minimal aesthetics at runtime via a single CSS variable.

#### Reference URLs
- Angular Material: https://material.angular.io — no Knob component
- PrimeNG: https://primeng.org/knob
- Radix UI: N/A — no Knob primitive (closest is Slider)
- Ark UI: N/A — no Knob primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/ (APG Slider — the Knob follows the same `role=slider` model)

---

### Tree

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=tree` on the container                                 | ✅ (CDK experimental) | ✅ | N/A | ✅ | ✅ |
| `role=treeitem` per node                                     | ✅                | ✅       | N/A      | ✅      | ✅                 |
| `aria-expanded` on expandable nodes                          | ✅                | ✅       | N/A      | ✅      | ✅                 |
| `aria-level` per depth level                                 | ✅                | ⚠️ partial | N/A   | ✅      | ✅                 |
| `aria-setsize` / `aria-posinset` per node                    | ✅                | ⚠️ partial | N/A   | ✅      | ✅                 |
| Arrow key navigation (↑ / ↓ / → / ←)                       | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Right-arrow expands a collapsed node                         | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Left-arrow collapses node or moves to parent                 | ✅                | ⚠️      | N/A      | ✅      | ✅                 |
| Home / End — jump to first / last visible node               | ✅                | ❌       | N/A      | ✅      | 🚀                |
| Typeahead character search                                   | ❌                | ❌       | N/A      | ✅      | 🚀                |
| Single selection (`aria-selected`)                           | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Multiple selection (`aria-multiselectable`)                  | ✅                | ✅       | N/A      | ✅      | ✅                 |
| Checkbox selection style                                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Lazy loading (load children on expand)                       | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom node `ng-template`                                    | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Drag-and-drop node reorder                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Virtual scroll for large trees                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Typeahead character search**: Pressing a letter key jumps focus to the next visible node whose label begins with that character — exactly as the WAI-ARIA APG Tree View pattern specifies. PrimeNG does not implement typeahead; Angular Material's CDK experimental tree also lacks it. This is a significant keyboard usability gap in both incumbent libraries for large tree structures.
- **Home / End navigation**: PrimeNG's Tree does not implement Home (jump to first visible node) or End (jump to last visible node). This library follows the full APG Tree View keyboard contract, matching Ark UI and the a11y reference standard.
- **Signal-native API**: Selection state uses `model<TreeNode[]>()` — composable with `computed()` signals that derive tree structure from server data without RxJS operator chains.

#### Reference URLs
- Angular Material: https://material.angular.io/cdk/tree/overview
- PrimeNG: https://primeng.org/tree
- Radix UI: N/A — no Tree primitive
- Ark UI: https://ark-ui.com/react/docs/components/tree-view
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/

---

### TreeTable

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=treegrid` on the container                             | ❌ (no TreeTable) | ⚠️ uses `role=table` | N/A | N/A | 🚀 |
| `role=row` per row                                           | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `role=gridcell` per cell                                     | ❌                | ⚠️ uses `role=cell` | N/A | N/A | 🚀 |
| `aria-expanded` on expandable rows                           | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `aria-level` per depth                                       | ❌                | ⚠️ partial | N/A   | N/A    | ✅                 |
| `aria-setsize` / `aria-posinset` per row                     | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Arrow key row / cell navigation                              | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| Sortable columns (`aria-sort`)                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Column resizing                                              | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Frozen / sticky columns                                      | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Paginator integration                                        | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom cell `ng-template`                                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Row selection (`aria-selected`)                              | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Lazy loading for child rows                                  | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no TreeTable equivalent; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **`role=treegrid`**: The correct ARIA role for an interactive expandable table is `role=treegrid` — not `role=table`. PrimeNG uses `role=table` for its TreeTable, stripping the tree navigation semantics that assistive technology needs to understand the hierarchical structure. This library uses `role=treegrid` so screen readers can announce "level 2, expanded, row 3 of 5" as users navigate.
- **`aria-setsize` / `aria-posinset` per row**: Each visible row carries `aria-setsize` (sibling count at that level) and `aria-posinset` (position within siblings), enabling screen readers to announce "item 2 of 4" within each depth level. PrimeNG does not set these attributes.
- **`role=gridcell`**: PrimeNG uses `role=cell` (which belongs to `role=table` context); this library correctly uses `role=gridcell` (the `treegrid` child role), consistent with the ARIA specification for interactive grid cells.

#### Reference URLs
- Angular Material: https://material.angular.io — no TreeTable component
- PrimeNG: https://primeng.org/treetable
- Radix UI: N/A — no TreeTable primitive
- Ark UI: N/A — no TreeTable primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/

---

### Chart

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Multiple chart types (bar, line, pie, doughnut, etc.)        | ❌ (no Chart)    | ✅ via Chart.js | N/A | N/A | ✅ |
| `aria-label` on the `<canvas>` element                       | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `role=img` on `<canvas>` for AT compatibility                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Built-in accessible data table alternative                   | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Live region for data updates                                 | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `prefers-reduced-motion` — entrance animation disabled       | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Responsive resize (ResizeObserver-based)                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Plugin passthrough for Chart.js extensions                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Typed options input (`ChartOptions<T>`)                      | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no Chart component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **Built-in accessible data table**: Every chart automatically renders a visually hidden `<table>` containing the chart's underlying data. Screen reader users can navigate the raw data without relying on interpreting the graphic. Neither PrimeNG's Chart.js wrapper nor Angular Material provides this — consumers must hand-roll the fallback table.
- **`role=img` on canvas**: The `<canvas>` element receives `role=img` and `aria-label` so it is announced as a labelled image in browser/AT combinations where canvas accessibility is limited (particularly NVDA + Firefox).
- **Live region for data updates**: When the `data` input changes (e.g., a real-time dashboard refresh), a polite live region announces "Chart updated" so screen reader users are notified without being interrupted mid-sentence.
- **`prefers-reduced-motion` disables entrance animations**: Chart.js bar-grow and line-draw entrance animations are suppressed when `prefers-reduced-motion: reduce` is active. PrimeNG does not apply this guard to Chart.js options automatically.

#### Reference URLs
- Angular Material: https://material.angular.io — no Chart component
- PrimeNG: https://primeng.org/chart
- Radix UI: N/A — no Chart primitive
- Ark UI: N/A — no Chart primitive
- APG Pattern: N/A — WCAG SC 1.1.1 requires text alternatives for non-text content; no dedicated APG chart pattern

---

### VirtualScroller

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Windowed / virtual rendering for large lists                 | ✅ CDK Virtual Scroll | ✅ | N/A | N/A | ✅ |
| Accessible scroll container label (`aria-label`)             | ⚠️               | ⚠️      | N/A      | N/A    | 🚀                |
| `aria-rowcount` on the virtual list container                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-rowindex` on each visible row                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Keyboard scrolling (arrow keys on the viewport)              | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `prefers-reduced-motion` — smooth-scroll disabled            | ⚠️               | ⚠️      | N/A      | N/A    | ✅                 |
| Fixed item-size mode (performant)                            | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Variable item-size mode                                      | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Scroll to index API                                          | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-rowcount` + `aria-rowindex`**: The virtual list container carries `aria-rowcount` with the total item count, and each visible row carries `aria-rowindex` with its logical position in the full dataset. This allows screen readers to announce "row 47 of 10,000" when a user navigates into a rendered row — critical for understanding position within a large virtualised list. Neither Angular Material's CDK Virtual Scroll nor PrimeNG's VirtualScroller sets these attributes.
- **Accessible scroll container label**: The scroll viewport receives a consumer-configurable `aria-label` (e.g., "Product list", "Search results") so screen readers announce a meaningful name when focus enters the virtual scroll region. PrimeNG and Angular Material CDK do not expose this label.
- **Signal-native API**: Items bound via `input<T[]>()` — the list can be a `computed()` signal derived from reactive server state without the Observable adapter that Angular CDK's `DataSource` requires.

#### Reference URLs
- Angular Material: https://material.angular.io/cdk/scrolling/overview
- PrimeNG: https://primeng.org/virtualscroller
- Radix UI: N/A — no VirtualScroller primitive
- Ark UI: N/A — no VirtualScroller primitive
- APG Pattern: N/A — `aria-rowcount`/`aria-rowindex` from the grid/listbox specs apply; no dedicated APG virtual-scroll pattern

---

### DataView

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| List / grid layout toggle                                    | ❌ (no DataView)  | ✅       | N/A      | N/A    | ✅                 |
| Layout toggle buttons with `aria-pressed`                    | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-live` region announcing layout change                  | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Sort control with descriptive `aria-label`                   | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-live` region announcing sort / filter result count     | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Pagination integration                                       | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom list-mode item template                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom grid-mode item template                               | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom header / footer templates                             | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no DataView equivalent; PrimeNG is the only reference and all features are matched._

#### Differentiators
- **Layout toggle with `aria-pressed`**: The List/Grid toggle buttons use `aria-pressed` (true/false) to communicate the active layout state to screen readers. PrimeNG's layout buttons indicate the active view with a CSS class only — keyboard users cannot determine the current layout without visual feedback.
- **`aria-live` for layout and sort changes**: A polite live region announces both layout switches ("Switched to grid view") and sort/filter result counts ("Showing 24 of 100 items"). PrimeNG does not announce either state change, leaving screen reader users unaware that the content has reorganised after interacting with the controls.
- **Signal-native API**: Layout mode, sort field, and paginator page are all `model<>()` signals — composable with route parameter signals for URL-driven DataView state without RxJS subscription chains.

#### Reference URLs
- Angular Material: https://material.angular.io — no DataView component
- PrimeNG: https://primeng.org/dataview
- Radix UI: N/A — no DataView primitive
- Ark UI: N/A — no DataView primitive
- APG Pattern: N/A — DataView is a layout container; constituent controls follow their own APG patterns

---

### OrderList

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Selectable list of items                                     | ❌ (no OrderList) | ✅      | N/A      | N/A    | ✅                 |
| Drag-and-drop reordering                                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Keyboard reorder buttons (Move Up / Down / Top / Bottom)     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Reorder buttons with item-specific `aria-label`              | ❌                | ⚠️ icon-only, no label | N/A | N/A | 🚀 |
| `role=listbox` on the list container                         | ❌                | ⚠️ uses `<ul>` with no role | N/A | N/A | 🚀 |
| `role=option` per item with `aria-selected`                  | ❌                | ⚠️      | N/A      | N/A    | 🚀                |
| `aria-live` region announcing new position after reorder     | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Filter / search input                                        | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom item `ng-template`                                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no OrderList component; PrimeNG is the only reference and all features are matched._

#### Differentiators
- **`role=listbox` / `role=option` semantics**: The list container uses `role=listbox` with `aria-multiselectable`, and each item uses `role=option` with `aria-selected`. PrimeNG renders OrderList as a plain `<ul>`/`<li>` structure with no ARIA list selection role — screen readers cannot communicate selection state or convey that the list is interactive.
- **Reorder buttons with item-specific `aria-label`**: Each Move Up/Down/Top/Bottom button carries an `aria-label` that includes the item's display label (e.g., "Move 'Product A' up", "Move 'Product A' to top"). PrimeNG renders icon-only buttons with no accessible name — keyboard users have no way to identify what each reorder action will affect.
- **`aria-live` after reorder**: After an item is moved, a polite live region announces its new position (e.g., "Product A moved to position 3 of 10"), confirming the action to screen reader users.

#### Reference URLs
- Angular Material: https://material.angular.io — no OrderList component
- PrimeNG: https://primeng.org/orderlist
- Radix UI: N/A — no OrderList primitive
- Ark UI: N/A — no OrderList primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ (OrderList is a reorderable listbox)

---

### PickList

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Dual-list (source + target) layout                           | ❌ (no PickList)  | ✅       | N/A      | N/A    | ✅                 |
| Transfer buttons (→ / ← / All → / ← All)                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Transfer buttons with descriptive `aria-label`               | ❌                | ⚠️ icon-only | N/A | N/A | 🚀 |
| `role=listbox` on each list panel                            | ❌                | ⚠️ uses `<ul>` | N/A | N/A | 🚀 |
| `role=option` per item with `aria-selected`                  | ❌                | ⚠️      | N/A      | N/A    | 🚀                |
| `aria-label` on each panel (source / target)                 | ❌                | ⚠️      | N/A      | N/A    | 🚀                |
| `aria-live` region announcing transfer result                | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Drag-and-drop between the two lists                          | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Reorder within each list                                     | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Filter / search input in each list                           | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom item `ng-template`                                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no PickList component; PrimeNG is the only reference and all features are matched._

#### Differentiators
- **`role=listbox` + `aria-label` on each panel**: Both the source and target panels use `role=listbox` with a consumer-configurable `aria-label` (e.g., "Available items", "Selected items"). PrimeNG uses plain `<ul>` elements with no ARIA selection role and no panel label — screen readers cannot distinguish the two lists or communicate that they are interactive selection containers.
- **Transfer buttons with descriptive `aria-label`**: Each transfer button carries a specific `aria-label` that includes item counts (e.g., "Move 3 selected items to target", "Move all items to source"). PrimeNG's transfer buttons are icon-only with no accessible name.
- **`aria-live` after transfer**: After items are moved between lists, a polite live region announces the result (e.g., "3 items moved to selected. Selected list now has 7 items"), confirming the action and current state for screen reader users.

#### Reference URLs
- Angular Material: https://material.angular.io — no PickList component
- PrimeNG: https://primeng.org/picklist
- Radix UI: N/A — no PickList primitive
- Ark UI: N/A — no PickList primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ (dual listbox transfer pattern)

---

### Paginator

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Previous / Next page buttons                                 | ✅                | ✅       | N/A      | N/A    | ✅                 |
| First / Last page buttons                                    | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Numbered page buttons                                        | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `aria-current=page` on the active page button                | ✅                | ⚠️      | N/A      | N/A    | 🚀                |
| `aria-label` per page button (e.g. "Page 3 of 10")          | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-label` on Prev / Next / First / Last buttons           | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Wrapping `<nav>` with `aria-label="Pagination"`              | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-live` region announcing page change                    | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Rows-per-page dropdown                                       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Jump-to-page input                                           | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`aria-live` region announcing page change**: After a page navigation, a polite live region announces "Page 3 of 10, showing items 21 to 30" — giving screen reader users immediate confirmation that the content has updated and their current position in the dataset. Neither Angular Material nor PrimeNG announces page changes via a live region.
- **`aria-current=page` on the active page button**: The button representing the current page carries `aria-current=page` — the correct ARIA attribute for communicating the current item in a navigation sequence. PrimeNG applies a CSS class for visual indication but does not set `aria-current`, so screen readers cannot identify the current page programmatically.
- **Signal-native API**: Current page and rows-per-page are `model<number>()` signals — composable with table or data-source signals for URL-driven pagination without Observable subscription chains.

#### Reference URLs
- Angular Material: https://material.angular.io/components/paginator/overview
- PrimeNG: https://primeng.org/paginator
- Radix UI: N/A — no Paginator primitive
- Ark UI: N/A — no Paginator primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/link/ (Pagination uses navigation landmark + `aria-current` for current-page indicator)

---

## Feedback & Status

---

### Toast

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI    | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|-------------|--------|-------------------|
| `aria-live` region for announcements                         | ✅                | ✅       | N/A         | ✅      | ✅                 |
| `aria-live=assertive` for error severity                     | ❌                | ⚠️      | N/A         | ✅      | 🚀                |
| `aria-live=polite` for info / success / warn                 | ✅                | ⚠️      | N/A         | ✅      | 🚀                |
| Multiple severity variants (success / info / warn / error)   | ❌                | ✅       | N/A         | ✅      | ✅                 |
| Manual dismiss button with accessible label                  | ✅                | ✅       | N/A         | ✅      | ✅                 |
| Auto-dismiss timeout                                         | ✅                | ✅       | N/A         | ✅      | ✅                 |
| Pause auto-dismiss on hover / focus                          | ❌                | ✅       | N/A         | ✅      | ✅                 |
| Stacking of multiple simultaneous toasts                     | ❌                | ✅       | N/A         | ✅      | ✅                 |
| Position variants (top-right / bottom-left / etc.)           | ❌                | ✅       | N/A         | ✅      | ✅                 |
| Custom content via `ng-template`                             | ❌                | ✅       | N/A         | ✅      | ✅                 |
| Enter / exit animation                                       | ✅                | ✅       | N/A         | ✅      | ✅                 |
| `prefers-reduced-motion` — animation disabled                | ⚠️               | ⚠️      | N/A         | ✅      | ✅                 |
| Service-based API for programmatic dispatch                  | ✅                | ✅       | N/A         | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A         | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A         | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌           | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Urgency-correct `aria-live` roles**: Error toasts use `aria-live=assertive` (interrupts the screen reader immediately) while info/success/warn toasts use `aria-live=polite` (waits for the current utterance to finish). Angular Material always uses `polite`; PrimeNG does not consistently distinguish urgency. This matches what the WCAG advisory and APG patterns recommend.
- **Pause on hover/focus**: Auto-dismiss countdown is suspended while the pointer is over the toast or a focusable element inside it has focus. Angular Material's snackbar has no pause behaviour, meaning keyboard users may not have time to read or interact with the content.
- **Signal-native service API**: The `ToastService.add()` method accepts an `InputSignal`-compatible options object. Severity, lifetime, and content can be derived from signals without subscribing to observables.

#### Reference URLs
- Angular Material: https://material.angular.io/components/snack-bar/overview
- PrimeNG: https://primeng.org/toast
- Radix UI: N/A — no Toast primitive (team recommends Sonner or custom implementation via WAI-ARIA Live Regions)
- Ark UI: https://ark-ui.com/react/docs/components/toast
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/ (Alert pattern — live-region basis for toast)

---

### ProgressBar

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=progressbar`                                           | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `aria-valuenow` updated as progress changes                  | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `aria-valuemin` / `aria-valuemax`                            | ✅                | ✅       | N/A      | N/A    | ✅                 |
| `aria-valuetext` for human-readable label                    | ⚠️               | ⚠️      | N/A      | N/A    | 🚀                |
| Indeterminate / loading mode                                 | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Indeterminate omits `aria-valuenow` (correct per spec)       | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Label inside bar (value display)                             | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Custom label `ng-template`                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Severity / colour variants                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Striped / animated stripe variant                            | ❌                | ❌       | N/A      | N/A    | ✅                 |
| `prefers-reduced-motion` — stripe animation disabled         | N/A              | N/A     | N/A      | N/A    | 🚀                |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Indeterminate omits `aria-valuenow`**: The ARIA spec states that `aria-valuenow` must not be present when a progressbar is indeterminate. Angular Material and PrimeNG both leave `aria-valuenow=0` on indeterminate progress bars, which some screen readers (NVDA) announce as "0 percent" rather than "in progress". This library removes the attribute in indeterminate mode.
- **`aria-valuetext` support**: A custom format string (e.g. `"{value} of {max} files uploaded"`) is rendered as `aria-valuetext`, giving screen readers a human-readable progress description. Angular Material and PrimeNG only expose the numeric `aria-valuenow`.
- **Striped variant with reduced-motion guard**: The animated stripe variant is automatically disabled when `prefers-reduced-motion: reduce` is in effect — no equivalent exists in Angular Material or PrimeNG.

#### Reference URLs
- Angular Material: https://material.angular.io/components/progress-bar/overview
- PrimeNG: https://primeng.org/progressbar
- Radix UI: N/A — no ProgressBar primitive
- Ark UI: N/A — no ProgressBar primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/ (Meter pattern — closest to bounded progress)

---

### ProgressSpinner

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=status` (correct for indeterminate loading)            | ⚠️ uses `role=progressbar` | ⚠️ uses `role=progressbar` | N/A | N/A | 🚀 |
| `aria-label` to describe what is loading                     | ⚠️ partial       | ❌       | N/A      | N/A    | ✅                 |
| `aria-live=polite` on the container                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Animated SVG hidden from AT (`aria-hidden="true"`)           | ⚠️               | ⚠️      | N/A      | N/A    | ✅                 |
| `prefers-reduced-motion` — spin animation disabled           | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Size configurable (sm / md / lg + custom)                    | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Stroke width configurable                                    | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Colour override via CSS custom property                      | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Full-page overlay (block UI) variant                         | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **`role=status`**: An indeterminate spinner communicates an application state update — not a measurable progress value. `role=progressbar` requires `aria-valuenow` which is meaningless for an unknown-duration operation. This library uses `role=status` with `aria-live=polite` — the correct pattern for "something is loading" that does not interrupt the user. Angular Material and PrimeNG both apply `role=progressbar` to their spinners.
- **`aria-live=polite` on the container**: The `role=status` container is an implicit live region, so when the spinner appears (e.g., on a lazy-loaded section) screen readers automatically announce the `aria-label`. Neither Angular Material nor PrimeNG declares the live region explicitly on their spinner hosts.
- **Animated SVG fully hidden from AT**: The SVG circle path animation is `aria-hidden="true"` so screen readers do not traverse the SVG elements. All accessible information comes from the host's `role=status` and `aria-label` alone, avoiding duplicate or nonsensical SVG announcements.

#### Reference URLs
- Angular Material: https://material.angular.io/components/progress-spinner/overview
- PrimeNG: https://primeng.org/progressspinner
- Radix UI: N/A — no ProgressSpinner primitive
- Ark UI: N/A — no ProgressSpinner primitive
- APG Pattern: N/A — `role=status` covers loading spinners; no dedicated APG spinner pattern

---

## Adding New Entries

When a component completes Phase 2 (DX & API) of the hardening workflow:

1. Copy the template from the "How to Fill In a New Entry" section above.
2. Research each reference library — spend at least 15 minutes on each.
3. Fill in every row with a definitive symbol — no blanks left.
4. Resolve all ❌ gaps: implement the feature or write a one-line exclusion reason.
5. Write at least one 🚀 Differentiator entry — if you cannot find one, look harder.
6. Record the URLs.
7. Update the component's Category 11 score in `COMPONENT_SCORES.md`.

The comparison table for a component is never "done" — re-check it when:
- A reference library ships a major new version
- A new API input is added to this component
- An a11y gap is reported by a user or an axe-core audit
