# Phase 3 — Finalize (Documentation & Score Update)

> Paste this prompt after Phase 2 fixes are verified and you have completed any
> human-verification items (screen reader, browser visual checks).
> Replace `[COMPONENT]` with the kebab-case component name.
> Replace `[COMPONENT_PASCAL]` with the PascalCase name (e.g. `Button`, `Accordion`).
>
> The Phase 1 gap report and Phase 2 fix report should be in the conversation above.

---

```
You are finalizing the Tier 2 checkpoint audit for [COMPONENT_PASCAL].
The Phase 1 gap report and Phase 2 fix report are in the conversation above.
Your task is to update all documentation to reflect the verified, post-fix scores.

---

## Step 1 — Read Current State of Docs

Read these files before making any changes:
- docs/COMPONENT_SCORES.md
- docs/reference/components/[COMPONENT].md  (if it exists)
- docs/COMPETITIVE_BENCHMARKS.md
- AI_AGENT_CONTEXT.md
- projects/ui-lib-custom/src/lib/[COMPONENT]/README.md  (to verify it matches current source)
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].ts  (to verify README accuracy)

---

## Step 2 — Calculate Final Verified Scores

Using the Phase 2 fix report plus any human-verification results provided by the reviewer:
- Compute the final score per category (PASS / total × 10)
- Note each category's unchecked items explicitly

---

## Step 3 — Update docs/COMPONENT_SCORES.md

Find the [COMPONENT_PASCAL] row in the appropriate table.
Update the 10 score columns with the verified Tier 2 scores.
Update the Avg and Status columns.
Add a note in the Status cell: `(T2 YYYY-MM-DD)` to indicate Tier 2 audit date.

If a "Scoring Session" detail block exists for this component, update it.
If it does not exist, add one using the template from SCORING_CRITERIA.md:

```
### [COMPONENT_PASCAL] — Tier 2 Audit [YYYY-MM-DD]

| Category                             | Score | Notes |
|--------------------------------------|-------|-------|
| API Clarity                          |  /10  |       |
| Accessibility                        |  /10  |       |
| Performance                          |  /10  |       |
| Composability                        |  /10  |       |
| Theming                              |  /10  |       |
| Developer Experience                 |  /10  |       |
| Documentation                        |  /10  |       |
| Visual & Interaction Polish          |  /10  |       |
| Angular Integration                  |  /10  |       |
| Emotional Quality                    |  /10  |       |
| Competitive Parity & Differentiation | PASS/FAIL |   |
| **Production gate**                  | **PASS / FAIL** |  |

Unchecked items (explicit backlog):
[list every ❌ from Phase 1 that was NOT fixed in Phase 2]
```

---

## Step 4 — Update docs/reference/components/[COMPONENT].md

If the file does not exist, create it from this structure:

```markdown
# [COMPONENT_PASCAL]

> Brief one-sentence description.

## Overview

[2–3 sentences on what the component does and when to use it.]

## Import

```typescript
import { [COMPONENT_PASCAL]Component } from 'ui-lib-custom/[COMPONENT]';
```

## Selector

`ui-lib-[COMPONENT]`

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
[one row per input()]

## Outputs

| Name | Payload | When it fires |
|------|---------|---------------|
[one row per output()]

## Content Slots

| Slot | Expected content | Required |
|------|-----------------|----------|
[one row per ng-content select]

## Variants

| Variant | Description |
|---------|-------------|
| `material` | Material Design 3 aesthetic |
| `bootstrap` | Bootstrap 5 aesthetic |
| `minimal` | Clean, neutral, unopinionated |

## Sizes

`sm` · `md` (default) · `lg`

## Usage

### Minimal example

```html
<ui-lib-[COMPONENT] />
```

### [common real-world example]

```html
[example]
```

## Theming

| CSS Variable | Default | Description |
|-------------|---------|-------------|
[one row per --uilib-[COMPONENT]-* variable]

## Accessibility

**APG Pattern:** [name and URL]

### Keyboard interaction

| Key | Action |
|-----|--------|
[one row per key]

### ARIA roles and states

| Role / Attribute | Element | Purpose |
|-----------------|---------|---------|
[one row per role/aria-*]

### Screen reader notes

[what NVDA + VoiceOver announce, any caveats]
```

If the file exists, verify and update:
- Inputs table must match current .ts source exactly (add missing, remove stale)
- Outputs table must match current .ts source exactly
- Theming section must list all CSS variables currently in the .scss file
- Keyboard interaction table must match what is implemented

---

## Step 5 — Update docs/COMPETITIVE_BENCHMARKS.md

If a [COMPONENT_PASCAL] entry does not exist, add one in the correct alphabetical position:

```markdown
## [COMPONENT_PASCAL]

### Angular Material
- Equivalent: [component name or "None"]
- URL: [docs URL]
- Parity gaps: [list any inputs/features Material has that ours does not, or "None"]
- Our advantages: [what we offer that Material does not]

### PrimeNG
- Equivalent: [component name]
- URL: [docs URL]
- Parity gaps: [list or "None"]
- Our advantages: [list]

### Radix UI / Ark UI
- Equivalent: [component name or "None"]
- URL: [docs URL]
- A11y behaviors we match: [list key ARIA/keyboard behaviors we implement from their reference]
- A11y behaviors we exceed: [list anything we do beyond their reference]

### Differentiators (unique to ui-lib-custom)
- [Signal-native API — zero Zone.js triggers]
- [Runtime variant switching (material/bootstrap/minimal) without page reload]
- [SSR-safe with no configuration]
- [add any component-specific differentiators]
```

---

## Step 6 — Update AI_AGENT_CONTEXT.md

Prepend a new handoff block to the ## Recent Handoffs section.
Keep only the 3 most recent handoffs — move older ones to docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md.

```
Date: [YYYY-MM-DD] [[COMPONENT_PASCAL] — Tier 2 checkpoint audit complete]
Changed:
  - projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].ts (if changed)
  - projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].html (if changed)
  - projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].scss (if changed)
  - projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].spec.ts (if changed)
  - projects/ui-lib-custom/src/lib/[COMPONENT]/README.md (if changed)
  - docs/reference/components/[COMPONENT].md (updated/created)
  - docs/COMPONENT_SCORES.md (Tier 2 scores recorded)
  - docs/COMPETITIVE_BENCHMARKS.md (entry updated/created)
State: [COMPONENT_PASCAL] Tier 2 audit complete. Score: [avg]/10. [X] gaps fixed, [Y] deferred to backlog.
  Production gate: PASS / FAIL.
  Unchecked backlog: [list the top 3 most important deferred items, or "None"]
  Human verification pending: [list 🔍 items not yet done, or "None"]
Verification:
  eslint projects/ui-lib-custom/src/lib/[COMPONENT]/ --max-warnings 0 → PASS
  jest --testPathPatterns="src/lib/[COMPONENT]/" → PASS (X/Y)
  ng build ui-lib-custom → PASS
Terminal notes: [any workarounds discovered during the audit session]
Next step: [next component to audit, from the priority list in docs/prompts/audit/README.md]
```

---

## Step 7 — Update Quality Badge Data in the Demo Page

Read `projects/demo/src/app/pages/[COMPONENT]/[COMPONENT]-demo.component.ts`.
Find the `qualityAudit` property (type `ComponentQualityAudit`).

If it does not exist yet, add it to the class using this pattern:

```typescript
import { DocQualityBadgeComponent } from '../../shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '../../shared/doc-page/doc-quality-badge.component';

// Inside the class:
public readonly qualityAudit: ComponentQualityAudit = {
  date: '[YYYY-MM-DD]',
  tier: 2,
  scores: {
    api: [score], a11y: [score], perf: [score], comp: [score],
    theme: [score], dx: [score], docs: [score], polish: [score],
    angular: [score], feel: [score],
  },
  competitiveParity: 'pass',  // or 'fail' or 'pending'
  apgPattern: { name: '[APG pattern name]', url: '[APG pattern URL]' },
  unchecked: [
    // list every ❌ from the Phase 1 report that was NOT fixed
  ],
  humanPending: [
    // list every 🔍 item that the reviewer has not yet manually verified
  ],
};
```

Add `DocQualityBadgeComponent` to the component's `imports` array.

In the template (`[COMPONENT]-demo.component.html`), confirm the badge element is present
just before the TOC rail div. If missing, add it:

```html
<app-doc-quality-badge [audit]="qualityAudit" />
```

If the `qualityAudit` property already exists (added at Tier 1), update:
- `tier` → `2`
- `date` → today's date
- `scores` → the verified Tier 2 scores
- `competitiveParity` → the Category 11 gate result
- `unchecked` → verified list of deferred items (remove anything that was fixed)
- `humanPending` → verified list of items still needing human verification

---

## Step 8 — Run Final Verification

Run these commands to confirm the documentation updates did not break anything:

1. npx jest --testPathPatterns="entry-points" --no-coverage  (verifies entry point spec still passes)
2. ng build ui-lib-custom  (clean build)

Report PASS or FAIL.

---

## Output

Confirm:
- [ ] docs/COMPONENT_SCORES.md updated with verified Tier 2 scores and unchecked backlog
- [ ] docs/reference/components/[COMPONENT].md exists and is current
- [ ] docs/COMPETITIVE_BENCHMARKS.md has an entry for [COMPONENT_PASCAL]
- [ ] AI_AGENT_CONTEXT.md handoff block added
- [ ] Demo page `qualityAudit` data updated to tier 2 with verified scores
- [ ] `<app-doc-quality-badge>` present in demo template
- [ ] ng build ui-lib-custom → PASS
- [ ] jest entry-points → PASS

**[COMPONENT_PASCAL] Tier 2 audit is now complete.**
```
