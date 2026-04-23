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
- **Active focus:** OrderList fully complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `InputMask` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `OrderList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
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

```text
Date: 2026-04-23
Changed: projects/demo/src/app/pages/order-list/order-list-demo.component.ts (full impl),
         projects/demo/src/app/pages/order-list/order-list-demo.component.html (full impl),
         projects/demo/src/app/pages/order-list/order-list-demo.component.scss (full impl),
         projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge),
         projects/ui-lib-custom/src/lib/order-list/order-list.component.spec.ts (full lint-clean rewrite),
         docs/reference/components/ORDERLIST.md (created),
         docs/reference/components/README.md (OrderList entry added),
         AI_AGENT_CONTEXT.md
State: OrderList Prompt 10 complete. Fully implemented, tested, documented, and demoed.
Verification:
- ng build ui-lib-custom: PASS (0 errors)
- order-list jest: 77/77 PASS; coverage: statements 88.82%, branches 79.45%, functions 88.67%, lines 91.09%
- eslint projects/ui-lib-custom/src/lib/order-list/: CLEAN (0 errors)
- entry-points regression: 28/28 PASS (includes order-list)
- ng build demo: PASS (only pre-existing SCSS budget warnings in button/date-picker)
Known issues / v2 considerations:
- Virtual scroll deferred.
- Multi-item drag deferred.
- Touch/mobile drag-and-drop limited by HTML5 DnD API — consider pointer events polyfill in v2.
- No CDK dependency — fully custom DnD.
Terminal notes: All commands run from bash.exe using npx.cmd. DragEvent not in jsdom — using
  fakeDragEvent() cast helper in spec. spec fully rewritten with explicit (): void return types on
  all callbacks and typed nativeElement access via rootEl() helper to satisfy strict ESLint rules.
Next step: Resume queued backlog items (knip baseline, dead-code cleanup, constants extraction pass).
```

---

## Rollover Rule

At end of session:
1. Append one concise handoff block to `## Recent Handoffs`.
2. Keep only the newest 3 handoffs here.
3. Move older handoffs to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.
4. Keep stable rule/process updates in `AGENTS.md` only.
5. If commands were executed, add `Terminal notes` in the handoff (failed command, successful workaround, shell).



At end of session:
1. Append one concise handoff block to `## Recent Handoffs`.
2. Keep only the newest 3 handoffs here.
3. Move older handoffs to `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.
4. Keep stable rule/process updates in `AGENTS.md` only.
5. If commands were executed, add `Terminal notes` in the handoff (failed command, successful workaround, shell).
