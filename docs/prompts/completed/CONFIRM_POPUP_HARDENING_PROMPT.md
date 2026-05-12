# ConfirmPopup — 6-Phase Hardening Prompt

> **Generated:** 2026-05-10
> **Tier:** 1 — Overlays & Dialogs (#7 in hardening queue)
> **Based on lessons from:** ConfirmDialog, Dialog, DynamicDialog, Drawer, Select, AutoComplete hardenings
>
> Run Phase 3 first (priority — Elite Accessibility is the current wow factor),
> then continue Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

Read **all** of the following in one pass before writing a single line of code:

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, code quality checklist
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — ConfirmPopup is Tier 1, #7, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/confirm-popup/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.ts`
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.html`
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.scss`
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.types.ts`
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.service.ts`
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.spec.ts`

Also read the already-hardened ConfirmDialog for the established pattern:
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.ts` (focus restoration pattern)
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.a11y.spec.ts` (a11y spec structure)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes. These must remain intact:

- `role="alertdialog"` on the panel ✅
- `aria-modal="true"` on the panel ✅
- `tabindex="-1"` on the panel ✅
- `[attr.aria-describedby]="messageId"` on the panel, pointing to the content div ✅
- `aria-hidden="true"` on the arrow div ✅
- `aria-hidden="true"` on the message icon `<i>` ✅
- `FocusTrap` activated via `afterNextRender({ injector })` on open ✅
- `FocusTrap.deactivate()` called on close and `ngOnDestroy` ✅
- `focusDefaultButton()` called after open ✅
- Escape key closes the popup via `onPanelKeydown` ✅
- Transparent overlay click dismisses via `onOverlayClick()` ✅
- `@media (prefers-reduced-motion: reduce)` sets `--uilib-confirm-popup-enter-duration: 0ms` ✅
- `:focus-visible` outline on accept and reject buttons ✅
- `transition` on accept and reject button hover states ✅
- `ConfirmPopupService` integration with key-matching ✅
- Position computing via `computeAndSetPosition()` in `afterNextRender` ✅

---

## Step 3 — Your task: the 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

#### Issue 1 — Missing accessible name on the alertdialog panel (CRITICAL)

**WCAG 2.1 SC 4.1.2 (AA):** An element with `role="alertdialog"` MUST have an accessible name
exposed to assistive technology. A name is provided by either `aria-labelledby` or `aria-label`.

**Current state:** The panel has `aria-describedby` pointing to the message content, but no
`aria-labelledby` and no `aria-label`. Screen readers will announce the role but not a name,
producing output like *"Alert dialog"* with no context. This is an axe-core violation.

**Root cause:** Unlike ConfirmDialog, ConfirmPopup has no distinct header element — it is
intentionally compact. The accessible name must come from somewhere else.

**Fix:** Add a computed `aria-label` signal to the component that returns the resolved message text.
This gives the alertdialog its ARIA-required accessible name without adding visible DOM.

Add to the component class:

```typescript
/** Accessible name for the panel — the message text serves as the alertdialog label. */
public readonly panelAriaLabel: Signal<string> = computed<string>(
  (): string => this.resolvedMessage()
);
```

Add to the panel div in the template:

```html
[attr.aria-label]="panelAriaLabel()"
```

**Why `aria-label` and not `aria-labelledby`?** The message element is already referenced by
`aria-describedby`. Using it also for `aria-labelledby` is valid per spec but produces redundant
announcements in most screen readers. `aria-label` gives the dialog a clean short name without
pointing to the full description element.

---

#### Issue 2 — Focus not restored to trigger element on close (CRITICAL)

**WCAG 2.1 SC 2.4.3 (AA):** When a dialog closes, focus must return to the element that triggered
it. ConfirmPopup receives a `target` element in its service config — this is the exact element that
focus should return to.

**Current state:** `deactivateFocusTrap()` is called on close, but no focus restoration happens.
Focus drops to `document.body`, breaking keyboard navigation.

**Unique ConfirmPopup challenge:** The trigger element arrives via `ConfirmPopupConfig.target`, not
via `document.activeElement` at the time of opening. The service config's `target` IS the trigger
element that should receive focus back, but it may also coincide with `document.activeElement` in
the typical mouse-click scenario.

**Fix:** Capture the trigger element reference when the service config arrives, and restore focus to
it when the popup closes. Capture from `document.activeElement` at open time (works for both service
and declarative usage), falling back to the service target if `document.activeElement` is body.

Add a private field to the component class:

```typescript
private previousFocusEl: HTMLElement | null = null;
```

In the visibility effect, on the `isVisible === true` branch, capture focus **before** taking over:

```typescript
// Capture current focus before the popup takes it over.
// Prefer document.activeElement (keyboard-triggered clicks), fall back to targetElement
// (mouse-triggered clicks where activeElement may still be body from the programmatic open).
const active: HTMLElement | null = this.document.activeElement as HTMLElement | null;
this.previousFocusEl =
  active && active !== this.document.body
    ? active
    : (this.targetElement() ?? null);
```

In the visibility effect, on the `isVisible === false` branch, restore focus:

```typescript
// Restore focus to the element that had it (or triggered the popup).
this.previousFocusEl?.focus();
this.previousFocusEl = null;
```

In `ngOnDestroy()`:

```typescript
this.previousFocusEl = null;
```

**Important:** `DOCUMENT` must be injected for `document.activeElement` access (SSR-safe).
Add to the class:

```typescript
private readonly document: Document = inject(DOCUMENT);
```

And add `DOCUMENT` to the imports from `@angular/core`.

---

#### Issue 3 — Overlay div missing `aria-hidden="true"` (MINOR)

**Current state:** The transparent overlay `<div class="ui-lib-confirm-popup__overlay">` is in the
DOM and interactive (has a click handler). It has no semantic content but is exposed to the
accessibility tree as an anonymous element.

**Fix:** Add `aria-hidden="true"` to the overlay div:

```html
<div class="ui-lib-confirm-popup__overlay" aria-hidden="true" (click)="onOverlayClick()"></div>
```

The click handler is not affected by `aria-hidden` — it is a DOM event, not an ARIA interaction.

---

#### Deliverable — `confirm-popup.a11y.spec.ts`

Create `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.a11y.spec.ts` with:

**Spec structure (aim for 28–35 tests):**

```
describe('ConfirmPopup Accessibility')
  describe('closed state')
    ✓ panel is not in DOM when visible=false
    ✓ no role="alertdialog" element present when closed
    ✓ axe passes in closed state

  describe('open-state ARIA structure')
    ✓ panel has role="alertdialog"
    ✓ panel has aria-modal="true"
    ✓ panel has tabindex="-1"
    ✓ panel aria-describedby resolves to message element
    ✓ panel aria-label equals the resolved message text
    ✓ overlay has aria-hidden="true"
    ✓ arrow has aria-hidden="true"
    ✓ message icon has aria-hidden="true" (when icon is provided)

  describe('focus management')
    ✓ accept button is present and focusable (defaultFocus="accept")
    ✓ reject button is present and focusable (defaultFocus="reject")
    ✓ panel has tabindex="-1" for defaultFocus="none"
    ✓ focus is restored to trigger element when popup closes via accept button
    ✓ focus is restored to trigger element when popup closes via Escape
    ✓ focus is restored to service target when popup opened programmatically via service

  describe('keyboard behaviour')
    ✓ Escape closes the popup
    ✓ accept button click closes the popup
    ✓ reject button click closes the popup

  describe('overlay dismiss')
    ✓ overlay click closes the popup (emits rejected)
    ✓ overlay has aria-hidden="true" (does not present as interactive to AT)

  describe('ConfirmPopupService-driven')
    ✓ service.confirm({ message }) opens popup with correct aria-label
    ✓ service.close() closes popup and restores focus to trigger
    ✓ defaultFocus in service config takes precedence over component default

  describe('axe-core automated checks')
    ✓ closed state passes axe
    ✓ open state passes axe (defaultFocus="accept")
    ✓ open state passes axe (defaultFocus="reject")
    ✓ service-driven open state passes axe
```

**Host component pattern:** Include a `<button class="trigger-btn">` sibling to the popup — the
focus restoration tests need a real focusable element to focus before opening, and then verify
`document.activeElement === trigger` after closing.

**`afterNextRender` limitation:** This hook does NOT run in Jest. For focus tests, verify the
presence and `hasAttribute('disabled')` of buttons rather than `document.activeElement` after open
(focus after open is covered by the after-close restoration tests which use real `.click()` APIs).

**axe-core import pattern** (use the existing utility):
```typescript
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
```

---

### Phase 1 — Architecture Audit

#### Issue — Static class field for ID counter

**Current:** `private static nextId: number = 0;` (class-level static field)

**Fix:** Replace with a module-level counter. This is the established pattern across Drawer,
DynamicDialog, and (just applied) ConfirmDialog.

Before the class declaration:
```typescript
// Module-level fallback counter for environments without crypto.randomUUID().
let nextConfirmPopupId: number = 0;
```

Remove the static field from the class. Update `generateId()`:
```typescript
private generateId(): string {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return `ui-lib-confirm-popup-${globalThis.crypto.randomUUID()}`;
  }
  nextConfirmPopupId += 1;
  return `ui-lib-confirm-popup-${nextConfirmPopupId}`;
}
```

**⚠️ Lesson learned:** The `@typescript-eslint/typedef` lint rule requires an explicit type
annotation on module-level `let` declarations. Always write `let nextConfirmPopupId: number = 0;`,
not `let nextConfirmPopupId = 0;`. Failing to do this will produce a lint error at ESLint check.

---

### Phase 2 — Developer Experience Audit

#### Issue — README Accessibility section is incomplete

**Current state:** The README accessibility section is a bare bullet list that omits focus
restoration on close, the aria-label fix, and keyboard nav details.

**Fix:** Replace the existing accessibility section with a comprehensive feature table and a
keyboard navigation table, matching the pattern from the ConfirmDialog README (updated in the
previous hardening session).

The table must document:
- `role="alertdialog"` on the panel
- `aria-modal="true"` on the panel
- `aria-label` computed from the resolved message (since there is no header element)
- `aria-describedby` pointing to the message content element
- Focus trap (Tab/Shift+Tab constrained to panel focusables)
- `defaultFocus` — which button gets focus on open
- **Focus restoration on close** — trigger element receives focus back after accept/reject/Escape/overlay-click
- Escape key closes the popup
- Overlay click dismisses the popup (reject path); overlay is `aria-hidden`
- Arrow div is `aria-hidden`
- Message icon is `aria-hidden`
- Reduced motion: `--uilib-confirm-popup-enter-duration: 0ms`
- `:focus-visible` focus rings on all buttons

Keyboard nav table should cover: Tab, Shift+Tab, Enter/Space, Escape.

---

### Phase 4 — Performance Audit

No changes expected. Verify the following are already correct and write a brief confirmation:

- `afterNextRender({ injector: this.injector })` inside `effect()` is injection-context-safe
  because the explicit `injector` option provides the required context without relying on the
  Angular call stack.
- `lastVisible` guard prevents the effect from doing work on non-transitioning renders.
- `FocusTrap` is created lazily (only on open) and destroyed on close — no persistent listener.
- `computeAndSetPosition()` runs only in `afterNextRender`, never synchronously.
- `positionReady` signal starts `false` and is set `true` after positioning — prevents flicker.

If all of the above are confirmed true, write "Phase 4: No changes. All performance patterns verified."

---

### Phase 5 — Composability Audit

No structural changes expected. Verify and write a brief confirmation of:

- Service + callbacks pattern is the correct composition story for a non-modal anchored popup.
- `key` input enables multi-instance on the same page without conflict.
- `ConfirmPopupConfig.target` is typed as `HTMLElement | EventTarget | null` — accept any real
  DOM event target (`event.currentTarget as HTMLElement` is the canonical consumer pattern).
- No content projection is needed — the popup is intentionally compact and data-driven.

If all confirmed, write "Phase 5: No changes. Composability story is correct for this component type."

---

### Phase 6 — Polish Audit

The SCSS already has `transition` and `:focus-visible` on accept/reject buttons. Verify:

- [ ] No button in the popup is missing a `:focus-visible` ring
- [ ] `transition` on hover state is present for all interactive elements
- [ ] Arrow CSS triangle color matches `--uilib-confirm-popup-bg` for all variants
- [ ] Bootstrap variant arrow has a border-matching color (check the SCSS — this is already coded)
- [ ] `@media (prefers-reduced-motion: reduce)` sets duration to 0ms ✅

If all pass, write "Phase 6: No SCSS changes needed. All polish requirements met."

---

## Step 4 — After every file change

After the TS change: `node_modules/.bin/eslint projects/ui-lib-custom/src/lib/confirm-popup/ --max-warnings 0`
After the spec change: `node_modules/.bin/jest --testPathPatterns=confirm-popup --no-coverage`
After all changes: `node_modules/.bin/ng build ui-lib-custom`
Entry-point regression: `node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage`

**All commands must be run from `bash.exe`** (not PowerShell — ESLint exit code is unreliable in PowerShell).

---

## Step 5 — Scoring (after all phases complete)

Score the component using the 10-category rubric from `docs/COMPONENT_SCORES.md`:

```
API:     /10  — Inputs consistent with ConfirmDialog; target element pattern is idiomatic
A11y:    /10  — After fixes: role=alertdialog, aria-label, aria-describedby, focus trap, focus restore
Perf:    /10  — afterNextRender positioning, lastVisible guard, lazy FocusTrap
Comp:    /10  — Service + callbacks + key targeting
Theme:   /10  — CSS vars, 3 variants, reduced motion
DX:      /10  — README completeness, TypeScript DX, minimal setup
Docs:    /10  — README accuracy post-update
Polish:  /10  — Animation, transitions, focus rings, arrow
Angular: /10  — Signals-first, OnPush, standalone, SSR-safe
Feel:    /10  — Anchored popup feels precise and responsive
```

Update `docs/COMPONENT_SCORES.md` — change ConfirmPopup row from `—` to actual scores.
Update Tier 1 #7 status from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3):

```
Date: 2026-05-10 [ConfirmPopup component — 6-phase hardening COMPLETE]
Changed: <list all modified files>
State: <what is complete>
  Phase 3 (A11y — priority):
    • CRITICAL FIX: aria-label added to alertdialog panel (message text as accessible name)
    • CRITICAL FIX: focus restored to trigger element on close (previousFocusEl)
    • MINOR FIX: overlay div has aria-hidden="true"
    • Created confirm-popup.a11y.spec.ts with <N> tests
    • Pre-existing a11y features verified intact: <list>
  Phase 1 (Architecture): <describe>
  Phase 2 (DX): <describe>
  Phase 4 (Performance): <describe>
  Phase 5 (Composability): <describe>
  Phase 6 (Polish): <describe>
Verification:
  node_modules\.bin\eslint ... --max-warnings 0 (CLEAN, EXIT:0)
  node_modules\.bin\jest --testPathPatterns=confirm-popup --no-coverage (<N>/<N> PASS)
  node_modules\.bin\jest --testPathPatterns=entry-points --no-coverage (95/95 PASS)
  node_modules\.bin\ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: <any workarounds discovered>
Next step: Popover hardening (Tier 1, #8) — key a11y: aria-expanded, aria-controls, dismiss without losing focus context
```

---

## Lessons Learned Reference (from previous hardenings)

These are standing rules distilled from 7+ previous hardening sessions. Apply all of them:

| Lesson | Detail |
|---|---|
| Module-level counter needs explicit type | `let nextFooId: number = 0` — omitting `: number` triggers `@typescript-eslint/typedef` |
| `DOCUMENT` injection for focus | Use `inject(DOCUMENT)` to access `document.activeElement` — never `window.document` directly |
| `previousFocusEl` capture timing | Capture BEFORE `afterNextRender`; restore on the `false` branch of the visibility effect |
| `afterNextRender` in Jest | Does NOT run. Test focus presence via `hasAttribute('disabled')` and button existence. Restoration tests work via `.click()` → flushEffects |
| `textContent` assertion style | Use `textContent!.trim()` (non-null assertion), never `?.trim()` — the latter triggers `@typescript-eslint/no-unnecessary-condition` |
| `aria-hidden` on overlays/backdrops | Every decorative full-screen overlay div should have `aria-hidden="true"` regardless of whether it has a click handler |
| `alertdialog` requires accessible name | `role="alertdialog"` elements MUST have `aria-labelledby` or `aria-label` — omitting this is an axe-core violation |
| ESLint in bash.exe only | Run `node_modules/.bin/eslint` from bash.exe. PowerShell returns exit code 1 even on clean runs |
| `TestBed.flushEffects()` after `.click()` | Always call `fixture.detectChanges()` → `TestBed.flushEffects()` → `fixture.detectChanges()` after any DOM interaction in zoneless OnPush tests |
| Focus restoration in service-driven mode | The `target` in `ConfirmPopupConfig` IS the trigger element. Capture from `document.activeElement` at open time; if that is `document.body`, fall back to `targetElement()` signal |

