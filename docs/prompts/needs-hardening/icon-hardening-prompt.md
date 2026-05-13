# Icon — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/icon` · `<ui-lib-icon>`
**Queue position:** Utilities (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Decorative vs. informative icons. Decorative: `aria-hidden="true"`. Informative (standalone): requires `aria-label` or a visually hidden `<span>`. NEVER rely on icon name as the accessible name.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/icon/README.md`
3. Full source: `icon.ts`, `icon.html`, `icon.scss`, `icon.spec.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `aria-hidden="true"` as default — VERIFY
- `ariaLabel` input to make icon informative (removes aria-hidden, adds aria-label) — VERIFY
- `size` input using spacing/font tokens — VERIFY
- SVG or font icon rendering — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — aria-hidden by default (CRITICAL)
All icons MUST be `aria-hidden="true"` by default. The consuming component (button, menu item, etc.)
provides the accessible name for the interactive context.

#### Issue 2 — Informative icon mode (CRITICAL)
When `ariaLabel` input is provided, remove `aria-hidden` and add `aria-label`:
```html
[attr.aria-hidden]="ariaLabel() ? null : 'true'"
[attr.aria-label]="ariaLabel() || null"
[attr.role]="ariaLabel() ? 'img' : null"
```

#### Issue 3 — No focusability (CRITICAL)
Icon must never receive focus. Use `tabindex="-1"` or `focusable="false"` on SVG.

#### Deliverable — `icon.a11y.spec.ts` (aim 10–15 tests)
- Default: aria-hidden="true"
- With ariaLabel: aria-label set, aria-hidden removed, role="img" set
- Not focusable by default
- axe passes: default (decorative), informative with ariaLabel

---

### Phase 1 — Architecture Audit
- `name` input for icon name lookup
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` using font-size tokens
- `color` input maps to `--uilib-icon-color` CSS var

### Phase 2 — DX Audit
README: decorative vs. informative pattern, ariaLabel usage, size token table.

### Phase 4 — Performance Audit
- SVG icon is inlined or loaded from sprite (no network request per icon)

### Phase 5 — Composability Audit
- Works inside Button, MenuItem, Tab, Chip, Badge

### Phase 6 — Polish Audit
- [ ] Icon size matches surrounding text via `em` unit

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/icon/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/icon/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Icon row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
