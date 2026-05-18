import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Placeholder demo page for the upcoming Splitter component.
 */
@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  imports: [CodeSnippet, DocPageHeaderComponent, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './splitter-demo.component.html',
  styleUrl: './splitter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {
  public readonly importCode: string = "import { Splitter } from 'ui-lib-custom/splitter'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [{ id: 'overview', label: 'Overview' }];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
