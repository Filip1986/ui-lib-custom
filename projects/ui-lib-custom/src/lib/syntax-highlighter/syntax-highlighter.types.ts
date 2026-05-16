/** Languages the built-in tokenizer understands. */
export type SyntaxLanguage = 'typescript' | 'scss' | 'css' | 'html';

/** Token category assigned to each matched segment. */
export type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'decorator'
  | 'type'
  | 'tag'
  | 'attr-name'
  | 'attr-value'
  | 'punctuation'
  | 'property'
  | 'variable'
  | 'selector'
  | 'operator'
  | 'function'
  | 'at-rule'
  | 'unit'
  | 'interpolation'
  | 'binding'
  | 'plain';

/** A single classified segment of source code. */
export interface SyntaxToken {
  readonly type: TokenType;
  readonly value: string;
}
