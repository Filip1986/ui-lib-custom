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

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
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

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
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
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
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
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the date input or trigger icon.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the date picker.' },
    { key: 'Enter / Space', action: 'Opens the calendar panel or selects the focused date.' },
    { key: '↑ / ↓', action: 'Moves focus to the same day in the previous or next week.' },
    { key: '← / →', action: 'Moves focus to the previous or next day.' },
    { key: 'PageUp', action: 'Navigates to the previous month.' },
    { key: 'PageDown', action: 'Navigates to the next month.' },
    { key: 'Home', action: 'Moves focus to the first day of the current month.' },
    { key: 'End', action: 'Moves focus to the last day of the current month.' },
    { key: 'Escape', action: 'Closes the calendar panel.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Text input',
      attribute: 'aria-label',
      value: '"Date"',
      notes: 'Identifies the input field to screen readers.',
    },
    {
      element: 'Text input',
      attribute: 'aria-invalid',
      value: '"true"',
      notes: 'Applied when <code>[invalid]="true"</code>.',
    },
    {
      element: 'Text input',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Calendar panel',
      attribute: 'role="dialog"',
      value: '—',
      notes: 'The popup panel is exposed as a dialog.',
    },
    {
      element: 'Calendar panel',
      attribute: 'aria-modal',
      value: '"true"',
      notes: 'Restricts screen reader browsing to the calendar while open.',
    },
    {
      element: 'Calendar panel',
      attribute: 'aria-label',
      value: '"Calendar"',
      notes: 'Identifies the dialog to screen readers.',
    },
    {
      element: 'Calendar grid',
      attribute: 'role="grid"',
      value: '—',
      notes: 'The day grid is exposed as a table for navigation.',
    },
    {
      element: 'Day cell',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Indicates whether the day is selected.',
    },
    {
      element: 'Day cell',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied to dates outside <code>[minDate]</code>/<code>[maxDate]</code>.',
    },
    {
      element: 'Day cell',
      attribute: 'aria-current',
      value: '"date"',
      notes: "Applied to today's date.",
    },
    {
      element: 'Nav buttons',
      attribute: 'aria-label',
      value: '"Previous Month" / "Next Month"',
      notes: 'Announces the navigation button purpose.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-datepicker-input-bg',
      description: 'Uilib Datepicker Input background colour.',
    },
    {
      variable: '--uilib-datepicker-input-color',
      description: 'Uilib Datepicker Input text colour.',
    },
    {
      variable: '--uilib-datepicker-input-border-color',
      description: 'Uilib Datepicker Input Border text colour.',
    },
    {
      variable: '--uilib-datepicker-input-border-color-hover',
      description: 'Uilib Datepicker Input Border text colour (hover).',
    },
    {
      variable: '--uilib-datepicker-input-border-color-focus',
      description: 'Uilib Datepicker Input Border text colour (focus).',
    },
    {
      variable: '--uilib-datepicker-input-border-radius',
      description: 'Uilib Datepicker Input Border border radius.',
    },
    {
      variable: '--uilib-datepicker-input-padding-y',
      description: 'Uilib Datepicker Input vertical padding.',
    },
    {
      variable: '--uilib-datepicker-input-padding-x',
      description: 'Uilib Datepicker Input horizontal padding.',
    },
    {
      variable: '--uilib-datepicker-input-min-height',
      description: 'Uilib Datepicker Input Min height.',
    },
    {
      variable: '--uilib-datepicker-filled-bg',
      description: 'Uilib Datepicker Filled background colour.',
    },
    {
      variable: '--uilib-datepicker-invalid-border-color',
      description: 'Uilib Datepicker Invalid Border text colour.',
    },
    { variable: '--uilib-datepicker-focus-ring', description: 'Uilib Datepicker focus ring.' },
    {
      variable: '--uilib-datepicker-panel-bg',
      description: 'Uilib Datepicker Panel background colour.',
    },
    {
      variable: '--uilib-datepicker-panel-color',
      description: 'Uilib Datepicker Panel text colour.',
    },
    {
      variable: '--uilib-datepicker-panel-border-color',
      description: 'Uilib Datepicker Panel Border text colour.',
    },
    {
      variable: '--uilib-datepicker-panel-border-radius',
      description: 'Uilib Datepicker Panel Border border radius.',
    },
    {
      variable: '--uilib-datepicker-panel-shadow',
      description: 'Uilib Datepicker Panel box shadow.',
    },
    {
      variable: '--uilib-datepicker-panel-padding',
      description: 'Uilib Datepicker Panel padding.',
    },
    {
      variable: '--uilib-datepicker-panel-max-height',
      description: 'Uilib Datepicker Panel Max height.',
    },
    { variable: '--uilib-datepicker-z-index', description: 'Uilib Datepicker z-index.' },
    { variable: '--uilib-datepicker-header-gap', description: 'Uilib Datepicker Header gap.' },
    { variable: '--uilib-datepicker-title-gap', description: 'Uilib Datepicker Title gap.' },
    {
      variable: '--uilib-datepicker-title-font-size',
      description: 'Uilib Datepicker Title Font size.',
    },
    {
      variable: '--uilib-datepicker-title-font-weight',
      description: 'Uilib Datepicker Title font weight.',
    },
    {
      variable: '--uilib-datepicker-nav-button-size',
      description: 'Uilib Datepicker Nav Button size.',
    },
    {
      variable: '--uilib-datepicker-nav-button-radius',
      description: 'Uilib Datepicker Nav Button border radius.',
    },
    {
      variable: '--uilib-datepicker-nav-button-bg',
      description: 'Uilib Datepicker Nav Button background colour.',
    },
    {
      variable: '--uilib-datepicker-nav-button-bg-hover',
      description: 'Uilib Datepicker Nav Button background colour (hover).',
    },
    {
      variable: '--uilib-datepicker-nav-button-border-color',
      description: 'Uilib Datepicker Nav Button Border text colour.',
    },
    { variable: '--uilib-datepicker-calendar-gap', description: 'Uilib Datepicker Calendar gap.' },
    {
      variable: '--uilib-datepicker-day-cell-size',
      description: 'Uilib Datepicker Day Cell size.',
    },
    {
      variable: '--uilib-datepicker-day-cell-padding',
      description: 'Uilib Datepicker Day Cell padding.',
    },
    {
      variable: '--uilib-datepicker-day-font-size',
      description: 'Uilib Datepicker Day Font size.',
    },
    {
      variable: '--uilib-datepicker-day-font-weight',
      description: 'Uilib Datepicker Day font weight.',
    },
    {
      variable: '--uilib-datepicker-day-border-radius',
      description: 'Uilib Datepicker Day Border border radius.',
    },
    { variable: '--uilib-datepicker-day-color', description: 'Uilib Datepicker Day text colour.' },
    {
      variable: '--uilib-datepicker-day-bg-hover',
      description: 'Uilib Datepicker Day background colour (hover).',
    },
    { variable: '--uilib-datepicker-day-bg-today', description: 'Uilib Datepicker Day Bg Today.' },
    {
      variable: '--uilib-datepicker-day-color-today',
      description: 'Uilib Datepicker Day Color Today.',
    },
    {
      variable: '--uilib-datepicker-day-bg-selected',
      description: 'Uilib Datepicker Day background colour (selected).',
    },
    {
      variable: '--uilib-datepicker-day-color-selected',
      description: 'Uilib Datepicker Day text colour (selected).',
    },
    {
      variable: '--uilib-datepicker-day-bg-range-between',
      description: 'Uilib Datepicker Day Bg Range Between.',
    },
    {
      variable: '--uilib-datepicker-day-color-disabled',
      description: 'Uilib Datepicker Day text colour (disabled).',
    },
    {
      variable: '--uilib-datepicker-day-color-other-month',
      description: 'Uilib Datepicker Day Color Other Month.',
    },
    {
      variable: '--uilib-datepicker-month-year-cell-min-height',
      description: 'Uilib Datepicker Month Year Cell Min height.',
    },
    {
      variable: '--uilib-datepicker-month-year-cell-radius',
      description: 'Uilib Datepicker Month Year Cell border radius.',
    },
    {
      variable: '--uilib-datepicker-month-year-cell-font-size',
      description: 'Uilib Datepicker Month Year Cell Font size.',
    },
    { variable: '--uilib-datepicker-time-gap', description: 'Uilib Datepicker Time gap.' },
    {
      variable: '--uilib-datepicker-time-input-width',
      description: 'Uilib Datepicker Time Input width.',
    },
    {
      variable: '--uilib-datepicker-time-input-height',
      description: 'Uilib Datepicker Time Input height.',
    },
    {
      variable: '--uilib-datepicker-time-input-bg',
      description: 'Uilib Datepicker Time Input background colour.',
    },
    {
      variable: '--uilib-datepicker-time-input-color',
      description: 'Uilib Datepicker Time Input text colour.',
    },
    {
      variable: '--uilib-datepicker-time-input-border-color',
      description: 'Uilib Datepicker Time Input Border text colour.',
    },
    {
      variable: '--uilib-datepicker-time-input-border-radius',
      description: 'Uilib Datepicker Time Input Border border radius.',
    },
    {
      variable: '--uilib-datepicker-time-button-size',
      description: 'Uilib Datepicker Time Button size.',
    },
    {
      variable: '--uilib-datepicker-time-button-bg',
      description: 'Uilib Datepicker Time Button background colour.',
    },
    {
      variable: '--uilib-datepicker-time-button-bg-hover',
      description: 'Uilib Datepicker Time Button background colour (hover).',
    },
    {
      variable: '--uilib-datepicker-time-button-border-color',
      description: 'Uilib Datepicker Time Button Border text colour.',
    },
    {
      variable: '--uilib-datepicker-time-separator-color',
      description: 'Uilib Datepicker Time Separator text colour.',
    },
    {
      variable: '--uilib-datepicker-time-ampm-min-width',
      description: 'Uilib Datepicker Time Ampm Min width.',
    },
    {
      variable: '--uilib-datepicker-buttonbar-padding-top',
      description: 'Uilib Datepicker Buttonbar top padding.',
    },
    {
      variable: '--uilib-datepicker-buttonbar-gap',
      description: 'Uilib Datepicker Buttonbar gap.',
    },
    {
      variable: '--uilib-datepicker-buttonbar-border-color',
      description: 'Uilib Datepicker Buttonbar Border text colour.',
    },
    {
      variable: '--uilib-datepicker-transition-fast',
      description: 'Uilib Datepicker Transition Fast.',
    },
    {
      variable: '--uilib-datepicker-transition-normal',
      description: 'Uilib Datepicker Transition Normal.',
    },
    {
      variable: '--uilib-datepicker-panel-shadow-material',
      description: 'Uilib Datepicker Panel box shadow — material variant.',
    },
    {
      variable: '--uilib-datepicker-panel-shadow-bootstrap',
      description: 'Uilib Datepicker Panel box shadow — bootstrap variant.',
    },
    {
      variable: '--uilib-datepicker-panel-shadow-minimal',
      description: 'Uilib Datepicker Panel box shadow — minimal variant.',
    },
    {
      variable: '--uilib-datepicker-day-bg-selected-material',
      description: 'Uilib Datepicker Day Bg Selected — material variant.',
    },
    {
      variable: '--uilib-datepicker-day-bg-selected-bootstrap',
      description: 'Uilib Datepicker Day Bg Selected — bootstrap variant.',
    },
    {
      variable: '--uilib-datepicker-day-bg-selected-minimal',
      description: 'Uilib Datepicker Day Bg Selected — minimal variant.',
    },
    {
      variable: '--uilib-datepicker-day-bg-hover-material',
      description: 'Uilib Datepicker Day Bg Hover — material variant.',
    },
    {
      variable: '--uilib-datepicker-day-bg-hover-bootstrap',
      description: 'Uilib Datepicker Day Bg Hover — bootstrap variant.',
    },
    {
      variable: '--uilib-datepicker-day-bg-hover-minimal',
      description: 'Uilib Datepicker Day Bg Hover — minimal variant.',
    },
  ];
}
