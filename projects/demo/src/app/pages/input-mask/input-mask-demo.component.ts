import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

interface InputMaskSizeItem {
  readonly label: string;
  readonly size: 'sm' | 'md' | 'lg';
  value: string | null;
}

type InputMaskDemoSnippetKey =
  | 'basic'
  | 'formats'
  | 'optional'
  | 'slotChars'
  | 'unmask'
  | 'filled'
  | 'floatLabel'
  | 'iftaLabel'
  | 'sizes'
  | 'fluid'
  | 'disabled'
  | 'invalid'
  | 'reactive';

/**
 * Demo page for InputMask behavior, appearance states, and form integration.
 */
@Component({
  selector: 'app-input-mask-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    Button,
    FloatLabelComponent,
    InputMaskComponent,
  ],
  templateUrl: './input-mask-demo.component.html',
  styleUrl: './input-mask-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMaskDemoComponent {
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
  ];

  public readonly snippets: Record<InputMaskDemoSnippetKey, string> = {
    basic: `<uilib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="basicValue"
/>
<p>Value: {{ basicValue ?? 'null' }}</p>`,
    formats: `<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="formatValues.phone" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="99/99/9999" [(ngModel)]="formatValues.date" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-99-9999" [(ngModel)]="formatValues.ssn" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="a*-999-a999" [(ngModel)]="formatValues.serial" [ngModelOptions]="{ standalone: true }" />`,
    optional: `<uilib-input-mask
  mask="(999) 999-9999? x99999"
  [autoClear]="optionalAutoClear"
  [(ngModel)]="optionalValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    slotChars: `<uilib-input-mask mask="999-999" slotChar="_" [keepBuffer]="true" [(ngModel)]="slotValues.underscore" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-999" slotChar="#" [keepBuffer]="true" [(ngModel)]="slotValues.hash" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-999" slotChar="*" [keepBuffer]="true" [(ngModel)]="slotValues.star" [ngModelOptions]="{ standalone: true }" />`,
    unmask: `<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="maskedModel" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" [unmask]="true" [(ngModel)]="unmaskedModel" [ngModelOptions]="{ standalone: true }" />`,
    filled: `<uilib-input-mask
  mask="(999) 999-9999"
  [filled]="true"
  [(ngModel)]="filledValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    floatLabel: `<uilib-float-label>
  <uilib-input-mask
    mask="(999) 999-9999"
    [(ngModel)]="floatValue"
    [ngModelOptions]="{ standalone: true }"
  />
  <label>Phone</label>
</uilib-float-label>`,
    iftaLabel: `<uilib-float-label variant="in">
  <uilib-input-mask
    mask="(999) 999-9999"
    [(ngModel)]="iftaValue"
    [ngModelOptions]="{ standalone: true }"
  />
  <label>Phone</label>
</uilib-float-label>`,
    sizes: `<uilib-input-mask mask="(999) 999-9999" size="sm" [(ngModel)]="sizeValues.sm" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" size="md" [(ngModel)]="sizeValues.md" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" size="lg" [(ngModel)]="sizeValues.lg" [ngModelOptions]="{ standalone: true }" />`,
    fluid: `<uilib-input-mask
  mask="(999) 999-9999"
  [fluid]="true"
  [(ngModel)]="fluidValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    disabled: `<uilib-input-mask
  mask="(999) 999-9999"
  [disabled]="true"
  [(ngModel)]="disabledValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    invalid: `<uilib-input-mask
  mask="(999) 999-9999"
  [invalid]="true"
  [(ngModel)]="invalidValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-input-mask
    mask="(999) 999-9999"
    formControlName="phone"
    [invalid]="reactiveForm.controls.phone.invalid && reactiveForm.controls.phone.touched"
  />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
  };

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

  public snippet(key: InputMaskDemoSnippetKey): string {
    return this.snippets[key];
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    this.reactiveSubmittedValue = this.reactiveForm.controls.phone.value;
  }

  public formatValue(value: string | null): string {
    return value ?? 'null';
  }
}
