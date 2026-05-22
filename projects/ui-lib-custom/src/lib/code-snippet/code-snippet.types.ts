export type CodeSnippetLanguage =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'scss'
  | 'json'
  | 'bash'
  | 'shell'
  | 'text';

export type CodeSnippetVariant = 'material' | 'bootstrap' | 'minimal';

export type CodeSnippetSize = 'sm' | 'md' | 'lg';

/** A single file tab entry for the multi-tab code snippet. */
export interface CodeSnippetFile {
  /** Filename shown in the tab (e.g. "app.component.ts"). */
  filename: string;
  /** Language used for syntax highlighting and the language icon. */
  language: CodeSnippetLanguage;
  /** Raw code string to display when this tab is active. */
  code: string;
}
