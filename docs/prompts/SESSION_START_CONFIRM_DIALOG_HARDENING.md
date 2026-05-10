# Session Prompt — ConfirmDialog Component Hardening

> **Copy the block below and paste it as the first message in a new AI agent session.**
> The prompt is self-contained. The agent needs no prior context from this session.
>
> **Also read the prior hardening prompts** for lessons that carry forward into this session:
> - `docs/prompts/SESSION_START_DIALOG_HARDENING.md` — focus trap + queueMicrotask focus patterns
> - `docs/prompts/SESSION_START_DRAWER_HARDENING.md` — `as Type | null` cast pattern
> - `docs/prompts/SESSION_START_AUTOCOMPLETE_HARDENING.md` — cumulative inherited-lessons table

---

## Prompt

```
You are a senior Angular framework architect and elite UI systems engineer working on ui-lib-custom — a next-generation Angular UI ecosystem with a current strategic commitment to Elite Accessibility as its signature strength.

---

## Step 1 — Read these files before doing anything else (in this order)

1. `AI_AGENT_CONTEXT.md` — current milestone, component inventory, recent handoffs
2. `LIBRARY_CONVENTIONS.md` — all architectural rules and the bash.exe terminal requirement
3. `docs/VISION.md` — strategic north star, especially the "Committed — Elite Accessibility" section
4. `docs/COMPONENT_SCORES.md` — the hardening backlog; ConfirmDialog is #6 in Tier 1
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow you will follow
6. `projects/ui-lib-custom/src/lib/confirm-dialog/README.md` — the component API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.ts`
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.html`
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.scss`
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.types.ts`
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.service.ts`
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.spec.ts`

Read the Dialog component for established patterns to follow:
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts`
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.html`

Do not write any code until you have read all of the above.

---

## Step 2 — Your task

Evolve the ConfirmDialog component through the 6-phase workflow defined in
`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The current committed wow factor for this library is **Elite Accessibility**.
The key a11y concern for ConfirmDialog (from the hardening backlog) is:
> `role=alertdialog`, default focus on confirm action, focus return on close

Run **Phase 3 first (Accessibility Audit)** — this is the priority phase given the wow factor.
Then continue with Phases 1, 2, 4, 5, 6.

---

## What is already present — do not regress these

Before proposing any changes, verify the following are already in the component source. These
features should NOT be changed unless a significant bug is found:

- `role="alertdialog"` on the panel element ✅
- `aria-modal="true"` on the panel ✅
- `aria-labelledby` pointing to `headerId` (the header text span) ✅
- `aria-describedby` pointing to `messageId` (the message content div) ✅
- `tabindex="-1"` on the panel (allows programmatic focus as fallback) ✅
- `aria-label="Close"` on the close (×) button ✅
- Inline SVG with `aria-hidden="true"` on close-button icon ✅
- `aria-hidden="true"` on the message icon `<i>` ✅
- `FocusTrap.activate()` called via `afterNextRender()` when dialog opens ✅
- `FocusTrap.deactivate()` called when dialog closes ✅
- `focusDefaultButton()` — focuses accept/reject/panel based on `defaultFocus` input ✅
- Escape key closes the dialog (via `onPanelKeydown`) ✅
- Body scroll lock / unlock via `applyScrollLock` / `releaseScrollLock` ✅
- `@media (prefers-reduced-motion: reduce)` sets animation durations to 0ms in SCSS ✅
- `ConfirmationService` integration for programmatic opening ✅

---

### Accessibility concerns (Phase 3 — priority)

#### Issue 1 — Focus not restored to trigger element on close (CRITICAL)

When the dialog closes (via accept, reject, Escape, or close button), DOM focus is dropped —
typically landing on `document.body`. This breaks the keyboard user's position in the page.

**WCAG 2.1 SC 2.4.3 (AA):** Focus must be managed so that users can continue from where they
left off after a modal closes.

**Fix:** Store `document.activeElement` immediately before the dialog opens, then restore it
when the dialog closes.

Add a private field to the class:
```typescript
private previousFocusEl: HTMLElement | null = null;
```

In the visibility effect, capture focus before opening and restore on close:
```typescript
if (isVisible) {
  // Capture the element that has focus right now, before the dialog takes over.
  this.previousFocusEl = this.document.activeElement as HTMLElement | null;
  this.applyScrollLock();
  afterNextRender(
    (): void => {
      if (this.visible()) {
        this.activateFocusTrap();
        this.focusDefaultButton();
      }
    },
    { injector: this.injector }
  );
} else {
  this.releaseScrollLock();
  this.deactivateFocusTrap();
  // Restore focus to the element that had it before the dialog opened.
  this.previousFocusEl?.focus();
  this.previousFocusEl = null;
}
```

Also clear it in `ngOnDestroy()`:
```typescript
public ngOnDestroy(): void {
  this.releaseScrollLock();
  this.deactivateFocusTrap();
  this.previousFocusEl = null;   // ← add this
}
```

#### Issue 2 — Backdrop div has no `aria-hidden="true"` (MINOR)

The backdrop `<div class="ui-lib-confirm-dialog__backdrop">` is purely decorative (a full-screen
translucent overlay). Screen readers should not encounter it. Add `aria-hidden="true"`:

```html
<div class="ui-lib-confirm-dialog__backdrop" aria-hidden="true" (click)="onBackdropClick()"></div>
```

#### Issue 3 — No dedicated `confirm-dialog.a11y.spec.ts`

Create `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.a11y.spec.ts` covering:

**Closed state / not in DOM (3 tests):**
- Panel is not in DOM when `visible=false`
- No `role="alertdialog"` element present
- axe passes in closed state

**Open-state ARIA structure (8 tests):**
- Panel has `role="alertdialog"`
- Panel has `aria-modal="true"`
- Panel has `aria-labelledby` attribute that resolves to the header text element
- Panel has `aria-describedby` attribute that resolves to the message element
- Header text matches the `header` input
- Message text matches the `message` input
- Close button (when `closable=true`) has `aria-label="Close"`
- Close button icon has `aria-hidden="true"`

**Focus management (5 tests):**
- `defaultFocus="accept"` → accept button has focus after open
- `defaultFocus="reject"` → reject button has focus after open
- `defaultFocus="none"` → neither button has focus (panel or body has focus)
- Focus is restored to trigger element when dialog closes via accept
- Focus is restored to trigger element when dialog closes via Escape

**Keyboard behaviour (3 tests):**
- Escape closes the dialog
- Accept button click closes the dialog
- Reject button click closes the dialog

**Backdrop (2 tests):**
- Backdrop has `aria-hidden="true"`
- Backdrop click closes the dialog when `dismissableMask=true`

**ConfirmationService-driven (3 tests):**
- `service.confirm({ header, message })` opens the dialog with correct ARIA text
- `service.close()` closes the dialog and restores focus
- `defaultFocus` in service config takes precedence over input default

**axe-core automated checks (4 tests):**
- Closed state passes axe
- Open state passes axe (defaultFocus="accept")
- Open state passes axe (defaultFocus="reject")
- Open state with service-driven config passes axe

---

### Architecture concerns (Phase 1)

4. **`lastVisible` non-signal guard** — The component uses `private lastVisible: boolean = false` to gate repeated effect invocations. This is a valid pattern (avoids running open/close logic on no-op re-renders) and should be kept. Do not replace it with a signal — it is intentionally not reactive.

5. **`afterNextRender` + visibility guard** — The `afterNextRender` callback checks `if (this.visible())` before calling `focusDefaultButton()`. This is the correct Dialog-hardening pattern: the dialog may have already been closed by the time the render fires (e.g., accept/reject called during the same tick). Keep this guard.

6. **`generateId()` using `crypto.randomUUID()`** — This is SSR-safe with a counter fallback. Do not change it.

---

### DX concerns (Phase 2)

7. **No `ariaLabel` input for the panel itself** — The panel is already named via `aria-labelledby` pointing to the header text, which is good. An additional `ariaLabel` input for the panel is not needed and would be redundant.

8. **`defaultFocus` supports only 3 values** — `'accept' | 'reject' | 'none'`. This is the right API surface. Do not add more.

---

## Step 3 — After all 6 phases are complete

1. Score the component using the Scoring Session Template from `docs/COMPONENT_SCORES.md`
2. Update the ConfirmDialog row in `docs/COMPONENT_SCORES.md` with the actual scores
3. Update the Queue status for ConfirmDialog from ⏳ to ✅ or 🔄 depending on outcome
4. Run the full verification suite:
   - `npx.cmd jest --testPathPatterns=confirm-dialog --no-coverage`
   - `npx.cmd jest --testPathPatterns=entry-points --no-coverage`
   - `npx.cmd eslint projects/ui-lib-custom/src/lib/confirm-dialog/ --max-warnings 0`
   - `npx.cmd ng build ui-lib-custom`
5. Append a session handoff block to `AI_AGENT_CONTEXT.md → ## Recent Handoffs`

---

## Non-negotiable rules for this session

- Use `bash.exe` for ALL terminal commands — never PowerShell (ESLint exits code 1 in PowerShell even on success)
- Use `npx.cmd` and `npm.cmd` if bare `npx`/`npm` fail due to `.ps1` shim restrictions
- Every change must pass ESLint at `--max-warnings 0` before being considered done
- When any a11y trade-off arises, always go further, not less
- Do not modify `LIBRARY_CONVENTIONS.md`, `AGENTS.md`, `CLAUDE.md`, or `docs/VISION.md`
- The component uses `ViewEncapsulation.None` + `OnPush` + standalone — never change these

### Critical rules inherited from ALL prior hardening sessions

- **[Dialog lesson] `triggerEventHandler` for OnPush/zoneless tests** — In zoneless `OnPush`, direct property assignment does NOT trigger change detection. Use `fixture.debugElement.triggerEventHandler('click', event)` for host events, or write to a `WritableSignal` and call `fixture.detectChanges()`. The existing `confirm-dialog.spec.ts` uses the `bootstrap()` helper and `WritableSignal` host components — follow the same pattern for the new a11y spec.

- **[Dialog lesson] `afterNextRender` focus guard** — Always check `if (this.visible())` inside `afterNextRender` before calling `focus()` — the dialog may have been closed in the same tick. This pattern is already present and must be preserved.

- **[Drawer lesson] `as Type | null` in optional-chain casts** — When casting a value that might be null at runtime, always include `| null` in the cast type: `el as HTMLElement | null`, not `el as HTMLElement`. A cast without `| null` triggers `@typescript-eslint/no-unnecessary-condition` when `?.` is then used on it.

- **[Select lesson] Raw Unicode characters in interactive controls** — Never use raw Unicode (×, ▾, etc.) as the sole content of buttons. The ConfirmDialog close button already uses an SVG — keep it that way and verify it stays correct after any edits.

- **[AutoComplete lesson] `DebugElement.componentInstance` double-cast** — `DebugElement.componentInstance` is typed `any`. To avoid `@typescript-eslint/no-unsafe-member-access`, use the double-cast pattern:
  ```typescript
  const instance = (debugEl as unknown as { componentInstance: ConfirmDialog }).componentInstance;
  ```

- **[AutoComplete lesson] `DebugElement` import source** — Import `DebugElement` from `@angular/core`, NOT from `@angular/core/testing`. The testing module only re-exports some types; `DebugElement` is not currently among them in some Angular versions.
  ```typescript
  import type { DebugElement } from '@angular/core';            // ✅ correct
  import type { DebugElement } from '@angular/core/testing';   // ❌ may cause TS2459
  ```

- **[AutoComplete lesson] Protected property access in tests** — Signals marked `protected` in the component class cannot be accessed from test code. Use DOM queries instead:
  - `component.panelVisible()` → `fixture.nativeElement.querySelector('.panel-selector') !== null`
  - `component.someProtectedSignal()` → DOM state or public output events

- **[AutoComplete lesson] `?.textContent?.trim()` optional-chain lint** — Prefer `(el?.textContent ?? '').trim()` over `el?.textContent?.trim()` to avoid `@typescript-eslint/no-unnecessary-condition` warnings on the inner `?.`.

- **[AutoComplete lesson] axe diagnostic pattern** — When axe tests fail without an obvious cause, write a temporary `axe-debug.spec.ts` that imports `{ axe }` from `jest-axe` and logs `results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.html) }))` before asserting. Read the violation IDs, fix the root causes, then delete the diagnostic file. Never commit it.

---

## Success criteria

The session is complete when:
- Both critical issues are fixed (focus restoration + backdrop `aria-hidden`)
- `confirm-dialog.a11y.spec.ts` exists with ≥ 25 tests covering alertdialog ARIA, focus management, keyboard, and axe-core
- All 10 scorecard categories have been evaluated and recorded in `docs/COMPONENT_SCORES.md`
- ESLint, build, and Jest all pass with zero errors / zero warnings
- The ConfirmDialog component scores ≥ 8 in every category, OR a clear plan exists for remaining gaps
- The session handoff is written in `AI_AGENT_CONTEXT.md`

Begin by reading the files listed in Step 1. Report what you find before proposing any changes.
```

---

## Notes for the session

### ARIA `alertdialog` pattern reference (ARIA 1.2 / APG)

The `alertdialog` role is a specialisation of `dialog`. The key difference:

| Concern | `dialog` | `alertdialog` |
|---|---|---|
| Role | `role="dialog"` | `role="alertdialog"` |
| When to use | General modal (forms, settings, etc.) | Confirmation, destructive action, error — any prompt requiring immediate decision |
| AT announcement | Announces label on open | Announces label + description on open (more urgent) |
| Initial focus | First tabbable element | **The action button** (typically the primary / confirm action) |
| Required attributes | `aria-labelledby` or `aria-label` | `aria-labelledby` + **`aria-describedby`** (both required) |

The current ConfirmDialog already satisfies all of these. The gap is post-close focus management.

### Focus management pattern for alertdialog

```
1. User clicks "Delete" (trigger button — document.activeElement)
      ↓ capture previousFocusEl = document.activeElement
2. Dialog opens → afterNextRender → activateFocusTrap() → focusDefaultButton()
      → focus lands on Accept button (or Reject / panel based on defaultFocus)
3. User can Tab through: Accept → Reject → Close (×) → Accept (wraps — FocusTrap)
4. User presses Enter on Accept (or Escape for Reject)
      → handleAccept() / handleReject() called → close() → visible.set(false)
5. Effect fires: isVisible = false → releaseScrollLock() → deactivateFocusTrap()
      → previousFocusEl.focus()   ← RESTORE FOCUS
6. User continues at the "Delete" button, focus never lost
```

### The `ConfirmationService` trigger pattern

When the dialog is opened programmatically via `service.confirm(config)`, the trigger element
is typically the button that called `service.confirm()`. AT the time `service.confirm()` is called on the service, `document.activeElement` still holds the trigger button — so the `previousFocusEl` capture in the visibility effect (which fires on the same tick via `effect()`) correctly captures the right element.

**Test this assumption in the a11y spec:** In the service-driven test, assign focus to a trigger element before calling `service.confirm()`, then verify focus returns to that element after close.

### Test host pattern for ConfirmationService-driven tests

The existing `confirm-dialog.spec.ts` uses a `bootstrap()` helper that creates a host component with a `<ui-lib-confirm-dialog>` and provides `ConfirmationService`. Follow the same pattern for the a11y spec:

```typescript
TestBed.configureTestingModule({
  imports: [HostComponent],
  providers: [provideZonelessChangeDetection(), ConfirmationService],
});
const fixture = TestBed.createComponent(HostComponent);
fixture.detectChanges();
TestBed.flushEffects();
fixture.detectChanges();
```

After opening via service:
```typescript
const service = TestBed.inject(ConfirmationService);
service.confirm({ header: 'Delete?', message: 'Cannot be undone.' });
fixture.detectChanges();
TestBed.flushEffects();
fixture.detectChanges();
```

Note: `afterNextRender` does NOT fire in Jest (no real browser rendering). Test focus management by calling `focusDefaultButton()` directly OR accept that focus-related assertions require skipping in the Jest environment and noting in comments. axe-core tests remain fully valid as they only inspect the DOM structure.

### Examining what the existing spec already covers

Before writing any a11y tests, `grep` the existing `confirm-dialog.spec.ts` for test descriptions to avoid duplication. New a11y tests should cover **structural ARIA** and **focus management**, not functional behaviour (which the unit spec covers).

### Inherited lessons chain

Every hardening session builds on all prior sessions:

| Session | Key lesson added |
|---|---|
| **Dialog** | `afterNextRender` guard; FocusTrap pattern; `queueMicrotask` for focus after scroll unlock |
| **Drawer** | `as Type \| null` in casts; module-level ID counter; FocusTrap sentinel nodes |
| **Select** | Targeted document-click listener; CSS `::before` group headers; raw chars → SVG icons |
| **AutoComplete** | `<ul role="group">` → `<div>`; listbox needs `aria-label`; `DebugElement` double-cast; import `DebugElement` from `@angular/core` not `@angular/core/testing`; protected signal access in tests → use DOM queries |
| **ConfirmDialog** (this session) | `previousFocusEl` focus-return pattern; `aria-hidden` on decorative backdrops; `alertdialog` vs `dialog` differences; service-driven trigger capture |

### Reference — the 6 phases in brief

| Phase | Focus |
|---|---|
| 1 — Architecture Review | Is the component fundamentally well-designed? SSR-safe? Signals-first? |
| 2 — DX Optimization | Reduce friction, improve naming, improve typing, improve autocomplete |
| **3 — Accessibility Audit** | **Full keyboard nav, ARIA correctness, focus management, reduced motion — run this first** |
| 4 — Performance Audit | Unnecessary renders, signal opportunities, memory, animation cost |
| 5 — Composability Audit | Content projection, directives, slots, headless patterns |
| 6 — Emotional Polish | Animation feel, interaction smoothness, perceived responsiveness, delight |

### Next queue item after ConfirmDialog

**#7 — ConfirmPopup** — key a11y concern:
> `role=alertdialog` anchored to a trigger element, click-away without losing a11y

The ConfirmPopup is similar to ConfirmDialog but positioned relative to a trigger element (not viewport-centered). Key additional concerns vs. ConfirmDialog:
- `aria-expanded` on the trigger
- `aria-controls` or `aria-haspopup` on the trigger
- Click-outside logic must not fire when clicking within the popup (same targeted-listener lesson from Select/AutoComplete)
- Positioning strategy (likely `resolveOverlayAppendTarget` from `ui-lib-custom/core`)

