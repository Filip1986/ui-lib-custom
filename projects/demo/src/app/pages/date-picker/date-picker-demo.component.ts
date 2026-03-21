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
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';
import type { ThemeVariant } from 'ui-lib-custom/core';

type DatePickerDemoSnippetKey =
  | 'basic'
  | 'format'
  | 'icon'
  | 'minMax'
  | 'multiple'
  | 'range'
  | 'buttonBar'
  | 'time24'
  | 'time12'
  | 'timeOnly'
  | 'monthPicker'
  | 'yearPicker'
  | 'multipleMonths'
  | 'inline'
  | 'sizes'
  | 'variants'
  | 'filled'
  | 'disabled'
  | 'invalid'
  | 'reactive';

/**
 * Demo page for DatePicker component scenarios and form integrations.
 */
@Component({
  selector: 'app-date-picker-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Button,
    Card,
    DatePickerComponent,
  ],
  templateUrl: './date-picker-demo.component.html',
  styleUrl: './date-picker-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'format', label: 'Format' },
    { id: 'icon', label: 'Icon' },
    { id: 'min-max', label: 'Min/Max' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'range', label: 'Range' },
    { id: 'button-bar', label: 'Button Bar' },
    { id: 'time', label: 'Time' },
    { id: 'time-only', label: 'Time Only' },
    { id: 'month-picker', label: 'Month Picker' },
    { id: 'year-picker', label: 'Year Picker' },
    { id: 'multiple-months', label: 'Multiple Months' },
    { id: 'inline', label: 'Inline' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'filled', label: 'Filled' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
  ];

  public readonly snippets: Record<DatePickerDemoSnippetKey, string> = {
    basic: `<ui-lib-date-picker [(ngModel)]="basicDate" />`,
    format: `<ui-lib-date-picker [(ngModel)]="formattedDate" dateFormat="yy-mm-dd" />`,
    icon: `<ui-lib-date-picker [(ngModel)]="iconDate" [showIcon]="true" iconDisplay="button" />`,
    minMax: `<ui-lib-date-picker
  [(ngModel)]="constrainedDate"
  [minDate]="minDate"
  [maxDate]="maxDate"
/>`,
    multiple: `<ui-lib-date-picker [(ngModel)]="multipleDates" selectionMode="multiple" />`,
    range: `<ui-lib-date-picker [(ngModel)]="rangeDates" selectionMode="range" />`,
    buttonBar: `<ui-lib-date-picker [(ngModel)]="buttonBarDate" [showButtonBar]="true" />`,
    time24: `<ui-lib-date-picker [(ngModel)]="timeDate24" [showTime]="true" hourFormat="24" />`,
    time12: `<ui-lib-date-picker
  [(ngModel)]="timeDate12"
  [showTime]="true"
  hourFormat="12"
  [showSeconds]="true"
/>`,
    timeOnly: `<ui-lib-date-picker [(ngModel)]="timeOnlyValue" [timeOnly]="true" hourFormat="24" />`,
    monthPicker: `<ui-lib-date-picker [(ngModel)]="monthValue" view="month" dateFormat="MM yy" />`,
    yearPicker: `<ui-lib-date-picker [(ngModel)]="yearValue" view="year" dateFormat="yy" />`,
    multipleMonths: `<ui-lib-date-picker [(ngModel)]="multipleMonthDate" [numberOfMonths]="2" />`,
    inline: `<ui-lib-date-picker [(ngModel)]="inlineDate" [inline]="true" />`,
    sizes: `<ui-lib-date-picker [(ngModel)]="sizeValues.sm" size="sm" />
<ui-lib-date-picker [(ngModel)]="sizeValues.md" size="md" />
<ui-lib-date-picker [(ngModel)]="sizeValues.lg" size="lg" />`,
    variants: `<ui-lib-date-picker [(ngModel)]="variantValues.material" variant="material" />
<ui-lib-date-picker [(ngModel)]="variantValues.bootstrap" variant="bootstrap" />
<ui-lib-date-picker [(ngModel)]="variantValues.minimal" variant="minimal" />`,
    filled: `<ui-lib-date-picker [(ngModel)]="filledDate" [filled]="true" />`,
    disabled: `<ui-lib-date-picker [(ngModel)]="disabledDate" [disabled]="true" />`,
    invalid: `<ui-lib-date-picker [(ngModel)]="invalidDate" [invalid]="true" />`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-date-picker formControlName="appointment" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
  };

  public basicDate: Date | null = this.createDate(2026, 2, 20);
  public formattedDate: Date | null = this.createDate(2026, 2, 21);
  public iconDate: Date | null = this.createDate(2026, 2, 22);

  public readonly minDate: Date = this.createDate(2026, 2, 5);
  public readonly maxDate: Date = this.createDate(2026, 2, 26);
  public constrainedDate: Date | null = this.createDate(2026, 2, 12);

  public multipleDates: Date[] | null = [
    this.createDate(2026, 2, 10),
    this.createDate(2026, 2, 14),
  ];
  public rangeDates: Date[] | null = [this.createDate(2026, 2, 8), this.createDate(2026, 2, 18)];
  public buttonBarDate: Date | null = this.createDate(2026, 2, 13);

  public timeDate24: Date | null = this.createDateWithTime(2026, 2, 20, 15, 30, 0);
  public timeDate12: Date | null = this.createDateWithTime(2026, 2, 20, 21, 45, 25);
  public timeOnlyValue: Date | null = this.createDateWithTime(2026, 2, 20, 9, 15, 0);

  public monthValue: Date | null = this.createDate(2026, 6, 1);
  public yearValue: Date | null = this.createDate(2026, 0, 1);
  public multipleMonthDate: Date | null = this.createDate(2026, 2, 9);
  public inlineDate: Date | null = this.createDate(2026, 2, 16);

  public readonly sizeValues: { sm: Date | null; md: Date | null; lg: Date | null } = {
    sm: this.createDate(2026, 2, 11),
    md: this.createDate(2026, 2, 12),
    lg: this.createDate(2026, 2, 13),
  };

  public readonly variantValues: Record<ThemeVariant, Date | null> = {
    material: this.createDate(2026, 2, 10),
    bootstrap: this.createDate(2026, 2, 11),
    minimal: this.createDate(2026, 2, 12),
  };

  public filledDate: Date | null = this.createDate(2026, 2, 10);
  public disabledDate: Date | null = this.createDate(2026, 2, 19);
  public invalidDate: Date | null = null;

  public readonly reactiveForm: FormGroup<{ appointment: FormControl<Date | null> }> =
    new FormGroup<{ appointment: FormControl<Date | null> }>({
      appointment: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    });

  public reactiveSubmittedValue: Date | null = null;

  public snippet(key: DatePickerDemoSnippetKey): string {
    return this.snippets[key];
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    this.reactiveSubmittedValue = this.reactiveForm.controls.appointment.value;
  }

  public formatValue(value: Date | Date[] | null): string {
    if (value === null) {
      return 'null';
    }

    if (Array.isArray(value)) {
      return value.map((dateValue: Date): string => this.formatSingleDate(dateValue)).join(', ');
    }

    return this.formatSingleDate(value);
  }

  private createDate(year: number, month: number, day: number): Date {
    return new Date(year, month, day, 0, 0, 0, 0);
  }

  private createDateWithTime(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number
  ): Date {
    return new Date(year, month, day, hour, minute, second, 0);
  }

  private formatSingleDate(value: Date): string {
    return value.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
}
