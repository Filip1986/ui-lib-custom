# ProgressBar — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/progress-bar` · `<ui-lib-progress-bar>`
**Queue position:** Tier 5, #44
**Generated:** 2026-05-12
**Key a11y concern:** `role=progressbar`, `aria-valuenow/min/max/valuetext`, indeterminate state labeling, live region for completion announcement.
**Based on lessons from:** ProgressSpinner (#56), Slider (#27).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/progress-bar/README.md`
3. Full source: `progress-bar.ts`, `progress-bar.html`, `progress-bar.scss`, `progress-bar.spec.ts`
4. Hardened siblings: `progress-spinner.ts` (`role=status`), `slider.ts` (`aria-valuenow/min/max`)

---

## Step 2 — Inventory (build from source, do not assume)

- `role="progressbar"` on the right element ← VERIFY
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` ← VERIFY
- `aria-valuetext` for human-readable label ← VERIFY
- Indeterminate mode: `aria-valuenow` removed ← VERIFY (CRITICAL — must be absent, not 0)
- `aria-label` or `aria-labelledby` for the bar itself ← VERIFY
- Completion announcement (`aria-live` region) ← VERIFY
- `prefers-reduced-motion` for animation ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Core ARIA attributes (CRITICAL)
```html
<div
  role="progressbar"
  [attr.aria-valuenow]="indeterminate() ? null : value()"
  [attr.aria-valuemin]="0"
  [attr.aria-valuemax]="100"
  [attr.aria-valuetext]="valueText()"
  [attr.aria-label]="ariaLabel() || null"
  [attr.aria-labelledby]="ariaLabelledBy() || null"
>
```

#### Issue 2 — Indeterminate state (CRITICAL)
In indeterminate mode, `aria-valuenow` MUST be absent (not set to `null` string — it must not render the attribute at all). Screen readers interpret its absence as "unknown progress". If set to any numeric value (including 0), AT announces a specific progress which is misleading.

```typescript
protected readonly ariaValueNow = computed<number | null>(
  (): number | null => this.indeterminate() ? null : this.value()
);
```
`[attr.aria-valuenow]="ariaValueNow()"` — Angular will omit the attribute when value is `null`.

#### Issue 3 — `aria-valuetext` (MODERATE)
```typescript
protected readonly valueText = computed<string>((): string =>
  this.indeterminate() ? 'Loading…' : `${this.value()}%`
);
```
Allow override via `ariaValueText` input for i18n.

#### Issue 4 — Completion announcement (LOW)
When value reaches 100, optionally emit to a polite live region:
```html
@if (value() === 100) {
  <span aria-live="polite" aria-atomic="true" class="sr-only">
    {{ completionLabel() ?? 'Complete' }}
  </span>
}
```

#### Issue 5 — `prefers-reduced-motion` (LOW)
Stripe/pulse animations on indeterminate bar:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-progress-bar__fill { animation: none; transition: none; }
}
```

---

## A11y Spec (aim for 16–22 tests)

Create `progress-bar.a11y.spec.ts`:
- `role="progressbar"` present
- `aria-valuenow` reflects current value
- `aria-valuenow` is absent in indeterminate mode
- `aria-valuemin="0"`, `aria-valuemax="100"`
- `aria-valuetext` shows human-readable percentage or "Loading…"
- `aria-label` from input
- Completion live region at value=100
- axe-core: determinate, indeterminate, complete states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Signal correctness, SSR-safe, unique IDs if label is embedded.
**Phase 2:** README with ARIA table, indeterminate usage example, i18n note for valueText/completionLabel.
**Phase 4:** `computed` for all ARIA values, stable animation using CSS only.
**Phase 5:** Labelled slot for embedded label text, thickness/color tokens.
**Phase 6:** Smooth fill transition, indeterminate stripe animation, dark mode.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/progress-bar/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=progress-bar --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — ProgressBar #44 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **Carousel hardening (Tier 5, #45)**.

