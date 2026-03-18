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
| AutoComplete    | ✅ Complete     | `ui-lib-custom/autocomplete`     | ✅ Complete        | Prompt 3-8 delivered; exported from secondary entry + primary API |
| CascadeSelect   | ✅ Complete     | `ui-lib-custom/cascade-select`   | ✅ Complete        | Prompt 3-8 delivered; exported from secondary entry + primary API |
| Checkbox        | ✅ Bulletproof  | `ui-lib-custom/checkbox`         | ✅ Complete        | API + implementation docs added                    |
| SelectButton    | ✅ Bulletproof  | `ui-lib-custom/select-button`    | ✅ Complete        | Optional: consolidate supplemental API/Research    |
| Icon            | ✅ Bulletproof  | `ui-lib-custom/icon`             | ⚠️ API only       | Needs implementation doc                           |
| IconButton      | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ API only       | Needs implementation doc                           |
| Layout (Stack/Inline/Grid/Container) | ✅ Bulletproof | `ui-lib-custom/layout` | ❌ Missing | Needs docs per primitive                   |
| Alert           | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ Partial        |                                                    |
| ThemeEditor     | ✅ Working      | `ui-lib-custom/theme`            | ✅ README          | Demo sidebar, not a consumer component             |

**Secondary entry points implemented:** button, badge, accordion, tabs, dialog, input, select-button, core, card, checkbox, select, autocomplete, cascade-select, icon, layout, theme, tokens  
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
      ```
      Date: 2026-03-18
      Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
      State: Completed Phase 1 checkbox group/multi-value mode support. Added `value` and `binary` signal inputs, auto mode detection (`binary === true` or `value === null` -> binary mode), null-safe array normalization in group mode, and CVA toggle/write logic for boolean vs array models.
      Verification:
      - `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
      Result: PASS (1 suite, 22 tests) including new group-mode CVA tests for array add/remove and null/undefined model handling.
      Next step: Implement remaining PrimeNG parity inputs/outputs/templates (readonly, trueValue/falseValue, onChange/onFocus/onBlur, custom icon template) and extend docs/spec coverage.
      ```
            ```
            Date: 2026-03-18
            Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.html, projects/ui-lib-custom/src/lib/checkbox/checkbox.scss, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
            State: Completed Phase 2 missing core input pass for Checkbox. Added signal inputs `inputId`, `name`, `required`, `readonly`, and `tabindex`; added host ARIA bindings (`aria-required`, `aria-readonly`); added hidden native checkbox for id/name/required wiring and label-for association; and enforced readonly as non-mutating while keeping keyboard/focus behavior.
            Verification:
            - `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
            Result: PASS (1 suite, 25 tests), including new tests for native input attributes, tabindex behavior, and readonly interaction guard.
            Next step: Implement remaining PrimeNG checkbox parity items (trueValue/falseValue, onChange/onFocus/onBlur outputs, icon template support, and invalid/formControl bridging).
            ```
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

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 3 enhanced binary value handling for Checkbox. Added signal inputs `trueValue` and `falseValue`, updated binary `writeValue` matching to compare incoming values against configured true/false inputs, and updated toggle emission payloads to emit configured true/false values instead of hardcoded booleans.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 27 tests), including new CVA coverage for custom `trueValue`/`falseValue` in both `writeValue` and `registerOnChange` flows.
Next step: Implement remaining PrimeNG checkbox parity outputs/templates (onChange/onFocus/onBlur events, custom icon template, and invalid/formControl input bridging).
```
Date: 2026-03-17
Changed: projects/ui-lib-custom/src/lib/cascade-select/cascade-select.scss, AI_AGENT_CONTEXT.md
State: Completed Prompt 5 CascadeSelect styling and tokenization pass. Added full `--uilib-cascade-select-*` CSS custom property surface, host/trigger/panel/option/submenu styling, size variants (`sm`/`md`/`lg`), visual variants (Material/Bootstrap/Minimal), and state treatments (`filled`, `invalid`, `disabled`, `loading`, `fluid`, `open`) with color-mix based overlays and responsive narrow-viewport submenu stacking.
Next step: Run `ng serve demo` and perform visual QA for CascadeSelect interaction polish across variants/sizes/states, then tune spacing/contrast tokens if any UX issues appear.
```
```
Date: 2026-03-17
Changed: projects/ui-lib-custom/src/lib/cascade-select/cascade-select.spec.ts, projects/ui-lib-custom/src/lib/cascade-select/cascade-select.a11y.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Prompt 6 CascadeSelect testing stabilization. Unit and a11y suites are now passing for the CascadeSelect slice, including rendering, selection, keyboard navigation, CVA/forms, state handling, template slots, ARIA semantics, and axe checks. Also fixed a lingering lint warning in the unit spec by removing an unnecessary conditional expression in active-option text matching.
Verification:
- `npm.cmd exec -- eslint projects/ui-lib-custom/src/lib/cascade-select/`
- `npm.cmd test -- --testPathPatterns="cascade-select"`
Result: PASS (2 suites, 38 tests), no CascadeSelect ESLint warnings/errors.
Next step: Optionally run full library test sweep and build (`npm.cmd test`, `ng.cmd build ui-lib-custom`) before commit to guard against cross-component regressions.
```
```
Date: 2026-03-17
Changed: docs/reference/components/CASCADESELECT_API.md, docs/reference/components/README.md, projects/demo/src/app/pages/cascade-select/cascade-select-demo.component.ts, projects/demo/src/app/pages/cascade-select/cascade-select-demo.component.html, projects/demo/src/app/pages/cascade-select/cascade-select-demo.component.scss, projects/demo/src/app/pages/cascade-select/cascade-select-demo.data.ts, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md
State: Completed Prompt 7 CascadeSelect docs and demo integration. Added full API reference doc (inputs/outputs/slots/types/examples/forms/css vars/accessibility), created a new CascadeSelect demo page with 11 sections (basic, template, loading, clear, sizes, filled, fluid, states, template-driven form, reactive form, variants), added lazy route `/cascade-select`, and added sidebar navigation entry under Form.
Verification:
- `npm.cmd exec -- eslint projects/demo/src/app/pages/cascade-select/ projects/demo/src/app/app.routes.ts projects/demo/src/app/layout/sidebar/sidebar.component.ts`
- `ng.cmd build demo`
Result: PASS. ESLint clean for touched demo/router/sidebar files. Demo build succeeds and includes lazy chunk `cascade-select-demo-component`.
Next step: Run `ng.cmd serve demo` and do a quick visual/interaction pass on `/cascade-select`, especially template slots and form validation messaging.
```
```
Date: 2026-03-17
Changed: projects/ui-lib-custom/src/lib/cascade-select/index.ts, projects/ui-lib-custom/src/lib/cascade-select/, projects/ui-lib-custom/cascade-select/ng-package.json, projects/ui-lib-custom/cascade-select/package.json, projects/ui-lib-custom/src/public-api.ts, AI_AGENT_CONTEXT.md
State: Completed Prompt 8 entry-point verification and final QA pass for CascadeSelect. Confirmed secondary entry manifest wiring (`entryFile` -> `../src/lib/cascade-select/index.ts`), minimal entry package name, no `public-api.ts`, and no `src/` folder in entry root. Confirmed primary barrel re-export and added constants re-export in CascadeSelect `index.ts`.
Verification:
- `ng.cmd build ui-lib-custom`
- `npm.cmd test -- --testPathPatterns="cascade-select"`
- `npm.cmd exec -- eslint projects/ui-lib-custom/src/lib/cascade-select/`
- `curl -I http://localhost:4300/` after `ng.cmd serve demo --no-open --port 4300`
Result: PASS for build, targeted tests (2 suites/38 tests), and CascadeSelect lint. Demo dev server reachable (HTTP 200) on alternate port. Manual browser walkthrough for `/cascade-select` interaction/keyboard/form UX remains a human QA step.
Next step: Perform manual in-browser checklist on `/cascade-select` (all sections rendering, keyboard traversal, form validation messaging) and then finalize commit/tag.
```

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.types.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 4 checkbox outputs pass. Added `onFocus` and `onBlur` outputs, and updated `onChange` output typing to `CheckboxChangeEvent` with `{ checked, originalEvent }` payload where checked is boolean in binary mode or array in group mode.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 31 tests), including new coverage for focus/blur outputs and typed onChange payloads in both binary and group modes.
Next step: Continue remaining checkbox parity work (icon template slot, invalid/formControl parity details, and docs updates).
```

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.types.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.scss, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 5 checkbox appearance support. Added `appearance` input (`'outlined' | 'filled'`) and filled-mode host class `checkbox--filled`, then implemented filled styling through `--uilib-checkbox-filled-bg` and `--uilib-checkbox-filled-border-color` with variant-specific overrides for material/bootstrap/minimal.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 33 tests), including new tests for outlined default and filled appearance class coverage across all variants.
Next step: Implement remaining parity work (icon template support, invalid/formControl input bridging, and checkbox docs/demo updates).
```

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.html, projects/ui-lib-custom/src/lib/checkbox/checkbox.scss, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 6 checkbox customization pass. Added signal inputs `checkboxIcon`, `autofocus`, and `inputClass`; wired custom class composition for native input and check icon; added custom icon override CSS to suppress default check glyph when a custom icon class is provided; and added `AfterViewInit` autofocus behavior for enabled checkboxes.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 36 tests), including new coverage for native input class passthrough, custom icon class application, and autofocus.
Next step: Continue remaining parity work (custom icon template slot API and invalid/formControl input parity + docs/demo updates).
```

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.html, projects/ui-lib-custom/src/lib/checkbox/checkbox.scss, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 7 hidden native input accessibility pass. The native `<input type="checkbox">` now owns required semantic attributes (`id`, `name`, `required`, `tabindex`, `aria-label`, `aria-labelledby`, `aria-checked`, `aria-describedby`, `disabled`, `readonly`, `value`), remains visually hidden with an sr-only pattern, and is no longer aria-hidden. The visual checkbox box is explicitly presentation-only.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 37 tests), including new checks for screen-reader accessibility of the native input and presentation-only visual box semantics.
Next step: Implement remaining checkbox parity work (custom icon template slot and invalid/formControl input bridging), then update docs/demo API references.
```

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 8 ControlValueAccessor hardening for Checkbox. Refactored write/toggle paths to use explicit binary/group model normalization helpers, kept null/undefined handling safe in both modes, and ensured CVA callback payload shape remains mode-correct (scalar in binary mode, cloned array in group mode).
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 40 tests), including new coverage for binary undefined writeValue, group-mode non-array/undefined handling, and setDisabledState blocking toggles in group mode.
Next step: Implement remaining checkbox parity work (custom icon template slot and invalid/formControl input bridging), then update docs/demo API references.
```

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 9 Checkbox test expansion. Added coverage for template-driven shared-array group mode, dynamic `@for` group rendering, external `inputId` label association, required validation checks (template-driven and reactive), readonly focus preservation, indeterminate+group interaction, null/undefined model safety, and filled appearance across variants.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 47 tests).
Next step: Implement remaining parity feature work (custom icon template slot and invalid/formControl input bridging), then update checkbox docs/demo API references.
```

```
Date: 2026-03-18
Changed: projects/demo/src/app/pages/checkboxes/checkboxes.component.ts, projects/demo/src/app/pages/checkboxes/checkboxes.component.html, projects/demo/src/app/pages/checkboxes/checkboxes.component.scss, AI_AGENT_CONTEXT.md
State: Completed Phase 10 checkbox demo expansion. Updated the demo page to showcase binary and indeterminate behavior, group mode with 4+ options, dynamic list-driven checkboxes, outlined vs filled appearance, all three visual variants, all sizes, disabled/readonly states, custom trueValue/falseValue, and both reactive + template-driven form integration with required validation messaging.
Verification:
- `ng.cmd build ui-lib-custom` (PASS)
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'` (PASS)
Notes:
- `ng.cmd test ui-lib-custom --watch=false` is not supported in this workspace (`Unknown argument: watch`).
- `ng.cmd test ui-lib-custom` reports `Project target does not exist`; repository test entrypoint remains `npm.cmd test`.
Next step: Optionally refine copy/layout polish in demo sections and update docs/reference checkbox API pages to mirror new examples.
```

```
Date: 2026-03-18
Changed: docs/reference/components/CHECKBOX.md, docs/reference/components/README.md, projects/demo/src/app/pages/checkboxes/checkboxes.component.ts, AI_AGENT_CONTEXT.md
State: Completed follow-up docs and UX polish pass for Checkbox. Updated component reference docs to reflect the current API (binary/group modes, appearance, trueValue/falseValue, outputs, native input semantics, form integration), refreshed component index status line, and polished demo usage snippet wording to match current preferred patterns.
Verification:
- `get_errors` on `projects/demo/src/app/pages/checkboxes/checkboxes.component.ts`, `projects/demo/src/app/pages/checkboxes/checkboxes.component.html`, `projects/demo/src/app/pages/checkboxes/checkboxes.component.scss` (PASS)
Notes:
- Terminal command output is currently not being captured reliably in this session (`$` only), so command-level PASS/FAIL text could not be confirmed for additional runs.
Next step: If desired, run full CI command set once terminal output capture is stable: `ng.cmd build ui-lib-custom`, `npm.cmd run build:demo`, and `npm.cmd test`.
```

```
Date: 2026-03-18
Changed: docs/reference/components/CHECKBOX.md, AI_AGENT_CONTEXT.md
State: Added a compact migration guide to Checkbox docs for teams moving from boolean-only usage to explicit binary/group patterns. Included before/after snippets, model-shape expectations, null-safety behavior, and auto-mode compatibility note.
Verification:
- Documentation-only change; no runtime code paths modified.
Next step: Optionally add a dedicated `CHECKBOX_IMPLEMENTATION.md` file to complete checkbox maintainer-level architecture docs.
```

```
Date: 2026-03-18
Changed: docs/reference/components/CHECKBOX_IMPLEMENTATION.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Added maintainer-focused Checkbox implementation documentation and updated docs index/status metadata. Checkbox is now documented with both API and implementation references.
Verification:
- Documentation-only changes; no runtime code paths modified.
Next step: Optionally add similar implementation docs for Icon and IconButton to close remaining "API only" component gaps.
```

```
Date: 2026-03-18
Changed: docs/reference/components/ICON_IMPLEMENTATION.md, docs/reference/components/ICON_BUTTON.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Completed Icon and Icon Button documentation gap closure. Added dedicated Icon implementation notes doc, expanded Icon Button reference with implementation notes section, and updated component reference index/status entries to mark both components complete.
Verification:
- `get_errors` on modified docs files (no errors in new/edited Icon docs; existing unresolved markdown link warnings in components index are pre-existing)
Next step: Optionally standardize source-code links in `docs/reference/components/README.md` to workspace-valid paths to remove markdown link resolution warnings.
```

```
Date: 2026-03-18
Changed: docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Standardized component `Source Code` links in docs index to workspace-valid relative paths (`../../../projects/...`) and cleared markdown resolution warnings for the file.
Verification:
- `get_errors` on `docs/reference/components/README.md` (PASS, no warnings)
Next step: Optional docs consistency pass to ensure all reference markdown files use the same relative-link depth conventions.
```

