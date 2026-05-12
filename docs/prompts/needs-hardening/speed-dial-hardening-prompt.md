# SpeedDial — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/speed-dial` · `<ui-lib-speed-dial>`
**Queue position:** Tier 5, #47
**Generated:** 2026-05-12
**Key a11y concern:** `aria-expanded` on trigger, icon-only action button labels (each action needs a visible or AT-only label), Escape to close, keyboard navigation through actions.
**Based on lessons from:** SplitButton (#68), Menu (#12), Button (#41).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/speed-dial/README.md`
3. Full source: `speed-dial.ts`, `speed-dial.html`, `speed-dial.scss`, `speed-dial.spec.ts`
4. Hardened siblings: `split-button.ts` (`aria-expanded` + dropdown pattern), `menu.ts` (keyboard nav)

---

## Step 2 — Inventory (build from source, do not assume)

- Trigger button: `aria-expanded`, `aria-haspopup`, `aria-label` ← VERIFY
- Action buttons: `aria-label` on each (all are icon-only) ← VERIFY (CRITICAL)
- Action list: `role="menu"` or `role="list"` ← VERIFY
- Escape to close ← VERIFY
- Arrow-key navigation through actions ← VERIFY
- `prefers-reduced-motion` for open/close animation ← VERIFY
- Focus restoration on close ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Trigger button ARIA (CRITICAL)
```html
<button
  [attr.aria-expanded]="isOpen()"
  aria-haspopup="true"
  [attr.aria-label]="triggerLabel() ?? 'Actions'"
  [attr.aria-controls]="actionListId"
>
```

#### Issue 2 — Action buttons must have accessible names (CRITICAL)
Every action in a SpeedDial is icon-only. Each MUST have `aria-label`:
```typescript
// Require label in item type
interface SpeedDialItem {
  icon: string;
  label: string;   // visible tooltip AND aria-label source
  command?: () => void;
}
```
```html
<button [attr.aria-label]="item.label">
```
If a visible label/tooltip is shown on hover, it should use a `<span>` + `aria-describedby` pattern, not replace `aria-label`.

#### Issue 3 — Action list role (MODERATE)
Use `role="menu"` + `role="menuitem"` when items are navigation/actions triggered by a single trigger button. This gives proper AT context.
```html
<ul [id]="actionListId" role="menu">
  <li role="none">
    <button role="menuitem" [attr.aria-label]="item.label">
```

#### Issue 4 — Keyboard navigation (MODERATE)
- Arrow Up / Down: move through actions
- Escape: close and return focus to trigger
- Enter / Space on trigger: toggle open/close

#### Issue 5 — `prefers-reduced-motion` (LOW)
Action items fan out with animation:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-speed-dial__item { transition: none; animation: none; }
}
```

---

## A11y Spec (aim for 16–22 tests)

Create `speed-dial.a11y.spec.ts`:
- Trigger has `aria-expanded="false"` when closed
- Trigger has `aria-expanded="true"` when open
- Each action button has `aria-label`
- Action list has `role="menu"`
- Arrow keys navigate between actions
- Escape closes and restores focus to trigger
- axe-core: closed, open states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** Unique IDs, signal correctness, SSR-safe overlay.
**Phase 2:** README with `SpeedDialItem` interface (label required), keyboard nav table, direction variants.
**Phase 4:** `computed` for open state and ARIA values. No unnecessary renders when closed.
**Phase 5:** Custom trigger template via content projection.
**Phase 6:** Fan-out animation in all 4 directions, smooth open/close, hover tooltip.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/speed-dial/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=speed-dial --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — SpeedDial #47 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: **SelectButton hardening (Tier 5, #48)**.

