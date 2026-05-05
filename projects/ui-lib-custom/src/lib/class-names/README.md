# ClassNames

Utility function and Angular pipe for composing CSS class strings from strings, conditional objects, and arrays — inspired by PrimeNG's `classNames` utility and the `classnames` npm package.

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
