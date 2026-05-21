import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

/**
 * Placeholder demo page for the upcoming Splitter component.
 */
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
/**
 *
 */
@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  imports: [
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './splitter-demo.component.html',
  styleUrl: './splitter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {
  public readonly importCode: string = "import { Splitter } from 'ui-lib-custom/splitter'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: '(coming soon)',
      type: '—',
      description: 'This component is under development. API will be documented on release.',
    },
  ];
}
