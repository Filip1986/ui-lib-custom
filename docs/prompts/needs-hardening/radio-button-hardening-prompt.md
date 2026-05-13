# RadioButton — 6-Phase Hardening Prompt (Formal Scoring)
**Component:** `ui-lib-custom/radio-button` · `<ui-lib-radio-button>`
**Queue position:** Tier 3, #23 — listed as "hardened without dedicated prompt file" but no scores exist in COMPONENT_SCORES.md. This session runs the full 6-phase workflow to produce formal scores.
**Generated:** 2026-05-13
**Key a11y concern:** role=radiogroup on group wrapper, aria-required, arrow-key focus movement between siblings, fieldset/legend preferred group pattern.
---
## Step 1 — Read these files before doing anything else
1. AI_AGENT_CONTEXT.md, LIBRARY_CONVENTIONS.md, docs/VISION.md, docs/COMPONENT_SCORES.md
2. projects/ui-lib-custom/src/lib/radio-button/README.md
3. Full source: radio-button.ts, radio-button.html, radio-button.scss, radio-button.spec.ts
4. Hardened siblings: checkbox/checkbox.ts (aria-checked pattern), input/input.ts (label association)
---
## Step 2 — What is already present (do NOT regress these)
- Native input[type=radio] used? Or custom element? VERIFY
- name attribute for group association VERIFY
- role=radiogroup on group wrapper VERIFY
- Arrow key focus movement between siblings VERIFY
- aria-describedby for error/hint VERIFY
- aria-invalid on group VERIFY
- prefers-reduced-motion in SCSS VERIFY
---
## Step 3 — The 6-phase workflow
### Phase 3 first — Accessibility Audit (CRITICAL PRIORITY)
#### Issue 1 — Native input[type=radio] (CRITICAL)
Native radio inputs provide arrow-key navigation, checked state, and form submission for free.
If a custom element is used, verify role="radio", aria-checked, and manual roving tabindex.
#### Issue 2 — Group wrapper with role=radiogroup or fieldset (CRITICAL)
Pattern A (preferred): fieldset + legend — no ARIA needed.
Pattern B: div role="radiogroup" aria-labelledby="groupLabelId".
Add ariaLabel / ariaLabelledBy / required inputs on the group wrapper.
#### Issue 3 — Arrow key navigation (CRITICAL)
With native input[type=radio] the browser handles arrow keys automatically within the same name group.
Verify this still works when the visual input is hidden. If not, implement roving tabindex manually.
#### Issue 4 — aria-invalid + aria-describedby on group (MODERATE)
Bind aria-invalid="true" and aria-describedby to the error element id when invalid input is set.
#### Issue 5 — prefers-reduced-motion (MODERATE)
Add media query to remove transitions and ripple in SCSS.
#### Deliverable — radio-button.a11y.spec.ts (aim 25-35 tests)
- input type=radio, unique id, label for association
- Group: role=radiogroup/fieldset, accessible name, aria-required
- Arrow keys move focus/selection
- Disabled: native disabled attribute
- Invalid: aria-invalid, aria-describedby to error element
- axe passes: default, required, invalid, disabled
---
### Phase 1 — Architecture Audit
- Module-level ID counter: let nextRadioButtonId = 0
- name input required for native group behavior
- Group component documented with its selector
### Phase 2 — DX Audit
README: group pattern, name input, all a11y-relevant inputs, CSS custom properties table.
### Phase 4 — Performance Audit
- computed for all derived ARIA values
- No unnecessary renders when sibling selection changes
### Phase 5 — Composability Audit
- Custom label content projection (icons + text)
- Group: horizontal and vertical layout support
### Phase 6 — Polish Audit
- Check mark animation respects prefers-reduced-motion
- Focus ring is :focus-visible not :focus
- Invalid state visually applied to each radio
---
## Step 4 — Commands
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/radio-button/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/radio-button/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```
## Step 5 — Scoring and Step 6 — Handoff
After all phases, update docs/COMPONENT_SCORES.md RadioButton row (yellow to green) and append handoff to AI_AGENT_CONTEXT.md.
