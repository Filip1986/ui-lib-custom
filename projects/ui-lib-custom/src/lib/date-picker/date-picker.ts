import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { InputSignal, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import type { ThemeVariant } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  DATE_PICKER_CSS_CLASSES,
  DATE_PICKER_DEFAULTS,
  DEFAULT_LOCALE,
} from './date-picker.constants';
import { formatDate, parseDate } from './date-format';
import {
  addMonths,
  createDate,
  getDecadeBounds,
  getDaysInMonth,
  getMonthDates,
  getYearRange,
  isDateBetween,
  isDateDisabled,
  isDateEqual,
} from './date-utils';
import type {
  DatePickerChangeEvent,
  DatePickerDateMeta,
  DatePickerLocale,
  DatePickerMonthChangeEvent,
  DatePickerNavigationState,
  DatePickerSelectionMode,
  DatePickerSize,
  DatePickerValue,
  DatePickerView,
  DatePickerYearChangeEvent,
} from './date-picker.types';

@Component({
  selector: 'ui-lib-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof DatePickerComponent => DatePickerComponent),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-inline]': 'inline() ? "true" : null',
    '[attr.data-open]': 'overlayVisible() ? "true" : null',
    '[attr.data-disabled]': 'isDisabled() ? "true" : null',
  },
})
// eslint-disable-next-line jsdoc/require-jsdoc
export class DatePickerComponent implements ControlValueAccessor {
  public readonly selectionMode: InputSignal<DatePickerSelectionMode> =
    input<DatePickerSelectionMode>(DATE_PICKER_DEFAULTS.SelectionMode);
  public readonly dateFormat: InputSignal<string> = input<string>(DATE_PICKER_DEFAULTS.DateFormat);
  public readonly locale: InputSignal<DatePickerLocale> = input<DatePickerLocale>(DEFAULT_LOCALE);

  public readonly inline: InputSignal<boolean> = input<boolean>(DATE_PICKER_DEFAULTS.Inline);
  public readonly showIcon: InputSignal<boolean> = input<boolean>(DATE_PICKER_DEFAULTS.ShowIcon);
  public readonly iconDisplay: InputSignal<'input' | 'button'> = input<'input' | 'button'>('input');
  public readonly showClear: InputSignal<boolean> = input<boolean>(false);
  public readonly placeholder: InputSignal<string> = input<string>(
    DATE_PICKER_DEFAULTS.Placeholder
  );
  public readonly inputId: InputSignal<string> = input<string>(DATE_PICKER_DEFAULTS.InputId);
  public readonly name: InputSignal<string> = input<string>(DATE_PICKER_DEFAULTS.Name);

  public readonly minDate: InputSignal<Date | null> = input<Date | null>(
    DATE_PICKER_DEFAULTS.MinDate
  );
  public readonly maxDate: InputSignal<Date | null> = input<Date | null>(
    DATE_PICKER_DEFAULTS.MaxDate
  );
  public readonly disabledDates: InputSignal<Date[]> = input<Date[]>([]);
  public readonly disabledDays: InputSignal<number[]> = input<number[]>([]);
  public readonly selectOtherMonths: InputSignal<boolean> = input<boolean>(
    DATE_PICKER_DEFAULTS.SelectOtherMonths
  );
  public readonly showOtherMonths: InputSignal<boolean> = input<boolean>(
    DATE_PICKER_DEFAULTS.ShowOtherMonths
  );

  public readonly view: InputSignal<DatePickerView> = input<DatePickerView>(
    DATE_PICKER_DEFAULTS.View
  );
  public readonly numberOfMonths: InputSignal<number> = input<number>(1);
  public readonly yearRange: InputSignal<string> = input<string>('1970:2030');
  public readonly yearNavigator: InputSignal<boolean> = input<boolean>(false);
  public readonly monthNavigator: InputSignal<boolean> = input<boolean>(false);

  public readonly showTime: InputSignal<boolean> = input<boolean>(false);
  public readonly timeOnly: InputSignal<boolean> = input<boolean>(false);
  public readonly hourFormat: InputSignal<'12' | '24'> = input<'12' | '24'>('24');
  public readonly showSeconds: InputSignal<boolean> = input<boolean>(false);
  public readonly stepHour: InputSignal<number> = input<number>(1);
  public readonly stepMinute: InputSignal<number> = input<number>(1);
  public readonly stepSecond: InputSignal<number> = input<number>(1);

  public readonly showButtonBar: InputSignal<boolean> = input<boolean>(
    DATE_PICKER_DEFAULTS.ShowButtonBar
  );
  public readonly showWeek: InputSignal<boolean> = input<boolean>(DATE_PICKER_DEFAULTS.ShowWeek);
  public readonly firstDayOfWeek: InputSignal<number> = input<number>(
    DATE_PICKER_DEFAULTS.FirstDayOfWeek
  );

  public readonly variant: InputSignal<ThemeVariant | null> = input<ThemeVariant | null>(null);
  public readonly size: InputSignal<DatePickerSize> = input<DatePickerSize>(
    DATE_PICKER_DEFAULTS.Size
  );
  public readonly filled: InputSignal<boolean> = input<boolean>(DATE_PICKER_DEFAULTS.Filled);
  public readonly disabled: InputSignal<boolean> = input<boolean>(DATE_PICKER_DEFAULTS.Disabled);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);

  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
  public readonly tabindex: InputSignal<number> = input<number>(DATE_PICKER_DEFAULTS.TabIndex);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onSelect: OutputEmitterRef<DatePickerChangeEvent> =
    output<DatePickerChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onMonthChange: OutputEmitterRef<DatePickerMonthChangeEvent> =
    output<DatePickerMonthChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onYearChange: OutputEmitterRef<DatePickerYearChangeEvent> =
    output<DatePickerYearChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onShow: OutputEmitterRef<void> = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onHide: OutputEmitterRef<void> = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onClear: OutputEmitterRef<void> = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  @ViewChild('inputElement', { static: false })
  public inputElement?: ElementRef<HTMLInputElement>;

  @ViewChild('panelElement', { static: false })
  public panelElement?: ElementRef<HTMLDivElement>;

  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly modelValue: WritableSignal<DatePickerValue> = signal<DatePickerValue>(null);

  private onModelChange: (value: DatePickerValue) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  public readonly overlayVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentMonth: WritableSignal<number> = signal<number>(new Date().getMonth());
  public readonly currentYear: WritableSignal<number> = signal<number>(new Date().getFullYear());
  public readonly currentView: WritableSignal<DatePickerView> = signal<DatePickerView>(this.view());
  public readonly currentHour: WritableSignal<number> = signal<number>(0);
  public readonly currentMinute: WritableSignal<number> = signal<number>(0);
  public readonly currentSecond: WritableSignal<number> = signal<number>(0);
  public readonly currentAmPm: WritableSignal<'AM' | 'PM'> = signal<'AM' | 'PM'>('AM');
  public readonly hourInputDraft: WritableSignal<string | null> = signal<string | null>(null);
  public readonly minuteInputDraft: WritableSignal<string | null> = signal<string | null>(null);
  public readonly secondInputDraft: WritableSignal<string | null> = signal<string | null>(null);
  public readonly focused: WritableSignal<boolean> = signal<boolean>(false);
  public readonly focusedDate: WritableSignal<Date | null> = signal<Date | null>(null);
  public readonly hoveredDate: WritableSignal<Date | null> = signal<Date | null>(null);
  public readonly focusedMonthIndex: WritableSignal<number> = signal<number>(0);
  public readonly focusedYearIndex: WritableSignal<number> = signal<number>(0);
  public readonly currentDecadeStart: WritableSignal<number> = signal<number>(
    getDecadeBounds(new Date().getFullYear())[0]
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  public readonly resolvedVariant: Signal<ThemeVariant> = computed<ThemeVariant>(
    (): ThemeVariant => this.variant() ?? this.themeConfig.variant()
  );

  public readonly panelVisible: Signal<boolean> = computed<boolean>(
    (): boolean => this.inline() || this.overlayVisible()
  );

  public readonly resolvedInputId: Signal<string> = computed<string>((): string => {
    const configuredInputId: string = this.inputId().trim();
    return configuredInputId.length > 0 ? configuredInputId : 'ui-lib-datepicker-input';
  });

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      DATE_PICKER_CSS_CLASSES.Root,
      `${DATE_PICKER_CSS_CLASSES.Root}--size-${this.size()}`,
      `${DATE_PICKER_CSS_CLASSES.Root}--${this.resolvedVariant()}`,
    ];

    if (this.inline()) {
      classes.push(DATE_PICKER_CSS_CLASSES.Inline);
    }
    if (this.panelVisible()) {
      classes.push(DATE_PICKER_CSS_CLASSES.Open);
    }
    if (this.isDisabled()) {
      classes.push(DATE_PICKER_CSS_CLASSES.Disabled);
    }
    if (this.invalid()) {
      classes.push(DATE_PICKER_CSS_CLASSES.Invalid);
    }
    if (this.filled()) {
      classes.push(DATE_PICKER_CSS_CLASSES.Filled);
    }
    if (this.fluid()) {
      classes.push('ui-lib-datepicker--fluid');
    }

    return classes.join(' ');
  });

  public readonly navigationState: Signal<DatePickerNavigationState> =
    computed<DatePickerNavigationState>((): DatePickerNavigationState => {
      return {
        view: this.currentView(),
        month: this.currentMonth(),
        year: this.currentYear(),
      };
    });

  public readonly weekDayLabels: Signal<string[]> = computed<string[]>((): string[] => {
    const labels: string[] = this.locale().dayNamesMin;
    const firstDayIndex: number = this.normalizeWeekday(this.firstDayOfWeek());

    return Array.from({ length: 7 }, (_: unknown, index: number): string => {
      const dayIndex: number = (firstDayIndex + index) % 7;
      return labels[dayIndex] ?? '';
    });
  });

  public readonly visibleMonthStarts: Signal<Date[]> = computed<Date[]>((): Date[] => {
    const firstVisibleMonthStart: Date = createDate(this.currentYear(), this.currentMonth(), 1);
    const totalMonths: number = Math.max(1, this.numberOfMonths());

    return Array.from({ length: totalMonths }, (_: unknown, index: number): Date => {
      return addMonths(firstVisibleMonthStart, index);
    });
  });

  public readonly monthGridData: Signal<DatePickerDateMeta[][]> = computed<DatePickerDateMeta[][]>(
    (): DatePickerDateMeta[][] => {
      const minDate: Date | null = this.minDate();
      const maxDate: Date | null = this.maxDate();
      const disabledDates: Date[] = this.disabledDates();
      const disabledDays: number[] = this.disabledDays();

      return this.visibleMonthStarts().map((monthStart: Date): DatePickerDateMeta[] => {
        const rawMonthGrid: DatePickerDateMeta[] = getMonthDates(
          monthStart.getMonth(),
          monthStart.getFullYear(),
          this.firstDayOfWeek(),
          minDate,
          maxDate,
          disabledDates,
          disabledDays
        );

        return rawMonthGrid.map((dateMeta: DatePickerDateMeta): DatePickerDateMeta => {
          const date: Date = createDate(dateMeta.year, dateMeta.month, dateMeta.day);
          const hiddenOtherMonth: boolean = dateMeta.otherMonth && !this.showOtherMonths();
          const blockedOtherMonthSelection: boolean =
            dateMeta.otherMonth && !this.selectOtherMonths();
          const disabledByConstraints: boolean = isDateDisabled(
            date,
            minDate,
            maxDate,
            disabledDates,
            disabledDays
          );
          const disabled: boolean =
            dateMeta.disabled ||
            hiddenOtherMonth ||
            blockedOtherMonthSelection ||
            disabledByConstraints;

          return {
            ...dateMeta,
            disabled,
            selectable: !disabled,
            selected: this.isDateSelected(date),
          };
        });
      });
    }
  );

  public readonly monthLabel: Signal<string> = computed<string>((): string => {
    const monthNames: string[] = this.locale().monthNames;
    return monthNames[this.currentMonth()] ?? '';
  });

  public readonly yearLabel: Signal<string> = computed<string>((): string => {
    return `${this.currentYear()}`;
  });

  public readonly allowedYears: Signal<number[]> = computed<number[]>((): number[] => {
    return getYearRange(this.currentYear(), this.yearRange());
  });

  public readonly monthOptions: Signal<
    Array<{ month: number; label: string; disabled: boolean; selected: boolean }>
  > = computed<Array<{ month: number; label: string; disabled: boolean; selected: boolean }>>(
    (): Array<{ month: number; label: string; disabled: boolean; selected: boolean }> => {
      return this.locale().monthNamesShort.map(
        (
          monthLabel: string,
          monthIndex: number
        ): {
          month: number;
          label: string;
          disabled: boolean;
          selected: boolean;
        } => {
          const firstMonthDate: Date = createDate(this.currentYear(), monthIndex, 1);
          const lastMonthDate: Date = createDate(
            this.currentYear(),
            monthIndex,
            getDaysInMonth(monthIndex, this.currentYear())
          );
          const isMonthDisabledByRange: boolean =
            !this.canDatePassMinMax(firstMonthDate) && !this.canDatePassMinMax(lastMonthDate);

          return {
            month: monthIndex,
            label: monthLabel,
            disabled: isMonthDisabledByRange,
            selected: this.currentMonth() === monthIndex,
          };
        }
      );
    }
  );

  public readonly yearOptions: Signal<
    Array<{ year: number; disabled: boolean; selected: boolean }>
  > = computed<Array<{ year: number; disabled: boolean; selected: boolean }>>(
    (): Array<{ year: number; disabled: boolean; selected: boolean }> => {
      const [decadeStart, decadeEnd]: [number, number] = getDecadeBounds(this.currentYear());
      const clampedDecadeStart: number =
        this.currentDecadeStart() < decadeStart || this.currentDecadeStart() > decadeEnd
          ? decadeStart
          : this.currentDecadeStart();
      const allowedYearSet: Set<number> = new Set<number>(this.allowedYears());

      return Array.from({ length: 12 }, (_: unknown, index: number): number => {
        return clampedDecadeStart + index;
      }).map((yearValue: number): { year: number; disabled: boolean; selected: boolean } => {
        const yearStartDate: Date = createDate(yearValue, 0, 1);
        const yearEndDate: Date = createDate(yearValue, 11, 31);
        const disabledByRange: boolean =
          !allowedYearSet.has(yearValue) ||
          (!this.canDatePassMinMax(yearStartDate) && !this.canDatePassMinMax(yearEndDate));

        return {
          year: yearValue,
          disabled: disabledByRange,
          selected: this.currentYear() === yearValue,
        };
      });
    }
  );

  public readonly canNavigatePrev: Signal<boolean> = computed<boolean>((): boolean => {
    const firstVisibleMonthStart: Date =
      this.visibleMonthStarts()[0] ?? createDate(this.currentYear(), this.currentMonth(), 1);
    const candidateStart: Date = addMonths(firstVisibleMonthStart, -1);
    return this.canDisplayMonthRange(candidateStart);
  });

  public readonly canNavigateNext: Signal<boolean> = computed<boolean>((): boolean => {
    const firstVisibleMonthStart: Date =
      this.visibleMonthStarts()[0] ?? createDate(this.currentYear(), this.currentMonth(), 1);
    const candidateStart: Date = addMonths(firstVisibleMonthStart, 1);
    return this.canDisplayMonthRange(candidateStart);
  });

  public readonly formattedValue: Signal<string> = computed<string>((): string => {
    const value: DatePickerValue = this.modelValue();
    if (value === null) {
      return '';
    }

    const includeTime: boolean = this.showTime() || this.timeOnly();
    const timeOnly: boolean = this.timeOnly();

    if (value instanceof Date) {
      return this.formatDisplayValue(value, includeTime, timeOnly);
    }

    if (!Array.isArray(value)) {
      return '';
    }

    const formattedDates: string[] = value.map((dateValue: Date): string =>
      this.formatDisplayValue(dateValue, includeTime, timeOnly)
    );

    if (this.selectionMode() === 'range') {
      return formattedDates.join(' - ');
    }

    return formattedDates.join(', ');
  });

  constructor() {
    this.syncTimeStateFromDate(new Date());

    effect((): void => {
      this.currentView.set(this.view());
    });

    effect((): void => {
      if (this.inline()) {
        this.overlayVisible.set(false);
      }
    });

    effect((): void => {
      if (!this.panelVisible()) {
        return;
      }

      const nextFocusedDate: Date = this.focusedDate() ?? this.getReferenceDateForFocus();
      this.focusedDate.set(nextFocusedDate);
      queueMicrotask((): void => this.focusDateCell(nextFocusedDate));
    });
  }

  public writeValue(value: DatePickerValue): void {
    const normalizedValue: DatePickerValue = this.normalizeValueForMode(value);
    this.modelValue.set(normalizedValue);
    this.syncNavigationFromValue(normalizedValue);
    this.syncTimeStateFromValue(normalizedValue);
  }

  public registerOnChange(fn: (value: DatePickerValue) => void): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public showOverlay(): void {
    if (this.inline() || this.isDisabled() || this.overlayVisible()) {
      return;
    }

    this.overlayVisible.set(true);
    this.focusedDate.set(this.getReferenceDateForFocus());
    this.onShow.emit();
  }

  public hideOverlay(): void {
    if (this.inline() || !this.overlayVisible()) {
      return;
    }

    this.overlayVisible.set(false);
    this.onHide.emit();
    this.onModelTouched();
  }

  public toggleOverlay(): void {
    if (this.panelVisible()) {
      this.hideOverlay();
    } else {
      this.showOverlay();
    }
  }

  public onInputFocusEvent(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  public onInputBlurEvent(event: FocusEvent): void {
    this.focused.set(false);
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  public onInputKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowDown || event.key === KEYBOARD_KEYS.Enter) {
      event.preventDefault();
      this.showOverlay();
      return;
    }

    if (event.key === KEYBOARD_KEYS.Escape) {
      event.preventDefault();
      this.hideOverlay();
    }
  }

  public onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Escape) {
      event.preventDefault();
      this.hideOverlay();
      this.inputElement?.nativeElement.focus();
    }
  }

  public onMonthCellKeydown(event: KeyboardEvent, monthIndex: number): void {
    const columns: number = 3;
    const lastIndex: number = this.monthOptions().length - 1;

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowLeft:
        event.preventDefault();
        this.focusMonthCell(Math.max(0, monthIndex - 1));
        return;
      case KEYBOARD_KEYS.ArrowRight:
        event.preventDefault();
        this.focusMonthCell(Math.min(lastIndex, monthIndex + 1));
        return;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        this.focusMonthCell(Math.max(0, monthIndex - columns));
        return;
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        this.focusMonthCell(Math.min(lastIndex, monthIndex + columns));
        return;
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.focusMonthCell(0);
        return;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.focusMonthCell(lastIndex);
        return;
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.onMonthSelect(event, monthIndex);
        return;
      default:
        return;
    }
  }

  public onYearCellKeydown(event: KeyboardEvent, yearIndex: number): void {
    const columns: number = 3;
    const lastIndex: number = this.yearOptions().length - 1;

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowLeft:
        event.preventDefault();
        this.focusYearCell(Math.max(0, yearIndex - 1));
        return;
      case KEYBOARD_KEYS.ArrowRight:
        event.preventDefault();
        this.focusYearCell(Math.min(lastIndex, yearIndex + 1));
        return;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        this.focusYearCell(Math.max(0, yearIndex - columns));
        return;
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        this.focusYearCell(Math.min(lastIndex, yearIndex + columns));
        return;
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.focusYearCell(0);
        return;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.focusYearCell(lastIndex);
        return;
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.onYearSelect(event, yearIndex);
        return;
      default:
        return;
    }
  }

  public onDateCellKeydown(event: KeyboardEvent, dateMeta: DatePickerDateMeta): void {
    switch (event.key) {
      case KEYBOARD_KEYS.ArrowLeft:
        event.preventDefault();
        this.moveFocusedDateByDays(-1);
        return;
      case KEYBOARD_KEYS.ArrowRight:
        event.preventDefault();
        this.moveFocusedDateByDays(1);
        return;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        this.moveFocusedDateByDays(-7);
        return;
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        this.moveFocusedDateByDays(7);
        return;
      case 'PageUp':
        event.preventDefault();
        if (event.shiftKey) {
          this.moveFocusedDateByMonths(-12);
        } else {
          this.moveFocusedDateByMonths(-1);
        }
        return;
      case 'PageDown':
        event.preventDefault();
        if (event.shiftKey) {
          this.moveFocusedDateByMonths(12);
        } else {
          this.moveFocusedDateByMonths(1);
        }
        return;
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.focusFirstDayOfCurrentMonth();
        return;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.focusLastDayOfCurrentMonth();
        return;
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.onDateSelect(event, dateMeta);
        return;
      case KEYBOARD_KEYS.Escape:
        if (!this.inline()) {
          event.preventDefault();
          this.hideOverlay();
          this.inputElement?.nativeElement.focus();
        }
        return;
      case KEYBOARD_KEYS.Tab:
        if (!this.inline() && !this.showTime() && !this.timeOnly() && !this.showButtonBar()) {
          this.hideOverlay();
        }
        return;
      default:
        return;
    }
  }

  public onInputChange(rawValue: string): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.selectionMode() !== 'single') {
      return;
    }

    const parsedDate: Date | null = parseDate(rawValue, this.dateFormat(), this.locale());
    const includeTime: boolean = this.showTime() || this.timeOnly();
    const nextValue: Date | null = parsedDate
      ? includeTime
        ? this.applyCurrentTimeToDate(parsedDate)
        : parsedDate
      : null;

    this.modelValue.set(nextValue);
    this.onModelChange(nextValue);
    this.syncNavigationFromValue(nextValue);
  }

  public getHourDisplayValue(): number {
    if (this.hourFormat() === '24') {
      return this.currentHour();
    }

    const currentHour: number = this.currentHour() % 12;
    return currentHour === 0 ? 12 : currentHour;
  }

  public getHourSpinMin(): number {
    return this.hourFormat() === '24' ? 0 : 1;
  }

  public getHourSpinMax(): number {
    return this.hourFormat() === '24' ? 23 : 12;
  }

  public getHourInputValue(): string {
    const draft: string | null = this.hourInputDraft();
    return draft === null ? this.padTwoDigits(this.getHourDisplayValue()) : draft;
  }

  public getMinuteInputValue(): string {
    const draft: string | null = this.minuteInputDraft();
    return draft === null ? this.padTwoDigits(this.currentMinute()) : draft;
  }

  public getSecondInputValue(): string {
    const draft: string | null = this.secondInputDraft();
    return draft === null ? this.padTwoDigits(this.currentSecond()) : draft;
  }

  public incrementHour(): void {
    if (this.isDisabled()) {
      return;
    }

    this.hourInputDraft.set(null);
    this.currentHour.set(
      this.wrapValue(this.currentHour() + this.getPositiveStep(this.stepHour()), 24)
    );
    this.currentAmPm.set(this.currentHour() >= 12 ? 'PM' : 'AM');
    this.applyTimeToModelValue();
  }

  public decrementHour(): void {
    if (this.isDisabled()) {
      return;
    }

    this.hourInputDraft.set(null);
    this.currentHour.set(
      this.wrapValue(this.currentHour() - this.getPositiveStep(this.stepHour()), 24)
    );
    this.currentAmPm.set(this.currentHour() >= 12 ? 'PM' : 'AM');
    this.applyTimeToModelValue();
  }

  public incrementMinute(): void {
    if (this.isDisabled()) {
      return;
    }

    this.minuteInputDraft.set(null);
    this.currentMinute.set(
      this.wrapValue(this.currentMinute() + this.getPositiveStep(this.stepMinute()), 60)
    );
    this.applyTimeToModelValue();
  }

  public decrementMinute(): void {
    if (this.isDisabled()) {
      return;
    }

    this.minuteInputDraft.set(null);
    this.currentMinute.set(
      this.wrapValue(this.currentMinute() - this.getPositiveStep(this.stepMinute()), 60)
    );
    this.applyTimeToModelValue();
  }

  public incrementSecond(): void {
    if (this.isDisabled()) {
      return;
    }

    this.secondInputDraft.set(null);
    this.currentSecond.set(
      this.wrapValue(this.currentSecond() + this.getPositiveStep(this.stepSecond()), 60)
    );
    this.applyTimeToModelValue();
  }

  public decrementSecond(): void {
    if (this.isDisabled()) {
      return;
    }

    this.secondInputDraft.set(null);
    this.currentSecond.set(
      this.wrapValue(this.currentSecond() - this.getPositiveStep(this.stepSecond()), 60)
    );
    this.applyTimeToModelValue();
  }

  public toggleAmPm(): void {
    if (this.isDisabled() || this.hourFormat() !== '12') {
      return;
    }

    const nextAmPm: 'AM' | 'PM' = this.currentAmPm() === 'AM' ? 'PM' : 'AM';
    this.currentAmPm.set(nextAmPm);
    this.currentHour.set(this.wrapValue(this.currentHour() + 12, 24));
    this.applyTimeToModelValue();
  }

  public onTimeInputChange(unit: 'hour' | 'minute' | 'second', rawValue: string): void {
    if (this.isDisabled()) {
      return;
    }

    const digitsOnly: string = rawValue.replace(/\D+/g, '').slice(0, 2);
    if (unit === 'hour') {
      this.hourInputDraft.set(digitsOnly);
      return;
    }

    if (unit === 'minute') {
      this.minuteInputDraft.set(digitsOnly);
      return;
    }

    this.secondInputDraft.set(digitsOnly);
  }

  public onTimeInputBlur(unit: 'hour' | 'minute' | 'second'): void {
    if (this.isDisabled()) {
      return;
    }

    this.commitTimeInputDraft(unit);
    this.applyTimeToModelValue();
  }

  public onTimeInputKeydown(event: KeyboardEvent, unit: 'hour' | 'minute' | 'second'): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowUp) {
      event.preventDefault();
      this.adjustTimeUnit(unit, 1);
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowDown) {
      event.preventDefault();
      this.adjustTimeUnit(unit, -1);
      return;
    }

    if (event.key === KEYBOARD_KEYS.Enter) {
      event.preventDefault();
      this.commitTimeInputDraft(unit);
      this.applyTimeToModelValue();
      if (!this.inline()) {
        this.hideOverlay();
      }
    }
  }

  public onTodayButtonClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const now: Date = new Date();
    this.syncTimeStateFromDate(now);

    const includeTime: boolean = this.showTime() || this.timeOnly();
    const baseDate: Date = createDate(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate: Date = includeTime ? this.applyCurrentTimeToDate(baseDate) : baseDate;
    const mode: DatePickerSelectionMode = this.selectionMode();
    const nextValue: DatePickerValue = mode === 'single' ? selectedDate : [selectedDate];

    this.modelValue.set(nextValue);
    this.onModelChange(nextValue);
    this.onSelect.emit({
      originalEvent: event,
      value: nextValue,
    });
    this.syncNavigationFromValue(nextValue);
  }

  public onClearButtonClick(event: MouseEvent): void {
    this.clearValue(event);
  }

  public onDateHover(dateMeta: DatePickerDateMeta): void {
    if (this.selectionMode() !== 'range') {
      return;
    }

    const value: DatePickerValue = this.modelValue();
    if (!Array.isArray(value) || value.length !== 1 || !(value[0] instanceof Date)) {
      return;
    }

    if (dateMeta.disabled || !dateMeta.selectable) {
      this.hoveredDate.set(null);
      return;
    }

    this.hoveredDate.set(createDate(dateMeta.year, dateMeta.month, dateMeta.day));
  }

  public onDateMouseLeave(): void {
    this.hoveredDate.set(null);
  }

  public clearValue(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.modelValue.set(null);
    this.hoveredDate.set(null);
    this.hourInputDraft.set(null);
    this.minuteInputDraft.set(null);
    this.secondInputDraft.set(null);
    this.onModelChange(null);
    this.onClear.emit();
  }

  public onTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.toggleOverlay();
  }

  public navigateMonth(direction: -1 | 1): void {
    if (direction < 0 && !this.canNavigatePrev()) {
      return;
    }

    if (direction > 0 && !this.canNavigateNext()) {
      return;
    }

    const currentDate: Date = createDate(this.currentYear(), this.currentMonth(), 1);
    const nextDate: Date = addMonths(currentDate, direction);

    this.currentMonth.set(nextDate.getMonth());
    this.currentYear.set(nextDate.getFullYear());

    this.onMonthChange.emit({
      month: this.currentMonth() + 1,
      year: this.currentYear(),
    });
  }

  public navigateYear(direction: -1 | 1): void {
    const currentDate: Date = createDate(this.currentYear(), this.currentMonth(), 1);
    const nextDate: Date = addMonths(currentDate, direction * 12);

    if (!this.canDisplayMonthRange(nextDate)) {
      return;
    }

    this.currentMonth.set(nextDate.getMonth());
    this.currentYear.set(nextDate.getFullYear());

    this.onYearChange.emit({
      month: this.currentMonth() + 1,
      year: this.currentYear(),
    });
  }

  public navigateDecade(direction: -1 | 1): void {
    const allowedYears: number[] = this.allowedYears();
    if (allowedYears.length === 0) {
      return;
    }

    const nextDecadeStart: number = this.currentDecadeStart() + direction * 10;
    const minAllowedYear: number = Math.min(...allowedYears);
    const maxAllowedYear: number = Math.max(...allowedYears);
    const clampedDecadeStart: number = Math.max(
      Math.floor(minAllowedYear / 10) * 10,
      Math.min(nextDecadeStart, Math.floor(maxAllowedYear / 10) * 10)
    );

    this.currentDecadeStart.set(clampedDecadeStart);
  }

  public onMonthLabelClick(): void {
    if (this.currentView() === 'year') {
      this.currentView.set('month');
      return;
    }

    if (this.currentView() === 'date') {
      this.currentView.set('month');
      this.focusedMonthIndex.set(this.currentMonth());
    }
  }

  public onYearLabelClick(): void {
    this.currentView.set('year');
    this.currentDecadeStart.set(getDecadeBounds(this.currentYear())[0]);
    this.focusedYearIndex.set(
      this.yearOptions().findIndex(
        (yearOption: { year: number; disabled: boolean; selected: boolean }): boolean =>
          yearOption.year === this.currentYear()
      )
    );
  }

  public onMonthNavigatorChange(event: Event): void {
    const value: string = (event.target as HTMLSelectElement).value;
    const month: number = Number.parseInt(value, 10);
    if (!Number.isFinite(month)) {
      return;
    }

    this.currentMonth.set(month);
    this.onMonthChange.emit({
      month: this.currentMonth() + 1,
      year: this.currentYear(),
    });
  }

  public onYearNavigatorChange(event: Event): void {
    const value: string = (event.target as HTMLSelectElement).value;
    const year: number = Number.parseInt(value, 10);
    if (!Number.isFinite(year)) {
      return;
    }

    this.currentYear.set(year);
    this.currentDecadeStart.set(getDecadeBounds(year)[0]);
    this.onYearChange.emit({
      month: this.currentMonth() + 1,
      year: this.currentYear(),
    });
  }

  public onMonthSelect(event: Event, monthIndex: number): void {
    const monthOption:
      | { month: number; label: string; disabled: boolean; selected: boolean }
      | undefined = this.monthOptions()[monthIndex];
    if (!monthOption || monthOption.disabled) {
      return;
    }

    if (this.view() === 'month') {
      const selectedDate: Date = createDate(this.currentYear(), monthOption.month, 1);
      this.applySelectedDate(event, selectedDate, false);
      return;
    }

    this.currentMonth.set(monthOption.month);
    this.focusedMonthIndex.set(monthIndex);
    this.currentView.set('date');
  }

  public onYearSelect(event: Event, yearIndex: number): void {
    const yearOption: { year: number; disabled: boolean; selected: boolean } | undefined =
      this.yearOptions()[yearIndex];
    if (!yearOption || yearOption.disabled) {
      return;
    }

    if (this.view() === 'year') {
      const selectedDate: Date = createDate(yearOption.year, 0, 1);
      this.applySelectedDate(event, selectedDate, false);
      return;
    }

    this.currentYear.set(yearOption.year);
    this.currentDecadeStart.set(getDecadeBounds(yearOption.year)[0]);
    this.focusedYearIndex.set(yearIndex);
    this.currentView.set('month');
  }

  public getMonthLabelByIndex(monthIndex: number): string {
    const monthStart: Date =
      this.visibleMonthStarts()[monthIndex] ??
      createDate(this.currentYear(), this.currentMonth(), 1);
    return this.locale().monthNames[monthStart.getMonth()] ?? '';
  }

  public getYearLabelByIndex(monthIndex: number): string {
    const monthStart: Date =
      this.visibleMonthStarts()[monthIndex] ??
      createDate(this.currentYear(), this.currentMonth(), 1);
    return `${monthStart.getFullYear()}`;
  }

  public getMonthWeeks(monthGrid: DatePickerDateMeta[]): DatePickerDateMeta[][] {
    const weeks: DatePickerDateMeta[][] = [];
    for (let weekIndex: number = 0; weekIndex < 6; weekIndex += 1) {
      const start: number = weekIndex * 7;
      weeks.push(monthGrid.slice(start, start + 7));
    }
    return weeks;
  }

  public getDateCellId(monthIndex: number, dateMeta: DatePickerDateMeta): string {
    return `${this.resolvedInputId()}-cell-${monthIndex}-${dateMeta.year}-${dateMeta.month}-${dateMeta.day}`;
  }

  public isDateFocused(dateMeta: DatePickerDateMeta): boolean {
    const focusedDate: Date | null = this.focusedDate();
    if (!focusedDate) {
      return false;
    }

    const date: Date = createDate(dateMeta.year, dateMeta.month, dateMeta.day);
    return isDateEqual(focusedDate, date);
  }

  public getDateAriaLabel(dateMeta: DatePickerDateMeta): string {
    const monthName: string = this.locale().monthNames[dateMeta.month] ?? '';
    const baseLabel: string = `${monthName} ${dateMeta.day}, ${dateMeta.year}`;

    if (this.isRangeBetween(dateMeta)) {
      return `${baseLabel}, in selected range`;
    }

    return baseLabel;
  }

  public getDateCellClasses(dateMeta: DatePickerDateMeta): string {
    const classes: string[] = ['ui-lib-datepicker__day'];

    if (dateMeta.today) {
      classes.push('ui-lib-datepicker__day--today');
    }

    if (dateMeta.selected) {
      classes.push('ui-lib-datepicker__day--selected');
      if (this.isRangeStart(dateMeta)) {
        classes.push('ui-lib-datepicker__day--range-start');
      }
      if (this.isRangeEnd(dateMeta)) {
        classes.push('ui-lib-datepicker__day--range-end');
      }
    }

    if (this.isRangeBetween(dateMeta)) {
      classes.push('ui-lib-datepicker__day--range-between');
    }

    if (dateMeta.disabled) {
      classes.push('ui-lib-datepicker__day--disabled');
    }

    if (dateMeta.otherMonth) {
      classes.push('ui-lib-datepicker__day--other-month');
    }

    return classes.join(' ');
  }

  public getWeekNumber(week: DatePickerDateMeta[]): number {
    const weekStartMeta: DatePickerDateMeta | undefined = week[0];
    if (!weekStartMeta) {
      return 0;
    }

    const weekStartDate: Date = createDate(
      weekStartMeta.year,
      weekStartMeta.month,
      weekStartMeta.day
    );
    const utcDate: Date = new Date(
      Date.UTC(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate())
    );
    const dayNumber: number = utcDate.getUTCDay() || 7;
    utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNumber);
    const yearStart: Date = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));

    return Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  public onDateSelect(event: Event, dateMeta: DatePickerDateMeta): void {
    if (this.isDisabled() || dateMeta.disabled || !dateMeta.selectable) {
      return;
    }

    const rawSelectedDate: Date = createDate(dateMeta.year, dateMeta.month, dateMeta.day);
    const selectedDate: Date =
      this.showTime() || this.timeOnly()
        ? this.applyCurrentTimeToDate(rawSelectedDate)
        : rawSelectedDate;
    const selectionMode: DatePickerSelectionMode = this.selectionMode();

    if (selectionMode === 'single') {
      this.applySelectedDate(event, selectedDate, true);
      return;
    }

    if (selectionMode === 'multiple') {
      const currentValue: DatePickerValue = this.modelValue();
      const currentDates: Date[] = this.toDateArray(currentValue);
      const selectedIndex: number = currentDates.findIndex((date: Date): boolean =>
        isDateEqual(date, selectedDate)
      );
      const nextDates: Date[] =
        selectedIndex >= 0
          ? currentDates.filter((_: Date, index: number): boolean => index !== selectedIndex)
          : [...currentDates, selectedDate];

      this.modelValue.set(nextDates.length > 0 ? nextDates : null);
      this.focusedDate.set(selectedDate);
      this.hoveredDate.set(null);
      this.onModelChange(nextDates.length > 0 ? nextDates : null);
      this.onSelect.emit({
        originalEvent: event,
        value: nextDates.length > 0 ? nextDates : null,
      });
      return;
    }

    const currentValue: DatePickerValue = this.modelValue();
    const currentRange: Date[] = this.toDateArray(currentValue);
    if (currentRange.length === 0 || currentRange.length >= 2) {
      this.modelValue.set([selectedDate]);
      this.focusedDate.set(selectedDate);
      this.hoveredDate.set(null);
      this.onModelChange([selectedDate]);
      this.onSelect.emit({
        originalEvent: event,
        value: [selectedDate],
      });
      return;
    }

    const rangeStart: Date | undefined = currentRange[0];
    if (!rangeStart) {
      return;
    }
    const rangeEnd: Date = selectedDate;
    const normalizedRange: Date[] =
      rangeStart.getTime() <= rangeEnd.getTime() ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];

    this.modelValue.set(normalizedRange);
    this.focusedDate.set(selectedDate);
    this.hoveredDate.set(null);
    this.onModelChange(normalizedRange);
    this.onSelect.emit({
      originalEvent: event,
      value: normalizedRange,
    });

    if (!this.inline()) {
      this.hideOverlay();
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.overlayVisible() || this.inline()) {
      return;
    }

    const target: Node | null = event.target as Node | null;
    if (target && !this.hostElement.nativeElement.contains(target)) {
      this.hideOverlay();
    }
  }

  private syncNavigationFromValue(value: DatePickerValue): void {
    const normalizedValue: DatePickerValue = this.normalizeValueForMode(value);

    if (normalizedValue instanceof Date) {
      this.currentMonth.set(normalizedValue.getMonth());
      this.currentYear.set(normalizedValue.getFullYear());
      this.focusedDate.set(
        createDate(
          normalizedValue.getFullYear(),
          normalizedValue.getMonth(),
          normalizedValue.getDate()
        )
      );
      this.currentDecadeStart.set(getDecadeBounds(normalizedValue.getFullYear())[0]);
      return;
    }

    if (Array.isArray(normalizedValue) && normalizedValue.length > 0) {
      const firstDate: Date | undefined = normalizedValue[0];
      if (!firstDate) {
        return;
      }
      this.currentMonth.set(firstDate.getMonth());
      this.currentYear.set(firstDate.getFullYear());
      this.focusedDate.set(
        createDate(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate())
      );
      this.currentDecadeStart.set(getDecadeBounds(firstDate.getFullYear())[0]);
    }
  }

  private syncTimeStateFromValue(value: DatePickerValue): void {
    const referenceDate: Date | null = this.getTimeReferenceDate(value);
    if (!referenceDate) {
      return;
    }

    this.syncTimeStateFromDate(referenceDate);
  }

  private normalizeWeekday(day: number): number {
    return ((Math.trunc(day) % 7) + 7) % 7;
  }

  private getReferenceDateForFocus(): Date {
    const value: DatePickerValue = this.modelValue();
    if (value instanceof Date) {
      return createDate(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (Array.isArray(value) && value.length > 0) {
      const firstDate: Date | undefined = value[0];
      if (firstDate) {
        return createDate(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
      }
    }

    return createDate(this.currentYear(), this.currentMonth(), 1);
  }

  private normalizeValueForMode(value: DatePickerValue): DatePickerValue {
    const mode: DatePickerSelectionMode = this.selectionMode();

    if (mode === 'single') {
      return value instanceof Date ? value : null;
    }

    if (mode === 'multiple') {
      if (!Array.isArray(value)) {
        return null;
      }

      const normalizedDates: Date[] = this.toDateArray(value);
      return normalizedDates.length > 0 ? normalizedDates : null;
    }

    if (!Array.isArray(value) || value.length === 0) {
      return null;
    }

    const rangeDates: Date[] = this.toDateArray(value).slice(0, 2);
    if (rangeDates.length === 0) {
      return null;
    }

    if (rangeDates.length === 1) {
      const [singleDate]: Date[] = rangeDates;
      return singleDate ? [singleDate] : null;
    }

    const [firstDate, secondDate]: Date[] = rangeDates;
    if (!firstDate || !secondDate) {
      return null;
    }

    return firstDate.getTime() <= secondDate.getTime()
      ? [firstDate, secondDate]
      : [secondDate, firstDate];
  }

  private formatDisplayValue(date: Date, includeTime: boolean, timeOnly: boolean): string {
    if (timeOnly) {
      return this.formatTime(date);
    }

    const datePortion: string = formatDate(date, this.dateFormat(), this.locale());
    return includeTime ? `${datePortion} ${this.formatTime(date)}` : datePortion;
  }

  private formatTime(date: Date): string {
    const minuteText: string = this.padTwoDigits(date.getMinutes());
    const secondText: string = this.padTwoDigits(date.getSeconds());

    if (this.hourFormat() === '24') {
      const hourText24: string = this.padTwoDigits(date.getHours());
      return this.showSeconds()
        ? `${hourText24}:${minuteText}:${secondText}`
        : `${hourText24}:${minuteText}`;
    }

    const hour12: number = date.getHours() % 12 || 12;
    const meridiem: string = date.getHours() >= 12 ? this.locale().pm : this.locale().am;
    const hourText12: string = this.padTwoDigits(hour12);
    const baseTime: string = this.showSeconds()
      ? `${hourText12}:${minuteText}:${secondText}`
      : `${hourText12}:${minuteText}`;
    return `${baseTime} ${meridiem}`;
  }

  private applyCurrentTimeToDate(date: Date): Date {
    const nextDate: Date = createDate(date.getFullYear(), date.getMonth(), date.getDate());
    nextDate.setHours(this.currentHour(), this.currentMinute(), this.currentSecond(), 0);
    return nextDate;
  }

  private syncTimeStateFromDate(date: Date): void {
    this.currentHour.set(date.getHours());
    this.currentMinute.set(date.getMinutes());
    this.currentSecond.set(date.getSeconds());
    this.currentAmPm.set(date.getHours() >= 12 ? 'PM' : 'AM');
    this.hourInputDraft.set(null);
    this.minuteInputDraft.set(null);
    this.secondInputDraft.set(null);
  }

  private applyTimeToModelValue(): void {
    const nextValue: DatePickerValue = this.withAppliedTime(this.modelValue());
    this.modelValue.set(nextValue);
    this.onModelChange(nextValue);
    this.syncNavigationFromValue(nextValue);
  }

  private withAppliedTime(value: DatePickerValue): DatePickerValue {
    const mode: DatePickerSelectionMode = this.selectionMode();
    const now: Date = new Date();
    const fallbackDate: Date = createDate(now.getFullYear(), now.getMonth(), now.getDate());

    if (mode === 'single') {
      const baseDate: Date = value instanceof Date ? value : fallbackDate;
      return this.applyCurrentTimeToDate(baseDate);
    }

    if (!Array.isArray(value) || value.length === 0) {
      return [this.applyCurrentTimeToDate(fallbackDate)];
    }

    const dateValues: Date[] = this.toDateArray(value);
    if (dateValues.length === 0) {
      return [this.applyCurrentTimeToDate(fallbackDate)];
    }

    if (mode === 'multiple') {
      const lastIndex: number = dateValues.length - 1;
      const nextDates: Date[] = [...dateValues];
      const lastDate: Date | undefined = nextDates[lastIndex];
      if (!lastDate) {
        return [this.applyCurrentTimeToDate(fallbackDate)];
      }
      nextDates[lastIndex] = this.applyCurrentTimeToDate(lastDate);
      return nextDates;
    }

    if (dateValues.length === 1) {
      const [startDate]: Date[] = dateValues;
      return startDate
        ? [this.applyCurrentTimeToDate(startDate)]
        : [this.applyCurrentTimeToDate(fallbackDate)];
    }

    const startDate: Date | undefined = dateValues[0];
    const endDate: Date | undefined = dateValues[1];
    if (!startDate || !endDate) {
      return [this.applyCurrentTimeToDate(fallbackDate)];
    }

    return [startDate, this.applyCurrentTimeToDate(endDate)];
  }

  private getTimeReferenceDate(value: DatePickerValue): Date | null {
    if (value instanceof Date) {
      return value;
    }

    if (!Array.isArray(value) || value.length === 0) {
      return null;
    }

    for (let index: number = value.length - 1; index >= 0; index -= 1) {
      const candidate: Date | undefined = value[index];
      if (candidate) {
        return candidate;
      }
    }

    return null;
  }

  private adjustTimeUnit(unit: 'hour' | 'minute' | 'second', direction: -1 | 1): void {
    if (unit === 'hour') {
      if (direction > 0) {
        this.incrementHour();
      } else {
        this.decrementHour();
      }
      return;
    }

    if (unit === 'minute') {
      if (direction > 0) {
        this.incrementMinute();
      } else {
        this.decrementMinute();
      }
      return;
    }

    if (direction > 0) {
      this.incrementSecond();
    } else {
      this.decrementSecond();
    }
  }

  private commitTimeInputDraft(unit: 'hour' | 'minute' | 'second'): void {
    const draft: string = this.getTimeInputDraft(unit);
    const parsedValue: number = Number.parseInt(draft, 10);

    if (!Number.isFinite(parsedValue)) {
      this.clearTimeInputDraft(unit);
      return;
    }

    if (unit === 'hour') {
      if (this.hourFormat() === '24') {
        const clampedHour: number = this.clampValue(parsedValue, 0, 23);
        this.currentHour.set(clampedHour);
        this.currentAmPm.set(clampedHour >= 12 ? 'PM' : 'AM');
      } else {
        const clampedDisplayHour: number = this.clampValue(parsedValue, 1, 12);
        const isPm: boolean = this.currentAmPm() === 'PM';
        const normalizedHour: number = clampedDisplayHour % 12;
        const hour24: number = isPm ? normalizedHour + 12 : normalizedHour;
        this.currentHour.set(hour24);
      }
      this.hourInputDraft.set(null);
      return;
    }

    if (unit === 'minute') {
      this.currentMinute.set(this.clampValue(parsedValue, 0, 59));
      this.minuteInputDraft.set(null);
      return;
    }

    this.currentSecond.set(this.clampValue(parsedValue, 0, 59));
    this.secondInputDraft.set(null);
  }

  private getTimeInputDraft(unit: 'hour' | 'minute' | 'second'): string {
    if (unit === 'hour') {
      return this.hourInputDraft() ?? '';
    }

    if (unit === 'minute') {
      return this.minuteInputDraft() ?? '';
    }

    return this.secondInputDraft() ?? '';
  }

  private clearTimeInputDraft(unit: 'hour' | 'minute' | 'second'): void {
    if (unit === 'hour') {
      this.hourInputDraft.set(null);
      return;
    }

    if (unit === 'minute') {
      this.minuteInputDraft.set(null);
      return;
    }

    this.secondInputDraft.set(null);
  }

  private padTwoDigits(value: number): string {
    return `${Math.trunc(value)}`.padStart(2, '0');
  }

  private clampValue(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, Math.trunc(value)));
  }

  private wrapValue(value: number, modulo: number): number {
    return ((Math.trunc(value) % modulo) + modulo) % modulo;
  }

  private getPositiveStep(step: number): number {
    const normalizedStep: number = Math.trunc(step);
    return normalizedStep > 0 ? normalizedStep : 1;
  }

  private toDateArray(value: DatePickerValue | unknown): Date[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return (value as unknown[]).filter(
      (dateValue: unknown): dateValue is Date => dateValue instanceof Date
    );
  }

  private canDatePassMinMax(date: Date): boolean {
    const minDate: Date | null = this.minDate();
    const maxDate: Date | null = this.maxDate();

    if (minDate !== null) {
      const normalizedMinDate: Date = createDate(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate()
      );
      if (date.getTime() < normalizedMinDate.getTime()) {
        return false;
      }
    }

    if (maxDate !== null) {
      const normalizedMaxDate: Date = createDate(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate()
      );
      if (date.getTime() > normalizedMaxDate.getTime()) {
        return false;
      }
    }

    return true;
  }

  private applySelectedDate(event: Event, selectedDate: Date, closeOverlay: boolean): void {
    this.modelValue.set(selectedDate);
    this.focusedDate.set(selectedDate);
    this.hoveredDate.set(null);
    this.syncNavigationFromValue(selectedDate);
    this.onModelChange(selectedDate);
    this.onSelect.emit({
      originalEvent: event,
      value: selectedDate,
    });

    if (!this.inline() && closeOverlay) {
      this.hideOverlay();
    }
  }

  private canDisplayMonthRange(startMonthDate: Date): boolean {
    const rangeStart: Date = createDate(startMonthDate.getFullYear(), startMonthDate.getMonth(), 1);
    const visibleMonthCount: number = Math.max(1, this.numberOfMonths());
    const rangeEndMonthStart: Date = addMonths(rangeStart, visibleMonthCount - 1);
    const rangeEnd: Date = createDate(
      rangeEndMonthStart.getFullYear(),
      rangeEndMonthStart.getMonth(),
      getDaysInMonth(rangeEndMonthStart.getMonth(), rangeEndMonthStart.getFullYear())
    );

    const minDate: Date | null = this.minDate();
    const maxDate: Date | null = this.maxDate();

    if (minDate !== null) {
      const minDay: Date = createDate(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (rangeEnd.getTime() < minDay.getTime()) {
        return false;
      }
    }

    if (maxDate !== null) {
      const maxDay: Date = createDate(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      if (rangeStart.getTime() > maxDay.getTime()) {
        return false;
      }
    }

    return true;
  }

  private moveFocusedDateByDays(dayDelta: number): void {
    const baseDate: Date = this.focusedDate() ?? this.getReferenceDateForFocus();
    const nextDate: Date = createDate(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate() + dayDelta
    );
    this.focusDate(nextDate, true);
  }

  private moveFocusedDateByMonths(monthDelta: number): void {
    const baseDate: Date = this.focusedDate() ?? this.getReferenceDateForFocus();
    const nextDate: Date = addMonths(baseDate, monthDelta);
    this.focusDate(nextDate, true);
  }

  private focusFirstDayOfCurrentMonth(): void {
    const nextDate: Date = createDate(this.currentYear(), this.currentMonth(), 1);
    this.focusDate(nextDate, false);
  }

  private focusLastDayOfCurrentMonth(): void {
    const lastDay: number = getDaysInMonth(this.currentMonth(), this.currentYear());
    const nextDate: Date = createDate(this.currentYear(), this.currentMonth(), lastDay);
    this.focusDate(nextDate, false);
  }

  private focusDate(date: Date, alignNavigation: boolean): void {
    this.focusedDate.set(createDate(date.getFullYear(), date.getMonth(), date.getDate()));
    if (alignNavigation) {
      this.ensureDateVisible(date);
    }
    queueMicrotask((): void => this.focusDateCell(date));
  }

  private ensureDateVisible(date: Date): void {
    const normalizedDate: Date = createDate(date.getFullYear(), date.getMonth(), date.getDate());
    const firstVisibleMonthStart: Date =
      this.visibleMonthStarts()[0] ?? createDate(this.currentYear(), this.currentMonth(), 1);
    const lastVisibleMonthStart: Date = addMonths(
      firstVisibleMonthStart,
      Math.max(1, this.numberOfMonths()) - 1
    );
    const lastVisibleMonthEnd: Date = createDate(
      lastVisibleMonthStart.getFullYear(),
      lastVisibleMonthStart.getMonth(),
      getDaysInMonth(lastVisibleMonthStart.getMonth(), lastVisibleMonthStart.getFullYear())
    );

    if (normalizedDate.getTime() < firstVisibleMonthStart.getTime()) {
      this.currentMonth.set(normalizedDate.getMonth());
      this.currentYear.set(normalizedDate.getFullYear());
      return;
    }

    if (normalizedDate.getTime() > lastVisibleMonthEnd.getTime()) {
      const adjustedStart: Date = addMonths(
        normalizedDate,
        -(Math.max(1, this.numberOfMonths()) - 1)
      );
      this.currentMonth.set(adjustedStart.getMonth());
      this.currentYear.set(adjustedStart.getFullYear());
    }
  }

  private focusDateCell(date: Date): void {
    const panel: HTMLDivElement | undefined = this.panelElement?.nativeElement;
    if (!panel) {
      return;
    }

    const key: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const dateElement: HTMLButtonElement | null = panel.querySelector<HTMLButtonElement>(
      `button[data-date-key='${key}']`
    );
    dateElement?.focus();
  }

  private focusMonthCell(index: number): void {
    this.focusedMonthIndex.set(index);
    queueMicrotask((): void => {
      const panel: HTMLDivElement | undefined = this.panelElement?.nativeElement;
      const cell: HTMLButtonElement | null =
        panel?.querySelector<HTMLButtonElement>(`button[data-month-index='${index}']`) ?? null;
      cell?.focus();
    });
  }

  private focusYearCell(index: number): void {
    this.focusedYearIndex.set(index);
    queueMicrotask((): void => {
      const panel: HTMLDivElement | undefined = this.panelElement?.nativeElement;
      const cell: HTMLButtonElement | null =
        panel?.querySelector<HTMLButtonElement>(`button[data-year-index='${index}']`) ?? null;
      cell?.focus();
    });
  }

  private isDateSelected(date: Date): boolean {
    const value: DatePickerValue = this.modelValue();
    const mode: DatePickerSelectionMode = this.selectionMode();
    if (mode === 'range') {
      if (!Array.isArray(value) || value.length === 0) {
        return false;
      }

      const startDate: Date | undefined = value[0];
      if (!startDate) {
        return false;
      }
      const endDate: Date | undefined = value[1];
      return isDateEqual(startDate, date) || (endDate ? isDateEqual(endDate, date) : false);
    }

    if (value instanceof Date) {
      return isDateEqual(value, date);
    }

    if (Array.isArray(value)) {
      return value.some((selectedDate: Date): boolean => isDateEqual(selectedDate, date));
    }

    return false;
  }

  private isRangeStart(dateMeta: DatePickerDateMeta): boolean {
    const value: DatePickerValue = this.modelValue();
    if (!Array.isArray(value) || value.length < 1 || !(value[0] instanceof Date)) {
      return false;
    }

    const date: Date = createDate(dateMeta.year, dateMeta.month, dateMeta.day);
    return isDateEqual(value[0], date);
  }

  private isRangeEnd(dateMeta: DatePickerDateMeta): boolean {
    const value: DatePickerValue = this.modelValue();
    if (!Array.isArray(value) || value.length < 2 || !(value[1] instanceof Date)) {
      return false;
    }

    const date: Date = createDate(dateMeta.year, dateMeta.month, dateMeta.day);
    return isDateEqual(value[1], date);
  }

  private isRangeBetween(dateMeta: DatePickerDateMeta): boolean {
    const value: DatePickerValue = this.modelValue();
    if (this.selectionMode() !== 'range' || !Array.isArray(value) || value.length === 0) {
      return false;
    }

    const rangeStart: Date | undefined = value[0] instanceof Date ? value[0] : undefined;
    const hoveredDate: Date | null = this.hoveredDate();
    const rangeEnd: Date | null =
      value[1] instanceof Date ? value[1] : hoveredDate instanceof Date ? hoveredDate : null;
    if (!rangeStart || !rangeEnd) {
      return false;
    }

    const date: Date = createDate(dateMeta.year, dateMeta.month, dateMeta.day);

    const start: Date = createDate(
      rangeStart.getFullYear(),
      rangeStart.getMonth(),
      rangeStart.getDate()
    );
    const end: Date = createDate(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate());
    const min: Date = start.getTime() <= end.getTime() ? start : end;
    const max: Date = start.getTime() <= end.getTime() ? end : start;

    if (isDateEqual(date, min) || isDateEqual(date, max)) {
      return false;
    }

    return isDateBetween(date, min, max);
  }
}
