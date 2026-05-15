# Component Evolution Prompts

> **Purpose:** Use these prompts with an AI model when improving or hardening any existing component. Run them in phase order — each phase builds on the previous one.
>
> Before running any phase, make sure the AI has the full component source (`.ts`, `.html`, `.scss`) in context, along with the project conventions from `LIBRARY_CONVENTIONS.md`.

---

## The Master Prompt

Use this single prompt when you want a full, end-to-end analysis in one shot. For deeper work, use the individual phase prompts below instead.

```
You are a senior Angular framework architect and elite UI systems engineer.

Your task is to analyze and evolve this Angular UI component into a world-class component
suitable for a next-generation Angular UI ecosystem.

The component must achieve excellence in:
- API design
- Developer experience
- Accessibility
- Performance
- Composability
- Theming
- Maintainability
- Scalability
- Animation quality
- Documentation readiness
- Angular-native architecture
- Signals integration
- SSR compatibility
- Zoneless compatibility
- Enterprise readiness

Analyze this component as if it were part of the most respected Angular UI ecosystem ever built.

Your job is NOT merely to improve the code.
Your job is to transform the component into something developers will love using.

Evaluate and improve the component using the following framework:

1. API DESIGN
- Is the API intuitive?
- Is naming consistent?
- Can boilerplate be reduced?
- Are there unnecessary inputs/outputs?
- Can composition replace configuration?
- Are defaults intelligent?
- Is the API scalable long-term?

2. ANGULAR ARCHITECTURE
- Is it signals-first?
- Is change detection optimized?
- Is it standalone?
- Is it SSR-safe?
- Is it hydration-safe?
- Is it zoneless-compatible?
- Does it leverage Angular CDK where appropriate?

3. ACCESSIBILITY
- Keyboard navigation
- Focus management
- Screen reader support
- ARIA correctness
- Reduced motion support
- Color contrast concerns
- High accessibility standards

4. PERFORMANCE
- Rendering efficiency
- Memory efficiency
- Avoid unnecessary recomputations
- Lazy rendering opportunities
- Tree-shaking friendliness
- Bundle size concerns

5. COMPOSABILITY
- Can developers customize behavior?
- Can content projection improve flexibility?
- Are extension points sufficient?
- Is it too rigid?
- Could directives improve ergonomics?

6. THEMING
- CSS variable support
- Dark mode readiness
- Design token compatibility
- Tailwind compatibility
- Minimal specificity conflicts
- Runtime theme switching support

7. DEVELOPER EXPERIENCE
- Type safety
- Autocomplete quality
- Error messaging
- Predictable behavior
- Learning curve
- Documentation clarity

8. VISUAL & INTERACTION POLISH
- Animation quality
- Motion smoothness
- Interaction feedback
- Perceived performance
- Emotional delight

9. DOCUMENTATION REQUIREMENTS
Generate:
- usage examples
- best practices
- accessibility notes
- edge cases
- anti-patterns
- migration considerations

10. ECOSYSTEM FIT
- Does this component feel cohesive with a larger design system?
- Are naming and patterns future-proof?
- Could this become a foundational primitive?

Then provide:
- architectural critique,
- refactoring suggestions,
- API redesign suggestions,
- improved implementation examples,
- accessibility improvements,
- DX improvements,
- performance improvements,
- and a "world-class version" proposal.

The goal is not incremental improvement.
The goal is to make this component feel exceptional.
```

---

## Phased Workflow

For deliberate, high-quality evolution, run the component through each phase in sequence. Each phase has a focused goal and its own prompt.

### Phase 1 — Architecture Review

**Goal:** Is this component fundamentally well-designed?

```
Analyze this component architecture for long-term scalability inside a modern Angular UI ecosystem.

Identify:
- architectural weaknesses,
- API inconsistencies,
- anti-patterns,
- scalability concerns,
- Angular-specific issues,
- SSR/hydration risks,
- signals integration opportunities,
- composability limitations.

Propose a better architecture if needed.
```

---

### Phase 2 — DX Optimization

**Goal:** Make the component effortless and intelligent to use.

```
Optimize this component for elite developer experience.

Reduce friction.
Improve API clarity.
Improve naming consistency.
Reduce boilerplate.
Improve typing.
Improve discoverability.
Improve autocomplete quality.

The component should feel effortless and intelligent to use.
```

---

### Phase 3 — Accessibility Audit

**Goal:** Enterprise-grade accessibility, zero compromises.

```
Perform a full accessibility audit on this Angular component.

Analyze:
- keyboard navigation,
- ARIA roles,
- screen reader support,
- focus traps,
- focus visibility,
- reduced motion support,
- semantic correctness,
- WCAG concerns.

Provide enterprise-grade accessibility improvements.
```

---

### Phase 4 — Performance Audit

**Goal:** Optimize for large-scale enterprise applications.

```
Perform a performance analysis of this Angular component.

Analyze:
- unnecessary renders,
- signals opportunities,
- memory allocations,
- expensive computations,
- animation costs,
- SSR/hydration issues,
- tree-shaking concerns,
- runtime overhead.

Optimize for large-scale enterprise applications.
```

---

### Phase 5 — Composability Audit

**Goal:** Reduce rigidity, improve extensibility.

```
Refactor this component toward a composable architecture.

Favor:
- slots,
- directives,
- content projection,
- primitives,
- layered abstractions,
- headless patterns.

Reduce rigidity and improve extensibility.
```

---

### Phase 6 — Emotional Polish

**Goal:** The hidden layer most developers miss — make the component feel premium.

```
Analyze this component from the perspective of emotional UX quality.

Improve:
- interaction smoothness,
- animation feel,
- perceived responsiveness,
- microinteractions,
- visual elegance,
- tactile feeling,
- delight factor.

The component should feel premium and memorable.
```

---

## Component Quality Scorecard

Before marking any component as complete, score it on each dimension. **A component ships only when every category scores ≥ 8.**

| Category                    | Score (1–10) | Notes |
|-----------------------------|--------------|-------|
| API clarity                 |              |       |
| Accessibility               |              |       |
| Performance                 |              |       |
| Composability               |              |       |
| Theming                     |              |       |
| Developer experience        |              |       |
| Documentation               |              |       |
| Visual & interaction polish |              |       |
| Angular integration         |              |       |
| Emotional quality           |              |       |

After scoring, update **[`docs/COMPONENT_SCORES.md`](../COMPONENT_SCORES.md)** — that is the single source of truth for all component scores and the hardening backlog. Copy the template below into your working notes during the session, then transfer the results.

---

## Strategic Reminders

> **Do NOT optimize for:** "How many components can I ship?"
>
> **Optimize for:** "How unforgettable can each component become?"
>
> That mindset is how legendary libraries emerge.

You are building this in the AI era, with modern Angular, after learning from 10+ years of UI library mistakes. That is an enormous advantage — iterate faster, test faster, document faster, benchmark faster, validate APIs faster than any UI library team in history.

---

## Accumulated Lessons From All Hardenings

> **Generated:** 2026-05-11 · **Based on:** 31 completed hardening sessions (Tier 1–3)
>
> These lessons are hard-won from actual component hardening sessions. Apply every relevant
> item to every new session — do not assume any of these are already handled.

### Architecture Patterns (mandatory in every session)

| # | Lesson | Detail |
|---|--------|--------|
| 1 | Module-level ID counter | Use `let nextXxxId: number = 0` at module scope with explicit `: number` type annotation. Never a `static` class field (linter flags mutable statics). Increment in the class as `public readonly xxxId: string = 'uilib-xxx-' + (++nextXxxId)`. Every component that uses IDs in its template needs this. |
| 2 | `previousFocusEl` for popup focus restore | `private previousFocusEl: HTMLElement | null = null` (null, not undefined). Capture `this.documentRef.activeElement as HTMLElement | null` in `show()`. Restore in a `restoreFocus()` private method called on Escape/close. |
| 3 | `afterNextRender({ injector })` for DOM focus | All `element.focus()` calls that happen after an Angular render must use `afterNextRender({ injector: this.injector })`. Never use `setTimeout` for focus. Inject `Injector` in the constructor when needed outside injection context. |
| 4 | `DOCUMENT` injection (SSR-safe) | Never access `document` global directly. Always `inject(DOCUMENT)` as `private readonly documentRef: Document`. |
| 5 | Roving tabindex in widget patterns | Menus, toolbars, tab panels, listboxes: only ONE item in the widget has `tabindex="0"`. All others: `tabindex="-1"`. Tab exits the widget; arrow keys navigate within. Implement via `WritableSignal<number>` tracking the active index. |
| 6 | `rovingIndex` reset on open | When a popup opens, reset `rovingIndex.set(0)` so Tab stop is always on the first item on open. |
| 7 | `effect()` in constructor | `effect()` callbacks defined in the constructor run in the injection context automatically. No `Injector` injection needed for these. `fixture.detectChanges()` + `whenStable()` is sufficient to trigger them in tests. |
| 8 | Explicit return types everywhere | All methods, getters, computed, signal creation need explicit types. `computed<string>((): string => ...)`. Lint is strict about inferred function expressions. |

### ARIA Correctness (high-impact bugs to always check)

| # | Lesson | Detail |
|---|--------|--------|
| 9 | `role="alert"` only for errors | `role="alert"` implies `aria-live="assertive"` and interrupts immediately. Use ONLY for error severity. Use `role="status"` (polite) for success/info/warn. Cannot override role's implied `aria-live` with explicit attribute — role wins. |
| 10 | `role="separator"` must NOT have `aria-hidden` | Inside `role="menu"`, `role="listbox"`, or `role="tree"`, the separator is a semantic ARIA child. `aria-hidden="true"` removes structural info. Remove it. |
| 11 | Dismiss button labels must be specific | Generic "Dismiss" is insufficient when multiple dismissible items exist. Include the item's summary/label: "Dismiss: {summary}" or "Remove {name} tag". |
| 12 | `aria-controls` requires unique target IDs | `aria-controls` value must match an actual `id` on the target element. When multiple component instances appear on the same page, hardcoded IDs break. Always use instance IDs. |
| 13 | `aria-live` on landmark containers is WRONG | `role="region"`, `role="navigation"`, `role="main"` are structural. Never add `aria-live` to them. Only leaf elements that receive dynamic content get live region roles. |
| 14 | `aria-required-children` axe false positives | Certain role wrapping patterns (e.g. `<ul role="presentation">` inside `role="menu"`) cause axe `aria-required-children` failures. Suppress only this specific rule with a code comment explaining why. |
| 15 | Separator `<li>` in menu: no `role="none"` | Do NOT add `role="none"` to separator `<li>` elements — they already have `role="separator"`. Only non-separator `<li>` wrappers get `role="none"`. |
| 16 | Indeterminate `aria-checked="mixed"` | For checkboxes, trees, and tri-state patterns: `aria-checked="mixed"` is the correct value for the indeterminate state — not `"true"` or `"false"`. |

### Animation & Motion

| # | Lesson | Detail |
|---|--------|--------|
| 17 | `prefers-reduced-motion` in every animated component | Every component with CSS animations, transitions, or keyframes MUST have a `@media (prefers-reduced-motion: reduce)` override block at the end of the SCSS. Set `--uilib-xxx-transition: 0ms` or `transition: none; animation: none`. |
| 18 | Ripple: motion must not fire at all | For the Ripple directive specifically, `prefers-reduced-motion: reduce` should prevent the animation from firing entirely (not just be instantaneous). Check `window.matchMedia` in the directive. |

### Testing Patterns

| # | Lesson | Detail |
|---|--------|--------|
| 19 | `document.body.appendChild` for focus tests | jsdom does not implement the full focus model. `element.focus()` only works when the element is in the document. Always `document.body.appendChild(fixture.nativeElement)` in the `createFixture` helper and `fixture.destroy()` in `afterEach`. |
| 20 | `checkA11y(fixture)` vs `axe(document.body)` | Use `checkA11y(fixture)` when the component renders inside the fixture. Use `axe(document.body, ...)` when the component appends to `document.body` (overlays: Tooltip, Dialog, Popover). |
| 21 | Never skip `region` rule when landmark is present | Skip `region` axe rule ONLY for overlays appended to `document.body` outside any landmark. If the component has `role="region"` or is inside a landmark, do NOT skip the rule. |
| 22 | ESLint in `bash.exe` only | `node_modules/.bin/eslint` must run from `bash.exe`. PowerShell returns exit code 1 even on a clean run due to `.ps1` script policy issues. Using `.cmd` shims from bash.exe also works. |
| 23 | `afterEach` service teardown | Services that are `providedIn: 'root'` persist across tests. Always call teardown (e.g. `toastService.clear()`) in `afterEach`. |
| 24 | `textContent!.trim()` not `?.trim()` | Use non-null assertion `!` before `.trim()` in test assertions. The `?.trim()` pattern triggers `@typescript-eslint/no-unnecessary-condition` when the type is known to be non-null. |
| 25 | `provideIcons(...)` required for icon tests | Any test involving a component that uses `<ui-lib-icon>` will fail silently (or throw) without `provideIcons(...)` in TestBed. Copy the icon list from the existing `*.spec.ts` for that component. |
| 26 | `@for ... track` unique keys | Use stable unique values for `track` (e.g. `item.id`, `item.label`). Fall back to `$index` ONLY when items have no stable identity. Unstable tracks cause full DOM re-renders on reorder. |
| 27 | Focus restoration: Escape vs click-outside | Escape close should restore focus. Click-outside close should NOT steal focus (focus naturally goes to the clicked element). Implement via `closePanel(returnFocus: boolean = true)` parameter. |

### Component-Specific Knowledge

| # | Lesson | Detail |
|---|--------|--------|
| 28 | Tree/Treegrid: `aria-setsize`/`aria-posinset` are often missing | Both MUST be present on every `role="treeitem"` at every level. Compute from the node's parent's children count. |
| 29 | Tree: type-ahead navigation is REQUIRED | WAI-ARIA Tree View Pattern mandates keyboard type-ahead. Pressing 'f' should focus the next item whose label starts with 'f'. |
| 30 | Grid: `aria-selected` is separate from `aria-checked` | In `role="grid"`, row selection uses `aria-selected` on the `role="row"` element. Checkbox cell selection uses `aria-checked` on the checkbox. Both may be present simultaneously. |
| 31 | Carousel: pause control required by WCAG 2.2.2 | Any auto-advancing carousel MUST have a pause/stop control visible and keyboard-accessible. This is a WCAG AA failure if missing, not just a best practice. |
| 32 | PanelMenu: it is an Accordion, not a Menu | PanelMenu uses header buttons that toggle panel visibility. The correct ARIA pattern is accordion (`role="button"` with `aria-expanded` + `aria-controls`) + navigation landmark — NOT `role="menu"` + `role="menuitem"`. |
| 33 | FocusTrap sentinel nodes | Sentinel nodes need `aria-hidden="true"` (so screen readers skip them) AND `tabindex="0"` (so Tab key detection works). This is not a contradiction — `aria-hidden` hides from the accessibility tree, `tabindex` keeps them in the tab order for the boundary detection. |

---

## Related Documents

| Document                                                           | Relevance                                                                         |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| [Vision — Component Philosophy](../VISION.md#component-philosophy) | The 10-layer model and 8-step workflow these prompts are built on                 |
| [Hardening Prompt Index](HARDENING_PROMPT_INDEX.md)                | Index of all session prompts with queue order and key focus areas                 |
| [Scoring Criteria Audit Prompt](SCORING_CRITERIA_AUDIT_PROMPT.md)  | **Tier 2** — checkpoint-verified scoring against SCORING_CRITERIA.md (use after Tier 1 hardening is complete) |
| [Component Creation Guide](../../COMPONENT_CREATION_GUIDE.md)      | End-to-end workflow for building new components                                   |
| [Library Conventions](../../LIBRARY_CONVENTIONS.md)                | Non-negotiable architectural rules — always provide to AI alongside these prompts |
| [Accessibility Guide](../reference/systems/ACCESSIBILITY.md)       | Detailed a11y standards for Phase 3                                               |
| [Performance Guide](../reference/systems/PERFORMANCE.md)           | Performance targets for Phase 4                                                   |

