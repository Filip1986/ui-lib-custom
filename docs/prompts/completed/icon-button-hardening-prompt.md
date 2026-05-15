# IconButton — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/icon-button` · `<ui-lib-icon-button>`
**Queue position:** Utilities (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** `ariaLabel` is **required at the type level** (`input.required<string>()`) —
compile-time enforcement. DEV mode warning fires when the string is empty at runtime.
`icon-button.a11y.spec.ts` already exists — read it before adding tests.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/icon-button/README.md`
3. Full source: `icon-button.ts`, `icon-button.html`, `icon-button.scss`,
   `icon-button.spec.ts`, `icon-button.a11y.spec.ts`, `icon-button.types.ts`
4. Hardened siblings: `button/button.ts` (icon-only pattern), `icon/icon.ts`

---

## Step 2 — What is already present (do NOT regress these)

- `ariaLabel: InputSignal<string>` — **`input.required<string>()`** — cannot omit at compile time
- `icon: InputSignal<SemanticIcon | string>` — `input.required<SemanticIcon | string>()`
- `loading: InputSignal<boolean>` — when true: icon switches to `'spinner'`, `ariaLabelResolved`
  returns `'Loading, please wait'`
- `disabled: InputSignal<boolean>` — `isDisabled` is true when `disabled()` OR `loading()`
- `ariaLabelResolved` computed: loading → constant; otherwise trims `ariaLabel()` or null
- DEV mode `console.error` when `ariaLabel()` is an empty string (`ngAfterViewInit`)
- Uses `<ui-lib-icon>` component which applies `aria-hidden="true"` by default
- `size`, `variant`, `color` inputs with full class application
- `icon-button.a11y.spec.ts` already has coverage — read before extending

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Loading announce text not customisable (MODERATE)
`'Loading, please wait'` is hard-coded in English. Future i18n requirement.
Document this limitation in README: "Loading state aria-label is currently English-only."

#### Issue 2 — `disabled` state: native vs `aria-disabled` (VERIFY — CRITICAL)
Icon buttons should use `[disabled]="isDisabled()"` on the native `<button>` element, NOT only
`aria-disabled`. Verify the template uses the native `disabled` attribute (not just a class).
Native `disabled` is preferred because it removes the element from the tab order automatically.

#### Issue 3 — `isDisabled` when `loading()` (VERIFY — CRITICAL)
`loading()` sets `isDisabled()` to true. Confirm the button is actually disabled during loading
so users cannot double-submit.

#### Issue 4 — Loading spinner: `prefers-reduced-motion` (CRITICAL)
When loading, the spinner icon must respect:
```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-icon-button--loading .ui-lib-icon {
    animation: none;
  }
}
```

#### Issue 5 — Minimum touch target 44 × 44 px (MODERATE)
Icon-only buttons are a common source of undersized touch targets. All sizes (`sm`, `md`, `lg`)
must meet 44 × 44 px minimum (WCAG 2.5.5). Verify in SCSS.

#### Deliverable — `icon-button.a11y.spec.ts` (aim 18–24 tests — extend existing)
- Button has `aria-label` from `ariaLabel` input (via `ariaLabelResolved`)
- Icon inside has `aria-hidden="true"`
- Loading: `aria-label` becomes `'Loading, please wait'`, button is disabled
- Disabled: native `disabled` attribute present, not just class
- DEV mode: `console.error` fired when `ariaLabel` is empty string
- All sizes render button element (not a div)
- axe passes: default (with ariaLabel), disabled, loading

---

### Phase 1 — Architecture Audit
- `ariaLabel: input.required<string>()` — verify it is truly required (no default value)
- `ICON_BUTTON_LOADING_ARIA_LABEL` constant — give it a descriptive location in the file
- `resolvedIconName` computed: `loading ? 'spinner' : this.icon()`

### Phase 2 — DX Audit
README must explain:
- `ariaLabel` is REQUIRED — TypeScript compile error if omitted
- Loading state behaviour (icon replaces with spinner, button disabled, aria-label changes)
- Size tokens and minimum touch targets
- `color` input values (if any)

### Phase 4 — Performance Audit
- `iconSize`, `resolvedIconName`, `ariaLabelResolved`, `isDisabled`, `buttonClasses` all
  `computed<T>()` with explicit return types — verify

### Phase 5 — Composability Audit
- Works inside Toolbar (`role=toolbar` keyboard pattern)
- Works inside Card header slot
- Works as table row action button

### Phase 6 — Polish Audit
- [ ] All sizes: 44 × 44 px minimum touch target (WCAG 2.5.5)
- [ ] Focus ring is `:focus-visible`
- [ ] Loading spinner animation respects `prefers-reduced-motion`
- [ ] Every variant has 3:1 contrast ratio for the icon against its background (WCAG 1.4.11)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/icon-button/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/icon-button/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add IconButton row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
