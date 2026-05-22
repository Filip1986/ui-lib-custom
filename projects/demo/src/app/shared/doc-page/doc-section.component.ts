import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import type { InputSignal } from '@angular/core';

/**
 * Standard section wrapper for every component demo page.
 *
 * Renders the section element as the host, applies .demo-section and data-doc-anchor
 * automatically so the TOC scroll-spy can find it. Avoids copy-pasting the
 * <section><h2><p> skeleton on every page.
 *
 * @example
 * ```html
 * <app-doc-section id="variants" title="Variants" description="Compare all three variants.">
 *   <div class="demo-section__preview">...</div>
 * </app-doc-section>
 * ```
 */
@Component({
  selector: 'app-doc-section',
  standalone: true,
  templateUrl: './doc-section.component.html',
  styleUrl: './doc-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'demo-section',
    'data-doc-anchor': '',
    '[attr.id]': 'id()',
  },
})
export class DocSectionComponent {
  public readonly id: InputSignal<string> = input.required<string>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly description: InputSignal<string> = input<string>('');
}
