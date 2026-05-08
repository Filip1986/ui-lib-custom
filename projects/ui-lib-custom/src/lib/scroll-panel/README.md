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

## Content projection

| Slot           | Description                    |
|----------------|--------------------------------|
| *(default)*    | Scrollable content             |

## Usage

```html
<!-- Basic — set height via CSS or inline style -->
<ui-lib-scroll-panel style="height: 250px;">
  <p>Long scrollable content...</p>
</ui-lib-scroll-panel>

<!-- Fixed dimensions with horizontal + vertical scroll -->
<ui-lib-scroll-panel style="height: 200px; width: 300px;">
  <img src="wide-image.png" style="width: 600px;" />
</ui-lib-scroll-panel>

<!-- Explicit variant -->
<ui-lib-scroll-panel [variant]="'bootstrap'" style="height: 300px;">
  <ul>
    <li *ngFor="let item of items">{{ item }}</li>
  </ul>
</ui-lib-scroll-panel>

<!-- styleClass escape hatch -->
<ui-lib-scroll-panel styleClass="my-panel" style="height: 400px;">
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

## Accessibility

- The scroll container (`__content`) is a native scrollable region — keyboard users can scroll with arrow keys once focused.
- No ARIA role is required for a generic scroll container; add `role="region"` and `aria-label` at the consumer level when the region has a meaningful label.
