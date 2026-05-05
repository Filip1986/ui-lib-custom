# StyleClass

**Package:** `ui-lib-custom/style-class`  
**Selector:** `[uiLibStyleClass]`  
**Type:** Directive (standalone)

---

## Overview

`StyleClass` is a utility directive that manages CSS class transitions on a **target element** when the host element is clicked. It supports two modes:

1. **Toggle mode** — adds/removes a single class on each click.
2. **Transition mode** — runs a full enter/leave CSS class lifecycle for animated show/hide behaviour.

The target element is identified by the `uiLibStyleClass` input, which accepts either a special shorthand or any valid CSS selector.

---

## Import

```typescript
import { StyleClass } from 'ui-lib-custom/style-class';
```

---

## Target Selectors

| Value | Resolves to |
|---|---|
| `@next` | `host.nextElementSibling` |
| `@prev` | `host.previousElementSibling` |
| `@parent` | `host.parentElement` |
| `@grandparent` | `host.parentElement?.parentElement` |
| Any CSS selector string | `document.querySelector(selector)` |

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `uiLibStyleClass` | `string` | *(required)* | Target selector (`@next`, `@prev`, `@parent`, `@grandparent`, or CSS selector). |
| `toggleClass` | `string` | `''` | Single class to toggle on each click. When set, bypasses the full transition lifecycle. |
| `enterFromClass` | `string` | `''` | Class(es) applied to the target at the very start of the enter transition. |
| `enterActiveClass` | `string` | `''` | Class(es) applied during the enter transition (e.g. keyframe class). |
| `enterToClass` | `string` | `''` | Class(es) applied at the end of the enter transition. |
| `enterDoneClass` | `string` | `''` | Class(es) kept on the target after enter completes. |
| `leaveFromClass` | `string` | `''` | Class(es) applied at the very start of the leave transition. |
| `leaveActiveClass` | `string` | `''` | Class(es) applied during the leave transition. |
| `leaveToClass` | `string` | `''` | Class(es) applied at the end of the leave transition. |
| `leaveDoneClass` | `string` | `''` | Class(es) kept on the target after leave completes. |
| `hideOnOutsideClick` | `boolean` | `false` | When `true`, clicking outside the target triggers leave / toggles off. |

---

## Transition Lifecycle

### Enter
1. Remove `leaveDoneClass` and `leaveToClass` (clean prior leave state).
2. Add `enterFromClass` to target.
3. On next animation frame: remove `enterFromClass`, add `enterActiveClass` + `enterToClass`.
4. On `transitionend` or `animationend` (or 500 ms fallback timeout):
   - Remove `enterActiveClass`.
   - If `enterDoneClass` is set: remove `enterToClass`, add `enterDoneClass`.
5. `isEntered = true`.

### Leave
1. Remove `enterDoneClass` and `enterToClass`.
2. Add `leaveFromClass` to target.
3. On next animation frame: remove `leaveFromClass`, add `leaveActiveClass` + `leaveToClass`.
4. On `transitionend` or `animationend` (or 500 ms fallback timeout):
   - Remove `leaveActiveClass`.
   - If `leaveDoneClass` is set: remove `leaveToClass`, add `leaveDoneClass`.
5. `isEntered = false`.

---

## Usage Examples

### Toggle Mode

```html
<button [uiLibStyleClass]="'@next'" [toggleClass]="'is-open'">
  Toggle Panel
</button>
<div>Content</div>
```

```css
.is-open { display: block; }
div { display: none; }
```

---

### Transition Mode (CSS animation)

```html
<button
  [uiLibStyleClass]="'#my-panel'"
  enterFromClass="hidden"
  enterActiveClass="fade-in"
  leaveActiveClass="fade-out"
  leaveToClass="hidden"
  [hideOnOutsideClick]="true"
>
  Show Panel
</button>
<div id="my-panel" class="hidden">Panel content</div>
```

```css
.hidden { display: none; }

@keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
@keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }

.fade-in  { animation: fadeIn  200ms forwards; }
.fade-out { animation: fadeOut 200ms forwards; }
```

---

### Slide Panel (enterDoneClass / leaveDoneClass)

```html
<button
  [uiLibStyleClass]="'@next'"
  enterFromClass="slide-hidden"
  enterActiveClass="slide-enter"
  enterDoneClass="slide-open"
  leaveFromClass="slide-open"
  leaveActiveClass="slide-leave"
  leaveDoneClass="slide-hidden"
>
  Menu
</button>
<nav class="slide-hidden">…</nav>
```

---

### Special Selectors

```html
<!-- @parent -->
<nav>
  <button [uiLibStyleClass]="'@parent'" [toggleClass]="'nav--expanded'">
    Expand
  </button>
</nav>

<!-- @grandparent -->
<section>
  <div>
    <button [uiLibStyleClass]="'@grandparent'" [toggleClass]="'section--active'">
      Activate
    </button>
  </div>
</section>
```

---

## Notes

- The directive registers its click listener **outside Angular zone** via `NgZone.runOutsideAngular` so it never triggers unnecessary change-detection cycles.
- The 500 ms fallback timeout ensures the directive works correctly even when no CSS transition or animation is defined (typical in test environments).
- On `ngOnDestroy`, all event listeners are automatically removed and state is cleaned up.
- The directive is SSR-safe: it checks `isPlatformBrowser(PLATFORM_ID)` before attaching DOM listeners.

