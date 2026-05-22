/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './basic-ts.example.html',
})
export class MyComponent {
  basicValue: string | null = null;
}`;

export const basicHtml = `<uilib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="basicValue"
/>
<p>Value: {{ basicValue ?? 'null' }}</p>`;

export const disabledTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './disabled-ts.example.html',
})
export class MyComponent {
  disabledValue: string | null = '5551234567';
}`;

export const disabledHtml = `<uilib-input-mask
  mask="(999) 999-9999"
  [disabled]="true"
  [(ngModel)]="disabledValue"
  [ngModelOptions]="{ standalone: true }"
/>`;

export const filledTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './filled-ts.example.html',
})
export class MyComponent {
  filledValue: string | null = '5551234567';
}`;

export const filledHtml = `<uilib-input-mask
  mask="(999) 999-9999"
  [filled]="true"
  [(ngModel)]="filledValue"
  [ngModelOptions]="{ standalone: true }"
/>`;

export const floatLabelTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FloatLabelComponent, FormsModule],
  templateUrl: './float-label-ts.example.html',
})
export class MyComponent {
  floatValue: string | null = null;
}`;

export const floatLabelHtml = `<uilib-float-label>
  <uilib-input-mask
    mask="(999) 999-9999"
    [(ngModel)]="floatValue"
    [ngModelOptions]="{ standalone: true }"
  />
  <label>Phone</label>
</uilib-float-label>`;

export const fluidTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './fluid-ts.example.html',
})
export class MyComponent {
  fluidValue: string | null = null;
}`;

export const fluidHtml = `<uilib-input-mask
  mask="(999) 999-9999"
  [fluid]="true"
  [(ngModel)]="fluidValue"
  [ngModelOptions]="{ standalone: true }"
/>`;

export const formatsTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './formats-ts.example.html',
})
export class MyComponent {
  formatValues = { phone: null, date: null, ssn: null, serial: null };
}`;

export const formatsHtml = `<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="formatValues.phone" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="99/99/9999" [(ngModel)]="formatValues.date" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-99-9999" [(ngModel)]="formatValues.ssn" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="a*-999-a999" [(ngModel)]="formatValues.serial" [ngModelOptions]="{ standalone: true }" />`;

export const iftaLabelTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FloatLabelComponent, FormsModule],
  templateUrl: './ifta-label-ts.example.html',
})
export class MyComponent {
  iftaValue: string | null = null;
}`;

export const iftaLabelHtml = `<uilib-float-label variant="in">
  <uilib-input-mask
    mask="(999) 999-9999"
    [(ngModel)]="iftaValue"
    [ngModelOptions]="{ standalone: true }"
  />
  <label>Phone</label>
</uilib-float-label>`;

export const invalidTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './invalid-ts.example.html',
})
export class MyComponent {
  invalidValue: string | null = '12';
}`;

export const invalidHtml = `<uilib-input-mask
  mask="(999) 999-9999"
  [invalid]="true"
  [(ngModel)]="invalidValue"
  [ngModelOptions]="{ standalone: true }"
/>`;

export const optionalTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './optional-ts.example.html',
})
export class MyComponent {
  optionalAutoClear = true;
  optionalValue: string | null = null;
}`;

export const optionalHtml = `<uilib-input-mask
  mask="(999) 999-9999? x99999"
  [autoClear]="optionalAutoClear"
  [(ngModel)]="optionalValue"
  [ngModelOptions]="{ standalone: true }"
/>`;

export const reactiveTsTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputMaskComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive-ts.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-input-mask
    mask="(999) 999-9999"
    formControlName="phone"
    [invalid]="reactiveForm.controls.phone.invalid && reactiveForm.controls.phone.touched"
  />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`;

export const sizesTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {
  sizeValues = { sm: null, md: null, lg: null };
}`;

export const sizesHtml = `<uilib-input-mask mask="(999) 999-9999" size="sm" [(ngModel)]="sizeValues.sm" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" size="md" [(ngModel)]="sizeValues.md" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" size="lg" [(ngModel)]="sizeValues.lg" [ngModelOptions]="{ standalone: true }" />`;

export const slotCharsTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './slot-chars-ts.example.html',
})
export class MyComponent {
  slotValues = { underscore: null, hash: null, star: null };
}`;

export const slotCharsHtml = `<uilib-input-mask mask="999-999" slotChar="_" [keepBuffer]="true" [(ngModel)]="slotValues.underscore" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-999" slotChar="#" [keepBuffer]="true" [(ngModel)]="slotValues.hash" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-999" slotChar="*" [keepBuffer]="true" [(ngModel)]="slotValues.star" [ngModelOptions]="{ standalone: true }" />`;

export const unmaskTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './unmask-ts.example.html',
})
export class MyComponent {
  maskedModel: string | null = null;
  unmaskedModel: string | null = null;
}`;

export const unmaskHtml = `<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="maskedModel" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" [unmask]="true" [(ngModel)]="unmaskedModel" [ngModelOptions]="{ standalone: true }" />`;
