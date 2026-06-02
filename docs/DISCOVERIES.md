# Engineering Discoveries

> A living record of non-obvious findings, blocked situations and how they were resolved,
> improved patterns, and anything that will help future sessions write better code and make
> better decisions faster.
>
> **How to use this document:**
>
> - Read the relevant category before starting work in that area.
> - Add a new entry whenever you unblock something tricky, find a better pattern, or catch
>   a class of bug that could recur. Keep entries concise and actionable.
> - Each entry has: **Context** (when does this apply?), **Finding** (what happened?),
>   **Solution / Pattern** (what to do instead), and optionally a **Reference**.
>
> **Do NOT put stable architectural rules here** — those go in `LIBRARY_CONVENTIONS.md`.
> This document is for _discoveries_ — things that surprised us or took effort to figure out.

---

## Categories

1. [Angular Signals & Change Detection](#1-angular-signals--change-detection)
2. [Testing — E2E (Playwright + axe-core)](#2-testing--e2e-playwright--axe-core)
3. [Testing — Unit (Jest / jest-axe)](#3-testing--unit-jest--jest-axe)
4. [Accessibility — ARIA Patterns & Violations](#4-accessibility--aria-patterns--violations)
5. [Demo App Patterns](#5-demo-app-patterns)
6. [Library Architecture](#6-library-architecture)
7. [i18n & Docs Tooling](#7-i18n--docs-tooling)

---

## 1. Angular Signals & Change Detection

---

### 1-A · Plain boolean properties do not reliably trigger CD in zoneless + OnPush

> **⚠️ Reason corrected by 1-E (2026-06-01).** This entry's _root-cause claim_ — that
> `[visible]` `setInput()` doesn't reach the child's `@if` — is wrong. The dialog's `model()`
> input received the value; the panel was missing because of an `afterNextRender` NG0203 throw
> (see 1-E). Using `WritableSignal` for overlay state is still good signals-first practice, but it
> does **not** fix that bug, and there is no `[(visible)]`-on-a-signal propagation problem.

**Context:** Demo components (or any `ChangeDetectionStrategy.OnPush` component) that hold
overlay open/close state as a plain `boolean` property.

**Finding (2026-06-01):** In a zoneless Angular app, a template event handler like
`(click)="basicVisible = true"` does trigger CD for the _event-binding component_ (the demo
component re-renders and its `[attr.aria-expanded]="basicVisible"` updates). BUT the _child
component_ bound via `[visible]="basicVisible"` may not reliably receive its `setInput()` call
and subsequently re-render its own template. This caused `ui-lib-dialog`'s `@if (visible())` to
never fire in the `ng serve` Playwright e2e environment, even though the parent clearly ran CD.

**Solution / Pattern:**

```ts
// ✗ Fragile in zoneless+OnPush — may not propagate to child's @if
public basicVisible: boolean = false;

// ✅ Reliable — signal change propagates reactively
public readonly basicVisible: WritableSignal<boolean> = signal(false);
```

And in the template, use the explicit two-way form rather than `[(model)]` shorthand when
the signal type might be ambiguous to the template compiler:

```html
<!-- ✅ Explicit — leaves no ambiguity for the Angular compiler -->
<ui-lib-dialog [visible]="basicVisible()" (visibleChange)="basicVisible.set($event)" />

<!-- ⚠️  May work but the compiler must infer WritableSignal → auto-call; verify it does -->
<ui-lib-dialog [(visible)]="basicVisible" />
```

**Reference:** `AI_AGENT_CONTEXT.md` handoff 2026-06-01; `dialog-demo.component.ts` migration.

---

### 1-B · `ng.applyChanges()` cannot be called from `page.evaluate()`

**Context:** Playwright e2e tests that mutate Angular component state via
`page.evaluate(() => ng.getComponent(el).someSignal.set(value))`.

**Finding (2026-06-01):** `ng.applyChanges(comp)` (Angular's dev-tools global API) internally
calls `afterNextRender()`, which requires an Angular injection context. Calling it from
`page.evaluate()` (which runs in the browser but outside Angular's lifecycle) throws:

```
NG0203: afterNextRender() can only be used within an injection context
```

This crashes the evaluate silently (Playwright catches the rejection and moves on), leaving
the component unchanged.

**Solution / Pattern:** Call `signal.set()` directly — **without** `ng.applyChanges()`. In
zoneless Angular, signal mutations are detected by the `ReactiveChangeDetectionScheduler`
regardless of where the mutation originated. The scheduler will pick up the change on the
next tick automatically:

```ts
await page.evaluate(() => {
  const ng = window.ng;
  const comp = ng.getComponent(document.querySelector('app-my-component'));
  comp?.someSignal?.set(true);
  // Do NOT call ng.applyChanges(comp) — throws NG0203 from page.evaluate()
});
```

---

### 1-C · Use `aria-expanded` as a CD-ran proxy before waiting for dynamic content

**Context:** E2E tests that trigger a state change via `page.evaluate()` and then wait for
dependent DOM content to appear.

**Finding (2026-06-01):** After calling `ng.getComponent(el).signal.set(true)` from
`page.evaluate()`, Angular's reactive CD may schedule the re-render asynchronously. If you
immediately `waitForSelector('.some-dynamic-panel')`, it can timeout because the CD tick hasn't
fired yet. But if you wait for a proxy attribute that you know updates in the same CD pass
(e.g. `[attr.aria-expanded]="signal()"` on a nearby element), you guarantee CD ran before
checking the panel.

**Solution / Pattern:**

```ts
await page.evaluate(() => {
  comp.open.set(true);
});

// Wait for a cheap attribute bound to the same signal to confirm CD ran.
// This is a reactive wait — no arbitrary sleeps needed.
await expect(page.locator('[aria-controls="my-panel"]')).toHaveAttribute('aria-expanded', 'true');

// NOW the heavy waitForSelector is reliable
await page.waitForSelector('.my-dynamic-panel');
```

---

### 1-D · `ng.getComponent()` requires the routed component to already be in the DOM

**Context:** E2E tests that navigate to a lazily-loaded route and then use
`ng.getComponent(document.querySelector('app-some-demo'))`.

**Finding (2026-06-01):** `waitForFunction(() => typeof window.ng !== 'undefined')` fires on
Angular app _bootstrap_, which happens before the router finishes rendering the lazily-loaded
route component. `document.querySelector('app-dialog-demo')` returned `null`, so
`ng.getComponent(null)` silently returned `null`, and the `?.set()` call did nothing.

**Solution / Pattern:** Wait for the component's custom element to be present before querying:

```ts
// ✗ Too early — fires on app bootstrap, before lazy route renders
await page.waitForFunction(() => typeof window.ng !== 'undefined');

// ✅ Correct — waits for the actual routed component
await page.waitForSelector('app-dialog-demo');
const result = await page.evaluate(() => {
  const comp = window.ng.getComponent(document.querySelector('app-dialog-demo'));
  comp?.someSignal?.set(true);
});
```

---

### 1-E · `afterNextRender()` / `inject()` inside an `effect()` throws NG0203 and silently aborts the render

**Context:** Any component that calls `afterNextRender()`, `afterEveryRender()`, or `inject()`
from inside an `effect()` callback, an event handler, or any non-injection context.

**Finding (2026-06-01) — this CORRECTS findings 1-A and 5-A:** The real reason `ui-lib-dialog`'s
`@if (visible())` panel never rendered was **not** signal/`setInput` propagation. The `model()`
input received the value correctly (`ng.getComponent(dlg).visible()` returned `true`, and host
effects ran — body scroll-lock was applied). The panel was missing because the focus-trap
`effect()` called `afterNextRender(...)` **without an injector**. Inside an effect there is no
injection context, so it threw `NG0203`, which **aborted the change-detection pass** and left the
`@if` block unrendered. Every subsequent tick re-threw. Unit tests never caught it (see 3-C).

**Solution / Pattern:** Capture the injector once and pass it explicitly:

```ts
private readonly injector = inject(Injector);

constructor() {
  effect((): void => {
    if (!this.shouldTrap()) { return; }
    // ✗ throws NG0203 — no injection context inside an effect
    // afterNextRender(() => this.activate());

    // ✅ pass the captured injector
    afterNextRender(() => this.activate(), { injector: this.injector });
  });
}
```

A library-wide sweep confirmed every other overlay (drawer, popover, confirm-popup,
context-menu, menubar, …) already passed `{ injector }`; the dialog was the lone offender.
**The misdiagnosis is more dangerous than the bug** — `[(visible)]` on a signal works fine;
do not migrate demos to "explicit binding form" expecting it to fix a CD propagation problem
that does not exist. **Reference:** `dialog.component.ts` fix 2026-06-01; PR #284.

---

## 2. Testing — E2E (Playwright + axe-core)

---

### 2-A · `reuseExistingServer: !isCI` silently runs tests against the wrong app

**Context:** `playwright.config.ts` webServer configuration.

**Finding (2026-05-30):** The default Playwright config used `reuseExistingServer: !isCI`.
Locally, a completely different app ("Vision HQ" operator dashboard) was already running on
`:4200`. Playwright reused it, so every test navigated to the wrong app — `/select` and
`/tabs` rendered a business dashboard instead of the component demos. All tests passed or
failed based on the wrong app's DOM. The false-negatives were invisible until inspecting
Playwright's `error-context.md` page snapshots.

**Solution / Pattern:**

```ts
// ✅ Always start fresh on a dedicated port.
// Pick a port that nothing else occupies locally.
const DEMO_PORT = 4321;

export default defineConfig({
  use: { baseURL: `http://localhost:${DEMO_PORT}` },
  webServer: {
    command: `ng serve demo --port ${DEMO_PORT}`,
    url: `http://localhost:${DEMO_PORT}`,
    reuseExistingServer: false, // ← never reuse; always own the server
    timeout: 120000,
  },
});
```

**Reference:** `playwright.config.ts` updated 2026-06-01; `GROUND_TRUTH_AUDIT_2026-05-30.md`.

---

### 2-B · `page.keyboard.press()` is flaky in parallel test runs; prefer `locator.press()`

**Context:** E2E tests that press arrow keys on focusable components (sliders, menus, trees)
when tests run with `fullyParallel: true` and multiple workers.

**Finding (2026-06-01):** `page.keyboard.press('ArrowRight')` sends the key to whatever element
currently has keyboard focus in the _page_. In parallel test execution, Angular's reactive re-renders
can briefly move focus between assertion and keypress, causing the key to land on the wrong element.
The symptom: `aria-valuenow` doesn't change despite `await expect(slider).toBeFocused()` passing
just before the press.

**Solution / Pattern:**

```ts
// ✗ Depends on global page focus — flaky in parallel runs
await slider.focus();
await page.keyboard.press('ArrowRight');

// ✅ Sends key directly to the element regardless of page focus state
await slider.press('ArrowRight');

// ✅ Also reliable when you need to read the updated value reactively
await slider.press('ArrowLeft');
// Wait for the value to actually change rather than assuming synchronous update
await expect(slider).not.toHaveAttribute('aria-valuenow', String(startValue));
const newValue = await slider.getAttribute('aria-valuenow');
```

---

### 2-C · Scope axe scans to the PANEL, not the host, for popup/overlay components

**Context:** axe-core tests for components that have a trigger + popup panel
(Select, AutoComplete, CascadeSelect, DatePicker, TreeSelect, ColorPicker).

**Finding (2026-06-01):** When you run axe with `.include('ui-lib-cascade-select')` (the whole
host), axe flags the trigger element for `label` / `aria-input-field-name` violations because
the basic demo examples intentionally omit `ariaLabel` to keep code snippets minimal. This is a
_consumer usage_ gap, not a component bug. But it pollutes the panel-ARIA test with noise.

The panel itself — the actual overlay content with listboxes, grids, menus — IS owned by the
component and must be clean.

**Solution / Pattern:**

```ts
// ✗ Includes trigger (which has no label in demo — consumer's responsibility)
await assertAxeClean(page, 'ui-lib-cascade-select');

// ✅ Tests only the open panel — the component's owned ARIA territory
await assertAxeClean(page, '.ui-lib-cascade-select__panel');
```

Add a code comment explaining _why_ you scope to the panel, so future editors don't "fix" it
back to the host.

---

### 2-D · The Playwright error-context snapshot is the fastest debugging tool

**Context:** Any failing e2e test where the cause isn't obvious from the error message.

**Finding (2026-05-30 / 2026-06-01):** Playwright's `error-context.md` file (in `test-results/`)
includes a full accessibility tree snapshot of the page at the moment of failure. This revealed
in seconds that:

- The "wrong app" failure was the Vision HQ dashboard (Finding 2-A)
- The dialog button was `[active]` (was being pressed) but `aria-expanded` was still `"false"`,
  proving the click landed but Angular hadn't processed it
- The `[role="menuitem"][tabindex="0"]` selector matched 5 elements (strict mode violation)

**Pattern:** When a test fails unexpectedly, **read `test-results/<test-name>/error-context.md`
first** before adding logging or re-running. The snapshot answers "what was the page state" in
a structured, searchable format.

---

### 2-E · Use `aria-controls` attribute as a stable unique trigger selector

**Context:** Selecting a specific button on a demo page that opens an overlay, when CSS
selector chains through wrapper components are fragile.

**Finding (2026-06-01):** `app-doc-section#basic ui-lib-button` failed when the section
wrapper component didn't forward `id` to its host in a way CSS could navigate. `getByRole('button',
{ name: 'Open Basic Dialog' })` worked for the accessible name lookup but the click
didn't propagate to Angular's event binding in some test runs.

The most reliable selector is `aria-controls` — it's explicitly set on the trigger button
in the demo template and directly references the controlled panel:

```html
<!-- In the demo template — aria-controls is both semantically correct and test-stable -->
<ui-lib-button
  (click)="basicVisible.set(true)"
  [attr.aria-expanded]="basicVisible()"
  aria-controls="dialog-basic-content"
>
  Open Dialog
</ui-lib-button>
```

```ts
// In the test — unique, semantic, stable
const trigger = page.locator('[aria-controls="dialog-basic-content"]');
```

---

### 2-F · Playwright strict mode: use `.first()` when multiple elements match

**Context:** Any locator that could match more than one element in the demo (e.g. multiple
instances of a component on the same page).

**Finding (2026-06-01):** Demo pages show multiple variants/examples of a component. Locators
like `.ui-lib-drawer__panel` matched 6 panels simultaneously (one open + 5 inert). Playwright's
strict mode threw `Error: strict mode violation: resolved to 6 elements` on assertions like
`.not.toBeVisible()`.

**Pattern:** Two strategies:

1. Use the **open modifier class** as a discriminator: `.ui-lib-drawer__panel--open` (only the
   open one has the `--open` BEM modifier, guaranteed by the component's CSS class binding).
2. Resolve the specific instance via `aria-controls` / the panel's `id`:
   ```ts
   const panelId = await trigger.getAttribute('aria-controls');
   const panel = page.locator(`[id="${panelId}"]`);
   ```

---

### 2-G · `element.press()` is not always equivalent to keyboard events through Angular

**Context:** Pressing keys on Angular components' internal focusable elements (e.g. a
`div[role="slider"][tabindex="0"]` rendered inside `ui-lib-slider`).

**Finding (2026-06-01):** Some components attach their `(keydown)` handler to an element whose
`tabindex` puts it in the focus order, but `element.press()` fires the event without the normal
browser focus state context. In practice, for sliders and similar, the reactive wait pattern
(Finding 2-B) combined with confirming focus first was the reliable path:

```ts
await slider.press('ArrowLeft');
// Wait for the value to change reactively — don't assume sync
await expect(slider).not.toHaveAttribute('aria-valuenow', String(startValue));
```

---

### 2-H · A CI job gated by `if: false` runs _nothing_ — the commands inside are inert

**Context:** Auditing what actually gates PRs vs. what merely exists in a workflow file.

**Finding (2026-06-01):** `accessibility.yml` had a fully-written `e2e-a11y-tests` job —
install, build, `npx playwright test` — guarded by `if: false` with a "re-enable later" comment.
So **no** Playwright a11y test had run in CI for a long time. Worse: the gating job's command was
later "improved" to run the full suite, but that edit was inert because the whole job was still
`if: false`. A suite that does not run cannot rot loudly — it rots silently.

**Pattern:** When verifying coverage, grep workflows for `if: false`, `continue-on-error`, and
which spec files are actually named in `run:` steps. "We have an e2e a11y suite" ≠ "it gates PRs".
Re-enabling such a job is the single highest-leverage change you can make. **Reference:** PR #284.

---

### 2-I · Don't trust truncated or piped test output — confirm the exit code

**Context:** Reading background/long test output that was piped through `| tail`, `| grep`, etc.

**Finding (2026-06-01):** Two costly misreads this session:

1. `npx playwright test ... | tail -30` reported the run as "exit 0" — but `tail`'s exit code
   masked Playwright's failure. The Dialog test had actually **failed**; the pipe hid it.
2. The full-route sweep was reported as "passed locally (74)" from a truncated tail; in reality
   those routes **failed locally too** — the violations were real, not a CI-only fluke. Chasing a
   non-existent "CI vs local" discrepancy wasted effort.

**Pattern:** For pass/fail truth, read the summary line (`N passed / M failed`) and the **process
exit code** of the test runner itself, not of a downstream pipe. When in doubt, re-run the single
failing spec unpiped. Playwright's `error-context.md` (2-D) shows the real per-test verdict.

---

## 3. Testing — Unit (Jest / jest-axe)

---

### 3-A · `@defer (on immediate)` requires `await fixture.whenStable()` before the panel exists

**Context:** Unit tests for any component that uses `@defer (on immediate)` to lazily render
its overlay panel (Select, AutoComplete, DatePicker, CascadeSelect, etc.).

**Finding (see LIBRARY_CONVENTIONS.md → "Testing Overlay / Deferred Panels"):**
`@defer (on immediate)` resolves on a microtask. `detectChanges()` alone does not flush it.
Without `await fixture.whenStable()` the deferred panel view does not exist when the first
`it` block runs, causing all panel-related assertions to fail with "element not found".

**Pattern:**

```ts
beforeEach(async () => {
  fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  await fixture.whenStable(); // ← flushes the @defer microtask
});
```

**Reference:** `LIBRARY_CONVENTIONS.md → Testing Overlay / Deferred Panels — Required Patterns`.

---

### 3-B · `WritableSignal` host properties must be used instead of plain class properties for OnPush component tests

**Context:** Test host components with `ChangeDetectionStrategy.OnPush` that need to mutate
state after `whenStable()`.

**Finding (LIBRARY_CONVENTIONS.md):** After `await fixture.whenStable()` settles Angular's CD
scheduler, plain property mutations (`host.value = 'new'`) do NOT trigger `detectChanges()` on
OnPush components. The mutation is invisible to the template. Signals do work:

```ts
// ✗ Silent failure — OnPush host doesn't re-render after whenStable()
host.inputValue = 'new value';
fixture.detectChanges();

// ✅ Signal mutation is always detected
host.inputValue = signal('');
// ...
host.inputValue.set('new value');
fixture.detectChanges();
```

---

### 3-C · `fixture.detectChanges()` masks async render errors — some CD bugs are e2e-only

**Context:** Deciding whether unit tests are sufficient for change-detection / render bugs.

**Finding (2026-06-01):** The dialog NG0203 bug (1-E) had **6,000+ passing unit tests** and was
still completely broken in real apps. Unit specs call `fixture.detectChanges()`, which forces a
**synchronous** CD pass; the error thrown from `afterNextRender` happened on a later async tick
that the forced pass never reached, so specs saw a rendered panel and passed. In a real browser
(and in the Playwright e2e), the async tick runs, throws, and the panel never appears.

**Pattern:** Bugs in `afterNextRender` / async effects / scheduler-dependent rendering will **not**
be caught by jsdom unit tests that drive CD manually. Keep at least one real-browser e2e per
interactive widget (open/close, focus trap) — that suite is what caught this. Don't treat a green
unit suite as proof a component works.

---

### 3-D · jest-axe (jsdom) is blind to layout-dependent rules — the real-browser sweep is not optional

**Context:** Choosing where to run axe.

**Finding (2026-06-01):** jsdom has no layout engine, so `jest-axe` cannot evaluate
`color-contrast`, `scrollable-region-focusable` (needs real overflow), or anything geometry-based.
Many real violations (unlabelled inputs, scrollable code blocks, `aria-hidden` focusable content)
only surfaced in the Playwright `a11y-full-sweep` against `ng serve`. The full-route sweep took the
count from a green-looking jsdom suite to **50 real failing routes**.

**Pattern:** Treat jest-axe as a structural smoke test and the Playwright route sweep as the real
gate. Both layers are needed; neither replaces the other.

---

### 3-E · The pre-push typecheck is stricter than Jest's transform (`noUncheckedIndexedAccess`)

**Context:** Writing new specs that pass `npx jest` but fail `git push`.

**Finding (2026-06-01):** `tsconfig.spec.json` enables `noUncheckedIndexedAccess`, but `jest`'s
ts transform does not enforce it. So `arr[0].focus()` and `signal()[i]` pass under Jest yet fail
the Husky **pre-push** `npm run typecheck` with `TS2532: Object is possibly 'undefined'`. Easy to
discover only at push time after the spec "passed".

**Pattern:** For indexed access in specs, route through a tiny assertion helper:

```ts
function at<T>(arr: readonly T[], i: number): T {
  const v = arr[i];
  if (v === undefined) throw new Error(`No element at index ${i}`);
  return v;
}
at(links, 0).focus(); // instead of links[0].focus()
```

Also: `fixture.nativeElement` is `any` — cast `(fixture.nativeElement as HTMLElement)` before
`querySelector`, and use `globalThis` (not the Node-only `global`) for `jest.spyOn(globalThis, …)`.

---

### 3-F · Wire a coverage ratchet into CI, not just a `coverage:summary` script

**Context:** Preventing coverage regressions.

**Finding (2026-06-01):** A `coverage:summary --threshold 90` npm script existed but was wired into
nothing — CI ran bare `npm test` with no floor, so coverage could fall freely. Branch coverage sat
at ~70%.

**Pattern:** Put a `coverageThreshold` block in `jest.config.ts` set **just below** the current
measured values (a ratchet — raise over time, never lower), and switch the CI test job to
`npm run test:coverage` so the threshold actually fails the build. Branches are usually the weakest
metric; target those first.

---

## 4. Accessibility — ARIA Patterns & Violations

---

### 4-A · `aria-expanded` is NOT a valid attribute on `role="option"`

**Context:** Any component that uses `role="option"` for items that open a sub-list or panel
(e.g. CascadeSelect, multi-level listboxes).

**Finding (2026-06-01):** axe-core `aria-allowed-attr` (WCAG 4.1.2, critical) flags
`aria-expanded` on `role="option"` as invalid. The WAI-ARIA spec does not list `aria-expanded`
in the supported state set for `option`. It was being used to indicate whether a sub-panel was
open, but `aria-haspopup="listbox"` already communicates the presence of a sub-list. The
`aria-expanded` value is redundant and invalid.

**Fix:** Remove `aria-expanded` from `role="option"` elements. Use only `aria-haspopup`:

```html
<!-- ✗ Invalid — aria-expanded not in role="option" supported attributes -->
<li
  role="option"
  [attr.aria-haspopup]="hasChildren ? 'listbox' : null"
  [attr.aria-expanded]="hasChildren ? isOpen : null"
>
  <!-- ✅ Valid — aria-haspopup communicates sub-list presence; that's sufficient -->
</li>

<li role="option" [attr.aria-haspopup]="hasChildren ? 'listbox' : null"></li>
```

**Reference:** `cascade-select.html` fix 2026-06-01; axe rule `aria-allowed-attr`.

---

### 4-B · Scope axe to the component under test, not the entire page

**Context:** Demo pages that mix many components — axe scanning the full page may flag
violations in unrelated components or in non-minimal demo usage.

**Finding (2026-06-01):** Running `new AxeBuilder({ page }).analyze()` on a full demo page
flagged unlabelled inputs in OTHER demo sections, making it look like the component under test
had issues. Using `.include('ui-lib-select')` isolates the scan to exactly what you're testing.

**Pattern:**

```ts
// ✗ Scans the whole page — any unlabelled input anywhere fails your test
const results = await new AxeBuilder({ page }).analyze();

// ✅ Scopes to the component's subtree only
const results = await new AxeBuilder({ page })
  .include('ui-lib-select') // host element
  // OR for popup panels:
  .include('.ui-lib-select__panel') // the open panel specifically
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  .disableRules(['color-contrast', 'aria-required-children'])
  .analyze();
```

---

### 4-C · The full-sweep covers resting state; interaction tests cover open/active state

**Context:** Deciding how much axe e2e coverage to write for a component.

**Finding (2026-06-01):** `a11y-full-sweep.spec.ts` navigates to every demo route and runs
axe before any interaction. This catches structural violations (missing landmark roles,
improper heading levels, unlabelled regions) but misses ~90% of real ARIA bugs, which only
appear in the **active state**:

| State              | What axe finds there                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Resting            | `role` / `aria-label` structure, landmark roles, heading levels                                |
| Open panel         | `aria-activedescendant` on open listbox, `role=option` violations, `aria-expanded` correctness |
| Keyboard-navigated | Roving tabindex, focus order, `aria-selected` / `aria-checked` updates                         |
| Modal open         | `aria-modal`, focus trap, `role=dialog`, `aria-labelledby`                                     |

**Pattern:** Add a test in `a11y-interactions.spec.ts` for any widget where:

- The component has an open/expanded state (dropdowns, dialogs, drawers, menus)
- The component manages focus (trees, grids, menus with roving tabindex)
- The component changes ARIA attributes dynamically (sliders, tabs, checkboxes)

---

### 4-D · `aria-required-children` false-positive for `role="menu"` + `role="none"` wrappers

**Context:** axe-core scanning menu components that wrap `role="menuitem"` in `<li>` elements.

**Finding (2026-06-01):** axe flags `aria-required-children` when `role="menu"` has immediate
children of `role="none"` wrapping `role="menuitem"`. Per WAI-ARIA, `role="none"` is a
_presentation_ role that is transparent to the accessibility tree — the `role="menuitem"` is
the effective child of the menu. axe's algorithm checks immediate DOM children, not the
effective ARIA tree.

**Pattern:** Disable this rule in the e2e sweep (it is a false positive for this pattern):

```ts
const GLOBAL_DISABLED: readonly string[] = [
  'color-contrast', // intentionally deferred
  'aria-required-children', // false positive: role=none li wrapper is transparent per WAI-ARIA
] as const;
```

Do NOT disable it in jest-axe unit tests — they render without the `<li>` wrapper and the rule
is valid there.

---

### 4-E · Widget-role components must have an accessible name — give them a localized default

**Context:** Components whose host/input carries a widget role that _requires_ a name —
`combobox` (date-picker, autocomplete, cascade-select, tree-select, select), `spinbutton`
(input-number), `textbox` (editor), `listbox` (order-list), masked text inputs (input-mask).

**Finding (2026-06-01):** axe `aria-input-field-name` / `label` fires on every instance with no
`ariaLabel`/`ariaLabelledBy`. Demos had **20+ unlabelled instances each** (date-picker ×21,
input-number ×22) — labelling every instance is impractical, and these widgets must be named.

**Solution / Pattern:** Provide a component-level **fallback** name, consistent across widgets:

```ts
// template / host binding — explicit ariaLabel wins; aria-labelledby suppresses the default
[attr.aria - label] =
  "ariaLabel() || (ariaLabelledBy() ? null : i18n.translate('<comp>.input.label'))";
```

Order matters: `ariaLabel() ||` first so a consumer's label always wins; `ariaLabelledBy() ?
null` second so an external label isn't shadowed by a redundant `aria-label`. Add the key to **all**
locales (`en/de/es/fr`). Note this overrides a _wrapping_ `<label>` — fine for standalone widgets,
but for inputs commonly wrapped in `<label>`, weigh it. **Reference:** PR #295.

---

### 4-F · `aria-hidden` + a focusable descendant = `aria-hidden-focus`; reach for `inert`

**Context:** Hidden/collapsed panels and overlays kept in the DOM (drawer, bottom-sheet,
panel-menu, the StyleClass directive, focus-trap sentinels).

**Finding (2026-06-01):** Setting `aria-hidden="true"` on a container that still has focusable
controls inside violates WCAG 4.1.2 — a keyboard user can Tab into an "invisible" subtree.

**Solution / Pattern:**

- For hidden **panels**: add `inert` alongside `aria-hidden` (inert removes the subtree from tab
  order _and_ the a11y tree). Drawer/bottom-sheet/panel-menu now bind `[attr.inert]` to the
  closed state. Skip targets that _contain_ their own trigger (you'd inert the trigger).
- For a focusable element that should not be announced (focus-trap **sentinels**): just **drop
  `aria-hidden`** — an empty 1px span has nothing to announce. Do **not** add `role="none"` to fix
  it: a presentational role on a focusable element triggers `presentation-role-conflict`.

---

### 4-G · `aria-label` is _prohibited_ on a roleless element (generic `<span>`, custom host)

**Context:** Icon-bearing non-interactive elements (dock static items, etc.) and custom-element
hosts that carry `aria-label` without a role.

**Finding (2026-06-01):** axe `aria-prohibited-attr` flags `aria-label` on an element with no
(implicit) role — e.g. a `<span aria-label="…">` or a roleless `<ui-lib-chip aria-label="…">`.

**Solution / Pattern:** Either give it a role that supports a name (`role="img"` for a labelled
icon), or **drop `aria-label` and rely on visible text content** for the name. Corollary: only
emit a host `aria-label` when the host actually has a role (e.g. chip emits `aria-label` only when
`selectable`/`removable` give it `option`/`group`).

---

### 4-H · `aria-valuetext` is only valid on range widgets — never on a plain text input

**Context:** Inputs that tried to announce their value via `aria-valuetext` (input-mask).

**Finding (2026-06-01):** `aria-valuetext` is supported only on `slider`, `spinbutton`,
`scrollbar`, `separator`, `progressbar`. On a plain `<input type="text">` it triggers axe
`aria-allowed-attr`. input-mask bound it to announce typed characters — invalid, and unnecessary
(the input's own `value` is already announced). Removing it fixed the violation.

**Pattern:** Before adding any `aria-value*` attribute, confirm the element's role is a range
widget. (Also seen: `placeholder="undefined"` from binding an `undefined` signal to the
`[placeholder]` _property_; use `[attr.placeholder]="x() ?? null"` so it's omitted when empty.)

---

### 4-I · `scrollable-region-focusable` — a scrollable element must be keyboard-reachable, even when disabled

**Context:** Any element with `overflow`/`max-height` that scrolls: code blocks, list containers,
demo scroll panels.

**Finding (2026-06-01):** axe `scrollable-region-focusable` (WCAG 2.1.1) fires when a scrollable
element is not keyboard-focusable, so keyboard users cannot scroll it. It hit the code-snippet
body on ~27 routes, and a **disabled** listbox (which had `tabindex="-1"`).

**Solution / Pattern:** Give the scrollable container `tabindex="0"`. For a disabled control, keep
it focusable anyway (its keydown handler should already no-op when disabled, and `aria-disabled`
conveys the state) — disabled content still needs to be keyboard-scrollable. One `tabindex` on a
shared component (code-snippet) cleared the whole class across all routes.

---

## 5. Demo App Patterns

---

### 5-A · All overlay open/close state must use `WritableSignal`, not plain booleans

> **⚠️ Reason corrected by 1-E.** Keep this as a signals-first style rule, but its stated
> justification (CD not propagating to the child) is the superseded dialog misdiagnosis. The
> actual dialog bug was an `afterNextRender` injection-context error.

**Context:** Demo components that control `[(visible)]` or `[(open)]` on overlay components.

**Finding (2026-06-01):** Plain boolean properties (`public visible: boolean = false`) do not
reliably propagate to child component inputs in a zoneless + OnPush environment, especially
when the mutation is triggered from outside Angular's normal event system (e2e tests,
programmatic opens). See Signal Finding 1-A for the root cause.

**Rule for all demo pages:**

```ts
// ✅ All dialog/drawer/overlay visibility state in demos
public readonly basicVisible: WritableSignal<boolean> = signal(false);
public readonly customVisible: WritableSignal<boolean> = signal(false);
// ... etc.
```

```html
<!-- ✅ Always use explicit binding form for WritableSignal overlay state -->
<ui-lib-dialog [visible]="basicVisible()" (visibleChange)="basicVisible.set($event)" />
```

This also makes the demo more self-consistent with the library's signals-first philosophy.

---

### 5-B · Add `aria-controls` + `[attr.aria-expanded]` to every demo trigger button

**Context:** Demo buttons that open overlays.

**Finding (2026-06-01):** `aria-controls` on the trigger button:

1. Is semantically correct (associates the button with the panel it controls)
2. Provides a unique, stable selector for e2e tests (`[aria-controls="dialog-basic-content"]`)
3. Makes the demo itself more accessible (screen readers can navigate from trigger to panel)

`[attr.aria-expanded]="visible()"` turns the signal's boolean into a live ARIA attribute that
also doubles as an easy "CD ran" proxy in e2e tests (see Signal Finding 1-C).

**Pattern:**

```html
<ui-lib-button
  (click)="panelVisible.set(true)"
  [attr.aria-expanded]="panelVisible()"
  aria-controls="my-component-panel-content"
>
  Open Panel
</ui-lib-button>
```

---

### 5-C · `<ui-lib-button label="X" />` rendered _empty_ — content components silently ignore unknown attributes

**Context:** Buttons (and any component that takes **projected content**) written self-closing
with a made-up text attribute.

**Finding (2026-06-01):** `ui-lib-button` renders its text from `<ng-content />`, not a `label`
input. **52 demo buttons** across the toast + template pages used `<ui-lib-button label="Success" />`
(self-closing). Angular silently ignores the unknown `label` attribute, so they rendered with an
empty content span — **no visible text and no accessible name** (axe `button-name`). This was a
real, visible product gap hiding behind a "works" assumption.

**Solution / Pattern:** Two lessons:

1. Components that rely on `<ng-content />` should consider also accepting a `label` input (render
   `@if (label()) { {{ label() }} }` after the content) so the natural `label="…"` usage isn't a
   silent no-op. This is what fixed it.
2. When a button/chip/etc. looks empty in a demo, suspect an ignored attribute — projected-content
   components don't warn about unknown attributes.

---

### 5-D · StyleClass: hiding a target that _contains_ the trigger hides the trigger itself

**Context:** `[uiLibStyleClass]="'@parent'"` or any selector resolving to an ancestor of the host.

**Finding (2026-06-01):** `StyleClass.syncAriaState` set `aria-hidden`/`inert` on its target. When
the target is the trigger's own parent/ancestor, the trigger ends up inside an aria-hidden (and,
after the inert fix, inert) subtree — it can't be focused or clicked. The `@parent` demo example
became unusable and also failed `aria-hidden-focus`.

**Pattern:** Guard hidden-state management with `target !== host && !target.contains(host)` — never
hide a container that wraps your own trigger.

---

## 6. Library Architecture

---

### 6-A · The scorecard stops discriminating when every component averages 9.0

**Context:** Quality scorecard in `docs/COMPONENT_SCORES.md`.

**Finding (2026-05-30):** When 100+ components all score 9 across 11 categories, the scorecard
can no longer surface real gaps. The ground-truth audit found:

- Paginator scored I18n **9** yet had a hardcoded `placeholder="Page"` string
- The a11y e2e gate was listed as passing (implied by the 9.0 A11y score) yet the gate was
  effectively broken (port collision)

**Pattern:** Scores should be evidence-linked, not gut-feeling:

- A11y score ≥ 9 → CI axe artifact attached and green
- I18n score ≥ 9 → `check:i18n` script exits non-zero on any hardcoded string
- Perf score ≥ 9 → bundle delta within budget from `bundlesize:check`

Until the scoring criteria are machine-enforced, treat the numbers as _directional_, not
verified. The ground-truth audit method (run all gates, read real output) is more reliable
than the scorecard for determining readiness.

---

### 6-B · `reuseExistingServer` is a local-dev footgun — always use a dedicated port in e2e

**Context:** Any project running `ng serve` for multiple apps simultaneously (library demo,
operator dashboard, other projects).

**Finding (2026-05-30):** See 2-A for the full story. The corollary architectural rule:
every project that has e2e tests should own a specific port that NOTHING ELSE uses. Document
that port as a constant in `playwright.config.ts` and in the project README. Using `:4321`
for the library demo leaves `:4200` free for other dev servers.

---

### 6-C · Gate the _reliable_ a11y suites; run environment-sensitive ones with `continue-on-error` until fixed

**Context:** Bringing a large e2e a11y suite into CI when some of it is green and some is flaky/red.

**Finding (2026-06-01):** The full route sweep was 50 routes red on its first real CI run. Reverting
to "off" loses all gating; gating everything makes CI permanently red. The pragmatic path is to
**split the step**: gate the suites proven green (`a11y.spec`, `a11y-interactions` — the latter
guards the dialog regression), and run the still-red ones with `continue-on-error: true` so they
stay _visible_ (artifact uploaded) without blocking. As each suite is fixed, move it into the
gating step. The full-route sweep is now gated (0 failing routes); `overlay-mounting` (headless-
layout-sensitive clipping checks) remains the lone non-blocking step. **Reference:** PRs #284, #295.

---

### 6-D · A default accessible-name fallback is a library convention for name-required widgets

**Context:** Designing name-bearing components (see 4-E for the runtime pattern).

**Finding (2026-06-01):** Requiring every consumer to label every combobox/spinbutton/listbox is
impractical and they regress to unnamed. The library convention is: a component that renders a
widget role MUST guarantee a name, via the `ariaLabel() || (ariaLabelledBy() ? null :
i18n.translate('<comp>.input.label'))` fallback, with the default string added to every locale
bundle (`en/de/es/fr`). Mirrors the pre-existing precedent (progress-bar defaults to "Loading"
when indeterminate). New name-required components should follow this from the start.

---

## 7. i18n & Docs Tooling

---

### 7-A · Counting translation keys with `grep -c "': '"` undercounts double-quoted values

**Context:** Auditing the four locale bundles (`en/de/es/fr.ts`) for key drift.

**Finding (2026-06-02):** `grep -c "': '"` reported en=322, de=321, es=322, **fr=299** — which
*looks* like French is missing ~23 keys. It is not. All four bundles have an **identical 323-key
set**. The pattern `': '` (quote-colon-space-quote) only matches a key whose value is **single**-
quoted; French has 22 values that use **double** quotes to embed an apostrophe (`'global.error':
"Une erreur s'est produite"`), so those lines read `": "` and are skipped. **Count keys by the key
pattern, not the colon:** `grep -oE "^\s*'[^']+':"` (or just run the parity spec). A `grep -c`
across mixed quoting silently lies about coverage. **Reference:** `i18n.bundles.spec.ts`.

---

### 7-B · Deriving a key union with `as const` forces an ESLint `typedef` disable

**Context:** Making i18n keys type-safe — `UiLibTranslationKey = keyof typeof UI_LIB_EN`.

**Finding (2026-06-02):** For `keyof typeof X` to yield the literal key union, `X` must be declared
`as const` with **no type annotation** — an annotation (`: Record<string,string>`) widens the keys
back to `string` and erases the union. But the repo's `@typescript-eslint/typedef` rule *requires*
an annotation on every exported `const`. These are mutually exclusive, so the canonical bundle gets
one scoped `// eslint-disable-next-line @typescript-eslint/typedef` with a rationale comment. Use
`as const satisfies Record<string, string>` to keep value-type checking without losing the keys.
The complete bundle type (`Record<UiLibTranslationKey, string>`) then makes a missing key in any
other locale a **compile error**, and `translate(key: UiLibTranslationKey | (string & {}))` gives
autocomplete on known keys while still accepting consumer-registered custom keys.

---

### 7-C · A Markdown-table generator must run its own output through Prettier

**Context:** `scripts/generate-i18n-catalogue.mjs` writes a GFM table between markers in a doc.

**Finding (2026-06-02):** A generator that emits a raw, unpadded Markdown table will *never* agree
with the file on disk once `lint-staged`/Prettier runs, because Prettier re-aligns table columns to
equal width. The `--check` (CI staleness) mode then always reports "stale". Fix: have the generator
`import { format, resolveConfig } from 'prettier'` and pipe its spliced output through
`format(..., { parser: 'markdown' })` **before** writing or comparing. Then write and `--check`
both operate on the canonical Prettier form and are idempotent. Same applies to any committed
generated `.md`. **Reference:** `npm run docs:i18n` / `docs:i18n:check`.

---

_Last updated: 2026-06-02 — added category 7 (i18n & docs tooling): key-count grep artifact (7-A),
`as const` vs `typedef` for key unions (7-B), Prettier-aware Markdown generators (7-C). Earlier
2026-06-02 additions: dialog NG0203 root-cause correction (1-E), unit-vs-e2e
coverage limits (3-C/3-D), strict pre-push typecheck (3-E), coverage ratchet (3-F), the full ARIA
violation set from the route-sweep remediation (4-E…4-I, 5-C/5-D), and the CI a11y gating strategy
(2-H, 6-C/6-D). Sources: PRs #284, #285, #286, #295 (sweep 50→0 routes)._
