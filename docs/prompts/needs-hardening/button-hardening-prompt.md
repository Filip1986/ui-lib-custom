# Button — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/button` · `<ui-lib-button>`
**Queue position:** Tier 5, #41
**Generated:** 2026-05-12
**Key a11y concern:** `aria-disabled` vs `disabled`, icon-only `aria-label`, loading state announcement, `aria-busy`, `aria-pressed` for toggle variant.
**Based on lessons from:** SplitButton (#68), all Tier 1–4 hardenings.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/button/README.md`
3. Full source: `button.ts`, `button.html`, `button.scss`, `button.spec.ts`
4. Hardened sibling for patterns:
   - `projects/ui-lib-custom/src/lib/split-button/split-button.ts` (icon-only label + aria-expanded pattern)

---

## Step 2 — Inventory (build from source, do not assume)

Read all source files first. Document:
- `[attr.aria-label]` for icon-only buttons ← VERIFY (critical)
- `[attr.aria-disabled]` vs native `disabled` ← VERIFY
- `[attr.aria-busy]` / `[attr.aria-live]` for loading state ← VERIFY
- `[attr.aria-pressed]` for toggle variant ← VERIFY
- `:focus-visible` ring in SCSS ← VERIFY
- `prefers-reduced-motion` in SCSS ← VERIFY
- Unique instance IDs if needed ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Icon-only buttons (CRITICAL)
When a button has no visible text (icon-only), it MUST have an accessible name via `aria-label` or `aria-labelledby`. Without it the button announces as just "button" to a screen reader.

**Fix:** Add a mandatory `ariaLabel` input that is required when `iconOnly` is true:
```typescript
public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
```
Bind: `[attr.aria-label]="ariaLabel() || null"`
Document in README that `ariaLabel` is required when the button contains only an icon.

#### Issue 2 — `aria-disabled` for "soft" disabled state (MODERATE)
Native `disabled` removes the button from the tab order entirely — keyboard users can't discover it. Use `aria-disabled="true"` + `tabindex="0"` when the button should be keyboard-discoverable but not actionable.

**Fix:** Support both modes:
```typescript
public readonly softDisabled: InputSignal<boolean> = input<boolean>(false);
```
- `disabled` input → native `disabled` attribute (removed from tab order, lighter DOM cost)
- `softDisabled` input → `[attr.aria-disabled]="true"` + `tabindex="0"` + prevent click in handler

#### Issue 3 — Loading state announcement (MODERATE)
When a button triggers an async action, the loading state must be announced to AT.

**Fix:**
```html
[attr.aria-busy]="loading() ? 'true' : null"
[attr.aria-label]="loading() ? (loadingLabel() ?? ariaLabel()) : ariaLabel()"
```
Add `loadingLabel` input (e.g. `"Saving…"`) that overrides the visible label for AT while loading.

#### Issue 4 — Toggle / `aria-pressed` (MODERATE)
If the button has a `toggle` variant (pressed/unpressed state), bind:
```html
[attr.aria-pressed]="pressed() ?? null"
```

#### Issue 5 — `prefers-reduced-motion` (LOW)
Ripple and hover transitions must be suppressed:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-button { transition: none; }
  .ui-lib-button__ripple { animation: none; }
}
```

---

## A11y Spec (aim for 20–28 tests)

Create `button.a11y.spec.ts` covering:
- Icon-only button has aria-label
- Default button has accessible name from text content
- `aria-disabled="true"` when softDisabled
- Native `disabled` when disabled input is set
- `aria-busy="true"` during loading
- `aria-pressed` on toggle variant
- axe-core: default, icon-only, loading, disabled, toggle states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1 (Architecture):** Unique IDs (if needed for internal ARIA), signal correctness, SSR-safe (no `document` in constructor).
**Phase 2 (DX):** README with full input/output table, ARIA usage table, `ariaLabel` required-when note, CSS custom properties table, usage examples for all variants.
**Phase 4 (Performance):** `computed` signals for all derived ARIA values. No unnecessary re-renders. Ripple cleanup on destroy.
**Phase 5 (Composability):** Prefix/suffix icon slots. Directive variant (`[uiLibButton]`) for host-element usage.
**Phase 6 (Polish):** `:focus-visible` ring clearly visible. Loading spinner smooth. All 3 variants × all sizes look correct.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/button/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=src/lib/button --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories using the rubric in `docs/COMPONENT_SCORES.md`.
Update `docs/COMPONENT_SCORES.md` — Button #41 from ⏳ Queued to ✅ Done.
Append handoff block to `AI_AGENT_CONTEXT.md` (keep newest 3, archive older).

Next step after completion: **Alert hardening (Tier 5, #42)**.

