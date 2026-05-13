# FloatLabel — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/float-label` · `<ui-lib-float-label>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Floating label pattern MUST NOT replace placeholder-only labeling. Label must remain readable at all states. Font size must stay ≥ 11px when floated to meet WCAG 1.4.4 (Resize Text).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/float-label/README.md`
3. Full source: `float-label.ts`, `float-label.html`, `float-label.scss`, `float-label.spec.ts`
4. Hardened siblings: `input/input.ts` (label association)

---

## Step 2 — What is already present (do NOT regress these)

- Floating label bound to input focus and non-empty value states — VERIFY
- `<label>` is a real `<label>` element with `for` pointing to the input — VERIFY
- Float animation respects `prefers-reduced-motion` — VERIFY
- Floated label text is still visible (contrast, size) — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Real `<label for="inputId">` (CRITICAL)
The floating label MUST be a real `<label>` element, not a styled `<span>` or `<div>`.
A `<span>` requires `role="presentation"` workarounds and loses native association semantics.

#### Issue 2 — Colors at floated position (CRITICAL)
When the label floats above the input, verify:
- Text color meets 4.5:1 contrast against background (WCAG 1.4.3)
- Font size is ≥ 11px (WCAG 1.4.4 at 200% zoom)

#### Issue 3 — prefers-reduced-motion (CRITICAL)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-float-label label {
    transition: none;
  }
}
```

#### Issue 4 — Screen reader reading label in both states (MODERATE)
The label is always in the DOM (it just moves via CSS). Verify screen readers do not
announce it twice or as a separate element in unexpected ways.

#### Deliverable — `float-label.a11y.spec.ts` (aim 15–20 tests)
- label element has htmlFor pointing to input id
- Label is readable when floated (visual check / CSS vars)
- axe passes: default (with input inside), focused state, filled state

---

### Phase 1 — Architecture Audit
- `for` / `inputId` input on FloatLabel; or content-projected `<label>` approach

### Phase 2 — DX Audit
README: how to use FloatLabel wrapping ui-lib-input, a11y constraints, prefers-reduced-motion note.

### Phase 4 — Performance Audit
- Float state is CSS-only when possible (`:focus-within`, `:not(:placeholder-shown)`)
- JS-driven fallback only when CSS pseudo-class is insufficient

### Phase 5 — Composability Audit
- Works with Input, Password, Select, AutoComplete, InputNumber

### Phase 6 — Polish Audit
- [ ] Float animation easing matches design token
- [ ] Background-clip or painted background behind label text in Material style

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/float-label/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/float-label/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add FloatLabel row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
