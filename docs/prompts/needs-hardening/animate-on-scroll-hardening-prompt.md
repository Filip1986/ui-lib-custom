# AnimateOnScroll — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/animate-on-scroll` · directive
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** `prefers-reduced-motion` is the #1 concern. This directive MUST NOT animate content when the user has requested reduced motion (WCAG 2.3.3). Content must still appear correctly, just without animation.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/animate-on-scroll/README.md`
3. Full source: `animate-on-scroll.ts`, `animate-on-scroll.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- IntersectionObserver used (not scroll event) — VERIFY
- `prefers-reduced-motion` check before adding animation class — VERIFY
- Content is visible even before intersection (or until animated in) — VERIFY
- Disconnect of observer on destroy — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — prefers-reduced-motion MUST be enforced (CRITICAL)
```typescript
private readonly prefersReducedMotion: boolean =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

public ngAfterViewInit(): void {
  if (this.prefersReducedMotion) {
    // Do not animate — just show the element immediately
    this.el.nativeElement.style.opacity = '1';
    return;
  }
  // Set up IntersectionObserver
}
```

#### Issue 2 — Content hidden before intersection (CRITICAL)
If the directive hides content (opacity: 0, transform: translateY(20px)) before it intersects,
users who have CSS disabled or use older browsers will see blank content.
Document the progressive enhancement approach.

#### Issue 3 — Disconnect observer on destroy (MODERATE)
Verify `IntersectionObserver.disconnect()` is called in `ngOnDestroy` to prevent memory leaks.

#### Deliverable — `animate-on-scroll.a11y.spec.ts` (aim 10–15 tests)
- No animation when prefers-reduced-motion matches
- Content is visible even without animation (opacity=1)
- Observer disconnected on destroy

---

### Phase 1 — Architecture Audit
- `enterClass` input: CSS animation class to apply
- `threshold` input: IntersectionObserver threshold
- `once` input: only animate once vs. re-animate on re-enter

### Phase 2 — DX Audit
README: prefers-reduced-motion note (prominent), progressive enhancement, threshold usage.

### Phase 4 — Performance Audit
- IntersectionObserver instead of scroll events
- `requestAnimationFrame` for class application

### Phase 5 — Composability Audit
- Works on any element
- Can be combined with StyleClass

### Phase 6 — Polish Audit
- [ ] Default animation classes use CSS custom properties for duration/easing
- [ ] Duration token: `--uilib-transition-duration`

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/animate-on-scroll/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/animate-on-scroll/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add AnimateOnScroll row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
