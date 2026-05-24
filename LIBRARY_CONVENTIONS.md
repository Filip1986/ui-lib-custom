# Angular UI Library Conventions

## Purpose

- Build a PrimeNG-like Angular library that is lighter, tree-shakable, and easy to theme/customize for new projects.
- Prioritize DX: predictable API shapes, sensible defaults, and minimal setup to swap themes or override styles.
  This library enables rapid project bootstrapping by providing:

1. Pre-built component variants (Material, Bootstrap, Minimal) for different aesthetics
2. Runtime theme customization via CSS variables
3. Theme presets that can be saved/loaded as JSON configs
4. A demo app with live preview and theme editor

## Active Conventions

Use this section for rules that still cause real regressions and should be checked on every task.

## AI Agent & Development Environment

> **Start here.** Before writing any code, read `AI_AGENT_CONTEXT.md` (project root) for the
> current component inventory, active work, and common task playbooks. Then read the relevant
> section of this file.

### Environment

- **Terminal:** Use **`bash.exe`** for all terminal commands (the workspace default shell on Windows).
  - **Do not use PowerShell** — ESLint exits with code 1 even on clean runs under PowerShell, making pass/fail indistinguishable. Always use `bash.exe`.
  - If PowerShell blocks `.ps1` shims (execution policy), run the `.cmd` equivalents (`npm.cmd`, `npx.cmd`) from `bash.exe` instead. Record any workarounds in the session handoff.
  - All command examples in this file and in `AGENTS.md` assume `bash.exe` syntax.
- **Custom Components First:** Always use `ui-lib-*` components in demos and new features.
  Never reach for PrimeNG or Angular Material as a substitute when a custom equivalent exists.
  This enforces dogfooding, surfaces gaps, and ensures library consistency.

### Recommended Reading Order

1. `AI_AGENT_CONTEXT.md` — component inventory, file map, active work, task playbooks
2. `LIBRARY_CONVENTIONS.md` (this file) — all architectural rules and patterns
3. Component doc at `docs/reference/components/<n>.md` — if working on a specific component
4. `docs/architecture/` — if working on cross-cutting concerns (entry points, theming, tokens)

### Code Quality Checklist

Run through this mentally before submitting any output.

#### Active checks (enforce on every task)

- [ ] **ESLint passes with zero errors and zero warnings** — run `npx eslint <changed-files> --max-warnings 0` before declaring any task complete. This is non-negotiable: a passing build with lint errors is not a passing build.
- [ ] `ViewEncapsulation.None` present on every library component
- [ ] All return types are explicit — no inference on class members, public APIs, or `computed()`
- [ ] **Cross-entry-point imports use package paths** — `import { X } from 'ui-lib-custom/button'`, never `from '../button'`. See [Cross-Entry Import Rule](#cross-entry-import-rule).
- [ ] Public component inputs use string union types — not constants objects
- [ ] Self-closing tags used for all components without projected content
- [ ] **No raw hex/px in CSS rule bodies** — add tokens to `design-tokens.ts` first. Hex values that appear as the *default value* of a CSS custom property definition (`--uilib-foo: #hex`) are acceptable — they ARE the token; document them in `design-tokens.ts`. See [Design Token Rule](#design-token-rule).
- [ ] If a new secondary entry point was added: `package.json` exports + `typesVersions` updated
- [ ] Component inventory in `AI_AGENT_CONTEXT.md` updated if component status changed
- [ ] **No output uses the `on*` prefix**
- [ ] **No output name matches a native DOM event** — see the [Output Naming Rules](#output-naming-rules) section for the full blocked list
- [ ] **No output is named `{signalName}Change` where `{signalName}` is a `model()` signal** — check every `model<>()` signal name in the component against every explicit `output<>()` name
- [ ] **No explicit `output()` that would cause double-fire** — if a component has a `@HostListener('focus')` or `@HostListener('blur')` AND an output with the same name, switch to imperative `addEventListener` in the constructor

#### [Historical] Migration checks (lower priority; preserved for context)

- [ ] [Historical] No new TypeScript enums — use `as const` constant objects
- [ ] [Historical] Template uses `@if`/`@for`/`@switch` block syntax — no `*ngIf`/`*ngFor`

### Anti-Patterns (Common Mistakes)

These have caused real regressions. Active anti-patterns are still common traps; historical anti-patterns are migration-era reminders kept for context.

#### Active Anti-Patterns

| Anti-pattern | Why it's wrong | Correct approach |
|---|---|---|
| Relative import across entry points | Causes circular package graphs and ng-packagr build errors; breaks published package consumers | Use `ui-lib-custom/<entry>` package paths for cross-entry imports: `import type { ButtonVariant } from 'ui-lib-custom/button'` not `from '../button'` |
| Missing `ViewEncapsulation.None` | CSS variables and animations do not cascade correctly | Always add it — no exceptions |
| Type inference on `computed()` arrow functions | ESLint `allowTypedFunctionExpressions: false` will fail the build | Always annotate: `computed<MyType>((): MyType => ...)` |
| Replacing public string union types with constants | Breaks the public API contract for consumers | Only extract *internal* repeated strings; leave public types as union literals |
| Padding on the `overflow: hidden` collapse wrapper | Padding "leaks" visibly during `grid-row` animation | Use three layers: clip wrapper -> padding wrapper -> content |
| Creating `public-api.ts` inside secondary entry folders | Not the established convention; ng-packagr handles it | `ng-package.json` points directly to `../src/lib/<n>/index.ts` |
| Raw hex/px in CSS rule bodies (`.ui-lib-foo { color: #hex }`) | Bypasses the token system; cannot be themed or overridden | Add to `design-tokens.ts`, derive a `--uilib-*` CSS variable, use `var(--uilib-*)` |
| Raw hex as a CSS variable value without a token reference (`--uilib-foo: #hex`) when a global token exists | The value is siloed; it won't update when the global token changes | Use `var(--uilib-color-neutral-300, #hex)` — global token first, hex as CSS fallback |
| Bootstrap variant hex values (`#0d6efd`, `#dee2e6`, `#495057`) treated as equivalent to Material global tokens | Bootstrap's palette is distinct; aliasing silently uses wrong color when the global token is customised | Document in `design-tokens.ts → BOOTSTRAP_APPEARANCE_COLORS`; use `var(--uilib-color-neutral-300, #dee2e6)` pattern — hex fallback stays Bootstrap-correct even when global token is overridden |
| Adding PrimeNG/Material components to demo pages | Undermines dogfooding; surfaces library gaps incorrectly | Use `ui-lib-*` equivalents; document gap in component inventory if none exists |
| `on*` prefix on outputs (`onClick`, `onFocus`, `onChange`) | Inconsistent with Angular's own event naming and the library standard | Name outputs without the prefix: `buttonClick`, `checkboxFocus`, `cascadeChange` |
| Output named after a native DOM event (`click`, `input`, `focus`, `blur`, `change`, `select`, `submit`, `keydown`, `scroll`, and ~40 others) | Angular registers both an output subscriber AND a native DOM listener on the host; native events bubbling from child elements trigger the handler twice — tests and real usage receive duplicate events | Prefix with a disambiguating component qualifier: `buttonClick`, `textareaFocus`, `dateSelect`, `checkboxChange`. See [Output Naming Rules](#output-naming-rules) for the full blocked list. |
| Explicit `output()` named `{signalName}Change` when `{signalName}` is a `model()` signal | Angular's `model<T>()` auto-generates an internal `{name}Change` event for `[(binding)]` two-way syntax; a second explicit output with the same name overwrites the binding — it receives the rich event object instead of `T`, corrupting host state and producing feedback loops | Give the explicit output a distinct name: `panelChange` instead of `visibleChange`; `treeChange` instead of `selectionChange` (when `selection` is a model). The `model()` internal event continues to work correctly. |
| Using `uilib-` as the element selector prefix (`uilib-accordion`) | `uilib-` is reserved for CSS custom properties (`--uilib-*`); element selectors use `ui-lib-` (with hyphen) to match every other component in the library | Element selectors: `ui-lib-accordion`; CSS variables: `--uilib-accordion-*` (two different intentional patterns — never mix them) |

#### [Historical] Resolved Anti-Patterns (Migration Notes)

| Anti-pattern | Why it's wrong | Correct approach |
|---|---|---|
| [Historical] `enum` instead of `as const` | Enums add runtime overhead and reduce tree-shaking | Use `export const MY_THING = { ... } as const` |
| [Historical] Using `*ngIf` / `*ngFor` | Legacy syntax inconsistent with Angular 21 codebase | Use `@if`, `@for (x of y; track z)`, `@switch` |

### Session Handoff Protocol

At the end of every productive session, output a brief handoff note and paste it into the
"Last Session" section of `AI_AGENT_CONTEXT.md`:

```
Date: YYYY-MM-DD
Changed: <what files/components were modified>
State: <what is complete, what is in-progress>
Next step: <the single most logical next action>
```

This is mandatory. It closes the loop between sessions and eliminates re-explanation of context.

## Framework & Architecture

- Angular 21+, standalone components only, `ChangeDetectionStrategy.OnPush`, signals for inputs/derived state.
- Host-first: avoid wrapper elements; apply styles via host bindings instead of extra DOM nodes.
- Strong typing on all inputs; provide defaults so components render well without configuration.
- Barrel exports stay tree-shakable; keep `sideEffects: false` and avoid global side effects.
- Templates should use Angular 21 block syntax (`@if/@else`, `@for` with `track`, `@switch`) for consistency in all new or touched code. Migration rationale is documented in `Historical Migration Notes`.
- **HTML Special Characters**: Always escape special characters in templates that could be interpreted by Angular. Use `&#123;` for `{` and `&#125;` for `}` when displaying literal braces (e.g., in code examples or documentation). Alternatively, use `{{ '{' }}` and `{{ '}' }}` for interpolation-safe output.
- **`ng-content` inside `@if` does not work for conditional slots.** Angular resolves content projection statically — the projected nodes are always instantiated by the parent, regardless of whether the `<ng-content>` tag is inside a conditional block. If you need a projection slot that is only *visible* sometimes (e.g. an overlay mask with optional custom content), always render the container element and toggle its visibility via a CSS class (`opacity: 0; pointer-events: none` ↔ visible). See `BlockUI` (`ui-lib-custom/block-ui`) for the established pattern.
- **Self-Closing Tags**: Use Angular's self-closing tag syntax whenever possible for cleaner, more concise templates. Prefer `<ui-lib-button />` over `<ui-lib-button></ui-lib-button>`. This applies to all components without projected content.
- **Explicit Typing**: Always provide explicit type annotations for return types, variables, and function parameters. Never rely on type inference for public APIs, class members, or any non-trivial expressions.

  ```typescript
  // ❌ Bad - implicit return type
  get viewportPresets() {
    return this.viewport?.presets() ?? [];
  }

  // ✅ Good - explicit return type
  get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  // ❌ Bad - implicit types
  const items = [];
  const config = { ... };

  // ✅ Good - explicit types
  const items: MenuItem[] = [];
  const config: ThemeConfig = { ... };

  // ❌ Bad - implicit parameter and return types
  function processItems(items) {
    return items.map(i => i.name);
  }

  // ✅ Good - explicit parameter and return types
  function processItems(items: Item[]): string[] {
    return items.map(i => i.name);
  }
  ```

## Code Style

### Inline Variables (Avoid Single-Use Assignments)

Do not assign a value to a named variable only to immediately `return` or pass it.
Inline it directly instead.

❌ Avoid:
```ts
const context: TabsContextItem = { ... };
return context;
```

✅ Prefer:
```ts
return { ... } satisfies TabsContextItem;
```

Use `satisfies Type` instead of `: Type` annotation when inlining a returned object literal,
as type annotations cannot be applied directly to return expressions without a variable.

**Exceptions — keep the variable when:**
- It is referenced more than once
- Naming it significantly clarifies complex logic
- A temporary debug breakpoint is intentional (remove before committing)

### Meaningful Names (No Abbreviations)

Always use full, descriptive names for variables, parameters, functions, and class members.
Do not shorten names to save keystrokes — the reader's comprehension matters more than the writer's convenience.

❌ Avoid:
```ts
function processBtn(e: Event, cfg: ButtonConfig): void { ... }
const idx = items.findIndex(i => i.val === target);
```

✅ Prefer:
```ts
function processButton(event: Event, config: ButtonConfig): void { ... }
const index = items.findIndex(item => item.value === target);
```

**Common offenders:**

| Shortcut | Meaningful name |
|---|---|
| `btn` | `button` |
| `e`, `evt` | `event` |
| `val` | `value` |
| `cfg` | `config` |
| `idx` | `index` |
| `el`, `elem` | `element` |
| `cb` | `callback` |
| `fn` | describe what it does: `handler`, `predicate`, `formatter` |
| `arr` | describe the contents: `items`, `options`, `entries` |
| `obj` | describe the shape: `config`, `preset`, `context` |
| `res` | `response` |
| `err` | `error` |
| `arg` | name what the argument actually represents |

**Allowed exceptions:**
- `id` — universally understood
- `url` — universally understood
- `i`, `j` — only inside classic `for` loops of 3 lines or fewer

### Separate Template Files

Always use a separate `.html` template file for components. Do not use inline `template` in the component decorator.

❌ Avoid:
```ts
@Component({
  selector: 'ui-lib-button',
  template: `<button>{{ label }}</button>`,
})
```

✅ Prefer:
```ts
@Component({
  selector: 'ui-lib-button',
  templateUrl: './button.component.html',
})
```

Same applies to styles — prefer `styleUrl` over inline `styles`.

### Explicit Method Return Types

Always specify the return type on every method, getter, and function.
Never rely on TypeScript inference for return types.

❌ Avoid:
```ts
getItems() {
  return this.items();
}
```

✅ Prefer:
```ts
getItems(): TabItem[] {
  return this.items();
}
```

Applies to: class methods, getters, arrow functions assigned to class members, and lifecycle hooks.

## API Surface (PrimeNG-inspired)

- Prefix selectors with `ui-lib-`. Inputs favor these patterns: `variant/appearance`, `severity|color`, `size`, `shape`, `state` (`disabled`, `loading`, `active`, `readonly`), `fullWidth`, `iconPosition`.
- Keep inputs declarative; avoid imperative setters. Derived values must use `computed()`.
- Favor composition via content projection over configuration explosion; expose lightweight structural parts (`header`, `footer`, `prefix`, `suffix` slots).
- Template control flow follows the Angular 21 block syntax (`@if/@for/@switch`) and signal-friendly bindings; no imperative DOM tweaks.

### Selector vs CSS Variable Prefix — Two Intentional Patterns

These two prefixes look similar but serve different purposes and must **never** be swapped:

| Context | Pattern | Example |
|---|---|---|
| Element selector | `ui-lib-{component}` (with hyphen after `ui`) | `ui-lib-button`, `ui-lib-accordion` |
| CSS custom property | `--uilib-{component}-{property}` (no hyphen in `uilib`) | `--uilib-button-bg`, `--uilib-accordion-border` |
| Host CSS class | `ui-lib-{component}--{modifier}` | `ui-lib-button--disabled`, `ui-lib-accordion--open` |

The `uilib-` CSS prefix intentionally omits the hyphen to keep property names shorter and to match the established PrimeNG-style `p-` token convention. The `ui-lib-` selector prefix matches Angular's multi-word custom-element convention. Both patterns are correct and intentional — do not "normalize" them.

---

## Output Naming Rules

These rules prevent two classes of Angular bugs that are invisible until runtime or integration tests.

### Rule 1 — No `on*` prefix

Outputs must not use an `on` prefix. The library standard is to name outputs as plain event verbs or nouns, consistent with Angular's own `(click)`, `(change)`, `(valueChange)` etc.

```typescript
// ❌ Wrong
public readonly onClick: OutputEmitterRef<MouseEvent> = output<MouseEvent>();
public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly onChange: OutputEmitterRef<ValueEvent> = output<ValueEvent>();

// ✅ Correct
public readonly buttonClick: OutputEmitterRef<MouseEvent> = output<MouseEvent>();
public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly change: OutputEmitterRef<ValueEvent> = output<ValueEvent>();
```

### Rule 2 — Never shadow a native DOM event name

When an Angular component declares a signal `output()` with the **same name as a native DOM event**, Angular registers **both** an output subscriber and a native DOM event listener on the host element. Any native event bubbling up from a child element fires the handler twice — once through the output subscription, once through the host's native listener.

**Blocked output names** (matches native DOM events):

`abort` · `animationend` · `animationstart` · `blur` · `change` · `click` · `close` · `contextmenu` · `copy` · `cut` · `dblclick` · `drag` · `dragend` · `dragenter` · `dragleave` · `dragover` · `dragstart` · `drop` · `error` · `focus` · `focusin` · `focusout` · `input` · `keydown` · `keypress` · `keyup` · `load` · `mousedown` · `mouseenter` · `mouseleave` · `mousemove` · `mouseout` · `mouseover` · `mouseup` · `paste` · `pointercancel` · `pointerdown` · `pointermove` · `pointerup` · `reset` · `resize` · `scroll` · `select` · `submit` · `touchcancel` · `touchend` · `touchmove` · `touchstart` · `transitionend` · `wheel`

**Naming strategy when the semantic name is blocked:** prefix with a component-specific qualifier that makes the intent clear.

```typescript
// ❌ Wrong — shadows native DOM event; double-fires in tests and real usage
public readonly click: OutputEmitterRef<ClickEvent> = output<ClickEvent>();
public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly blur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly input: OutputEmitterRef<InputEvent> = output<InputEvent>();
public readonly change: OutputEmitterRef<ChangeEvent> = output<ChangeEvent>();

// ✅ Correct — disambiguated with a component qualifier
// Use the component's primary noun (button, textarea, panel, item...) as qualifier
public readonly buttonClick: OutputEmitterRef<ClickEvent> = output<ClickEvent>();
public readonly textareaFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly textareaBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly valueChange: OutputEmitterRef<InputEvent> = output<InputEvent>();
public readonly panelChange: OutputEmitterRef<ChangeEvent> = output<ChangeEvent>();
```

**When no native DOM event conflict exists**, a plain semantic name is fine and preferred:

```typescript
// ✅ Fine — 'itemCommand', 'menuShow', 'slideEnd' are not native DOM event names
public readonly itemCommand: OutputEmitterRef<MenuItemEvent> = output<MenuItemEvent>();
public readonly menuShow: OutputEmitterRef<void> = output<void>();
public readonly slideEnd: OutputEmitterRef<SliderEvent> = output<SliderEvent>();
```

### Rule 3 — Never collide with a `model()` internal change event

Angular's `model<T>()` signal automatically generates an **internal** output named `{signalName}Change` to support two-way binding syntax (`[(signalName)]`). If a component also declares an explicit `output()` with the same name, the explicit output fires *after* the model's internal event and overwrites the consumer's bound variable with the rich event object instead of the plain `T` value — silently corrupting state.

```typescript
// ❌ Wrong — 'visibleChange' already exists as model<boolean>()'s internal binding event
public readonly visible: ModelSignal<boolean> = model<boolean>(false);
public readonly visibleChange: OutputEmitterRef<VisibleChangeEvent> = output<VisibleChangeEvent>();
// Emitting this puts a VisibleChangeEvent object into [(visible)] instead of a boolean.

// ✅ Correct — give the rich event output a distinct name
public readonly visible: ModelSignal<boolean> = model<boolean>(false);
public readonly panelChange: OutputEmitterRef<VisibleChangeEvent> = output<VisibleChangeEvent>();
// [(visible)] continues to receive booleans; panelChange carries the rich payload.
```

The rule is simple: **scan every `model()` signal name in the component; no explicit `output()` may be named `{thatName}Change`**.

**Real example from this codebase:** `tree-select` has `selection: model<TreeNode | null>()` which auto-generates `selectionChange` for two-way binding. It also needed a rich change event (with `originalEvent`). The collision was fixed by naming the explicit output `treeChange` instead of `selectionChange`.

**Naming strategy when the natural name is taken:** use a component-qualified verb or the component's primary noun — `panelChange`, `treeChange`, `listSelectionChange` — rather than the signal name + `Change`.

**Naming for components where `selection` is a model:** the component's explicit "rich" selection output must NOT be named `selectionChange`. Alternatives: `selectionEvent`, `selectionUpdated`, or a component-qualified name like `treeChange`.

### Rule 4 — `@HostListener` vs imperative `addEventListener` for focus/blur

If a component needs to listen to native `focus` or `blur` events on its own host element while also exposing outputs with similar semantics, **do not use `@HostListener('focus')` / `@HostListener('blur')`** — Angular's change detection interacts with `@HostListener` in ways that can cause circular dispatch when the output and the native listener fire in the same tick.

Use imperative `addEventListener` in the constructor instead:

```typescript
constructor() {
  const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  host.addEventListener('focus', (event: FocusEvent): void => {
    this.isFocused.set(true);
    this.textareaFocus.emit(event);
  });
}
```

This pattern is established in `cascade-select.ts` and should be followed whenever host focus/blur listeners are needed alongside outputs.

---

## Cross-Entry Import Rule

Secondary entry points are separate npm packages in the published build. Importing across entry-point boundaries using relative paths works during development but breaks the published package because the relative path resolves to source rather than to the compiled entry point.

**Rule:** Every cross-entry-point import in library source (`.ts` files under `src/lib/`) **must** use the package name, not a relative path.

```typescript
// ❌ Wrong — relative path crosses entry point boundary
import type { ButtonVariant, ButtonSize } from '../button';

// ✅ Correct — package path resolves to the correct entry point in all environments
import type { ButtonVariant, ButtonSize } from 'ui-lib-custom/button';
```

**Exceptions:**
- Imports within the *same* entry point (e.g., `cascade-select.ts` importing `./cascade-select.types`) — relative paths are fine and required here.
- Story files (`.stories.ts`) — excluded from the library build; relative imports are acceptable.
- Spec files (`.spec.ts`) — Jest resolves via the `moduleNameMapper` aliases; both work, but prefer package paths for consistency.

**Audit command** — run this to detect violations before any PR:
```bash
grep -rn "from '\.\./[a-z-]*'" projects/ui-lib-custom/src/lib/ --include="*.ts" \
  | grep -v ".spec.\|.stories.\|/[a-z-]*\.(types|constants|service|directive|pipe|spec)"
```

---

## Design Token Rule

### The three levels

| Level | Where | Example |
|---|---|---|
| **TypeScript constant** | `design-tokens.ts` | `BUTTON_APPEARANCE_COLORS.framedAccent = '#ffc82c'` |
| **CSS custom property** | SCSS file / ThemeConfigService | `--uilib-button-framed-bg: #ffc82c` |
| **Usage** | Component SCSS rule body | `background: var(--uilib-button-framed-bg)` |

### What is and isn't a violation

| Usage | OK? | Reason |
|---|---|---|
| `color: #hex` in a CSS rule body | ❌ **Violation** | Raw hex cannot be themed or overridden |
| `--uilib-foo: #hex` in a CSS variable *definition* block | ✅ **OK** (with caveat) | The CSS variable itself is the token; the hex is its default value |
| `--uilib-foo: var(--uilib-color-neutral-300, #hex)` in a definition | ✅ **Best** | References global token first; hex is CSS fallback |

### When a global token exists, always reference it

If the hex value corresponds to a color in the global palette (`COLOR_NEUTRAL`, `COLOR_PRIMARY`, etc.), use the generated CSS variable with a hex fallback:

```scss
// ❌ Standalone hex that ignores the global colour system
--uilib-bottom-sheet-header-border: 1px solid #dee2e6;

// ✅ Global token reference with hex fallback — updates when neutral-300 is customised
--uilib-bottom-sheet-header-border: 1px solid var(--uilib-color-neutral-300, #dee2e6);
```

### Appearance-specific colours

When CSS variable default values are specific to a component appearance (e.g., the framed, glass, or tactile button appearances), they may not map to any global token. In this case:

1. Add the colour as a constant to `design-tokens.ts` (see `BUTTON_APPEARANCE_COLORS` as the reference example)
2. Add a comment in the SCSS file linking to the TypeScript constant
3. Both files are the source of truth for that colour — keep them in sync

```scss
/* Framed appearance colour defaults
 * SOURCE OF TRUTH: design-tokens.ts › BUTTON_APPEARANCE_COLORS
 * Update both files when changing these values.
 */
--uilib-button-framed-bg: #ffc82c;
```

### Bootstrap variant colours

The library's global colour palette (`COLOR_NEUTRAL`, `COLOR_PRIMARY`, etc.) is Material-based. Bootstrap's palette is a **distinct colour system** — `#dee2e6` (Bootstrap's neutral border) is not the same as the library's `COLOR_NEUTRAL[300]` (`#e0e0e0`), and `#0d6efd` (Bootstrap's primary blue) is not the same as `COLOR_PRIMARY[600]` (`#1e88e5`).

**Never alias Bootstrap hex values to the Material global tokens as if they are equivalent.**

Bootstrap-specific hex values that have no global token equivalent are tracked in `design-tokens.ts → BOOTSTRAP_APPEARANCE_COLORS`. When referencing them in SCSS variable definitions, follow this pattern:

```scss
/* Bootstrap-specific colour defaults.
 * SOURCE OF TRUTH: design-tokens.ts › BOOTSTRAP_APPEARANCE_COLORS
 * These values are Bootstrap's palette and are NOT equivalent to the library's
 * Material-based global tokens — do not alias to COLOR_NEUTRAL/COLOR_PRIMARY.
 */
&.uilib-variant-bootstrap {
  --uilib-foo-border-color: var(--uilib-color-neutral-300, #dee2e6);
}
```

Note: `var(--uilib-color-neutral-300, #dee2e6)` is still correct — the CSS variable is the live token (overridable by consumers), and the hex is a **CSS fallback** that ensures the Bootstrap-correct colour when no global token override is in place. The hex is not asserting semantic equivalence to Material's neutral-300; it is the Bootstrap default colour for that slot.

---

## CSS Cascade Layer Rule

All library SCSS **must** be wrapped in a named `@layer` block. This is enforced globally and is
not optional for any component.

### Layer hierarchy

```
@layer uilib.base, uilib.tokens, uilib.components;
```

| Layer | Priority | Contents | Why |
|---|---|---|---|
| `uilib.base` | Lowest | Consumer CSS resets / normalizations | Resets should not override component padding/margin |
| `uilib.tokens` | Middle | `themes.scss` — all `:root` / `[data-theme]` CSS custom properties | Tokens below component styles; component-level tokens win |
| `uilib.components` | Highest (layered) | Every component `.scss` file | Component styles; unlayered consumer overrides always win |

The declaration `@layer uilib.tokens, uilib.components;` lives **only** in `themes.scss`.
Consumers who load `themes.scss` get the declaration automatically; they do not need to declare it themselves.

### Why this matters

Any CSS written **outside** a `@layer` automatically outranks all layered styles, regardless of
specificity. This means:

- Consumers can override any library style with a single class selector — no specificity fighting.
- No `!important` is needed for consumer overrides.
- Bootstrap/Material/any unlayered third-party CSS loaded alongside the library will override
  library styles (which is usually fine; consumers can wrap third-party libraries in their own
  layers if they need priority control).

### Authoring rule for contributors

**Every new component SCSS file must start with `@layer uilib.components {` and end with `}`.**

```scss
// ✅ Correct — new component file
@layer uilib.components {

ui-lib-my-component {
  --uilib-my-component-bg: var(--uilib-surface, #ffffff);
  display: block;
}

.ui-lib-my-component-inner {
  padding: var(--uilib-space-4, 1rem);
}

} // end @layer uilib.components
```

```scss
// ❌ Wrong — no layer wrapper (styles will fight consumers at specificity level)
ui-lib-my-component {
  --uilib-my-component-bg: var(--uilib-surface, #ffffff);
  display: block;
}
```

### Consumer reset rule (CRITICAL)

Any app-level CSS reset (`* { margin: 0; padding: 0 }`) **must** be placed in `@layer uilib.base`:

```scss
/* Consumer app styles.scss */
@use 'ui-lib-custom/themes/themes.scss' as *;  // establishes layer order first

@layer uilib.base {
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

/* html/body app-level defaults stay unlayered — intentionally beat all library layers */
html, body { font-family: var(--uilib-font-ui, sans-serif); }
```

**Why this is necessary:** Before `@layer`, a `*` reset had specificity `(0,0,0)` and naturally lost to component class selectors `(0,1,0)`. After `@layer`, any *unlayered* author CSS beats every layered rule regardless of specificity. An unlayered `* { padding: 0 }` would zero out every component's padding. Wrapping in `uilib.base` (lowest priority) restores the pre-`@layer` behaviour.

### Exception: high-contrast.scss

`projects/ui-lib-custom/src/lib/styles/high-contrast.scss` is intentionally kept **outside** any
`@layer`. It contains `@media (forced-colors: active)` overrides that must unconditionally beat all
layered styles. Do not wrap this file.

### `@keyframes` inside `@layer`

Animations declared with `@keyframes` inside `@layer uilib.components { }` are scoped to that layer.
This is fine — library keyframe names all carry the `uilib-*` prefix (e.g. `uilib-scroller-spin`),
so name collisions with consumer keyframes are prevented. Do not reference library `@keyframes` names
from outside the library.

### Reference

Full rationale: `docs/architecture/ADR_CSS_LAYER_ADOPTION.md`

---

## Styling & Theming

- SCSS for authoring; output uses CSS custom properties for runtime theming. No `::ng-deep` or global resets.
- Author component styles in SCSS only (no `.css` files); share mixins/variables and pull values from design tokens or CSS vars.
- CSS custom property naming:
  - Standard pattern: `--uilib-{component}-{property}[-{variant}][-{state}]`.
  - Component parts follow the component name (for example: `--uilib-accordion-header-padding`).
  - Variants append after the property (for example: `--uilib-card-shadow-material`).
  - States append last (for example: `--uilib-button-bg-hover`).
  - Reserved global prefixes (system tokens only):
    - `--uilib-color-*`, `--uilib-spacing-*`, `--uilib-radius-*`, `--uilib-shadow-*`, `--uilib-font-*`,
      `--uilib-transition-*`, `--uilib-z-*`, `--uilib-surface`/`--uilib-surface-*`, `--uilib-page-*`.
  - Avoid unprefixed or underscored variables (`--ui-*`, `--_tabs-*`) in public API.
- Theming layers (do not bypass):
  1. **Design tokens** (`design-tokens.ts`) define canonical values.
  2. **CSS variables**: expose tokens as `--uilib-*` on `:root` or `[data-theme]` scopes.
  3. **Component variables**: map CSS vars to component-specific fallbacks (e.g., `--uilib-button-bg`, `--uilib-card-shadow`).
  4. **State tokens**: hover/active/disabled values derived via CSS vars, not hardcoded colors.
- Theme switching: toggle `[data-theme="light|dark|brand-x"]` on `html/body`; each theme file sets only CSS vars.
- Tailwind-compatible: selectors stay simple, no mandatory global styles; allow consumers to set CSS vars via Tailwind `theme()` in `:root`.
- Typography mapping (via CSS vars):
  - Headings (`h1`-`h6`, `.heading`): `var(--uilib-font-heading)` + `--uilib-font-heading-weight`.
  - Body copy (`p`, `.body-text`): `var(--uilib-font-body)` + `--uilib-font-body-weight`.
  - UI text (buttons, labels, nav, form controls, `.btn`): `var(--uilib-font-ui)`.
  - Monospace (`code`, `pre`, `.monospace`): `var(--uilib-font-mono)`.
  - Theme presets supply these via `ThemePresetTypography`; `fontFamily` remains a backward-compatible alias for body/UI fonts.
- **View Encapsulation**: All library components **must** use `ViewEncapsulation.None`. This is critical for CSS variable cascading and transitions/animations to work correctly across component boundaries. Angular's default emulated encapsulation breaks theming by scoping selectors with `_ngcontent-*` attributes.
```typescript
  import { ViewEncapsulation } from '@angular/core';

  @Component({
    // ...
    encapsulation: ViewEncapsulation.None,  // Required for all ui-lib-* components
  })
```

## Theming

### Dark Mode

- All components support light and dark modes via CSS custom properties.
- Use `data-theme="dark"` on `html`/`body` (or a container) for global dark mode.
- Use `ThemeConfigService.setMode('auto' | 'light' | 'dark')` for programmatic control.
- System preference detection uses `prefers-color-scheme` when mode is `auto`.

### Theme Export

- **JSON**: Full preset configuration for persistence and sharing.
- **CSS**: CSS custom properties for runtime theming.
- **SCSS**: SCSS variables or map output for build-time usage.
- **Figma**: Tokens Studio-compatible JSON for design handoff.

### Scoped Theming

- Use `[uiLibTheme]` to scope a theme to a subtree.
- Use `theme` input on components that expose it (e.g., `ui-lib-card`).
- Nested scopes override parent scopes via CSS cascade.

## CSS Custom Properties Naming Convention

All CSS custom properties MUST follow this pattern:

`--uilib-{component}-{property}[-{state}]`

### Examples

- `--uilib-button-bg`
- `--uilib-button-bg-hover`
- `--uilib-select-dropdown-bg`
- `--uilib-accordion-header-padding`
- `--uilib-card-shadow`

### Reserved Global Prefixes

- `--uilib-color-*`        Color palette tokens
- `--uilib-spacing-*`      Spacing tokens
- `--uilib-radius-*`       Border radius tokens
- `--uilib-shadow-*`       Shadow tokens
- `--uilib-font-*`         Typography tokens
- `--uilib-surface`        Surface colors
- `--uilib-page-*`         Page-level variables

### Adding New Variables

1. Check if a design token exists first.
2. Use component name as first segment.
3. Use descriptive property name.
4. Add state suffix for interactive states (`-hover`, `-active`, `-disabled`).
5. Document in component SCSS with comments.

## Design Tokens

- Source of truth: `projects/ui-lib-custom/src/lib/design-tokens.ts` (spacing, colors, typography, shadows, z-index, transitions, sizing).
- Do not inline raw hex/px in components; reference tokens or CSS vars derived from them.
- If a token is missing, add to `design-tokens.ts` with typed keys before using it.

## Accessibility & UX

- ARIA-first: label every interactive element; honor `aria-disabled` when `disabled` is set.
- Keyboard support: tab focus, Enter/Space activation where appropriate; maintain visible focus ring (do not remove outline without replacement).
- Contrast: base tokens should meet WCAG AA by default; document any exceptions.

## Testing & Quality

- Unit tests per component (`*.spec.ts`) cover creation, input changes (signals), classes/styles, projected content, and accessibility roles.
- Jest is the sole test runner. Do not add Karma or Jasmine. Use `jest.fn()` / `jest.spyOn()` for mocks.
- Test scripts:
  - `npm test`
  - `npm run test:watch`
  - `npm run test:coverage`
- Run `npm test` in CI; add visual/diff tests later for theme regressions.
- **`jest.config.ts` `modulePathIgnorePatterns` must use separator-agnostic regexes on Windows.** Patterns prefixed with `<rootDir>/...` (forward slashes) fail to match on Windows because `<rootDir>` is replaced with a backslash path, producing mixed-separator strings that no regex matches. Always write path patterns using `[/\\\\]` to match either separator. The current `jest.config.ts` already does this; maintain the same style when adding new patterns.

## Packaging & Releases

- Built with `ng-packagr`; public surface defined in `projects/ui-lib-custom/src/public-api.ts` only.
- Keep exports flat; prefer per-component entry points for tree-shaking.
- Semantic versioning; document breaking changes in `docs/project/UPDATE_LOG.md`.

## Entry Points & Tree-Shaking

- Each component or feature should have a secondary entry point under `projects/ui-lib-custom/<entry>/`.
- Each entry point must include `ng-package.json`; `public-api.ts` is optional. The `ng-package.json` may point directly to `src/lib/<name>/index.ts` (current convention).
- Avoid re-exporting secondary entry points from the primary barrel to prevent circular package graphs.
- If a new entry point is added, update `projects/ui-lib-custom/package.json` exports and `typesVersions`.
- Keep entry point public APIs narrow and stable; internal code should import via relative `src/lib/...` paths.
- The `<entry>/src/` subfolder pattern is not used; do not create `public-api.ts` files inside secondary entry point folders.

## Documentation & Demos

- Update `docs/` when adding or changing components (API, usage, theming knobs, accessibility notes).
- Demo app lives in `projects/demo`; provide at least one example per component and per theme.
- Demos and docs should showcase the Angular 21 block syntax and SCSS usage (e.g., `@if`/`@for` plus token-driven SCSS snippets).
- Use TS path aliases for demo code: `@demo/shared/*` for shared utilities/components and `@demo/pages/*` for pages; keep them updated in `tsconfig.json` when moving files.

## Contribution Guidelines

- Maintain OnPush + signals + standalone pattern.
- Align new components to the API shape and theming layers above.
- No silent global CSS; scope everything to component hosts and CSS vars.

## Changelog & Versioning

- Maintain `CHANGELOG.md` at the project root.
- Follow the Keep a Changelog format.
- Follow Semantic Versioning.
- Document breaking changes immediately.
- Create migration guides for major/minor versions with breaking changes.

### Key Architectural Decisions

- **Variants** define structural/visual differences (e.g., floating label vs top label)
- **Themes** define colors, spacing, and shape via CSS variables
- Variants are chosen at component level; themes apply globally
- All components must react to theme changes without rebuild

## Comments

### When to comment
- **Always**: non-obvious logic, workarounds, ARIA decisions, CSS variable naming rationale
- **Never**: obvious code (`// increment counter` above `count++`)
- **Public API**: all exported classes and inputs must have JSDoc descriptions

### Format
- Prefer `//` for inline explanations
- Use `/** */` JSDoc for all exported symbols
- Reference related specs or issues for workarounds: `// See: https://...`

## Historical Migration Notes

These rules mattered during earlier migration phases and are preserved for onboarding context.
They are lower-priority checks compared to Active Conventions, but still documented to avoid backsliding.
All items in this section are labeled with `[Historical]` for quick scanning.

### [Historical] Angular Template Syntax Migration

- [Historical] During Angular 21 migration, the codebase standardized on block syntax.
- [Historical] Prefer `@if`, `@for`, and `@switch` over legacy `*ngIf`/`*ngFor` in all maintained code.
- [Historical] Legacy structural directives are considered resolved anti-patterns for this repository.

### [Historical] Constants & Enums

- [Historical] **Never use TypeScript `enum`**. Prefer `as const` objects — they have no runtime overhead,
  tree-shake cleanly, and compose naturally with string union types.
```typescript
  // ❌ Avoid
  enum ButtonSize { Sm = 'sm', Md = 'md', Lg = 'lg' }

  // ✅ Prefer
  export const BUTTON_SIZES = { Sm: 'sm', Md: 'md', Lg: 'lg' } as const;
  export type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];
```

- [Historical] **Public input types stay as string unions** (`type InputVariant = 'material' | 'bootstrap' | 'minimal'`).
  Do not replace these with enums or const objects — string unions are more ergonomic for consumers.

- [Historical] **Extract repeated internal strings to a co-located constants file** (`[component].constants.ts`)
  when a literal appears 2 or more times within the same component. This applies to CSS class names,
  ARIA attribute strings, and default value strings used in logic.

- [Historical] **Shared cross-component constants** belong in `src/lib/shared/constants.ts`. Only move a
  constant there if it is used in 3 or more components. Avoid over-centralizing component-specific values.

- [Historical] Do not export component-internal constants from secondary entry points unless they are
  explicitly part of the public API contract.
