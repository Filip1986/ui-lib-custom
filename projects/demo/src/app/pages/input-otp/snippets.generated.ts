/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-input-otp [length]="4" [ngModelOptions]="{ standalone: true }" [(ngModel)]="basicValue" />`;

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

export const disabledHtml = `<ui-lib-input-otp
  [disabled]="true"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="disabledValue"
/>`;

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

export const filledHtml = `<ui-lib-input-otp
  [filled]="true"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="filledValue"
/>`;

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

export const integerOnlyHtml = `<ui-lib-input-otp
  [integerOnly]="true"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="integerValue"
/>`;

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

export const invalidHtml = `<ui-lib-input-otp
  [invalid]="true"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="invalidValue"
/>`;

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

export const maskHtml = `<ui-lib-input-otp
  [length]="6"
  [mask]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="maskValue"
/>`;

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
  <ui-lib-input-otp
    formControlName="code"
    [integerOnly]="true"
    [invalid]="reactiveForm.controls.code.invalid && reactiveForm.controls.code.touched"
    [length]="6"
  />
  <ui-lib-button color="primary" type="submit">Verify</ui-lib-button>
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

export const readonlyHtml = `<ui-lib-input-otp
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [readonly]="true"
  [(ngModel)]="readonlyValue"
/>`;

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

export const sizesHtml = `<ui-lib-input-otp
  size="sm"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeValues.sm"
/>
<ui-lib-input-otp
  size="md"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeValues.md"
/>
<ui-lib-input-otp
  size="lg"
  [length]="4"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeValues.lg"
/>`;

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
