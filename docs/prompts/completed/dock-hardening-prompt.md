# Dock — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/dock` · `<ui-lib-dock>`
**Queue position:** Navigation (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** `role=toolbar` or `role=navigation` with `aria-label`, each dock item is a button or anchor with visible label or `aria-label`, keyboard navigation (Tab between items or roving tabindex).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/dock/README.md`
3. Full source: `dock.ts`, `dock.html`, `dock.scss`, `dock.spec.ts`
4. Hardened siblings: `speed-dial/speed-dial.ts` (icon-only button pattern), `toolbar/toolbar.ts` (role=toolbar)

---

## Step 2 — What is already present (do NOT regress these)

- `role="toolbar"` or `role="navigation"` on the dock container — VERIFY
- `aria-label` on the dock — VERIFY
- Each dock item has an accessible name (tooltip, aria-label, or visible text) — VERIFY
- Keyboard navigation between items — VERIFY
- Magnification animation respects `prefers-reduced-motion` — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Correct container role (CRITICAL)
If Dock is a collection of navigation links: use `<nav aria-label="Dock">`.
If Dock is a toolbar of application actions: use `<div role="toolbar" aria-label="Dock">`.
Choose based on what the items ARE (links vs. buttons).

#### Issue 2 — Each item accessible name (CRITICAL)
Each dock icon MUST have an accessible name:
- Via a tooltip (`aria-describedby` to tooltip id)
- Or via `aria-label` directly on the button/anchor
- Or via visually hidden text span

#### Issue 3 — Keyboard navigation (CRITICAL)
For `role=toolbar`: implement roving tabindex (Arrow keys navigate, Tab exits the toolbar).
For `role=navigation`: Tab through links normally.

#### Issue 4 — Magnification animation (MODERATE)
The macOS-style scale animation on hover must be disabled:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-dock__item { transition: none; transform: none; }
}
```

#### Deliverable — `dock.a11y.spec.ts` (aim 20–28 tests)
- Container has role=toolbar or role=navigation with aria-label
- Each item has accessible name
- Keyboard: Tab enters dock, Arrow keys navigate between items (if toolbar)
- Disabled item: aria-disabled, not tabbable
- axe passes: default

---

### Phase 1 — Architecture Audit
- `items` input: `DockItem[]` with `icon`, `label`, `ariaLabel`, `command`/`routerLink`
- `position`: `'bottom' | 'top' | 'left' | 'right'`

### Phase 2 — DX Audit
README: role choice guidance, keyboard interaction, prefers-reduced-motion note.

### Phase 4 — Performance Audit
- Scale animation uses CSS transform (GPU composited), not width/height

### Phase 5 — Composability Audit
- Custom item template slot

### Phase 6 — Polish Audit
- [ ] Magnification animation is silky-smooth (CSS cubic-bezier)
- [ ] Reduced motion: no animation, flat layout
- [ ] Active item indicated without color alone

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/dock/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/dock/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Dock row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
