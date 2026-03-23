/** DatePicker selection mode. */
export type DatePickerSelectionMode = 'single' | 'multiple' | 'range';

/** DatePicker calendar view mode. */
export type DatePickerView = 'date' | 'month' | 'year';

/** DatePicker size options. */
export type DatePickerSize = 'sm' | 'md' | 'lg';

/** DatePicker popup mount target. */
export type DatePickerAppendTo = string | HTMLElement | undefined;

/** DatePicker change value type used by events and CVA. */
export type DatePickerValue = Date | Date[] | null;

/** DatePicker change event payload. */
export interface DatePickerChangeEvent {
  originalEvent: Event;
  value: DatePickerValue;
}

/** DatePicker month navigation event payload. */
export interface DatePickerMonthChangeEvent {
  month: number;
  year: number;
}

/** DatePicker year navigation event payload. */
export interface DatePickerYearChangeEvent {
  month: number;
  year: number;
}

/** Internal navigation state for panel view and visible period. */
export interface DatePickerNavigationState {
  view: DatePickerView;
  month: number;
  year: number;
}

/** Date metadata for each rendered calendar cell. */
export interface DatePickerDateMeta {
  day: number;
  month: number;
  year: number;
  today: boolean;
  selectable: boolean;
  selected: boolean;
  disabled: boolean;
  otherMonth: boolean;
}

/** Locale data consumed by date formatting, parsing, and labels. */
export interface DatePickerLocale {
  dayNames: string[];
  dayNamesShort: string[];
  dayNamesMin: string[];
  monthNames: string[];
  monthNamesShort: string[];
  firstDayOfWeek: number;
  today: string;
  clear: string;
  am: string;
  pm: string;
}
