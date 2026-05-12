# InputOtp — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/input-otp` · `<ui-lib-input-otp>`
**Queue position:** Tier 5, #49
**Generated:** 2026-05-12
**Key a11y concern:** Sequential focus management between digit cells, group label for the whole OTP field, paste handling announcement, `aria-label` per cell with position context.
**Based on lessons from:** Input (#21), Password (#29).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/input-otp/README.md`
3. Full source: `input-otp.ts`, `input-otp.html`, `input-otp.scss`, `input-otp.spec.ts`
4. Hardened sibling: `input.ts` (label association, aria-invalid, aria-describedby pattern)

---

## Step 2 — Inventory (build from source, do not assume)

- Group wrapper: `role="group"` + `aria-label` ← VERIFY
- Each cell `<input>`: `aria-label` with position context ← VERIFY (CRITICAL)
- Auto-advance on character entry ← VERIFY
- Backspace to go back ← VERIFY
- Paste handling: fills all cells, announces completion ← VERIFY
- `aria-invalid` on error ← VERIFY
- `aria-describedby` for error message ← VERIFY
- `prefers-reduced-motion` ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Group wrapper (CRITICAL)
```html
<div
  role="group"
  [attr.aria-label]="ariaLabel() ?? 'One-time passcode'"
  [attr.aria-labelledby]="ariaLabelledBy() || null"
  [attr.aria-describedby]="errorDescribedBy()"
>
```

#### Issue 2 — Per-cell accessible names (CRITICAL)
Each cell input must describe its position:
```html
<input
  type="text"
  inputmode="numeric"
  maxlength="1"
  [attr.aria-label]="'Digit ' + (i + 1) + ' of ' + length()"
  [attr.aria-invalid]="invalid() ? 'true' : null"
>
```
`aria-label` on each cell prevents ambiguity — screen readers won't just announce "edit text" with no context.

#### Issue 3 — Sequential focus management (CRITICAL)
- On valid character input → advance focus to `index + 1`
- On Backspace with empty cell → retreat focus to `index - 1`
- On paste → fill all cells then move focus to last + 1 or submit

This MUST be unit-tested because incorrectly handled focus is a common regression.

#### Issue 4 — Paste announcement (MODERATE)
After a successful paste, announce via a polite live region:
```html
<span aria-live="polite" aria-atomic="true" class="sr-only">
  @if (justPasted()) { Code entered. }
</span>
```

#### Issue 5 — Error/validation (MODERATE)
```typescript
protected readonly errorDescribedBy = computed<string | null>(
  (): string | null => this.invalid() ? `${this.otpId}-error` : null
);
```
```html
@if (invalid()) {
  <span [id]="otpId + '-error'" role="alert" class="ui-lib-input-otp__error">
    <ng-content select="[inputOtpError]" />
  </span>
}
```

#### Issue 6 — `prefers-reduced-motion` (LOW)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-input-otp__cell { transition: none; }
}
```

---

## A11y Spec (aim for 18–26 tests)

Create `input-otp.a11y.spec.ts`:
- Group has `role="group"` + `aria-label`
- Each cell has position-aware `aria-label`
- Focus advances to next cell on valid input
- Focus retreats to previous cell on Backspace
- `aria-invalid="true"` on all cells when invalid
- Error element has `role="alert"`
- Paste fills all cells and moves focus
- axe-core: default, invalid, filled states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Module-level ID counter, SSR-safe (no `document` in constructor), signal correctness.
**Phase 2:** README with paste behaviour, error usage, i18n label inputs, `inputmode` table.
**Phase 4:** `computed` for error IDs, stable cell array.
**Phase 5:** Custom cell template (for masked/password OTP).
**Phase 6:** Focus ring on each cell, error state visual syncs with `aria-invalid`, smooth transitions.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/input-otp/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=input-otp --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — InputOtp #49 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **VirtualScroller hardening (Tier 5, #50)**.

