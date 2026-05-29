# ScrollTop

A floating "back to top" button that appears once the user scrolls past a configurable threshold.
Clicking it smoothly returns the user to the top of the page or a scrollable container.

## Package path

```ts
import { ScrollTop } from 'ui-lib-custom/scroll-top';
```

## Selector

```html
<ui-lib-scroll-top />
```

## Inputs

| Name              | Type                                       | Default         | Description                                                   |
|-------------------|--------------------------------------------|-----------------|---------------------------------------------------------------|
| `threshold`       | `number`                                   | `400`           | Scroll distance (px) before the button becomes visible.       |
| `target`          | `'window' \| 'parent'`                     | `'window'`      | Scroll target: the global window or the immediate parent element. |
| `icon`            | `string`                                   | `'pi pi-arrow-up'` | CSS class(es) for the icon inside the button.              |
| `behavior`        | `'smooth' \| 'auto'`                       | `'smooth'`      | Native scroll-behavior applied when scrolling to top.         |
| `buttonAriaLabel` | `string \| null`                           | `null`            | Accessible label for the button. Falls back to the i18n `scroll-top.label` key. |
| `size`            | `'sm' \| 'md' \| 'lg'`                    | `'md'`          | Button size.                                                  |
| `variant`         | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Visual variant. Falls back to `ThemeConfigService` when `null`. |
| `styleClass`      | `string \| null`                           | `null`          | Additional CSS classes added to the host element.             |

## Public properties

| Name        | Type                      | Description                                           |
|-------------|---------------------------|-------------------------------------------------------|
| `isVisible` | `WritableSignal<boolean>` | Whether the button is visible. Can be set manually.   |

## Content projection

| Slot           | Selector        | Description |
|----------------|-----------------|-------------|
| Custom icon    | `[uilib-icon]`  | Replaces the class-based icon. Use for SVGs or icon components. Set `icon=""` to suppress the default `<span>` when using this slot. |

### Custom icon example

```html
<!-- Inline SVG icon (no external icon library dependency) -->
<ui-lib-scroll-top icon="">
  <svg uilib-icon viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="currentColor" />
  </svg>
</ui-lib-scroll-top>
```

## CSS custom properties

All tokens are declared on the `ui-lib-scroll-top` host selector and can be overridden globally or locally.

| Variable                              | Default (material)                    | Description |
|---------------------------------------|---------------------------------------|-------------|
| `--uilib-scroll-top-size`             | `3rem`                                | Default button size |
| `--uilib-scroll-top-size-sm`          | `2.25rem`                             | Small size override |
| `--uilib-scroll-top-size-lg`          | `3.75rem`                             | Large size override |
| `--uilib-scroll-top-bg`               | `var(--uilib-color-primary, #6366f1)` | Button background |
| `--uilib-scroll-top-bg-hover`         | `var(--uilib-color-primary-dark, #4f46e5)` | Hover background |
| `--uilib-scroll-top-color`            | `#ffffff`                             | Icon colour |
| `--uilib-scroll-top-border`           | `none`                                | Button border |
| `--uilib-scroll-top-border-radius`    | `50%`                                 | Button corner radius |
| `--uilib-scroll-top-shadow`           | `0 4px 12px rgba(0,0,0,0.2)`          | Default elevation |
| `--uilib-scroll-top-shadow-hover`     | `0 6px 16px rgba(0,0,0,0.28)`         | Hover elevation |
| `--uilib-scroll-top-icon-size`        | `1.25rem`                             | Default icon size |
| `--uilib-scroll-top-icon-size-sm`     | `1rem`                                | Small icon size |
| `--uilib-scroll-top-icon-size-lg`     | `1.5rem`                              | Large icon size |
| `--uilib-scroll-top-bottom`           | `2rem`                                | Window-target bottom offset |
| `--uilib-scroll-top-right`            | `2rem`                                | Window-target right offset |
| `--uilib-scroll-top-z-index`          | `var(--uilib-z-overlay, 1000)`        | Floating layer order |
| `--uilib-scroll-top-transition`       | `opacity 0.3s ease, transform 0.3s ease` | Reveal motion |

## Usage examples

### Window target (default)

The button is `position: fixed` in the bottom-right viewport corner.

```html
<ui-lib-scroll-top />

<!-- Custom threshold, icon, and behavior -->
<ui-lib-scroll-top
  [threshold]="200"
  icon="pi pi-chevron-up"
  behavior="auto"
/>
```

### Parent container target

The button is `position: absolute` inside the scrollable parent.
The parent must have `position: relative` and `overflow-y: auto` (or `scroll`).

```html
<div style="height: 400px; overflow-y: auto; position: relative;">
  <ui-lib-scroll-top target="parent" [threshold]="100" />
  <!-- scrollable content here -->
</div>
```

### Variant and size

```html
<ui-lib-scroll-top variant="bootstrap" size="lg" />
<ui-lib-scroll-top variant="minimal" size="sm" />
```

## Variants

| Variant     | Style                                     |
|-------------|-------------------------------------------|
| `material`  | Circular pill, primary colour, shadow     |
| `bootstrap` | Square corners, Bootstrap blue, shadow    |
| `minimal`   | Muted surface, border, square corners     |

## Internationalisation

| i18n key           | Default (en)     | Overridden by           |
|--------------------|------------------|-------------------------|
| `scroll-top.label` | `Scroll to top`  | `buttonAriaLabel` input |

## Accessibility

### ARIA attributes

| Element | Attribute | Purpose |
|---------|-----------|---------|
| `ui-lib-scroll-top` host | `id` | Unique instance id for DOM stability and testing |
| `ui-lib-scroll-top` host | `aria-hidden="true"` when hidden | Removes the hidden control from the accessibility tree |
| `button` | `type="button"` | Prevents accidental form submission |
| `button` | `aria-label` | Announces the icon-only action; defaults to `'Scroll to top'` |
| `button` | `tabindex="-1"` when hidden | Removes the hidden control from keyboard tab order |
| `button` | `aria-hidden="true"` when hidden | Keeps assistive technology aligned with the hidden visual state |
| icon `<span>` | `aria-hidden="true"` | Marks the icon as decorative |

### Keyboard interaction

| Key | Behaviour |
|-----|-----------|
| `Tab` | Skips the control while hidden; focuses the button when visible |
| `Enter` | Activates the native button and scrolls to the top |
| `Space` | Activates the native button and scrolls to the top |

### Accessibility notes

- The button uses a guaranteed non-empty accessible name. When `buttonAriaLabel` is `null` (the default), the i18n `scroll-top.label` key provides the fallback (English: `'Scroll to top'`).
- Hidden state is handled in both the visual layer and the accessibility layer: the host/button are `aria-hidden`, and the button is removed from the tab order until visible.
- The button includes a visible `:focus-visible` ring for keyboard users.
- The icon is decorative only, so screen readers announce just the button label.
- `@media (prefers-reduced-motion: reduce)` disables reveal/press transitions.
- All three variants include dark-mode token overrides.
- No live region is required because activation causes an immediate, perceivable scroll action rather than an asynchronous status change.
