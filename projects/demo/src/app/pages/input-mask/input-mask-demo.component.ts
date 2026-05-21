import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Button } from 'ui-lib-custom/button';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTsTs,
  formatsHtml,
  formatsTsTs,
  optionalHtml,
  optionalTsTs,
  slotCharsHtml,
  slotCharsTsTs,
  unmaskHtml,
  unmaskTsTs,
  filledHtml,
  filledTsTs,
  floatLabelHtml,
  floatLabelTsTs,
  iftaLabelHtml,
  iftaLabelTsTs,
  sizesHtml,
  sizesTsTs,
  fluidHtml,
  fluidTsTs,
  disabledHtml,
  disabledTsTs,
  invalidHtml,
  invalidTsTs,
  reactiveHtml,
  reactiveTsTs,
} from './snippets.generated';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
interface InputMaskSizeItem {
  readonly label: string;
  readonly size: 'sm' | 'md' | 'lg';
  value: string | null;
}

/**
 * Demo page for InputMask behavior, appearance states, and form integration.
 */
@Component({
  selector: 'app-input-mask-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Button,
    FloatLabelComponent,
    InputMaskComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './input-mask-demo.component.html',
  styleUrl: './input-mask-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMaskDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTsTs: string = basicTsTs;
  public readonly formatsHtml: string = formatsHtml;
  public readonly formatsTsTs: string = formatsTsTs;
  public readonly optionalHtml: string = optionalHtml;
  public readonly optionalTsTs: string = optionalTsTs;
  public readonly slotCharsHtml: string = slotCharsHtml;
  public readonly slotCharsTsTs: string = slotCharsTsTs;
  public readonly unmaskHtml: string = unmaskHtml;
  public readonly unmaskTsTs: string = unmaskTsTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTsTs: string = filledTsTs;
  public readonly floatLabelHtml: string = floatLabelHtml;
  public readonly floatLabelTsTs: string = floatLabelTsTs;
  public readonly iftaLabelHtml: string = iftaLabelHtml;
  public readonly iftaLabelTsTs: string = iftaLabelTsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTsTs: string = sizesTsTs;
  public readonly fluidHtml: string = fluidHtml;
  public readonly fluidTsTs: string = fluidTsTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTsTs: string = disabledTsTs;
  public readonly invalidHtml: string = invalidHtml;
  public readonly invalidTsTs: string = invalidTsTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTsTs: string = reactiveTsTs;

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

  public readonly importCode: string =
    "import { InputMaskComponent } from 'ui-lib-custom/input-mask'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'mask-formats', label: 'Mask Formats' },
    { id: 'optional', label: 'Optional' },
    { id: 'slot-character', label: 'Slot Character' },
    { id: 'unmask', label: 'Unmask' },
    { id: 'filled', label: 'Filled' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'ifta-label', label: 'Ifta Label' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'fluid', label: 'Fluid' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public basicValue: string | null = null;

  public readonly formatValues: {
    phone: string | null;
    date: string | null;
    ssn: string | null;
    serial: string | null;
  } = {
    phone: null,
    date: null,
    ssn: null,
    serial: null,
  };

  public optionalAutoClear: boolean = true;
  public optionalValue: string | null = null;

  public readonly slotValues: {
    underscore: string | null;
    hash: string | null;
    star: string | null;
  } = {
    underscore: null,
    hash: null,
    star: null,
  };

  public maskedModel: string | null = null;
  public unmaskedModel: string | null = null;

  public filledValue: string | null = '5551234567';
  public floatValue: string | null = null;
  public iftaValue: string | null = null;

  public readonly sizeItems: InputMaskSizeItem[] = [
    { label: 'Small', size: 'sm', value: null },
    { label: 'Medium', size: 'md', value: null },
    { label: 'Large', size: 'lg', value: null },
  ];

  public readonly sizeValues: { sm: string | null; md: string | null; lg: string | null } = {
    sm: null,
    md: null,
    lg: null,
  };

  public fluidValue: string | null = null;
  public disabledValue: string | null = '5551234567';
  public invalidValue: string | null = '12';

  public readonly reactiveForm: FormGroup<{ phone: FormControl<string | null> }> = new FormGroup<{
    phone: FormControl<string | null>;
  }>({
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  public reactiveSubmittedValue: string | null = null;

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    this.reactiveSubmittedValue = this.reactiveForm.controls.phone.value;
  }

  public formatValue(value: string | null): string {
    return value ?? 'null';
  }

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'mask',
      type: 'string',
      default: "''",
      description: "Mask pattern, e.g. '(999) 999-9999'.",
    },
    {
      name: 'slotChar',
      type: 'string',
      default: "'_'",
      description: 'Character shown for empty mask slots.',
    },
    {
      name: 'autoClear',
      type: 'boolean',
      default: 'true',
      description: 'Clears the field when incomplete on blur.',
    },
    {
      name: 'unmask',
      type: 'boolean',
      default: 'false',
      description: 'Emits the raw unmasked value.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the input read-only.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the input.',
    },
    {
      name: 'maskHint',
      type: 'string | null',
      default: 'null',
      description: 'Accessible hint for the expected format.',
    },
    {
      name: 'errorMessage',
      type: 'string | null',
      default: 'null',
      description: 'Error message in an aria-live region.',
    },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the input.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the input.' },
    { key: 'Type', action: 'Fills the next available mask slot.' },
    { key: 'Backspace', action: 'Clears the previous mask slot.' },
    { key: 'Delete', action: 'Clears the current mask slot.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Native input',
      attribute: 'aria-invalid',
      value: '"true"',
      notes: 'Applied when <code>[invalid]="true"</code>.',
    },
    {
      element: 'Native input',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Native input',
      attribute: 'aria-readonly',
      value: '"true"',
      notes: 'Applied when <code>[readonly]="true"</code>.',
    },
    {
      element: 'Native input',
      attribute: 'aria-label',
      value: 'ariaLabel value',
      notes: 'Set via <code>[ariaLabel]</code> input for screen reader identification.',
    },
    {
      element: 'Native input',
      attribute: 'aria-describedby',
      value: 'hint/error element IDs',
      notes: 'Links to <code>[maskHint]</code> and/or <code>[errorMessage]</code> elements.',
    },
    {
      element: 'Error region',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Error messages are announced to screen readers as they appear.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-input-mask-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-input-mask-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-input-mask-font-size', description: 'Font size.' },
    { variable: '--uilib-input-mask-border-radius', description: 'Border radius.' },
    { variable: '--uilib-input-mask-border-color', description: 'Border colour.' },
    { variable: '--uilib-input-mask-bg', description: 'Background colour.' },
    { variable: '--uilib-input-mask-text-color', description: 'Text text colour.' },
    { variable: '--uilib-input-mask-placeholder-color', description: 'Placeholder text colour.' },
    { variable: '--uilib-input-mask-focus-border-color', description: 'Focus Border text colour.' },
    { variable: '--uilib-input-mask-focus-ring', description: 'Focus ring.' },
    {
      variable: '--uilib-input-mask-invalid-border-color',
      description: 'Invalid Border text colour.',
    },
    { variable: '--uilib-input-mask-icon-color', description: 'Icon colour.' },
    { variable: '--uilib-input-mask-filled-bg', description: 'Filled background colour.' },
    { variable: '--uilib-input-mask-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-input-mask-clear-icon-size', description: 'Clear Icon size.' },
    { variable: '--uilib-input-mask-error-color', description: 'Error text colour.' },
  ];
}
