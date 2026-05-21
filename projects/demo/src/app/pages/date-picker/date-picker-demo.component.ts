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
import {
  basicHtml,
  basicTs,
  formatHtml,
  formatTs,
  iconHtml,
  iconTs,
  minMaxHtml,
  minMaxTs,
  multipleHtml,
  multipleTs,
  rangeHtml,
  rangeTs,
  buttonBarHtml,
  buttonBarTs,
  time24Html,
  time24Ts,
  timeOnlyHtml,
  timeOnlyTs,
  monthPickerHtml,
  monthPickerTs,
  yearPickerHtml,
  yearPickerTs,
  multipleMonthsHtml,
  multipleMonthsTs,
  inlineHtml,
  inlineTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  filledHtml,
  filledTs,
  disabledHtml,
  disabledTs,
  invalidHtml,
  invalidTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
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
    DocSectionComponent,
  ],
  templateUrl: './date-picker-demo.component.html',
  styleUrl: './date-picker-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly formatHtml: string = formatHtml;
  public readonly formatTs: string = formatTs;
  public readonly iconHtml: string = iconHtml;
  public readonly iconTs: string = iconTs;
  public readonly minMaxHtml: string = minMaxHtml;
  public readonly minMaxTs: string = minMaxTs;
  public readonly multipleHtml: string = multipleHtml;
  public readonly multipleTs: string = multipleTs;
  public readonly rangeHtml: string = rangeHtml;
  public readonly rangeTs: string = rangeTs;
  public readonly buttonBarHtml: string = buttonBarHtml;
  public readonly buttonBarTs: string = buttonBarTs;
  public readonly time24Html: string = time24Html;
  public readonly time24Ts: string = time24Ts;
  public readonly timeOnlyHtml: string = timeOnlyHtml;
  public readonly timeOnlyTs: string = timeOnlyTs;
  public readonly monthPickerHtml: string = monthPickerHtml;
  public readonly monthPickerTs: string = monthPickerTs;
  public readonly yearPickerHtml: string = yearPickerHtml;
  public readonly yearPickerTs: string = yearPickerTs;
  public readonly multipleMonthsHtml: string = multipleMonthsHtml;
  public readonly multipleMonthsTs: string = multipleMonthsTs;
  public readonly inlineHtml: string = inlineHtml;
  public readonly inlineTs: string = inlineTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTs: string = filledTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly invalidHtml: string = invalidHtml;
  public readonly invalidTs: string = invalidTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

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
