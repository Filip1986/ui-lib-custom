# Menubar — 6-Phase Hardening Prompt

> **Generated:** 2026-05-10
> **Tier:** 2 — Navigation & Menu Patterns (#11 in hardening queue)
> **Component type:** Two-file component (`Menubar` + internal `MenubarSubComponent`)
> **Based on lessons from:** Dialog, Select, AutoComplete, DynamicDialog, Drawer, ConfirmDialog,
> ConfirmPopup, Popover, Tooltip, Toast hardenings
>
> Run Phase 3 first (priority — Elite Accessibility is the current wow factor),
> then continue Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

Read **all** of the following in one pass before writing a single line of code:

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, code quality checklist
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — Menubar is Tier 2, #11, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/menubar/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/menubar/menubar.ts`
- `projects/ui-lib-custom/src/lib/menubar/menubar.html`
- `projects/ui-lib-custom/src/lib/menubar/menubar.scss`
- `projects/ui-lib-custom/src/lib/menubar/menubar.spec.ts`
- `projects/ui-lib-custom/src/lib/menubar/menubar-submenu.ts`
- `projects/ui-lib-custom/src/lib/menubar/menubar-submenu.html`
- `projects/ui-lib-custom/src/lib/menubar/menubar-submenu.scss`
- `projects/ui-lib-custom/src/lib/menubar/menubar.types.ts`

Also read these hardened siblings for established patterns:
- `projects/ui-lib-custom/src/lib/toast/toast.a11y.spec.ts` (most recent a11y spec — typed query helpers pattern)
- `projects/ui-lib-custom/src/lib/tooltip/tooltip.a11y.spec.ts` (directive-as-host pattern reference)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes. These must remain intact:

- `<nav>` landmark with `[attr.aria-label]="ariaLabel()"` ✅
- `ariaLabel` input defaults to `'Navigation'` (exported as `MENUBAR_DEFAULT_ARIA_LABEL`) ✅
- `role="menubar"` on the root `<ul>` ✅
- `role="none"` on `<li>` wrapper elements (correct — the `<a>` carries the role) ✅
- `role="menuitem"` on all `<a>` elements in both root and submenu ✅
- `role="menu"` on submenu `<ul>` ✅
- `aria-orientation="vertical"` on submenu `<ul>` ✅
- `[attr.aria-haspopup]="item.items?.length ? 'menu' : null"` on parent items ✅
- `[attr.aria-expanded]` bound to open state on parent items ✅
- `[attr.aria-disabled]="item.disabled ? 'true' : null"` on links ✅
- `[attr.tabindex]="item.disabled ? '-1' : '0'"` on links ✅
- `role="separator"` + `aria-hidden="true"` on separator `<li>` elements ✅
- `aria-hidden="true"` on icon `<span>` elements in both root and submenu ✅
- `aria-hidden="true"` on caret `<span>` elements ✅
- `aria-hidden="true"` on hamburger toggle bar `<span>` elements ✅
- `[attr.aria-expanded]` on the hamburger toggle button ✅
- `aria-controls="ui-menubar-root-list"` on the hamburger toggle button ✅
- `aria-label="Toggle navigation menu"` on the hamburger toggle button ✅
- `id="ui-menubar-root-list"` on the root `<ul>` ✅
- `DOCUMENT` injected as `documentRef` (SSR-safe) ✅
- `ngOnDestroy` removes global listeners ✅
- `afterNextRender` used to focus first panel item after render ✅
- Arrow-key navigation: `ArrowDown` opens panel + focuses first item (root) ✅
- Arrow-key navigation: `ArrowDown`/`ArrowUp` cycle within a submenu ✅
- Arrow-key navigation: `ArrowRight` opens nested sub-panel ✅
- Arrow-key navigation: `ArrowLeft`/`Escape` closes nested sub-panel ✅
- `Enter`/`Space` toggles open state or invokes command ✅
- `Escape` at root level closes the open panel ✅
- Click-outside handler closes the open panel ✅
- `visibleItems()` computed signal filters `visible !== false` items ✅
- `:focus-visible` ring on root and sub links ✅
- `prefers-reduced-motion` — **NOT present yet** (see Phase 3 / Phase 6) ⚠️

---

## Step 3 — Your task: the 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

---

#### Issue 1 — `aria-controls` on hamburger toggle references a static `id` (MODERATE)

**Root cause:** The hamburger toggle button has:
```html
aria-controls="ui-menubar-root-list"
```
And the root `<ul>` has:
```html
id="ui-menubar-root-list"
```
This is a static, hardcoded ID. When two `<ui-lib-menubar>` components appear on the same
page (e.g. a main nav and a secondary breadcrumb-style nav), both will have the same ID
`ui-menubar-root-list`, which is invalid HTML (duplicate IDs break ARIA `aria-controls`
references — the browser and AT can only resolve to the first match).

**Fix:** Generate a unique instance ID using the same module-level counter pattern established
in Popover, ConfirmPopup, ConfirmDialog, Drawer, and DynamicDialog:

In `menubar.ts`:
```typescript
/** Auto-incrementing counter to generate unique IDs for each Menubar instance. */
let nextMenubarId: number = 0;
```

Inside the `Menubar` class:
```typescript
/** Unique ID for this Menubar instance — used to link the toggle button to the root list. */
public readonly menubarId: string = `uilib-menubar-${++nextMenubarId}`;

/** ID of the root list element — used for aria-controls on the toggle button. */
public readonly rootListId: string = `${this.menubarId}-root-list`;
```

In `menubar.html`, update the toggle button:
```html
[attr.aria-controls]="rootListId"
```

And the root `<ul>`:
```html
[attr.id]="rootListId"
```

Remove the static `id="ui-menubar-root-list"` binding and replace with the dynamic `[attr.id]`.

---

#### Issue 2 — Arrow-key navigation at root level does NOT implement Left/Right navigation (CRITICAL)

**Root cause:** The WAI-ARIA Authoring Practices Guide for `role="menubar"` requires:
- **ArrowRight** — moves focus to the next root `role="menuitem"` (wraps from last to first)
- **ArrowLeft** — moves focus to the previous root `role="menuitem"` (wraps from first to last)
- **Home** — moves focus to the first root `role="menuitem"`
- **End** — moves focus to the last root `role="menuitem"`

Currently `onRootItemKeyDown()` handles `Enter`, `Space`, `ArrowDown`, and `Escape` but does
**not** handle `ArrowLeft`, `ArrowRight`, `Home`, or `End`. This means keyboard users cannot
navigate between top-level menu items without using `Tab`, which is incorrect for a `menubar`
pattern — `Tab` should exit the menubar, not cycle within it.

**Fix — add to `onRootItemKeyDown()` in `menubar.ts`:**

```typescript
case KEYBOARD_KEYS.ArrowRight: {
  event.preventDefault();
  this.focusRootItem(index + 1);
  break;
}
case KEYBOARD_KEYS.ArrowLeft: {
  event.preventDefault();
  this.focusRootItem(index - 1);
  break;
}
case KEYBOARD_KEYS.Home: {
  event.preventDefault();
  this.focusRootItem(0);
  break;
}
case KEYBOARD_KEYS.End: {
  event.preventDefault();
  this.focusRootItem(this.visibleItems().length - 1);
  break;
}
```

**Add a private helper to `menubar.ts`:**

```typescript
/**
 * Focuses the root-level menuitem at the given index.
 * Wraps around when the index exceeds the bounds.
 * Skips disabled items — moves to the next focusable item in the direction of travel.
 */
private focusRootItem(index: number): void {
  const items: MenubarItem[] = this.visibleItems();
  if (items.length === 0) {
    return;
  }
  // Wrap around
  const wrappedIndex: number = ((index % items.length) + items.length) % items.length;
  const links: NodeListOf<HTMLElement> =
    this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
      '.ui-lib-menubar__root-list > .ui-lib-menubar__root-item > .ui-lib-menubar__root-link'
    );
  const link: HTMLElement | undefined = Array.from(links)[wrappedIndex];
  link?.focus();
}
```

**Also verify `KEYBOARD_KEYS` includes `Home` and `End`:**
Check `projects/ui-lib-custom/src/lib/core/keyboard-keys.ts` (or wherever `KEYBOARD_KEYS` is
defined in the `core` entry point). If `Home` and `End` are missing, add them:
```typescript
Home: 'Home',
End: 'End',
```

---

#### Issue 3 — `Tab` key should exit the menubar, but `tabindex` is `0` on all root items (MODERATE)

**Root cause:** In a `role="menubar"`, the WAI-ARIA pattern specifies that **only one item in
the menubar should be in the tab sequence at a time** (roving tabindex pattern). Tab moves
focus out of the menubar entirely; arrow keys move between items.

Currently all root links have `[attr.tabindex]="item.disabled ? '-1' : '0'"`, meaning every
enabled root item is in the tab sequence. This is incorrect — pressing Tab from the first root
item should move focus to the next focusable element outside the menubar, not to the second
root item.

**Fix — implement roving tabindex on root items:**

Add a signal to track which root item currently "owns" the tab stop:
```typescript
/** Index of the root item that holds the tab stop (roving tabindex). -1 = use first item. */
public readonly rovingIndex: WritableSignal<number> = signal<number>(0);
```

Update `getRootTabIndex()` (new method):
```typescript
/**
 * Returns the tabindex for a root item link.
 * Only the currently active roving item gets tabindex="0"; all others get "-1".
 * Disabled items always get tabindex="-1".
 */
public getRootTabIndex(item: MenubarItem, index: number): string {
  if (item.disabled) {
    return '-1';
  }
  return this.rovingIndex() === index ? '0' : '-1';
}
```

Update `menubar.html` — replace the static `[attr.tabindex]` on root links:
```html
[attr.tabindex]="getRootTabIndex(item, $index)"
```

Update `focusRootItem()` to also update `rovingIndex`:
```typescript
private focusRootItem(index: number): void {
  const items: MenubarItem[] = this.visibleItems();
  if (items.length === 0) {
    return;
  }
  const wrappedIndex: number = ((index % items.length) + items.length) % items.length;
  this.rovingIndex.set(wrappedIndex);
  const links: NodeListOf<HTMLElement> =
    this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
      '.ui-lib-menubar__root-list > .ui-lib-menubar__root-item > .ui-lib-menubar__root-link'
    );
  const link: HTMLElement | undefined = Array.from(links)[wrappedIndex];
  link?.focus();
}
```

Also update `onRootItemClick` and `onRootItemKeyDown` to set `rovingIndex` when a root item
is activated (so that if the user clicks item 2, Tab later returns there):
```typescript
// At start of onRootItemClick and onRootItemKeyDown (after disabled guard):
if (!item.disabled) {
  this.rovingIndex.set(index);
}
```

> **Note on mobile:** On mobile the root list is hidden by default (CSS `display: none`) and
> shown when the hamburger is toggled. The roving tabindex applies only within the menubar
> pattern — all items can be in the tab order on mobile since the hamburger expands a vertical
> list (not a `role="menubar"` pattern). Consider whether to conditionally switch tabindex
> behavior for mobile, or accept the spec-correct behavior only for the desktop pattern.
> For simplicity, keep the roving tabindex active for all viewport sizes — the mobile
> experience is still keyboard-accessible (Enter/Space on hamburger, then Tab through items).

---

#### Issue 4 — Escape key at root level does not restore focus to the triggering element (MODERATE)

**Root cause:** When a user opens a dropdown panel using Enter/Space/ArrowDown on a root item,
then presses Escape, the panel closes but focus is left wherever the submenu last placed it
(usually on the first submenu link). The WAI-ARIA spec requires pressing Escape to:
1. Close the open submenu panel
2. Return focus to the root-level item that owned the open panel

Currently `closePanel()` sets `activeIndex(-1)` but does not return focus anywhere.

**Fix — update `closePanel()` to return focus to the triggering root item:**

```typescript
/**
 * Closes the currently open dropdown panel and returns focus to the root item
 * that triggered the panel (identified by the last known activeIndex).
 *
 * @param returnFocus - When true (default), focuses the root item at the
 *   previously active index. Pass false when closing on click-outside (focus
 *   should stay wherever the user clicked).
 */
private closePanel(returnFocus: boolean = true): void {
  const previousIndex: number = this.activeIndex();
  this.activeIndex.set(-1);
  if (returnFocus && previousIndex !== -1) {
    const links: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
        '.ui-lib-menubar__root-list > .ui-lib-menubar__root-item > .ui-lib-menubar__root-link'
      );
    const link: HTMLElement | undefined = Array.from(links)[previousIndex];
    link?.focus();
  }
}
```

Update the callers:
- `clickOutsideHandler` → `this.closePanel(false)` (click-outside: do not steal focus)
- `keydownGlobalHandler` (Escape) → `this.closePanel(true)` (keyboard Escape: return focus)
- `onRootItemKeyDown` Escape case → `this.closePanel(true)`
- `onItemActivated` → `this.closePanel(false)` (item activation: focus handled by navigation)

---

#### Issue 5 — `MenubarSubComponent`: `ArrowLeft` in a level-1 dropdown does not return focus to the parent root item (MODERATE)

**Root cause:** In `menubar-submenu.ts`, the `ArrowLeft`/`Escape` handler calls:
```typescript
this.activeIndex.set(-1);
```
This closes any open *nested* sub-panel at the current level. However, when the user is in
a **level-1** submenu (directly below the menubar bar) and presses `ArrowLeft` or `Escape`,
the correct ARIA behavior is to:
1. Close the submenu panel
2. Return focus to the parent root item in the menubar

Currently the submenu only manages its own `activeIndex` — it has no way to signal upward that
the panel should be closed and the parent item should be focused.

**Fix — add an `escapePanel` output to `MenubarSubComponent`:**

In `menubar-submenu.ts`:
```typescript
/** Emitted when the user presses Escape or ArrowLeft while at level 1, requesting the parent to close this panel. */
public readonly escapePanel: OutputEmitterRef<void> = output<void>();
```

Update the `ArrowLeft`/`Escape` case in `onItemKeyDown`:
```typescript
case KEYBOARD_KEYS.ArrowLeft:
case KEYBOARD_KEYS.Escape: {
  event.preventDefault();
  if (this.activeIndex() !== -1) {
    // Close nested sub-panel within this submenu
    this.activeIndex.set(-1);
  } else {
    // Already at the root of this sub-level — signal the parent to close
    this.escapePanel.emit();
  }
  break;
}
```

In `menubar.html`, listen to the new output:
```html
<ui-lib-menubar-sub
  [items]="item.items!"
  [level]="1"
  (itemActivated)="onItemActivated($event)"
  (escapePanel)="onSubMenuEscape($index)"
/>
```

Add to `menubar.ts`:
```typescript
/**
 * Called when the user presses Escape or ArrowLeft at the top of a submenu panel.
 * Closes the panel and returns focus to the triggering root item.
 */
public onSubMenuEscape(index: number): void {
  this.closePanel(false); // Do not auto-focus via closePanel — we focus manually
  this.rovingIndex.set(index);
  afterNextRender(
    (): void => {
      const links: NodeListOf<HTMLElement> =
        this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
          '.ui-lib-menubar__root-list > .ui-lib-menubar__root-item > .ui-lib-menubar__root-link'
        );
      const link: HTMLElement | undefined = Array.from(links)[index];
      link?.focus();
    },
    { injector: this.injector }
  );
}
```

> **Note on nested submenus:** For level > 1 submenus, `ArrowLeft`/`Escape` should close the
> current nested sub-panel and return focus to the parent sub-item that opened it — but this
> propagation is handled internally by `MenubarSubComponent`'s own `activeIndex.set(-1)`.
> The `escapePanel` output is only emitted when `this.activeIndex() === -1` (no nested panel
> is open), meaning focus needs to go further up the tree. This correctly handles both cases.

---

#### Issue 6 — Toggle button `:focus-visible` ring is missing (MODERATE)

**Root cause:** The hamburger `<button class="ui-lib-menubar__toggle">` has no `:focus-visible`
rule in the SCSS. The root and sub links both have explicit `:focus-visible` rings, but the
toggle button was missed.

**Fix — add to `menubar.scss`:**

```scss
.ui-lib-menubar__toggle {
  // ...existing styles...

  &:focus-visible {
    outline: 2px solid var(--uilib-color-primary, #007bff);
    outline-offset: 2px;
    border-radius: var(--uilib-radius-sm, 3px);
  }
}
```

---

#### Issue 7 — No `@media (prefers-reduced-motion: reduce)` for the panel appear animation (MODERATE)

**Root cause:** The panel open animation (`uilib-menubar-panel-appear`) runs `translateY(-4px)
→ translateY(0)` with the `--uilib-menubar-transition` duration. Users with
`prefers-reduced-motion: reduce` will see this animation.

**Fix — add to the end of `menubar.scss`:**

```scss
// ─── Reduced motion ────────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  .ui-lib-menubar {
    --uilib-menubar-transition: 0ms;
  }
}
```

Setting `--uilib-menubar-transition` to `0ms` disables the panel appear animation
(`animation: uilib-menubar-panel-appear var(--uilib-menubar-transition)`) and all CSS
`transition` properties that reference it, making every interaction instant.

---

#### Deliverable — `menubar.a11y.spec.ts`

**⚠️ Menubar-specific testing notes:**

1. **Two components** — `Menubar` renders `MenubarSubComponent` internally. Tests configure
   only `Menubar` in `imports` — the sub-component is imported transitively.
2. **No `provideIcons`** — unlike Toast/Tooltip, Menubar does not use `<ui-lib-icon>`.
   Icons are rendered as `<span class="icon-class" aria-hidden="true">` — no icon provider needed.
3. **`afterNextRender` in tests** — `focusFirstPanelItem()` is called inside `afterNextRender`.
   In Jest (jsdom), `afterNextRender` fires when `fixture.detectChanges()` flushes. Use:
   ```typescript
   fixture.detectChanges();
   await fixture.whenStable();
   fixture.detectChanges(); // second detectChanges ensures afterNextRender callbacks flush
   await fixture.whenStable();
   ```
4. **Focus tests** — `jsdom` does not implement the full focus model. Tests for programmatic
   `element.focus()` will work only if the element is in the document. Since `createComponent`
   does not attach to the document, call:
   ```typescript
   document.body.appendChild(fixture.nativeElement);
   ```
   in the `createFixture` helper (and clean up in `afterEach` via `fixture.destroy()`).
5. **Typed query helpers** — always cast `fixture.nativeElement as HTMLElement` before calling
   `.querySelector` / `.querySelectorAll`. Use the same `queryEl<T>` / `queryAllEl<T>` pattern
   from `toast.a11y.spec.ts`. Never use `fixture.nativeElement.querySelector` without casting.
6. **`afterEach` cleanup** — call `fixture.destroy()` after each test that appends to
   `document.body`. The component is stateless between instances (no service) so no
   additional teardown is needed.
7. **`checkA11y(fixture)`** — Menubar renders inside the fixture, not appended to `document.body`.
   Use `checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES })`.
   Do **not** skip the `region` rule — the `<nav>` element satisfies it.
8. **Keyboard events on links** — dispatch `KeyboardEvent` with `bubbles: true` on the link
   element directly. The component listens via `(keydown)` binding, not `addEventListener`.

**Host component for a11y spec:**

```typescript
@Component({
  standalone: true,
  imports: [Menubar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-menubar [model]="model()" [ariaLabel]="ariaLabel()" />`,
})
class MenubarA11yHostComponent {
  public readonly model: WritableSignal<MenubarItem[]> = signal<MenubarItem[]>(BASIC_ITEMS);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Navigation');
}
```

**Reusable test fixture:**

```typescript
const BASIC_ITEMS: MenubarItem[] = [
  { label: 'File', items: [{ label: 'New' }, { label: 'Open' }, { separator: true }, { label: 'Exit', disabled: true }] },
  { label: 'Edit', items: [{ label: 'Cut' }, { label: 'Copy' }] },
  { label: 'View' },
  { label: 'Help', url: 'https://example.com/help' },
];
```

**Setup helper:**

```typescript
async function createFixture(): Promise<{
  fixture: ComponentFixture<MenubarA11yHostComponent>;
}> {
  await TestBed.configureTestingModule({
    imports: [MenubarA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<MenubarA11yHostComponent> =
    TestBed.createComponent(MenubarA11yHostComponent);
  document.body.appendChild(fixture.nativeElement); // required for focus tests in jsdom
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture };
}
```

**Typed query helpers:**

```typescript
function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}
```

**Helper for dispatching keyboard events:**

```typescript
function dispatchKey(el: HTMLElement, key: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}
```

**Helper for opening a root item's panel:**

```typescript
async function openRootPanel(
  fixture: ComponentFixture<MenubarA11yHostComponent>,
  linkIndex: number
): Promise<void> {
  const links: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.ui-lib-menubar__root-link');
  dispatchKey(links[linkIndex] as HTMLElement, 'ArrowDown');
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}
```

**Import pattern:**

```typescript
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
```

**Spec structure (aim for 32–38 tests):**

```
describe('Menubar Accessibility')
  afterEach: fixture.destroy()

  describe('nav landmark')
    ✓ has a <nav> element with the correct aria-label
    ✓ uses the ariaLabel input to set the aria-label
    ✓ defaults to "Navigation" when ariaLabel is not set

  describe('menubar ARIA structure')
    ✓ root <ul> has role="menubar"
    ✓ root <ul> has the correct id matching the toggle aria-controls
    ✓ root <li> wrappers have role="none"
    ✓ root <a> links have role="menuitem"
    ✓ an item with subitems has aria-haspopup="menu" on its <a>
    ✓ an item with subitems has aria-expanded="false" when closed
    ✓ an item with subitems has aria-expanded="true" when open
    ✓ a leaf item does NOT have aria-haspopup attribute
    ✓ a disabled item has aria-disabled="true"
    ✓ root separator has role="separator" and aria-hidden="true"

  describe('submenu ARIA structure')
    ✓ submenu <ul> has role="menu"
    ✓ submenu <ul> has aria-orientation="vertical"
    ✓ submenu <li> wrappers have role="none"
    ✓ submenu <a> links have role="menuitem"
    ✓ submenu separator has role="separator" and aria-hidden="true"
    ✓ disabled submenu item has aria-disabled="true"
    ✓ icon <span> inside a sub-link has aria-hidden="true"

  describe('hamburger toggle button')
    ✓ has type="button"
    ✓ has aria-label="Toggle navigation menu"
    ✓ has aria-expanded="false" when menu is closed
    ✓ has aria-expanded="true" when menu is open
    ✓ aria-controls points to the root list id (matches [attr.id] on <ul>)
    ✓ has :focus-visible ring (focus-visible class / outline applied)

  describe('roving tabindex (keyboard navigation model)')
    ✓ first root item has tabindex="0" by default
    ✓ other root items have tabindex="-1" by default
    ✓ tabindex="0" moves to the item focused via ArrowRight
    ✓ disabled items always have tabindex="-1"

  describe('keyboard navigation — root level')
    ✓ ArrowDown opens the panel and focuses the first sub-item
    ✓ ArrowRight moves focus to the next root item
    ✓ ArrowLeft moves focus to the previous root item
    ✓ Home moves focus to the first root item
    ✓ End moves focus to the last root item

  describe('keyboard navigation — submenu level')
    ✓ ArrowDown moves focus to the next sub-item
    ✓ ArrowUp moves focus to the previous sub-item
    ✓ Escape closes the panel and returns focus to the triggering root item

  describe('axe-core automated checks')
    ✓ passes axe — empty (no model)
    ✓ passes axe — with full model, all panels closed
    ✓ passes axe — with first panel open
    ✓ passes axe — with nested sub-panel open (if model has nested items)
```

---

### Phase 1 — Architecture Audit

Verify the following and document any changes:

1. **Module-level ID counter** — After Issue 1 fix, verify `let nextMenubarId: number = 0` is
   at module level with explicit `: number` type annotation (consistent with all previous
   hardenings).

2. **`KEYBOARD_KEYS` completeness** — After Issue 2 fix, verify that `Home` and `End` are
   present in the `KEYBOARD_KEYS` constant in the `core` entry point. If they are missing,
   add them there (not in the menubar file directly). Run ESLint on `core` after the change.

3. **`closePanel(returnFocus: boolean = true)` signature** — Verify the boolean parameter
   uses a default value (not an overload) to keep the existing call sites working without
   change where `closePanel()` was already being called.

4. **`afterNextRender` usage** — The `focusFirstPanelItem()` and `onSubMenuEscape()` methods
   use `afterNextRender({ injector: this.injector })`. Verify the `Injector` is injected in
   the constructor and passed correctly. This is required because these methods are called
   from event handlers (outside the injection context).

5. **`rovingIndex` initial state** — The roving index must default to `0` (first item has the
   tab stop). However, if the model is empty, the initial state of `0` is fine — the computed
   links array will simply be empty and the focus call is a no-op.

6. **JSDoc improvement** — Add a JSDoc to `focusRootItem()` and `closePanel()` explaining the
   roving tabindex management and focus restoration contract.

---

### Phase 2 — Developer Experience Audit

#### Issue — README is sparse and missing critical consumer patterns

**Fix — add the following sections to `README.md`:**

**1. `MenubarItem` interface table:**

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string \| undefined` | — | Display text for the item. |
| `icon` | `string \| undefined` | — | Icon class applied to a decorative `<span>`. |
| `disabled` | `boolean \| undefined` | `false` | When true, item is inert. |
| `visible` | `boolean \| undefined` | `true` | When explicitly `false`, hides the item. |
| `separator` | `boolean \| undefined` | `false` | Renders a visual separator (no interaction). |
| `styleClass` | `string \| undefined` | — | Extra CSS class on the item element. |
| `url` | `string \| undefined` | — | When set, renders the item as `<a href>`. |
| `target` | `string \| undefined` | — | `target` attribute for `url`-based items. |
| `items` | `MenubarItem[] \| undefined` | — | Nested items — creates a dropdown sub-panel. |
| `command` | `(event: MenubarCommandEvent) => void \| undefined` | — | Callback when a leaf item is activated. |

**2. Content projection section:**

```markdown
## Content Projection

| Slot attribute | Position | Use for |
|---|---|---|
| `[menubarStart]` | Left side of the bar | Logo, branding, back button |
| `[menubarEnd]` | Right side of the bar | Search box, auth button, theme toggle |

```html
<ui-lib-menubar [model]="items">
  <img menubarStart src="/logo.svg" alt="Acme Corp" />
  <button menubarEnd type="button" (click)="openSearch()">Search</button>
</ui-lib-menubar>
```

**3. Accessibility section:**

```markdown
## Accessibility

### ARIA structure

| Element | Role / attribute | Notes |
|---|---|---|
| `<nav>` | landmark + `aria-label` | Labels the navigation region. Customise via the `ariaLabel` input — use a unique label when multiple navbars appear on the same page. |
| Root `<ul>` | `role="menubar"` | Identifies the horizontal menu bar. |
| Root `<li>` | `role="none"` | Neutral wrapper — the `<a>` carries the semantic role. |
| Root `<a>` | `role="menuitem"` | Interactive menu item. |
| Parent `<a>` (has subitems) | `aria-haspopup="menu"` + `aria-expanded` | Announces that activating the item opens a submenu. |
| Submenu `<ul>` | `role="menu"` + `aria-orientation="vertical"` | Identifies the dropdown panel as a vertical menu. |
| Submenu `<li>` | `role="none"` | Neutral wrapper. |
| Submenu `<a>` | `role="menuitem"` | Interactive sub-item. |
| Separator `<li>` | `role="separator"` + `aria-hidden="true"` | Visual divider — hidden from AT's item count. |
| Icons / carets | `aria-hidden="true"` | Decorative — conveyed by label text. |
| Hamburger button | `aria-expanded` + `aria-controls` + `aria-label` | Announces mobile menu state and links to the controlled list. |

### Keyboard navigation

| Context | Key | Behaviour |
|---|---|---|
| Menubar (root level) | `ArrowRight` | Move focus to the next root item (wraps) |
| Menubar (root level) | `ArrowLeft` | Move focus to the previous root item (wraps) |
| Menubar (root level) | `Home` | Move focus to the first root item |
| Menubar (root level) | `End` | Move focus to the last root item |
| Menubar (root level) | `ArrowDown` / `Enter` / `Space` | Open the dropdown panel and focus the first item |
| Menubar (root level) | `Escape` | Close open panel; return focus to the triggering item |
| Submenu panel | `ArrowDown` | Move focus to the next item (wraps) |
| Submenu panel | `ArrowUp` | Move focus to the previous item (wraps) |
| Submenu panel | `ArrowRight` | Open nested sub-panel (when item has children) |
| Submenu panel | `ArrowLeft` / `Escape` | Close current panel; return focus to parent |
| Anywhere | `Tab` | Move focus out of the menubar entirely (roving tabindex) |

### Multiple navbars on the same page

When more than one `<ui-lib-menubar>` appears on the same page, provide a unique `ariaLabel`
for each so screen reader users can distinguish them in the landmarks list:

```html
<ui-lib-menubar [model]="primaryNav" ariaLabel="Primary navigation" />
<ui-lib-menubar [model]="secondaryNav" ariaLabel="Documentation navigation" />
```

**4. CSS custom properties table** (key tokens from the SCSS):

| Property | Default | Description |
|---|---|---|
| `--uilib-menubar-bar-bg` | `var(--uilib-surface-100, #f8f9fa)` | Bar background colour |
| `--uilib-menubar-bar-border` | `1px solid var(--uilib-color-border)` | Bar border |
| `--uilib-menubar-bar-border-radius` | `var(--uilib-radius-md, 4px)` | Bar corner radius |
| `--uilib-menubar-panel-bg` | `var(--uilib-surface-0, #ffffff)` | Dropdown panel background |
| `--uilib-menubar-panel-shadow` | `var(--uilib-shadow-md)` | Dropdown panel shadow |
| `--uilib-menubar-panel-min-width` | `12rem` | Minimum dropdown panel width |
| `--uilib-menubar-transition` | `var(--uilib-transition-fast, 150ms ease)` | Animation/transition duration (set to `0ms` with `prefers-reduced-motion: reduce`) |

---

### Phase 4 — Performance Audit

Verify the following patterns and write a brief confirmation:

- **`effect()` in constructor** manages global document listeners reactively — listeners are
  added only when a panel is open (`activeIndex() !== -1`) and removed as soon as it closes.
  This avoids unnecessary global listener overhead when no panel is open. ✅
- **`DOCUMENT` injection** (SSR-safe) — no direct `document.` global access in the component. ✅
- **`afterNextRender({ injector })` for DOM focus** — focus calls after panel open happen in
  `afterNextRender` to avoid reading layout before Angular has finished rendering the new
  items. This is injection-context-safe via `{ injector: this.injector }`. ✅
- **`computed<MenubarItem[]>` for `visibleItems()`** — memoized; re-runs only when `model()`
  changes. ✅
- **`@for (... track $index)`** — Note: `track $index` is used instead of `track item.label`
  or a unique `id`. This is acceptable for a navigation menu (stable small list) but results
  in full re-rendering when items are reordered. If the `MenubarItem` model gets a unique
  `id` field in the future, updating to `track item.id` would improve performance. Record this
  as a future improvement note (do not change now — no regression risk).
- **`WritableSignal<number>` for `activeIndex` and `rovingIndex`** — O(1) updates; computed
  classes and tabindex attributes react automatically via the signal graph. ✅
- **No `QueryList` or `ViewChild`** — focus management uses `querySelector` at event time
  (not an Angular `QueryList` that requires change detection). This is efficient for this
  pattern since the query is only executed on keyboard events, not on every render. ✅

If all confirmed, write "Phase 4: No structural changes. All performance patterns verified."

---

### Phase 5 — Composability Audit

Verify and write a brief confirmation:

- **`[menubarStart]` / `[menubarEnd]` content projection** — Two isolated `<ng-content>`
  slots allow arbitrary projected content without wrapper components. The `empty:display:none`
  CSS rule hides empty slot containers cleanly. ✅
- **`ariaLabel` input** — Allows each menubar instance to have a unique, descriptive landmark
  label when multiple navbars appear on the page. ✅
- **`itemClick` output** emits the full `MenubarCommandEvent` (item + originalEvent), giving
  consumers access to both the data and the DOM event for advanced use cases. ✅
- **`command` callback on `MenubarItem`** — Per-item command callbacks allow consumers to
  handle navigation either globally (via `itemClick`) or per-item (via `command`). Both fire
  for the same activation event. ✅
- **`variant` + `ThemeConfigService` fallback** — Follows the same pattern as all other
  library components; explicit variant overrides the global theme. ✅
- **Arbitrary nesting depth** — `MenubarSubComponent` is recursive (imports itself inside
  `MenubarSubComponent`). The nesting can be arbitrarily deep without configuration. ✅
- **`visible: false` on items** — Items can be conditionally hidden without removing them
  from the model; useful for permission-based navigation. ✅

If all confirmed, write "Phase 5: No API changes. Composability story is correct."

---

### Phase 6 — Polish Audit

Verify each item below and write a brief confirmation:

- [ ] Root link `:focus-visible` ring uses `outline: 2px solid var(--uilib-color-primary)`
  with `outline-offset: 2px` ✅
- [ ] Sub link `:focus-visible` ring — same pattern ✅
- [ ] Toggle button `:focus-visible` ring — **added in Phase 3** ✅ (NEW)
- [ ] Caret rotates `180deg` when panel is open ✅
- [ ] Panel appear animation: `translateY(-4px) → translateY(0)` with opacity ✅
- [ ] Nested panel opens to the right (`left: calc(100% + 4px)`) ✅
- [ ] Mobile: panels expand inline (`position: static`, no shadow) with left accent border ✅
- [ ] Dark mode overrides present for bar, panel, links, separator, toggle ✅
- [ ] Bootstrap variant: dark bar, white text, lighter text for inactive items ✅
- [ ] Material variant: bottom-line active indicator (`::after` pseudo-element) ✅
- [ ] Minimal variant: transparent bar, underline active indicator ✅
- [ ] `@media (prefers-reduced-motion: reduce)` — **added in Phase 3** ✅ (NEW)
- [ ] `outline: none` on root and sub links (replaced by `:focus-visible` ring) ✅
- [ ] `pointer-events: none; cursor: not-allowed` on disabled root items ✅
- [ ] `aria-disabled` items in submenu have `pointer-events: none; cursor: not-allowed` ✅

If all verified, write "Phase 6: Toggle focus ring and reduced motion added. All other styling verified."

---

## Step 4 — After every file change

```bash
# After TS/HTML change in menubar or menubar-submenu:
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/menubar/ --max-warnings 0

# After core change (if KEYBOARD_KEYS updated):
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/core/ --max-warnings 0

# After spec change:
node_modules/.bin/jest --testPathPatterns=menubar --no-coverage

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
API:     /10  — MenubarItem interface; ariaLabel; itemClick; command; visible/disabled
A11y:    /10  — After fixes: correct menubar/menu roles, Left/Right arrow nav, Home/End,
               roving tabindex, Escape focus restoration, escapePanel output, toggle focus ring,
               reduced motion
Perf:    /10  — effect() listeners, afterNextRender focus, computed visibleItems, querySelector at event time
Comp:    /10  — content projection slots, ariaLabel uniqueness, command + itemClick dual pattern, recursive nesting
Theme:   /10  — CSS vars, 3 variants + default, dark mode, mobile responsive, reduced motion
DX:      /10  — README: MenubarItem table, content projection docs, a11y section, keyboard nav table, CSS vars
Docs:    /10  — README accuracy post-update
Polish:  /10  — focus rings on all interactive elements, caret animation, panel animation, mobile inline panels
Angular: /10  — Signal inputs/outputs, standalone, OnPush, ViewEncapsulation.None, effect(), afterNextRender
Feel:    /10  — Keyboard users can fully navigate; screen reader announces correct structure; mobile menu accessible
```

Update `docs/COMPONENT_SCORES.md` — change Menubar row from `—` to actual scores.
Update Tier 2 #11 status from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3; move the oldest
of the three to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`):

```
Date: 2026-05-10 [Menubar component — 6-phase hardening COMPLETE]
Changed: <list all modified files>
State: <what is complete>
  Phase 3 (A11y — priority):
    • MODERATE FIX: Unique instance ID counter (nextMenubarId) — eliminates duplicate-ID bug
      when multiple Menubar instances appear on the same page
    • CRITICAL FIX: ArrowLeft/Right/Home/End navigation on root level — implements
      full ARIA menubar keyboard pattern; previously keyboard users had no way to navigate
      between root items without Tab
    • MODERATE FIX: Roving tabindex on root items — Tab now exits the menubar instead of
      cycling through root items (correct ARIA menubar behavior)
    • MODERATE FIX: Escape/ArrowLeft from level-1 submenu returns focus to the triggering
      root item (via escapePanel output from MenubarSubComponent)
    • MODERATE FIX: Toggle button :focus-visible ring added
    • MODERATE FIX: @media (prefers-reduced-motion: reduce) added — sets --uilib-menubar-transition: 0ms
    • Created menubar.a11y.spec.ts with <N> tests
    • Pre-existing a11y features verified intact: <list>
  Phase 1 (Architecture): <describe>
  Phase 2 (DX): <describe README updates>
  Phase 4 (Performance): <describe — no/minimal changes>
  Phase 5 (Composability): <describe — no changes>
  Phase 6 (Polish): <describe>
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/menubar/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=menubar --no-coverage (<N>/<N> PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: <any workarounds>
Next step: Menu hardening (Tier 2, #12) — key a11y: role=menu, keyboard nav, separator roles.
```

---

## Lessons Applied From Previous Hardenings

| Lesson | Application in this prompt |
|---|---|
| Module-level counter for unique IDs | Issue 1: `let nextMenubarId: number = 0` eliminates hardcoded `id="ui-menubar-root-list"` |
| `afterNextRender({ injector })` for DOM focus outside injection context | Issues 2, 5: `focusFirstPanelItem()` and `onSubMenuEscape()` both use this pattern |
| Roving tabindex is required for `role="menubar"` | Issue 3: Only one root item in the tab sequence at a time |
| Escape = close + focus restoration (not just close) | Issue 4: `closePanel(returnFocus)` parameter; Issue 5: `escapePanel` output |
| `:focus-visible` ring must be on ALL interactive elements | Issue 6: Toggle button was missed |
| `prefers-reduced-motion` in every animated component | Issue 7: Panel appear animation + transitions |
| `fixture.nativeElement as HTMLElement` before querySelector | All query helpers use `(fixture.nativeElement as HTMLElement).querySelector<T>` |
| `document.body.appendChild(fixture.nativeElement)` for focus tests in jsdom | Step 4 in testing notes |
| `checkA11y(fixture)` for components (not `axe(document.body)`) | axe-core tests in a11y spec |
| Do NOT skip `region` axe rule when landmark is present | `<nav>` satisfies the rule — do not skip |
| `afterEach: fixture.destroy()` when appended to document.body | Cleanup in a11y spec |
| ESLint from bash.exe — never PowerShell | Step 4 commands |
| Run ESLint on `core` if `KEYBOARD_KEYS` changes | Phase 1, item 2 |

