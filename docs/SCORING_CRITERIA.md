# Component Scoring Criteria

> **The authoritative, benchmark-anchored quality gate for every component in this library.**
> This file defines what every score number actually means. A score is not an opinion — it is a
> count of verified checkboxes divided by the total in that category.

---

## How Scoring Works

Each category contains a fixed list of verifiable checkboxes anchored to an external standard,
a competitive benchmark, or a measurable engineering constraint.

```
Score = (checked items / total items) × 10   →   rounded to one decimal place
Gate  = every category must reach ≥ 8.0 before a component is considered production-quality
```

A score of **8.0** means at least 80 % of the criteria in that category are confirmed true.
Items left unchecked are an explicit, visible backlog — not an unknown gap.

**Scores live in [`docs/COMPONENT_SCORES.md`](COMPONENT_SCORES.md).
Criteria live here. Never duplicate criteria into the scores file.**

---

## External Reference Anchors

Before scoring any category, know where the standards come from:

| Standard / Resource | Used in |
|---|---|
| [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) | Accessibility |
| [WCAG 2.1 Understanding Docs](https://www.w3.org/WAI/WCAG21/Understanding/) | Accessibility |
| [axe-core ruleset](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) | Accessibility |
| [Angular Performance Guide](https://angular.dev/best-practices/runtime-performance) | Performance |
| [Angular SSR Guide](https://angular.dev/guide/ssr) | Performance, Angular Integration |
| [web.dev — Core Web Vitals](https://web.dev/vitals/) | Performance |
| [Angular Style Guide](https://angular.dev/style-guide) | Angular Integration |
| [Angular Signals RFC + docs](https://angular.dev/guide/signals) | Angular Integration, API |
| [Angular CDK Accessibility](https://material.angular.io/cdk/a11y/overview) | Accessibility, Composability |
| [HTML Living Standard — WHATWG](https://html.spec.whatwg.org/multipage/) | HTML Semantics |
| [CSS Cascading Variables — W3C](https://www.w3.org/TR/css-variables-1/) | Theming |
| Angular Material source (github.com/angular/components) | API Benchmark |
| Radix UI (radix-ui.com) | API Benchmark, Accessibility Benchmark |
| Ark UI (ark-ui.com) | API Benchmark, Accessibility Benchmark |
| Melt UI (melt-ui.com) | Composability Benchmark |
| Headless UI (headlessui.com) | Composability Benchmark |

---

## Category 1 — API Clarity

> **Benchmark libraries:** Angular Material, Radix UI, Ark UI
> **External standard:** Angular Style Guide, TypeScript Handbook

**Score = checked / 16 × 10**

### Naming & Consistency
- [ ] Every input name is a full English noun or adjective — no abbreviations (`disabled` not `dsbl`, `variant` not `vnt`, `placeholder` not `ph`)
- [ ] Naming is consistent with sibling components in the library (same concept = same name everywhere)
- [ ] Boolean inputs use positive framing — what is true, not what is absent (`visible` not `hidden`, `disabled` not `notEnabled`)
- [ ] Output event names are past-tense verbs matching the Angular convention (`closed`, `changed`, `selected`, `submitted`)
- [ ] Output payload types are specific, typed objects — never `any`, never raw DOM `Event` unless genuinely needed

### Defaults & Ergonomics
- [ ] Component works correctly out-of-the-box with zero inputs configured — the defaults are intelligent, not empty
- [ ] The most common usage requires ≤ 3 inputs — power features require more, but the entry point is frictionless
- [ ] No input is overloaded to mean two different things depending on context
- [ ] Mutually exclusive states are modelled as a discriminated union or a single string-union input, not as multiple competing boolean inputs

### Types & Contracts
- [ ] All public inputs use string union types for enumerable values (`'sm' | 'md' | 'lg'`) — no TypeScript `enum`, no `as const` constants as public-facing types
- [ ] All public input/output types are exported from the secondary entry point so consumers can import them
- [ ] Generic types used where the component is data-driven (`Table<T>`, `Select<T>`) — not typed as `any` or `object`
- [ ] Explicit return types on every method, getter, and `computed()` in the component class

### Competitive Parity
- [ ] API compared against Angular Material equivalent (if one exists) — no missing capability that Material provides
- [ ] API compared against Radix UI / Ark UI equivalent — no accessibility-related input/output gap (e.g. `aria-label` passthrough, `id` binding for external label association)
- [ ] Any new input added since the last score is backward-compatible (optional with a sensible default — no silent breaking change)

---

## Category 2 — Accessibility

> **Benchmark libraries:** Radix UI (a11y gold standard), Angular CDK
> **External standards:** WAI-ARIA APG, WCAG 2.1 AA (floor), WCAG 2.1 AAA (aspiration)

**Score = checked / 28 × 10**

### ARIA Semantics
- [ ] The correct APG pattern is identified for this component and its URL is noted in the component README (e.g. `https://www.w3.org/WAI/ARIA/apg/patterns/combobox/`)
- [ ] All required ARIA roles are applied (`role=dialog`, `role=listbox`, `role=menu`, etc.) per the APG pattern — no improvised roles
- [ ] All required ARIA states and properties are present and correct (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-haspopup`, `aria-activedescendant`, etc.)
- [ ] `aria-labelledby` / `aria-label` / `aria-describedby` used correctly — every referenced `id` resolves to an element that exists in the DOM at the time the attribute is read
- [ ] Dynamic ARIA states are updated in real time as state changes — not only set once on mount
- [ ] No redundant ARIA: `role="button"` is never placed on a `<button>`, `role="link"` never on an `<a>`, `aria-hidden="true"` never on a focusable element

### Keyboard Interaction
- [ ] The exact keyboard interaction model from the APG pattern is implemented completely — no partial implementation
- [ ] All interactive elements are reachable by `Tab` / `Shift+Tab` in logical DOM order
- [ ] Composite widgets (menus, listboxes, trees, grids) use arrow-key navigation internally and remove themselves from the tab sequence with `tabindex="-1"` on child items
- [ ] `Enter` and `Space` activate the focused element per APG specification
- [ ] `Escape` closes / cancels every overlay, popover, menu, or dialog without exception
- [ ] `Home` / `End` shortcuts implemented for all list, menu, and tree components per APG
- [ ] Type-ahead search (first-character navigation) implemented for all `role=listbox`, `role=menu`, and `role=tree` components per APG

### Focus Management
- [ ] Focus is programmatically trapped inside `role=dialog` and `role=alertdialog` overlays using Angular CDK `FocusTrap` or equivalent
- [ ] When an overlay or popup closes, focus returns precisely to the trigger element that opened it
- [ ] No focus vacuum: focus never lands on `<body>` or an invisible element during any interaction flow
- [ ] `:focus-visible` (not `:focus`) is used for all keyboard-only focus rings — mouse users are never shown an outline

### Screen Reader
- [ ] Verified with **NVDA + Chrome**: all state changes and interactions are announced correctly
- [ ] Verified with **VoiceOver + Safari**: all state changes and interactions are announced correctly
- [ ] `aria-live` regions used for all async / dynamic content updates (search results, toast notifications, validation errors, loading completions)
- [ ] Every icon-only interactive element has an accessible name via `aria-label` or visually-hidden text — no icon button is ever nameless

### Visual Accessibility
- [ ] Normal text contrast ratio ≥ 4.5:1 — measured with a contrast checker tool (not estimated)
- [ ] Large text (≥ 18pt regular or ≥ 14pt bold) contrast ratio ≥ 3:1
- [ ] Non-text UI elements (input borders, focus rings, icons) contrast ratio ≥ 3:1 against adjacent backgrounds
- [ ] No information is conveyed by color alone — a secondary indicator (icon, text, pattern, shape) always accompanies color coding
- [ ] `prefers-reduced-motion: reduce` — all animations and transitions are either suppressed entirely or replaced with an instant opacity crossfade

### Testing & Verification
- [ ] `axe-core` automated scan returns **zero violations** (run via `npm run test:a11y` or Playwright audit)
- [ ] Playwright a11y e2e test exists specifically for this component in `tests/a11y/`
- [ ] Manual keyboard-only walkthrough completed: every feature reachable and operable without a mouse

---

## Category 3 — Performance

> **External standards:** Angular Performance Guide, web.dev Core Web Vitals, Bundle Phobia methodology
> **Targets:** JS payload ≤ 5 KB gzip (simple), ≤ 15 KB gzip (complex); zero Zone.js triggers from internals

**Score = checked / 20 × 10**

### Change Detection
- [ ] `ChangeDetectionStrategy.OnPush` declared on the component
- [ ] Zero `ChangeDetectorRef.markForCheck()` calls — state flows through signals only
- [ ] Zero `ChangeDetectorRef.detectChanges()` calls — no manual CD triggering
- [ ] Zero `async` pipe usage — all reactivity is signal-based (`input()`, `computed()`, `signal()`)
- [ ] All derived template values computed via `computed()` — no inline method calls in template expressions that would re-execute on every render cycle

### Rendering Efficiency
- [ ] Host element is used as the component root — no unnecessary wrapper `<div>` or `<span>` added purely for structural reasons
- [ ] `@for` loops track by a unique, stable identity (e.g. item `id`) — never tracked by array index for any list that can be reordered, filtered, or modified
- [ ] `@defer` used for any content that is below the fold, inactive, or conditionally shown (e.g. tab panels not yet activated, collapsed accordion content)
- [ ] Lazy content rendering: for components that conditionally show rich content (dropdowns, tabs, dialogs), content is only rendered in the DOM when first shown — not eagerly on component init

### Animations
- [ ] All animations use only `transform` and/or `opacity` — no `width`, `height`, `top`, `left`, `margin`, `padding`, or any layout-triggering property is animated
- [ ] `will-change` is applied dynamically (added at animation start, removed at animation end) — never set as a permanent style on an element
- [ ] All animation durations and easing functions reference `--uilib-transition-*` design tokens — no hardcoded millisecond values

### Memory & Subscriptions
- [ ] Zero retained `Subscription` objects — any RxJS usage (CDK, Router, etc.) uses `takeUntilDestroyed()` or `toSignal()`
- [ ] No DOM event listeners attached manually via `addEventListener` without a corresponding `removeEventListener` in `ngOnDestroy`
- [ ] No `setInterval` / `setTimeout` without cleanup in `ngOnDestroy` or `DestroyRef`

### Bundle & Tree-shaking
- [ ] Component is importable from its own secondary entry point (e.g. `ui-lib-custom/button`) — verified by running `npm run verify:tree-shaking`
- [ ] Zero runtime dependency on PrimeNG, Angular Material, or any other third-party UI library
- [ ] Gzipped JS payload measured and recorded in `COMPONENT_SCORES.md` — within budget
- [ ] No `import * as X from '...'` — all imports are named to allow dead code elimination

### SSR & Hydration Safety
- [ ] Zero direct `document.*` or `window.*` access — all browser API access guarded by `isPlatformBrowser()` or deferred to `afterNextRender()`
- [ ] Zero `localStorage` / `sessionStorage` / `navigator.*` access during server-side rendering path

---

## Category 4 — Composability

> **Benchmark libraries:** Melt UI, Headless UI, Ark UI, Angular CDK
> **Standard:** Angular Content Projection, Angular CDK `@Directive` composition

**Score = checked / 14 × 10**

### Content Projection
- [ ] Default (unnamed) `<ng-content>` slot works — component accepts arbitrary rich content as its primary body
- [ ] Named content slots defined for all structural regions that benefit from customization (`[slot="header"]`, `[slot="footer"]`, `[slot="prefix"]`, `[slot="suffix"]`, `[slot="empty"]`, etc.)
- [ ] Component renders correctly and gracefully when any optional named slot is left empty — no broken layout, no JS errors
- [ ] String inputs are not used where rich content projection would be more appropriate (e.g. `label` input with a `[slot="label"]` alternative)

### Template Customization
- [ ] For list-rendering components (Table, Select, Listbox, Tree, etc.), item templates are customizable via `ng-template` with a typed implicit context (`let-item`)
- [ ] No "god-object" configuration input (e.g. `[config]="{ ... }"` with 15 keys) — configuration is decomposed into individual, composable inputs
- [ ] Compound component API available for complex components: sub-components (`<ui-lib-tab>` inside `<ui-lib-tabs>`) rather than a JSON data-binding-only API

### Directive & Behavior Composability
- [ ] Reusable behavioral directives extracted where applicable (focus trap, ripple, tooltip anchor, animate-on-scroll) — usable independently of this component
- [ ] `hostDirectives` used to compose shared behaviors (e.g. `RippleDirective`) rather than copy-pasting behavior into each component

### Integration
- [ ] Works as a `ControlValueAccessor` inside Angular Reactive Forms without any wrapper component (for form-integrated components)
- [ ] Works correctly inside an `OnPush` parent component with zero `markForCheck()` hacks required from the consumer
- [ ] Works correctly when instantiated inside an `*ngTemplateOutlet` — no lifecycle or signal issues
- [ ] Works correctly inside a `@defer` block — no eager dependencies that break deferred loading

---

## Category 5 — Theming

> **External standards:** CSS Custom Properties (W3C), CUBE CSS methodology
> **Internal standard:** `design-tokens.ts`, CSS variable naming convention `--uilib-{component}-{property}[-{variant}][-{state}]`

**Score = checked / 15 × 10**

### Token Coverage
- [ ] Every visual property that a consumer might reasonably want to override is exposed as a `--uilib-<component>-*` CSS variable — no "hardcoded look" left
- [ ] Zero raw hex color values in component SCSS — every color references a `--uilib-*` CSS variable or a design token
- [ ] Zero raw `px` values for spacing, border-radius, or shadow — all resolved through `--uilib-spacing-*`, `--uilib-radius-*`, `--uilib-shadow-*` tokens
- [ ] All component-level CSS variables documented in the component README under a **Theming** section with their default value

### Variants
- [ ] `material` variant is fully styled, visually correct, and matches Material Design 3 aesthetic intent
- [ ] `bootstrap` variant is fully styled, visually correct, and matches Bootstrap 5 aesthetic intent
- [ ] `minimal` variant is fully styled, visually correct, and presents a clean, neutral, unopinionated style
- [ ] All three variants verified on the component demo page and visually distinguishable

### Theme Switching
- [ ] Runtime variant switching (`material` → `bootstrap` → `minimal`) works without a page reload — verified in the demo
- [ ] Dark mode works entirely via CSS variable token overrides — no duplicate SCSS rule blocks for dark mode
- [ ] Custom token overrides applied at the component level (via CSS custom property cascade on a parent element) take effect correctly — consumer can brand one instance differently from another

### Design System Integrity
- [ ] All new CSS variables introduced for this component follow the naming convention exactly: `--uilib-{component}-{property}[-{variant}][-{state}]`
- [ ] No new component-level variable accidentally shadows or conflicts with a system-level token (`--uilib-color-*`, `--uilib-spacing-*`, `--uilib-radius-*`, `--uilib-shadow-*`, `--uilib-font-*`, `--uilib-transition-*`, `--uilib-z-*`)
- [ ] CSS specificity never exceeds `0-2-0` in component styles — no ID selectors, no `!important`, no over-qualified selectors

---

## Category 6 — Developer Experience

> **Benchmark:** shadcn/ui (DX gold standard), Angular Material, Nuxt UI
> **Standard:** TypeScript Handbook strict mode, Angular Style Guide

**Score = checked / 17 × 10**

### TypeScript Quality
- [ ] Zero `any` in the public API surface — all inputs, outputs, and method signatures are fully typed
- [ ] Zero `any` in the component implementation — internal types are explicit even if not exported
- [ ] Generic type parameters used for data-driven components so consumers get type inference through the component (`Table<MyRow>` means row click output is `MyRow`, not `any`)
- [ ] Discriminated unions model mutually exclusive states — no boolean flag soup
- [ ] All public types (input types, output payload types, enum-like string unions) are exported from the secondary entry point barrel

### Autocomplete & Discoverability
- [ ] All string-union input values appear in IDE autocomplete — verified by opening a template and typing the input binding
- [ ] Hovering an input in a JetBrains IDE or VS Code shows JSDoc that describes what the input does and its default value
- [ ] The minimal "getting started" usage example (from the README) works by copy-paste into a fresh Angular component with zero modification

### Error Clarity
- [ ] Providing an invalid string value to a string-union input triggers a TypeScript compile error or at minimum a runtime `console.warn` in dev mode — it never silently produces no visual output
- [ ] Missing required structural dependencies (e.g. using `<ui-lib-tab>` outside `<ui-lib-tabs>`) produces a clear error message — not a cryptic null reference or blank render

### Zero-Setup Integration
- [ ] Works in a new Angular workspace (`ng new`) with only the library installed — no additional providers, forRoot() calls, or global CSS imports required for basic usage
- [ ] Import path is a single, stable secondary entry point: `import { X } from 'ui-lib-custom/<component>'` — no relative path, no deep import needed
- [ ] No peer dependency version conflict with Angular 17, 18, or 19
- [ ] No global styles need to be added to `angular.json` for the component to render correctly

### README Quality (DX perspective)
- [ ] README.md exists at `projects/ui-lib-custom/src/lib/<component>/README.md`
- [ ] README contains a copy-paste minimal example that works without modification
- [ ] README lists every input with: name, type, default value, and one-sentence description

---

## Category 7 — Documentation

> **Standard:** Diátaxis documentation framework (tutorials, how-to, reference, explanation)
> **Benchmark:** Radix UI docs, Nuxt UI docs — documentation as a product experience

**Score = checked / 18 × 10**

### Co-located README (`projects/ui-lib-custom/src/lib/<component>/README.md`)
- [ ] Component selector listed
- [ ] Secondary entry point package path listed (`import { X } from 'ui-lib-custom/<component>'`)
- [ ] All inputs listed in a table: name | type | default | description
- [ ] All outputs listed in a table: name | payload type | when it fires
- [ ] All named content slots documented: slot name | expected content | optional/required
- [ ] Minimal usage example — the simplest possible working template (copy-paste ready)
- [ ] Theming section listing all `--uilib-<component>-*` CSS variables with their default values
- [ ] Accessibility section: which APG pattern is implemented, keyboard shortcuts, screen reader notes

### Reference Doc (`docs/reference/components/<name>.md`)
- [ ] File exists and is not a stub
- [ ] API table matches the current implementation exactly — no stale inputs/outputs listed
- [ ] Accessibility section includes: keyboard interaction table, ARIA roles/states/properties table, screen reader behavior notes
- [ ] Theming section includes: full CSS variable table with type, default, and description
- [ ] At least one "real-world" usage example beyond the minimal case (e.g. form integration, custom template, variant comparison)

### Demo Page (`projects/demo/src/app/pages/<component>/`)
- [ ] Demo page exists and is registered in the routing configuration
- [ ] All three variants (`material`, `bootstrap`, `minimal`) are shown side-by-side or togglable
- [ ] All sizes (`sm`, `md`, `lg`) are demonstrated
- [ ] Accessibility notes are visible on the page (keyboard shortcuts, ARIA pattern used)
- [ ] Edge cases shown: disabled state, loading state, error/invalid state, empty/placeholder state
- [ ] The demo page itself is built exclusively with `ui-lib-*` components — no PrimeNG or Angular Material imports

---

## Category 8 — Visual & Interaction Polish

> **Benchmark:** Vercel design system, Radix UI Themes, Linear app UI
> **Standard:** Motion design principles — purposeful, not decorative

**Score = checked / 15 × 10**

### Interactive State Coverage
- [ ] `:default` / resting state is styled and intentional
- [ ] `:hover` state is styled with a subtle, purposeful change (background, border, shadow, etc.)
- [ ] `:focus-visible` state has a clearly visible keyboard focus ring — meets 3:1 contrast against the background
- [ ] `:active` / pressed state styled with a perceivable depression or feedback
- [ ] `:disabled` state styled with reduced opacity and `cursor: not-allowed` — not styled identically to the default state
- [ ] `loading` state implemented where applicable: spinner, skeleton, or busy indicator
- [ ] `error` / `invalid` state styled with the error color token and an icon where space permits
- [ ] `empty` / `placeholder` state styled gracefully — not a blank white box

### Animation & Motion
- [ ] Enter/exit animations implemented for all overlay components (Dialog, Drawer, Tooltip, Popover, Toast) — smooth appearance, not a jarring instant cut
- [ ] State transitions animated for all toggle components (Checkbox, ToggleSwitch, RadioButton, Accordion) — state change is perceptible but fast
- [ ] No layout-triggering property (`width`, `height`, `top`, `left`, `margin`, `padding`) is ever animated — only `transform` and `opacity`
- [ ] `prefers-reduced-motion: reduce` — every animation in this component is either turned off or replaced with an instant opacity crossfade
- [ ] Animation timing feels "native" — not too slow (> 400ms), not too fast (< 80ms) for standard interactions

### Visual Fidelity
- [ ] Verified in all three variants: no misalignment, no overflow, no incorrect spacing
- [ ] Typography uses correct token values for size, weight, and line-height — never hard-coded
- [ ] Component looks correct at all three size variants (`sm`, `md`, `lg`) with proportional scaling

---

## Category 9 — Angular Integration

> **External standards:** Angular Style Guide, Angular Signals docs, Angular SSR docs
> **Benchmark:** Angular CDK — the reference implementation for Angular-native patterns

**Score = checked / 16 × 10**

### Architectural Foundation
- [ ] `standalone: true` — no NgModule dependency
- [ ] `ViewEncapsulation.None` — CSS custom property cascade and global theming work without `::ng-deep`
- [ ] `ChangeDetectionStrategy.OnPush` — no default CD tree walking
- [ ] All inputs are signal inputs: `input()` for read-only, `model()` for two-way bindable — zero `@Input()` decorators
- [ ] All outputs use `output()` — zero `@Output() EventEmitter` declarations

### Angular Template Patterns
- [ ] `@if`, `@for`, `@switch` block syntax used throughout — zero `*ngIf`, `*ngFor`, `[ngSwitch]`
- [ ] `@for` block includes a `track` expression on a unique, stable identity
- [ ] `inject()` function used for all dependency injection — no constructor parameter injection
- [ ] Any RxJS observable (from CDK, Router, or otherwise) converted to a signal via `toSignal()` or cleaned up with `takeUntilDestroyed()`
- [ ] DOM access deferred to `afterNextRender()` — zero `ngAfterViewInit` DOM queries

### Framework Compatibility
- [ ] **SSR**: component renders without error in a Node.js environment — no `document`, `window`, `navigator`, `localStorage`, or `sessionStorage` access on the server path
- [ ] **Zoneless**: component works correctly in a `provideZonelessChangeDetection()` environment — verified by the component unit test host using `provideZonelessChangeDetection()`
- [ ] **Angular CDK**: CDK utilities used where they eliminate custom code (e.g. `FocusTrap`, `OverlayModule`, `A11yModule`, `DragDropModule`, `VirtualScrollViewport`)
- [ ] **Forms**: `ControlValueAccessor` implemented correctly for all form-integrated components — tested with both Reactive Forms and Template-driven Forms in the demo

### Entry Point & Build
- [ ] Secondary entry point exists at `projects/ui-lib-custom/<component>/`
- [ ] Entry point registered in `projects/ui-lib-custom/package.json` under both `exports` and `typesVersions`
- [ ] Entry point import test added to `projects/ui-lib-custom/test/entry-points.spec.ts`
- [ ] `ng build ui-lib-custom` passes with zero errors and zero warnings after changes

---

## Category 10 — Emotional Quality

> **No external standard.** This category measures whether the component creates the reaction:
> *"This is different. This feels amazing."*
>
> Ask each question honestly. A borderline "yes" is a "no."

**Score = checked / 10 × 10**

- [ ] **Zero-friction entry point**: a developer using this component for the first time, with no prior knowledge of this library, can make it work for the common case without opening the documentation
- [ ] **Intelligent defaults**: the out-of-the-box appearance and behavior is already polished and considered — it does not look "unstyled" or "bare" without configuration
- [ ] **Animations feel native**: motion is purposeful, proportional, and consistent with the platform — not absent (feels dead), not excessive (feels toy-like), not jarring (feels broken)
- [ ] **Micro-interactions are present**: hover, focus, and state transitions have visible, deliberate feedback — the component responds to the user, it does not merely change state
- [ ] **No visual leaks**: the component never causes unexpected layout shifts, parent overflow, z-index collisions, or viewport escapes in any context
- [ ] **Error states communicate clearly**: when something is wrong, the component communicates it unambiguously and without alarm — the user knows what happened and what to do
- [ ] **Scales gracefully**: the component looks and performs correctly with 1 data item and with 10,000 data items — no hardcoded assumptions about data size
- [ ] **Passes the "show a non-Angular developer" test**: shown cold to a developer from React or Vue, they would say the component looks professional, polished, and modern — not dated or generic
- [ ] **Passes the "show an a11y engineer" test**: shown to an accessibility specialist, they would find no ARIA misuse, no keyboard trap, no unlabelled interactive element, and no motion that ignores `prefers-reduced-motion`
- [ ] **Passes the "I don't want to go back" test**: a developer who has used this component for a project would not replace it with Angular Material, PrimeNG, or a custom implementation — it already does what they need, the way they'd want it done

---

## Scoring Summary Template

Copy this block into `docs/COMPONENT_SCORES.md` when recording a component result.

```
### ComponentName

| Category                    | Score | Notes |
|-----------------------------|-------|-------|
| API Clarity                 |  /10  |       |
| Accessibility               |  /10  |       |
| Performance                 |  /10  |       |
| Composability               |  /10  |       |
| Theming                     |  /10  |       |
| Developer Experience        |  /10  |       |
| Documentation               |  /10  |       |
| Visual & Interaction Polish |  /10  |       |
| Angular Integration         |  /10  |       |
| Emotional Quality           |  /10  |       |
| **Production gate**         | **all ≥ 8.0** | ✅ Pass / ❌ Fail |

Unchecked items (explicit backlog):
- Category X: item description
- Category Y: item description
```

---

## Hardening Workflow Integration

When running the [6-phase evolution workflow](prompts/COMPONENT_EVOLUTION_PROMPTS.md) on a component,
map the phases to the scoring categories as follows:

| Evolution Phase | Primary Scoring Categories |
|---|---|
| Phase 1 — Architecture | Angular Integration, Performance |
| Phase 2 — DX & API | API Clarity, Developer Experience |
| Phase 3 — Accessibility | Accessibility |
| Phase 4 — Performance | Performance |
| Phase 5 — Composability | Composability, Theming |
| Phase 6 — Emotional Polish | Visual & Interaction Polish, Emotional Quality, Documentation |

After every phase, re-tally only the affected categories. A full re-score is only necessary after Phase 6.

---

## Competitive Benchmark Process (API & A11y Research)

Before scoring any new or evolved component, run this research pass:

1. **Angular Material** — find the equivalent component. Read its input/output list.
   Note any input this library's component does not have. Decide: add it, or consciously exclude it.

2. **Radix UI** — find the equivalent primitive. Read its props and its built-in accessibility behaviour.
   Note any ARIA attribute or keyboard interaction that Radix handles which this component does not.
   This is the most reliable a11y benchmark because Radix is built around the APG patterns.

3. **Ark UI / Melt UI** — find the equivalent component. Note any composability or headless pattern
   they offer that would improve this library's API.

4. **APG Pattern** — find the exact pattern URL for this component type.
   Cross-reference: does this component's keyboard model exactly match the APG?
   Any deviation must be intentional and documented.

Record the benchmark comparison URLs in the component README under a `## Benchmark` section.
This makes future re-scores fast — you know exactly where to look.

---

## What a Perfect Score Looks Like

A component that scores **10/10 across all categories** means:

- Its API is cleaner than Angular Material's equivalent and covers every use case Radix UI handles
- It passes axe-core with zero violations, survives NVDA + VoiceOver walkthroughs, and implements the APG pattern exactly
- It runs in a Zoneless, SSR-enabled app with no special configuration
- Its CSS bundle is measured, within budget, and tree-shaking verified
- Its animations only use `transform` and `opacity`, respect `prefers-reduced-motion`, and use design tokens
- Its documentation makes a developer feel that the library deeply cares about their time
- A developer who picks it up cold never reaches for the docs for the common case
- An a11y engineer would choose it as the reference implementation for Angular

**That is the standard. Every component should earn it.**
