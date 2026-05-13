# Container — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/layout` · `<ui-lib-container>`
**Queue position:** Layout (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Skip-link targets inside container, no spurious landmark roles, max-width constraint does not hide scroll content.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/layout/README.md`
3. Full source: `layout/container.ts`, `layout/container.scss`, `layout/container.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `maxWidth` or `size` input (`sm`, `md`, `lg`, `xl`, `full`) — VERIFY
- Centered horizontal layout — VERIFY
- Horizontal padding (gutter) using spacing tokens — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Do not clip content (CRITICAL)
Verify that `overflow: hidden` is NOT applied. Content at edge of max-width must not be clipped.
This affects screen magnification users who pan horizontally.

#### Issue 2 — No spurious landmark (CRITICAL)
Container renders as `<div>`. Do NOT render as `<main>` — that is the consumer's responsibility.

#### Issue 3 — Skip link target compatibility (MODERATE)
Containers are often the target of skip links (`<a href="#main-content">`). Ensure the host element
can receive `id` from the consumer and is focusable (adds `tabindex="-1"` only when `id` is set).

#### Deliverable — `container.a11y.spec.ts` (aim 8–12 tests)
- Default: renders as div, no landmark
- CSS custom properties applied
- axe passes: default

---

### Phase 1 — Architecture Audit
- `size` string union: `'sm' | 'md' | 'lg' | 'xl' | 'full'`
- CSS custom property: `--uilib-container-max-width`

### Phase 2 — DX Audit
README: size presets table, custom max-width override, skip link usage notes.

### Phase 4 — Performance Audit
- `:host` binding only, no extra wrapper div

### Phase 5 — Composability Audit
- Works as page wrapper and as section wrapper

### Phase 6 — Polish Audit
- [ ] Padding token uses `--uilib-spacing-*`
- [ ] Full breakpoint table in docs

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/layout/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/layout/container" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Container row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
