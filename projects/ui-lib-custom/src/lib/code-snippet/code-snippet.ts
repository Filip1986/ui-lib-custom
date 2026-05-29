import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
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
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { highlight, escapeForCode } from 'ui-lib-custom/syntax-highlighter';
import type { SyntaxLanguage } from 'ui-lib-custom/syntax-highlighter';
import type {
  CodeSnippetFile,
  CodeSnippetLanguage,
  CodeSnippetVariant,
  CodeSnippetSize,
} from './code-snippet.types';

export type {
  CodeSnippetFile,
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

const LANGUAGE_ICONS: Record<CodeSnippetLanguage, string | null> = {
  javascript: 'logos:javascript',
  typescript: 'logos:typescript-icon',
  html: 'logos:html-5',
  css: 'logos:css-3',
  scss: 'logos:sass',
  json: 'vscode-icons:file-type-json',
  bash: 'logos:bash',
  shell: 'logos:bash',
  text: null,
} as const;

/**
 * Code snippet display component with macOS-style window chrome, line numbers, copy-to-clipboard,
 * and IDE-style multi-file tab bar. Pass `[files]` for multiple tabs or `[code]`/`[language]`/
 * `[filename]` for the single-file (legacy) mode.
 */
@Component({
  selector: 'ui-lib-code-snippet',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './code-snippet.html',
  styleUrl: './code-snippet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CodeSnippet {
  private static nextId: number = 0;
  /** Unique ID prefix used for ARIA tab ↔ panel wiring. */
  public readonly instanceId: string = `ui-cs-${++CodeSnippet.nextId}`;

  // ── Multi-file input ───────────────────────────────────────────────────────

  /** Array of file tabs. When provided, overrides the single-file `code`/`language`/`filename` inputs. */
  public readonly files: InputSignal<CodeSnippetFile[]> = input<CodeSnippetFile[]>([]);

  // ── Single-file (legacy) inputs ────────────────────────────────────────────

  /** The raw code string to display (single-file mode). */
  public readonly code: InputSignal<string> = input<string>('');
  /** Programming language — used to label the tab and select the syntax tokenizer. */
  public readonly language: InputSignal<CodeSnippetLanguage> = input<CodeSnippetLanguage>('text');
  /** Optional filename shown in the tab bar. Falls back to the language label. */
  public readonly filename: InputSignal<string | null> = input<string | null>(null);

  // ── Appearance inputs ──────────────────────────────────────────────────────

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
  /**
   * Custom ARIA label for the code region. Overrides the auto-generated i18n label.
   * Ignored when `ariaLabelledBy` is also provided.
   */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** ID(s) of element(s) that label this code region (`aria-labelledby`). Takes precedence over `ariaLabel`. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /** Emitted after the code is successfully copied to the clipboard. */
  public readonly codeCopied: OutputEmitterRef<void> = output<void>();

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** Index of the currently active tab. */
  public readonly activeTabIndex: WritableSignal<number> = signal<number>(0);
  /** Whether the copy-success state is currently active. */
  public readonly copied: WritableSignal<boolean> = signal<boolean>(false);

  // ── Normalised file list ───────────────────────────────────────────────────

  /** Unified file list — multi-file when `files` is provided, otherwise wraps the single-file inputs. */
  public readonly effectiveFiles: Signal<readonly CodeSnippetFile[]> = computed<
    readonly CodeSnippetFile[]
  >((): readonly CodeSnippetFile[] => {
    const multiFiles: CodeSnippetFile[] = this.files();
    if (multiFiles.length > 0) return multiFiles;
    const singleFilename: string | null = this.filename();
    return [
      {
        filename: singleFilename !== null ? singleFilename : LANGUAGE_LABELS[this.language()],
        language: this.language(),
        code: this.code(),
      },
    ];
  });

  /** Whether more than one tab is present (controls interactive tab styling). */
  public readonly isMultiTab: Signal<boolean> = computed<boolean>(
    (): boolean => this.effectiveFiles().length > 1,
  );

  /** The active file, clamped so it never goes out of bounds when the file list changes. */
  public readonly activeFile: Signal<CodeSnippetFile> = computed<CodeSnippetFile>(
    (): CodeSnippetFile => {
      const fileList: readonly CodeSnippetFile[] = this.effectiveFiles();
      const index: number = Math.min(this.activeTabIndex(), fileList.length - 1);
      // effectiveFiles always has ≥1 entry; non-null assertion is safe after clamping

      return fileList[index]!;
    },
  );

  // ── Derived display properties (all scoped to the active file) ─────────────

  public readonly effectiveVariant: Signal<CodeSnippetVariant> = computed<CodeSnippetVariant>(
    (): CodeSnippetVariant => this.variant() ?? this.themeService.variant(),
  );

  public readonly lines: Signal<readonly string[]> = computed<readonly string[]>(
    (): readonly string[] => this.activeFile().code.split('\n'),
  );

  public readonly languageIcon: Signal<string | null> = computed<string | null>(
    (): string | null => LANGUAGE_ICONS[this.activeFile().language],
  );

  /**
   * Resolved `aria-label` for the code region. Returns `null` when `ariaLabelledBy` is set
   * (so only one labelling mechanism is active at a time). Falls back to the i18n default.
   */
  public readonly accessibleLabel: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.ariaLabelledBy() !== null) return null;
      const custom: string | null = this.ariaLabel();
      if (custom !== null) return custom;
      const fileList: readonly CodeSnippetFile[] = this.effectiveFiles();
      if (fileList.length > 1) {
        return this.i18n.translate('code-snippet.label.multi-file', { count: fileList.length });
      }
      const file: CodeSnippetFile = this.activeFile();
      return file.filename !== LANGUAGE_LABELS[file.language]
        ? this.i18n.translate('code-snippet.label.file', { filename: file.filename })
        : this.i18n.translate('code-snippet.label.language', {
            language: LANGUAGE_LABELS[file.language],
          });
    },
  );

  /** Resolved `aria-label` for the copy button, reactive to both copy state and active locale. */
  public readonly copyAriaLabel: Signal<string> = computed<string>((): string =>
    this.copied()
      ? this.i18n.translate('code-snippet.copied')
      : this.i18n.translate('code-snippet.copy'),
  );

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

  /** Syntax-highlighted HTML for the active file's code body, safe to bind with [innerHTML]. */
  public readonly highlightedCode: Signal<SafeHtml> = computed<SafeHtml>((): SafeHtml => {
    const file: CodeSnippetFile = this.activeFile();
    const html: string = HIGHLIGHTED_LANGUAGES.has(file.language)
      ? highlight(file.code, file.language as SyntaxLanguage)
      : escapeForCode(file.code);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  /** Returns the language icon identifier for any language, used to render per-tab icons. */
  public fileIcon(language: CodeSnippetLanguage): string | null {
    return LANGUAGE_ICONS[language];
  }

  // ── Tab interaction ────────────────────────────────────────────────────────

  /** Switches to the tab at the given index. */
  public selectTab(index: number): void {
    const fileList: readonly CodeSnippetFile[] = this.effectiveFiles();
    if (index < 0 || index >= fileList.length) return;
    this.activeTabIndex.set(index);
  }

  /**
   * Handles keyboard navigation within the tab list.
   * ArrowLeft / ArrowRight move focus (and selection) between tabs.
   * Home / End jump to first / last tab.
   */
  public onTabKeydown(event: KeyboardEvent, index: number): void {
    const fileList: readonly CodeSnippetFile[] = this.effectiveFiles();
    const lastIndex: number = fileList.length - 1;
    let nextIndex: number = index;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = index < lastIndex ? index + 1 : 0;
        break;
      case 'ArrowLeft':
        nextIndex = index > 0 ? index - 1 : lastIndex;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = lastIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selectTab(nextIndex);
    // Move DOM focus to the newly active tab button
    const tabList: Element | null = (event.target as HTMLElement).closest('[role="tablist"]');
    if (tabList !== null) {
      const buttons: NodeListOf<HTMLButtonElement> =
        tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons[nextIndex]?.focus();
    }
  }

  /** Returns the ARIA tab id for a given index. */
  public tabId(index: number): string {
    return `${this.instanceId}-tab-${index}`;
  }

  /** Returns the ARIA tabpanel id for a given index. */
  public panelId(index: number): string {
    return `${this.instanceId}-panel-${index}`;
  }

  // ── Copy to clipboard ──────────────────────────────────────────────────────

  /** Handles the copy button click. */
  public onCopy(): void {
    void this.copyToClipboard();
  }

  private async copyToClipboard(): Promise<void> {
    const text: string = this.activeFile().code.trimEnd();
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
