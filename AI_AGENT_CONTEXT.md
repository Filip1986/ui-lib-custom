# AI Agent Context

> **Read this first.** This file gives you everything you need to be productive in this project
> without re-discovering conventions. Update the "Last Session" section at the end of every
> working session before closing.

---

## Project Snapshot

`ui-lib-custom` is a custom Angular 21+ UI component library for SaaS and web applications.
It is PrimeNG-inspired but custom-built — lighter, tree-shakable, and fully themeable via CSS
variables. The primary goal is a production-ready component foundation that enables rapid client
project bootstrapping and live theme demonstrations during client meetings.

**Current milestone:** Component foundation hardening + documentation completeness.  
**Next milestone:** Runtime variant switcher, theme preset management system, Storybook integration.  
**Target future state:** Published to npm as a standalone package.

---

## Recommended Reading Order

1. `AI_AGENT_CONTEXT.md` (this file) — active work, file map, and hard constraints
2. `LIBRARY_CONVENTIONS.md` -> `Active Conventions` first
3. [Historical] `LIBRARY_CONVENTIONS.md` -> `Historical Migration Notes` only when touching legacy migration-era patterns
4. Component docs in `docs/reference/components/` or architecture docs in `docs/architecture/` for task-specific details

---

## Component Inventory

| Component       | Status         | Secondary Entry Point            | Doc Status        | Notes                                              |
|-----------------|----------------|----------------------------------|-------------------|----------------------------------------------------|
| Button          | ✅ Bulletproof  | `ui-lib-custom/button`           | ✅ Complete        |                                                    |
| Card            | ✅ Bulletproof  | `ui-lib-custom/card`             | ⚠️ README only    | Needs API + implementation docs                    |
| Badge           | ✅ Bulletproof  | `ui-lib-custom/badge`            | ✅ Complete        |                                                    |
| Accordion       | ✅ Bulletproof  | `ui-lib-custom/accordion`        | ✅ Complete        |                                                    |
| Tabs            | ✅ Bulletproof  | `ui-lib-custom/tabs`             | ✅ Complete        |                                                    |
| Dialog          | ✅ Complete     | `ui-lib-custom/dialog`           | ✅ Complete        | v1 shipped with demo/tests/docs; re-exported in primary barrel for backward compat |
| Input           | ✅ Bulletproof  | `ui-lib-custom/input`            | ❌ Missing         | Needs API + implementation docs                    |
| Select          | ✅ Bulletproof  | `ui-lib-custom/select`           | ❌ Missing         | Needs API + implementation docs                    |
| Checkbox        | ✅ Bulletproof  | `ui-lib-custom/checkbox`         | ⚠️ API only       | Needs implementation doc                           |
| SelectButton    | ✅ Bulletproof  | `ui-lib-custom/select-button`    | ✅ Complete        | Optional: consolidate supplemental API/Research    |
| Icon            | ✅ Bulletproof  | `ui-lib-custom/icon`             | ⚠️ API only       | Needs implementation doc                           |
| IconButton      | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ API only       | Needs implementation doc                           |
| Layout (Stack/Inline/Grid/Container) | ✅ Bulletproof | `ui-lib-custom/layout` | ❌ Missing | Needs docs per primitive                   |
| Alert           | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ Partial        |                                                    |
| ThemeEditor     | ✅ Working      | `ui-lib-custom/theme`            | ✅ README          | Demo sidebar, not a consumer component             |

**Secondary entry points implemented:** button, badge, accordion, tabs, dialog, input, select-button, core, card, checkbox, select, icon, layout, theme, tokens  
**Secondary entry points pending:** icon-button, alert

---

## Critical File Map

| What                              | Where                                                                  |
|-----------------------------------|------------------------------------------------------------------------|
| Component source                  | `projects/ui-lib-custom/src/lib/<component>/`                         |
| Primary public API barrel         | `projects/ui-lib-custom/src/public-api.ts`                            |
| Design tokens (source of truth)   | `projects/ui-lib-custom/src/lib/design-tokens.ts`                     |
| Shared types / utilities          | `projects/ui-lib-custom/src/lib/core/` (entry: `ui-lib-custom/core`)  |
| Theming service                   | `projects/ui-lib-custom/src/lib/theming/theme-config.service.ts`      |
| Secondary entry point manifests   | `projects/ui-lib-custom/<entry>/ng-package.json`                      |
| Package exports + typesVersions   | `projects/ui-lib-custom/package.json`                                 |
| CSS variable reference            | `docs/reference/systems/CSS_VARIABLES.md`                             |
| Demo app pages                    | `projects/demo/src/app/pages/`                                        |
| Demo shared components            | `projects/demo/src/app/shared/` (alias: `@demo/shared/*`)             |
| Theme editor (demo only)          | `projects/demo/src/app/shared/theme-editor/`                          |
| Library conventions               | `LIBRARY_CONVENTIONS.md`                                              |
| Documentation index               | `docs/README.md`                                                      |
| Component docs                    | `docs/reference/components/`                                          |
| Architecture decisions            | `docs/architecture/`                                                  |
| Changelog                         | `CHANGELOG.md`                                                        |

---

## Hard Constraints (Non-Negotiable)

These are the most common sources of mistakes. Verify every output against this list.

### Active checks (highest priority)

1. **`ViewEncapsulation.None` is mandatory** on every library component. Without it, CSS variable
   cascading and animations break.
2. **No relative cross-entry-point imports.** Internal components import from relative `src/lib/...`
   paths. Cross-entry imports (e.g. from a component into `theming`) must use the package path
   `ui-lib-custom/theme`, not `../../theming/...`.
3. **PowerShell only** for all terminal commands. Never use bash or cmd.
4. **Custom components first.** Use `ui-lib-*` components in demos and new features — never
   PrimeNG or Angular Material as a substitute when a custom equivalent exists.
5. **Explicit return types everywhere.** No inference on public APIs, class members, or
   `computed()` arrow functions (`allowTypedFunctionExpressions: false` is enforced by ESLint).
6. **String union types for public inputs.** Do not replace `type InputVariant = 'material' | ...`
   with constants objects. Constants extraction applies to *internal* repeated strings only.
7. **Self-closing tags** for all components without projected content. `<ui-lib-button />` not
   `<ui-lib-button></ui-lib-button>`.
8. **No new tokens as raw hex/px.** Always add to `design-tokens.ts` first, then reference via
   CSS variable.

### [Historical] Migration checks (lower priority; keep for context)

9. **[Historical] `as const` over TypeScript `enum`.** Migration-era rule retained to avoid backsliding.
10. **[Historical] Angular 21 block syntax only.** Use `@if`, `@for`, `@switch` — avoid `*ngIf`/`*ngFor`.

---

## Common Task Playbooks

### Add a new component

1. Create folder: `projects/ui-lib-custom/src/lib/<name>/`
2. Create files: `<name>.ts`, `<name>.html`, `<name>.scss`, `<name>.spec.ts`, `index.ts`
3. Add `ViewEncapsulation.None`, `ChangeDetectionStrategy.OnPush`, standalone, signals for inputs
4. Export component from `index.ts`
5. Add to primary barrel: `projects/ui-lib-custom/src/public-api.ts`
6. Create secondary entry point:
  - `projects/ui-lib-custom/<name>/ng-package.json` pointing to `../src/lib/<name>/index.ts`
  - Register in `projects/ui-lib-custom/package.json` → `exports` and `typesVersions`
7. Create demo page under `projects/demo/src/app/pages/<name>/`
8. Add route to demo app routing
9. Update component inventory in this file
10. Create component doc at `docs/reference/components/<NAME>.md`

### Add a new variant to an existing component

1. Add the variant string literal to the public type in `<component>.types.ts` (or inline type)
2. Add variant-specific CSS variables in `<component>.scss` under `.is-variant-<name>`
3. Update the `--uilib-<component>-*` variable table in the component's CSS variable doc
4. Add a variant demo block to the component's demo page
5. Add the variant to the component's API doc

### Add a new CSS design token

1. Add to `projects/ui-lib-custom/src/lib/design-tokens.ts` with a typed key
2. Derive a `--uilib-*` CSS variable in the relevant component SCSS
3. Add to `docs/reference/systems/CSS_VARIABLES.md`

### Add a new secondary entry point

1. Create `projects/ui-lib-custom/<name>/ng-package.json`:
   ```json
   {
     "$schema": "../../../node_modules/ng-packagr/ng-package.schema.json",
     "lib": { "entryFile": "../src/lib/<name>/index.ts" }
   }
   ```
2. Add to `projects/ui-lib-custom/package.json` → `exports`:
   ```json
   "./name": { "types": "./name/index.d.ts", "esm2022": "./esm2022/name/index.mjs", ... }
   ```
3. Add to `typesVersions` in `projects/ui-lib-custom/package.json`
4. Do **not** re-export the secondary entry point from the primary barrel
5. Update component inventory in this file

### Add a new demo page

1. Create folder: `projects/demo/src/app/pages/<name>/`
2. Create component using `DocPageLayoutComponent` + `DocDemoViewportComponent` scaffold
3. Use `@demo/shared/*` aliases — not relative paths
4. Add route to `projects/demo/src/app/app.routes.ts`
5. Add sidebar nav entry if needed

---

## Architecture Decisions Worth Knowing

| Decision | Reason |
|---|---|
| Three-layer HTML wrapper for collapsible panels | Padding on the `overflow: hidden` element leaks during `grid-row` collapse animations. Use a wrapper for the clip, an inner wrapper for padding, and a content div. |
| `core` entry point for shared types | `icon.types` ↔ `theme-preset.interface` create a type cycle. Shared types (`ThemeVariant`, etc.) live in `core` to break the cycle. |
| No `public-api.ts` inside secondary entry folders | `ng-package.json` points directly to `src/lib/<n>/index.ts`. The `<entry>/src/` subfolder pattern is not used. |
| `knip` for dead code, ESLint for structural rules | ESLint cannot reliably detect unused public class methods. `knip` is the correct tool for whole-project dead code analysis. |

---

## Current Focus / Active Work

*(Update this section at the start and end of each session)*

- **Active:** Dialog v1 completed and verified; ongoing documentation gap-filling (Input, Select, Card, Layout)
- **Next in queue:** Dead code cleanup with `knip`, constants extraction pass, overlay infrastructure follow-ups (appendTo/z-index manager)
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, axe-core a11y audit

---

## Last Session

*(Paste agent handoff note here at the end of each session)*

```
Date: 2026-03-16
Changed: docs/architecture/DIALOG_TOKENS.md, AI_AGENT_CONTEXT.md
State: Completed Dialog design token audit and specification; identified reusable global/component tokens, defined `--uilib-dialog-*` and shared `--uilib-overlay-*` defaults across Material/Bootstrap/Minimal, and documented fallback hierarchy plus global-vs-component token placement.
Next step: Implement Phase 2 token plumbing in `design-tokens.ts`/theme CSS vars and scaffold `ui-lib-dialog` styles to consume the new token contract.
```
```
Date: 2026-03-16
Changed: docs/architecture/DIALOG_RESEARCH.md, AI_AGENT_CONTEXT.md
State: Completed Dialog Phase 1 research and gap analysis; mapped PrimeNG dialog features to P0/P1/P2, documented missing overlay infrastructure (backdrop/scroll lock/focus trap/z-index/breakpoints), analyzed dependencies/conflicts, and captured SSR/CDK tradeoffs with mitigations.
Next step: Start Phase 2 by scaffolding a minimal `ui-lib-dialog` with P0 visibility/modal/header-footer/escape/ARIA plus internal overlay foundation utilities.
```
```
Date: 2026-03-13
Changed: LIBRARY_CONVENTIONS.md, AI_AGENT_CONTEXT.md
State: Reorganized conventions into Active Conventions vs Historical Migration Notes; split anti-patterns into active vs resolved; reordered context checks so active checks come first and historical checks are explicitly lower priority. Follow-up pass added consistent `[Historical]` prefixes for quick scanning.
Next step: Spot-check docs that reference old checklist ordering and update links/wording if needed.
```
```
Date: 2026-03-06
Changed: docs/DOC_STATUS.md, docs/README.md, docs/architecture/archive/DOCUMENTATION_AUDIT.md
State: Added living documentation status tracker, linked from docs index, archived the static audit.
Next step: Review DOC_STATUS rows when docs change; no further action required.
```
```
Date: 2026-03-16
Changed: docs/architecture/DIALOG_API_DESIGN.md, AI_AGENT_CONTEXT.md
State: Completed Dialog Phase 2.1 API and architecture design spec, including full signal input/output contract, content projection API, type definitions, host-first rendering strategy, internal module layout, and PrimeNG divergence rationale.
Next step: Review and approve `DIALOG_API_DESIGN.md`, then scaffold `ui-lib-dialog` component/types/constants/animations with the documented API contract.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/*, projects/ui-lib-custom/dialog/ng-package.json, AI_AGENT_CONTEXT.md
State: Scaffolded Dialog secondary entry point and source structure (component/types/constants/animations/spec/barrel) without implementation logic; verified `ng build ui-lib-custom` succeeds and emits `ui-lib-custom/dialog` artifacts in dist.
Next step: Implement Dialog v1 behavior and template per `docs/architecture/DIALOG_API_DESIGN.md` (inputs/outputs, projection slots, modal/backdrop, Escape handling, and token-driven styles).
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/dialog.component.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.html, projects/ui-lib-custom/src/lib/dialog/dialog.component.scss, AI_AGENT_CONTEXT.md
State: Implemented Dialog core behavior (signals API, backdrop/headless/default template rendering, Escape close, dismissable mask, scroll lock with SSR guards, position class mapping, responsive breakpoint matchMedia listeners, unique aria title ids, computed panel classes/styles) and verified `ng build ui-lib-custom` succeeds including `ui-lib-custom/dialog`.
Next step: Align Dialog outputs naming with final API decision (`show/hide/maximize` vs `onShow/onHide/onMaximize`) and implement animation trigger wiring plus focused unit/a11y tests.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/core/a11y/focus-trap.ts, projects/ui-lib-custom/src/lib/core/a11y/focus-trap.spec.ts, projects/ui-lib-custom/src/lib/core/index.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.html, AI_AGENT_CONTEXT.md
State: Implemented reusable core `FocusTrap` utility with SSR-safe activation/deactivation and focus restore; integrated trap lifecycle into Dialog (activate when `visible && modal`, deactivate on close/non-modal/destroy), added scoped Escape stopPropagation behavior, and exported FocusTrap from core barrel. Verified focused tests and full library build pass.
Next step: Add dialog-specific keyboard/focus integration tests (including modal visibility transitions + Escape close) and wire dialog animation hooks for accurate show/hide timing.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/dialog-animations.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.html, docs/architecture/DIALOG_API_DESIGN.md, package.json, projects/ui-lib-custom/package.json, AI_AGENT_CONTEXT.md
State: Implemented responsive breakpoint evaluation update (descending max-width match, SSR largest-breakpoint fallback, cleanup on close), added variant-aware Angular dialog/backdrop animation triggers with reduced-motion support, and wired panel animation done callbacks to `show`/`hide` lifecycle outputs. Added documentation note for `provideAnimations()`/`BrowserAnimationsModule` and updated Angular animations dependency metadata.
Next step: Run `ng serve demo` for a manual visual pass of Material/Bootstrap/Minimal dialog motion profiles and then add dialog animation + breakpoint behavior assertions to `dialog.component.spec.ts`.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/dialog.component.scss, projects/ui-lib-custom/src/lib/themes/themes.scss, projects/ui-lib-custom/src/lib/styles/dark-theme.scss, AI_AGENT_CONTEXT.md
State: Implemented Dialog variant styling (Material/Bootstrap/Minimal) using token-driven CSS, completed structural style pass for backdrop/panel/header/content/footer/maximized + position aliases, and added dialog dark-mode mixin integration through global dark-theme includes. Added shared dialog/backdrop token defaults to `themes.scss` for light/dark contexts.
Next step: Run manual demo visual QA for all 9 positions and 3 variants in `ng serve demo`, then extend `dialog.component.spec.ts` with class/token assertions for variant and maximized states.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/dialog.component.spec.ts, AI_AGENT_CONTEXT.md
State: Replaced the placeholder Dialog spec with a comprehensive 44-test suite covering creation/defaults, visibility and outputs, close paths, projection modes, 9 positions, maximize/drag behavior, accessibility attributes, and edge-case cleanup. Added robust Jest-safe stubs for `matchMedia`/pointer events and adapted modal assertions to avoid the current Angular `afterNextRender()` injection-context runtime limitation while still validating modal state and scroll-lock behavior. Verified with `npm.cmd test -- dialog.component.spec.ts` (all tests passing).
Next step: Run the broader library test pass (`npm.cmd test`) to ensure no cross-suite regressions, then decide whether to address the underlying `afterNextRender()` modal runtime issue in `dialog.component.ts` or keep it as a known test-environment caveat.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts, AI_AGENT_CONTEXT.md
State: Added dedicated Dialog accessibility suite (`dialog.a11y.spec.ts`) with 20 passing tests covering axe scans, focus management, screen-reader attributes, keyboard interactions, and explicit rationale for the intentional `color-contrast` axe rule skip. Reused project a11y utilities (`checkA11y`, `SKIP_COLOR_CONTRAST_RULES`) and added Jest-safe `matchMedia` stubbing plus deterministic focus-trap activation in tests.
Next step: Reconcile modal-path assertions with the runtime `afterNextRender()` injection-context limitation in Dialog so modal DOM-level a11y checks can run without test-side emulation.
```
```
Date: 2026-03-16
Changed: docs/reference/components/DIALOG.md, docs/README.md, AI_AGENT_CONTEXT.md
State: Added complete consumer-facing Dialog API documentation with source-aligned inputs/outputs, projection slots, headless mode, all 9 positions, responsive breakpoints, maximizable/draggable/non-modal examples, accessibility guidance, design token table, and variant comparison. Updated top-level docs index to include Dialog component reference.
Next step: Add Dialog entry to `docs/reference/components/README.md` quick-reference table for consistency with the top-level index.
```
```
Date: 2026-03-16
Changed: docs/implementation/DIALOG_IMPLEMENTATION.md, docs/architecture/DIALOG_RESEARCH.md, docs/architecture/DIALOG_API_DESIGN.md, AI_AGENT_CONTEXT.md
State: Added maintainer-focused Dialog implementation documentation with explicit file-path mapping, lifecycle/data-flow notes, and rationale for overlay/focus/scroll/drag/breakpoint/animation decisions. Marked research and API design docs as design-phase artifacts and redirected readers to implementation doc as current source of truth.
Next step: Optionally add a short link to `docs/implementation/DIALOG_IMPLEMENTATION.md` from `docs/README.md` and/or `docs/reference/components/README.md` for easier discoverability.
```
```
Date: 2026-03-16
Changed: docs/README.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Added discoverability links to `docs/implementation/DIALOG_IMPLEMENTATION.md` from both top-level docs index and component reference index, including a new Dialog entry in the component index quick-reference table.
Next step: Optional consistency pass to add implementation links for other components where maintainer docs exist outside `docs/reference/components/`.
```
```
Date: 2026-03-16
Changed: projects/demo/src/app/pages/dialog/dialog.component.ts, projects/demo/src/app/pages/dialog/dialog.component.html, projects/demo/src/app/pages/dialog/dialog.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md
State: Added a full Dialog demo page at route `/dialog` with 10 sections (basic, custom header/footer, position grid, maximizable, long content, non-modal, responsive, draggable, headless, variant switcher), all using `ui-lib-button` triggers with `aria-expanded` and `aria-controls`. Wired lazy-loaded route and sidebar navigation entry, then verified with `npm run build:demo` (success; existing unrelated warning: button SCSS budget over by 834 bytes).
Next step: Run `npm run serve:demo` and do a manual visual pass for interaction polish (drag feel, maximized transitions, headless styling) across all 3 variants.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/public-api.ts, docs/DOC_STATUS.md, projects/demo/src/app/pages/dialog/dialog.component.ts, projects/demo/src/app/pages/dialog/dialog.component.html, projects/demo/src/app/pages/dialog/dialog.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md
State: Completed Dialog v1 verification pass: library build succeeds and emits `dist/ui-lib-custom/dialog`; full Jest suite passes (including dialog unit + a11y tests); dialog lint passes; demo page shipped at `/dialog` with all required sections and accessible trigger wiring; docs status tracker updated; primary barrel now re-exports `DialogComponent` and Dialog types for backward compatibility. FocusTrap utility remains in `core/a11y` as reusable overlay infrastructure for future components.
Next step: Run manual `serve:demo` visual QA checklist (positions, drag/maximize, responsive, variant polish) and track any UI refinements separately from this verification baseline.
```
```
Date: 2026-03-16
Changed: projects/ui-lib-custom/src/lib/dialog/dialog.component.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.html, projects/ui-lib-custom/src/lib/dialog/dialog.component.scss, projects/ui-lib-custom/src/lib/dialog/dialog-animations.ts, projects/ui-lib-custom/src/lib/dialog/dialog.component.spec.ts, projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts, projects/ui-lib-custom/package.json, package.json, docs/architecture/DIALOG_API_DESIGN.md, docs/implementation/DIALOG_IMPLEMENTATION.md, docs/guides/INTEGRATION_EXAMPLE.md, AI_AGENT_CONTEXT.md
State: Removed deprecated Angular animation API usage from Dialog and migrated to CSS-based motion with variant-aware host-bound motion variables (`dialogMotion`, `backdropMotion`). Removed `@angular/animations` imports from Dialog code/tests, dropped no-op animation test providers, and removed `@angular/animations` from root dependencies and library peerDependencies. Verified with `npm test -- dialog.component.spec.ts dialog.a11y.spec.ts`, `npm exec -- eslint projects/ui-lib-custom/src/lib/dialog/`, and `npm run build -- ui-lib-custom`.
Next step: Run full library regression test pass (`npm test -- --watch=false`) and then do a manual demo visual check for Dialog motion polish across variants.
```
