# Icon — 6-Phase Hardening Prompt

**Component:** `ui-lib-custom/icon` · `<ui-lib-icon>`
**Queue position:** Utilities (new — not in original 76-item queue)
**Updated:** 2026-05-15
**Key a11y concern:** Decorative vs. informative icons. Decorative: `aria-hidden="true"` (the
default). Informative (standalone): `ariaLabel` input removes `aria-hidden` and sets `aria-label`
+ `role="img"`. Icon already has `icon.a11y.spec.ts` — read it before extending.

---

## Step 1 — Read these files before doing anything else

1. `AI_AGENT_CONTEXT.md`, `LIBRARY_CONVENTIONS.md`, `docs/VISION.md`, `docs/COMPONENT_SCORES.md`
2. `projects/ui-lib-custom/src/lib/icon/README.md`
3. Full source: `icon.ts`, `icon.html`, `icon.scss`, `icon.spec.ts`, `icon.a11y.spec.ts`,
   `icon.types.ts`, `icon.semantics.ts`, `icon.service.ts`, `icon.tokens.ts`,
   `icon.providers.ts`, `presets/` folder
4. Hardened siblings: `icon-button/icon-button.ts`

---

## Step 2 — What is already present (do NOT regress these)

The implementation is **fully featured** — the audit focuses on coverage and docs gaps:

- `name: InputSignal<string | SemanticIcon>` — `input.required` — accepts semantic name or raw
  icon name; `ICON_NAME_ALIASES` map provides common aliases (`plus` → `add`, `trash` → `delete`)
- `ariaLabel: InputSignal<string | null>` — when provided: enables informative mode
- `ariaLabelResolved` computed: trims label, returns `null` for empty strings
- `ariaRole` computed: `'img'` when `ariaLabelResolved()` is set, `null` otherwise
- `ariaHidden` computed: `'true'` when no label, `null` when label present
- `tabindex="-1"` hard-coded on host — icon is never focusable
- `size: InputSignal<IconSize>` — `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `color: InputSignal<string | null>` → `--uilib-icon-color` CSS var
- `library: InputSignal<IconLibrary | null>` — override icon library per instance
- `semantic: InputSignal<boolean>` — force semantic resolution
- `clickable: InputSignal<boolean>` — styling hint (no interaction logic — intentional)
- Uses `NgIcon` from `@ng-icons/core` for actual SVG rendering  
- `IconService` resolves semantic names to library-specific icon names based on active library

---

## Step 3 — The 6-phase workflow

### Phase 3 first — Accessibility Audit

#### Issue 1 — DEV mode warning for `clickable` without `ariaLabel` (CRITICAL)
The `clickable` input adds hover/cursor styling but the icon itself has `tabindex="-1"` and is
never interactive. This is correct — the PARENT is the interactive element. However, if a consumer
mistakenly uses `<ui-lib-icon [clickable]="true">` without wrapping it in a button/link, it creates
a pointer-only interactive element. Add a DEV mode warning:

```typescript
if (isDevMode() && this.clickable() && !this.ariaLabel()) {
  console.warn(
    '[ui-lib-icon] clickable=true should only be used inside a button or link. ' +
    'The icon itself is not interactive. Provide an ariaLabel if the icon is truly standalone informative.'
  );
}
```

#### Issue 2 — `ariaLabel` whitespace-only input (VERIFY)
`ariaLabelResolved` trims the label and returns `null` for empty strings. Verify it also handles
whitespace-only strings (e.g. `ariaLabel="   "`). The current `trimmedAriaLabel.length > 0` check
SHOULD handle this — confirm test coverage.

#### Issue 3 — SVG `focusable="false"` in NgIcon (MODERATE)
IE11 makes SVG elements focusable by default. Even though IE11 is dead, `focusable="false"` on the
inner `<svg>` is a best-practice that some mobile browsers need. Verify `NgIcon` sets this or that
the rendered SVG does not appear in the focus order.

#### Issue 4 — Empty `<title>` in SVG (MODERATE)
When rendered in informative mode, the SVG `<title>` element (if present from NgIcon) should match
the `ariaLabel` OR be empty and suppressed (with the host `aria-label` + `role="img"` providing
the name). Verify there is no double-announcement.

#### Deliverable — `icon.a11y.spec.ts` (aim 15–20 tests — extend existing file)
- Default: `aria-hidden="true"`, no `role`, no `aria-label`
- With `ariaLabel="Star rating"`: `aria-label="Star rating"`, `role="img"`, `aria-hidden` absent
- Whitespace ariaLabel treated as empty (informative mode disabled)
- `tabindex` is `-1` — not in tab order
- `clickable=true` without `ariaLabel`: DEV mode console.warn fired
- Semantic name resolution: verify `name="close"` resolves without throwing
- Alias resolution: `name="trash"` resolves to `delete` semantic
- axe passes: decorative mode, informative mode (with ariaLabel)

---

### Phase 1 — Architecture Audit
- `ICON_NAME_ALIASES` const object — confirm all aliases are correct and documented
- `ICON_LIBRARY_PREFIX` record — list all supported libraries in README
- `hasKnownPrefix` utility — verify it covers all `ICON_LIBRARY_PREFIX` values
- `IconService.resolveIcon` / `resolveLibrary` — verify graceful fallback when unknown icon name

### Phase 2 — DX Audit
README must explain:
- Decorative vs. informative modes — with code examples
- Semantic icon names list (link to `icon.semantics.ts`)
- Library selection and override via `library` input
- All size tokens and their pixel equivalents
- `clickable` input purpose (styling-only — parent must be interactive)

### Phase 4 — Performance Audit
- `resolvedName`, `resolvedSize`, `ariaLabelResolved`, `ariaRole`, `ariaHidden` — all
  `computed<T>()` — verify explicit return types on all
- `IconService` is `inject()`-based — one instance per `provideIcons()` scope

### Phase 5 — Composability Audit
- Works inside Button (icon-only label flow), MenuItem, Tab, Chip, Badge, Tag
- Works inside IconButton (ariaLabel lives on the button, icon is aria-hidden)
- Works as standalone informative icon with `ariaLabel`

### Phase 6 — Polish Audit
- [ ] Icon size uses `em` unit for proportional scaling with surrounding text
- [ ] `--uilib-icon-color` falls back to `currentColor` when not set
- [ ] All SEMANTIC_ICONS entries are present across all supported icon libraries (Material, Bootstrap, Heroicons)

---

## Step 4 — Commands

```bash
node_modules/.bin/eslint projects/ui-lib-custom/src/lib/icon/ --max-warnings 0
node_modules/.bin/jest --testPathPatterns="src/lib/icon/" --no-coverage
node_modules/.bin/ng build ui-lib-custom
node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage
```

## Step 5 — Scoring and Step 6 — Handoff
After all phases, add Icon row to `docs/COMPONENT_SCORES.md` and append handoff to
`AI_AGENT_CONTEXT.md`.
