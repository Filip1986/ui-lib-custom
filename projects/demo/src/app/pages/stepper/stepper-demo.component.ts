import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Stepper } from 'ui-lib-custom/stepper';
import { StepperPanel } from 'ui-lib-custom/stepper';
import type { StepChangeEvent, StepperOrientation, StepperVariant } from 'ui-lib-custom/stepper';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Stepper component.
 */
@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [
    Stepper,
    StepperPanel,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './stepper-demo.component.html',
  styleUrl: './stepper-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemoComponent {
  public readonly importCode: string = "import { Stepper } from 'ui-lib-custom/stepper'";

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
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'linear-mode', label: 'Linear Mode' },
    { id: 'vertical-orientation', label: 'Vertical Orientation' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'value',
      type: 'number | string | null',
      default: 'null',
      description: 'Active step value (two-way via [(value)]).',
    },
    {
      name: 'activeStep',
      type: 'number',
      default: '0',
      description: 'Zero-based active step index.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Stepper layout direction.',
    },
    {
      name: 'linear',
      type: 'boolean',
      default: 'false',
      description: 'Forces sequential navigation.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Steps'",
      description: 'Accessible label for the step navigation.',
    },
  ];

  // Basic example
  public readonly basicStep: WritableSignal<number> = signal<number>(0);

  // Linear example
  public readonly linearStep: WritableSignal<number> = signal<number>(0);

  // Vertical example
  public readonly verticalStep: WritableSignal<number> = signal<number>(0);

  // Variants
  public readonly materialStep: WritableSignal<number> = signal<number>(0);
  public readonly bootstrapStep: WritableSignal<number> = signal<number>(0);
  public readonly minimalStep: WritableSignal<number> = signal<number>(0);

  // Playground
  public readonly playgroundStep: WritableSignal<number> = signal<number>(0);
  public readonly playgroundVariant: WritableSignal<StepperVariant> =
    signal<StepperVariant>('material');
  public readonly playgroundOrientation: WritableSignal<StepperOrientation> =
    signal<StepperOrientation>('horizontal');
  public readonly playgroundLinear: WritableSignal<boolean> = signal<boolean>(false);
  public readonly lastStepChange: WritableSignal<StepChangeEvent | null> =
    signal<StepChangeEvent | null>(null);

  public readonly variants: StepperVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly orientations: StepperOrientation[] = ['horizontal', 'vertical'];

  public setPlaygroundVariant(variant: StepperVariant): void {
    this.playgroundVariant.set(variant);
    this.playgroundStep.set(0);
  }

  public setPlaygroundOrientation(orientation: StepperOrientation): void {
    this.playgroundOrientation.set(orientation);
    this.playgroundStep.set(0);
  }

  public handleStepChange(event: StepChangeEvent): void {
    this.lastStepChange.set(event);
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '← / →', suffix: 'on step header', action: 'Move focus between step headers.' },
    {
      key: 'Enter / Space',
      suffix: 'on step header',
      action: 'Navigate to the focused step (non-linear mode) or activate action.',
    },
    { key: 'Tab / Shift+Tab', action: 'Move focus between elements within the active step panel.' },
    { key: 'Home / End', action: 'Move focus to the first or last step header.' },
  ];

  public readonly apiStepperInputRows: ApiPropRow[] = [
    {
      name: 'activeStep',
      type: 'number',
      default: '0',
      description:
        'Active step index (0-based). Supports two-way binding with <code>[(activeStep)]</code>.',
    },
    {
      name: 'linear',
      type: 'boolean',
      default: 'false',
      description: 'When true, users must progress through steps sequentially.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Layout orientation of the stepper.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to ThemeConfigService when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes to apply to the host element.',
    },
  ];

  public readonly apiStepperOutputRows: ApiPropRow[] = [
    {
      name: 'stepChange',
      type: 'StepChangeEvent',
      description:
        'Emitted after the active step changes. Contains <code>activeStep</code> and <code>previousStep</code>.',
    },
  ];

  public readonly apiStepperMethodRows: ApiPropRow[] = [
    { name: 'nextStep()', type: '', description: 'Advances to the next step if one exists.' },
    { name: 'prevStep()', type: '', description: 'Returns to the previous step if one exists.' },
    {
      name: 'goToStep(index)',
      type: '',
      description: 'Navigates directly to the given step index.',
    },
    { name: 'isFirstStep()', type: '', description: 'Returns true when on the first step.' },
    { name: 'isLastStep()', type: '', description: 'Returns true when on the last step.' },
  ];

  public readonly apiStepperPanelInputRows: ApiPropRow[] = [
    {
      name: 'header',
      type: 'string',
      default: "''",
      description: 'Text label shown in the step header.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents navigation to this step.',
    },
  ];

  public readonly apiStepperPanelSlotRows: ApiPropRow[] = [
    {
      name: '#stepperContent',
      type: '',
      description: "Main body rendered in the active step's content area.",
    },
    {
      name: '#stepperFooter',
      type: '',
      description: 'Footer area — typically holds navigation buttons.',
    },
    {
      name: '#stepperHeader',
      type: '',
      description: 'Custom HTML for the step header label (overrides <code>header</code> input).',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-stepper-indicator-size', description: 'Active indicator size.' },
    { variable: '--uilib-stepper-indicator-font-size', description: 'Indicator Font size.' },
    {
      variable: '--uilib-stepper-indicator-border-radius',
      description: 'Indicator Border border radius.',
    },
    { variable: '--uilib-stepper-indicator-bg', description: 'Indicator background colour.' },
    { variable: '--uilib-stepper-indicator-color', description: 'Active indicator colour.' },
    { variable: '--uilib-stepper-indicator-border', description: 'Indicator border shorthand.' },
    {
      variable: '--uilib-stepper-indicator-bg-active',
      description: 'Indicator background colour (active).',
    },
    {
      variable: '--uilib-stepper-indicator-color-active',
      description: 'Active indicator colour (active).',
    },
    {
      variable: '--uilib-stepper-indicator-border-active',
      description: 'Indicator border shorthand (active).',
    },
    { variable: '--uilib-stepper-indicator-bg-completed', description: 'Indicator Bg Completed.' },
    {
      variable: '--uilib-stepper-indicator-color-completed',
      description: 'Indicator Color Completed.',
    },
    {
      variable: '--uilib-stepper-indicator-border-completed',
      description: 'Indicator Border Completed.',
    },
    {
      variable: '--uilib-stepper-indicator-bg-error',
      description: 'Indicator background colour (error).',
    },
    {
      variable: '--uilib-stepper-indicator-color-error',
      description: 'Active indicator colour (error).',
    },
    {
      variable: '--uilib-stepper-indicator-border-error',
      description: 'Indicator border shorthand (error).',
    },
    {
      variable: '--uilib-stepper-indicator-bg-disabled',
      description: 'Indicator background colour (disabled).',
    },
    {
      variable: '--uilib-stepper-indicator-color-disabled',
      description: 'Active indicator colour (disabled).',
    },
    {
      variable: '--uilib-stepper-indicator-border-disabled',
      description: 'Indicator border shorthand (disabled).',
    },
    { variable: '--uilib-stepper-label-color', description: 'Label colour.' },
    { variable: '--uilib-stepper-label-color-active', description: 'Label colour (active).' },
    { variable: '--uilib-stepper-label-color-completed', description: 'Label Color Completed.' },
    { variable: '--uilib-stepper-label-color-error', description: 'Label colour (error).' },
    { variable: '--uilib-stepper-label-color-disabled', description: 'Label colour (disabled).' },
    { variable: '--uilib-stepper-label-font-size', description: 'Label font size.' },
    { variable: '--uilib-stepper-label-font-weight', description: 'Label font weight.' },
    { variable: '--uilib-stepper-separator-color', description: 'Separator text colour.' },
    { variable: '--uilib-stepper-separator-thickness', description: 'Separator Thickness.' },
    { variable: '--uilib-stepper-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-stepper-panel-footer-gap', description: 'Panel Footer gap.' },
    { variable: '--uilib-stepper-transition', description: 'Transition.' },
  ];
}
