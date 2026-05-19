import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { CodeSnippetFile } from 'ui-lib-custom/code-snippet';

/** Renders one or more code snippets as a tabbed block (HTML / TypeScript / SCSS). */
@Component({
  selector: 'app-doc-code-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CodeSnippet],
  templateUrl: './doc-code-example.component.html',
  styleUrl: './doc-code-example.component.scss',
})
export class DocCodeExampleComponent {
  public readonly html: InputSignal<string | null> = input<string | null>(null);
  public readonly typescript: InputSignal<string | null> = input<string | null>(null);
  public readonly scss: InputSignal<string | null> = input<string | null>(null);
  public readonly showLineNumbers: InputSignal<boolean> = input<boolean>(true);

  public readonly files: Signal<readonly CodeSnippetFile[]> = computed(
    (): readonly CodeSnippetFile[] => {
      const result: CodeSnippetFile[] = [];
      const htmlCode: string | null = this.html();
      const tsCode: string | null = this.typescript();
      const scssCode: string | null = this.scss();
      if (htmlCode) {
        result.push({ filename: 'template.html', language: 'html', code: htmlCode });
      }
      if (tsCode) {
        result.push({ filename: 'component.ts', language: 'typescript', code: tsCode });
      }
      if (scssCode) {
        result.push({ filename: 'styles.scss', language: 'scss', code: scssCode });
      }
      return result;
    }
  );
}
