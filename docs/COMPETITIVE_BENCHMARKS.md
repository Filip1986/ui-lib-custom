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

### RadioButton

RadioButton renders a group of mutually exclusive options implementing the WAI-ARIA `radiogroup` / `radio` pattern.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=radiogroup` / `role=radio` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Arrow-key navigation within group | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-required` on group | ✅ | ⚠️ manual only | ✅ | ✅ | ✅ |
| `aria-disabled` per item | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-describedby` for hint / error text | ✅ | ❌ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<T>()` for group value | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Zoneless / standalone / `OnPush` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — all WCAG-required attributes implemented.

#### Differentiators

- **`aria-describedby` wired to hint + error text**: Each radio item automatically links to both the shared hint element and any inline validation error, fulfilling WCAG SC 1.3.1 and 3.3.2 without consumer boilerplate — absent from PrimeNG.
- **Group-level `aria-required` propagation**: The `required` input on the group sets `aria-required` on the `role=radiogroup` element and is mirrored to each `role=radio` item, so assistive technology announces the requirement consistently across all nodes.
- **Signal-native group model**: `model<T>()` on the group component means Angular `[(value)]` two-way binding, `computed()` derivation, and `effect`-based side-effects all work without explicit event subscriptions — eliminating the `FormControl.valueChanges` subscription pattern that leaks in many PrimeNG form integrations.

#### Reference URLs
- Angular Material: https://material.angular.io/components/radio
- PrimeNG: https://primeng.org/radiobutton
- Radix UI: https://www.radix-ui.com/primitives/docs/components/radio-group
- Ark UI: https://ark-ui.com/react/docs/components/radio-group
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/

---

### Textarea

Textarea is a multi-line text input with auto-resize, character counting, and full reactive-form integration.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-label` / `aria-labelledby` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-invalid` + `aria-describedby` for errors | ✅ | ⚠️ manual only | ✅ | ✅ | ✅ |
| `aria-readonly` | ✅ | ⚠️ manual only | ✅ | ✅ | ✅ |
| Auto-resize (no JS scroll jump) | ⚠️ | ✅ | ❌ | ❌ | ✅ |
| Live character count with `aria-live` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `aria-describedby` linked to char-count region | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<string>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — all WCAG-required attributes implemented.

#### Differentiators

- **Live character count as `aria-live` region**: When a character limit is set, the remaining-characters counter uses `aria-live=polite` so screen reader users hear "42 characters remaining" on each pause without losing editing position — a detail absent from every reference library.
- **`aria-describedby` linked to counter element**: The textarea is programmatically linked to the character-count element via `aria-describedby`, so assistive technology can query the constraint on demand without relying on the live announcement — satisfying WCAG SC 1.3.1.
- **Auto-resize without layout thrashing**: Resize is driven by setting `height: auto` then reading `scrollHeight` in a single rAF, avoiding the double-read layout thrash present in PrimeNG's `autoResize` directive implementation.

#### Reference URLs
- Angular Material: https://material.angular.io/components/input (textarea variant)
- PrimeNG: https://primeng.org/textarea
- Radix UI: N/A — no dedicated Textarea primitive (HTML `<textarea>` used directly)
- Ark UI: N/A — no dedicated Textarea primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (multi-line textbox)

---

### SelectButton

SelectButton renders a segmented group of toggle buttons for single or multi-select scenarios, following the toolbar keyboard model.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=group` on container | ✅ | ❌ (plain `<div>`) | ✅ | ✅ | ✅ |
| `role=button` + `aria-pressed` per option | ✅ | ❌ (no `aria-pressed`) | ✅ | ✅ | ✅ |
| `aria-label` on container | ✅ | ❌ | ✅ | ✅ | ✅ |
| Multi-select with `aria-multiselectable` | ⚠️ | ❌ | ✅ | ✅ | ✅ |
| Arrow keys to move, Space to select | ✅ | ❌ | ✅ | ✅ | ✅ |
| Typed `ng-template` option slot | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<T \| T[]>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `role=group`, `aria-pressed`, `aria-label`, and `aria-multiselectable` all implemented.

#### Differentiators

- **`aria-pressed` state on every option button**: PrimeNG SelectButton renders styled `<div>` elements with no ARIA — selected state is visually implied but invisible to screen readers. Every option carries `role=button` + `aria-pressed` so VoiceOver / NVDA announce "pressed" / "not pressed" correctly.
- **Arrow-key navigation within group**: Follows the APG toolbar keyboard pattern — Left / Right arrow moves focus between options, Space toggles selection. PrimeNG requires Tab to reach each option, which is incorrect for a widget group.
- **`aria-multiselectable` on container**: When `multiple=true`, the `role=group` gains `aria-multiselectable=true` so assistive technology users know they can select more than one item before beginning interaction.

#### Reference URLs
- Angular Material: N/A — closest is Button Toggle Group (https://material.angular.io/components/button-toggle)
- PrimeNG: https://primeng.org/selectbutton
- Radix UI: https://www.radix-ui.com/primitives/docs/components/toggle-group
- Ark UI: https://ark-ui.com/react/docs/components/toggle-group
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ (toolbar keyboard model applies to button groups)

---

### ToggleSwitch

ToggleSwitch is a boolean on / off control implementing the WAI-ARIA `switch` role.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=switch` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-checked` (true / false) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Space key toggles | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-label` / `aria-labelledby` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-disabled` sync with `disabled` input | ✅ | ⚠️ `attr.disabled` only | ✅ | ✅ | ✅ |
| `aria-describedby` for hint / error | ✅ | ❌ | ✅ | ✅ | ✅ |
| `prefers-reduced-motion` on thumb animation | ⚠️ | ❌ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<boolean>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — all WCAG-required attributes implemented.

#### Differentiators

- **`aria-disabled` and `disabled` always in sync via host binding**: PrimeNG sets only the native `disabled` attribute, leaving `aria-disabled` absent. Screen readers that check `aria-disabled` for non-form elements will miss the disabled state; both attributes are managed by a single host binding that reads the `disabled` signal.
- **`aria-describedby` wired to hint and error text**: The toggle links to both a persistent hint element (e.g., "Enables email notifications") and any validation message via `aria-describedby`, giving users context before they commit to a change — fulfilling WCAG SC 3.3.2.
- **`prefers-reduced-motion` respected on thumb animation**: The sliding thumb uses a CSS transition gated behind `@media (prefers-reduced-motion: no-preference)`, so users with vestibular disorders see an instant state change rather than motion.

#### Reference URLs
- Angular Material: https://material.angular.io/components/slide-toggle
- PrimeNG: https://primeng.org/toggleswitch
- Radix UI: https://www.radix-ui.com/primitives/docs/components/switch
- Ark UI: https://ark-ui.com/react/docs/components/switch
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/

---

### InputOtp

InputOtp is a one-time password / PIN entry widget with sequential cell focus management and paste-distribution support.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Individual `<input type=text>` per slot | ❌ | ✅ | ❌ | ✅ | ✅ |
| Auto-advance focus on character entry | ❌ | ✅ | ❌ | ✅ | ✅ |
| Backspace moves to previous cell | ❌ | ✅ | ❌ | ✅ | ✅ |
| Paste distributes across cells | ❌ | ✅ | ❌ | ✅ | ✅ |
| Positional `aria-label` per cell ("Digit N of M") | ❌ | ❌ | ❌ | ⚠️ | 🚀 |
| `aria-live` paste-completion announcement | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `role=group` + `aria-label` on container | ❌ | ❌ | ❌ | ⚠️ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<string>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — sequential focus, paste, and ARIA all implemented.

#### Differentiators

- **Positional `aria-label` per cell**: Each input carries `aria-label="Digit N of M"` (e.g., "Digit 3 of 6"), so screen reader users understand how many fields exist and which position has focus — absent from PrimeNG and only partial in Ark UI.
- **Paste-completion `aria-live` announcement**: When a valid OTP is pasted and all cells fill, an `aria-live=polite` region announces "Code entered" so keyboard-only and screen reader users get confirmation without needing to inspect each cell individually.
- **Angular Material has no OTP component**: The entire category is unserved by Material; ui-lib-custom covers it natively with signals, zoneless support, and full a11y — a concrete feature gap over the most-used Angular library.

#### Reference URLs
- Angular Material: N/A — no InputOtp component
- PrimeNG: https://primeng.org/inputotp
- Radix UI: N/A — no OTP primitive (community: shadcn/ui uses input-otp)
- Ark UI: https://ark-ui.com/react/docs/components/pin-input
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (each cell is a single-character textbox)

---

### KeyFilter

KeyFilter is a directive that restricts which keyboard characters are accepted by a text input, with built-in presets (numeric, alpha, alphanumeric, hex) and a custom regex option.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Built-in presets (numeric, alpha, alphanumeric) | ❌ | ✅ | ❌ | ❌ | ✅ |
| Custom regex filter | ❌ | ✅ | ❌ | ❌ | ✅ |
| Paste filtering (strips disallowed chars) | ❌ | ✅ | ❌ | ❌ | ✅ |
| Visually-hidden format hint via `aria-describedby` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `aria-live` announcement on blocked key | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `aria-live` confirmation on filtered paste | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `filter` / `regex` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — format hint, block announcement, and paste confirmation all implemented.

#### Differentiators

- **Visually-hidden format hint via `aria-describedby`**: The directive injects a `<span class="sr-only">` describing the accepted format (e.g., "Digits only") and links it to the host input via `aria-describedby`, satisfying WCAG SC 3.3.2. PrimeNG's `pKeyFilter` provides no such hint.
- **`aria-live` announcement on blocked keystroke**: When a character is silently rejected, an `aria-live=assertive` region briefly announces "Character not allowed" — giving screen reader users the same feedback that sighted users infer from nothing happening. This is absent from every reference library.
- **Paste-filtered `aria-live` confirmation**: Pasted content is filtered and the cleaned value is written back; an `aria-live=polite` region announces "Input filtered to accepted characters only", so non-visual users are not silently surprised by truncated paste output.

#### Reference URLs
- Angular Material: N/A — no KeyFilter directive
- PrimeNG: https://primeng.org/keyfilter
- Radix UI: N/A — no KeyFilter primitive
- Ark UI: N/A — no KeyFilter primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (textbox input constraints)

---

### TreeSelect

TreeSelect is a dropdown-style selector that renders a hierarchical tree structure for option selection, combining the combobox and tree widget patterns.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Trigger: `role=combobox` + `aria-haspopup=tree` | ❌ | ⚠️ (`aria-haspopup=listbox` — wrong) | ❌ | ❌ | ✅ |
| Panel: `role=tree` / `role=treeitem` | ❌ | ✅ | ❌ | ❌ | ✅ |
| `aria-expanded` on nodes | ❌ | ✅ | ❌ | ❌ | ✅ |
| Arrow-key nav: Down / Up move, Right / Left expand / collapse | ❌ | ✅ | ❌ | ❌ | ✅ |
| `aria-multiselectable` for multi-select trees | ❌ | ⚠️ partial | ❌ | ❌ | ✅ |
| `aria-activedescendant` on trigger | ❌ | ❌ | ❌ | ❌ | ✅ |
| Typeahead within tree panel | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<TreeNode \| TreeNode[]>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-haspopup=tree`, `aria-activedescendant`, and typeahead all implemented.

#### Differentiators

- **Correct `aria-haspopup=tree` on trigger**: PrimeNG TreeSelect uses `aria-haspopup=listbox` even though the popup contains `role=tree` — a semantic mismatch that misleads screen readers. ui-lib-custom sets `aria-haspopup=tree` to accurately describe the popup widget type.
- **`aria-activedescendant` maintained through expansion**: As nodes expand and contract, the trigger's `aria-activedescendant` always points to the currently focused tree item, so VoiceOver / NVDA users hear the correct node name and level without focus leaving the trigger element.
- **Typeahead within the tree panel**: Typing a character jumps focus to the next matching node within the expanded tree — following the APG treeview typeahead pattern. Neither PrimeNG nor any Material-equivalent implements this for a dropdown tree.

#### Reference URLs
- Angular Material: N/A — no TreeSelect component
- PrimeNG: https://primeng.org/treeselect
- Radix UI: N/A — no TreeSelect primitive
- Ark UI: N/A — no TreeSelect primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ (tree inside combobox popup)

---

### Upload

Upload is a file-input component with drag-and-drop zone, file queue management, progress feedback, and remove-file controls.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Drop-zone `aria-label` + drag-state announcement | ❌ | ⚠️ no announcement | ❌ | ❌ | ✅ |
| File-added `aria-live` announcement | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Per-file remove button with file name in `aria-label` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Upload progress `role=progressbar` + `aria-valuenow` | ❌ | ⚠️ visual only | ❌ | ❌ | ✅ |
| Invalid file `aria-live=assertive` error announcement | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Keyboard-activatable drop zone (Enter / Space) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<File[]>()` file queue | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — drop-zone ARIA, file-queue announcements, progress semantics, and keyboard activation all implemented.

#### Differentiators

- **File-added `aria-live` announcement**: When files are added (via drag-and-drop or the file picker), an `aria-live=polite` region announces "3 files added: report.pdf, photo.jpg, data.csv" — giving screen reader users confirmation of the queue state without needing to navigate to the file list.
- **Per-file remove button carries the file name**: Each "Remove" button in the file queue has `aria-label="Remove report.pdf"` — so screen reader users in virtual cursor mode know exactly which file they are about to remove instead of encountering a sequence of identical "Remove" buttons.
- **Invalid file type / size `aria-live=assertive` error**: When a dropped file is rejected (wrong type or exceeds size limit), an `aria-live=assertive` region immediately announces the reason (e.g., "report.exe rejected: file type not allowed"), ensuring non-visual users are not silently surprised by a file failing to appear in the queue.

#### Reference URLs
- Angular Material: N/A — no Upload component
- PrimeNG: https://primeng.org/fileupload
- Radix UI: N/A — no Upload primitive
- Ark UI: N/A — no Upload primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (drop zone as an interactive button region)

---

### SplitButton

SplitButton combines a primary action button with a dropdown trigger that opens a secondary-actions menu.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Primary button + separate dropdown trigger | ❌ | ✅ | ❌ | ❌ | ✅ |
| Dropdown trigger `aria-haspopup=menu` + `aria-expanded` | ❌ | ⚠️ missing `aria-expanded` | ❌ | ❌ | ✅ |
| `aria-label` on dropdown trigger (not "▾") | ❌ | ❌ | ❌ | ❌ | ✅ |
| `role=menu` + `role=menuitem` in panel | ❌ | ✅ | ❌ | ❌ | ✅ |
| Arrow-key + Home / End navigation in menu | ❌ | ⚠️ partial | ❌ | ❌ | ✅ |
| Escape closes menu and returns focus to trigger | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native item model | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-haspopup`, `aria-expanded`, labelled dropdown trigger, and full menu keyboard contract all implemented.

#### Differentiators

- **`aria-expanded` on the dropdown trigger**: PrimeNG SplitButton sets `aria-haspopup` but omits `aria-expanded`, so screen readers announce the button is a menu trigger but never announce whether the menu is currently open or closed. Both attributes are always in sync with the open state.
- **Descriptive `aria-label` on the dropdown trigger**: The chevron-only dropdown button carries `aria-label="More actions"` (configurable) rather than inheriting the primary button label — preventing duplicate announcements and clearly communicating the trigger's purpose to screen reader users.
- **Full APG menu keyboard contract**: Home / End jump to first / last item; character typeahead advances to matching items. PrimeNG's SplitButton menu only partially implements arrow-key navigation and skips Home / End entirely.

#### Reference URLs
- Angular Material: N/A — no SplitButton component
- PrimeNG: https://primeng.org/splitbutton
- Radix UI: N/A — no SplitButton primitive
- Ark UI: N/A — no SplitButton primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ (menu button pattern)

---

### ToggleButton

ToggleButton is a single button that maintains a pressed / unpressed state, implementing `role=button` + `aria-pressed` — the single-item counterpart to SelectButton's group model.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=button` + `aria-pressed` (true / false) | ✅ | ⚠️ (no `aria-pressed`) | ✅ | ✅ | ✅ |
| `aria-label` / `aria-labelledby` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-disabled` in sync with `disabled` input | ✅ | ⚠️ (`attr.disabled` only) | ✅ | ✅ | ✅ |
| Icon-only mode with required `aria-label` | ✅ | ⚠️ (no enforcement) | ✅ | ✅ | ✅ |
| `prefers-reduced-motion` on press animation | ❌ | ❌ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<boolean>()` pressed state | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-pressed`, `aria-disabled` sync, and icon-only label enforcement all implemented.

#### Differentiators

- **`aria-pressed` always present**: PrimeNG ToggleButton renders a styled `<button>` but omits `aria-pressed` — screen readers announce the button label but cannot communicate whether it is currently active. `aria-pressed` is always written and kept in sync with the `model<boolean>()` value.
- **`aria-disabled` in sync via host binding**: PrimeNG sets only the native `disabled` attribute; `aria-disabled` is absent. When a ToggleButton is disabled but must remain focusable (e.g., to show a tooltip on focus), only `aria-disabled=true` is set — the library handles both attributes via a unified host binding that reads the `disabled` signal.
- **Icon-only label enforcement**: When the `label` input is absent and only an icon is rendered, the component emits an `ng-dev-mode` warning if `ariaLabel` is also not provided — preventing the common mistake of shipping an unlabelled interactive control that is invisible to screen readers.

#### Reference URLs
- Angular Material: https://material.angular.io/components/button-toggle
- PrimeNG: https://primeng.org/togglebutton
- Radix UI: https://www.radix-ui.com/primitives/docs/components/toggle
- Ark UI: https://ark-ui.com/react/docs/components/toggle
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (`aria-pressed` toggle button pattern)

---

### FloatLabel

FloatLabel is a directive that animates an input label from placeholder position into a floating label above the field when the input receives focus or contains a value.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Real `<label>` element (not `<span>` placeholder) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Label `for` / `htmlFor` links to input `id` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contrast ≥ 3:1 in floated position | ✅ | ⚠️ (theme-dependent) | ✅ | ✅ | ✅ |
| `prefers-reduced-motion` on float animation | ✅ | ❌ | ✅ | ✅ | ✅ |
| Static (always-float) variant for reduced-motion | ✅ | ❌ | ❌ | ❌ | ✅ |
| `aria-placeholder` not used as a label substitute | ✅ | ✅ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `variant` input | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — real `<label>` element, contrast, reduced-motion static variant all implemented.

#### Differentiators

- **`prefers-reduced-motion` provides a static-float variant**: PrimeNG FloatLabel animates the label on every focus / blur regardless of the user's motion preference. When `prefers-reduced-motion: reduce` is detected, the library defaults to the `always` variant — the label is positioned above the field from the start, providing the same information hierarchy without any animation.
- **Contrast ≥ 3:1 in floated position guaranteed by design tokens**: The floated label colour uses `var(--uilib-input-label-float-color)`, which is set to a value meeting WCAG SC 1.4.3 against the input background in all three visual variants — removing the common pitfall of a label that passes contrast when large and unfloated but fails when small and floated.
- **No `aria-placeholder` as label substitute**: PrimeNG and some community implementations use `placeholder` attribute styling to simulate a floating label, which means the label is read as a placeholder (not announced in VoiceOver's Forms mode) and disappears on input. The library always uses a real `<label>` element.

#### Reference URLs
- Angular Material: https://material.angular.io/components/form-field (MatFormField with floating label)
- PrimeNG: https://primeng.org/floatlabel
- Radix UI: N/A — no FloatLabel primitive
- Ark UI: N/A — no FloatLabel primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (label association for text inputs)

---

### InputGroup

InputGroup is a container that combines a text input with prefix and/or suffix addons — icons, text strings, or action buttons — in a visually unified group.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Decorative addons `aria-hidden` | ❌ | ⚠️ (partial) | ❌ | ❌ | ✅ |
| Interactive addon buttons with `aria-label` | ❌ | ⚠️ (no enforcement) | ❌ | ❌ | ✅ |
| Input `aria-describedby` linked to text addon | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Single focusable unit — addons don't interrupt Tab | ✅ | ⚠️ (varies) | ❌ | ❌ | ✅ |
| `aria-label` on addon button includes input context | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — decorative `aria-hidden`, interactive addon labels, and input `aria-describedby` all implemented.

#### Differentiators

- **Input `aria-describedby` linked to text addons**: When an InputGroup has a text suffix (e.g., ".com" or "kg"), that suffix is wired to the input via `aria-describedby` — so screen readers announce "username .com" when the field receives focus, giving users the same contextual constraint that sighted users infer visually. No reference library implements this.
- **Addon button `aria-label` includes input context**: An addon clear button carries `aria-label="Clear username"` rather than just "Clear" — so screen reader users in virtual cursor mode navigating a form with multiple InputGroups can identify which field the button belongs to without backtracking to read the label.
- **Decorative vs interactive addon classification**: The `addon` slot accepts both decorative icons (automatically `aria-hidden`) and interactive buttons (which require an explicit `aria-label` — enforced by a dev-mode warning). This classification prevents the common mistake of shipping an unlabelled interactive addon in a production build.

#### Reference URLs
- Angular Material: https://material.angular.io/components/form-field (prefix / suffix)
- PrimeNG: https://primeng.org/inputgroup
- Radix UI: N/A — no InputGroup primitive
- Ark UI: N/A — no InputGroup primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (input with associated controls)

---

### IconField

IconField is a lightweight wrapper that positions an icon inside a text input — visually overlapping the input — without intercepting focus or altering keyboard behaviour.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Decorative icon `aria-hidden` | ✅ | ⚠️ (partial) | ✅ | ✅ | ✅ |
| No focus intercept — icon is not focusable | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input padding compensates for icon width | ✅ | ✅ | ✅ | ✅ | ✅ |
| Informative icon mode with `aria-describedby` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Icon position (left / right) as signal input | ❌ | ✅ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `position` input | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — decorative `aria-hidden`, no focus intercept, and informative mode all implemented.

#### Differentiators

- **Informative icon mode with `aria-describedby`**: When the icon carries semantic meaning (e.g., a search magnifier indicating that the field drives a live search), passing `informative=true` renders the icon with a visually-hidden `<span>` and links it to the input via `aria-describedby` — so screen readers announce the context. No reference library exposes this pattern.
- **`aria-hidden` enforced by default**: The icon slot defaults to `aria-hidden=true`. If the icon is changed to an alert or warning symbol by the consumer without setting `informative=true`, the dev-mode warning guides them to the correct accessibility pattern rather than silently shipping an ambiguous, hidden icon.
- **No focus intercept — icon is absolutely positioned outside the tab order**: The icon `<span>` is positioned with `pointer-events: none` and `tabindex` is never set, ensuring the input remains the sole interactive element in the field regardless of icon placement.

#### Reference URLs
- Angular Material: https://material.angular.io/components/form-field (matPrefix / matSuffix icons)
- PrimeNG: https://primeng.org/iconfield
- Radix UI: N/A — no IconField primitive
- Ark UI: N/A — no IconField primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (input with decorative icon)

---

### FormField

FormField is a layout orchestrator that wires a label, input, optional hint, and optional error message into a single accessible unit via `aria-labelledby` and `aria-describedby`.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Label → input association via `for` / `id` | ✅ | ⚠️ (manual) | ✅ | ✅ | ✅ |
| `aria-describedby` links input → hint + error | ✅ | ❌ | ✅ | ✅ | ✅ |
| Error visible only when invalid (`aria-live`) | ✅ | ⚠️ (manual) | ✅ | ✅ | ✅ |
| `aria-required` propagated to inner input | ✅ | ❌ | ✅ | ✅ | ✅ |
| `aria-invalid` propagated to inner input | ✅ | ❌ | ✅ | ✅ | ✅ |
| Works with any custom `ControlValueAccessor` | ✅ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native validation state | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — label association, `aria-describedby` chain, `aria-required` / `aria-invalid` propagation, and `ControlValueAccessor` compatibility all implemented.

#### Differentiators

- **Full `aria-describedby` chain to hint + error**: The inner input is linked to both the hint element and the error message element via `aria-describedby`. When the control becomes invalid, the error element appears and the screen reader reads "Email — Enter a valid email address — Invalid email format" in a single focus event — satisfying WCAG SC 1.3.1 without any consumer boilerplate. PrimeNG has no equivalent orchestrator.
- **`aria-required` and `aria-invalid` propagated to any CVA**: FormField queries the projected `ControlValueAccessor` and writes `aria-required` / `aria-invalid` directly to the host element's ARIA attributes via the `AriaControlBridge` service — so third-party or custom input components automatically get correct ARIA without needing to implement it themselves.
- **Error `aria-live=polite` region**: When a validation error first appears, the error container acts as an `aria-live=polite` region so screen reader users are notified of the new error message on the next pause without being interrupted mid-sentence — meeting WCAG SC 3.3.1 (Error Identification) accessibly.

#### Reference URLs
- Angular Material: https://material.angular.io/components/form-field
- PrimeNG: N/A — no unified FormField orchestrator (label, hint, and error managed separately)
- Radix UI: https://www.radix-ui.com/primitives/docs/components/form
- Ark UI: https://ark-ui.com/react/docs/components/field
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/ (label + error association for form inputs)

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

### Inplace

Inplace is an inline-edit widget that toggles between a read (display) mode and an edit (input) mode within the flow of content.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Toggle between display and edit modes | ❌ | ✅ | ❌ | ❌ | ✅ |
| `aria-expanded` on the display trigger | ❌ | ❌ | ❌ | ❌ | ✅ |
| `aria-label` on display / edit toggle | ❌ | ❌ | ❌ | ❌ | ✅ |
| Enter key activates edit mode | ❌ | ✅ | ❌ | ❌ | ✅ |
| Escape key cancels and returns to display mode | ❌ | ✅ | ❌ | ❌ | ✅ |
| Focus returns to display trigger on cancel / confirm | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Typed `ng-template` display and input slots | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<boolean>()` for edit-mode state | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — display / edit toggle, `aria-expanded`, keyboard navigation, and focus return all implemented.

#### Differentiators

- **`aria-expanded` on the display trigger**: PrimeNG Inplace renders a `<span>` click target with no ARIA — screen reader users have no indication the element is interactive or that activating it reveals an edit form. The display trigger carries `role=button` + `aria-expanded` so assistive technology announces the collapsed / expanded state accurately.
- **Focus returns to the display trigger on cancel / confirm**: When the user presses Escape (cancel) or submits the edit form, focus returns precisely to the display trigger — matching the disclosure widget pattern. PrimeNG does not manage focus on close, leaving keyboard users disoriented after editing.
- **`aria-label` describes the action with content context**: The display trigger carries a dynamic `aria-label` such as "Edit: Product name" — including the field label so screen reader users in virtual cursor mode can identify the Inplace widget without needing to read surrounding content.

#### Reference URLs
- Angular Material: N/A — no Inplace component
- PrimeNG: https://primeng.org/inplace
- Radix UI: N/A — no Inplace primitive
- Ark UI: N/A — no Inplace primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ (display / edit toggle follows the disclosure button pattern)

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

### PanelMenu

PanelMenu is an accordion-style vertical navigation component — top-level items act as collapsible panel headers, each containing a nested `role=menu`.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=menu` / `role=menuitem` in panels | ❌ | ✅ | ❌ | ❌ | ✅ |
| Panel toggle `aria-expanded` + `aria-controls` | ❌ | ✅ | ✅ | ✅ | ✅ |
| Arrow-key navigation within open panel | ❌ | ⚠️ partial | ✅ | ✅ | ✅ |
| Character typeahead within panel | ❌ | ❌ | ✅ | ✅ | ✅ |
| `aria-current=page` on active route item | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Multiple / single-open mode | ❌ | ✅ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<string[]>()` for expanded keys | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — panel toggle, menu keyboard model, typeahead, and active-item indication all implemented.

#### Differentiators

- **`aria-current=page` on active route item**: PrimeNG PanelMenu visually styles the active item but carries no ARIA — screen reader users have no programmatic indication of their current location. The library sets `aria-current=page` on the item matching the current route, which assistive technology announces as "current page" when the user reaches it.
- **Full APG menu keyboard contract inside open panels**: Down / Up moves between items, Home / End jumps to first / last, and character typeahead advances to the next matching item. PrimeNG's panel menu only partially implements arrow-key navigation and skips typeahead entirely.
- **Signal-native `model<string[]>()` for expanded panels**: Consumer code can bind `[(expandedKeys)]` and derive state with `computed()` or respond with `effect()` — eliminating the common pattern of shadowing PrimeNG's panel state in a separate `boolean[]`.

#### Reference URLs
- Angular Material: N/A — no PanelMenu component
- PrimeNG: https://primeng.org/panelmenu
- Radix UI: N/A — no PanelMenu primitive (Accordion + menu composition required)
- Ark UI: https://ark-ui.com/react/docs/components/accordion (closest primitive)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ (panels) + https://www.w3.org/WAI/ARIA/apg/patterns/menu/ (items within panels)

---

### TieredMenu

TieredMenu is a hierarchical menu where submenus open to the side on hover / focus, supporting arbitrary nesting depth following the APG menu / submenu keyboard contract.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=menu` + `role=menuitem` at every level | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-haspopup=menu` + `aria-expanded` on parent | ✅ | ✅ | ✅ | ✅ | ✅ |
| Right arrow opens submenu, Left closes it | ✅ | ✅ | ✅ | ✅ | ✅ |
| Escape closes one level, returns focus to parent | ✅ | ✅ | ✅ | ✅ | ✅ |
| Home / End within each menu level | ✅ | ❌ | ✅ | ✅ | ✅ |
| Character typeahead within each level | ✅ | ❌ | ✅ | ✅ | ✅ |
| `@defer` on submenu panel until first open | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native menu item model | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — full APG submenu keyboard contract implemented at every nesting level.

#### Differentiators

- **Home / End within every menu level**: PrimeNG TieredMenu lacks Home / End support — pressing either key has no effect. The library implements these at every level so power users can jump to the first / last item without repeated arrow key presses.
- **Character typeahead within nested levels**: PrimeNG does not implement typeahead inside submenus. The library registers keydown listeners at every open menu level and advances focus to the next item whose label starts with the typed character — following the APG menu typeahead specification.
- **`@defer` on submenu panels**: Each submenu panel uses Angular `@defer` with a hover trigger so the submenu DOM is not created until the first open interaction — eliminating upfront rendering cost for menus with many nested items that users may never reach.

#### Reference URLs
- Angular Material: N/A — Material Menu supports one level of submenu only
- PrimeNG: https://primeng.org/tieredmenu
- Radix UI: https://www.radix-ui.com/primitives/docs/components/dropdown-menu (supports nested submenus)
- Ark UI: https://ark-ui.com/react/docs/components/menu
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu/ (menu + submenu keyboard contract)

---

### SpeedDial

SpeedDial is a Floating Action Button that expands into a set of labelled action items, supporting linear, radial, and semicircle layout modes.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-expanded` on FAB trigger | ✅ | ✅ | ❌ | ❌ | ✅ |
| `aria-haspopup` on trigger | ✅ | ❌ | ❌ | ❌ | ✅ |
| `aria-label` on each action button | ✅ | ✅ | ❌ | ❌ | ✅ |
| Arrow-key navigation between actions | ✅ | ❌ | ❌ | ❌ | ✅ |
| Escape closes and returns focus to trigger | ✅ | ✅ | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on open / fan animation | ⚠️ | ❌ | ❌ | ❌ | ✅ |
| Radial / semicircle / quarter-circle layout modes | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<boolean>()` open state | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-expanded`, `aria-haspopup`, action labels, keyboard navigation, and reduced-motion all implemented.

#### Differentiators

- **Arrow-key navigation between action items**: PrimeNG SpeedDial renders action buttons as a flat list but does not implement arrow-key navigation — Tab is required to reach each action. The library implements Up / Down / Left / Right navigation (direction-aware based on layout orientation) matching the toolbar keyboard model, keeping the Tab stop count to one.
- **`aria-haspopup` on FAB trigger**: PrimeNG omits `aria-haspopup`, so screen readers do not announce that the button opens a menu before users activate it. The trigger carries `aria-haspopup=true` alongside `aria-expanded` so assistive technology announces both the expandable nature and the current state.
- **`prefers-reduced-motion` on the fan animation**: Action items fan out with a CSS animation gated on `@media (prefers-reduced-motion: no-preference)`, suppressing the animation entirely — not merely slowing it — for users with vestibular sensitivity preferences.

#### Reference URLs
- Angular Material: https://material.angular.io/components/button (FAB variant; no SpeedDial expansion)
- PrimeNG: https://primeng.org/speeddial
- Radix UI: N/A — no SpeedDial primitive
- Ark UI: N/A — no SpeedDial primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ (FAB trigger as a disclosure button opening an action set)

---

### Dock

Dock renders a macOS-style application dock bar with magnification-on-hover effects, supporting horizontal and vertical orientations.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `<nav>` with `aria-label` landmark | ❌ | ❌ (unstyled list, no landmark) | ❌ | ❌ | ✅ |
| `aria-label` on each dock item | ❌ | ⚠️ tooltip only | ❌ | ❌ | ✅ |
| Decorative icon `aria-hidden` | ❌ | ❌ | ❌ | ❌ | ✅ |
| Active item `aria-current=page` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Arrow keys navigate between items | ❌ | ❌ | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on magnify animation | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native item model | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `<nav>` landmark, item labels, icon `aria-hidden`, active state, keyboard navigation, and reduced-motion all implemented.

#### Differentiators

- **`<nav aria-label>` landmark**: PrimeNG Dock renders an unstyled list with no landmark role — screen reader users navigating by landmarks cannot locate the dock. The library wraps items in `<nav aria-label="Application dock">` (label configurable via input), making it discoverable in VoiceOver / NVDA landmark menus.
- **`aria-current=page` on the active item**: PrimeNG provides no active-item ARIA. The library sets `aria-current=page` on the item matching the current route, so assistive technology announces "current" when focus reaches that item — giving non-visual users location awareness within the navigation.
- **`prefers-reduced-motion` on the magnification animation**: The iconic icon-scale magnification is gated on `@media (prefers-reduced-motion: no-preference)` — users with vestibular sensitivities get a completely static dock with no constant-motion hover effect.

#### Reference URLs
- Angular Material: N/A — no Dock component
- PrimeNG: https://primeng.org/dock
- Radix UI: N/A — no Dock primitive
- Ark UI: N/A — no Dock primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ (toolbar keyboard model applies to dock items)

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

### DataGrid

DataGrid is a signals-first, `role=grid` data grid with virtual scrolling, frozen columns, cell editing, multi-sort, column filter, lazy load, and full WAI-ARIA grid keyboard navigation — the premium flagship component.

#### Feature / Behaviour Parity

| Feature / Behaviour                                           | Angular Material           | PrimeNG    | Radix UI | Ark UI | **ui-lib-custom** |
|---------------------------------------------------------------|----------------------------|------------|----------|--------|-------------------|
| `role=grid` (interactive grid semantics)                      | ⚠️ `role=table` on CDK     | ✅          | N/A      | N/A    | ✅                 |
| Sortable columns with `aria-sort`                             | ✅                          | ✅          | N/A      | N/A    | ✅                 |
| Row selection (single / multi / checkbox)                     | ✅                          | ✅          | N/A      | N/A    | ✅                 |
| Arrow-key cell navigation (grid keyboard pattern)             | ❌                          | ⚠️ partial | N/A      | N/A    | ✅                 |
| F2 / Enter cell editing; Escape to cancel                     | ❌                          | ✅          | N/A      | N/A    | ✅                 |
| Virtual scrolling (CdkVirtualScrollViewport)                  | ✅ (CDK only)               | ✅          | N/A      | N/A    | ✅                 |
| `aria-rowcount` / `aria-rowindex` on virtual rows             | ❌                          | ⚠️ partial | N/A      | N/A    | 🚀                |
| Frozen / pinned columns (start and end)                       | ❌                          | ✅          | N/A      | N/A    | ✅                 |
| Column resizing (pointer events)                              | ❌                          | ✅          | N/A      | N/A    | ✅                 |
| Multi-column sort                                             | ❌                          | ✅          | N/A      | N/A    | ✅                 |
| Global filter + per-column filter                             | ❌                          | ✅          | N/A      | N/A    | ✅                 |
| Lazy load / server-side data (signal event)                   | ❌                          | ✅          | N/A      | N/A    | ✅                 |
| Column DSL via child components                               | ⚠️ (`ng-container` heavy)  | ✅          | N/A      | N/A    | ✅                 |
| Custom cell template via structural directive                 | ⚠️                         | ✅          | N/A      | N/a    | ✅                 |
| Live region announcing sort / filter results to screen reader | ❌                          | ❌          | N/A      | N/A    | 🚀                |
| Signal-native API (`input()`, `model()`, `output()`)          | ❌                          | ❌          | N/A      | N/A    | 🚀                |
| Zoneless compatible                                           | ❌                          | ❌          | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                 | ❌                          | ❌          | N/A      | N/A    | 🚀                |

#### Gaps

_None — all features listed above are implemented._

#### Differentiators

- **`aria-rowcount` / `aria-rowindex` on virtual scroll**: When scrolling a 10 000-row virtual grid, `aria-rowcount` on `<table>` and `aria-rowindex` on each visible `<tr>` communicate to screen readers that they are reading row 1 of 10 000 — not just row 1 of the dozen visible rows. Neither Angular Material CDK table nor PrimeNG p-table implement this correctly for virtual scroll.
- **Live region for sort / filter state changes**: Column header sort-direction changes and filter-match counts are announced via a live region (`aria-live=polite`). This means a keyboard-only screen reader user receives confirmation that "Sorted by Price ascending, 42 rows" without having to navigate away from the column header.
- **Arrow-key cell navigation (full grid pattern)**: Implements the complete WAI-ARIA Grid pattern — arrow keys move between cells, Tab moves between focusable interactive elements inside a cell, Home/End jump to first/last column, Page Up/Down scroll by viewport. PrimeNG's table has partial support (row navigation only); Angular Material's CDK table has none.

#### Reference URLs

- Angular Material: https://material.angular.io/cdk/table/overview (CDK table only — no full data grid)
- PrimeNG: https://primeng.org/table
- Radix UI: N/A — no data grid primitive
- Ark UI: N/A — no data grid primitive
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

### Timeline

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Vertical layout                                              | ❌ (no Timeline) | ✅       | N/A      | N/A    | ✅                 |
| Horizontal layout                                            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| `role=list` on the timeline container                        | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `role=listitem` per timeline entry                           | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Connector / marker elements `aria-hidden`                    | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Custom marker template                                       | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom content template per item                             | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Alternate left/right content layout                          | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no Timeline component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **`role=list` / `role=listitem` semantics**: The timeline container renders as a `<ol role="list">` and each event as a `<li role="listitem">`, so screen readers announce the list count and navigate item by item using list keyboard shortcuts. PrimeNG renders Timeline as a series of absolutely-positioned `<div>` elements with no semantic list structure — screen readers cannot perceive the number of events or navigate the timeline as a list.
- **Connector and marker elements `aria-hidden`**: The visual connector lines and step-indicator dots are marked `aria-hidden="true"` so screen readers do not attempt to describe purely decorative graphics alongside the event content. PrimeNG does not consistently apply `aria-hidden` to its timeline decorations.
- **Signal-native API**: Events bound via `input<TimelineItem[]>()` — the array can be a `computed()` signal derived from server-fetched activity data without zone triggers.

#### Reference URLs
- Angular Material: https://material.angular.io — no Timeline component
- PrimeNG: https://primeng.org/timeline
- Radix UI: N/A — no Timeline primitive
- Ark UI: N/A — no Timeline primitive
- APG Pattern: N/A — Timeline is a display-only list; `role=list` pattern applies

---

### OrganizationChart

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Hierarchical node tree rendering                             | ❌ (no OrgChart) | ✅       | N/A      | N/A    | ✅                 |
| `role=tree` on the container                                 | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `role=treeitem` per node                                     | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-expanded` on nodes with children                       | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-level` / `aria-setsize` / `aria-posinset` per node     | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Arrow key navigation through the chart                       | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Node selection (`aria-selected`)                             | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Collapse / expand subtrees                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Custom node content template                                 | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no OrganizationChart component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **`role=tree` / `role=treeitem` semantics**: The chart container uses `role=tree` and each node uses `role=treeitem`, enabling screen readers to navigate the organisational hierarchy using tree keyboard shortcuts. PrimeNG renders OrganizationChart as nested `<div>` and `<table>` elements with no ARIA tree semantics — the hierarchy is entirely visual and opaque to assistive technology.
- **Full tree keyboard pattern**: Arrow keys expand/collapse subtrees and move focus between nodes; `aria-expanded` communicates whether a node's children are visible; `aria-level`, `aria-setsize`, and `aria-posinset` communicate each node's depth and sibling position. PrimeNG does not implement any keyboard navigation on its OrganizationChart.
- **`aria-level` / `aria-setsize` / `aria-posinset`**: Screen readers can announce "Level 2, item 3 of 5, Marketing Manager" as the user navigates between peers at the same level — context that is unavailable in PrimeNG's implementation.

#### Reference URLs
- Angular Material: https://material.angular.io — no OrganizationChart component
- PrimeNG: https://primeng.org/organizationchart
- Radix UI: N/A — no OrgChart primitive
- Ark UI: N/A — no OrgChart primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ (OrgChart follows the tree view pattern)

---

### Image

Image is a media component with lazy loading, preview lightbox (zoom / pan), error fallback, and responsive `srcset` support.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `alt` text pass-through | ✅ | ✅ | ✅ | ✅ | ✅ |
| Decorative mode (`alt=""` + `role=presentation`) | ✅ | ⚠️ manual only | ✅ | ✅ | ✅ |
| Preview lightbox with `role=dialog` + `aria-label` | ❌ | ⚠️ no `role=dialog` | ❌ | ❌ | ✅ |
| Lightbox focus trap + Escape to close | ❌ | ⚠️ no focus trap | ❌ | ❌ | ✅ |
| Zoom controls with `aria-label` | ❌ | ❌ | ❌ | ❌ | ✅ |
| Error fallback `aria-label` for broken images | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `loading=lazy` with `IntersectionObserver` fallback | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — alt text, decorative mode, lightbox dialog semantics, focus trap, zoom labels, and error fallback all implemented.

#### Differentiators

- **Preview lightbox as `role=dialog` with focus trap**: PrimeNG Image opens a preview overlay with no `role=dialog` and no focus containment — keyboard users can Tab through the entire page behind the preview. The lightbox sets `role=dialog` + `aria-modal=true` and constrains Tab focus, matching the modal dialog interaction model.
- **Error fallback `aria-label` for broken images**: When the image fails to load and a fallback slot is rendered, the fallback container receives `aria-label="Image unavailable: {alt}"` — so screen reader users who would have received the alt text still get equivalent information from the error state.
- **Zoom controls with descriptive `aria-label`**: Zoom-in, zoom-out, and reset buttons carry `aria-label="Zoom in"` / `"Zoom out"` / `"Reset zoom"` rather than icon-only content, ensuring users navigating the lightbox by Tab have readable button labels for all controls.

#### Reference URLs
- Angular Material: N/A — no Image component
- PrimeNG: https://primeng.org/image
- Radix UI: N/A — no Image primitive (Next.js `<Image>` is a separate concern)
- Ark UI: N/A — no Image primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (preview lightbox follows the modal dialog pattern)

---

### ImageCompare

ImageCompare renders a before/after image slider that lets users drag a divider to reveal each image, implementing the `slider` ARIA role on the drag handle.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=slider` on drag handle | ❌ | ❌ | ❌ | ❌ | ✅ |
| `aria-valuemin` / `aria-valuemax` / `aria-valuenow` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `aria-valuetext` with percentage description | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `aria-label` on drag handle | ❌ | ❌ | ❌ | ❌ | ✅ |
| Left / Right arrow key moves handle | ❌ | ❌ | ❌ | ❌ | ✅ |
| Home / End jumps to 0% / 100% | ❌ | ❌ | ❌ | ❌ | ✅ |
| Before / after images `alt` text wired | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<number>()` for position | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — slider role with full keyboard contract, `aria-valuetext`, and image alt text all implemented. No reference library has a native ImageCompare component.

#### Differentiators

- **`role=slider` on the drag handle — uniquely complete**: No reference library (Angular Material, PrimeNG, Radix UI, Ark UI) ships an ImageCompare component. ui-lib-custom implements the drag handle as a proper ARIA slider: `role=slider`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow` updated on drag, and Left / Right / Home / End keyboard support — giving screen reader and keyboard-only users a fully operable control.
- **`aria-valuetext` with human-readable percentage**: `aria-valuetext="42% revealed"` supplements the raw numeric `aria-valuenow`, so VoiceOver / NVDA reads "42% revealed" rather than just "42" — giving users a meaningful description of the visible state without needing to interpret a unitless number.
- **Both image `alt` attributes are wired as inputs**: The `beforeAlt` and `afterAlt` inputs flow directly to the respective `<img alt>` attributes, so screen readers announce both images as the user interacts with the slider — ensuring the comparison context is accessible even when drag interaction is not possible.

#### Reference URLs
- Angular Material: N/A — no ImageCompare component
- PrimeNG: N/A — no ImageCompare component
- Radix UI: N/A — no ImageCompare primitive
- Ark UI: N/A — no ImageCompare primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/ (drag handle follows the slider pattern)

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

### Alert

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| `role=alert` for error / danger severity                     | ⚠️ no Alert component | ⚠️ Messages uses `role=alert` for all | N/A | ✅ | 🚀 |
| `role=status` for info / success / warning                   | ⚠️               | ❌ uses `role=alert` for all severities | N/A | ✅ | 🚀 |
| Severity variants (success / info / warning / error)         | ❌                | ✅ as Messages   | N/A      | ✅      | ✅                 |
| Dismissible variant with accessible close button             | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Close button `aria-label` includes alert content summary     | ❌                | ⚠️      | N/A      | ✅      | 🚀                |
| Icon `aria-hidden` when severity icon is decorative          | ❌                | ⚠️      | N/A      | ✅      | ✅                 |
| Custom content via content projection                        | ❌                | ✅       | N/A      | ✅      | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | ❌        | ❌      | 🚀                |

#### Gaps
_None — Angular Material has no inline Alert component; PrimeNG's Messages is the reference and all its features are matched._

#### Differentiators
- **Urgency-correct live region role**: Error/danger alerts use `role=alert` (assertive — interrupts the screen reader immediately) while info/success/warning alerts use `role=status` (polite — waits for the current utterance to finish). PrimeNG's Messages component applies `role=alert` to all severity levels regardless of urgency, unnecessarily interrupting users with low-priority notifications.
- **Close button `aria-label` with content context**: The dismiss button's `aria-label` includes a summary of the alert it closes (e.g., "Dismiss: File saved successfully"), allowing screen reader users to identify which notification they are dismissing without reading the full content first. PrimeNG's close button has a generic label.
- **Signal-native API**: Severity and visibility bound via `input()` signals — composable with form validation state `computed()` signals for reactive inline feedback patterns.

#### Reference URLs
- Angular Material: https://material.angular.io — no inline Alert component (uses Snackbar for notifications)
- PrimeNG: https://primeng.org/messages (PrimeNG calls this component "Messages")
- Radix UI: N/A — no Alert primitive
- Ark UI: N/A — no dedicated Alert component
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/ (Alert pattern — `role=alert` for assertive, `role=status` for polite)

---

### Badge

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Numeric count overlay on host element                        | ✅ MatBadge      | ✅       | N/A      | N/A    | ✅                 |
| Dot indicator variant (no count)                             | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Positioning variants (top-right / top-left / etc.)           | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Host element `aria-label` supplemented with badge value      | ⚠️               | ❌       | N/A      | N/A    | 🚀                |
| Badge element `aria-hidden` (value surfaced via host label)  | ⚠️               | ❌       | N/A      | N/A    | 🚀                |
| `ariaLabel` input for custom screen-reader text              | ✅                | ❌       | N/A      | N/A    | ✅                 |
| Severity / colour variants                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Hidden when value is zero or null                            | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Host element `aria-label` supplemented with badge value**: The badge directive updates the host element's accessible name to include the badge count (e.g., a button labelled "Notifications" becomes "Notifications, 5 unread"). Screen readers announce the count as part of the element they are already reading, without requiring the user to navigate to a separate badge element. PrimeNG's Badge does not modify the host's `aria-label`.
- **Badge `aria-hidden`**: The visible badge number element is `aria-hidden="true"` — the count is conveyed through the host label rather than as a separate announced number, avoiding duplicate announcements (e.g., "Notifications button, 5 — Notifications, 5 unread"). PrimeNG does not hide the badge element from AT.
- **Signal-native API**: Badge value bound via `input<number | string>()` — composes directly with signal-based notification count selectors.

#### Reference URLs
- Angular Material: https://material.angular.io/components/badge/overview
- PrimeNG: https://primeng.org/badge
- Radix UI: N/A — no Badge primitive
- Ark UI: N/A — no Badge primitive
- APG Pattern: N/A — Badge is a display overlay; host-element `aria-label` pattern applies

---

### Tag

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Inline label chip / tag display                              | ✅ mat-chip      | ✅       | N/A      | N/A    | ✅                 |
| Severity / colour variants                                   | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Rounded / square shape variants                              | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Icon support                                                 | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Dismissible variant with remove button                       | ✅                | ✅       | N/A      | N/A    | ✅                 |
| Remove button `aria-label` includes the tag text             | ⚠️               | ❌       | N/A      | N/A    | 🚀                |
| Icon `aria-hidden` when decorative                           | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| `value` input for `aria-label` override                      | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Remove button `aria-label` includes the tag text**: The dismiss button's label is automatically computed as "Remove [tag label]" (e.g., "Remove Angular"). Screen reader users can identify which tag they are about to delete without first reading the tag label separately. PrimeNG's Tag remove button has no accessible name; Angular Material's chip close button uses a generic "Remove chip" label without the chip's text.
- **`ariaLabel` override input**: An `ariaLabel` input allows the consumer to replace the default accessible name entirely for cases where the visual text is abbreviated or needs supplementary context.
- **Signal-native API**: Tag value bound via `input<string>()` — the label composes with `computed()` signals that derive tag text from data models without zone triggers.

#### Reference URLs
- Angular Material: https://material.angular.io/components/chips/overview
- PrimeNG: https://primeng.org/tag
- Radix UI: N/A — no Tag primitive
- Ark UI: N/A — no Tag primitive (Ark's TagsInput is an input control, not a display component)
- APG Pattern: N/A — display-only tag; remove button follows the button pattern

---

### Chip

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Inline label + optional image / icon                         | ✅ mat-chip      | ✅       | N/A      | N/A    | ✅                 |
| Selectable / toggle mode (`aria-pressed` or `aria-selected`) | ✅                | ⚠️      | N/A      | N/A    | 🚀                |
| Chip group with `role=group` + `aria-label`                  | ✅                | ❌       | N/A      | N/A    | 🚀                |
| Removable variant — remove button `aria-label` with chip name | ✅ partial       | ⚠️      | N/A      | N/A    | 🚀                |
| Image `alt` text propagated to chip accessible name          | ⚠️               | ⚠️      | N/A      | N/A    | ✅                 |
| Disabled state with `aria-disabled`                          | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Icon `aria-hidden` when decorative                           | ✅                | ⚠️      | N/A      | N/A    | ✅                 |
| Signal-native API (`model()` for selected state)             | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — all ❌ reference rows are matched or consciously excluded._

#### Differentiators
- **Selectable chip with correct ARIA**: In selectable mode each chip uses `aria-pressed` (toggle button semantics) or `aria-selected` (within a listbox group), depending on whether the selection is independent or mutually exclusive. PrimeNG's Chip component does not implement a selection role — it has no toggle or selected state semantics at all.
- **Chip group with `role=group` + `aria-label`**: When chips are placed inside a `ui-lib-chip-group`, the container receives `role=group` and the consumer-supplied `ariaLabel`, giving screen readers a named context (e.g., "Selected filters, group"). PrimeNG has no chip group component.
- **Remove button `aria-label` with chip name**: The remove button's label is computed as "Remove [chip label]" (e.g., "Remove JavaScript"), allowing screen readers to identify what will be deleted without first reading the chip's content.

#### Reference URLs
- Angular Material: https://material.angular.io/components/chips/overview
- PrimeNG: https://primeng.org/chip
- Radix UI: N/A — no Chip primitive
- Ark UI: N/A — no Chip primitive (Ark's TagsInput manages editable tags)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (toggle button for selectable chips)

---

### Skeleton

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Loading placeholder animation                                | ❌ (no Skeleton) | ✅       | N/A      | N/A    | ✅                 |
| Container `aria-busy=true` while skeleton is shown           | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Container `aria-label="Loading..."` during skeleton state    | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Skeleton elements `aria-hidden="true"`                       | ❌                | ⚠️      | N/A      | N/A    | ✅                 |
| `aria-live=polite` announces when real content loads         | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `prefers-reduced-motion` — pulse animation disabled          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Shape variants (rectangle / circle / text line)              | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Configurable width / height                                  | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no Skeleton component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **Container `aria-busy=true` + `aria-label="Loading..."`**: The wrapping container receives `aria-busy="true"` while skeleton content is shown and `aria-label="Loading"`, following the ARIA pattern for communicating to screen readers that the region is loading. PrimeNG renders skeleton shapes with no loading state semantics — the page appears fully loaded to assistive technology while skeletons are visible.
- **Skeleton elements `aria-hidden`**: Individual skeleton shape elements are `aria-hidden="true"` so screen readers do not attempt to describe the placeholder rectangles or circles. The accessible state is communicated entirely through the container's `aria-busy` and `aria-label`.
- **`aria-live=polite` on content reveal**: When the skeleton is replaced by real content, the container transitions `aria-busy` to false, triggering screen reader re-announcement. An optional `loadedLabel` input provides a polite announcement (e.g., "Content loaded") when the skeleton disappears.
- **`prefers-reduced-motion`**: The pulsing shimmer animation is disabled entirely when `prefers-reduced-motion: reduce` is active. PrimeNG does not apply this guard to its skeleton animation.

#### Reference URLs
- Angular Material: https://material.angular.io — no Skeleton component
- PrimeNG: https://primeng.org/skeleton
- Radix UI: N/A — no Skeleton primitive
- Ark UI: N/A — no Skeleton primitive
- APG Pattern: N/A — `aria-busy` on the container follows ARIA loading state conventions; no dedicated APG pattern

---

### MeterGroup

| Feature / Behaviour                                          | Angular Material | PrimeNG | Radix UI | Ark UI | **ui-lib-custom** |
|--------------------------------------------------------------|------------------|---------|----------|--------|-------------------|
| Multiple named segments in one visual bar                    | ❌ (no MeterGroup) | ✅     | N/A      | N/A    | ✅                 |
| `role=meter` per named segment                               | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-label` per segment (segment name)                      | ❌                | ❌       | N/A      | N/A    | 🚀                |
| `aria-valuenow` / `aria-valuemin` / `aria-valuemax` per segment | ❌             | ❌       | N/A      | N/A    | 🚀                |
| `aria-valuetext` with human-readable segment description     | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Total / overflow segment with its own `aria-label`           | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Custom label template per segment                            | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Stacked + separate display modes                             | ❌                | ✅       | N/A      | N/A    | ✅                 |
| Signal-native API                                            | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Zoneless compatible                                          | ❌                | ❌       | N/A      | N/A    | 🚀                |
| Three runtime visual variants                                | ❌                | ❌       | N/A      | N/A    | 🚀                |

#### Gaps
_None — Angular Material has no MeterGroup component; PrimeNG is the only reference and all its features are matched._

#### Differentiators
- **`role=meter` per segment**: Each named segment renders as a `role=meter` element with its own `aria-label`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`, allowing screen readers to navigate and announce each segment independently (e.g., "Downloads: 45 of 100"). PrimeNG renders all segments as plain `<div>` elements with no ARIA meter semantics — the multi-segment breakdown is completely invisible to assistive technology.
- **`aria-valuetext` per segment**: Each meter's `aria-valuetext` is computed from the segment's label and value (e.g., "Downloads, 45%"), giving a human-readable description rather than a raw number.
- **Total segment with `aria-label`**: When segments collectively exceed 100%, or when a total summary row is displayed, it receives its own `aria-label` (e.g., "Total used: 87 of 100") — a context that PrimeNG does not expose to AT.

#### Reference URLs
- Angular Material: https://material.angular.io — no MeterGroup component
- PrimeNG: https://primeng.org/metergroup
- Radix UI: N/A — no MeterGroup primitive
- Ark UI: N/A — no MeterGroup primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/ (each segment follows the ARIA meter pattern)

---

### Message

Message is an inline status widget for contextual feedback (success, info, warn, error) with optional dismissal — displayed inline with content rather than as a floating toast.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Severity-mapped live-region role (`alert` vs `status`) | ⚠️ (always `role=alert`) | ⚠️ (always `role=alert`) | ⚠️ (always `role=alert`) | ⚠️ (always `role=alert`) | ✅ |
| `aria-atomic=true` on live region | ❌ | ❌ | ✅ | ✅ | ✅ |
| Icon marked `aria-hidden` | ❌ | ⚠️ partial | ✅ | ✅ | ✅ |
| Dismiss button `aria-label` includes message title | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Conditional rendering with `@if` (no hidden DOM) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `severity` + `closable` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — severity-mapped live region roles and dismiss ARIA all implemented.

#### Differentiators

- **Severity-mapped live region role**: `error` severity uses `role=alert` (assertive), while `info`, `success`, and `warning` use `role=status` (polite). Every reference library applies `role=alert` to all severities, interrupting screen reader users on benign informational messages — the APG distinguishes these roles explicitly.
- **Dismiss button label includes message summary**: The close button carries `aria-label="Dismiss: {title}"` (e.g., "Dismiss: File saved successfully"), so screen reader users in virtual cursor mode know exactly which message they are about to close without navigating back to read the content.
- **`aria-atomic=true` on the live region**: The message container sets `aria-atomic=true` so assistive technology reads the full title + description as a single announcement on appearance, rather than announcing partial text updates as the DOM renders, preventing fragmented announcements on slow connections.

#### Reference URLs
- Angular Material: N/A — no standalone Message component (Snackbar used for similar needs)
- PrimeNG: https://primeng.org/message
- Radix UI: https://www.radix-ui.com/primitives/docs/components/callout (closest equivalent)
- Ark UI: N/A — no Message primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/ (alert + status live region roles)

---

### BlockUI

BlockUI overlays a loading mask over a target container or the full page, communicating the blocked state to assistive technology via `aria-busy`.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-busy=true` on target container during block | ❌ | ✅ | ❌ | ❌ | ✅ |
| `aria-label` on the overlay element | ❌ | ❌ | ❌ | ❌ | ✅ |
| Focus trapped inside overlay in full-page mode | ❌ | ❌ | ❌ | ❌ | ✅ |
| `aria-live` announcement when block starts / clears | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `prefers-reduced-motion` on spinner overlay | ❌ | ❌ | ❌ | ❌ | ✅ |
| Scoped block (target element) + full-page mode | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `blocked` input | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-busy`, `aria-label`, focus trap, live announcement, and reduced-motion all implemented.

#### Differentiators

- **`aria-live` announcement when block starts and clears**: When blocking begins, an `aria-live=polite` region announces "Loading" (or a consumer-supplied message); when it clears, it announces "Ready" — giving screen reader users explicit state transitions rather than relying on them to notice `aria-busy` changes. PrimeNG provides no such announcement.
- **`aria-label` on the overlay element**: The mask layer carries `aria-label="Loading, please wait"` (configurable) so that if focus lands on or near the overlay, assistive technology has a readable label rather than encountering a silent fullscreen element.
- **Focus trap in full-page mode**: When BlockUI covers the entire viewport, a `FocusTrap` directive constrains Tab navigation within the overlay, preventing users from interacting with blocked content below — matching the focus-containment behaviour of a modal dialog for full-page blocking scenarios.

#### Reference URLs
- Angular Material: N/A — no BlockUI component (CDK overlay used manually)
- PrimeNG: https://primeng.org/blockui
- Radix UI: N/A — no BlockUI primitive
- Ark UI: N/A — no BlockUI primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (full-page BlockUI follows focus-trap rules of a modal dialog)

---

## Layout & Containers

---

### Divider

Divider renders a horizontal or vertical separator line between content sections, implementing the WAI-ARIA `separator` role with correct orientation.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=separator` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-orientation` (horizontal / vertical) | ✅ | ⚠️ missing on vertical | ✅ | ✅ | ✅ |
| Content label via `aria-label` (labelled divider) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Decorative mode (`role=presentation`) | ❌ | ❌ | ✅ | ✅ | ✅ |
| Dashed / dotted / solid style input | ❌ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `layout` + `type` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `role=separator`, `aria-orientation`, labelled mode, and decorative mode all implemented.

#### Differentiators

- **`aria-orientation` always present on vertical dividers**: PrimeNG omits `aria-orientation` when the divider is rendered vertically — screen readers default to "horizontal" when the attribute is absent, misreporting the separator's orientation. The library writes `aria-orientation` to match the `layout` input in all cases.
- **Content-labelled divider via `aria-label`**: When a divider carries text content (e.g., "or" between form actions), the `role=separator` element receives `aria-label` with that text, so assistive technology reads "separator, or" rather than just "separator" — providing the visual context in the accessible name.
- **Decorative mode via `role=presentation`**: When a divider is purely decorative, passing `decorative=true` sets `role=presentation` and removes the element from the accessibility tree entirely — preventing "separator" announcements that add noise without conveying meaning.

#### Reference URLs
- Angular Material: https://material.angular.io/components/divider
- PrimeNG: https://primeng.org/divider
- Radix UI: https://www.radix-ui.com/primitives/docs/components/separator
- Ark UI: N/A — no Separator primitive (HTML `<hr>` recommended)
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/separator/ (separator role + orientation)

---

### Panel

Panel is a collapsible content container with a header, optional toolbar actions, and animated expand / collapse transitions.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=region` + `aria-labelledby` on content | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toggle button `aria-expanded` + `aria-controls` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Configurable heading level (no hard-coded `<h3>`) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `@defer` on panel body until first expand | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Enter / exit animation using `--uilib-*` tokens | ❌ | ⚠️ CSS only, no token | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on expand animation | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<boolean>()` collapsed state | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — region landmark, toggle ARIA, heading level input, `@defer`, and motion all implemented.

#### Differentiators

- **Configurable heading level with no hard-coded `<h3>`**: PrimeNG Panel hard-codes an `<h5>` header element regardless of context, breaking the document outline when panels appear under lower headings. The `headingLevel` input defaults to `3` but accepts any value, so consumer applications own the heading hierarchy.
- **`@defer` on panel body until first expand**: The panel body template is wrapped in `@defer (on interaction)` so its DOM — including any child components — is not created until the panel is first opened, eliminating the hidden-but-rendered cost of collapsed panels in dense dashboards.
- **`prefers-reduced-motion` on expand / collapse**: The height animation uses a CSS transition gated on `@media (prefers-reduced-motion: no-preference)`, providing an instant expand / collapse for users with vestibular sensitivities while keeping the polished animation for all others.

#### Reference URLs
- Angular Material: https://material.angular.io/components/expansion (Expansion Panel)
- PrimeNG: https://primeng.org/panel
- Radix UI: https://www.radix-ui.com/primitives/docs/components/collapsible
- Ark UI: https://ark-ui.com/react/docs/components/collapsible
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ (collapsible section pattern)

---

### ScrollPanel

ScrollPanel is a custom scrollable container that replaces native browser scrollbars with styled, accessible scroll controls.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Custom scrollbar styling | ❌ | ✅ | ❌ | ❌ | ✅ |
| Keyboard scrolling (Arrow / Page / Home / End) | ✅ | ⚠️ partial | ❌ | ❌ | ✅ |
| `aria-label` on scrollable region | ❌ | ❌ | ❌ | ❌ | ✅ |
| `role=scrollbar` + `aria-valuenow` on track | ❌ | ❌ | ❌ | ❌ | ✅ |
| Scrollbar `aria-controls` → content region | ❌ | ❌ | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on scroll-snap animations | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native scroll position `model<number>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — scrollable region label, `role=scrollbar` semantics, `aria-controls`, and keyboard scrolling all implemented.

#### Differentiators

- **`role=scrollbar` + `aria-valuenow` / `aria-valuemin` / `aria-valuemax` + `aria-controls`**: PrimeNG ScrollPanel renders custom scrollbar thumbs as plain `<div>` elements with no ARIA. The library promotes each thumb to `role=scrollbar` and keeps `aria-valuenow` updated as the user scrolls, with `aria-controls` pointing to the scrollable content region — matching the APG scrollbar pattern.
- **`aria-label` on the scrollable region**: The scroll container itself carries a configurable `aria-label` (e.g., "Product list") so screen reader users navigating by landmark / regions can identify and jump to the scrollable area without needing to read surrounding headings.
- **Full keyboard scrolling**: Arrow keys scroll line by line, Page Up / Down scroll by viewport height, and Home / End jump to the start / end of the content — implemented via `keydown` listeners on the focusable container rather than relying on native browser scroll behaviour, which custom scrollbar CSS often disrupts.

#### Reference URLs
- Angular Material: N/A — no ScrollPanel component (CDK ScrollingModule used instead)
- PrimeNG: https://primeng.org/scrollpanel
- Radix UI: https://www.radix-ui.com/primitives/docs/components/scroll-area
- Ark UI: N/A — no ScrollPanel primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/ (scrollbar thumb follows slider semantics)

---

### Fieldset

Fieldset is a collapsible container that groups related form fields using native `<fieldset>` / `<legend>` semantics.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Native `<fieldset>` + `<legend>` elements | ❌ | ✅ | ❌ | ❌ | ✅ |
| Toggle button `aria-expanded` + `aria-controls` | ❌ | ✅ | ✅ | ✅ | ✅ |
| Configurable heading level for legend label | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `@defer` on collapsed content | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `prefers-reduced-motion` on toggle animation | ❌ | ❌ | ❌ | ❌ | ✅ |
| `disabled` propagates to all child form controls | ✅ | ✅ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `model<boolean>()` collapsed state | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — native fieldset semantics, toggle ARIA, deferred content, and disabled propagation all implemented.

#### Differentiators

- **Native `<fieldset>` + `<legend>` semantics**: Radix UI and Ark UI compose Fieldset from generic `<div>` elements — meaning assistive technology does not receive the native grouping semantics that `<fieldset>` provides. Screen readers using Forms mode announce "group" when entering a `<fieldset>`, and radio / checkbox groups inside are announced as belonging to the legend label.
- **Configurable heading level for the legend**: When a Fieldset title also needs to act as a document heading, the `legendHeadingLevel` input wraps the legend text in the appropriate `<h2>`–`<h6>` element — preventing the hard-coded heading hierarchy that PrimeNG imposes and maintaining a correct document outline.
- **`disabled` propagates to all child form controls**: Setting `disabled=true` on the Fieldset calls `setDisabledState` on every child `ControlValueAccessor`, `aria-disabled` on every focusable child, and the native `disabled` attribute on the `<fieldset>` element — satisfying WCAG SC 4.1.2 without requiring consumers to manage disabled state on every field individually.

#### Reference URLs
- Angular Material: N/A — no Fieldset component
- PrimeNG: https://primeng.org/fieldset
- Radix UI: N/A — no Fieldset primitive
- Ark UI: N/A — no Fieldset primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ (collapsible fieldset follows the disclosure / accordion pattern)

---

### Toolbar

Toolbar is a horizontal or vertical container for action controls (buttons, dropdowns, separators) following the WAI-ARIA `toolbar` role and keyboard navigation model.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=toolbar` on container | ✅ | ✅ | ✅ | ✅ | ✅ |
| `aria-label` on toolbar | ✅ | ✅ | ✅ | ✅ | ✅ |
| Arrow-key navigation between controls | ✅ | ❌ | ✅ | ✅ | ✅ |
| Single Tab stop for the entire toolbar | ✅ | ❌ | ✅ | ✅ | ✅ |
| `role=separator` between groups | ✅ | ⚠️ visual only | ✅ | ✅ | ✅ |
| `aria-orientation` (horizontal / vertical) | ✅ | ❌ | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native projected content model | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `role=toolbar`, arrow-key roving `tabindex`, `aria-label`, `aria-orientation`, and separator semantics all implemented.

#### Differentiators

- **Roving `tabindex` arrow-key navigation — one Tab stop**: PrimeNG Toolbar places each child control in the natural Tab order, meaning a toolbar with 10 buttons requires 10 Tab presses to traverse. The library implements the APG roving `tabindex` model — the toolbar is a single Tab stop and arrow keys move focus within it — matching screen reader and power-user expectations.
- **`aria-orientation` always set**: PrimeNG omits `aria-orientation`, which defaults to "horizontal" in most screen readers — incorrect for vertical toolbars. The library always writes `aria-orientation` matching the `orientation` input so assistive technology knows which arrow-key axis to use.
- **`role=separator` on dividers between groups**: PrimeNG uses visual `<span>` dividers with no role. Group separators carry `role=separator` so screen readers announce "separator" when focus moves past a group boundary — aiding orientation within complex toolbars.

#### Reference URLs
- Angular Material: https://material.angular.io/components/toolbar
- PrimeNG: https://primeng.org/toolbar
- Radix UI: https://www.radix-ui.com/primitives/docs/components/toolbar
- Ark UI: N/A — no Toolbar primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ (toolbar role + roving tabindex)

---

### Card

Card is a surface container for grouped content — header, body, and footer — that can act as a landmark region or a list item depending on context.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=region` + `aria-labelledby` when titled | ✅ | ⚠️ (no `aria-labelledby`) | ✅ | ✅ | ✅ |
| `role=article` in list / feed context | ❌ | ❌ | ❌ | ❌ | ✅ |
| Configurable heading level for card title | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Actionable card — single Tab stop with `role=link` / `role=button` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on hover elevation transition | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `headingLevel` + `actionable` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — region / article semantics, heading level input, actionable card pattern, and hover motion all implemented.

#### Differentiators

- **`role=article` in list context**: When multiple cards are rendered inside a `role=feed` or `role=list`, each card switches to `role=article` so screen readers announce "article N of M" — giving users orientation within a card collection. PrimeNG Card is always a `<div>` with no semantic role.
- **Configurable heading level**: The `headingLevel` input (default `3`) controls the heading element that wraps the card title, ensuring the document heading hierarchy is never broken by card insertion depth — a detail absent from every reference library.
- **Actionable card — single Tab stop**: When `actionable=true`, the entire card surface becomes a single focusable element with `role=button` or `role=link`, preventing the anti-pattern of keyboard users having to Tab through an entire card's content to reach the "View details" button at the bottom.

#### Reference URLs
- Angular Material: https://material.angular.io/components/card
- PrimeNG: https://primeng.org/card
- Radix UI: https://www.radix-ui.com/primitives/docs/components/card
- Ark UI: N/A — no Card primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/feed/ (card collections follow the feed pattern)

---

### Stack

Stack is a one-dimensional layout component that applies uniform spacing between children, configurable as row or column, with no landmark pollution.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| No landmark or ARIA role added by default | ✅ | ✅ | ✅ | ✅ | ✅ |
| `as` input controls rendered HTML element | ❌ | ❌ | ✅ | ✅ | ✅ |
| `as=nav` + `aria-label` for nav stacks | ❌ | ❌ | ❌ | ❌ | ✅ |
| Renders `<ul>` + `<li>` when `as=list` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Spacing from `--uilib-spacing-*` tokens only | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | N/A | N/A | N/A | N/A | 🚀 |
| Signals-native `direction`, `gap`, `as` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — semantic `as` input, list rendering, and token-only spacing all implemented.

#### Differentiators

- **Semantic `as` input with automatic ARIA**: Setting `as="nav"` renders `<nav>` and requires an `ariaLabel` input (dev-mode warning if absent). Setting `as="list"` renders `<ul>` with each child projected into `<li>` — ensuring the DOM structure is correct for screen reader list navigation without any consumer boilerplate.
- **No landmark pollution by default**: The default `as="div"` emits no role — preventing the accidental landmark accumulation that occurs when layout components introduce spurious `role=region` or `role=group` wrappers around every spacing container.
- **All spacing uses `--uilib-spacing-*` tokens**: The `gap` input is mapped to a CSS custom property from the spacing scale (`--uilib-spacing-2`, `--uilib-spacing-4`, etc.) — ensuring spacing is coherent with the rest of the design system and overridable at the theme level without raw pixel values in templates.

#### Reference URLs
- Angular Material: N/A — no Stack component (Flex Layout deprecated)
- PrimeNG: N/A — no Stack component
- Radix UI: N/A — no Stack primitive
- Ark UI: N/A — no Stack primitive
- APG Pattern: N/A — Stack is a layout utility; no ARIA pattern applies when used as a plain `<div>`

---

### Inline

Inline is a flex-row layout component for horizontal sequences of elements — wrapping, aligned, and spaced from design tokens. It is the horizontal complement to Stack.

#### Feature / Behaviour Parity

| Feature / Behaviour                                    | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|--------------------------------------------------------|------------------|---------|----------|--------|---------------|
| No landmark or ARIA role added by default              | ✅                | ✅       | ✅        | ✅      | ✅             |
| Wrapping control (`wrap` / `nowrap`)                   | ✅ (Flex Layout)  | ❌       | ✅        | ✅      | ✅             |
| Alignment along cross-axis (`alignItems`)              | ✅ (Flex Layout)  | ❌       | ✅        | ✅      | ✅             |
| Justification along main-axis (`justifyContent`)       | ✅ (Flex Layout)  | ❌       | ✅        | ✅      | ✅             |
| `as` input for semantic HTML element                   | ❌                | ❌       | ✅        | ✅      | ✅             |
| Spacing exclusively from `--uilib-spacing-*` tokens    | ❌                | ❌       | ❌        | ❌      | ✅             |
| Reading-order preserved (no CSS `order` reordering)    | ⚠️               | N/A     | ✅        | ✅      | ✅             |
| Signal-native `gap`, `wrap`, `align`, `as` inputs      | ❌                | ❌       | ❌        | ❌      | 🚀             |

#### Gaps

None — wrapping, alignment, justification, token-only spacing, and reading-order guarantee all implemented.

#### Differentiators

- **Reading-order guarantee**: Inline never uses CSS `order` to rearrange children. The visual left-to-right sequence always matches the DOM order, satisfying WCAG SC 1.3.2 (Meaningful Sequence) by construction. This is the same guarantee as Stack's column direction.
- **Token-only gap**: The `gap` input maps to the `--uilib-spacing-*` scale — the same tokens used by Stack and Grid — so horizontal spacing in an Inline row is always harmonically related to the vertical spacing in a Stack column.
- **Signal-native inputs with automatic RTL**: The `align` and `justify` inputs accept logical values (`start` / `end`) rather than physical `left` / `right`, so Inline layouts automatically mirror in RTL languages when the document direction is `rtl`.

#### Reference URLs

- Angular Material: N/A — no Inline component (Flex Layout deprecated)
- PrimeNG: N/A — no Inline component
- Radix UI: N/A — no Inline primitive
- Ark UI: N/A — no Inline primitive
- APG Pattern: N/A — Inline is a layout utility; WCAG SC 1.3.2 and 1.4.10 govern sequence and reflow

---

### Grid

Grid is a CSS Grid layout component with configurable columns, responsive breakpoints, and DOM-order / visual-order alignment constraints.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| No landmark or ARIA role added by default | ✅ | ✅ | ✅ | ✅ | ✅ |
| DOM order matches visual order (no CSS reordering) | ✅ | ⚠️ (offset classes can reorder) | ✅ | ✅ | ✅ |
| `as` input controls rendered HTML element | ❌ | ❌ | ✅ | ✅ | ✅ |
| Responsive columns without overflow clipping | ✅ | ✅ | ✅ | ✅ | ✅ |
| WCAG 1.3.2 advisory — no visual-only sequence | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| Spacing from `--uilib-spacing-*` tokens only | ❌ | ❌ | ❌ | ❌ | ✅ |
| Signals-native `columns`, `gap`, `as` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — DOM/visual order alignment, token-only gap, and semantic `as` input all implemented.

#### Differentiators

- **DOM order always matches visual order**: The library's responsive column system uses `grid-template-columns` with `auto-fill` and media-query breakpoints — never CSS `order` property or absolute positioning. This ensures WCAG SC 1.3.2 (Meaningful Sequence) compliance by default, whereas PrimeNG's offset columns can create a visual sequence that diverges from the DOM order.
- **Token-only gap**: Column and row gaps are mapped from the `--uilib-spacing-*` scale, aligning grid whitespace with the rest of the design system and preventing ad-hoc pixel values from accumulating in consumer templates.
- **`as` input with semantic promotion**: Like Stack, `as="main"` or `as="section"` promotes the grid wrapper to the appropriate HTML landmark — allowing page-level layout grids to serve dual duty as the `<main>` or `<section>` element without wrapping duplication.

#### Reference URLs
- Angular Material: N/A — no Grid component (deprecated Flex Layout)
- PrimeNG: https://primeng.org/grid (utility CSS classes only)
- Radix UI: N/A — no Grid primitive
- Ark UI: N/A — no Grid primitive
- APG Pattern: N/A — Grid is a layout utility; WCAG SC 1.3.2 governs meaningful sequence

---

### Container

Container is a max-width centering wrapper that constrains content width for readability and integrates with skip-link target semantics.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| No role added by default | ✅ | ✅ | ✅ | ✅ | ✅ |
| Skip-link `id` target compatibility | ❌ | ❌ | ❌ | ❌ | ✅ |
| `as` input for semantic element | ❌ | ❌ | ✅ | ✅ | ✅ |
| Max-width from `--uilib-*` token (not hard-coded px) | ❌ | ❌ | ❌ | ❌ | ✅ |
| No overflow clipping that traps focus indicators | ✅ | ⚠️ (overflow-x: hidden sometimes applied) | ✅ | ✅ | ✅ |
| Three visual variants (material / bootstrap / minimal) | N/A | N/A | N/A | N/A | 🚀 |
| Signals-native `maxWidth`, `as` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — skip-link compatibility, token-based max-width, and no-clip guarantee all implemented.

#### Differentiators

- **Skip-link `id` target compatibility**: When `skipTarget=true`, the Container registers its `id` with the page's `SkipLinkService` so the standard "Skip to main content" link can jump directly to it — without requiring consumers to manually add `id="main-content"` or `tabindex="-1"` to a wrapper element.
- **No overflow clipping that traps focus indicators**: `overflow: hidden` or `overflow: clip` on a container can cause keyboard focus rings on child elements to be clipped at the edge. The library never sets `overflow: hidden` on the Container itself — focus indicators always remain fully visible.
- **Max-width from `--uilib-container-max-width` token**: The `maxWidth` input maps to a predefined token scale (`sm / md / lg / xl / full`) rather than accepting arbitrary pixels, ensuring container widths are semantically named and consistent across the application.

#### Reference URLs
- Angular Material: N/A — no Container component
- PrimeNG: N/A — no Container component
- Radix UI: https://www.radix-ui.com/primitives/docs/components/container
- Ark UI: N/A — no Container primitive
- APG Pattern: N/A — Container is a layout utility; WCAG SC 1.4.10 (Reflow) governs max-width behaviour

---

### Fluid

Fluid is a directive that forces its host element to reflow correctly at 400% browser zoom, satisfying WCAG SC 1.4.10 without horizontal scrolling.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| No horizontal scrollbar at 400% zoom (1280px → 320px) | ✅ | ⚠️ (component-dependent) | ✅ | ✅ | ✅ |
| `min-width: 0` on flex/grid children to prevent overflow | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| Fixed-size exceptions declared explicitly | ❌ | ❌ | ❌ | ❌ | ✅ |
| All widths expressed as `%` or `min()` — no raw `px` widths | ❌ | ❌ | ❌ | ❌ | ✅ |
| Works with all library components at 400% | ❌ | ⚠️ (known exceptions) | N/A | N/A | ✅ |
| Signals-native `exceptions` input | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — 400% reflow guarantee, explicit fixed-size exceptions, and no raw pixel widths all implemented.

#### Differentiators

- **All widths expressed as `%`, `min()`, or `clamp()` — never raw `px`**: The directive audits its host element's child components at dev-time and warns if any child uses a raw pixel width that would cause horizontal overflow at 400% zoom — providing an actionable warning rather than a silent WCAG failure.
- **Explicit fixed-size exceptions declared**: Components that legitimately cannot reflow (e.g., a fixed-width code block or a map embed) are passed via the `exceptions` input — generating a `data-fluid-exception` attribute and a comment in the accessibility report so reviewers know these elements are intentional exclusions rather than overlooked failures.
- **All library components tested at 400% zoom**: The library's CI pipeline runs Playwright viewport tests at `320px` width (equivalent to 1280px at 400%) against every component demo page, ensuring regressions are caught automatically — rather than relying on manual testing of individual components.

#### Reference URLs
- Angular Material: N/A — no Fluid directive (reflow handled per-component)
- PrimeNG: N/A — no Fluid directive
- Radix UI: N/A — no Fluid primitive
- Ark UI: N/A — no Fluid primitive
- APG Pattern: N/A — Fluid addresses WCAG SC 1.4.10 (Reflow) directly

---

## Utilities & Directives

---

### ScrollTop

ScrollTop is a button that appears when the user scrolls past a threshold and, when activated, smoothly scrolls the page or a target container back to the top.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-label` on scroll-to-top button | ❌ | ⚠️ icon-only, no label | ❌ | ❌ | ✅ |
| `aria-hidden` when not visible | ❌ | ❌ | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on scroll animation | ❌ | ❌ | ❌ | ❌ | ✅ |
| Visibility threshold as signal input | ❌ | ✅ | ❌ | ❌ | ✅ |
| Target container scroll (not only window) | ❌ | ✅ | ❌ | ❌ | ✅ |
| Focus returns to page top landmark on activation | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native visibility threshold input | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-label`, `aria-hidden` when off-screen, reduced-motion, and focus management on activation all implemented.

#### Differentiators

- **`aria-hidden` when not visible**: PrimeNG ScrollTop uses CSS to hide the button when below the scroll threshold but leaves it in the DOM without `aria-hidden`, so screen readers in non-visual browse mode can still Tab to an invisible button. The library toggles `aria-hidden=true` in sync with the visibility state, removing it from the accessibility tree when it is not actionable.
- **Focus moves to the page `<main>` landmark on activation**: After scrolling to the top, focus is placed on the nearest `role=main` landmark (or `<main>` element) — giving keyboard users a useful starting position at the top of the content without requiring them to Tab back up through the header and navigation.
- **`prefers-reduced-motion` replaces scroll animation with instant jump**: Users who have requested reduced motion receive an instant `scrollTop = 0` rather than a smooth animation, preventing vestibular discomfort from rapid viewport motion while preserving the functional outcome.

#### Reference URLs
- Angular Material: N/A — no ScrollTop component
- PrimeNG: https://primeng.org/scrolltop
- Radix UI: N/A — no ScrollTop primitive
- Ark UI: N/A — no ScrollTop primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (scroll-to-top follows the standard button pattern)

---

### Icon

Icon renders an SVG or icon-font glyph with a strict decorative-vs-informative ARIA contract — `aria-hidden` by default, informative mode with `aria-label`.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-hidden=true` by default (decorative) | ✅ | ⚠️ (inconsistent) | ✅ | ✅ | ✅ |
| Informative mode via `aria-label` | ✅ | ⚠️ (no input; must be hand-set) | ✅ | ✅ | ✅ |
| `role=img` in informative mode | ✅ | ❌ | ✅ | ✅ | ✅ |
| `focusable=false` on inline SVG | ✅ | ⚠️ (partial) | ✅ | ✅ | ✅ |
| Dev-mode warning when informative without `aria-label` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `name` + `ariaLabel` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — decorative default, informative `role=img` + `aria-label`, and SVG `focusable=false` all implemented.

#### Differentiators

- **Dev-mode warning when informative without `aria-label`**: When `decorative=false` is set but no `ariaLabel` is provided, the component emits a `console.warn` in development builds — catching the single most common icon accessibility mistake (an icon that is marked as meaningful but has no accessible name) before it reaches production.
- **`role=img` in informative mode**: PrimeNG icons carry no role attribute in any mode — setting an `aria-label` on a `<span>` without `role=img` produces unreliable announcement behaviour across screen readers. The library sets `role=img` when `decorative=false` so the icon is announced with a consistent "image" semantic across VoiceOver, NVDA, and JAWS.
- **`focusable=false` on inline SVG**: Internet Explorer and some older browsers make inline SVGs focusable by default. The library sets `focusable="false"` on every rendered SVG element, preventing phantom Tab stops in hybrid / legacy environments.

#### Reference URLs
- Angular Material: https://material.angular.io/components/icon
- PrimeNG: https://primeng.org/icons
- Radix UI: N/A — no Icon primitive (community: Radix Icons package)
- Ark UI: N/A — no Icon primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/img/ (informative image with `role=img`)

---

### IconButton

IconButton is a button that renders with an icon as its sole visible content — `aria-label` is mandatory and enforced to prevent unlabelled interactive controls.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-label` required — enforced at build / dev time | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Icon `aria-hidden` inside button | ✅ | ⚠️ (inconsistent) | ✅ | ✅ | ✅ |
| `aria-disabled` in sync with `disabled` input | ✅ | ⚠️ (`attr.disabled` only) | ✅ | ✅ | ✅ |
| Tooltip auto-wired as `aria-describedby` | ❌ | ❌ | ❌ | ❌ | 🚀 |
| `prefers-reduced-motion` on press ripple | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `ariaLabel` input | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — mandatory `aria-label`, icon `aria-hidden`, `aria-disabled` sync, and tooltip wiring all implemented.

#### Differentiators

- **`aria-label` enforced as required**: The `ariaLabel` input has no default value and a dev-mode `console.error` fires if it is omitted — making it impossible to accidentally ship an unlabelled icon button. No reference library enforces this at the component level; they rely on consumer discipline or lint rules.
- **Tooltip auto-wired as `aria-describedby`**: When a `ui-lib-tooltip` is projected alongside an IconButton, the component auto-generates matching `id` / `aria-describedby` pairs — so screen readers announce both the button label (from `aria-label`) and the supplementary tooltip description without any consumer wiring code.
- **`aria-disabled` handling for focusable disabled state**: When `disabled=true` and `keepFocusable=true` are set simultaneously (e.g., for a disabled button that should still show a tooltip on focus), only `aria-disabled=true` is written — the native `disabled` attribute is not set, preserving keyboard reachability while communicating the disabled state to assistive technology.

#### Reference URLs
- Angular Material: https://material.angular.io/components/button (icon button variant)
- PrimeNG: N/A — no standalone IconButton component (icon prop on Button used instead)
- Radix UI: N/A — no IconButton primitive
- Ark UI: N/A — no IconButton primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (button with accessible name from `aria-label`)

---

### ButtonGroup

ButtonGroup is a container that visually and semantically groups related buttons, applying `role=group` + `aria-label` and managing shared variant / size styling.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=group` on container | ✅ | ❌ (plain `<span>`) | ✅ | ✅ | ✅ |
| `aria-label` on group | ✅ | ❌ | ✅ | ✅ | ✅ |
| Shared `variant` / `size` cascade to children | ❌ | ✅ | ❌ | ❌ | ✅ |
| First / last child border-radius rounding | ✅ | ✅ | ✅ | ✅ | ✅ |
| Keyboard: Tab moves into group, arrows move within | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native `variant` + `size` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `role=group`, `aria-label`, toolbar-model keyboard navigation, and variant cascade all implemented.

#### Differentiators

- **`role=group` + `aria-label` — absent from PrimeNG**: PrimeNG ButtonGroup renders a plain `<span>` wrapper with no ARIA — screen readers have no indication that the enclosed buttons form a related group. The library wraps projected buttons in `role=group` + `aria-label` (e.g., "Text formatting actions") so assistive technology announces the group name when focus enters, aiding orientation in complex toolbars.
- **Toolbar-model keyboard navigation**: Following the APG toolbar pattern, ButtonGroup exposes a single Tab stop — arrow keys move focus between member buttons. This prevents the Tab-key fatigue of navigating past 4–8 buttons in a dense editor toolbar while meeting WCAG SC 2.1.1.
- **Shared `variant` / `size` via Angular DI context**: The `ButtonGroup` component provides a token consumed by each child `ui-lib-button` — setting `variant="outlined"` on the group applies it to all children without per-button repetition. Changing the group variant at runtime updates all children reactively through signals.

#### Reference URLs
- Angular Material: https://material.angular.io/components/button-toggle (ButtonToggleGroup)
- PrimeNG: https://primeng.org/buttongroup
- Radix UI: N/A — no ButtonGroup primitive (Toolbar used instead)
- Ark UI: N/A — no ButtonGroup primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ (button group follows toolbar keyboard model)

---

### Terminal

Terminal renders a read-only command-line output area with a scrollable history, live-region announcements for new output, and an optional interactive prompt.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `role=log` on output region | ❌ | ⚠️ (no role) | ❌ | ❌ | ✅ |
| `aria-live=polite` for new output lines | ❌ | ❌ | ❌ | ❌ | ✅ |
| `aria-label` on terminal region | ❌ | ❌ | ❌ | ❌ | ✅ |
| Interactive prompt with `role=textbox` + `aria-label` | ❌ | ✅ | ❌ | ❌ | ✅ |
| Command history navigation (Up / Down arrows) | ❌ | ✅ | ❌ | ❌ | ✅ |
| `prefers-reduced-motion` on cursor blink | ❌ | ❌ | ❌ | ❌ | ✅ |
| Three visual variants (material / bootstrap / minimal) | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-native output `model<string[]>()` | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `role=log`, `aria-live`, prompt semantics, history navigation, and cursor motion all implemented.

#### Differentiators

- **`role=log` with `aria-live=polite`**: PrimeNG Terminal renders output as a plain styled `<div>` with no role — new lines are not announced to screen reader users. The output region carries `role=log` (the correct ARIA role for sequential output such as chat or command history) with `aria-live=polite` and `aria-atomic=false`, so each new line is announced individually without interrupting the user.
- **`aria-label` on the terminal region**: The terminal container carries a configurable `aria-label` (e.g., "Application terminal output"), making it findable by landmark navigation and giving screen reader users a clear identity for the region.
- **`prefers-reduced-motion` suppresses cursor blink**: The blinking cursor animation is gated on `@media (prefers-reduced-motion: no-preference)` — users with photosensitivity or vestibular conditions see a static cursor rather than a continuously blinking element.

#### Reference URLs
- Angular Material: N/A — no Terminal component
- PrimeNG: https://primeng.org/terminal
- Radix UI: N/A — no Terminal primitive
- Ark UI: N/A — no Terminal primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/log/ (`role=log` for sequential terminal output)

---

### Ripple

Ripple is a directive that adds an ink-ripple press-feedback animation to any host element, with full `prefers-reduced-motion` suppression and zero layout side-effects.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `prefers-reduced-motion` suppresses animation entirely | ✅ | ❌ | N/A | N/A | ✅ |
| No `overflow: hidden` forced on host | ❌ | ❌ | N/A | N/A | ✅ |
| Ripple element `aria-hidden` | ✅ | ⚠️ (not set) | N/A | N/A | ✅ |
| No focus indicator clipping from ripple overflow | ❌ | ❌ | N/A | N/A | ✅ |
| Configurable colour via `--uilib-ripple-color` token | ❌ | ❌ | N/A | N/A | ✅ |
| Signals-native `disabled` input | ❌ | ❌ | N/A | N/A | 🚀 |

#### Gaps

None — motion suppression, `aria-hidden` on ripple element, no overflow clipping, and token colour all implemented.

#### Differentiators

- **No `overflow: hidden` forced on host**: Angular Material Ripple and PrimeNG both set `overflow: hidden` on the host element to contain the ripple circle — a side-effect that clips keyboard focus indicators on the host and its children. The library uses `clip-path: inset(0)` on the ripple element itself instead, containing the visual without affecting layout.
- **Ripple element explicitly `aria-hidden`**: The injected ripple `<span>` carries `aria-hidden=true` — preventing screen readers from encountering or announcing the cosmetic element when navigating the DOM.
- **`prefers-reduced-motion` is a complete suppression**: PrimeNG Ripple has no reduced-motion handling — the full animation plays regardless of OS accessibility settings. The directive checks `matchMedia('(prefers-reduced-motion: reduce)')` and skips the animation injection entirely when the preference is active.

#### Reference URLs
- Angular Material: https://material.angular.io/components/ripple
- PrimeNG: https://primeng.org/ripple
- Radix UI: N/A — no Ripple primitive
- Ark UI: N/A — no Ripple primitive
- APG Pattern: N/A — Ripple is a cosmetic directive; `prefers-reduced-motion` (WCAG SC 2.3.3) governs its behaviour

---

### AnimateOnScroll

AnimateOnScroll is a directive that adds entrance animations to elements as they scroll into the viewport, driven by `IntersectionObserver` with complete `prefers-reduced-motion` suppression.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `prefers-reduced-motion` suppresses all animation | ❌ | ❌ | N/A | N/A | ✅ |
| Elements visible without JS / animation | ❌ | ⚠️ (hidden until observed) | N/A | N/A | ✅ |
| No animation replayed on Back navigation | ❌ | ❌ | N/A | N/A | ✅ |
| `IntersectionObserver` threshold configurable | ❌ | ✅ | N/A | N/A | ✅ |
| Signals-native `animation`, `threshold` inputs | ❌ | ❌ | N/A | N/A | 🚀 |

#### Gaps

None — motion suppression, SSR-safe fallback, and back-navigation guard all implemented.

#### Differentiators

- **`prefers-reduced-motion` is a complete suppression**: When the user has requested reduced motion, the directive applies no animation class, no transition, and no delay — elements are simply visible in their final position from the start. PrimeNG AnimateOnScroll has no reduced-motion handling; animations play regardless of the OS accessibility setting.
- **Elements are visible without JS and before animation**: The host element is never pre-hidden with `opacity: 0` or `transform: translateY(40px)` in the initial CSS — the animation is added only when the `IntersectionObserver` fires. This ensures content is accessible in SSR / no-JS contexts and that users with reduced motion never see an invisible element that fails to animate.
- **Animation not replayed on Back navigation**: The directive stores a `WeakSet` of already-animated elements and skips re-animation when the user navigates back to a page using the browser Back button — preventing the disorienting experience of content re-animating on a page the user has already seen.

#### Reference URLs
- Angular Material: N/A — no AnimateOnScroll directive
- PrimeNG: https://primeng.org/animateonscroll
- Radix UI: N/A — no AnimateOnScroll primitive
- Ark UI: N/A — no AnimateOnScroll primitive
- APG Pattern: N/A — WCAG SC 2.3.3 (Animation from Interactions) and SC 2.2.2 (Pause, Stop, Hide) govern scroll-triggered animation

---

### AutoFocus

AutoFocus is a directive that focuses its host element once on mount, with guards that prevent focus theft from dialogs, overlays, or components that manage their own initial focus.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Focuses element once on mount | ✅ | ✅ | ✅ | ✅ | ✅ |
| Skips focus if a dialog / modal is already open | ❌ | ❌ | ✅ | ✅ | ✅ |
| Skips focus if element is inside a closed panel | ❌ | ❌ | ❌ | ❌ | ✅ |
| Focus delayed to next microtask (avoids layout flash) | ✅ | ⚠️ (immediate) | ✅ | ✅ | ✅ |
| Configurable `delay` input for async content | ❌ | ❌ | ❌ | ❌ | ✅ |
| Signals-native `enabled` + `delay` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — modal-guard, closed-panel guard, microtask delay, and configurable delay all implemented.

#### Differentiators

- **Skips focus if a dialog is already open**: The directive checks the `FocusTrapStack` service before focusing — if any modal dialog or overlay currently owns the focus trap, AutoFocus defers and does not steal focus away. PrimeNG AutoFocus fires unconditionally, which can pull focus out of an open dialog on route navigation.
- **Skips focus if element is inside a collapsed panel**: AutoFocus also checks if the host element is inside a closed Accordion panel, Fieldset, or any element with `aria-hidden=true` — preventing focus from landing on a hidden element that is not perceivable to the user.
- **Microtask-delayed focus prevents layout flash**: Focus is deferred to a `Promise.resolve()` microtask, ensuring Angular's change detection and animation frames have completed before focus is applied — preventing the brief scroll-jump that occurs when PrimeNG's immediate `focus()` fires before the element reaches its final rendered position.

#### Reference URLs
- Angular Material: N/A — no AutoFocus directive (CDK `cdkFocusInitial` used instead)
- PrimeNG: https://primeng.org/autofocus
- Radix UI: N/A — focus managed within each primitive directly
- Ark UI: N/A — focus managed within each primitive directly
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/practices/focus-management/ (initial focus management on page / dialog load)

---

### FocusTrap

FocusTrap is a directive that constrains Tab and Shift+Tab focus cycling within a container, used by overlays and dialogs to prevent focus from escaping to background content.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Tab wraps at last focusable element | ✅ | ✅ | ✅ | ✅ | ✅ |
| Shift+Tab wraps at first focusable element | ✅ | ✅ | ✅ | ✅ | ✅ |
| Handles dynamically added focusable children | ✅ | ⚠️ (static scan only) | ✅ | ✅ | ✅ |
| `aria-hidden` on background content while trapped | ✅ | ❌ | ✅ | ✅ | ✅ |
| Stack-based — multiple traps nest correctly | ✅ | ❌ | ✅ | ✅ | ✅ |
| Signals-native `enabled` input (enable / disable reactively) | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — Tab wrap, dynamic children, `aria-hidden` on background, and nested trap stack all implemented.

#### Differentiators

- **`aria-hidden` applied to background content while trapped**: When a FocusTrap activates, sibling elements outside the trap receive `aria-hidden=true` — preventing screen readers in virtual-browse mode from navigating to background content even if Tab focus is contained. PrimeNG FocusTrap contains keyboard Tab but does not hide background content from browse mode.
- **Stack-based nesting — multiple traps compose correctly**: The `FocusTrapStack` service tracks all active traps; when a second modal opens over a first, only the innermost trap is active. Closing the inner modal reactivates the outer trap. PrimeNG has no trap-stack concept, leading to focus escaping to the page when the inner dialog closes.
- **`enabled` signal input — reactive enable / disable**: `[enabled]="isOpen()"` binds directly to a signal, activating or releasing the trap in sync with Angular's reactivity model — no imperative `enable()` / `disable()` calls needed.

#### Reference URLs
- Angular Material: https://material.angular.io/cdk/a11y/overview (FocusTrap CDK)
- PrimeNG: https://primeng.org/focustrap
- Radix UI: N/A — focus trap built into each overlay primitive
- Ark UI: N/A — focus trap built into each overlay primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant (focus containment for modal dialogs)

---

### StyleClass

StyleClass is a directive that adds, removes, or toggles CSS classes on a target element in response to a trigger event, with `aria-expanded` and `aria-hidden` automatically managed.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| `aria-expanded` on trigger element | ❌ | ⚠️ (manual only) | ❌ | ❌ | ✅ |
| `aria-hidden` on target when collapsed | ❌ | ❌ | ❌ | ❌ | ✅ |
| Escape key closes and returns focus to trigger | ❌ | ❌ | ❌ | ❌ | ✅ |
| Click-outside closes and returns focus | ❌ | ✅ | ❌ | ❌ | ✅ |
| Signals-native `enterClass`, `leaveClass` inputs | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — `aria-expanded`, `aria-hidden`, Escape key, and click-outside all implemented.

#### Differentiators

- **`aria-expanded` automatically managed on the trigger**: When StyleClass adds the `enterClass` to the target, `aria-expanded=true` is written to the trigger element; on removal, `aria-expanded=false` is written — giving screen reader users announcement of the open/closed state without any consumer ARIA code.
- **`aria-hidden` on the target when collapsed**: The target element receives `aria-hidden=true` when the leave class is applied and the element is no longer visible — removing it from the AT virtual tree so browse-mode users cannot navigate to hidden content.
- **Escape key closes and returns focus to trigger**: Pressing Escape while focus is anywhere inside the target closes it and returns focus to the trigger element — matching the disclosure widget keyboard contract that consumers would otherwise need to implement manually.

#### Reference URLs
- Angular Material: N/A — no StyleClass directive
- PrimeNG: https://primeng.org/styleclass
- Radix UI: N/A — no StyleClass primitive
- Ark UI: N/A — no StyleClass primitive
- APG Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ (trigger + target disclosure pattern)

---

### Bind

Bind is a structural directive that sets arbitrary HTML attributes and properties on its host element, with guards preventing accidental overwrite of accessibility attributes managed by sibling directives.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Batch-set attributes from an object map | ❌ | ✅ | ❌ | ❌ | ✅ |
| Guard against overwriting `aria-*` managed elsewhere | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Guard against setting `tabindex` to conflicting value | ❌ | ❌ | ❌ | ❌ | 🚀 |
| Signals-reactive — re-applies when input signal changes | ❌ | ❌ | ❌ | ❌ | ✅ |
| No ARIA interference when binding non-ARIA attributes | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Gaps

None — ARIA guard, tabindex conflict detection, and signal reactivity all implemented.

#### Differentiators

- **Guard against overwriting component-managed `aria-*` attributes**: If a consumer binds `aria-expanded` via Bind on an element where a sibling directive (e.g., StyleClass or FocusTrap) already manages that attribute, a dev-mode warning fires identifying the conflict — preventing silent ARIA state divergence that causes inconsistent screen reader announcements.
- **Guard against conflicting `tabindex` values**: Setting `tabindex="-1"` via Bind on an element that is a toolbar's current roving-tabindex target produces a warning, as this would break keyboard navigation. The directive checks against the `RovingTabindexService` before applying `tabindex` changes.
- **Signals-reactive application**: The attribute map input is a signal — when it changes, only the delta (added / removed / changed keys) is applied, avoiding a full attribute reset on every change detection cycle.

#### Reference URLs
- Angular Material: N/A — no Bind directive
- PrimeNG: https://primeng.org/bind
- Radix UI: N/A — no Bind primitive
- Ark UI: N/A — no Bind primitive
- APG Pattern: N/A — Bind is a utility directive; guards prevent ARIA violations per WCAG SC 4.1.2

---

### ClassNames

ClassNames is a utility function / directive that computes a final CSS class string from a conditional object map — a zero-runtime-overhead alternative to `ngClass` with no ARIA side-effects.

#### Feature / Behaviour Parity

| Feature / Behaviour | Angular Material | PrimeNG | Radix UI | Ark UI | ui-lib-custom |
|---|---|---|---|---|---|
| Conditional class map → class string | ✅ (`ngClass`) | ✅ | ✅ | ✅ | ✅ |
| Zero ARIA interference | ✅ | ✅ | ✅ | ✅ | ✅ |
| Signals-reactive — recomputes on signal change | ❌ | ❌ | ❌ | ❌ | ✅ |
| Usable as pure function in `computed()` expressions | ❌ | ❌ | ❌ | ❌ | 🚀 |
| TypeScript-typed class keys (no string maps) | ❌ | ❌ | ❌ | ❌ | 🚀 |

#### Gaps

None — conditional map, signal reactivity, functional use in `computed()`, and typed keys all implemented.

#### Differentiators

- **Usable as a pure function inside `computed()`**: `classNames({ active: isActive(), disabled: isDisabled() })` can be called directly inside a `computed()` signal expression — making host-class derivation reactive and colocated with other signal logic, without needing a template directive.
- **TypeScript-typed class keys**: The class-map type is `Record<KnownClassKey, boolean>` where `KnownClassKey` is an exported union of the component's valid class names — catching typos at compile time rather than at runtime when a class silently has no effect.
- **Zero ARIA interference**: ClassNames only touches the host `class` attribute — it never reads or writes `aria-*`, `role`, or `tabindex`, making it safe to compose with any other ARIA-managing directive without risk of conflict.

#### Reference URLs
- Angular Material: N/A — `ngClass` used directly
- PrimeNG: https://primeng.org/classnames
- Radix UI: N/A — `clsx` / `cn` utilities used by convention
- Ark UI: N/A — utility functions used by convention
- APG Pattern: N/A — ClassNames is a utility with no direct ARIA implications

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
