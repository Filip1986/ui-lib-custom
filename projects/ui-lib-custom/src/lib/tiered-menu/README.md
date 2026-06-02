# TieredMenu

**Selector:** `ui-lib-tiered-menu`
**Package:** `ui-lib-custom/tiered-menu`
**Content projection:** none — fully model-driven

A flyout menu supporting arbitrarily deep nesting. Works in two modes:

- **Inline mode** (`popup="false"`, the default): the menu panel is always rendered in the document flow. Ideal for sidebars or always-visible navigation.
- **Popup mode** (`popup="true"`): the panel floats as a fixed overlay anchored to the trigger element. Control visibility with `toggle()`, `show()`, or `hide()`.

In popup mode the panel positions itself using `documentRef.defaultView?.scrollX/Y` (SSR-safe). No `appendTo` or teleport support — the panel stays in the component's DOM position but escapes the visual flow via `position: fixed`.

---

## Inputs

| Name         | Type                                             | Default  | Notes                                                                            |
| ------------ | ------------------------------------------------ | -------- | -------------------------------------------------------------------------------- |
| `model`      | `TieredMenuItem[]`                               | `[]`     | Root items; items with `items` array open nested flyout panels                   |
| `popup`      | `boolean`                                        | `false`  | `true` renders a floating overlay; control with `toggle()` / `show()` / `hide()` |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Falls back to `ThemeConfigService` when `null`                                   |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`   | Size token affecting font size, padding, and min-width                           |
| `styleClass` | `string \| null`                                 | `null`   | Extra CSS class applied to the host element                                      |
| `ariaLabel`  | `string`                                         | `'Menu'` | Accessible name for the root `<ul role="menu">` panel                            |

---

## Outputs

| Name        | Payload                       | Notes                                                                |
| ----------- | ----------------------------- | -------------------------------------------------------------------- |
| `itemClick` | `TieredMenuItemCommandEvent`  | Fired when a non-disabled leaf item is activated (click or keyboard) |
| `menuShow`  | `MouseEvent \| KeyboardEvent` | Fired when the popup panel becomes visible                           |
| `menuHide`  | `void`                        | Fired when the popup panel is hidden                                 |

---

## Public properties

| Property            | Type                      | Notes                                                                                                |
| ------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `menuId`            | `string`                  | Unique panel id, e.g. `'ui-lib-tiered-menu-1'`. Use for `[attr.aria-controls]` on the trigger button |
| `isVisible`         | `WritableSignal<boolean>` | Whether the popup panel is currently open                                                            |
| `panelX`            | `WritableSignal<number>`  | Popup panel `left` value in px                                                                       |
| `panelY`            | `WritableSignal<number>`  | Popup panel `top` value in px                                                                        |
| `shouldRenderPanel` | `Signal<boolean>`         | Computed: `true` in inline mode or when popup is visible                                             |

---

## Public methods

| Method   | Signature                                    | Notes                                                                                                             |
| -------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `show`   | `(event: MouseEvent \| KeyboardEvent): void` | Opens the popup anchored to `event.currentTarget`. No-op in inline mode. Captures focus for restoration on close. |
| `hide`   | `(): void`                                   | Closes the popup and restores focus to the element that triggered it. No-op when hidden or in inline mode.        |
| `toggle` | `(event: MouseEvent \| KeyboardEvent): void` | Calls `show()` or `hide()` based on current visibility. No-op in inline mode.                                     |

---

## `TieredMenuItem` interface

| Field        | Type                                           | Notes                                                                                 |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `label`      | `string?`                                      | Display text for the item                                                             |
| `icon`       | `string?`                                      | Icon class applied to a `<span aria-hidden="true">`, e.g. `'pi pi-file'`              |
| `disabled`   | `boolean?`                                     | When `true`, item is non-interactive; gets `aria-disabled="true"` and `tabindex="-1"` |
| `separator`  | `boolean?`                                     | When `true`, renders a `<li role="separator">` divider instead of a link              |
| `visible`    | `boolean?`                                     | When explicitly `false`, item is excluded from the rendered list (default visible)    |
| `styleClass` | `string?`                                      | Extra CSS class added to the `<li>` element                                           |
| `items`      | `TieredMenuItem[]?`                            | Child items — causes a flyout sub-panel to open on hover/ArrowRight                   |
| `command`    | `(event: TieredMenuItemCommandEvent) => void?` | Callback invoked when the leaf item is activated                                      |
| `url`        | `string?`                                      | When set, the link renders as `<a href="...">`                                        |
| `target`     | `string?`                                      | `target` attribute for URL-based items (e.g. `'_blank'`)                              |

---

## Usage

```html
<!-- Inline (always visible) -->
<ui-lib-tiered-menu [model]="items" />

<!-- Popup triggered from a button -->
<button
  [attr.aria-haspopup]="'menu'"
  [attr.aria-expanded]="menu.isVisible()"
  [attr.aria-controls]="menu.menuId"
  (click)="menu.toggle($event)"
>
  Open menu
</button>
<ui-lib-tiered-menu #menu [model]="items" [popup]="true" (itemClick)="onAction($event)" />
```

---

## ARIA structure

```
<div #panelRef [id]="menuId">
  <ul role="menu" aria-label="Menu">     <!-- root; name from ariaLabel input -->
    <li role="none">
      <a role="menuitem" tabindex="0">   <!-- leaf item -->
    <li role="separator">               <!-- divider; no aria-hidden -->
    <li role="none">
      <a role="menuitem"
         aria-haspopup="menu"
         aria-expanded="false">         <!-- parent item -->
        <div class="submenu-wrapper">
          <ul role="menu"
              aria-label="File">        <!-- nested: name = parent item label -->
            <li role="none">
              <a role="menuitem">
```

---

## Keyboard navigation

### Root level

| Key                     | Action                                              |
| ----------------------- | --------------------------------------------------- |
| `ArrowDown` / `ArrowUp` | Next / previous item (wraps)                        |
| `Home` / `End`          | First / last item                                   |
| `ArrowRight`            | Open flyout; focus first child                      |
| `ArrowLeft`             | No-op at root                                       |
| `Enter` / `Space`       | Activate leaf; toggle flyout                        |
| `Escape`                | Close flyouts; popup: close + restore trigger focus |
| `Tab`                   | Close popup; natural browser focus movement         |

### Nested level

| Key                     | Action                                                   |
| ----------------------- | -------------------------------------------------------- |
| `ArrowDown` / `ArrowUp` | Navigate within flyout (wraps)                           |
| `Home` / `End`          | First / last in flyout                                   |
| `ArrowRight`            | Open deeper flyout; focus first child                    |
| `ArrowLeft`             | Close this flyout; return to parent item                 |
| `Escape`                | Propagate up — close all flyouts + popup + restore focus |
| `Tab`                   | Close popup; natural browser focus movement              |

### Escape propagation chain

Each `TieredMenuSubComponent` emits `escapeMenu` on Escape/Tab, which its parent handles in `onNestedEscapeMenu()` (closing its own flyout and re-emitting). The root `TieredMenu.onEscapeMenu()` receives the final event and calls `hide()` in popup mode, which restores focus.

---

## CSS custom properties

### Panel tokens (`tiered-menu.scss`)

| Token                              | Default                              | Notes               |
| ---------------------------------- | ------------------------------------ | ------------------- |
| `--uilib-tiered-menu-panel-bg`     | `var(--uilib-surface, #fff)`         | Panel background    |
| `--uilib-tiered-menu-panel-border` | `var(--uilib-color-border, #e5e7eb)` | Panel border        |
| `--uilib-tiered-menu-panel-radius` | `0.375rem`                           | Border-radius       |
| `--uilib-tiered-menu-panel-shadow` | `var(--uilib-shadow-md)`             | Box-shadow          |
| `--uilib-tiered-menu-min-width`    | `12rem`                              | Minimum panel width |
| `--uilib-tiered-menu-list-padding` | `0.25rem 0`                          | Root list padding   |

### Item tokens (`tiered-menu-sub.scss`)

| Token                                    | Default                                  | Notes                 |
| ---------------------------------------- | ---------------------------------------- | --------------------- |
| `--uilib-tiered-menu-font-size`          | `0.875rem`                               | Item font size        |
| `--uilib-tiered-menu-item-padding`       | `0.5rem 0.875rem`                        | Item padding          |
| `--uilib-tiered-menu-item-gap`           | `0.5rem`                                 | Icon-to-label gap     |
| `--uilib-tiered-menu-item-color`         | `var(--uilib-color-text, #1f2937)`       | Text colour           |
| `--uilib-tiered-menu-item-color-hover`   | `var(--uilib-color-primary, #6366f1)`    | Hover text colour     |
| `--uilib-tiered-menu-item-bg-hover`      | `var(--uilib-surface-hover, #f3f4f6)`    | Hover background      |
| `--uilib-tiered-menu-item-radius`        | `0.25rem`                                | Link border-radius    |
| `--uilib-tiered-menu-icon-size`          | `1rem`                                   | Icon size             |
| `--uilib-tiered-menu-separator-color`    | `var(--uilib-color-border, #e5e7eb)`     | Separator colour      |
| `--uilib-tiered-menu-focus-ring`         | `var(--uilib-color-primary, #6366f1)`    | Focus ring colour     |
| `--uilib-tiered-menu-disabled-opacity`   | `0.45`                                   | Disabled item opacity |
| `--uilib-tiered-menu-submenu-icon-color` | `var(--uilib-color-text-muted, #6b7280)` | Caret colour          |

---

## Accessibility

- Every `<ul role="menu">` has an accessible name — root via `ariaLabel` input, nested via parent item label
- Separators use `role="separator"` without `aria-hidden` — they convey structural grouping to screen readers
- Focus is restored to the trigger element when the popup closes (Escape, Tab, click-outside)
- Popup trigger wiring (must be set by the consumer — no auto-wiring yet):
  ```html
  <button
    [attr.aria-haspopup]="'menu'"
    [attr.aria-expanded]="menu.isVisible()"
    [attr.aria-controls]="menu.menuId"
    (click)="menu.toggle($event)"
  ></button>
  ```
- Both SCSS files include `@media (prefers-reduced-motion: reduce)` blocks

## Known limitations

- **No `itemTemplate`** — custom item rendering not supported; recursive architecture makes TemplateRef propagation complex. Planned for a future evolution.
- **No `appendTo` / teleport** — popup stays in component DOM, positioned with `position: fixed`.
- **No keyboard type-ahead** — not implemented.
- **Flyout direction** — submenus always open to the right. RTL/viewport-edge detection is not automatic.
