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

```text
Date: 2026-04-08
Changed: projects/demo/src/app/layout/sidebar/sidebar.component.ts, projects/demo/src/app/layout/sidebar/sidebar.component.html, projects/demo/src/app/layout/sidebar/sidebar.component.scss, AGENTS.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md, AI_AGENT_CONTEXT.md
State: Fixed sidebar submenu clipping, pinned `sidebar-tip` at bottom with content-only scrolling, added scroll-aware tip shadow, and split governance clearly (`AGENTS.md` = stable rules, `AI_AGENT_CONTEXT.md` = active context, archive for older notes).
Verification:
- Sidebar behavior validated interactively in-session after iterative CSS/layout adjustments.
Next step: Optional focused pass to keep AI context concise as new sessions are added.
```

```text
Date: 2026-04-08
Changed: projects/demo/src/app/pages/input-mask/input-mask-demo.component.ts, projects/demo/src/app/pages/input-mask/input-mask-demo.component.html, projects/demo/src/app/pages/input-mask/input-mask-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, projects/ui-lib-custom/src/lib/input-mask/input-mask.types.ts, projects/ui-lib-custom/test/entry-points.spec.ts, docs/reference/components/INPUTMASK.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md
State: Completed InputMask Prompt 7 (demo page) and Prompt 8 (final QA + docs). Added full InputMask demo page, wired route/sidebar, added docs, and verified entry-point coverage.
Verification:
- `npx ng build ui-lib-custom` (PASS)
- `npx jest --testPathPatterns=input-mask` (PASS: 3 suites, 39 tests)
- `npm run test:a11y -- --testPathPatterns=input-mask.a11y.spec.ts` (PASS: 1 suite, 2 tests)
- `npm run build:demo` (PASS; pre-existing style budget warnings remain)
Next step: Optional manual browser UX/a11y pass on `/input-mask` in demo.
```

```text
Date: 2026-04-07
Changed: projects/ui-lib-custom/src/lib/input-mask/input-mask.a11y.spec.ts, AI_AGENT_CONTEXT.md
State: Added InputMask accessibility-focused coverage for baseline axe compliance and disabled/readonly semantic reflection.
Verification:
- `npm run test:a11y -- --testPathPatterns=input-mask.a11y.spec.ts` (PASS: 1 suite, 2 tests)
Next step: Continue with InputMask demo/docs integration and focused build/test verification.
```

---

## Rollover Rule

At end of session:
1. Append one concise handoff block to `## Recent Handoffs`.
2. Keep only the newest 3 handoffs here.
3. Move older handoffs to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.
4. Keep stable rule/process updates in `AGENTS.md` only.
