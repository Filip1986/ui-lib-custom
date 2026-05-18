import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Skeleton } from 'ui-lib-custom/skeleton';
import type { SkeletonVariant } from 'ui-lib-custom/skeleton';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Skeleton component.
 */
@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [Skeleton, DocPageHeaderComponent, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './skeleton-demo.component.html',
  styleUrl: './skeleton-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {
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
