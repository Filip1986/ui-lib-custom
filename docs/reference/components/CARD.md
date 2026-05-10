# Card Component

## Overview

A flexible card container with optional header, subtitle, and footer slots, elevation levels, and variant styling. Supports per-card scoped theming via the `theme` input without any provider setup.

**Selector:** `ui-lib-card`
**Package:** `ui-lib-custom/card`

```typescript
import { Card } from 'ui-lib-custom/card';
```

---

## Features

- Signal-powered inputs for reactive updates
- CSS-variable theming with design-token fallbacks
- Three visual variants: `material`, `bootstrap`, `minimal`
- Elevation tokens: `none`, `low`, `medium`, `high`
- Four content projection slots: header, rich subtitle, body, footer
- Optional closable header with `closed` output
- Per-card scoped theme via `theme` input (no provider required)

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `CardVariant \| null` | `null` | Visual style; inherits from `ThemeConfigService` when null |
| `elevation` | `CardElevation` | `'medium'` | Shadow depth token |
| `bordered` | `boolean` | `false` | Adds a visible border |
| `hoverable` | `boolean` | `false` | Adds hover highlight; makes the card keyboard-activatable as a button |
| `showHeader` | `boolean \| null` | `null` | Hides the header section when explicitly set to `false` |
| `showFooter` | `boolean \| null` | `null` | Hides the footer section when explicitly set to `false` |
| `shadow` | `string \| null` | `null` | Inline override for `--uilib-card-shadow` |
| `headerBg` | `string \| null` | `null` | Inline override for `--uilib-card-header-bg` |
| `footerBg` | `string \| null` | `null` | Inline override for `--uilib-card-footer-bg` |
| `headerIcon` | `SemanticIcon \| string \| null` | `null` | Icon shown at the start of the header row |
| `closable` | `boolean` | `false` | Shows a close button in the header; emits `closed` on click |
| `subtitle` | `string \| null` | `null` | Plain-text subtitle rendered below the header slot; use `[card-subtitle]` when rich HTML markup is needed |
| `ariaLabel` | `string \| null` | `null` | Accessible label; meaningful only when `hoverable` is true |
| `theme` | `ThemeScopeInput \| null` | `null` | Scoped theme override: pass `'light'` / `'dark'` as a shorthand, or a `ThemeScopeConfig` object for full control |

### Outputs

| Output | Payload | Description |
|---|---|---|
| `closed` | `void` | Emitted when the close button is clicked; only present when `[closable]="true"` |

### Types

```typescript
type CardVariant   = 'material' | 'bootstrap' | 'minimal';
type CardElevation = 'none' | 'low' | 'medium' | 'high';

// ThemeScopeInput accepts a string shorthand or a config object:
type ThemeScopeInput = 'light' | 'dark' | ThemeScopeConfig | null;

interface ThemeScopeConfig {
  colorScheme?: 'light' | 'dark';    // sets data-theme attribute
  preset?: ThemePreset;               // full preset to apply
  colors?: Partial<ThemePresetColors>; // partial color overrides
  variant?: ThemeVariant;             // variant override
  variables?: Record<string, string>; // raw CSS variable overrides
}
```

---

## Content Projection Slots

Cards project content using attribute selectors:

| Slot | Selector | Notes |
|---|---|---|
| Title | `[card-header]` | Projected into the header title area |
| Rich subtitle | `[card-subtitle]` | Projected below the title; use when the `subtitle` input is insufficient (e.g. inline `<code>` tags) |
| Body | _(default)_ | Projected into the card body |
| Footer | `[card-footer]` | Projected into the footer bar; hidden when `[showFooter]="false"` |

> `subtitle` input and `[card-subtitle]` slot are mutually exclusive — if both are provided, the slot takes precedence.

---

## Usage

### Basic card with header and body

```html
<ui-lib-card variant="material" [bordered]="true">
  <span card-header>Card Title</span>
  <p>Body content goes here.</p>
</ui-lib-card>
```

### Plain-text subtitle via input

```html
<ui-lib-card subtitle="Secondary description">
  <span card-header>Card Title</span>
  <p>Body content.</p>
</ui-lib-card>
```

### Rich subtitle with inline markup via slot

```html
<ui-lib-card>
  <span card-header>Appearances</span>
  <span card-subtitle>
    Use <code>appearance</code> to switch between <code>solid</code>, <code>outline</code>, and <code>ghost</code>.
  </span>
  <p>Body content.</p>
</ui-lib-card>
```

### Closable card with footer

```html
<ui-lib-card [closable]="true" (closed)="onClose()">
  <span card-header>Dismissible</span>
  Main content.
  <span card-footer>Footer text</span>
</ui-lib-card>
```

### Variant and elevation

```html
<ui-lib-card variant="bootstrap" elevation="high" [bordered]="true">
  <span card-header>Bootstrap Card</span>
  Content
</ui-lib-card>
```

### Hoverable minimal

```html
<ui-lib-card variant="minimal" [hoverable]="true" ariaLabel="Open profile">
  <span card-header>Minimal</span>
  Click me
</ui-lib-card>
```

---

## Scoped Theming

The `theme` input applies CSS variables and data attributes directly on the card's host element, enabling per-card theme overrides without a provider. Two forms are supported:

**String shorthand** — switches color scheme only:

```html
<!-- Dark card on a light page -->
<ui-lib-card theme="dark">
  <span card-header>Dark Card</span>
  <p>This card renders in dark mode regardless of the page theme.</p>
</ui-lib-card>
```

**Config object** — full per-card control:

```typescript
import type { ThemeScopeInput } from 'ui-lib-custom/theme';

brandCardTheme: ThemeScopeInput = {
  colors: { primary: '#ff5722' }
};

darkCardTheme: ThemeScopeInput = {
  colorScheme: 'dark'
};
```

```html
<!-- Custom brand colors scoped to this card -->
<ui-lib-card [theme]="brandCardTheme">
  <ui-lib-button>Orange button</ui-lib-button>
</ui-lib-card>

<!-- Raw CSS variable overrides -->
<ui-lib-card [theme]="{ variables: { '--uilib-card-bg': '#1a1a2e' } }">
  <span card-header>Custom</span>
</ui-lib-card>
```

---

## Theming & CSS Variables

| Variable | Purpose |
|---|---|
| `--uilib-card-bg` | Card background |
| `--uilib-card-text-color` | Card text color |
| `--uilib-card-border` | Card border color |
| `--uilib-card-border-width` | Border width |
| `--uilib-card-radius` | Card border radius |
| `--uilib-card-header-padding` | Header area padding |
| `--uilib-card-body-padding` | Body area padding |
| `--uilib-card-footer-padding` | Footer area padding |
| `--uilib-card-header-bg` | Header background |
| `--uilib-card-footer-bg` | Footer background |
| `--uilib-card-shadow` | Base shadow |
| `--uilib-card-shadow-hover` | Shadow on hover |
| `--uilib-card-shadow-none` | Shadow for `elevation="none"` |
| `--uilib-card-shadow-low` | Shadow for `elevation="low"` |
| `--uilib-card-shadow-medium` | Shadow for `elevation="medium"` |
| `--uilib-card-shadow-high` | Shadow for `elevation="high"` |

---

## Accessibility

The card is a container — ARIA semantics belong to child elements.

| Key | Action |
|---|---|
| Tab | Moves focus through interactive elements inside the card |
| Enter / Space | Activates the card (only when `hoverable` is true) |

**Guidelines:**
- Use heading elements inside `[card-header]` for clear document structure.
- When `hoverable` is true, set `ariaLabel` to describe the card's action.
- The close button carries an accessible label automatically — do not suppress it.
- Avoid using a bare icon as the only close affordance; the library renders a labelled button.

---

## Edge Cases

- **`subtitle` vs `[card-subtitle]`**: if both are provided, the `[card-subtitle]` slot takes visual precedence — the projected rich content replaces the plain-text subtitle. Avoid providing both simultaneously.
- **`hoverable` without `ariaLabel`**: the card renders with `role="button"` semantics but no accessible name, which will fail axe-core audits. Always set `ariaLabel` on hoverable cards.
- **`closable` without a header slot**: the close button still renders in the header row. Provide a `[card-header]` slot or use `subtitle` so the header area has visible content alongside the button.
- **`theme` string shorthand vs config object**: passing `theme="dark"` is equivalent to `[theme]="{ colorScheme: 'dark' }"`. Removing `theme` (setting it to `null`) restores the page-level theme immediately.
- **`showHeader="false"`**: hides the entire header section including the icon, subtitle, and close button — not just the projected `[card-header]` slot.

---

## Best Practices

**Do:**
- Keep header content concise; use `subtitle` / `[card-subtitle]` for secondary text.
- Use `elevation` and `bordered` consistently across lists of cards.
- Use `hoverable` only when the entire card is interactive.

**Don't:**
- Pass a raw CSS value or arbitrary object to `theme` — it must be `'light'`, `'dark'`, a `ThemeScopeConfig` object, or `null`.
- Mix multiple variants in the same card list without a clear design reason.
- Omit `ariaLabel` on hoverable cards — they render as buttons and need a description.

---

## Related

- [`BUTTON.md`](BUTTON.md)
- [`ICON.md`](ICON.md)
- [`ACCORDION.md`](ACCORDION.md)
