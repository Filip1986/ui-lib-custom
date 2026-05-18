import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Skeleton } from 'ui-lib-custom/skeleton';
import type { SkeletonVariant } from 'ui-lib-custom/skeleton';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

/**
 * Demo page for the Skeleton component.
 */
@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [
    Skeleton,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './skeleton-demo.component.html',
  styleUrl: './skeleton-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Skeleton } from 'ui-lib-custom/skeleton'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'shapes', label: 'Shapes' },
    { id: 'card-placeholder', label: 'Card Placeholder' },
    { id: 'list-placeholder', label: 'List Placeholder' },
    { id: 'variants', label: 'Variants' },
    { id: 'animation', label: 'Animation' },
    { id: 'custom-sizes', label: 'Custom Sizes' },
    { id: 'custom-border-radius', label: 'Custom Border Radius' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly variants: SkeletonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly isLoaded: WritableSignal<boolean> = signal<boolean>(false);

  public toggleLoaded(): void {
    this.isLoaded.set(!this.isLoaded());
  }
}
