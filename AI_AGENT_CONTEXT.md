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
- **Active focus:** Toast component complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Toast` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `AnimateOnScroll` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Avatar` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `AutoFocus` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Message` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Breadcrumb` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ContextMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Dock` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Menu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `MegaMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Menubar` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `PanelMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `TieredMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Image` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ImageCompare` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ToggleButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Textarea` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Galleria` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `TreeSelect` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Rating` -> ✅ complete (implementation/tests/entry-point/demo/docs/ESLint/build all green)
- `Listbox` -> ✅ complete (implementation/tests/entry-point/demo/docs/ESLint/build all green)
- `RadioButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Knob` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `KeyFilter` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `InputOtp` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Carousel` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Upload` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `VirtualScroller` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Tree` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `ToggleSwitch` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `TreeTable` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Table` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `Timeline` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `OrderList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `OrganizationChart` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `Paginator` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `PickList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- Documentation gaps still tracked for: `Input`, `Select`, `Card`, `Layout`
- Pending secondary entry points: `icon-button`, `alert`
- `VirtualScroller` docs written: `docs/reference/components/VIRTUAL_SCROLLER.md`

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-01 [Avatar component]
Changed:
  - projects/ui-lib-custom/src/lib/avatar/avatar.types.ts (new)
  - projects/ui-lib-custom/src/lib/avatar/avatar.ts (new component + re-export types)
  - projects/ui-lib-custom/src/lib/avatar/avatar.html (new template)
  - projects/ui-lib-custom/src/lib/avatar/avatar.scss (new styles)
  - projects/ui-lib-custom/src/lib/avatar/avatar-group.ts (new AvatarGroup component)
  - projects/ui-lib-custom/src/lib/avatar/avatar-group.html (new template)
  - projects/ui-lib-custom/src/lib/avatar/avatar-group.scss (new styles)
  - projects/ui-lib-custom/src/lib/avatar/avatar.spec.ts (19 unit tests)
  - projects/ui-lib-custom/src/lib/avatar/index.ts (barrel)
  - projects/ui-lib-custom/avatar/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/avatar/package.json (secondary entry point)
  - projects/ui-lib-custom/avatar/public-api.ts (secondary entry point)
  - projects/ui-lib-custom/package.json (avatar added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (avatar import test added)
  - projects/demo/src/app/pages/avatar/avatar-demo.component.ts (full demo)
  - projects/demo/src/app/pages/avatar/avatar-demo.component.html (full demo -- 8 sections)
  - projects/demo/src/app/pages/avatar/avatar-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: TODO from Avatar entry)
  - AI_AGENT_CONTEXT.md (updated)
State: Avatar component fully complete. PrimeNG-inspired Avatar + AvatarGroup components:
  - Avatar: image/label/icon display modes with priority (image > label > icon > ng-content)
  - Three shapes: circle (default) / square
  - Three sizes: sm / md / lg
  - Three variants: material / bootstrap / minimal (inherits ThemeConfigService)
  - ARIA: role=img on Avatar, role=group on AvatarGroup, auto-resolved aria-label
  - CSS vars: --uilib-avatar-* prefix throughout
  - AvatarGroup: stacks avatars with CSS negative-margin overlap
  - Signal inputs, ViewEncapsulation.None + OnPush + standalone on both
  - 19 unit tests passing. 66/66 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/avatar/ projects/demo/src/app/pages/avatar/ --max-warnings 0 (CLEAN, EXIT:0),
  npx jest --testPathPatterns=avatar --no-coverage (19/19 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (66/66 PASS),
  npx ng build ui-lib-custom -- ui-lib-custom/avatar Built, zero errors.
Terminal notes: Python used for all file writes (bash heredoc expansion issues with ! and backticks).
Next step: knip baseline + dead-code cleanup, or constants extraction pass.

Date: 2026-05-01 [AutoFocus directive]
Changed:
  - projects/ui-lib-custom/src/lib/auto-focus/auto-focus.ts (new directive)
  - projects/ui-lib-custom/src/lib/auto-focus/auto-focus.spec.ts (7 unit tests)
  - projects/ui-lib-custom/src/lib/auto-focus/index.ts (barrel)
  - projects/ui-lib-custom/auto-focus/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/auto-focus/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (auto-focus added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (auto-focus import test added)
  - projects/demo/src/app/pages/auto-focus/auto-focus-demo.component.ts (full demo)
  - projects/demo/src/app/pages/auto-focus/auto-focus-demo.component.html (full demo — hero + 3 sections + API table)
  - projects/demo/src/app/pages/auto-focus/auto-focus-demo.component.scss (full demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from AutoFocus entry)
  - AI_AGENT_CONTEXT.md (updated)
State: AutoFocus directive fully complete. PrimeNG-inspired [uiLibAutoFocus] directive that programmatically
  focuses the host element after ngAfterViewInit (via setTimeout for deferred compatibility). Single boolean
  `autofocus` input (default true). Host class `ui-lib-autofocus`. Signal input. ViewEncapsulation.None not
  needed (directive, no template/styles). Secondary entry point wired and built.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/auto-focus/ projects/demo/src/app/pages/auto-focus/ --max-warnings 0 (CLEAN, EXIT:0),
  npx jest --testPathPatterns=auto-focus --no-coverage (7/7 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (65/65 PASS),
  npx ng build ui-lib-custom — ui-lib-custom/auto-focus Built, zero errors.
Terminal notes: HTML template `{` chars in <pre> blocks must use &#123;/&#125; HTML entities to avoid Angular block-syntax parser errors. `@` in code examples must use &#64;.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.

Date: 2026-05-01 [animate-on-scroll demo rebuild + toast/scss repairs]
Changed:
  - projects/ui-lib-custom/src/lib/animate-on-scroll/animate-on-scroll.scss (added --uilib-animate-on-scroll-delay CSS variable support to every preset transition)
  - projects/demo/src/styles.scss (added @use of animate-on-scroll.scss so preset classes are globally available)
  - projects/demo/src/app/pages/animated-on-scroll/animated-on-scroll-demo.component.html (full rewrite — hero + 7 scrollable sections: fade-in, slide-up, slide-down, slide-left/right, zoom-in/out, stagger, repeat mode, API table)
  - projects/demo/src/app/pages/animated-on-scroll/animated-on-scroll-demo.component.scss (full rewrite — hero, section, card, zoom-card, stagger-row, code-hint, API table styles)
  - projects/ui-lib-custom/src/lib/toast/toast.scss (repaired truncation at line 349 — completed minimal dark-mode closing block)
  - projects/ui-lib-custom/src/lib/toast/toast.ts (stripped null bytes)
  - projects/ui-lib-custom/src/lib/toast/toast.service.ts (stripped null bytes)
  - AI_AGENT_CONTEXT.md (updated)
State: Demo fully working. Preset classes actually animate on scroll (SCSS now imported globally). Stagger via --uilib-animate-on-scroll-delay inline style. Toast null-byte corruption fixed. Build now exits 0 with zero errors across all 64+ entry points.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/demo/src/app/pages/animated-on-scroll/ --max-warnings 0 (CLEAN, EXIT:0),
  npx ng build ui-lib-custom — all entry points Built, zero errors, exit 0,
  npx jest --testPathPatterns=animate-on-scroll --no-coverage (14/14 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (64/64 PASS).
Terminal notes: Write tool truncates large HTML files on the Linux mount; used Python open() to write the full demo HTML. Toast scss/ts/service.ts had pre-existing null bytes — stripped with Python binary mode.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.
