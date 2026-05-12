# ContextMenu — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/context-menu` · `<ui-lib-context-menu>`
**Queue position:** Tier 2, #14
**Generated:** 2026-05-11
**Key a11y concern:** Trigger element `aria-haspopup="menu"`, focus restoration on hide, roving tabindex, `prefers-reduced-motion`, separator ARIA semantics.
**Based on lessons from:** Menubar (#11), Menu (#12), TieredMenu (#13), Toast (#10), Popover (#8), ConfirmPopup (#7), all Tier 1 hardenings.

> Run Phase 3 first (priority — Elite Accessibility is the current wow factor), then Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, code quality checklist
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — ContextMenu is Tier 2, #14, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/context-menu/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/context-menu/context-menu.ts`
- `projects/ui-lib-custom/src/lib/context-menu/context-menu.html`
- `projects/ui-lib-custom/src/lib/context-menu/context-menu.scss`
- `projects/ui-lib-custom/src/lib/context-menu/context-menu.types.ts`
- `projects/ui-lib-custom/src/lib/context-menu/context-menu.spec.ts`

Also read hardened siblings for established patterns:
- `projects/ui-lib-custom/src/lib/menu/menu.ts` (focus capture/restore + roving tabindex in popup mode)
- `projects/ui-lib-custom/src/lib/menu/menu.a11y.spec.ts` (a11y spec structure for a popup menu)
- `projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.ts` (nested submenu keyboard pattern)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes. These must remain intact:

- `role="menu"` on the panel `<div>` ✅
- `[attr.aria-label]="ariaLabel()"` on the panel ✅
- `ariaLabel` input with default from `CONTEXT_MENU_DEFAULT_ARIA_LABEL` ✅
- `role="presentation"` on inner `<ul>` ✅
- `role="none"` on item wrapper `<li>` elements ✅
- `role="menuitem"` on all interactive `<a>` links ✅
- `[attr.aria-disabled]="item.disabled ? 'true' : null"` on links ✅
- `[attr.aria-haspopup]="item.items?.length ? 'menu' : null"` on parent items ✅
- `[attr.aria-expanded]` bound to open state on parent items ✅
- `role="separator"` on separator `<li>` elements ✅
- **`aria-hidden="true"` on separator `<li>` — INCORRECT (see Issue 1)** ⚠️
- `aria-hidden="true"` on icon `<span>` elements ✅
- `aria-hidden="true"` on submenu caret ✅
- Keyboard navigation: `ArrowDown`/`ArrowUp`/`ArrowLeft`/`ArrowRight`/`Home`/`End`/`Enter`/`Space`/`Escape` ✅
- `show(event: MouseEvent)` / `hide()` / `toggle(event)` API ✅
- Global document listener for `contextmenu` when `global` input is true ✅
- Click-outside and Escape key to hide ✅
- `DOCUMENT` injection (SSR-safe) ✅
- `afterNextRender({ injector })` for first focus after show ✅
- `prefers-reduced-motion` — **NOT present yet** ⚠️
- Roving tabindex — **NOT implemented yet; all enabled items have `tabindex="0"`** ⚠️
- Focus restoration on hide — **NOT implemented yet** ⚠️
- Unique instance ID — **NOT implemented yet** ⚠️

---

## Step 3 — The 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

---

#### Issue 1 — `aria-hidden="true"` on `role="separator"` inside `role="menu"` is INCORRECT (CRITICAL)

**Root cause:** Separator `<li>` elements have both `role="separator"` and `aria-hidden="true"`. This is
semantically contradictory: `role="separator"` is a valid ARIA-required child of `role="menu"` and provides
structural information to AT (it separates groups of items). Hiding it removes that structural information.

**Fix:** Remove `aria-hidden="true"` from separator `<li>` elements in `context-menu.html`:

```html
<!-- Before -->
<li role="separator" aria-hidden="true" class="ui-lib-context-menu__separator"></li>

<!-- After -->
<li role="separator" class="ui-lib-context-menu__separator"></li>
```

Do the same for submenu separator items.

> **Note:** This matches the correction applied to `Menu` (#12) in its hardening. The historical
> reason for `aria-hidden` on separators was a workaround for an axe-core false positive — verify the
> current axe version does NOT require suppressing `aria-required-children` for this component.
> If it does, suppress only `aria-required-children` in the a11y spec (not on the elements themselves).

---

#### Issue 2 — No roving tabindex — all enabled items are in the tab sequence (CRITICAL)

**Root cause:** The WAI-ARIA Menu pattern requires that only ONE item inside a `role="menu"` holds
`tabindex="0"` at a time. All other items must have `tabindex="-1"`. Tab key inside the menu should
exit the menu (not cycle through items). Arrow keys navigate between items.

Currently `[attr.tabindex]="item.disabled ? '-1' : '0'"` puts every enabled item in the tab sequence.

**Fix — add roving tabindex to `context-menu.ts`:**

```typescript
/** Module-level counter for unique ContextMenu IDs. */
let nextContextMenuId: number = 0;

// Inside the class:
/** Unique ID for this ContextMenu instance. */
public readonly contextMenuId: string = `uilib-context-menu-${++nextContextMenuId}`;

/** Index of the item holding the tab stop (roving tabindex). Defaults to 0. */
public readonly rovingIndex: WritableSignal<number> = signal<number>(0);

/**
 * Returns the tabindex for a menu item link at the given flat index.
 * Only the roving item gets tabindex="0"; all others get "-1".
 * Disabled items always get tabindex="-1".
 */
public getTabIndex(item: ContextMenuItem, flatIndex: number): string {
  if (item.disabled) return '-1';
  return this.rovingIndex() === flatIndex ? '0' : '-1';
}
```

Update `focusByFlatIndex()` to also set `rovingIndex`:
```typescript
private focusByFlatIndex(index: number): void {
  this.rovingIndex.set(index);
  // ... existing querySelector + focus() logic ...
}
```

Update `onItemFocus()` to track the roving index:
```typescript
public onItemFocus(item: ContextMenuItem, flatIndex: number): void {
  this.rovingIndex.set(flatIndex);
}
```

Update `context-menu.html` to use the helper:
```html
[attr.tabindex]="getTabIndex(item, $index)"
```

For submenu items, apply the same pattern with a separate `subRovingIndex` tracking, or simply
set all sub-items to `tabindex="-1"` since navigation into submenus is arrow-key-only.

---

#### Issue 3 — No focus restoration when the menu closes (CRITICAL)

**Root cause:** When `hide()` is called (Escape key, click-outside, item activation), focus disappears
from the document or stays in the (now-hidden) menu. The WAI-ARIA spec requires returning focus to the
element that triggered the context menu.

**Fix — add focus capture/restore to `context-menu.ts`:**

```typescript
/** The element that was focused when show() was called — restored on hide(). */
private previousFocusEl: HTMLElement | null = null;
```

Update `show(event: MouseEvent)`:
```typescript
public show(event: MouseEvent): void {
  this.previousFocusEl = this.documentRef.activeElement as HTMLElement | null;
  // ... existing show logic ...
}
```

Add private restore method:
```typescript
/**
 * Restores focus to the element that was active when the menu was opened.
 * Called when the menu closes via keyboard (Escape) or programmatic hide().
 */
private restoreFocus(): void {
  this.previousFocusEl?.focus();
  this.previousFocusEl = null;
}
```

Update the Escape handler and `hide()`:
```typescript
// In onItemKeyDown(), Escape case:
case KEYBOARD_KEYS.Escape: {
  event.preventDefault();
  this.hide();
  this.restoreFocus();
  break;
}

// In the visibility effect (when menu transitions to hidden):
// Call restoreFocus() only on keyboard-triggered close (Escape), not click-outside.
// For click-outside, focus naturally moves to the clicked element.
```

> **Trigger element documentation:** The README should document that the consumer trigger element
> (the right-click target) should have `aria-haspopup="menu"` and optionally
> `[attr.aria-expanded]="menu.isVisible()"`. The component cannot set this automatically since it
> doesn't own the trigger element — document it in README and the a11y spec host.

---

#### Issue 4 — No `@media (prefers-reduced-motion: reduce)` (MODERATE)

**Root cause:** The panel open animation uses CSS transitions. Users with vestibular sensitivities
will see the full animation.

**Fix — add to the end of `context-menu.scss`:**

```scss
// ─── Reduced motion ────────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  .ui-lib-context-menu__panel {
    transition: none;
    animation: none;
  }
}
```

---

#### Issue 5 — `Tab` key inside the menu does not close it (MODERATE)

**Root cause:** The WAI-ARIA Menu pattern specifies that pressing `Tab` inside an open menu should
close the menu and move focus to the next focusable element after the trigger. Currently `Tab` simply
advances through the (incorrectly `tabindex="0"`) items.

**Fix — add a Tab case to `onItemKeyDown()` in `context-menu.ts`:**

```typescript
case KEYBOARD_KEYS.Tab: {
  // Do NOT call event.preventDefault() — allow natural Tab movement.
  // The menu closes and focus naturally moves to the next element.
  this.hide();
  // Do NOT call restoreFocus() — Tab movement should go forward naturally.
  break;
}
```

---

#### Deliverable — `context-menu.a11y.spec.ts`

**Testing notes:**

1. **ContextMenu is a popup** — appended to `document.body` via `show(event)`. Use
   `appendToBody = true` approach from the Menu hardening spec. Alternatively, if the component
   renders in-place (check the template / show() implementation), use `checkA11y(fixture)`.
   Verify the actual rendering target before choosing the axe check approach.
2. **Trigger element** — the host component must provide a trigger `<button>` with
   `aria-haspopup="menu"` and `(contextmenu)="menu.show($event)"` or `(click)="menu.show($event)"`.
3. **`document.body.appendChild(fixture.nativeElement)`** — required for focus restoration tests
   in jsdom. Clean up with `fixture.destroy()` in `afterEach`.
4. **Simulating right-click** — use `new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 100 })`.

**Host component for a11y spec:**

```typescript
@Component({
  standalone: true,
  imports: [ContextMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      #trigger
      type="button"
      aria-haspopup="menu"
      (contextmenu)="menu.show($event)"
    >Right-click me</button>
    <ui-lib-context-menu #menu [model]="model()" [ariaLabel]="ariaLabel()" />
  `,
})
class ContextMenuA11yHostComponent {
  public readonly model: WritableSignal<ContextMenuItem[]> = signal<ContextMenuItem[]>(BASIC_ITEMS);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Options');
}
```

**Spec structure (aim for 28–36 tests):**

```
describe('ContextMenu Accessibility')
  afterEach: fixture.destroy()

  describe('panel ARIA structure')
    ✓ panel has role="menu"
    ✓ panel has aria-label from the ariaLabel input
    ✓ panel defaults to the CONTEXT_MENU_DEFAULT_ARIA_LABEL when ariaLabel is not set
    ✓ item wrapper <li> elements have role="none"
    ✓ item <a> links have role="menuitem"
    ✓ parent item (with sub-items) has aria-haspopup="menu"
    ✓ parent item has aria-expanded="false" when closed
    ✓ parent item has aria-expanded="true" when open
    ✓ separator <li> has role="separator"
    ✓ separator does NOT have aria-hidden="true"
    ✓ disabled item has aria-disabled="true"
    ✓ icon spans have aria-hidden="true"

  describe('roving tabindex')
    ✓ first enabled item has tabindex="0" when menu opens
    ✓ other items have tabindex="-1"
    ✓ disabled items always have tabindex="-1"
    ✓ tabindex="0" tracks the item focused via ArrowDown

  describe('keyboard navigation')
    ✓ ArrowDown moves focus to the next item (wraps)
    ✓ ArrowUp moves focus to the previous item (wraps)
    ✓ Home moves focus to the first item
    ✓ End moves focus to the last item
    ✓ ArrowRight opens a submenu when the item has children
    ✓ ArrowLeft closes the open submenu
    ✓ Escape closes the menu
    ✓ Tab closes the menu (does not cycle within)

  describe('focus management')
    ✓ opens and focuses the first enabled item
    ✓ restores focus to the trigger element on Escape close

  describe('axe-core automated checks')
    ✓ passes axe — menu hidden (render-only check)
    ✓ passes axe — menu open with items
    ✓ passes axe — menu open with separator
    ✓ passes axe — menu open with disabled item
    ✓ passes axe — submenu open
```

---

### Phase 1 — Architecture Audit

1. **Module-level ID counter** — add `let nextContextMenuId: number = 0` at module scope (after Phase 3 fix) with explicit `: number` type annotation.
2. **`previousFocusEl` field type** — must be `private previousFocusEl: HTMLElement | null = null` (no optional `?` — use explicit `null` initialization per project conventions).
3. **`rovingIndex` reset on show** — when `show()` is called, reset `rovingIndex.set(0)` so the first item always has the tab stop when the menu opens.
4. **`rovingIndex` and `focusByFlatIndex` sync** — ensure every code path that moves keyboard focus also updates `rovingIndex`.
5. **`afterNextRender` injection context** — `focusFirstItem()` is called inside `afterNextRender`. Verify `this.injector` is injected in the constructor and passed as `{ injector: this.injector }`.

---

### Phase 2 — DX Audit

**README improvements needed:**

1. **Trigger element pattern** — document that the consumer trigger MUST have `aria-haspopup="menu"` (and optionally `aria-expanded`) for full keyboard accessibility. Provide a copy-paste example.
2. **Global mode documentation** — document the `global` input and its behavior (listens on entire document for contextmenu events).
3. **Keyboard navigation table** — document all keyboard shortcuts.
4. **Accessibility section** — ARIA structure table, keyboard table, focus management notes.
5. **CSS custom properties table** — list all `--uilib-context-menu-*` variables.

---

### Phase 4 — Performance Audit

Verify the following patterns are in place:

- **Global listener management** — `show()` adds a global `keydown` (Escape) listener; `hide()` removes it. Use `DOCUMENT` injection (SSR-safe). ✅
- **`afterNextRender({ injector })`** — used for focus after open (not `setTimeout`). ✅
- **`computed<...>`** — `visibleItems()` and `flatFocusableItems()` are memoized signals. ✅
- **`@for ... track` uses a unique key** (item label or index). Verify this.

---

### Phase 5 — Composability Audit

Verify and confirm:

- **`ariaLabel` input** allows unique naming when multiple context menus appear on the page.
- **`itemClick` output** gives consumers access to both item data and DOM event.
- **`command` per-item callback** — per-item activation handler.
- **`show()` / `hide()` / `toggle()` public API** — full programmatic control.
- **`global` input** for document-wide right-click handling.
- **`visible: false` on items** for permission-based item hiding.

---

### Phase 6 — Polish Audit

- [ ] All interactive links have `:focus-visible` ring
- [ ] Disabled items have `pointer-events: none; cursor: not-allowed`
- [ ] Submenu caret animation (rotation) on expand
- [ ] Panel open/close transition (`opacity`, `transform`)
- [ ] `@media (prefers-reduced-motion: reduce)` added in Phase 3
- [ ] Dark mode overrides present
- [ ] All 3 variants styled correctly (material, bootstrap, minimal)

---

## Step 4 — Commands after every file change

```bash
# After any TS/HTML change:
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/context-menu/ --max-warnings 0

# After spec changes:
node_modules/.bin/jest --testPathPatterns=context-menu --no-coverage

# After all changes:
node_modules/.bin/ng build ui-lib-custom

# Entry-point regression:
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

**All commands must be run from `bash.exe`** (not PowerShell).

---

## Step 5 — Scoring

```
API:     /10  — ariaLabel; show/hide/toggle; global mode; itemClick; command; visible/disabled
A11y:    /10  — After fixes: correct separator ARIA, roving tabindex, focus restoration,
               reduced motion, trigger documentation, Tab-closes-menu
Perf:    /10  — Global listener lifecycle, afterNextRender focus, computed signals
Comp:    /10  — ariaLabel, global mode, trigger flexibility, itemClick + command dual pattern
Theme:   /10  — CSS vars, 3 variants + default, dark mode, reduced motion
DX:      /10  — README: trigger pattern, a11y section, keyboard table, CSS vars
Docs:    /10  — README accuracy post-update
Polish:  /10  — Focus rings, disabled cursor, caret animation, panel transition
Angular: /10  — Signal inputs/outputs, standalone, OnPush, ViewEncapsulation.None
Feel:    /10  — Keyboard users can open/navigate/dismiss; focus never stranded
```

Update `docs/COMPONENT_SCORES.md` — change ContextMenu row from `—` to actual scores.
Update Tier 2 #14 status from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3):

```
Date: <date> [ContextMenu — 6-phase hardening COMPLETE (#14)]
Changed: <files>
State: Complete
  Phase 3 (A11y):
    • CRITICAL FIX: Removed aria-hidden="true" from role="separator" items
    • CRITICAL FIX: Roving tabindex — only focused item has tabindex="0"
    • CRITICAL FIX: Focus restoration on Escape close
    • MODERATE FIX: Tab key closes the menu
    • MODERATE FIX: prefers-reduced-motion disables panel transition
    • Created context-menu.a11y.spec.ts (<N> tests)
  Phase 1: Module-level ID counter, rovingIndex reset on show
  Phase 2: README trigger pattern, a11y section, keyboard table
  Phase 4: No structural changes. All performance patterns verified.
  Phase 5: No API changes. Composability story correct.
  Phase 6: All polish items verified.
Verification: ESLint EXIT 0, <N>/<N> jest PASS, build PASS, entry-points PASS
Next step: PanelMenu hardening (Tier 2, #15).
```

---

## Lessons Applied From Previous Hardenings

| Lesson | Application |
|---|---|
| `role="separator"` must NOT have `aria-hidden="true"` inside `role="menu"` | Issue 1: Remove `aria-hidden` from separators |
| Roving tabindex required for WAI-ARIA Menu pattern | Issue 2: Only focused item has `tabindex="0"` |
| Focus capture/restore for popup menus | Issue 3: `previousFocusEl` pattern from Menu/Popover |
| `prefers-reduced-motion` in every animated component | Issue 4: Panel transition disabled |
| Tab key closes popup menus | Issue 5: Tab case in `onItemKeyDown` |
| Module-level ID counter with explicit `: number` type | Phase 1: `let nextContextMenuId: number = 0` |
| `document.body.appendChild(fixture.nativeElement)` for focus tests | Testing notes |
| `afterNextRender({ injector })` for DOM focus after render | Phase 1 architecture check |
| ESLint in bash.exe only | Step 4 commands |

