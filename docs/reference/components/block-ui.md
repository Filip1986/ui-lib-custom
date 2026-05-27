# Block Ui

**Selector:** `ui-lib-block-ui`
**Entry point:** `import { BlockUi } from 'ui-lib-custom/block-ui'`

---

## Overview

BlockUI - Blocks user interaction on a section of the page by overlaying a mask. Wrap any content in `<ui-lib-block-ui>` and bind `[blocked]` to toggle the mask. Project custom mask content (e.g. a spinner) using the `blockTemplate` attribute selector.

## API

### Inputs

| Name         | Type                    | Default | Description                                                            |
| ------------ | ----------------------- | ------- | ---------------------------------------------------------------------- |
| `baseZIndex` | `number`                | `0`     | Base z-index for the mask layer. When 0 uses the CSS variable default. |
| `styleClass` | `string | null`         | `null`  | Additional CSS classes to apply to the host element.                   |
| `variant`    | `BlockUIVariant | null` | `null`  | Visual variant — inherits from ThemeConfigService when not set.        |

### Models (two-way bindable)

| Name      | Type      | Default | Description                                                                     |
| --------- | --------- | ------- | ------------------------------------------------------------------------------- |
| `blocked` | `boolean` | `false` | Whether the content is blocked from user interaction. Supports two-way binding. |

### Outputs

_none_

## Content Projection

| Selector          | Notes |
| ----------------- | ----- |
| _(default)_       | —     |
| `[blockTemplate]` | —     |

## Theming

| CSS Variable                           | Default                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| `--uilib-block-ui-mask-bg`             | `rgba(0, 0, 0, 0.4)`                                     |
| `--uilib-block-ui-mask-bg-bootstrap`   | `rgba(0, 0, 0, 0.5)`                                     |
| `--uilib-block-ui-mask-bg-material`    | `rgba(0, 0, 0, 0.3)`                                     |
| `--uilib-block-ui-mask-bg-minimal`     | `rgba(0, 0, 0, 0.15)`                                    |
| `--uilib-block-ui-transition`          | `opacity var(--uilib-block-ui-transition-duration) ease` |
| `--uilib-block-ui-transition-duration` | `0.2s`                                                   |
| `--uilib-block-ui-z-index`             | `var(--uilib-z-overlay, 100)`                            |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                       |
| ------------------------------------------------------ |
| inner button should be focusable when not blocked      |
| should NOT have aria-disabled when not blocked         |
| should NOT have aria-hidden on mask when blocked       |
| should apply bootstrap variant class                   |
| should apply minimal variant class                     |
| should apply variant class                             |
| should have aria-busy=                                 |
| should have aria-disabled=                             |
| should have aria-hidden=                               |
| should have aria-live=                                 |
| should have role=                                      |
| should have role=status on mask                        |
| should pass axe in blocked state                       |
| should pass axe in unblocked state                     |
| should remove aria-disabled from host when not blocked |
| should remove aria-hidden from mask when blocked       |
| should set aria-disabled to true on host when blocked  |
| should set aria-hidden on mask when not blocked        |

## Usage Examples

```html
<!-- basic usage — toggle blocked state from the parent -->
<ui-lib-block-ui [(blocked)]="isLoading">
  <p>Protected content</p>
</ui-lib-block-ui>

<!-- custom mask content with a spinner -->
<ui-lib-block-ui [(blocked)]="isSaving">
  <form>...</form>
  <span blockTemplate>
    <ui-lib-spinner /> Saving…
  </span>
</ui-lib-block-ui>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#block-ui)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/block-ui/README.md)

