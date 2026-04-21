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
- **Active focus:** DataView closeout complete; backlog stabilization and v2 planning
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `InputMask` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
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
Date: 2026-04-21
Changed: docs/reference/components/DATAVIEW.md, docs/reference/components/README.md, projects/ui-lib-custom/src/lib/data-view/data-view.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 9 complete. Fully implemented, tested, documented, and demoed. Next: Backlog follow-ups / v2 features only.
Verification:
- Added `docs/reference/components/DATAVIEW.md` with overview, features, usage, API tables, template-context typing, pagination/sorting patterns, theming tokens, accessibility, and performance notes.
- Added DataView to `docs/reference/components/README.md` component index and quick-reference table.
- Tightened `projects/ui-lib-custom/src/lib/data-view/data-view.component.spec.ts` to remove unnecessary-condition lint warnings.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- DataView tests passed: `npx.cmd jest data-view --coverage --runInBand --no-cache`.
- DataView lint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/data-view/`.
- Entry-point test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
- Demo build passed: `npx.cmd ng build demo`.
- Route probe passed: `curl -I http://localhost:4200/data-view` returned HTTP 200.
- Confirmed no cross-entry-point relative imports in `data-view` source, no DataView primary-barrel re-export, JSDoc coverage on exported symbols, explicit return types on methods, signal-based inputs/outputs, `ViewEncapsulation.None`, `ChangeDetectionStrategy.OnPush`, `as const` usage, `--uilib-data-view-*` CSS variable prefixing, `ui` template directive selectors, and Angular block syntax (`@if`/`@for`) usage.
Terminal notes:
- Failed: none in-session.
- Worked: all verification commands executed from `bash.exe` using `npx.cmd` and `curl`.
- Note: demo build still reports pre-existing SCSS budget warnings for `button` and `date-picker`.
Next step: Shift to queued backlog items unless new DataView regressions are reported.
```

```text
Date: 2026-04-21
Changed: projects/demo/src/app/pages/data-view/data-view-demo.data.ts, projects/demo/src/app/pages/data-view/data-view-demo.component.ts, projects/demo/src/app/pages/data-view/data-view-demo.component.html, projects/demo/src/app/pages/data-view/data-view-demo.component.scss, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 8 complete. Demo page with 14-16 scenarios. Next: Prompt 9 (documentation & final QA).
Verification:
- Replaced placeholder DataView demo page with 16 sections covering list/grid rendering, layout switching, client and server pagination flows, external sorting controls, custom templates, empty/loading states, size variants, grid columns, paginator slots, and themed wrappers.
- Added realistic fictional catalog dataset in `projects/demo/src/app/pages/data-view/data-view-demo.data.ts` (72 products) for meaningful pagination and server-side simulation.
- Removed `badge: 'TODO'` for DataView in sidebar navigation (`projects/demo/src/app/layout/sidebar/sidebar.component.ts`).
- Confirmed `data-view` lazy route already exists in `projects/demo/src/app/app.routes.ts`; no route-path changes were required.
- Demo build passed: `npx.cmd ng build demo`.
- Route probe passed: `curl -I http://localhost:4200/data-view` returned HTTP 200.
Terminal notes:
- Failed: none in-session.
- Worked: verification commands executed from `bash.exe` using `npx.cmd` and `curl`.
- Note: `npx.cmd ng serve demo --no-open` was started in background for route verification; terminal output stream did not echo logs, but route probe succeeded against localhost.
Next step: Prompt 9 - update DataView docs and run final QA verification sweep.
```

```text
Date: 2026-04-21
Changed: projects/ui-lib-custom/data-view/ng-package.json, projects/ui-lib-custom/data-view/package.json, projects/ui-lib-custom/data-view/public-api.ts, projects/ui-lib-custom/test/entry-points.spec.ts, projects/ui-lib-custom/package.json, projects/ui-lib-custom/src/lib/data-view/data-view.component.ts, projects/ui-lib-custom/src/lib/data-view/data-view.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 7 complete. Secondary entry point `ui-lib-custom/data-view` wired and building. Next: Prompt 8 (demo page).
Verification:
- Added secondary entry-point files under `projects/ui-lib-custom/data-view/` (`ng-package.json`, `package.json`, `public-api.ts`) using the established thin re-export pattern.
- Updated `projects/ui-lib-custom/test/entry-points.spec.ts` to include `ui-lib-custom/data-view` import regression coverage.
- Updated `projects/ui-lib-custom/package.json` export map + `typesVersions` with `./data-view` typing paths.
- Verified `projects/ui-lib-custom/src/public-api.ts` does not re-export DataView symbols.
- Build passed: `npx.cmd ng build ui-lib-custom`.
- Entry-point regression test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
Terminal notes:
- Failed: initial build attempt surfaced strict template type errors in `data-view.component.html` for union paginator page items after enabling the secondary entry point build.
- Worked: added `pageNumber(...)` helper in `data-view.component.ts`, updated paginator template bindings, then reran build and entry-point tests successfully from `bash.exe` using `npx.cmd`.
Next step: Prompt 8 - build the DataView demo page and route/sidebar integration.
```


---

## Rollover Rule

At end of session:
1. Append one concise handoff block to `## Recent Handoffs`.
2. Keep only the newest 3 handoffs here.
3. Move older handoffs to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.
4. Keep stable rule/process updates in `AGENTS.md` only.
5. If commands were executed, add `Terminal notes` in the handoff (failed command, successful workaround, shell).
