````markdown
# Popover — 6-Phase Hardening Prompt

> **Generated:** 2026-05-10
> **Tier:** 1 — Overlays & Dialogs (#8 in hardening queue)
> **Based on lessons from:** ConfirmDialog, ConfirmPopup, Drawer, DynamicDialog, Dialog, Select, AutoComplete hardenings
>
> Run Phase 3 first (priority — Elite Accessibility is the current wow factor),
> then continue Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

Read **all** of the following in one pass before writing a single line of code:

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, code quality checklist
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — Popover is Tier 1, #8, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/popover/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/popover/popover.ts`
- `projects/ui-lib-custom/src/lib/popover/popover.html`
- `projects/ui-lib-custom/src/lib/popover/popover.scss`
- `projects/ui-lib-custom/src/lib/popover/popover.spec.ts`

Also read the already-hardened siblings for established patterns:
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.ts` (focus restoration via `previousFocusEl`, DOCUMENT injection)
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.a11y.spec.ts` (a11y spec structure, axe-core pattern)
- `projects/ui-lib-custom/src/lib/drawer/drawer.ts` (`aria-labelledby` / `aria-label` fallback pattern)
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.html` (inline SVG close icon, established shape)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes. These must remain intact:

- `role="dialog"` on the panel ✅
- `aria-modal="false"` on the panel ✅
- `tabindex="-1"` on the panel ✅
- `aria-hidden="true"` on the arrow div ✅
- `aria-label="Close"` on the close button ✅
- `FocusTrap` activated via `afterNextRender({ injector })` on open ✅
- `FocusTrap.deactivate()` called on close and `ngOnDestroy` ✅
- Escape key closes the popover via `onPanelKeydown` (when `closeOnEscape` is true) ✅
- Overlay click dismisses via `onOverlayClick()` (when `dismissable` is true) ✅
- `@media (prefers-reduced-motion: reduce)` sets `--uilib-popover-enter-duration: 0ms` ✅
- `:focus-visible` outline on close button ✅
- `transition` on close button hover states ✅
- `shown` output emitted after open; `hidden` output emitted after close ✅
- `show(target)`, `hide()`, `toggle(target)` public methods ✅
- `lastVisible` guard prevents effect from running on non-transitioning renders ✅
- `positionReady` signal starts `false`, set `true` after positioning — prevents flicker ✅

---

## Step 3 — Your task: the 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

#### Issue 1 — Missing accessible name on the dialog panel (CRITICAL)

**WCAG 2.1 SC 4.1.2 (AA):** An element with `role="dialog"` MUST have an accessible name exposed
to assistive technology via `aria-labelledby` or `aria-label`. Without it, screen readers announce
only the role with no contextual name — an axe-core violation.

**Root cause:** When `header` is provided there IS a `<span class="ui-lib-popover__title">` in
the DOM, but it has no `id` and the panel has no `aria-labelledby` pointing to it. When no `header`
is set and `showCloseButton` is false, no header renders at all and the panel is completely unnamed.

**Fix — two-part:**

**Part A — Add `titleId` and wire `aria-labelledby` when a header exists:**

Add to the component class (before the constructor):

```typescript
/** Unique ID used for aria-labelledby when a header is rendered. */
public readonly titleId: string = `${this.panelId}-title`;
```

> Note: `panelId` is introduced in Phase 1. The order of class field declarations matters — declare
> `panelId` first, then `titleId`.

In the template, add `[id]="titleId"` to the title span:

```html
<span class="ui-lib-popover__title" [id]="titleId">{{ header() }}</span>
```

On the panel div, replace the static `aria-modal="false"` line and add the dynamic label:

```html
[attr.aria-labelledby]="header() ? titleId : null"
[attr.aria-label]="header() ? null : 'Popover'"
```

**Why `aria-label="Popover"` as fallback?** When no header is provided, the popover has no
rendered text to point at. A generic label is better than no name at all — it satisfies axe-core
and screen reader conventions. Callers who want a specific name when no header is rendered should
set a custom accessible name; document this consumer pattern in the README.

**Important:** `aria-labelledby` takes precedence over `aria-label` in the accessibility tree when
both are set. Since these are on the same element and are mutually exclusive via `? null`, there
will be no redundancy.

---

#### Issue 2 — Focus not restored to trigger element on close (CRITICAL)

**WCAG 2.1 SC 2.4.3 (AA):** When a non-modal dialog closes, focus must return to the element that
triggered it. The Popover currently calls `deactivateFocusTrap()` on close but does not restore
focus — keyboards users lose their position in the page.

**Unique Popover opportunity:** Unlike ConfirmPopup (service-driven, where the trigger arrives
asynchronously), the Popover's `show(target: HTMLElement)` method receives the trigger element
synchronously. This is the cleanest capture point.

**Fix:** Capture focus at the moment `show()` is called, and restore it when `hide()` causes the
visibility effect's `false` branch to run.

Add to the class (add `DOCUMENT` import as well — see below):

```typescript
private readonly document: Document = inject(DOCUMENT);
private previousFocusEl: HTMLElement | null = null;
```

Update `show()`:

```typescript
public show(target: HTMLElement): void {
  // Capture focus before the popover takes it over.
  // Prefer document.activeElement (keyboard-triggered show), fall back to target
  // (mouse-triggered show where activeElement may still be body).
  const active: HTMLElement | null = this.document.activeElement as HTMLElement | null;
  this.previousFocusEl =
    active && active !== this.document.body ? active : target;
  this.targetElement.set(target);
  this.visible.set(true);
}
```

Update `hide()`:
```typescript
public hide(): void {
  this.visible.set(false);
  this.targetElement.set(null);
}
```

In the visibility effect, on the `isVisible === false` branch:

```typescript
} else {
  this.positionReady.set(false);
  this.deactivateFocusTrap();
  // Restore focus to the element that had focus before the popover opened.
  this.previousFocusEl?.focus();
  this.previousFocusEl = null;
  this.hidden.emit();
}
```

In `ngOnDestroy()`:

```typescript
public ngOnDestroy(): void {
  this.deactivateFocusTrap();
  this.previousFocusEl = null;
}
```

**Also add `DOCUMENT` to imports:**

```typescript
import { DOCUMENT } from '@angular/common';
```

**Edge case — `toggle(target)` when already visible:** When `toggle()` closes the popover, it
calls `hide()` directly without updating `previousFocusEl`. This is correct — the `previousFocusEl`
was set by the earlier `show()` call, so the restore will work correctly on the next `hide()`.

**Edge case — `[(visible)]` declarative close:** When the parent sets `visible = false` directly
without calling `hide()`, the effect's `false` branch fires. `previousFocusEl` may be `null` if
`show()` was never called (pure declarative usage). The `?.focus()` optional call handles this
safely — `null?.focus()` is a no-op.

---

#### Issue 3 — Overlay div missing `aria-hidden="true"` (MINOR)

The transparent overlay `<div class="ui-lib-popover__overlay">` is a click-catcher with no
semantic content. It should be hidden from the accessibility tree to avoid confusing AT.

**Fix:** Add `aria-hidden="true"` to the overlay div:

```html
<div
  class="ui-lib-popover__overlay"
  aria-hidden="true"
  [class.ui-lib-popover__overlay--active]="dismissable()"
  (click)="onOverlayClick()"
></div>
```

The click handler is a DOM event — unaffected by `aria-hidden`.

---

#### Issue 4 — Close button uses raw `&times;` character (MINOR / POLISH)

The close button currently renders `<span aria-hidden="true">&times;</span>`. Every other hardened
overlay component (Dialog, ConfirmDialog, Drawer) uses an inline SVG for the close icon,
establishing a consistent, vector-sharp visual across the library. Match the established pattern.

**Fix:** Replace `<span aria-hidden="true">&times;</span>` with the standard inline SVG:

```html
<svg
  aria-hidden="true"
  focusable="false"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  width="14"
  height="14"
>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
```

Update the close button SCSS to remove the `font-size: 1.125rem; line-height: 1;` properties
(they only apply to the character glyph) — the SVG inherits `currentColor` from `color` and is
sized via `width`/`height` attributes.

---

#### Deliverable — `popover.a11y.spec.ts`

Create `projects/ui-lib-custom/src/lib/popover/popover.a11y.spec.ts` with:

**Host component:** Include a `<button class="trigger-btn">Open Popover</button>` sibling to the
popover. Tests that verify focus restoration need a real focusable element to focus before opening.

```typescript
@Component({
  standalone: true,
  imports: [Popover],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="trigger-btn">Open Popover</button>
    <ui-lib-popover
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [header]="headerState()"
      [showCloseButton]="showCloseButtonState()"
      [dismissable]="dismissableState()"
      [closeOnEscape]="closeOnEscapeState()"
    />
  `,
})
class PopoverA11yHostComponent { ... }
```

**Spec structure (aim for 30–36 tests):**

```
describe('Popover Accessibility')
  describe('closed state')
    ✓ panel is not in DOM when visible=false
    ✓ no role="dialog" element present when closed
    ✓ axe passes in closed state

  describe('open-state ARIA structure')
    ✓ panel has role="dialog"
    ✓ panel has aria-modal="false"
    ✓ panel has tabindex="-1"
    ✓ panel has aria-label="Popover" when no header is set
    ✓ panel has aria-labelledby pointing to title span when header is set
    ✓ title span id matches aria-labelledby value
    ✓ title span text matches the header input value
    ✓ panel aria-label is null when header is set (mutual exclusion)
    ✓ overlay has aria-hidden="true"
    ✓ arrow has aria-hidden="true"

  describe('close button')
    ✓ close button has aria-label="Close"
    ✓ close button icon has aria-hidden="true" (SVG or span)
    ✓ close button click closes the popover

  describe('focus management')
    ✓ accept button (or first focusable) is present and focusable after open
    ✓ focus is restored to trigger element when popover closes via close button
    ✓ focus is restored to trigger element when popover closes via Escape
    ✓ focus is restored to trigger element when popover closes via overlay click
    ✓ no focus restoration when popover closed declaratively (visible=false) without prior show()

  describe('keyboard behaviour')
    ✓ Escape closes the popover when closeOnEscape=true
    ✓ Escape does NOT close when closeOnEscape=false
    ✓ overlay click closes when dismissable=true
    ✓ overlay click does NOT close when dismissable=false

  describe('panelId')
    ✓ panel has an id attribute (non-empty string)
    ✓ panelId is a public string property on the component instance
    ✓ panel id attribute matches the panelId property value

  describe('axe-core automated checks')
    ✓ closed state passes axe
    ✓ open state (no header) passes axe
    ✓ open state (with header) passes axe
    ✓ open state (with close button) passes axe
```

**`afterNextRender` limitation:** This hook does NOT run in Jest. For focus restoration tests,
rely on `.click()` / `dispatchEvent()` interactions (which go through `hide()` → effect → restore)
rather than testing `document.activeElement` after `show()` alone.

**axe-core import pattern:**
```typescript
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
```

**`getPopoverInstance` helper** (needed to call `show()` / `hide()` / read `panelId`):
```typescript
import { By } from '@angular/platform-browser';

function getPopoverInstance(fixture: ComponentFixture<PopoverA11yHostComponent>): Popover {
  return fixture.debugElement.query(By.directive(Popover)).componentInstance as Popover;
}
```

---

### Phase 1 — Architecture Audit

#### Issue — No module-level ID counter; no `panelId` public property

The Popover has no unique `id` on its panel. Consumers who want to wire `aria-controls` on their
trigger buttons (best practice for disclosure widgets) have no way to reference the panel.
Additionally, the `titleId` property (Phase 3) requires a stable panel ID base.

**Fix:** Add a module-level counter and `panelId` / `titleId` properties.

Before the class declaration:

```typescript
// Module-level fallback counter for environments without crypto.randomUUID().
let nextPopoverId: number = 0;
```

Add private method to the class:

```typescript
private generateId(): string {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return `ui-lib-popover-${globalThis.crypto.randomUUID()}`;
  }
  nextPopoverId += 1;
  return `ui-lib-popover-${nextPopoverId}`;
}
```

Add public properties (declare before the constructor):

```typescript
/** Stable unique ID for the panel element. Consumers can use this for aria-controls. */
public readonly panelId: string = this.generateId();

/** ID for the title element — used by aria-labelledby when a header is rendered. */
public readonly titleId: string = `${this.panelId}-title`;
```

Add `[id]="panelId"` to the panel div in the template.

**⚠️ Lesson learned:** `let nextPopoverId: number = 0` — the explicit `: number` type annotation
is required. Omitting it triggers `@typescript-eslint/typedef`.

---

### Phase 2 — Developer Experience Audit

#### Issue — README Accessibility section is incomplete and misses consumer patterns

**Current state:** The accessibility section is a 5-bullet bare list. It is missing:
- The `aria-labelledby` / `aria-label` behavior
- Focus restoration on close
- The `panelId` property and how consumers should wire `aria-controls`
- The `aria-expanded` consumer responsibility pattern
- The keyboard navigation table

**Fix:** Replace the existing accessibility section with a full ARIA features table + keyboard
navigation table, and add a new "Consumer accessibility responsibilities" section.

**ARIA features table** must document:

| Feature | Detail |
|---|---|
| `role="dialog"` + `aria-modal="false"` | Applied to the panel element. Non-modal: AT does not suppress background content. |
| `aria-labelledby` | When `header` is provided, points to the rendered title span's `id`. |
| `aria-label="Popover"` | Fallback when no `header` is set — satisfies WCAG 4.1.2 accessible name requirement. |
| Focus trap | Tab/Shift+Tab constrained to panel focusable elements while open. |
| Focus restoration | When the popover closes, focus returns to the element that called `show()`. |
| `panelId` | Public string property — stable `id` of the panel element, for consumer `aria-controls` wiring. |
| `titleId` | Public string property — stable `id` of the title span, for custom `aria-labelledby` overrides. |
| Overlay | `aria-hidden="true"` — click-catcher is decorative and hidden from AT. |
| Arrow | `aria-hidden="true"` — decorative only. |
| Close button | `aria-label="Close"` + `aria-hidden` SVG icon. |
| Escape key | Closes the popover (when `closeOnEscape=true`). |
| Dismissable overlay | Click-away closes (when `dismissable=true`); overlay has `aria-hidden`. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` sets `--uilib-popover-enter-duration: 0ms`. |
| `:focus-visible` | Focus ring on the close button. |

**Keyboard nav table:**

| Key | Behaviour |
|---|---|
| Tab | Move focus to next focusable element within the popover |
| Shift+Tab | Move focus to previous focusable element within the popover |
| Escape | Close the popover (when `closeOnEscape=true`); focus returns to trigger |

**Consumer responsibilities section:**

The trigger element that calls `show()` / `toggle()` is the consumer's responsibility for ARIA.
Add a usage example:

```html
<!-- Trigger button — consumer adds aria-expanded and aria-controls -->
<button
  #triggerBtn
  type="button"
  [attr.aria-expanded]="isOpen"
  [attr.aria-controls]="op.panelId"
  (click)="isOpen = !isOpen; isOpen ? op.show(triggerBtn) : op.hide()"
>
  Open
</button>

<ui-lib-popover #op [(visible)]="isOpen" header="Options">
  <p>Content here.</p>
</ui-lib-popover>
```

Explain:
- `aria-controls` links the trigger to the popover panel via `op.panelId`
- `aria-expanded` reflects the open/closed state to screen readers
- Neither is set automatically by the component because the Popover does not own or manage the trigger element

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
- `shown` is emitted inside `afterNextRender` (gated on `visible()` still being true) — this means
  it will NOT fire in Jest tests. This is expected behaviour; document it in a code comment.
- `previousFocusEl` is captured synchronously in `show()` before focus moves — no timing issue.

If all confirmed, write "Phase 4: No structural changes. All performance patterns verified. `shown`
emission in `afterNextRender` noted — non-blocking, test `shown` via output spy in unit tests only."

---

### Phase 5 — Composability Audit

No structural changes expected. Verify and write a brief confirmation of:

- Template-ref `show(target)` / `hide()` / `toggle(target)` API is the correct composition story
  for a non-modal anchored popover (it is — identical to PrimeNG's pattern).
- `panelId` public property enables consumer-side `aria-controls` wiring.
- `[(visible)]` declarative binding remains fully supported alongside the imperative API.
- Content projection via `<ng-content>` is correct — no named slots needed (body-only projection).
- No service layer needed — the Popover is intentionally per-instance and trigger-coupled.

If all confirmed, write "Phase 5: No API changes. Composability story is correct. `panelId` enables
aria-controls wiring. Template-ref and declarative patterns both verified."

---

### Phase 6 — Polish Audit

Verify each item:

- [ ] Close button uses inline SVG (not raw `&times;`) — ACTION REQUIRED if still `&times;`
- [ ] Close button SCSS: remove `font-size: 1.125rem; line-height: 1;` after SVG replacement
- [ ] `:focus-visible` ring is present on close button ✅ (already present, verify not regressed)
- [ ] `transition` on close button hover is present ✅ (already present, verify not regressed)
- [ ] Arrow CSS triangle color matches `--uilib-popover-bg` for material and minimal variants ✅
- [ ] Bootstrap variant arrow has a border-matching color ✅ (already coded, verify)
- [ ] `@media (prefers-reduced-motion: reduce)` sets duration to 0ms ✅

If close button SVG replacement completes cleanly, write "Phase 6: Close button SVG applied. All other
polish requirements verified."

---

## Step 4 — After every file change

```bash
# After TS change:
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/popover/ --max-warnings 0

# After spec change:
node_modules/.bin/jest --testPathPatterns=popover --no-coverage

# After all changes:
node_modules/.bin/ng build ui-lib-custom

# Entry-point regression:
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

**All commands must be run from `bash.exe`** (not PowerShell — ESLint exit code is unreliable
in PowerShell and will return 1 even on a clean run).

---

## Step 5 — Scoring (after all phases complete)

Score the component using the 10-category rubric from `docs/COMPONENT_SCORES.md`:

```
API:     /10  — Inputs/outputs consistent; show/hide/toggle methods idiomatic; panelId for aria-controls
A11y:    /10  — After fixes: role=dialog, aria-labelledby/label, focus trap, focus restore, overlay aria-hidden
Perf:    /10  — afterNextRender positioning, lastVisible guard, lazy FocusTrap, previousFocusEl sync capture
Comp:    /10  — template-ref + declarative patterns; ng-content projection; panelId for aria-controls
Theme:   /10  — CSS vars, 3 variants, reduced motion, arrow colors per variant
DX:      /10  — README completeness, panelId documented, consumer aria-controls example
Docs:    /10  — README accuracy post-update
Polish:  /10  — Animation, transitions, focus rings, inline SVG close button
Angular: /10  — Signals-first, OnPush, standalone, SSR-safe (DOCUMENT injection)
Feel:    /10  — Anchored panel feels precise, responsive, and accessible
```

Update `docs/COMPONENT_SCORES.md` — change Popover row from `—` to actual scores.
Update Tier 1 #8 status from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3; move older ones to
`docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`):

```
Date: 2026-05-10 [Popover component — 6-phase hardening COMPLETE]
Changed: <list all modified files>
State: <what is complete>
  Phase 3 (A11y — priority):
    • CRITICAL FIX: aria-labelledby added to panel (header text as accessible name)
    • CRITICAL FIX: aria-label="Popover" fallback when no header (satisfies WCAG 4.1.2)
    • CRITICAL FIX: focus restored to trigger element on close (previousFocusEl, captured in show())
    • MINOR FIX: overlay div has aria-hidden="true"
    • POLISH FIX: close button &times; replaced with inline SVG (consistent with Dialog/Drawer)
    • Created popover.a11y.spec.ts with <N> tests
    • Pre-existing a11y features verified intact: <list>
  Phase 1 (Architecture): <describe panelId + module-level counter>
  Phase 2 (DX): <describe README updates>
  Phase 4 (Performance): <describe — no changes or changes>
  Phase 5 (Composability): <describe — no changes or changes>
  Phase 6 (Polish): <describe SVG + SCSS cleanup>
Verification:
  node_modules\.bin\eslint ... --max-warnings 0 (CLEAN, EXIT:0)
  node_modules\.bin\jest --testPathPatterns=popover --no-coverage (<N>/<N> PASS)
  node_modules\.bin\jest --testPathPatterns=entry-points --no-coverage (95/95 PASS)
  node_modules\.bin\ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: <any workarounds discovered>
Next step: Tooltip hardening (Tier 1, #9) — key a11y: aria-describedby lifecycle, cleanup on element unmount.
```

---

## Lessons Learned Reference (from 8+ previous hardenings)

Apply all of the following standing rules without exception:

| Lesson | Detail |
|---|---|
| Module-level counter needs explicit type | `let nextPopoverId: number = 0` — omitting `: number` triggers `@typescript-eslint/typedef` |
| `DOCUMENT` injection for focus | Use `inject(DOCUMENT)` from `@angular/common` to access `document.activeElement` — never `window.document` directly (SSR-safe) |
| Capture focus in `show()`, not in effect | `show(target)` is synchronous and receives the trigger directly — ideal capture point; `document.activeElement` at this moment reflects the keyboard focus before the popover steals it |
| `previousFocusEl` restore in effect, not `hide()` | Restore in the effect's `false` branch so it fires for BOTH imperative `hide()` AND declarative `visible=false`. Clear in `ngOnDestroy` too. |
| `afterNextRender` does not run in Jest | Test focus presence via `hasAttribute('disabled')` and button existence. For focus restoration tests use `.click()` → `detectChanges()` → `flushEffects()` → `detectChanges()` and then check `document.activeElement` |
| `textContent` assertion style | Use `textContent!.trim()` (non-null assertion), never `?.trim()` — the latter triggers `@typescript-eslint/no-unnecessary-condition` |
| `aria-hidden` on overlays/backdrops | Every decorative full-screen overlay div should have `aria-hidden="true"` regardless of click handler presence |
| `role="dialog"` requires accessible name | Same rule as `role="alertdialog"` — must have `aria-labelledby` or `aria-label` — omitting is an axe-core violation |
| ESLint in bash.exe only | Run `node_modules/.bin/eslint` from bash.exe. PowerShell returns exit code 1 even on clean runs |
| `TestBed.flushEffects()` after `.click()` | Always call `fixture.detectChanges()` → `TestBed.flushEffects()` → `fixture.detectChanges()` after any DOM interaction in zoneless OnPush tests |
| `getPopoverInstance` via `By.directive` | Use `fixture.debugElement.query(By.directive(Popover)).componentInstance as Popover` — do not use `fixture.componentInstance` which gives the host |
| Mutual exclusion of `aria-labelledby` / `aria-label` | Use `[attr.aria-labelledby]="header() ? titleId : null"` and `[attr.aria-label]="header() ? null : 'Popover'"` — Angular removes attributes when bound to `null` |
| `shown` won't emit in Jest | `shown` is emitted inside `afterNextRender` which doesn't run in Jest. Unit-test the `hidden` output (emitted synchronously) or spy in integration tests only |
| `toggle()` focus capture | `toggle()` calls `show(target)` on open — `show()` captures focus at that point. On close, `toggle()` calls `hide()` which triggers the effect's `false` branch — restoration uses the already-captured `previousFocusEl`. No special handling needed in `toggle()`. |
````

