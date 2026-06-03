---
name: retro
description: End-of-task retrospective. Reflects on the session just completed, extracts only genuinely valuable learnings against a high bar, and routes them into the project's existing knowledge files (DISCOVERIES, LIBRARY_CONVENTIONS, handoff, memory) as PROPOSALS the user accepts or dismisses. Use when a task is finished and you want to capture what was learned without bloating the repo. Invoke with `/retro`.
---

# Retrospective (`/retro`)

A post-task reflection layer. The goal is **continuous improvement without slop**: capture
the few things genuinely worth remembering, propose them, and let the user decide. This skill
**proposes — it never auto-applies changes to code or convention files without confirmation.**

## The prime directive: a high bar, with permission to find nothing

The default failure mode of any "can we improve anything?" pass is manufactured value — invented
refactors, doc churn, non-problems flagged as problems. **Resist this.** You are explicitly
allowed — and expected — to conclude "nothing notable this session" and stop. A clean retro is a
success, not a failure. Only surface a finding if it clears the bar below.

**A finding qualifies ONLY if at least one is true:**

- It **contradicted an assumption** you held at the start of the task.
- It **cost more than ~10 minutes** (or several failed attempts) to figure out.
- It **risks being repeated** next session by you or another agent if not written down.
- It is a **recurring friction** in the workflow that wasted time and will again.

If a candidate doesn't clear that bar, drop it silently. Do not pad the list. Do not report
things that "could" be improved in the abstract — only things this session actually surfaced.

## Procedure

### 1. Establish what actually happened

Look at the real evidence of the session, not your memory of it:

- `git status` and `git diff` (and `git diff --staged`) — what files actually changed.
- Recall the failed commands, dead ends, and surprises from this session.
- Note anything that took multiple attempts.

If nothing meaningful changed and nothing was learned, say so and stop. Don't run a retro on a
trivial session.

### 2. Reflect through three lenses

Run each candidate through the high bar in the prime directive before keeping it.

**Lens A — Learnings (knowledge):** Did anything surprise you, contradict an assumption, or take
real effort to figure out?

**Lens B — Code quality (the diff):** Is there a real correctness, reuse, or simplification issue
in what was written? **Do not re-derive this by hand.** Code-quality review of the diff belongs to
the dedicated, fresh-context reviewers — recommend `/code-review` (bugs) or `/simplify` (cleanup)
rather than inventing findings here. Only mention a code issue if you are highly confident and it
is concrete.

**Lens C — Workflow / process:** Did anything about the _process_ waste time and will again? (A
missing script, a slow loop, an unclear convention, a repeated manual step.)

### 3. Route each surviving finding to the right destination

This project already has a home for every kind of learning. Match it:

| Finding type                                                                      | Destination                                                                                                                    | Notes                                        |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| A **durable rule / anti-pattern** that should be checked on every future task     | `LIBRARY_CONVENTIONS.md` (+ the anti-pattern table in `CLAUDE.md` if it's a hard rule)                                         | Stable rules ONLY — not one-off findings     |
| A **non-obvious discovery / workaround** (surprised us, took effort)              | `docs/DISCOVERIES.md` — under the right numbered category, using its **Context / Finding / Solution / Reference** entry format | The default home for most retro findings     |
| **Session state** for the next agent (what's done, what's next, terminal gotchas) | `AI_AGENT_CONTEXT.md → ## Recent Handoffs`, using the handoff block format in `CLAUDE.md`                                      | Keep newest 3; archive older                 |
| A **cross-session fact** about the user, project, or a preference                 | The memory system (`memory/` + `MEMORY.md` index)                                                                              | Per the memory rules in the system prompt    |
| A **code change worth making** (refactor, bug fix, cleanup)                       | Recommend `/code-review`, `/simplify`, or a `spawn_task` chip                                                                  | Do NOT make the change inside the retro      |
| A **process / tooling improvement**                                               | `spawn_task` chip, or note it for the user to decide                                                                           | Out-of-scope work belongs in its own session |

Crucial separation: **capturing a learning** (a doc line) is cheap and safe. **Acting on it**
(changing code, editing conventions) needs the user's explicit go-ahead. Never blur the two.

### 4. Present as proposals — then wait

Output a short, honest summary. For each surviving finding give:

1. **What** — one line.
2. **Why it cleared the bar** — which of the four criteria it meets.
3. **Proposed destination** — the file/mechanism from the routing table, and the exact text you'd add.

Then ask which to apply. Apply only the ones the user approves. If the user approves a
DISCOVERIES/CONVENTIONS/handoff edit, make it precisely; for code or process changes, hand off to
the dedicated tool rather than editing inline.

If nothing cleared the bar: say **"Nothing notable to capture this session"** in one line and stop.
That is the correct, common outcome for small tasks.

## Anti-patterns for this skill itself

- ❌ Listing improvements that this session didn't actually surface ("we could add more tests…").
- ❌ Re-reviewing the diff for bugs by hand instead of pointing at `/code-review`.
- ❌ Editing `LIBRARY_CONVENTIONS.md`, `DISCOVERIES.md`, or code without explicit approval.
- ❌ Padding the output to look productive. One real finding beats five filler ones; zero is fine.
- ❌ Writing a one-off discovery into `LIBRARY_CONVENTIONS.md` (that's for durable rules) or a
  stable rule into `AI_AGENT_CONTEXT.md` (that's for transient state).
