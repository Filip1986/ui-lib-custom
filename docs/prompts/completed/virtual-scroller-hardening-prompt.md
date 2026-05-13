# VirtualScroller — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/virtual-scroller` · `<ui-lib-virtual-scroller>`
**Queue position:** Tier 5, #50
**Generated:** 2026-05-12
**Key a11y concern:** Accessible scroll region label, keyboard scrolling support, `aria-rowcount`/`aria-rowindex` when used for a virtual list, `aria-setsize`/`aria-posinset` for items, announcement of total item count.
**Based on lessons from:** Table (#32), Tree (#34), Listbox (#36).

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/virtual-scroller/README.md`
3. Full source: `virtual-scroller.ts`, `virtual-scroller.html`, `virtual-scroller.scss`, `virtual-scroller.spec.ts`
4. Hardened siblings: `table.ts` (`aria-rowcount`/`aria-rowindex`), `listbox.ts` (`aria-setsize`/`aria-posinset`)

---

## Step 2 — Inventory (build from source, do not assume)

- Scroll container: `role`, `aria-label`, focusability ← VERIFY
- `aria-rowcount` / `aria-setsize` for total items ← VERIFY
- `aria-rowindex` / `aria-posinset` on rendered items ← VERIFY
- Keyboard scrolling (Page Up/Down, Arrow keys, Home/End) ← VERIFY
- `tabindex="0"` so keyboard users can enter and scroll ← VERIFY
- `prefers-reduced-motion` for scroll animations ← VERIFY

---

## Phase 3 — Key A11y Issues (PRIORITY — run first)

#### Issue 1 — Scroll region focusability (CRITICAL)
The scroll container must be reachable by keyboard so keyboard-only users can scroll its content:
```html
<div
  class="ui-lib-virtual-scroller"
  tabindex="0"
  [attr.aria-label]="ariaLabel() ?? 'Scrollable list'"
  [attr.role]="contentRole()"
>
```
When acting as a list: `role="list"`. When acting as a grid: `role="grid"`.

#### Issue 2 — Virtual item count ARIA (CRITICAL)
Screen readers need to know the total count even though only a subset of items are in the DOM:

For list role:
```html
<!-- on each rendered item -->
<div
  role="listitem"
  [attr.aria-setsize]="totalItems()"
  [attr.aria-posinset]="item.index + 1"
>
```

For grid role:
```html
<!-- on the scroll container -->
[attr.aria-rowcount]="totalItems()"
<!-- on each rendered row -->
[attr.aria-rowindex]="item.index + 1"
```

#### Issue 3 — Keyboard scrolling (CRITICAL)
When the scroll container has focus, it should respond to:
- `ArrowDown` / `ArrowUp`: scroll by one item height
- `PageDown` / `PageUp`: scroll by viewport height
- `Home` / `End`: scroll to start/end

```typescript
@HostListener('keydown', ['$event'])
protected onKeyDown(event: KeyboardEvent): void { ... }
```

#### Issue 4 — Loading / empty states (MODERATE)
When loading more items:
```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  @if (loading()) { Loading more items… }
  @if (totalItems() === 0) { No items to display. }
</div>
```

#### Issue 5 — `prefers-reduced-motion` (LOW)
Smooth scroll animations:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-virtual-scroller { scroll-behavior: auto; }
}
```

---

## A11y Spec (aim for 16–22 tests)

Create `virtual-scroller.a11y.spec.ts`:
- Scroll container has `tabindex="0"`
- Scroll container has `aria-label`
- Items have `aria-setsize` matching total count
- Items have `aria-posinset` with correct position
- Arrow keys scroll the container
- Home/End keys scroll to start/end
- Loading live region announces state
- axe-core: populated, loading, empty states

---

## Phases 1, 2, 4, 5, 6 (Summary)

**Phase 1:** SSR-safe (no `window.scroll` in constructor), signal correctness, unique IDs.
**Phase 2:** README with use-as-list vs use-as-grid patterns, ARIA attribute table, `totalItems` input requirement.
**Phase 4:** Efficient buffer calculation, `computed` for all ARIA values, `IntersectionObserver` cleanup.
**Phase 5:** Custom item template via `ng-template`; loading skeleton slot.
**Phase 6:** Smooth scroll inertia, stable content replacement without reflow flash.

---

## Commands (run from bash.exe)

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/virtual-scroller/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=virtual-scroller --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Scoring and Handoff

Score all 10 categories. Update `docs/COMPONENT_SCORES.md` — VirtualScroller #50 from ⏳ Queued to ✅ Done.
Append handoff to `AI_AGENT_CONTEXT.md`.

Next step after completion: Start **Tier 6 hardening** — Divider (#58).

