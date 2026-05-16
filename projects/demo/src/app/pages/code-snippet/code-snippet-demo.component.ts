import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type {
  CodeSnippetLanguage,
  CodeSnippetVariant,
  CodeSnippetSize,
} from 'ui-lib-custom/code-snippet';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the CodeSnippet component.
 */
@Component({
  selector: 'app-code-snippet-demo',
  standalone: true,
  imports: [CodeSnippet, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './code-snippet-demo.component.html',
  styleUrl: './code-snippet-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic Usage' },
    { id: 'languages', label: 'Languages' },
    { id: 'variants', label: 'Design Variants' },
    { id: 'options', label: 'Options' },
    { id: 'playground', label: 'Playground' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
      ],
    },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly languages: CodeSnippetLanguage[] = [
    'javascript',
    'typescript',
    'html',
    'css',
    'scss',
    'json',
    'bash',
  ];

  public readonly variants: CodeSnippetVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: CodeSnippetSize[] = ['sm', 'md', 'lg'];

  // ── Playground state ──────────────────────────────────────────────────────

  public readonly playgroundVariant: WritableSignal<CodeSnippetVariant> =
    signal<CodeSnippetVariant>('material');
  public readonly playgroundSize: WritableSignal<CodeSnippetSize> = signal<CodeSnippetSize>('md');
  public readonly playgroundShowChrome: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundShowLineNumbers: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundShowCopyButton: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundLanguage: WritableSignal<CodeSnippetLanguage> =
    signal<CodeSnippetLanguage>('typescript');

  // ── Sample code blocks ────────────────────────────────────────────────────

  public readonly jsCode: string = `const greet = (name) => {\n  console.log(\`Hello, \${name}!\`);\n};\n\ngreet('World');`;

  public readonly tsCode: string = `interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst getUser = async (id: number): Promise<User> => {\n  const response = await fetch(\`/api/users/\${id}\`);\n  return response.json() as Promise<User>;\n};`;

  public readonly htmlCode: string = `<div class="container">\n  <h1>Hello World</h1>\n  <p class="text-muted">\n    Lorem ipsum dolor sit amet.\n  </p>\n</div>`;

  public readonly cssCode: string = `.text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 200px;\n}`;

  public readonly scssCode: string = `$primary: #6366f1;\n\n.button {\n  background: $primary;\n  border-radius: 0.5rem;\n  padding: 0.5rem 1rem;\n\n  &:hover {\n    background: darken($primary, 10%);\n  }\n}`;

  public readonly jsonCode: string = `{\n  "name": "ui-lib-custom",\n  "version": "1.0.0",\n  "description": "Angular UI library",\n  "main": "index.js"\n}`;

  public readonly bashCode: string = `# Install dependencies\nnpm install ui-lib-custom\n\n# Run dev server\nnpm run serve:demo`;

  public readonly playgroundCode: string = `// Accessible, signal-first Angular component\n@Component({\n  selector: 'ui-lib-code-snippet',\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  encapsulation: ViewEncapsulation.None,\n})\nexport class CodeSnippet {\n  public readonly code = input<string>('');\n  public readonly language = input<CodeSnippetLanguage>('text');\n}`;

  // ── Usage snippets shown in DocCodeSnippet ────────────────────────────────

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly withFilename: string;
    readonly noChrome: string;
  } = {
    import: `import { CodeSnippet } from 'ui-lib-custom/code-snippet';`,
    basic: `<ui-lib-code-snippet\n  language="typescript"\n  [code]="myCode"\n/>`,
    withFilename: `<ui-lib-code-snippet\n  language="typescript"\n  filename="app.component.ts"\n  [code]="myCode"\n/>`,
    noChrome: `<ui-lib-code-snippet\n  language="javascript"\n  [showWindowChrome]="false"\n  [showLineNumbers]="false"\n  [code]="myCode"\n/>`,
  } as const;

  public setPlaygroundVariant(value: CodeSnippetVariant): void {
    this.playgroundVariant.set(value);
  }

  public setPlaygroundSize(value: CodeSnippetSize): void {
    this.playgroundSize.set(value);
  }

  public setPlaygroundLanguage(value: CodeSnippetLanguage): void {
    this.playgroundLanguage.set(value);
  }

  public toggleChrome(): void {
    this.playgroundShowChrome.set(!this.playgroundShowChrome());
  }

  public toggleLineNumbers(): void {
    this.playgroundShowLineNumbers.set(!this.playgroundShowLineNumbers());
  }

  public toggleCopyButton(): void {
    this.playgroundShowCopyButton.set(!this.playgroundShowCopyButton());
  }
}
