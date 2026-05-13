# Rating — 6-Phase Hardening Prompt (Formal Scoring)

**Component:** `ui-lib-custom/rating` · `<ui-lib-rating>`
**Queue position:** Tier 3, #30 — listed as "hardened without dedicated prompt file" but no scores exist. Formal scoring session.
**Generated:** 2026-05-13
**Key a11y concern:** `role=radiogroup` pattern OR `role=slider`, keyboard interaction (arrow keys to change rating), each star has a meaningful label.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/rating/README.md`
3. Full source: `rating.ts`, `rating.html`, `rating.scss`, `rating.spec.ts`
4. Hardened siblings: `radio-button/radio-button.ts` (radiogroup pattern), `slider/slider.ts` (slider pattern)

---

## Step 2 — What is already present (do NOT regress these)

- ARIA pattern used (radiogroup or slider) — VERIFY WHICH
- Each star/option has an accessible label ("1 star", "2 stars", etc.) — VERIFY
- Keyboard: arrow keys change rating — VERIFY
- Read-only mode is not interactive (not focusable) — VERIFY
- `aria-label` on the group — VERIFY
- `prefers-reduced-motion` in SCSS — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Choose the correct ARIA pattern (CRITICAL)

**Pattern A — radiogroup (recommended for discrete star ratings):**
```html
<div role="radiogroup" [attr.aria-label]="ariaLabel() || 'Rating'">
  @for (star of stars(); track star) {
    <button role="radio"
            [attr.aria-checked]="value() === star"
            [attr.aria-label]="star + ' star' + (star !== 1 ? 's' : '') + ' out of ' + max()">
    </button>
  }
</div>
```

**Pattern B — slider (for continuous ratings):**
```html
<div role="slider"
     [attr.aria-valuenow]="value()"
     [attr.aria-valuemin]="0"
     [attr.aria-valuemax]="max()"
     [attr.aria-valuetext]="value() + ' out of ' + max() + ' stars'"
     [attr.aria-label]="ariaLabel() || 'Rating'">
</div>
```

Use Pattern A for typical 1-5 star ratings. Use Pattern B only if the rating is truly continuous.

#### Issue 2 — Keyboard interaction (CRITICAL)
- For radiogroup: arrow keys move between stars (roving tabindex within the group).
- For slider: ArrowUp/ArrowRight increase value; ArrowDown/ArrowLeft decrease.
- Tab moves INTO the widget; arrow keys move WITHIN.

#### Issue 3 — Read-only state (MODERATE)
When `readonly()` is `true`:
- Remove `tabindex` from stars or set `tabindex="-1"`.
- Add `aria-readonly="true"` on the group element if using radiogroup pattern.

#### Issue 4 — Labeling without visible text (MODERATE)
If no visible label exists, `ariaLabel` input is mandatory. Log a dev warning if both
`ariaLabel` and `ariaLabelledBy` are null on initialization.

#### Issue 5 — prefers-reduced-motion (MODERATE)
Star fill/hover animations must be suppressed.

#### Deliverable — `rating.a11y.spec.ts` (aim 25–35 tests)
- Group has role=radiogroup (or role=slider) with accessible name
- Each star has label like "1 star out of 5"
- Arrow key changes selection/value
- Read-only: group is not interactive
- axe passes: default (with label), partially rated, readonly

---

### Phase 1 — Architecture Audit
- `stars()` computed from `max()` input (e.g., 5)
- Module-level ID counter for unique group ID

### Phase 2 — DX Audit
README: ARIA pattern used, keyboard interaction, read-only usage, CSS custom properties.

### Phase 4 — Performance Audit
- `computed<...>` for star array and all ARIA values

### Phase 5 — Composability Audit
- Custom star icon slot
- Half-star variant support (if applicable)

### Phase 6 — Polish Audit
- [ ] Hover preview animation respects `prefers-reduced-motion`
- [ ] Color-alone not used (text alternative for rating value)
- [ ] Focus ring is `:focus-visible`

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/rating/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/rating/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, update `docs/COMPONENT_SCORES.md` Rating row (🟡 → 🟢) and append handoff to `AI_AGENT_CONTEXT.md`.
