# Execution Prompts — Next-Level Roadmap

> **Companion to:** [`OPUS_NEXT_LEVEL_RESPONSE.md`](./OPUS_NEXT_LEVEL_RESPONSE.md)
> **How to use:** Each section below is a self-contained prompt. Paste one into a fresh AI
> agent session, fill the `<placeholders>`, and execute. Prompts are ordered to match the
> recommended weekly rhythm in §3.4 of the response document.
>
> **Conventions every prompt assumes the agent already knows:**
> - Read `CLAUDE.md`, `AGENTS.md`, `LIBRARY_CONVENTIONS.md`, and the target component's
>   co-located `README.md` before writing code.
> - Library rules: `ViewEncapsulation.None`, `OnPush`, standalone, signal IO, block syntax,
>   `--uilib-*` tokens, `@layer uilib.components { }`, `ui-lib-{name}` selectors,
>   no `on*` prefix, no native-DOM-event output names.
> - After every edit: run ESLint on the touched folder, then `ng build ui-lib-custom`,
>   then update `AI_AGENT_CONTEXT.md` handoff.

---

## Table of Prompts

| # | Prompt                                                              | Track                  | Section in response |
|---|---------------------------------------------------------------------|------------------------|---------------------|
| 1 | Sprint A — Competitive benchmark backfill (per component)            | Cross-cutting research  | §1.3 Sprint A · §2.5 |
| 2 | Sprint B — Reference doc generator (one-off build)                  | Cross-cutting tooling   | §1.3 Sprint B        |
| 3 | Sprint B — Reference doc finish (per component)                     | Cross-cutting + per-component | §1.3 Sprint B  |
| 4 | Sprint C — NVDA + VoiceOver session recording (per component)        | Cross-cutting a11y      | §1.3 Sprint C        |
| 5 | Sprint D — Reduced-motion completeness audit (library-wide)         | Cross-cutting lint      | §1.3 Sprint D        |
| 6 | Sprint E — Per-entry-point gzip budget (one-off build)              | Cross-cutting tooling   | §1.3 Sprint E        |
| 7 | Per-component 8.x → 9.5+ upgrade (12-step template)                  | Per-component           | §2.3 · §3.1          |
| 8 | 8.2-cluster batch upgrade (15 components, one PR each)               | Per-component batch     | §3.2                 |
| 9 | Category 10 — Emotional Quality verification                         | Per-component validation | §2.4                |
| 10| Category 12 — Add "Internationalisation" to the scoring system       | Scoring system change   | §1.5                 |
| 11| Premium build — Signals-first Data Grid (greenfield 10/10)           | Greenfield premium      | §1.4 · §3.5          |
| 12| Premium build — Query Builder scaffolding                            | Greenfield premium      | §3.5                 |
| 13| Weekly cadence — Monday planning prompt                              | Process                 | §3.4                 |
| 14| Weekly cadence — Friday wrap prompt                                  | Process                 | §3.4                 |

---

## Prompt 1 — Sprint A: Competitive Benchmark Backfill (per component)

> **Goal:** Take one component from `—` to a complete Category 11 entry in 45 minutes.
> **Output:** A new section in `docs/COMPETITIVE_BENCHMARKS.md` + updated `Comp11` column
> in `docs/COMPONENT_SCORES.md`.
> **Run when:** Any component shows `—` in `Comp11`. Batch in groups of 4–8 per session.

```text
You are running the Category 11 (Competitive Parity & Differentiation) research protocol
for ui-lib-custom. Reference: docs/prompts/OPUS_NEXT_LEVEL_RESPONSE.md §2.5.

Component(s) to research this session: <Component1>, <Component2>, <Component3>, <Component4>

For EACH component:

1. Locate the WAI-ARIA APG pattern URL that governs it (e.g.
   https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ for Select). If no APG pattern
   applies (decorative components), record "No APG pattern — decorative".

2. Locate the equivalent component in each reference library and capture the docs URL:
   - Angular Material: https://material.angular.io/components/
   - PrimeNG:          https://primeng.org/
   - Radix UI:         https://www.radix-ui.com/primitives
   - Ark UI:           https://ark-ui.com/

3. For each reference library, identify ONE capability ours matches, ONE we beat them on,
   and ONE they beat us on (or "no gap").

4. Append a section to docs/COMPETITIVE_BENCHMARKS.md using EXACTLY this template from
   §2.5 of OPUS_NEXT_LEVEL_RESPONSE.md (do not invent extra columns):

   ## <Component>
   **APG pattern:** <URL or "decorative">
   **ui-lib-custom score:** <pull from COMPONENT_SCORES.md>
   ### Reference implementations
   | Library | Component | Last reviewed | URL |
   ### Parity matrix (ours vs. best)
   | Capability | ui-lib-custom | Material | PrimeNG | Radix | Notes |
   ### Three explicit differentiators
   1. … 2. … 3. …
   ### Documented gaps
   - <gap>: <reason / when we'd close it>

5. Update docs/COMPONENT_SCORES.md: replace the `—` in the Comp11 column for this
   component with an integer score (default 9 if the matrix shows no significant gap,
   8 if there's one documented gap, 7 if two or more).

6. Do NOT modify component source code in this session. Research only.

7. Commit: `docs(comp11): benchmark backfill for <list>`

Time-box: 45 minutes per component. Stop and ask if you cannot find the equivalent in
one of the four reference libraries — document it as "No equivalent" rather than guess.
```

---

## Prompt 2 — Sprint B: Reference Doc Generator (one-off tooling)

> **Goal:** Build a script that emits `docs/reference/components/<name>.md` from source.
> **Run once.** Output reused by Prompt 3.

```text
Build a Node.js script at scripts/generate-reference-doc.mjs that, given a component
name (e.g. `select`), produces docs/reference/components/<name>.md by consuming:

INPUTS to parse:
1. projects/ui-lib-custom/src/lib/<name>/README.md         (existing co-located README)
2. projects/ui-lib-custom/src/lib/<name>/<name>.ts          (TypeScript AST — use
   `@typescript-eslint/typescript-estree` or `ts-morph`)
3. projects/ui-lib-custom/src/lib/<name>/<name>.scss        (extract --uilib-* declarations)
4. projects/ui-lib-custom/src/lib/<name>/<name>.spec.ts     (extract `it(...)` titles
   matching /keyboard|aria|axe|focus/i)

OUTPUT sections in this order:
- Title `# <Name>` + selector + entry point import line
- "Overview" paragraph (first paragraph of README)
- "API" table: every `input()`, `model()`, `output()` with name, type, default, JSDoc
- "Content projection" table: every `ng-content` selector found in <name>.html
- "Theming" table: every `--uilib-<name>-*` CSS var from .scss with default value
- "Accessibility" section: APG pattern URL (read from README front-matter
  `apg-pattern:` field if present, else leave a `<!-- TODO -->` marker)
- "Keyboard interactions" table: extracted from spec `it()` titles
- "Usage examples" section: copy from README (link, do not duplicate)
- "Related" links: COMPETITIVE_BENCHMARKS.md anchor, design tokens file

CONSTRAINTS:
- Pure ESM; no transpile step.
- Idempotent: re-running produces identical output (sort tables alphabetically).
- Add a CLI: `node scripts/generate-reference-doc.mjs <name> [--all]`.
- `--all` iterates every folder under projects/ui-lib-custom/src/lib/ that has an index.ts.
- Output must be Markdown that lints clean with project's markdownlint config.
- Add an entry to package.json scripts: `"docs:reference": "node scripts/generate-reference-doc.mjs --all"`.

VERIFICATION:
1. Run on three sample components: `button`, `select`, `tree`.
2. Diff against any existing docs/reference/components/<name>.md and confirm the new
   output is a superset (no information loss).
3. Commit: `feat(docs): reference doc generator for component archetypes`

Do NOT modify any component source code in this session.
```

---

## Prompt 3 — Sprint B: Reference Doc Finish (per component)

> **Goal:** Take the generator output and hand-finish it for one component.
> **Run when:** Generator has produced a stub for the target component.

```text
Take the generator-produced docs/reference/components/<component>.md and finish it.

For component: <Component>

DO:
1. Resolve every `<!-- TODO -->` marker:
   - APG pattern URL: look up at https://www.w3.org/WAI/ARIA/apg/patterns/
   - Missing JSDoc on any input: open the source, add JSDoc, regenerate doc
2. Add a "Real-world usage" section with TWO non-trivial examples beyond the README
   minimal case (e.g. inside a reactive form, with custom item template, integrated
   with another ui-lib component).
3. Add an "Edge cases" section: empty state, loading state, error state, disabled
   state, very long content / very many items. Each with a 5–15 line code block.
4. Cross-link to:
   - `docs/COMPETITIVE_BENCHMARKS.md#<component>`
   - The component's Storybook page (path: `?path=/docs/<archetype>-<component>`)
   - The demo route (path: `/components/<component>`)
5. If the component is in the §3.1 Top 15, add a "Migration from Material/PrimeNG"
   subsection (at minimum: equivalent component name + 5-line before/after).

VERIFICATION:
1. `npx markdownlint docs/reference/components/<component>.md`
2. Every code block compiles when copy-pasted into the demo app (manually verify
   the first example).
3. Update docs/COMPONENT_SCORES.md `Docs` column from 8 → 9 (or 9 → 10 if all 18
   Category 7 checkboxes are now true).
4. Commit: `docs(<component>): complete reference documentation`

Time-box: 1 hour per component.
```

---

## Prompt 4 — Sprint C: NVDA + VoiceOver Session Recording (per component)

> **Goal:** Record one structured screen-reader walkthrough; produce bugs if found.
> **Run when:** Component is at A11y=9; aiming for the "SR session recorded" checkbox
> that moves it toward 10.

```text
Conduct a manual screen reader session for: <Component>

ENVIRONMENT:
- NVDA 2024.x + Chrome (latest) — primary
- VoiceOver + Safari (latest) — secondary
- Demo page: http://localhost:4200/components/<component>
- Pre-flight: `npm run serve:demo`

PROTOCOL (run twice — once per SR):
1. Tab to the component from the page top.
2. Record what the SR announces on focus (verbatim).
3. Activate every keyboard interaction listed in
   docs/reference/components/<component>.md "Keyboard interactions" table.
4. Record what the SR announces for each interaction.
5. Confirm:
   - Role is announced
   - Accessible name is announced (not "blank" or "button")
   - State changes are announced (expanded/collapsed, selected, etc.)
   - Required (`aria-required`) and invalid (`aria-invalid`) states announce
   - No "phantom" announcements (duplicate label, stale live region)

OUTPUT to docs/reference/a11y-sessions/<component>.md using this template:

```
# <Component> — Screen Reader Session

Date: YYYY-MM-DD
NVDA version: …  · Chrome version: …
VoiceOver: macOS … · Safari: …

## NVDA + Chrome
| Step | Action | Announced | Pass? |
|------|--------|-----------|-------|
| 1    | Tab to component | "<verbatim>" | ✅/❌ |
| 2    | Press Down arrow | "<verbatim>" | ✅/❌ |
…

## VoiceOver + Safari
(same table)

## Issues found
- [ ] <Issue 1 — file a bug as fix(a11y): <component> <one-line>>
- [ ] <Issue 2>

## Verdict
A11y score: <integer> → <new integer>
```

IF issues found:
1. File a fix in the component source immediately.
2. Re-run the failing step after the fix.
3. Update the table.

VERIFICATION:
1. Update docs/COMPONENT_SCORES.md A11y column (likely 9 → 10 once SR session checkbox is true).
2. Commit: `docs(a11y): screen reader session for <component>` (plus any fix commits).

Time-box: 30 minutes per component per SR (60 min total).
```

---

## Prompt 5 — Sprint D: Reduced-Motion Completeness Audit (library-wide)

> **Goal:** Add a stylelint rule + auto-fixer that guarantees every animation has a
> `prefers-reduced-motion` companion. **Run once.**

```text
Implement a stylelint rule and library-wide fix pass for `prefers-reduced-motion`
completeness.

PART 1 — Custom stylelint rule
Add stylelint-plugin/no-unprefixed-motion.mjs that flags any rule containing one of:
  - `transition:` (where value !== `none`)
  - `animation:`  (where value !== `none`)
  - `animation-name:`
... unless the same selector has a `@media (prefers-reduced-motion: reduce)` block
within the same file that sets `transition: none` or `animation: none` for that property.

Auto-fix mode: scaffold an empty `@media (prefers-reduced-motion: reduce) { <selector> { /* TODO: set transition / animation to none */ } }` next to the offending rule.

Register it in stylelint.config.mjs and add a CI script:
  `"lint:css:motion": "stylelint 'projects/ui-lib-custom/**/*.scss' --custom-formatter scripts/motion-formatter.mjs"`

PART 2 — Run + fix
1. Run the new rule across all component SCSS files.
2. For each component flagged, fill the scaffolded reduce block with the correct
   override (almost always `transition: none; transform: none;`).
3. For genuinely intentional animations that must run even in reduced mode (rare —
   spinners, loading bars), add a `/* stylelint-disable-next-line uilib/no-unprefixed-motion */`
   with a comment explaining why.

VERIFICATION:
1. `npm run lint:css:motion` exits 0.
2. `ng build ui-lib-custom` zero warnings.
3. Inventory pass: for every component touched, increment `Polish` column by 1 in
   docs/COMPONENT_SCORES.md if it was at 8.
4. Commit: `chore(a11y): enforce prefers-reduced-motion completeness library-wide`
```

---

## Prompt 6 — Sprint E: Per-Entry-Point Gzip Budget (one-off tooling)

> **Goal:** Measure and snapshot per-component gzip payload. **Run once.**

```text
Extend the existing bundle-size tooling to emit per-secondary-entry-point gzip numbers.

DO:
1. After `ng build ui-lib-custom`, for each folder under
   dist/ui-lib-custom/fesm2022/ matching `ui-lib-custom-<name>.mjs`:
   - Compute gzip-compressed size with `zlib.gzipSync` at default level.
   - Record into docs/reference/bundle-sizes.json as:
     { "<name>": { "raw": <bytes>, "gzip": <bytes>, "measuredAt": "ISO date" } }
2. Add scripts/check-bundle-budget.mjs:
   - Reads docs/reference/bundle-sizes.json from `main` branch (git show HEAD:).
   - Compares to fresh build.
   - Fails if any entry grew > 5% AND > 1 KB raw.
3. Wire into CI: add a `bundlesize:check` step that runs after build.
4. Add a script: `"bundlesize:snapshot": "node scripts/snapshot-bundle-sizes.mjs"`
   (overwrites the JSON; commit when intentional).

VERIFICATION:
1. Run `npm run bundlesize:snapshot` → commit the JSON.
2. Confirm docs/reference/bundle-sizes.json has every secondary entry point.
3. Document in docs/reference/systems/BUNDLE_BUDGET.md what the budget rules are.
4. For every component with a measured number, the Perf "gzip payload measured"
   checkbox is now true; bump Perf in docs/COMPONENT_SCORES.md by 1 if at 8.
5. Commit: `chore(perf): per-entry-point gzip budget tracking`
```

---

## Prompt 7 — Per-Component 8.x → 9.5+ Upgrade (12-step template)

> **Goal:** Move ONE component from its current score to ≥ 9.5 average using the
> ordered template in §2.3 of the response.
> **Run when:** Component is in §3.1 Top 15 or §3.2 cluster.

```text
Execute the 12-step upgrade template from OPUS_NEXT_LEVEL_RESPONSE.md §2.3 on:

Component: <Component>
Current scores: API=<n> A11y=<n> Perf=<n> Comp=<n> Theme=<n> DX=<n> Docs=<n> Polish=<n> Angular=<n> Feel=<n> Comp11=<n or —>
Target: every category ≥ 9, average ≥ 9.5.

Before changing code:
1. Read projects/ui-lib-custom/src/lib/<component>/README.md
2. Read projects/ui-lib-custom/src/lib/<component>/<component>.ts (note current
   inputs/outputs/templates)
3. Read docs/reference/components/<component>.md (if exists) for the keyboard table
4. Read the corresponding entry in docs/COMPETITIVE_BENCHMARKS.md (run Prompt 1 first
   if it doesn't exist)

Execute steps in order, committing after EACH step:

Step 1 — Competitive benchmark entry exists?  If no → run Prompt 1 first; STOP.
Step 2 — Reference doc complete?              If no → run Prompts 2 + 3 first.
Step 3 — `prefers-reduced-motion` audit       Sprint D rule must pass on this file.
Step 4 — Typed `ng-template` slot(s)
         Add `<component>.types.ts` with `UiLib<Component><Context><T>` interface.
         Add `contentChild<TemplateRef<...>>('<slotName>')`.
         Use `<ng-container *ngTemplateOutlet="tpl; context: ctxFor(item, i)">`.
         Pattern reference: OPUS_NEXT_LEVEL_RESPONSE.md Appendix A.1.
Step 5 — JSDoc on every input/output (one-line + default value)
Step 6 — Discriminated union for mutually exclusive modes (if applicable — Appendix A.4)
Step 7 — `@defer` for off-screen/inactive panel (Appendix A.2)
Step 8 — Expose missing theme vars; ALL hardcoded values in SCSS become `var(--uilib-<component>-*)`.
         Document new vars in docs/reference/components/<component>.md "Theming" table.
Step 9 — Enter/exit animation tied to `--uilib-transition-duration-fast` +
         `--uilib-transition-easing-enter` tokens (Appendix A.3).
         MUST include `@media (prefers-reduced-motion: reduce) { transition: none; transform: none; }`.
Step 10 — Conduct SR session (Prompt 4) and record file.
Step 11 — Demo page: ensure empty/loading/error/disabled/many-items edge cases are present.
Step 12 — Re-score in docs/COMPONENT_SCORES.md; commit + update AI_AGENT_CONTEXT.md.

PER-STEP VERIFICATION (run after every step):
1. `npx eslint projects/ui-lib-custom/src/lib/<component>/ --max-warnings 0`
2. `npm run lint:css -- projects/ui-lib-custom/src/lib/<component>/`
3. `ng build ui-lib-custom`
4. `npx jest projects/ui-lib-custom/src/lib/<component>`
5. If any fail → fix before next step.

COMMIT FORMAT per step: `<type>(<component>): step <n> — <one-line>`
Example: `feat(select): step 4 — typed option template slot`

FINAL: After step 12, write a Recent Handoff block in AI_AGENT_CONTEXT.md.

Time-box: 5 hours focused; do NOT exceed without flagging.
```

---

## Prompt 8 — 8.2-Cluster Batch Upgrade (one PR per component, batched)

> **Goal:** Apply a minimal 5-step subset of Prompt 7 across 15 components in one sprint.
> **Run when:** Multiple components share the same low-score pattern (see §3.2).

```text
Execute the §3.2 cluster batch on these 15 components, ONE PR PER COMPONENT:

Select, AutoComplete, CascadeSelect, DatePicker, ColorPicker, Knob, Avatar,
DataView, Timeline, MeterGroup, OrganizationChart, Carousel, Galleria,
ConfirmDialog, DynamicDialog

For each component, do EXACTLY these 5 changes:

1. Run Sprint B reference doc generator (Prompt 2) for it. Hand-finish minimally
   (resolve TODOs; skip migration sections for non-Top-15).
2. Add the standard typed `ng-template` slot pattern (Prompt 7 step 4 + Appendix A.1).
   If the component renders a list/grid/options, add `itemTemplate`. If it has a
   header/footer area, add `headerTemplate` / `footerTemplate`.
3. Wrap off-screen / inactive panels in `@defer (on viewport; prefetch on idle)`
   (Appendix A.2). If the component has no overlay/conditional panel, skip and note "n/a".
4. Identify ONE missing theme var (most commonly shadow, focus ring, or panel background)
   and expose it as `--uilib-<component>-<property>` with sensible default.
5. Add enter/exit animation (Appendix A.3) wired to transition tokens.
   Always include `prefers-reduced-motion` override.

PER COMPONENT VERIFICATION:
- ESLint + stylelint + build + unit tests all green.
- Score table updated: Comp → 10, Perf → 9, Theme → 9, Polish → 9, Feel → 9, Docs → 9.
- Single PR, single squash commit: `feat(<component>): cluster batch — typed templates, defer, theme, motion`

DO NOT do screen reader sessions in this sprint — that's Sprint C.
DO NOT do migration docs in this sprint — that's only for Top-15.

Time-box: 3 hours per component (with AI pair). Target: 4 per day, full cluster in
one week.

After all 15 components, update docs/COMPONENT_SCORES.md averages and write one
combined handoff to AI_AGENT_CONTEXT.md summarising the sprint.
```

---

## Prompt 9 — Category 10: Emotional Quality Verification

> **Goal:** Pass the 10 emotional-quality checkboxes for ONE component using the
> §2.4 framework. **Run when:** Component scores 8 in Feel and you want to push to 10.

```text
Run the §2.4 Category 10 verification protocol on: <Component>

For each of the 10 items, perform the test and record outcome:

1. Zero-friction entry point
   TEST: Open Storybook in incognito. Render <ui-lib-<component> /> with no inputs.
   PASS IF: Component renders; no console error; visible/usable default.

2. Intelligent defaults
   TEST: Screenshot the no-input render. Ask 1 non-technical reviewer: "would you
   ship this as-is?"
   PASS IF: Answer is yes.

3. Animations feel native
   TEST: Side-by-side video against the equivalent in Linear app / Vercel dashboard /
   Notion. Match timing AND easing.
   PASS IF: Timing 120–180ms enter, 80–120ms exit; easing matches
   --uilib-transition-easing-enter / --uilib-transition-easing-exit tokens.

4. Micro-interactions present
   TEST: Click through every interactive sub-element. Verify hover + focus + active
   states have ≥ 1px or ≥ 4% opacity delta.
   PASS IF: No "dead" interaction; refer to §2.4 archetype micro-interaction inventory.

5. No visual leaks
   TEST: Resize from 320px → 4K. Rotate mobile device. Open in dark mode. Mix with
   long content (Lorem ipsum × 100).
   PASS IF: No layout shift, no overflow, no z-index stacking issue.

6. Error states communicate
   TEST: Trigger every error state. Run NVDA. Run colour-blindness simulator (Chrome
   devtools → Rendering).
   PASS IF: Error visible without colour, announced by SR, text is unambiguous.

7. Scales gracefully
   TEST: Render with 1, 100, 10,000 items. Time first paint.
   PASS IF: 10k renders in < 100ms with `@defer` or virtualisation.

8. Non-Angular dev test
   TEST: Show the demo for 30 seconds to a React or Vue dev (real or simulated).
   Ask: "what library is this?"
   PASS IF: Not identified as Angular Material or PrimeNG. Bonus if identified as
   "looks like Radix" or "looks like shadcn".

9. A11y engineer test
   TEST: Run axe. Run NVDA full walkthrough. Run keyboard-only navigation.
   PASS IF: Zero axe violations, all interactions reachable, all announcements clear.

10. "I don't want to go back" test
    TEST: Ask 3 maintainers: "would you delete the Material/PrimeNG version and
    use this?"
    PASS IF: 3/3 yes.

OUTPUT to a new section in docs/reference/components/<component>.md:

## Emotional Quality Verification (Cat 10)
Date: YYYY-MM-DD · Verified by: <name(s)>
| # | Item | Pass | Notes |
| 1 | Zero-friction entry | ✅/❌ | … |
… 10 rows …

Score: <count of ✅> / 10 → bump Feel column in COMPONENT_SCORES.md.

Time-box: 90 minutes per component (mostly waiting for test renders and reviewers).
```

---

## Prompt 10 — Add Category 12 (Internationalisation) to the Scoring System

> **Goal:** Formalise the new Category 12 from §1.5. **Run once.**

```text
Add Category 12 = "Internationalisation" to the ui-lib-custom scoring system.

PART 1 — Update SCORING_CRITERIA.md
Open docs/SCORING_CRITERIA.md. Add a new section "Category 12 — Internationalisation"
with these 12 checkboxes (copy from OPUS_NEXT_LEVEL_RESPONSE.md §1.5):
1. LTR/RTL verified
2. `dir="rtl"` integration test exists
3. Pluralisation via Intl.PluralRules (for components emitting "X items selected")
4. Locale-aware date/number/currency (for DatePicker / InputNumber / Knob)
5. Translation contract documented (no string literals in TS)
6. Keyboard shortcuts adapt for non-Latin keyboards
7. `aria-label` is a translatable input
8. ICU message format examples
9. Per-component translation key contract documented
10. BiDi-safe in mixed-direction text
11. All logical CSS properties confirmed via RTL e2e test
12. Screen-reader pronunciation hints (`lang="…"` propagation)

Document the formula: score = (checked / 12) × 10. Gate: ≥ 8 → 10 of 12 checked.

PART 2 — Update COMPONENT_SCORES.md
Add a new column `I18n` after `Comp11`. Mark every component `—` initially.
Update the gate sentence: "production-quality when every category ≥ 8 (12 categories total)".

PART 3 — Add the lint
Create scripts/check-i18n.mjs that fails CI if any .ts file in
projects/ui-lib-custom/src/lib/ contains a hardcoded English string used as an
`aria-label`, `aria-description`, `label`, or `placeholder` value.
Allow-list: design-tokens.ts, public-api.ts, type files.

PART 4 — Create the i18n entry point
Add projects/ui-lib-custom/i18n/{package.json, ng-package.json, public-api.ts}.
Initial contents: an `UiLibI18nService` with `inject()`able signal-based locale,
`translate(key, params)`, and a default English bundle.
Add to package.json exports + typesVersions.
Add an import test to projects/ui-lib-custom/test/entry-points.spec.ts.

VERIFICATION:
- `npm run typecheck` green.
- `ng build ui-lib-custom` green.
- Commit: `feat(scoring): add Category 12 internationalisation` + `feat(i18n): scaffold UiLibI18nService entry point`
```

---

## Prompt 11 — Premium Build: Signals-First Data Grid (Greenfield 10/10)

> **Goal:** Scaffold the flagship premium component. **This is a multi-week build.**
> Each invocation tackles ONE phase below.

```text
You are scaffolding the ui-lib-custom Data Grid — the flagship premium component
referenced in OPUS_NEXT_LEVEL_RESPONSE.md §1.4 and §3.5.

Build target: 10/10 across all 12 categories (Category 12 mandatory).
APG pattern: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
Entry point: ui-lib-custom/data-grid (new secondary entry point).

This session: PHASE <n> only.

PHASE 1 — Architecture spike
- Document the public API in docs/reference/components/data-grid.md as if shipped.
- Decide: headless core + styled wrapper? (Recommend YES → also creates
  ui-lib-custom/data-grid/headless entry point.)
- Decide selection model interop: SelectionModel from CDK vs. own signal-based.
- Output: data-grid-architecture.md draft. NO code.

PHASE 2 — Column model + headless core
- Create projects/ui-lib-custom/src/lib/data-grid/{data-grid.ts, .html, .scss,
  .types.ts, .spec.ts, index.ts, README.md}
- Implement column model as signal: ColumnDef<T> with id, header, accessor,
  width, minWidth, sortable, pinnable, resizable, hidden.
- Render a static grid (no virtualisation yet) with `role="grid"`, full
  ARIA grid pattern.
- Full keyboard nav per APG grid pattern.
- All 12 archetype 3 (compound/data) DOD items met.

PHASE 3 — Virtualisation
- Integrate cdk-virtual-scroll-viewport with row buffering.
- Verify with 10,000 row stress story.
- Maintain `aria-rowcount` correctness across virtualised rows.

PHASE 4 — Column features
- Resize (mouse + keyboard with Alt+Arrow).
- Reorder (drag + keyboard with Ctrl+Shift+Arrow).
- Pinning (left/right) using CSS sticky + `aria-colindex`.
- Sort (single + multi with Shift-click); `aria-sort` updates.

PHASE 5 — Cell editing
- Excel-like edit on F2 / Enter.
- Cell template per column (`cellTemplate` ng-template with typed context).
- Validation + error state announcement.

PHASE 6 — Server-side ops
- Pagination, sort, filter callbacks (signal-based).
- `loading` state with skeleton rows.
- `error` state with retry callback.

PHASE 7 — Selection
- Single, multi, checkbox, range.
- `aria-selected` per row; `aria-multiselectable` on grid.

PHASE 8 — Filtering
- Built-in filter row (per-column `filterTemplate`).
- Quick-filter input (global search) with debounce signal.

PHASE 9 — Polish + premium docs
- Complete docs/reference/components/data-grid.md.
- Add to docs/COMPETITIVE_BENCHMARKS.md with full §2.5 entry.
- Storybook stories for every feature combination.
- Demo page at /components/data-grid with realistic enterprise dataset.

PHASE 10 — Score + ship
- Score against all 12 categories.
- Every category MUST be 10. If any is 9, do not ship.
- Commit each phase: `feat(data-grid): phase <n> — <one-line>`

This is a quality benchmark for the rest of the library. It proves the 10/10 bar
is achievable and becomes the reference for all subsequent upgrades.
```

---

## Prompt 12 — Premium Build: Query Builder Scaffolding

> **Goal:** Greenfield Query Builder component. **Run after data-grid Phase 3.**

```text
Scaffold the ui-lib-custom Query Builder — second premium component per §3.5.

Target: nested condition tree → SQL / Mongo / Elasticsearch query string.
APG pattern: tree pattern + form composition (no dedicated APG; document
hybrid approach).
Entry point: ui-lib-custom/query-builder.

PHASE 1 — Schema model
- ConditionSchema: { field, operators[], inputComponent, defaultValue }.
- QueryNode: discriminated union — { kind: 'group', combinator: 'and' | 'or',
  children: QueryNode[] } | { kind: 'condition', field, operator, value }.
- Type-safe builder fluent API.

PHASE 2 — Tree UI
- Recursive component tree using existing ui-lib-tree visual pattern.
- Drag-to-reorder children with keyboard equivalent (Ctrl+Shift+Arrow).
- Full APG tree keyboard model.

PHASE 3 — Output formatters
- toSQL(node) → string
- toMongo(node) → object
- toElasticsearch(node) → object
- Each exported from ui-lib-custom/query-builder/formatters.

PHASE 4 — Storybook + demo + docs (same as data-grid Phase 9–10).

Score target: 10/10 across all 12 categories.

This component slots into the §3.5 transition window — start once data grid is
in beta. Single greenfield commit per phase: `feat(query-builder): phase <n>`.
```

---

## Prompt 13 — Weekly Cadence: Monday Planning

> **Run every Monday morning.** Picks the week's work from the prioritised backlog.

```text
You are starting a fresh execution week on ui-lib-custom.

DO:
1. Read AI_AGENT_CONTEXT.md → "Recent Handoffs" (last 3).
2. Read docs/COMPONENT_SCORES.md → identify:
   a. The 4 components with the lowest avg from §3.1 Top 15 that are not yet ≥ 9.5.
   b. Any component still showing `—` in Comp11.
   c. Any component still showing `—` in I18n (Cat 12).
3. Read docs/prompts/OPUS_NEXT_LEVEL_RESPONSE.md §3.4 weekly rhythm.
4. Produce a Markdown plan for the week with:
   - Monday: pick 4 components for Prompt 7 upgrade.
   - Tue–Thu: execute Prompt 7 on those 4 (one per day, half a day buffer).
   - Friday AM: run Prompt 1 (benchmark) on NEXT week's 4 components.
   - Friday PM: run Prompt 14 (wrap).
5. Append the plan to AI_AGENT_CONTEXT.md under "## This Week's Plan".

OUTPUT: just the plan. Do NOT start work; that's the next prompt.
```

---

## Prompt 14 — Weekly Cadence: Friday Wrap

> **Run every Friday evening.** Closes out the week's work.

```text
Close out the execution week on ui-lib-custom.

DO:
1. Confirm all components touched this week have:
   - ESLint + stylelint + build green.
   - Updated entry in docs/COMPONENT_SCORES.md.
   - Updated docs/reference/components/<name>.md if Docs changed.
   - Updated docs/COMPETITIVE_BENCHMARKS.md if Comp11 changed.

2. Compute the inventory average from docs/COMPONENT_SCORES.md.
3. Append a "Recent Handoff" block to AI_AGENT_CONTEXT.md:

   ```
   Date: YYYY-MM-DD (week of …)
   Changed: <list of components or sprints>
   Sprints progressed: <A/B/C/D/E with % complete>
   Inventory average: previous=<n.n> → current=<n.n>
   State: <what is complete / in progress>
   Verification: <commands that passed>
   Next step: <single most logical next action — usually next Monday's planning>
   ```

4. Trim AI_AGENT_CONTEXT.md to the newest 3 handoffs; move older to
   docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md (per CLAUDE.md protocol).

5. If inventory average just crossed a major threshold (8.5, 9.0, 9.5), note it
   in CHANGELOG.md under "Unreleased → Quality milestones".

6. Push: `chore(week): wrap week of YYYY-MM-DD — avg <n.n>`
```

---

## Appendix — Prompt Dependencies

Visual order to execute prompts in:

```
Week 1
├── Prompt 2  (Sprint B generator) — one-off, blocks Prompt 3 & 7
├── Prompt 5  (Sprint D motion lint) — one-off
├── Prompt 6  (Sprint E gzip budget) — one-off
├── Prompt 10 (Add Category 12)     — one-off
└── Prompt 13 (Monday plan)         — recurring, kicks off per-component work

Weeks 2–4
├── Prompt 1  (Sprint A backfill)   — per component, 4–8 per session
├── Prompt 3  (Sprint B finish)     — per component, after Prompt 2 generator
├── Prompt 7  (Per-component upgrade) — Top 15 first
├── Prompt 8  (Cluster batch)       — 15 components in one focused week
├── Prompt 4  (SR sessions)         — runs alongside Prompts 7 & 8
├── Prompt 9  (Cat 10 verification) — after Prompt 7 finishes each component
├── Prompt 13 + 14                  — every Monday + Friday

Weeks 5+
├── Prompt 11 (Data Grid)           — multi-phase, separate AI track
├── Prompt 12 (Query Builder)       — starts after Data Grid phase 3
└── Continue Prompts 7/4/9/13/14    — until inventory avg ≥ 9.5
```

Each prompt is independent and resumable. If a session is interrupted, the
prompt's per-step commit format makes mid-flight recovery trivial — read the
last commit, find the step number, continue from the next.

