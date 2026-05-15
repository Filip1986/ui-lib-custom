# ToggleButton — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/toggle-button` · `<ui-lib-toggle-button>`
**Queue position:** Core Inputs (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** `aria-pressed` state management, icon-only variant requires `aria-label`, group usage with `role=group`.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/toggle-button/README.md`
3. Full source: `toggle-button.ts`, `toggle-button.html`, `toggle-button.scss`, `toggle-button.spec.ts`
4. Hardened siblings: `select-button/select-button.ts` (aria-pressed group), `button/button.ts` (icon-only label)

---

## Step 2 — What is already present (do NOT regress these)

- `[attr.aria-pressed]` bound to pressed state — VERIFY
- Icon-only variant has `aria-label` — VERIFY
- Disabled: `aria-disabled` vs native `disabled` — VERIFY
- `prefers-reduced-motion` in SCSS — VERIFY
- Module-level ID counter — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — aria-pressed (CRITICAL)
A toggle button MUST have `aria-pressed="true"` when active, `aria-pressed="false"` when inactive.
Do NOT use `aria-checked` — that is only for checkboxes and radio buttons.

```typescript
public readonly pressed: ModelSignal<boolean> = model<boolean>(false);
```
```html
[attr.aria-pressed]="pressed()"
```

#### Issue 2 — Icon-only variant aria-label (CRITICAL)
When only an icon is rendered with no visible text, an `aria-label` is MANDATORY.
```typescript
public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
```
In DEV_MODE: log a console.error if icon is set and ariaLabel is null.

#### Issue 3 — Disabled semantics (MODERATE)
Use native `disabled` for standard disabled state. Document `aria-disabled` variant for
cases where keyboard discoverability is needed.

#### Issue 4 — prefers-reduced-motion (MODERATE)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-toggle-button { transition: none; }
}
```

#### Deliverable — `toggle-button.a11y.spec.ts` (aim 20–28 tests)
- aria-pressed=false when not pressed
- aria-pressed=true when pressed
- Icon-only: aria-label is present
- Disabled: native disabled attribute present
- axe passes: default, pressed, icon-only with label, disabled

---

### Phase 1 — Architecture Audit
- Module-level ID counter: `let nextToggleButtonId: number = 0`
- `pressed` modeled as `ModelSignal<boolean>`

### Phase 2 — DX Audit
README: pressed binding, icon-only ariaLabel requirement, group usage pattern.

### Phase 4 — Performance Audit
- `computed<...>` for all derived ARIA attributes

### Phase 5 — Composability Audit
- Works as standalone toggle or inside a button group
- Content projection: icon + label

### Phase 6 — Polish Audit
- [ ] Active state has clear visual distinction beyond color alone
- [ ] Focus ring is `:focus-visible`
- [ ] `prefers-reduced-motion` applied

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toggle-button/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/toggle-button/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add ToggleButton row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
