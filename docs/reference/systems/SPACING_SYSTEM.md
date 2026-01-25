# Spacing System

A practical guide to the library’s spacing primitives built on a 4px base unit. All values are exposed as CSS custom properties and TypeScript tokens for consistent layouts.

## Overview
- **Base unit:** 4px (0.25rem). All spacing tokens are multiples of this unit.
- **Scales provided:** numeric (1 → 4px, 2 → 8px, 4 → 16px, 6 → 24px, 8 → 32px, 12 → 48px) and t-shirt aliases (`xs`–`2xl`).
- **Patterns:** Five semantic patterns map the base scale to common UI needs: **Inset**, **Squish**, **Stretch**, **Stack**, **Inline**.
- **Usage:** Apply the CSS vars directly (preferred) or consume the TS exports from `design-tokens.ts`.

## Visual diagram (conceptual)
```
Inset   : [ ██████ content ██████ ]         (equal padding on all sides)
Squish  : [ ████ content █████████ ]        (horizontal > vertical)
Stretch : [ █████████ content ████ ]        (vertical > horizontal)
Stack   : item1
          ↕ (gap)
          item2                              (vertical spacing between stacked items)
Inline  : item ▷▷ item ▷▷ item               (horizontal spacing between inline items)
```

## Token reference
| Pattern | Token (CSS var)          | Alias | Pixels | Rem  | Common use cases |
|---------|--------------------------|-------|--------|------|------------------|
| inset   | `--uilib-inset-xs`       | xs    | 4px    | 0.25 | Tight chips, badges |
| inset   | `--uilib-inset-sm`       | sm    | 8px    | 0.5  | Small cards, compact sections |
| inset   | `--uilib-inset-md`       | md    | 16px   | 1    | Default card body, panels |
| inset   | `--uilib-inset-lg`       | lg    | 24px   | 1.5  | Spacious cards, modals |
| inset   | `--uilib-inset-xl`       | xl    | 32px   | 2    | Hero panels, page gutters |
| squish  | `--uilib-squish-xs`      | xs    | 4px 8px| 0.25 0.5 | Tiny pills, badges |
| squish  | `--uilib-squish-sm`      | sm    | 8px 16px| 0.5 1 | Small buttons |
| squish  | `--uilib-squish-md`      | md    |16px 32px| 1 2 | Default buttons, chips |
| squish  | `--uilib-squish-lg`      | lg    |24px 48px|1.5 3| Large buttons |
| squish  | `--uilib-squish-xl`      | xl    |32px 64px|2 4 | CTA buttons |
| stretch | `--uilib-stretch-xs`     | xs    | 8px 4px |0.5 0.25| Inputs with minimal padding |
| stretch | `--uilib-stretch-sm`     | sm    |16px 8px |1 0.5| Default inputs, selects |
| stretch | `--uilib-stretch-md`     | md    |32px16px |2 1 | Tall inputs, textareas |
| stretch | `--uilib-stretch-lg`     | lg    |48px24px |3 1.5| Hero search bars |
| stretch | `--uilib-stretch-xl`     | xl    |64px32px |4 2 | Large promo forms |
| stack   | `--uilib-stack-xs`       | xs    | 4px    |0.25 | Dense vertical lists |
| stack   | `--uilib-stack-sm`       | sm    | 8px    |0.5  | Form field spacing (compact) |
| stack   | `--uilib-stack-md`       | md    | 16px   |1    | Default field spacing |
| stack   | `--uilib-stack-lg`       | lg    | 24px   |1.5  | Section spacing inside cards |
| stack   | `--uilib-stack-xl`       | xl    | 32px   |2    | Between page sections |
| inline  | `--uilib-inline-xs`      | xs    | 4px    |0.25 | Icon + label gaps |
| inline  | `--uilib-inline-sm`      | sm    | 8px    |0.5  | Button icon/text gap |
| inline  | `--uilib-inline-md`      | md    | 16px   |1    | Toolbar gaps |
| inline  | `--uilib-inline-lg`      | lg    | 24px   |1.5  | Multi-action groups |
| inline  | `--uilib-inline-xl`      | xl    | 32px   |2    | Large hero actions |

> Note: Squish/Stretch values are shown as `vertical horizontal` (CSS shorthand).

## Component spacing guidelines
- **Buttons:** Use `--uilib-squish-sm` to `--uilib-squish-lg` (maps to size small/medium/large). Default buttons use squish-md.
- **Cards:** Use `--uilib-inset-md` for body padding; increase to `--uilib-inset-lg`/`xl` for hero or marketing cards. Headers/footers often use `--uilib-inset-sm`.
- **Forms:** Use `--uilib-stack-md` between fields. For compact density, rely on the density data attribute to scale vertical padding.
- **Inline items:** Use `--uilib-inline-sm` for icon+text or control clusters; `--uilib-inline-md` for toolbars.
- **Tables & lists:** Set row/list padding via density-aware vars (`--uilib-table-row-height`, `--uilib-list-item-padding-y`).

## Do’s and Don’ts
**Do**
- Use CSS vars (`--uilib-*`) rather than hardcoded px.
- Scope overrides with `data-theme` or `data-density` to avoid global conflicts.
- Keep touch targets ≥44px tall; pair padding with `min-height` where relevant.

**Don’t**
- Mix unrelated units (px/rem) in the same component — prefer rem and tokens.
- Override only one axis of squish/stretch without intention; keep proportions unless you have a specific reason.
- Hardcode spacing in components; instead, set component-level vars (e.g., `--uilib-button-padding-*`).

## Code examples
### Button padding with squish tokens
```scss
.my-cta {
  padding: var(--uilib-squish-lg);
  gap: var(--uilib-inline-sm);
}
```

### Card layout with inset and stack spacing
```scss
.card {
  padding: var(--uilib-inset-md);
}
.card + .card {
  margin-top: var(--uilib-stack-lg);
}
```

### Form field spacing using stack
```scss
.form-fields {
  display: grid;
  row-gap: var(--uilib-stack-md);
}
```

### Inline toolbar spacing
```scss
.toolbar {
  display: flex;
  align-items: center;
  gap: var(--uilib-inline-md);
  padding: var(--uilib-stretch-sm);
}
```

### Overriding spacing for a dense region
```css
[data-density="compact"] .filters {
  --uilib-stack-md: 0.75rem; /* optional override on top of density scaling */
}
```

## Where to find these tokens
- TypeScript exports: `projects/ui-lib-custom/src/lib/design-tokens.ts`
- CSS variables (light/dark): `projects/ui-lib-custom/src/lib/themes/themes.css`
- Component defaults: see button/input/card styles for how component-level vars consume spacing tokens.
