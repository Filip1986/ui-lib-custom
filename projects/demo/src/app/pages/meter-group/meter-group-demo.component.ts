import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type {
  MeterGroupLabelPosition,
  MeterGroupOrientation,
  MeterGroupSize,
  MeterGroupVariant,
  MeterItem,
} from 'ui-lib-custom/meter-group';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import {
  basicHtml,
  basicTs,
  labelPositionHtml,
  labelPositionTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  verticalHtml,
  noLegendHtml,
} from './snippets.generated';

/**
 * Demo page for the MeterGroup component.
 */
@Component({
  selector: 'app-meter-group-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    MeterGroup,
    Button,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './meter-group-demo.component.html',
  styleUrl: './meter-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterGroupDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly labelPositionHtml: string = labelPositionHtml;
  public readonly labelPositionTs: string = labelPositionTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly verticalHtml: string = verticalHtml;
  public readonly noLegendHtml: string = noLegendHtml;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { MeterGroup } from 'ui-lib-custom/meter-group'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-meter-group-height', description: 'Bar height (horizontal orientation).' },
    {
      variable: '--uilib-meter-group-height-sm',
      description: 'Bar height for <code>size="sm"</code>.',
    },
    {
      variable: '--uilib-meter-group-height-lg',
      description: 'Bar height for <code>size="lg"</code>.',
    },
    {
      variable: '--uilib-meter-group-width-vertical',
      description: 'Bar width (vertical orientation).',
    },
    {
      variable: '--uilib-meter-group-height-vertical',
      description: 'Bar height (vertical orientation).',
    },
    {
      variable: '--uilib-meter-group-border-radius',
      description: 'Bar and segment corner radius.',
    },
    { variable: '--uilib-meter-group-bg', description: 'Background track colour.' },
    { variable: '--uilib-meter-group-segment-gap', description: 'Gap between segments.' },
    { variable: '--uilib-meter-group-label-font-size', description: 'Legend font size.' },
    { variable: '--uilib-meter-group-label-color', description: 'Legend label text colour.' },
    { variable: '--uilib-meter-group-label-value-color', description: 'Legend value text colour.' },
    { variable: '--uilib-meter-group-swatch-size', description: 'Legend colour swatch size.' },
    {
      variable: '--uilib-meter-group-swatch-border-radius',
      description: 'Legend swatch border radius.',
    },
    {
      variable: '--uilib-meter-group-transition',
      description:
        'Segment transition shorthand. Respects <code>prefers-reduced-motion: reduce</code>.',
    },
  ];

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'label-position', label: 'Label Position' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Design Variants' },
    { id: 'vertical', label: 'Vertical Orientation' },
    { id: 'no-legend', label: 'No Legend' },
    { id: 'playground', label: 'Playground' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-meter-item', label: 'MeterItem' },
      ],
    },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly orientations: MeterGroupOrientation[] = ['horizontal', 'vertical'];
  public readonly labelPositions: MeterGroupLabelPosition[] = ['start', 'end'];
  public readonly sizes: MeterGroupSize[] = ['sm', 'md', 'lg'];
  public readonly variants: MeterGroupVariant[] = ['material', 'bootstrap', 'minimal'];

  // ---- Static demo data ---------------------------------------------------

  public readonly basicItems: MeterItem[] = [
    { label: 'Apps', value: 16, color: '#34d399' },
    { label: 'Messages', value: 8, color: '#818cf8' },
    { label: 'Media', value: 24, color: '#fb923c' },
    { label: 'System', value: 10, color: '#f87171' },
  ];

  public readonly variantItems: MeterItem[] = [
    { label: 'Used', value: 45, color: '#6366f1' },
    { label: 'Cached', value: 25, color: '#a5b4fc' },
    { label: 'Free', value: 30, color: '#e0e7ff' },
  ];

  public readonly storageItems: MeterItem[] = [
    { label: 'Documents', value: 38, color: '#0ea5e9', icon: 'pi pi-file' },
    { label: 'Videos', value: 21, color: '#d946ef', icon: 'pi pi-video' },
    { label: 'Photos', value: 17, color: '#f59e0b', icon: 'pi pi-image' },
    { label: 'Other', value: 12, color: '#6b7280', icon: 'pi pi-ellipsis-h' },
  ];

  public readonly cpuItems: MeterItem[] = [
    { label: 'User', value: 42, color: '#818cf8' },
    { label: 'System', value: 18, color: '#fb923c' },
    { label: 'I/O Wait', value: 8, color: '#f87171' },
  ];

  // ---- Playground ---------------------------------------------------------

  public readonly playgroundItems: WritableSignal<MeterItem[]> = signal<MeterItem[]>([
    { label: 'Q1', value: 25, color: '#34d399' },
    { label: 'Q2', value: 35, color: '#818cf8' },
    { label: 'Q3', value: 20, color: '#fb923c' },
    { label: 'Q4', value: 15, color: '#f87171' },
  ]);

  public readonly playgroundOrientation: WritableSignal<MeterGroupOrientation> =
    signal<MeterGroupOrientation>('horizontal');
  public readonly playgroundLabelPosition: WritableSignal<MeterGroupLabelPosition> =
    signal<MeterGroupLabelPosition>('end');
  public readonly playgroundSize: WritableSignal<MeterGroupSize> = signal<MeterGroupSize>('md');
  public readonly playgroundVariant: WritableSignal<MeterGroupVariant> =
    signal<MeterGroupVariant>('material');

  public setOrientation(orientation: MeterGroupOrientation): void {
    this.playgroundOrientation.set(orientation);
  }

  public setLabelPosition(position: MeterGroupLabelPosition): void {
    this.playgroundLabelPosition.set(position);
  }

  public setSize(size: MeterGroupSize): void {
    this.playgroundSize.set(size);
  }

  public setVariant(variant: MeterGroupVariant): void {
    this.playgroundVariant.set(variant);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action:
        'Skips meter segments and legend items — MeterGroup is informational and non-interactive, nothing is focusable.',
    },
  ];
}
