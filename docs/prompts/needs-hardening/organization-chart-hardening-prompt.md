# OrganizationChart — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/organization-chart` · `<ui-lib-organization-chart>`
**Queue position:** Data Display (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** No native HTML equivalent — must use `role=tree` + `role=treeitem` + `aria-level/expanded/setsize/posinset`, keyboard navigation (arrows, Enter, Space), and a linear reading fallback.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/organization-chart/README.md`
3. Full source: `organization-chart.ts`, `organization-chart.html`, `organization-chart.scss`, `organization-chart.spec.ts`
4. Hardened siblings: `tree/tree.ts` (role=tree pattern — the most relevant reference), `tree-table/tree-table.ts`

---

## Step 2 — What is already present (do NOT regress these)

- Tree-like data structure rendering — VERIFY
- `role="tree"` on root, `role="treeitem"` on nodes — VERIFY
- `aria-level`, `aria-expanded`, `aria-setsize`, `aria-posinset` — VERIFY
- Keyboard navigation (arrow keys, Enter, Space) — VERIFY
- Selection announcements — VERIFY
- `prefers-reduced-motion` for expand/collapse animations — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — role=tree + treeitem ARIA attributes (CRITICAL)

```html
<ul role="tree" [attr.aria-label]="ariaLabel() || 'Organization'">
  <li role="treeitem"
      [attr.aria-level]="1"
      [attr.aria-setsize]="rootCount()"
      [attr.aria-posinset]="index + 1"
      [attr.aria-expanded]="node.expanded"
      [attr.aria-selected]="node.selected">
    {{ node.label }}
    <ul role="group">
      <!-- children -->
    </ul>
  </li>
</ul>
```

#### Issue 2 — Keyboard navigation (CRITICAL)
Full tree keyboard pattern (same as Tree component):
- `ArrowDown` — next visible node
- `ArrowUp` — previous visible node
- `ArrowRight` — expand or move to first child
- `ArrowLeft` — collapse or move to parent
- `Enter` / `Space` — select node
- `Home` — first node
- `End` — last visible node
- Type-ahead: first character jumps to next matching node

#### Issue 3 — Visual-only connections (MODERATE)
The connecting lines between nodes are purely decorative. Verify they are `aria-hidden`.
Screen readers navigate the hierarchy via `aria-level` and `aria-posinset`.

#### Issue 4 — Linear reading fallback (MODERATE)
For complex org charts, provide a `[listFallback]` slot or downloadable list representation.

#### Issue 5 — prefers-reduced-motion (MODERATE)
Expand/collapse animations must be suppressed.

#### Deliverable — `organization-chart.a11y.spec.ts` (aim 25–35 tests)
- role=tree on root
- role=treeitem on nodes with aria-level, aria-setsize, aria-posinset
- aria-expanded=false on collapsed, true on expanded
- Arrow key navigation works
- Enter/Space selects node
- Connecting lines have aria-hidden
- axe passes: default, expanded node, selected node

---

### Phase 1 — Architecture Audit
- `nodes` input: recursive `OrgChartNode[]` with `label`, `data`, `children`, `expanded`, `selected`
- Selection mode: `'single' | 'multiple' | null`

### Phase 2 — DX Audit
README: node data structure, keyboard guide, a11y notes on linear fallback.

### Phase 4 — Performance Audit
- Virtualization for large org charts (optional but document limitation)

### Phase 5 — Composability Audit
- Custom node template slot

### Phase 6 — Polish Audit
- [ ] Expand/collapse animation respects `prefers-reduced-motion`
- [ ] Connection lines are SVG or CSS (not images)
- [ ] Dark mode: SVG lines use CSS custom property for color

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/organization-chart/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/organization-chart/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add OrganizationChart row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
