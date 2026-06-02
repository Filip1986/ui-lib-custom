# Card

**Selector:** `ui-lib-card`
**Package:** `ui-lib-custom/card`
**Content projection:** yes — four named slots: `[card-header]` (title area), `[card-subtitle]` (rich subtitle below the title), default slot (body), `[card-footer]` (footer bar)

> The `theme` input accepts a scoped `ThemeScopeInput` object that applies CSS variables and data attributes directly on the card's host element, enabling per-card theme overrides without a provider — this has no PrimeNG equivalent.

## Inputs

| Name         | Type                                             | Default    | Notes                                                                                                            |
| ------------ | ------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`     | Visual variant; inherits from `ThemeConfigService` when null                                                     |
| `elevation`  | `'none' \| 'low' \| 'medium' \| 'high'`          | `'medium'` | Shadow depth token                                                                                               |
| `bordered`   | `boolean`                                        | `false`    | Adds a visible border                                                                                            |
| `hoverable`  | `boolean`                                        | `false`    | Adds hover highlight and makes the card keyboard-activatable as a button                                         |
| `showHeader` | `boolean \| null`                                | `null`     | Hides the header section when explicitly set to `false`                                                          |
| `showFooter` | `boolean \| null`                                | `null`     | Hides the footer section when explicitly set to `false`                                                          |
| `shadow`     | `string \| null`                                 | `null`     | Inline override for `--uilib-card-shadow`                                                                        |
| `headerBg`   | `string \| null`                                 | `null`     | Inline override for `--uilib-card-header-bg`                                                                     |
| `footerBg`   | `string \| null`                                 | `null`     | Inline override for `--uilib-card-footer-bg`                                                                     |
| `headerIcon` | `SemanticIcon \| string \| null`                 | `null`     | Icon shown at the start of the header row                                                                        |
| `closable`   | `boolean`                                        | `false`    | Shows a close button in the header; emits `closed` on click                                                      |
| `subtitle`   | `string \| null`                                 | `null`     | Plain-text subtitle rendered below the header slot. Use `[card-subtitle]` instead when you need rich HTML markup |
| `ariaLabel`  | `string \| null`                                 | `null`     | Accessible label; only exposed when `hoverable` is true                                                          |
| `theme`      | `ThemeScopeInput \| null`                        | `null`     | Scoped theme override applied as CSS variables on the host element                                               |

## Outputs

| Name     | Payload | Notes                                                                           |
| -------- | ------- | ------------------------------------------------------------------------------- |
| `closed` | `void`  | Emitted when the close button is clicked; only present when `[closable]="true"` |

## Content projection slots

| Slot          | Selector          | Notes                                                                                                     |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| Title         | `[card-header]`   | Projected into `.ui-lib-card__title`                                                                      |
| Rich subtitle | `[card-subtitle]` | Projected directly below the title; use when `subtitle` input is insufficient (e.g. inline `<code>` tags) |
| Body          | _(default)_       | Projected into `.ui-lib-card__body`                                                                       |
| Footer        | `[card-footer]`   | Projected into `.ui-lib-card__footer`; hidden when `[showFooter]="false"`                                 |

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
    Use <code>appearance</code> to switch between <code>solid</code>, <code>outline</code>, and
    <code>ghost</code>.
  </span>
  <p>Body content.</p>
</ui-lib-card>

<!-- Closable card with footer -->
<ui-lib-card [closable]="true" (closed)="onClose()">
  <span card-header>Dismissible</span>
  Main content.
  <span card-footer>Footer text</span>
</ui-lib-card>

<!-- Clickable/hoverable card — provide ariaLabel for screen readers -->
<ui-lib-card [hoverable]="true" ariaLabel="Open user profile" (click)="openProfile()">
  <span card-header>Jane Smith</span>
  <p>Click to view full profile</p>
</ui-lib-card>
```

## ARIA Attributes

| Attribute         | Condition                                             | Value                                |
| ----------------- | ----------------------------------------------------- | ------------------------------------ |
| `role`            | `[hoverable]="true"`                                  | `"button"`                           |
| `tabindex`        | `[hoverable]="true"`                                  | `"0"`                                |
| `aria-label`      | `[hoverable]="true"` and `ariaLabel` input is set     | value of `ariaLabel` input           |
| `aria-labelledby` | `[hoverable]="false"` (default) and header is visible | ID of the internal `__title` element |

When `hoverable` is `false` (the default), the card automatically generates a unique `id` for its title element and sets `aria-labelledby` on the card container to connect the accessible name. This benefits screen reader users who navigate by regions.

## Keyboard Interaction

| Key     | Condition            | Action                                         |
| ------- | -------------------- | ---------------------------------------------- |
| `Enter` | `[hoverable]="true"` | Dispatches a `click` event on the card host    |
| `Space` | `[hoverable]="true"` | Dispatches a `click` event on the card host    |
| `Tab`   | Always               | Moves focus through interactive child elements |

## CSS Custom Properties

| Property                    | Default                    | Description                                     |
| --------------------------- | -------------------------- | ----------------------------------------------- |
| `--uilib-card-bg`           | `var(--uilib-surface)`     | Card background colour                          |
| `--uilib-card-text-color`   | `var(--uilib-page-fg)`     | Card foreground/text colour                     |
| `--uilib-card-radius`       | `var(--uilib-radius-lg)`   | Border radius                                   |
| `--uilib-card-border`       | `var(--uilib-border)`      | Border colour                                   |
| `--uilib-card-border-width` | `0`                        | Border thickness (set to `1px` by `--bordered`) |
| `--uilib-card-shadow`       | _(elevation token)_        | Box shadow at rest                              |
| `--uilib-card-shadow-hover` | _(elevation token +1)_     | Box shadow on hover / focus-visible             |
| `--uilib-card-header-bg`    | `var(--uilib-surface-alt)` | Header section background                       |
| `--uilib-card-footer-bg`    | `var(--uilib-surface-alt)` | Footer section background                       |
| `--uilib-color-primary`     | _(theme token)_            | Colour of the `:focus-visible` outline ring     |
| `--uilib-focus-ring`        | `rgba(0,112,240,0.25)`     | Spread of the outer focus glow                  |

Shadow depth tokens resolved per elevation:

| Elevation            | At rest                      | On hover / focus             |
| -------------------- | ---------------------------- | ---------------------------- |
| `none`               | `--uilib-card-shadow-none`   | `--uilib-card-shadow-low`    |
| `low`                | `--uilib-card-shadow-low`    | `--uilib-card-shadow-medium` |
| `medium` _(default)_ | `--uilib-card-shadow-medium` | `--uilib-card-shadow-high`   |
| `high`               | `--uilib-card-shadow-high`   | `--uilib-card-shadow-high`   |

## Accessibility

The card is a container — ARIA semantics belong to child elements, but the component automatically wires the most important ARIA relationships for you.

### Non-interactive cards

By default, the card has no interactive role. The component generates a unique `id` for the header title element and sets `aria-labelledby` on the card container, giving screen readers an accessible name without any extra markup.

### Hoverable (clickable) cards

When `[hoverable]="true"`, the card receives `role="button"` and `tabindex="0"`, turning it into a keyboard-operable button. **Always** provide `[ariaLabel]="'Descriptive action text'"` for hoverable cards — otherwise screen readers cannot announce the card's purpose.

```html
<!-- ✅ Accessible hoverable card -->
<ui-lib-card [hoverable]="true" ariaLabel="Open project Alpha" (click)="open()">
  <span card-header>Project Alpha</span>
  <p>Click to view details</p>
</ui-lib-card>

<!-- ❌ Hoverable card missing ariaLabel — avoid this -->
<ui-lib-card [hoverable]="true" (click)="open()">
  <span card-header>Project Alpha</span>
</ui-lib-card>
```

### :focus-visible

Hoverable cards render a visible keyboard-focus ring using `outline` + `box-shadow` on `:focus-visible`. The ring uses `--uilib-color-primary` for the outline and `--uilib-focus-ring` for the glow. Mouse users never see the ring; keyboard users always do.

### Reduced motion

All card transitions (`box-shadow`, `transform`) are disabled when `prefers-reduced-motion: reduce` is set in the operating system.

### Close button

When `[closable]="true"`, the component renders a close icon with `ariaLabel="Close card"` baked in — do not suppress it.

### Guidelines

- Use heading elements inside `[card-header]` for clear document structure.
- When `hoverable` is true, set `ariaLabel` to describe the card's action.
- Avoid using a bare icon as the only close affordance; the library renders a labelled button.
- For cards displaying images, always provide an `alt` attribute on the `<img>` element you project.
