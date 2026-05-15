# Input — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/input` · `<ui-lib-input>`
**Queue position:** Tier 3, #21
**Generated:** 2026-05-11
**Key a11y concern:** Label association, `aria-invalid`, `aria-describedby` for error/hint messages, `aria-required`, `aria-disabled` vs `disabled`, `aria-readonly`.
**Based on lessons from:** Checkbox (#22), RadioButton (#23), Password (#29), InputNumber (#26), all Tier 1 hardenings.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/input/README.md`
3. Full source: `input.ts`, `input.html`, `input.scss`, `input.types.ts`, `input.spec.ts`
4. Hardened siblings for patterns:
   - `projects/ui-lib-custom/src/lib/password/password.ts` (label association + aria-invalid pattern)
   - `projects/ui-lib-custom/src/lib/input-number/input-number.ts` (spinbutton ARIA reference)

---

## Step 2 — What is already present (do NOT regress these)

Read the source to build the actual inventory before writing any code.

Key items to verify (check what is present, what is missing):
- `[attr.aria-label]` or label association via `for`/`id` ← VERIFY
- `[attr.aria-invalid]` for validation errors ← VERIFY
- `[attr.aria-describedby]` for error/hint message association ← VERIFY
- `[attr.aria-required]` ← VERIFY
- `[attr.aria-disabled]` vs `disabled` attribute ← VERIFY
- `[attr.aria-readonly]` ← VERIFY
- `[attr.aria-autocomplete]` if autocomplete is supported ← VERIFY
- `placeholder` attribute and relationship to label ← VERIFY
- `prefers-reduced-motion` ← VERIFY (likely missing)

---

## Step 3 — The 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

---

#### Issue 1 — Label association (CRITICAL)

**Problem:** An `<input>` MUST have an accessible name. The three valid approaches in priority order:
1. Native `<label for="inputId">` (preferred — robust, WCAG AA)
2. `aria-labelledby` pointing to a visible label element
3. `aria-label` (last resort — no visible label)

**Audit:** Verify which approach is used. If the component renders a native `<input>` with a dynamic ID,
ensure a companion `<label>` can be provided by the consumer either via:
- A `label` input that renders a native `<label>` inside the component, or
- Documented `ariaLabel`/`ariaLabelledBy` inputs for consumer-provided labeling.

The `placeholder` attribute must NEVER serve as the accessible name alone (WCAG 3.3.2, 1.3.5).

**Fix:** If no label association mechanism exists, add:
```typescript
public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
```

Bind in the template:
```html
[attr.aria-label]="ariaLabel() || null"
[attr.aria-labelledby]="ariaLabelledBy() || null"
```

---

#### Issue 2 — `aria-invalid` and `aria-describedby` for validation (CRITICAL)

**Problem:** When a form field has a validation error, the input needs:
1. `aria-invalid="true"` on the `<input>` element
2. `aria-describedby` pointing to the error message element's `id`

This is how screen readers announce "this field has an error" and then read the error text.

**Fix:**
```typescript
public readonly invalid: InputSignal<boolean> = input<boolean>(false);
public readonly errorId: Signal<string | null> = computed<string | null>(
  (): string | null => this.invalid() ? `${this.inputId}-error` : null
);
```

In template:
```html
<input
  [attr.aria-invalid]="invalid() ? 'true' : null"
  [attr.aria-describedby]="errorId()"
/>
@if (invalid()) {
  <span [id]="inputId + '-error'" class="ui-lib-input__error" role="alert">
    <ng-content select="[inputError]" />
  </span>
}
```

Or use `aria-describedby` pointing to a hint span even without error state.

---

#### Issue 3 — `aria-required` for required fields (MODERATE)

**Fix:** Add `required` input and bind `aria-required`:
```typescript
public readonly required: InputSignal<boolean> = input<boolean>(false);
```
```html
[attr.aria-required]="required() ? 'true' : null"
```

---

#### Issue 4 — `aria-disabled` vs `disabled` semantics (MODERATE)

**Problem:** `disabled` attribute removes the element from the tab order and prevents interaction.
`aria-disabled="true"` keeps it in the tab order (keyboard-accessible for discovery) but marks it
as inert. Use `disabled` for truly disabled fields and `aria-disabled` when you want keyboard users
to be able to read the value but not edit it.

**Full guidance:**
- Use native `disabled` for normal disabled state (form submission exempt, no tab stop).
- Use `aria-readonly="true"` + `tabindex="0"` for readonly (still submits, still discoverable).
- Document the difference in the README.

---

#### Issue 5 — `prefers-reduced-motion` (MODERATE)

Add at end of `input.scss` if any animations/transitions are present:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-input {
    transition: none;
  }
}
```

---

#### Deliverable — `input.a11y.spec.ts`

**Spec structure (aim for 25–35 tests):**

```
describe('Input Accessibility')
  describe('label association')
    ✓ input has accessible name via ariaLabel input
    ✓ input has accessible name via ariaLabelledBy input
    ✓ input id is unique per instance
  describe('validation state')
    ✓ aria-invalid="true" when invalid input is set
    ✓ aria-invalid is absent when not invalid
    ✓ aria-describedby points to the error message element id
    ✓ error element has role="alert"
  describe('required')
    ✓ aria-required="true" when required input is set
  describe('disabled/readonly')
    ✓ disabled input has the native disabled attribute
    ✓ readonly input has aria-readonly="true"
  describe('axe-core automated checks')
    ✓ passes axe — default state with ariaLabel
    ✓ passes axe — invalid state
    ✓ passes axe — disabled state
    ✓ passes axe — readonly state
```

---

### Phase 1 — Architecture Audit

1. **Module-level ID counter** — `let nextInputId: number = 0` for unique instance IDs.
2. **`inputId` exposed as public** — consumers can reference it for external label elements.
3. **No circular `aria-describedby`** — verify the error element id doesn't collide with other elements.

### Phase 2 — DX Audit

README improvements:
1. Label association options — native label, ariaLabel, ariaLabelledBy.
2. Error slot documentation.
3. `required`, `disabled`, `readonly` input table.
4. CSS custom properties table.

### Phase 4 — Performance Audit

- `computed<...>` for all derived ARIA values. ✅
- No unnecessary DOM queries on every render.

### Phase 5 — Composability Audit

- Content projection slot for prefix/suffix addons.
- Error message slot for rich error content.
- Hint text slot for description text.

### Phase 6 — Polish Audit

- [ ] `:focus-visible` ring on the native input
- [ ] Error state visual (red border) syncs with `aria-invalid`
- [ ] `prefers-reduced-motion` (added Phase 3)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/input/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/input/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring & Step 6 — Handoff

After all phases, update `docs/COMPONENT_SCORES.md` (Input Tier 3 #21 → ✅ Done) and append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **Table hardening (Tier 4, #32)**.

