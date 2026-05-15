# Tier 2 — SCORING_CRITERIA.md Checkpoint Audit Prompt

> **Purpose:** This prompt guides an AI through the rigorous, checkpoint-counted quality audit
> defined in `docs/SCORING_CRITERIA.md`. Use it after Tier 1 hardening is complete.
>
> **Distinction from Tier 1 (6-phase hardening):**
> - Tier 1 = holistic, qualitative evolution. Score assigned by feel after improvement work.
> - Tier 2 = systematic, checkbox-counted verification. Score = verified checkboxes / total × 10.
>   An unchecked item is an explicit, visible backlog entry — not an unknown gap.
>
> **When to run:** Before claiming any score is externally credible. Required before the
> benchmark article. Required before v1.0. Run on the highest-priority components first
> (prioritise any component score that will be cited publicly).
>
> **Output:** A verified score per category + an explicit list of every failed checkbox.
> Update `docs/COMPONENT_SCORES.md` with the corrected scores after each audit.

---

## Before You Start This Audit

Provide the AI with the following files in context. Do not skip any.

1. `projects/ui-lib-custom/src/lib/<component>/<component>.ts`
2. `projects/ui-lib-custom/src/lib/<component>/<component>.html`
3. `projects/ui-lib-custom/src/lib/<component>/<component>.scss`
4. `projects/ui-lib-custom/src/lib/<component>/<component>.spec.ts`
5. `projects/ui-lib-custom/src/lib/<component>/<component>.a11y.spec.ts` (if exists)
6. `projects/ui-lib-custom/src/lib/<component>/README.md`
7. `docs/SCORING_CRITERIA.md` — the full criteria file
8. `docs/COMPETITIVE_BENCHMARKS.md` — for Category 11 evidence
9. `LIBRARY_CONVENTIONS.md`

---

## The Audit Prompt

Copy this prompt and replace `<ComponentName>` with the actual component name.

```
You are conducting a Tier 2 quality audit on the <ComponentName> component from ui-lib-custom.

This is NOT a hardening session. You are NOT rewriting code.
Your job is to go through every checkbox in docs/SCORING_CRITERIA.md, verify each one
against the actual component source, and produce a scored result.

Score formula: verified checkboxes / total checkboxes in the category × 10.
Round to one decimal place.
A ✅ means you confirmed the criterion is satisfied by reading the source.
A ❌ means it is not satisfied — record it as an explicit backlog item.
A ⚠️ means it is partially satisfied or you cannot confirm without running the code.

Do NOT give the benefit of the doubt. If you cannot verify a checkbox from the source
provided, mark it ❌ or ⚠️.

---

## CATEGORY 1 — API Clarity (16 checkpoints · Score = checked / 16 × 10)

Go through each of the 16 checkboxes in the SCORING_CRITERIA.md Category 1 list.
For each checkbox: state ✅ / ❌ / ⚠️ and a one-line justification referencing the source.
Then compute: Category 1 score = X / 16 × 10.
List every ❌ as a backlog item.

---

## CATEGORY 2 — Accessibility (28 checkpoints · Score = checked / 28 × 10)

Go through each of the 28 checkboxes in the SCORING_CRITERIA.md Category 2 list.
For ARIA Semantics: inspect the template for role, aria-* attributes.
For Keyboard Interaction: check if keyboard handlers exist and match the APG pattern listed.
For Focus Management: verify CDK FocusTrap or equivalent focus trap.
For Screen Reader: note if NVDA/VoiceOver verified — mark ⚠️ if unverified (cannot be confirmed from source alone).
For Visual Accessibility: contrast can only be ⚠️ unless you have measured values.
For Testing: check if axe-core spec exists and passes.
Compute score. List every ❌/⚠️.

---

## CATEGORY 3 — Performance (20 checkpoints · Score = checked / 20 × 10)

Go through each of the 20 checkboxes in SCORING_CRITERIA.md Category 3.
Check for ChangeDetectionStrategy.OnPush, signal-only reactivity, no Subscription leaks,
tree-shaking entry point, SSR guards.
Compute score. List every ❌/⚠️.

---

## CATEGORY 4 — Composability (14 checkpoints · Score = checked / 14 × 10)

Go through each of the 14 checkboxes in SCORING_CRITERIA.md Category 4.
Look for ng-content slots, named content projection, template customization via ng-template,
ControlValueAccessor implementation (if a form control).
Compute score. List every ❌/⚠️.

---

## CATEGORY 5 — Theming (15 checkpoints · Score = checked / 15 × 10)

Go through each of the 15 checkboxes in SCORING_CRITERIA.md Category 5.
Check SCSS for raw hex / raw px values.
Check that all three variants (material, bootstrap, minimal) are mentioned in the styles.
Check the README for a Theming section listing CSS variables.
Compute score. List every ❌/⚠️.

---

## CATEGORY 6 — Developer Experience (17 checkpoints · Score = checked / 17 × 10)

Go through each of the 17 checkboxes in SCORING_CRITERIA.md Category 6.
Check for any, imports, JSDoc, README minimal example quality.
Compute score. List every ❌/⚠️.

---

## CATEGORY 7 — Documentation (18 checkpoints · Score = checked / 18 × 10)

Go through each of the 18 checkboxes in SCORING_CRITERIA.md Category 7.
Check the co-located README.md for all required sections.
Check if a reference doc exists at docs/reference/components/<name>.md.
Check if the demo page exists and covers all three variants.
Compute score. List every ❌/⚠️.

---

## CATEGORY 8 — Visual & Interaction Polish (15 checkpoints · Score = checked / 15 × 10)

Go through each of the 15 checkboxes in SCORING_CRITERIA.md Category 8.
Check SCSS for :hover, :focus-visible, :active, :disabled, loading/error/empty states.
Check for animation definitions and whether they use only transform/opacity.
Compute score. List every ❌/⚠️.

---

## CATEGORY 9 — Angular Integration (16 checkpoints · Score = checked / 16 × 10)

Go through each of the 16 checkboxes in SCORING_CRITERIA.md Category 9.
Check for standalone, ViewEncapsulation.None, OnPush, signal inputs/outputs,
@if/@for/@switch usage, inject() pattern, SSR safety, zoneless test setup,
secondary entry point registration.
Compute score. List every ❌/⚠️.

---

## CATEGORY 10 — Emotional Quality (10 checkpoints · Score = checked / 10 × 10)

Go through each of the 10 questions in SCORING_CRITERIA.md Category 10.
Answer each honestly. A borderline "yes" is a "no."
Compute score. List every ❌/⚠️.

---

## CATEGORY 11 — Competitive Parity & Differentiation (13 checkpoints — gate only, not averaged)

Go through each of the 13 checkboxes in SCORING_CRITERIA.md Category 11.
Check docs/COMPETITIVE_BENCHMARKS.md for an entry for this component.
If no entry exists, that is immediately ❌ for the research checkboxes.
Document: Angular Material parity ✅/❌, PrimeNG parity ✅/❌, at least one differentiator.
State: PASS (≥ 10/13 with no unresolved parity gaps) or FAIL with reasons.

---

## Summary

After completing all categories, produce:

| Category                             | Tier 1 Score | Tier 2 Score | Delta | Unchecked count |
|--------------------------------------|--------------|--------------|-------|-----------------|
| API Clarity                          |              |              |       |                 |
| Accessibility                        |              |              |       |                 |
| Performance                          |              |              |       |                 |
| Composability                        |              |              |       |                 |
| Theming                              |              |              |       |                 |
| Developer Experience                 |              |              |       |                 |
| Documentation                        |              |              |       |                 |
| Visual & Interaction Polish          |              |              |       |                 |
| Angular Integration                  |              |              |       |                 |
| Emotional Quality                    |              |              |       |                 |
| Competitive Parity (gate — not avg) |              |              |       |                 |
| **Avg (10 categories)**              |              |              |       |                 |

Then produce a **Backlog** section:
- List every ❌ item grouped by category
- Order by impact (Accessibility and API items first)
- Each item is a specific, actionable fix — not a vague suggestion

Then produce a **Verdict**:
- Does the component still pass the ≥ 8 gate in every category after Tier 2 scoring?
- If any category drops below 8: state which category, by how much, and what the minimum fix is
- If all categories pass: confirm "Tier 2 gate: PASS"
```

---

## After the Audit

1. Update `docs/COMPONENT_SCORES.md` — replace the Tier 1 score with the Tier 2 verified score. Add a note: `(Tier 2 audited: YYYY-MM-DD)`.
2. If any score dropped below 8: add the component back to a "Needs Tier 2 Fix" section and address the backlog items before marking it Tier 2 complete.
3. Update `AI_AGENT_CONTEXT.md` with the handoff block.
4. If the audit produced a ❌ on the Competitive Parity category: update `docs/COMPETITIVE_BENCHMARKS.md` with the missing entry.

---

## Priority Order for Tier 2 Audits

Run audits in this order — highest public scrutiny first:

### Priority 1 — Cited in the benchmark article (must be clean before article is written)

| Component    | Reason                                                              |
|--------------|---------------------------------------------------------------------|
| Dialog       | The "Dialog focus trap that actually works" killer demo moment      |
| Select       | Combobox — the hardest ARIA pattern — highest scrutiny              |
| AutoComplete | Same reason as Select                                               |
| Toast        | Live region — a11y engineers check this first                       |
| Menubar      | `role=menubar` — the WAI-ARIA APG pattern most developers get wrong |
| Table        | `role=grid` + sort + selection — enterprise scrutiny                |
| Button       | The foundational component — must be above reproach                 |

### Priority 2 — Currently scoring 8.2–8.3 (most at risk of dropping below 8 on Tier 2)

Select · AutoComplete · CascadeSelect · Knob · ColorPicker · Avatar ·
DynamicDialog · ConfirmDialog · DataView · Timeline · OrganizationChart ·
Carousel · Galleria · MeterGroup · Badge · ScrollTop · FocusTrap

### Priority 3 — Remaining 80+ components

Work through remaining components alphabetically within their tier groupings.
The 9.0-scoring components are least likely to drop but still need formal verification.

---

## How This Relates to the 6-Phase Hardening Prompts

| Dimension        | 6-Phase Hardening (Tier 1)                  | Checkpoint Audit (Tier 2)                  |
|------------------|---------------------------------------------|--------------------------------------------|
| **Goal**         | Improve the component                       | Verify the component                       |
| **Output**       | Better code + holistic score                | Verified score + explicit backlog          |
| **Score basis**  | Expert judgment after improvement           | Counted checkboxes against fixed criteria  |
| **When to use**  | New components, targeted polish             | Before any external credibility claim      |
| **Can replace?** | No — audit finds gaps, hardening fixes them | No — fixing requires the hardening prompts |

**They are complementary, not alternatives.**
Run Tier 1 to improve. Run Tier 2 to verify. Fix Tier 2 failures with Tier 1 prompts.
The loop is: Tier 1 → Tier 2 audit → fix failures with Tier 1 → re-audit Tier 2.

---

## Related Documents

| Document                                      | Role                                                             |
|-----------------------------------------------|------------------------------------------------------------------|
| `docs/SCORING_CRITERIA.md`                    | The authoritative checkpoint list — read in full before auditing |
| `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` | The Tier 1 execution engine — use to fix Tier 2 failures         |
| `docs/COMPETITIVE_BENCHMARKS.md`              | Evidence file for Category 11                                    |
| `docs/COMPONENT_SCORES.md`                    | The scoreboard — update after every Tier 2 audit                 |
| `docs/ROADMAP.md`                             | Phase 4 gate requires Tier 2 audit before benchmark article      |

