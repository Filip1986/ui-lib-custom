# TreeTable — 6-Phase Hardening Prompt
**Component:** `ui-lib-custom/tree-table` · `<ui-lib-tree-table>`
**Queue position:** Tier 4, #33
**Generated:** 2026-05-11
**Key a11y concern:** `role=treegrid`, `aria-level`, `aria-expanded`, `aria-setsize`, `aria-posinset` on tree rows, keyboard navigation for expand/collapse plus row traversal.
**Read before starting:** All Tier 1–4 hardenings. Read Table hardening prompt first (shares grid patterns). See WAI-ARIA Treegrid Pattern (APG).
## Step 1 — Files to read
1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/tree-table/README.md`
3. All TreeTable source files.
4. `projects/ui-lib-custom/src/lib/table/table.component.ts` (grid ARIA patterns reference).
## Step 2 — Inventory before changing
Read the actual source and verify presence/absence of:
- `role="treegrid"` on the wrapper ← VERIFY
- `role="row"` on each row ← VERIFY
- `role="gridcell"` on cells ← VERIFY
- `role="rowheader"` on the first cell of each row ← VERIFY
- `[attr.aria-level]` on rows matching their depth ← VERIFY (CRITICAL)
- `[attr.aria-expanded]` on rows with children ← VERIFY (CRITICAL)
- `[attr.aria-setsize]` on rows (sibling count) ← VERIFY (LIKELY MISSING)
- `[attr.aria-posinset]` on rows (position among siblings) ← VERIFY (LIKELY MISSING)
- `[attr.aria-rowindex]` on rows ← VERIFY
- `[attr.aria-colindex]` on cells ← VERIFY
- Keyboard: `ArrowRight` expands, `ArrowLeft` collapses/moves to parent ← VERIFY
- Keyboard: `ArrowDown`/`ArrowUp` navigation ← VERIFY
- `prefers-reduced-motion` ← VERIFY (LIKELY MISSING)
- Unique instance ID counter ← VERIFY (LIKELY MISSING)
## Key A11y Issues to Fix (Phase 3)
1. **`role="treegrid"`** — Verify the wrapper has this role (not `role="grid"`).
2. **`aria-level`** — Each row MUST have `[attr.aria-level]="rowDepth + 1"`. Depth 0 = aria-level=1.
3. **`aria-setsize`/`aria-posinset`** — Each row must know its position among siblings. Add computed helpers.
4. **`aria-expanded`** — Rows with children: `"true"` if expanded, `"false"` if collapsed. Leaf rows: absent.
5. **Keyboard expand/collapse** — `ArrowRight` expands collapsed row; `ArrowLeft` collapses expanded row or moves to parent.
6. **`aria-label` on the treegrid** — Required for accessible name.
7. **`prefers-reduced-motion`** — Disable expand/collapse animation.
8. **Module-level ID counter** — `let nextTreeTableId: number = 0`.
## A11y Spec (aim for 35-45 tests)
- treegrid role + aria-label
- Row aria-level at each depth
- aria-expanded on parent rows (true/false/absent for leaves)
- aria-setsize/aria-posinset on all rows
- Keyboard: ArrowRight expand, ArrowLeft collapse, ArrowDown/Up navigation
- Tab exits the treegrid
- axe checks: empty, one level, two levels, expanded
## Commands
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree-table/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=tree-table --no-coverage
node_modules/.bin/ng build ui-lib-custom
```
Update `docs/COMPONENT_SCORES.md` → TreeTable #33 ✅. Next: Tree (#34).
