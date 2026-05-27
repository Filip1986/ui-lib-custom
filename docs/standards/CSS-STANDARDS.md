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
6. **Logical properties** — all directional spacing and border properties → enforced by stylelint (**error**)
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
| `property-disallowed-list`                       | Logical properties (physical props banned) | **error** |
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
- [ ] Logical properties used for all directional spacing, borders, and radius (no `margin-left`, `padding-right`, `border-left`, `border-top-left-radius`, etc.)
- [ ] Animations use only `transform`/`opacity`
- [ ] `prefers-reduced-motion` present for every animation
- [ ] `npm run lint:css` passes

*Last reviewed: 2026-05-27*

---

## Logical CSS / RTL layout

All library SCSS uses **CSS logical properties** instead of physical directional properties.
This enables full RTL layout support without any extra override CSS.

### Banned → logical replacements

| ❌ Physical (banned, severity: error)    | ✅ Logical (use this)                         |
|------------------------------------------|-----------------------------------------------|
| `margin-left` / `margin-right`           | `margin-inline-start` / `margin-inline-end`   |
| `padding-left` / `padding-right`         | `padding-inline-start` / `padding-inline-end` |
| `border-left` / `border-right`           | `border-inline-start` / `border-inline-end`   |
| `border-left-color` / `border-right-color` | `border-inline-start-color` / `border-inline-end-color` |
| `border-left-width` / `border-right-width` | `border-inline-start-width` / `border-inline-end-width` |
| `border-left-style` / `border-right-style` | `border-inline-start-style` / `border-inline-end-style` |
| `border-top-left-radius`                 | `border-start-start-radius`                   |
| `border-top-right-radius`               | `border-start-end-radius`                     |
| `border-bottom-left-radius`             | `border-end-start-radius`                     |
| `border-bottom-right-radius`            | `border-end-end-radius`                       |
| `text-align: left` / `text-align: right` | `text-align: start` / `text-align: end`       |

### Positioning (`left` / `right`)

These properties are **not in the banned list** because they have direction-agnostic uses
(e.g. `left: 50%` for centering). Apply judgment:

```scss
// ✅ Direction-agnostic centering — keep left: 50%
.uilib-tooltip {
  left: 50%;
  transform: translateX(-50%);
}

// ❌ Directional positioning — use inset-inline-*
.uilib-sidebar-toggle {
  left: 0;   // ← this means "start side"
}

// ✅ Correct
.uilib-sidebar-toggle {
  inset-inline-start: 0;
}
```

### Block-axis properties

`top`, `bottom`, `margin-top`, `margin-bottom`, `padding-top`, `padding-bottom` are
block-axis and are **not banned** — they behave consistently regardless of writing direction.

### `inset` shorthand

Use `inset: 0` freely for "fill parent" overlays:

```scss
// ✅ Equivalent to top:0; right:0; bottom:0; left:0 and works in all writing modes
.uilib-overlay { position: absolute; inset: 0; }
```

### Testing RTL

Add `dir="rtl"` to `<html>` in the demo app to smoke-test RTL layout:

```html
<html lang="ar" dir="rtl">
```

All components should mirror correctly without any additional CSS.

Full conventions and examples: [`LIBRARY_CONVENTIONS.md → Logical CSS / RTL Rule`](../../LIBRARY_CONVENTIONS.md).

---

## See also

| Document | Why it relates |
|----------|----------------|
| [`JS-STANDARDS.md`](JS-STANDARDS.md) | Runtime animation rules + layout thrashing under `ViewEncapsulation.None` |
| [`HTML-STANDARDS.md`](HTML-STANDARDS.md) | Template rules that interact with global CSS under `ViewEncapsulation.None` |
| [`platform/docs/standards/CSS-STANDARDS.md`](../../../platform/docs/standards/CSS-STANDARDS.md) | Full reference with complete rationale and examples |
