# Checkbox Component

Accessible, theme-aware checkbox control with indeterminate support, signal-based inputs, and PrimeNG-inspired variants.

## Overview

The checkbox renders a host-only control with configurable variants (Material, Bootstrap, Minimal) and sizes (sm, md, lg). It uses Angular 17+ `model()` inputs for two-way binding, OnPush change detection, and CSS variables so themes can update without rebuilds.

**Location:** `projects/ui-lib-custom/src/lib/checkbox/checkbox.ts`

---

## Features

- ✅ **Signal-powered inputs** – uses Angular signals & `model()` for memoized classes and `[(checked)]` binding
- 🎨 **CSS-var theming** – reads from `--uilib-checkbox-*` plus global tokens for bg, border, focus ring
- ♿ **Accessibility** – `role="checkbox"`, `aria-checked`, keyboard toggle (Space/Enter), configurable labeling
- 🧪 **Tested** – unit tests cover inputs, aria states, click/keyboard toggles, and disabled state
- 🧱 **Host-only markup** – no wrapper elements; layout handled via host classes and inline template parts
- 🧩 **ControlValueAccessor** – supports `formControlName` and `[(ngModel)]` bindings

---

## Usage

```typescript
import { Checkbox } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Checkbox],
  template: `
    <ui-lib-checkbox
      label="Accept terms"
      description="You must accept before continuing"
      variant="material"
      size="md"
      [(checked)]="accepted"
    ></ui-lib-checkbox>
  `,
})
export class ConsentComponent {
  accepted = false;
}
```

With projected label content:

```html
<ui-lib-checkbox>
  <span>Custom label with <strong>projection</strong></span>
</ui-lib-checkbox>
```

---

## API Reference

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string \| null` | `null` | Optional text label (useful when not projecting content) |
| `description` | `string \| null` | `null` | Supporting text rendered under the label |
| `ariaLabel` | `string \| null` | `null` | Applied when you need an aria label but no visual label |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual style preset |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control size + text scale |
| `disabled` | `boolean` | `false` | Disables pointer/keyboard interaction |
| `indeterminate` | `boolean` | `false` | Shows the horizontal bar state (`aria-checked="mixed"`) |
| `checked` | `boolean` | `false` | Current checked value (bind via `[(checked)]`) |

### Outputs

| Output | Payload | Description |
|--------|---------|-------------|
| `checkedChange` | `boolean` | Fires whenever the checkbox is toggled (emitted by `model()`) |

---

## Form Integration

### Template-driven
```html
<ui-lib-checkbox [(ngModel)]="accepted" label="Accept" />
```

### Reactive Forms
```html
<form [formGroup]="form">
  <ui-lib-checkbox formControlName="accepted" label="Accept" />
</form>
```

## Form State Styling

When used with Angular forms, the host element receives `ng-touched`, `ng-dirty`, `ng-invalid`, and `ng-disabled` classes. Styling can be customized with:

| Variable | Purpose |
| --- | --- |
| `--uilib-checkbox-border-touched` | Border color when the control is touched. |
| `--uilib-checkbox-border-dirty` | Border color when the control is dirty. |
| `--uilib-checkbox-border-invalid` | Border color when invalid. |

---

## Theming & CSS Variables

The component maps design tokens to the following CSS vars:

| Variable | Purpose |
|----------|---------|
| `--uilib-checkbox-bg`, `--uilib-checkbox-bg-checked` | Background for idle/checked states |
| `--uilib-checkbox-border`, `--uilib-checkbox-border-hover`, `--uilib-checkbox-border-active` | Border colors per state |
| `--uilib-checkbox-check-color` | Tick/indeterminate glyph color |
| `--uilib-checkbox-radius` | Corner radius per variant |
| `--uilib-checkbox-focus-ring` | Box-shadow applied on `:focus-visible` |
| `--uilib-checkbox-description-color` | Caption text color |

Override them globally (`:root`, `[data-theme]`) or on a container to preview brand palettes side-by-side.

```css
.dark-surface {
  --uilib-checkbox-bg-color: rgba(255, 255, 255, 0.04);
  --uilib-checkbox-border-color: rgba(255, 255, 255, 0.2);
  --uilib-checkbox-bg-checked-color: var(--uilib-color-primary-400);
}
```

---

## Accessibility

### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus checkbox |
| Space | Toggle checked state |
| Enter | Toggle checked state |

### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `role="checkbox"` | Applied to the host |
| `aria-checked` | `true`, `false`, or `mixed` for indeterminate |
| `aria-disabled` | When disabled |
| `aria-labelledby` | References label text |
| `aria-describedby` | References description |

### Focus Management
- Focus ring uses `--uilib-checkbox-focus-ring`.
- Disabled state removes pointer and keyboard interaction.

### Screen Reader Behavior
- Label and description are read when present.
- Indeterminate state announces `mixed`.

### Known Issues & Solutions
- Use `ariaLabel` only when there is no visible label.

---

## Examples

### Playground

```html
<ui-lib-checkbox
  label="Subscribe"
  description="Receive weekly updates"
  variant="bootstrap"
  size="lg"
  [(checked)]="subscribe"
></ui-lib-checkbox>
```

### Indeterminate (tri-state lists)

```html
<ui-lib-checkbox
  label="Select all"
  [indeterminate]="someSelected && !allSelected"
  [(checked)]="allSelected"
></ui-lib-checkbox>
```

### Minimal variant inside cards

```html
<section class="preferences" data-theme="minimal">
  <ui-lib-checkbox variant="minimal" size="sm" label="Quiet notifications"></ui-lib-checkbox>
  <ui-lib-checkbox variant="minimal" size="sm" label="Dark mode"></ui-lib-checkbox>
</section>
```

---

## Best Practices

- Bind with `[(checked)]` or handle `(checkedChange)` to keep parent state authoritative
- Use `ariaLabel` only when there is no visual label (e.g., icon-only usage)
- Clear `indeterminate` from the parent once the user makes an explicit selection
- Keep description text concise (1–2 short sentences) to maintain layout harmony

---

## Testing

Run library unit tests filtered to the checkbox spec:

```bash
npm run test -- --include="**/checkbox.spec.ts"
```

Tests cover:
- Rendering and projection
- Variant/size class combinations
- ARIA state reflection (`aria-checked`, `aria-disabled`)
- Pointer + keyboard toggling
- Disabled guard rails

---

## Related Docs

- [Design Tokens](../systems/DESIGN_TOKENS.md)
- [Badge Component](BADGE.md) – example of CSS-var driven status UI

