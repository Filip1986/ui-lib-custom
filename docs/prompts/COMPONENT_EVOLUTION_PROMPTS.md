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

Copy this table into your working notes or the component's `README.md` during review.

---

## Strategic Reminders

> **Do NOT optimize for:** "How many components can I ship?"
>
> **Optimize for:** "How unforgettable can each component become?"
>
> That mindset is how legendary libraries emerge.

You are building this in the AI era, with modern Angular, after learning from 10+ years of UI library mistakes. That is an enormous advantage — iterate faster, test faster, document faster, benchmark faster, validate APIs faster than any UI library team in history.

---

## Related Documents

| Document                                                           | Relevance                                                                         |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| [Vision — Component Philosophy](../VISION.md#component-philosophy) | The 10-layer model and 8-step workflow these prompts are built on                 |
| [Component Creation Guide](../../COMPONENT_CREATION_GUIDE.md)      | End-to-end workflow for building new components                                   |
| [Library Conventions](../../LIBRARY_CONVENTIONS.md)                | Non-negotiable architectural rules — always provide to AI alongside these prompts |
| [Accessibility Guide](../reference/systems/ACCESSIBILITY.md)       | Detailed a11y standards for Phase 3                                               |
| [Performance Guide](../reference/systems/PERFORMANCE.md)           | Performance targets for Phase 4                                                   |

