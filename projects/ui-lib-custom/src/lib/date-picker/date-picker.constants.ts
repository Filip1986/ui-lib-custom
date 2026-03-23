import type {
  DatePickerLocale,
  DatePickerSelectionMode,
  DatePickerSize,
  DatePickerView,
} from './date-picker.types';

export const DATE_PICKER_DEFAULTS: {
  readonly SelectionMode: DatePickerSelectionMode;
  readonly View: DatePickerView;
  readonly Size: DatePickerSize;
  readonly Variant: 'material';
  readonly Filled: boolean;
  readonly Inline: boolean;
  readonly Disabled: boolean;
  readonly ReadonlyInput: boolean;
  readonly ShowIcon: boolean;
  readonly ShowOtherMonths: boolean;
  readonly SelectOtherMonths: boolean;
  readonly ShowButtonBar: boolean;
  readonly ShowWeek: boolean;
  readonly KeepInvalid: boolean;
  readonly Placeholder: '';
  readonly DateFormat: 'mm/dd/yy';
  readonly YearRange: '1900:2100';
  readonly FirstDayOfWeek: 0;
  readonly InputId: '';
  readonly Name: '';
  readonly Required: boolean;
  readonly TabIndex: 0;
  readonly AppendTo: 'body';
  readonly MinDate: null;
  readonly MaxDate: null;
  readonly DisabledDates: null;
  readonly DisabledDays: null;
} = {
  SelectionMode: 'single',
  View: 'date',
  Size: 'md',
  Variant: 'material',
  Filled: false,
  Inline: false,
  Disabled: false,
  ReadonlyInput: false,
  ShowIcon: false,
  ShowOtherMonths: true,
  SelectOtherMonths: false,
  ShowButtonBar: false,
  ShowWeek: false,
  KeepInvalid: false,
  Placeholder: '',
  DateFormat: 'mm/dd/yy',
  YearRange: '1900:2100',
  FirstDayOfWeek: 0,
  InputId: '',
  Name: '',
  Required: false,
  TabIndex: 0,
  AppendTo: 'body',
  MinDate: null,
  MaxDate: null,
  DisabledDates: null,
  DisabledDays: null,
} as const;

export const DATE_PICKER_CSS_CLASSES: {
  readonly Root: 'ui-lib-datepicker';
  readonly Input: 'ui-lib-datepicker__input';
  readonly Trigger: 'ui-lib-datepicker__trigger';
  readonly Panel: 'ui-lib-datepicker__panel';
  readonly Header: 'ui-lib-datepicker__header';
  readonly Title: 'ui-lib-datepicker__title';
  readonly PrevButton: 'ui-lib-datepicker__prev-button';
  readonly NextButton: 'ui-lib-datepicker__next-button';
  readonly Grid: 'ui-lib-datepicker__grid';
  readonly WeekHeader: 'ui-lib-datepicker__week-header';
  readonly DayCell: 'ui-lib-datepicker__day-cell';
  readonly DayButton: 'ui-lib-datepicker__day';
  readonly Footer: 'ui-lib-datepicker__footer';
  readonly TodayButton: 'ui-lib-datepicker__today-button';
  readonly ClearButton: 'ui-lib-datepicker__clear-button';
  readonly Open: 'ui-lib-datepicker--open';
  readonly Inline: 'ui-lib-datepicker--inline';
  readonly Disabled: 'ui-lib-datepicker--disabled';
  readonly Filled: 'ui-lib-datepicker--filled';
  readonly Invalid: 'ui-lib-datepicker--invalid';
  readonly Material: 'ui-lib-datepicker--material';
  readonly Bootstrap: 'ui-lib-datepicker--bootstrap';
  readonly Minimal: 'ui-lib-datepicker--minimal';
  readonly SizeSm: 'ui-lib-datepicker--size-sm';
  readonly SizeMd: 'ui-lib-datepicker--size-md';
  readonly SizeLg: 'ui-lib-datepicker--size-lg';
} = {
  Root: 'ui-lib-datepicker',
  Input: 'ui-lib-datepicker__input',
  Trigger: 'ui-lib-datepicker__trigger',
  Panel: 'ui-lib-datepicker__panel',
  Header: 'ui-lib-datepicker__header',
  Title: 'ui-lib-datepicker__title',
  PrevButton: 'ui-lib-datepicker__prev-button',
  NextButton: 'ui-lib-datepicker__next-button',
  Grid: 'ui-lib-datepicker__grid',
  WeekHeader: 'ui-lib-datepicker__week-header',
  DayCell: 'ui-lib-datepicker__day-cell',
  DayButton: 'ui-lib-datepicker__day',
  Footer: 'ui-lib-datepicker__footer',
  TodayButton: 'ui-lib-datepicker__today-button',
  ClearButton: 'ui-lib-datepicker__clear-button',
  Open: 'ui-lib-datepicker--open',
  Inline: 'ui-lib-datepicker--inline',
  Disabled: 'ui-lib-datepicker--disabled',
  Filled: 'ui-lib-datepicker--filled',
  Invalid: 'ui-lib-datepicker--invalid',
  Material: 'ui-lib-datepicker--material',
  Bootstrap: 'ui-lib-datepicker--bootstrap',
  Minimal: 'ui-lib-datepicker--minimal',
  SizeSm: 'ui-lib-datepicker--size-sm',
  SizeMd: 'ui-lib-datepicker--size-md',
  SizeLg: 'ui-lib-datepicker--size-lg',
} as const;

export const DATE_PICKER_FORMAT_TOKENS: {
  readonly DayNumeric: 'd';
  readonly DayNumericPadded: 'dd';
  readonly DayOfYearNumeric: 'o';
  readonly DayOfYearNumericPadded: 'oo';
  readonly DayNameShort: 'D';
  readonly DayNameLong: 'DD';
  readonly MonthNumeric: 'm';
  readonly MonthNumericPadded: 'mm';
  readonly MonthNameShort: 'M';
  readonly MonthNameLong: 'MM';
  readonly YearShort: 'y';
  readonly YearLong: 'yy';
  readonly UnixTimestampMs: '@';
  readonly DotNetTicks: '!';
  readonly LiteralQuote: "'";
  readonly YearRangeSeparator: ':';
  readonly DotNetTicksTo1970: 621355968000000000;
} = {
  DayNumeric: 'd',
  DayNumericPadded: 'dd',
  DayOfYearNumeric: 'o',
  DayOfYearNumericPadded: 'oo',
  DayNameShort: 'D',
  DayNameLong: 'DD',
  MonthNumeric: 'm',
  MonthNumericPadded: 'mm',
  MonthNameShort: 'M',
  MonthNameLong: 'MM',
  YearShort: 'y',
  YearLong: 'yy',
  UnixTimestampMs: '@',
  DotNetTicks: '!',
  LiteralQuote: "'",
  YearRangeSeparator: ':',
  DotNetTicksTo1970: 621355968000000000,
} as const;

export const DEFAULT_LOCALE: DatePickerLocale = {
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  firstDayOfWeek: 0,
  today: 'Today',
  clear: 'Clear',
  am: 'AM',
  pm: 'PM',
} as const;
