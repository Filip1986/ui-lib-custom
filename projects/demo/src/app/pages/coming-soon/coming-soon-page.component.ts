import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Icon } from 'ui-lib-custom/icon';

import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

export interface ComingSoonData {
  componentName: string;
  description: string;
  rationale: string;
  complexity: string;
  reference: string;
  priority: number;
  group: string;
}

/**
 *
 */
@Component({
  selector: 'app-coming-soon-page',
  standalone: true,
  imports: [DocPageHeaderComponent, DocPageLayoutComponent, DocTocComponent, Icon, RouterModule],
  templateUrl: './coming-soon-page.component.html',
  styleUrl: './coming-soon-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingSoonPageComponent {
  public readonly data: ComingSoonData = inject(ActivatedRoute).snapshot.data as ComingSoonData;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
