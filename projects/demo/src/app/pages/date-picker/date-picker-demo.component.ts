import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { Button } from 'ui-lib-custom/button';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';
import type { ThemeVariant } from 'ui-lib-custom/core';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
type DatePickerDemoSnippetKey =
  | 'basic'
  | 'basicTs'
  | 'format'
  | 'formatTs'
  | 'icon'
  | 'iconTs'
  | 'minMax'
  | 'minMaxTs'
  | 'multiple'
  | 'multipleTs'
  | 'range'
  | 'rangeTs'
  | 'buttonBar'
  | 'buttonBarTs'
  | 'time24'
  | 'time24Ts'
  | 'time12'
  | 'time12Ts'
  | 'timeOnly'
  | 'timeOnlyTs'
  | 'monthPicker'
  | 'monthPickerTs'
  | 'yearPicker'
  | 'yearPickerTs'
  | 'multipleMonths'
  | 'multipleMonthsTs'
  | 'inline'
  | 'inlineTs'
  | 'sizes'
  | 'sizesTs'
  | 'variants'
  | 'variantsTs'
  | 'filled'
  | 'filledTs'
  | 'disabled'
  | 'disabledTs'
  | 'invalid'
  | 'invalidTs'
  | 'reactive'
  | 'reactiveTs';

/**
 * Demo page for DatePicker component scenarios and form integrations.
 */
@Component({
  selector: 'app-date-picker-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Button,
    DatePickerComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './date-picker-demo.component.html',
  styleUrl: './date-picker-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
    apgPattern: {
      name: 'Dialog (Modal)',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    },
  };

  public readonly importCode: string =
    "import { DatePickerComponent } from 'ui-lib-custom/date-picker'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<DatePickerDemoSnippetKey, string> = {
    basic: `<ui-lib-date-picker [(ngModel)]="basicDate" />`,
    basicTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  basicDate: Date | null = new Date();
}`,
    format: `<ui-lib-date-picker [(ngModel)]="formattedDate" dateFormat="yy-mm-dd" />`,
    formatTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  formattedDate: Date | null = new Date();
}`,
    icon: `<ui-lib-date-picker [(ngModel)]="iconDate" [showIcon]="true" iconDisplay="button" />`,
    iconTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  iconDate: Date | null = new Date();
}`,
    minMax: `<ui-lib-date-picker
  [(ngModel)]="constrainedDate"
  [minDate]="minDate"
  [maxDate]="maxDate"
/>`,
    minMaxTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  minDate: Date = new Date(2026, 2, 5);
  maxDate: Date = new Date(2026, 2, 26);
  constrainedDate: Date | null = new Date(2026, 2, 12);
}`,
    multiple: `<ui-lib-date-picker [(ngModel)]="multipleDates" selectionMode="multiple" />`,
    multipleTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  multipleDates: Date[] | null = null;
}`,
    range: `<ui-lib-date-picker [(ngModel)]="rangeDates" selectionMode="range" />`,
    rangeTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  rangeDates: Date[] | null = null;
}`,
    buttonBar: `<ui-lib-date-picker [(ngModel)]="buttonBarDate" [showButtonBar]="true" />`,
    buttonBarTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  buttonBarDate: Date | null = new Date();
}`,
    time24: `<ui-lib-date-picker [(ngModel)]="timeDate24" [showTime]="true" hourFormat="24" />`,
    time24Ts: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  timeDate24: Date | null = new Date();
}`,
    time12: `<ui-lib-date-picker
  [(ngModel)]="timeDate12"
  [showTime]="true"
  hourFormat="12"
  [showSeconds]="true"
/>`,
    time12Ts: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  timeDate12: Date | null = new Date();
}`,
    timeOnly: `<ui-lib-date-picker [(ngModel)]="timeOnlyValue" [timeOnly]="true" hourFormat="24" />`,
    timeOnlyTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  timeOnlyValue: Date | null = new Date();
}`,
    monthPicker: `<ui-lib-date-picker [(ngModel)]="monthValue" view="month" dateFormat="MM yy" />`,
    monthPickerTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  monthValue: Date | null = new Date();
}`,
    yearPicker: `<ui-lib-date-picker [(ngModel)]="yearValue" view="year" dateFormat="yy" />`,
    yearPickerTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  yearValue: Date | null = new Date();
}`,
    multipleMonths: `<ui-lib-date-picker [(ngModel)]="multipleMonthDate" [numberOfMonths]="2" />`,
    multipleMonthsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  multipleMonthDate: Date | null = new Date();
}`,
    inline: `<ui-lib-date-picker [(ngModel)]="inlineDate" [inline]="true" />`,
    inlineTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  inlineDate: Date | null = new Date();
}`,
    sizes: `<ui-lib-date-picker [(ngModel)]="sizeValues.sm" size="sm" />
<ui-lib-date-picker [(ngModel)]="sizeValues.md" size="md" />
<ui-lib-date-picker [(ngModel)]="sizeValues.lg" size="lg" />`,
    sizesTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  sizeValues = { sm: new Date(), md: new Date(), lg: new Date() };
}`,
    variants: `<ui-lib-date-picker [(ngModel)]="variantValues.material" variant="material" />
<ui-lib-date-picker [(ngModel)]="variantValues.bootstrap" variant="bootstrap" />
<ui-lib-date-picker [(ngModel)]="variantValues.minimal" variant="minimal" />`,
    variantsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  variantValues = { material: new Date(), bootstrap: new Date(), minimal: new Date() };
}`,
    filled: `<ui-lib-date-picker [(ngModel)]="filledDate" [filled]="true" />`,
    filledTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  filledDate: Date | null = new Date();
}`,
    disabled: `<ui-lib-date-picker [(ngModel)]="disabledDate" [disabled]="true" />`,
    disabledTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  disabledDate: Date | null = new Date();
}`,
    invalid: `<ui-lib-date-picker [(ngModel)]="invalidDate" [invalid]="true" />`,
    invalidTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  invalidDate: Date | null = null;
}`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-date-picker formControlName="appointment" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    reactiveTs: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [DatePickerComponent, Button, ReactiveFormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    appointment: new FormControl<Date | null>(null, { validators: [Validators.required] }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`,
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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'selectionMode',
      type: "'single' | 'multiple' | 'range'",
      default: "'single'",
      description: 'Controls single, multiple, or range selection.',
    },
    {
      name: 'dateFormat',
      type: 'string',
      default: "'mm/dd/yy'",
      description: 'Date display format string.',
    },
    {
      name: 'inline',
      type: 'boolean',
      default: 'false',
      description: 'Renders the calendar inline.',
    },
    {
      name: 'showIcon',
      type: 'boolean',
      default: 'false',
      description: 'Shows a calendar icon button.',
    },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear button.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Input placeholder text.' },
    {
      name: 'minDate',
      type: 'Date | null',
      default: 'null',
      description: 'Earliest selectable date.',
    },
    {
      name: 'maxDate',
      type: 'Date | null',
      default: 'null',
      description: 'Latest selectable date.',
    },
    {
      name: 'view',
      type: "'date' | 'month' | 'year'",
      default: "'date'",
      description: 'Calendar granularity.',
    },
    {
      name: 'showTime',
      type: 'boolean',
      default: 'false',
      description: 'Adds time picker below the calendar.',
    },
    { name: 'hourFormat', type: "'12' | '24'", default: "'24'", description: 'Time format.' },
  ];
}
