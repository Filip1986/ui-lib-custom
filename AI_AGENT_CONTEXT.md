# AI Agent Context

> Active session context only.
> Stable architecture, conventions, and workflows live in `AGENTS.md`.
> Historical handoffs live in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

---

## Purpose and Scope

Use this file for:
- Current focus, queue, and blockers
- Quick status deltas for in-flight components/docs
- Recent handoffs (latest 1-3 sessions)

Do not duplicate stable project rules here; link to `AGENTS.md` instead.

---

## Active Session State

- **Current milestone:** Component foundation hardening + documentation completeness
- **Active focus:** Menubar hardening COMPLETE (Tier 2, #11); next is Menu
- **Next queue:** Menu hardening (Tier 2, #12) — key a11y: role=menu, keyboard nav, separator roles
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Tooltip` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 66 tests — 34 unit + 32 a11y)
- `Toast` -> ✅ complete + hardened (6-phase evolution, score 9.1/10, 60 tests — 29 unit + 31 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-10 [Menubar component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/menubar/menubar.ts
      • MODERATE FIX: module-level `let nextMenubarId: number = 0` counter added
      • Added `menubarId` and `rootListId` public readonly strings (unique per instance)
      • Added `rovingIndex: WritableSignal<number>` (roving tabindex pattern)
      • Added `getRootTabIndex(item, index): string` template helper
      • CRITICAL FIX: ArrowRight/ArrowLeft/Home/End added to `onRootItemKeyDown()` — implements
        full WAI-ARIA menubar keyboard pattern; keyboard users can now navigate between root items
      • Added `focusRootItem(index)` private helper with wrap-around and rovingIndex update
      • Updated `closePanel()` to accept `returnFocus: boolean = true` parameter
        — Escape key calls `closePanel(true)` (restore focus); click-outside calls `closePanel(false)`
      • Added `onSubMenuEscape(index)` — closes panel and restores focus to root item via afterNextRender
      • Updated `onRootItemClick` and `onRootItemKeyDown` to set `rovingIndex` on activation
      • Updated click-outside and global keydown handlers to pass correct `returnFocus` value
  - projects/ui-lib-custom/src/lib/menubar/menubar.html
      • MODERATE FIX: `aria-controls="ui-menubar-root-list"` → `[attr.aria-controls]="rootListId"` (dynamic)
      • MODERATE FIX: `id="ui-menubar-root-list"` → `[attr.id]="rootListId"` (dynamic, instance-unique)
      • Updated both `<a>` branches: `[attr.tabindex]="item.disabled ? '-1' : '0'"` → `[attr.tabindex]="getRootTabIndex(item, $index)"`
      • Added `(escapePanel)="onSubMenuEscape($index)"` to root-level `<ui-lib-menubar-sub>`
  - projects/ui-lib-custom/src/lib/menubar/menubar-submenu.ts
      • Added `escapePanel: OutputEmitterRef<void> = output<void>()` output
      • MODERATE FIX: Updated `ArrowLeft`/`Escape` handler to emit `escapePanel` when no nested panel is
        open (previously always called `activeIndex.set(-1)` which couldn't propagate upward)
  - projects/ui-lib-custom/src/lib/menubar/menubar-submenu.html
      • Added `(escapePanel)="activeIndex.set(-1)"` to nested `<ui-lib-menubar-sub>` (propagates close upward)
  - projects/ui-lib-custom/src/lib/menubar/menubar.scss
      • MODERATE FIX: Added `:focus-visible` ring to `.ui-lib-menubar__toggle` (was missing — all
        interactive elements must have :focus-visible ring)
      • MODERATE FIX: Added `@media (prefers-reduced-motion: reduce)` at end of file —
        sets `--uilib-menubar-transition: 0ms` to disable panel appear animation and transitions
  - projects/ui-lib-custom/src/lib/menubar/menubar.a11y.spec.ts (CREATED — 42 a11y tests)
      • 8 describe blocks: nav landmark (3), menubar ARIA structure (9), submenu ARIA structure (7),
        hamburger toggle button (5), roving tabindex (4), keyboard nav root level (5),
        keyboard nav submenu level (3), axe-core (4)
      • Uses `MENUBAR_AXE_RULES` (skips color-contrast + aria-required-children)
        — aria-required-children is a known false positive with role="none" li wrappers per WAI-ARIA spec
      • document.body.appendChild(fixture.nativeElement) for focus tests in jsdom
      • afterEach: fixture.destroy() for DOM cleanup
  - projects/ui-lib-custom/src/lib/menubar/README.md
      • Replaced 1-section stub with full documentation:
        MenubarItem interface table, Public Properties table, Content Projection table,
        ARIA structure table, keyboard navigation table, roving tabindex section,
        multiple navbars guidance, CSS custom properties table (7 tokens)
  - docs/COMPONENT_SCORES.md
      • Menubar queue entry: ⏳ Queued → ✅ Done (Tier 2 #11)
      • Menubar score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md (Popover handoff archived)
State: Menubar component fully evolved through all 6 phases. Score 9.0/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: ArrowLeft/Right/Home/End navigation on root level — implements full ARIA
      menubar keyboard pattern; previously keyboard users had no way to navigate between root
      items without Tab (which should exit the menubar, not cycle within it)
    • MODERATE FIX: Unique instance ID counter (nextMenubarId) + rootListId — eliminates
      duplicate-ID bug when multiple Menubar instances appear on the same page
    • MODERATE FIX: Roving tabindex on root items — only one root item in the tab sequence;
      Tab now exits the menubar (correct ARIA menubar behavior)
    • MODERATE FIX: Escape/ArrowLeft from level-1 submenu returns focus to the triggering
      root item (via escapePanel output from MenubarSubComponent + onSubMenuEscape)
    • MODERATE FIX: closePanel(returnFocus) — Escape restores focus; click-outside does not
    • MODERATE FIX: Toggle button :focus-visible ring added (was the only interactive element without one)
    • MODERATE FIX: @media (prefers-reduced-motion: reduce) added — sets transition to 0ms
    • Created menubar.a11y.spec.ts with 42 tests (all pass)
    • Pre-existing a11y features verified intact: nav landmark, role=menubar, role=menu,
      role=none on li wrappers, role=menuitem, aria-haspopup, aria-expanded, aria-disabled,
      aria-hidden on icons/carets/toggle-bars, aria-orientation=vertical, role=separator,
      DOCUMENT injection, ngOnDestroy listener cleanup, afterNextRender for focus
  Phase 1 (Architecture): nextMenubarId counter, menubarId, rootListId, rovingIndex all added.
    closePanel(returnFocus) param, focusRootItem(), onSubMenuEscape() all added.
  Phase 2 (DX): README fully updated — MenubarItem interface table, Public Properties,
    Content Projection, ARIA structure, keyboard nav, roving tabindex, multiple navbars, CSS vars.
  Phase 4 (Performance): No structural changes. All patterns verified — effect() for global
    listeners, afterNextRender({ injector }) for focus, computed visibleItems, querySelector at event time.
  Phase 5 (Composability): No API changes. Two slot projection, ariaLabel uniqueness, command +
    itemClick dual pattern, recursive nesting all verified.
  Phase 6 (Polish): Toggle :focus-visible ring added. Reduced motion added. All other styling
    verified intact — caret rotation, panel appear animation, nested right-open, mobile inline,
    dark mode, 3 variants, disabled pointer-events.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/menubar/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=menubar --no-coverage (84/84 PASS — 42 unit + 42 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs).
  aria-required-children axe rule is a false positive for role="menu" with role="none" li wrappers
  per WAI-ARIA spec — skip it in MENUBAR_AXE_RULES with an explanatory comment.
  fixture.destroy() in afterEach does NOT remove from document.body — each test appends and
  destroys cleanly when fixture is referenced (no residual DOM across tests due to per-test TBed).
Next step: Menu hardening (Tier 2, #12) — key a11y: role=menu, keyboard nav, separator roles.


Date: 2026-05-10 [Toast component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/toast/toast.ts
      • CRITICAL FIX: Removed aria-live="polite" and aria-atomic="false" from container host binding
        — role="region" is a structural landmark, not a live region; added explanatory comment
      • Updated dismiss() JSDoc to document animation delay and no-op safety
  - projects/ui-lib-custom/src/lib/toast/toast.html
      • CRITICAL FIX: [attr.role] now conditional — role="alert" for error severity only, role="status" for success/info/warn
      • CRITICAL FIX: Removed [attr.aria-live] binding — redundant/ineffective (role already implies live region urgency)
      • MODERATE FIX: Close button aria-label updated to "Dismiss: {summary}" — falls back to detail then "notification"
  - projects/ui-lib-custom/src/lib/toast/toast.scss
      • MODERATE FIX: Added @media (prefers-reduced-motion: reduce) — sets --uilib-toast-animation-duration: 0ms
  - projects/ui-lib-custom/src/lib/toast/toast.spec.ts
      • Updated 4 ARIA tests to reflect corrected role/aria-live behaviour
  - projects/ui-lib-custom/src/lib/toast/toast.a11y.spec.ts (CREATED — 31 a11y tests)
  - projects/ui-lib-custom/src/lib/toast/README.md
      • Added ToastMessage interface table, Multiple Containers Pattern, Lifecycle, CSS vars, Accessibility section
  - docs/COMPONENT_SCORES.md
      • Toast queue entry: ⏳ Queued → ✅ Done (Tier 1 #10)
      • Toast score row: 9/10/9/9/9/9/9/9/9/9 avg 9.1 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
State: Toast component fully evolved through all 6 phases. Score 9.1/10.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toast/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=toast --no-coverage (60/60 PASS — 29 unit + 31 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs).
Next step: Menubar hardening (Tier 2, #11).


Date: 2026-05-10 [Tooltip directive — 6-phase hardening COMPLETE]
→ Archived to docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md

---



