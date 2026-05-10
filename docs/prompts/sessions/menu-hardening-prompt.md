# Menu Component — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/menu` · `<ui-lib-menu>`
**Queue position:** Tier 2, #12
**Key a11y concern:** `role=menu`, keyboard nav (arrow-key roving tabindex, wrap-around), focus restoration on close, separator role semantics, Tab-closes-popup

> **Read before starting:**
> 1. `AI_AGENT_CONTEXT.md` — current milestone and queue status
> 2. `LIBRARY_CONVENTIONS.md` — non-negotiable project rules
> 3. Source files listed below — already pasted in full below under "Component source snapshot"
> 4. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase scorecard definitions

---

## Component Source Snapshot

All five source files are pasted verbatim below. Do NOT assume anything not present here.

### `projects/ui-lib-custom/src/lib/menu/menu.ts`
*(full 428-line file — paste verbatim here when running the prompt)*

### `projects/ui-lib-custom/src/lib/menu/menu.html`
*(full 151-line file — paste verbatim here)*

### `projects/ui-lib-custom/src/lib/menu/menu.scss`
*(full 280-line file — paste verbatim here)*

### `projects/ui-lib-custom/src/lib/menu/menu.types.ts`
*(full 48-line file — paste verbatim here)*

### `projects/ui-lib-custom/src/lib/menu/menu.spec.ts`
*(full 565-line file — paste verbatim here)*

---

## Context: Lessons Learned from Previous Hardening Sessions

Absorb every item below before writing a single line of code. These are hard-won lessons from Menubar (#11), Toast (#10), Tooltip (#9), Popover (#8), and ConfirmPopup (#7).

### Architecture patterns (mandatory)
- **Module-level ID counter** — use `let nextMenuId: number = 0` at module scope (never a `static` class field; the linter flags static mutable fields). Increment in the constructor to make each instance unique: `menuId = 'ui-lib-menu-' + (++nextMenuId)`. Expose it as a `public readonly` string. Use it for `id` bindings in the template so multiple menu instances on the same page never share the same DOM id.
- **Focus capture/restore for popup mode** — add `private previousFocusEl: HTMLElement | null = null`. In `show()`, capture `this.documentRef.activeElement as HTMLElement | null`. In `hide()` call a private `restoreFocus()` method that calls `this.previousFocusEl?.focus()` then nulls the field. Use `afterNextRender({ injector: this.injector })` in the visibility effect for focus operations, NOT inline `setTimeout`.

### Keyboard navigation (WAI-ARIA Menu pattern — CRITICAL)
- **Roving tabindex inside the menu** — only the currently focused item (or the first item when the menu opens) should have `tabindex="0"`; all other `.ui-lib-menu__link` elements must have `tabindex="-1"`. This is the correct WAI-ARIA menu keyboard pattern. Currently ALL enabled items have `tabindex="0"`, which puts every item in the page tab order — that is wrong.
  - Implement via a `rovingIndex: WritableSignal<number>` (default `0`). Expose a template helper: `getTabIndex(item: MenuItem, flatIndex: number): string` that returns `'0'` when `flatIndex === rovingIndex()` and `'-1'` otherwise.
  - Update `focusByFlatIndex()` to call `rovingIndex.set(index)` before calling `link.focus()`.
  - Update `onItemFocus()` to call `rovingIndex.set(this.getFlatIndex(item))`.
- **Wrap-around navigation** — `ArrowDown` at the last item wraps to the first; `ArrowUp` at the first item wraps to the last. Currently `moveFocus()` stops at boundaries — fix it:
  ```typescript
  private moveFocus(fromIndex: number, direction: 1 | -1): void {
    const total: number = this.flatFocusableItems().length;
    if (total === 0) { return; }
    const nextIndex: number = (fromIndex + direction + total) % total;
    this.focusByFlatIndex(nextIndex);
  }
  ```
- **Tab key closes popup** — inside `onItemKeyDown()`, add a `case KEYBOARD_KEYS.Tab` branch: `if (this.popup()) { this.hide(); }` — do NOT call `event.preventDefault()` so the browser's natural Tab movement takes focus out of the popup and the popup hides.
- **Escape focus restoration in popup** — the current Escape handler in `onItemKeyDown` calls `this.hide()` but never restores focus to the trigger. After `this.hide()`, call `this.restoreFocus()`.

### ARIA corrections (CRITICAL)
- **`role="separator"` must NOT have `aria-hidden="true"`** inside a `role="menu"` or `role="group"`. The separator is a semantic ARIA child of the menu, and hiding it removes structural information from the accessibility tree. Remove `aria-hidden="true"` from separator `<li>` elements. (The WAI-ARIA spec says `role="separator"` is a valid required or allowed child of `role="menu"` — see APG 1.2.)
- **`role="none"` is the correct wrapper** for `<li>` elements that hold `role="menuitem"` — it neutralises the implicit `listitem` role. Double-check this is present on all item `<li>` elements. DO NOT add `role="none"` to separator `<li>` elements (they already have `role="separator"`).
- **axe-core `aria-required-children` false positive** — axe 4.x flags `role="menu"` because the `<ul role="presentation">` wrapper inside the panel breaks the expected direct-child chain. Suppress only `aria-required-children` in the a11y spec's axe options (use `MENU_AXE_RULES` constant with an explanatory comment, mirroring the Menubar pattern).
- **Popup trigger linkage** — in the demo / README usage, the trigger button must have `aria-haspopup="menu"` and `[attr.aria-expanded]="menu.isVisible()"`. Document this in the README and the a11y spec host component.

### CSS / reduced motion
- **`@media (prefers-reduced-motion: reduce)` is mandatory.** Add a block at the bottom of `menu.scss`:
  ```scss
  @media (prefers-reduced-motion: reduce) {
    ui-lib-menu .ui-lib-menu__panel--popup {
      transition: none;
    }
  }
  ```
  The existing `opacity: 0 → 1` transition on the popup panel must be disabled.

### A11y spec file (`menu.a11y.spec.ts`)
This file does not exist yet — create it. Mirror the structure from `menubar.a11y.spec.ts`:
- Import `checkA11y` and `SKIP_COLOR_CONTRAST_RULES` from `../../test/a11y-utils`.
- Define `MENU_AXE_RULES` constant that spreads `SKIP_COLOR_CONTRAST_RULES` and adds `'aria-required-children': { enabled: false }`.
- Use `document.body.appendChild(fixture.nativeElement)` before focus tests so jsdom focus works.
- Use `afterEach(() => fixture.destroy())` for DOM cleanup — `fixture.destroy()` does not remove the node from `document.body` automatically, but it tears down the Angular view, which is sufficient for per-test TBed isolation.
- Target **≥ 40 a11y tests** across these describe blocks:
  1. **ARIA structure — static mode** (role=menu on panel, role=menuitem on links, role=none on li wrappers, role=separator on separators, role=group on group-lists, aria-label on panel and group-lists)
  2. **ARIA structure — grouped items** (group-label aria-hidden, group-list aria-label, child menuitem roles)
  3. **Roving tabindex** (first item tabindex=0 in static mode, other items tabindex=-1, rovingIndex updates on ArrowDown/ArrowUp, tabindex restored after focus)
  4. **Keyboard nav — arrow keys** (ArrowDown moves focus, ArrowUp moves focus, ArrowDown wraps last→first, ArrowUp wraps first→last, Home focuses first, End focuses last)
  5. **Keyboard nav — activation** (Enter activates, Space activates, Escape closes popup)
  6. **Keyboard nav — Tab closes popup** (Tab in popup mode hides panel)
  7. **Focus management — popup** (focus moves to first item on show, focus restores to trigger on hide/Escape)
  8. **Separator semantics** (role=separator present, aria-hidden NOT present on separator)
  9. **Disabled items** (aria-disabled=true, tabindex=-1, not in flatFocusableItems)
  10. **axe-core** (static mode passes with MENU_AXE_RULES, grouped model passes, disabled item passes, popup open state passes)

### Testing patterns
- All host components in specs use `ChangeDetectionStrategy.OnPush` + `provideZonelessChangeDetection()`.
- Use typed query helpers `queryEl<T>()` and `queryAllEl<T>()` (same pattern as Menubar a11y spec).
- Use `dispatchKey(el, key)` helper for keyboard events with `bubbles: true, cancelable: true`.
- For popup focus-restore tests: create a real trigger `<button>` in the host template, append the fixture to `document.body`, open the menu with `instance.show(event)` where `event.currentTarget` is the button, then close and assert `document.activeElement === triggerButton`.

### README update (full rewrite required)
The current README has 38 lines and is missing: MenuItem interface table, ARIA structure table, keyboard navigation table, CSS custom properties table, accessibility section, multiple-menu guidance. Rewrite it to match the quality of the Menubar README.

---

## Pre-flight Checklist (read before writing code)

- [ ] Read all five source files in full — do not skim
- [ ] Confirm the `KEYBOARD_KEYS` constant location (`ui-lib-custom/core`) and its key names (`ArrowDown`, `ArrowUp`, `Home`, `End`, `Enter`, `Space`, `Escape`, `Tab`)
- [ ] Confirm `checkA11y` signature: `checkA11y(fixture, options?)` from `../../test/a11y-utils`
- [ ] Note that `focusByFlatIndex(0)` is called inside an `afterNextRender` in the visibility effect — the `rovingIndex.set(0)` call should happen at the same time, NOT before the render
- [ ] Confirm the `panelRef` viewChild is typed `Signal<ElementRef<HTMLElement> | undefined>` — `focusByFlatIndex` must guard `if (!panel) return`

---

## Phase-by-Phase Instructions

### Phase 1 — Architecture Review

Run this analysis prompt against all five source files and `LIBRARY_CONVENTIONS.md`:

```
Analyze this Angular Menu component architecture for long-term scalability inside a
next-generation Angular UI ecosystem (signals-first, standalone, zoneless, SSR-safe).

Specifically identify:
1. Missing instance-unique ID strategy — there is no nextMenuId counter. Multiple Menu
   instances on the same page will have no unique DOM ids, which is a future ARIA
   linkage problem. Propose adding a module-level `let nextMenuId: number = 0` counter
   and a `public readonly menuId: string` field (e.g. 'ui-lib-menu-1').
2. Focus restoration gap in popup mode — `previousFocusEl` capture/restore pattern is
   missing. On `show()`, capture `document.activeElement`. On `hide()`, restore it via a
   `private restoreFocus()` helper called after `isVisible.set(false)`.
3. Roving tabindex is absent — all enabled menu items currently get `tabindex="0"`.
   Propose a `rovingIndex: WritableSignal<number>` and `getTabIndex()` template helper.
4. `moveFocus()` does not wrap around — propose wrap-around using modulo arithmetic.
5. Tab key is unhandled in `onItemKeyDown()` — in popup mode it should close the panel
   without preventing default.
6. Any other architecture issues (SSR safety, lifecycle, effect patterns).

Propose the minimal, targeted changes needed — do not redesign the API.
```

**Expected output from Phase 1:**
- `nextMenuId` counter + `menuId` field added to `menu.ts`
- `previousFocusEl: HTMLElement | null = null` field + `restoreFocus()` private helper
- `rovingIndex: WritableSignal<number> = signal<number>(0)` added
- `getTabIndex(item: MenuItem, flatIndex: number): string` template helper
- `moveFocus()` fixed with wrap-around
- `Tab` case added to `onItemKeyDown()` switch

**After Phase 1:** Run `npx eslint projects/ui-lib-custom/src/lib/menu/ --max-warnings 0` from `bash.exe`. Fix any errors before continuing.

---

### Phase 2 — DX Optimization

```
Optimize the Menu component for elite developer experience.

The component API is already clean — focus only on:
1. Verify the README accurately reflects all inputs, outputs, public methods
   (toggle/show/hide), and the MenuItem interface. The current README is a stub
   (38 lines) — it needs a full MenuItem interface table, a keyboard nav table,
   a CSS custom properties table, an accessibility notes section, and a minimal
   usage example for both static and popup modes.
2. Check jsdoc on every public method and input — add or improve where missing.
3. Verify TypeScript autocomplete quality — ensure all types are explicit (no inference).
4. Identify any input naming that could be confusing and suggest improvements
   (keep changes minimal — only fix genuine ambiguities).
5. Verify the exported `MENU_DEFAULT_ARIA_LABEL` constant is documented appropriately.

Do NOT change the public API inputs/outputs — only improve documentation and typing.
```

**Expected output from Phase 2:**
- Updated `README.md` — full MenuItem interface table, keyboard nav table, CSS vars table, ARIA notes section, a11y best-practices section, multiple-menu guidance
- JSDoc improvements on public methods (especially `toggle`, `show`, `hide`, `ariaLabel`)

---

### Phase 3 — Accessibility Audit (PRIORITY PHASE — do this with maximum care)

```
Perform a full WAI-ARIA Menu pattern audit on this Angular menu component.

Reference: WAI-ARIA Authoring Practices Guide 1.2, "Menu and Menubar Pattern"
(https://www.w3.org/WAI/ARIA/apg/patterns/menu/).

Audit and fix:

1. SEPARATOR ARIA — The separator <li> elements have role="separator" AND aria-hidden="true".
   This is incorrect: role="separator" inside role="menu" is a valid ARIA child that conveys
   group boundaries. Remove aria-hidden="true" from all separator <li> elements. The separator
   DOES communicate structure to screen readers within a menu.

2. ROVING TABINDEX — All enabled items currently have tabindex="0". Per WAI-ARIA, only the
   currently focused item (or the first item when the menu opens) should have tabindex="0";
   all others have tabindex="-1". Implement the rovingIndex WritableSignal from Phase 1 in
   the template — use the getTabIndex() helper on every link element.

3. TAB KEY — In popup mode, pressing Tab while a menu item is focused should hide the popup
   (do not prevent default — let the browser move focus naturally). Add a Tab case to
   onItemKeyDown().

4. FOCUS RESTORATION — After hide() is called (via Escape, click-outside, Tab, or item
   activation), programmatic focus must return to the element that had focus before the popup
   opened. Use the previousFocusEl pattern from Phase 1. Call restoreFocus() from:
   - the Escape case in onItemKeyDown()
   - the Tab case in onItemKeyDown()
   - hide() when called programmatically or via click-outside

5. ARROW KEY WRAP-AROUND — ArrowDown at the last item must wrap to index 0. ArrowUp at
   index 0 must wrap to the last item. Fix moveFocus() with modulo arithmetic.

6. REDUCED MOTION — Add @media (prefers-reduced-motion: reduce) to menu.scss that sets
   the popup panel transition to none.

7. POPUP PANEL FOCUSABILITY — Verify the popup panel div itself does NOT have tabindex=-1
   or tabindex=0; keyboard users navigate via the menu items only.

8. SCREEN READER ANNOUNCEMENT ON OPEN — The panel already has role="menu" and aria-label.
   Verify both are present and correctly wired.

After all changes, also create menu.a11y.spec.ts with ≥ 40 tests (see structure below).

The a11y spec must:
- Import checkA11y and SKIP_COLOR_CONTRAST_RULES from '../../test/a11y-utils'
- Define MENU_AXE_RULES = { ...SKIP_COLOR_CONTRAST_RULES, 'aria-required-children': { enabled: false } }
  (with a comment explaining the false positive: axe 4.x flags role="menu" when ul role="presentation"
  is used as an intermediate wrapper — our structure matches WAI-ARIA spec)
- Use document.body.appendChild(fixture.nativeElement) before focus-dependent tests
- Have afterEach(() => fixture.destroy()) for DOM cleanup
- Test structure (describe blocks):
  1. ARIA structure — static mode (6-8 tests)
  2. ARIA structure — grouped items (4-5 tests)
  3. Separator semantics (3 tests: role=separator present, aria-hidden NOT present, not focusable)
  4. Roving tabindex (4-5 tests)
  5. Keyboard navigation — arrow keys with wrap-around (6 tests)
  6. Keyboard navigation — activation keys and Escape (4 tests)
  7. Keyboard navigation — Tab closes popup (2 tests)
  8. Focus management — popup opens to first item, closes to trigger (3-4 tests)
  9. Disabled items (3 tests)
  10. axe-core (4 tests: static, grouped, disabled-item, popup-open)
```

**Critical verification after Phase 3:**
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/menu/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=menu --no-coverage
```
Both must be clean before proceeding.

---

### Phase 4 — Performance Audit

```
Perform a performance analysis of the Menu component.

Analyze and verify (this component is already well-structured — mostly verification):
1. Effect patterns — the two effects in the constructor are correct. Verify that the
   document event listeners are only registered when popup=true AND isVisible=true,
   and are always cleaned up in ngOnDestroy. No action needed unless a gap is found.
2. The flatFocusableItems() computed signal runs a nested loop over visibleItems — verify
   it is memoized correctly (it is a computed(), so yes). No change needed.
3. The focusByFlatIndex() method queries the DOM at event time (not in a computed or
   effect) — this is correct; do not cache it.
4. afterNextRender usage — confirm that afterNextRender({ injector }) is used for all
   post-render DOM operations (focus, position adjustment). If any operation is inside a
   plain effect() doing DOM manipulation synchronously, move it to afterNextRender.
5. Verify getVisibleGroupItems() is called at template render time only, not in an effect.
6. Check for any memory leak risk: if the component is destroyed while isVisible=true,
   the document listeners are cleaned up via ngOnDestroy — verify this.

Report findings. Make changes only where a genuine issue exists.
```

---

### Phase 5 — Composability Audit

```
Audit the Menu component for composability and developer extensibility.

Analyze:
1. The itemTemplate slot — there is no way for a consumer to provide a custom item
   template. This is a known limitation. Assess whether an @if (itemTemplate) ng-content
   projection path would be feasible without a breaking API change. If feasible, propose;
   if not feasible without significant redesign, document it in the README as a known
   limitation and future roadmap item.
2. The trigger coupling — in popup mode, the consumer must manually wire aria-haspopup,
   aria-expanded, and aria-controls on the trigger button. Assess whether a
   MenuTriggerDirective could abstract this. Document your recommendation in the README if
   not implementing.
3. Verify the two projection slots (start/end content) are absent — this component has no
   ng-content slots by design (model-driven). Confirm this is acceptable for the current
   use case.
4. The command + itemClick dual pattern — verify both are correctly implemented and
   documented. No changes needed if already correct.
5. Note any API inputs that could be removed or merged without breaking existing usage.

Document findings without redesigning the API.
```

---

### Phase 6 — Emotional Polish

```
Analyze and improve the Menu component's emotional UX quality — the hidden layer most
developers miss.

Improve:
1. Popup enter animation — the current opacity 0→1 transition (0.08s) is fast and
   functional but emotionally flat. Consider adding a subtle translateY(-4px)→translateY(0)
   slide-in alongside the opacity fade for a more organic, modern feel. Keep the animation
   under 120ms total. Ensure the @media (prefers-reduced-motion: reduce) disables it.
2. Item hover feedback — the hover background transition (0.12s) is good. Verify it also
   applies to keyboard focus (:focus-visible). It does — confirm no change needed.
3. Icon alignment — verify icons are visually centered and gap is consistent across all three
   variants and three sizes. Adjust if any visual inconsistency exists.
4. Separator breathing room — the 1px separator with margin (--uilib-menu-separator-my) is
   minimal. Verify it feels intentional and not cramped. Compare sm/md/lg sizes.
5. Group label visual hierarchy — the uppercase, letter-spaced, small group label is good.
   Verify it has enough visual separation from the items below and above it.
6. Variant polish pass — verify material, bootstrap, and minimal variants each feel
   appropriately distinct and consistent with their respective design systems.
7. Dark mode pass — verify dark mode CSS variables produce correct contrast without
   color-contrast rule (which we skip in axe tests since jsdom cannot compute CSS vars).

Make only targeted, meaningful changes. Do not change any existing correct styles.
```

---

## Final Verification Checklist

Run every command from `bash.exe` (not PowerShell — ESLint exits with 1 in PowerShell even on clean runs).

```bash
# 1. Lint — must be zero warnings
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/menu/ --max-warnings 0

# 2. Unit tests + a11y tests — all must pass
node_modules/.bin/jest --testPathPatterns=menu --no-coverage

# 3. Entry-point regression
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage

# 4. Build — zero errors, zero warnings
node_modules/.bin/ng build ui-lib-custom
```

---

## Score Targets

After all 6 phases, score the component and record in `docs/COMPONENT_SCORES.md`:

| Category | Target | Notes |
|----------|--------|-------|
| API | 9 | Clean and minimal — the current API is already well-designed |
| A11y | 9 | After roving tabindex, wrap-around, focus restore, separator fix, reduced motion |
| Perf | 9 | Already well-structured; verify effect/afterNextRender patterns |
| Comp | 8 | Single-slot limitation is a known trade-off for model-driven menus |
| Theme | 9 | Full CSS var coverage already exists |
| DX | 9 | After README rewrite and jsdoc improvements |
| Docs | 9 | After full README rewrite |
| Polish | 9 | After slide-in animation improvement |
| Angular | 9 | Signals-first, OnPush, standalone, zoneless-compatible |
| Feel | 9 | After animation polish and variant verification |

**Minimum target average: 9.0**

---

## Session Handoff Protocol

When all 6 phases are complete, append this block to `AI_AGENT_CONTEXT.md → ## Recent Handoffs`:

```
Date: YYYY-MM-DD [Menu component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/menu/menu.ts (list changes here)
  - projects/ui-lib-custom/src/lib/menu/menu.html (list template changes)
  - projects/ui-lib-custom/src/lib/menu/menu.scss (reduced motion, animation polish)
  - projects/ui-lib-custom/src/lib/menu/menu.a11y.spec.ts (CREATED — N tests)
  - projects/ui-lib-custom/src/lib/menu/README.md (full rewrite)
  - docs/COMPONENT_SCORES.md (Menu: ✅ Done, Tier 2 #12)
  - AI_AGENT_CONTEXT.md (this file — status updated)
State: Menu component fully evolved through all 6 phases. Score N/10.
Verification:
  eslint projects/ui-lib-custom/src/lib/menu/ --max-warnings 0 (CLEAN)
  jest --testPathPatterns=menu --no-coverage (N/N PASS)
  jest --testPathPatterns=entry-points --no-coverage (N/N PASS)
  ng build ui-lib-custom — zero errors, zero warnings
Next step: TieredMenu hardening (Tier 2, #13)
```

Then move the oldest handoff in `AI_AGENT_CONTEXT.md` to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md` (keep only 3 handoffs active).

---

## Reference: Known Anti-Patterns to Avoid

| Anti-pattern | Correct approach |
|---|---|
| `static nextId` class field | Module-level `let nextMenuId: number = 0` |
| `setTimeout()` for focus | `afterNextRender({ injector: this.injector })` |
| `aria-hidden="true"` on `role="separator"` inside a menu | Remove `aria-hidden` — separator is a valid ARIA child |
| `tabindex="0"` on all menu items | Roving tabindex — only focused/first item gets `tabindex="0"` |
| `moveFocus` stops at boundaries | Wrap-around with `(fromIndex + direction + total) % total` |
| Tab key unhandled in menu | `Tab` → `if (this.popup()) { this.hide(); restoreFocus(); }` (no preventDefault) |
| No previousFocusEl capture | Capture `document.activeElement` in `show()`, restore in `restoreFocus()` |
| Missing reduced motion | Add `@media (prefers-reduced-motion: reduce)` block in SCSS |
| ESLint run from PowerShell | Always run from `bash.exe` — PowerShell returns exit 1 even on clean runs |

