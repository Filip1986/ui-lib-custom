import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

/**
 * Demo page for the CodeSnippet component — styled as the "Clean Snippet Cards" showcase.
 */
@Component({
  selector: 'app-code-snippet-demo',
  standalone: true,
  imports: [CodeSnippet],
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
}
