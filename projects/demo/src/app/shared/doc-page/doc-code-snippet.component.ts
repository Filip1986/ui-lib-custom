import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { CodeSnippetLanguage } from 'ui-lib-custom/code-snippet';

const VALID_LANGUAGES: ReadonlySet<string> = new Set<string>([
  'javascript',
  'typescript',
  'html',
  'css',
  'scss',
  'json',
  'bash',
  'shell',
  'text',
]);

/**
 * Thin wrapper around ui-lib-code-snippet for documentation pages.
 * Keeps the existing @Input() API so all demo pages remain unchanged.
 */
@Component({
  selector: 'app-doc-code-snippet',
  standalone: true,
  imports: [CodeSnippet],
  templateUrl: './doc-code-snippet.component.html',
  styleUrl: './doc-code-snippet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocCodeSnippetComponent {
  @Input() public title: string = 'Code';
  @Input({ required: true }) public code: string = '';
  @Input() public language: string = 'text';

  public get filename(): string | null {
    return this.title !== 'Code' ? this.title : null;
  }

  public get codeLanguage(): CodeSnippetLanguage {
    return VALID_LANGUAGES.has(this.language) ? (this.language as CodeSnippetLanguage) : 'text';
  }
}
