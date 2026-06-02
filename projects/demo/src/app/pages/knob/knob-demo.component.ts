import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KnobComponent } from 'ui-lib-custom/knob';
import { Panel } from 'ui-lib-custom/panel';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import {
  basicHtml,
  basicTs,
  colorsHtml,
  colorsTs,
  disabledHtml,
  disabledTs,
  minmaxHtml,
  minmaxTs,
  reactiveHtml,
  reactiveTs,
  readonlyHtml,
  readonlyTs,
  sizesHtml,
  sizesTs,
  stepHtml,
  stepTs,
  templateHtml,
  templateTs,
} from './snippets.generated';
/**
 * Demo page for the Knob component — circular dial for numeric input.
 */
@Component({
  selector: 'app-knob-demo',
  standalone: true,
  imports: [
    Panel,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    KnobComponent,
    DocTocComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './knob-demo.component.html',
  styleUrl: './knob-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly stepHtml: string = stepHtml;
  public readonly stepTs: string = stepTs;
  public readonly minmaxHtml: string = minmaxHtml;
  public readonly minmaxTs: string = minmaxTs;
  public readonly templateHtml: string = templateHtml;
  public readonly templateTs: string = templateTs;
  public readonly colorsHtml: string = colorsHtml;
  public readonly colorsTs: string = colorsTs;
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

  public readonly importCode: string = "import { KnobComponent } from 'ui-lib-custom/knob'";

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'step', label: 'Step' },
    { id: 'minmax', label: 'Min / Max' },
    { id: 'template', label: 'Value Template' },
    { id: 'colors', label: 'Custom Colors' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'readonly', label: 'Read-only' },
    { id: 'reactive', label: 'Reactive Forms' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public basicValue: number = 40;
  public stepValue: number = 0;
  public minmaxValue: number = -20;
  public templateValue: number = 60;
  public colorsValue: number = 75;
  public disabledValue: number = 55;
  public readonlyValue: number = 30;

  public readonly reactiveForm: FormGroup = new FormGroup({
    brightness: new FormControl<number>(70),
    contrast: new FormControl<number>(50),
  });

  public get brightnessControl(): FormControl<number> {
    return this.reactiveForm.get('brightness') as FormControl<number>;
  }

  public get contrastControl(): FormControl<number> {
    return this.reactiveForm.get('contrast') as FormControl<number>;
  }
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
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Slider', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/' },
  };

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Value increment per key press.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Preset size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: '14',
      description: 'Arc stroke width in SVG units.',
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'true',
      description: 'Renders the current value inside the knob.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the knob.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the knob read-only.',
    },
    {
      name: 'ariaLabel',
      type: 'string | undefined',
      default: 'undefined',
      description: 'ARIA label for the knob.',
    },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the knob.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the knob.' },
    { key: '↑ / →', action: 'Increments the value by one step.' },
    { key: '↓ / ←', action: 'Decrements the value by one step.' },
    { key: 'PageUp', action: 'Increments the value by ten steps.' },
    { key: 'PageDown', action: 'Decrements the value by ten steps.' },
    { key: 'Home', action: 'Sets the value to the minimum.' },
    { key: 'End', action: 'Sets the value to the maximum.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'SVG knob',
      attribute: 'role="slider"',
      value: '—',
      notes: 'Identifies the knob as a slider widget to assistive technologies.',
    },
    {
      element: 'SVG knob',
      attribute: 'aria-valuenow',
      value: 'current value',
      notes: 'Updated live as the value changes.',
    },
    {
      element: 'SVG knob',
      attribute: 'aria-valuemin',
      value: 'min value',
      notes: 'Set from the <code>[min]</code> input.',
    },
    {
      element: 'SVG knob',
      attribute: 'aria-valuemax',
      value: 'max value',
      notes: 'Set from the <code>[max]</code> input.',
    },
    {
      element: 'SVG knob',
      attribute: 'aria-label',
      value: 'ariaLabel value',
      notes: 'Set via <code>[ariaLabel]</code> input for screen reader identification.',
    },
    {
      element: 'SVG knob',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'SVG knob',
      attribute: 'aria-readonly',
      value: '"true"',
      notes: 'Applied when <code>[readonly]="true"</code>.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-knob-track-color', description: 'Track colour.' },
    { variable: '--uilib-knob-range-color', description: 'Range text colour.' },
    { variable: '--uilib-knob-text-color', description: 'Text text colour.' },
    { variable: '--uilib-knob-text-size', description: 'Text size.' },
    { variable: '--uilib-knob-text-weight', description: 'Text Weight.' },
    { variable: '--uilib-knob-size-sm', description: 'Size — sm.' },
    { variable: '--uilib-knob-size-md', description: 'Size — md.' },
    { variable: '--uilib-knob-size-lg', description: 'Size — lg.' },
    { variable: '--uilib-knob-focus-ring-color', description: 'Focus ring colour.' },
    { variable: '--uilib-knob-focus-ring-width', description: 'Focus ring width.' },
    { variable: '--uilib-knob-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-knob-transition-duration', description: 'Transition Duration.' },
  ];
}
