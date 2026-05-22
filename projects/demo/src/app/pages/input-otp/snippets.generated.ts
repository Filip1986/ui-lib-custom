/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<uilib-input-otp [length]="4" [(ngModel)]="basicValue" [ngModelOptions]="{ standalone: true }" />`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  basicValue: string = '';
}`;

export const disabledHtml = `<uilib-input-otp [length]="4" [disabled]="true" [(ngModel)]="disabledValue" [ngModelOptions]="{ standalone: true }" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  disabledValue: string = '1234';
}`;

export const filledHtml = `<uilib-input-otp [length]="4" [filled]="true" [(ngModel)]="filledValue" [ngModelOptions]="{ standalone: true }" />`;

export const filledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './filled.example.html',
})
export class MyComponent {
  filledValue: string = '1234';
}`;

export const integerOnlyHtml = `<uilib-input-otp [length]="4" [integerOnly]="true" [(ngModel)]="integerValue" [ngModelOptions]="{ standalone: true }" />`;

export const integerOnlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './integer-only.example.html',
})
export class MyComponent {
  integerValue: string = '';
}`;

export const invalidHtml = `<uilib-input-otp [length]="4" [invalid]="true" [(ngModel)]="invalidValue" [ngModelOptions]="{ standalone: true }" />`;

export const invalidTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './invalid.example.html',
})
export class MyComponent {
  invalidValue: string = '12';
}`;

export const maskHtml = `<uilib-input-otp [length]="6" [mask]="true" [(ngModel)]="maskValue" [ngModelOptions]="{ standalone: true }" />`;

export const maskTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './mask.example.html',
})
export class MyComponent {
  maskValue: string = '';
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="onSubmit()">
  <uilib-input-otp
    [length]="6"
    [integerOnly]="true"
    formControlName="code"
    [invalid]="reactiveForm.controls.code.invalid && reactiveForm.controls.code.touched"
  />
  <ui-lib-button type="submit" color="primary">Verify</ui-lib-button>
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputOtpComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    code: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`;

export const readonlyHtml = `<uilib-input-otp [length]="4" [readonly]="true" [(ngModel)]="readonlyValue" [ngModelOptions]="{ standalone: true }" />`;

export const readonlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  readonlyValue: string = '5678';
}`;

export const sizesHtml = `<uilib-input-otp [length]="4" size="sm" [(ngModel)]="sizeValues.sm" [ngModelOptions]="{ standalone: true }" />
<uilib-input-otp [length]="4" size="md" [(ngModel)]="sizeValues.md" [ngModelOptions]="{ standalone: true }" />
<uilib-input-otp [length]="4" size="lg" [(ngModel)]="sizeValues.lg" [ngModelOptions]="{ standalone: true }" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  sizeValues = { sm: '', md: '', lg: '' };
}`;
