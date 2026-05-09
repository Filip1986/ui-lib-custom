# Card

**Selector:** `ui-lib-card`
**Package:** `ui-lib-custom/card`
**Content projection:** yes — four named slots: `[card-header]` (title area), `[card-subtitle]` (rich subtitle below the title), default slot (body), `[card-footer]` (footer bar)

> The `theme` input accepts a scoped `ThemeScopeInput` object that applies CSS variables and data attributes directly on the card's host element, enabling per-card theme overrides without a provider — this has no PrimeNG equivalent.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; inherits from `ThemeConfigService` when null |
| `elevation` | `'none' \| 'low' \| 'medium' \| 'high'` | `'medium'` | Shadow depth token |
| `bordered` | `boolean` | `false` | Adds a visible border |
| `hoverable` | `boolean` | `false` | Adds hover highlight and makes the card keyboard-activatable as a button |
| `showHeader` | `boolean \| null` | `null` | Hides the header section when explicitly set to `false` |
| `showFooter` | `boolean \| null` | `null` | Hides the footer section when explicitly set to `false` |
| `shadow` | `string \| null` | `null` | Inline override for `--uilib-card-shadow` |
| `headerBg` | `string \| null` | `null` | Inline override for `--uilib-card-header-bg` |
| `footerBg` | `string \| null` | `null` | Inline override for `--uilib-card-footer-bg` |
| `headerIcon` | `SemanticIcon \| string \| null` | `null` | Icon shown at the start of the header row |
| `closable` | `boolean` | `false` | Shows a close button in the header; emits `closed` on click |
| `subtitle` | `string \| null` | `null` | Plain-text subtitle rendered below the header slot. Use `[card-subtitle]` instead when you need rich HTML markup |
| `ariaLabel` | `string \| null` | `null` | Accessible label; only exposed when `hoverable` is true |
| `theme` | `ThemeScopeInput \| null` | `null` | Scoped theme override applied as CSS variables on the host element |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `closed` | `void` | Emitted when the close button is clicked; only present when `[closable]="true"` |

## Content projection slots

| Slot | Selector | Notes |
|------|----------|-------|
| Title | `[card-header]` | Projected into `.ui-lib-card__title` |
| Rich subtitle | `[card-subtitle]` | Projected directly below the title; use when `subtitle` input is insufficient (e.g. inline `<code>` tags) |
| Body | _(default)_ | Projected into `.ui-lib-card__body` |
| Footer | `[card-footer]` | Projected into `.ui-lib-card__footer`; hidden when `[showFooter]="false"` |

## Usage

```html
<!-- Basic card with header and body -->
<ui-lib-card variant="material" [bordered]="true">
  <span card-header>Card Title</span>
  <p>Body content goes here.</p>
</ui-lib-card>

<!-- Plain-text subtitle via input -->
<ui-lib-card subtitle="Secondary description">
  <span card-header>Card Title</span>
  <p>Body content.</p>
</ui-lib-card>

<!-- Rich subtitle with inline markup via projection slot -->
<ui-lib-card>
  <span card-header>Appearances</span>
  <span card-subtitle>
    Use <code>appearance</code> to switch between <code>solid</code>, <code>outline</code>, and <code>ghost</code>.
  </span>
  <p>Body content.</p>
</ui-lib-card>

<!-- Closable card with footer -->
<ui-lib-card [closable]="true" (closed)="onClose()">
  <span card-header>Dismissible</span>
  Main content.
  <span card-footer>Footer text</span>
</ui-lib-card>
```
