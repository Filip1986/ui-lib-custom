# Session Prompt — DynamicDialog Component Hardening

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
4. `docs/COMPONENT_SCORES.md` — the hardening backlog; DynamicDialog is #4 in Tier 1
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow you will follow
6. `projects/ui-lib-custom/src/lib/dynamic-dialog/README.md` — the component API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.ts`
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.html`
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.scss`
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.types.ts`
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog-ref.ts`
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.service.ts`
- `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.spec.ts`

Also read the completed Dialog hardening session for patterns to follow and pitfalls to avoid:
- `docs/prompts/SESSION_START_DIALOG_HARDENING.md` — the Dialog session prompt (reference)
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts` — see how Dialog resolved focus management

Do not write any code until you have read all of the above.

---

## Step 2 — Your task

Evolve the DynamicDialog component through the 6-phase workflow defined in
`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The current committed wow factor for this library is **Elite Accessibility**.
The key a11y concern for DynamicDialog (from the hardening backlog) is:
> Same as Dialog + programmatic creation lifecycle — focus must be managed across dynamic component creation, and the DynamicDialogRef lifecycle must restore focus correctly on close.

Specific a11y concerns unique to DynamicDialog (beyond Dialog):
- Focus trap must activate **after** the guest component is fully mounted (the container uses `afterNextRender` — verify this is injection-context-safe and actually fires)
- `role=dialog` + `aria-modal` + `aria-labelledby` must be present on the panel even without a static header input
- When `DialogService.open()` is called, the element that had focus at call time must be restored when `DynamicDialogRef.close()` is called
- `aria-describedby` support if the guest component provides a description region
- The programmatic service API must not leave orphaned DOM nodes or event listeners when the dialog is force-closed
- Escape key must close the dialog from within guest component content (not just from the container itself)

Run the phases in this order:

**Phase 3 first (Accessibility Audit)** — this is the priority phase given the wow factor.
Then continue with Phases 1, 2, 4, 5, 6 to complete the full evolution.

For each phase:
- State what you found
- Propose specific changes
- Implement all changes immediately (do not wait for confirmation — this is an autonomous agent session)
- After each phase: run `npx.cmd eslint projects/ui-lib-custom/src/lib/dynamic-dialog/ --max-warnings 0` then `npx.cmd ng build ui-lib-custom`

**Important — create the a11y spec file if it does not exist:**
- Check whether `projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.a11y.spec.ts` exists
- If it does not exist, create it as part of Phase 3 with axe-core automated checks and manual focus/ARIA tests
- Follow the same pattern as `projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts`

---

## Step 3 — After all 6 phases are complete

1. Score the component using the Scoring Session Template from `docs/COMPONENT_SCORES.md`
2. Update the DynamicDialog row in `docs/COMPONENT_SCORES.md` with the actual scores
3. Update the Queue status for DynamicDialog from ⏳ to ✅ or 🔄 depending on outcome
4. Run the full verification suite:
   - `npx.cmd jest --testPathPatterns=dynamic-dialog --no-coverage`
   - `npx.cmd jest --testPathPatterns=entry-points --no-coverage`
   - `npx.cmd eslint projects/ui-lib-custom/src/lib/dynamic-dialog/ --max-warnings 0`
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
- **Key lesson from Dialog hardening:** `afterNextRender()` called inside an `effect()` body triggers `NG0203` (injection context error) when the effect re-runs outside the constructor. Use `queueMicrotask()` for focus management that must happen after Angular renders, OR inject `Injector` and pass `{ injector: this.injector }` to `afterNextRender()`. Verify which pattern the current code uses and whether it is safe.
- **Key lesson from Dialog hardening:** `triggerEventHandler('click', ...)` is required for OnPush host components in zoneless tests — direct `fixture.componentInstance.property = value` does NOT mark the component dirty.

---

## Success criteria

The session is complete when:
- All 6 phases have been run and improvements applied
- `dynamic-dialog.a11y.spec.ts` exists with axe-core + focus + ARIA + keyboard tests
- All 10 scorecard categories have been evaluated and recorded in `docs/COMPONENT_SCORES.md`
- ESLint, build, and Jest all pass with zero errors
- The DynamicDialog component scores ≥ 8 in every category, OR a clear plan exists for the remaining gaps
- The session handoff is written in `AI_AGENT_CONTEXT.md`

Begin by reading the files listed in Step 1. Report what you find before proposing any changes.
```

---

## Notes for the session

**Key architectural facts about DynamicDialog (read before starting):**

- `DialogService.open(component, config)` creates a `DynamicDialog` container via `createComponent`, appends it to `document.body`, and returns a `DynamicDialogRef`.
- The container (`DynamicDialog`) uses `viewChild.required('dynamicContent', { read: ViewContainerRef })` and `afterNextRender` to mount the guest component and activate the focus trap.
- `DynamicDialogRef` exposes an `onClose` observable (RxJS `Subject`). `close(data?)` emits and completes; `_destroy()` completes only.
- The container listens to `DynamicDialogRef` to know when to remove itself — verify this cleanup does not leave DOM orphans or detached event listeners.

**Focus restoration challenge unique to DynamicDialog:**

Unlike the template-based Dialog (where the trigger element is naturally in the parent template), the trigger for a DynamicDialog is typically a button anywhere in the app. The service must capture `document.activeElement` **at the moment `DialogService.open()` is called** and restore it when the ref is closed. Verify this is implemented correctly.

**If the component scores ≥ 8 on all categories in a single session:**
- Update DynamicDialog queue status to `✅ Done` in `docs/COMPONENT_SCORES.md`
- The next component to harden is **#5 — Drawer** (Tier 1, `role=dialog` side panel, focus management, `aria-modal`)

**If it takes more than one session:**
- Leave DynamicDialog at `🔄 In progress` in the queue
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

**Specific files the agent will need to create or modify:**

| File | Action |
|---|---|
| `dynamic-dialog.ts` | Primary target — architecture, a11y, focus management |
| `dynamic-dialog.html` | ARIA attributes on panel |
| `dynamic-dialog.scss` | Dark mode mixin application, `:focus-visible` on buttons, button transitions |
| `dynamic-dialog.service.ts` | Capture prior focus at `open()` time; pass to container |
| `dynamic-dialog-ref.ts` | May need prior-focus restore hook |
| `dynamic-dialog.a11y.spec.ts` | **Create this file** — axe + focus + ARIA + keyboard |
| `dynamic-dialog.spec.ts` | Add tests for any new inputs/outputs |
| `README.md` | Update with any new inputs |
| `docs/COMPONENT_SCORES.md` | Record final scores |
| `AI_AGENT_CONTEXT.md` | Session handoff |

