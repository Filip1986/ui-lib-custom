import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the CodeSnippet component — styled as the "Clean Snippet Cards" showcase.
 */
@Component({
  selector: 'app-code-snippet-demo',
  standalone: true,
  imports: [CodeSnippet, DocApiReferenceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './code-snippet-demo.component.html',
  styleUrl: './code-snippet-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetDemoComponent {
  public readonly isDarkMode: WritableSignal<boolean> = signal<boolean>(true);

  public readonly jsCode: string = `const helloFromBuilder = () => {\n  console.log("Hello, Welcome to Code Snippet Builder!")\n}`;

  public readonly htmlCode: string = `<p class="text">\n  Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Sed do eiusmod tempor.\n</p>`;

  public readonly cssCode: string = `.text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 200px;\n}`;

  public readonly tsCode: string = `// Explicit type annotation\nlet userName: string = "Jane Doe";`;

  public toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'code',
      type: 'string',
      default: "''",
      description: 'Source code string to display and highlight.',
    },
    {
      name: 'language',
      type: "'typescript' | 'html' | 'scss' | 'css' | 'json' | 'bash' | 'text'",
      default: "'text'",
      description: 'Syntax highlighting language.',
    },
    {
      name: 'filename',
      type: 'string | null',
      default: 'null',
      description: 'Filename shown in the window chrome title bar.',
    },
    {
      name: 'showWindowChrome',
      type: 'boolean',
      default: 'true',
      description: 'Shows the macOS-style window chrome header.',
    },
    {
      name: 'showLineNumbers',
      type: 'boolean',
      default: 'true',
      description: 'Renders line number gutters.',
    },
    {
      name: 'showCopyButton',
      type: 'boolean',
      default: 'true',
      description: 'Shows a clipboard copy button.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls font size and padding.',
    },
    {
      name: 'maxHeight',
      type: 'string | null',
      default: 'null',
      description: 'CSS max-height for scrollable code blocks.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class applied to the host.',
    },
  ];
}
