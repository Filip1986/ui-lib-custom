import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Button } from 'ui-lib-custom/button';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';
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
  disabledHtml,
  disabledTs,
  filledHtml,
  filledTs,
  integerOnlyHtml,
  integerOnlyTs,
  invalidHtml,
  invalidTs,
  maskHtml,
  maskTs,
  reactiveHtml,
  reactiveTs,
  readonlyHtml,
  readonlyTs,
  sizesHtml,
  sizesTs,
} from './snippets.generated';
/**
 * Demo page for InputOtp — OTP entry with mask, integer-only, sizes, and form integration.
 */
@Component({
  selector: 'app-input-otp-demo',
  standalone: true,
  imports: [
    Panel,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Button,
    InputOtpComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './input-otp-demo.component.html',
  styleUrl: './input-otp-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly maskHtml: string = maskHtml;
  public readonly maskTs: string = maskTs;
  public readonly integerOnlyHtml: string = integerOnlyHtml;
  public readonly integerOnlyTs: string = integerOnlyTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTs: string = filledTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly invalidHtml: string = invalidHtml;
  public readonly invalidTs: string = invalidTs;
  public readonly readonlyHtml: string = readonlyHtml;
  public readonly readonlyTs: string = readonlyTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

  public readonly importCode: string =
    "import { InputOtpComponent } from 'ui-lib-custom/input-otp'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'mask', label: 'Mask' },
    { id: 'integer-only', label: 'Integer Only' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'filled', label: 'Filled' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'readonly', label: 'Read Only' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public basicValue: string = '';
  public maskValue: string = '';
  public integerValue: string = '';

  public readonly sizeValues: { sm: string; md: string; lg: string } = {
    sm: '',
    md: '',
    lg: '',
  };

  public filledValue: string = '1234';
  public disabledValue: string = '1234';
  public invalidValue: string = '12';
  public readonlyValue: string = '5678';

  public readonly reactiveForm: FormGroup<{ code: FormControl<string | null> }> = new FormGroup<{
    code: FormControl<string | null>;
  }>({
    code: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  public submittedCode: string | null = null;

  public onSubmit(): void {
    this.reactiveForm.markAllAsTouched();
    if (this.reactiveForm.valid) {
      this.submittedCode = this.reactiveForm.controls.code.value;
    }
  }

  public formatValue(value: string): string {
    return value.length > 0 ? value : 'empty';
  }
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

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'length', type: 'number', default: '4', description: 'Number of OTP digit cells.' },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: "'One-time passcode'",
      description: 'ARIA label for the group.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes all cells read-only.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all cells.' },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the group as invalid.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Cell size.' },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the first empty OTP cell.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the OTP group.' },
    { key: 'Type', action: 'Fills the focused cell and advances focus to the next cell.' },
    { key: 'Backspace', action: 'Clears the focused cell and moves focus to the previous cell.' },
    { key: '←', action: 'Moves focus to the previous cell.' },
    { key: '→', action: 'Moves focus to the next cell.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Group container',
      attribute: 'role="group"',
      value: '—',
      notes: 'Groups the individual OTP cells into a single logical control.',
    },
    {
      element: 'Group container',
      attribute: 'aria-label',
      value: 'ariaLabel value',
      notes: 'Defaults to "One-time passcode"; override with <code>[ariaLabel]</code>.',
    },
    {
      element: 'Individual cell',
      attribute: 'aria-label',
      value: '"Digit N of M"',
      notes: 'Each cell announces its position within the group.',
    },
    {
      element: 'Individual cell',
      attribute: 'aria-invalid',
      value: '"true"',
      notes: 'Applied to all cells when <code>[invalid]="true"</code>.',
    },
    {
      element: 'Individual cell',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied to all cells when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Individual cell',
      attribute: 'aria-readonly',
      value: '"true"',
      notes: 'Applied to all cells when <code>[readonly]="true"</code>.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-input-otp-cell-width', description: 'Cell width.' },
    { variable: '--uilib-input-otp-cell-height', description: 'Cell height.' },
    { variable: '--uilib-input-otp-gap', description: 'Gap.' },
    { variable: '--uilib-input-otp-font-size', description: 'Font size.' },
    { variable: '--uilib-input-otp-font-weight', description: 'Font weight.' },
    { variable: '--uilib-input-otp-border-radius', description: 'Border radius.' },
    { variable: '--uilib-input-otp-border-color', description: 'Border colour.' },
    { variable: '--uilib-input-otp-bg', description: 'Background colour.' },
    { variable: '--uilib-input-otp-text-color', description: 'Text text colour.' },
    { variable: '--uilib-input-otp-placeholder-color', description: 'Placeholder text colour.' },
    { variable: '--uilib-input-otp-focus-border-color', description: 'Focus Border text colour.' },
    { variable: '--uilib-input-otp-focus-ring', description: 'Focus ring.' },
    {
      variable: '--uilib-input-otp-invalid-border-color',
      description: 'Invalid Border text colour.',
    },
    { variable: '--uilib-input-otp-filled-bg', description: 'Filled background colour.' },
    { variable: '--uilib-input-otp-disabled-opacity', description: 'Disabled opacity.' },
  ];
}
