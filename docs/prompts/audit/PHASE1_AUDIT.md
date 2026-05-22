# Phase 1 — Full Checkpoint Audit (Gap Report Only)

> Paste this prompt into Claude Code with `[COMPONENT]` replaced by the kebab-case name
> (e.g. `button`, `accordion`, `select`). The agent reads all source itself and runs commands.
> **This phase makes zero code changes.** Output is a verified gap report only.

---

```
You are conducting a Tier 2 checkpoint audit on the [COMPONENT] component from ui-lib-custom.

This is a READ-ONLY session. You must not change any file. Your output is a verified gap report.

---

## Step 1 — Read Every Source File

Read all of these files before touching any checklist. Do not skip any.

- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].ts
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].html
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].scss
- projects/ui-lib-custom/src/lib/[COMPONENT]/index.ts
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].types.ts  (if it exists)
- projects/ui-lib-custom/src/lib/[COMPONENT]/README.md
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].spec.ts
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].a11y.spec.ts  (if it exists)
- projects/ui-lib-custom/[COMPONENT]/public-api.ts
- projects/ui-lib-custom/package.json  (exports and typesVersions section only)
- projects/ui-lib-custom/test/entry-points.spec.ts  (grep for [COMPONENT] imports)
- docs/reference/components/[COMPONENT].md  (if it exists)
- docs/COMPETITIVE_BENCHMARKS.md  (grep for the [COMPONENT] section)
- projects/demo/src/app/pages/[COMPONENT]/[COMPONENT]-demo.component.ts
- projects/demo/src/app/pages/[COMPONENT]/[COMPONENT]-demo.component.html
- projects/demo/src/app/pages/[COMPONENT]/[COMPONENT]-demo.component.scss  (if it exists)
- docs/SCORING_CRITERIA.md  (read the full file — this is your checklist)

---

## Step 2 — Run Verification Commands

Run each command and record the result (PASS / FAIL + output excerpt on failure):

1. npx eslint projects/ui-lib-custom/src/lib/[COMPONENT]/ --max-warnings 0
2. npx eslint projects/demo/src/app/pages/[COMPONENT]/ --max-warnings 0
3. npx jest --testPathPatterns="src/lib/[COMPONENT]/" --no-coverage
4. ng build ui-lib-custom

Do not stop if a command fails. Record the failure and continue.

---

## Step 3 — Audit All 11 Categories

For every checkbox in docs/SCORING_CRITERIA.md, mark exactly one of:
  ✅  PASS    — you found direct evidence in the source files. Cite file + what you found.
  ❌  FAIL    — the criterion is not satisfied. State exactly what is missing.
  ⚠️  PARTIAL — partially implemented or requires runtime/browser to fully verify.
  🔍  HUMAN   — cannot be verified from source alone (screen reader, visual contrast, browser test).

Rules:
- Do NOT give benefit of the doubt. No source evidence = ❌ or ⚠️.
- Do NOT mark ✅ based on the fact that a previous session scored it highly.
- A ⚠️ is counted as 0.5 when computing the score.
- A 🔍 is counted as 0.5 unless you have strong reason to believe it would pass.

---

## Category 1 — API Clarity
16 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 16 × 10.

Go through each of the 16 checkboxes in docs/SCORING_CRITERIA.md Category 1.
For each: [status] [checkbox text] — [one-line evidence or gap description]

Compute and state: Category 1 score = X.X / 10

---

## Category 2 — Accessibility
28 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 28 × 10.

Go through each of the 28 checkboxes in docs/SCORING_CRITERIA.md Category 2.
Special guidance:
- ARIA Semantics: inspect the HTML template for role and aria-* attributes.
- Keyboard Interaction: look for HostListener or (keydown) handlers. Check if the APG pattern's key map is fully covered.
- Focus Management: look for CDK FocusTrap, focus() calls, or focusMonitor usage.
- Screen Reader items (NVDA/VoiceOver): mark 🔍 unless test file explicitly covers the announcement.
- Contrast ratios: mark 🔍 — cannot measure from source.
- axe-core: check if [COMPONENT].a11y.spec.ts exists and has an axe scan. ✅ only if the file exists and the scan is there.
- Playwright test: check if tests/a11y/ has a file for this component.

Compute and state: Category 2 score = X.X / 10

---

## Category 3 — Performance
20 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 20 × 10.

Go through each of the 20 checkboxes in docs/SCORING_CRITERIA.md Category 3.
Special guidance:
- ChangeDetectorRef.markForCheck / detectChanges: grep the .ts file for these strings.
- async pipe: grep the .html file.
- @defer: grep the .html file.
- will-change: grep the .scss file.
- Subscription / subscribe(): grep the .ts file.
- addEventListener: grep the .ts file.
- setTimeout / setInterval: grep the .ts file.
- document.* / window.*: grep the .ts file.
- tree-shaking: verify entry point in package.json exports and that entry-points.spec.ts imports it.
- gzipped payload: mark ⚠️ — requires build measurement.

Compute and state: Category 3 score = X.X / 10

---

## Category 4 — Composability
14 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 14 × 10.

Go through each of the 14 checkboxes in docs/SCORING_CRITERIA.md Category 4.
Special guidance:
- ng-content slots: inspect the .html template.
- ControlValueAccessor: grep .ts for 'ControlValueAccessor', 'writeValue', 'registerOnChange'.
- hostDirectives: grep .ts for 'hostDirectives'.
- Works in OnPush parent: infer from signal-first architecture — mark ✅ if all inputs are signal-based.
- Works in @defer: mark ⚠️ — cannot fully verify without runtime check.

Compute and state: Category 4 score = X.X / 10

---

## Category 5 — Theming
15 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 15 × 10.

Go through each of the 15 checkboxes in docs/SCORING_CRITERIA.md Category 5.
Special guidance:
- Raw hex values: grep .scss for '#[0-9a-fA-F]{3,6}'. Any match = ❌.
- Raw px for spacing/radius/shadow: grep .scss for hardcoded px in margin/padding/border-radius/box-shadow rules.
- CSS variable naming convention: grep .scss for --uilib- and check naming pattern.
- Three variants (material/bootstrap/minimal): check .scss for all three variant selectors.
- Runtime variant switching: mark ⚠️ — requires browser test.
- Dark mode: grep .scss for prefers-color-scheme or dark-mode class.
- README Theming section: check README.md for a Theming or CSS Variables section.

Compute and state: Category 5 score = X.X / 10

---

## Category 6 — Developer Experience
17 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 17 × 10.

Go through each of the 17 checkboxes in docs/SCORING_CRITERIA.md Category 6.
Special guidance:
- Zero `any` in public API: grep .ts for ': any' and 'any[]' in input() and output() declarations.
- Zero `any` in implementation: grep .ts for ': any' overall.
- Generic type parameters: check if the component uses generics for data-driven inputs.
- IDE autocomplete: infer from string union types being defined — ✅ if all enumerable inputs use string unions.
- JSDoc: grep .ts for '/**' comments on inputs.
- Zero-setup integration: check if any providers are required (look for provideX in the component or docs).
- No global CSS required: check README and check if styles are self-contained in the component SCSS.
- README minimal example: read the README Usage section — does it work standalone?

Compute and state: Category 6 score = X.X / 10

---

## Category 7 — Documentation
18 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 18 × 10.

Go through each of the 18 checkboxes in docs/SCORING_CRITERIA.md Category 7.
Special guidance:
- README sections: check for selector, package path, inputs table, outputs table, slots table, usage example, Theming section, Accessibility section.
- Reference doc: check if docs/reference/components/[COMPONENT].md exists and is not a stub (> 50 lines).
- API table accuracy: compare the README inputs table against the actual input() declarations in the .ts file. Any mismatch = ❌.
- Demo page: check that the demo component HTML shows all three variants and all sizes.
- Edge cases in demo: look for disabled, loading, error/invalid, empty states in the demo HTML.

Compute and state: Category 7 score = X.X / 10

---

## Category 8 — Visual & Interaction Polish
15 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 15 × 10.

Go through each of the 15 checkboxes in docs/SCORING_CRITERIA.md Category 8.
Special guidance:
- State coverage (:hover, :focus-visible, :active, :disabled): grep .scss for these pseudo-classes.
- Loading state: grep .html and .ts for 'loading' input.
- Error/invalid state: grep .html and .scss for 'invalid' or 'error' class selectors.
- Empty state: grep .html and .scss for 'empty' class or ng-template empty.
- Animations use only transform/opacity: grep .scss for any transition or animation rules — flag if width/height/top/left/margin/padding are animated.
- will-change: grep .scss for 'will-change' — flag if it is set permanently (not inside :hover or animation event).
- prefers-reduced-motion: grep .scss for '@media (prefers-reduced-motion'.
- Animation timing tokens: grep .scss for '--uilib-transition-' in transition rules. Flag any hardcoded ms values.

Compute and state: Category 8 score = X.X / 10

---

## Category 9 — Angular Integration
16 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 16 × 10.

Go through each of the 16 checkboxes in docs/SCORING_CRITERIA.md Category 9.
Special guidance:
- standalone: grep .ts for 'standalone: true'.
- ViewEncapsulation.None: grep .ts for 'ViewEncapsulation.None'.
- OnPush: grep .ts for 'ChangeDetectionStrategy.OnPush'.
- input() / output(): grep .ts for '@Input(' or '@Output(' — any match = ❌.
- @if/@for/@switch: grep .html for '*ngIf' or '*ngFor' — any match = ❌.
- @for track: grep .html for '@for' and check it has 'track'.
- inject(): grep .ts for 'constructor(' with injected dependencies — any match = ❌.
- toSignal() / takeUntilDestroyed(): grep .ts for 'subscribe(' — if found, check for cleanup.
- afterNextRender(): grep .ts for 'ngAfterViewInit' or direct document./window. calls — flag as ❌.
- SSR safety: grep .ts for 'document.' and 'window.' — must be guarded by isPlatformBrowser().
- Zoneless test: check if .spec.ts uses 'provideZonelessChangeDetection()'.
- Secondary entry point: check projects/ui-lib-custom/[COMPONENT]/ exists and package.json has the entry.

Compute and state: Category 9 score = X.X / 10

---

## Category 10 — Emotional Quality
10 checkboxes. Score = (PASS + 0.5×PARTIAL + 0.5×HUMAN) / 10 × 10.

Go through each of the 10 questions in docs/SCORING_CRITERIA.md Category 10.
Answer honestly from what you observed in the source. A borderline "yes" is a "no."
For items requiring runtime observation (animations feel native, no visual leaks), mark 🔍.

Compute and state: Category 10 score = X.X / 10

---

## Category 11 — Competitive Parity & Differentiation
13 checkboxes. This is a GATE — not averaged into the overall score.
PASS = at least 10/13 checked AND no unresolved parity gap.

Go through each of the 13 checkboxes in docs/SCORING_CRITERIA.md Category 11.
Special guidance:
- Check docs/COMPETITIVE_BENCHMARKS.md for a [COMPONENT] entry. If none exists, mark all 5 research checkboxes ❌.
- If entry exists, check that it records Angular Material URL, PrimeNG URL, Radix/Ark URL.
- Parity checks: read the benchmarks entry — are any gaps listed without a documented exclusion reason?
- Differentiation: does the entry list at least one "beyond" item?

State: Category 11 result = PASS / FAIL. List every ❌ with a specific action to resolve it.

---

## Step 4 — Produce the Gap Report

### Command Results
| Command | Result |
|---------|--------|
| eslint (library) | PASS / FAIL |
| eslint (demo) | PASS / FAIL |
| jest | PASS (X/Y) / FAIL |
| ng build ui-lib-custom | PASS / FAIL |

### Score Summary

| Category                              | Score | Gate (≥8) | Unchecked |
|---------------------------------------|-------|-----------|-----------|
| 1 — API Clarity                       |  /10  | ✅/❌     |           |
| 2 — Accessibility                     |  /10  | ✅/❌     |           |
| 3 — Performance                       |  /10  | ✅/❌     |           |
| 4 — Composability                     |  /10  | ✅/❌     |           |
| 5 — Theming                           |  /10  | ✅/❌     |           |
| 6 — Developer Experience              |  /10  | ✅/❌     |           |
| 7 — Documentation                     |  /10  | ✅/❌     |           |
| 8 — Visual & Interaction Polish       |  /10  | ✅/❌     |           |
| 9 — Angular Integration               |  /10  | ✅/❌     |           |
| 10 — Emotional Quality                |  /10  | ✅/❌     |           |
| 11 — Competitive Parity (gate only)   | PASS/FAIL | ✅/❌ |           |
| **Average (categories 1–10)**         |  /10  |           |           |

**Production gate: PASS / FAIL**
(PASS = all 10 averaged categories ≥ 8.0 AND Category 11 = PASS)

### Prioritized Fix Queue

List every ❌ and ⚠️ grouped by category. Order within each category: Critical → High → Medium → Low.
For each item state:
- What the gap is
- Where to fix it (file)
- Estimated complexity: Tiny (< 5 min) / Small (< 30 min) / Medium (< 2 hours) / Large (> 2 hours)

### Human Verification Checklist
List all 🔍 items that require browser interaction, screen reader testing, or visual measurement.
These must be done manually after Phase 2 fixes are applied.

Do not make any file changes. The gap report is your only output.
```
