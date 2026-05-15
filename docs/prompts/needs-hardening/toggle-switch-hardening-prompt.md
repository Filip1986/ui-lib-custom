# ToggleSwitch — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/toggle-switch` · `<ui-lib-toggle-switch>`
**Queue position:** Core Inputs (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** Uses `<input type="checkbox" role="switch">` pattern — `aria-checked` must be
explicit, label association via `ariaLabel` + `ariaLabelledby` must cover every usage, Space key is
already native, thumb animation must respect `prefers-reduced-motion`.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/toggle-switch/README.md`
3. Full source: `toggle-switch.ts`, `toggle-switch.html`, `toggle-switch.scss`,
   `toggle-switch.spec.ts`, `toggle-switch.types.ts`
4. Hardened siblings: `checkbox/checkbox.ts` (`aria-checked`, CVA), `toggle-button/toggle-button.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `<input type="checkbox" role="switch">` — CORRECT pattern (not `<button role="switch">`)
- `[attr.aria-checked]="ariaChecked()"` computed signal returning `'true'` / `'false'`
- `[attr.aria-label]="ariaLabel()"` optional direct label
- `[attr.aria-labelledby]="ariaLabelledby()"` — resolved to `labelElementId` when `label()` input is
  set and no `ariaLabel` is provided directly; `null` otherwise
- `<label [for]="nativeInputId()">` rendered when `label()` input is provided
- `ng-content` fallback slot when no `label()` (allows projected `<label>` from the host)
- Space key toggles natively (type=checkbox behaviour)
- `LiveAnnouncerService` announces `"${label} on"` / `"${label} off"` after each toggle
- `ControlValueAccessor` fully implemented including `setDisabledState`
- Module-level `toggleSwitchIdCounter` — unique IDs even with multiple instances
- `isDisabled` computed from `disabled()` input OR `cvaDisabled` signal
- `effectiveTabindex` — `-1` when disabled

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — No accessible name guard (CRITICAL)
The component should warn in DEV mode when neither `ariaLabel`, `label`, nor a projected `<label>`
provides an accessible name. Without this, the switch is completely unlabeled for screen readers.

```typescript
// In ngAfterViewInit, after the label check:
if (isDevMode()) {
  const hasLabel: boolean =
    !!this.ariaLabel() ||
    !!this.label() ||
    !!this.hostElement.nativeElement.querySelector('label[for]');
  if (!hasLabel) {
    console.warn(
      '[ui-lib-toggle-switch] No accessible name found. ' +
      'Provide ariaLabel, label input, or a projected <label>.'
    );
  }
}
```

#### Issue 2 — `readonly` state not reflected in ARIA (MODERATE)
`readonly` state prevents toggling but does not set any ARIA attribute. Add:
```html
[attr.aria-readonly]="readonly() || null"
```

#### Issue 3 — Live announcer label fallback (MODERATE)
The announcer currently falls back to `'Toggle switch'` when no label is set — ensure this is
translated or customisable via a future `i18n` input. Document this limitation in the README.

#### Issue 4 — High-contrast track border (MODERATE)
In forced-colors / Windows high-contrast mode the track background colour may disappear. Ensure the
track has a visible border:
```scss
@media (forced-colors: active) {
  .ui-lib-toggle-switch__track {
    border: 2px solid ButtonText;
  }
}
```

#### Issue 5 — prefers-reduced-motion (CRITICAL — verify)
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-toggle-switch__thumb { transition: none; }
  .ui-lib-toggle-switch__track { transition: none; }
}
```

#### Deliverable — `toggle-switch.a11y.spec.ts` (aim 24–32 tests)
- `role="switch"` present on native input
- `aria-checked="false"` when off, `"true"` when on
- Space key toggles the switch (native checkbox — confirm no double-fire)
- Label association: `aria-label` path, `aria-labelledby` path (via `label()` input)
- `ng-content` path: projected `<label for>` connects to native input id
- Readonly: Space does not toggle, `aria-readonly` present
- Disabled: `aria-disabled` or native disabled, Space does not toggle, `tabindex="-1"`
- DEV mode warning when no accessible name provided
- Live announcer called with correct label + state string
- CVA `writeValue` / `setDisabledState` integration
- axe passes: default (with label), checked, disabled, readonly

---

### Phase 1 — Architecture Audit
- Verify module-level `toggleSwitchIdCounter` matches the number of rendered instances
- `ariaLabelledby` computed correctly: falls back to `labelElementId` ONLY when `label()` is set
  and `ariaLabel()` is null/empty
- Confirm `nativeInputId` honours the `inputId` override input

### Phase 2 — DX Audit
README should document:
- `role=switch` explanation (not `role=checkbox`, not `aria-pressed`)
- Three label strategies: `label` input, `ariaLabel` input, projected `<label>`
- CVA usage examples (`ngModel`, `formControl`)
- `readonly` vs `disabled` semantics

### Phase 4 — Performance Audit
- `ariaChecked`, `ariaLabelledby`, `effectiveTabindex` all use `computed<string|null>` — no
  unnecessary re-renders
- `LiveAnnouncerService` call is inside toggle event handler — not in `computed()`

### Phase 5 — Composability Audit
- Works inside `<ui-lib-form-field>` — label from FormField should connect via projected `<label>`
- Works inside `<ui-lib-icon-field>` layout

### Phase 6 — Polish Audit
- [ ] Thumb slide animation duration matches `--uilib-transition-base` token
- [ ] Track has visible border in forced-colors mode
- [ ] Focus ring is `:focus-visible` only (not `:focus`)
- [ ] Minimum track width 44 px and thumb 20 px (touch target WCAG 2.5.5)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toggle-switch/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/toggle-switch/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add ToggleSwitch row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
