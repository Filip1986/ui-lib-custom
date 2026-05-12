# Carousel — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/carousel` · `<ui-lib-carousel>`
**Queue position:** Tier 5, #45
**Generated:** 2026-05-12
**Key a11y concern:** `role=region` with `aria-label`, per-slide live region announcement, prev/next button accessible names, autoplay pause control, keyboard navigation between slides.
**Based on lessons from:** Tabs (#17), Paginator (#37).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/carousel/README.md`
3. Full source: `carousel.ts`, `carousel.html`, `carousel.scss`, `carousel.spec.ts`
4. Hardened siblings: `tabs.ts` (arrow-key nav pattern), `paginator.ts` (page announcement pattern)

---

## Step 2 — Inventory (build from source, do not assume)

- `role="region"` + `aria-label` on outer wrapper ← VERIFY
- Prev/next buttons: `aria-label` with slide context ← VERIFY
- Slide list: `role="list"` + each slide `role="listitem"` ← VERIFY
- Current slide announcement (live region) ← VERIFY
- Autoplay: pause/resume button with `aria-label` ← VERIFY
- Keyboard: Arrow keys / Enter on slide indicators ← VERIFY
- `prefers-reduced-motion` for autoplay / transition ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Region landmark (CRITICAL)
```html
<section
  role="region"
  [attr.aria-label]="ariaLabel() ?? 'Carousel'"
  [attr.aria-roledescription]="'carousel'"
>
```

#### Issue 2 — Slide list semantics (CRITICAL)
```html
<ul class="ui-lib-carousel__slides" aria-live="polite" aria-atomic="false">
  @for (slide of slides(); track slide.id) {
    <li
      role="group"
      [attr.aria-roledescription]="'slide'"
      [attr.aria-label]="slideLabel(slide, $index)"
    >
  }
</ul>
```
`slideLabel()` → `"Slide N of M"` or the slide's own label if provided.

#### Issue 3 — Prev/Next button labels (CRITICAL)
```html
<button [attr.aria-label]="prevLabel() ?? 'Previous slide'">
<button [attr.aria-label]="nextLabel() ?? 'Next slide'">
```
Add `prevLabel`, `nextLabel` inputs for i18n.

#### Issue 4 — Slide indicators (dots) (MODERATE)
Each indicator button must announce which slide it activates and whether it is current:
```html
<button
  [attr.aria-label]="'Go to slide ' + (i + 1)"
  [attr.aria-current]="currentIndex() === i ? 'true' : null"
>
```

#### Issue 5 — Autoplay pause control (MODERATE)
Per WCAG 2.1 SC 2.2.2, auto-advancing content MUST have a mechanism to pause. The pause/resume button needs:
```html
<button [attr.aria-label]="playing() ? (pauseLabel() ?? 'Pause autoplay') : (playLabel() ?? 'Resume autoplay')">
```
Respect `prefers-reduced-motion`: disable autoplay by default when `prefers-reduced-motion: reduce`.

#### Issue 6 — `prefers-reduced-motion` (MODERATE)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-carousel__slides { transition: none; }
}
```
Also: stop autoplay if reduced-motion is active (no JS animation should run).

---

## A11y Spec (aim for 18–24 tests)

Create `carousel.a11y.spec.ts`:
- `role="region"` + `aria-label` present
- Slides rendered as list items with `role="group"` + `aria-label`
- Prev/next buttons have accessible names
- Indicators have `aria-current` on active item
- Autoplay pause button has correct label
- Keyboard: Arrow keys move between slides
- axe-core: default, mid-slides, autoplay-paused states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Unique slide IDs, signal correctness, SSR-safe scroll/animation wrappers.
**Phase 2:** README with full i18n label inputs table, autoplay API, keyboard shortcut table.
**Phase 4:** Virtualize off-screen slides for large datasets; `computed` for all ARIA values.
**Phase 5:** Custom slide template via `ng-template`; indicator slot override.
**Phase 6:** Smooth cross-fade or slide animation. Pause on hover/focus. Dark mode.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/carousel/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=carousel --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — Carousel #45 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **Galleria hardening (Tier 5, #46)**.

