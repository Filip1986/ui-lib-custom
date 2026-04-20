# AI Agent Context Archive

This file stores older `## Last Session` handoff notes migrated out of `AI_AGENT_CONTEXT.md`.
Keep `AI_AGENT_CONTEXT.md` focused on active state and recent handoffs.

Stable architecture/conventions/workflows are owned by `AGENTS.md`.

## Archive Index

- Range: 2026-03-17 through 2026-04-16
- Coverage: CascadeSelect completion, Checkbox parity phases, DatePicker implementation, InputGroup integration, InputMask research, InputNumber prompts 1-8 rollovers, SpeedDial prompts 1-4 rollovers
- Source: migrated from `AI_AGENT_CONTEXT.md` during context cleanup and retention rollovers on 2026-04-08

## Archived Session Summary (Condensed)

### 2026-03-17 to 2026-03-20
- CascadeSelect prompts 5-8 completed (styling, tests, docs/demo integration, entry-point verification).
- DatePicker prompts 8-9 completed (tokenized styling + expanded unit coverage).
- Checkbox parity phases progressed and stabilized with CVA, outputs, appearance, a11y, demo, and docs updates.

### 2026-03-19 to 2026-04-03
- ColorPicker research and architecture planning completed.
- InputGroup implementation, entry-point coverage, and demo/docs integration completed.

### 2026-04-06
- InputMask research and PrimeNG parity analysis completed.

### 2026-04-08 (Retention rollovers)
- InputNumber Prompt 4 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 5 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 6 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 7 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 8 handoff moved from `AI_AGENT_CONTEXT.md`.

### 2026-04-16 (Retention rollovers)
- SpeedDial Prompt 1 handoff moved from `AI_AGENT_CONTEXT.md`.
- SpeedDial Prompt 2 handoff moved from `AI_AGENT_CONTEXT.md`.
- SpeedDial Prompt 3 handoff moved from `AI_AGENT_CONTEXT.md`.
- SpeedDial Prompt 4 handoff moved from `AI_AGENT_CONTEXT.md`.

### Archived InputNumber Handoffs (Chronological)

```text
Date: 2026-04-08
Changed: docs/research/INPUTNUMBER_RESEARCH.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 1 complete. Research doc at `docs/research/INPUTNUMBER_RESEARCH.md`. Next: Prompt 2 (API design & NumberFormatService).
Verification:
- PrimeNG v19 InputNumber API and implementation reviewed from packed sources (`inputnumber.d.ts`, `inputnumber.interface.d.ts`, `primeng-inputnumber.mjs`).
Next step: Start Prompt 2 and define the `NumberFormatService` API plus `InputNumber` signal-based public types.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 7 complete. Styling now covers joined button geometry, severity palettes, variant modifiers, size scaling, loading animation, and dropdown panel visuals using `--uilib-split-button-*` variables aligned with Button color mappings. Next: Prompt 8 (tests).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- SplitButton lint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/split-button/`.
Terminal notes:
- Failed: none in-session.
- Worked: ran `npx.cmd ng build ui-lib-custom` and `npx.cmd eslint projects/ui-lib-custom/src/lib/split-button/` from `bash.exe`.
- Warning: ng-packagr still reports conflicting `default` export conditions for `./speed-dial` and `./split-button` while writing package manifest.
Next step: Prompt 8 — add unit tests for style-state host classes, menu rendering states, and keyboard/focus regressions.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.types.ts, projects/ui-lib-custom/src/lib/input-number/number-format.service.ts, projects/ui-lib-custom/src/lib/input-number/number-format.service.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 2 complete. Types at `input-number.types.ts`, `NumberFormatService` at `number-format.service.ts` with passing tests. Next: Prompt 3 (component scaffold & CVA).
Verification:
- Targeted formatter/parser diagnostics via `get_errors` report no blocking TypeScript/ESLint errors in new InputNumber files.
- Jest command executed: `npx jest input-number/number-format --coverage --runInBand --no-cache`.
Next step: Scaffold `InputNumberComponent` + secondary entry-point wiring and CVA shell.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, projects/ui-lib-custom/src/lib/input-number/index.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 3 complete. Component scaffold with CVA, input handling, spinner logic, and clear button. Next: Prompt 4 (styling).
Verification:
- `get_errors` reports no blocking diagnostics in `input-number.component.ts` and `index.ts`.
- Build command executed: `npx ng build ui-lib-custom`.
Next step: Implement Prompt 4 styles for all layouts, sizes, variants, and CSS variables.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, projects/ui-lib-custom/src/lib/input-number/input-number.component.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 4 complete. Full styling with variant overrides and size tokens. Next: Prompt 5 (tests).
Verification:
- `get_errors` reports no blocking diagnostics in `input-number.component.ts` and `input-number.component.scss`.
- Build/serve commands were executed via PowerShell; `npx` in PowerShell is blocked by execution policy on this machine, so visual verification was not completed in-session.
Next step: Implement Prompt 5 unit tests for rendering, keyboard interactions, spinner behavior, CVA integration, and clear action.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 5 complete. Component tests passing with >90% coverage. Next: Prompt 6 (secondary entry point).
Verification:
- Added comprehensive InputNumber unit test coverage for rendering, formatting, parsing, spinner, keyboard, CVA/forms, clear button, and a11y behavior.
- `get_errors` reports no blocking diagnostics in `input-number.component.spec.ts`.
- Jest command executed and passing: `npx jest input-number --coverage --runInBand --no-cache`.
- Coverage for `projects/ui-lib-custom/src/lib/input-number/input-number.component.ts`: 96.31% statements, 86.9% branches, 100% functions, 96.27% lines.
Next step: Prompt 6 secondary entry-point wiring and export-map verification.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/input-number/ng-package.json, projects/ui-lib-custom/input-number/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 6 complete. Secondary entry point `ui-lib-custom/input-number` wired and building. Next: Prompt 7 (demo page).
Verification:
- Added secondary entry-point metadata files under `projects/ui-lib-custom/input-number/` (`ng-package.json`, `package.json`).
- Updated entry-point import regression test in `projects/ui-lib-custom/test/entry-points.spec.ts` to include `ui-lib-custom/input-number`.
- Verified `projects/ui-lib-custom/src/public-api.ts` does not re-export `input-number`.
- Build command passed: `npx ng build ui-lib-custom` (includes `ui-lib-custom/input-number` entry point).
- Targeted entry-point test passed: `npx jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
Next step: Prompt 7 demo page integration for InputNumber.
```

```text
Date: 2026-04-08
Changed: projects/demo/src/app/pages/input-number/input-number-demo.component.ts, projects/demo/src/app/pages/input-number/input-number-demo.component.html, projects/demo/src/app/pages/input-number/input-number-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 7 complete. Demo page with 17 scenarios. Next: Prompt 8 (documentation & final QA).
Verification:
- Added `InputNumberDemoComponent` page with 17 sections covering numerals, formatting/locale/currency, prefix/suffix, spinner layouts, step/min-max, float-label, clear, sizes, states, filled, fluid, and reactive forms.
- Added lazy route in `projects/demo/src/app/app.routes.ts` for `/input-number`.
- Added sidebar form-navigation item in `projects/demo/src/app/layout/sidebar/sidebar.component.ts`.
- Demo build passed: `npx ng build demo`.
- Demo server route check responded with HTTP 200: `curl -I http://localhost:4200/input-number` (local server was already bound on port 4200).
Next step: Prompt 8 documentation updates and final QA sweep.
```

```text
Date: 2026-04-08
Changed: docs/reference/components/INPUTNUMBER.md, docs/reference/components/README.md, projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, projects/demo/src/app/pages/input-number/input-number-demo.component.ts, projects/demo/src/app/pages/input-number/input-number-demo.component.html, projects/demo/src/app/pages/input-number/input-number-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 8 complete. Fully implemented, tested, documented, and demoed. Next: Backlog follow-ups / v2 hardening only.
Verification:
- Library build passed: `npx ng build ui-lib-custom`.
- Tests passed: `npx jest input-number --coverage --runInBand --no-cache` (InputNumber coverage: 96.55% statements, 87.5% branches, 100% functions, 96.51% lines).
- Lint passed: `npx eslint projects/ui-lib-custom/src/lib/input-number/`.
- Demo serve command executed: `npx ng serve demo --no-open` (dev server compiled; existing local server remains on port 4200).
- Route check passed: `curl -I http://localhost:4200/input-number` returned HTTP 200.
Known issues / v2 considerations:
- Pre-existing non-blocking watch items remain (Jest haste-map naming collision warning; demo SCSS budget warnings for `button` and `date-picker`).
- Runtime/manual visual + SR announcement checks still recommended for full UX sign-off across all 17 InputNumber demo sections.
Next step: Shift focus to queued backlog (`knip`, constants cleanup, overlay follow-ups) unless new InputNumber regressions appear.
```

```text
Date: 2026-04-16
Changed: docs/research/SPEEDDIAL_RESEARCH.md, AI_AGENT_CONTEXT.md
State: SpeedDial: Prompt 1 complete. Research documented with API surface, layout formulas, a11y contract, and divergence plan. Next: Prompt 2 (API design & types).
Verification:
- PrimeNG v19 SpeedDial API reviewed from packed sources (speeddial.d.ts, primeng-speeddial.mjs).
Next step: Prompt 2 — define SpeedDial types, constants, and public input/output signatures.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.types.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.constants.ts, projects/ui-lib-custom/src/lib/speed-dial/index.ts, AI_AGENT_CONTEXT.md
State: SpeedDial: Prompt 2 complete. Types, constants, and barrel defined. Next: Prompt 3 (scaffold + entry point).
Verification:
- ESLint/TS check: no blocking diagnostics on new files (`get_errors` shows warnings only for currently unused symbols).
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` from `bash.exe`.
Next step: Prompt 3 — scaffold component files, template directives, and secondary entry point wiring.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.html, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.scss, projects/ui-lib-custom/src/lib/speed-dial/speed-dial-templates.directive.ts, projects/ui-lib-custom/src/lib/speed-dial/index.ts, projects/ui-lib-custom/speed-dial/ng-package.json, projects/ui-lib-custom/speed-dial/package.json, projects/ui-lib-custom/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 3 complete. Component scaffold, template marker directives, and `ui-lib-custom/speed-dial` secondary entry point are wired. Next: Prompt 4 (core behavior implementation).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom`.
- Entry-point regression test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
- Confirmed `projects/ui-lib-custom/src/public-api.ts` has no `speed-dial` re-export.
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` and `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` from `bash.exe`.
- Warning: ng-packagr reported `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` during build, but build completed successfully.
Next step: Prompt 4 — implement SpeedDial visibility, interactions, and signal-driven host classes.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 4 complete. Core component logic wired for visibility, item iteration, keyboard/focus behavior, ARIA structure, and variant-based host classes (linear-mode layout placeholder only). Next: Prompt 5 (layout math).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` from `bash.exe`.
- Warning: ng-packagr reported `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` while writing package manifest.
Next step: Prompt 5 — implement linear/circle/semi/quarter item layout math and direction-specific transforms.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.spec.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 5 complete. Layout geometry extracted into pure utility and wired into component transform mapping. Next: Prompt 6 (mask/outside-click behavior).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom` (captured in `tmp/speed-dial-build.log`, exit code `0` in `tmp/speed-dial-build.exit`).
- Layout tests passed: `npx.cmd jest projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.spec.ts --runInBand --no-cache --coverage --collectCoverageFrom="projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.ts"` (captured in `tmp/speed-dial-layout-test.log`, exit code `0` in `tmp/speed-dial-layout-test.exit`).
- Coverage (`speed-dial-layout.ts`): 100% statements, 95.83% branches, 100% functions, 100% lines.
Terminal notes:
- Failed: direct terminal streaming intermittently returned empty output in-session.
- Worked: redirecting command output to log files under `tmp/` and validating exit codes.
- Warning: ng-packagr reported `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` during build.
Next step: Prompt 6 — add mask and outside-click close behavior.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 6 complete. Mask layer, outside-click close, document Escape handling, and close-time focus restoration are implemented. Next: Prompt 7 (styling pass).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom` (captured in `tmp/speed-dial-prompt6-build.log`, exit code `0` in `tmp/speed-dial-prompt6-build.exit`).
Terminal notes:
- Failed: initial build attempt failed due `@HostListener('document:keydown.escape', ['$event'])` typing mismatch (`Event` vs `KeyboardEvent`) with strict TS settings.
- Worked: changed `onDocumentEscape` signature to `event: Event` and narrowed via `instanceof KeyboardEvent`; rebuild passed.
- Warning: ng-packagr still reports `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` during package manifest write.
Next step: Prompt 7 — implement SpeedDial visual styling for mask, trigger, items, and variant/size states.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.scss, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 7 complete. Full styling shipped with tokenized CSS variables, variants, sizes, list/mask animations, and rotate modifier class support. Next: Prompt 8 (component tests + behavior verification).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom` (captured in `tmp/speed-dial-prompt7-build.log`, exit code `0` in `tmp/speed-dial-prompt7-build.exit`).
- ESLint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/speed-dial/` (captured in `tmp/speed-dial-prompt7-eslint.log`, exit code `0` in `tmp/speed-dial-prompt7-eslint.exit`).
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` and `npx.cmd eslint projects/ui-lib-custom/src/lib/speed-dial/` from `bash.exe` with log capture in `tmp/`.
Next step: Prompt 8 — add/expand SpeedDial unit tests for visibility, keyboard, mask/outside-click, focus return, and layout utility integration.
```

```text
Date: 2026-04-17
Changed: projects/demo/src/app/pages/speed-dial/speed-dial-demo.component.ts, projects/demo/src/app/pages/speed-dial/speed-dial-demo.component.html, projects/demo/src/app/pages/speed-dial/speed-dial-demo.component.scss, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 9 complete. Demo page is now wired at `/speed-dial` with PrimeNG-aligned sections (Linear, Circle, Semi-Circle, Quarter-Circle, Tooltip, Mask, Template, Accessibility, API Reference), live examples, and code previews. Next: Prompt 10 (docs/reference updates) if queued.
Verification:
- Demo build passed: `npx.cmd ng build demo` (captured in `tmp/speed-dial-prompt9-build.log`, exit code `0` in `tmp/speed-dial-prompt9-build.exit`).
- Route availability confirmed with HTTP 200 using a HEAD probe against a running local server (`node` http request) captured in `tmp/speed-dial-prompt9-curl.log` with exit code `0` in `tmp/speed-dial-prompt9-curl.exit`.
Terminal notes:
- Failed: direct `curl` output in-session returned empty output despite command execution, so status visibility was unreliable.
- Worked: started demo server via `npx.cmd ng serve demo --port 4200 --host 127.0.0.1` (log in `tmp/speed-dial-prompt9-serve.log`) and verified route status with a Node HTTP HEAD request (`status:200`).
Next step: Prompt 10 — update component reference docs and cross-link demo coverage notes.
```

```text
Date: 2026-04-17
Changed: docs/reference/components/SPEEDDIAL.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 10 complete. Fully implemented, tested, documented, and demoed. Next: Backlog.
Verification:
- ng build ui-lib-custom: PASS (`npx.cmd ng build ui-lib-custom`; log `tmp/speed-dial-prompt10-build-lib.log`, exit `tmp/speed-dial-prompt10-build-lib.exit` = `0`).
- speed-dial jest coverage: `speed-dial.component.ts` 91.17% statements, 84.09% branches, 100% functions, 91.04% lines (`npx.cmd jest speed-dial --coverage --runInBand --no-cache`; log `tmp/speed-dial-prompt10-jest.log`, exit `tmp/speed-dial-prompt10-jest.exit` = `0`).
- eslint: clean (`npx.cmd eslint projects/ui-lib-custom/src/lib/speed-dial/`; log `tmp/speed-dial-prompt10-eslint.log`, exit `tmp/speed-dial-prompt10-eslint.exit` = `0`).
- entry-points regression: PASS (`npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`; log `tmp/speed-dial-prompt10-entrypoints.log`, exit `tmp/speed-dial-prompt10-entrypoints.exit` = `0`).
- demo build: PASS (`npx.cmd ng build demo`; log `tmp/speed-dial-prompt10-build-demo.log`, exit `tmp/speed-dial-prompt10-build-demo.exit` = `0`).
Known issues / v2 considerations:
- Tooltip currently falls back to `title` attribute; replace with `ui-lib-tooltip` when that component ships.
- RTL-specific direction mirroring deferred.
Next step: Resume queued backlog items.
```

```text
Date: 2026-04-17
Changed: docs/research/SPLITBUTTON_RESEARCH.md, AI_AGENT_CONTEXT.md
State: SplitButton: Prompt 1 complete. Research documented with API surface, DOM structure, severity integration, keyboard matrix, a11y contract, and divergence plan. Next: Prompt 2 (API design & types).
Verification:
- PrimeNG v19 SplitButton API reviewed from packed sources (splitbutton.d.ts, primeng-splitbutton.mjs, menuitem.d.ts).
Next step: Prompt 2 — define SplitButton types, shared MenuItem interface, constants, and public input/output signatures.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, projects/ui-lib-custom/src/lib/split-button/split-button.component.scss, projects/ui-lib-custom/src/lib/split-button/split-button-templates.directive.ts, projects/ui-lib-custom/split-button/ng-package.json, projects/ui-lib-custom/split-button/package.json, projects/ui-lib-custom/src/lib/split-button/index.ts, projects/ui-lib-custom/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 3 complete. Component scaffold, template marker directives, and `ui-lib-custom/split-button` secondary entry point are wired. Next: Prompt 4 (core behavior implementation).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- Entry-point regression test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
- Confirmed `projects/ui-lib-custom/src/public-api.ts` has no `split-button` re-export.
Terminal notes:
- Failed: first build failed due `TemplateRef` imported as type-only and then used as a value in `contentChild(..., { read: TemplateRef })`.
- Worked: imported `TemplateRef` as a value, rebuilt successfully, and reran entry-point regression tests successfully from `bash.exe` using PowerShell + `npx.cmd`.
- Warning: ng-packagr reports conflicting export condition for `./speed-dial` and now `./split-button` because `default` is present in `projects/ui-lib-custom/package.json` exports.
Next step: Prompt 4 — implement SplitButton open/close state, item activation, keyboard navigation, and ARIA wiring.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 4 complete. Core state logic is wired for variant/severity class resolution, main action click, and menu open/close toggle with ARIA linkage. Next: Prompt 5 (menu item rendering + panel population).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: initial Prompt 4 diagnostics flagged `NgTemplateOutlet` unused because template still had scaffold markup.
- Worked: updated template to block syntax with `ngTemplateOutlet` slots and reran build successfully from `bash.exe` via PowerShell + `npx.cmd`.
- Warning: ng-packagr continues to warn about conflicting `default` export conditions for `./speed-dial` and `./split-button`.
Next step: Prompt 5 — render menu items into the panel and wire item command events.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, AI_AGENT_CONTEXT.md
State: SplitButton: Prompt 5 complete. Dropdown panel now renders visible model items, handles separators/disabled rows, dispatches item command events, supports URL/router navigation, closes on outside-click/Escape, and focuses the first actionable item on open. Next: Prompt 6 (full keyboard navigation).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: built from `bash.exe` using `npx.cmd ng build ui-lib-custom`.
- Warning: ng-packagr still reports conflicting `default` export conditions for `./speed-dial` and `./split-button` while writing package manifest.
Next step: Prompt 6 — implement full menu keyboard navigation (Arrow/Home/End/Enter/Space/Tab) and active-item semantics.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 6 complete. Full keyboard handling and ARIA wiring now cover main button passthrough, menu button toggle/open-first/open-last behavior, menu item roving focus keys, and programmatic focus return to the menu trigger on Escape/item activation. Next: Prompt 7 (styling).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: built from `bash.exe` using `npx.cmd ng build ui-lib-custom`.
- Warning: ng-packagr still reports conflicting `default` export conditions for `./speed-dial` and `./split-button` while writing package manifest.
Next step: Prompt 7 — implement SplitButton visual styling and tokenized CSS variables for all variants/sizes/states.
```
