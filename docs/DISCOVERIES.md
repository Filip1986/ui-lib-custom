# Engineering Discoveries

> A living record of non-obvious findings, blocked situations and how they were resolved,
> improved patterns, and anything that will help future sessions write better code and make
> better decisions faster.
>
> **How to use this document:**
> - Read the relevant category before starting work in that area.
> - Add a new entry whenever you unblock something tricky, find a better pattern, or catch
>   a class of bug that could recur. Keep entries concise and actionable.
> - Each entry has: **Context** (when does this apply?), **Finding** (what happened?),
>   **Solution / Pattern** (what to do instead), and optionally a **Reference**.
>
> **Do NOT put stable architectural rules here** — those go in `LIBRARY_CONVENTIONS.md`.
> This document is for *discoveries* — things that surprised us or took effort to figure out.

---

## Categories

1. [Angular Signals & Change Detection](#1-angular-signals--change-detection)
2. [Testing — E2E (Playwright + axe-core)](#2-testing--e2e-playwright--axe-core)
3. [Testing — Unit (Jest / jest-axe)](#3-testing--unit-jest--jest-axe)
4. [Accessibility — ARIA Patterns & Violations](#4-accessibility--aria-patterns--violations)
5. [Demo App Patterns](#5-demo-app-patterns)
6. [Library Architecture](#6-library-architecture)

---

## 1. Angular Signals & Change Detection

---

### 1-A · Plain boolean properties do not reliably trigger CD in zoneless + OnPush

**Context:** Demo components (or any `ChangeDetectionStrategy.OnPush` component) that hold
overlay open/close state as a plain `boolean` property.

**Finding (2026-06-01):** In a zoneless Angular app, a template event handler like
`(click)="basicVisible = true"` does trigger CD for the *event-binding component* (the demo
component re-renders and its `[attr.aria-expanded]="basicVisible"` updates). BUT the *child
component* bound via `[visible]="basicVisible"` may not reliably receive its `setInput()` call
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
<ui-lib-dialog
  [visible]="basicVisible()"
  (visibleChange)="basicVisible.set($event)"
/>

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
await page.evaluate(() => { comp.open.set(true); });

// Wait for a cheap attribute bound to the same signal to confirm CD ran.
// This is a reactive wait — no arbitrary sleeps needed.
await expect(page.locator('[aria-controls="my-panel"]'))
  .toHaveAttribute('aria-expanded', 'true');

// NOW the heavy waitForSelector is reliable
await page.waitForSelector('.my-dynamic-panel');
```

---

### 1-D · `ng.getComponent()` requires the routed component to already be in the DOM

**Context:** E2E tests that navigate to a lazily-loaded route and then use
`ng.getComponent(document.querySelector('app-some-demo'))`.

**Finding (2026-06-01):** `waitForFunction(() => typeof window.ng !== 'undefined')` fires on
Angular app *bootstrap*, which happens before the router finishes rendering the lazily-loaded
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
    reuseExistingServer: false,  // ← never reuse; always own the server
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
currently has keyboard focus in the *page*. In parallel test execution, Angular's reactive re-renders
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
*consumer usage* gap, not a component bug. But it pollutes the panel-ARIA test with noise.

The panel itself — the actual overlay content with listboxes, grids, menus — IS owned by the
component and must be clean.

**Solution / Pattern:**
```ts
// ✗ Includes trigger (which has no label in demo — consumer's responsibility)
await assertAxeClean(page, 'ui-lib-cascade-select');

// ✅ Tests only the open panel — the component's owned ARIA territory
await assertAxeClean(page, '.ui-lib-cascade-select__panel');
```
Add a code comment explaining *why* you scope to the panel, so future editors don't "fix" it
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
<li role="option"
    [attr.aria-haspopup]="hasChildren ? 'listbox' : null"
    [attr.aria-expanded]="hasChildren ? isOpen : null">

<!-- ✅ Valid — aria-haspopup communicates sub-list presence; that's sufficient -->
<li role="option"
    [attr.aria-haspopup]="hasChildren ? 'listbox' : null">
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
  .include('ui-lib-select')           // host element
  // OR for popup panels:
  .include('.ui-lib-select__panel')   // the open panel specifically
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

| State | What axe finds there |
|-------|----------------------|
| Resting | `role` / `aria-label` structure, landmark roles, heading levels |
| Open panel | `aria-activedescendant` on open listbox, `role=option` violations, `aria-expanded` correctness |
| Keyboard-navigated | Roving tabindex, focus order, `aria-selected` / `aria-checked` updates |
| Modal open | `aria-modal`, focus trap, `role=dialog`, `aria-labelledby` |

**Pattern:** Add a test in `a11y-interactions.spec.ts` for any widget where:
- The component has an open/expanded state (dropdowns, dialogs, drawers, menus)
- The component manages focus (trees, grids, menus with roving tabindex)
- The component changes ARIA attributes dynamically (sliders, tabs, checkboxes)

---

### 4-D · `aria-required-children` false-positive for `role="menu"` + `role="none"` wrappers

**Context:** axe-core scanning menu components that wrap `role="menuitem"` in `<li>` elements.

**Finding (2026-06-01):** axe flags `aria-required-children` when `role="menu"` has immediate
children of `role="none"` wrapping `role="menuitem"`. Per WAI-ARIA, `role="none"` is a
*presentation* role that is transparent to the accessibility tree — the `role="menuitem"` is
the effective child of the menu. axe's algorithm checks immediate DOM children, not the
effective ARIA tree.

**Pattern:** Disable this rule in the e2e sweep (it is a false positive for this pattern):
```ts
const GLOBAL_DISABLED: readonly string[] = [
  'color-contrast',         // intentionally deferred
  'aria-required-children', // false positive: role=none li wrapper is transparent per WAI-ARIA
] as const;
```
Do NOT disable it in jest-axe unit tests — they render without the `<li>` wrapper and the rule
is valid there.

---

## 5. Demo App Patterns

---

### 5-A · All overlay open/close state must use `WritableSignal`, not plain booleans

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
<ui-lib-dialog
  [visible]="basicVisible()"
  (visibleChange)="basicVisible.set($event)"
/>
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

Until the scoring criteria are machine-enforced, treat the numbers as *directional*, not
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

*Last updated: 2026-06-01 — populated from ground-truth audit and interaction-state e2e sessions.*
