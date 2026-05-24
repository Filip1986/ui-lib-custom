# ADR — CSS Cascade Layers (`@layer`) Adoption

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-05-24 |
| **Deciders** | Core maintainer |
| **Supersedes** | — |

---

## Context

Prior to this ADR, `ui-lib-custom` component styles were written as regular, unlayered CSS rules.
This created a common pain point for consumers: overriding any library style required matching or
exceeding the library's selector specificity — often forcing the use of `!important` or highly
nested selectors that were fragile to maintain.

**The root problem:** CSS specificity is a global war. When the library uses `.ui-lib-button.ui-lib-button--primary`
(specificity `(0,2,0)`), the consumer needs at least `(0,2,0)` to win. Libraries and consumers
endlessly escalate specificity against each other.

---

## Decision

Adopt **CSS Cascade Layers** (`@layer`) across the entire library.

### Layer namespace

All library styles are placed inside a three-level `uilib` namespace:

```css
/* Declared once in themes.scss — the authoritative source of truth */
@layer uilib.base, uilib.tokens, uilib.components;
```

| Sub-layer | Priority | Contents | File(s) |
|---|---|---|---|
| `uilib.base` | Lowest | Reserved for consumer CSS resets / normalizations | Consumer `styles.scss` |
| `uilib.tokens` | Middle | Global design tokens (CSS custom properties on `:root`, `[data-theme]`, `[data-density]`, typography mapping) | `themes.scss` |
| `uilib.components` | Highest (among layers) | Every component SCSS file (host tokens, structural styles, variant overrides) | All `*.scss` under `src/lib/**` except `high-contrast.scss` |

### The consumer reset pattern

Any app-level CSS reset (`* { margin: 0; padding: 0 }`) **must** be placed in `@layer uilib.base`:

```css
/* Consumer styles.scss — correct pattern */
@layer uilib.base {
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}
```

**Why this matters:** Before `@layer` adoption, a universal selector `*` with specificity `(0,0,0)` naturally lost to component class selectors `(0,1,0)`. After `@layer` adoption, any **unlayered** CSS beats all layered styles regardless of specificity — so `* { padding: 0 }` would zero out every component's padding. Wrapping the reset in `uilib.base` (the lowest-priority layer) restores the original behavior.

App-level `html` / `body` overrides that are **intentional** consumer overrides (global font-family, background colour) should remain **unlayered** so they beat all library defaults.

### Exception: high-contrast.scss

`projects/ui-lib-custom/src/lib/styles/high-contrast.scss` contains `@media (forced-colors: active)`
overrides. This file is intentionally kept **outside** any `@layer` so its accessibility overrides
unconditionally win over all layered styles, including consumer layers.

---

## Consequences

### Positive

**1. Zero-specificity-cost theming**
Any consumer CSS written outside a `@layer` automatically beats `@layer uilib.components`,
regardless of how the library selectors are written. A consumer can override a deeply nested
library rule with a single class selector — no specificity escalation needed.

```css
/* Consumer file — no @layer wrapper */

/* This single-class selector beats .ui-lib-button.ui-lib-button--primary { } in the library */
.my-primary-cta {
  --uilib-button-bg: #0052cc;
}
```

**2. No more `!important` escape hatch**
Before layers, `!important` was the only reliable way to override high-specificity library rules.
With layers, `!important` inside a layer is beaten by any `!important` outside a layer, and
non-`!important` outside a layer beats `!important` inside a layer. Consumer CSS no longer needs
`!important` at all for overrides.

**3. Consumer layer interop**
Consumers who adopt their own `@layer` architecture can place the library's tokens and component
styles at the correct layer priority:

```css
/* Consumer that also uses @layer */
@layer my-base, uilib.tokens, uilib.components, my-components, my-overrides;
```

The library's layers slot in naturally because they were already declared with the `uilib.*`
namespace — no conflicts.

**4. Isolation from third-party styles**
If a consumer also loads PrimeNG, Bootstrap, or any other unlayered CSS, those styles would
previously fight the library at specificity level. Now the library's styles are in a named layer,
so any unlayered third-party styles beat the library (by default, which is fine — the consumer
controls the final outcome by wrapping third-party styles in their own layer if needed).

### Neutral

- **Browser support:** `@layer` is supported in all modern browsers (Chrome 99+, Firefox 97+,
  Safari 15.4+). Angular CLI consumers using differential loading will already be on modern builds.
  Older browsers silently ignore the `@layer` wrapper and treat the styles as regular unlayered
  CSS — full backward compatibility.

- **No re-indentation:** The `@layer` wrappers were added as outermost lines; existing content
  indentation was not changed. This keeps diffs clean for the initial adoption commit.

- **`@keyframes` inside `@layer`:** Animations defined with `@keyframes` inside `@layer` are
  scoped to that layer in modern browsers. The animations still function correctly — the scoping
  only matters if a consumer tries to reference a library `@keyframes` name from outside a layer,
  which is not a supported use case.

### Risks and Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Consumer unlayered CSS unintentionally overrides library styles | Medium (this is actually the desired default behavior; some consumers may be surprised) | Document clearly in theming guide: "All library styles are inside `@layer uilib.*`; any CSS you write outside a layer will override library styles." |
| Old browser receiving garbled styles | Very low | `@layer` is a graceful degradation feature; browsers that don't support it ignore the at-rule and treat the content as regular CSS. All supported Angular versions target modern browsers. |
| `@keyframes` name collisions with consumer | Very low | All library keyframe names are prefixed with `uilib-*` (e.g. `uilib-scroller-spin`, `uilib-progress-spin`). |

---

## Implementation Notes

### themes.scss — layer declaration + token layer

```scss
/* Authoritative layer order declaration */
@layer uilib.tokens, uilib.components;

@layer uilib.tokens {
  /* All :root token declarations, light/dark overrides, density selectors, typography mapping */
  :root { ... }
  [data-theme='dark'] { ... }
  ...
} // end @layer uilib.tokens
```

### Component SCSS files — component layer wrapper

Every component `.scss` file (103 files as of this ADR) is wrapped:

```scss
@layer uilib.components {
// ... existing file content unchanged, no re-indentation ...
} // end @layer uilib.components
```

The wrapper is added as the outermost block. All existing SCSS rules, host-element selectors,
BEM modifiers, `@keyframes`, and `@media` queries remain at their original indentation level.

### Authoring rule going forward

All new component SCSS files MUST be wrapped in `@layer uilib.components { }`.
See `LIBRARY_CONVENTIONS.md → CSS Cascade Layer Rule`.

---

## Alternatives Considered

### Alt A — Specificity discipline (no layers)

Manually keep library selector specificity at `(0,1,0)` (one class) or lower everywhere.
This is fragile: state modifiers (`--disabled`, `--focused`) and variant selectors
(`ui-lib-button.ui-lib-button--primary`) naturally produce `(0,2,0)`, requiring consumers to match.
Maintaining artificially low specificity across 100+ components is impractical.

**Rejected:** cannot be maintained reliably as the component count grows.

### Alt B — Shadow DOM / `ViewEncapsulation.Emulated`

Shadow DOM (or Angular's emulated encapsulation) isolates styles completely.
Pros: no specificity leakage. Cons: CSS custom properties and global token overrides stop
cascading into Shadow DOM without explicit CSS Parts (`::part()`); the library's core theming
mechanism (`--uilib-*` variables set on `:root`) would break.

**Rejected:** incompatible with the CSS-variable-driven theming architecture.

### Alt C — CSS-in-JS

Replace SCSS with a runtime CSS-in-JS solution (emotion, stitches, etc.).
This would require replacing Angular's build pipeline, adding runtime overhead, and abandoning
the existing ~100 SCSS files. Outside scope.

**Rejected:** too invasive; incompatible with the library's Angular-native philosophy.

---

## References

- [CSS Cascade Layers — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [Cascade layers — CSS specification (W3C)](https://www.w3.org/TR/css-cascade-5/#layering)
- [Browser support — caniuse.com](https://caniuse.com/css-cascade-layers)
- `LIBRARY_CONVENTIONS.md → CSS Cascade Layer Rule` (authoring rules for contributors)
- `projects/ui-lib-custom/src/lib/themes/themes.scss` (layer declaration source of truth)
