import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

/**
 * Placeholder demo page for the upcoming Starter Template.
 */
@Component({
  selector: 'app-starter-template',
  standalone: true,
  imports: [DocPageHeaderComponent, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './starter-template.component.html',
  styleUrl: './starter-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarterTemplateComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [{ id: 'overview', label: 'Overview' }];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
