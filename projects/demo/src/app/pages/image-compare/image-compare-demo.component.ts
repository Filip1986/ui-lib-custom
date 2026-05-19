import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { ImageCompare } from 'ui-lib-custom/image-compare';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { Panel } from 'ui-lib-custom/panel';
type SnippetKey = 'basic' | 'twoWayBinding' | 'sizes' | 'variants' | 'disabled' | 'customLabel';

/**
 * Demo page for the ImageCompare component.
 */
@Component({
  selector: 'app-image-compare-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    CodeSnippet,
    ImageCompare,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './image-compare-demo.component.html',
  styleUrl: './image-compare-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompareDemoComponent {
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
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { ImageCompare } from 'ui-lib-custom/image-compare'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'two-way-binding', label: 'Two-Way Binding' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'custom-label', label: 'Custom Label' },
    { id: 'api', label: 'API' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  // ─── Keyboard navigation rows ─────────────────────────────────────────────

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '→ / ↑', action: 'Move divider 1% to the right.' },
    { key: '← / ↓', action: 'Move divider 1% to the left.' },
    { key: 'PageUp', action: 'Move divider 10% to the right.' },
    { key: 'PageDown', action: 'Move divider 10% to the left.' },
    { key: 'Home', action: 'Move divider to 0% (far left).' },
    { key: 'End', action: 'Move divider to 100% (far right).' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'before', type: 'string', description: 'URL of the before image (required).' },
    { name: 'after', type: 'string', description: 'URL of the after image (required).' },
    {
      name: 'beforeAlt',
      type: 'string',
      default: "'Before'",
      description: 'Alt text for the before image.',
    },
    {
      name: 'afterAlt',
      type: 'string',
      default: "'After'",
      description: 'Alt text for the after image.',
    },
    {
      name: 'position',
      type: 'number',
      default: '50',
      description: 'Initial divider position as a percentage (0–100).',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Divider axis.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Image comparison'",
      description: 'Accessible label for the comparison region.',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'leftImage',
      type: 'string',
      default: "''",
      description: 'URL of the left (before) image.',
    },
    { name: 'leftAlt', type: 'string', default: "''", description: 'Alt text for the left image.' },
    {
      name: 'rightImage',
      type: 'string',
      default: "''",
      description: 'URL of the right (after) image.',
    },
    {
      name: 'rightAlt',
      type: 'string',
      default: "''",
      description: 'Alt text for the right image.',
    },
    {
      name: 'value (model)',
      type: 'number',
      default: '50',
      description: 'Slider position as a percentage (0–100). Supports two-way binding.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'When true, the slider cannot be moved.',
    },
    {
      name: 'variant',
      type: 'ImageCompareVariant | null',
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: 'ImageCompareSize',
      default: "'md'",
      description: 'Handle size token (sm / md / lg).',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on the host element.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Image comparison slider'",
      description: 'Accessible label for the slider handle.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'slideStart',
      type: 'number',
      description: 'Emitted with the current position when the user starts dragging.',
    },
    {
      name: 'slideEnd',
      type: 'number',
      description: 'Emitted with the final position when the user releases the handle.',
    },
  ];

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
