# Bind — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/bind` · `[uiLibBind]` directive
**Queue position:** Utilities (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** Minimal — Bind is a DOM property-binding utility using `Renderer2`. Verify it
does not unintentionally clear or override ARIA attributes applied by other Angular bindings.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/bind/README.md`
3. Full source: `bind.ts`, `bind.spec.ts`
4. Related: `style-class/` (companion directive pattern)

---

## Step 2 — What is already present (do NOT regress these)

- `[uiLibBind]` attribute selector — `input<Record<string, unknown>>({})` default
- `Renderer2.setProperty` applies each entry as a DOM property
- Stale key cleanup: when a key is removed from the record, `setProperty(key, null)` resets it —
  ONLY when the directive still owns the current value (`getPropertyValue(key) === previousValue`)
- `effect()` in constructor — reactive to signal changes
- `previousBindings` tracks last-applied values to safely diff removals
- `Reflect.get` reads current DOM property value for the ownership check

---

## Step 3 — The 6-phase workflow (abbreviated — utility directive)

### Phase 3 first — Accessibility Audit

#### Issue 1 — No clobber of Angular host bindings (CRITICAL — VERIFY)
Angular's `Renderer2.setProperty` sets DOM properties, while Angular's `[attr.aria-*]` syntax sets
attributes. Test that `[uiLibBind]="{ 'aria-label': 'foo' }"` on an element that also has
`[attr.aria-label]="bar"` from Angular binding does NOT silently lose the Angular binding on the
next change-detection cycle.

Write a test: apply both `[uiLibBind]` and a native Angular `[attr.aria-label]` — verify the last
write wins and does not cause unexpected clearing.

#### Issue 2 — `aria-hidden` key — string vs boolean (CRITICAL)
`aria-hidden` must be the string `"true"` / `"false"` or the attribute must be removed entirely.
If `{ 'aria-hidden': true }` (boolean) is passed, `setProperty` may set the DOM property `.ariaHidden`
correctly, but `getAttribute('aria-hidden')` may not reflect it as a string. Document this in README:
```ts
// Correct
[uiLibBind]="{ 'ariaHidden': 'true' }" // DOM property name
// Also correct (removes the attribute)
[uiLibBind]="{ 'ariaHidden': null }"
```

#### Issue 3 — `tabIndex` property casing (MODERATE)
DOM property name for tab index is `tabIndex` (camelCase) but the attribute is `tabindex` (lowercase).
`setProperty('tabindex', -1)` may not work as expected. Verify the README warns about DOM property
naming vs attribute naming differences.

#### Deliverable — Add coverage to `bind.spec.ts` (no separate a11y spec needed)
- Applying `{ 'aria-label': 'foo' }` sets the `ariaLabel` DOM property
- Removing a key resets it to null (only when directive owns it)
- Applying `{ 'ariaHidden': 'true' }` correctly marks the element as aria-hidden
- Effect re-runs on object reference change
- axe passes: basic element with `[uiLibBind]` applied

---

### Phase 1 — Architecture Audit
- `effect()` in constructor — this is the Angular signal-based reactive pattern; confirm it works
  in zoneless / `provideZonelessChangeDetection()` testing environments
- `previousBindings` is a plain object field — not a signal; this is intentional for performance
- `getPropertyValue(key)` uses `Reflect.get` — verify it returns `undefined` for unknown keys
  (consistent with removal logic)

### Phase 2 — DX Audit
README must explain:
- DOM property names (camelCase) vs attribute names (lowercase) — key difference
- ARIA property names: `ariaLabel` (DOM) vs `aria-label` (attribute)
- Removal behaviour: set the key to `null` or omit it from the object
- Why this differs from `[attr.x]` bindings and when to use each
- Common pitfalls: `tabIndex` vs `tabindex`, `ariaHidden` vs `aria-hidden`

### Phase 4 — Performance Audit
- `effect()` runs on every object reference change — consumers should use `computed()` or
  memoization to avoid unnecessary re-renders
- Document this performance caveat in README

### Phase 5 — Composability Audit
- Works on any native element or Angular component host
- Works alongside `[uiLibStyleClass]` without interference

### Phase 6 — Polish Audit
- [ ] TypeScript types — `Record<string, unknown>` should ideally narrow to known DOM properties;
  document why `unknown` is used (flexibility)
- [ ] JSDoc on `uiLibBind` input explains the property-name convention

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/bind/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/bind/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Bind row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
