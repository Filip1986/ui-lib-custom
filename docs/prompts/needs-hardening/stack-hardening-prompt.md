# Stack — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/layout` · `<ui-lib-stack>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Landmark usage (avoid adding extra wrapping divs that confuse document structure), `role=list` when Stack acts as a list container, gap/spacing tokens exposed.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/layout/README.md`
3. Full source: `layout/stack.ts`, `layout/stack.html`, `layout/stack.scss`, `layout/stack.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `gap` input using `--uilib-spacing-*` tokens — VERIFY
- `direction` / `orientation` input (vertical/horizontal) — VERIFY
- `align` and `justify` inputs — VERIFY
- `as` / `tag` input to render as semantic element (e.g., `ul`, `nav`) — VERIFY
- CSS custom properties exposed — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — No extra landmark pollution (CRITICAL)
Stack is a layout primitive. By default it renders a `<div>`. Verify it does NOT render as
`<section>`, `<main>`, `<aside>` unless explicitly asked to via the `as` input.

#### Issue 2 — `as` / `tag` input (CRITICAL)
If Stack supports rendering as any HTML element, ensure:
- `as="ul"` + children as `<li>` creates a proper list (announce count to screen readers).
- `as="nav"` gets an `aria-label`.
- Document in README which `as` values are semantic and which ARIA attributes to add.

#### Issue 3 — Wrap/wrap-reverse and reading order (MODERATE)
When flex-wrap changes visual order, ensure DOM order matches reading order.
Document the limitation: visual reordering MUST NOT change logical reading order.

#### Deliverable — `stack.a11y.spec.ts` (aim 10–15 tests)
- Default render: no spurious landmark roles
- `as="ul"` → renders ul element
- CSS custom properties apply correctly
- axe passes: default, as="nav" with aria-label

---

### Phase 1 — Architecture Audit
- API: `gap`, `direction`, `align`, `justify`, `wrap`, `as` (tag)
- All spacing values reference `--uilib-spacing-*` tokens

### Phase 2 — DX Audit
README: gap token reference, semantic element usage with `as`, layout recipes (form layout, button row, etc.).

### Phase 4 — Performance Audit
- Host binding only — no wrapping div if unnecessary
- Consider Angular `host` property to apply flex styles directly

### Phase 5 — Composability Audit
- `<ui-lib-stack>` inside `<ui-lib-grid>` and vice versa works correctly
- Works with `<ui-lib-container>`

### Phase 6 — Polish Audit
- [ ] Responsive gap via CSS custom properties
- [ ] Dark mode gap unchanged (spacing tokens are theme-agnostic)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/layout/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/layout/stack" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Stack row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
