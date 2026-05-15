# Password — 6-Phase Hardening Prompt (Formal Scoring)

**Component:** `ui-lib-custom/password` · `<ui-lib-password>`
**Queue position:** Tier 3, #29 — listed as "hardened without dedicated prompt file" but no scores exist. This session runs the full 6-phase workflow to produce formal scores.
**Generated:** 2026-05-13
**Key a11y concern:** Strength meter live region, visibility toggle button label, label association, `aria-invalid`.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/password/README.md`
3. Full source: `password.ts`, `password.html`, `password.scss`, `password.spec.ts`
4. Hardened siblings: `input/input.ts` (label + aria-invalid), `button/button.ts` (icon-only label)

---

## Step 2 — What is already present (do NOT regress these)

- Visibility toggle button has "Show password" / "Hide password" label — VERIFY
- Strength meter uses `aria-live` or `role=status` — VERIFY
- Label association via `aria-label` / `aria-labelledby` — VERIFY
- `aria-invalid` for validation state — VERIFY
- `aria-describedby` links to strength meter and/or error — VERIFY
- `prefers-reduced-motion` for strength bar fill animation — VERIFY
- `inputType` computed signal switching between `text` and `password` — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Visibility toggle button label (CRITICAL)
The toggle button renders only an icon. It MUST have an accessible label that changes with state:
- When password is hidden: `aria-label="Show password"`
- When password is visible: `aria-label="Hide password"`
Never use a generic "Toggle" or the icon name as the label.

#### Issue 2 — Strength meter as live region (CRITICAL)
The password strength indicator changes as the user types. Screen readers need to announce it:
```html
<div role="status" aria-live="polite" aria-atomic="true"
     class="ui-lib-password__strength-announcement">
  Password strength: {{ strengthLabel() }}
</div>
```
Use `role=status` (polite) not `role=alert` (assertive) — strength updates are not urgent.

#### Issue 3 — Label association (CRITICAL)
Same pattern as Input: `ariaLabel` / `ariaLabelledBy` inputs; placeholder NOT used as name.

#### Issue 4 — aria-invalid and aria-describedby (CRITICAL)
When the field has a validation error, set `aria-invalid="true"` and link to error element.

#### Issue 5 — prefers-reduced-motion (MODERATE)
Strength bar fill animation and any transition on the eye icon must be suppressed.

#### Deliverable — `password.a11y.spec.ts` (aim 25–35 tests)
- Toggle button has "Show password" / "Hide password" aria-label
- Strength meter has `role=status`
- Strength announcement text changes as value changes
- Label association (ariaLabel / ariaLabelledBy) works
- `aria-invalid` and `aria-describedby` work on the input
- axe passes: default (with label), invalid, disabled, password visible

---

### Phase 1 — Architecture Audit
- Module-level ID counter: `let nextPasswordId: number = 0`
- `inputType` as `computed<'text' | 'password'>` (not manual string assignment)
- `strengthLabel` as `computed<string>` from value signal

### Phase 2 — DX Audit
README: visibility toggle accessible name, strength meter, `ariaLabel` requirement, all inputs table.

### Phase 4 — Performance Audit
- Strength computed on value signal, no manual subscriptions

### Phase 5 — Composability Audit
- Strength meter slot (custom strength indicator)
- Error slot for rich error content

### Phase 6 — Polish Audit
- [ ] Strength bar fill animation respects `prefers-reduced-motion`
- [ ] Color alone NOT used for strength levels — text label is always present
- [ ] Focus ring is `:focus-visible`

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/password/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/password/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, update `docs/COMPONENT_SCORES.md` Password row (🟡 → 🟢) and append handoff to `AI_AGENT_CONTEXT.md`.
