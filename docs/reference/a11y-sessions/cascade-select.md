# CascadeSelect — Screen Reader Session

> **Status:** Template ready — manual testing required.
> Fill in "Announced" and "Pass?" columns after running with NVDA + Chrome and VoiceOver + Safari.

Date: <!-- YYYY-MM-DD -->
NVDA version: <!-- e.g. 2024.4 --> · Chrome version: <!-- e.g. 125 -->
VoiceOver: <!-- macOS 14.x --> · Safari: <!-- e.g. 17.x -->

---

## NVDA + Chrome

### Closed state

| Step | Action                                                       | Announced                                                                                      | Pass? |
| ---- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ----- |
| 1    | Tab to `<ui-lib-cascade-select placeholder="Select a city">` | "Select a city, collapsed, combobox" (or equivalent)                                           |       |
| 2    | Check attributes                                             | `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded="false"`, `aria-controls` present |       |
| 3    | Tab past without opening                                     | Focus leaves cleanly; no ghost panel                                                           |       |

### Opening and first level

| Step | Action                   | Announced                                                                      | Pass? |
| ---- | ------------------------ | ------------------------------------------------------------------------------ | ----- |
| 4    | Press `Enter` or `Space` | Panel opens; `aria-expanded="true"`; first level `role="listbox"`              |       |
| 5    | Press `ArrowDown`        | First option announced via `aria-activedescendant`: "Australia, option 1 of N" |       |
| 6    | Press `ArrowDown` again  | Second option announced as "Canada, option 2 of N"                             |       |
| 7    | Press `ArrowUp`          | Previous option announced                                                      |       |
| 8    | Press `Home`             | First enabled option in current level                                          |       |
| 9    | Press `End`              | Last enabled option in current level                                           |       |

### Drilling into sub-levels

| Step | Action                                                          | Announced                                                                           | Pass? |
| ---- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----- |
| 10   | Navigate to a group option (has child list), press `ArrowRight` | Sub-list opens; first child option announced; parent `aria-expanded="true"`         |       |
| 11   | Press `ArrowDown` in child level                                | Next child option announced                                                         |       |
| 12   | Press `ArrowLeft`                                               | Child list collapses; focus returns to parent level; parent `aria-expanded="false"` |       |
| 13   | Drill to deepest level leaf, press `Enter`                      | Option selected; panel closes; trigger display value updated                        |       |

### Re-opening with selection

| Step | Action                   | Announced                                                                   | Pass? |
| ---- | ------------------------ | --------------------------------------------------------------------------- | ----- |
| 14   | Tab away and Tab back    | "Sydney, combobox" or selected value in trigger label                       |       |
| 15   | Press `Enter` to re-open | Previously selected path visible; `aria-activedescendant` at correct option |       |

### Dismiss without selection

| Step | Action                     | Announced                                                       | Pass? |
| ---- | -------------------------- | --------------------------------------------------------------- | ----- |
| 16   | Open panel, press `Escape` | Panel closes; focus returns to trigger; `aria-expanded="false"` |       |
| 17   | Open panel, press `Tab`    | Panel closes; focus moves to next element                       |       |

### States

| Step | Action                                    | Announced                                                       | Pass? |
| ---- | ----------------------------------------- | --------------------------------------------------------------- | ----- |
| 18   | Tab to `[disabled]="true"` cascade-select | "dimmed", "unavailable", or "grayed" announced; `tabindex="-1"` |       |
| 19   | Tab to `[invalid]="true"` cascade-select  | `aria-invalid="true"` announced as "invalid entry"              |       |
| 20   | Tab to `[loading]="true"` cascade-select  | Control disabled; spinner present                               |       |

### Clear button

| Step | Action                                                               | Announced                                      | Pass? |
| ---- | -------------------------------------------------------------------- | ---------------------------------------------- | ----- |
| 21   | When value is selected and `[showClear]="true"`, Tab to clear button | "Clear selection, button" announced            |       |
| 22   | Press `Enter` on clear button                                        | Value cleared; trigger shows placeholder again |       |

---

## VoiceOver + Safari

| Step | Action                             | Announced                                | Pass? |
| ---- | ---------------------------------- | ---------------------------------------- | ----- |
| 1    | VO-Tab to cascade-select           | "Select a city, collapsed, combobox"     |       |
| 2    | Press `Enter` / `Space`            | Panel opens; listbox announced           |       |
| 3    | Press `ArrowDown`                  | First option announced                   |       |
| 4    | Press `ArrowRight` on group option | Child list opens; first child announced  |       |
| 5    | Press `Enter` on leaf option       | Selected; panel closes; value in trigger |       |
| 6    | Tab to disabled                    | "dimmed" or "unavailable" announced      |       |

---

## Issues found

<!-- Fill in after testing -->

- [ ] No issues found — or — list each issue here

---

## Verdict

A11y score before session: **9**
A11y score after session: <!-- update if issues found require fixes -->

Notes:

- Full combobox/listbox ARIA pattern implemented per APG 1.2
- `aria-activedescendant` tracks focused option across all visible levels
- Multi-level listboxes: each `<ul role="listbox">` gets `aria-label` = parent option label or placeholder
- Group options carry `aria-haspopup="listbox"` and `aria-expanded`
- `aria-invalid`, `aria-disabled`, `aria-expanded` wired to host inputs

---

_Run with NVDA 2024+ + Chrome latest and VoiceOver macOS 14+ + Safari latest._
_Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/_
