import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ProgressBar } from 'ui-lib-custom/progress-bar';
import type { ProgressBarVariant } from 'ui-lib-custom/progress-bar';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the ProgressBar component.
 */
@Component({
  selector: 'app-progress-bar-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ProgressBar,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './progress-bar-demo.component.html',
  styleUrl: './progress-bar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarDemoComponent {
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

  public readonly importCode: string = "import { ProgressBar } from 'ui-lib-custom/progress-bar'";
  public readonly snippetBasic: string = `<ui-lib-progress-bar [value]="75" />`;
  public readonly snippetNoLabel: string = `<ui-lib-progress-bar [value]="75" size="sm" [showValue]="false" />`;
  public readonly snippetCustomLabel: string = `<ui-lib-progress-bar [value]="60" label="Uploading…" />`;
  public readonly snippetIndeterminate: string = `<ui-lib-progress-bar mode="indeterminate" />`;
  public readonly snippetVariants: string = `<ui-lib-progress-bar [value]="75" variant="bootstrap" />`;
  public readonly snippetSizes: string = `<ui-lib-progress-bar [value]="75" size="lg" />`;
  public readonly snippetCustomColour: string = `<ui-lib-progress-bar [value]="40" color="#10b981" label="40%" />`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'no-label', label: 'No label' },
    { id: 'custom-label', label: 'Custom label' },
    { id: 'indeterminate', label: 'Indeterminate' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'custom-colour', label: 'Custom colour' },
    { id: 'dynamic-value', label: 'Dynamic value' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
  ];

  public readonly basicValue: WritableSignal<number> = signal<number>(75);
  public readonly dynamicValue: WritableSignal<number> = signal<number>(0);

  public readonly variants: ProgressBarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Progress value from 0 to 100 (clamped automatically).',
    },
    {
      name: 'mode',
      type: "'determinate' | 'indeterminate'",
      default: "'determinate'",
      description: 'Display mode.',
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the percentage label inside the fill.',
    },
    {
      name: 'label',
      type: 'string | null',
      default: 'null',
      description: 'Custom label; overrides the computed percentage string.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Bar height size token.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    {
      name: 'color',
      type: 'string | null',
      default: 'null',
      description: 'Custom fill colour; overrides the CSS variable.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes added to the host element.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public increment(): void {
    const current: number = this.dynamicValue();
    this.dynamicValue.set(Math.min(current + 10, 100));
  }

  public reset(): void {
    this.dynamicValue.set(0);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-progress-bar-height', description: 'Height.' },
    { variable: '--uilib-progress-bar-height-sm', description: 'Height — sm.' },
    { variable: '--uilib-progress-bar-height-lg', description: 'Height — lg.' },
    { variable: '--uilib-progress-bar-border-radius', description: 'Border radius.' },
    { variable: '--uilib-progress-bar-track-bg', description: 'Track background colour.' },
    { variable: '--uilib-progress-bar-fill-bg', description: 'Fill background colour.' },
    { variable: '--uilib-progress-bar-label-color', description: 'Label colour.' },
    { variable: '--uilib-progress-bar-label-font-size', description: 'Label font size.' },
    { variable: '--uilib-progress-bar-transition', description: 'Transition.' },
  ];
}
