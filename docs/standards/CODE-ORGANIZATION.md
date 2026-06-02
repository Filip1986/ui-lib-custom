# Code Organization Standards — ui-lib-custom

Consistency rules enforced by ESLint and Stylelint (auto-fix where noted). Applies to **library** (`projects/ui-lib-custom`) and **demo** (`projects/demo`).

> Formatting (line width, quotes, semicolons) remains **Prettier** (`npm run format`). This document covers **order and layout** only.

---

## TypeScript imports

**Tool:** `eslint-plugin-simple-import-sort` (`simple-import-sort/imports`, `simple-import-sort/exports`) — **auto-fix**.

**Group order:**

1. Side-effect imports (`import './polyfill'`)
2. `@angular/*`, `rxjs`
3. Other npm packages
4. `ui-lib-custom/*` (library entry points)
5. `@demo/*` (demo aliases)
6. Relative imports (`./` and `../`)

Within each group, imports are sorted **alphabetically**. Type-only imports stay in separate `import type` lines (`@typescript-eslint/consistent-type-imports`).

```bash
npx eslint path/to/file.ts --fix
```

---

## TypeScript class members

**Tool:** `@angular-eslint/sort-lifecycle-methods` — lifecycle hooks in **execution order** (`ngOnChanges` → … → `ngOnDestroy`).

**Documented convention** (review / refactor backlog — not ESLint-enforced today):

1. `inject()` and private state
2. `input()` / `output()` / `model()` / `viewChild` / `contentChild`
3. Internal `signal()` / `computed()` used only in the class
4. Constructor (if present)
5. Lifecycle hooks (sorted by the rule above)
6. Public API methods, then private helpers

`@typescript-eslint/member-ordering` is **not** enabled: Angular `output()` / `contentChild()` are often classified as methods by the rule, which produces false positives across large signal-based components.

---

## Angular HTML templates

**Tool:** `@angular-eslint/template/attributes-order` — **auto-fix**.

**Binding groups** (in order):

1. Structural (`@if`, `@for`, legacy `*ngIf` if any)
2. Template references (`#ref`)
3. Static attributes (`class`, `id`, `type`, `aria-*`, …)
4. Inputs (`[prop]`)
5. Two-way (`[(prop)]`)
6. Outputs (`(event)`)

Within each group, attributes are sorted **alphabetically** (case-insensitive).

Prettier still wraps lines; ESLint owns attribute order.

```bash
npx eslint path/to/file.html --fix
```

---

## SCSS / CSS declarations

**Tool:** `stylelint-order` → `order/properties-alphabetical-order` (custom properties excluded).

Properties inside each rule are sorted **alphabetically** (reported on CI; run `stylelint --fix` locally to apply — auto-fix is off in CI config because it can interact badly with nested BEM and the motion plugin). Token and architecture rules still apply. Demo SCSS uses `uilib/no-unprefixed-motion` as **warning** only (no auto-fix stubs).

```bash
npm run lint:css:fix
```

---

## Pre-commit and CI

| Stage          | Checks                                                                |
| -------------- | --------------------------------------------------------------------- |
| **pre-commit** | Prettier → ESLint (`.ts`, `.html`) → Stylelint (library `.scss` only) |
| **CI**         | `npm run lint`, `npm run format:check`, …                             |
| **Local**      | `npm run lint:fix` (if added) or `npx eslint . --fix`                 |

Run full fixes after pulling:

```bash
npx eslint "projects/ui-lib-custom/**/*.{ts,html}" "projects/demo/**/*.{ts,html}" --fix
npm run lint:css:fix
npm run format
```

---

## Related docs

- [`HTML-STANDARDS.md`](./HTML-STANDARDS.md) — a11y and template semantics
- [`CSS-STANDARDS.md`](./CSS-STANDARDS.md) — tokens and logical CSS
- [`LIBRARY_CONVENTIONS.md`](../../LIBRARY_CONVENTIONS.md) — architectural rules
