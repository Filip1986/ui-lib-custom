# Agentic Audit Prompts

> **Purpose:** A 3-phase prompt system designed for Claude Code's agentic capabilities —
> it reads files, runs commands, and makes changes autonomously. Not for chat interfaces.
>
> The existing `docs/prompts/SCORING_CRITERIA_AUDIT_PROMPT.md` requires manual file attachment.
> These prompts replace that workflow when using Claude Code CLI/desktop.

---

## The Three Phases

| Phase | File | What the agent does | Changes code? |
|-------|------|---------------------|---------------|
| 1 — Audit | `PHASE1_AUDIT.md` | Reads all source files, runs lint/tests/build, produces a gap report | ❌ No |
| 2 — Fix | `PHASE2_FIX.md` | Takes the gap report and implements every fixable gap | ✅ Yes |
| 3 — Finalize | `PHASE3_FINALIZE.md` | Updates COMPONENT_SCORES.md, reference docs, AI_AGENT_CONTEXT.md | ✅ Yes |

---

## How to Use

### Step 1 — Start the audit

Open Claude Code in the project root. Paste the contents of `PHASE1_AUDIT.md` and replace
`[COMPONENT]` with the kebab-case component name (e.g. `button`, `accordion`, `select`).

The agent will read all files and report back. **Do not interrupt it.**

### Step 2 — Review the gap report

Before running Phase 2, read the gap report. You may:
- Add notes to any ⚠️ items where you have context the agent cannot see (e.g. "we intentionally excluded X")
- Mark any ❌ as `[SKIP]` if you consciously defer it
- Confirm human-verification items (screen reader, visual) yourself

### Step 3 — Run the fix pass

Paste `PHASE2_FIX.md` with the same `[COMPONENT]` replacement. The agent will implement every
fixable gap from Phase 1 and report what it changed.

### Step 4 — Finalize

Paste `PHASE3_FINALIZE.md`. The agent updates all documentation.

---

## Tips

- Run phases in **separate Claude Code sessions** — each session starts fresh and reads
  files from disk, so Phase 2 picks up changes Phase 1 identified.
- For a quick single-session audit (no fixes, just scoring), use Phase 1 only.
- If Phase 2 fixes break tests, re-run Phase 1 on just the failing categories.
- The existing `SCORING_CRITERIA_AUDIT_PROMPT.md` is still valid for manual chat sessions.

---

## Component Priority

Audit in this order for maximum impact:

### Tier 2 Priority 1 — Highest scrutiny (public-facing, benchmark-cited)
Button · Dialog · Select · Toast · Menubar · Table · AutoComplete

### Tier 2 Priority 2 — Scoring 8.2–8.4 (most at risk below gate on real audit)
Badge · ScrollTop · FocusTrap · Avatar · DynamicDialog · ConfirmDialog ·
DataView · Timeline · OrganizationChart · Carousel · Galleria · MeterGroup ·
Select · AutoComplete · CascadeSelect · Knob · ColorPicker

### Tier 2 Priority 3 — Remaining components
Work alphabetically within tier groupings.
