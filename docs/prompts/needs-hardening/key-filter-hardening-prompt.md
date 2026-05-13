# KeyFilter — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/key-filter` · directive
**Queue position:** Core Inputs (new — not in original 76-item queue)
**Generated:** 2026-05-13
**Key a11y concern:** Silently blocked keys must be communicated to screen reader users via `aria-describedby` hint; do NOT let invalid keystrokes silently vanish.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/key-filter/README.md`
3. Full source: `key-filter.ts` (directive), `key-filter.spec.ts`
4. Hardened siblings: `input/input.ts` (aria-describedby pattern)

---

## Step 2 — What is already present (do NOT regress these)

- Keydown/keypress event filtering — VERIFY
- Allowed patterns/regex input — VERIFY
- Format hint via aria-describedby — VERIFY
- prefers-reduced-motion (N/A for directive, skip)

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — Silent keystroke blocking (CRITICAL)
Screen reader users MUST know what characters are allowed. When a keystroke is blocked:
1. Do NOT silently swallow the key with no feedback.
2. Prefer a visible hint below the input stating the allowed format (e.g., "Numbers only").
3. The hint element is linked to the input via `aria-describedby`.

**Fix:** Add a `hintText` input to the directive. When set, inject a visually hidden (or visible)
hint span adjacent to the host element and set `aria-describedby` on the host input to point to it.

#### Issue 2 — Do not remove characters after pasting (CRITICAL for a11y)
If the directive strips characters on paste, announce the change via a live region:
```
Characters not matching the allowed pattern were removed.
```

#### Issue 3 — Allowed format documentation in README (MODERATE)
The a11y fix is useless without a developer being told about it. Document the `hintText` input
and include a usage example showing it properly set.

#### Deliverable — `key-filter.a11y.spec.ts` (aim 15–20 tests)
- Allowed keys pass through
- Blocked keys are prevented
- aria-describedby on host input points to hint element when hintText is set
- Paste: blocked characters cause a live region announcement

---

### Phase 1 — Architecture Audit
- Directive is standalone, applied to any `<input>` or compatible host
- `pattern` / `regex` / `allowedChars` input types reviewed for consistency

### Phase 2 — DX Audit
README: table of built-in presets (alpha, numeric, alphanumeric), custom regex usage, `hintText` input.

### Phase 4 — Performance Audit
- Event listener added in `ngAfterViewInit`, removed in `ngOnDestroy`
- No allocation on every keydown

### Phase 5 — Composability Audit
- Works on native `<input>`, `ui-lib-input`, `ui-lib-input-mask`

### Phase 6 — Polish Audit
- [ ] DEV_MODE warning when both `pattern` and `regex` are set

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/key-filter/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/key-filter/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add KeyFilter row to `docs/COMPONENT_SCORES.md` and append handoff to `AI_AGENT_CONTEXT.md`.
