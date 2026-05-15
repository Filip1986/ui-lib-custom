# Inline — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/layout` · `<ui-lib-inline>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Same as Stack — no landmark pollution, `as` tag input semantics, wrap + reading order.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/layout/README.md`
3. Full source: `layout/inline.ts`, `layout/inline.html`, `layout/inline.scss`, `layout/inline.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- Horizontal flex layout with wrapping — VERIFY
- `gap` input using spacing tokens — VERIFY
- `align` input (center, start, end, baseline, stretch) — VERIFY
- `as` / `tag` input — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — No landmark pollution (CRITICAL)
Default tag is `<div>`. Document that `as="span"` creates inline context for inline content.

#### Issue 2 — Wrap + reading order (MODERATE)
When items wrap, DOM order must match visual/reading order. Document this constraint.

#### Deliverable — `inline.a11y.spec.ts` (aim 10–15 tests)
- Default render is a div, no spurious roles
- axe passes: default

---

### Phase 1 — Architecture Audit
Similar to Stack but defaults to horizontal flex with wrap.

### Phase 2 — DX Audit
README: difference between Inline and Stack, when to use each, usage recipes.

### Phase 4 — Performance Audit
- Host binding only, no extra DOM node when unnecessary

### Phase 5 — Composability Audit
- Works inside Stack, Grid, Container

### Phase 6 — Polish Audit
- [ ] Consistent gap token usage with Stack

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/layout/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/layout/inline" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Inline row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
