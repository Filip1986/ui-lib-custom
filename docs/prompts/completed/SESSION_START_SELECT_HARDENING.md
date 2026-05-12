# Session Prompt — Select Component Hardening

> **Copy the block below and paste it as the first message in a new AI agent session.**
> The prompt is self-contained. The agent needs no prior context from this session.

---

## Prompt

```
You are a senior Angular framework architect and elite UI systems engineer working on ui-lib-custom — a next-generation Angular UI ecosystem with a current strategic commitment to Elite Accessibility as its signature strength.

---

## Step 1 — Read these files before doing anything else (in this order)

1. `AI_AGENT_CONTEXT.md` — current milestone, component inventory, recent handoffs
2. `LIBRARY_CONVENTIONS.md` — all architectural rules and the bash.exe terminal requirement
3. `docs/VISION.md` — strategic north star, especially the "Committed — Elite Accessibility" section
4. `docs/COMPONENT_SCORES.md` — the hardening backlog; Select is #2 in Tier 1
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow you will follow
6. `projects/ui-lib-custom/src/lib/select/README.md` — the component API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/select/select.ts`
- `projects/ui-lib-custom/src/lib/select/select.html`
- `projects/ui-lib-custom/src/lib/select/select.scss`
- `projects/ui-lib-custom/src/lib/select/select.types.ts`
- `projects/ui-lib-custom/src/lib/select/select.constants.ts`
- `projects/ui-lib-custom/src/lib/select/select.spec.ts`
- `projects/ui-lib-custom/src/lib/select/select.a11y.spec.ts`

Also read the completed Dialog and Drawer hardening sessions for patterns to follow:
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts` — signal viewChild, queueMicrotask focus patterns
- `projects/ui-lib-custom/src/lib/drawer/drawer.ts` — module-level ID counter, FocusTrap

Do not write any code until you have read all of the above.

---

## Step 2 — Your task

Evolve the Select component through the 6-phase workflow defined in
`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The current committed wow factor for this library is **Elite Accessibility**.
The key a11y concern for Select (from the hardening backlog) is:
> Combobox/listbox ARIA pattern — the hardest form control to get right.

Specific concerns — investigate every one of these before proposing any fix:

### Architecture concerns (Phase 1)

1. **`@ViewChild` decorator** — `select.ts` uses `@ViewChild('panel')` and `@ViewChild('inputEl')` and `@ViewChild('controlEl')`. These must be migrated to `viewChild<ElementRef<HTML...>>()` signal queries per project conventions. `ViewChild` decorator is an anti-pattern in this codebase.

2. **`@HostListener` + host `(keydown)` binding — double-firing bug** — The component has BOTH `'(keydown)': 'onKeydown($event)'` in the `host` metadata AND `@HostListener('keydown', ['$event'])` on the `onKeydown()` method. This causes `onKeydown` to fire **twice** on every keydown event. Fix: remove the `@HostListener` decorator and keep only the `host` binding (or vice-versa).

3. **`@HostListener('document:click')` global listener** — This registers a global document-level click listener that fires on every click in the app, even when the panel is closed. Replace with a targeted approach: only attach the outside-click listener when the panel is open (e.g. inject `DOCUMENT` and use `addEventListener`/`removeEventListener` with cleanup, or use the `DestroyRef`/`takeUntilDestroyed` pattern).

4. **`CommonModule` import** — The component imports `CommonModule` but only uses `*ngTemplateOutlet` directive from it. Replace with the specific `NgTemplateOutlet` import from `@angular/common`.

5. **`constructor() {}`** — Empty constructor body. Minor but unnecessary noise; remove it (Angular injects are via `inject()` already).

### Accessibility concerns (Phase 3 — priority)

6. **`aria-controls` points to listbox when closed** — The host binds `[attr.aria-controls]="listboxId() || null"`. However `listboxId()` always returns a non-null string, yet the listbox element itself only exists in the DOM when `open()` is true (`@if (open())`). When the panel is closed, `aria-controls` should be `null` (attribute removed) because the element it references does not exist. Fix: `[attr.aria-controls]="open() ? listboxId() : null"`.

7. **Option groups have no ARIA role** — Group header `<div class="ui-lib-select__group">{{ groupKey }}</div>` has no `role` attribute. Per the ARIA listbox pattern, grouped options require `role="group"` on the container and `aria-label` on the group label, with `role="option"` elements nested inside. The current flat structure is semantically incorrect for grouped Select.

8. **Search input missing combobox-pattern attributes** — When `searchable=true`, the `#inputEl` inside the panel is the active text input. It needs:
   - `role="combobox"` (the search input IS the combobox text box in ARIA 1.2 pattern)
   - `aria-autocomplete="list"` — tells AT that typing filters the list
   - `aria-controls` pointing to the listbox id — connects the input to the options popup
   - `aria-expanded` mirroring the open state
   Without these, screen readers cannot identify the relationship between the search field and the option list.

9. **Decorative controls lack `aria-hidden`** — The dropdown arrow `<span class="ui-lib-select__arrow">▾</span>` renders a Unicode character that screen readers may announce. It must have `aria-hidden="true"`. Similarly, the spinner span should have `aria-hidden="true"`.

10. **Clear button uses a raw `×` text character** — The clear button `>×</button>` renders a raw Unicode multiplication sign. Replace with an inline SVG (same path as Dialog/Drawer close icon) with `aria-hidden="true"` inside the button, and keep `aria-label="Clear selection"` on the button itself. This is a dogfooding violation — raw text characters in interactive controls are not accessible.

11. **`aria-selected` value type** — `[attr.aria-selected]="selectedValues().has(opt.value)"` produces `aria-selected="true"` or `aria-selected="false"` (boolean-coerced to string by Angular). ARIA specifies `aria-selected` should be `"true"` or `"false"` as strings. Verify this renders correctly as strings and not as boolean DOM attributes. If Angular renders it as `aria-selected=""` for false, fix to `[attr.aria-selected]="selectedValues().has(opt.value) ? 'true' : 'false'"`.

12. **No `aria-setsize` / `aria-posinset`** — When options are rendered with `role="option"`, AT can benefit from `aria-setsize` (total count) and `aria-posinset` (1-based index) attributes. These are especially valuable when options are virtualized or filtered, giving users a sense of position within the list. Add these to each option.

13. **No live region for filter results count** — When `searchable=true` and the user types, the filtered count changes. Screen readers need a live region announcement such as "3 results available" so users know what's left. Add a visually hidden `aria-live="polite"` region that announces the filtered count.

14. **`select.a11y.spec.ts` is too thin** — The file has only 4 tests. It must be expanded to cover:
    - Closed state: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded="false"`, `aria-controls` is null when closed
    - Open state: `aria-expanded="true"`, `aria-controls` points to listbox, listbox has `role="listbox"`, options have `role="option"`
    - Keyboard navigation: ArrowDown opens panel, ArrowUp/Down moves `aria-activedescendant`, Enter selects, Escape closes and restores focus
    - Multi-select: `aria-multiselectable="true"`, `aria-selected` toggles
    - Disabled state: `aria-disabled="true"`, keyboard events are blocked
    - Search (searchable mode): input has `aria-autocomplete="list"`, filtering announces result count
    - Group ARIA: `role="group"` on group containers, `aria-label` on each group
    - axe-core automated checks for closed, open, and searchable states

Run the phases in this order:

**Phase 3 first (Accessibility Audit)** — this is the priority phase given the wow factor.
Then continue with Phases 1, 2, 4, 5, 6 to complete the full evolution.

For each phase:
- State what you found
- Propose specific changes
- Implement all changes immediately (do not wait for confirmation — this is an autonomous agent session)
- After each phase: run `npx.cmd eslint projects/ui-lib-custom/src/lib/select/ --max-warnings 0` then `npx.cmd ng build ui-lib-custom`

---

## Step 3 — After all 6 phases are complete

1. Score the component using the Scoring Session Template from `docs/COMPONENT_SCORES.md`
2. Update the Select row in `docs/COMPONENT_SCORES.md` with the actual scores
3. Update the Queue status for Select from ⏳ to ✅ or 🔄 depending on outcome
4. Run the full verification suite:
   - `npx.cmd jest --testPathPatterns=src/lib/select --no-coverage`
   - `npx.cmd jest --testPathPatterns=entry-points --no-coverage`
   - `npx.cmd eslint projects/ui-lib-custom/src/lib/select/ --max-warnings 0`
   - `npx.cmd ng build ui-lib-custom`
5. Append a session handoff block to `AI_AGENT_CONTEXT.md → ## Recent Handoffs`

---

## Non-negotiable rules for this session

- Use `bash.exe` for ALL terminal commands — never PowerShell (ESLint exits code 1 in PowerShell even on success)
- Use `npx.cmd` and `npm.cmd` if bare `npx`/`npm` fail due to `.ps1` shim restrictions
- Every change must pass ESLint at `--max-warnings 0` before being considered done
- When any a11y trade-off arises, always go further, not less
- Do not modify `LIBRARY_CONVENTIONS.md`, `AGENTS.md`, `CLAUDE.md`, or `docs/VISION.md` — those are stable reference documents
- The component uses `ViewEncapsulation.None` + `OnPush` + standalone — never change these
- **Critical:** Remove the duplicate `@HostListener('keydown')` decorator — the host `(keydown)` binding in the `host` metadata is sufficient and correct
- **Critical:** `@ViewChild` → `viewChild()` signal — this is a strict project convention
- **Dogfooding:** The `×` character in the clear button must be replaced with an inline SVG, never raw Unicode in interactive controls
- **Key lesson from Dialog hardening:** `triggerEventHandler('click', ...)` is required for OnPush host components in zoneless tests — direct property assignment does NOT mark the component dirty
- **Key lesson from Drawer hardening:** Optional chain `?.method()` on a type cast without `| null` triggers `@typescript-eslint/no-unnecessary-condition` — always include `| null` in the cast type

---

## Success criteria

The session is complete when:
- All 6 phases have been run and improvements applied
- `select.a11y.spec.ts` has comprehensive tests covering combobox ARIA pattern, keyboard nav, and axe-core
- All 10 scorecard categories have been evaluated and recorded in `docs/COMPONENT_SCORES.md`
- ESLint, build, and Jest all pass with zero errors
- The Select component scores ≥ 8 in every category, OR a clear plan exists for the remaining gaps
- The session handoff is written in `AI_AGENT_CONTEXT.md`

Begin by reading the files listed in Step 1. Report what you find before proposing any changes.
```

---

## Notes for the session

**Key ARIA combobox pattern reference (ARIA 1.2 / APG):**

The `select.html` currently uses a "list autocomplete with manual selection" pattern, which is the most widely supported combobox variant:

```
[host element]  role="combobox"  aria-haspopup="listbox"  aria-expanded  aria-controls → listbox
    └── [trigger/display area]  (click to open)
    └── [search input, if searchable]  aria-autocomplete="list"  aria-controls → listbox
    └── [panel, @if open]  role="listbox"  aria-label  aria-multiselectable?
            └── [group container]  role="group"  aria-label → group name
                └── [option]  role="option"  aria-selected  aria-disabled?  aria-setsize  aria-posinset
```

**The double-firing bug proof:** Both of these are present simultaneously in `select.ts`:
```typescript
// In @Component host:
'(keydown)': 'onKeydown($event)',

// On the method:
@HostListener('keydown', ['$event'])
public onKeydown(event: KeyboardEvent): void { ... }
```
Angular's `@HostListener` and `host: { '(keydown)': ... }` are two separate listeners on the same element — Angular adds both, causing every keydown to invoke `onKeydown` twice. Remove the decorator; keep only the `host` binding.

**If the component scores ≥ 8 on all categories in a single session:**
- Update Select queue status to `✅ Done` in `docs/COMPONENT_SCORES.md`
- Start the next component: **#3 — AutoComplete** (Tier 1, same tier, next highest priority)
- The key a11y concern for AutoComplete: *Combobox with live region announcements, `aria-activedescendant`*

**If it takes more than one session:**
- Leave Select at `🔄 In progress` in the queue
- Record exactly which phases are complete and what remains in the handoff
- The next session can pick up from the recorded phase

**Reference — the 6 phases in brief:**

| Phase | Focus |
|---|---|
| 1 — Architecture Review | Is the component fundamentally well-designed? SSR-safe? Signals-first? |
| 2 — DX Optimization | Reduce friction, improve naming, improve typing, improve autocomplete |
| **3 — Accessibility Audit** | **Full keyboard nav, ARIA correctness, focus management, reduced motion — run this first** |
| 4 — Performance Audit | Unnecessary renders, signal opportunities, memory, animation cost |
| 5 — Composability Audit | Content projection, directives, slots, headless patterns |
| 6 — Emotional Polish | Animation feel, interaction smoothness, perceived responsiveness, delight |

