/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-date-picker [(ngModel)]="basicDate" />`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  basicDate: Date | null = new Date();
}`;

export const buttonBarHtml = `<ui-lib-date-picker [(ngModel)]="buttonBarDate" [showButtonBar]="true" />`;

export const buttonBarTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './button-bar.example.html',
})
export class MyComponent {
  buttonBarDate: Date | null = new Date();
}`;

export const disabledHtml = `<ui-lib-date-picker [(ngModel)]="disabledDate" [disabled]="true" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  disabledDate: Date | null = new Date();
}`;

export const filledHtml = `<ui-lib-date-picker [(ngModel)]="filledDate" [filled]="true" />`;

export const filledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './filled.example.html',
})
export class MyComponent {
  filledDate: Date | null = new Date();
}`;

export const formatHtml = `<ui-lib-date-picker [(ngModel)]="formattedDate" dateFormat="yy-mm-dd" />`;

export const formatTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './format.example.html',
})
export class MyComponent {
  formattedDate: Date | null = new Date();
}`;

export const iconHtml = `<ui-lib-date-picker [(ngModel)]="iconDate" [showIcon]="true" iconDisplay="button" />`;

export const iconTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './icon.example.html',
})
export class MyComponent {
  iconDate: Date | null = new Date();
}`;

export const inlineHtml = `<ui-lib-date-picker [(ngModel)]="inlineDate" [inline]="true" />`;

export const inlineTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './inline.example.html',
})
export class MyComponent {
  inlineDate: Date | null = new Date();
}`;

export const invalidHtml = `<ui-lib-date-picker [(ngModel)]="invalidDate" [invalid]="true" />`;

export const invalidTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './invalid.example.html',
})
export class MyComponent {
  invalidDate: Date | null = null;
}`;

export const minMaxHtml = `<ui-lib-date-picker
  [(ngModel)]="constrainedDate"
  [minDate]="minDate"
  [maxDate]="maxDate"
/>`;

export const minMaxTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './min-max.example.html',
})
export class MyComponent {
  minDate: Date = new Date(2026, 2, 5);
  maxDate: Date = new Date(2026, 2, 26);
  constrainedDate: Date | null = new Date(2026, 2, 12);
}`;

export const monthPickerHtml = `<ui-lib-date-picker [(ngModel)]="monthValue" view="month" dateFormat="MM yy" />`;

export const monthPickerTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './month-picker.example.html',
})
export class MyComponent {
  monthValue: Date | null = new Date();
}`;

export const multipleMonthsHtml = `<ui-lib-date-picker [(ngModel)]="multipleMonthDate" [numberOfMonths]="2" />`;

export const multipleMonthsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './multiple-months.example.html',
})
export class MyComponent {
  multipleMonthDate: Date | null = new Date();
}`;

export const multipleHtml = `<ui-lib-date-picker [(ngModel)]="multipleDates" selectionMode="multiple" />`;

export const multipleTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './multiple.example.html',
})
export class MyComponent {
  multipleDates: Date[] | null = null;
}`;

export const rangeHtml = `<ui-lib-date-picker [(ngModel)]="rangeDates" selectionMode="range" />`;

export const rangeTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './range.example.html',
})
export class MyComponent {
  rangeDates: Date[] | null = null;
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-date-picker formControlName="appointment" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [DatePickerComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    appointment: new FormControl<Date | null>(null, { validators: [Validators.required] }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`;

export const sizesHtml = `<ui-lib-date-picker [(ngModel)]="sizeValues.sm" size="sm" />
<ui-lib-date-picker [(ngModel)]="sizeValues.md" size="md" />
<ui-lib-date-picker [(ngModel)]="sizeValues.lg" size="lg" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  sizeValues = { sm: new Date(), md: new Date(), lg: new Date() };
}`;

export const timeOnlyHtml = `<ui-lib-date-picker [(ngModel)]="timeOnlyValue" [timeOnly]="true" hourFormat="24" />`;

export const timeOnlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './time-only.example.html',
})
export class MyComponent {
  timeOnlyValue: Date | null = new Date();
}`;

export const time24Html = `<ui-lib-date-picker [(ngModel)]="timeDate24" [showTime]="true" hourFormat="24" />
<ui-lib-date-picker
  [(ngModel)]="timeDate12"
  [showTime]="true"
  hourFormat="12"
  [showSeconds]="true"
/>`;

export const time24Ts = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './time24.example.html',
})
export class MyComponent {
  timeDate24: Date | null = new Date();
}`;

export const variantsHtml = `<ui-lib-date-picker [(ngModel)]="variantValues.material" variant="material" />
<ui-lib-date-picker [(ngModel)]="variantValues.bootstrap" variant="bootstrap" />
<ui-lib-date-picker [(ngModel)]="variantValues.minimal" variant="minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  variantValues = { material: new Date(), bootstrap: new Date(), minimal: new Date() };
}`;

export const yearPickerHtml = `<ui-lib-date-picker [(ngModel)]="yearValue" view="year" dateFormat="yy" />`;

export const yearPickerTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './year-picker.example.html',
})
export class MyComponent {
  yearValue: Date | null = new Date();
}`;
