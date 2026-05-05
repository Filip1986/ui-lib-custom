# Button

**Selector:** `ui-lib-button`
**Package:** `ui-lib-custom/button`
**Content projection:** yes — button label text (and any inline markup) is projected as content

> No `label` input — button text is always projected as `<ng-content>`. There is no `clicked` output; use native `(click)` on the host element.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `appearance` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Overridden by `text` (→ ghost) and `outlined` (→ outline) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'small' \| 'medium' \| 'large'` | `'md'` | Short and long aliases accepted |
| `color` | `ButtonSeverity` | `'primary'` | Alias for `severity`; `severity` takes precedence when both are set |
| `severity` | `ButtonSeverity \| null` | `null` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warn' \| 'warning' \| 'help' \| 'danger' \| 'contrast'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type attribute |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | Shows spinner icon; disables interaction |
| `fullWidth` | `boolean` | `false` | |
| `icon` | `SemanticIcon \| string \| null` | `null` | Icon name |
| `iconPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | |
| `iconOnly` | `boolean \| null` | `null` | When true, hides label and adds icon-only styles |
| `raised` | `boolean` | `false` | Adds drop shadow |
| `rounded` | `boolean` | `false` | Full pill border-radius |
| `text` | `boolean` | `false` | Shorthand for `appearance="ghost"` |
| `outlined` | `boolean` | `false` | Shorthand for `appearance="outline"` |
| `link` | `boolean` | `false` | Renders as a text link |
| `contrast` | `boolean` | `false` | Forces `severity="contrast"` |
| `badge` | `string \| number \| null` | `null` | Badge value overlaid on the button |
| `badgeColor` | `BadgeSeverity` | `'danger'` | Badge colour; `badgeSeverity` takes precedence when set |
| `badgeSeverity` | `BadgeSeverity \| null` | `null` | |
| `badgeClass` | `string \| null` | `null` | Extra CSS class on the badge wrapper |
| `loadingIcon` | `SemanticIcon \| string` | `'spinner'` | Icon shown during loading state |
| `shadow` | `string \| null` | `null` | Inline CSS value applied to `--uilib-button-shadow` |
| `role` | `string \| null` | `null` | ARIA role override |
| `tabIndex` | `number \| null` | `null` | |
| `ariaPressed` | `boolean \| null` | `null` | |
| `ariaChecked` | `boolean \| null` | `null` | |
| `ariaLabel` | `string \| null` | `null` | Required when `iconOnly` is true |

## Outputs

_none_

## Usage

```html
<!-- minimal example -->
<ui-lib-button>Save</ui-lib-button>

<!-- icon button with severity and loading state -->
<ui-lib-button
  [icon]="'save'"
  severity="success"
  [loading]="isSaving"
  (click)="save()"
>
  Save
</ui-lib-button>
```
