# Working Instructions for ui-lib-custom

> Auto-generated from project documentation. This is the stable reference for AI-assisted sessions on this project.

---

## Project Overview

`ui-lib-custom` is a next-generation Angular UI ecosystem — signals-first, tree-shakable, accessibility-native, and design-token-driven. It lives in a monorepo-style Angular workspace with three projects:

- `projects/ui-lib-custom` — the library itself (secondary-entry-point architecture)
- `projects/demo` — demo application with live Theme Editor
- `projects/minimal` — minimal app used for tree-shaking verification

**Goal:** Build the most modern, performant, accessible, composable, and developer-loved Angular UI ecosystem ever built — the library that makes Angular developers feel what React developers felt when modern UI ecosystems exploded. APIs that feel intelligent, components that feel effortless, performance that feels invisible, and an experience that feels years ahead of the current Angular ecosystem.

**Current committed "wow factor":** Elite Accessibility — every component meets the standard described in `docs/VISION.md`. When any trade-off arises, always go further on accessibility, not less.

> Full strategic context: [`docs/VISION.md`](docs/VISION.md)

### Commercial Strategy

The library targets two tiers: a free/open-source foundation and a premium pro layer. The Angular ecosystem's smaller size is a competitive advantage — much premium React tooling never reaches Angular, or arrives as a mediocre wrapper. "Angular-native and deeply polished" is itself a differentiator.

**What drives willingness to pay:** reliability, performance, accessibility compliance, TypeScript quality, Angular integration depth, documentation, and saved engineering time. Visual polish alone does not.

**Highest-value premium component categories (prioritised):**

| Category | Flagship examples |
|---|---|
| Advanced Data | Signals-first data grid with virtual scroll, column pinning, Excel-like editing, tree table, server-side ops |
| Workflow / Visual Builder | Drag-drop pipeline builder, query builder (nested conditions → SQL/Mongo/Elastic), BPMN editor, form/survey builder |
| Enterprise Forms | JSON-schema-driven dynamic forms, complex conditional wizards, large reactive-form performance tooling |
| Charts & Analytics | Gantt / resource scheduler, org chart, network graph, TradingView-like chart, realtime dashboard widgets |
| AI-Integrated UI | Streaming chat widget, prompt playground, AI diff/review panels, token-usage viewer, AI workflow builder |
| Rich Text / Document | Notion-like editor, collaborative editor, PDF annotation viewer, diff viewer, document approval flow |
| Developer Experience | Query/log viewers, feature-flag dashboards, permission/role editors, API explorer, audit viewers |
| Industry-Specific | Patient timeline (healthcare), order-book / candlestick (finance), route planner (logistics), org chart (HR) |

**Top 8 recommendations for 2026 Angular market:**
1. Angular Signals-first data grid
2. Query builder
3. Workflow / pipeline builder
4. AI chat / agent UI kit
5. Gantt / scheduler
6. Dynamic form engine
7. Realtime monitoring dashboard components
8. Collaborative document components

**Preferred business model:** freemium open-source core + team/org licence for pro features (advanced grid capabilities, hosted schema storage, enterprise support). Industry-specific components justify higher per-component pricing due to encoded domain knowledge.

---

## Session Start Protocol

At the start of every session, read these files in order:

1. `AI_AGENT_CONTEXT.md` — current milestone, active component status, recent handoffs
2. `LIBRARY_CONVENTIONS.md` — architectural rules and anti-patterns (source of truth)
3. `docs/VISION.md` — strategic north star; re-read when making API, DX, or architectural trade-offs
4. Component doc at `docs/reference/components/<name>.md` — if working on a specific component
5. `docs/architecture/` — if touching cross-cutting concerns (entry points, theming, tokens)

**Standards reference** (apply to all generated code):

| Standard       | File                               | Key library rules                                                    |
|----------------|------------------------------------|----------------------------------------------------------------------|
| CSS / SCSS     | `docs/standards/CSS-STANDARDS.md`  | `--uilib-*` tokens, `ViewEncapsulation.None` BEM, cascade layers     |
| HTML templates | `docs/standards/HTML-STANDARDS.md` | ARIA completeness, keyboard patterns, content projection             |
| JS runtime     | `docs/standards/JS-STANDARDS.md`   | `DestroyRef` cleanup, layout thrashing, no Workers in library code   |

Do not skip step 1. It tells you exactly what is in-flight and what is next.

**Before using any `ui-lib-*` component in a demo or other component, read its `README.md` at `projects/ui-lib-custom/src/lib/<component>/README.md`.** This is the authoritative, co-located API contract — check it for the exact inputs, outputs, and content projection pattern before writing any template code. Never assume PrimeNG conventions apply.

---

## Non-Negotiable Conventions

These rules apply to every task, no exceptions:

- **Elite Accessibility is the current strategic priority** — keyboard navigation, correct ARIA, focus management, reduced motion, screen reader support, and WCAG 2.1 AA are non-negotiable on every component. When any a11y trade-off arises, always go further, not less. See `docs/VISION.md` for the full commitment.
- **`ViewEncapsulation.None`** on every library component — mandatory for CSS variable cascading and animations
- **`ChangeDetectionStrategy.OnPush`** on every component
- **Standalone components only** — no NgModules
- **Signal inputs/outputs** — use `input()`, `model()`, `output()` — never `@Input()` / `@Output()` decorators
- **Explicit return types** on every method, getter, and function — no inference (`computed<Type>((): Type => ...)`)
- **Angular block syntax** — `@if`, `@for (x of y; track z)`, `@switch` — never `*ngIf` / `*ngFor`
- **No cross-entry-point relative imports** — use package paths: `import { X } from 'ui-lib-custom/button'`, never `from '../button'`. Relative paths are fine *within* the same entry point. Full rules: `LIBRARY_CONVENTIONS.md → Cross-Entry Import Rule`.
- **HTML templates** — see [`docs/standards/HTML-STANDARDS.md`](./docs/standards/HTML-STANDARDS.md) for the full library-specific standard. Key rules unique to this library:
  - **No hard-coded heading levels** (`<h1>`–`<h3>`) — heading level must be an input so consumers own the document outline
  - **ARIA widget role completeness** — every ARIA role must include all required aria-* properties (enforced by ESLint `role-has-required-aria-props`)
  - **WAI-ARIA keyboard patterns** — implement the exact keyboard contract for the widget type (listbox, combobox, tree, grid, etc.)
  - **Content projection slots** follow `uilib-` prefix convention: `<ng-content select="[uilib-header]" />`
  - **Host bindings** must set both `[attr.disabled]` and `[attr.aria-disabled]` in sync
  - 13 `@angular-eslint/template/*` rules enforced — `errors` block PRs; `warnings` must be clean before marking a component complete
- **Public input types are string unions** — `'material' | 'bootstrap' | 'minimal'` — not enum, not constants object
- **No raw hex/px in CSS rule bodies** — always use a `var(--uilib-*)` CSS custom property. Exception: hex may appear as the *default value* in a CSS custom property definition (`--uilib-foo: #hex`) — that IS the token level. When a global palette token exists for that color, use `var(--uilib-color-neutral-300, #hex)` instead of bare hex. When the color is appearance-specific, add it as a constant to `design-tokens.ts` and link back from the SCSS comment. Full rules: `LIBRARY_CONVENTIONS.md → Design Token Rule`.
- **Every new component SCSS file must be wrapped in `@layer uilib.components { }`** — all library SCSS lives inside named cascade layers so consumer CSS always wins without specificity battles. `themes.scss` uses `@layer uilib.tokens { }`. Exception: `high-contrast.scss` stays outside layers. Full rules + rationale: `LIBRARY_CONVENTIONS.md → CSS Cascade Layer Rule` and `docs/architecture/ADR_CSS_LAYER_ADOPTION.md`.
- **Logical CSS properties everywhere** — never use physical directional properties (`margin-left/right`, `padding-left/right`, `border-left/right`, `border-top/bottom-left/right-radius`, `border-*-left/right-color/width/style`, `text-align: left/right`). Use logical equivalents (`margin-inline-*`, `padding-inline-*`, `border-inline-*`, `border-*-start/end-radius`, `text-align: start/end`). Severity: **error** (blocks commits). Exception: `left: 50%` for centering is still valid. Full rules + mapping table: `LIBRARY_CONVENTIONS.md → Logical CSS / RTL Rule`.
- **Three-layer order: `uilib.base < uilib.tokens < uilib.components`**. Consumer app CSS resets (`* { margin:0; padding:0 }`) MUST go in `@layer uilib.base { }` — without this, unlayered resets override all component padding/margin. App-level `html/body` overrides stay unlayered.
- **`as const` objects** — never TypeScript `enum`
- **Separate template files** — always `templateUrl` / `styleUrl`, never inline `template` or `styles`
- **Self-closing tags** for components without projected content: `<ui-lib-button />`
- **Meaningful names, no abbreviations** — `event` not `e`, `config` not `cfg`, `index` not `idx`
- **Dogfood first** — always use `ui-lib-*` components in demos; never reach for PrimeNG or Angular Material as a substitute
- **Element selectors: `ui-lib-{component}`** (hyphen after `ui`). **CSS variables: `--uilib-{component}-*`** (no hyphen in `uilib`). Two different intentional patterns — never mix them.
- **Output naming — four hard rules** (violating any produces double-firing or corrupted two-way bindings):
  1. **No `on*` prefix** — `onClick` → `buttonClick`, `onChange` → `checkboxChange`
  2. **Never shadow a native DOM event name** (`click`, `input`, `focus`, `blur`, `change`, `submit`, `select`, `keydown`, `keyup`, `scroll`, `load`, `error`, `mousedown`, `mouseup`, `drag`, `drop`, `paste`, `wheel`, and ~30 more). Always prefix with a component qualifier: `buttonClick`, `textareaFocus`, `dateSelect`, `checkboxChange`, `cascadeChange`, `numberFocus`. Full blocked list + naming strategy: `LIBRARY_CONVENTIONS.md → Output Naming Rules`.
  3. **Never name an explicit `output()` `{signalName}Change` when `{signalName}` is a `model()` signal** — the `model()` already generates that name internally for two-way binding; a duplicate overwrites the binding with the event object. For a `selection: model<>()`, the rich-event output must be named something other than `selectionChange` (e.g. `treeChange`).
  4. **`@HostListener` conflict with focus/blur** — if a component listens to its own host's `focus`/`blur` events via `@HostListener` AND exposes outputs with similar semantics, switch to imperative `addEventListener` in the constructor to avoid circular dispatch. See `cascade-select.ts` for the reference implementation.

---

## Active Anti-Patterns (will cause regressions)

| Anti-pattern                                                                                     | Correct approach                                                                                              |
|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| Relative import across entry points (`from '../button'`)                                         | Use `ui-lib-custom/<entry>` package paths (`from 'ui-lib-custom/button'`)                                     |
| Missing `ViewEncapsulation.None`                                                                 | Always add it                                                                                                 |
| Type inference on `computed()`                                                                   | Annotate: `computed<T>((): T => ...)`                                                                         |
| Replacing public string unions with constants                                                    | Keep public types as union literals                                                                           |
| Raw hex in CSS rule bodies (`.foo { color: #hex }`)                                              | Add to `design-tokens.ts`, use `var(--uilib-*)`                                                               |
| Hex as CSS variable default when global token exists                                             | Use `var(--uilib-color-neutral-300, #hex)` — token first, hex as CSS fallback                                 |
| Adding PrimeNG/Material to demo pages                                                            | Use `ui-lib-*` equivalents                                                                                    |
| `enum` instead of `as const`                                                                     | `export const X = { ... } as const`                                                                           |
| `on*` prefix on outputs                                                                          | Remove prefix: `buttonClick`, `checkboxChange`, `slideEnd`                                                    |
| Output named after a native DOM event (`click`, `input`, `focus`, `blur`, `change`, `select`, …) | Add component qualifier: `buttonClick` not `click`; `checkboxChange` not `change`; `dateSelect` not `select`  |
| Explicit `output()` named `{signalName}Change` when `{signalName}` is a `model()` signal         | Give it a distinct name (`treeChange` not `selectionChange`); `model()` owns `{name}Change` for `[(binding)]` |
| `@HostListener('focus'/'blur')` on a component that also exposes focus/blur outputs              | Use imperative `addEventListener` in the constructor — see `cascade-select.ts`                                |
| `uilib-` as element selector prefix                                                              | Element selectors: `ui-lib-{component}`; CSS vars: `--uilib-{component}-*`                                    |
| New component SCSS file without `@layer uilib.components { }` wrapper                            | Wrap entire file: `@layer uilib.components { ... }` — see `LIBRARY_CONVENTIONS.md → CSS Cascade Layer Rule`   |
| Physical directional CSS properties (`margin-left/right`, `padding-left/right`, `border-left/right`, `border-top/bottom-left/right-radius`, `border-left/right-color/width/style`) | Use logical equivalents — see `LIBRARY_CONVENTIONS.md → Logical CSS / RTL Rule`. Severity: **error** (blocks commits). |
| `text-align: left` or `text-align: right`                                                        | Use `text-align: start` / `text-align: end` — physical values break RTL layout                               |
| `left: 0` or `right: 0` when the value IS directional (flush to start/end edge)                 | Use `inset-inline-start: 0` / `inset-inline-end: 0`; `left: 50%` for centering is still valid               |

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
npm run typecheck                  # TypeScript type-check all projects (no emit)

# Lint — run after every component creation or edit (covers .ts AND .html)
npx eslint projects/ui-lib-custom/src/lib/<component>/ --max-warnings 0
npx eslint projects/demo/src/app/pages/<component>/ --max-warnings 0
```

**Git hooks (via Husky):**
- **pre-commit** — runs `lint-staged` (ESLint on staged `.ts`/`.html` + Prettier on staged `.ts` + Stylelint on staged `.scss`)
- **pre-push** — runs `npm run typecheck` (full TS type-check across all five tsconfigs)

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
10. Write `projects/ui-lib-custom/src/lib/<component>/README.md` — document selector, package path, content projection, all inputs/outputs, and a minimal usage example. This is mandatory before marking the component complete.
11. Final verification: **lint** + build + tests + demo + entry-point spec all green.

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
- `README.md` written in `projects/ui-lib-custom/src/lib/<component>/` with accurate inputs, outputs, projection, and usage example
- **Score recorded in `docs/COMPONENT_SCORES.md`** — all 10 categories evaluated; component only considered production-quality when every category ≥ 8
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
├── VISION.md              # Strategic north star — read this first on every session
├── COMPONENT_SCORES.md    # Quality scorecard results + prioritized hardening backlog
├── getting-started/       QUICK_START.md, TEST_GUIDE.md
├── guides/                INTEGRATION_EXAMPLE.md, PUBLISHING_GUIDE.md, ACCESSIBILITY_TESTING.md, THEMING_GUIDE.md
├── prompts/               COMPONENT_EVOLUTION_PROMPTS.md, TIMELINE_PROMPTS.md
├── reference/
│   ├── components/        One .md per component (API + usage + theming + a11y)
│   ├── systems/           DESIGN_TOKENS.md, LAYOUT_SYSTEM.md, THEMING.md, ACCESSIBILITY.md
│   └── project/           PROJECT_SUMMARY.md, UPDATE_LOG.md, VERIFICATION_CHECKLIST.md
└── architecture/          ARCHITECTURE.md
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

> **Current session state** is always in `AI_AGENT_CONTEXT.md` — not this file. Read that first.
