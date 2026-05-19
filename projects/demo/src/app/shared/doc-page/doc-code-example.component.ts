import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { CodeSnippetLanguage } from 'ui-lib-custom/code-snippet';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

interface CodeTab {
  readonly label: string;
  readonly value: string;
  readonly code: string;
  readonly language: CodeSnippetLanguage;
}

/** Renders one or more code snippets as a tabbed block (HTML / TypeScript / SCSS). */
@Component({
  selector: 'app-doc-code-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CodeSnippet, Tabs, Tab],
  templateUrl: './doc-code-example.component.html',
  styleUrl: './doc-code-example.component.scss',
})
export class DocCodeExampleComponent {
  public readonly html: InputSignal<string | null> = input<string | null>(null);
  public readonly typescript: InputSignal<string | null> = input<string | null>(null);
  public readonly scss: InputSignal<string | null> = input<string | null>(null);
  public readonly showLineNumbers: InputSignal<boolean> = input<boolean>(true);

  public readonly tabs: Signal<readonly CodeTab[]> = computed((): readonly CodeTab[] => {
    const result: CodeTab[] = [];
    const htmlCode: string | null = this.html();
    const tsCode: string | null = this.typescript();
    const scssCode: string | null = this.scss();
    if (htmlCode) {
      result.push({ label: 'HTML', value: 'html', code: htmlCode, language: 'html' });
    }
    if (tsCode) {
      result.push({ label: 'TypeScript', value: 'ts', code: tsCode, language: 'typescript' });
    }
    if (scssCode) {
      result.push({ label: 'SCSS', value: 'scss', code: scssCode, language: 'scss' });
    }
    return result;
  });

  public readonly isSingleTab: Signal<boolean> = computed((): boolean => this.tabs().length === 1);
}
