# IconButton — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/icon-button` · `<ui-lib-icon-button>`
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Icon-only button MUST ALWAYS have an `aria-label`. This is non-negotiable. The icon name is NOT an accessible label.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/icon-button/README.md`
3. Full source: `icon-button.ts`, `icon-button.html`, `icon-button.scss`, `icon-button.spec.ts`
4. Hardened siblings: `button/button.ts` (icon-only label pattern), `icon/icon.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `ariaLabel` input (REQUIRED — verify it is marked as required) — VERIFY
- Native `<button>` element used — VERIFY
- Icon is `aria-hidden="true"` inside the button — VERIFY
- `disabled`: native disabled attribute — VERIFY
- `prefers-reduced-motion` in SCSS — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — aria-label is REQUIRED (CRITICAL)
An icon-only button with no `aria-label` is inaccessible. The component MUST:
1. Accept `ariaLabel` as a required (or required-in-dev) input.
2. Log a `console.error` in development mode when `ariaLabel` is empty.
3. Document in README: "ariaLabel is mandatory for icon-only buttons."

```typescript
// In ngOnInit or ngAfterViewInit (DEV_MODE only):
if (!this.ariaLabel() && isDevMode()) {
  console.error('[ui-lib-icon-button] ariaLabel is required for accessibility.');
}
```

#### Issue 2 — Icon aria-hidden inside button (CRITICAL)
The icon rendered inside the button must have `aria-hidden="true"`. The button itself
provides the accessible name via `aria-label`.

#### Issue 3 — Loading state announcement (MODERATE)
If the button has a loading state, announce it:
```html
[attr.aria-label]="loading() ? 'Loading, please wait' : ariaLabel()"
```

#### Issue 4 — prefers-reduced-motion (MODERATE)
Any hover/press animations suppressed.

#### Deliverable — `icon-button.a11y.spec.ts` (aim 15–20 tests)
- Button has aria-label from input
- Icon inside is aria-hidden="true"
- Disabled: native disabled attribute
- DEV MODE: error logged when ariaLabel is empty
- axe passes: default (with ariaLabel), disabled

---

### Phase 1 — Architecture Audit
- `ariaLabel: InputSignal<string>` — required, no null default
- `icon`: icon name string
- `size`, `variant`, `loading`, `disabled` inputs

### Phase 2 — DX Audit
README: mandatory ariaLabel, loading state, size table.

### Phase 4 — Performance Audit
- computed for aria-label (loading state switch)

### Phase 5 — Composability Audit
- Works as primary action in toolbar, card, data row

### Phase 6 — Polish Audit
- [ ] Minimum tap target: 44x44px
- [ ] Focus ring is :focus-visible
- [ ] Loading spinner animation respects prefers-reduced-motion

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/icon-button/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/icon-button/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add IconButton row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
