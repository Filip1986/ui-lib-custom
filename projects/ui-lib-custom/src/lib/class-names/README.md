# ClassNames

Utility function and Angular pipe for composing CSS class strings from strings, conditional objects, and arrays — inspired by PrimeNG's `classNames` utility and the `classnames` npm package.

## Architecture

`ClassNames` is a **pure function + standalone Angular pipe** — there is no directive.

- `classNames(...)` — plain TypeScript function; safe to call anywhere (component class, computed signal, or template expression).
- `ClassNamesPipe` — a `pure: true` Angular pipe that wraps the function. Because the pipe is pure it only re-evaluates when its input references change, so it incurs **zero extra change-detection cost** compared to calling the function directly.
- No DOM manipulation of any kind — the utility only produces a class-string. All DOM class application is handled by Angular's `[class]` binding.

## Package path

```ts
import { classNames, ClassNamesPipe } from 'ui-lib-custom/class-names';
import type { ClassNameValue } from 'ui-lib-custom/class-names';
```

## API

### `classNames(...values: ClassNameValue[]): string`

A standalone function that combines its arguments into a single space-separated class string.

| Argument | Type | Description |
|---|---|---|
| `...values` | `ClassNameValue[]` | Strings, conditional objects, arrays, or falsy values |

### `ClassNamesPipe`

Pipe name: **`classNames`**

| Argument | Type | Description |
|---|---|---|
| `value` (primary) | `ClassNameValue` | Primary value passed before the pipe symbol |
| `...additional` | `ClassNameValue[]` | Optional extra values passed as pipe arguments after `:` |

### `ClassNameValue` type

```ts
type ClassNameValue =
  | string
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined | false>
  | ClassNameValue[];
```

Falsy primitives (`null`, `undefined`, `false`, `''`) are silently ignored.
Empty strings are also skipped — only non-empty truthy strings are included in the output.

## Usage

### Function (TypeScript)

```ts
import { classNames } from 'ui-lib-custom/class-names';

// Strings
classNames('foo', 'bar')                      // → 'foo bar'

// Conditional via boolean expression
classNames('btn', isActive && 'btn--active')  // → 'btn btn--active' (when true)

// Object: keys with truthy values included
classNames({ active: true, disabled: false }) // → 'active'

// Arrays: recursively flattened
classNames(['base', { highlight: true }])     // → 'base highlight'

// Falsy values are ignored
classNames('btn', null, undefined, false)     // → 'btn'

// Typical computed() usage
public readonly hostClasses = computed(() =>
  classNames('my-component', {
    'my-component--active': this.active(),
    'my-component--disabled': this.disabled(),
  })
);
```

### Pipe (template)

```ts
import { ClassNamesPipe } from 'ui-lib-custom/class-names';

@Component({
  imports: [ClassNamesPipe],
  template: `
    <!-- Object syntax -->
    <div [class]="{ active: isActive, disabled: isDisabled } | classNames"></div>

    <!-- String with extra object arg -->
    <div [class]="'btn' | classNames:{ 'btn--lg': isLarge }"></div>

    <!-- Array flattening -->
    <div [class]="['base', isActive && 'active'] | classNames"></div>
  `,
})
```

## Comparison with `[ngClass]`

| Feature | `[ngClass]` | `classNames` |
|---|---|---|
| Object syntax | ✅ | ✅ |
| Array syntax | ✅ | ✅ |
| String | ✅ | ✅ |
| Nested arrays | ❌ | ✅ |
| Composable in TypeScript | ❌ (template-only) | ✅ (pure function) |
| Works in `computed()` signals | ❌ | ✅ |
| Works in `HostBinding` / `host` | limited | ✅ |
| Pure (no re-run on every CD cycle) | ❌ | ✅ (pipe is `pure: true`) |
| No directive needed | N/A | ✅ (pipe or function only) |

Prefer `classNames` over `[ngClass]` when you need to compose classes in TypeScript (e.g. `computed()` signals, `host` metadata) or when you want guaranteed pure-pipe semantics in templates.

## Accessibility

`classNames` is ARIA-neutral by design:

- It **never reads or writes DOM attributes** — it only produces a class string.
- ARIA-state classes (`.is-expanded`, `.is-disabled`, `.is-selected`, etc.) pass through unchanged based solely on the boolean values you supply.
- It cannot interfere with `aria-*` attributes, `role`, or any other accessibility semantics on the host element.

## Composability

Because `classNames` is a plain function it works on **any host element or component**, regardless of encapsulation:

- `host: { '[class]': 'hostClasses()' }` — library components use `computed()` signals
- `[class]="... | classNames"` — in any template
- TypeScript code — in services, guards, resolvers, or wherever class strings are needed
