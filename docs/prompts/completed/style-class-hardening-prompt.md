# StyleClass — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/style-class` · directive
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** If StyleClass toggles element visibility, it MUST also toggle `aria-hidden` and/or `aria-expanded` on the trigger element. Visibility toggled via CSS class alone is NOT accessible.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/style-class/README.md`
3. Full source: `style-class.ts`, `style-class.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- Class toggle on click of host element — VERIFY
- Target element selection (same element, sibling, selector) — VERIFY
- `aria-expanded` toggled on host when target shows/hides — VERIFY
- `aria-hidden` toggled on target when hidden — VERIFY
- `enterClass` / `leaveClass` animations — VERIFY
- `prefers-reduced-motion`: no animations added if user prefers — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — aria-expanded on trigger (CRITICAL)
When StyleClass shows/hides a panel:
```typescript
// In the directive, after toggling:
this.el.nativeElement.setAttribute('aria-expanded', targetVisible ? 'true' : 'false');
```

#### Issue 2 — aria-hidden on target when hidden (CRITICAL)
```typescript
target.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
```

#### Issue 3 — prefers-reduced-motion (CRITICAL)
If `enterClass` / `leaveClass` add transition CSS classes, check for `prefers-reduced-motion`
and skip adding those classes when the media query matches.

#### Deliverable — `style-class.a11y.spec.ts` (aim 10–15 tests)
- aria-expanded=false on trigger initially
- aria-expanded=true after click
- Target has aria-hidden=true when hidden
- Target has aria-hidden=false when shown
- prefers-reduced-motion: animation classes not added

---

### Phase 1 — Architecture Audit
- `selector` / `target` input — which element is toggled
- `toggleClass` input
- `enterClass` / `leaveClass` — optional animation class pairs

### Phase 2 — DX Audit
README: ARIA requirements when used for show/hide, prefers-reduced-motion note.

### Phase 4 — Performance Audit
- One event listener per directive instance, cleaned in ngOnDestroy

### Phase 5 — Composability Audit
- Can target sibling, parent, or arbitrary selector

### Phase 6 — Polish Audit
- [ ] Animation respects prefers-reduced-motion

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/style-class/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/style-class/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add StyleClass row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
