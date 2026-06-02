# Strategic Brief: Taking ui-lib-custom to the Next Level

> **Usage:** Paste this entire document into a Claude Opus 4.7 (or equivalent frontier model) session.
> It provides full project context and asks for three structured deliverables:
> (1) strategic roadmap, (2) component anatomy / DOD framework, (3) per-component prioritisation plan.
>
> **When to run:** At the start of a new planning cycle, after a hardening milestone completes,
> or before committing to a new "wow factor". Update the score snapshot table before each run.

---

## Who You Are Talking To

I am building **ui-lib-custom** — a next-generation Angular UI component library. I need your strategic
guidance on what "next level" means for this specific project, and I need a reusable **component anatomy
framework** (a Definition of Done model) that I can apply to every component, one at a time, to finalise it.

---

## What This Project Is

`ui-lib-custom` is a signals-first, tree-shakable, accessibility-native, design-token-driven Angular UI
library. It lives in a monorepo with three Angular projects:

- `projects/ui-lib-custom` — the library (secondary entry-point tree-shaking architecture)
- `projects/demo` — live demo app with Theme Editor
- `projects/minimal` — minimal app for tree-shaking verification

**Entry points:**

```ts
import { ... } from 'ui-lib-custom';           // primary barrel
import { ... } from 'ui-lib-custom/theme';      // theme services
import { ... } from 'ui-lib-custom/tokens';     // design tokens
import { ... } from 'ui-lib-custom/core';       // shared types
import { ... } from 'ui-lib-custom/a11y';       // a11y helpers
import { ... } from 'ui-lib-custom/testing';    // test utilities
```

**Architecture rules (non-negotiable):**

- `ViewEncapsulation.None` + `ChangeDetectionStrategy.OnPush` + standalone on every component
- Signal inputs/outputs: `input()`, `model()`, `output()` — no `@Input()`/`@Output()` decorators
- Angular block syntax: `@if`, `@for (x of y; track z)`, `@switch` — no `*ngIf`/`*ngFor`
- All CSS in `.scss` files, wrapped in `@layer uilib.components { }`, BEM + `uilib-` prefix
- All colours via `var(--uilib-*)` CSS custom properties — no raw hex in rule bodies
- New tokens defined in `oklch()` colour space
- Logical CSS properties for RTL (`margin-inline-start`, `padding-block`)
- Explicit return types everywhere: `computed<T>((): T => ...)`
- Element selectors: `ui-lib-{component}` (hyphen). CSS vars: `--uilib-{component}-*` (no hyphen in `uilib`)
- Output naming: no `on*` prefix, never shadow native DOM event names, no `{model}Change` collision

---

## What Has Already Been Done

As of May 2026, the "hardening milestone" is complete:

- **100+ components built and hardened** across 6 tiers: Overlays & Dialogs, Navigation & Menus,
  Form Controls, Data Display, Feedback & Status, Layout & Utilities
- **All components score ≥ 8.0 / 10** across 10 quality categories (see scorecard below)
- **6,040 tests passing** (unit + accessibility specs)
- **Build is clean** — zero warnings, zero ESLint errors
- **Documentation standards** in place: CSS, HTML, and JS standards docs written
- **Dark mode** — all components support `[data-theme='dark']` + `@media (prefers-color-scheme: dark)`
- **Three theme variants** per component: `material`, `bootstrap`, `minimal`
- **Three size tokens** per component: `sm`, `md`, `lg`
- **CSS cascade layers** — `@layer uilib.base < uilib.tokens < uilib.components` — consumer CSS wins without specificity battles
- **Secondary entry-point architecture** — every component is individually tree-shakable

---

## The 10-Category Quality Scorecard

This is the current quality model. Every component is evaluated across these categories (1–10 integer scores,
gate = every category ≥ 8):

| Category    | What ≥ 8 looks like                                                                           |
| ----------- | --------------------------------------------------------------------------------------------- |
| **API**     | Inputs/outputs feel obvious without reading docs; naming consistent; defaults intelligent     |
| **A11y**    | Full keyboard nav, correct ARIA, screen-reader tested, reduced motion, zero axe violations    |
| **Perf**    | No unnecessary renders, signals correct, no memory leaks, tree-shaking verified               |
| **Comp**    | Content projection slots sufficient; developer can extend without forking                     |
| **Theme**   | All visuals exposed as `--uilib-*` CSS vars; dark mode works; runtime variant switching works |
| **DX**      | TS autocomplete excellent; error states clear; common case ≤ 3 lines of consumer code         |
| **Docs**    | README has selector, all inputs/outputs, content projection, examples, a11y notes, edge cases |
| **Polish**  | Animations smooth and intentional; interactions have perceptible feedback; no jarring reflows |
| **Angular** | Signals-first, OnPush, standalone, SSR-safe, hydration-safe, zoneless-compatible              |
| **Feel**    | Using the component feels satisfying — would make a developer smile, not just work            |

**Current scores snapshot (run date: 2026-05-25):**

| Component         | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg |
| ----------------- | --- | ---- | ---- | ---- | ----- | --- | ---- | ------ | ------- | ---- | --- |
| Button            | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 |
| Input             | 9   | 9    | 9    | 8    | 8     | 9   | 9    | 9      | 9       | 9    | 8.8 |
| Checkbox          | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Toast             | 9   | 10   | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.1 |
| Popover           | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Tooltip           | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Tabs              | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Accordion         | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Menu              | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Card              | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 |
| Dialog            | 9   | 9    | 8    | 9    | 8     | 9   | 8    | 9      | 9       | 8    | 8.6 |
| Select            | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 |
| AutoComplete      | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 |
| CascadeSelect     | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 |
| DatePicker        | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| ColorPicker       | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 |
| Knob              | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 |
| Slider            | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 8      | 9       | 8    | 8.8 |
| Table             | 9   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 |
| TreeTable         | 9   | 9    | 8    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 |
| Tree              | 9   | 8    | 9    | 9    | 9     | 9   | 8    | 8      | 9       | 8    | 8.6 |
| VirtualScroller   | 8   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 |
| Carousel          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| Galleria          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| DataView          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| Timeline          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| OrganizationChart | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| MeterGroup        | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 |
| Avatar            | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 |
| Drawer            | 9   | 9    | 8    | 8    | 9     | 8   | 9    | 8      | 9       | 8    | 8.5 |
| ConfirmDialog     | 9   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.3 |
| DynamicDialog     | 9   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.3 |
| BottomSheet       | 8   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.5 |
| Paginator         | 8   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 |
| Chart             | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 |

> **Pattern to reason about:** Most components plateau at 8.2–8.3. Almost nothing exceeds 9.1.
> The gap between 8.x and 10 is the frontier I want to plan for.

---

## The Strategic Vision

**The north star:** Build the most modern, performant, accessible, composable, and developer-loved
Angular UI ecosystem ever built. The library that makes Angular developers feel what React developers
felt when modern UI ecosystems exploded — APIs that feel intelligent, components that feel effortless,
performance that feels invisible, and an experience that feels years ahead of the current Angular ecosystem.

**Commercial model:** freemium open-source core + team/org licence for premium components and features.
What drives willingness to pay: reliability, performance, accessibility compliance, TypeScript quality,
Angular integration depth, documentation, and saved engineering time. Visual polish alone does not.

**Committed "wow factor":** Elite Accessibility — every component meets WCAG 2.1 AA minimum, with
WCAG 2.2 and WAI-ARIA design pattern compliance as the real bar. When any trade-off arises, always
go further on accessibility, not less.

**Queued "wow factors" (not yet activated):**

- Signals-first data binding depth (fully zoneless by default, no zone.js required)
- CSS cascade layer discipline (consumer CSS always wins, zero specificity battles)
- First-class RTL/i18n support out of the box
- Premium component tier (data grid, query builder, Gantt, AI chat widget)
- Theme preset marketplace

**Next milestone candidates (priority order):**

1. Signals-first data grid — highest commercial value in the Angular ecosystem
2. Runtime variant switcher + theme preset management
3. Broader automated axe-core audit pass (Playwright-driven)
4. Query builder component
5. Dynamic form engine (JSON-schema-driven)
6. AI chat/streaming widget

**Competitive landscape to reason about:**
Angular Material, PrimeNG 19, Ng-Zorro, Spartan UI (shadcn-style headless), CDK primitives,
Analog-ecosystem libs. Target: match what they do well, leapfrog where they have systematic gaps.

---

## What I Need From You

I need three things, delivered as structured, actionable output:

---

### Request 1 — Strategic Roadmap: "What Does Next Level Look Like?"

Given the current state (100+ components, all ≥ 8.0, one wow factor committed, commercial vision clear),
what does "next level" mean in concrete terms?

Answer these questions specifically:

1. **What moves a component from 8.x to 10?** What is the anatomy of a 10/10 component in this
   system? Give me a concrete example: what does a 10/10 `Button` look like vs the current 8.9?
   What does a 10/10 `Select` look like vs the current 8.2? Be specific — cite actual API surface
   decisions, interaction details, documentation depth, and testing completeness.

2. **What are the 3–5 highest-leverage cross-cutting interventions** that would create the most
   visible step-change in library quality across all components at once? Examples of what I mean:
   a new scoring category that exposes a systematic gap, a new infrastructure primitive that
   unlocks a capability, a cross-cutting pattern applied uniformly. Be specific about what the
   intervention is and what it delivers.

3. **What is the right strategic sequence?** Harden existing components to 9–10 first, OR build
   the premium components (data grid, query builder) and treat them as the new quality benchmark?
   Argue the case for each path and give a recommendation with rationale.

4. **What are competitors doing that needs to be matched or leapfrogged?** And what white space
   exists that none of them are filling — genuine opportunities to be first or best?

---

### Request 2 — Component Anatomy Framework: "The Complete DOD"

I need a reusable, exhaustive **anatomy model** — a Definition of Done — that I can apply to any
component in this library, one at a time, to understand:

1. **What layers exist in a complete component** — from API surface to runtime behaviour to
   documentation to testing to release packaging. Name every layer.

2. **What "done" means at each layer** — not as scores but as concrete, verifiable statements.
   Example of what I want: not "A11y score ≥ 8" but "every keyboard interaction listed in the
   WAI-ARIA design pattern for this widget type has a passing jest test with an explicit assertion
   on the key event and the resulting DOM/ARIA state."

3. **What the upgrade path looks like** — given a component currently at 8.2 (e.g. `Select`),
   what is the ordered list of things to do to reach 10.0? In what order should they be tackled
   and why?

4. **What a 10/10 "Feel" score requires** — this is the hardest category to concretise. Give me
   a framework for what "emotional quality" means in a UI library component, with specific
   examples of micro-interactions, animation timing, intelligent defaults, error message copy,
   and API ergonomics that create the feeling of a "loved" component vs a "working" one.

5. **What is different between component archetypes** — the DOD for a simple display component
   (Badge, Tag, Avatar) should differ from a complex form control (DatePicker, CascadeSelect,
   ColorPicker) and from a compound data component (Table, Tree, VirtualScroller) and from an
   overlay (Dialog, Drawer, ConfirmDialog). Give me the anatomy for each archetype, highlighting
   what each archetype demands that the others do not.

**Format:** Deliver this as a reusable template/checklist I can save in my docs repo and run
against each component individually during an evolution session.

---

### Request 3 — Per-Component Prioritisation Plan

Given the score snapshot and strategic vision above:

1. **Which components should be targeted first for 9–10 upgrades, and why?**
   Rank the top 10. Explain the rationale: commercial impact, usage frequency, complexity of
   the remaining gap, and risk of leaving it at 8.x.

2. **Which components are most likely to block commercial adoption if left at 8.x?**
   A prospective enterprise customer evaluating this library will click on something. What are
   they most likely to click, and what do they need to see?

3. **For the 8.2–8.3 cluster** (Select, AutoComplete, CascadeSelect, DatePicker, ColorPicker,
   Knob, Avatar, DataView, Timeline, MeterGroup, OrganizationChart, Carousel, Galleria,
   ConfirmDialog, DynamicDialog): what is the most probable root cause of the lower scores,
   and what category-specific interventions are most likely to lift the average for the
   whole cluster in a single pass?

4. **Cadence recommendation:** How many components can be meaningfully evolved per week without
   accumulating quality debt? Should I run them in parallel or strictly serial?

5. **Should I introduce an 11th scoring category?** If yes, what would it be and why? If no,
   explain what the 10 existing categories collectively fail to capture, and where that gap
   should instead be addressed.

---

## Output Format

Please deliver your response in three clearly labelled sections matching the three requests above.

Use tables, numbered lists, and concrete examples wherever possible.

Where you recommend a specific pattern or intervention, show what it looks like in Angular
(TypeScript/SCSS/HTML) using this library's conventions:

- Signal inputs: `value = input<string>('default')`
- Computed: `display = computed<string>((): string => ...)`
- Outputs: `buttonClick = output<MouseEvent>()`
- SCSS: wrapped in `@layer uilib.components { .uilib-component__element { } }`
- CSS vars: `color: var(--uilib-button-color, var(--uilib-color-primary))`
- Template: `@if (condition) { }`, `@for (item of items(); track item.id) { }`

Do not give generic Angular advice — everything must be specific to this library's architecture
and conventions as described above.
