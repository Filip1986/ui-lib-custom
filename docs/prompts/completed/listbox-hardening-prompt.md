# Listbox — 6-Phase Hardening Prompt
**Component:** `ui-lib-custom/listbox` · `<ui-lib-listbox>`
**Queue position:** Tier 4, #36
**Generated:** 2026-05-11
**Key a11y concern:** role=listbox, aria-multiselectable, keyboard selection
## Step 1 — Files to read
1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/listbox/README.md`
3. All Listbox source files.
4. Read previous Tier 4 hardening prompts for shared patterns.
## Step 2 — Inventory (read source first, then verify)
Read all source files. Document what ARIA is present and what is missing.
Focus on: roles, aria-label, keyboard handlers, prefers-reduced-motion, unique IDs.
## Phase 3 — Key A11y Issues
The Listbox already has significant ARIA (verified from source). Key gaps
**Standard requirements (must verify for all components):**
- Unique instance IDs via module-level counter (`let nextId: number = 0`)
- All interactive elements have `:focus-visible` rings
- `prefers-reduced-motion` override in SCSS
- Screen reader-friendly labels on all icon-only buttons
- `aria-hidden="true"` on all purely decorative elements
## A11y Spec (aim for  aria-activedescendant tracking across all keyboard moves, select-all button label, group header aria-hidden, roving focus vs. aria-activedescendant choice, prefers-reduced-motion.:25-35 tests)
Create or update `listbox.a11y.spec.ts`:
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
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/listbox/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=listbox --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```
Update `docs/COMPONENT_SCORES.md` → Listbox #36 ✅.
