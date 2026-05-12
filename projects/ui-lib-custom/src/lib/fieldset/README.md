# Fieldset

A labelled content container that optionally collapses its body. Supports three design variants (material / bootstrap / minimal) and a collapse animation driven by the CSS grid-row technique.

## Package path

```ts
import { Fieldset } from 'ui-lib-custom/fieldset';
```

## Selector

`ui-lib-fieldset`

## Inputs

| Input        | Type                                             | Default | Description                                                       |
|--------------|--------------------------------------------------|---------|-------------------------------------------------------------------|
| `legend`     | `string`                                         | `''`    | Text to render in the legend / header area.                      |
| `toggleable` | `boolean`                                        | `false` | When `true` the user can collapse and expand the body.           |
| `collapsed`  | `boolean` (model — two-way bindable)             | `false` | Current collapsed state. Bind with `[(collapsed)]`.              |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`  | Visual variant. Falls back to `ThemeConfigService.variant()`.    |
| `styleClass` | `string \| null`                                 | `null`  | Extra CSS classes applied to the host element.                   |

## Outputs

| Output    | Type                  | Description                                                     |
|-----------|-----------------------|-----------------------------------------------------------------|
| `toggled` | `FieldsetToggleEvent` | Emitted after collapse state changes. Carries `{ collapsed: boolean }`. |

## Content projection

| Slot               | Description                                                                   |
|--------------------|-------------------------------------------------------------------------------|
| `[fieldsetLegend]` | Custom HTML for the legend area (supplements or replaces the `legend` input). |
| *(default)*        | Body content rendered inside the fieldset panel.                              |

## Usage examples

### Basic

```html
<ui-lib-fieldset legend="Personal Information">
  <p>Name, address, contact details here.</p>
</ui-lib-fieldset>
```

### Toggleable with two-way binding

```html
<ui-lib-fieldset legend="Advanced Options" [toggleable]="true" [(collapsed)]="isCollapsed">
  <p>Advanced settings here.</p>
</ui-lib-fieldset>
```

### Pre-collapsed

```html
<ui-lib-fieldset legend="Details" [toggleable]="true" [collapsed]="true">
  <p>Hidden by default.</p>
</ui-lib-fieldset>
```

### Custom legend via content projection

```html
<ui-lib-fieldset [toggleable]="true">
  <span fieldsetLegend>
    <i class="pi pi-user" aria-hidden="true"></i> User Profile
  </span>
  <p>Profile content here.</p>
</ui-lib-fieldset>
```

### Explicit variant

```html
<ui-lib-fieldset legend="Bootstrap Style" variant="bootstrap" [toggleable]="true">
  <p>Content.</p>
</ui-lib-fieldset>
```

## ARIA attributes

| Element          | Attribute            | Value / Notes                                                              |
|------------------|----------------------|----------------------------------------------------------------------------|
| Host             | `role`               | `"group"` — groups related content under a common label                   |
| Host             | `aria-labelledby`    | ID of the legend element                                                   |
| Legend div       | `id`                 | Auto-generated unique ID (`ui-lib-fieldset-{n}-legend`)                   |
| Legend div       | `role`               | `"button"` — only when `toggleable` is `true`                             |
| Legend div       | `tabindex`           | `"0"` — only when `toggleable` is `true`                                  |
| Legend div       | `aria-expanded`      | `"true"` / `"false"` — only when `toggleable` is `true`                   |
| Legend div       | `aria-controls`      | ID of the content wrapper — only when `toggleable` is `true`              |
| Toggle icon span | `aria-hidden`        | `"true"` — decorative chevron, hidden from assistive technologies         |
| Content wrapper  | `id`                 | Auto-generated unique ID (`ui-lib-fieldset-{n}-content`)                  |
| Content wrapper  | `aria-hidden`        | `"true"` when collapsed, absent when expanded                             |

## Keyboard interaction

| Key       | Target        | Action                                 |
|-----------|---------------|----------------------------------------|
| `Enter`   | Legend button | Toggles collapsed / expanded state     |
| `Space`   | Legend button | Toggles collapsed / expanded state     |
| `Tab`     | Legend button | Moves focus to / from the legend area  |

> Only applies when `toggleable` is `true`.

## CSS custom properties

| Custom property                         | Default value                         | Description                              |
|-----------------------------------------|---------------------------------------|------------------------------------------|
| `--uilib-fieldset-border-color`         | `var(--uilib-surface-300, #d1d5db)`   | Border colour of the fieldset            |
| `--uilib-fieldset-border-radius`        | `var(--uilib-radius-md, 6px)`         | Corner radius                            |
| `--uilib-fieldset-legend-bg`            | `var(--uilib-surface, #ffffff)`       | Legend / header background               |
| `--uilib-fieldset-legend-color`         | `var(--uilib-color-text, #374151)`    | Legend text colour                       |
| `--uilib-fieldset-legend-font-size`     | `0.9375rem`                           | Legend font size                         |
| `--uilib-fieldset-legend-font-weight`   | `600`                                 | Legend font weight                       |
| `--uilib-fieldset-legend-padding`       | `0.75rem 1rem`                        | Legend inner padding                     |
| `--uilib-fieldset-content-padding`      | `1rem`                                | Body content inner padding               |
| `--uilib-fieldset-toggle-color`         | `var(--uilib-color-primary, #6366f1)` | Toggle chevron and focus-ring colour     |
| `--uilib-fieldset-toggle-hover-bg`      | `var(--uilib-surface-100, #f3f4f6)`   | Legend hover background (toggleable)     |
| `--uilib-fieldset-transition`           | `200ms ease`                          | Collapse / expand transition duration    |

## Accessibility

The component uses `role="group"` on its host element paired with `aria-labelledby` pointing to the auto-generated legend element ID. This gives assistive technologies the full context of the grouping label without requiring a native `<fieldset>` element.

### Toggleable behaviour

When `toggleable` is `true`:
- The legend `<div>` becomes a focusable button (`role="button"`, `tabindex="0"`) so keyboard users can toggle collapse / expand with **Enter** or **Space**.
- `aria-expanded` on the legend reflects the current open/closed state in real time.
- `aria-controls` on the legend references the content wrapper by ID.
- When collapsed, the content wrapper receives `aria-hidden="true"` so screen readers skip hidden body content.
- The decorative chevron icon carries `aria-hidden="true"` and is never read aloud.

### Visual focus indicator

A visible `:focus-visible` outline (2 px solid, using `--uilib-fieldset-toggle-color`) is applied to the legend when focused via keyboard on all three variants.

### Reduced motion

All transitions respect `prefers-reduced-motion: reduce`. When that media query is active, `--uilib-fieldset-transition` is set to `0ms`, eliminating all collapse animations while preserving functional behaviour.

### Unique instance IDs

Each fieldset instance generates stable, unique IDs at construction time (`ui-lib-fieldset-{n}-legend` and `ui-lib-fieldset-{n}-content`). Multiple fieldsets on the same page cannot clash.
