# TreeSelect — 6-Phase Hardening Prompt
**Component:** `ui-lib-custom/tree-select` · `<ui-lib-tree-select>`
**Queue position:** Tier 4, #35
**Generated:** 2026-05-11
**Key a11y concern:** Tree inside a popup — combobox + tree pattern
## Step 1 — Files to read
1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/tree-select/README.md`
3. All TreeSelect source files.
4. Read previous Tier 4 hardening prompts for shared patterns.
## Step 2 — Inventory (read source first, then verify)
Read all source files. Document what ARIA is present and what is missing.
Focus on: roles, aria-label, keyboard handlers, prefers-reduced-motion, unique IDs.
## Phase 3 — Key A11y Issues
Combine the combobox (aria-haspopup=tree, aria-expanded) pattern with the tree pattern from Tree hardening. Focus management
**Standard requirements (must verify for all components):**
- Unique instance IDs via module-level counter (`let nextId: number = 0`)
- All interactive elements have `:focus-visible` rings
- `prefers-reduced-motion` override in SCSS
- Screen reader-friendly labels on all icon-only buttons
- `aria-hidden="true"` on all purely decorative elements
## A11y Spec (aim for  when a selection is made, the tree popup closes and focus returns to the combobox input.:35-45 tests)
Create or update `tree-select.a11y.spec.ts`:
- ARIA structure verification
- Keyboard navigation coverage
- Screen reader announcement verification (live regions)
- axe-core automated checks (default + key states)
Use `checkA11y(fixture)` (component renders inside fixture).
Use `document.body.appendChild(fixture.nativeElement)` for focus tests.
Use `provideZonelessChangeDetection()` in TestBed.
## Phases 1, 2, 4, 5, 6 (Summary)
**Phase 1:** Unique IDs, signal correctness, SSR safety.
**Phase 2:** README — ARIA table, keyboard table, CSS vars table.
**Phase 4:** Computed signals, stable `@for track` keys, no memory leaks.
**Phase 5:** Content projection, composability review.
**Phase 6:** Focus rings, animations, reduced motion, dark mode, variants.
## Commands
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree-select/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=tree-select --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```
Update `docs/COMPONENT_SCORES.md` → TreeSelect #35 ✅.
