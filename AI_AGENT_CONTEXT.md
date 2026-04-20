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
- **Active focus:** Backlog stabilization after Chart completion (documentation closeout + QA maintenance)
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), chart v2 enhancements (optional)
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `InputMask` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- Documentation gaps still tracked for: `Input`, `Select`, `Card`, `Layout`
- Pending secondary entry points: `icon-button`, `alert`

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build may show pre-existing SCSS budget warnings in `button` and `date-picker` (not introduced by current InputMask work)

---

## Recent Handoffs

Older handoffs are archived in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

```text
Date: 2026-04-20
Changed: docs/reference/components/CHART.md, docs/reference/components/README.md, projects/ui-lib-custom/src/lib/chart/chart-theme.service.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 10 complete. Fully implemented, tested, documented, and demoed. Next: Backlog follow-ups / v2 features only.
Verification:
- Added new reference doc `docs/reference/components/CHART.md` covering overview, features, installation, usage, API tables, theming tokens, advanced usage, accessibility, and performance guidance.
- Updated component index `docs/reference/components/README.md` with Chart section + quick reference row.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- Chart tests with coverage passed: `npx.cmd jest chart --coverage --runInBand --no-cache` (6/6 suites, 44/44 tests; `chart.component.ts` 97.89% statements, 90.62% branches, 100% functions, 97.87% lines).
- Chart lint passed after strict typing fixes in `chart-theme.service.spec.ts`: `npx.cmd eslint projects/ui-lib-custom/src/lib/chart/`.
- Entry-point test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (26/26).
- Demo build passed: `npx.cmd ng build demo`.
- Demo route probe passed: `curl -I http://localhost:4200/chart` returned HTTP 200.
- Architecture checks verified:
  - no cross-entry-point relative imports in chart source (`grep_search` for `from '../` returned none),
  - primary `projects/ui-lib-custom/src/public-api.ts` does not re-export chart symbols,
  - chart components use `ViewEncapsulation.None` + `ChangeDetectionStrategy.OnPush`,
  - signal inputs/outputs only (no `@Input`/`@Output` decorators),
  - no `enum` usage in chart source,
  - chart CSS variables use `--uilib-chart-*` prefix consistently.
Terminal notes:
- Failed: initial QA lint command failed on `chart-theme.service.spec.ts` strict typing (`typedef`, `no-unsafe-member-access`); fixed in-session.
- Worked: all verification commands executed from `bash.exe` using `npx.cmd` and `curl`.
- Warning: `ng build demo` still reports pre-existing SCSS budget warnings for `button.scss` and `date-picker.scss`.
Next step: Resume backlog batches (`knip` cleanup, constants extraction, overlay follow-ups) or chart v2 enhancements if prioritized.
```

```text
Date: 2026-04-20
Changed: projects/demo/src/app/pages/chart/chart-demo.component.ts, projects/demo/src/app/pages/chart/chart-demo.component.html, projects/demo/src/app/pages/chart/chart-demo.component.scss, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 9 complete. Demo page with 16-18 scenarios. Next: Prompt 10 (documentation & final QA).
Verification:
- Replaced chart demo placeholder with a full 18-section docs page covering wrappers, generic chart types, multi-dataset/stacked/mixed scenarios, size/dimension variants, dynamic updates, theme token bridge, click events, and custom options.
- Ensured chart runtime registration is routed through `provideChartDefaults()` in the demo component constructor (no direct `Chart.register()` usage in demo code).
- Confirmed route wiring for `path: 'chart'` already exists in `projects/demo/src/app/app.routes.ts` and load path remains correct (`./pages/chart/chart-demo.component`).
- Removed `badge: 'TODO'` from the Chart item in `projects/demo/src/app/layout/sidebar/sidebar.component.ts`.
- Demo build passed: `npx.cmd ng build demo`.
- Route probe passed: `curl -I http://localhost:4200/chart` returned HTTP 200.
Terminal notes:
- Failed: none in-session.
- Worked: build and route probe executed from `bash.exe` using `npx.cmd` and `curl`.
- Warning: demo build still reports pre-existing SCSS budget warnings for `button.scss` and `date-picker.scss`.
Next step: Prompt 10 — documentation updates and final QA sweep for chart component/demo parity.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart.component.ts, projects/ui-lib-custom/src/lib/chart/bar-chart.component.ts, projects/ui-lib-custom/src/lib/chart/line-chart.component.ts, projects/ui-lib-custom/src/lib/chart/pie-chart.component.ts, projects/ui-lib-custom/src/lib/chart/doughnut-chart.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 8 follow-up compile fixes complete. `ui-lib-custom/chart` now builds cleanly with strict diagnostics and entry-point regression remains green. Next: Prompt 9 (demo page).
Verification:
- Replaced unsupported `ViewChildSignal` typings with `Signal<... | undefined>` across chart wrapper components and generic chart canvas query.
- Refactored `ChartComponent.mergeOptions` scale merging to strict-safe record access using bracket notation for `x`/`y` scale keys and nested `ticks`/`grid`/`border` merges.
- Switched chart wrapper `chart.js` imports to type-only where runtime values are not used.
- Library build passed: `npx.cmd ng build ui-lib-custom` (includes `ui-lib-custom/chart` entry point).
- Entry-point regression passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (26/26).
Terminal notes:
- Failed: none in-session.
- Worked: all verification commands executed from `bash.exe` using `npx.cmd`.
- Warning: `get_errors` still reports non-blocking "unused method" warnings in some chart wrappers for public helper methods (`getChartInstance`, `refresh`); no build/test impact.
Next step: Prompt 9 — wire chart demo page and route/navigation coverage.
```


---

## Rollover Rule

At end of session:
1. Append one concise handoff block to `## Recent Handoffs`.
2. Keep only the newest 3 handoffs here.
3. Move older handoffs to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.
4. Keep stable rule/process updates in `AGENTS.md` only.
5. If commands were executed, add `Terminal notes` in the handoff (failed command, successful workaround, shell).
