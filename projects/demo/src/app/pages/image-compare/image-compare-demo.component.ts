import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { Card } from 'ui-lib-custom/card';
import { ImageCompare } from 'ui-lib-custom/image-compare';

type SnippetKey = 'basic' | 'twoWayBinding' | 'sizes' | 'variants' | 'disabled' | 'customLabel';

/**
 * Demo page for the ImageCompare component.
 */
@Component({
  selector: 'app-image-compare-demo',
  standalone: true,
  imports: [
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    ImageCompare,
  ],
  templateUrl: './image-compare-demo.component.html',
  styleUrl: './image-compare-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompareDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'two-way-binding', label: 'Two-Way Binding' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'custom-label', label: 'Custom Label' },
    { id: 'api', label: 'API' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public readonly position: WritableSignal<number> = signal<number>(50);

  // ─── Code snippets ────────────────────────────────────────────────────────────

  private readonly snippets: Record<SnippetKey, string> = {
    basic: `<ui-lib-image-compare
  leftImage="https://picsum.photos/seed/before/800/400"
  leftAlt="Before"
  rightImage="https://picsum.photos/seed/after/800/400"
  rightAlt="After"
/>`,
    twoWayBinding: `<ui-lib-image-compare
  leftImage="https://picsum.photos/seed/before/800/400"
  leftAlt="Before"
  rightImage="https://picsum.photos/seed/after/800/400"
  rightAlt="After"
  [(value)]="position"
/>
<p>Position: {{ position() }}%</p>`,
    sizes: `<ui-lib-image-compare
  leftImage="..." rightImage="..."
  size="sm"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  size="md"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  size="lg"
/>`,
    variants: `<ui-lib-image-compare
  leftImage="..." rightImage="..."
  variant="material"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  variant="bootstrap"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  variant="minimal"
/>`,
    disabled: `<ui-lib-image-compare
  leftImage="..."
  rightImage="..."
  [disabled]="true"
/>`,
    customLabel: `<ui-lib-image-compare
  leftImage="..."
  rightImage="..."
  ariaLabel="Compare photo filters"
/>`,
  };

  public snippet(key: SnippetKey): string {
    return this.snippets[key];
  }
}
