/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-color-picker [(ngModel)]="basicHex" format="hex" />
<p>Selected HEX #{{ basicHex }}</p>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicHex: string = '6466f1';
}`;

export const clippingHtml = `<div class="clipping-card">
  <ui-lib-color-picker [(ngModel)]="clippingValue" format="hex" />
</div>`;

export const clippingTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './clipping.example.html',
})
export class MyComponent {
  public clippingValue: string = '6366f1';
}`;

export const disabledHtml = `<ui-lib-color-picker [disabled]="true" [(ngModel)]="disabledValue" format="hex" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public disabledValue: string = 'ef4444';
}`;

export const formatsHtml = `<ui-lib-color-picker [(ngModel)]="hexValue" format="hex" />
<ui-lib-color-picker [(ngModel)]="rgbValue" format="rgb" />
<ui-lib-color-picker [(ngModel)]="hsbValue" format="hsb" />`;

export const formatsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';
import type { HsbColor, RgbColor } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './formats.example.html',
})
export class MyComponent {
  public hexValue: string = '6466f1';
  public rgbValue: RgbColor = { r: 100, g: 102, b: 241 };
  public hsbValue: HsbColor = { h: 239, s: 59, b: 95 };
}`;

export const inlineHtml = `<ui-lib-color-picker [inline]="true" [(ngModel)]="inlineHex" format="hex" />`;

export const inlineTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './inline.example.html',
})
export class MyComponent {
  public inlineHex: string = '3b82f6';
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-color-picker formControlName="color" format="hex" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ColorPicker, Button],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    color: new FormControl<string | null>('0ea5e9', { validators: [Validators.required] }),
  });

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`;

export const templateDrivenHtml = `<form #f="ngForm" (ngSubmit)="submitTemplateDriven()">
  <ui-lib-color-picker name="templateColor" [(ngModel)]="templateDrivenValue" format="hex" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`;

export const templateDrivenTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker, Button],
  templateUrl: './template-driven.example.html',
})
export class MyComponent {
  public templateDrivenValue: string = '22c55e';

  public submitTemplateDriven(): void {
    // handle form submit
  }
}`;

export const variantsHtml = `<ui-lib-color-picker variant="material" [(ngModel)]="variantValues.material" />
<ui-lib-color-picker variant="bootstrap" [(ngModel)]="variantValues.bootstrap" />
<ui-lib-color-picker variant="minimal" [(ngModel)]="variantValues.minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public readonly variantValues = {
    material: 'a855f7',
    bootstrap: 'f97316',
    minimal: '14b8a6',
  };
}`;
