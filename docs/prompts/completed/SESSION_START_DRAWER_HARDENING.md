# Session Prompt — Drawer Component Hardening

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
4. `docs/COMPONENT_SCORES.md` — the hardening backlog; Drawer is #5 in Tier 1
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow you will follow
6. `projects/ui-lib-custom/src/lib/drawer/README.md` — the component API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/drawer/drawer.ts`
- `projects/ui-lib-custom/src/lib/drawer/drawer.html`
- `projects/ui-lib-custom/src/lib/drawer/drawer.scss`
- `projects/ui-lib-custom/src/lib/drawer/drawer.types.ts`
- `projects/ui-lib-custom/src/lib/drawer/drawer.spec.ts`

Also read the completed Dialog and DynamicDialog hardening sessions for patterns to follow and pitfalls to avoid:
- `docs/prompts/SESSION_START_DIALOG_HARDENING.md` — the Dialog session prompt (reference)
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts` — see how Dialog resolved focus management
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.ts` — see how DynamicDialog resolved the afterNextRender-inside-effect bug

Do not write any code until you have read all of the above.

---

## Step 2 — Your task

Evolve the Drawer component through the 6-phase workflow defined in
`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The current committed wow factor for this library is **Elite Accessibility**.
The key a11y concern for Drawer (from the hardening backlog) is:
> Side dialog, focus management, `aria-modal`.

Specific a11y concerns unique to Drawer — investigate every one of these:

1. **`afterNextRender()` inside `effect()` body** — `drawer.ts` calls `afterNextRender()` inside
   an `effect()`. This is exactly the pattern that causes `NG0203` (injection context error) when
   the effect re-runs outside the constructor. The Dialog hardening session documented the fix:
   use `queueMicrotask()` for focus management instead, or inject `Injector` and pass
   `{ injector: this.injector }` to `afterNextRender()`. Verify whether the current Drawer code
   already passes `{ injector: this.injector }` — if not, this is a critical bug.

2. **No `FocusTrap`** — Unlike Dialog, the Drawer does not use `FocusTrap` at all. When a
   `role="dialog"` panel is open, users can Tab out of it into background content. This violates
   WCAG 2.1 SC 2.1.2 (No Keyboard Trap requires that focus IS trappable in dialogs per APG
   modal dialog pattern). Add `FocusTrap` from `ui-lib-custom/core` — activate when the drawer
   opens, deactivate when it closes.

3. **`aria-modal` does not account for `modal=false`** — The panel binds
   `[attr.aria-modal]="visible() ? 'true' : null"`. When `modal=false` (no backdrop is shown)
   the drawer is non-modal, yet still gets `aria-modal="true"` while open — incorrect.
   The correct binding is `[attr.aria-modal]="visible() && modal() ? 'true' : null"`.

4. **No focus restoration on close** — When the drawer closes, focus is not returned to the
   element that triggered the open (e.g. the button the user clicked). This violates WCAG 2.1
   SC 3.2.2. Implement the same pattern as Dialog: save `document.activeElement` when the
   drawer opens, restore it when the drawer closes.

5. **Redundant `aria-hidden` on both host and panel** — The host sets
   `[attr.aria-hidden]='!visible()'` and the panel also sets `[attr.aria-hidden]="!visible()"`.
   Only one location should control this. Evaluate whether host-level `aria-hidden` is the
   correct approach, or whether panel-level is better, and remove the redundancy.

6. **`pi pi-times` PrimeNG icon class in close button** — The close button uses
   `<span class="pi pi-times" aria-hidden="true"></span>`. This is a dogfooding violation —
   the library must never depend on PrimeNG icons. Replace with an inline SVG × icon (same
   shape used in Dialog and DynamicDialog).

7. **No `aria-labelledby` support** — Only `aria-label` from `header()` is used. When `header`
   is empty but `showCloseButton=true` (header bar is still rendered), there is no accessible
   name. Consider adding `aria-labelledby` pointing to the title span when `header()` is
   non-empty, and an `aria-label` fallback (configurable or defaulting to 'Drawer') when no
   header text is provided.

8. **No `aria-describedby` support** — Add an optional `ariaDescribedby` input so callers can
   associate a description region with the drawer panel.

9. **No a11y spec file** — `drawer.a11y.spec.ts` does not exist. Create it with axe-core
   automated checks and manual focus/ARIA/keyboard tests, following the same pattern as
   `projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts`.

Run the phases in this order:

**Phase 3 first (Accessibility Audit)** — this is the priority phase given the wow factor.
Then continue with Phases 1, 2, 4, 5, 6 to complete the full evolution.

For each phase:
- State what you found
- Propose specific changes
- Implement all changes immediately (do not wait for confirmation — this is an autonomous agent session)
- After each phase: run `npx.cmd eslint projects/ui-lib-custom/src/lib/drawer/ --max-warnings 0` then `npx.cmd ng build ui-lib-custom`

**Important — create the a11y spec file as part of Phase 3:**
- Check whether `projects/ui-lib-custom/src/lib/drawer/drawer.a11y.spec.ts` exists
- If it does not exist, create it with axe-core automated checks and manual focus/ARIA tests
- Follow the same pattern as `projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts`

---

## Step 3 — After all 6 phases are complete

1. Score the component using the Scoring Session Template from `docs/COMPONENT_SCORES.md`
2. Update the Drawer row in `docs/COMPONENT_SCORES.md` with the actual scores
3. Update the Queue status for Drawer from ⏳ to ✅ or 🔄 depending on outcome
4. Run the full verification suite:
   - `npx.cmd jest --testPathPatterns=drawer --no-coverage`
   - `npx.cmd jest --testPathPatterns=entry-points --no-coverage`
   - `npx.cmd eslint projects/ui-lib-custom/src/lib/drawer/ --max-warnings 0`
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
- **Critical lesson from Dialog hardening:** `afterNextRender()` called inside an `effect()` body
  triggers `NG0203` (injection context error) when the effect re-runs outside the constructor.
  If the current Drawer code does NOT pass `{ injector: this.injector }` to `afterNextRender()`,
  fix it by switching to `queueMicrotask()` for focus management.
- **Key lesson from Dialog hardening:** `triggerEventHandler('click', ...)` is required for OnPush
  host components in zoneless tests — direct property assignment does NOT mark the component dirty.
- **Dogfooding rule:** Never use `pi pi-times` or any PrimeNG icon class — always replace with
  an inline SVG that matches the close icon used in Dialog and DynamicDialog.

---

## Success criteria

The session is complete when:
- All 6 phases have been run and improvements applied
- `drawer.a11y.spec.ts` exists with axe-core + focus + ARIA + keyboard tests
- All 10 scorecard categories have been evaluated and recorded in `docs/COMPONENT_SCORES.md`
- ESLint, build, and Jest all pass with zero errors
- The Drawer component scores ≥ 8 in every category, OR a clear plan exists for the remaining gaps
- The session handoff is written in `AI_AGENT_CONTEXT.md`

Begin by reading the files listed in Step 1. Report what you find before proposing any changes.
```

---

## Notes for the session runner

**Known issues pre-diagnosed (do not re-research, go straight to fixes):**

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | `afterNextRender()` inside `effect()` without `{ injector }` | 🔴 Critical | Verify in code; if missing, switch to `queueMicrotask()` |
| 2 | No `FocusTrap` — Tab escapes the open drawer panel | 🔴 Critical | Add `FocusTrap` from `ui-lib-custom/core`; activate on open, deactivate on close |
| 3 | `aria-modal="true"` when `modal=false` | 🟡 High | Change to `visible() && modal() ? 'true' : null` |
| 4 | No focus restoration to trigger on close | 🟡 High | Save/restore `document.activeElement` pattern (same as Dialog) |
| 5 | `pi pi-times` PrimeNG icon in close button | 🟡 High | Replace with inline SVG (same × path as Dialog/DynamicDialog) |
| 6 | `aria-hidden` set on both host and panel | 🟠 Medium | Keep host-level only (entire element hidden from AT when closed) |
| 7 | No `aria-labelledby` — only `aria-label` from `header()` | 🟠 Medium | Add `aria-labelledby` pointing to title span when header present |
| 8 | No `aria-describedby` support | 🟠 Medium | Add optional `ariaDescribedby` input |
| 9 | No a11y spec file | 🟠 Medium | Create `drawer.a11y.spec.ts` |

**If the component scores ≥ 8 on all categories in a single session:**
- Update Drawer queue status to `✅ Done` in `docs/COMPONENT_SCORES.md`
- The next target in the queue is **#6 — ConfirmDialog** (Tier 1)

**If it takes more than one session:**
- Leave Drawer at `🔄 In progress` in the queue
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

**Key imports used in this component:**
```typescript
import { FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';
```

**Close button SVG to use (matches Dialog and DynamicDialog):**
```html
<svg
  class="ui-lib-drawer__close-icon"
  viewBox="0 0 24 24"
  width="16"
  height="16"
  aria-hidden="true"
  focusable="false"
>
  <path
    d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6L17.6 19l1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z"
    fill="currentColor"
  />
</svg>
```
</content>
</invoke>
