# ClassNames — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/class-names` · directive or utility
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Minimal — ClassNames is a utility for conditional class binding. Verify it does not strip `aria-*` attributes or ARIA-relevant classes. No a11y spec tests needed beyond axe pass.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/class-names/README.md`
3. Full source: `class-names.ts`, `class-names.spec.ts`

---

## Step 3 — The 6-phase workflow (abbreviated — utility component)

### Phase 3 — Accessibility Audit

#### Issue 1 — No interference with ARIA (CRITICAL)
Verify that ClassNames utility does NOT:
- Remove or override existing classes that carry ARIA state meaning (`.is-expanded`, `.is-disabled`)
- Cause any style conflicts that make ARIA-meaningful hidden content visible

#### Deliverable
No dedicated `.a11y.spec.ts` required. Existing unit tests cover the utility's behavior.

---

### Phase 1 — Architecture Audit
- API: accepts object `{ [className]: boolean }` or array or string — document consistently
- Standalone directive or pure function? Clarify and document.

### Phase 2 — DX Audit
README: supported input formats, usage examples with ngClass comparison.

### Phase 4 — Performance Audit
- No DOM manipulation on every change detection; uses HostBinding or Angular renderer

### Phase 5 — Composability Audit
- Works on any host element

### Phase 6 — Polish Audit
- [ ] Clear TypeScript types for all input formats

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/class-names/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/class-names/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add ClassNames row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
