# Bind — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/bind` · directive or utility
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Minimal — Bind is a template variable binding utility. Verify it does not interfere with ARIA attributes or accessibility-sensitive DOM mutations.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/bind/README.md`
3. Full source: `bind.ts`, `bind.spec.ts`

---

## Step 3 — The 6-phase workflow (abbreviated — utility)

### Phase 3 — Accessibility Audit

#### Issue 1 — No interference with ARIA (CRITICAL)
Verify that Bind does NOT:
- Override `aria-*` attribute bindings
- Clear host bindings set by other directives
- Cause spurious change detection that removes accessibility attributes

#### Deliverable
No dedicated `.a11y.spec.ts` required if Bind is purely a template utility.

---

### Phase 1 — Architecture Audit
- Document what Bind does: template variable binding, context injection, or `as` alias
- Explicit return types on all methods

### Phase 2 — DX Audit
README: clear purpose statement, usage examples vs. native Angular alternatives.

### Phase 4 — Performance Audit
- Pure pipe or structural directive? Choose the most efficient pattern.

### Phase 5 — Composability Audit
- Works inside `@for`, `@if`, `@switch` contexts

### Phase 6 — Polish Audit
- [ ] TypeScript types are fully generic (no `any`)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/bind/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/bind/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Bind row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
