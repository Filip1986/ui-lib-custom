# IconField — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/icon-field` · `<ui-lib-icon-field>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Icon inside input field MUST be `aria-hidden` if decorative; if informative, it MUST have a tooltip or visually hidden label; icon does NOT intercept input focus.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/icon-field/README.md`
3. Full source: `icon-field.ts`, `icon-field.html`, `icon-field.scss`, `icon-field.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- Icon positioned inside input border without covering input — VERIFY
- Icon is `aria-hidden="true"` when decorative — VERIFY
- Input padding accounts for icon width — VERIFY
- Icon does not intercept pointer events on the input — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Decorative icons must be aria-hidden (CRITICAL)
Search icon, calendar icon, user icon inside a field are almost always decorative.
Any icon inside IconField must have `aria-hidden="true"` unless it carries unique meaning
that is NOT conveyed by the input label.

#### Issue 2 — Informative icons need a label (CRITICAL)
If the icon conveys important meaning (e.g., error icon, warning icon), it must either:
- Have its meaning conveyed by the input label / `aria-describedby`
- Or have `aria-label` on the icon element (rare, only if truly standalone)

#### Issue 3 — Icon does not receive focus (MODERATE)
The icon element must have `tabindex="-1"` (or be a non-focusable `<span>`).
It must NOT intercept a click that the user intended for the input.

#### Deliverable — `icon-field.a11y.spec.ts` (aim 10–15 tests)
- Icon element has aria-hidden="true" by default
- Icon does not receive focus (tabindex=-1 or not focusable)
- Input padding is increased when icon present
- axe passes: default

---

### Phase 1 — Architecture Audit
- `iconPosition`: `'left' | 'right'`
- `icon` slot for projected icon component

### Phase 2 — DX Audit
README: decorative vs. informative icon guidance, pointer-events note, padding adjustment.

### Phase 4 — Performance Audit
- `:host` binding for padding var, no JS required

### Phase 5 — Composability Audit
- Works with Input, Password, InputMask, InputNumber

### Phase 6 — Polish Audit
- [ ] Icon color uses `--uilib-icon-field-icon-color`
- [ ] No layout shift when icon appears

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/icon-field/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/icon-field/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add IconField row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
