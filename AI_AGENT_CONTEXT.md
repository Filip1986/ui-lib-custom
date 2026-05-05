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
- **Active focus:** Tag component complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Tag` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)

- `Ripple` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ScrollTop` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `StyleClass` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `FocusTrap` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Fluid` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Inplace` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `MeterGroup` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ProgressSpinner` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `AnimateOnScroll` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Avatar` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `AutoFocus` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Bind` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `BlockUI` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Chip` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ClassNames` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `FocusTrap` -> ✅ complete (directive implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-05-05 [Tag component]
Changed:
  - projects/ui-lib-custom/src/lib/tag/tag.types.ts (new — TagVariant/Size/Severity types)
  - projects/ui-lib-custom/src/lib/tag/tag.ts (new component)
  - projects/ui-lib-custom/src/lib/tag/tag.html (new template — icon span + value span + ng-content)
  - projects/ui-lib-custom/src/lib/tag/tag.scss (new — 3 variants + 3 sizes + 7 severity palettes + dark mode)
  - projects/ui-lib-custom/src/lib/tag/tag.spec.ts (20 unit tests)
  - projects/ui-lib-custom/src/lib/tag/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/tag/README.md (API docs)
  - projects/ui-lib-custom/tag/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/tag/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (tag added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (tag import test added)
  - projects/demo/src/app/pages/tag/tag-demo.component.ts (full demo — replaced placeholder)
  - projects/demo/src/app/pages/tag/tag-demo.component.html (hero + 6 sections + API table)
  - projects/demo/src/app/pages/tag/tag-demo.component.scss (full demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from Tag entry)
  - AI_AGENT_CONTEXT.md (updated)
State: Tag component fully complete. PrimeNG-inspired compact label for status/severity/classification.
  Selector: ui-lib-tag. Inputs: value (string|null), icon (string|null), severity (primary/secondary/
  success/info/warn/danger/contrast, default primary), rounded (boolean, default false),
  size (sm/md/lg, default md), variant (material/bootstrap/minimal|null), styleClass (string|null).
  No outputs. ng-content projection supported for custom content.
  Seven severity palettes: primary (indigo), secondary (grey), success (green), info (blue),
  warn (amber), danger (red), contrast (dark). Minimal variant uses light tinted backgrounds with
  coloured text instead of solid fills. Dark mode tokens provided for minimal variant.
  Bootstrap variant uses classic Bootstrap 5 colours with adjusted info/warn text for contrast.
  role="status" + aria-label on host. Icons marked aria-hidden="true".
  Signal inputs, ViewEncapsulation.None + OnPush + standalone.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/tag/ projects/demo/src/app/pages/tag/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/tag Built, zero errors,
  npx.cmd jest --testPathPatterns=src/lib/tag --no-coverage (20/20 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (79/79 PASS).
Terminal notes: None — straightforward build. No Windows workarounds needed.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [StyleClass directive]
Changed:
  - projects/ui-lib-custom/src/lib/style-class/style-class.ts (new directive)
  - projects/ui-lib-custom/src/lib/style-class/style-class.spec.ts (16 unit tests)
  - projects/ui-lib-custom/src/lib/style-class/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/style-class/README.md (API docs)
  - projects/ui-lib-custom/style-class/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/style-class/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (style-class added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (style-class import test added)
  - projects/demo/src/app/pages/style-class/style-class-demo.component.ts (full demo)
  - projects/demo/src/app/pages/style-class/style-class-demo.component.html (hero + 5 sections + API table)
  - projects/demo/src/app/pages/style-class/style-class-demo.component.scss (full demo styles with fade/slide animations)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from StyleClass entry)
  - AI_AGENT_CONTEXT.md (updated)
State: StyleClass directive fully complete. PrimeNG-inspired utility directive for CSS class-based
  enter/leave transitions on a target element.
  Selector: [uiLibStyleClass]. Required input: uiLibStyleClass (target selector string).
  Special selectors: @next, @prev, @parent, @grandparent (relative to host); any CSS selector resolves
  via document.querySelector.
  Inputs: toggleClass, enterFromClass, enterActiveClass, enterToClass, enterDoneClass,
          leaveFromClass, leaveActiveClass, leaveToClass, leaveDoneClass, hideOnOutsideClick.
  Two modes: toggleClass mode (single class toggle per click) and full transition lifecycle mode
  (enterFrom → rAF → enterActive+enterTo → transitionend/animationend → enterDone).
  500 ms setTimeout fallback ensures directive works when no CSS transition is defined (e.g. in tests).
  hideOnOutsideClick binds a capture-phase document click listener that triggers leave/toggle-off when
  click target is outside both the trigger and the resolved target element.
  Registers click listener runOutsideAngular (no zone-triggered CD). SSR-safe via isPlatformBrowser.
  DestroyRef cleans up all listeners on destroy. Signal inputs, standalone directive.
  Demo: 5 sections (toggle mode, fade animation, slide animation, special selectors, CSS selector) + API table.
  16 unit tests passing. 78/78 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/style-class/ projects/demo/src/app/pages/style-class/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/style-class Built, zero errors,
  npx.cmd jest --testPathPatterns=style-class --no-coverage (16/16 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (78/78 PASS).
Terminal notes:
  1. Signal inputs on directive require fixture.detectChanges() after host.signalField.set(...)
     to propagate new values from parent template bindings to the directive — without this the
     directive still reads the stale initial value from its input() signal.
  2. jest.advanceTimersByTime(600) flushes both rAF (~16 ms) + 500 ms timeout in a single call,
     verifying the full enter/leave cycle completes.
  3. jest.advanceTimersByTime(20) flushes only rAF — useful for testing intermediate state after
     rAF (enterActive added) before the 500 ms fallback fires.
  4. Dispatching new Event('transitionend') on the target after advanceTimersByTime(20) tests the
     explicit transitionend path (fires before the 500 ms timeout).
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [ScrollTop component]
Changed:
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.types.ts (new — ScrollTopVariant/Size/Target/Behavior types)
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.ts (new component)
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.html (new template — button + icon span)
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.scss (new — 3 variants + 3 sizes + window/parent positioning + visibility transition)
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.spec.ts (19 unit tests)
  - projects/ui-lib-custom/src/lib/scroll-top/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/scroll-top/README.md (API docs)
  - projects/ui-lib-custom/scroll-top/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/scroll-top/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (scroll-top added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (scroll-top import test added)
  - projects/demo/src/app/pages/scroll-top/scroll-top-demo.component.ts (full demo)
  - projects/demo/src/app/pages/scroll-top/scroll-top-demo.component.html (hero + 7 sections + API table)
  - projects/demo/src/app/pages/scroll-top/scroll-top-demo.component.scss (full demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from ScrollTop entry)
  - AI_AGENT_CONTEXT.md (updated)
State: ScrollTop component fully complete. PrimeNG-inspired floating "back to top" button.
  Selector: ui-lib-scroll-top. Inputs: threshold (number, 400px), target ('window'|'parent'),
  icon (string, 'pi pi-arrow-up'), behavior ('smooth'|'auto'), buttonAriaLabel (string),
  size (sm/md/lg), variant (material/bootstrap/minimal|null), styleClass (string|null).
  Public writable signal: isVisible (WritableSignal<boolean>).
  target='window': button is position:fixed, responds to window scroll events.
  target='parent': button is position:absolute inside parent, responds to parent scroll events.
  Visibility controlled via --visible class on host (opacity + transform CSS transition for smooth reveal).
  Scroll listener registered runOutsideAngular; signal write triggers OnPush CD automatically.
  SSR safe: uses PLATFORM_ID + isPlatformBrowser. DestroyRef tears down listener on destroy.
  Three variants: material (circular pill + primary colour shadow), bootstrap (square corners + blue shadow),
  minimal (muted surface + border). Button focus-visible outline, active scale(0.94) press feedback.
  Signal inputs, ViewEncapsulation.None + OnPush + standalone. 19 unit tests passing.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/scroll-top/ projects/demo/src/app/pages/scroll-top/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/scroll-top Built, zero errors,
  npx.cmd jest --testPathPatterns=scroll-top --no-coverage (19/19 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (77/77 PASS).
Terminal notes:
  Object.defineProperty(window, 'scrollY', { configurable: true, get: () => mockScrollY }) works
  reliably in JSDOM for mocking the scroll position. Restore with original descriptor in afterEach.
  Signal writes from runOutsideAngular context correctly trigger OnPush change detection in zoneless Jest tests.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [Ripple directive]
Changed:
  - projects/ui-lib-custom/src/lib/ripple/ripple.ts (new directive)
  - projects/ui-lib-custom/src/lib/ripple/ripple.scss (new — host + wave keyframe animation + CSS variables)
  - projects/ui-lib-custom/src/lib/ripple/ripple.spec.ts (17 unit tests)
  - projects/ui-lib-custom/src/lib/ripple/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/ripple/README.md (API docs)
  - projects/ui-lib-custom/ripple/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/ripple/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (ripple added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (ripple import test added)
  - projects/demo/src/app/pages/ripple/ripple-demo.component.ts (full demo — was placeholder)
  - projects/demo/src/app/pages/ripple/ripple-demo.component.html (hero + 5 sections + API tables)
  - projects/demo/src/app/pages/ripple/ripple-demo.component.scss (full demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from Ripple entry)
  - projects/demo/src/styles.scss (added @use for ripple.scss)
  - AI_AGENT_CONTEXT.md (updated)
State: Ripple directive fully complete. PrimeNG-inspired ripple wave directive.
  Selector [uiLibRipple]. Inputs: disabled (boolean, default false), rippleColor (string, inline
  override for --uilib-ripple-color), rippleDuration (string, inline override for --uilib-ripple-duration).
  On click, appends a .ui-lib-ripple-wave <span> sized to max(width, height) of host, positioned at the
  pointer, animated via keyframes (scale 0→3 + opacity 0.7→0) then removed on animationend.
  Host gets position:relative + overflow:hidden via .ui-lib-ripple class (applied via SCSS imported globally).
  Click listener registered runOutsideAngular; disabled checked reactively in handler.
  CSS vars: --uilib-ripple-color (rgba(255,255,255,0.35)), --uilib-ripple-duration (600ms), --uilib-ripple-easing.
  Signal inputs, standalone directive. No ViewEncapsulation (directives don't support it).
  Note: test host must use WritableSignal for reactive input updates in OnPush+zoneless tests.
  JSDOM does not support CSS custom properties via style.setProperty/getPropertyValue — test signal
  values directly via directive injector instead.
  17 unit tests passing. 76/76 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/ripple/ projects/demo/src/app/pages/ripple/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/ripple Built, zero errors,
  npx.cmd jest --testPathPatterns=ripple --no-coverage (17/17 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (76/76 PASS).
Terminal notes:
  1. With OnPush + zoneless, plain property mutations on host component don't trigger signal input updates.
     Test hosts must use WritableSignal properties so signal.set() triggers reactive change propagation.
  2. JSDOM does not support CSS custom property set/get via CSSStyleDeclaration.setProperty/getPropertyValue.
     Test at the Angular signal level (directive.rippleColor()) rather than DOM side-effects.
  3. Directive scss must be imported in demo/src/styles.scss (not via styleUrl — that's components only).
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [ProgressSpinner component]
Changed:
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.types.ts (new — types + PROGRESS_SPINNER_DEFAULTS)
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.ts (new component)
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.html (new template — SVG circle with animated stroke-dashoffset)
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.scss (new — 3 variants + 3 sizes + keyframe animations)
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.spec.ts (19 unit tests)
  - projects/ui-lib-custom/src/lib/progress-spinner/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/progress-spinner/README.md (API docs)
  - projects/ui-lib-custom/progress-spinner/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/progress-spinner/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (progress-spinner added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (progress-spinner import test added)
  - projects/demo/src/app/pages/progress-spinner/progress-spinner-demo.component.ts (full demo)
  - projects/demo/src/app/pages/progress-spinner/progress-spinner-demo.component.html (hero + 7 sections + API table)
  - projects/demo/src/app/pages/progress-spinner/progress-spinner-demo.component.scss (full demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from ProgressSpinner entry)
  - AI_AGENT_CONTEXT.md (updated)
State: ProgressSpinner component fully complete. PrimeNG-inspired animated circular indeterminate loading indicator.
  Inputs: strokeWidth, fill, animationDuration, size (sm/md/lg), variant (material/bootstrap/minimal), styleClass, ariaLabel.
  SVG viewBox="25 25 50 50" with animated circle stroke-dashoffset (arc-chase effect) + rotating SVG.
  material: colour-cycling keyframe animation (red/blue/green/orange), bootstrap: solid primary blue, minimal: muted grey.
  role="status" + aria-busy="true" + aria-label on host for accessibility.
  Signal inputs, ViewEncapsulation.None + OnPush + standalone.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/progress-spinner/ projects/demo/src/app/pages/progress-spinner/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/progress-spinner Built, zero errors,
  npx.cmd jest --testPathPatterns=progress-spinner --no-coverage (19/19 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (75/75 PASS).
Terminal notes: None — straightforward build. No Windows workarounds needed.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [MeterGroup component]
Changed:
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.types.ts (new — MeterItem, MeterSegment, variant/size/orientation/labelPosition types)
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.ts (new component)
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.html (new template — meters bar + start/end legend)
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.scss (new — 3 variants + 3 sizes + horizontal/vertical + --uilib-meter-group-* tokens)
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.spec.ts (24 unit tests)
  - projects/ui-lib-custom/src/lib/meter-group/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/meter-group/README.md (API docs)
  - projects/ui-lib-custom/meter-group/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/meter-group/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (meter-group added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (meter-group import test added)
  - projects/demo/src/app/pages/meter-group/meter-group-demo.component.ts (full demo)
  - projects/demo/src/app/pages/meter-group/meter-group-demo.component.html (hero + 7 sections + API tables)
  - projects/demo/src/app/pages/meter-group/meter-group-demo.component.scss (full demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from MeterGroup entry)
  - AI_AGENT_CONTEXT.md (updated)
State: MeterGroup component fully complete. PrimeNG-inspired segmented meter bar.
  Inputs: values (MeterItem[]), min, max, orientation (horizontal/vertical), showLabels,
  labelPosition (start/end), size (sm/md/lg), variant (material/bootstrap/minimal), styleClass.
  Segments computed with clamped percentage. Legend is a <ul> with swatch + label + value.
  role="group" on meter container, role="meter" + aria-valuenow/min/max on each segment.
  Three variants: material (pill), bootstrap (square, no gap), minimal (flat, 2px radius).
  Note: SCSS compound BEM modifier selector &--foo&--bar is invalid — must nest as &--foo { &.parent--bar { ... } }.
  Signal inputs, ViewEncapsulation.None + OnPush + standalone.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/meter-group/ projects/demo/src/app/pages/meter-group/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/meter-group Built, zero errors,
  npx.cmd jest --testPathPatterns=meter-group --no-coverage (24/24 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (74/74 PASS).
Terminal notes: SCSS compound modifier selectors like &--foo&--bar fail with "& may only be used at
  beginning of a compound selector". Fix: nest as &--foo { &.full-class-name--bar { ... } }.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [Inplace component]
Changed:
  - projects/ui-lib-custom/src/lib/inplace/inplace.types.ts (new — InplaceVariant type)
  - projects/ui-lib-custom/src/lib/inplace/inplace.ts (new component)
  - projects/ui-lib-custom/src/lib/inplace/inplace.html (new template — CSS-toggle display/content slots)
  - projects/ui-lib-custom/src/lib/inplace/inplace.scss (new — 3 variants + --uilib-inplace-* tokens)
  - projects/ui-lib-custom/src/lib/inplace/inplace.spec.ts (21 unit tests)
  - projects/ui-lib-custom/src/lib/inplace/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/inplace/README.md (API docs)
  - projects/ui-lib-custom/inplace/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/inplace/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (inplace added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (inplace import test added)
  - projects/demo/src/app/pages/inplace/inplace-demo.component.ts (full demo — was placeholder)
  - projects/demo/src/app/pages/inplace/inplace-demo.component.html (hero + 6 sections + API table)
  - projects/demo/src/app/pages/inplace/inplace-demo.component.scss (full demo styles)
  - AI_AGENT_CONTEXT.md (updated)
State: Inplace component fully complete. PrimeNG-inspired inline editing component.
  Uses CSS-toggle pattern (both slots always in DOM, hidden by --hidden modifier class) to preserve
  ng-content projection. Attribute slot selectors: [inplaceDisplay] / [inplaceContent].
  model() for two-way active binding. Outputs: activated / deactivated. Three variants:
  material (indigo hover + dashed border), bootstrap (squarer corners), minimal (grey hover).
  Signal inputs/model, ViewEncapsulation.None + OnPush + standalone.
  Note: test host uses `activeState` (not `active`) as the WritableSignal name to avoid Angular
  template compiler confusing the host property with the child component's [active] input binding.
  21 unit tests passing. 73/73 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/inplace/ projects/demo/src/app/pages/inplace/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/inplace Built, zero errors,
  npx.cmd jest --testPathPatterns src/lib/inplace --no-coverage (21/21 PASS),
  npx.cmd jest --testPathPatterns entry-points --no-coverage (73/73 PASS).
Terminal notes: When test host has a WritableSignal named same as the child component input (e.g.
  `active`), Angular template compiler produces "ctx.active is not a function" at runtime.
  Rename the host signal (e.g. `activeState`) and use explicit [active]="activeState()" (activeChange)="activeState.set($event)" syntax.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [Fluid component + directive]
Changed:
  - projects/ui-lib-custom/src/lib/fluid/fluid.ts (new — Fluid component + FluidDirective)
  - projects/ui-lib-custom/src/lib/fluid/fluid.html (new template — <ng-content />)
  - projects/ui-lib-custom/src/lib/fluid/fluid.scss (new — .ui-lib-fluid cascade rules)
  - projects/ui-lib-custom/src/lib/fluid/fluid.spec.ts (8 unit tests)
  - projects/ui-lib-custom/src/lib/fluid/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/fluid/README.md (API docs)
  - projects/ui-lib-custom/fluid/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/fluid/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (fluid added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (fluid import test added)
  - projects/demo/src/app/pages/fluid/fluid-demo.component.ts (full demo)
  - projects/demo/src/app/pages/fluid/fluid-demo.component.html (hero + 4 sections + API tables)
  - projects/demo/src/app/pages/fluid/fluid-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from Fluid entry)
  - AI_AGENT_CONTEXT.md (updated)
State: Fluid component fully complete. Exports Fluid (component, selector ui-lib-fluid) and
  FluidDirective (directive, selector [uiLibFluid]). Both apply the .ui-lib-fluid CSS class
  which cascades width:100%/box-sizing:border-box onto native form elements and all ui-lib-*
  component hosts. FluidDirective uses booleanAttribute transform so attribute-only usage
  (<div uiLibFluid>) works. Fluid component has a styleClass input. Demo has 4 sections:
  component usage, directive usage, conditional fluid toggle, attribute shorthand + API tables.
  8 unit tests passing. 72/72 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/fluid/ projects/demo/src/app/pages/fluid/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/fluid Built, zero errors,
  npx.cmd jest --testPathPatterns="src/lib/fluid" --no-coverage (8/8 PASS),
  npx.cmd jest --testPathPatterns="entry-points" --no-coverage (72/72 PASS).
Terminal notes: None — straightforward build. No Windows workarounds needed.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [FocusTrap directive]
Changed:
  - projects/ui-lib-custom/src/lib/focus-trap/focus-trap.ts (new Angular directive)
  - projects/ui-lib-custom/src/lib/focus-trap/focus-trap.spec.ts (9 unit tests)
  - projects/ui-lib-custom/src/lib/focus-trap/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/focus-trap/README.md (API docs)
  - projects/ui-lib-custom/focus-trap/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/focus-trap/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (focus-trap added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (focus-trap import test added)
  - projects/demo/src/app/pages/focus-trap/focus-trap-demo.component.ts (full demo)
  - projects/demo/src/app/pages/focus-trap/focus-trap-demo.component.html (hero + 4 sections + API tables)
  - projects/demo/src/app/pages/focus-trap/focus-trap-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from FocusTrap entry)
  - AI_AGENT_CONTEXT.md (updated)
State: FocusTrap directive fully complete. Angular wrapper around the existing FocusTrap class in core.
  Selector [uiLibFocusTrap]. Single boolean input with booleanAttribute transform so attribute
  presence (<div uiLibFocusTrap>) is equivalent to [uiLibFocusTrap]="true". Uses effect() to
  activate/deactivate reactively. ngOnDestroy releases the trap and restores prior focus.
  Demo has: basic usage (static trap), toggle on/off, modal overlay pattern, full API tables.
  9 unit tests passing. 71/71 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/focus-trap/ projects/demo/src/app/pages/focus-trap/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/focus-trap Built, zero errors,
  npx.cmd jest --testPathPatterns="src/lib/focus-trap" --no-coverage (9/9 PASS),
  npx.cmd jest --testPathPatterns="entry-points" --no-coverage (71/71 PASS).
Terminal notes: Signal inputs receive "" (empty string) when used as plain attributes (<div uiLibFocusTrap>).
  Must use booleanAttribute transform: input<boolean, boolean | string>(true, { transform: booleanAttribute })
  so attribute presence maps to true. effect() in zoneless tests requires TestBed.flushEffects() after
  fixture.detectChanges() — a detectAndFlush() helper keeps this consistent.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [ClassNames utility]
Changed:
  - projects/ui-lib-custom/src/lib/class-names/class-names.ts (new — classNames function + ClassNamesPipe)
  - projects/ui-lib-custom/src/lib/class-names/class-names.spec.ts (27 unit tests)
  - projects/ui-lib-custom/src/lib/class-names/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/class-names/README.md (API docs)
  - projects/ui-lib-custom/class-names/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/class-names/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (class-names added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (class-names import test added)
  - projects/demo/src/app/pages/class-names/class-names-demo.component.ts (full demo)
  - projects/demo/src/app/pages/class-names/class-names-demo.component.html (hero + 3 sections + API table)
  - projects/demo/src/app/pages/class-names/class-names-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from ClassNames entry)
  - AI_AGENT_CONTEXT.md (updated)
State: ClassNames fully complete. Pure utility — no component/template/styles in the library.
  Exports `classNames()` function and standalone `ClassNamesPipe` (pipe name: classNames).
  ClassNameValue type accepts: string, null, undefined, false, Record<string, boolean>, and nested arrays.
  27 unit tests (function + pipe). 70/70 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/class-names/ projects/demo/src/app/pages/class-names/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/class-names Built, zero errors,
  npx.cmd jest --testPathPatterns=class-names --no-coverage (27/27 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (70/70 PASS).
Terminal notes: `const isActive: boolean = true` is narrowed by TypeScript, causing
  @typescript-eslint/no-unnecessary-condition on `isActive && expr` in tests. Use Math.random() > -1
  to produce a runtime-unknown boolean that prevents the narrowing.
Next step: knip baseline + dead-code cleanup, or next component from queue.

Date: 2026-05-05 [Chip component]
Changed:
  - projects/ui-lib-custom/src/lib/chip/chip.types.ts (new)
  - projects/ui-lib-custom/src/lib/chip/chip.ts (new component)
  - projects/ui-lib-custom/src/lib/chip/chip.html (new template)
  - projects/ui-lib-custom/src/lib/chip/chip.scss (new styles)
  - projects/ui-lib-custom/src/lib/chip/chip.spec.ts (19 unit tests)
  - projects/ui-lib-custom/src/lib/chip/index.ts (barrel)
  - projects/ui-lib-custom/src/lib/chip/README.md (API docs)
  - projects/ui-lib-custom/chip/ng-package.json (secondary entry point)
  - projects/ui-lib-custom/chip/package.json (secondary entry point)
  - projects/ui-lib-custom/package.json (chip added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (chip import test added)
  - projects/demo/src/app/pages/chip/chip-demo.component.ts (full demo)
  - projects/demo/src/app/pages/chip/chip-demo.component.html (full demo — hero + 8 sections + API table)
  - projects/demo/src/app/pages/chip/chip-demo.component.scss (demo styles)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' from Chip entry)
  - AI_AGENT_CONTEXT.md (updated)
State: Chip component fully complete. PrimeNG-inspired compact tag/badge component.
  Supports label, icon (leading, hidden when image is set), image (circular thumbnail),
  and a removable close button that emits a `removed` output (MouseEvent).
  Three sizes: sm / md / lg. Three variants: material (pill + shadow), bootstrap (square corners),
  minimal (muted surface + border). Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone.
  Note: output named `removed` (not `onRemove`) to satisfy @angular-eslint/no-output-on-prefix rule.
  19 unit tests passing. 69/69 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/chip/ projects/demo/src/app/pages/chip/ --max-warnings 0 (CLEAN, EXIT:0),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/chip Built, zero errors,
  npx.cmd jest --testPathPatterns=chip --no-coverage (19/19 PASS),
  npx.cmd jest --testPathPatterns=entry-points --no-coverage (69/69 PASS).
Terminal notes: Angular ESLint rejects outputs prefixed with "on" — use `removed` not `onRemove`.
  `textContent!.trim()` (non-null assertion) required in specs; `?.` and `?? ''` both trigger ESLint warnings.
Next step: knip baseline + dead-code cleanup, or next component from queue.

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


