# Alert — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/alert` · `<ui-lib-alert>`
**Queue position:** Tier 5, #42
**Generated:** 2026-05-12
**Key a11y concern:** `role=alert` vs `role=status` — choosing the right live region role; dismiss button label; icon decorative vs informative.
**Based on lessons from:** Toast (#10), Message (#43).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/alert/README.md`
3. Full source: `alert.ts`, `alert.html`, `alert.scss`, `alert.spec.ts`
4. Hardened sibling: `projects/ui-lib-custom/src/lib/toast/toast.ts` (live region pattern)

---

## Step 2 — Inventory (build from source, do not assume)

- `role` attribute (alert vs status vs none) ← VERIFY
- `aria-live` + `aria-atomic` ← VERIFY
- Dismiss/close button `aria-label` ← VERIFY (critical)
- Severity icon: decorative (`aria-hidden="true"`) vs informative ← VERIFY
- `:focus-visible` ring on close button ← VERIFY
- `prefers-reduced-motion` ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Live region role selection (CRITICAL)
- `role="alert"` (= `aria-live="assertive"`) — for **errors and critical warnings** that demand immediate attention. Interrupts the user.
- `role="status"` (= `aria-live="polite"`) — for **success and info** messages that wait for a natural pause.

**Fix:** Map severity to role:
```typescript
protected readonly liveRole = computed<'alert' | 'status'>((): 'alert' | 'status' =>
  this.severity() === 'error' || this.severity() === 'warn' ? 'alert' : 'status'
);
```
Bind: `[attr.role]="liveRole()"`

#### Issue 2 — `aria-atomic` (MODERATE)
Add `aria-atomic="true"` so AT reads the full message when the content updates, not just the changed fragment.

#### Issue 3 — Dismiss button accessible name (CRITICAL)
The close/dismiss button must have an accessible name:
```html
<button [attr.aria-label]="dismissLabel() ?? 'Dismiss alert'" ...>
```
Add `dismissLabel` input for i18n.

#### Issue 4 — Severity icon labeling (MODERATE)
The severity icon (e.g. warning triangle) is decorative when the severity is also conveyed by text/color context. Mark as `aria-hidden="true"`. If it is the ONLY indicator of severity — add a visually hidden `<span>` with the severity text.

#### Issue 5 — `prefers-reduced-motion` (LOW)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-alert { transition: none; animation: none; }
}
```

---

## A11y Spec (aim for 14–20 tests)

Create `alert.a11y.spec.ts`:
- `role="alert"` when severity is error/warn
- `role="status"` when severity is success/info
- Close button has accessible name
- Icon has `aria-hidden="true"`
- `aria-atomic="true"` present
- axe-core: all four severity states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Unique IDs, signal correctness, SSR-safe.
**Phase 2:** README severity table, ARIA role table, dismissLabel i18n note, CSS custom properties.
**Phase 4:** `computed` for role/severity derived values.
**Phase 5:** Content projection for title, body, and icon overrides.
**Phase 6:** Entry animation, severity color contrast ratio ≥ 4.5:1.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/alert/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=src/lib/alert --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — Alert #42 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **Message hardening (Tier 5, #43)**.

