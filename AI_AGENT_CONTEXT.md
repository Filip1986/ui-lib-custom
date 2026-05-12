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
- **Active focus:** ScrollTop (#75), ScrollPanel (#62), SplitButton (#68), TreeTable (#33), Tree (#34), Timeline (#71) and Upload (#69) accessibility hardening COMPLETE (6-phase); Tag (#53), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** TreeSelect hardening (Tier 4, #35) — combobox + tree popup pattern
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)
- **Prompt library status:** 48 session hardening prompts created (2026-05-11) for all queued components (#14–#76). Index: `docs/prompts/HARDENING_PROMPT_INDEX.md`. Accumulated lessons documented in `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

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
- `Ripple` -> ✅ complete + hardened (6-phase, score 8.7/10, 29 tests — 19 unit + 10 a11y)
- `BlockUI` -> ✅ complete + hardened (6-phase, score 9.0/10, 38 tests — 22 unit + 15 a11y + 1 updated)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)
- `TreeTable` -> ✅ complete + hardened (6-phase, score 8.5/10, 85 tests — 41 unit + 44 a11y)
- `Tree` -> ✅ complete + hardened (6-phase, score 8.6/10, 93 tests — 38 unit + 55 a11y)
- `Timeline` -> ✅ complete + hardened (6-phase, score 8.3/10, 48 tests — 33 unit + 15 a11y)
- `Upload` -> ✅ complete + hardened (6-phase, score 8.9/10, 66 tests — 36 unit + 30 a11y)
- `Tag` -> ✅ complete + hardened (6-phase, score 8.9/10, 40 tests — 26 unit + 14 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)
- `ScrollTop` -> ✅ complete + hardened (6-phase, score 8.4/10, 37 tests — 23 unit + 14 a11y)
- `SplitButton` -> ✅ complete + hardened (6-phase, score 8.6/10, 78 tests — 56 unit + 22 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [SplitButton PR — merge conflict resolution COMPLETE (round 4)]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved additive handoff conflicts against the newer Terminal changes from `origin/main`
      • Kept only the newest 3 active handoffs by moving the older ScrollTop handoff into the archive
  - docs/COMPONENT_SCORES.md
      • Preserved SplitButton #68 as ✅ Done while also keeping upstream Terminal #70 as ✅ Done
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Preserved the existing SplitButton/Skeleton archive history and added the older ScrollTop handoff from the active context
State: The SplitButton PR branch now reconciles the latest `origin/main` tracking-file conflicts without losing existing SplitButton completion records or the newer upstream Terminal updates from main.
Verification:
  node_modules/.bin/jest --testPathPatterns='split-button|terminal|entry-points' --no-coverage (PASS)
  npm run typecheck (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
Terminal notes: Fresh clone was shallow again, so `git fetch --unshallow origin` and `git fetch origin main:refs/remotes/origin/main` were required before the real merge. Fresh session also required `npm install` before Jest and the pinned local TypeScript toolchain were available.
Next step: No further action for this PR unless `origin/main` advances again and introduces new conflicts.

Date: 2026-05-12 [SplitButton PR — merge conflict resolution COMPLETE (round 3)]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved additive handoff conflicts against the newer Skeleton merge-resolution notes from `origin/main`
      • Kept SplitButton marked complete in the active focus list while limiting recent handoffs to the newest 3 entries
  - docs/COMPONENT_SCORES.md
      • Preserved SplitButton #68 as ✅ Done while keeping upstream Skeleton/ScrollTop status updates intact
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Archived the older SplitButton handoff while preserving the upstream Skeleton archive history
State: The SplitButton PR branch now reconciles the latest `origin/main` tracking-file conflicts without losing the existing SplitButton completion records or the newer Skeleton updates from main.
Verification:
  node_modules/.bin/jest --testPathPatterns='split-button|skeleton|entry-points' --no-coverage (PASS)
  npm run typecheck (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
Terminal notes: Fresh clone was shallow again, so `git fetch --unshallow origin` and `git fetch origin main:refs/remotes/origin/main` were required before the real merge. Fresh session also required `npm install` before Jest and the pinned local TypeScript toolchain were available.
Next step: No further action for this PR unless `origin/main` advances again and introduces new conflicts.

Date: 2026-05-12 [Skeleton PR — merge conflict resolution COMPLETE (round 2)]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved additive handoff conflict with the new ScrollTop entry from `origin/main`
      • Archived older ScrollPanel and TreeTable handoffs so the active context keeps only the newest 3 entries
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Preserved Skeleton, Upload, MeterGroup, and Panel archive entries from both sides of the merge
State: The Skeleton PR branch now has a true merge commit against `origin/main` at `0d3bf39`. This round of conflicts was limited to session-context bookkeeping files only.
Verification:
  npm run typecheck (PASS)
Terminal notes: Fresh clone was shallow again, so `git fetch --unshallow origin` and `git fetch origin main:refs/remotes/origin/main` were required before performing the merge.
Next step: No further action for this PR unless `origin/main` advances again and introduces new conflicts.
