import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { Card } from 'ui-lib-custom/card';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Image } from 'ui-lib-custom/image';

type SnippetKey =
  | 'basic'
  | 'preview'
  | 'customIndicator'
  | 'errorFallback'
  | 'sizes'
  | 'variants'
  | 'customError'
  | 'dimensions'
  | 'twoWayBinding'; /**
 * Demo page for the Image component.
 */
@Component({
  selector: 'app-image-demo',
  standalone: true,
  imports: [
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Card,
    CodeSnippet,
    Image,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './image-demo.component.html',
  styleUrl: './image-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Image } from 'ui-lib-custom/image'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'preview', label: 'Preview' },
    { id: 'custom-indicator', label: 'Custom Indicator' },
    { id: 'error-fallback', label: 'Error Fallback' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'custom-error', label: 'Custom Error' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'two-way-binding', label: 'Two-Way Binding' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);

  // ─── Code snippets ────────────────────────────────────────────────────────────

  private readonly snippets: Record<SnippetKey, string> = {
    basic: `<ui-lib-image
  src="https://picsum.photos/seed/demo/400/300"
  alt="A scenic landscape"
/>`,
    preview: `<ui-lib-image
  src="https://picsum.photos/seed/preview/400/300"
  alt="Click to preview"
  [preview]="true"
/>`,
    customIndicator: `<ui-lib-image
  src="https://picsum.photos/seed/custom/400/300"
  alt="Custom indicator demo"
  [preview]="true"
>
  <ng-template #imageIndicator>
    <span style="font-size: 1.5rem">🔍</span>
  </ng-template>
</ui-lib-image>`,
    errorFallback: `<ui-lib-image
  src="https://invalid-url/broken.jpg"
  errorSrc="https://picsum.photos/seed/fallback/400/300"
  alt="Image with fallback"
/>`,
    sizes: `<ui-lib-image src="..." alt="Small" size="sm" [preview]="true" />
<ui-lib-image src="..." alt="Medium" size="md" [preview]="true" />
<ui-lib-image src="..." alt="Large" size="lg" [preview]="true" />`,
    variants: `<ui-lib-image src="..." alt="Material" variant="material" [preview]="true" />
<ui-lib-image src="..." alt="Bootstrap" variant="bootstrap" [preview]="true" />
<ui-lib-image src="..." alt="Minimal" variant="minimal" [preview]="true" />`,
    customError: `<ui-lib-image src="https://invalid-url/broken.jpg" alt="Broken image">
  <ng-template #imageError>
    <div class="my-error">
      <span>⚠️ Could not load image</span>
    </div>
  </ng-template>
</ui-lib-image>`,
    dimensions: `<ui-lib-image
  src="https://picsum.photos/seed/wide/800/200"
  alt="Wide image"
  width="400"
  height="100"
/>`,
    twoWayBinding: `<ui-lib-image
  src="https://picsum.photos/seed/binding/400/300"
  alt="Two-way binding demo"
  [preview]="true"
  [(previewVisible)]="previewVisible"
/>
<p>Preview open: {{ previewVisible() }}</p>`,
  };

  public snippet(key: SnippetKey): string {
    return this.snippets[key];
  }
}
