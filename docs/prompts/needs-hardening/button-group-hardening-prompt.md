# ButtonGroup — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/button-group` · `<ui-lib-button-group>`
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** `role=group` with `aria-label` on the group; individual buttons must retain their own accessible names; do NOT group unrelated actions.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/button-group/README.md`
3. Full source: `button-group.ts`, `button-group.html`, `button-group.scss`, `button-group.spec.ts`
4. Hardened siblings: `button/button.ts`, `select-button/select-button.ts`, `toolbar/toolbar.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `role="group"` on container — VERIFY
- `ariaLabel` on group — VERIFY
- Buttons inside retain their individual labels — VERIFY
- Visually connected border-radius treatment — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — role=group with aria-label (CRITICAL)
```html
<div role="group" [attr.aria-label]="ariaLabel() || null">
  <ng-content />
</div>
```
If no `ariaLabel` is provided and content is projected, log a DEV_MODE warning.

#### Issue 2 — Individual button labels preserved (CRITICAL)
ButtonGroup is a visual wrapper only. Each `<ui-lib-button>` inside must still have its own
accessible label independent of the group label.

#### Issue 3 — Orientation (MODERATE)
If ButtonGroup supports vertical orientation, document keyboard behavior:
- Horizontal: Tab moves between buttons normally
- Vertical: Consider `role=toolbar` + roving tabindex for arrow key nav

#### Deliverable — `button-group.a11y.spec.ts` (aim 10–15 tests)
- Container has role=group
- Container has aria-label when provided
- axe passes: default (with labeled buttons)

---

### Phase 1 — Architecture Audit
- `orientation`: `'horizontal' | 'vertical'`
- `ariaLabel` input for the group

### Phase 2 — DX Audit
README: group label requirement, orientation, border-radius treatment explained.

### Phase 4 — Performance Audit
- Pure layout component, no JS logic

### Phase 5 — Composability Audit
- Works with Button, IconButton, ToggleButton

### Phase 6 — Polish Audit
- [ ] Connected border treatment via CSS custom property
- [ ] Gap token between buttons (or no gap for visually connected style)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/button-group/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/button-group/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add ButtonGroup row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
