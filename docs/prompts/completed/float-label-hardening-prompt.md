# FloatLabel — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/float-label` · `<uilib-float-label>` *(note: selector uses `uilib-` not `ui-lib-`)*
**Queue position:** Layout (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** Floating label pattern MUST NOT replace placeholder-only labeling. Label must
remain readable at all states. Font size must stay ≥ 11px when floated to meet WCAG 1.4.4. The
current implementation is a **scaffold** — it needs a full label/input wiring strategy before
formal scoring can begin.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/float-label/README.md`
3. Full source: `float-label.ts`, `float-label.html`, `float-label.scss`, `float-label.spec.ts`,
   `float-label.types.ts`, `float-label.a11y.spec.ts`
4. Hardened siblings: `input/input.ts`, `form-field/form-field.ts`

---

## Step 2 — Current scaffold state (START HERE before auditing)

The current implementation (`float-label.ts`) is a minimal scaffold:
- Selector is `uilib-float-label` (inconsistent with the rest of the library — consider `ui-lib-float-label`)
- Only `variant` input exists: `'over' | 'in' | 'on'` — no label wiring
- Template is a bare `<ng-content>` wrapper
- There is **no label-to-input association logic** and **no float trigger**

The full implementation must be designed before the 6-phase audit can run.

**Design recommendation:** Use the CSS-only approach where possible:
```scss
/* Float triggered by :focus-within or :not(:placeholder-shown) on the wrapped input */
.uilib-float-label:focus-within label,
.uilib-float-label:has(input:not(:placeholder-shown)) label,
.uilib-float-label:has(textarea:not(:placeholder-shown)) label {
  transform: translateY(-1.25em) scale(0.8);
}
```
This avoids JS change-detection for the float state entirely.

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Real `<label for="inputId">` (CRITICAL)
The floating label MUST be a real `<label>` element projected by the consumer or generated inside
the component. A `<span>` without `role="presentation"` is acceptable only as a visual decoration
if a separate `<label>` already provides the accessible name.

Recommended consumer pattern:
```html
<uilib-float-label>
  <label for="my-input">Email address</label>
  <ui-lib-input id="my-input" placeholder=" " />
</uilib-float-label>
```

#### Issue 2 — `placeholder=" "` trick for CSS float trigger (CRITICAL)
The CSS `:not(:placeholder-shown)` selector requires a non-empty placeholder (a single space `" "`
works). Document this requirement explicitly in the README.

#### Issue 3 — Floated label color contrast (CRITICAL)
When the label floats above the input, verify:
- Text color meets 4.5:1 contrast against the page background at the floated position
- Font size is ≥ 11px even at 200% browser zoom (WCAG 1.4.4)

#### Issue 4 — prefers-reduced-motion (CRITICAL)
```scss
@media (prefers-reduced-motion: reduce) {
  .uilib-float-label label {
    transition: none;
  }
}
```

#### Issue 5 — Screen reader reads label in both states (MODERATE)
Since the label is always in the DOM (just repositioned visually), verify that screen readers do
not announce it as a separate interactive element. `pointer-events: none` on the floated label
keeps it out of the accessibility tree when positioned over the input.

#### Issue 6 — Selector naming inconsistency (LOW — but document)
The selector `uilib-float-label` differs from the `ui-lib-` prefix used by all other components.
Decide which prefix is canonical and document the deviation in the README if kept.

#### Deliverable — `float-label.a11y.spec.ts` (aim 15–20 tests)
- Projected `<label>` has `for` pointing to the wrapped input
- `placeholder=" "` pattern triggers float correctly in CSS
- axe passes: default (label + input), focused state, filled state
- Floated label has visible contrast (verified via CSS variables / design tokens)

---

### Phase 1 — Architecture Audit
- Decide: component (`<uilib-float-label>`) vs attribute directive (`uiLibFloatLabel`)
- If component: project `<label>` + `<input>` via `ng-content`
- Selector spelling decision: `uilib-float-label` vs `ui-lib-float-label`
- Expose `variant: 'over' | 'in' | 'on'` as public input (keep existing)

### Phase 2 — DX Audit
README must explain:
- `placeholder=" "` requirement
- Three variant modes: `over`, `in`, `on`
- Compatible form controls: Input, Textarea, Select, AutoComplete, Password
- How to use with `FormField` for error/hint integration

### Phase 4 — Performance Audit
- CSS-only variant (`:focus-within`, `:not(:placeholder-shown)`) — zero JS for float state
- JS fallback only if CSS selectors are insufficient for the variant

### Phase 5 — Composability Audit
- Works with Input, Textarea, Password, AutoComplete, Select
- Works inside FormField — label+error+hint chain preserved
- Works inside InputGroup — icon layout compatibility

### Phase 6 — Polish Audit
- [ ] Float animation easing matches `--uilib-transition-base` token
- [ ] Label background fill prevents overlap bleed in Material variant
- [ ] Border radius on label background matches input border-radius
- [ ] Minimum floated font-size 11px (WCAG 1.4.4 at 200% zoom)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/float-label/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/float-label/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add FloatLabel row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
