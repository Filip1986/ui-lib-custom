# Paginator — 6-Phase Hardening Prompt
**Component:** `ui-lib-custom/paginator` · `<ui-lib-paginator>`
**Queue position:** Tier 4, #37
**Generated:** 2026-05-11
**Key a11y concern:** Live region announcing page change, button labels
## Step 1 — Files to read
1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/paginator/README.md`
3. All Paginator source files.
4. Read previous Tier 4 hardening prompts for shared patterns.
## Step 2 — Inventory (read source first, then verify)
Read all source files. Document what ARIA is present and what is missing.
Focus on: roles, aria-label, keyboard handlers, prefers-reduced-motion, unique IDs.
## Phase 3 — Key A11y Issues
Each navigation button (first/prev/next/last, page numbers) needs an accessible aria-label. The current page must be announced as aria-current=page or via aria-label. A live region must announce page change.
**Standard requirements (must verify for all components):**
- Unique instance IDs via module-level counter (`let nextId: number = 0`)
- All interactive elements have `:focus-visible` rings
- `prefers-reduced-motion` override in SCSS
- Screen reader-friendly labels on all icon-only buttons
- `aria-hidden="true"` on all purely decorative elements
## A11y Spec (aim for 20-30 tests)
Create or update `paginator.a11y.spec.ts`:
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
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/paginator/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=paginator --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```
Update `docs/COMPONENT_SCORES.md` → Paginator #37 ✅.
