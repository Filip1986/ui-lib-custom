# Session Prompt — Dialog Component Hardening

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
4. `docs/COMPONENT_SCORES.md` — the hardening backlog; Dialog is #1 in Tier 1
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow you will follow
6. `projects/ui-lib-custom/src/lib/dialog/README.md` — the component API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts`
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.html`
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.scss`
- `projects/ui-lib-custom/src/lib/dialog/dialog.types.ts`
- `projects/ui-lib-custom/src/lib/dialog/dialog.constants.ts`
- `projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts`

Do not write any code until you have read all of the above.

---

## Step 2 — Your task

Evolve the Dialog component through the 6-phase workflow defined in
`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The current committed wow factor for this library is **Elite Accessibility**.
The key a11y concern for Dialog (from the hardening backlog) is:
> Focus trap correctness, `aria-modal`, `role=dialog`, restores focus on close.

Run the phases in this order:

**Phase 3 first (Accessibility Audit)** — this is the priority phase given the wow factor.
Then continue with Phases 1, 2, 4, 5, 6 to complete the full evolution.

For each phase:
- State what you found
- Propose specific changes
- Wait for confirmation before implementing
- After implementation: run `npx.cmd eslint projects/ui-lib-custom/src/lib/dialog/ --max-warnings 0` then `npx.cmd ng build ui-lib-custom`

---

## Step 3 — After all 6 phases are complete

1. Score the component using the Scoring Session Template from `docs/COMPONENT_SCORES.md`
2. Update the Dialog row in `docs/COMPONENT_SCORES.md` with the actual scores
3. Update the Queue status for Dialog from ⏳ to ✅ or 🔄 depending on outcome
4. Run the full verification suite:
   - `npx.cmd jest --testPathPatterns=dialog --no-coverage`
   - `npx.cmd jest --testPathPatterns=entry-points --no-coverage`
   - `npx.cmd eslint projects/ui-lib-custom/src/lib/dialog/ --max-warnings 0`
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

---

## Success criteria

The session is complete when:
- All 6 phases have been run and improvements applied
- All 10 scorecard categories have been evaluated and recorded in `docs/COMPONENT_SCORES.md`
- ESLint, build, and Jest all pass with zero errors
- The Dialog component scores ≥ 8 in every category, OR a clear plan exists for the remaining gaps
- The session handoff is written in `AI_AGENT_CONTEXT.md`

Begin by reading the files listed in Step 1. Report what you find before proposing any changes.
```

---

## Notes for the session

**If the component scores ≥ 8 on all categories in a single session:**
- Update Dialog queue status to `✅ Done` in `docs/COMPONENT_SCORES.md`
- Start the next component: **#2 — Select** (Tier 1, same tier, next highest priority)
- The key a11y concern for Select: *Combobox/listbox ARIA pattern — the hardest form control to get right*

**If it takes more than one session:**
- Leave Dialog at `🔄 In progress` in the queue
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

