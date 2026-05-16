import type { SyntaxLanguage, SyntaxToken, TokenType } from './syntax-highlighter.types';

export type { SyntaxLanguage, SyntaxToken, TokenType } from './syntax-highlighter.types';

interface PatternDef {
  readonly type: TokenType;
  readonly pattern: RegExp;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function runTokenizer(code: string, patterns: readonly PatternDef[]): readonly SyntaxToken[] {
  const combined: RegExp = new RegExp(
    patterns.map((definition: PatternDef): string => `(${definition.pattern.source})`).join('|'),
    'g'
  );

  const tokens: SyntaxToken[] = [];
  let lastIndex: number = 0;

  let match: RegExpExecArray | null;
  while ((match = combined.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', value: code.slice(lastIndex, match.index) });
    }

    const groupIndex: number = match
      .slice(1)
      .findIndex((group: string | undefined): boolean => group !== undefined);

    tokens.push({ type: patterns[groupIndex]!.type, value: match[0] });
    lastIndex = combined.lastIndex;

    if (match[0].length === 0) {
      combined.lastIndex++;
    }
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) });
  }

  return tokens;
}

function tokensToHtml(tokens: readonly SyntaxToken[]): string {
  return tokens
    .map((token: SyntaxToken): string => {
      const escaped: string = escapeHtml(token.value);
      if (token.type === 'plain') return escaped;
      return `<span class="uilib-token-${token.type}">${escaped}</span>`;
    })
    .join('');
}

// ─── TypeScript ───────────────────────────────────────────────────────────────

const TS_KEYWORDS: string = [
  'abstract',
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'declare',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'get',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'module',
  'namespace',
  'new',
  'null',
  'of',
  'override',
  'private',
  'protected',
  'public',
  'readonly',
  'return',
  'set',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'type',
  'typeof',
  'undefined',
  'var',
  'void',
  'while',
  'yield',
].join('|');

const TS_BUILTIN_TYPES: string = [
  'any',
  'bigint',
  'boolean',
  'never',
  'number',
  'object',
  'string',
  'symbol',
  'unknown',
  'Array',
  'Map',
  'Set',
  'Promise',
  'Record',
  'Partial',
  'Required',
  'Readonly',
  'Pick',
  'Omit',
  'Exclude',
  'Extract',
  'NonNullable',
  'ReturnType',
  'Parameters',
  'ConstructorParameters',
  'InstanceType',
  'Signal',
  'WritableSignal',
  'InputSignal',
  'OutputEmitterRef',
].join('|');

const TS_PATTERNS: readonly PatternDef[] = [
  { type: 'comment', pattern: /\/\*[\s\S]*?\*\/|\/\/[^\n]*/ },
  { type: 'string', pattern: /`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/ },
  { type: 'decorator', pattern: /@[a-zA-Z_$][\w$]*/ },
  { type: 'keyword', pattern: new RegExp(`\\b(?:${TS_KEYWORDS})\\b`) },
  { type: 'type', pattern: new RegExp(`\\b(?:${TS_BUILTIN_TYPES})\\b`) },
  {
    type: 'number',
    pattern: /\b(?:0x[\da-fA-F]+|0o[0-7]+|0b[01]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?n?)\b/,
  },
  { type: 'function', pattern: /\b[a-zA-Z_$][\w$]*(?=\s*\()/ },
  { type: 'operator', pattern: /=>|\.\.\.|\?\?|&&|\|\||[+\-*/%=<>!&|^~?]/ },
  { type: 'punctuation', pattern: /[{}[\]();,.]/ },
];

// ─── SCSS / CSS ───────────────────────────────────────────────────────────────

const SCSS_PATTERNS: readonly PatternDef[] = [
  { type: 'comment', pattern: /\/\*[\s\S]*?\*\/|\/\/[^\n]*/ },
  { type: 'string', pattern: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/ },
  { type: 'at-rule', pattern: /@[\w-]+/ },
  { type: 'variable', pattern: /\$[\w-]+|--[\w-]+/ },
  // Hex colors before generic numbers so #abc isn't split into # + abc
  { type: 'number', pattern: /#[\da-fA-F]{3,8}\b/ },
  {
    type: 'unit',
    pattern:
      /\b\d+(?:\.\d+)?(?:%|px|em|rem|vh|vw|vmin|vmax|dvh|dvw|svh|svw|ch|ex|fr|deg|rad|turn|grad|s|ms|dpi|dpcm|dppx)\b/,
  },
  { type: 'number', pattern: /\b\d+(?:\.\d+)?\b/ },
  // Property names: word chars before `:` that is not `::` (pseudo-elements)
  { type: 'property', pattern: /\b[\w-]+(?=\s*:(?!:))/ },
  { type: 'selector', pattern: /[.#&][\w-]*|::?[\w-]+|\*(?=[\s{,>+~])/ },
  { type: 'function', pattern: /[\w-]+(?=\s*\()/ },
  { type: 'punctuation', pattern: /[{}();:,]/ },
];

// ─── HTML / Angular templates ─────────────────────────────────────────────────

const HTML_PATTERNS: readonly PatternDef[] = [
  { type: 'comment', pattern: /<!--[\s\S]*?-->/ },
  // Angular control-flow blocks
  {
    type: 'keyword',
    pattern: /@(?:if|else|for|switch|case|default|empty|defer|placeholder|loading|error|let)\b/,
  },
  // {{ interpolation }}
  { type: 'interpolation', pattern: /\{\{[\s\S]*?\}\}/ },
  // Angular bindings: [(two-way)], [property], (event), *structural, #ref
  { type: 'binding', pattern: /\[\([\w.]+\)\]|\[[\w.@*#:-]+\]|\([\w.:]+\)|\*\w+|#\w+/ },
  // Tag name (opening <tag or closing </tag)
  { type: 'tag', pattern: /<\/?[a-zA-Z][a-zA-Z0-9-]*/ },
  // Quoted attribute values (run before attr-name so values are captured first)
  { type: 'attr-value', pattern: /"[^"]*"|'[^']*'/ },
  // Attribute name immediately before `=`
  { type: 'attr-name', pattern: /\b[\w-]+(?=\s*=)/ },
  { type: 'punctuation', pattern: /[<>/=]/ },
];

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Tokenizes source code for the given language.
 * Returns a flat array of typed tokens — useful for custom rendering or analysis.
 */
export function tokenize(code: string, language: SyntaxLanguage): readonly SyntaxToken[] {
  switch (language) {
    case 'typescript':
      return runTokenizer(code, TS_PATTERNS);
    case 'scss':
    case 'css':
      return runTokenizer(code, SCSS_PATTERNS);
    case 'html':
      return runTokenizer(code, HTML_PATTERNS);
  }
}

/**
 * Highlights source code for the given language and returns a safe HTML string.
 *
 * Each recognized token is wrapped in `<span class="uilib-token-{type}">`.
 * All code content is HTML-escaped before wrapping, so the result is safe to
 * set as `innerHTML` inside a `<code>` element.
 *
 * For languages outside the supported set, pass the result through `escapeForCode`
 * to get plain escaped HTML without any span wrappers.
 *
 * @param code - Raw source code string
 * @param language - One of `'typescript' | 'scss' | 'css' | 'html'`
 * @returns HTML string with `<span>` token wrappers
 */
export function highlight(code: string, language: SyntaxLanguage): string {
  return tokensToHtml(tokenize(code, language));
}

/**
 * HTML-escapes a plain code string without applying any syntax token spans.
 * Use this for languages the built-in tokenizer does not support.
 */
export function escapeForCode(code: string): string {
  return escapeHtml(code);
}
