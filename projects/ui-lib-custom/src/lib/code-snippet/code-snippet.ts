import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  signal,
  computed,
  inject,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { highlight, escapeForCode } from '../syntax-highlighter/syntax-highlighter';
import type { SyntaxLanguage } from '../syntax-highlighter/syntax-highlighter.types';
import type {
  CodeSnippetLanguage,
  CodeSnippetVariant,
  CodeSnippetSize,
} from './code-snippet.types';

export type {
  CodeSnippetLanguage,
  CodeSnippetVariant,
  CodeSnippetSize,
} from './code-snippet.types';

const LANGUAGE_LABELS: Record<CodeSnippetLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  bash: 'Bash',
  shell: 'Shell',
  text: 'Plain Text',
} as const;

/** Languages the built-in syntax tokenizer supports. */
const HIGHLIGHTED_LANGUAGES: Set<string> = new Set<string>(['typescript', 'html', 'scss', 'css']);

/**
 * Code snippet display component with macOS-style window chrome, line numbers, and copy-to-clipboard.
 * TypeScript, HTML, SCSS, and CSS code is syntax-highlighted using the built-in tokenizer.
 */
@Component({
  selector: 'ui-lib-code-snippet',
  standalone: true,
  imports: [],
  templateUrl: './code-snippet.html',
  styleUrl: './code-snippet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CodeSnippet {
  /** The raw code string to display. */
  public readonly code: InputSignal<string> = input<string>('');
  /** Programming language — used to label the tab and select the syntax tokenizer. */
  public readonly language: InputSignal<CodeSnippetLanguage> = input<CodeSnippetLanguage>('text');
  /** Optional filename shown in the tab bar. Falls back to the language label. */
  public readonly filename: InputSignal<string | null> = input<string | null>(null);
  /** Show or hide macOS-style window chrome (traffic-light dots). */
  public readonly showWindowChrome: InputSignal<boolean> = input<boolean>(true);
  /** Show or hide the line number gutter. */
  public readonly showLineNumbers: InputSignal<boolean> = input<boolean>(true);
  /** Show or hide the copy-to-clipboard button. */
  public readonly showCopyButton: InputSignal<boolean> = input<boolean>(true);
  /** Design variant; falls back to the active ThemeConfigService variant. */
  public readonly variant: InputSignal<CodeSnippetVariant | null> =
    input<CodeSnippetVariant | null>(null);
  /** Size token that controls font size and padding. */
  public readonly size: InputSignal<CodeSnippetSize> = input<CodeSnippetSize>('md');
  /** Optional CSS max-height for the code body (e.g. "300px"). */
  public readonly maxHeight: InputSignal<string | null> = input<string | null>(null);
  /** Extra CSS classes forwarded to the root element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted after the code is successfully copied to the clipboard. */
  public readonly codeCopied: OutputEmitterRef<void> = output<void>();

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  /** Whether the copy-success state is currently active. */
  public readonly copied: WritableSignal<boolean> = signal<boolean>(false);

  public readonly effectiveVariant: Signal<CodeSnippetVariant> = computed<CodeSnippetVariant>(
    (): CodeSnippetVariant => this.variant() ?? this.themeService.variant()
  );

  public readonly lines: Signal<readonly string[]> = computed<readonly string[]>(
    (): readonly string[] => this.code().split('\n')
  );

  public readonly displayFilename: Signal<string> = computed<string>((): string => {
    const filename: string | null = this.filename();
    if (filename !== null) return filename;
    return LANGUAGE_LABELS[this.language()];
  });

  public readonly accessibleLabel: Signal<string> = computed<string>((): string => {
    const filename: string | null = this.filename();
    const languageLabel: string = LANGUAGE_LABELS[this.language()];
    if (filename !== null) return `Code snippet: ${filename}`;
    return `${languageLabel} code snippet`;
  });

  public readonly rootClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-code-snippet__card',
      `ui-lib-code-snippet--${this.effectiveVariant()}`,
      `ui-lib-code-snippet--${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra !== null) classes.push(extra);
    return classes.join(' ');
  });

  /** Syntax-highlighted HTML for the code body, safe to bind with [innerHTML]. */
  public readonly highlightedCode: Signal<SafeHtml> = computed<SafeHtml>((): SafeHtml => {
    const language: CodeSnippetLanguage = this.language();
    const rawCode: string = this.code();
    const html: string = HIGHLIGHTED_LANGUAGES.has(language)
      ? highlight(rawCode, language as SyntaxLanguage)
      : escapeForCode(rawCode);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  /** Handles the copy button click. Delegates to the async clipboard operation. */
  public onCopy(): void {
    void this.copyToClipboard();
  }

  private async copyToClipboard(): Promise<void> {
    const text: string = this.code().trimEnd();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      this.fallbackCopy(text);
    }
    this.copied.set(true);
    this.codeCopied.emit();
    setTimeout((): void => {
      this.copied.set(false);
    }, 2000);
  }

  /** Executes a textarea-based copy as a fallback when the Clipboard API is unavailable. */
  private fallbackCopy(text: string): void {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
