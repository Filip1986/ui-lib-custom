````markdown
# Toast — 6-Phase Hardening Prompt

> **Generated:** 2026-05-10
> **Tier:** 1 — Overlays & Dialogs (#10 in hardening queue)
> **Component type:** Regular Angular component + companion `ToastService`
> **Based on lessons from:** Tooltip, Popover, ConfirmPopup, ConfirmDialog, Drawer, DynamicDialog,
> Dialog, Select, AutoComplete hardenings
>
> Run Phase 3 first (priority — Elite Accessibility is the current wow factor),
> then continue Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

Read **all** of the following in one pass before writing a single line of code:

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, code quality checklist
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — Toast is Tier 1, #10, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/toast/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/toast/toast.ts`
- `projects/ui-lib-custom/src/lib/toast/toast.html`
- `projects/ui-lib-custom/src/lib/toast/toast.scss`
- `projects/ui-lib-custom/src/lib/toast/toast.spec.ts`
- `projects/ui-lib-custom/src/lib/toast/toast.service.ts`
- `projects/ui-lib-custom/src/lib/toast/toast.types.ts`

Also read the already-hardened siblings for established patterns:
- `projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.ts` (host binding ARIA patterns)
- `projects/ui-lib-custom/src/lib/tooltip/tooltip.a11y.spec.ts` (current a11y spec template)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes. These must remain intact:

- `role="region"` on `<ui-lib-toast>` host ✅
- `aria-label="Notifications"` on `<ui-lib-toast>` host ✅
- `role="alert"` on each `.ui-lib-toast__item` (will be changed to be conditional — see Phase 3) ✅
- `aria-hidden="true"` on the `<ui-lib-icon>` inside each item ✅
- `aria-label="Dismiss notification"` on the close button (will be improved — see Phase 3) ✅
- `type="button"` on the close button ✅
- `:focus-visible` ring on the close button in SCSS ✅
- `closable !== false` guard on the close button render ✅
- `sticky` guard — sticky messages are never auto-dismissed ✅
- `key` filtering — container only shows messages with matching key ✅
- Auto-dismiss timer management via `Map<string, ReturnType<typeof setTimeout>>` ✅
- `DestroyRef.onDestroy` cleans up all pending timers on component destroy ✅
- `effect()` reactively starts/cancels timers when `visibleMessages()` changes ✅
- `closingIds` signal drives the `--closing` CSS class for exit animation ✅
- `ANIMATION_DURATION_MS: number = 300` — explicit type annotation ✅
- `SEVERITY_ICON_MAP` — `as const` object mapping severities to icon names ✅
- Module-level counter in `ToastService` (`let toastMessageCounter: number = 0`) ✅
- `ToastService.add()` auto-generates ID when none provided ✅
- `ToastService.clear()` supports key-scoped clearing ✅

---

## Step 3 — Your task: the 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

---

#### Issue 1 — Container has `aria-live` and `aria-atomic` that conflict with item roles (CRITICAL)

**Root cause:** The `<ui-lib-toast>` host binding includes:
```typescript
host: {
  'aria-live': 'polite',
  'aria-atomic': 'false',
}
```

This is incorrect. The container's role is `region` — a structural landmark, not a live region.
Having `aria-live="polite"` on the container while each child item has `role="alert"` (which
implies `aria-live="assertive"`) creates a conflict:

- Some screen readers announce the toast content twice (once via the item's role, once via the
  container's live region algorithm)
- Other screen readers apply the container's `aria-live="polite"` and downgrade the assertive
  announcement, causing critical error toasts to be announced softly
- `aria-atomic="false"` on the container is redundant since each item manages its own
  announcement boundary

**Fix:** Remove `aria-live` and `aria-atomic` from the `host` binding entirely. Let each item's
role drive the live region behavior:

```typescript
host: {
  class: 'ui-lib-toast',
  '[class]': 'hostClasses()',
  role: 'region',
  '[attr.aria-label]': '"Notifications"',
  // aria-live and aria-atomic removed — each item manages its own live region via role
},
```

---

#### Issue 2 — `role="alert"` used for all severities; `[attr.aria-live]` is futile (CRITICAL)

**Root cause — wrong role:** Currently the template applies `role="alert"` to every toast item
regardless of severity, then tries to override the live region urgency with
`[attr.aria-live]="message.severity === 'error' ? 'assertive' : 'polite'"`.

This is semantically incorrect and broken:

- `role="alert"` **implies** `aria-live="assertive"` and `aria-atomic="true"` per the ARIA spec.
  You cannot override a role's implicit property with an explicit attribute — the role wins.
- Applying `role="alert"` to success/info/warn toasts means ALL notifications interrupt the
  screen reader at the assertive priority level. This is too aggressive for non-critical messages
  and violates user expectations.
- `[attr.aria-live]` on the item element is therefore **a no-op** for `role="alert"` items:
  it is redundant for errors (already assertive) and ignored for others (role overrides it).

**Correct ARIA roles for notifications:**

| Role | Implied aria-live | Implied aria-atomic | Use when |
|---|---|---|---|
| `role="alert"` | `assertive` | `true` | Error only — interrupts immediately |
| `role="status"` | `polite` | `true` | Success, info, warn — waits for pause |

**Fix — change the template:**

```html
<div
  class="ui-lib-toast__item"
  [class]="itemClass(message)"
  [attr.role]="message.severity === 'error' ? 'alert' : 'status'"
>
```

Remove the `[attr.aria-live]` binding entirely — it is both redundant and incorrect.

**Backward compatibility:** The existing unit tests already test that `role="alert"` is set for
all items. Those tests must be updated to reflect the corrected behavior:
- `role="alert"` → only for `severity='error'`
- `role="status"` → for `severity='success'`, `'info'`, `'warn'`

> **Note on `aria-atomic`:** Both `role="alert"` and `role="status"` imply `aria-atomic="true"`,
> meaning the screen reader announces the entire item content as a unit when it appears — not
> just the changed portion. This is correct behavior for toast notifications and does not need
> explicit `aria-atomic` attributes on the items.

---

#### Issue 3 — Close button label is generic when multiple toasts are visible (MODERATE)

**Root cause:** The close button has `aria-label="Dismiss notification"` for every toast item.
When multiple toasts are visible simultaneously, screen reader users navigating via Tab cannot
distinguish which button closes which notification. They must read the notification content
separately, then navigate back to the button — a significant extra effort.

**Fix:** Include the toast summary (or detail as fallback) in the close button label:

```html
<button
  type="button"
  class="ui-lib-toast__close"
  [attr.aria-label]="'Dismiss: ' + (message.summary || message.detail || 'notification')"
  (click)="dismiss(message.id ?? '')"
>
```

This produces labels like:
- "Dismiss: Changes saved"
- "Dismiss: File upload failed"
- "Dismiss: notification" (when neither summary nor detail is set)

**NOTE on lint:** The template expression `''` for the fallback ensures the `aria-label` is
always a string, not null/undefined.

---

#### Issue 4 — No `@media (prefers-reduced-motion: reduce)` in the SCSS (MODERATE)

**Root cause:** The Toast SCSS defines enter/exit keyframe animations with a 300ms duration
(`--uilib-toast-animation-duration: 300ms`) but has no reduced motion override. Users with
vestibular disorders (who have set `prefers-reduced-motion: reduce` in their OS) still get
the full slide animation.

**Fix — add to the end of `toast.scss`:**

```scss
// ─── Reduced motion ────────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  ui-lib-toast {
    --uilib-toast-animation-duration: 0ms;
  }
}
```

Setting the custom property to `0ms` makes the `uilib-toast-enter` and `uilib-toast-exit`
keyframes instantaneous, effectively disabling the animation while preserving the rest of
the styling. All existing animation selectors continue to work — only duration changes.

---

#### Deliverable — `toast.a11y.spec.ts`

**⚠️ Component-vs-directive testing notes:**

1. Toast IS a regular Angular component (not a directive). Its items render **inside** the
   fixture's `nativeElement`, so use `checkA11y(fixture)` — not `axe(document.body, ...)`.
2. The spec uses `async/await` pattern with `fixture.detectChanges()` + `await fixture.whenStable()`
   after each `toastService.add()` call (see existing `toast.spec.ts` for the exact pattern).
3. The `provideIcons(...)` provider is **required** in TestBed — the Toast component uses
   `<ui-lib-icon>` which depends on `@ng-icons/core`. Without it, the spec will throw.
   Copy the exact `provideIcons` call from `toast.spec.ts`.
4. `TestBed.flushEffects()` is NOT needed — the `effect()` in the Toast constructor tracks
   `visibleMessages()` which is signal-based. `fixture.detectChanges()` + `await fixture.whenStable()`
   is sufficient.
5. Each test should call `toastService.clear()` in `afterEach` — the service is `providedIn: 'root'`
   and persists across tests within the same module configuration.
6. For axe checks: the toast container has `role="region"` and all items are inside it, so
   the `region` rule is satisfied. Use `checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES })`.
   Do **not** skip the `region` rule (unlike Tooltip which appended to body outside landmarks).
7. The `<ui-lib-toast>` element itself IS the fixture's child (since the test host renders it).
   Query the toast host element with:
   ```typescript
   const toastHost = fixture.nativeElement.querySelector('ui-lib-toast') as HTMLElement;
   ```

**Host component for a11y spec:**

```typescript
@Component({
  standalone: true,
  imports: [Toast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-toast [position]="position()" />`,
})
class ToastA11yHostComponent {
  public readonly position: WritableSignal<ToastPosition> = signal<ToastPosition>('top-right');
}
```

**Setup helper:**

```typescript
async function createFixture(): Promise<{
  fixture: ComponentFixture<ToastA11yHostComponent>;
  toastService: ToastService;
}> {
  await TestBed.configureTestingModule({
    imports: [ToastA11yHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideIcons({
        bootstrapInfoCircle,
        bootstrapCheckCircle,
        bootstrapExclamationOctagon,
        bootstrapExclamationTriangle,
        bootstrapX,
      }),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(ToastA11yHostComponent);
  const toastService = TestBed.inject(ToastService);
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture, toastService };
}
```

**Helper for adding a message and waiting for render:**

```typescript
async function addMessage(
  fixture: ComponentFixture<ToastA11yHostComponent>,
  toastService: ToastService,
  message: ToastMessage
): Promise<void> {
  toastService.add(message);
  fixture.detectChanges();
  await fixture.whenStable();
}
```

**Import pattern:**

```typescript
import { axe } from 'jest-axe';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import {
  bootstrapInfoCircle,
  bootstrapCheckCircle,
  bootstrapExclamationOctagon,
  bootstrapExclamationTriangle,
  bootstrapX,
} from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
```

**Spec structure (aim for 28–33 tests):**

```
describe('Toast Accessibility')
  afterEach: toastService.clear()

  describe('container ARIA')
    ✓ host has role="region"
    ✓ host has aria-label="Notifications"
    ✓ host does NOT have aria-live attribute (no container-level live region)
    ✓ host does NOT have aria-atomic attribute

  describe('item ARIA roles')
    ✓ error severity item has role="alert"
    ✓ success severity item has role="status"
    ✓ info severity item has role="status"
    ✓ warn severity item has role="status"
    ✓ item does NOT have aria-live attribute (role drives announcement urgency)

  describe('icon accessibility')
    ✓ severity icon inside item has aria-hidden="true"
    ✓ close button icon has aria-hidden="true"

  describe('close button accessibility')
    ✓ close button has type="button"
    ✓ close button aria-label includes the message summary
    ✓ close button aria-label uses detail as fallback when summary is absent
    ✓ close button aria-label falls back to "notification" when neither summary nor detail
    ✓ close button is not rendered when closable=false
    ✓ close button is focusable (has no tabindex=-1 or disabled attribute)

  describe('keyboard accessibility')
    ✓ close button can be activated with keyboard (Enter/Space triggers dismiss)
    ✓ multiple toasts — each close button has a distinct aria-label
    ✓ sticky toast close button has aria-label including summary

  describe('live region announcement correctness')
    ✓ error toast has role="alert" (assertive — interrupts immediately)
    ✓ success toast has role="status" (polite — waits for idle)
    ✓ info toast has role="status"
    ✓ warn toast has role="status"

  describe('axe-core automated checks')
    ✓ passes axe — empty state (no toasts)
    ✓ passes axe — with error toast visible
    ✓ passes axe — with success toast visible
    ✓ passes axe — with multiple mixed-severity toasts visible
    ✓ passes axe — sticky toast with closable=false
```

**Notes on the keyboard test:**

To test keyboard activation of the close button:
```typescript
const closeBtn = fixture.nativeElement.querySelector<HTMLButtonElement>('.ui-lib-toast__close');
closeBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
// Or simply:
closeBtn.click(); // buttons respond to Enter/Space natively
```

For the "multiple toasts with distinct labels" test:
```typescript
toastService.add({ severity: 'success', summary: 'File saved', sticky: true });
toastService.add({ severity: 'error', summary: 'Upload failed', sticky: true });
fixture.detectChanges();
await fixture.whenStable();
const closeButtons = fixture.nativeElement.querySelectorAll<HTMLButtonElement>('.ui-lib-toast__close');
const labels = Array.from(closeButtons).map(btn => btn.getAttribute('aria-label'));
expect(labels[0]).toBe('Dismiss: File saved');
expect(labels[1]).toBe('Dismiss: Upload failed');
expect(new Set(labels).size).toBe(2); // all labels are unique
```

---

### Phase 1 — Architecture Audit

No breaking architecture changes needed. Verify the following are already correct:

**Module-level counter in ToastService:**
```typescript
let toastMessageCounter: number = 0;  // ✅ explicit : number type annotation
```

**`ANIMATION_DURATION_MS` explicit type:**
```typescript
const ANIMATION_DURATION_MS: number = 300;  // ✅ explicit : number type annotation
```

**No `document` / `window` global access in the component** — Toast does not append elements
to `document.body` (unlike Tooltip/Popover/Dialog). The component renders in its own host element
which is already in the Angular template tree. No `DOCUMENT` injection is needed. ✅

**`SEVERITY_ICON_MAP` is `as const`:**
```typescript
const SEVERITY_ICON_MAP: Record<ToastSeverity, StatusIcon> = { ... } as const;  // ✅
```

**The `effect()` in the constructor** runs in the injection context automatically when defined
in the constructor. No `Injector` injection is needed — this is correct. ✅

**One JSDoc improvement needed:** Add a JSDoc to the `dismiss()` method documenting the
animation delay:

```typescript
/**
 * Dismiss a toast by ID: cancel its auto-dismiss timer, apply the exit animation class,
 * then remove it from the service after `ANIMATION_DURATION_MS` (300ms) to allow
 * the CSS exit animation to complete.
 *
 * Safe to call on already-dismissed IDs — the timer guard handles the no-op case.
 */
public dismiss(messageId: string): void { ... }
```

If all architecture checks pass, write: "Phase 1: No structural changes. Architecture verified.
`ANIMATION_DURATION_MS` and counter explicitly typed. No `DOCUMENT` injection needed."

---

### Phase 2 — Developer Experience Audit

#### Issue — README is sparse and missing critical consumer patterns

**Current state:** The README has a minimal inputs table and two usage code blocks. Missing:
- No accessibility section at all
- No `ToastMessage` interface documentation
- No CSS custom properties table
- No explanation of the `key` routing pattern for multiple containers
- No documentation of the lifecycle (enter animation → auto-dismiss → exit animation)

**Fix — add the following sections to README:**

**1. `ToastMessage` interface table:**

| Property | Type | Default | Description |
|---|---|---|---|
| `id` | `string \| undefined` | auto-generated | Unique identifier. Auto-generated if omitted. |
| `key` | `string \| undefined` | — | Routes this message to the matching `Toast` container key. |
| `severity` | `'success' \| 'info' \| 'warn' \| 'error'` | `'info'` | Controls colour palette and default icon. |
| `summary` | `string \| undefined` | — | Bold headline text shown above detail. |
| `detail` | `string \| undefined` | — | Body text for the notification. |
| `life` | `number \| undefined` | container `life` | Auto-dismiss duration ms — overrides container default. |
| `sticky` | `boolean \| undefined` | `false` | When true, the toast never auto-dismisses. |
| `closable` | `boolean \| undefined` | `true` | When false, the dismiss button is hidden. |
| `icon` | `string \| undefined` | severity default | Custom icon name — overrides the severity default. |
| `styleClass` | `string \| undefined` | — | Additional CSS class(es) on the item element. |

**2. Multiple containers pattern:**

```html
<!-- App shell — two toast regions -->
<ui-lib-toast position="top-right" key="global" />
<ui-lib-toast position="bottom-center" key="form-feedback" />
```

```typescript
// Route to specific container
toastService.add({ key: 'form-feedback', severity: 'error', summary: 'Validation failed' });
toastService.add({ key: 'global', severity: 'success', summary: 'Profile saved' });
```

**3. Accessibility section:**

```markdown
## Accessibility

### ARIA features

| Feature | Detail |
|---|---|
| `role="region"` | Applied to the `<ui-lib-toast>` host element — identifies the notification area as a page landmark. |
| `aria-label="Notifications"` | Names the region for screen reader landmark navigation. |
| `role="alert"` | Applied to **error** severity items — implies `aria-live="assertive"` and `aria-atomic="true"`. Screen readers interrupt immediately to announce the content. |
| `role="status"` | Applied to **success**, **info**, and **warn** items — implies `aria-live="polite"` and `aria-atomic="true"`. Screen readers announce when idle. |
| Close button `aria-label` | `"Dismiss: {summary}"` — includes the notification summary so users can identify which toast they are closing when multiple toasts are visible. Falls back to `"Dismiss: {detail}"` then `"Dismiss: notification"`. |
| Icon `aria-hidden` | The severity icon and close button icon are both `aria-hidden="true"` — they are decorative and convey no additional information to screen reader users beyond what the text provides. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` sets `--uilib-toast-animation-duration: 0ms` — slide animations are disabled for users who prefer reduced motion. |

### Keyboard navigation

| Key | Behaviour |
|---|---|
| Tab | Cycles through visible dismiss buttons (one per closable toast) |
| Enter / Space | Activates the focused dismiss button — starts exit animation, then removes the toast |
| No Escape handler | Toasts are non-modal — no global Escape handler needed. Focus is never trapped. |

### Severity and urgency

- **Error** → `role="alert"` — assertive, interrupts immediately. Use for failures requiring immediate user attention.
- **Warn / Info / Success** → `role="status"` — polite, waits for a pause. Use for confirmations and informational messages.
- Do **not** misuse `role="alert"` for routine confirmations — it is reserved for genuinely critical information.
```

**4. CSS custom properties table** (from SCSS vars on `ui-lib-toast`):

| Property | Default | Description |
|---|---|---|
| `--uilib-toast-width` | `22rem` | Width of the toast container |
| `--uilib-toast-gap` | `0.5rem` | Gap between stacked toasts |
| `--uilib-toast-z-index` | `var(--uilib-z-overlay, 1100)` | Stack order |
| `--uilib-toast-offset` | `1.25rem` | Distance from screen edge |
| `--uilib-toast-animation-duration` | `300ms` | Enter/exit animation duration |
| `--uilib-toast-item-padding` | `0.875rem 1rem` | Inner padding of each item |
| `--uilib-toast-item-radius` | `var(--uilib-radius-md, 0.375rem)` | Item corner radius |
| `--uilib-toast-item-font-size` | `0.875rem` | Item text size |

---

### Phase 4 — Performance Audit

Verify the following patterns and write a brief confirmation:

- **`effect()` in constructor** tracks `visibleMessages()` signal reactively. Starting and
  cancelling timers happens only when the message list actually changes. ✅
- **`Map` for timers** — O(1) lookup by message ID when cancelling a specific timer. ✅
- **`DestroyRef.onDestroy`** cleans up all pending timers when the component is destroyed —
  prevents memory leaks when the toast container is removed from the DOM. ✅
- **Animation via CSS `@keyframes`** — no JavaScript animation frame loops. The exit animation
  is CSS-driven; only the timing of the subsequent `remove()` call uses `setTimeout`. ✅
- **`closingIds` signal** uses immutable Set patterns (`new Set([...current, id])`) — safe
  for OnPush change detection, which compares by reference. ✅
- **`computed<ToastMessage[]>`** for `visibleMessages()` — key filtering is memoized; re-runs
  only when `key()` or `toastService.messages()` changes. ✅
- **`@for (... track message.id)`** — tracks by the unique `id` property, minimising DOM
  patching when new messages are added or removed. ✅

If all confirmed, write "Phase 4: No structural changes. All performance patterns verified."

---

### Phase 5 — Composability Audit

Verify and write a brief confirmation of:

- **`key` input** enables multiple isolated toast containers in the same app (e.g., global
  toasts in the top-right, form-feedback toasts at the bottom). ✅
- **`sticky` property on messages** gives consumers control over auto-dismiss lifetime without
  exposing a timer directly. ✅
- **`life` at two levels** — container default + per-message override — is correctly layered:
  `message.life ?? this.life()`. ✅
- **`styleClass` on container and per message** allow visual customisation without subclassing. ✅
- **`ToastService.clear(key?)` method** allows bulk-dismiss scoped to a container key. ✅
- **`closable` property** hides the close button without removing the dismiss API from the
  service — useful for toasts that must stay visible until an action is completed (`sticky: true,
  closable: false`). ✅

If all confirmed, write "Phase 5: No API changes. Composability story is correct."

---

### Phase 6 — Polish Audit

Verify each item below and write a brief confirmation:

- [ ] Close button `:focus-visible` ring uses `outline: 2px solid currentColor; outline-offset: 2px`
  — inherits the severity colour automatically ✅
- [ ] Close button `opacity: 0.7` at rest, `opacity: 1` on `:hover` and `:focus-visible` ✅
- [ ] `transition: opacity 0.15s ease` on close button ✅
- [ ] Keyframe `uilib-toast-enter` slides in from the correct direction per position class
  (right-side uses `--uilib-toast-slide-x: 1rem`, left-side uses `-1rem`, center positions
  use `--uilib-toast-slide-y`) ✅
- [ ] Dark mode overrides present for all 4 severities via `[data-theme='dark']` selectors ✅
- [ ] Minimal variant uses left accent border (3px solid) instead of background colour ✅
- [ ] Material variant uses white surface regardless of severity (icon retains severity colour) ✅
- [ ] After Phase 3 fix: `@media (prefers-reduced-motion: reduce)` sets duration to 0ms ✅ (NEW)
- [ ] `pointer-events: none` on the container + `pointer-events: all` on items — gaps between
  toasts are click-through, items are interactive ✅

If all verified, write "Phase 6: Close button polish, animations, dark mode, variants, and pointer-events all verified. Reduced motion override added."

---

## Step 4 — After every file change

```bash
# After TS change:
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toast/ --max-warnings 0

# After spec change:
node_modules/.bin/jest --testPathPatterns=toast --no-coverage

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
API:     /10  — Inputs + ToastMessage interface; key routing; life layering; sticky/closable
A11y:    /10  — After fixes: correct role (alert/status), no container aria-live conflict,
               dismiss button label specificity, reduced motion, icon aria-hidden
Perf:    /10  — effect() reactive timers, Map lookup, DestroyRef cleanup, CSS keyframes, @for track
Comp:    /10  — key routing, sticky, life layering, ToastService.clear(key), closable
Theme:   /10  — CSS vars, 3 variants + default, 4 severity palettes, dark mode, reduced motion
DX:      /10  — README: ToastMessage table, a11y section, multiple containers, CSS vars table
Docs:    /10  — README accuracy post-update
Polish:  /10  — Close button ring, animation direction per position, dark mode, minimal accent
Angular: /10  — Signal inputs, standalone, OnPush, ViewEncapsulation.None, effect(), DestroyRef
Feel:    /10  — Feels instant, keyboard users can dismiss, urgent errors interrupt, others polite
```

Update `docs/COMPONENT_SCORES.md` — change Toast row from `—` to actual scores.
Update Tier 1 #10 status from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3; move the oldest
of the three to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`):

```
Date: 2026-05-10 [Toast component — 6-phase hardening COMPLETE]
Changed: <list all modified files>
State: <what is complete>
  Phase 3 (A11y — priority):
    • CRITICAL FIX: Removed aria-live="polite" and aria-atomic="false" from container host binding
      — role="region" is a structural landmark, not a live region; child items manage their own
      announcements via role
    • CRITICAL FIX: role="alert" now only for error severity; role="status" for success/info/warn
      — removes incorrectly assertive announcement for non-critical toasts
    • CRITICAL FIX: Removed [attr.aria-live] from item element — redundant/ineffective when set
      on a role="alert" or role="status" element; the role already implies the correct aria-live value
    • MODERATE FIX: Close button aria-label now "Dismiss: {summary}" — specific when multiple
      toasts are visible; falls back to detail then "notification"
    • MODERATE FIX: Added @media (prefers-reduced-motion: reduce) to SCSS
      — sets --uilib-toast-animation-duration: 0ms
    • Created toast.a11y.spec.ts with <N> tests
    • Pre-existing a11y features verified intact: <list>
  Phase 1 (Architecture): <describe — verify no DOCUMENT needed, counter typed>
  Phase 2 (DX): <describe README updates>
  Phase 4 (Performance): <describe — no changes>
  Phase 5 (Composability): <describe — no changes>
  Phase 6 (Polish): <describe — reduced motion added>
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toast/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=toast --no-coverage (<N>/<N> PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: <any workarounds discovered>
Next step: Menubar hardening (Tier 2, #11) — key a11y: role=menubar, full arrow-key nav,
  aria-haspopup, submenu keyboard control.
```

---

## Lessons Learned Reference (from all 10 previous hardenings — apply without exception)

| Lesson | Detail |
|---|---|
| `role="alert"` implies assertive; you cannot override it | Setting `[attr.aria-live]="polite"` on a `role="alert"` element is a no-op. The role wins. Use `role="status"` for polite. |
| Never put `aria-live` on a landmark container | `role="region"` is structural, not a live region. Only the leaf elements that receive dynamic content should have `aria-live` (or roles that imply it). |
| `role="alert"` vs `role="status"` | Error → `alert` (assertive). Success/info/warn → `status` (polite). Misusing `alert` for routine confirmations is a screen reader UX anti-pattern. |
| Close button label specificity | Generic "Dismiss" labels are insufficient when multiple dismissible items exist. Include the item's summary or detail text. |
| `provideIcons(...)` required in tests that use icon components | The `<ui-lib-icon>` component fails silently in tests without `provideIcons`. Copy the exact icon list from the existing spec. |
| `checkA11y(fixture)` for components, `axe(document.body)` for directives | Tooltip appends to document.body outside fixture; use `axe(document.body)`. Toast renders inside fixture; use `checkA11y(fixture)`. |
| `region` axe rule — when to skip | Skip `region` only for overlays appended to `document.body` outside landmarks (Tooltip, Popover, Dialog). Toast has `role="region"` and its items are inside it — `region` rule is satisfied, do NOT skip it. |
| `afterEach` clear the service | `ToastService` is `providedIn: 'root'` and persists across tests if not cleared. Always call `toastService.clear()` in `afterEach`. |
| `async/await` pattern in Toast tests | Use `toastService.add()` + `fixture.detectChanges()` + `await fixture.whenStable()` for every rendering step. Do not use `fakeAsync`/`tick` — the service uses signals. |
| `effect()` in constructor | Effects defined in the constructor run in the injection context automatically. No `Injector` parameter needed. `fixture.detectChanges()` + `whenStable()` is sufficient to trigger them. |
| Module-level counter needs explicit type | `let toastMessageCounter: number = 0` — already present ✅ |
| ESLint in bash.exe only | Run `node_modules/.bin/eslint` from bash.exe. PowerShell returns exit code 1 even on clean runs. |
| `textContent!.trim()` assertion style | Use non-null assertion, never `?.trim()` — the latter triggers `@typescript-eslint/no-unnecessary-condition`. |
| Reduced motion in every animated component | Every component with CSS animations MUST have `@media (prefers-reduced-motion: reduce)` override. Toast was missing this — add it. |
````

