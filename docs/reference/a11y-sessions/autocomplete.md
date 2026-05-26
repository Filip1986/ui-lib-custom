# AutoComplete — Screen Reader Session

> **Status:** Template ready — manual testing required.
> Fill in "Announced" and "Pass?" columns after running with NVDA + Chrome and VoiceOver + Safari.

Date: <!-- YYYY-MM-DD -->
NVDA version: <!-- e.g. 2024.4 -->  · Chrome version: <!-- e.g. 125 -->
VoiceOver: <!-- macOS 14.x -->  · Safari: <!-- e.g. 17.x -->

---

## NVDA + Chrome

### Closed / idle state

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 1 | Tab to `<ui-lib-autocomplete placeholder="Search…">` | Something like "Search…, combobox, edit" | |
| 2 | Inspect attributes before typing | `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded="false"`, `aria-haspopup="listbox"` present | |
| 3 | Tab past the control without typing | Focus leaves cleanly; no ghost panel | |

### Typing and panel open

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 4 | Type "lo" (2+ chars) | Panel appears; live region announces "N results available" | |
| 5 | Press `ArrowDown` from input | First option receives `aria-activedescendant`; option label announced | |
| 6 | Press `ArrowDown` again | Second option announced as "option, 2 of N" | |
| 7 | Press `ArrowUp` | Previous option announced | |
| 8 | Press `Home` (panel open) | First option in list announced | |
| 9 | Press `End` (panel open) | Last option in list announced | |
| 10 | Press `Enter` on focused option | Option selected; panel closes; input value updated; selection confirmed | |

### Panel dismiss

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 11 | Open panel, press `Escape` | Panel closes; focus returns to input; `aria-expanded="false"` | |
| 12 | Click outside while panel is open | Panel closes silently | |

### forceSelection mode

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 13 | Type free text that matches nothing; Tab away (`forceSelection=true`) | Input clears or restores previous value; no phantom selection | |

### Multiple (chip) mode

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 14 | Tab to `[multiple]="true"` autocomplete | Chip list group announced: "Selected items, group" | |
| 15 | Select two options | Both chips appear; live region or chip group updated | |
| 16 | Press `Backspace` in empty input | Last chip receives focus; announced as chip label | |
| 17 | Press `Backspace` / `Delete` on focused chip | Chip removed; focus moves to adjacent chip or input | |
| 18 | Press `←` / `→` with chips present | Navigation between chips announced; focus indicator visible | |

### Empty state

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 19 | Type query that returns no results | Panel shows empty-state; live region announces "0 results" or equivalent | |

### States

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 20 | Tab to `[disabled]="true"` autocomplete | "dimmed", "unavailable", or "grayed" announced; input not editable | |
| 21 | Tab to `[invalid]="true"` autocomplete | `aria-invalid="true"` announced as "invalid entry" | |
| 22 | Tab to `[loading]="true"` autocomplete with panel open | Loading indicator present; panel not showing stale options | |

---

## VoiceOver + Safari

| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 1 | VO-Tab to autocomplete | "Search…, combobox, edit text" or equivalent | |
| 2 | Type 2+ chars | Panel opens; VO reads option count from live region | |
| 3 | Press `ArrowDown` | First option announced | |
| 4 | Press `Enter` on option | Option selected; panel closes; value in field | |
| 5 | Tab to disabled autocomplete | "dimmed" or "unavailable" announced; not editable | |

---

## Issues found

<!-- Fill in after testing -->
- [ ] No issues found — or — list each issue here

---

## Verdict

A11y score before session: **9**
A11y score after session: <!-- update if issues found require fixes -->

Notes:
- Full combobox/listbox ARIA pattern implemented per APG 1.2 (ARIA 1.2 combobox with `aria-activedescendant`)
- `aria-activedescendant` pattern — options carry `role="option"`, `aria-selected`, `aria-posinset`, `aria-setsize`
- Panel carries `role="listbox"` with `aria-label`
- Chip list carries `role="group"` with `aria-label="Selected items"`
- Live region announces result counts (`aria-live="polite"`, `aria-atomic="true"`)
- `aria-invalid`, `aria-disabled`, `aria-expanded` wired to inputs

---

*Run with NVDA 2024+ + Chrome latest and VoiceOver macOS 14+ + Safari latest.*
*Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/*
