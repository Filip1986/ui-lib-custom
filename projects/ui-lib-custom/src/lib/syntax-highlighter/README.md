# SyntaxHighlighter

A lightweight, zero-dependency syntax highlighter for TypeScript, SCSS/CSS, and Angular HTML templates. No external libraries — pure regex tokenization with VS Code–inspired token colours, fully integrated with the `ui-lib-code-snippet` component.

## Package path

```ts
import { highlight, tokenize, escapeForCode } from 'ui-lib-custom/syntax-highlighter';
```

## Supported languages

| Language value | Highlights |
|---|---|
| `'typescript'` | Keywords, strings, comments, decorators, built-in types, numbers, functions |
| `'html'` | Tags, attributes, Angular bindings, control-flow blocks, interpolation |
| `'scss'` | Properties, variables, at-rules, selectors, numbers with units, hex colours |
| `'css'` | Same tokenizer as `'scss'` |

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
tokens.forEach(token => console.log(token.type, token.value));
```

### `escapeForCode(code): string`

HTML-escapes a plain code string without any token spans. Use this for unsupported languages.

## Token CSS classes

Each span carries a `uilib-token-{type}` class. The `ui-lib-code-snippet` component ships default VS Code–inspired colours via CSS custom properties:

| Class | Default colour | Meaning |
|---|---|---|
| `uilib-token-keyword` | `#569cd6` (blue) | TS keywords, Angular control-flow |
| `uilib-token-string` | `#ce9178` (orange) | String literals |
| `uilib-token-comment` | `#6a9955` (green) | Comments |
| `uilib-token-number` | `#b5cea8` (light green) | Numbers, hex colours |
| `uilib-token-decorator` | `#dcdcaa` (yellow) | TypeScript decorators |
| `uilib-token-type` | `#4ec9b0` (teal) | Built-in TypeScript types |
| `uilib-token-function` | `#dcdcaa` (yellow) | Function/method names |
| `uilib-token-variable` | `#bd63c5` (purple) | SCSS `$variables` and `--custom-props` |
| `uilib-token-at-rule` | `#c586c0` (pink) | `@mixin`, `@include`, `@if` … |
| `uilib-token-property` | `#9cdcfe` (light blue) | CSS property names |
| `uilib-token-selector` | `#d7ba7d` (gold) | CSS selectors |
| `uilib-token-unit` | `#b5cea8` (light green) | Numbers with CSS units |
| `uilib-token-tag` | `#4ec9b0` (teal) | HTML tag names |
| `uilib-token-attr-name` | `#9cdcfe` (light blue) | HTML attribute names |
| `uilib-token-attr-value` | `#ce9178` (orange) | HTML attribute values |
| `uilib-token-binding` | `#4fc1ff` (bright blue) | Angular `[prop]`, `(event)`, `[(two-way)]`, `*dir`, `#ref` |
| `uilib-token-interpolation` | `#dcdcaa` (yellow) | Angular `{{ expression }}` |

Override any colour via CSS custom properties on the host or a parent:

```css
ui-lib-code-snippet {
  --uilib-syntax-keyword: hotpink;
}
```
