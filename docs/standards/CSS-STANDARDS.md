# CSS / SCSS Standards — ui-lib-custom

> **Full rationale and examples:** See [`platform/docs/standards/CSS-STANDARDS.md`](../../../platform/docs/standards/CSS-STANDARDS.md) for the complete reference.
> This document covers the project-specific rules and adaptations.
> Machine enforcement: [`stylelint.config.mjs`](../../stylelint.config.mjs) — rules link to sections below.

---

## Critical difference from platform

This library uses **`ViewEncapsulation.None`** on every component. All styles are **global** by default.
BEM naming with the `uilib-` prefix is the only collision guard. There is no Angular encapsulation to fall back on.

| Rule                                   | Reason                                                   |
|----------------------------------------|----------------------------------------------------------|
| Every class must start with `uilib-`   | Prevents collision with consumer styles                  |
| BEM is non-negotiable                  | Provides the structure that encapsulation normally would |
| `::ng-deep` rule does not apply        | Styles are already global — the concept is irrelevant    |

---

## Token system

This project's design tokens use the `--uilib-*` CSS custom property prefix, defined in `design-tokens.ts` and consumed via SCSS.

```scss
// ✅ Always use tokens
color:      var(--uilib-color-primary);
background: var(--uilib-surface);
font-size:  var(--uilib-text-md);
gap:        var(--uilib-space-md);

// ❌ Never raw values
color:      #2563eb;
background: #ffffff;
font-size:  16px;
```

### New tokens — use oklch

```scss
// ❌ Old — hex is non-perceptual
--uilib-color-primary: #2563eb;

// ✅ Modern — lightness is predictable; dark mode is just a different L value
--uilib-color-primary:       oklch(57% 0.24 264);
--uilib-color-primary-hover: oklch(48% 0.24 264);

// ✅ Dynamic variants with color-mix
.uilib-button:disabled {
  background: color-mix(in oklch, var(--uilib-color-primary) 50%, transparent);
}
```

---

## Non-negotiable rules

1. **No raw colour or size values** — always `var(--uilib-*)` → enforced by stylelint (error)
2. **Nesting depth ≤ 2** → enforced by stylelint (error)
3. **No ID selectors** → enforced by stylelint (error)
4. **No `transition: all`** → enforced by stylelint (error)
5. **`@media (prefers-reduced-motion: reduce)`** on every animated component
6. **Logical properties** for all new spacing (`margin-inline-*`, `padding-block-*`) → enforced by stylelint (warning)
7. **Animate only `transform` and `opacity`** → enforced by stylelint (warning)

---

## Modern CSS features to use

### Container queries — mandatory for library components

Library components MUST use container queries, not viewport media queries. Consumers place components anywhere — viewports are irrelevant.

```scss
.uilib-card {
  container-type: inline-size;
}

@container (min-width: 480px) {
  .uilib-card__body {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Subgrid — for compound components

```scss
// Card list where header, body, footer align across columns
.uilib-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.uilib-card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;  // headers/bodies/footers align across all cards
}
```

### :has() — relational logic without JS

```scss
// Form group highlights when it contains an invalid field
.uilib-form-group:has(input:invalid) {
  --uilib-input-border-color: var(--uilib-color-error);
}

// Button removes gap when it has no text (icon-only)
.uilib-button:has(.uilib-button__icon:only-child) {
  padding-inline: var(--uilib-space-sm);
}
```

### clamp() — fluid sizing, fewer breakpoints

```scss
font-size: clamp(var(--uilib-text-sm), 1.5vw + 0.5rem, var(--uilib-text-lg));
```

---

## Linting

```bash
npm run lint:css        # check all SCSS/CSS
npm run lint:css:fix    # auto-fix what's possible  
npm run lint:css:ci     # CI mode — zero warnings

npm run check           # full quality gate (includes CSS lint)
```

Pre-commit: `lint-staged` runs stylelint on every staged `.scss`/`.css` file automatically.

### Rule → section

| Rule                                             | Enforces                                  | Severity |
|--------------------------------------------------|-------------------------------------------|----------|
| `selector-max-id: 0`                             | No ID selectors                           | error    |
| `max-nesting-depth: 2`                           | No deep nesting                           | error    |
| `scale-unlimited/declaration-strict-value`       | Token-only colours/sizes                  | error    |
| `declaration-property-value-disallowed-list`     | No `transition:all`, no `text-align:left` | error    |
| `plugin/no-low-performance-animation-properties` | GPU-only animations                       | warning  |
| `property-disallowed-list`                       | Logical properties                        | warning  |
| `scss/no-global-function-names`                  | No `darken()`/`lighten()`                 | error    |

---

## Review checklist

- [ ] No raw colour/size values — all from `--uilib-*` tokens
- [ ] New tokens in `oklch()` not hex
- [ ] `ViewEncapsulation.None` — all classes start with `uilib-`
- [ ] BEM naming throughout
- [ ] Nesting depth ≤ 2
- [ ] No ID selectors
- [ ] Container queries used (not `@media (min-width)`) for component layout
- [ ] Logical properties for all new spacing
- [ ] Animations use only `transform`/`opacity`
- [ ] `prefers-reduced-motion` present for every animation
- [ ] `npm run lint:css` passes

*Last reviewed: 2026-05-24*

---

## See also

| Document | Why it relates |
|----------|----------------|
| [`JS-STANDARDS.md`](JS-STANDARDS.md) | Runtime animation rules + layout thrashing under `ViewEncapsulation.None` |
| [`HTML-STANDARDS.md`](HTML-STANDARDS.md) | Template rules that interact with global CSS under `ViewEncapsulation.None` |
| [`platform/docs/standards/CSS-STANDARDS.md`](../../../platform/docs/standards/CSS-STANDARDS.md) | Full reference with complete rationale and examples |
