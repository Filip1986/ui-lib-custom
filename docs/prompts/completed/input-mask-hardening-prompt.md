# InputMask — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/input-mask` · `<ui-lib-input-mask>`
**Queue position:** Core Inputs (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Mask format hint via `aria-describedby`, `aria-invalid` for incomplete masks, label association. Blocked characters must not disappear silently.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/input-mask/README.md`
3. Full source: `input-mask.ts`, `input-mask.html`, `input-mask.scss`, `input-mask.spec.ts`
4. Hardened siblings: `input/input.ts` (label + aria-invalid pattern)

---

## Step 2 — What is already present (do NOT regress these)

- Native `input[type=text]` with mask applied — VERIFY
- Label association via `aria-label` / `aria-labelledby` — VERIFY
- `aria-invalid` for invalid mask values — VERIFY
- `aria-describedby` pointing to a mask format hint — VERIFY
- `prefers-reduced-motion` in SCSS — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Format hint via aria-describedby (CRITICAL)
The mask format (e.g., "(999) 999-9999" for a phone) MUST be announced to screen readers.
Add a visually hidden hint element linked via `aria-describedby`:
```html
<input [attr.aria-describedby]="hintId()" />
<span [id]="hintId()" class="ui-lib-sr-only">Format: {{ maskHint() }}</span>
```

#### Issue 2 — aria-invalid for incomplete mask (CRITICAL)
When the user leaves a field with an incomplete mask, set `aria-invalid="true"` and link
to an error element via `aria-describedby`.

#### Issue 3 — Label association (CRITICAL)
Same pattern as Input: `ariaLabel` / `ariaLabelledBy` inputs; never rely on placeholder alone.

#### Issue 4 — Mask placeholder characters and screen readers (MODERATE)
Verify that mask placeholders (underscores, dashes, parentheses in the empty positions)
do NOT pollute the announced value. Only user-typed characters should be in the value.

#### Issue 5 — prefers-reduced-motion (MODERATE)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-input-mask { transition: none; }
}
```

#### Deliverable — `input-mask.a11y.spec.ts` (aim 20–28 tests)
- `aria-describedby` links to mask format hint
- `aria-invalid` set on incomplete/invalid mask
- Label association works
- axe passes: default (with label), invalid, disabled

---

### Phase 1 — Architecture Audit
- Module-level ID counter: `let nextInputMaskId: number = 0`
- `hintId` computed from instance ID

### Phase 2 — DX Audit
README: mask syntax table, format hint input, security note for sensitive data.

### Phase 4 — Performance Audit
- Mask processing runs in a pure function, not on every change detection cycle

### Phase 5 — Composability Audit
- Works inside `<ui-lib-form-field>` wrapper
- Error slot for rich error content

### Phase 6 — Polish Audit
- [ ] Mask placeholder color uses `--uilib-input-mask-placeholder-color`
- [ ] Focus ring on native input

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/input-mask/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/input-mask/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add InputMask row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
