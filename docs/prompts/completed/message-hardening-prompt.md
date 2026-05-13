# Message — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/message` · `<ui-lib-message>`
**Queue position:** Tier 5, #43
**Generated:** 2026-05-12
**Key a11y concern:** Same live region correctness as Alert — `role=alert` vs `role=status` based on severity; inline form validation variant must associate with the field it describes.
**Based on lessons from:** Toast (#10), Alert (#42).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/message/README.md`
3. Full source: `message.ts`, `message.html`, `message.scss`, `message.spec.ts`
4. Hardened siblings: `alert.ts` (live region), `input.ts` (aria-describedby pattern for inline use)

---

## Step 2 — Inventory (build from source, do not assume)

- `role` / `aria-live` ← VERIFY
- `aria-atomic` ← VERIFY
- Inline variant: can it be associated with a form field via `aria-describedby`? ← VERIFY
- Severity icon: `aria-hidden="true"` ← VERIFY
- `:focus-visible` if interactive ← VERIFY
- `prefers-reduced-motion` ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Live region role (CRITICAL)
Follow the same pattern as Alert:
- `role="alert"` for `error`/`warn` severity
- `role="status"` for `success`/`info` severity

#### Issue 2 — Inline use with form fields (CRITICAL)
Message is frequently used to display validation errors beneath form inputs. In this case:
- The Message should have a stable `id` that the parent input can reference via `aria-describedby`.
- Add an `id` input (or auto-generated ID) that consumers can wire up.

```typescript
public readonly messageId: InputSignal<string | null> = input<string | null>(null);
protected readonly resolvedId = computed<string>(
  (): string => this.messageId() ?? `ui-lib-message-${nextMessageId++}`
);
```

Bind: `[id]="resolvedId()"` on the host or root element.

#### Issue 3 — Severity icon (MODERATE)
Same as Alert: severity icon must be `aria-hidden="true"` when severity is conveyed via color + text. If the icon is the sole indicator, add a visually hidden text label.

#### Issue 4 — `aria-atomic` (MODERATE)
Add `aria-atomic="true"`.

#### Issue 5 — `prefers-reduced-motion` (LOW)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-message { transition: none; animation: none; }
}
```

---

## A11y Spec (aim for 14–18 tests)

Create `message.a11y.spec.ts`:
- `role="alert"` for error/warn, `role="status"` for success/info
- Has stable `id` for `aria-describedby` association
- Severity icon has `aria-hidden="true"`
- `aria-atomic="true"` present
- axe-core: all four severity states, standalone and inline

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Module-level ID counter, SSR-safe, signal correctness.
**Phase 2:** README with inline vs standalone usage examples, aria-describedby wiring guide.
**Phase 4:** `computed` for all derived IDs and ARIA values.
**Phase 5:** Content projection for custom message body.
**Phase 6:** Consistent visual with Alert component, smooth entry.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/message/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=src/lib/message --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — Message #43 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **ProgressBar hardening (Tier 5, #44)**.

