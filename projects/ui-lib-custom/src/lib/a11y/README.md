# a11y

**Selector:** directive / service
**Package:** `ui-lib-custom/a11y`
**Content projection:** no — none

> `LiveAnnouncerService` is `providedIn: 'root'` and creates a visually-hidden DOM node on `document.body`; it is a no-op in SSR environments (guarded by `isPlatformBrowser`).

## Exports

| Name | Kind | Notes |
|------|------|-------|
| `LiveAnnouncerService` | service | Posts messages to a screen-reader live region |
| `AnnounceDirective` | directive (`[uiLibAnnounce]`) | Announces a string whenever the signal value changes |
| `AnnounceOnChangeDirective` | directive (`[uiLibAnnounceOnChange]`) | Announces `data-announce-message` on `change`/`input` events |

## `LiveAnnouncerService` API

| Method | Signature | Notes |
|--------|-----------|-------|
| `announce` | `(message, politeness?, duration?) => Promise<void>` | `politeness` defaults to `'polite'`; `duration > 0` auto-clears after ms |
| `announceError` | `(message) => Promise<void>` | Shorthand for `assertive` politeness |
| `announceSuccess` | `(message) => Promise<void>` | Shorthand for `polite` politeness |
| `clear` | `() => void` | Clears the live region immediately |

## `AnnounceDirective` Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `uiLibAnnounce` | `string` | `''` | Message to announce; re-announces on every change |
| `politeness` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | ARIA live politeness |

## Outputs

_none_

## Usage

```html
<!-- Service usage (imperative) -->
<!-- inject LiveAnnouncerService and call announce() -->

<!-- Directive usage -->
<span [uiLibAnnounce]="statusMessage" [politeness]="'assertive'"></span>

<input uiLibAnnounceOnChange data-announce-message="Value updated" />
```
