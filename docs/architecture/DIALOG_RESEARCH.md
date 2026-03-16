# Dialog Research (Phase 1)

> Status: Design phase document. For current shipped behavior and maintainer guidance, see `docs/implementation/DIALOG_IMPLEMENTATION.md`.

## Goal

Define a v1 `ui-lib-dialog` scope and identify the missing overlay infrastructure needed to support Dialog now and future overlay components (Toast, Dropdown, Tooltip).

This document is based on:

- `AI_AGENT_CONTEXT.md` (hard constraints, component inventory, entry-point rules)
- `LIBRARY_CONVENTIONS.md` (active conventions, typing, styling, architecture)
- `projects/ui-lib-custom/src/lib/accordion/` (complex container + animation pattern)
- `projects/ui-lib-custom/src/lib/tabs/` (keyboard navigation and focus behavior)
- `projects/ui-lib-custom/src/lib/core/` (shared types/constants)
- Current root `package.json` dependency set

## PrimeNG Feature Mapping

> Note: PrimeNG prop/template names can vary slightly by version. Names below reflect common/current API naming and should be validated against the exact PrimeNG version used for parity checks.

| Feature | PrimeNG Prop / Template | Priority | Notes for `ui-lib-dialog` |
|---|---|---|---|
| Visible binding | `[(visible)]` | P0 | Required controlled/uncontrolled visibility contract for Angular signals + `visibleChange` output parity. |
| Modal vs non-modal | `modal` | P0 | Required to establish overlay/backdrop behavior baseline for all future overlay components. |
| Header projection | `header` and header template slot (`#header` / `pTemplate="header"`) | P0 | Support projected header for composition-first API shape. |
| Footer projection | footer template slot (`#footer` / `pTemplate="footer"`) | P0 | Required action area customization; avoid button API explosion. |
| Closable | `closable` | P0 | Required close affordance (icon/button) and emitted close reason semantics. |
| Close on Escape | `closeOnEscape` | P0 | Use `KEYBOARD_KEYS.Escape` from `core`; must respect modal/non-modal behavior. |
| Responsive breakpoints | `breakpoints` | P0 | Required to adapt width/max-width at runtime for demo + production usage. |
| ARIA compliance | `role`, `aria-labelledby`, `aria-modal`, `closeAriaLabel` | P0 | Must ship with complete role/labeling strategy and keyboard expectations. |
| Scroll lock | `blockScroll` | P0 | Required body scroll lock for modal dialogs with safe unlock lifecycle. |
| Focus trap | `focusTrap` | P0 | Required keyboard containment and focus restoration on close. |
| Maximizable | `maximizable` | P1 | Nice-to-have for app shell/dense data workflows; depends on robust sizing state model. |
| Position presets (9) | `position` | P1 | Include all 9 positions to match expected overlay placement coverage. |
| Draggable | `draggable` | P1 | Useful but adds pointer lifecycle complexity and viewport constraints. |
| Dismissable mask | `dismissableMask` | P1 | Needs precise outside-click handling and close reason differentiation. |
| Long content auto-scroll | typically `contentStyle` / `contentStyleClass` patterns | P1 | Provide default content max-height + overflow behavior using design tokens. |
| Headless mode | headless template (`#headless`) | P1 | Enables fully custom markup while reusing overlay shell and behavior. |
| Resizable | `resizable` | P2 | Defer; high interaction complexity and testing matrix. |
| RTL behavior | inherited `rtl`/direction support | P2 | Defer explicit API; rely on document/container direction for v1 unless required by consumers. |
| Dynamic Dialog service | `DialogService` + dynamic component loading | P2 | Defer; needs service-level overlay registry and lifecycle APIs. |
| Append target | `appendTo` | P2 | Defer; requires portal/host abstraction and SSR-safe target resolution. |
| Layering manager | `autoZIndex`, `baseZIndex` | P2 | Defer full public API; implement internal strategy first, expose later if needed. |
| Keep in viewport | `keepInViewport` | P2 | Defer until draggable/resizable are in scope. |

## Infrastructure Inventory (Exists vs Needed)

| Capability | Exists today | Needed for Dialog |
|---|---|---|
| Keyboard key constants | `core/shared/constants.ts` exports `KEYBOARD_KEYS` including `Escape`, `Tab` | Reuse as-is; add dialog-specific key handling contract. |
| Signal-based controlled/uncontrolled pattern | Strong examples in `tabs.ts` and `accordion.ts` | Reuse pattern for `visible/defaultVisible` and `visibleChange`. |
| ARIA + keyboard navigation patterns | Present in `tabs` and `accordion` | Add dialog-specific role/label/focus trap semantics. |
| Animation approach | Accordion SCSS uses tokenized transitions and layered wrappers | Create dialog animation tokens + shared overlay motion pattern (enter/leave). |
| Theme variant resolution | `ThemeConfigService.variant()` already used in components | Reuse for dialog variants; no immediate service API change required for variant selection. |
| Overlay/backdrop primitives | Not present | Create overlay/backdrop primitives (container, mask, outside-click handling, close reasons). |
| Scroll lock manager | Not present | Create reference-counted scroll lock utility to handle nested overlays safely. |
| Focus trap utility | Not present | Create core a11y utility to cycle tab focus and restore trigger focus on close. |
| Z-index stacking strategy | Not present | Create internal overlay stack manager (`nextLayer`, `releaseLayer`) for nested overlays and future components. |
| Runtime breakpoint evaluator | Not present | Create media query evaluator utility (using `matchMedia` with SSR guards). |
| Overlay design tokens | No dedicated overlay/dialog token group in `design-tokens.ts` | Add dialog/overlay token set (surface, shadow, radius, mask, motion, spacing, z-layers). |

## Dependency and Conflict Analysis

### Existing dependencies and architecture fit

- No Angular CDK dependency is present in `package.json`; current library trend favors custom primitives and narrow dependencies.
- `ThemeConfigService` already maps presets to runtime custom properties; dialog can consume overlay design tokens once they exist.
- `tabs.ts` includes browser guards around runtime DOM APIs (for example `getComputedStyle` checks), which is a good precedent for overlay SSR-safe guards.

### Potential conflicts

- **Scroll lock vs layout primitives:** modal scroll lock on `document.body` can conflict with app layouts using internal scroll containers. Dialog v1 should lock the root scroll target only when using modal mode and document behavior clearly.
- **Nested overlay behavior:** without stack/reference counting, closing one overlay can incorrectly unlock scroll or drop z-index order for remaining overlays.
- **Theme token coverage:** current tokens and theme mixins have no explicit overlay mask/layer tokens; fallback-heavy styles would increase drift across variants.
- **Animation consistency:** accordion has component-local animation patterns, but no shared overlay motion contract. Reusing ad-hoc styles risks inconsistent motion across future overlays.

### ThemeConfigService impact

- **What exists:** variant/mode/preset runtime variable application is already in place.
- **What may be needed:** add overlay/dialog token fields in token/preset mapping if overlay values must be user-configurable via preset JSON and ThemeEditor.
- **What is not required for v1 shell:** no mandatory `ThemeConfigService` API redesign to ship a basic dialog if dialog tokens are consumed as standard custom properties.

### Accordion animation extraction question

- **Current state:** accordion animation logic is primarily SCSS-local (`grid-template-rows`, opacity, tokenized durations), not a shared TypeScript utility.
- **Recommendation:** do not extract accordion internals directly; instead define a new overlay motion token contract and optional shared SCSS mixin for enter/leave transitions under shared styles.

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| SSR breakage from direct `window`/`document` access in scroll lock, focus trap, or breakpoints | High | Medium | Inject `DOCUMENT`, derive `defaultView`, and no-op gracefully when unavailable. |
| Focus trap edge cases (no tabbables, disabled elements, shadow DOM boundaries) | High | Medium | Implement tested tabbable-query utility + fallback to dialog container focus; add a11y unit tests. |
| Scroll lock leak on nested dialogs | High | Medium | Reference-counted lock manager with deterministic acquire/release in lifecycle hooks. |
| Incorrect layering for concurrent overlays | High | Medium | Central overlay stack service with monotonic z-index allocation and cleanup on destroy. |
| Outside click false positives with drag interactions | Medium | Medium | Track pointer down/up targets and close only on true mask click path. |
| Breakpoint listeners leaking on destroy | Medium | Medium | Encapsulate media query listeners in utility with explicit teardown; test destroy path. |
| API creep in v1 | Medium | Medium | Keep P0 as hard scope gate; treat P1 as optional by milestone capacity. |

## CDK vs Custom Decision

### Recommendation

Use a **custom overlay/focus implementation** for v1 to stay aligned with the library's zero-extra-dependency direction and keep API ownership local.

### Tradeoffs

- **Custom approach pros:** no new dependency weight, full API control, patterns reusable across all `ui-lib-*` overlays.
- **Custom approach cons:** more engineering/testing effort for a11y and stacking correctness.
- **CDK approach pros:** mature overlay/a11y primitives, reduced implementation risk.
- **CDK approach cons:** added dependency footprint and potential divergence from current library architecture.

## Recommended Implementation Order

1. **Overlay foundation (P0 prerequisite)**
   - Create internal overlay utilities for stack management, scroll lock, focus trap, and SSR-safe document/window access.
2. **Dialog v1 shell (P0 core)**
   - Implement visibility contract, modal/non-modal, header/footer projection, closable behavior, Escape close, and ARIA baseline.
3. **Responsive + content behavior (P0 completion)**
   - Add breakpoint evaluation and long-content default overflow handling.
4. **Design token and variant integration**
   - Add dialog/overlay design tokens and map to component-level custom properties for all variants.
5. **Hardening and tests**
   - Unit + a11y tests for focus trap, scroll lock, Escape/mask interactions, nested overlays, and SSR-guard behavior.
6. **Selective P1 expansion**
   - Add `dismissableMask`, position presets, and maximizable first; defer draggable/headless if scope pressure appears.
7. **P2 backlog planning**
   - Track resizable, dynamic dialog service, append target, and public z-index APIs as explicit post-v1 milestones.

## Summary: What exists vs what must be created

- **Exists:** signals-first state patterns, keyboard constants, variant integration pattern, strong conventions for explicit typing and `ViewEncapsulation.None`.
- **Must be created:** overlay infrastructure layer (stack, backdrop, scroll lock, focus trap, breakpoints), dialog/overlay design token group, and overlay-specific testing strategy.
- **Key architectural decision for v1:** custom overlay primitives now, with internal APIs shaped so Toast/Dropdown/Tooltip can reuse them.
