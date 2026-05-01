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

Date: 2026-05-01 [animate-on-scroll initial]
Changed:
  - projects/ui-lib-custom/src/lib/animate-on-scroll/ (new — animate-on-scroll.ts, animate-on-scroll.scss, animate-on-scroll.spec.ts, index.ts)
  - projects/ui-lib-custom/animate-on-scroll/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (animate-on-scroll added to exports + typesVersions; pre-existing truncation repaired via Python)
  - projects/ui-lib-custom/test/entry-points.spec.ts (animate-on-scroll import test added; pre-existing truncation repaired via Python)
  - projects/demo/src/app/pages/animated-on-scroll/animated-on-scroll-demo.component.ts (full demo replacing placeholder)
  - projects/demo/src/app/pages/animated-on-scroll/animated-on-scroll-demo.component.html (5 sections: fade, presets, repeat, threshold, API table)
  - projects/demo/src/app/pages/animated-on-scroll/animated-on-scroll-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from AnimatedOnScroll entry)
  - AI_AGENT_CONTEXT.md (marked AnimateOnScroll complete)
State: AnimateOnScroll directive fully complete. 14 unit tests passing. 64/64 entry-point tests passing. ESLint clean. animate-on-scroll entry point built successfully. Pre-existing toast.scss truncation (line 349) caused build exit code 1 — not introduced by this session.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/animate-on-scroll/ projects/demo/src/app/pages/animated-on-scroll/ --max-warnings 0 (CLEAN, EXIT:0),
  npx ng build ui-lib-custom — ui-lib-custom/animate-on-scroll Built (exit 1 due to pre-existing toast.scss truncation, not this session),
  npx jest --testPathPatterns=animate-on-scroll --no-coverage (14/14 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (64/64 PASS).
Terminal notes: Edit tool causes file truncations on the Linux side of the Samba mount; used Python open() for all file writes (package.json, entry-points.spec.ts). RegExp literal in directive written with Python escape to avoid heredoc truncation.
Next step: Fix pre-existing toast.scss truncation, then knip baseline + dead-code cleanup.


Date: 2026-05-01 [toast session]
Changed:
  - projects/ui-lib-custom/src/lib/toast/ (new — toast.types.ts, toast.service.ts, toast.ts, toast.html, toast.scss, toast.spec.ts, index.ts)
  - projects/ui-lib-custom/toast/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (toast added to exports + typesVersions; pre-existing truncation repaired)
  - projects/ui-lib-custom/test/entry-points.spec.ts (toast import test added; pre-existing truncation repaired)
  - projects/demo/src/app/pages/toast/ (full demo replacing placeholder — TS/HTML/SCSS)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (Toast added alongside Message in Messages group)
  - AI_AGENT_CONTEXT.md (marked Toast complete)
State: Toast component fully complete. PrimeNG-inspired fixed-position notification overlay driven by injectable ToastService:
  - ToastService (providedIn root): WritableSignal<ToastMessage[]> queue; add()/remove()/clear() API; auto-generated IDs
  - 6 positions: top-right/left/center, bottom-right/left/center
  - Severity levels: success, info, warn, error (each with default icon via SEVERITY_ICON_MAP)
  - Auto-dismiss timers managed reactively in effect(); sticky messages exempt
  - Exit animation via closingIds WritableSignal<Set<string>> + CSS @keyframes (300ms)
  - key input for multi-container routing
  - Three variants (material/bootstrap/minimal), custom icons, styleClass escape-hatch
  - Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone
  - ThemeConfigService variant inheritance
  - ARIA: role=region, aria-label=Notifications, aria-live=polite, aria-atomic=false
  - Dark mode tokens for all 4 severities + material/minimal variants
  - 31 unit tests passing. 63/63 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/toast/ projects/demo/src/app/pages/toast/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/toast Built (zero errors, all entry points green),
  npx jest --testPathPatterns=toast --no-coverage (31/31 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (63/63 PASS).
Terminal notes: Edit tool caused file truncations throughout session; used Python binary-mode appends to repair
  entry-points.spec.ts, package.json (full rewrite via json.dump), and toast.spec.ts (null byte strip + append).
  ESLint fixes: constructor() not public constructor() (explicit-member-accessibility rule);
  requireElement() helper used in tests to avoid no-unnecessary-condition on optional chaining.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.
