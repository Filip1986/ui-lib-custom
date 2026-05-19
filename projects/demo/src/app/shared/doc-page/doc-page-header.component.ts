import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Divider } from 'ui-lib-custom/divider';

/**
 * Shared page header for all component documentation pages.
 * Renders the component title, optional description, import snippet, and a divider.
 */
@Component({
  selector: 'app-doc-page-header',
  standalone: true,
  imports: [CodeSnippet, Divider],
  templateUrl: './doc-page-header.component.html',
  styleUrl: './doc-page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DocPageHeaderComponent {
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly importCode: InputSignal<string> = input<string>('');
  public readonly description: InputSignal<string> = input<string>('');
}
