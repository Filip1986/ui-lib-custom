# CodeSnippet

**Selector:** `ui-lib-code-snippet`  
**Package:** `ui-lib-custom/code-snippet`  
**Category:** Data display

A styled code display card with macOS-style window chrome, a language-labelled tab bar, optional line numbers, and a one-click copy-to-clipboard button.

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `code` | `string` | `''` | Raw code string to display. Angular escapes it automatically — no XSS risk. |
| `language` | `CodeSnippetLanguage` | `'text'` | Drives the tab label and `data-language` attribute on `<pre>`. |
| `filename` | `string \| null` | `null` | Overrides the tab label with the actual filename when provided. |
| `variant` | `CodeSnippetVariant \| null` | `null` | Design variant (`material`, `bootstrap`, `minimal`). Falls back to ThemeConfigService. |
| `size` | `CodeSnippetSize` | `'md'` | Font size + padding scale: `'sm'`, `'md'`, `'lg'`. |
| `showWindowChrome` | `boolean` | `true` | Show/hide macOS traffic-light dots. |
| `showLineNumbers` | `boolean` | `true` | Show/hide the line number gutter. |
| `showCopyButton` | `boolean` | `true` | Show/hide the copy-to-clipboard button. |
| `maxHeight` | `string \| null` | `null` | CSS max-height on the code body (e.g. `'300px'`). Body scrolls on overflow. |
| `styleClass` | `string \| null` | `null` | Extra CSS classes appended to the root element. |

## Outputs

| Output | Type | Description |
|---|---|---|
| `codeCopied` | `void` | Emitted after the code is copied to the clipboard. |

## Supported languages

`'javascript'` · `'typescript'` · `'html'` · `'css'` · `'scss'` · `'json'` · `'bash'` · `'shell'` · `'text'`

---

## Minimal usage

```typescript
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

@Component({
  imports: [CodeSnippet],
  template: `
    <ui-lib-code-snippet
      language="typescript"
      filename="app.ts"
      [code]="myCode"
    />
  `,
})
export class MyComponent {
  public readonly myCode = 'const x: number = 42;';
}
```

## Content projection

This component does not use content projection. All inputs are signal-based.

## CSS custom properties

| Variable | Default | Description |
|---|---|---|
| `--uilib-code-snippet-bg` | `#1e1e2e` | Editor background colour |
| `--uilib-code-snippet-header-bg` | `#181825` | Header/titlebar background |
| `--uilib-code-snippet-text` | `#cdd6f4` | Code text colour |
| `--uilib-code-snippet-border` | `#313244` | Border and separator colour |
| `--uilib-code-snippet-line-nr-bg` | `#181825` | Line number gutter background |
| `--uilib-code-snippet-line-nr-text` | `#45475a` | Line number text colour |
| `--uilib-code-snippet-font` | `JetBrains Mono, …` | Monospace font stack |
| `--uilib-code-snippet-dot-close` | `#ff5f56` | Close dot colour |
| `--uilib-code-snippet-dot-minimize` | `#ffbd2e` | Minimize dot colour |
| `--uilib-code-snippet-dot-maximize` | `#27c93f` | Maximize dot colour |

## Accessibility

- Root element has `role="region"` and an auto-computed `aria-label` based on filename or language.
- Line numbers and window chrome are `aria-hidden="true"`.
- Copy button has a descriptive `aria-label` that updates to `"Copied!"` on success and uses `aria-pressed`.
- Full keyboard accessibility with visible `:focus-visible` ring.
- `prefers-reduced-motion` disables all transitions.
- `forced-colors` mode draws a solid border and preserves dot colours.
