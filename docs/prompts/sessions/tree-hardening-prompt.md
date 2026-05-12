# Tree — 6-Phase Hardening Prompt
**Component:** `ui-lib-custom/tree` · `<ui-lib-tree>`
**Queue position:** Tier 4, #34
**Generated:** 2026-05-11
**Key a11y concern:** `role=tree`/`role=treeitem`, full keyboard nav (arrows + Home/End + type-ahead), `aria-level`/`aria-expanded`/`aria-setsize`/`aria-posinset`, multi-select.
**Reference:** WAI-ARIA Tree View Pattern (APG 1.2). Read TreeTable hardening prompt for shared tree patterns.
## Step 1 — Files to read
1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/tree/README.md`
3. All Tree source files.
4. Hardened peers: `tree-table` source (shared tree node patterns).
## Step 2 — Inventory (read source first)
- `role="tree"` on the root list ← VERIFY
- `role="treeitem"` on each item ← VERIFY
- `role="group"` on nested sub-lists ← VERIFY (required child of `role="tree"`)
- `[attr.aria-level]` on each treeitem ← VERIFY (CRITICAL)
- `[attr.aria-expanded]` on items with children ← VERIFY
- `[attr.aria-setsize]` on items ← VERIFY (LIKELY MISSING)
- `[attr.aria-posinset]` on items ← VERIFY (LIKELY MISSING)
- `[attr.aria-selected]` for single/multi-select ← VERIFY
- `[attr.aria-checked]` for checked items (tree with checkboxes) ← VERIFY
- `[attr.aria-disabled]` on disabled items ← VERIFY
- `[attr.aria-multiselectable]` on the tree ← VERIFY
- Keyboard nav: ArrowDown/Up, ArrowRight (expand/focus first child), ArrowLeft (collapse/move to parent), Home, End ← VERIFY
- Type-ahead keyboard navigation ← LIKELY MISSING
- `prefers-reduced-motion` ← LIKELY MISSING
- Unique instance ID counter ← LIKELY MISSING
## Phase 3 — Key A11y Issues
### Issue 1 — `aria-setsize`/`aria-posinset` (CRITICAL)
Every `role="treeitem"` must expose its position within its sibling group.
Add a computed helper that flattens the tree and annotates each node: `{ setsize: N, posinset: i+1 }`.
### Issue 2 — Type-ahead navigation (CRITICAL)
WAI-ARIA Tree Pattern requires: when a printable character is pressed, focus moves to the next item
whose label starts with that character. Implement in `onKeyDown`:
```typescript
case /^[a-zA-Z0-9]$/.test(event.key) && event.key.length === 1):
  this.focusItemByTypeAhead(event.key);
  break;
```
### Issue 3 — `ArrowLeft` from a leaf node should move to parent (CRITICAL)
If `ArrowLeft` is pressed on a leaf item (no children), focus should move to the parent item.
If pressed on a collapsed item, it should also move to the parent.
Only if pressed on an expanded item with children should it collapse.
### Issue 4 — Checked state for tree with checkboxes (MODERATE)
If the tree supports checkbox selection, add `[attr.aria-checked]` on items.
For indeterminate parent state (some but not all children checked): `aria-checked="mixed"`.
### Issue 5 — `prefers-reduced-motion` (MODERATE)
Disable expand/collapse animations in the SCSS.
### Issue 6 — Module-level ID counter (MODERATE)
`let nextTreeId: number = 0` for unique IDs per instance.
## A11y Spec (aim for 40-55 tests)
- tree role + aria-label
- treeitem role + aria-level at each depth
- group role on nested lists
- aria-expanded: true/false/absent
- aria-setsize/aria-posinset correct values
- aria-selected for selection
- aria-checked and aria-checked="mixed" for checkboxes
- Keyboard: ArrowDown/Up, ArrowRight expand+focus-child, ArrowLeft collapse-or-parent, Home, End
- Type-ahead: pressing 'f' focuses first item starting with 'f'
- Tab exits the tree
- axe checks
## Commands
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/tree/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```
Update `docs/COMPONENT_SCORES.md` → Tree #34 ✅. Next: TreeSelect (#35).
