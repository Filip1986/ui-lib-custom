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
| Input           | ✅ Bulletproof  | `ui-lib-custom/input`            | ❌ Missing         | Needs API + implementation docs                    |
| Select          | ✅ Bulletproof  | `ui-lib-custom/select`           | ❌ Missing         | Needs API + implementation docs                    |
| Checkbox        | ✅ Bulletproof  | `ui-lib-custom/checkbox`         | ⚠️ API only       | Needs implementation doc                           |
| SelectButton    | ✅ Bulletproof  | `ui-lib-custom/select-button`    | ✅ Complete        | Optional: consolidate supplemental API/Research    |
| Icon            | ✅ Bulletproof  | `ui-lib-custom/icon`             | ⚠️ API only       | Needs implementation doc                           |
| IconButton      | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ API only       | Needs implementation doc                           |
| Layout (Stack/Inline/Grid/Container) | ✅ Bulletproof | `ui-lib-custom/layout` | ❌ Missing | Needs docs per primitive                   |
| Alert           | ✅ Bulletproof  | *(pending entry point)*          | ⚠️ Partial        |                                                    |
| ThemeEditor     | ✅ Working      | `ui-lib-custom/theme`            | ✅ README          | Demo sidebar, not a consumer component             |

**Secondary entry points implemented:** button, badge, accordion, tabs, input, select-button, core, card, checkbox, select, icon, layout, theme, tokens  
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

- **Active:** Component foundation hardening, documentation gap-filling (Input, Select, Card, Layout)
- **Next in queue:** Dead code cleanup with `knip`, constants extraction pass
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, axe-core a11y audit

---

## Last Session

*(Paste agent handoff note here at the end of each session)*

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
