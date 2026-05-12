# PanelMenu — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/panel-menu` · `<ui-lib-panel-menu>`
**Queue position:** Tier 2, #15
**Generated:** 2026-05-11
**Key a11y concern:** Mixed menubar + tree pattern, `aria-expanded` on panels, keyboard navigation between panels and within sub-items, `aria-controls` linking header to panel.
**Based on lessons from:** ContextMenu (#14), Menubar (#11), Menu (#12), TieredMenu (#13), Accordion (done), all Tier 1 hardenings.

> Run Phase 3 first, then Phases 1, 2, 4, 5, 6 in order.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md` — current milestone, recent handoffs, queue
2. `LIBRARY_CONVENTIONS.md` — bash.exe terminal requirement, non-negotiable conventions
3. `docs/VISION.md` — Elite Accessibility commitment
4. `docs/COMPONENT_SCORES.md` — PanelMenu is Tier 2, #15, still ⏳ Queued
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow
6. `projects/ui-lib-custom/src/lib/panel-menu/README.md` — current API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/panel-menu/panel-menu.ts`
- `projects/ui-lib-custom/src/lib/panel-menu/panel-menu.html`
- `projects/ui-lib-custom/src/lib/panel-menu/panel-menu.scss`
- `projects/ui-lib-custom/src/lib/panel-menu/panel-menu.types.ts`
- `projects/ui-lib-custom/src/lib/panel-menu/panel-menu.spec.ts`

Also read hardened siblings for established patterns:
- `projects/ui-lib-custom/src/lib/accordion/accordion.ts` (aria-expanded + aria-controls pattern)
- `projects/ui-lib-custom/src/lib/accordion/accordion.a11y.spec.ts` (accordion a11y spec structure)
- `projects/ui-lib-custom/src/lib/menu/menu.a11y.spec.ts` (nested menu a11y spec structure)

Do not write any code until you have read every file listed above.

---

## Step 2 — What is already present (do NOT regress these)

Verify the following before proposing any changes:

- `role="menu"` on root `<ul>` with `aria-orientation="vertical"` ✅ (see Issue 1 — WRONG role)
- `[attr.aria-label]="ariaLabel()"` on root element ✅
- `ariaLabel` input with default from `PANEL_MENU_DEFAULT_ARIA_LABEL` ✅
- `role="separator"` on separator `<li>` ✅
- `aria-hidden="true"` on separator — check (see Issue 1 fix logic from ContextMenu)
- `role="none"` on item wrapper `<li>` ✅
- `role="menuitem"` on item `<a>` links ✅
- `[attr.aria-expanded]` bound to expanded state on parent items ✅
- `[attr.aria-haspopup]="'menu'"` on parent items ✅
- `[attr.aria-disabled]` on disabled items ✅
- `aria-hidden="true"` on icon spans ✅
- `[attr.aria-hidden]` to hide collapsed sub-panels (hide from AT) ✅
- Sub-panel items navigate via click/keyboard ✅
- `multiple` input for allowing multiple expanded panels ✅
- `expandedKeys` signal tracks expanded state ✅
- Keyboard navigation handler on root items ✅
- `prefers-reduced-motion` — **NOT present yet** ⚠️
- `aria-controls` linking header buttons to panels — **MISSING** ⚠️
- Panel IDs for `aria-controls` reference — **MISSING** ⚠️
- Instance-unique IDs — **MISSING** ⚠️

---

## Step 3 — The 6-phase workflow

### ⚡ Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)

---

#### Issue 1 — Incorrect ARIA pattern: PanelMenu is an Accordion + Menu, not a flat Menu (CRITICAL)

**Root cause:** The current PanelMenu uses `role="menu"` on the root container and `role="menuitem"`
on header links. However, the PanelMenu is functionally an **accordion** (expandable panels) where
each panel's content is a **navigation menu** (sub-items). The WAI-ARIA pattern for this is:

- Root container: `role="navigation"` (or `role="list"` if not a nav) with `[attr.aria-label]`
- Each panel section: a `<div>` or `<section>` wrapper
- Panel header: `<button>` (not `<a>`) with `role="button"` (implicit), `aria-expanded`, `aria-controls`
- Panel content: `<div>` with `id` matching the header's `aria-controls`, `role="region"` with `aria-labelledby`
- Sub-items inside the panel: `role="menu"` → `role="menuitem"` (like a flat menu)

**CRITICAL:** If the current implementation uses `<a role="menuitem">` for headers that expand/collapse
panels, that is incorrect — panel headers should be `<button>` elements (or have `role="button"`), not
`role="menuitem"`, because they don't navigate to a URL; they toggle visibility.

**Audit carefully before changing:** Read the existing HTML to understand the exact current DOM structure.
If panel headers are already `<button>` elements, the fix is about the containing roles. If they are
`<a>` elements, they need to become `<button>` elements.

**Proposed correct ARIA structure:**

```html
<nav [attr.aria-label]="ariaLabel()" class="ui-lib-panel-menu">
  <ul class="ui-lib-panel-menu__list" role="list">
    <!-- Root level: panel header + collapsible sub-panel -->
    @for (item of visibleItems(); track item.id ?? item.label) {
      @if (item.separator) {
        <li role="separator" class="ui-lib-panel-menu__separator"></li>
      } @else if (item.items?.length) {
        <li class="ui-lib-panel-menu__panel-item" role="none">
          <!-- Panel toggle button -->
          <button
            type="button"
            class="ui-lib-panel-menu__header"
            [id]="getPanelHeaderId($index)"
            [attr.aria-expanded]="isItemExpanded(getRootKey($index)) ? 'true' : 'false'"
            [attr.aria-controls]="getPanelContentId($index)"
            [attr.aria-disabled]="item.disabled ? 'true' : null"
            (click)="toggleItem(item, $index)"
            (keydown)="onHeaderKeyDown($event, item, $index)"
          >
            <!-- label + caret -->
          </button>
          <!-- Panel content region -->
          <div
            [id]="getPanelContentId($index)"
            role="region"
            [attr.aria-labelledby]="getPanelHeaderId($index)"
            [attr.aria-hidden]="!isItemExpanded(getRootKey($index)) ? 'true' : null"
          >
            <ul role="menu" class="ui-lib-panel-menu__sub-list">
              @for (subItem of item.items; track subItem.id ?? subItem.label) {
                <!-- sub-items with role="menuitem" -->
              }
            </ul>
          </div>
        </li>
      } @else {
        <!-- Leaf item — just a menu item link -->
        <li role="none">
          <a ... role="menuitem"> ... </a>
        </li>
      }
    }
  </ul>
</nav>
```

---

#### Issue 2 — `aria-controls` and `aria-labelledby` IDs are missing (CRITICAL)

**Root cause:** Panel header buttons do not have `aria-controls` pointing to their content panels.
Content panels do not have `id` attributes. Screen reader users cannot discover the relationship
between a panel header and its content.

**Fix — add module-level ID counter and ID helpers:**

```typescript
/** Module-level counter for unique PanelMenu IDs. */
let nextPanelMenuId: number = 0;

// Inside the class:
public readonly panelMenuId: string = `uilib-panel-menu-${++nextPanelMenuId}`;

public getPanelHeaderId(index: number): string {
  return `${this.panelMenuId}-header-${index}`;
}

public getPanelContentId(index: number): string {
  return `${this.panelMenuId}-content-${index}`;
}
```

Bind in the template (see Issue 1 example).

---

#### Issue 3 — Keyboard navigation is incomplete for the accordion pattern (CRITICAL)

**Root cause:** The WAI-ARIA Accordion pattern (which PanelMenu follows for panel headers) requires:

For panel header buttons:
- `Enter` / `Space` — toggle the panel open/closed
- `ArrowDown` — move focus to the next panel header (wraps)
- `ArrowUp` — move focus to the previous panel header (wraps)
- `Home` — move focus to the first panel header
- `End` — move focus to the last panel header
- `Tab` — move to the next focusable element (next header OR first sub-item if panel is open)

For sub-items inside an open panel:
- Arrow keys navigate within `role="menu"` (same as flat Menu)
- `Escape` — moves focus back to the parent header button

Verify `onHeaderKeyDown()` implements all of these. Add any missing cases.

---

#### Issue 4 — `aria-hidden` on separator inside navigation (MODERATE)

**Root cause:** Same as ContextMenu Issue 1. If separator `<li>` elements have both `role="separator"`
and `aria-hidden="true"`, the `aria-hidden` is incorrect — remove it.

---

#### Issue 5 — No `@media (prefers-reduced-motion: reduce)` (MODERATE)

**Fix — add to the end of `panel-menu.scss`:**

```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-panel-menu__sub-list {
    transition: none;
    animation: none;
  }
}
```

---

#### Deliverable — `panel-menu.a11y.spec.ts`

**Testing notes:**

1. **PanelMenu is a regular component** (not a popup) — render inside the fixture, use `checkA11y(fixture)`.
2. **`document.body.appendChild(fixture.nativeElement)`** required for focus management tests.
3. **Accordion pattern for headers** — test `aria-expanded` toggling, `aria-controls` → `id` pairing,
   `aria-labelledby` on content regions.
4. **Keyboard navigation** covers both header navigation (Arrow keys) and sub-item navigation.

**Spec structure (aim for 30–40 tests):**

```
describe('PanelMenu Accessibility')
  afterEach: fixture.destroy()

  describe('navigation landmark')
    ✓ root has role="navigation" (or correct landmark role)
    ✓ root has aria-label from ariaLabel input
    ✓ defaults to PANEL_MENU_DEFAULT_ARIA_LABEL

  describe('panel header ARIA')
    ✓ panel header is a <button> element
    ✓ panel header has aria-expanded="false" when closed
    ✓ panel header has aria-expanded="true" when open
    ✓ panel header has aria-controls pointing to a valid panel ID
    ✓ panel header id matches aria-labelledby on its content region
    ✓ disabled header has aria-disabled="true"

  describe('panel content ARIA')
    ✓ panel content has role="region"
    ✓ panel content has aria-labelledby matching the header id
    ✓ closed panel has aria-hidden="true"
    ✓ open panel does NOT have aria-hidden

  describe('sub-menu ARIA')
    ✓ sub-list inside open panel has role="menu"
    ✓ sub-item links have role="menuitem"
    ✓ disabled sub-item has aria-disabled="true"

  describe('separator ARIA')
    ✓ separator has role="separator"
    ✓ separator does NOT have aria-hidden="true"

  describe('keyboard navigation — headers')
    ✓ Enter toggles panel open/closed
    ✓ Space toggles panel open/closed
    ✓ ArrowDown moves focus to the next header
    ✓ ArrowUp moves focus to the previous header
    ✓ Home moves focus to the first header
    ✓ End moves focus to the last header

  describe('keyboard navigation — sub-items')
    ✓ ArrowDown/Up navigate within open panel's sub-menu
    ✓ Escape returns focus to the panel header

  describe('multiple panels')
    ✓ unique IDs across two PanelMenu instances on same page

  describe('axe-core automated checks')
    ✓ passes axe — all panels closed
    ✓ passes axe — first panel open
    ✓ passes axe — multiple panels open (if multiple=true)
    ✓ passes axe — with disabled item
```

---

### Phase 1 — Architecture Audit

1. **ARIA pattern correctness** — After Issue 1 fix, verify the root landmark role is `navigation` (not `menu`).
2. **Module-level ID counter** — `let nextPanelMenuId: number = 0` with explicit `: number`.
3. **Panel header element type** — headers must be `<button type="button">`, not `<a>` elements.
4. **`expandedKeys` signal immutability** — verify `new Set([...current, key])` pattern (reference-safe for OnPush).

---

### Phase 2 — DX Audit

**README improvements:**
1. Document the accordion pattern — panel headers as buttons, not navigation links.
2. Document `multiple` input behavior.
3. Full keyboard navigation table.
4. Accessibility section with ARIA structure table.
5. CSS custom properties table.

---

### Phase 4 — Performance Audit

- `expandedKeys` signal uses immutable Set updates. ✅
- `visibleItems()` is a `computed<...>` signal. ✅
- `@for ... track` uses unique item key. Verify.

---

### Phase 5 — Composability Audit

- `multiple` input allows independent vs. exclusive open behavior.
- `ariaLabel` input for unique landmark labeling.
- `panelToggle` output for external open/close state tracking.
- `visible: false` on items for permission-based hiding.

---

### Phase 6 — Polish Audit

- [ ] Panel header `:focus-visible` ring
- [ ] Caret rotation animation on expand
- [ ] Sub-panel expand/collapse transition
- [ ] `@media (prefers-reduced-motion: reduce)` (added Phase 3)
- [ ] Dark mode overrides
- [ ] 3 variants styled

---

## Step 4 — Commands after every file change

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/panel-menu/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=panel-menu --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

**All commands from `bash.exe`.**

---

## Step 5 — Scoring

```
API:     /10
A11y:    /10  — After fixes: correct accordion+navigation ARIA, aria-controls/aria-labelledby,
               keyboard nav (arrows + Enter/Space + Escape), panel IDs, reduced motion
Perf:    /10
Comp:    /10
Theme:   /10
DX:      /10
Docs:    /10
Polish:  /10
Angular: /10
Feel:    /10
```

Update `docs/COMPONENT_SCORES.md` — PanelMenu Tier 2 #15 from ⏳ Queued to ✅ Done.

---

## Step 6 — Mandatory handoff

Append to `AI_AGENT_CONTEXT.md → ## Recent Handoffs` (keep only newest 3).

```
Date: <date> [PanelMenu — 6-phase hardening COMPLETE (#15)]
Next step: Input hardening (Tier 3, #21).
```

---

## Lessons Applied

| Lesson | Application |
|---|---|
| Accordion pattern requires `aria-controls` + `aria-labelledby` IDs | Issues 1 & 2: instance-ID helpers |
| Panel headers must be `<button>` not `<a>` for toggle behavior | Issue 1: DOM structure audit |
| `role="separator"` must NOT have `aria-hidden="true"` | Issue 4 |
| `prefers-reduced-motion` in every animated component | Issue 5 |
| Module-level counter for unique IDs | Phase 1 |
| ESLint in bash.exe only | Step 4 |

