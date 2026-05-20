/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<uilib-float-label>
  <ui-lib-input placeholder=" " [(ngModel)]="basicValue" [label]="''" />
  <label>Username</label>
</uilib-float-label>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, UiLibInput],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicValue: string = '';
}`;

export const invalidHtml = `<form [formGroup]="invalidForm">
  <uilib-float-label variant="over">
    <input placeholder=" " formControlName="over" />
    <label>Required (over)</label>
  </uilib-float-label>
  <uilib-float-label variant="in">
    <input placeholder=" " formControlName="in" />
    <label>Required (in)</label>
  </uilib-float-label>
  <uilib-float-label variant="on">
    <input placeholder=" " formControlName="on" />
    <label>Required (on)</label>
  </uilib-float-label>
</form>`;

export const invalidTs = `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelComponent],
  templateUrl: './invalid.example.html',
})
export class MyComponent {
  public readonly invalidForm = new FormGroup({
    over: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    in: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    on: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-float-label>
    <input placeholder=" " formControlName="firstName" />
    <label>First name</label>
  </uilib-float-label>
  <uilib-float-label>
    <ui-lib-select [options]="cityOptions" formControlName="city" />
    <label>City</label>
  </uilib-float-label>
  <uilib-float-label variant="in">
    <textarea placeholder=" " formControlName="bio"></textarea>
    <label>Bio</label>
  </uilib-float-label>
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibSelect } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelComponent, UiLibSelect],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
    bio: new FormControl('', { nonNullable: true }),
  });
}`;

export const selectHtml = `<uilib-float-label>
  <ui-lib-select [(ngModel)]="selectedCity" [options]="cityOptions" />
  <label>City</label>
</uilib-float-label>`;

export const selectTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibSelect } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, UiLibSelect],
  templateUrl: './select.example.html',
})
export class MyComponent {
  public selectedCity: string | null = null;
  public readonly cityOptions = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
    { label: 'Lisbon', value: 'lisbon' },
  ];
}`;

export const textareaHtml = `<uilib-float-label>
  <textarea placeholder=" " [(ngModel)]="notes"></textarea>
  <label>Notes</label>
</uilib-float-label>`;

export const textareaTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent],
  templateUrl: './textarea.example.html',
})
export class MyComponent {
  public notes: string = '';
}`;

export const variantsHtml = `<uilib-float-label variant="over">
  <input placeholder=" " [(ngModel)]="variantValues.over" />
  <label>Over</label>
</uilib-float-label>
<uilib-float-label variant="in">
  <input placeholder=" " [(ngModel)]="variantValues.in" />
  <label>In</label>
</uilib-float-label>
<uilib-float-label variant="on">
  <input placeholder=" " [(ngModel)]="variantValues.on" />
  <label>On</label>
</uilib-float-label>`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public readonly variantValues: { over: string; in: string; on: string } = {
    over: '',
    in: '',
    on: '',
  };
}`;
