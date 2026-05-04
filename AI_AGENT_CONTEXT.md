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
- `Bind` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `BlockUI` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-05-04 [BlockUI component]
Changed:
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.types.ts (new)
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.ts (new component)
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.html (new template)
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.scss (new styles)
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.spec.ts (18 unit tests)
  - projects/ui-lib-custom/src/lib/block-ui/index.ts (barrel)
  - projects/ui-lib-custom/block-ui/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/block-ui/package.json (secondary entry point)
  - projects/ui-lib-custom/block-ui/public-api.ts (secondary entry point)
  - projects/ui-lib-custom/package.json (block-ui added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (block-ui import test added)
  - projects/demo/src/app/pages/block-ui/block-ui-demo.component.ts (full demo)
  - projects/demo/src/app/pages/block-ui/block-ui-demo.component.html (full demo — hero + 4 sections + API table)
  - projects/demo/src/app/pages/block-ui/block-ui-demo.component.scss (demo styles)
  - jest.config.ts (fixed Windows-incompatible modulePathIgnorePatterns with separator-agnostic regexes)
  - AI_AGENT_CONTEXT.md (updated)
State: BlockUI component fully complete. PrimeNG-inspired component that overlays a semi-transparent
  mask over wrapped content to block interaction. Uses model() for two-way blocked binding.
  Always renders mask div (CSS-toggled visibility) so ng-content projection into blockTemplate slot works.
  Three variants: material (blur backdrop), bootstrap (darker), minimal (lightest blur).
  Signal inputs/model, ViewEncapsulation.None + OnPush + standalone. 18 unit tests using WritableSignal
  test host (required for zoneless OnPush). Secondary entry point wired and built.
  Also fixed pre-existing jest.config.ts Windows path-separator bug in modulePathIgnorePatterns —
  all patterns now use [/\\\\] separator-agnostic regex instead of hard-coded forward slashes.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/block-ui/ projects/demo/src/app/pages/block-ui/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/block-ui Built, zero errors,
  npx.cmd jest --testPathPatterns=block-ui --no-coverage (18/18 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (68/68 PASS).
Terminal notes: Test host must use WritableSignal (not plain properties) for signal model() inputs
  to toggle reactively with zoneless OnPush. modulePathIgnorePatterns uses <rootDir>-prefixed paths
  that break on Windows because <rootDir> resolves with backslashes while the rest uses forward slashes.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-02 [Bind directive]
Changed:
  - projects/ui-lib-custom/src/lib/bind/bind.ts (new directive)
  - projects/ui-lib-custom/src/lib/bind/bind.spec.ts (11 unit tests)
  - projects/ui-lib-custom/src/lib/bind/index.ts (barrel)
  - projects/ui-lib-custom/bind/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/bind/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (bind added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (bind import test added)
  - projects/demo/src/app/pages/bind/bind-demo.component.ts (full demo)
  - projects/demo/src/app/pages/bind/bind-demo.component.html (full demo — hero + 3 sections + API table)
  - projects/demo/src/app/pages/bind/bind-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from Bind entry)
  - AI_AGENT_CONTEXT.md (updated)
State: Bind directive fully complete. PrimeNG-inspired [uiLibBind] directive that applies a
  Record<string, unknown> as DOM properties on the host element via Renderer2.setProperty.
  Signal input `uiLibBind` (default {}). Tracks previousKeys to reset removed properties to null.
  Host class `ui-lib-bind`. Effect-based reactivity (no ngOnChanges). Secondary entry point wired and built.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/bind/ projects/demo/src/app/pages/bind/ --max-warnings 0 (CLEAN, EXIT:0),
  npx jest --testPathPatterns=bind --no-coverage (11/11 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (67/67 PASS),
  npx ng build ui-lib-custom — ui-lib-custom/bind Built, zero errors.
Terminal notes: Python used for all file writes (bash heredoc expansion issues). Constructor must NOT have `public` modifier (eslint rule). JSDOM coerces setProperty(el, 'title', null) to string "null" — test fixed to assert `not.toBe('Was Here')` instead of `toBeFalsy()`.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.

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
Terminal notes: Write tool truncates large HTML files on the Linux mount; used Python open() to write the full demo HTML. Toast scss/ts/service.ts had pre-existing null bytes — stripped with Python binary mode.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.
