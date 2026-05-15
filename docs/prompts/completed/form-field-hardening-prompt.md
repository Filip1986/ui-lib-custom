# FormField — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/form-field` · `<ui-lib-form-field>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** FormField is the orchestrating wrapper — it MUST wire label, input, error message, and hint into a complete, screen-reader-friendly unit. This is the most impactful layout component for a11y.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/form-field/README.md`
3. Full source: `form-field.ts`, `form-field.html`, `form-field.scss`, `form-field.spec.ts`
4. Hardened siblings: `input/input.ts` (label + aria-invalid), `checkbox/checkbox.ts` (group)

---

## Step 2 — What is already present (do NOT regress these)

- Label slot projected to native `<label>` or `aria-labelledby` — VERIFY
- Error slot shown with `aria-live` or `role=alert` — VERIFY
- Hint slot shown with `aria-describedby` — VERIFY
- `invalid` state toggles `aria-invalid` on the inner input — VERIFY
- Module-level ID counter for `formFieldId` — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — The complete labeling + error + hint chain (CRITICAL)

The FormField must create this structure automatically:
```html
<div class="ui-lib-form-field">
  <label [for]="inputId" [id]="labelId">{{ label }}</label>
  <ng-content select="input, ui-lib-input, ..." />
  <span [id]="hintId" class="ui-lib-form-field__hint">{{ hint }}</span>
  <span [id]="errorId" class="ui-lib-form-field__error" role="alert">{{ error }}</span>
</div>
```

The inner input MUST receive:
- `[id]="inputId"` (set on the form-field or via token injection)
- `[attr.aria-describedby]="hintId"` (and `errorId` when invalid)
- `[attr.aria-invalid]="invalid"` (when invalid)
- `[attr.aria-required]="required"` (when required)

This can be achieved via Angular dependency injection (form-field token) so the inner
input component reads its context from the parent FormField.

#### Issue 2 — Error vs. hint IDs in aria-describedby (CRITICAL)
When both hint and error IDs must be referenced:
```
aria-describedby="formField1-hint formField1-error"
```
Both space-separated in the same attribute.

#### Issue 3 — role=alert on error element (CRITICAL)
```html
@if (invalid() && error()) {
  <span [id]="errorId" role="alert" class="ui-lib-form-field__error">
    {{ error() }}
  </span>
}
```

#### Deliverable — `form-field.a11y.spec.ts` (aim 25–35 tests)
- Label has htmlFor pointing to input id
- Hint id linked via aria-describedby on input
- Error has role=alert
- Error id linked via aria-describedby on input when invalid
- aria-invalid=true on input when FormField invalid input is set
- aria-required=true on input when FormField required input is set
- axe passes: default, with hint, invalid + error, disabled

---

### Phase 1 — Architecture Audit
- FormField provides a token that inner inputs inject to get their ids and state
- `inputId`, `labelId`, `hintId`, `errorId` all derived from module-level counter

### Phase 2 — DX Audit
README: token injection pattern, how to use with built-in inputs, how to use with native inputs.

### Phase 4 — Performance Audit
- All computed values, no subscriptions

### Phase 5 — Composability Audit
- Works with Input, Password, Select, AutoComplete, Checkbox, RadioGroup, Slider

### Phase 6 — Polish Audit
- [ ] Error animation (shake / slide-in) respects `prefers-reduced-motion`
- [ ] Required asterisk is `aria-hidden` (conveyed via `aria-required` instead)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/form-field/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/form-field/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add FormField row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
