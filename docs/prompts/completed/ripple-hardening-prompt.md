# Ripple -- 6-Phase Hardening Prompt
**Component:** ui-lib-custom/ripple
**Queue position:** Tier 6 - Utility, #74
**Generated:** 2026-05-11
**Key a11y concern:** Motion respects prefers-reduced-motion
## Step 1 -- Files to read
1. AI_AGENT_CONTEXT.md, LIBRARY_CONVENTIONS.md, docs/VISION.md, docs/COMPONENT_SCORES.md
2. projects/ui-lib-custom/src/lib/ripple/README.md
3. All Ripple source files -- read every file fully before coding.
4. Most relevant hardened sibling for established patterns.
## Step 2 -- Inventory (build from source, do not assume)
Read all source files first. Document:
- All ARIA attributes already present (roles, labels, states)
- All keyboard handlers present
- Whether prefers-reduced-motion is in SCSS
- Whether unique instance IDs are generated
- Your specific fix targets for Phase 3
## Phase 3 -- Key A11y Issues (PRIORITY -- run first)
Ripple directive adds visual animation on click/keypress. prefers-reduced-motion: animation must not fire at all (not just instant). No ARIA changes needed - ripple is purely decorative.
Universal checklist:
- Unique instance IDs: let nextXxxId: number = 0 at module scope
- All interactive elements have :focus-visible ring in SCSS
- All decorative icons/images have aria-hidden="true"
- All animations/transitions have prefers-reduced-motion override  
- All icon-only buttons have mandatory aria-label
## A11y Spec (aim for 8-12 tests)
Create ripple.a11y.spec.ts covering:
- ARIA structure assertions (roles, labels, states)
- Keyboard interaction
- Live region announcements (where applicable)
- axe-core automated checks (default + key states)
Standard test setup:
```typescript
await TestBed.configureTestingModule({
  imports: [HostComponent],
  providers: [provideZonelessChangeDetection()],
}).compileComponents();
const fixture = TestBed.createComponent(HostComponent);
document.body.appendChild(fixture.nativeElement);
fixture.detectChanges();
await fixture.whenStable();
```
## Phases 1, 2, 4, 5, 6 (Summary)
Phase 1 (Architecture): Unique IDs, signal correctness, SSR safety (DOCUMENT injection if needed).
Phase 2 (DX): README with ARIA table, keyboard table, CSS custom properties table, accessibility section.
Phase 4 (Performance): computed signals, stable @for track keys, no memory leaks.
Phase 5 (Composability): Content projection slots, directive alternatives.
Phase 6 (Polish): :focus-visible on all interactive elements, animations, dark mode, all 3 variants.
## Commands (run from bash.exe)
```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/ripple/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns=ripple --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```
## Scoring and Handoff
Score all 10 categories using the rubric in docs/COMPONENT_SCORES.md.
Update docs/COMPONENT_SCORES.md -- Ripple #74 from queued to done.
Append handoff block to AI_AGENT_CONTEXT.md (keep newest 3, archive older).
