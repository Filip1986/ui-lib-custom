# ToggleSwitch — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/toggle-switch` · `<ui-lib-toggle-switch>`
**Queue position:** Core Inputs (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** `role=switch` with `aria-checked`, label association, Space key toggles, thumb animation respects `prefers-reduced-motion`.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/toggle-switch/README.md`
3. Full source: `toggle-switch.ts`, `toggle-switch.html`, `toggle-switch.scss`, `toggle-switch.spec.ts`
4. Hardened siblings: `checkbox/checkbox.ts` (aria-checked), `toggle-button/toggle-button.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `role="switch"` on the control element — VERIFY
- `[attr.aria-checked]` bound to checked/on state — VERIFY
- `[attr.aria-label]` or associated label — VERIFY
- Space key toggles the switch — VERIFY
- `[attr.aria-disabled]` — VERIFY
- `prefers-reduced-motion` for thumb slide in SCSS — VERIFY

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — role=switch and aria-checked (CRITICAL)
The ARIA switch role is the correct pattern for on/off controls.
Use `role="switch"` (NOT `role="checkbox"`) with `aria-checked="true"` / `aria-checked="false"`.
Never use `aria-pressed` on a switch.

```html
<button role="switch"
        [attr.aria-checked]="checked()"
        [attr.aria-label]="ariaLabel() || null"
        [attr.aria-labelledby]="ariaLabelledBy() || null">
```

#### Issue 2 — Label association (CRITICAL)
Switch with no visible label must have `aria-label`. With a visible label, associate via
`aria-labelledby` or by wrapping in a `<label>`.

#### Issue 3 — Space key toggles (CRITICAL)
When rendered as `<button role="switch">`, Space key fires click automatically.
If rendered as a `<div>`, manually intercept Space and Enter key events.

#### Issue 4 — Disabled state (MODERATE)
Use `aria-disabled="true"` + `tabindex="-1"` or native `disabled` on the button element.

#### Issue 5 — Thumb animation and prefers-reduced-motion (CRITICAL)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-toggle-switch__thumb { transition: none; }
  .ui-lib-toggle-switch__track { transition: none; }
}
```

#### Deliverable — `toggle-switch.a11y.spec.ts` (aim 20–28 tests)
- role=switch present
- aria-checked=false when off, aria-checked=true when on
- Space key toggles the switch
- Label association (aria-label / aria-labelledby)
- Disabled: aria-disabled or native disabled, Space does not toggle
- axe passes: default (with label), checked, disabled

---

### Phase 1 — Architecture Audit
- Module-level ID counter: `let nextToggleSwitchId: number = 0`
- `checked` modeled as `ModelSignal<boolean>`

### Phase 2 — DX Audit
README: role=switch explanation, ariaLabel requirement, on/off label text inputs.

### Phase 4 — Performance Audit
- `computed<string>` for `aria-checked` value

### Phase 5 — Composability Audit
- Optional on/off label text slots beside the track

### Phase 6 — Polish Audit
- [ ] Thumb slide animation respects `prefers-reduced-motion`
- [ ] Track has visible border in high-contrast mode (not color-only)
- [ ] Focus ring is `:focus-visible`

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toggle-switch/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/toggle-switch/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add ToggleSwitch row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
