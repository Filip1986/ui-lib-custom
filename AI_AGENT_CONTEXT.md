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
- **Active focus:** Table fully complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Table` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `Timeline` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `OrderList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `OrganizationChart` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `Paginator` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `Table` -> ✅ complete (implementation/tests/demo/entry-point/final QA complete — docs pending)
- Documentation gaps still tracked for: `Input`, `Select`, `Card`, `Layout`
- Pending secondary entry points: `icon-button`, `alert`

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` — not a blocker

---

## Recent Handoffs

Older handoffs are archived in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

---

Date: 2026-04-24
Changed:
  - projects/ui-lib-custom/src/lib/timeline/ (all 8 files: types, constants, directives, component ts/html/scss, spec, index)
  - projects/ui-lib-custom/timeline/ (ng-package.json, package.json, public-api.ts — secondary entry point)
  - projects/ui-lib-custom/package.json (exports + typesVersions for timeline)
  - projects/ui-lib-custom/test/entry-points.spec.ts (timeline import test added)
  - projects/demo/src/app/pages/timeline/ (full demo — TS, HTML, SCSS — 8 scenarios)
  - docs/reference/components/TIMELINE.md (new)
  - docs/reference/components/README.md (Timeline row added)
  - AI_AGENT_CONTEXT.md (Timeline marked complete)
State: Timeline fully complete. Vertical/horizontal layouts, left/right/alternate/top/bottom alignment,
  three template slots (marker/content/opposite), three variants (material/bootstrap/minimal),
  three sizes (sm/md/lg), ThemeConfigService variant fallback, WAI-ARIA list/listitem roles,
  connector suppression on first/last events, 31/31 unit tests passing, demo page with 8 scenarios,
  reference doc at docs/reference/components/TIMELINE.md.
Verification: npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0 (CLEAN),
  npx eslint projects/demo/src/app/pages/timeline/ --max-warnings 0 (CLEAN),
  npx jest --testPathPatterns=timeline (31/31 PASS),
  npx jest --testPathPatterns=entry-points (33/33 PASS),
  ng build ui-lib-custom (✔ all entry points including timeline),
  ng build demo --configuration=development (success).
Terminal notes: python3 not available — use python. All file writes done via python open(..., 'w', newline='\\n') to avoid CRLF issues.
Next step: Write docs/reference/components/TABLE.md, then begin knip baseline + dead-code cleanup pass.
Changed:
  - projects/ui-lib-custom/src/lib/table/table.component.ts (removed unused selArray variable; stripped trailing null bytes)
  - projects/ui-lib-custom/src/lib/table/table.component.spec.ts (full rewrite: all 287 lint errors fixed — typed DOM queries via HTMLElement casts, typed helpers, DebugElement annotation, removed unused imports, fixed consistent-type-imports; 51/51 tests still pass)
  - projects/demo/src/app/pages/table/table-demo.component.ts (repaired truncation; fixed empty JSDoc; exhaustive switch; lint clean)
  - projects/ui-lib-custom/src/lib/pick-list/pick-list.component.html (restored from git HEAD after truncation)
  - CLAUDE.md (lint step added to Key Commands and component checklist)
  - COMPONENT_CREATION_GUIDE.md (Step 8 expanded with mandatory lint command, common lint failure patterns; Step 9 checklist item added)
  - LIBRARY_CONVENTIONS.md (ESLint added as first active check in Code Quality Checklist)
State: Table fully lint-clean (0 errors, 0 warnings, --max-warnings 0). Build passing. 51/51 tests. Lint now mandated in all docs.
Verification: npx eslint projects/ui-lib-custom/src/lib/table/ projects/demo/src/app/pages/table/ --max-warnings 0 (CLEAN), npx jest --testPathPatterns=table (51/51), ng build ui-lib-custom (✔ all entry points).
Terminal notes: Write/Edit tools produce trailing null bytes when editing large files — always strip with Python `data.rstrip(b'\x00')` after any Edit tool use on files >800 lines. git checkout HEAD -- <file> fails with "Operation not permitted" in sandbox; workaround: git show HEAD:<file> > /tmp/restore && cp /tmp/restore <file>.
Next step: Write docs/reference/components/TABLE.md and update docs/reference/components/README.md, then begin knip baseline + dead-code cleanup.

Date: 2026-04-24
Changed:
  - projects/ui-lib-custom/src/lib/pick-list/ (all 7 files: types, constants, directives, component ts/html/scss, spec, index)
  - projects/ui-lib-custom/pick-list/ (ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (exports + typesVersions for pick-list)
  - projects/ui-lib-custom/test/entry-points.spec.ts (pick-list import test)
  - projects/demo/src/app/pages/pick-list/ (pick-list-demo.component ts/html/scss — new)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: 'TODO' for PickList)
  - docs/reference/components/PICKLIST.md (new)
  - docs/reference/components/README.md (added PickList row)
  - projects/demo/src/app/pages/paginator/paginator-demo.component.html (repaired truncation)
  - projects/demo/src/app/pages/organization-chart/organization-chart-demo.component.html (repaired truncation)
  - projects/demo/src/app/pages/organization-chart/organization-chart-demo.component.ts (repaired truncation)
  - projects/ui-lib-custom/paginator/package.json (repaired missing closing brace)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (stripped trailing null bytes)
State: PickList fully complete — source, entry point, tests (52/52 passing), demo page, docs.
  Multiple pre-existing truncated files also repaired as collateral.
Verification: npx jest --testPathPatterns=pick-list (52/52), npx jest --testPathPatterns=entry-points (31/31), ng build demo --configuration=development (success, 1 pre-existing warning).
Terminal notes: Edit/Write tools produce CRLF corruption and trailing null bytes — all file writes done via Python open(..., 'w'/'wb'). npx.cmd not available in bash sandbox; use npx directly.
Next step: Run full test suite (npm test) to confirm no regressions, then knip baseline + dead-code cleanup pass.

```text
Date: 2026-04-23
Changed: projects/ui-lib-custom/src/lib/organization-chart/ (all source files — full impl),
         projects/ui-lib-custom/organization-chart/ (secondary entry point),
         projects/ui-lib-custom/package.json (exports + typesVersions for organization-chart),
         projects/ui-lib-custom/test/entry-points.spec.ts (organization-chart import test added),
         projects/demo/src/app/pages/organization-chart/ (full demo — TS, HTML, SCSS),
         projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge),
         docs/reference/components/ORGANIZATIONCHART.md (created),
         docs/reference/components/README.md (OrganizationChart entry added),
         AI_AGENT_CONTEXT.md
State: OrganizationChart fully complete. Recursive tree rendering, collapsible subtrees,
       single/multiple selection, named typed templates, three variants, WAI-ARIA tree/treeitem,
       keyboard navigation, 30/30 unit tests passing, demo page with 7 scenarios, reference doc.
Verification:
- ng build ui-lib-custom: PASS (0 errors)
- entry-points.spec.ts: 29/29 PASS (includes organization-chart)
- organization-chart.spec.ts: 30/30 PASS
- ng build demo: PASS (only pre-existing SCSS budget warnings in button/date-picker)
Terminal notes:
- Edit/Write tools truncate Windows CRLF files — all new files written via bash heredoc (cat << 'EOF')
  to avoid truncation. Python used for editing binary/CRLF files (sidebar, entry-points.spec.ts).
- @esbuild/linux-x64 missing from node_modules — fixed with: npm install @esbuild/linux-x64 --no-save
- structuredClone not available in Jest's Node version — replaced with JSON.parse(JSON.stringify(...))
- sidebar.component.ts had trailing null bytes — stripped with Python before demo build
Next step: Resume queued backlog items (knip baseline, dead-code cleanup, constants extraction pass).
```

```text
Date: 2026-04-23
Changed: projects/ui-lib-custom/src/lib/organization-chart/organization-chart-context.ts (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.ts (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.html (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart.html (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart.ts (truncation + lint fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart.types.ts (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart-template-directives.ts (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/index.ts (truncation fixed),
         projects/ui-lib-custom/src/lib/organization-chart/organization-chart.spec.ts (truncation + lint fixed),
         projects/ui-lib-custom/organization-chart/package.json (truncation fixed),
         projects/ui-lib-custom/organization-chart/ng-package.json (truncation fixed),
         projects/ui-lib-custom/organization-chart/public-api.ts (truncation fixed),
         projects/ui-lib-custom/package.json (truncation fixed — was missing split-button/testing typesVersions entries),
         projects/ui-lib-custom/test/entry-points.spec.ts (truncation fixed)
State: All CRLF-truncated files repaired. ESLint passes (0 errors, 0 warnings) on organization-chart/.
       All lint fixes applied: Boolean() coercions, explicit Map type annotation, nativeElement cast,
       removed unused By import, fixed textContent predicate.
Verification:
- npx eslint projects/ui-lib-custom/src/lib/organization-chart/ --max-warnings=0: PASS (0 output)
- organization-chart.spec.ts: 30/30 PASS
- entry-points.spec.ts: 29/29 PASS (includes organization-chart)
- accordion.spec.ts: 15/15 PASS (global regression check)
- ng build ui-lib-custom: PASS (0 errors, pre-existing SCSS budget warnings only)
Terminal notes:
- All file repairs done via Python byte-level appends to avoid CRLF line-ending issues with bash printf
- Root cause of tslib resolution failure: projects/ui-lib-custom/package.json was truncated (invalid JSON),
  causing Node.js module resolver to fail for ALL specs. Fixed by appending missing split-button/testing entries.
- Python read() default mode strips CRLF to LF; for spec/source files this is benign but noteworthy.
Next step: Resume queued backlog items (knip baseline, dead-code cleanup, constants extraction pass).
```

```text
Date: 2026-04-23
Changed: projects/demo/src/app/pages/order-list/order-list-demo.component.ts (full impl),
         projects/demo/src/app/pages/order-list/order-list-demo.component.html (full impl),
         projects/demo/src/app/pages/order-list/order-list-demo.component.scss (full impl),
         projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge),
         project
