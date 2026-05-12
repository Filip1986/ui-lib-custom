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
- **Active focus:** TreeTable (#33) and Timeline (#71) accessibility hardening COMPLETE (6-phase); Upload (#69), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** Tree hardening (Tier 4, #34) — `role=tree`, `role=treeitem`, expand/collapse keyboard, aria-label
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
- `Timeline` -> ✅ complete + hardened (6-phase, score 8.3/10, 48 tests — 33 unit + 15 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [Merge conflicts resolved for TreeSelect accessibility PR]
Changed:
  - AI_AGENT_CONTEXT.md
  - docs/COMPONENT_SCORES.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
  - projects/ui-lib-custom/src/lib/tree/tree.ts
  - projects/ui-lib-custom/src/lib/tree/tree.html
  - projects/ui-lib-custom/src/lib/tree/tree-node.ts
  - projects/ui-lib-custom/src/lib/tree/tree-node.html
  - projects/ui-lib-custom/src/lib/tree/tree.scss
  - projects/ui-lib-custom/src/lib/tree-select/tree-select.component.html
State: Merged `origin/main` into the TreeSelect accessibility branch and reconciled overlapping Tree/TreeSelect changes. Preserved TreeSelect popup-tree semantics while keeping the newer Tree host id/aria-label behavior and base-branch score/history updates.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree/ projects/ui-lib-custom/src/lib/tree-select/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns='src/lib/tree/|tree-select' --no-coverage (172/172 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Repo had to be unshallowed before merge. `npm install` was required again in the fresh shell.
Next step: Commit the merge resolution and reply on the PR thread with the merge commit hash.

Date: 2026-05-12 [TreeSelect component — accessibility hardening COMPLETE (#35)]
Changed:
  - projects/ui-lib-custom/src/lib/tree/tree.ts
  - projects/ui-lib-custom/src/lib/tree/tree.html
  - projects/ui-lib-custom/src/lib/tree/tree-node.ts
  - projects/ui-lib-custom/src/lib/tree/tree-node.html
  - projects/ui-lib-custom/src/lib/tree/tree.scss
  - projects/ui-lib-custom/src/lib/tree/tree-context.ts
  - projects/ui-lib-custom/src/lib/tree-select/tree-select.component.ts
  - projects/ui-lib-custom/src/lib/tree-select/tree-select.component.html
  - projects/ui-lib-custom/src/lib/tree-select/tree-select.component.scss
  - projects/ui-lib-custom/src/lib/tree-select/tree-select.component.spec.ts
  - projects/ui-lib-custom/src/lib/tree-select/tree-select.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/tree-select/README.md
  - docs/COMPONENT_SCORES.md
State: TreeSelect hardening complete. The component now follows the combobox + tree popup pattern with tree semantics from the hardened Tree component, closes and restores focus on single selection, announces selection changes through a polite live region, and has dedicated a11y regression coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree-select/ projects/ui-lib-custom/src/lib/tree/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns='src/lib/tree/|tree-select' --no-coverage (117/117 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh shell required `npm install` again before validation. Demo screenshot captured at `/tmp/tree-select-hardening.png`.
Next step: TreeTable (#33) hardening — keep Tier 4 tree semantics aligned across treegrid and tree popup components.

Date: 2026-05-12 [Tree — 6-phase hardening COMPLETE (#34)]
Changed:
  - projects/ui-lib-custom/src/lib/tree/tree.ts
      • Added module-level `let nextTreeId: number = 0` counter + `instanceId` property
      • Added `ariaLabel` input; computed `hostAriaLabel()` / `hostAriaMultiselectable()` signals
      • Host bindings: `[attr.id]`, `[attr.aria-label]`, `[attr.aria-multiselectable]`
      • Replaced `expandFocusedNode`/`collapseFocusedNode` with `expandOrFocusChild`/`collapseOrFocusParent`
      • Added `findParentTreeItem` (group-sibling traversal pattern, not raw ancestor chain)
      • Added `focusItemByTypeAhead` method (alphanumeric type-ahead, wraps around, case-insensitive)
  - projects/ui-lib-custom/src/lib/tree/tree-node.ts
      • Added `setsize` input (default 1) and `posinset` input (default 1)
  - projects/ui-lib-custom/src/lib/tree/tree-node.html
      • Bound `aria-level`, `aria-setsize`, `aria-posinset`, `aria-disabled` on `[role="treeitem"]`
      • Moved `aria-checked` from nested `role="checkbox"` span to the treeitem itself
      • Checkbox span now has `aria-hidden="true"` (state lives on treeitem per WAI-ARIA)
      • Passed `[setsize]` and `[posinset]` to recursive child nodes
  - projects/ui-lib-custom/src/lib/tree/tree.html
      • Fixed double `role="tree"`: inner `<ul>` changed to `role="none"` (host has `role="tree"`)
      • Root `@for` loop passes `[setsize]="value().length"` and `[posinset]="i + 1"`
  - projects/ui-lib-custom/src/lib/tree/tree.scss
      • Added `@media (prefers-reduced-motion: reduce)` block disabling all transitions
  - projects/ui-lib-custom/src/lib/tree/tree.a11y.spec.ts (CREATED — 55 tests)
  - projects/ui-lib-custom/src/lib/tree/README.md
  - docs/COMPONENT_SCORES.md
State: Tree hardening complete. All critical WAI-ARIA tree pattern attributes (aria-level, aria-setsize, aria-posinset, aria-checked on treeitem, aria-disabled, aria-multiselectable) are in place. Type-ahead nav, ArrowLeft parent-focus, ArrowRight child-focus, and prefers-reduced-motion are implemented.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns="src/lib/tree/" --no-coverage (93/93 PASS — 38 unit + 55 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
Terminal notes: `findParentTreeItem` required a group-sibling traversal strategy because the parent treeitem div and child group ul are siblings inside the component host, not parent-child.
Next step: TreeSelect (#35) hardening — Tier 4, combobox + tree popup pattern.
