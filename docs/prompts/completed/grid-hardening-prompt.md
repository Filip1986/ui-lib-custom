# Grid — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/layout` · `<ui-lib-grid>`
**Queue position:** Layout (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** CSS Grid visual reordering MUST NOT misrepresent reading order; `order`
property banned without explicit a11y note; responsive column collapse verified with screen reader.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/layout/README.md`
3. Full source: `layout/grid.ts`, `layout/grid.spec.ts`, `layout/grid.a11y.spec.ts`,
   `layout/grid.types.ts`, `layout/grid.scss`
4. Related siblings: `layout/stack.ts`, `layout/container.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `columns: InputSignal<GridColumns | string>` — accepts numeric token (`2`, `4`, `6`, `12`) or
  custom CSS template string
- `spacing: InputSignal<StackToken | SpacingToken | number | null>` — semantic gap (t-shirt sizes)
- `gap: InputSignal<SpacingToken>` — legacy numeric spacing token (backward compat)
- `rowGap` / `columnGap` override inputs
- `minColumnWidth` input — enables `repeat(auto-fit, minmax(X, 1fr))` responsive grids
- `align` / `justify` inputs for item alignment
- Host bound CSS custom properties: `--uilib-grid-columns`, `--uilib-grid-gap`, etc.
- No separate template file — inline `<ng-content />` template (correct for layout primitive)
- `grid.a11y.spec.ts` likely already has basic coverage — read it before adding tests

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Visual order vs. DOM order (CRITICAL)
CSS Grid `order` property changes visual position without changing DOM/reading order.
**Hard policy:** The `Grid` component does NOT expose an `order` input. This must be documented in
the README as an explicit accessibility constraint.

Document this in README:
> ⚠️ **A11y:** Never use CSS `order` on Grid children without ensuring DOM order still matches the
> intended reading order. CSS Grid's `order` property is visual-only; screen readers follow DOM order.

#### Issue 2 — `display:grid` with no semantic role (VERIFY — CRITICAL)
Grid renders as `<div style="display:grid">`. Verify:
- No `role="grid"` emitted (that would declare an ARIA data grid widget — wrong for layout grids)
- No `role="list"` emitted unless children genuinely form a list

#### Issue 3 — `minColumnWidth` responsive collapse (MODERATE)
When using `repeat(auto-fit, …)` the grid collapses to 1 column on narrow viewports. Verify that
reading order is logical at any column count. Add README note.

#### Issue 4 — No overflow clip on grid children (CRITICAL)
Grid must not apply `overflow: hidden` to children. Verify no style rules clip projected content.

#### Deliverable — `grid.a11y.spec.ts` (aim 12–18 tests)
- Host has `display: grid` applied
- No `role` attribute on host (layout grid, not ARIA grid widget)
- `--uilib-grid-columns` CSS var correctly reflects `columns` input (numeric and string)
- `--uilib-grid-gap` correctly reflects `spacing` and `gap` inputs
- `minColumnWidth` produces `repeat(auto-fit, minmax(X, 1fr))`
- No `overflow: hidden` (or any overflow clipping)
- axe passes: default (12-col), 2-col, auto-fit with minColumnWidth

---

### Phase 1 — Architecture Audit
- `GRID_COLUMNS` token map — verify `GridColumns` union type covers all used values
- `spacing` input takes priority over `gap` — verify precedence in `_gapValue` computed
- `minColumnWidth` + `columns` interaction — `minColumnWidth` wins (auto-fit overrides fixed cols)
- All gap resolution through `spaceVar` or `stackVar` helper — never raw px

### Phase 2 — DX Audit
README must explain:
- `spacing` (t-shirt sizes) vs `gap` (numeric token) — prefer `spacing` for new code
- `minColumnWidth` for auto-responsive grids (the common use case)
- WCAG reading order constraint (no `order` CSS)
- All inputs with types and defaults

### Phase 4 — Performance Audit
- All computed values (`_gridTemplateColumns`, `_gapValue`, etc.) are `computed<string>()` — verify
  no function signatures lack explicit return types
- Host bindings only — zero DOM queries at runtime

### Phase 5 — Composability Audit
- Works inside `<ui-lib-container>`
- Works inside `<ui-lib-stack>` as a row item
- Child `span` support: `grid-column: span 2` on child elements (document in README)

### Phase 6 — Polish Audit
- [ ] Default 12-column grid matches the design system baseline
- [ ] Gap values exposed as `--uilib-grid-gap` allow consumer override via CSS
- [ ] Responsive breakpoint guidance in README (use `minColumnWidth` pattern)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/layout/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/layout/grid" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Grid row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
