# Scoped Theming Design (Component-Level Overrides)

## Task Receipt

Design architecture for component-level theme overrides, supporting component input, directive scoping, and data-attribute usage.

## Checklist

- [x] Define API surface and usage patterns.
- [x] Evaluate options and choose the recommended approach.
- [x] Specify `ThemeScopeConfig` shape.
- [x] Outline directive and component integration.
- [x] Document CSS variable scoping and inheritance.
- [x] Provide usage examples.

## API Design Decisions

### Supported Usage Patterns

```html
<!-- Scoped dark theme on a card -->
<ui-lib-card [theme]="darkTheme">
  <ui-lib-button>Also dark</ui-lib-button>
</ui-lib-card>

<!-- Or using directive -->
<div [uiLibTheme]="darkTheme">
  <ui-lib-button>Themed button</ui-lib-button>
</div>

<!-- Or data attribute -->
<ui-lib-card data-theme="dark">
  Content uses dark theme
</ui-lib-card>
```

### Decision Summary

- **Primary**: Directive that applies CSS variables to a host element.
- **Secondary**: Component input that delegates to the directive or applies variables directly.
- **Fallback**: `data-theme` attribute supported for static switching and CSS-only usage.

## Implementation Options (Evaluation)

### Option A: CSS Custom Property Scoping
- **Pros**: Fast, pure CSS cascade, works with any DOM nesting.
- **Cons**: Requires careful variable naming and complete variable coverage.

### Option B: Angular Context/DI
- **Pros**: Type-safe and Angular-native.
- **Cons**: Does not automatically apply CSS vars; requires extra bridging.

### Option C: Directive with CSS Variable Application
- **Pros**: Works with any element, easy to adopt, aligns with existing CSS var model.
- **Cons**: Must manage variable merging and updates.

### Recommendation
- **Option C + Option A**: A directive applies CSS variables to its host element, leveraging CSS cascade for inheritance. `data-theme` remains a static override option.

## Theme Scope Interface

```typescript
export interface ThemeScopeConfig {
  // Full preset override
  preset?: ThemePreset;

  // Or partial overrides
  colorScheme?: 'light' | 'dark';
  colors?: Partial<ThemePresetColors>;
  variant?: ThemeVariant;

  // Individual CSS variables
  variables?: Record<string, string>;
}
```

## Directive Specification

```typescript
@Directive({
  selector: '[uiLibTheme]',
  standalone: true,
})
export class ThemeScopeDirective {
  uiLibTheme = input<ThemeScopeConfig | 'light' | 'dark'>();

  // Behavior:
  // - Resolve incoming config into CSS vars.
  // - Apply CSS vars to host element.
  // - Optionally set data-theme when colorScheme or string mode is provided.
  // - Support updates via input changes.
}
```

### Resolution Rules

1. If input is `'light' | 'dark'`, set `data-theme` and apply preset vars from built-ins.
2. If `preset` is provided, apply its resolved CSS vars.
3. Apply `colorScheme` overrides by setting `data-theme`.
4. Merge `colors` and `variant` onto a base preset (default or parent) and apply.
5. Apply `variables` last to allow per-scope overrides.

## Component Integration Plan

### Components That Accept `theme` Input

- Add a `theme = input<ThemeScopeConfig | 'light' | 'dark'>();` to components that should support scoped overrides (`Card`, `Tabs`, `Accordion`, `Select`, etc.).
- Implementation approach:
  - Prefer a shared utility that maps `ThemeScopeConfig` to CSS vars.
  - Apply vars to host element in `effect()` when input changes.
  - Set `data-theme` only when `colorScheme` is specified or input is a string.

```typescript
@Component({
  // ...
})
export class Card {
  theme = input<ThemeScopeConfig | 'light' | 'dark'>();

  // Apply to host for scoped overrides.
}
```

### Reuse Strategy

- Extract variable application logic into a shared theming helper:
  - `resolveThemeScope(config, basePreset): Record<string, string>`
  - `applyVarsToElement(element, vars)`
- Ensure helpers are used by both directive and component input to stay consistent.

## CSS Variable Scoping Strategy

### Cascade Model

- Each theme scope is applied on a container element.
- Children inherit CSS variables naturally.
- Inner scopes override outer scopes via normal CSS specificity and cascade.

### Data Attribute Support

- If `data-theme` is set on any element, CSS rules in `themes.scss` and `dark-theme.scss` apply within that subtree.
- This works alongside the directive: the directive can set `data-theme` when `colorScheme` is supplied.

## Inheritance and Nested Scopes

- Nested scopes merge on top of parent values.
- Directive/component should apply only the delta for the scope.
- The host element becomes the new source of truth for children.

## Examples

### Full preset override

```html
<div [uiLibTheme]="{ preset: darkPreset }">
  <ui-lib-card>Dark card inside dark scope</ui-lib-card>
</div>
```

### Partial overrides

```html
<ui-lib-card
  [theme]="{ colorScheme: 'dark', colors: { primary: '#90caf9' } }"
>
  <ui-lib-button>Primary adapted</ui-lib-button>
</ui-lib-card>
```

### Custom CSS vars

```html
<div [uiLibTheme]="{ variables: { '--uilib-card-bg': '#1e1e1e' } }">
  <ui-lib-card>Custom surface</ui-lib-card>
</div>
```

## Notes

- Use `ViewEncapsulation.None` to keep CSS vars cascading correctly across component boundaries.
- Avoid inline hardcoded colors in components; keep everything driven by CSS vars.
- Ensure any new CSS variable follows `LIBRARY_CONVENTIONS.md` naming guidelines.

