# ScrollPanel

A styled scrollable container with variant-aware custom scrollbar theming.

## Package path

```ts
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';
```

## Selector

`ui-lib-scroll-panel`

## Inputs

| Name         | Type                                      | Default  | Description                                        |
|--------------|-------------------------------------------|----------|----------------------------------------------------|
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Visual variant. Falls back to `ThemeConfigService` |
| `styleClass` | `string \| null`                           | `null`   | Extra CSS classes applied to the host element      |
| `ariaLabel`  | `string \| null`                           | `null`   | Accessible label for the scrollable region (`aria-label` on the inner content wrapper). Recommended whenever the panel conveys a meaningful landmark. |

## Content projection

| Slot           | Description                    |
|----------------|--------------------------------|
| *(default)*    | Scrollable content             |

## Usage

```html
<!-- Basic — set height via CSS or inline style -->
<ui-lib-scroll-panel ariaLabel="Product description" style="height: 250px;">
  <p>Long scrollable content...</p>
</ui-lib-scroll-panel>

<!-- Fixed dimensions with horizontal + vertical scroll -->
<ui-lib-scroll-panel ariaLabel="Wide image viewer" style="height: 200px; width: 300px;">
  <img src="wide-image.png" style="width: 600px;" />
</ui-lib-scroll-panel>

<!-- Explicit variant -->
<ui-lib-scroll-panel [variant]="'bootstrap'" ariaLabel="News feed" style="height: 300px;">
  @for (item of items; track item.id) {
    <p>{{ item.text }}</p>
  }
</ui-lib-scroll-panel>

<!-- styleClass escape hatch -->
<ui-lib-scroll-panel styleClass="my-panel" ariaLabel="Custom panel" style="height: 400px;">
  Content
</ui-lib-scroll-panel>
```

## CSS custom properties

| Property                                         | Description                              |
|--------------------------------------------------|------------------------------------------|
| `--uilib-scroll-panel-bg`                        | Background colour of the container       |
| `--uilib-scroll-panel-border-color`              | Border colour                            |
| `--uilib-scroll-panel-border-radius`             | Border radius                            |
| `--uilib-scroll-panel-scrollbar-width`           | Width (and height) of the scrollbar      |
| `--uilib-scroll-panel-scrollbar-track-bg`        | Track background colour                  |
| `--uilib-scroll-panel-scrollbar-thumb-bg`        | Thumb colour (default state)             |
| `--uilib-scroll-panel-scrollbar-thumb-bg-hover`  | Thumb colour on hover                    |
| `--uilib-scroll-panel-scrollbar-radius`          | Thumb / track border radius              |
| `--uilib-scroll-panel-transition`                | Transition duration for colour changes   |

## ARIA attributes

| Element                    | Attribute       | Value / notes                                          |
|----------------------------|-----------------|--------------------------------------------------------|
| `.ui-lib-scroll-panel__content` | `role`     | `"region"` — landmark for the scrollable area         |
| `.ui-lib-scroll-panel__content` | `tabindex` | `"0"` — makes the region keyboard-focusable           |
| `.ui-lib-scroll-panel__content` | `id`       | `ui-lib-scroll-panel-{n}-content` (unique per instance)|
| `.ui-lib-scroll-panel__content` | `aria-label` | Value of the `ariaLabel` input (omitted when `null`) |

## Keyboard interaction

| Key                     | Behaviour                                           |
|-------------------------|-----------------------------------------------------|
| `Tab`                   | Focuses the scrollable region                       |
| `↑` / `↓`              | Scrolls the region vertically (browser native)      |
| `←` / `→`              | Scrolls the region horizontally (browser native)    |
| `Page Up` / `Page Down` | Scrolls the region by a page (browser native)       |
| `Home` / `End`          | Scrolls to the top / bottom of the region (browser native) |

## Accessibility

- The inner content wrapper (`__content`) carries `role="region"` and `tabindex="0"`. This makes the scrollable area a keyboard-accessible landmark that users can reach with `Tab` and scroll with standard keyboard keys (`↑`/`↓`, `Page Up`/`Page Down`, `Home`/`End`) without mouse or touch.
- Always provide `ariaLabel` to give the region a meaningful accessible name (e.g. `"Product details"`, `"News feed"`). Without a label, screen readers announce the landmark as a generic unnamed region, which is less useful.
- Every instance receives a unique `id` (`ui-lib-scroll-panel-{n}-content`) so consumers can reference the wrapper with `aria-controls` or `aria-describedby` if needed.
- A `:focus-visible` outline is applied when the region receives keyboard focus, providing a clear visual indicator.
- Scrollbar thumb hover transitions are disabled when `prefers-reduced-motion: reduce` is set.
