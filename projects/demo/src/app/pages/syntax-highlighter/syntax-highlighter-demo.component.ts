import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import type { CodeSnippetLanguage } from 'ui-lib-custom/code-snippet';

/**
 * Demo page for the SyntaxHighlighter utility.
 */
@Component({
  selector: 'app-syntax-highlighter-demo',
  standalone: true,
  imports: [CodeSnippet, DocPageLayoutComponent, CodeSnippet],
  templateUrl: './syntax-highlighter-demo.component.html',
  styleUrl: './syntax-highlighter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyntaxHighlighterDemoComponent {
  public readonly importCode: string =
    "import { highlight, tokenize, escapeForCode } from 'ui-lib-custom/syntax-highlighter';";

  public readonly syntaxTokenInterfaceCode: string =
    'interface SyntaxToken {\n  readonly type: TokenType;\n  readonly value: string;\n}';

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'html', label: 'HTML / Angular' },
    { id: 'scss', label: 'SCSS' },
    { id: 'usage', label: 'Direct Usage' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-highlight', label: 'highlight()' },
        { id: 'api-tokenize', label: 'tokenize()' },
        { id: 'api-escape', label: 'escapeForCode()' },
      ],
    },
    { id: 'tokens', label: 'Token Classes' },
    { id: 'theming', label: 'Theming' },
  ];

  public readonly activeLanguage: WritableSignal<CodeSnippetLanguage> =
    signal<CodeSnippetLanguage>('typescript');

  // ── Sample code blocks ────────────────────────────────────────────────────

  public readonly tsCode: string = [
    "import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';",
    "import type { Signal, InputSignal } from '@angular/core';",
    '',
    'interface User {',
    '  id: number;',
    '  name: string;',
    '  email: string;',
    '}',
    '',
    '@Component({',
    "  selector: 'app-user-card',",
    '  standalone: true,',
    '  changeDetection: ChangeDetectionStrategy.OnPush,',
    '})',
    'export class UserCardComponent {',
    '  public readonly user: InputSignal<User | null> = input<User | null>(null);',
    '',
    '  // Derived greeting — recalculated only when user() changes',
    '  public readonly greeting: Signal<string> = computed<string>((): string => {',
    '    const currentUser: User | null = this.user();',
    "    if (currentUser === null) return 'Hello, Guest!';",
    '    return `Hello, ${currentUser.name}!`;',
    '  });',
    '}',
  ].join('\n');

  public readonly htmlCode: string = [
    '<div class="user-card" [class.is-loading]="isLoading()">',
    '  @if (user()) {',
    '    <header class="user-card__header">',
    '      <img',
    '        [src]="user()!.avatarUrl"',
    '        [alt]="user()!.name + \' avatar\'"',
    '        class="user-card__avatar"',
    '      />',
    '      <h2 class="user-card__name">{{ user()!.name }}</h2>',
    '    </header>',
    '',
    '    <ul class="user-card__tags" role="list">',
    '      @for (tag of user()!.tags; track tag.id) {',
    '        <li>',
    '          <ui-lib-tag [value]="tag.label" severity="info" />',
    '        </li>',
    '      }',
    '    </ul>',
    '',
    '    <ui-lib-button',
    '      label="View Profile"',
    '      variant="material"',
    '      (clicked)="onViewProfile()"',
    '    />',
    '  } @else {',
    '    <p class="user-card__empty">No user selected.</p>',
    '  }',
    '</div>',
  ].join('\n');

  public readonly scssCode: string = [
    '$surface: #1e1e2e;',
    '$primary: #6366f1;',
    '$radius: 1rem;',
    '',
    '.user-card {',
    '  --card-padding: 1.5rem;',
    '  --card-gap: 1rem;',
    '',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: var(--card-gap);',
    '  padding: var(--card-padding);',
    '  background: $surface;',
    '  border-radius: $radius;',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);',
    '',
    '  &__header {',
    '    display: flex;',
    '    align-items: center;',
    '    gap: 0.75rem;',
    '  }',
    '',
    '  &__avatar {',
    '    width: 3rem;',
    '    height: 3rem;',
    '    border-radius: 50%;',
    '    object-fit: cover;',
    '  }',
    '',
    '  &__name {',
    '    font-size: 1.125rem;',
    '    font-weight: 600;',
    '    color: #cdd6f4;',
    '    margin: 0;',
    '  }',
    '',
    '  @media (prefers-reduced-motion: no-preference) {',
    '    transition: box-shadow 0.2s ease;',
    '',
    '    &:hover {',
    '      box-shadow: 0 8px 32px rgba($primary, 0.2);',
    '    }',
    '  }',
    '}',
  ].join('\n');

  // ── Usage snippets shown in DocCodeSnippet ────────────────────────────────

  public readonly snippets: {
    readonly import: string;
    readonly highlightUsage: string;
    readonly tokenizeUsage: string;
    readonly escapeUsage: string;
    readonly themeOverride: string;
  } = {
    import: `import { highlight, tokenize, escapeForCode } from 'ui-lib-custom/syntax-highlighter';`,
    highlightUsage: [
      `import { highlight } from 'ui-lib-custom/syntax-highlighter';`,
      `import { DomSanitizer } from '@angular/platform-browser';`,
      ``,
      `// Returns HTML string with <span class="uilib-token-*"> wrappers.`,
      `// Content is HTML-escaped — safe to set as innerHTML.`,
      `const html = highlight(myCode, 'typescript');`,
      `element.innerHTML = html;`,
    ].join('\n'),
    tokenizeUsage: [
      `import { tokenize } from 'ui-lib-custom/syntax-highlighter';`,
      ``,
      `const tokens = tokenize(myCode, 'html');`,
      ``,
      `tokens.forEach(token => {`,
      `  console.log(token.type, JSON.stringify(token.value));`,
      `});`,
      `// → 'tag'       '<div'`,
      `// → 'attr-name' 'class'`,
      `// → 'punctuation' '='`,
      `// → 'attr-value' '"container"'`,
    ].join('\n'),
    escapeUsage: [
      `import { escapeForCode } from 'ui-lib-custom/syntax-highlighter';`,
      ``,
      `// Use for languages without a built-in tokenizer (JSON, Bash, etc.)`,
      `const safeHtml = escapeForCode(myJsonCode);`,
      `element.innerHTML = safeHtml; // no spans, just escaped text`,
    ].join('\n'),
    themeOverride: [
      `/* Override token colours on a specific code snippet */`,
      `ui-lib-code-snippet.my-custom-theme {`,
      `  --uilib-syntax-keyword: hotpink;`,
      `  --uilib-syntax-string: #a8ff78;`,
      `  --uilib-syntax-comment: #555;`,
      `}`,
    ].join('\n'),
  } as const;

  public setActiveLanguage(language: CodeSnippetLanguage): void {
    this.activeLanguage.set(language);
  }

  public activeCode(language: CodeSnippetLanguage): string {
    if (language === 'typescript') return this.tsCode;
    if (language === 'html') return this.htmlCode;
    return this.scssCode;
  }
}
