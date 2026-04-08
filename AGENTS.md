# AGENTS Guide

## Document Ownership
- `AGENTS.md` is the stable source of truth for architecture, conventions, and workflows.
- `AI_AGENT_CONTEXT.md` is the session-state document (active focus, inventory status, and recent handoffs).
- Keep policy/rule changes in `AGENTS.md`; keep per-session execution notes in `AI_AGENT_CONTEXT.md`.
- `AI_AGENT_CONTEXT.md` must retain only the newest 3 handoffs; move older ones to archive.
- Historical handoffs should be moved to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md` to keep active context concise.

## Big Picture
- Monorepo-style Angular workspace with 3 projects in `angular.json`: library (`projects/ui-lib-custom`), demo app (`projects/demo`), and minimal app (`projects/minimal`).
- Library architecture is secondary-entry-point first (tree-shaking), with primary barrel kept for backward compatibility (`projects/ui-lib-custom/src/public-api.ts`).
- Cross-cutting concerns are split into dedicated entry points: `ui-lib-custom/theme` (theme services/directives), `ui-lib-custom/tokens` (`design-tokens.ts`), `ui-lib-custom/core` (shared types/constants to avoid type cycles), `ui-lib-custom/a11y`, and `ui-lib-custom/testing`.
- Theme flow: components read global variant/mode via `ThemeConfigService` signals; service maps presets to CSS vars and applies them to `documentElement` (or a scoped host) (`projects/ui-lib-custom/src/lib/theming/theme-config.service.ts`, `projects/ui-lib-custom/src/lib/theming/theme-scope.directive.ts`).

## Non-Negotiable Conventions (project-specific)
- Every library component uses `ViewEncapsulation.None` + standalone + `OnPush` (see `projects/ui-lib-custom/src/lib/button/button.ts`).
- Use explicit types everywhere, including `computed<...>((): ... => ...)`; lint is strict about inferred function expressions.
- Do not use relative imports across entry-point boundaries; use package paths like `ui-lib-custom/theme`.
- Public input types stay string unions (do not replace with exported constants objects).
- Add new visual values through `projects/ui-lib-custom/src/lib/design-tokens.ts` first; then expose as `--uilib-*` CSS vars.
- Secondary entry-point convention: keep each `<entry>/ng-package.json` pointing at `../src/lib/<entry>/index.ts` (or the specific source file for special cases like `tokens`), and keep thin `<entry>/public-api.ts` re-exports because path mappings include `projects/ui-lib-custom/*/public-api.ts`.

## How Code Is Organized
- Components: `projects/ui-lib-custom/src/lib/<component>/` with `<component>.ts/.html/.scss/.spec.ts` + `index.ts`.
- Packaging and exports: `projects/ui-lib-custom/*/ng-package.json` + `projects/ui-lib-custom/package.json` (`exports`, `typesVersions`).
- Import stability is regression-tested in `projects/ui-lib-custom/test/entry-points.spec.ts`.
- Demo pages/examples/shared code use `@demo/pages/*`, `@demo/examples/*`, and `@demo/shared/*` aliases (`tsconfig.json`, `jest.config.ts`).

## Critical Workflows
- Install deps: `npm install`
- Build library: `npm run build` (or `ng build ui-lib-custom`)
- Build demo app: `npm run build:demo`
- Run demo locally: `npm run serve:demo`
- Unit tests: `npm test`
- Coverage gate: `npm run test:coverage` then `npm run coverage:summary`
- A11y unit tests (`*.a11y.spec.ts`): `npm run test:a11y`
- Playwright a11y e2e (auto-starts demo server): `npm run test:a11y:e2e`
- Full a11y pass + report JSON/HTML: `npm run test:a11y:all` then `npm run test:a11y:report`
- Tree-shaking guard (modifies minimal app temporarily): `npm run verify:tree-shaking`
- Tree-shaking dry run (no file overwrite): `npm run verify:tree-shaking:dry`

## Debugging + Integration Notes
- Jest is zoneless (`setup-jest.ts`) and includes `matchMedia` polyfill; failures around media queries usually indicate missing test setup.
- `jest.config.ts` aliases `ui-lib-custom/*` directly to source, so entry-point import failures usually mean export-map/index drift.
- Playwright config runs against `http://localhost:4200` and stores results in `playwright-report/` + `test-results/a11y-results.json`.
- `npm run test:a11y:e2e` runs only `e2e/a11y.spec.ts`; run `npx playwright test e2e/overlay-mounting.spec.ts` when debugging overlay mounting behavior.
- Storybook commands already set `NODE_ENV` via `cross-env`; prefer `npm run storybook` / `npm run build-storybook`.

## When Adding/Changing Components
- Start with `COMPONENT_CREATION_GUIDE.md` for the component creation workflow and prompt sequencing.
- Update `projects/ui-lib-custom/src/public-api.ts` only when primary-barrel compatibility is intended.
- For new secondary entry points, add `<entry>/package.json`, `<entry>/public-api.ts`, and `<entry>/ng-package.json`, then update `projects/ui-lib-custom/package.json` exports + `typesVersions`.
- Add/adjust entry-point import tests in `projects/ui-lib-custom/test/entry-points.spec.ts`.
- If visual tokens change, sync docs under `docs/reference/systems/` (especially CSS variables docs).
