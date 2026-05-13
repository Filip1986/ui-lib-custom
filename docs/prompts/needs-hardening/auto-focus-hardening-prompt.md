# AutoFocus — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/auto-focus` · directive
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Auto-focus is a double-edged sword. It MUST be opt-in, must only run once on mount, must not steal focus from dialogs or other programmatic focus management, and must be disabled for users with `prefers-reduced-motion` or screen readers in some contexts.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/auto-focus/README.md`
3. Full source: `auto-focus.ts`, `auto-focus.spec.ts`
4. Hardened siblings: `dialog/dialog.ts` (focus trap + initial focus pattern)

---

## Step 2 — What is already present (do NOT regress these)

- Focus applied in `ngAfterViewInit` — VERIFY
- `disabled` input to opt out — VERIFY
- Only runs once on mount — VERIFY
- No focus theft from dialog/focus-trap — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Only opt-in (CRITICAL)
AutoFocus should be an explicit opt-in directive. Consumers add it intentionally.
It must NOT auto-enable just by being imported.

#### Issue 2 — Only runs once (CRITICAL)
Focus must be applied exactly once: in `ngAfterViewInit`. It must NOT re-apply
on subsequent change detection cycles.

#### Issue 3 — Deferred focus with requestAnimationFrame (MODERATE)
Focus applied synchronously in `ngAfterViewInit` can interfere with animations.
Use `requestAnimationFrame` to defer:
```typescript
requestAnimationFrame((): void => {
  if (!this.disabled()) {
    (this.el.nativeElement as HTMLElement).focus();
  }
});
```

#### Issue 4 — Works with focusable child selector (MODERATE)
Some cases may need focus on a child, not the host. Support a `selector` input:
```typescript
const target = this.selector()
  ? this.el.nativeElement.querySelector(this.selector())
  : this.el.nativeElement;
target?.focus();
```

#### Deliverable — `auto-focus.a11y.spec.ts` (aim 10–15 tests)
- Element receives focus on mount
- Disabled: element does NOT receive focus
- Only runs once (not on re-render)

---

### Phase 1 — Architecture Audit
- `disabled` input: `InputSignal<boolean>`
- `selector` input: `InputSignal<string | null>`

### Phase 2 — DX Audit
README: opt-in pattern, WCAG note about auto-focus caveats, selector input usage.

### Phase 4 — Performance Audit
- requestAnimationFrame to defer focus
- No subscriptions, no intervals

### Phase 5 — Composability Audit
- Works with dialog, drawer, popover, form fields

### Phase 6 — Polish Audit
- [ ] DEV_MODE warning if host element is not focusable

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/auto-focus/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/auto-focus/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add AutoFocus row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
