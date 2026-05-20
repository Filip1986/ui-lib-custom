import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Slider } from 'ui-lib-custom/slider';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  rangeHtml,
  rangeTs,
  stepHtml,
  stepTs,
  minmaxHtml,
  minmaxTs,
  verticalHtml,
  verticalTs,
  sizesHtml,
  sizesTs,
  animateHtml,
  animateTs,
  disabledHtml,
  disabledTs,
  readonlyHtml,
  readonlyTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';

/**
 * Demo page for the Slider component — linear track control for numeric values.
 */
@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [
    Panel,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    Slider,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './slider-demo.component.html',
  styleUrl: './slider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly rangeHtml: string = rangeHtml;
  public readonly rangeTs: string = rangeTs;
  public readonly stepHtml: string = stepHtml;
  public readonly stepTs: string = stepTs;
  public readonly minmaxHtml: string = minmaxHtml;
  public readonly minmaxTs: string = minmaxTs;
  public readonly verticalHtml: string = verticalHtml;
  public readonly verticalTs: string = verticalTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly animateHtml: string = animateHtml;
  public readonly animateTs: string = animateTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly readonlyHtml: string = readonlyHtml;
  public readonly readonlyTs: string = readonlyTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string = "import { Slider } from 'ui-lib-custom/slider'";
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'range', label: 'Range' },
    { id: 'step', label: 'Step' },
    { id: 'minmax', label: 'Min / Max' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'animate', label: 'Animated' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'readonly', label: 'Read-only' },
    { id: 'reactive', label: 'Reactive Forms' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  public basicValue: number = 40;
  public rangeValue: [number, number] = [20, 75];
  public stepValue: number = 0;
  public minmaxValue: number = -10;
  public verticalValue: number = 60;
  public sizesValue: number = 50;
  public animateValue: number = 30;
  public disabledValue: number = 55;
  public readonlyValue: number = 35;

  public readonly reactiveForm: FormGroup = new FormGroup({
    volume: new FormControl<number>(60),
    brightness: new FormControl<number>(40),
  });

  public get volumeControl(): FormControl<number> {
    return this.reactiveForm.get('volume') as FormControl<number>;
  }

  public get brightnessControl(): FormControl<number> {
    return this.reactiveForm.get('brightness') as FormControl<number>;
  }
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Slider', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/' },
  };

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '← / ↓',
      action: 'Decrease the value by one step.',
    },
    {
      key: '→ / ↑',
      action: 'Increase the value by one step.',
    },
    {
      key: 'Home',
      action: 'Set the value to the minimum.',
    },
    {
      key: 'End',
      action: 'Set the value to the maximum.',
    },
    {
      key: 'Page Down',
      action: 'Decrease the value by a larger step (10× step or 10% of range).',
    },
    {
      key: 'Page Up',
      action: 'Increase the value by a larger step (10× step or 10% of range).',
    },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Value increment.' },
    { name: 'range', type: 'boolean', default: 'false', description: 'Enables range selection.' },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Slider orientation.',
    },
    { name: 'animate', type: 'boolean', default: 'false', description: 'Animates thumb movement.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider.' },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the slider thumb.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Slider size.' },
  ];
}
