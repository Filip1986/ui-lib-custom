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
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the MeterGroup component.
 */
@Component({
  selector: 'app-meter-group-demo',
  standalone: true,
  imports: [MeterGroup, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './meter-group-demo.component.html',
  styleUrl: './meter-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterGroupDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly labelPosition: string;
    readonly sizes: string;
    readonly variants: string;
    readonly vertical: string;
    readonly noLegend: string;
  } = {
    import: `import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';`,
    basic: `storageItems: MeterItem[] = [
  { label: 'Apps',     value: 16, color: '#34d399' },
  { label: 'Messages', value: 8,  color: '#818cf8' },
  { label: 'Media',    value: 24, color: '#fb923c' },
  { label: 'System',   value: 10, color: '#f87171' },
];

<ui-lib-meter-group [values]="storageItems" />`,
    labelPosition: `<!-- legend above the bar -->
<ui-lib-meter-group [values]="items" labelPosition="start" />

<!-- legend below the bar (default) -->
<ui-lib-meter-group [values]="items" labelPosition="end" />`,
    sizes: `<ui-lib-meter-group [values]="items" size="sm" [showLabels]="false" />
<ui-lib-meter-group [values]="items" size="md" [showLabels]="false" />
<ui-lib-meter-group [values]="items" size="lg" [showLabels]="false" />`,
    variants: `<ui-lib-meter-group [values]="items" variant="material"  [showLabels]="false" />
<ui-lib-meter-group [values]="items" variant="bootstrap" [showLabels]="false" />
<ui-lib-meter-group [values]="items" variant="minimal"   [showLabels]="false" />`,
    vertical: `<ui-lib-meter-group
  [values]="cpuItems"
  orientation="vertical"
  labelPosition="end"
/>`,
    noLegend: `<ui-lib-meter-group [values]="items" [showLabels]="false" />`,
  } as const;

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
}
