# Competitive Strategy

> Captured strategy for competitive positioning. Execute this AFTER the internal axe-core audit passes and the hardening milestone is complete.

---

## The Core Principle

Do not rank competitors on popularity metrics. Those measure incumbency, not quality.
Angular Material dominates "most used" because it is Google's official library — not because it is exceptional.
PrimeNG leads on stars because it is the oldest — not because it is modern.

Competing on those numbers is a game that cannot be won and is not worth playing.

**The only game worth playing: find where everyone has failed developers, and make that your signature.**

---

## Execution Sequence

Execute in this exact order. Do not skip ahead.

```
Step 1 — Internal audit first
  Run axe-core across your own library. Reach a score you are proud of.
  Do not publish competitive benchmarks before your own house is in order.

Step 2 — Audit competitors on your strongest dimensions
  Angular Material, PrimeNG, Ng-Zorro, Ng-Bootstrap.
  Only audit where you expect to win honestly.

Step 3 — Build the open benchmark repo
  Publish scripts + methodology + raw results on GitHub.
  Invite scrutiny. This is the highest-credibility move available.

Step 4 — Build the "Built Different" narrative on the landing page
  Specific, sourced, verifiable claims only.
  Let the data speak — never name competitors aggressively.

Step 5 — Maintain it
  Benchmarks go stale. Assign a release cadence for re-running audits.
```

---

## What to Audit (by tier)

### Tier 1 — Always measure, always publish

**Accessibility (axe-core + manual)**
- Automated axe-core scan across all components
- Keyboard navigation: can every interaction be completed by keyboard alone?
- Screen reader testing on key components: NVDA, VoiceOver
- WCAG 2.1 AA compliance matrix per component
- Publish as a dated, versioned public report — updated every release

**Angular modernity scorecard**
A binary yes/no matrix per library:

| Check                  | Angular Material | PrimeNG | Ng-Zorro | ui-lib-custom |
|------------------------|------------------|---------|----------|---------------|
| Signal inputs          | ?                | ?       | ?        | ✅             |
| Standalone components  | ?                | ?       | ?        | ✅             |
| OnPush by default      | ?                | ?       | ?        | ✅             |
| SSR-native             | ?                | ?       | ?        | ✅             |
| Zoneless-ready         | ?                | ?       | ?        | ✅             |
| No NgModule required   | ?                | ?       | ?        | ✅             |

Fill in the `?` cells when running the audit. Most competitors fail multiple columns — this is visually striking and immediately meaningful to any Angular developer.

**Bundle size & tree-shaking quality**
- Bytes per component imported in isolation
- Tool: `bundlephobia`, `size-limit`, custom webpack-bundle-analyzer
- Methodology: identical app, single component imported, minified + gzipped output

### Tier 2 — Measure, selectively publish

**API ergonomics benchmark**
Pick 5 real-world tasks and measure lines of code + TypeScript friction:
- Accessible modal with focus trap
- Data table with sort, filter, pagination
- Form with validation and error states
- Custom themed button set
- Accessible dropdown / select

Show side-by-side code comparisons on the landing page. No commentary needed — developers read code.

**SSR / Hydration compatibility matrix**
- Angular Universal
- App Engine SSR
- Partial hydration

**TypeScript quality**
- Strict generics flowing through form components
- Autocomplete accuracy for inputs and outputs
- Demonstrate through examples, not numbers

### Tier 3 — Internal only, do not publish

**Raw performance benchmarks (render time, FPS)**
Too easy to game. Too hard to maintain honestly. Competitors will dispute methodology.
Keep internal as a regression guard — do not publish as a marketing claim.

**Documentation quality comparisons**
Too subjective. Make your own docs so obviously better that no comparison is needed.

---

## What Goes on the Landing Page

### What works

**Verified, sourced claims in a "Built Different" section:**
> "0 axe-core violations across all components — audited against Angular Material, PrimeNG, and Ng-Zorro."
> "Signal-first APIs throughout — no legacy @Input/@Output decorators anywhere."
> "Full keyboard navigation on every interactive component, without exception."

**A live accessibility report page**
Dedicated page, updated each release, publicly dated.
This becomes a compounding proof point — every release makes it stronger.

**An open benchmark repo**
Link from the landing page. Scripts, methodology, raw output — all public.
Developers can reproduce every claim themselves.

**Side-by-side code comparisons**
Same task, your library vs the incumbent. No aggressive copy. Just the code.

### What to avoid

- GitHub stars comparison (you are newer — you lose this number, and it means nothing)
- "Most features" table (contradicts your vision of fewer, higher-quality components)
- Naming competitors aggressively — data does not need commentary
- Any claim you have not personally verified and can reproduce

---

## The Long-Term Compounding Effect

```
Publish the open benchmark repo
  → Developers reference it in community discussions
    → Your benchmarks become the standard others are measured against
      → You are no longer competing with Angular Material
        → You are the reference point Angular Material is compared to
```

That is the "take over" outcome — executed through credibility, not claims.

---

## Competitors to Audit

| Library          | Repo                              | Notes                                    |
|------------------|-----------------------------------|------------------------------------------|
| Angular Material | github.com/angular/components     | Official Google library, highest install base |
| PrimeNG          | github.com/primefaces/primeng     | Most features, most stars in Angular ecosystem |
| Ng-Zorro         | github.com/NG-ZORRO/ng-zorro-antd | Ant Design port, enterprise-focused      |
| Ng-Bootstrap     | github.com/ng-bootstrap/ng-bootstrap | Bootstrap wrapper, widely used         |

---

## Trigger for Execution

Do not start this process until:

- [ ] Internal axe-core audit complete and score is strong
- [ ] Component hardening milestone complete
- [ ] At least 80% of components at scorecard ≥ 8
- [ ] You are genuinely proud of the quality — not just feature-complete

Premature competitive publishing with an unfinished library is worse than silence.

---

## Related Documents

| Document | How it connects |
|---|---|
| [`COMPETITIVE_BENCHMARKS.md`](COMPETITIVE_BENCHMARKS.md) | The internal per-component parity tables — the evidence base this strategy draws on. **This file is the strategy; that file is the data.** |
| [`SCORING_CRITERIA.md`](SCORING_CRITERIA.md) | Category 11 (Competitive Parity & Differentiation) — the per-component scoring gate that tracks parity and 🚀 differentiators |
| [`ROADMAP.md`](ROADMAP.md) | Phase 4 is when this strategy executes — the benchmark repo goes public, the "Built Different" content lands |
| [`LAUNCH_STRATEGY.md`](LAUNCH_STRATEGY.md) | The full sequenced launch path — this strategy feeds into Step 5 (the launch event) |
| [`VISION.md`](VISION.md) | The positioning north star — every claim must be consistent with the vision |

> **Scope note:** This file covers competitive positioning against the **Angular ecosystem** (Angular Material, PrimeNG, Ng-Zorro, Ng-Bootstrap) for public-facing benchmarks. `COMPETITIVE_BENCHMARKS.md` covers internal API and a11y parity against **any UI library** including React-ecosystem references (Radix UI, Ark UI, Melt UI) — the best implementations regardless of framework. These are different audiences and different purposes; both are necessary.
