import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { Card } from 'ui-lib-custom/card';
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
  imports: [DocPageLayoutComponent, DocDemoViewportComponent, CodePreviewComponent, Card, Image],
  templateUrl: './image-demo.component.html',
  styleUrl: './image-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDemoComponent {
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
