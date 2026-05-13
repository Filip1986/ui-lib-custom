# Textarea — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/textarea` · `<ui-lib-textarea>`
**Queue position:** Core Inputs (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Label association, `aria-invalid`, `aria-describedby`, `aria-required`, `aria-readonly`, `aria-disabled`, resize announcement.
**Based on lessons from:** Input (#21), Password (#29), Checkbox (#22) hardenings.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/textarea/README.md`
3. Full source: `textarea.ts`, `textarea.html`, `textarea.scss`, `textarea.spec.ts`
4. Hardened siblings for patterns:
   - `projects/ui-lib-custom/src/lib/input/input.ts` (label + aria-invalid pattern — closest sibling)
   - `projects/ui-lib-custom/src/lib/password/password.ts` (strength meter live region reference)

---

## Step 2 — What is already present (do NOT regress these)

Read the source to build the actual inventory before writing any code.

Key items to verify (check what is present, what is missing):
- `[attr.aria-label]` / `[attr.aria-labelledby]` or label association via `for`/`id` ← VERIFY
- `[attr.aria-invalid]` for validation errors ← VERIFY
- `[attr.aria-describedby]` for error/hint message association ← VERIFY
- `[attr.aria-required]` ← VERIFY
- `[attr.aria-disabled]` vs native `disabled` ← VERIFY
- `[attr.aria-readonly]` ← VERIFY
- `rows` / `cols` / auto-resize inputs ← VERIFY
- `prefers-reduced-motion` for any resize animations ← VERIFY (likely missing)
- Module-level ID counter for unique instance IDs ← VERIFY

---

## Step 3 — The 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

---

#### Issue 1 — Label association (CRITICAL)

**Problem:** A `<textarea>` MUST have an accessible name. Priority order:
1. Native `<label for="textareaId">` (preferred)
2. `aria-labelledby` pointing to a visible label element
3. `aria-label` (last resort — no visible label)

`placeholder` MUST NOT serve as the accessible name alone (WCAG 3.3.2, 1.3.5).

**Fix:** If no label association mechanism exists, add:
```typescript
public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
protected readonly textareaId: string = `ui-lib-textarea-${++nextTextareaId}`;
```

Bind in the template:
```html
[id]="textareaId"
[attr.aria-label]="ariaLabel() || null"
[attr.aria-labelledby]="ariaLabelledBy() || null"
```

---

#### Issue 2 — `aria-invalid` and `aria-describedby` for validation (CRITICAL)

**Fix:**
```typescript
public readonly invalid: InputSignal<boolean> = input<boolean>(false);
protected readonly errorId: Signal<string | null> = computed<string | null>(
  (): string | null => this.invalid() ? `${this.textareaId}-error` : null
);
```

In template:
```html
<textarea
  [attr.aria-invalid]="invalid() ? 'true' : null"
  [attr.aria-describedby]="errorId()"
/>
@if (invalid()) {
  <span [id]="textareaId + '-error'" class="ui-lib-textarea__error" role="alert">
    <ng-content select="[textareaError]" />
  </span>
}
```

---

#### Issue 3 — `aria-required` and `aria-readonly` (MODERATE)

```typescript
public readonly required: InputSignal<boolean> = input<boolean>(false);
public readonly readonly: InputSignal<boolean> = input<boolean>(false);
```
```html
[attr.aria-required]="required() ? 'true' : null"
[attr.aria-readonly]="readonly() ? 'true' : null"
[attr.readonly]="readonly() ? '' : null"
```

---

#### Issue 4 — Auto-resize announcements (LOW)

If auto-resize is implemented (textarea grows as user types), it must not cause disruptive
re-announces. Ensure no live region fires on every keystroke for height changes.

---

#### Issue 5 — `prefers-reduced-motion` (MODERATE)

```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-textarea {
    transition: none;
    resize: none; // suppress animated resize if JS-driven
  }
}
```

---

#### Deliverable — `textarea.a11y.spec.ts`

**Spec structure (aim for 20–30 tests):**

```
describe('Textarea Accessibility')
  describe('label association')
    ✓ textarea has accessible name via ariaLabel input
    ✓ textarea has accessible name via ariaLabelledBy input
    ✓ textarea id is unique per instance
  describe('validation state')
    ✓ aria-invalid="true" when invalid is set
    ✓ aria-invalid is absent when not invalid
    ✓ aria-describedby points to the error element id
    ✓ error element has role="alert"
  describe('required')
    ✓ aria-required="true" when required is set
  describe('readonly/disabled')
    ✓ readonly textarea has aria-readonly="true"
    ✓ disabled textarea has native disabled attribute
  describe('axe-core automated checks')
    ✓ passes axe — default state with ariaLabel
    ✓ passes axe — invalid state
    ✓ passes axe — disabled state
    ✓ passes axe — readonly state
```

---

### Phase 1 — Architecture Audit

1. **Module-level ID counter** — `let nextTextareaId: number = 0` above the class.
2. **`textareaId` signal or `protected` field** exposed for external label elements.
3. **`rows` / `maxRows` / `autoResize` inputs** — verify types and defaults.

### Phase 2 — DX Audit

README improvements:
1. Label association options — native label, ariaLabel, ariaLabelledBy.
2. Error slot + hint slot documentation.
3. `required`, `disabled`, `readonly`, `autoResize` input table.
4. CSS custom properties table (`--uilib-textarea-*`).

### Phase 4 — Performance Audit

- `computed<...>` for all derived ARIA values.
- Auto-resize uses `ResizeObserver` not polling.

### Phase 5 — Composability Audit

- Error message slot for rich error content (`[textareaError]`).
- Hint text slot for description text (`[textareaHint]`).
- Prefix/suffix slots where relevant.

### Phase 6 — Polish Audit

- [ ] `:focus-visible` ring on the native textarea
- [ ] Error state visual (red border) syncs with `aria-invalid`
- [ ] Resize handle is theme-aware (`--uilib-textarea-resize-color`)
- [ ] `prefers-reduced-motion` applied

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/textarea/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/textarea/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring & Step 6 — Handoff

After all phases, add Textarea row to `docs/COMPONENT_SCORES.md` Core Inputs table and append handoff to `AI_AGENT_CONTEXT.md`.

