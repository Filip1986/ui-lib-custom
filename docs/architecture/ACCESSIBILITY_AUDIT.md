# Accessibility Audit

## Task Receipt

Audit ARIA, keyboard, focus management, and tests for core components and document gaps with WCAG mapping.

## Checklist

- [x] Review component TS/templates for ARIA roles, states, properties, keyboard, focus.
- [x] Review existing spec files for accessibility coverage.
- [x] Identify gaps with WCAG references and priorities.
- [x] Provide per-component assessment and recommended fixes.
- [x] Provide keyboard navigation matrix.

## Sources Reviewed

- `docs/reference/systems/ACCESSIBILITY.md`
- `LIBRARY_CONVENTIONS.md`
- Component sources:
  - `projects/ui-lib-custom/src/lib/select/select.ts`
  - `projects/ui-lib-custom/src/lib/select/select.html`
  - `projects/ui-lib-custom/src/lib/tabs/tabs.ts`
  - `projects/ui-lib-custom/src/lib/tabs/tabs.html`
  - `projects/ui-lib-custom/src/lib/tabs/tab.ts`
  - `projects/ui-lib-custom/src/lib/tabs/tab-panel.ts`
  - `projects/ui-lib-custom/src/lib/accordion/accordion.ts`
  - `projects/ui-lib-custom/src/lib/accordion/accordion-panel.ts`
  - `projects/ui-lib-custom/src/lib/accordion/accordion-panel.html`
  - `projects/ui-lib-custom/src/lib/input/input.ts`
  - `projects/ui-lib-custom/src/lib/input/input.html`
  - `projects/ui-lib-custom/src/lib/checkbox/checkbox.ts`
  - `projects/ui-lib-custom/src/lib/checkbox/checkbox.html`
  - `projects/ui-lib-custom/src/lib/button/button.ts`
  - `projects/ui-lib-custom/src/lib/button/button.html`
  - `projects/ui-lib-custom/src/lib/select-button/select-button.ts`
  - `projects/ui-lib-custom/src/lib/select-button/select-button.html`
- Specs:
  - `projects/ui-lib-custom/src/lib/accordion/accordion.spec.ts`
  - `projects/ui-lib-custom/src/lib/accordion/accordion-panel.spec.ts`
  - `projects/ui-lib-custom/src/lib/tabs/tabs.spec.ts`
  - `projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts`
  - `projects/ui-lib-custom/src/lib/button/button.spec.ts`
  - `projects/ui-lib-custom/src/lib/select-button/select-button.spec.ts`

## Per-Component Accessibility Assessment

### Select (`ui-lib-select`)

**Strengths**
- `role="combobox"`, `aria-expanded`, `aria-controls` on the control.
- `role="listbox"` on the panel and `role="option"` + `aria-selected` on options.
- Escape closes panel; arrow keys move focus index.

**Gaps**
- Label association uses `<label for="id">` with a `div` control; this does not associate in AT.
- No `aria-labelledby` or `aria-label` on the combobox when label is present.
- Missing `aria-activedescendant` on the combobox; focused option is not exposed to AT.
- Options do not expose `aria-disabled` when disabled.
- Missing `aria-haspopup="listbox"` and `aria-autocomplete` (for searchable state).
- Search input lacks `aria-label` or `aria-labelledby`.
- Focus is not restored to the combobox after closing the panel.

### Tabs (`ui-lib-tabs` + `ui-lib-tab-panel`)

**Strengths**
- `role="tablist"`, `role="tab"`, `role="tabpanel"` present.
- `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-hidden` used correctly.
- Roving tabindex in template; keyboard handlers for arrows, Home/End.
- Optional `focusPanelOnSelect`.

**Gaps**
- RTL keyboard behavior is implemented but not tested (risk of regressions).
- Close button lacks `aria-controls` to the panel (optional, but helpful).

### Accordion (`ui-lib-accordion` + `ui-lib-accordion-panel`)

**Strengths**
- Header button uses `aria-expanded`, `aria-controls`, `aria-disabled`.
- Panel uses `role="region"` and `aria-labelledby`.
- Keyboard handling for Enter/Space on header.
- Accordion container handles roving focus with arrows/Home/End.

**Gaps**
- Header `role="button"` on a native button is redundant; no functional issue.
- No explicit `aria-level` or header semantics (optional).

### Input (`ui-lib-input`)

**Strengths**
- Label uses `for`/`id` association when `label` is provided.
- `aria-invalid`, `aria-required`, `aria-describedby` wired to error text.
- Clear and toggle buttons have `aria-label`.

**Gaps**
- Error text is not in a live region (`aria-live` or `role="alert"`), so dynamic errors may not be announced.
- When `label` is empty, there is no fallback `aria-label` input.

### Checkbox (`ui-lib-checkbox`)

**Strengths**
- Host role `checkbox` with `aria-checked`, `aria-disabled`.
- `aria-labelledby`/`aria-describedby` for label + description.
- Keyboard support for Space/Enter.

**Gaps**
- No `aria-required` support for required use cases (optional).

### Button (`ui-lib-button`)

**Strengths**
- `aria-disabled`, `aria-busy`, `aria-pressed`, `aria-checked` supported.
- Proper `type` and tabindex support.

**Gaps**
- No enforced or guided `aria-label` for icon-only buttons (developer responsibility).
- Loading state does not announce text changes (no live region or `aria-live` helper).

### Select Button (`ui-lib-select-button`)

**Strengths**
- Keyboard navigation (arrows, Home/End, Enter/Space).
- Roving tabindex.
- `aria-pressed` reflects selection state.

**Gaps**
- `role="group"` is generic; single-select should map to `radiogroup` + `radio` semantics.
- No `aria-label` fallback if `ariaLabelledBy` is absent.
- Uses `aria-pressed`; for single-select `aria-checked` with role `radio` is more appropriate.

## Gap Analysis Table

| Component | Issue | WCAG Criterion | Priority |
| --- | --- | --- | --- |
| Select | Label not associated with combobox (label targets div) | 1.3.1, 4.1.2 | High |
| Select | Missing `aria-activedescendant` for focused option | 4.1.2 | High |
| Select | Missing `aria-haspopup="listbox"` and `aria-autocomplete` | 4.1.2 | Medium |
| Select | Options missing `aria-disabled` | 4.1.2 | Medium |
| Select | Search input lacks accessible name | 4.1.2 | Medium |
| Select | Focus not restored to combobox on close | 2.4.3 | Medium |
| Input | Error text not announced (`aria-live`) | 4.1.3 | High |
| Button | Icon-only buttons lack enforced `aria-label` | 4.1.2 | Medium |
| Select Button | Uses `role=group`/`aria-pressed` for single-select (should be radiogroup/radio) | 4.1.2 | Medium |
| Select Button | No `aria-label` fallback when `ariaLabelledBy` missing | 4.1.2 | Medium |
| Tabs | RTL keyboard behavior not covered by tests | 1.3.2 (testing gap) | Medium |
| All | No explicit high-contrast handling guidance/tests | 1.4.11 (testing gap) | Medium |

## Recommended Fixes

### Select
- Add `aria-labelledby` linking label and combobox.
- Add `aria-activedescendant` on the combobox and apply stable IDs to options.
- Add `aria-haspopup="listbox"` and `aria-autocomplete="list"` when searchable.
- Add `aria-disabled` for disabled options.
- Ensure search input has `aria-label` (e.g., "Search options").
- Restore focus to the combobox after closing.

### Input
- Add `aria-live="polite"` or `role="alert"` on error text container.
- Provide `aria-label` input for cases without visible label.

### Button
- Add `ariaLabel` input and enforce when `iconOnly` is true (warn in dev mode).

### Select Button
- Use `role="radiogroup"` and `role="radio"` for single-select with `aria-checked`.
- Keep `role="group"` + `aria-pressed` for multi-select (or use `aria-multiselectable`).
- Add `aria-label` input for group label.

### Tabs
- Add unit tests for RTL arrow behavior and focus management.

## Keyboard Navigation Matrix

| Component | Tab | Arrow Keys | Home/End | Enter/Space | Escape | Focus Restore |
| --- | --- | --- | --- | --- | --- | --- |
| Select | Focus control | Move option focus (open) | No | Select option | Close panel | Missing (should restore) |
| Tabs | Focus active tab | Navigate tabs | Yes | Activate tab | n/a | Optional (panel focus) |
| Accordion | Focus header | Navigate headers | Yes | Toggle panel | n/a | Yes |
| Input | Focus input | n/a | n/a | Submit form | n/a | n/a |
| Checkbox | Focus host | n/a | n/a | Toggle | n/a | Yes |
| Button | Focus button | n/a | n/a | Activate | n/a | Yes |
| Select Button | Roving focus | Navigate options | Yes | Select | n/a | Yes |

## Test Coverage Gaps

- No select component specs; no ARIA assertions or keyboard tests for select.
- No input component specs; no ARIA/error announcement tests.
- Tabs specs cover `aria-selected` and scroll buttons; no RTL keyboard tests.
- Select-button specs cover `aria-pressed` but not group semantics.

## Notes

- The accessibility guide already outlines expected ARIA behavior; several components do not yet meet those expectations.
- Prioritize select and input fixes first due to high impact on screen readers.

