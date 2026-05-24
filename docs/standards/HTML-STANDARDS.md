# HTML / Template Standards — ui-lib-custom

This document governs every `.html` template file in this **Angular 21 component library**. All rules apply under `ViewEncapsulation.None` — templates are globally scoped.

> Quick-reference rules are in [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md).

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Semantic HTML in Library Components](#2-semantic-html-in-library-components)
3. [Angular Template Syntax](#3-angular-template-syntax)
4. [Accessibility — Library Obligations](#4-accessibility--library-obligations)
5. [Forms — Correct Structure](#5-forms--correct-structure)
6. [Images and Icons](#6-images-and-icons)
7. [Native Interactive Primitives](#7-native-interactive-primitives)
8. [Content Projection](#8-content-projection)
9. [Template Performance](#9-template-performance)
10. [What NOT To Do](#10-what-not-to-do)
11. [Review Checklist](#11-review-checklist)
12. [ESLint Template Rules Reference](#12-eslint-template-rules-reference)

---

## 1. Philosophy

A component library's HTML is consumed by downstream apps. Every semantic shortcut here multiplies into accessibility regressions across all consumers. Additionally:

- **You do not control context.** Page structure, heading hierarchy, and landmarks are the consumer's responsibility — but your component's internal structure must not break theirs.
- **Your components build habits.** Correct HTML here trains the engineers who consume the library.

Rule: **use the most semantically appropriate element; document when a consumer must add ARIA context to your component; expose the configuration needed to make it correct.**

---

## 2. Semantic HTML in Library Components

### Correct element for each purpose

| Intent | Correct element | Wrong element |
|---|---|---|
| Trigger an action | `<button type="button">` | `<div>`, `<span>` |
| Navigation item | `<a href="...">` | `<button>` |
| Data table | `<table>`, `<th scope>`, `<td>` | nested `<div>` grids |
| Ordered steps | `<ol>` + `<li>` | `<div>` with numbers |
| Unordered options | `<ul>` + `<li>` | `<div>` items |

### Heading hierarchy — library components must not include `<h1>`–`<h3>`

Library components should use `<h4>`–`<h6>` for internal component headings (card headers, dialog titles) or make the heading level configurable via an input. Never hard-code `<h1>`, `<h2>`, `<h3>` in a component — those belong to the page layout.

```html
<!-- ✅ Configurable heading level via input -->
<ng-template #titleTemplate>
  @switch (headingLevel()) {
    @case (4) { <h4 class="uilib-card__title">{{ title() }}</h4> }
    @case (5) { <h5 class="uilib-card__title">{{ title() }}</h5> }
    @default  { <h6 class="uilib-card__title">{{ title() }}</h6> }
  }
</ng-template>
```

Or use `aria-labelledby` on the component root and project the heading from the consumer:

```html
<div class="uilib-card" [attr.aria-labelledby]="labelId()">
  <ng-content select="[uilib-card-title]" />
  <ng-content />
</div>
```

---

## 3. Angular Template Syntax

### Block syntax — always (Angular 17+)

`@if`, `@for`, `@switch` only. `*ngIf`, `*ngFor`, `*ngSwitch` are banned by ESLint.

```html
<!-- ✅ Correct -->
@if (disabled()) {
  <span class="uilib-button__loader" aria-busy="true" />
} @else {
  <ng-content />
}

@for (option of options(); track option.value) {
  <li class="uilib-select__option" [class.uilib-select__option--selected]="option.value === value()">
    {{ option.label }}
  </li>
} @empty {
  <li class="uilib-select__empty">No options</li>
}
```

### Self-closing tags

```html
<!-- ✅ -->
<uilib-spinner />
<input type="text" />

<!-- ❌ -->
<uilib-spinner></uilib-spinner>
```

### Template expressions — no method calls

Use `computed()` signals. Method calls in templates execute on every change detection cycle.

```html
<!-- ❌ -->
<span>{{ getVisibleOptionCount() }}</span>

<!-- ✅ Component: readonly visibleOptionCount = computed(() => ...); -->
<span>{{ visibleOptionCount() }}</span>
```

---

## 4. Accessibility — Library Obligations

A component library is the **most critical place to get accessibility right**: every consumer inherits these patterns.

### ARIA roles and required properties

Interactive widgets must declare their ARIA role and all required properties:

```html
<!-- ✅ Listbox with required owned elements -->
<ul
  role="listbox"
  [attr.aria-label]="label()"
  [attr.aria-multiselectable]="multi()"
  [attr.aria-activedescendant]="activeId()"
>
  @for (option of options(); track option.value) {
    <li
      role="option"
      [id]="option.id"
      [attr.aria-selected]="option.value === value()"
    >{{ option.label }}</li>
  }
</ul>
```

### Every interactive element must be labelled

```html
<!-- ❌ Icon-only button — no accessible name -->
<button type="button" (click)="clear()"><uilib-icon name="x" /></button>

<!-- ✅ Labelled via aria-label -->
<button type="button" [attr.aria-label]="clearLabel()" (click)="clear()">
  <uilib-icon name="x" aria-hidden="true" />
</button>
```

Expose the label as an `input()` whenever the label is contextual:

```typescript
readonly clearLabel = input<string>('Clear');
```

### Keyboard interaction

Implement the WAI-ARIA design pattern for the widget type:

| Component type | Required keyboard behaviour |
|---|---|
| Button | `Enter` + `Space` activate |
| Checkbox | `Space` toggles |
| Radio group | Arrow keys move selection |
| Listbox | Arrow keys navigate; `Enter` selects; `Escape` closes |
| Dialog | `Escape` closes; focus trap active |
| Tabs | Arrow keys switch; `Home`/`End` jump to first/last |

### Expose disabled state correctly

```typescript
host: {
  '[attr.disabled]':      'disabled() || null',
  '[attr.aria-disabled]': 'disabled()',
}
```

---

## 5. Forms — Correct Structure

Library form components must implement `ControlValueAccessor`:

```typescript
providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiLibInput), multi: true }]
```

### Associate labels

Always support a `labelId` input that consumers can wire to their `<label for="...">`:

```html
<!-- Library component: -->
<div class="uilib-input" [attr.aria-labelledby]="labelId() || null">
  <input
    [id]="id()"
    [type]="type()"
    [attr.aria-invalid]="invalid() || null"
    [attr.aria-describedby]="errorId() || null"
  />
</div>
```

---

## 6. Images and Icons

### Alt text

```html
<!-- ✅ Informative -->
<img [src]="thumbnailUrl()" [alt]="thumbnailAlt()" width="200" height="150" loading="lazy" />

<!-- ✅ Purely decorative icon -->
<uilib-icon name="check" aria-hidden="true" />

<!-- ✅ Standalone icon that IS the label -->
<uilib-icon name="close" [attr.aria-label]="closeLabel()" role="img" />
```

### Prevent layout shift

Always set `width` and `height` on `<img>` to let the browser reserve space:

```html
<img [src]="src()" [alt]="alt()" [attr.width]="width()" [attr.height]="height()" />
```

---

## 7. Native Interactive Primitives

### `<details>` / `<summary>` for disclosure widgets

Prefer the native `<details>` element for simple accordion/disclosure patterns:

```html
<details class="uilib-disclosure" [open]="open()">
  <summary class="uilib-disclosure__trigger" (click)="toggleOpen()">
    <ng-content select="[uilib-disclosure-title]" />
    <uilib-icon name="chevron-down" aria-hidden="true" class="uilib-disclosure__icon" />
  </summary>
  <div class="uilib-disclosure__body">
    <ng-content />
  </div>
</details>
```

**Use a custom accordion component when:** multiple panels need exclusive open/close coordination.

### `<dialog>` for modal patterns

For library-level modals, use native `<dialog>`. Expose `showModal()` / `close()` via the component API:

```typescript
public open(): void { this.dialog().nativeElement.showModal(); }
public close(): void { this.dialog().nativeElement.close(); }
```

---

## 8. Content Projection

### `ng-content` inside `@if` does NOT gate projection

Projected nodes are always instantiated by the parent regardless of `@if` on the slot.

```html
<!-- ❌ Does NOT prevent content creation -->
@if (showExtra()) {
  <ng-content select="[extra]" />
}

<!-- ✅ Always render slot — hide/show via CSS -->
<div class="uilib-card__extra" [class.uilib--hidden]="!showExtra()">
  <ng-content select="[extra]" />
</div>
```

### Semantic slot names

```html
<!-- ✅ Semantic — names describe purpose, not position -->
<ng-content select="[uilib-card-media]" />
<ng-content select="[uilib-card-title]" />
<ng-content select="[uilib-card-actions]" />

<!-- ❌ Positional names break when layout changes -->
<ng-content select="[top-left]" />
```

---

## 9. Template Performance

### No method calls in templates

```html
<!-- ❌ Re-executed every cycle -->
<span>{{ getCount() }}</span>

<!-- ✅ Memoised via computed() -->
<span>{{ count() }}</span>
```

### `track` must use stable identity

```html
@for (item of items(); track item.id) { ... }  <!-- ✅ -->
@for (item of items(); track $index) { ... }   <!-- ❌ Fragile -->
```

---

## 10. What NOT To Do

| Anti-pattern | Why | Alternative |
|---|---|---|
| `<div>`/`<span>` for interactive elements | No keyboard behaviour, no semantics | `<button>` or `<a href>` |
| `*ngIf` / `*ngFor` | Legacy, banned by ESLint | `@if` / `@for` |
| Hard-coding `<h1>`–`<h3>` in a library component | Breaks the consumer's page outline | Configurable heading level or `aria-labelledby` |
| Decorative icons without `aria-hidden="true"` | Screen reader reads SVG paths as content | Add `aria-hidden="true"` |
| Interactive icon without `aria-label` | No accessible name | Expose `label` input |
| Incomplete ARIA widget pattern | Keyboard users cannot operate the widget | Follow WAI-ARIA design patterns |
| `ng-content` inside `@if` | Does not gate projection | CSS visibility pattern |
| Positional slot names (`[top-left]`) | Breaks when layout changes | Semantic slot names (`[uilib-card-actions]`) |
| Missing `disabled` in host binding | Consumer's form state not reflected | `[attr.aria-disabled]` + `[attr.disabled]` in host |

---

## 11. Review Checklist

### Semantic structure
- [ ] Correct element used: `<button>` for actions, `<a href>` for navigation, `<ul>`/`<li>` for lists
- [ ] No `<h1>`–`<h3>` hard-coded — use configurable heading level or `aria-labelledby`

### Angular template syntax
- [ ] `@if` / `@for` / `@switch` — no `*ngIf` / `*ngFor`
- [ ] Every `@for` has `track` on a stable identity property
- [ ] Self-closing tags for all void/component elements without projected content
- [ ] No method calls in templates — `computed()` used instead

### Accessibility (critical for a library)
- [ ] ARIA role declared and all required properties set
- [ ] Every interactive element has an accessible label
- [ ] Keyboard interaction follows WAI-ARIA design pattern for the widget type
- [ ] Icon-only elements have `aria-label`; decorative icons have `aria-hidden="true"`
- [ ] `[attr.disabled]` and `[attr.aria-disabled]` both wired in host bindings
- [ ] Configurable label text exposed as `input()` where contextual

### Content projection
- [ ] `ng-content` is NOT inside `@if` — CSS visibility pattern used instead
- [ ] Slot names are semantic (`uilib-*`), not positional

### Images
- [ ] `alt` text populated (decorative icons: `aria-hidden="true"`)
- [ ] `width` and `height` present on `<img>` elements

---

## 12. ESLint Template Rules Reference

Rules enforced automatically via `eslint.config.mjs`:

| Rule | Enforces | Severity |
|---|---|---|
| `@angular-eslint/template/alt-text` | Alt text on images | error |
| `@angular-eslint/template/elements-content` | Non-empty interactive elements | error |
| `@angular-eslint/template/label-has-associated-control` | Label/input association | error |
| `@angular-eslint/template/no-positive-tabindex` | No `tabindex > 0` | error |
| `@angular-eslint/template/valid-aria` | Valid ARIA attributes | error |
| `@angular-eslint/template/role-has-required-aria` | ARIA roles have required props | error |
| `@angular-eslint/template/prefer-control-flow` | `@if`/`@for` over `*ngIf`/`*ngFor` | error |
| `@angular-eslint/template/click-events-have-key-events` | Click → keyboard equivalent | warn |
| `@angular-eslint/template/mouse-events-have-key-events` | Mouse → keyboard equivalent | warn |
| `@angular-eslint/template/interactive-supports-focus` | Interactive elements are focusable | warn |
| `@angular-eslint/template/no-autofocus` | No autofocus attribute | warn |
| `@angular-eslint/template/use-track-by-function` | `@for` has `track` | warn |
| `@angular-eslint/template/prefer-self-closing-tags` | Self-closing tag syntax | warn |

Run: `npm run lint` to check all templates.

---

*Last reviewed: 2026-05-24 — Initial document.*

## See also

| Document | Why it relates |
|---|---|
| [CSS-STANDARDS.md](CSS-STANDARDS.md) | Styling rules for the elements defined here |
| [LIBRARY_CONVENTIONS.md](../../LIBRARY_CONVENTIONS.md) | Component naming, output naming, BEM conventions |
| [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) | AI agent quick-reference for these rules |

