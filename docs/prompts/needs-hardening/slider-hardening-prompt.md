# Slider — 6-Phase Hardening Prompt (Formal Scoring)

**Component:** `ui-lib-custom/slider` · `<ui-lib-slider>`
**Queue position:** Tier 3, #27 — listed as "hardened without dedicated prompt file" but no scores exist. Formal scoring session.
**Generated:** 2026-05-13
**Key a11y concern:** `role=slider`, `aria-valuenow/min/max/valuetext`, arrow key step, range slider dual-thumb pattern, `aria-orientation`.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/slider/README.md`
3. Full source: `slider.ts`, `slider.html`, `slider.scss`, `slider.spec.ts`
4. Hardened siblings: `knob/knob.ts` (role=slider reference), `input-number/input-number.ts` (spinbutton)

---

## Step 2 — What is already present (do NOT regress these)

- `role="slider"` on the thumb element — VERIFY
- `[attr.aria-valuenow]` bound to current value — VERIFY
- `[attr.aria-valuemin]` and `[attr.aria-valuemax]` — VERIFY
- `[attr.aria-valuetext]` for formatted value — VERIFY
- `[attr.aria-orientation]` (horizontal/vertical) — VERIFY
- Arrow key step interaction — VERIFY
- `[attr.aria-label]` or `[attr.aria-labelledby]` — VERIFY
- Dual-thumb range mode — VERIFY IF SUPPORTED
- `prefers-reduced-motion` in SCSS — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — role=slider with all required ARIA attributes (CRITICAL)
```html
<div class="ui-lib-slider__thumb"
     role="slider"
     tabindex="0"
     [attr.aria-valuenow]="value()"
     [attr.aria-valuemin]="min()"
     [attr.aria-valuemax]="max()"
     [attr.aria-valuetext]="valueText()"
     [attr.aria-orientation]="orientation()"
     [attr.aria-label]="ariaLabel() || null"
     [attr.aria-labelledby]="ariaLabelledBy() || null"
     [attr.aria-disabled]="disabled() ? 'true' : null">
</div>
```

#### Issue 2 — `aria-valuetext` formatting (CRITICAL)
`aria-valuenow` is a raw number. `aria-valuetext` is the human-readable version.
Provide a `valueTextFn` input:
```typescript
public readonly valueTextFn: InputSignal<(value: number) => string> =
  input<(value: number) => string>((v: number): string => String(v));
```

#### Issue 3 — Arrow key step (CRITICAL)
- `ArrowRight` / `ArrowUp` → increment by `step()`
- `ArrowLeft` / `ArrowDown` → decrement by `step()`
- `Home` → go to `min()`
- `End` → go to `max()`
Both native HTML range inputs and ARIA sliders require these key handlers.

#### Issue 4 — Range (dual-thumb) slider (CRITICAL, if supported)
If a range slider is supported (two thumbs), each thumb must have:
- Its own `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Accessible labels like "Minimum value" / "Maximum value"
- The min thumb's `aria-valuemax` must track the max thumb's current value and vice versa.

#### Issue 5 — Vertical orientation (MODERATE)
`aria-orientation="vertical"` must be set when the slider is vertical.
Arrow key semantics flip: Up/Down map to increment/decrement.

#### Issue 6 — `prefers-reduced-motion` (MODERATE)
Thumb transition, track fill animation.

#### Deliverable — `slider.a11y.spec.ts` (aim 25–35 tests)
- role=slider on thumb
- aria-valuenow matches current value
- aria-valuemin, aria-valuemax present
- aria-valuetext matches formatted value
- ArrowRight increments by step
- ArrowLeft decrements by step
- Home sets to min, End sets to max
- Disabled: aria-disabled, no key response
- axe passes: default (with label), changed value, disabled

---

### Phase 1 — Architecture Audit
- `valueText` as `computed<string>` using `valueTextFn`
- Module-level ID counter

### Phase 2 — DX Audit
README: ARIA attributes explained, keyboard interaction, range usage, CSS custom properties.

### Phase 4 — Performance Audit
- No DOM queries on keydown; all values from signals

### Phase 5 — Composability Audit
- Range (dual-thumb) support verified
- Tick marks slot (if applicable)

### Phase 6 — Polish Audit
- [ ] Thumb drag transition respects `prefers-reduced-motion`
- [ ] Track fill color meets 3:1 contrast on background
- [ ] Focus ring is `:focus-visible`

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/slider/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/slider/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, update `docs/COMPONENT_SCORES.md` Slider row (🟡 → 🟢) and append handoff to `AI_AGENT_CONTEXT.md`.
