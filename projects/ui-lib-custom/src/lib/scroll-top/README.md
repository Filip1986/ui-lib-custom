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
| `buttonAriaLabel` | `string`                                   | `'Back to top'` | Accessible label for the button element.                      |
| `size`            | `'sm' \| 'md' \| 'lg'`                    | `'md'`          | Button size.                                                  |
| `variant`         | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Visual variant. Falls back to `ThemeConfigService` when `null`. |
| `styleClass`      | `string \| null`                           | `null`          | Additional CSS classes added to the host element.             |

## Public properties

| Name        | Type                      | Description                                           |
|-------------|---------------------------|-------------------------------------------------------|
| `isVisible` | `WritableSignal<boolean>` | Whether the button is visible. Can be set manually.   |

## Content projection

None — this component does not project content.

## CSS variables

All tokens are declared on the `ui-lib-scroll-top` host selector and can be overridden globally or locally.

| Variable                              | Default (material)                    |
|---------------------------------------|---------------------------------------|
| `--uilib-scroll-top-size`             | `3rem`                                |
| `--uilib-scroll-top-bg`               | `var(--uilib-color-primary, #6366f1)` |
| `--uilib-scroll-top-color`            | `#ffffff`                             |
| `--uilib-scroll-top-border`           | `none`                                |
| `--uilib-scroll-top-border-radius`    | `50%`                                 |
| `--uilib-scroll-top-shadow`           | `0 4px 12px rgba(0,0,0,0.2)`         |
| `--uilib-scroll-top-icon-size`        | `1.25rem`                             |
| `--uilib-scroll-top-bottom`           | `2rem`                                |
| `--uilib-scroll-top-right`            | `2rem`                                |
| `--uilib-scroll-top-z-index`          | `var(--uilib-z-overlay, 1000)`        |
| `--uilib-scroll-top-transition`       | `opacity 0.3s ease, transform 0.3s ease` |

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

## Accessibility

- Renders a `<button type="button">` element with a descriptive `aria-label` (`buttonAriaLabel` input, default `'Back to top'`).
- The host element is invisible (`opacity: 0; pointer-events: none`) until the scroll threshold is exceeded, keeping the button out of focus order when hidden.
- The icon span is `aria-hidden="true"` so screen readers rely solely on the button label.

