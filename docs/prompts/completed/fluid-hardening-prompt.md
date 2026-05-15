# Fluid — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/fluid` · `<ui-lib-fluid>` or directive
**Queue position:** Layout/Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Minimal — Fluid makes children fill available width. Verify no clipping of content at any zoom level (WCAG 1.4.4, 1.4.10 Reflow).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/fluid/README.md`
3. Full source: `fluid.ts`, `fluid.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `width: 100%` applied to host or children — VERIFY
- No content clipping at 400% zoom — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — 400% zoom reflow (CRITICAL, WCAG 1.4.10)
At 400% browser zoom, Fluid containers must not cause horizontal scrolling on a 320px-wide viewport.
Run a manual check and document the results.

#### Issue 2 — No overflow clipping (CRITICAL)
`overflow: hidden` must NOT be applied. Content must reflow, not be clipped.

#### Deliverable — `fluid.a11y.spec.ts` (aim 5–10 tests)
- Host has expected width behavior
- axe passes: default

---

### Phase 1 — Architecture Audit
- Is this a component or an attribute directive? Document the preferred usage.

### Phase 2 — DX Audit
README: difference between Fluid and Container, when to use each.

### Phase 4 — Performance Audit
- :host binding only, no JS required

### Phase 5 — Composability Audit
- Works inside Stack, Grid, FormField

### Phase 6 — Polish Audit
- [ ] Works at 400% zoom (WCAG 1.4.10)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/fluid/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/fluid/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Fluid row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
