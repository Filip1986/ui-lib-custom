# Audit Quickstart — How to Audit One Component End-to-End

Replace `button` / `Button` with your component name throughout.

---

## Session 1 — Audit (30–60 min)

Open Claude Code in the project root. Start a new session.

**Your message to Claude:**

> Read `docs/prompts/audit/PHASE1_AUDIT.md`, replace every `[COMPONENT]` with `button`,
> and execute the full audit. Do not make any code changes.

Claude will read all source files, run lint/jest/build, and produce a gap report.

**After Claude finishes:**

Review the gap report. For each ❌:

- Add `[SKIP]` if you intentionally defer it (and why)
- Leave it as ❌ if you want it fixed in Phase 2

For each 🔍 (human verification):

- Do these yourself: open the browser, run the keyboard walkthrough, check screen readers
- Note your results before starting Phase 2

---

## Session 2 — Fix Pass (varies by gap count)

Start a **new Claude Code session** in the same project.

**Your message to Claude:**

> Here is the Phase 1 gap report for Button:
> [paste the gap report from Session 1]
>
> Now read `docs/prompts/audit/PHASE2_FIX.md`, replace `[COMPONENT]` with `button`,
> and execute the fix pass.

Claude will implement every fixable gap and report what it changed.

Review the fix report. Test the component manually if any behaviour changed.

---

## Session 3 — Finalize (15 min)

Start a **new Claude Code session**.

**Your message to Claude:**

> Phase 1 gap report: [paste]
> Phase 2 fix report: [paste]
> Human verification results: [add your notes from the 🔍 items]
>
> Now read `docs/prompts/audit/PHASE3_FINALIZE.md`, replace `[COMPONENT]` with `button`
> and `[COMPONENT_PASCAL]` with `Button`, and execute the finalize pass.

Claude will update COMPONENT_SCORES.md, the reference doc, COMPETITIVE_BENCHMARKS.md,
and AI_AGENT_CONTEXT.md.

---

## When a Component is Done

A component passes Tier 2 when:

| Gate                                             | Verified by                       |
| ------------------------------------------------ | --------------------------------- |
| All 10 averaged categories ≥ 8.0                 | Phase 1 score table               |
| Category 11 (Competitive Parity) = PASS          | Phase 1 Category 11 result        |
| eslint --max-warnings 0                          | Phase 2 verification commands     |
| jest passes                                      | Phase 2 verification commands     |
| ng build ui-lib-custom clean                     | Phase 2 verification commands     |
| Manual keyboard walkthrough done                 | You, during 🔍 human verification |
| Explicit backlog recorded in COMPONENT_SCORES.md | Phase 3                           |

**Then and only then is the component DONE.**

---

## Shortcuts

**Quick audit only (no fixes, just scoring):** Run Phase 1 only.
**Re-audit a single category:** Paste just that category's section from PHASE1_AUDIT.md.
**Fix a specific gap:** Describe the specific ❌ item and ask Claude to fix just that one.
**Update docs after a manual fix:** Run Phase 3 with a note that you did Phase 2 manually.
