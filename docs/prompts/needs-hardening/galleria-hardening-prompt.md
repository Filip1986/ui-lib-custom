# Galleria — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/galleria` · `<ui-lib-galleria>`
**Queue position:** Tier 5, #46
**Generated:** 2026-05-12
**Key a11y concern:** Lightbox/fullscreen mode keyboard trap (same pattern as Dialog), image alt text propagation, thumbnail navigation, close button accessible name.
**Based on lessons from:** Dialog (#1), Carousel (#45), Image (#66).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/galleria/README.md`
3. Full source: `galleria.ts`, `galleria.html`, `galleria.scss`, `galleria.spec.ts`
4. Hardened siblings: `dialog.ts` (focus trap/modal pattern), `carousel.ts` (slide nav pattern)

---

## Step 2 — Inventory (build from source, do not assume)

- Fullscreen/lightbox: focus trap, `role="dialog"`, `aria-modal="true"` ← VERIFY
- Close button `aria-label` ← VERIFY
- Main image: `alt` attribute propagated from item data ← VERIFY
- Prev/next buttons: `aria-label` ← VERIFY
- Thumbnail list: `role="list"`, active thumbnail `aria-current` ← VERIFY
- Thumbnail buttons: `aria-label` with image description ← VERIFY
- `prefers-reduced-motion` ← VERIFY
- Focus restoration on close ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Lightbox is a dialog (CRITICAL)
When Galleria opens in fullscreen/overlay mode, it MUST behave as a dialog:
```html
<div
  role="dialog"
  aria-modal="true"
  [attr.aria-label]="lightboxLabel() ?? 'Image gallery'"
>
```
- Trap focus inside for the duration it is open (use `FocusTrap` service or the library's own directive)
- On open: move focus to the close button or the main image
- On close: restore focus to the element that triggered opening

#### Issue 2 — Image alt text propagation (CRITICAL)
Each `<img>` in the gallery MUST have a meaningful `alt`. Add an `alt` property to the item data model:
```typescript
interface GalleriaItem {
  src: string;
  alt: string;        // mandatory
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}
```
Graceful fallback: `alt=""` (decorative) when no text is available — never omit the attribute.

#### Issue 3 — Thumbnail navigation (MODERATE)
Thumbnail strip should be navigable by keyboard (arrow keys); active thumbnail gets `aria-current="true"`.
```html
<button
  [attr.aria-label]="item.thumbnailAlt ?? item.alt ?? 'Thumbnail ' + (i + 1)"
  [attr.aria-current]="activeIndex() === i ? 'true' : null"
>
```

#### Issue 4 — Prev/Next button labels (MODERATE)
```html
<button [attr.aria-label]="prevLabel() ?? 'Previous image'">
<button [attr.aria-label]="nextLabel() ?? 'Next image'">
```

#### Issue 5 — `prefers-reduced-motion` (LOW)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-galleria__slide { transition: none; animation: none; }
}
```

---

## A11y Spec (aim for 16–22 tests)

Create `galleria.a11y.spec.ts`:
- Lightbox has `role="dialog"` + `aria-modal`
- Focus moves to close button on open
- Focus restored to trigger on close
- Main image has `alt` from item data
- Thumbnails are keyboard navigable
- Prev/next buttons have accessible names
- axe-core: inline mode, lightbox open

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Focus trap lifecycle, SSR-safe overlay mounting, unique IDs.
**Phase 2:** README with item data model (including `alt`), lightbox usage, keyboard nav table.
**Phase 4:** `computed` for active item, lazy-load off-screen images.
**Phase 5:** Custom item template via `ng-template`; caption slot.
**Phase 6:** Smooth transition between images, thumbnail hover state, dark mode.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/galleria/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=galleria --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — Galleria #46 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **SpeedDial hardening (Tier 5, #47)**.

