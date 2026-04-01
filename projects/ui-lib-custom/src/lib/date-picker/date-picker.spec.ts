import {
  ChangeDetectionStrategy,
  Component,
  type DebugElement,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { ThemeVariant } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { DatePickerComponent } from './date-picker';
import type { DatePickerDateMeta, DatePickerValue } from './date-picker.types';
import { createDate } from './date-utils';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [FormsModule, DatePickerComponent],
  template: `
    <ui-lib-date-picker
      [inline]="true"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateDrivenHostComponent {
  public value: Date | null = null;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DatePickerComponent],
  template: `
    <form [formGroup]="form">
      <ui-lib-date-picker [inline]="true" formControlName="date" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly form: FormGroup<{ date: FormControl<Date | null> }> = new FormGroup<{
    date: FormControl<Date | null>;
  }>({
    date: new FormControl<Date | null>(null),
  });
}

class MockThemeConfigService {
  public readonly variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');

  public setVariant(variant: ThemeVariant): void {
    this.variant.set(variant);
  }

  public getPreset(): { variant: ThemeVariant; colors: Record<string, string> } {
    return { variant: this.variant(), colors: {} };
  }

  public getCssVars(): Record<string, string> {
    return {};
  }
}

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
  const element: T | null = root.querySelector(selector) as T | null;
  if (!element) {
    throw new Error(`Expected element for selector: ${selector}`);
  }
  return element;
}

function createDateMeta(year: number, month: number, day: number): DatePickerDateMeta {
  return {
    day,
    month,
    year,
    today: false,
    selectable: true,
    selected: false,
    disabled: false,
    otherMonth: false,
  };
}

describe('DatePickerComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, TemplateDrivenHostComponent, ReactiveHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeConfigService, useClass: MockThemeConfigService },
      ],
    }).compileComponents();
  });

  function createFixture(): ComponentFixture<DatePickerComponent> {
    const fixture: ComponentFixture<DatePickerComponent> =
      TestBed.createComponent(DatePickerComponent);
    fixture.componentRef.setInput('appendTo', 'self');
    fixture.detectChanges();
    return fixture;
  }

  function hostElement(fixture: ComponentFixture<DatePickerComponent>): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function getPickerFromHostFixture<T>(fixture: ComponentFixture<T>): DatePickerComponent {
    const pickerDebugElements: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(DatePickerComponent)
    );
    const pickerDebugElement: DebugElement | undefined = pickerDebugElements[0];
    if (pickerDebugElement === undefined) {
      throw new Error('Expected DatePickerComponent to exist in host fixture.');
    }

    const componentInstance: unknown = pickerDebugElement.componentInstance;
    if (!(componentInstance instanceof DatePickerComponent)) {
      throw new Error('Expected queried instance to be DatePickerComponent.');
    }

    return componentInstance;
  }

  async function detectAndFlush(fixture: ComponentFixture<DatePickerComponent>): Promise<void> {
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();
  }

  function dateButton(
    fixture: ComponentFixture<DatePickerComponent>,
    year: number,
    month: number,
    day: number
  ): HTMLButtonElement {
    return requiredElement<HTMLButtonElement>(
      hostElement(fixture),
      `button[data-date-key='${year}-${month}-${day}']`
    );
  }

  describe('Rendering & modes', (): void => {
    it('renders popup mode by default', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();

      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__input')).toBeTruthy();
      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__panel')).toBeNull();
    });

    it('renders inline mode with panel visible and no input trigger', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__input')).toBeNull();
      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__panel')).toBeTruthy();
    });

    it('shows icon button when showIcon is true with button display', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('iconDisplay', 'button');
      fixture.detectChanges();

      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__trigger')).toBeTruthy();
    });

    it('shows clear button when showClear is true and a value exists', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('showClear', true);
      fixture.componentInstance.writeValue(createDate(2026, 2, 19));
      fixture.detectChanges();

      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__clear-button')).toBeTruthy();
    });

    it('applies variant, size, filled, and fluid classes', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('variant', 'bootstrap');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('filled', true);
      fixture.componentRef.setInput('fluid', true);
      fixture.detectChanges();

      const host: HTMLElement = hostElement(fixture);
      expect(host.className).toContain('ui-lib-datepicker--bootstrap');
      expect(host.className).toContain('ui-lib-datepicker--size-lg');
      expect(host.className).toContain('ui-lib-datepicker--filled');
      expect(host.className).toContain('ui-lib-datepicker--fluid');
    });
  });

  describe('Popup lifecycle', (): void => {
    it('defaults appendTo to body', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> =
        TestBed.createComponent(DatePickerComponent);
      fixture.detectChanges();

      fixture.componentInstance.showOverlay();
      fixture.detectChanges();

      const panel: HTMLDivElement | null = document.body.querySelector(
        '.ui-lib-datepicker__panel'
      ) as HTMLDivElement | null;
      expect(panel).toBeTruthy();
      expect(panel?.parentElement).toBe(document.body);
    });

    it('keeps detached panel open for inside click and closes on outside click', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('appendTo', 'body');
      fixture.detectChanges();

      fixture.componentInstance.showOverlay();
      fixture.detectChanges();

      const panel: HTMLDivElement = requiredElement<HTMLDivElement>(
        document.body,
        '.ui-lib-datepicker__panel'
      );
      panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeTruthy();

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeFalsy();
    });

    it('opens panel on input focus', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__input'
      );

      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeTruthy();
    });

    it('does not open panel on input focus when disabled', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__input'
      );
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeFalsy();
    });

    it('opens panel on trigger button click and emits onShow', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('iconDisplay', 'button');
      fixture.detectChanges();

      const showSpy: jest.SpyInstance = jest.spyOn(fixture.componentInstance.onShow, 'emit');
      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__trigger'
      ).click();
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeTruthy();
      expect(showSpy).toHaveBeenCalledTimes(1);
    });

    it('closes panel on outside click and emits onHide', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      const hideSpy: jest.SpyInstance = jest.spyOn(fixture.componentInstance.onHide, 'emit');
      fixture.componentInstance.showOverlay();
      fixture.detectChanges();

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeFalsy();
      expect(hideSpy).toHaveBeenCalled();
    });

    it('closes panel on Escape key', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentInstance.showOverlay();
      fixture.detectChanges();

      const panel: HTMLDivElement = requiredElement<HTMLDivElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__panel'
      );
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.overlayVisible()).toBeFalsy();
    });

    it('closes on date selection in single mode and stays open in multiple mode', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentInstance.writeValue(createDate(2026, 2, 10));
      fixture.componentInstance.showOverlay();
      fixture.detectChanges();

      const marchDay: HTMLButtonElement = dateButton(fixture, 2026, 2, 12);
      marchDay.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.overlayVisible()).toBeFalsy();

      fixture.componentRef.setInput('selectionMode', 'multiple');
      fixture.componentInstance.showOverlay();
      fixture.detectChanges();

      dateButton(fixture, 2026, 2, 14).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.overlayVisible()).toBeTruthy();
    });
  });

  describe('CVA integration', (): void => {
    it('writeValue(Date) updates display and selected state', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(createDate(2026, 2, 10));
      fixture.detectChanges();

      const selected: HTMLButtonElement = dateButton(fixture, 2026, 2, 10);
      expect(selected.className).toContain('ui-lib-datepicker__day--selected');
    });

    it('writeValue(Date[]) supports multiple mode', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('selectionMode', 'multiple');
      fixture.componentInstance.writeValue([createDate(2026, 2, 10), createDate(2026, 2, 12)]);
      fixture.detectChanges();

      expect(dateButton(fixture, 2026, 2, 10).className).toContain(
        'ui-lib-datepicker__day--selected'
      );
      expect(dateButton(fixture, 2026, 2, 12).className).toContain(
        'ui-lib-datepicker__day--selected'
      );
    });

    it('writeValue([Date, Date]) supports range mode', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('selectionMode', 'range');
      fixture.componentInstance.writeValue([createDate(2026, 2, 10), createDate(2026, 2, 14)]);
      fixture.detectChanges();

      expect(dateButton(fixture, 2026, 2, 10).className).toContain(
        'ui-lib-datepicker__day--range-start'
      );
      expect(dateButton(fixture, 2026, 2, 12).className).toContain(
        'ui-lib-datepicker__day--range-between'
      );
      expect(dateButton(fixture, 2026, 2, 14).className).toContain(
        'ui-lib-datepicker__day--range-end'
      );
    });

    it('writeValue(null) clears formatted value', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentInstance.writeValue(createDate(2026, 2, 10));
      fixture.componentInstance.writeValue(null);
      fixture.detectChanges();

      expect(fixture.componentInstance.formattedValue()).toBe('');
    });

    it('registerOnChange and registerOnTouched callbacks are invoked', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(createDate(2026, 2, 10));
      fixture.detectChanges();
      const changeSpy: jest.MockedFunction<(value: DatePickerValue) => void> = jest.fn();
      const touchedSpy: jest.MockedFunction<() => void> = jest.fn();
      fixture.componentInstance.registerOnChange(changeSpy);
      fixture.componentInstance.registerOnTouched(touchedSpy);

      dateButton(fixture, 2026, 2, 10).click();
      fixture.detectChanges();
      fixture.componentInstance.onInputBlurEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalled();
      expect(touchedSpy).toHaveBeenCalled();
    });

    it('setDisabledState disables interactions', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentInstance.setDisabledState(true);
      fixture.detectChanges();

      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__input'
      );
      expect(input.disabled).toBeTruthy();

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.overlayVisible()).toBeFalsy();
    });

    it('supports template-driven forms via ngModel', (): void => {
      const fixture: ComponentFixture<TemplateDrivenHostComponent> = TestBed.createComponent(
        TemplateDrivenHostComponent
      );
      fixture.detectChanges();
      const pickerDebug: DatePickerComponent = getPickerFromHostFixture(fixture);
      pickerDebug.currentYear.set(2026);
      pickerDebug.currentMonth.set(2);
      fixture.detectChanges();

      const selectedDateButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        fixture.nativeElement as HTMLElement,
        "button[data-date-key='2026-2-15']"
      );
      selectedDateButton.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value?.getFullYear()).toBe(2026);
      expect(fixture.componentInstance.value?.getMonth()).toBe(2);
      expect(fixture.componentInstance.value?.getDate()).toBe(15);
    });

    it('supports reactive forms via formControlName', (): void => {
      const fixture: ComponentFixture<ReactiveHostComponent> =
        TestBed.createComponent(ReactiveHostComponent);
      fixture.componentInstance.form.controls.date.setValue(createDate(2026, 2, 16));
      fixture.detectChanges();

      const pickerDebug: DatePickerComponent = getPickerFromHostFixture(fixture);
      expect(pickerDebug.formattedValue()).toContain('03/16/2026');
    });
  });

  describe('Calendar grid', (): void => {
    it('renders a 42-cell calendar grid and day headers based on firstDayOfWeek', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('firstDayOfWeek', 1);
      fixture.detectChanges();

      const cells: NodeListOf<Element> =
        hostElement(fixture).querySelectorAll('.ui-lib-datepicker__day');
      const firstHeader: HTMLElement = requiredElement<HTMLElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__week-day'
      );
      expect(cells.length).toBe(42);
      expect(String(firstHeader.textContent).trim()).toBe('Mo');
    });

    it('handles other-month visibility and selectability', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('showOtherMonths', false);
      fixture.componentRef.setInput('selectOtherMonths', false);
      fixture.detectChanges();

      const otherMonth: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__day--other-month'
      );
      expect(otherMonth.disabled).toBeTruthy();

      fixture.componentRef.setInput('showOtherMonths', true);
      fixture.componentRef.setInput('selectOtherMonths', true);
      fixture.detectChanges();

      const anotherOtherMonth: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__day--other-month'
      );
      expect(anotherOtherMonth.disabled).toBeFalsy();
    });

    it('applies today, min/max, disabledDates, disabledDays, multi-month, and week styles', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      const now: Date = new Date();
      const today: Date = createDate(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate: Date = createDate(now.getFullYear(), now.getMonth(), 10);
      const maxDate: Date = createDate(now.getFullYear(), now.getMonth(), 20);
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('numberOfMonths', 2);
      fixture.componentRef.setInput('showWeek', true);
      fixture.componentRef.setInput('minDate', minDate);
      fixture.componentRef.setInput('maxDate', maxDate);
      fixture.componentRef.setInput('disabledDates', [
        createDate(now.getFullYear(), now.getMonth(), 12),
      ]);
      fixture.componentRef.setInput('disabledDays', [0]);
      fixture.detectChanges();

      expect(hostElement(fixture).querySelectorAll('.ui-lib-datepicker__month-panel').length).toBe(
        2
      );
      expect(
        hostElement(fixture).querySelector('.ui-lib-datepicker__week-header')?.textContent
      ).toContain('Wk');
      expect(
        hostElement(fixture).querySelector(
          `button[data-date-key='${today.getFullYear()}-${today.getMonth()}-${today.getDate()}']`
        )?.className
      ).toContain('ui-lib-datepicker__day--today');

      const disabledDate: HTMLButtonElement = dateButton(
        fixture,
        now.getFullYear(),
        now.getMonth(),
        12
      );
      expect(disabledDate.disabled).toBeTruthy();
    });
  });

  describe('Navigation & selection', (): void => {
    it('navigates previous/next month and emits change events', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      const monthSpy: jest.SpyInstance = jest.spyOn(
        fixture.componentInstance.onMonthChange,
        'emit'
      );
      const initialMonth: number = fixture.componentInstance.currentMonth();

      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__next-button'
      ).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.currentMonth()).not.toBe(initialMonth);
      expect(monthSpy).toHaveBeenCalled();

      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__prev-button'
      ).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.currentMonth()).toBe(initialMonth);
    });

    it('disables prev and next navigation at min/max boundaries', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      const fixed: Date = createDate(2026, 2, 15);
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(fixed);
      fixture.componentRef.setInput('minDate', createDate(2026, 2, 1));
      fixture.componentRef.setInput('maxDate', createDate(2026, 2, 31));
      fixture.detectChanges();

      const prevButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__prev-button'
      );
      const nextButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__next-button'
      );

      expect(prevButton.disabled).toBeTruthy();
      expect(nextButton.disabled).toBeTruthy();
    });

    it('supports single, multiple toggle, and range swap behavior', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.currentYear.set(2026);
      fixture.componentInstance.currentMonth.set(2);
      fixture.detectChanges();

      dateButton(fixture, 2026, 2, 10).click();
      fixture.detectChanges();
      dateButton(fixture, 2026, 2, 12).click();
      fixture.detectChanges();
      expect(dateButton(fixture, 2026, 2, 10).className).not.toContain(
        'ui-lib-datepicker__day--selected'
      );
      expect(dateButton(fixture, 2026, 2, 12).className).toContain(
        'ui-lib-datepicker__day--selected'
      );

      fixture.componentRef.setInput('selectionMode', 'multiple');
      fixture.detectChanges();
      dateButton(fixture, 2026, 2, 12).click();
      dateButton(fixture, 2026, 2, 12).click();
      fixture.detectChanges();
      expect(dateButton(fixture, 2026, 2, 12).className).not.toContain(
        'ui-lib-datepicker__day--selected'
      );

      fixture.componentRef.setInput('selectionMode', 'range');
      fixture.detectChanges();
      dateButton(fixture, 2026, 2, 20).click();
      dateButton(fixture, 2026, 2, 10).click();
      fixture.detectChanges();
      expect(dateButton(fixture, 2026, 2, 10).className).toContain(
        'ui-lib-datepicker__day--range-start'
      );
      expect(dateButton(fixture, 2026, 2, 20).className).toContain(
        'ui-lib-datepicker__day--range-end'
      );
    });
  });

  describe('Month/year views', (): void => {
    it('renders month picker and returns to date view on month selection', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.onMonthLabelClick();
      fixture.detectChanges();

      expect(hostElement(fixture).querySelectorAll('.ui-lib-datepicker__month-cell').length).toBe(
        12
      );
      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        "button[data-month-index='2']"
      ).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.currentView()).toBe('date');
    });

    it('renders year picker and transitions to month view on year selection', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.onYearLabelClick();
      fixture.detectChanges();

      expect(hostElement(fixture).querySelectorAll('.ui-lib-datepicker__year-cell').length).toBe(
        12
      );
      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        "button[data-year-index='1']"
      ).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.currentView()).toBe('month');
    });

    it('in month primary view, selecting month emits value', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('view', 'month');
      fixture.detectChanges();

      const selectSpy: jest.SpyInstance = jest.spyOn(fixture.componentInstance.onSelect, 'emit');
      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        "button[data-month-index='4']"
      ).click();
      fixture.detectChanges();

      expect(selectSpy).toHaveBeenCalled();
    });

    it('supports month/year navigator dropdowns', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('monthNavigator', true);
      fixture.componentRef.setInput('yearNavigator', true);
      fixture.detectChanges();

      const monthSelect: HTMLSelectElement = requiredElement<HTMLSelectElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__month-select'
      );
      const yearSelect: HTMLSelectElement = requiredElement<HTMLSelectElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__year-select'
      );
      const monthSpy: jest.SpyInstance = jest.spyOn(
        fixture.componentInstance.onMonthChange,
        'emit'
      );
      const yearSpy: jest.SpyInstance = jest.spyOn(fixture.componentInstance.onYearChange, 'emit');

      monthSelect.value = '6';
      monthSelect.dispatchEvent(new Event('change', { bubbles: true }));
      yearSelect.value = `${fixture.componentInstance.currentYear() + 1}`;
      yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      expect(monthSpy).toHaveBeenCalled();
      expect(yearSpy).toHaveBeenCalled();
    });
  });

  describe('Time picker & button bar', (): void => {
    it('renders time picker and supports hour/minute controls with wrapping', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('showTime', true);
      fixture.componentRef.setInput('stepHour', 2);
      fixture.componentRef.setInput('stepMinute', 5);
      fixture.detectChanges();

      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__time-panel')).toBeTruthy();
      fixture.componentInstance.currentHour.set(23);
      fixture.componentInstance.incrementHour();
      fixture.componentInstance.currentMinute.set(0);
      fixture.componentInstance.decrementMinute();
      fixture.detectChanges();

      expect(fixture.componentInstance.currentHour()).toBe(1);
      expect(fixture.componentInstance.currentMinute()).toBe(55);
    });

    it('shows AM/PM in 12h mode and hides in 24h mode', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('showTime', true);
      fixture.componentRef.setInput('hourFormat', '12');
      fixture.detectChanges();
      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__ampm-toggle')).toBeTruthy();

      fixture.componentRef.setInput('hourFormat', '24');
      fixture.detectChanges();
      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__ampm-toggle')).toBeNull();
    });

    it('hides calendar grid when timeOnly is true', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('timeOnly', true);
      fixture.detectChanges();

      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__grid')).toBeNull();
      expect(hostElement(fixture).querySelector('.ui-lib-datepicker__time-panel')).toBeTruthy();
    });

    it('renders button bar, today sets value, clear clears and emits', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('showButtonBar', true);
      fixture.detectChanges();

      const clearSpy: jest.SpyInstance = jest.spyOn(fixture.componentInstance.onClear, 'emit');
      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__today-button'
      ).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.formattedValue().length).toBeGreaterThan(0);

      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__clear-button'
      ).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.formattedValue()).toBe('');
      expect(clearSpy).toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation & accessibility', (): void => {
    it('supports day-cell keyboard navigation and selection', async (): Promise<void> => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(createDate(2026, 2, 10));
      await detectAndFlush(fixture);

      const day: HTMLButtonElement = dateButton(fixture, 2026, 2, 10);
      day.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      day.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
      day.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageUp', shiftKey: true, bubbles: true })
      );
      day.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      day.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      day.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.focusedDate()).toBeTruthy();
      expect(fixture.componentInstance.formattedValue().length).toBeGreaterThan(0);
    });

    it('exposes expected ARIA roles and attributes', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(createDate(2026, 2, 10));
      fixture.componentRef.setInput('minDate', createDate(2026, 2, 10));
      fixture.componentRef.setInput('maxDate', createDate(2026, 2, 10));
      fixture.detectChanges();

      const inputFixture: ComponentFixture<DatePickerComponent> = createFixture();
      inputFixture.componentInstance.showOverlay();
      inputFixture.detectChanges();

      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        hostElement(inputFixture),
        '.ui-lib-datepicker__input'
      );
      const panel: HTMLDivElement = requiredElement<HTMLDivElement>(
        hostElement(inputFixture),
        '.ui-lib-datepicker__panel'
      );

      expect(input.getAttribute('role')).toBe('combobox');
      expect(input.getAttribute('aria-haspopup')).toBe('dialog');
      expect(panel.getAttribute('role')).toBe('dialog');
      expect(panel.getAttribute('aria-modal')).toBe('true');

      const grid: HTMLTableElement = requiredElement<HTMLTableElement>(
        hostElement(fixture),
        '.ui-lib-datepicker__grid'
      );
      expect(grid.getAttribute('role')).toBe('grid');

      const selectedCell: HTMLElement = requiredElement<HTMLElement>(
        hostElement(fixture),
        "td[role='gridcell'][aria-selected='true']"
      );
      const disabledCell: HTMLElement = requiredElement<HTMLElement>(
        hostElement(fixture),
        "td[role='gridcell'][aria-disabled='true']"
      );
      expect(selectedCell).toBeTruthy();
      expect(disabledCell).toBeTruthy();
      expect(
        requiredElement<HTMLButtonElement>(
          hostElement(fixture),
          '.ui-lib-datepicker__prev-button'
        ).getAttribute('aria-label')
      ).toBe('Previous month');
    });
  });

  describe('Edge cases', (): void => {
    it('supports leap day selection and empty initialization', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(null);
      fixture.componentInstance.currentYear.set(2024);
      fixture.componentInstance.currentMonth.set(1);
      fixture.detectChanges();

      expect(fixture.componentInstance.formattedValue()).toBe('');
      dateButton(fixture, 2024, 1, 29).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.formattedValue()).toContain('02/29/2024');
    });

    it('handles Jan 31 month navigation and programmatic reactive value changes', (): void => {
      const fixture: ComponentFixture<DatePickerComponent> = createFixture();
      fixture.componentRef.setInput('inline', true);
      fixture.componentInstance.writeValue(createDate(2025, 0, 31));
      fixture.detectChanges();

      const jan31Meta: DatePickerDateMeta = createDateMeta(2025, 0, 31);
      fixture.componentInstance.onDateCellKeydown(
        new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }),
        jan31Meta
      );
      fixture.detectChanges();
      expect(fixture.componentInstance.currentMonth()).toBeGreaterThan(0);

      const reactiveFixture: ComponentFixture<ReactiveHostComponent> =
        TestBed.createComponent(ReactiveHostComponent);
      reactiveFixture.detectChanges();
      reactiveFixture.componentInstance.form.controls.date.setValue(createDate(2027, 4, 9));
      reactiveFixture.detectChanges();

      const picker: DatePickerComponent = getPickerFromHostFixture(reactiveFixture);
      expect(picker.formattedValue()).toContain('05/09/2027');
    });
  });
});
