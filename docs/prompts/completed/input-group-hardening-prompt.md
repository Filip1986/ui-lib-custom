# InputGroup — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/input-group` · `<ui-lib-input-group>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Addons (text/button) MUST NOT be focusable if they are purely decorative; addon buttons MUST have `aria-label`; the input label still targets the correct input not the addon.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/input-group/README.md`
3. Full source: `input-group.ts`, `input-group.html`, `input-group.scss`, `input-group.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- Left/right addon slots (text prefix/suffix, button addon) — VERIFY
- Decorative text addons are `aria-hidden="true"` — VERIFY
- Button addons have accessible labels — VERIFY
- The input inside the group has a label — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Decorative text addons (CRITICAL)
A text addon like "$" or "https://" is decorative context. Users do NOT need to navigate to it.
- Wrap in `<span aria-hidden="true">` to remove from accessibility tree.
- The input label or `aria-describedby` should communicate the context if needed.

#### Issue 2 — Button addons with label (CRITICAL)
A button addon (e.g., "Copy", "Submit", calendar trigger) MUST have an `aria-label` if it has no visible text.
Ensure the button addon is a real `<button>` element, not a `<div>`.

#### Issue 3 — Label still targets the input (CRITICAL)
The `<label for="inputId">` must point to the `<input>` id, NOT to the group container.

#### Deliverable — `input-group.a11y.spec.ts` (aim 10–15 tests)
- Text addon has aria-hidden="true"
- Button addon has accessible label
- Label targets input, not group
- axe passes: default

---

### Phase 1 — Architecture Audit
- Addon slots: `[addonLeft]`, `[addonRight]` projection

### Phase 2 — DX Audit
README: decorative vs. interactive addon guidance, button label requirement.

### Phase 4 — Performance Audit
- No JS measurements; pure CSS flex layout

### Phase 5 — Composability Audit
- Works with Input, InputMask, InputNumber, Password

### Phase 6 — Polish Audit
- [ ] Border radius spans the full group (first and last child)
- [ ] Focus ring on inner input, not on group

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/input-group/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/input-group/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add InputGroup row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
