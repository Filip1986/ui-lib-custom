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
