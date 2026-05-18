import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

/**
 *
 */
@Component({
  selector: 'app-doc-page-header',
  standalone: true,
  imports: [CodeSnippet],
  templateUrl: './doc-page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageHeaderComponent {
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly importCode: InputSignal<string> = input<string>('');
  public readonly description: InputSignal<string> = input<string>('');
}
