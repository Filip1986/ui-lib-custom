# Grid — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/layout` · `<ui-lib-grid>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** CSS Grid visual reordering MUST NOT misrepresent reading order; `order` property banned without explicit a11y note; responsive column collapse verified with screen reader.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/layout/README.md`
3. Full source: `layout/grid.ts`, `layout/grid.html`, `layout/grid.scss`, `layout/grid.spec.ts`, `layout/grid.types.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `columns` input (number or template string) — VERIFY
- `gap` / `rowGap` / `columnGap` inputs using spacing tokens — VERIFY
- Responsive breakpoint inputs — VERIFY
- Column span on child elements — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Visual order vs. DOM order (CRITICAL)
CSS Grid `order` property changes visual order without changing DOM order.
**Policy:** Do NOT expose an `order` input. Document explicitly that consumers must keep DOM order
matching reading order. Add this to the README as an a11y constraint.

#### Issue 2 — Responsive grid collapse (MODERATE)
When grid collapses from N columns to 1 on small viewports, verify screen reader
reading order is still logical. Test with different `columns` values.

#### Issue 3 — Grid as landmark (LOW)
Grid is a layout primitive. Default tag must be `<div>`. Verify no semantic landmark is added.

#### Deliverable — `grid.a11y.spec.ts` (aim 10–15 tests)
- No spurious landmark
- columns and gap CSS custom properties applied
- axe passes: default

---

### Phase 1 — Architecture Audit
- `columns`, `gap`, `rowGap`, `columnGap` — typed and validated
- CSS custom properties: `--uilib-grid-columns`, `--uilib-grid-gap`

### Phase 2 — DX Audit
README: columns API, gap token reference, WCAG reading-order constraint, responsive usage.

### Phase 4 — Performance Audit
- Host binding only — CSS custom properties applied directly on `:host`

### Phase 5 — Composability Audit
- Grid columns / span on children verified
- Works inside Container

### Phase 6 — Polish Audit
- [ ] Gap values use spacing scale tokens, not raw px

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/layout/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/layout/grid" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Grid row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
