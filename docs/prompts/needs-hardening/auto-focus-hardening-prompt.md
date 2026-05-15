# AutoFocus — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/auto-focus` · `[uiLibAutoFocus]` directive
**Queue position:** Utilities (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** Focus must only run once on mount in `ngAfterViewInit`, must not steal focus
from dialogs/focus-traps, uses `requestAnimationFrame` for animation safety, and has SSR guard via
`isPlatformBrowser`. `auto-focus.a11y.spec.ts` already exists — read it before extending.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/auto-focus/README.md`
3. Full source: `auto-focus.ts`, `auto-focus.spec.ts`, `auto-focus.a11y.spec.ts`
4. Hardened siblings: `dialog/dialog.ts` (focus trap + initial focus pattern), `focus-trap/`

---

## Step 2 — What is already present (do NOT regress these)

The implementation is **comprehensive**:

- `[uiLibAutoFocus]` selector — explicit opt-in only
- `disabled: InputSignal<boolean>` — when true, no focus applied
- `selector: InputSignal<string | null>` — CSS selector to focus a child instead of the host
- `requestAnimationFrame` wrapper — deferred focus to avoid interfering with animations
- `isPlatformBrowser` guard — SSR-safe, no focus on server
- `shouldFocusTarget(target)` — checks `document.activeElement`; skips focus if another meaningful
  element already has focus (prevents stealing focus from dialogs)
- `resolveFocusTarget()` — uses `querySelector` on host with try/catch for invalid selectors
- DEV mode `console.warn` when target is not programmatically focusable
- `isProgrammaticallyFocusable(target)` — checks native focusable elements and `tabindex`

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — `shouldFocusTarget` early returns (VERIFY — CRITICAL)
`shouldFocusTarget` returns `false` when `activeElement === target` or when `target.contains(activeElement)`.
These cases correctly skip re-focus. However the method also returns `false` at the end of the
function (line 117) for cases where another focusable element already has focus — this means
AutoFocus yields to existing focus. Verify this is the intended behaviour and document it in README.

#### Issue 2 — Invalid `selector` fallback (VERIFY — MODERATE)
When `querySelector` throws (invalid CSS selector), the directive falls back to the host element.
Verify the DEV mode warning fires correctly and the test covers this path.

#### Issue 3 — No `tabindex` on host when unfocusable (MODERATE)
When applied to a non-focusable element (e.g. a `<div>` with no `tabindex`), focus silently fails.
The DEV mode warning is correct. Document the pattern explicitly in README:
```html
<!-- Correct: div needs tabindex="-1" for programmatic focus -->
<div uiLibAutoFocus tabindex="-1">…</div>
<!-- Correct: native input is always programmatically focusable -->
<input uiLibAutoFocus />
```

#### Issue 4 — `requestAnimationFrame` vs `setTimeout` (MODERATE — document)
`requestAnimationFrame` fires before paint, which can race with Angular zone stabilization in
zoneless apps. Consider whether `setTimeout(0)` or `afterNextRender` is more appropriate in an
Angular 17+ zoneless context. Document the choice in README.

#### Deliverable — `auto-focus.a11y.spec.ts` (aim 14–20 tests — extend existing)
- Element receives focus on mount
- `disabled=true`: element does NOT receive focus
- `selector` targets child element correctly
- Invalid selector: falls back to host, DEV warn fires
- Non-focusable host: DEV warn fires
- SSR guard: no focus when not browser (mock `isPlatformBrowser`)
- `shouldFocusTarget`: returns false when meaningful element already has focus
- axe: no accessibility violations introduced by the directive

---

### Phase 1 — Architecture Audit
- Verify `uiLibAutoFocus` is the correct directive selector name (matches export and README)
- `disabled` and `selector` use `input()` not `input.required()` — defaults are correct
- No subscriptions, no intervals — lifecycle-only implementation

### Phase 2 — DX Audit
README must explain:
- `disabled` input for conditional autofocus
- `selector` input pattern with examples
- `tabindex="-1"` requirement on non-native focusable hosts
- WCAG caveat: auto-focus should be used sparingly — only on modals, first form field
- How it interacts with dialog/focus-trap (defers to existing focus management)

### Phase 4 — Performance Audit
- Single `requestAnimationFrame` call — no ongoing subscriptions
- `isPlatformBrowser` check cached in constructor (not in `ngAfterViewInit`)

### Phase 5 — Composability Audit
- Works with Dialog initial focus field
- Works with Drawer initial focus
- Works with Popover inline form
- Works with standalone input in a page (common case)

### Phase 6 — Polish Audit
- [ ] DEV mode error is clear and actionable (includes host tag in message)
- [ ] Works correctly with Angular `@defer` blocks (lazy-loaded content)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/auto-focus/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/auto-focus/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add AutoFocus row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
