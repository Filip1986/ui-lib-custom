/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<uilib-knob [(ngModel)]="value" />`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  value: number = 40;
}`;

export const colorsHtml = `<uilib-knob valueColor="#f59e0b" textColor="#b45309" [(ngModel)]="value" />`;

export const colorsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './colors.example.html',
})
export class MyComponent {
  value: number = 75;
}`;

export const disabledHtml = `<uilib-knob [disabled]="true" [(ngModel)]="value" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  value: number = 55;
}`;

export const minmaxHtml = `<!-- -50 to +50, step 10 -->
<uilib-knob [min]="-50" [max]="50" [step]="10" [(ngModel)]="value" />`;

export const minmaxTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './minmax.example.html',
})
export class MyComponent {
  value: number = -20;
}`;

export const reactiveHtml = `<form [formGroup]="form">
  <uilib-knob formControlName="brightness" />
  <uilib-knob formControlName="contrast" />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, KnobComponent],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    brightness: new FormControl<number>(70),
    contrast: new FormControl<number>(50),
  });
}`;

export const readonlyHtml = `<uilib-knob [readonly]="true" [(ngModel)]="value" />`;

export const readonlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  value: number = 30;
}`;

export const sizesHtml = `<!-- Small -->
<uilib-knob size="sm" [(ngModel)]="value" />

<!-- Medium (default) -->
<uilib-knob size="md" [(ngModel)]="value" />

<!-- Large -->
<uilib-knob size="lg" [(ngModel)]="value" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  value: number = 40;
}`;

export const stepHtml = `<!-- Snaps to 0, 25, 50, 75, 100 -->
<uilib-knob [step]="25" [(ngModel)]="value" />`;

export const stepTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './step.example.html',
})
export class MyComponent {
  value: number = 0;
}`;

export const templateHtml = `<uilib-knob valueTemplate="{value}\\u00b0" [(ngModel)]="value" />

<uilib-knob valueTemplate="{value}%" [(ngModel)]="value" />`;

export const templateTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './template.example.html',
})
export class MyComponent {
  value: number = 60;
}`;
