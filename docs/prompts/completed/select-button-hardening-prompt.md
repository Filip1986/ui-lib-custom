# SelectButton — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/select-button` · `<ui-lib-select-button>`
**Queue position:** Tier 5, #48
**Generated:** 2026-05-12
**Key a11y concern:** `role=group` wrapping the button set, each button uses `aria-pressed` (toggle button pattern) or `role=radio`/`role=option`, keyboard navigation between options.
**Based on lessons from:** RadioButton (#23), Checkbox (#22), Tabs (#17).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/select-button/README.md`
3. Full source: `select-button.ts`, `select-button.html`, `select-button.scss`, `select-button.spec.ts`
4. Hardened siblings: `radio-button.ts` (radiogroup pattern), `checkbox.ts` (group pattern)

---

## Step 2 — Inventory (build from source, do not assume)

- Outer wrapper: `role="group"` + `aria-label`/`aria-labelledby` ← VERIFY
- Single-select buttons: `aria-pressed` or `role="radio"` ← VERIFY
- Multi-select buttons: `aria-pressed` ← VERIFY
- Arrow-key navigation (for radio pattern) ← VERIFY
- `aria-disabled` on disabled options ← VERIFY
- `prefers-reduced-motion` ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Choose the right ARIA pattern (CRITICAL)
Two valid approaches depending on semantic intent:

**Option A — Toggle button group** (more flexible, supports multi-select):
```html
<div role="group" [attr.aria-label]="ariaLabel()">
  <button [attr.aria-pressed]="isSelected(option)">{{ option.label }}</button>
```
Each button is independent; Tab moves between them.

**Option B — Radio group** (single-select only, stricter but more semantic):
```html
<div role="radiogroup" [attr.aria-label]="ariaLabel()">
  <button role="radio" [attr.aria-checked]="isSelected(option)">{{ option.label }}</button>
```
Arrow keys move between options (Roving tabindex); only the selected item is in the tab order.

**Recommendation:** Use Option A (toggle group) for multi-select mode; use Option B (radiogroup) for single-select mode. Both must be supported if the component has a `multiple` input.

#### Issue 2 — Group label (CRITICAL)
The component MUST receive an accessible name for the group:
```typescript
public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
```
Document that at least one of these is required.

#### Issue 3 — Disabled option state (MODERATE)
```html
<button
  [disabled]="option.disabled || null"
  [attr.aria-disabled]="option.disabled ? 'true' : null"
>
```

#### Issue 4 — Roving tabindex for radiogroup mode (MODERATE)
When `role="radiogroup"`, only the currently selected (or first) item should have `tabindex="0"`. All others get `tabindex="-1"`. Arrow keys move focus between them.

#### Issue 5 — `prefers-reduced-motion` (LOW)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-select-button__option { transition: none; }
}
```

---

## A11y Spec (aim for 16–22 tests)

Create `select-button.a11y.spec.ts`:
- Group has `role="group"` (single mode) or `role="radiogroup"` (if applicable)
- Group has accessible name
- Selected button has `aria-pressed="true"` or `aria-checked="true"`
- Disabled option has `aria-disabled="true"`
- Arrow keys navigate in radiogroup mode
- Tab moves focus in toggle-group mode
- axe-core: single-select, multi-select, disabled option states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Roving tabindex management, signal correctness, SSR-safe.
**Phase 2:** README with ARIA pattern table for single vs multi-select, group label requirement.
**Phase 4:** `computed` for tabindex map; avoid re-render on every keystroke.
**Phase 5:** Custom option template via `ng-template`.
**Phase 6:** Active state visual contrast ≥ 3:1, focus ring clearly visible.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/select-button/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=select-button --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — SelectButton #48 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **InputOtp hardening (Tier 5, #49)**.

