# Working Instructions for ui-lib-custom

> Auto-generated from project documentation. This is the stable reference for AI-assisted sessions on this project.

---

## Project Overview

`ui-lib-custom` is a PrimeNG-inspired Angular component library — lighter, tree-shakable, and easy to theme. It lives in a monorepo-style Angular workspace with three projects:

- `projects/ui-lib-custom` — the library itself (secondary-entry-point architecture)
- `projects/demo` — demo application with live Theme Editor
- `projects/minimal` — minimal app used for tree-shaking verification

**Goal:** Enable rapid project bootstrapping with pre-built component variants (Material, Bootstrap, Minimal), runtime CSS-variable theming, and theme presets saved/loaded as JSON.

---

## Session Start Protocol

At the start of every session, read these files in order:

1. `AI_AGENT_CONTEXT.md` — current milestone, active component status, recent handoffs
2. `LIBRARY_CONVENTIONS.md` — architectural rules and anti-patterns (source of truth)
3. Component doc at `docs/reference/components/<name>.md` — if working on a specific component
4. `docs/architecture/` — if touching cross-cutting concerns (entry points, theming, tokens)

Do not skip step 1. It tells you exactly what is in-flight and what is next.

---

## Non-Negotiable Conventions

These rules apply to every task, no exceptions:

- **`ViewEncapsulation.None`** on every library component — mandatory for CSS variable cascading and animations
- **`ChangeDetectionStrategy.OnPush`** on every component
- **Standalone components only** — no NgModules
- **Signal inputs/outputs** — use `input()`, `model()`, `output()` — never `@Input()` / `@Output()` decorators
- **Explicit return types** on every method, getter, and function — no inference (`computed<Type>((): Type => ...)`)
- **Angular block syntax** — `@if`, `@for (x of y; track z)`, `@switch` — never `*ngIf` / `*ngFor`
- **No cross-entry-point relative imports** — use package paths: `import { X } from 'ui-lib-custom/core'`
- **Public input types are string unions** — `'material' | 'bootstrap' | 'minimal'` — not enum, not constants object
- **No raw hex/px values** — add tokens to `design-tokens.ts` first, then expose as `--uilib-*` CSS vars
- **`as const` objects** — never TypeScript `enum`
- **Separate template files** — always `templateUrl` / `styleUrl`, never inline `template` or `styles`
- **Self-closing tags** for components without projected content: `<ui-lib-button />`
- **Meaningful names, no abbreviations** — `event` not `e`, `config` not `cfg`, `index` not `idx`
- **Dogfood first** — always use `ui-lib-*` components in demos; never reach for PrimeNG or Angular Material as a substitute

---

## Active Anti-Patterns (will cause regressions)

| Anti-pattern | Correct approach |
|---|---|
| Relative import across entry points | Use `ui-lib-custom/<entry>` package paths |
| Missing `ViewEncapsulation.None` | Always add it |
| Type inference on `computed()` | Annotate: `computed<T>((): T => ...)` |
| Replacing public string unions with constants | Keep public types as union literals |
| Inlining raw hex or px | Add to `design-tokens.ts`, use `--uilib-*` var |
| Adding PrimeNG/Material to demo pages | Use `ui-lib-*` equivalents |
| `enum` instead of `as const` | `export const X = { ... } as const` |

---

## Code Organisation

```
projects/ui-lib-custom/
├── src/lib/<component>/          # Component source
│   ├── index.ts                  # Barrel — re-exports everything public
│   ├── <component>.ts
│   ├── <component>.html
│   ├── <component>.scss
│   ├── <component>.spec.ts
│   └── <component>.types.ts      # (if non-trivial types)
├── <component>/                  # Secondary entry point
│   ├── ng-package.json           # → ../src/lib/<component>/index.ts
│   ├── package.json              # { "name": "ui-lib-custom/<component>" }
│   └── public-api.ts             # Thin re-export for path mappings
├── src/public-api.ts             # Primary barrel (backward compat only)
├── package.json                  # exports + typesVersions (update for every new entry point)
└── test/entry-points.spec.ts     # Import regression tests
```

---

## CSS Variable Naming

Pattern: `--uilib-{component}-{property}[-{variant}][-{state}]`

Examples: `--uilib-button-bg`, `--uilib-button-bg-hover`, `--uilib-card-shadow-material`

Reserved global prefixes (system tokens only): `--uilib-color-*`, `--uilib-spacing-*`, `--uilib-radius-*`, `--uilib-shadow-*`, `--uilib-font-*`, `--uilib-surface*`, `--uilib-page-*`, `--uilib-transition-*`, `--uilib-z-*`

---

## Key Commands

```bash
npm install                        # Install deps
npm run build                      # Build library (ng build ui-lib-custom)
npm run build:demo                 # Build demo app
npm run serve:demo                 # Serve demo at localhost:4200
npm test                           # Unit tests (Jest)
npm run test:coverage              # Coverage gate
npm run test:a11y                  # A11y unit tests (*.a11y.spec.ts)
npm run test:a11y:e2e              # Playwright a11y e2e (auto-starts demo)
npm run test:a11y:all              # Full a11y pass + report
npm run verify:tree-shaking        # Tree-shaking guard
npm run storybook                  # Storybook (cross-env sets NODE_ENV)

# Lint — run after every component creation or edit
npx eslint projects/ui-lib-custom/src/lib/<component>/ --max-warnings 0
npx eslint projects/demo/src/app/pages/<component>/ --max-warnings 0
```

**Windows shell note:** If PowerShell blocks `.ps1` shims, run `.cmd` versions from `bash.exe` (`npx.cmd`, `npm.cmd`). Record any workarounds in the session handoff.

---

## Adding a New Component — Checklist

1. Read `COMPONENT_CREATION_GUIDE.md` before writing any code.
2. Classify the component (layout/wrapper, form control, overlay, data display, compound).
3. Research PrimeNG source via `npm pack primeng@19` — inspect `.d.ts` and `.mjs`, never scrape the site.
4. Create files under `projects/ui-lib-custom/src/lib/<component>/`.
5. Create secondary entry point folder with `ng-package.json`, `package.json`, `public-api.ts`.
6. Update `projects/ui-lib-custom/package.json` `exports` + `typesVersions`.
7. Add entry-point import test to `projects/ui-lib-custom/test/entry-points.spec.ts`.
8. Update primary `public-api.ts` only if explicit primary-barrel backward compatibility is intended.
9. After every prompt: **run ESLint first, then build** — `npx eslint projects/ui-lib-custom/src/lib/<component>/ --max-warnings 0`, then `ng build ui-lib-custom`, then update `AI_AGENT_CONTEXT.md`.
10. Final verification: **lint** + build + tests + demo + entry-point spec all green.

### Per-component final checklist (before marking complete)

- `ViewEncapsulation.None` + `OnPush` + standalone
- Signal inputs/outputs only
- `as const` objects, no enums; string union public types
- All methods have explicit return types
- Angular block syntax throughout
- CSS variables prefixed `--uilib-<component>-*`
- Three variants: `material`, `bootstrap`, `minimal`
- Size tokens: `sm` / `md` / `lg`
- Secondary entry point wired and build passing
- **`npx eslint projects/ui-lib-custom/src/lib/<component>/ --max-warnings 0` passes**
- Unit tests with `provideZonelessChangeDetection()` pass
- A11y: ARIA roles, keyboard nav, focus management
- Demo page created and route verified
- `AI_AGENT_CONTEXT.md` inventory updated
- `ng build ui-lib-custom` zero warnings

---

## Testing Notes

- Jest is the sole runner — no Karma/Jasmine.
- Test host components use `provideZonelessChangeDetection()` + `OnPush`.
- `jest.config.ts` aliases `ui-lib-custom/*` directly to source — import failures usually mean export-map/index drift.
- Playwright runs against `localhost:4200`; results in `playwright-report/` + `test-results/a11y-results.json`.
- Known non-blocking warning: `jest-haste-map` module naming collision between root `package.json` and `projects/ui-lib-custom/package.json` — safe to ignore.

---

## Documentation Layout

```
docs/
├── getting-started/   QUICK_START.md, TEST_GUIDE.md
├── guides/            INTEGRATION_EXAMPLE.md, PUBLISHING_GUIDE.md, ACCESSIBILITY_TESTING.md, THEMING_GUIDE.md
├── reference/
│   ├── components/    One .md per component (API + usage + theming + a11y)
│   ├── systems/       DESIGN_TOKENS.md, LAYOUT_SYSTEM.md, THEMING.md, ACCESSIBILITY.md
│   └── project/       PROJECT_SUMMARY.md, UPDATE_LOG.md, VERIFICATION_CHECKLIST.md
└── architecture/      ARCHITECTURE.md
```

When adding or changing a component, always update:
- `docs/reference/components/<name>.md`
- `docs/reference/components/README.md` (component index)

---

## Session Handoff Protocol (mandatory)

At the end of every productive session, append a handoff block to `AI_AGENT_CONTEXT.md → ## Recent Handoffs`:

```
Date: YYYY-MM-DD
Changed: <files modified>
State: <what is complete / in-progress>
Verification: <build/test commands that passed>
Terminal notes: <failed commands and successful workarounds>
Next step: <single most logical next action>
```

Keep only the newest 3 handoffs in `AI_AGENT_CONTEXT.md`. Move older ones to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`. Never write stable architectural rules into `AI_AGENT_CONTEXT.md` — those go in `AGENTS.md` / `LIBRARY_CONVENTIONS.md`.

---

## Current State (as of 2026-04-21)

- **Milestone:** Component foundation hardening + documentation completeness
- **Recently completed:** InputMask, InputNumber, SplitButton, Chart, DataView (all fully implemented, tested, demo'd, documented)
- **Next queue:** `knip` baseline + dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo` / z-index manager), component v2 enhancements
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit
- **Documentation gaps:** `Input`, `Select`, `Card`, `Layout` docs incomplete
- **Pending secondary entry points:** `icon-button`, `alert`
- **Known build warning (pre-existing):** SCSS budget warnings in `button` and `date-picker` — not a blocker
