# Tooltip — 6-Phase Hardening Prompt

> **Generated:** 2026-05-10
> **Tier:** 1 — Overlays & Dialogs (#9 in hardening queue)
> **Component type:** Attribute directive (NOT a component — unique testing and injection patterns apply throughout)
> **Based on lessons from:** ConfirmDialog, ConfirmPopup, Drawer, DynamicDialog, Dialog, Select, AutoComplete, Popover hardenings
>
> Run Phase 3 first (priority — Elite Accessibility is the current wow factor),
> then continue Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

Read **all** of the following in one pass before writing a single line of code:

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, code quality checklist
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — Tooltip is Tier 1, #9, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/tooltip/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/tooltip/tooltip.ts`
- `projects/ui-lib-custom/src/lib/tooltip/tooltip.scss`
- `projects/ui-lib-custom/src/lib/tooltip/tooltip.spec.ts`
- `projects/ui-lib-custom/src/lib/tooltip/tooltip.types.ts`

Also read the already-hardened siblings for established patterns:
- `projects/ui-lib-custom/src/lib/popover/popover.ts` (`DOCUMENT` injection from `@angular/common`, module-level counter with explicit type annotation)
- `projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.a11y.spec.ts` (a11y spec structure, axe-core pattern)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes. These must remain intact:

- `role="tooltip"` on the dynamically created tooltip element ✅
- `aria-hidden="true"` on the arrow div inside the tooltip element ✅
- `aria-describedby` set to `tooltipId` on the host element when the tooltip is visible ✅
- `aria-describedby` removed from the host element when the tooltip is hidden ✅
- `tooltipId` format: `ui-lib-tooltip-{counter}` — public string property ✅
- Module-level counter `let tooltipIdCounter: number = 0` with explicit `: number` type ✅
- Tooltip element appended to `document.body` (escapes overflow ancestors) ✅
- Tooltip element lazily created only on first show (never created at init) ✅
- Cleanup timer (`TOOLTIP_CLEANUP_DELAY_MS = 250`) gracefully defers DOM removal to allow CSS fade-out ✅
- `cancelCleanupTimer()` called before `ensureTooltipElement()` — prevents create/destroy race ✅
- `requestAnimationFrame` used to add `--visible` class — allows paint before CSS transition ✅
- Escape key on `document` closes visible tooltip (keydown listener on `document`, not just host) ✅
- Escape key listener always active (regardless of `tooltipEvent` mode) ✅
- `pointer-events: none` on tooltip element — never blocks user interaction ✅
- `@media (prefers-reduced-motion: reduce)` sets `--uilib-tooltip-enter-duration: 0ms` ✅
- `ngZone.runOutsideAngular()` wraps all DOM event listeners — zero unnecessary CD cycles ✅
- All timers cleared in `ngOnDestroy()` ✅
- All listeners removed in `ngOnDestroy()` via `teardownListeners()` ✅
- Tooltip element removed from `document.body` in `ngOnDestroy()` ✅
- `tooltipDisabled` guard — show suppressed when `true` ✅
- Empty string guard — show suppressed when `uiLibTooltip` is `''` ✅
- `refreshTooltipContent()` updates text and variant while tooltip is already visible ✅
- Viewport-clamped positioning with position flip logic ✅
- 3 variants: `material`, `bootstrap`, `minimal` — each with own CSS var overrides ✅

---

## Step 3 — Your task: the 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

#### Issue 1 — `hover` mode excludes keyboard users (CRITICAL — WCAG 1.4.13 AA violation)

**WCAG 2.1 SC 1.4.13 — Content on Hover or Focus (AA):** When pointer hover triggers
additional content to appear (the tooltip), the same content MUST also appear on keyboard
focus. The current `tooltipEvent = 'hover'` (default) binds only `mouseenter`/`mouseleave`.
Keyboard users who tab to the element receive no tooltip and no `aria-describedby`
relationship — they cannot access content that mouse users see.

**Root cause:** In `setupListeners()`, focus/blur listeners are only added when
`event === 'focus' || event === 'both'`. When `event === 'hover'`, no focus listener
is registered.

**Fix:** Include focus/blur listeners for `'hover'` mode by expanding the condition:

```typescript
private setupListeners(): void {
  const host: HTMLElement = this.elementRef.nativeElement;
  const event: TooltipEvent = this.tooltipEvent();

  if (event === 'hover' || event === 'both') {
    this.mouseEnterListener = (): void => {
      this.scheduleShow();
    };
    this.mouseLeaveListener = (): void => {
      this.scheduleHide();
    };
    host.addEventListener('mouseenter', this.mouseEnterListener);
    host.addEventListener('mouseleave', this.mouseLeaveListener);
  }

  // WCAG 1.4.13 — any event mode that includes hover MUST also include focus.
  // 'hover' alone satisfies mouse users but fails keyboard users — fix by
  // binding focus/blur for 'hover' and 'both' in addition to 'focus'.
  if (event === 'focus' || event === 'both' || event === 'hover') {
    this.focusListener = (): void => {
      this.scheduleShow();
    };
    this.blurListener = (): void => {
      this.scheduleHide();
    };
    host.addEventListener('focus', this.focusListener);
    host.addEventListener('blur', this.blurListener);
  }

  this.keydownListener = (keyEvent: KeyboardEvent): void => {
    if (keyEvent.key === 'Escape' && this.isVisible) {
      this.cancelShowTimers();
      this.cancelHideTimers();
      this.hideTooltipImmediately();
    }
  };
  this.document.addEventListener('keydown', this.keydownListener);
}
```

**Backward compatibility:** `'both'` continues to work identically (hover + focus). `'focus'`-only
mode is unchanged. `'hover'` now silently includes focus, which is the correct WCAG default.
Document this behavioral change in the README.

**Teardown:** The `teardownListeners()` method already handles null-guarded removal of
`focusListener` and `blurListener` — no change needed there since the guards handle the case
where these were previously `null` for `hover` mode.

---

#### Issue 2 — `document` used directly instead of injected `DOCUMENT` (SSR safety)

**Root cause:** The directive calls `document.body.appendChild()`, `document.createElement()`,
and `document.addEventListener()` / `document.removeEventListener()` directly. In SSR environments
(Angular Universal / SSR with `@angular/ssr`), `document` is not available in the global scope
and these calls will throw.

**Fix:** Inject `DOCUMENT` from `@angular/common` and replace all direct `document.*` calls:

Add to imports:
```typescript
import { DOCUMENT } from '@angular/common';
```

Add to class fields (after `themeConfig`):
```typescript
private readonly document: Document = inject(DOCUMENT);
```

Replace throughout the class:
- `document.body.appendChild(el)` → `this.document.body.appendChild(el)`
- `document.addEventListener('keydown', ...)` → `this.document.addEventListener('keydown', ...)`
- `document.removeEventListener('keydown', ...)` → `this.document.removeEventListener('keydown', ...)`
- `document.createElement('div')` → `this.document.createElement('div')`

Also replace in `positionTooltip()`:
- `window.innerWidth` → `this.document.defaultView?.innerWidth ?? 0`
- `window.innerHeight` → `this.document.defaultView?.innerHeight ?? 0`

**Note on `positionTooltip` fallback:** `defaultView` can be `null` in a Worker context.
Use `?? 0` as a safe fallback — if `defaultView` is null, positioning simply won't work but
will not throw. This is acceptable for SSR where the directive doesn't run the display lifecycle anyway.

**Important:** The `teardownListeners()` method references `document.removeEventListener` for
the Escape key listener — update this call too:
```typescript
if (this.keydownListener) {
  this.document.removeEventListener('keydown', this.keydownListener);
  this.keydownListener = null;
}
```

---

#### Deliverable — `tooltip.a11y.spec.ts`

**⚠️ Directive-specific testing notes (critical differences from component specs):**

1. The tooltip element is appended to `document.body`, NOT inside `fixture.nativeElement`.
   Use `document.body.querySelector<HTMLElement>(`#${directive.tooltipId}`)` to find it.
2. No `TestBed.flushEffects()` — the Tooltip is not signals-based. Event listeners fire
   synchronously outside Angular zone. No CD cycle is needed after event dispatch.
3. No `afterNextRender` — tooltip creation is synchronous DOM manipulation.
4. `fixture.detectChanges()` IS still needed after changing signal inputs on the host component.
5. Use `debugEl.injector.get(Tooltip)` (not `By.directive`) for directive instance access.
6. The `--visible` CSS class is added in a `requestAnimationFrame` — not needed for testing
   `aria-describedby` (which is set synchronously). Do not rely on `--visible` for a11y tests.
7. axe-core for the visible-tooltip scenarios: must run `axe(document.body)` directly (not
   `checkA11y(fixture)`) because the tooltip element lives in `document.body` outside the
   fixture's nativeElement. The `aria-describedby` ↔ `role="tooltip"` relationship is only
   validated when axe sees both elements in the same subtree.
8. **Always clean up after each test** — the directive appends to `document.body`.
   Use `afterEach` to remove lingering `.ui-lib-tooltip` elements.

**Host component for a11y spec:**

```typescript
@Component({
  standalone: true,
  imports: [Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="host-btn"
      [uiLibTooltip]="tooltipText()"
      [tooltipEvent]="tooltipEvent()"
      [tooltipDisabled]="tooltipDisabled()"
      [tooltipPosition]="tooltipPosition()"
    >
      Hover or focus me
    </button>
  `,
})
class TooltipA11yHostComponent {
  public readonly tooltipText: WritableSignal<string> = signal<string>('Helpful hint');
  public readonly tooltipEvent: WritableSignal<TooltipEvent> = signal<TooltipEvent>('hover');
  public readonly tooltipDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tooltipPosition: WritableSignal<TooltipPosition> = signal<TooltipPosition>('top');
}
```

**Helper functions:**

```typescript
function getDirective(fixture: ComponentFixture<TooltipA11yHostComponent>): Tooltip {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
  return debugEl.injector.get(Tooltip);
}

function getHostEl(fixture: ComponentFixture<TooltipA11yHostComponent>): HTMLElement {
  return fixture.debugElement.query(By.directive(Tooltip)).nativeElement as HTMLElement;
}

function getTooltipEl(id: string): HTMLElement | null {
  return document.body.querySelector<HTMLElement>(`#${id}`);
}
```

**axe-core import pattern:**
```typescript
import { axe } from 'jest-axe';
import { SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
```

**Direct axe call for visible-tooltip scenarios** (since tooltip is in body):
```typescript
const results = await axe(document.body, { rules: SKIP_COLOR_CONTRAST_RULES });
expect(results.violations.length).toBe(0);
```

**Spec structure (aim for 30–34 tests):**

```
describe('Tooltip Accessibility')
  afterEach: remove all .ui-lib-tooltip from document.body

  describe('host-element ARIA attributes')
    ✓ aria-describedby is absent before any event
    ✓ aria-describedby is set to tooltipId on mouseenter
    ✓ aria-describedby is set to tooltipId on keyboard focus (hover mode — WCAG 1.4.13)
    ✓ aria-describedby is removed on mouseleave
    ✓ aria-describedby is removed on blur
    ✓ aria-describedby is set to tooltipId on focus when tooltipEvent="focus"
    ✓ aria-describedby is set to tooltipId on mouseenter when tooltipEvent="both"
    ✓ aria-describedby is set to tooltipId on focus when tooltipEvent="both"

  describe('tooltip element ARIA structure')
    ✓ tooltip element has role="tooltip"
    ✓ tooltip element id matches tooltipId property
    ✓ tooltip text content matches uiLibTooltip input
    ✓ arrow element has aria-hidden="true"
    ✓ tooltip element exists in document.body (not in fixture nativeElement)

  describe('tooltipId')
    ✓ tooltipId is a public string property (non-empty, starts with ui-lib-tooltip-)
    ✓ aria-describedby on host matches tooltipId when visible

  describe('keyboard accessibility (WCAG 1.4.13)')
    ✓ tooltip shows on keyboard focus when tooltipEvent="hover" (default — WCAG 1.4.13)
    ✓ tooltip hides on blur when tooltipEvent="hover" (default)
    ✓ tooltip shows on focus when tooltipEvent="focus"
    ✓ tooltip shows on focus when tooltipEvent="both"

  describe('Escape key dismissal')
    ✓ Escape key dismisses visible tooltip
    ✓ aria-describedby is removed after Escape
    ✓ Escape when tooltip not visible does not throw

  describe('tooltipDisabled')
    ✓ tooltip does not appear on mouseenter when tooltipDisabled=true
    ✓ aria-describedby is NOT set when tooltipDisabled=true
    ✓ tooltip does NOT appear on focus when tooltipDisabled=true

  describe('lifecycle and cleanup')
    ✓ tooltip element is removed from document.body when directive is destroyed
    ✓ aria-describedby is not present on host after directive destroy
    ✓ tooltip element is absent from body when tooltip is hidden (after cleanup delay)

  describe('axe-core automated checks')
    ✓ passes axe (document.body, no tooltip visible) — closed state
    ✓ passes axe (document.body) when tooltip is visible via mouseenter
    ✓ passes axe (document.body) when tooltip is visible via keyboard focus
    ✓ passes axe (document.body) when tooltipDisabled=true
```

---

### Phase 1 — Architecture Audit

#### Issue — `document` and `window` used directly (also covered in Phase 3)

This is the same SSR-safety issue described in Phase 3 Issue 2. The architecture fix is:
adding `inject(DOCUMENT)` and using `this.document.*` throughout. No additional architecture
changes are needed beyond what Phase 3 prescribes.

**Verify that the existing module-level counter is already correct:**
```typescript
let tooltipIdCounter: number = 0;  // ✅ explicit : number type already present
```

**Verify that `TOOLTIP_CLEANUP_DELAY_MS` has an explicit type:**
```typescript
const TOOLTIP_CLEANUP_DELAY_MS: number = 250;  // verify this exists with : number annotation
```

**`setupListeners()` reads `this.tooltipEvent()` once at init.** If the input changes after
`ngOnInit()`, the listeners will not update — this is a known design limitation. Add a
JSDoc comment to `setupListeners()` noting this:
```typescript
/**
 * Binds DOM event listeners based on the current `tooltipEvent` input value.
 * Called once at ngOnInit. Listener configuration does NOT reactively update
 * if `tooltipEvent` changes after initialization — this is by design (static setup).
 */
private setupListeners(): void { ... }
```

---

### Phase 2 — Developer Experience Audit

#### Issue — README Accessibility section is sparse and misses critical consumer patterns

**Current state:** The a11y section is a 4-bullet list. Missing:
- WCAG 1.4.13 behavior (focus now included automatically with hover)
- `tooltipId` public property and consumer use cases
- Keyboard navigation table
- SSR note (DOCUMENT injection)
- Clear explanation of when `aria-describedby` is present vs absent

**Fix:** Replace the existing accessibility section with a full ARIA features table +
keyboard navigation table + consumer guidance section.

**ARIA features table** must document:

| Feature | Detail |
|---|---|
| `role="tooltip"` | Applied to the dynamically created tooltip element in `document.body`. |
| `aria-describedby` | Set on the host element to `tooltipId` while the tooltip is visible. Removed when tooltip hides. |
| `tooltipId` | Public string property — the `id` of the tooltip element. Use for custom `aria-describedby` wiring or test assertions. |
| WCAG 1.4.13 compliance | `tooltipEvent="hover"` (default) also binds `focus`/`blur` — keyboard users see the same tooltip as mouse users. |
| `tooltipEvent="focus"` | Binds only `focus`/`blur` — tooltip appears on keyboard navigation, not hover. |
| `tooltipEvent="both"` | Binds both hover and focus explicitly (equivalent to `hover` post-fix, but self-documenting). |
| Escape key | Always active — dismisses the tooltip regardless of which event triggered it. |
| `pointer-events: none` | Tooltip is fully non-interactive — never blocks clicks, hovers, or focus on underlying content. |
| Arrow | `aria-hidden="true"` — decorative only. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` sets `--uilib-tooltip-enter-duration: 0ms`. |
| Lazy DOM | Tooltip element created only on first show, removed from `document.body` on hide (after transition delay). |

**Keyboard navigation table:**

| Key | Behaviour |
|---|---|
| Tab (to host) | Shows the tooltip (all `tooltipEvent` modes) |
| Tab (away from host) / Shift+Tab | Hides the tooltip |
| Escape | Dismisses the visible tooltip and cancels any pending show timer |

**Consumer guidance — `tooltipEvent` selection:**

```html
<!-- Default: hover + focus (WCAG 1.4.13 compliant) -->
<button uiLibTooltip="Save the document">Save</button>

<!-- Focus-only: good for form fields where hover is redundant -->
<input uiLibTooltip="Enter your email address" tooltipEvent="focus" />

<!-- Both: explicit (equivalent to hover post-WCAG fix, self-documenting intent) -->
<span uiLibTooltip="Right side info" tooltipPosition="right" tooltipEvent="both">Info</span>
```

**Update the Inputs table** to note that `tooltipEvent="hover"` (default) now also includes
focus events for WCAG 1.4.13 compliance.

---

### Phase 4 — Performance Audit

No changes expected. Verify the following are already correct and write a brief confirmation:

- `ngZone.runOutsideAngular(() => this.setupListeners())` in `ngOnInit` — all DOM event
  listeners run outside Angular's zone, zero unnecessary CD cycles ✅
- `requestAnimationFrame` for adding `--visible` class — allows the browser to paint the
  initial `opacity: 0` state before transitioning to `opacity: 1` ✅
- `cancelCleanupTimer()` called before `ensureTooltipElement()` in `showTooltipImmediately()` —
  prevents a create-then-destroy race when show fires during the cleanup grace period ✅
- Tooltip element created lazily (only on first show, not during directive initialization) ✅
- `destroyTooltipElement()` removes the element from the DOM immediately on hide start but waits
  250ms (CSS transition completes). `isVisible` is set `false` and `aria-describedby` is removed
  synchronously — AT never sees the hidden element as described ✅
- `clearAllTimers()` in `ngOnDestroy()` prevents timer callbacks from firing on a destroyed
  directive ✅

If all confirmed, write "Phase 4: No structural changes. All performance patterns verified."

---

### Phase 5 — Composability Audit

No structural changes expected. Verify and write a brief confirmation of:

- Attribute directive pattern is the correct composability model for tooltips — consumers
  add `uiLibTooltip` to any element without wrapper components or DOM restructuring ✅
- `tooltipId` public property enables consumer-side automation, testing, or custom
  `aria-describedby` wiring for complex widgets ✅
- `tooltipDisabled` input provides clean conditional suppression without removing the directive ✅
- `showDelay` / `hideDelay` enable hover-intent behavior for dense UIs ✅
- No service layer needed — the directive is fully self-contained per instance ✅

If all confirmed, write "Phase 5: No API changes. Directive composability story is correct.
`tooltipId` public property supports consumer accessibility wiring."

---

### Phase 6 — Polish Audit

Verify each item is correct and write a brief confirmation:

- [ ] Arrow colors match `--uilib-tooltip-bg` for all 3 variants
  - Default: `border-*-color: var(--uilib-tooltip-bg)` (dark grey `#1f2937`) ✅
  - Material: overrides `--uilib-tooltip-bg: #212121` → arrow inherits ✅
  - Bootstrap: overrides `--uilib-tooltip-bg: #343a40` → arrow inherits ✅
  - Minimal: overrides `--uilib-tooltip-bg: var(--uilib-page-fg, #1f2937)` → arrow inherits ✅
- [ ] `@media (prefers-reduced-motion: reduce)` sets duration to 0ms ✅
- [ ] `transition` on opacity + transform (not just one) ✅
- [ ] `pointer-events: none` on tooltip base class ✅
- [ ] `word-break: break-word` on tooltip for long label resilience ✅

If all verified, write "Phase 6: All polish requirements verified. No changes needed."

---

## Step 4 — After every file change

```bash
# After TS change:
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tooltip/ --max-warnings 0

# After spec change:
node_modules/.bin/jest --testPathPatterns=tooltip --no-coverage

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
API:     /10  — Inputs consistent; tooltipId for custom wiring; tooltipEvent values clear
A11y:    /10  — After fixes: WCAG 1.4.13, role=tooltip, aria-describedby lifecycle, Escape key
Perf:    /10  — runOutsideAngular, rAF for visible class, lazy creation, timer management
Comp:    /10  — Directive pattern; tooltipId public; no service needed; tooltipDisabled
Theme:   /10  — CSS vars, 3 variants, arrow colors, reduced motion
DX:      /10  — README completeness, tooltipEvent WCAG note, tooltipId documented
Docs:    /10  — README accuracy post-update
Polish:  /10  — Animation, arrow colors per variant, transition, word-break
Angular: /10  — Signals inputs, standalone, SSR-safe (DOCUMENT injection), OnInit/OnDestroy
Feel:    /10  — Tooltip appears precisely, keyboard users get the same content as mouse users
```

Update `docs/COMPONENT_SCORES.md` — change Tooltip row from `—` to actual scores.
Update Tier 1 #9 status from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3; move older ones to
`docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`):

```
Date: 2026-05-10 [Tooltip directive — 6-phase hardening COMPLETE]
Changed: <list all modified files>
State: <what is complete>
  Phase 3 (A11y — priority):
    • CRITICAL FIX: WCAG 1.4.13 — hover mode now also binds focus/blur;
      keyboard users see the same tooltip as mouse users
    • MINOR FIX: DOCUMENT injected (SSR-safe); replaced all direct document.*/window.* calls
    • Created tooltip.a11y.spec.ts with <N> tests
    • Pre-existing a11y features verified intact: <list>
  Phase 1 (Architecture): <describe DOCUMENT injection + window.innerWidth SSR fix>
  Phase 2 (DX): <describe README updates>
  Phase 4 (Performance): <describe — no changes or changes>
  Phase 5 (Composability): <describe — no changes or changes>
  Phase 6 (Polish): <describe — no changes or changes>
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tooltip/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=tooltip --no-coverage (<N>/<N> PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: <any workarounds discovered>
Next step: Toast hardening (Tier 1, #10) — key a11y: aria-live=assertive live region, dismiss button keyboard access, role=status vs role=alert.
```

---

## Lessons Learned Reference (from 9 previous hardenings — apply without exception)

| Lesson | Detail |
|---|---|
| Module-level counter needs explicit type | `let tooltipIdCounter: number = 0` — explicitly typed; already present ✅ |
| `DOCUMENT` injection for SSR | Use `inject(DOCUMENT)` from `@angular/common`. Replace `document.*` → `this.document.*`; `window.*` → `this.document.defaultView?.*` |
| `window` access via `document.defaultView` | `this.document.defaultView?.innerWidth ?? 0` — safe fallback when `defaultView` is null (Worker, SSR) |
| `WCAG 1.4.13` hover always includes focus | Any component/directive that shows content on hover MUST also show it on focus. The fix is one line: add `|| event === 'hover'` to the focus listener condition |
| Directive a11y testing: tooltip is in body | Use `document.body.querySelector('#tooltipId')` — NOT `fixture.nativeElement.querySelector(...)` |
| axe with body-appended elements | Run `await axe(document.body, opts)` directly for tooltip-visible axe checks; `checkA11y(fixture)` only checks the fixture's subtree |
| No `flushEffects()` for directives | Tooltip uses `ngOnInit`/`ngOnDestroy` lifecycle, not signals/effects. No `TestBed.flushEffects()` needed. Events fire synchronously outside Angular zone. |
| `afterEach` body cleanup mandatory | Directive appends to `document.body`. Always clean with `document.querySelectorAll('.ui-lib-tooltip').forEach(el => el.remove())` |
| Directive instance via injector | `fixture.debugElement.query(By.directive(Tooltip)).injector.get(Tooltip)` — not `componentInstance` |
| `textContent` assertion style | Use `textContent!.trim()` (non-null assertion), never `?.trim()` — the latter triggers `@typescript-eslint/no-unnecessary-condition` |
| ESLint in bash.exe only | Run `node_modules/.bin/eslint` from bash.exe. PowerShell returns exit code 1 even on clean runs |
| `teardownListeners()` null guards | `focusListener` and `blurListener` are already null-guarded in `teardownListeners()`. When `hover` mode binds them, the same guard handles cleanup — no change to teardown needed |
| `aria-describedby` lifecycle | Set synchronously in `showTooltipImmediately()` before rAF for `--visible`. Removed synchronously in `hideTooltipImmediately()`. Tests can assert on `aria-describedby` immediately after event dispatch — no timer flush needed. |
| `shown`/`hidden` note does NOT apply | Tooltip has no `shown`/`hidden` outputs. It uses direct DOM mutation. This is not a signals-based overlay. |

