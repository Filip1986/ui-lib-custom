# SyntaxHighlighter

A lightweight, zero-dependency syntax highlighter for TypeScript, SCSS/CSS, and Angular HTML templates. No external libraries — pure regex tokenization with VS Code–inspired token colours, fully integrated with the `ui-lib-code-snippet` component.

## Package path

```ts
import { highlight, tokenize, escapeForCode } from 'ui-lib-custom/syntax-highlighter';
```

## Supported languages

| Language value | Highlights                                                                  |
| -------------- | --------------------------------------------------------------------------- |
| `'typescript'` | Keywords, strings, comments, decorators, built-in types, numbers, functions |
| `'html'`       | Tags, attributes, Angular bindings, control-flow blocks, interpolation      |
| `'scss'`       | Properties, variables, at-rules, selectors, numbers with units, hex colours |
| `'css'`        | Same tokenizer as `'scss'`                                                  |

## API

### `highlight(code, language): string`

Returns an HTML string with `<span class="uilib-token-{type}">` wrappers. All code content is HTML-escaped before wrapping — safe for `innerHTML`.

```ts
const html = highlight(myCode, 'typescript');
element.innerHTML = html;
```

### `tokenize(code, language): readonly SyntaxToken[]`

Returns the raw token array. Useful when you need to process tokens manually (e.g. virtual scrolling, custom rendering).

```ts
const tokens = tokenize(myCode, 'html');
tokens.forEach((token) => console.log(token.type, token.value));
```

### `escapeForCode(code): string`

HTML-escapes a plain code string without any token spans. Use this for unsupported languages.

## Token CSS classes

Each span carries a `uilib-token-{type}` class. The `ui-lib-code-snippet` component ships default VS Code–inspired colours via CSS custom properties:

| Class                       | Default colour          | Meaning                                                    |
| --------------------------- | ----------------------- | ---------------------------------------------------------- |
| `uilib-token-keyword`       | `#569cd6` (blue)        | TS keywords, Angular control-flow                          |
| `uilib-token-string`        | `#ce9178` (orange)      | String literals                                            |
| `uilib-token-comment`       | `#6a9955` (green)       | Comments                                                   |
| `uilib-token-number`        | `#b5cea8` (light green) | Numbers, hex colours                                       |
| `uilib-token-decorator`     | `#dcdcaa` (yellow)      | TypeScript decorators                                      |
| `uilib-token-type`          | `#4ec9b0` (teal)        | Built-in TypeScript types                                  |
| `uilib-token-function`      | `#dcdcaa` (yellow)      | Function/method names                                      |
| `uilib-token-variable`      | `#bd63c5` (purple)      | SCSS `$variables` and `--custom-props`                     |
| `uilib-token-at-rule`       | `#c586c0` (pink)        | `@mixin`, `@include`, `@if` …                              |
| `uilib-token-property`      | `#9cdcfe` (light blue)  | CSS property names                                         |
| `uilib-token-selector`      | `#d7ba7d` (gold)        | CSS selectors                                              |
| `uilib-token-unit`          | `#b5cea8` (light green) | Numbers with CSS units                                     |
| `uilib-token-tag`           | `#4ec9b0` (teal)        | HTML tag names                                             |
| `uilib-token-attr-name`     | `#9cdcfe` (light blue)  | HTML attribute names                                       |
| `uilib-token-attr-value`    | `#ce9178` (orange)      | HTML attribute values                                      |
| `uilib-token-binding`       | `#4fc1ff` (bright blue) | Angular `[prop]`, `(event)`, `[(two-way)]`, `*dir`, `#ref` |
| `uilib-token-interpolation` | `#dcdcaa` (yellow)      | Angular `{{ expression }}`                                 |

Override any colour via CSS custom properties on the host or a parent:

```css
ui-lib-code-snippet {
  --uilib-syntax-keyword: hotpink;
}
```

## Accessibility

- **Color-only cues:** Syntax highlighting uses color alone to differentiate token types, which may be insufficient for users with color-vision deficiency. Pair highlighted code blocks with screen-reader-accessible `<code>` elements and an `aria-label` describing the language (e.g., `aria-label="TypeScript example"`).
- **Forced colors / high contrast:** In `forced-colors: active` environments the browser overrides all custom color properties. Syntax tokens remain legible because the text is always plain characters — only the color differentiation is lost. Consider providing a plain text fallback or wrapping highlights in a `[data-forced-colors]` pattern.
- **Reduced motion:** The highlighter produces static HTML — no animations. No `prefers-reduced-motion` handling is required.
- **Screen reader output:** The `<span>` wrappers carry no ARIA roles or labels; they are purely visual. The underlying code text is always readable by screen readers because `aria-hidden` is not used. Add `role="region"` and `aria-label` to the containing `<pre>` / `<code>` block for landmark navigation.

## When to use

- Use `highlight()` when you need to insert pre-rendered HTML into the DOM (e.g. in `ui-lib-code-snippet`).
- Use `tokenize()` when you need access to individual tokens — for example, when building a custom renderer, a token-by-token virtual scroller, or a diff viewer.
- Use `escapeForCode()` when you want to display code in an unsupported language without token colours.
