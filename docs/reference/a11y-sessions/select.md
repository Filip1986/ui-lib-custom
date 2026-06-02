# Select — Screen Reader Session

> **Status:** Template ready — manual testing required.
> Fill in "Announced" and "Pass?" columns after running with NVDA + Chrome and VoiceOver + Safari.

Date: <!-- YYYY-MM-DD -->
NVDA version: <!-- e.g. 2024.4 --> · Chrome version: <!-- e.g. 125 -->
VoiceOver: <!-- macOS 14.x --> · Safari: <!-- e.g. 17.x -->

---

## NVDA + Chrome

### Closed state

| Step | Action                                   | Announced                                           | Pass? |
| ---- | ---------------------------------------- | --------------------------------------------------- | ----- |
| 1    | Tab to `<ui-lib-select label="Country">` | "Country, collapsed, combobox" (or equivalent)      |       |
| 2    | Read current state                       | `aria-expanded="false"` present; no `aria-controls` |       |
| 3    | Press `ArrowDown`                        | Panel opens; first enabled option announced         |       |
| 4    | Press `Escape`                           | Panel closes; focus returns to combobox trigger     |       |

### Option navigation (panel open)

| Step | Action                          | Announced                                               | Pass? |
| ---- | ------------------------------- | ------------------------------------------------------- | ----- |
| 5    | Press `ArrowDown` (panel open)  | "Alpha, option, 1 of 3" (or equivalent)                 |       |
| 6    | Press `ArrowDown` again         | "Beta, option, 2 of 3"                                  |       |
| 7    | Press `ArrowUp`                 | "Alpha, option, 1 of 3"                                 |       |
| 8    | Press `Home`                    | First option name                                       |       |
| 9    | Press `End`                     | Last option name                                        |       |
| 10   | Press `Enter` on focused option | Option selected; panel closes; selected value announced |       |

### Selection state

| Step | Action                                         | Announced                                                        | Pass? |
| ---- | ---------------------------------------------- | ---------------------------------------------------------------- | ----- |
| 11   | After selecting "Alpha", Tab away and Tab back | "Alpha, Country, combobox" or similar — selected value in name   |       |
| 12   | Press `Space` to open                          | Panel opens; "Alpha" option has `aria-selected="true"` announced |       |

### Multiple mode

| Step | Action                             | Announced                               | Pass? |
| ---- | ---------------------------------- | --------------------------------------- | ----- |
| 13   | Tab to multi-select; Press `Space` | Panel opens with `aria-multiselectable` |       |
| 14   | Select two options                 | Both reflected in trigger display value |       |
| 15   | Clear button                       | "Clear selection, button" announced     |       |

### Searchable mode

| Step | Action                 | Announced                                             | Pass? |
| ---- | ---------------------- | ----------------------------------------------------- | ----- |
| 16   | Open searchable select | Search input focused; `aria-autocomplete="list"`      |       |
| 17   | Type "al"              | Live region announces "1 result available" (or count) |       |

### States

| Step | Action                 | Announced                                     | Pass? |
| ---- | ---------------------- | --------------------------------------------- | ----- |
| 18   | Tab to disabled select | "Country, dimmed, combobox" or "unavailable"  |       |
| 19   | Tab to invalid select  | "Country, invalid entry, combobox" or similar |       |
| 20   | Tab to required select | "Country, required, combobox"                 |       |

---

## VoiceOver + Safari

| Step | Action                        | Announced                           | Pass? |
| ---- | ----------------------------- | ----------------------------------- | ----- |
| 1    | VO-Tab to select              | "Country, collapsed, combobox"      |       |
| 2    | Press `ArrowDown`             | Panel opens; first option           |       |
| 3    | Press `Escape`                | Closes; focus restored              |       |
| 4    | Select an option with `Enter` | Value updated; panel closes         |       |
| 5    | Tab to disabled               | "dimmed" or "unavailable" announced |       |

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
- `aria-activedescendant` pattern (options not independently focusable)
- Live region for search result counts
- All states (`aria-invalid`, `aria-required`, `aria-disabled`) wired to host

---

_Run with NVDA 2024+ + Chrome latest and VoiceOver macOS 14+ + Safari latest._
_Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/_
