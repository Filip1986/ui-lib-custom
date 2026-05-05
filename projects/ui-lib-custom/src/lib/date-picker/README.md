# DatePicker

**Selector:** `ui-lib-date-picker`
**Package:** `ui-lib-custom/date-picker`
**Content projection:** no — none

> Output names follow the PrimeNG `on*` convention (`onSelect`, `onShow`, etc.) which triggers an ESLint `no-output-on-prefix` suppression; be aware these must be listened to with `(onSelect)="..."` not `(select)="..."`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `selectionMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | How many dates can be selected |
| `dateFormat` | `string` | `'mm/dd/yy'` | Display format string |
| `locale` | `DatePickerLocale` | English | Locale object for month/day names |
| `inline` | `boolean` | `false` | Render the calendar inline (no popup) |
| `showIcon` | `boolean` | `false` | Show a calendar icon |
| `iconDisplay` | `'input' \| 'button'` | `'input'` | Whether the icon is inside the input or a separate button |
| `showClear` | `boolean` | `false` | Show a clear button |
| `placeholder` | `string` | `''` | Input placeholder |
| `inputId` | `string` | `''` | Custom id for the inner `<input>` |
| `name` | `string` | `''` | Native name attribute |
| `appendTo` | `string \| HTMLElement \| null` | `'body'` | Where to mount the popup panel |
| `minDate` | `Date \| null` | `null` | Minimum selectable date |
| `maxDate` | `Date \| null` | `null` | Maximum selectable date |
| `disabledDates` | `Date[]` | `[]` | Specific dates to disable |
| `disabledDays` | `number[]` | `[]` | Days-of-week (0=Sun) to disable |
| `selectOtherMonths` | `boolean` | `false` | Allow selecting days from adjacent months |
| `showOtherMonths` | `boolean` | `true` | Show days from adjacent months (greyed) |
| `view` | `'date' \| 'month' \| 'year'` | `'date'` | Initial calendar view |
| `numberOfMonths` | `number` | `1` | Number of month panels to display side-by-side |
| `yearRange` | `string` | `'1970:2030'` | Year range for the year picker |
| `yearNavigator` | `boolean` | `false` | Show a year-select dropdown in the header |
| `monthNavigator` | `boolean` | `false` | Show a month-select dropdown in the header |
| `showTime` | `boolean` | `false` | Show a time picker below the calendar |
| `timeOnly` | `boolean` | `false` | Show only the time picker (no calendar) |
| `hourFormat` | `'12' \| '24'` | `'24'` | Hour format for the time picker |
| `showSeconds` | `boolean` | `false` | Include seconds in the time picker |
| `stepHour` | `number` | `1` | Hour increment step |
| `stepMinute` | `number` | `1` | Minute increment step |
| `stepSecond` | `number` | `1` | Second increment step |
| `showButtonBar` | `boolean` | `false` | Show Today / Clear buttons at the bottom |
| `showWeek` | `boolean` | `false` | Show ISO week numbers |
| `firstDayOfWeek` | `number` | `0` | First day of the week (0=Sun, 1=Mon) |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to ThemeConfigService |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `filled` | `boolean` | `false` | Filled background appearance |
| `disabled` | `boolean` | `false` | Disable the component |
| `invalid` | `boolean` | `false` | Apply error styling |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `ariaLabel` | `string \| null` | `null` | ARIA label |
| `ariaLabelledBy` | `string \| null` | `null` | ARIA labelledby |
| `tabindex` | `number` | `0` | Tab index |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onSelect` | `DatePickerChangeEvent` | Fired when a date is selected |
| `onMonthChange` | `DatePickerMonthChangeEvent` | Fired when the visible month changes |
| `onYearChange` | `DatePickerYearChangeEvent` | Fired when the visible year changes |
| `onShow` | `void` | Panel opened |
| `onHide` | `void` | Panel closed |
| `onClear` | `void` | Clear button clicked |
| `onFocus` | `FocusEvent` | Input focused |
| `onBlur` | `FocusEvent` | Input blurred |

## Usage

```html
<!-- minimal single-date picker -->
<ui-lib-date-picker [(ngModel)]="date" />

<!-- range selection with time -->
<ui-lib-date-picker
  selectionMode="range"
  [showTime]="true"
  [showButtonBar]="true"
  [(ngModel)]="dateRange"
  (onSelect)="onRangeSelect($event)"
/>
```
