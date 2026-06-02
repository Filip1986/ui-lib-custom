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

export const basicHtml = `<ui-lib-input-mask
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

export const disabledHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  [disabled]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="disabledValue"
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

export const filledHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  [filled]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="filledValue"
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

export const floatLabelHtml = `<ui-lib-float-label>
  <ui-lib-input-mask
    mask="(999) 999-9999"
    [ngModelOptions]="{ standalone: true }"
    [(ngModel)]="floatValue"
  />
  <label>Phone</label>
</ui-lib-float-label>`;

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

export const fluidHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  [fluid]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="fluidValue"
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

export const formatsHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="formatValues.phone"
/>
<ui-lib-input-mask
  mask="99/99/9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="formatValues.date"
/>
<ui-lib-input-mask
  mask="999-99-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="formatValues.ssn"
/>
<ui-lib-input-mask
  mask="a*-999-a999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="formatValues.serial"
/>`;

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

export const iftaLabelHtml = `<ui-lib-float-label variant="in">
  <ui-lib-input-mask
    mask="(999) 999-9999"
    [ngModelOptions]="{ standalone: true }"
    [(ngModel)]="iftaValue"
  />
  <label>Phone</label>
</ui-lib-float-label>`;

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

export const invalidHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  [invalid]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="invalidValue"
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

export const optionalHtml = `<ui-lib-input-mask
  mask="(999) 999-9999? x99999"
  [autoClear]="optionalAutoClear"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="optionalValue"
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
  <ui-lib-input-mask
    formControlName="phone"
    mask="(999) 999-9999"
    [invalid]="reactiveForm.controls.phone.invalid && reactiveForm.controls.phone.touched"
  />
  <ui-lib-button color="primary" type="submit">Submit</ui-lib-button>
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

export const sizesHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  size="sm"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeValues.sm"
/>
<ui-lib-input-mask
  mask="(999) 999-9999"
  size="md"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeValues.md"
/>
<ui-lib-input-mask
  mask="(999) 999-9999"
  size="lg"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeValues.lg"
/>`;

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

export const slotCharsHtml = `<ui-lib-input-mask
  mask="999-999"
  slotChar="_"
  [keepBuffer]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="slotValues.underscore"
/>
<ui-lib-input-mask
  mask="999-999"
  slotChar="#"
  [keepBuffer]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="slotValues.hash"
/>
<ui-lib-input-mask
  mask="999-999"
  slotChar="*"
  [keepBuffer]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="slotValues.star"
/>`;

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

export const unmaskHtml = `<ui-lib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="maskedModel"
/>
<ui-lib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [unmask]="true"
  [(ngModel)]="unmaskedModel"
/>`;
