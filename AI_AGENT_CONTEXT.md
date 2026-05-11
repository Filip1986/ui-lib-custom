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
- **Active focus:** Table accessibility hardening COMPLETE (6-phase, #32); next is TreeTable (#33, Tier 4 Data Display)
- **Next queue:** TreeTable hardening (Tier 4, #33) — `role=treegrid`, hierarchy semantics, expanded state, keyboard navigation
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `Tabs` -> ✅ complete + hardened (6-phase, score 9.0/10)
- `Stepper` -> ✅ complete + hardened (6-phase, score 9.0/10, 61 tests — 39 unit + 22 a11y)
- `RadioButton` -> ✅ complete + hardened (6-phase, 64 tests — 40 unit + 24 a11y)
- `Password` -> ✅ complete + hardened (6-phase, 73 tests — 49 unit + 24 a11y)
- `Slider` -> ✅ complete + hardened (6-phase, 75 tests — 47 unit + 28 a11y)
- `Rating` -> ✅ complete + hardened (6-phase, 75 tests — 53 unit + 22 a11y)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [ContextMenu — 6-phase hardening COMPLETE (#14)]
Changed:
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.ts
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.html
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.scss
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/context-menu/README.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
State: Complete
  Phase 3 (A11y):
    • CRITICAL FIX: Removed aria-hidden="true" from role="separator" items (top-level + submenu)
    • CRITICAL FIX: Added roving tabindex for top-level items (single tabindex="0")
    • CRITICAL FIX: Added focus capture/restore flow for Escape/programmatic close paths
    • MODERATE FIX: Tab key now closes the menu without blocking natural tab order
    • MODERATE FIX: Added prefers-reduced-motion handling for panel/caret transitions
    • Created context-menu.a11y.spec.ts (31 tests)
  Phase 1: Added module-level ID counter + contextMenuId and rovingIndex reset on show.
  Phase 2: README now documents trigger ARIA pattern, keyboard map, accessibility notes, and CSS variables.
  Phase 4: Verified existing performance patterns; no structural perf regressions introduced.
  Phase 5: Composability API unchanged (`show/hide/toggle`, `itemClick`, `command`, `global`, `visible`).
  Phase 6: Verified focus-visible ring, disabled interaction lockout, submenu caret rotation, and panel transition polish.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/context-menu/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=context-menu --no-coverage (86/86 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation. Captured UI screenshot at `/tmp/context-menu-hardening.png`.
Next step: PanelMenu hardening (Tier 2, #15).

Date: 2026-05-11 [Latest merge conflict verification for table hardening PR]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved the newest conflict against origin/main by preserving the current Table → TreeTable session state
      • Kept active handoffs trimmed to the newest three entries and moved the older Stepper handoff to the archive
State: Branch is merged with the latest origin/main again. This merge only required resolving AI_AGENT_CONTEXT.md; no library source files changed in the incoming main branch.
Verification:
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  npm run typecheck (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
Terminal notes: The repository is now fully unshallowed locally after `git fetch --unshallow origin`; merge conflict was isolated to AI_AGENT_CONTEXT.md.
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

Date: 2026-05-11 [Merge conflict resolution refresh for table hardening PR]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved the new conflict against origin/main by keeping the latest Table → TreeTable session state
      • Preserved the incoming Stepper hardening handoff and trimmed active handoffs back to the newest three entries
  - docs/COMPONENT_SCORES.md
  - projects/ui-lib-custom/src/lib/stepper/README.md
  - projects/ui-lib-custom/src/lib/stepper/index.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper-panel.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.html
  - projects/ui-lib-custom/src/lib/stepper/stepper.scss
  - projects/ui-lib-custom/src/lib/stepper/stepper.spec.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.ts
  - projects/ui-lib-custom/src/lib/stepper/stepper.types.ts
      • Brought in the latest origin/main Stepper hardening changes as part of the merge
State: Branch is merged with the latest origin/main again. The only manual conflict resolution was in AI_AGENT_CONTEXT.md; incoming Stepper changes are preserved as-is.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/stepper/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=stepper --no-coverage (61/61 PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  npm run typecheck (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
Terminal notes: Fresh clone again required `npm install` before local validation because `node_modules/.bin/*` tools were absent.
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.
