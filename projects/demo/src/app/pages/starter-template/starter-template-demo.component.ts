import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Placeholder demo page for the upcoming Starter Template.
 */
@Component({
  selector: 'app-starter-template-demo',
  standalone: true,
  imports: [DocPageLayoutComponent, DocTocComponent],
  templateUrl: './starter-template-demo.component.html',
  styleUrl: './starter-template-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarterTemplateDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [{ id: 'overview', label: 'Overview' }];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
