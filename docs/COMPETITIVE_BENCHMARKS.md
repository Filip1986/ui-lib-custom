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
