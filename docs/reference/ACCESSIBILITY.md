# Accessibility Support (WCAG 2.1 AA)

Baseline: 2026-02-25.

This document summarizes current accessibility support for the UI library components.
Tests use `jest-axe` with color-contrast checks skipped where noted.

## Compliance Table

| Component | Roles/ARIA | Keyboard | Screen Reader Labels | Status |
| --- | --- | --- | --- | --- |
| Button | aria-disabled, aria-busy, aria-label, role overrides | Enter/Space activate | aria-label for loading/icon-only | Pass |
| Input | label/for, aria-invalid, aria-describedby, aria-required | Standard input focus/blur | Error text announced | Pass |
| Select | combobox/listbox/option, aria-expanded, aria-activedescendant | Arrow, Enter, Escape, Home/End | Label/placeholder used | Pass |
| Checkbox | role=checkbox, aria-checked (mixed), aria-labelledby | Enter/Space toggle | label/description | Pass |
| SelectButton | radiogroup/radio or group/checkbox, aria-checked | Arrow, Home/End, Enter/Space | aria-label or labelledby | Pass |
| Tabs | tablist/tab/tabpanel, aria-selected/controls/labelledby | Arrow keys, Home/End | labels via tab text | Pass |
| Accordion | region, aria-expanded, aria-controls/labelledby | Arrow, Home/End, Enter/Space | headers as labels | Pass |
| Card | role=button when hoverable, aria-label | Enter/Space (hoverable) | aria-label for hoverable | Pass |
| Alert | role=alert, dismiss control aria-label | N/A | dismiss label | Pass |
| Icon | role=button when clickable, aria-label/hidden | Enter/Space (clickable) | aria-label for clickable | Pass |
| Badge | role=status for dot, aria-label for dot/label usage | N/A | label for dot state | Pass |

## Notes

- Color contrast checks are skipped in automated tests; visual audits are required.
- Components follow WAI-ARIA Authoring Practices for their roles and keyboard patterns.
