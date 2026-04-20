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
- **Active focus:** Documentation gap-filling and polish after InputMask completion
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager)
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `InputMask` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
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
Date: 2026-04-19
Changed: knip.json, projects/ui-lib-custom/src/lib/core/shared/overlay-utils.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Backlog verification split-runs continued. Generated report artifacts were cleaned, overlay append-target typing/lint was hardened, and knip baseline noise was reduced for intentional wrappers/scaffolding. Next: triage remaining knip findings into targeted cleanup patches.
Verification:
- Git state checked before/after runs: `git --no-pager status --short`.
- Generated report artifacts cleaned: restored `playwright-report/index.html` and `test-results/a11y-results.json`.
- Targeted diagnostics clean: `get_errors` on overlay-related backlog files.
- Overlay lint passed after typing fix: `npx.cmd eslint projects/ui-lib-custom/src/lib/core/shared/overlay-utils.ts --max-warnings 0` (exit `0`, log `tmp/backlog-overlay-eslint.log`).
- Knip rerun captured: `npm.cmd run knip` (log `tmp/backlog-knip.log`, exit `tmp/backlog-knip.exit` = `1`) with unused-files count reduced from 45 to 2.
Terminal notes:
- Failed: none in-session.
- Worked: all commands executed from `bash.exe` using `npm.cmd`/`npx.cmd` with log+exit capture in `tmp/`.
- Warning: knip still reports residual backlog items (unused deps/devDeps, unlisted deps/binaries, unresolved imports, and unused exports/types).
Next step: Address remaining knip items in batches (dependency/unresolved config, then export/type cleanup) while preserving entry-point and demo-only intentional files.
```

```text
Date: 2026-04-18
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts, docs/reference/components/SPLITBUTTON.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 9 complete. Demo/docs closeout and QA sweep finalized; SplitButton is fully implemented, tested, documented, and wired in demo navigation. Next: Backlog.
Verification:
- TS diagnostics clean: `get_errors` on `projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts`.
- SplitButton spec lint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts` (exit `0`, log `tmp/split-button-prompt9-spec-eslint.log`).
- SplitButton spec tests passed: `npx.cmd jest projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts --runInBand --no-cache --silent` (56/56, exit `0`, log `tmp/split-button-prompt9-spec-jest.log`).
- SplitButton coverage passed: `npx.cmd jest split-button --coverage --runInBand --no-cache --silent` (coverage log `tmp/split-button-prompt9-coverage.log`, exit `0`; `split-button.component.ts`: 98.77% statements, 94.11% branches, 100% functions, 98.73% lines).
- Entry-point regression passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (25/25, exit `0`, log `tmp/split-button-prompt9-entrypoints.log`).
- Library build passed: `npx.cmd ng build ui-lib-custom` (exit `0`, log `tmp/split-button-prompt9-lib-build.log`; non-blocking export-condition warning for `./speed-dial` and `./split-button` remains).
- Demo build passed: `npx.cmd ng build demo` (exit `0`, log `tmp/split-button-prompt9-demo-build.log`; pre-existing SCSS budget warnings for `button` and `date-picker` remain).
Terminal notes:
- Failed: initial strict checks flagged spec typing issues (`DebugElement` import source, dynamic signal access nullability, and `preventDefault` spy return type mismatch).
- Worked: patched `split-button.component.spec.ts`, reran `get_errors`, and executed all verification commands from `bash.exe` using `npx.cmd` with log/exit capture in `tmp/`.
- Warning: Angular build output still includes pre-existing non-blocking warnings noted above.
Next step: Resume queued backlog items (`knip`, constants extraction pass, overlay follow-ups).
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 8 complete. Added a zoneless host-based Jest suite covering rendering, inputs/outputs, independent disabled states, outside click, ARIA contracts, keyboard matrix, focus return, and menu item behaviors. Next: Prompt 9 (demo/docs if queued) or backlog.
Verification:
- SplitButton tests passed: `npx.cmd jest split-button --runInBand --no-cache --silent`.
- SplitButton coverage passed: `npx.cmd jest split-button --coverage --runInBand --no-cache --silent`.
- Coverage (`projects/ui-lib-custom/src/lib/split-button/split-button.component.ts`): 98.77% statements, 94.11% branches, 100% functions, 98.73% lines.
Terminal notes:
- Failed: initial Prompt 8 test iteration had multiple expectation/update-flow mismatches; resolved by converting host-bound test inputs to signals and extending branch-path coverage tests.
- Worked: reran `npx.cmd jest split-button --runInBand --no-cache --silent` and `npx.cmd jest split-button --coverage --runInBand --no-cache --silent` from `bash.exe`.
- Warning: `@ng-icons` warns about unresolved icon names in non-silent test output; this is non-blocking for assertions.
Next step: Prompt 9 — if queued, wire SplitButton demo/docs and run targeted regression checks.
```




---

## Rollover Rule

At end of session:
1. Append one concise handoff block to `## Recent Handoffs`.
2. Keep only the newest 3 handoffs here.
3. Move older handoffs to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.
4. Keep stable rule/process updates in `AGENTS.md` only.
5. If commands were executed, add `Terminal notes` in the handoff (failed command, successful workaround, shell).
