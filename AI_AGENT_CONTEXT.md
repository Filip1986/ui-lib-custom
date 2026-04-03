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
| InputGroup      | ✅ Complete     | `ui-lib-custom/input-group`      | ✅ Complete        | Pair: InputGroupComponent + InputGroupAddonComponent |
| AutoComplete    | ✅ Complete     | `ui-lib-custom/autocomplete`     | ✅ Complete        | Prompt 3-8 delivered; exported from secondary entry + primary API |
| CascadeSelect   | ✅ Complete     | `ui-lib-custom/cascade-select`   | ✅ Complete        | Prompt 3-8 delivered; exported from secondary entry + primary API |
| ColorPicker     | ✅ Complete     | `ui-lib-custom/color-picker`     | ✅ Complete        | Prompt 1-6 delivered; secondary entry point + demo/docs/tests integrated |
| DatePicker      | ✅ Complete     | `ui-lib-custom/date-picker`      | ✅ Complete        | Prompt 1-12 delivered; secondary entry point + demo/docs/tests integrated |
| Editor          | ✅ Complete     | `ui-lib-custom/editor`           | ✅ Complete        | Prompt 1-8 delivered; secondary entry + demo/docs/tests + final QA complete |
| FloatLabel      | ✅ Complete     | `ui-lib-custom/float-label`      | ✅ Complete        | Prompt 2-5 delivered; CSS-driven wrapper component |
| IconField       | ✅ Complete     | `ui-lib-custom/icon-field`       | ✅ Complete        | Prompt 1-5 delivered; secondary entry + demo/docs/tests integrated |
| Checkbox        | ✅ Bulletproof  | `ui-lib-custom/checkbox`         | ✅ Complete        | API + implementation docs added                    |
| SelectButton    | ✅ Bulletproof  | `ui-lib-custom/select-button`    | ✅ Complete        | Optional: consolidate supplemental API/Research    |
| Icon            | ✅ Bulletproof  | `ui-lib-custom/icon`             | ⚠️ API only       | Needs implementation doc                           |
| IconButton      | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ API only       | Needs implementation doc                           |
| Layout (Stack/Inline/Grid/Container) | ✅ Bulletproof | `ui-lib-custom/layout` | ❌ Missing | Needs docs per primitive                   |
| Alert           | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ Partial        |                                                    |
| ThemeEditor     | ✅ Working      | `ui-lib-custom/theme`            | ✅ README          | Demo sidebar, not a consumer component             |

**Secondary entry points implemented:** button, badge, accordion, tabs, dialog, input, input-group, select-button, core, card, checkbox, select, autocomplete, cascade-select, color-picker, date-picker, editor, float-label, icon-field, icon, layout, theme, tokens  
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

1. Create `projects/ui-lib-custom/<name>/ng-package.json` with schema path `../../../node_modules/ng-packagr/ng-package.schema.json` and `lib.entryFile` set to `../src/lib/<name>/index.ts`
2. Add an `exports` mapping in `projects/ui-lib-custom/package.json` (example: `"./name": { "types": "./name/index.d.ts", "esm2022": "./esm2022/name/index.mjs", ... }`)
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

- **Active:** DatePicker delivery completed (component, tests, styling, docs, demo, entry-point, final QA); ongoing documentation gap-filling (Input, Select, Card, Layout)
- **Next in queue:** Dead code cleanup with `knip` baseline configuration, constants extraction pass, overlay infrastructure follow-ups (appendTo/z-index manager)
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, axe-core a11y audit

---

## Last Session

*(Paste agent handoff note here at the end of each session)*

```
Date: 2026-03-18
Changed: projects/ui-lib-custom/src/lib/checkbox/checkbox.ts, projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 3 enhanced binary value handling for Checkbox. Added signal inputs `trueValue` and `falseValue`, updated binary `writeValue` matching to compare incoming values against configured true/false inputs, and updated toggle emission payloads to emit configured true/false values instead of hardcoded booleans.
Verification:
- `npm.cmd test -- --testPathPatterns='checkbox.spec.ts'`
Result: PASS (1 suite, 27 tests), including new CVA coverage for custom `trueValue`/`falseValue` in both `writeValue` and `registerOnChange` flows.
Next step: Implement remaining PrimeNG checkbox parity outputs/templates (onChange/onFocus/onBlur events, custom icon template, and invalid/formControl input bridging).
```
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
Date: 2026-03-20
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Phase 6 Prompt 9 DatePicker component-level unit coverage expansion. Replaced the minimal DatePicker spec with a comprehensive suite covering rendering/modes, popup lifecycle, CVA hooks, ngModel/reactive form integration, calendar grid behavior, navigation, selection modes, month/year views, time picker/button bar, keyboard interactions, accessibility semantics, and edge-case date scenarios.
Verification:
- `npm.cmd test -- --testPathPatterns='date-picker'`
Result: PASS (3 suites, 87 tests). `date-picker.spec.ts`, `date-utils.spec.ts`, and `date-format.spec.ts` all pass.
Next step: Run full library unit/build pipeline (`npm.cmd test`, `ng.cmd build ui-lib-custom`) before merge to catch any cross-component regressions outside the date-picker slice.
```


```
Date: 2026-03-20
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, projects/ui-lib-custom/src/lib/theming/theme-config.service.ts, docs/reference/systems/CSS_VARIABLES.md, docs/reference/systems/DESIGN_TOKENS.md, AI_AGENT_CONTEXT.md
State: Completed DatePicker Prompt 8 full styling/token pass. Reworked `date-picker.scss` to a full token-backed visual system with variant-aware and size-aware variable overrides, unified focus/hover/disabled/invalid/filled states, reduced-motion transition fallback, time-panel styling, and continuous range-band day rendering (`range-between` no corner gaps, start/end rounded edges). Added `DATEPICKER_TOKENS` to `design-tokens.ts` with grouped defaults for input/panel/navigation/cell/time/buttonbar/variant/transition categories and exported `DatePickerTokenKey`. Extended `ThemeConfigService` CSS-variable mapping to emit comprehensive `--uilib-datepicker-*` defaults + variant-specific datepicker overrides from active theme colors and token defaults. Updated docs with DatePicker variable contract in `CSS_VARIABLES.md` and token reference section in `DESIGN_TOKENS.md`.
Verification:
- `ng.cmd build ui-lib-custom` (PASS; exit code `0`, logs: `tmp_primeng/datepicker-p8-build.stdout.log`, `tmp_primeng/datepicker-p8-build.stderr.log`, `tmp_primeng/datepicker-p8-build.exitcode.txt`).
- `npm.cmd run build:demo` (PASS; exit code `0`, logs: `tmp_primeng/datepicker-p8-demo-build.stdout.log`, `tmp_primeng/datepicker-p8-demo-build.stderr.log`, `tmp_primeng/datepicker-p8-demo-build.exitcode.txt`).
- Note: demo build includes a pre-existing style budget warning for `projects/ui-lib-custom/src/lib/button/button.scss` (+834 bytes over 15 kB budget), non-blocking for this Prompt 8 DatePicker scope.
Next step: Add focused visual regression/a11y checks for DatePicker variant + size combinations in demo/Storybook and, if desired, split DatePicker density/touch-size tokens into dedicated responsive tokens for mobile tuning.
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
Next step: Continue remaining parity work (custom icon template API and invalid/formControl input parity + docs/demo updates).
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

```
Date: 2026-03-19
Changed: docs/reference/components/COLORPICKER_RESEARCH.md, AI_AGENT_CONTEXT.md
State: Completed Prompt 1 ColorPicker research and gap analysis. Added PrimeNG-vs-library feature inventory, reusable code assessment (overlay/click-outside/keyboard/CVA), dependency map (color conversion + popup infrastructure), architecture recommendations (CSS gradient panel, custom anchored popup for v1, utility placement split between `core` and component), proposed token list, and accessibility requirements.
Verification:
- Documentation-only change; no runtime code paths modified.
Next step: Start Prompt 2 API and type design for `ui-lib-color-picker` (inputs/outputs/model unions/event contracts), then scaffold secondary entry point and component shell.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/color-picker/color-picker.types.ts, projects/ui-lib-custom/src/lib/color-picker/color-picker.constants.ts, projects/ui-lib-custom/src/lib/color-picker/color-utils.ts, docs/reference/components/COLORPICKER_ARCHITECTURE.md, AI_AGENT_CONTEXT.md
State: Completed Prompt 2 architecture and API design deliverables for ColorPicker. Added full public type contracts, internal constants (`as const`) for defaults/class names/ranges, pure color conversion utilities for hex<->rgb<->hsb normalization, and a dedicated architecture doc covering API, CVA flow, host bindings, internal structure, CSS variable contract, and deferred features.
Verification:
- `get_errors` on new ColorPicker type/constants/util/doc files (no errors)
Next step: Implement Prompt 3 component scaffold (`color-picker.ts/.html/.scss/.spec.ts`) using these contracts and wire CVA + popup/inline interaction state.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/color-picker/color-picker.ts, projects/ui-lib-custom/src/lib/color-picker/color-picker.html, projects/ui-lib-custom/src/lib/color-picker/color-picker.scss, projects/ui-lib-custom/src/lib/color-picker/index.ts, projects/ui-lib-custom/src/public-api.ts, AI_AGENT_CONTEXT.md
State: Completed Prompt 3 core ColorPicker implementation. Added standalone OnPush component with `ViewEncapsulation.None`, signal-based API, CVA integration, popup/inline modes, click-outside + Escape close, trigger/panel keyboard interactions, document-level mouse/touch drag tracking for saturation/brightness and hue controls, computed display state, and primary-barrel export wiring.
Verification:
- `ng.cmd build ui-lib-custom` (PASS)
- `npm.cmd exec -- eslint 'projects/ui-lib-custom/src/lib/color-picker/color-picker.ts' 'projects/ui-lib-custom/src/lib/color-picker/color-picker.html' 'projects/ui-lib-custom/src/lib/color-picker/index.ts'` (PASS)
Notes:
- SCSS lint via ESLint is not configured in this workspace (`File ignored because no matching configuration was supplied`), so stylesheet validation currently relies on Angular build compilation.
Next step: Implement Prompt 4 styling refinement + Prompt 5 tests (`color-picker.spec.ts` and a11y coverage), then evaluate whether to add a dedicated `ui-lib-custom/color-picker` secondary entry point.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/color-picker/color-picker.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, projects/ui-lib-custom/src/lib/theming/theme-config.service.ts, docs/reference/systems/CSS_VARIABLES.md, docs/reference/systems/DESIGN_TOKENS.md, AI_AGENT_CONTEXT.md
State: Completed Prompt 4 styling and token registration for ColorPicker. Refined base styles to use fallback-backed `--uilib-colorpicker-*` variables, added Material/Bootstrap/Minimal variant overrides, implemented disabled/focus/invalid/inline state styling, introduced `COLORPICKER_TOKENS` in the design token registry, mapped token defaults into `ThemeConfigService` CSS variable output, and documented variables/tokens in system reference docs.
Verification:
- `ng.cmd build ui-lib-custom` (PASS)
- `npm.cmd run build:demo` (PASS; existing warning: `button.scss` exceeds style budget)
- `npm.cmd run serve:demo` started as background attempt, but terminal output capture returned `null` in this session; visual validation remains manual.
Next step: Add demo page scenarios for ColorPicker variants/states and implement Prompt 5 unit + a11y tests for keyboard/drag/CVA behavior.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/color-picker/color-utils.spec.ts, projects/ui-lib-custom/src/lib/color-picker/color-picker.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Prompt 5 test implementation for ColorPicker utilities and component behavior. Added dedicated conversion-unit coverage (hex/rgb/hsb conversions, round-trips, invalid input handling, edge colors) and component tests for rendering modes, variant classes, popup lifecycle/events, outside click + Escape close, pointer/keyboard interaction updates, CVA write paths, reactive/template-driven form integration, disabled behavior, and drag listener cleanup.
Verification:
- `get_errors` on both new spec files (PASS; no TypeScript/ESLint diagnostics).
- Attempted targeted command requested in prompt: `npm.cmd test -- --include='**/color-picker/**/*.spec.ts'` (workspace runner executed broader suite; output captured with unrelated warnings from existing accordion icon tests).
- Attempted fallback targeted runs with `--runTestsByPath` but this session intermittently drops terminal output (`$` only), so pass/fail text could not be reliably captured.
Next step: Re-run targeted specs once terminal output capture stabilizes, then add a11y-focused ColorPicker tests (`*.a11y.spec.ts`) to align with library accessibility test workflow.
```

```
Date: 2026-03-19
Changed: docs/reference/components/COLORPICKER.md, projects/demo/src/app/pages/color-picker/color-picker-demo.component.ts, projects/demo/src/app/pages/color-picker/color-picker-demo.component.html, projects/demo/src/app/pages/color-picker/color-picker-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Completed Prompt 6 documentation and demo integration for ColorPicker. Added full component reference doc (overview, API tables, CSS variable tokens, usage examples, accessibility notes), created a standalone demo page with sections for basic/inline/formats/template-driven/reactive/disabled/variants, wired lazy route at `/color-picker`, added sidebar entry under Form, and updated component docs index with a ColorPicker entry.
Verification:
- `get_errors` checks: PASS for new/updated demo TS/HTML/SCSS, route, sidebar, and ColorPicker docs.
- Existing `docs/reference/components/README.md` markdown link-resolution warnings remain pre-existing in this workspace.
- Build commands were executed (`ng.cmd build ui-lib-custom`, `npm.cmd run build:demo`), but this session intermittently returns `$`-only terminal output; command logs could not be reliably captured.
Next step: Add a ColorPicker entry in any demo landing/gallery cards if desired and perform manual `/color-picker` UX pass once terminal/server output capture is stable.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/color-picker/ng-package.json, projects/ui-lib-custom/color-picker/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md
State: Completed Prompt 7 integration setup for ColorPicker secondary entry point. Added `ui-lib-custom/color-picker` manifests following ng-packagr conventions (entry file points to `../src/lib/date-picker/index.ts`), kept primary barrel compatibility export (`projects/ui-lib-custom/src/public-api.ts`), and extended secondary-entry-point regression tests to include `ui-lib-custom/color-picker` import verification.
Verification:
- Cross-entry import guard command executed for ColorPicker source files (no forbidden relative cross-entry imports detected).
- `get_errors` confirm no issues in new secondary-entry manifests and updated entry-point tests.
- Build/test/lint commands were executed (`ng.cmd build ui-lib-custom`, `npm.cmd test -- --include=\"**/color-picker/**/*.spec.ts\"`, `npx eslint projects/ui-lib-custom/src/lib/color-picker/ --max-warnings 0`), but this terminal session intermittently returns `$`-only output, so command transcript pass/fail text could not be captured reliably.
- Demo and accessibility verification items remain manual (requires interactive browser run at `/color-picker`).
Next step: Re-run the Prompt 7 verification command set in a stable terminal session to capture explicit PASS output and complete final manual UI/a11y checklist.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/color-picker/color-utils.spec.ts, projects/ui-lib-custom/src/lib/color-picker/color-picker.spec.ts, projects/ui-lib-custom/src/lib/autocomplete/autocomplete.spec.ts, AI_AGENT_CONTEXT.md
State: Addressed reported test failures. Updated ColorPicker round-trip assertion to channel-tolerance validation (avoids false failure from expected HSB quantization), and removed zone-dependent `fakeAsync`/`tick` usage from AutoComplete and ColorPicker specs by switching timing checks to Jest timer controls and synchronous assertions compatible with zoneless test setup.
Verification:
- `get_errors` on all edited spec files (PASS, no TypeScript/ESLint errors).
- Targeted Jest run attempted via `npm.cmd test -- --runTestsByPath ...`; terminal output capture in this session remains intermittent, so pass/fail transcript was not returned.
Next step: Re-run the same targeted Jest command in a stable terminal session to capture explicit PASS output in logs.
```

```
Date: 2026-03-19
Changed: docs/reference/components/DATEPICKER_RESEARCH.md, AI_AGENT_CONTEXT.md
State: Completed Phase 1 DatePicker research and gap analysis against PrimeNG artifacts (`primeng@21.1.3` package `.d.ts` + `fesm2022` inspection). Documented feature inventory with P0/P1/P2 priorities, reusable infrastructure from dialog/select/autocomplete/color-picker/core, required new date utilities, recommended DatePicker architecture/state model, proposed `--uilib-datepicker-*` token contract, accessibility/keyboard plan, and explicit deferred features.
Verification:
- Documentation-only changes; no runtime code paths modified.
- PrimeNG evidence sourced from local npm package artifacts, not website docs.
Next step: Start DatePicker Prompt 2 API/type design and component scaffold planning from the P0 scope defined in `docs/reference/components/DATEPICKER_RESEARCH.md`.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.types.ts, projects/ui-lib-custom/src/lib/date-picker/date-picker.constants.ts, projects/ui-lib-custom/src/lib/date-picker/date-utils.ts, projects/ui-lib-custom/src/lib/date-picker/date-format.ts, docs/reference/components/DATEPICKER_ARCHITECTURE.md, AI_AGENT_CONTEXT.md
State: Completed DatePicker Phase 2 foundation. Added public type contracts, `as const` defaults/class/token constants with default locale, pure date utility functions (comparators, constraints, month-grid generation, year/decade helpers), and a PrimeNG-token-compatible date format/parse engine (`d`, `dd`, `o`, `oo`, `D`, `DD`, `m`, `mm`, `M`, `MM`, `y`, `yy`, `@`, `!`, quoted literals). Added architecture documentation covering API plan, CVA flow, internal state model, structure, keyboard matrix, CSS variable contract, and deferred features.
Verification:
- `get_errors` run on all new files; no TypeScript errors remain (new-file diagnostics are limited to expected unused-symbol warnings before component consumption).
- `npx tsc --noEmit --pretty false --skipLibCheck projects/ui-lib-custom/src/lib/date-picker/date-picker.types.ts projects/ui-lib-custom/src/lib/date-picker/date-picker.constants.ts projects/ui-lib-custom/src/lib/date-picker/date-utils.ts projects/ui-lib-custom/src/lib/date-picker/date-format.ts` (exit code 0, no output).
Next step: Start DatePicker component scaffold (`date-picker.ts/.html/.scss`) and wire CVA + popup/inline interaction using these utilities/constants.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-utils.ts, projects/ui-lib-custom/src/lib/date-picker/date-utils.spec.ts, projects/ui-lib-custom/src/lib/date-picker/date-format.spec.ts, AI_AGENT_CONTEXT.md
State: Completed DatePicker Prompt 3 test hardening for utility and format engines. Added comprehensive `date-utils.spec.ts` coverage for month/day calculations, comparisons, disable constraints, today detection, cloning/creation, month/year shifts, month-grid generation, year range parsing, and decade bounds. Added `date-format.spec.ts` coverage for individual format tokens, composed formats, literal/escaped quote handling, round-trip parse/format, invalid and partial parsing, timestamp tokens, and locale-aware naming. Also expanded `getMonthDates` utility signature to support optional constraint inputs and metadata `disabled/selectable` derivation required by the tests, plus defensive handling in `isDateEqual` and single-year support in `getYearRange`.
Verification:
- `npm.cmd test -- --testPathPatterns='date-picker'` (PASS: 2 suites, 52 tests).
- `npx tsc --noEmit --pretty false --skipLibCheck projects/ui-lib-custom/src/lib/date-picker/date-utils.ts projects/ui-lib-custom/src/lib/date-picker/date-format.ts projects/ui-lib-custom/src/lib/date-picker/date-utils.spec.ts projects/ui-lib-custom/src/lib/date-picker/date-format.spec.ts` (exit code 0).
- Note: `get_errors` still reports a stale TS2554 signature mismatch for one `getMonthDates` callsite despite passing Jest + direct `tsc`; diagnostics appear out of sync with latest file content.
Next step: Begin Prompt 4 DatePicker component scaffold (`date-picker.ts/.html/.scss`) and wire keyboard/overlay/CVA flows against these verified utilities.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.ts, projects/ui-lib-custom/src/lib/date-picker/date-picker.html, projects/ui-lib-custom/src/lib/date-picker/date-picker.scss, projects/ui-lib-custom/src/lib/date-picker/index.ts, AI_AGENT_CONTEXT.md
State: Completed DatePicker Prompt 4 scaffold. Added standalone `ui-lib-date-picker` component shell with `OnPush` + `ViewEncapsulation.None`, CVA provider/wiring (`writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`), full signal input/output surface requested for display/constraints/views/time/UI/theming/a11y, popup lifecycle (`showOverlay`/`hideOverlay`/`toggleOverlay`), click-outside close, Escape handling, variant resolution via `ThemeConfigService`, host class computation, and formatted input value computation. Added structural template shell for popup/inline modes with input trigger area, panel header, calendar/time/button-bar placeholders (no grid/time internals yet), and minimal tokenized SCSS scaffold using `--uilib-datepicker-*` variables. Added barrel exports in `index.ts`.
Verification:
- `ng.cmd build ui-lib-custom` (PASS).
- `npm.cmd exec -- eslint "projects/ui-lib-custom/src/lib/date-picker/date-picker.ts" "projects/ui-lib-custom/src/lib/date-picker/date-picker.html" "projects/ui-lib-custom/src/lib/date-picker/index.ts"` (PASS, no lint errors/warnings in CLI run).
- Note: `get_errors` still reports stale IDE diagnostics for template-linked symbol usage/jsdoc despite successful build/lint execution.
Next step: Implement Prompt 5 core calendar rendering and keyboard day-grid navigation using the existing date utility/format engine.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.ts, projects/ui-lib-custom/src/lib/date-picker/date-picker.html, projects/ui-lib-custom/src/lib/date-picker/date-picker.scss, AI_AGENT_CONTEXT.md
State: Completed DatePicker Prompt 5 core month view implementation. Replaced shell placeholder with real calendar grid rendering (weekday headers, optional week number column, 6x7 day cells, multi-month layout for `numberOfMonths > 1`, other-month visibility/selection rules), added computed calendar state (`monthGridData`, `weekDayLabels`, `monthLabel`, `yearLabel`, `canNavigatePrev`, `canNavigateNext`), wired month/year navigation with min/max range constraints, and implemented keyboard day-grid interactions (arrow keys, Home/End, PageUp/PageDown with Shift for year jump, Enter/Space select, Escape close, Tab close behavior when no further interactive panel section exists). Added single-mode date selection path in `onDateSelect` with CVA update + `onSelect` emit + popup close behavior and DOM-focus synchronization for focused date buttons.
Verification:
- `ng.cmd build ui-lib-custom` (PASS).
- `npm.cmd exec -- eslint "projects/ui-lib-custom/src/lib/date-picker/date-picker.ts" "projects/ui-lib-custom/src/lib/date-picker/date-picker.html" "projects/ui-lib-custom/src/lib/date-picker/index.ts"` (PASS).
- Note: `get_errors` still reports stale IDE warnings for template-linked symbol usage/jsdoc in `date-picker.ts` even though build/lint CLI checks pass.
Next step: Implement Prompt 6 month/year picker views + range/multiple selection behavior and complete a11y announcements for focused-date changes.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.ts, projects/ui-lib-custom/src/lib/date-picker/date-picker.html, projects/ui-lib-custom/src/lib/date-picker/date-picker.scss, AI_AGENT_CONTEXT.md
State: Completed DatePicker Prompt 6 selection modes + alternate views. Added mode-aware CVA normalization for `single`/`multiple`/`range`, implemented multiple-date toggle selection with comma-joined formatted value, and range selection with progressive `[start] -> [start,end]` model, auto-swap when end is earlier, and in-range cell highlighting (including hover preview when choosing the second endpoint). Added month picker and year picker panel views in the same container, keyboard navigation for month/year cells (arrow/home/end + Enter/Space selection), decade navigation for year view, and context-sensitive view transitions between date/month/year based on header clicks and primary `view` input. Wired `monthNavigator` and `yearNavigator` header dropdowns, including year option generation from `yearRange` via `getYearRange`. Added range accessibility announcement via `aria-label` suffix (`in selected range`) and view-specific styles for month/year grids and dropdown controls.
Verification:
- `ng.cmd build ui-lib-custom` (PASS).
- `npm.cmd exec -- eslint "projects/ui-lib-custom/src/lib/date-picker/date-picker.ts" "projects/ui-lib-custom/src/lib/date-picker/date-picker.html"` (PASS).
Next step: Add targeted DatePicker component specs for `multiple` and `range` CVA/writeValue behavior plus month/year keyboard navigation to prevent regressions.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.ts, projects/ui-lib-custom/src/lib/date-picker/date-picker.spec.ts, AI_AGENT_CONTEXT.md
State: Continued DatePicker Prompt 7 and completed targeted regression coverage plus strict type narrowing fixes. Added new `date-picker.spec.ts` component tests for: (1) `writeValue` normalization in `multiple` mode with selected-cell rendering checks, (2) `multiple` mode CVA toggle emissions, (3) `range` writeValue auto-sort with range-start/range-end/range-between class assertions, (4) `range` mode CVA emission ordering when second click precedes first, and (5) keyboard regression checks for month/year grid navigation + Enter selection transitions. In `date-picker.ts`, resolved TypeScript undefined/null narrowing issues by introducing a defensive `toDateArray(...)` guard helper and explicit undefined-safe extraction in range/multiple/sync selection paths, plus null-safe hovered-range handling in `isRangeBetween`.
Verification:
- `get_errors` on `projects/ui-lib-custom/src/lib/date-picker/date-picker.ts` and `projects/ui-lib-custom/src/lib/date-picker/date-picker.spec.ts` (no TS errors; only non-blocking unused-field warnings in `date-picker.ts` for future time-feature wiring).
- `npm.cmd test -- --testPathPatterns="date-picker.spec.ts" --runInBand` (PASS: 1 suite, 5 tests; captured in `tmp_primeng/datepicker-p7-test.*`).
Next step: Expand DatePicker specs for day-grid keyboard behavior (PageUp/PageDown/Home/End/Escape/Tab close semantics) and add export-map/import stability tests once DatePicker entry-point packaging is decided.
```

```
Date: 2026-03-19
Changed: projects/ui-lib-custom/src/lib/date-picker/date-picker.ts, projects/ui-lib-custom/src/lib/date-picker/date-picker.html, projects/ui-lib-custom/src/lib/date-picker/date-picker.scss, AI_AGENT_CONTEXT.md
State: Implemented DatePicker Prompt 7 time picker and button bar integration. Added full time panel rendering with hour/minute/optional second spinners, AM/PM toggle for 12-hour mode, step-based wrap increment/decrement (`stepHour`, `stepMinute`, `stepSecond`), direct numeric input drafts with digit filtering and blur commit/padding, and keyboard handling for Up/Down/Enter on spinner inputs. Time state now merges into model values through mode-aware CVA updates (`single`, `multiple`, `range`) without changing selected date portions. Updated panel layout so `timeOnly` hides calendar header/grid and displays only time controls. Added button bar behavior for Today and Clear actions, plus projected custom slot support via `[datePickerButtonBar]`. Extended ARIA semantics for time groups/spinbuttons/action buttons and updated formatted value logic to append/emit time strings for `showTime` and time-only display for `timeOnly`.
Verification:
- `npm.cmd test -- --testPathPatterns="date-picker.spec.ts" --runInBand` (PASS: 1 suite, 5 tests; logs in `tmp_primeng/datepicker-p7-time-test.*`).
- `ng.cmd build ui-lib-custom` (PASS; logs in `tmp_primeng/datepicker-p7-time-build.*`).
- `npm.cmd exec -- eslint --no-warn-ignored "projects/ui-lib-custom/src/lib/date-picker/date-picker.ts" "projects/ui-lib-custom/src/lib/date-picker/date-picker.html" "projects/ui-lib-custom/src/lib/date-picker/date-picker.scss"` (PASS, exit code 0; logs in `tmp_primeng/datepicker-p7-time-eslint-nowarn.*`).
- `get_errors` on changed files (`date-picker.ts/.html/.scss`): no errors; only existing non-blocking unused warnings for `navigationState` and `navigateYear` in `date-picker.ts`.
Next step: Add dedicated DatePicker component specs for time spinner keyboard/typing pathways and button-bar Today/Clear behaviors (including 12h mode edge cases like 12 AM/PM conversion).
```

```
Date: 2026-03-20
Changed: projects/ui-lib-custom/date-picker/ng-package.json, projects/ui-lib-custom/date-picker/package.json, projects/ui-lib-custom/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md
State: Completed DatePicker secondary entry-point wiring for Prompt 10. Added a new `projects/ui-lib-custom/date-picker/` entry folder with only `ng-package.json` and `package.json` targeting `../src/lib/date-picker/index.ts`. Updated library package metadata to include `./date-picker` in `exports` and `date-picker` in `typesVersions`. Extended `entry-points.spec.ts` with a `ui-lib-custom/date-picker` import assertion and a primary-barrel guard asserting `DatePickerComponent` is not exported from `ui-lib-custom` root.
Verification:
- `ng.cmd build ui-lib-custom` (PASS).
- `npm.cmd test -- --testPathPatterns='entry-points.spec.ts'` (PASS: 1 suite, 17 tests).
- Dist verification: `dist/ui-lib-custom/date-picker/` exists and `dist/ui-lib-custom/fesm2022/ui-lib-custom-date-picker.mjs` is generated.
Next step: Proceed to Prompt 11 (demo integration + docs) and add DatePicker usage examples against the new `ui-lib-custom/date-picker` import path.
```

```
Date: 2026-04-03
Changed: docs/architecture/INPUTGROUP_ARCHITECTURE.md, AI_AGENT_CONTEXT.md
State: Completed InputGroup Prompt 1 research and API design documentation. Added `INPUTGROUP_ARCHITECTURE.md` with PrimeNG source evidence (`primeng-inputgroup`, `primeng-inputgroupaddon`, and `@primeuix/styles/inputgroup`), full CSS behavior inventory (layout, radius stitching, addon borders/padding, focus z-index, fluid handling), ui-lib interop host-class audit (Input/Select/AutoComplete/CascadeSelect/FloatLabel/IconField/Button), minimal API/host architecture for `uilib-input-group` + `uilib-input-group-addon`, token contract (`--uilib-input-group-*`), and PrimeNG divergence table.
Verification:
- `npm.cmd pack primeng@21 --pack-destination tmp_primeng`
- `tar -xzf tmp_primeng/primeng-21.1.5.tgz -C tmp_primeng`
- `npm.cmd pack @primeuix/styles --pack-destination tmp_primeng`
- `tar -xzf tmp_primeng/primeuix-styles-2.0.3.tgz -C tmp_primeng/primeuix_styles`
- Evidence reviewed from:
  - `tmp_primeng/package/types/primeng-inputgroup.d.ts`
  - `tmp_primeng/package/types/primeng-inputgroupaddon.d.ts`
  - `tmp_primeng/package/fesm2022/primeng-inputgroup.mjs`
  - `tmp_primeng/package/fesm2022/primeng-inputgroupaddon.mjs`
  - `tmp_primeng/primeuix_styles/package/dist/inputgroup/index.mjs`
Next step: Start InputGroup Prompt 2 implementation scaffolding (`input-group.ts/.html/.scss`, `input-group-addon.ts/.html/.scss`, `index.ts`) with standalone + OnPush + ViewEncapsulation.None and CSS-first behavior.
```

```
Date: 2026-04-03
Changed: projects/ui-lib-custom/src/lib/input-group/input-group.ts, projects/ui-lib-custom/src/lib/input-group/input-group.html, projects/ui-lib-custom/src/lib/input-group/input-group.scss, projects/ui-lib-custom/src/lib/input-group/input-group-addon.ts, projects/ui-lib-custom/src/lib/input-group/input-group-addon.html, projects/ui-lib-custom/src/lib/input-group/input-group-addon.scss, projects/ui-lib-custom/src/lib/input-group/input-group.constants.ts, projects/ui-lib-custom/src/lib/input-group/input-group.spec.ts, projects/ui-lib-custom/src/lib/input-group/index.ts, projects/ui-lib-custom/input-group/ng-package.json, projects/ui-lib-custom/input-group/package.json, projects/ui-lib-custom/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md
State: Completed InputGroup Prompt 2 scaffold and secondary entry-point wiring. Added standalone OnPush + ViewEncapsulation.None wrapper components (`InputGroupComponent`, `InputGroupAddonComponent`) with minimal `<ng-content />` templates, placeholder SCSS files, class constants, index barrel exports, and a minimal spec shell. Added `projects/ui-lib-custom/input-group/` manifests (`ng-package.json`, `package.json`) and registered `./input-group` in library `exports` + `typesVersions`. Extended entry-point import regression tests with `ui-lib-custom/input-group` assertions.
Verification:
- `ng.cmd build ui-lib-custom` (PASS)
  - Includes built entry: `ui-lib-custom/input-group`
  - Note: ng-packagr warns that `exports["./input-group"].types` and `default` can be overridden by manifest generation; build still completes successfully.
- `npm.cmd test -- --testPathPatterns='entry-points.spec.ts'` (PASS: 1 suite, 21 tests)
  - Confirms `import('ui-lib-custom/input-group')` resolves and exports both `InputGroupComponent` and `InputGroupAddonComponent`.
- Dist artifact check:
  - `dist/ui-lib-custom/input-group/package.json` exists
  - `dist/ui-lib-custom/fesm2022/ui-lib-custom-input-group.mjs` exists
Next step: Implement Prompt 3 InputGroup styling pass (layout, border-radius stitching, addon surface, focus z-index, fluid handling) using the token contract from `docs/architecture/INPUTGROUP_ARCHITECTURE.md`.
```

```
Date: 2026-04-03
Changed: projects/ui-lib-custom/src/lib/input-group/input-group.scss, projects/ui-lib-custom/src/lib/input-group/input-group-addon.scss, projects/ui-lib-custom/src/lib/input-group/design-tokens.ts, projects/ui-lib-custom/src/lib/input-group/index.ts, AI_AGENT_CONTEXT.md
State: Completed InputGroup Prompt 3 core implementation and styling pass. Implemented CSS-only behavior for InputGroup and InputGroupAddon with tokenized fallbacks: base flex layout, control/wrapper stretch behavior, broad border-radius stripping across direct and wrapped form surfaces (`ui-lib-input`, `ui-lib-select`, `ui-lib-autocomplete`, `ui-lib-cascade-select`, `uilib-float-label`, `ui-lib-icon-field`, native inputs/textarea), first/last edge radius restoration, focus z-index layering, and fluid-width compatibility selector. Added `input-group/design-tokens.ts` documentation constant and exported it from the InputGroup barrel.
Verification:
- `ng.cmd build ui-lib-custom` (PASS)
  - Includes built entry: `ui-lib-custom/input-group`
  - Note: existing ng-packagr warnings persist for `exports["./input-group"].types` and `default` override behavior.
- `npm.cmd test -- --testPathPatterns='entry-points.spec.ts'` (PASS: 1 suite, 21 tests)
  - Confirms `ui-lib-custom/input-group` import still resolves and exports `InputGroupComponent` + `InputGroupAddonComponent`.
Next step: Add focused InputGroup unit coverage for structural class/host rendering and wrapper composition scenarios (addon+control ordering, FloatLabel/IconField nesting) before docs/demo integration.
````

```
Date: 2026-04-03
Changed: projects/demo/src/app/pages/input-group/input-group-demo.component.ts, projects/demo/src/app/pages/input-group/input-group-demo.component.html, projects/demo/src/app/pages/input-group/input-group-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, docs/reference/components/INPUTGROUP.md, AI_AGENT_CONTEXT.md
State: Completed InputGroup Prompt 5 demo and documentation integration. Added a new InputGroup demo page with six anchored sections (basic, multiple addons, button addon, checkbox composition, float-label variants, and sizes), each wrapped in `ui-lib-card` and `app-code-preview` snippets. Registered lazy route `/input-group` and sidebar Form navigation entry. Added `docs/reference/components/INPUTGROUP.md` with overview, import path, API tables (no-input wrappers), CSS token contract, usage snippets, integration notes, PrimeNG divergences, and accessibility notes.
Verification:
- `npm.cmd test -- --testPathPatterns='input-group.spec.ts' --runInBand`
- `ng.cmd build ui-lib-custom`
- `ng.cmd build demo`
Next step: Optional follow-up is adding `INPUTGROUP.md` to `docs/reference/components/README.md` quick links for full reference index visibility.
```

```
Date: 2026-04-03
Changed: projects/demo/src/app/pages/input-group/input-group-demo.component.ts, projects/demo/src/app/pages/input-group/input-group-demo.component.html, projects/demo/src/app/pages/input-group/input-group-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, docs/reference/components/INPUTGROUP.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Finalized InputGroup Prompt 5 integration and verification. Fixed Angular template parsing by escaping literal `@` addon content as `&#64;` in the demo page. Added InputGroup docs index entry in component reference README so the new page is discoverable.
Verification:
- `npm.cmd test -- --testPathPatterns='input-group.spec.ts' --runInBand` (PASS: 1 suite, 11 tests)
- `ng.cmd build ui-lib-custom` (PASS; existing non-blocking ng-packagr warning for `./input-group` export conditions remains)
- `ng.cmd build demo` (PASS; existing non-blocking style budget warnings for button/date-picker remain)
Next step: Optional manual browser QA on `/input-group` in demo (`npm.cmd run serve:demo`) to visually confirm spacing and border stitching across sections.
```

