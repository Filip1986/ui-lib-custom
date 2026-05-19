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
import { InputOtpComponent } from 'ui-lib-custom/input-otp';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

import { Panel } from 'ui-lib-custom/panel';
type InputOtpDemoSnippetKey =
  | 'basic'
  | 'mask'
  | 'integerOnly'
  | 'sizes'
  | 'filled'
  | 'disabled'
  | 'invalid'
  | 'readonly'
  | 'reactive';

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
    CodeSnippet,
    InputOtpComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './input-otp-demo.component.html',
  styleUrl: './input-otp-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpDemoComponent {
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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<InputOtpDemoSnippetKey, string> = {
    basic:
      '<uilib-input-otp [length]="4" [(ngModel)]="basicValue" [ngModelOptions]="{ standalone: true }" />',
    mask: '<uilib-input-otp [length]="6" [mask]="true" [(ngModel)]="maskValue" [ngModelOptions]="{ standalone: true }" />',
    integerOnly:
      '<uilib-input-otp [length]="4" [integerOnly]="true" [(ngModel)]="integerValue" [ngModelOptions]="{ standalone: true }" />',
    sizes: [
      '<uilib-input-otp [length]="4" size="sm" [(ngModel)]="sizeValues.sm" [ngModelOptions]="{ standalone: true }" />',
      '<uilib-input-otp [length]="4" size="md" [(ngModel)]="sizeValues.md" [ngModelOptions]="{ standalone: true }" />',
      '<uilib-input-otp [length]="4" size="lg" [(ngModel)]="sizeValues.lg" [ngModelOptions]="{ standalone: true }" />',
    ].join('\n'),
    filled:
      '<uilib-input-otp [length]="4" [filled]="true" [(ngModel)]="filledValue" [ngModelOptions]="{ standalone: true }" />',
    disabled:
      '<uilib-input-otp [length]="4" [disabled]="true" [(ngModel)]="disabledValue" [ngModelOptions]="{ standalone: true }" />',
    invalid:
      '<uilib-input-otp [length]="4" [invalid]="true" [(ngModel)]="invalidValue" [ngModelOptions]="{ standalone: true }" />',
    readonly:
      '<uilib-input-otp [length]="4" [readonly]="true" [(ngModel)]="readonlyValue" [ngModelOptions]="{ standalone: true }" />',
    reactive: [
      '<form [formGroup]="reactiveForm" (ngSubmit)="onSubmit()">',
      '  <uilib-input-otp',
      '    [length]="6"',
      '    [integerOnly]="true"',
      '    formControlName="code"',
      '    [invalid]="reactiveForm.controls.code.invalid && reactiveForm.controls.code.touched"',
      '  />',
      '  <ui-lib-button type="submit" color="primary">Verify</ui-lib-button>',
      '</form>',
    ].join('\n'),
  };

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

  public snippet(key: InputOtpDemoSnippetKey): string {
    return this.snippets[key];
  }

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
}
