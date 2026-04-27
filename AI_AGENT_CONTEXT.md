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
- **Active focus:** constants extraction pass complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Carousel` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Upload` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `VirtualScroller` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Tree` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `TreeTable` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Table` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `Timeline` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `OrderList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `OrganizationChart` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `Paginator` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `PickList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- Documentation gaps still tracked for: `Input`, `Select`, `Card`, `Layout`
- Pending secondary entry points: `icon-button`, `alert`
- `VirtualScroller` docs written: `docs/reference/components/VIRTUAL_SCROLLER.md`

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Older handoffs are archived in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

---

Date: 2026-04-27
Changed:
  - projects/ui-lib-custom/src/lib/carousel/ (new — types, constants, component TS/HTML/SCSS, spec, index.ts)
  - projects/ui-lib-custom/carousel/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (added carousel to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added carousel import test + repaired upload truncation)
  - projects/demo/src/app/pages/carousel/ (new demo — TS/HTML/SCSS, 9 scenarios)
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.ts (refactored activeNumVisible/activeNumScroll
    from WritableSignal to computed(responsiveOverride ?? input), added effect() for reactive circular clones,
    injected ChangeDetectorRef, removed duplicate private methods caused by file truncation repair)
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.spec.ts (rewritten ConfigurableHostComponent
    to use WritableSignal properties so OnPush + zoneless CD picks up changes via .set())
  - upload.component.scss / upload.component.ts / upload.component.spec.ts (repaired pre-existing truncations)
  - virtual-scroller.component.scss / .ts / .spec.ts (repaired pre-existing truncations + null bytes)
State: Carousel component fully complete. Content-slider with numVisible/numScroll pagination, circular
  wrap-around, autoplay, touch/swipe, responsive breakpoints, keyboard-navigable indicator dots,
  three variants (material/bootstrap/minimal), three sizes, five content template slots. 44/44 unit
  tests passing. 38/38 entry-point tests passing. ESLint clean on all lib and demo files. Library build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/carousel/ projects/demo/src/app/pages/carousel/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — ui-lib-custom/carousel ✔ Built,
  npx jest --testPathPatterns=carousel --no-cache (44/44 PASS),
  npx jest --testPathPatterns=entry-points --no-cache (38/38 PASS).
Terminal notes: File corruption (null bytes + mid-file truncation) is a recurring issue when the Write tool
  creates large files. Mitigation: always strip nulls via Python after every write; repair truncations with
  Python append rather than re-writing. The Edit tool sometimes silently fails on truncated files — verify
  with bash `tail` or `wc -l` before proceeding. activeNumVisible/activeNumScroll had to be refactored
  from WritableSignal to computed signals so that numVisible/numScroll input changes propagate reactively
  (WritableSignals set once in ngAfterContentInit don't react to later input changes).
Next step: Overlay follow-ups (appendTo / z-index manager), then component v2 enhancements by priority.

Date: 2026-04-26
Changed:
  - projects/ui-lib-custom/src/lib/upload/ (new — types, constants, directives, component TS/HTML/SCSS, spec, index.ts)
  - projects/ui-lib-custom/upload/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (added upload to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added upload import test)
  - projects/demo/src/app/pages/upload/ (new demo — TS/HTML/SCSS, 8 scenarios)
  - projects/ui-lib-custom/src/lib/data-view/data-view.component.ts (restored truncated closing brace)
  - projects/ui-lib-custom/src/lib/tree-table/tree-table.component.ts (stripped 26 null bytes from EOF)
State: Upload component fully complete. Drag-and-drop file selection, multi-file support, image
  thumbnails, file validation (size/type/limit), customUpload mode, auto mode, three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), four template slots (header/content/empty/file),
  WAI-ARIA roles/labels throughout. 36/36 unit tests passing. 37/37 entry-point tests passing.
  ESLint clean on all lib and demo files. Library build clean (upload entry point).
Verification:
  npx eslint projects/ui-lib-custom/src/lib/upload/ projects/demo/src/app/pages/upload/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — ui-lib-custom/upload ✔ Built,
  npx jest --testPathPatterns=upload (36/36 PASS),
  npx jest --testPathPatterns=entry-points (37/37 PASS).
Terminal notes: Several files were truncated by the Write tool during creation (component TS, constants,
  spec, demo TS, package.json, entry-points spec). All repaired via Python open(..., w, newline=LF)
  appends. data-view.component.ts had a pre-existing truncation (missing closing braces on
  createPageNavigationItems). tree-table.component.ts had 26 null bytes at EOF. Both fixed in-session.
Next step: Overlay follow-ups (appendTo / z-index manager), then component v2 enhancements by priority.


