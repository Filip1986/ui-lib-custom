# Date Picker

**Selector:** `ui-lib-date-picker`
**Entry point:** `import { DatePicker } from 'ui-lib-custom/date-picker'`

---

## Overview

Full-featured date/time picker with calendar overlay, range selection, time support, and locale-aware formatting.

## API

### Inputs

| Name                | Type                      | Default                                  | Description                                                                                                                                                                                              |
| ------------------- | ------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appendTo`          | `DatePickerAppendTo`      | `DATE_PICKER_DEFAULTS.AppendTo`          | Determines where the calendar panel is appended. `'body'` teleports the panel to `document.body` (avoids overflow clipping); pass a CSS selector string to target a custom container. Default: `'body'`. |
| `ariaLabel`         | `string | null`           | `null`                                   | Accessible label for the date picker input. Overrides any label associated via `ariaLabelledBy`. Default: `null`.                                                                                        |
| `ariaLabelledBy`    | `string | null`           | `null`                                   | `id` of an external element that labels this date picker (sets `aria-labelledby`). Use instead of `ariaLabel` when a visible label element exists. Default: `null`.                                      |
| `dateFormat`        | `string`                  | `DATE_PICKER_DEFAULTS.DateFormat`        | Date format string used for both display and parsing (e.g. `'mm/dd/yy'`, `'dd.mm.yy'`). See README for full token reference. Default: `'mm/dd/yy'`.                                                      |
| `disabled`          | `boolean`                 | `DATE_PICKER_DEFAULTS.Disabled`          | When `true`, the date picker is disabled — the input is not focusable and the panel cannot be opened. Default: `false`.                                                                                  |
| `disabledDates`     | `Date[]`                  | `[]`                                     | Array of specific `Date` objects to disable. Each date in this array will be rendered as non-selectable. Default: `[]`.                                                                                  |
| `disabledDays`      | `number[]`                | `[]`                                     | Array of day-of-week indices (0 = Sunday … 6 = Saturday) to disable across all weeks. Default: `[]`.                                                                                                     |
| `filled`            | `boolean`                 | `DATE_PICKER_DEFAULTS.Filled`            | When `true`, the input renders in filled/surface style instead of the outlined default. Default: `false`.                                                                                                |
| `firstDayOfWeek`    | `number`                  | `DATE_PICKER_DEFAULTS.FirstDayOfWeek`    | Index of the first day of the week (0 = Sunday, 1 = Monday … 6 = Saturday). Overrides `locale.firstDayOfWeek`. Default: `0`.                                                                             |
| `fluid`             | `boolean`                 | `false`                                  | When `true`, the component stretches to fill its parent container width (`width: 100%`). Default: `false`.                                                                                               |
| `hourFormat`        | `'12' | '24'`             | `'24'`                                   | Time display format. `'12'` shows AM/PM; `'24'` uses 24-hour notation. Default: `'24'`.                                                                                                                  |
| `iconDisplay`       | `'input' | 'button'`      | `'input'`                                | Controls where the icon renders when `showIcon` is `true`. `'input'` overlays the icon inside the input field; `'button'` renders a standalone trigger button. Default: `'input'`.                       |
| `inline`            | `boolean`                 | `DATE_PICKER_DEFAULTS.Inline`            | When `true`, the calendar is always visible inline instead of opening as an overlay panel. Default: `false`.                                                                                             |
| `inputId`           | `string`                  | `DATE_PICKER_DEFAULTS.InputId`           | `id` attribute for the underlying `<input>` element. Useful for associating an external `<label>`. Default: auto-generated.                                                                              |
| `invalid`           | `boolean`                 | `false`                                  | When `true`, the input renders in its error/invalid state (red border). Use in tandem with Angular form validation. Default: `false`.                                                                    |
| `locale`            | `DatePickerLocale`        | `DEFAULT_LOCALE`                         | Locale object for day/month names, AM/PM labels, and first day of week. Partial overrides are supported — only override what differs from the built-in English locale.                                   |
| `maxDate`           | `Date | null`             | `DATE_PICKER_DEFAULTS.MaxDate`           | Latest selectable date (inclusive). Dates after this are rendered as disabled. Default: `null` (no upper bound).                                                                                         |
| `minDate`           | `Date | null`             | `DATE_PICKER_DEFAULTS.MinDate`           | Earliest selectable date (inclusive). Dates before this are rendered as disabled. Default: `null` (no lower bound).                                                                                      |
| `monthNavigator`    | `boolean`                 | `false`                                  | When `true`, a month dropdown is rendered in the calendar header for quick month navigation. Default: `false`.                                                                                           |
| `name`              | `string`                  | `DATE_PICKER_DEFAULTS.Name`              | `name` attribute forwarded to the underlying `<input>` element for form submission. Default: matches `inputId`.                                                                                          |
| `numberOfMonths`    | `number`                  | `1`                                      | Number of calendar months displayed side by side. Useful for date-range selection across months. Default: `1`.                                                                                           |
| `placeholder`       | `string`                  | `DATE_PICKER_DEFAULTS.Placeholder`       | Placeholder text displayed in the text input when no date is selected. Default: `''`.                                                                                                                    |
| `selectionMode`     | `DatePickerSelectionMode` | `DATE_PICKER_DEFAULTS.SelectionMode`     | Selection mode. `'single'` selects one date; `'multiple'` selects several; `'range'` selects a start/end span. Default: `'single'`.                                                                      |
| `selectOtherMonths` | `boolean`                 | `DATE_PICKER_DEFAULTS.SelectOtherMonths` | When `true`, days from the previous/next month shown in the current month grid are selectable. Requires `showOtherMonths` to be `true`. Default: `false`.                                                |
| `showButtonBar`     | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowButtonBar`     | When `true`, Today and Clear action buttons are displayed in the calendar footer. Default: `false`.                                                                                                      |
| `showClear`         | `boolean`                 | `false`                                  | When `true`, a clear (×) button appears when a date is selected, allowing the user to reset the value. Default: `false`.                                                                                 |
| `showIcon`          | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowIcon`          | When `true`, a calendar icon is rendered next to the input. Use `iconDisplay` to control whether it appears inside the input or as a separate toggle button. Default: `false`.                           |
| `showOtherMonths`   | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowOtherMonths`   | When `true`, days from adjacent months are shown in the calendar grid to fill the 6-week layout. Set to `false` for a compact calendar. Default: `true`.                                                 |
| `showSeconds`       | `boolean`                 | `false`                                  | When `true`, a seconds field is shown in the time picker. Default: `false`.                                                                                                                              |
| `showTime`          | `boolean`                 | `false`                                  | When `true`, a time picker (hour/minute, optionally seconds) is appended below the calendar grid. Default: `false`.                                                                                      |
| `showWeek`          | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowWeek`          | When `true`, ISO week numbers are shown in a leading column of the calendar grid. Default: `false`.                                                                                                      |
| `size`              | `DatePickerSize`          | `DATE_PICKER_DEFAULTS.Size`              | Size of the input field and calendar cells. `'sm'` | `'md'` | `'lg'`. Default: `'md'`.                                                                                                                   |
| `stepHour`          | `number`                  | `1`                                      | Step increment for the hour spinner (e.g. `2` allows only even hours). Default: `1`.                                                                                                                     |
| `stepMinute`        | `number`                  | `1`                                      | Step increment for the minute spinner (e.g. `15` allows only :00/:15/:30/:45). Default: `1`.                                                                                                             |
| `stepSecond`        | `number`                  | `1`                                      | Step increment for the seconds spinner. Default: `1`.                                                                                                                                                    |
| `tabindex`          | `number`                  | `DATE_PICKER_DEFAULTS.TabIndex`          | `tabindex` attribute forwarded to the underlying `<input>`. Set to `-1` to remove the input from the tab order. Default: `0`.                                                                            |
| `timeOnly`          | `boolean`                 | `false`                                  | When `true`, only the time picker is shown — the calendar grid is hidden. Use for time-only inputs. Default: `false`.                                                                                    |
| `variant`           | `ThemeVariant | null`     | `null`                                   | Visual variant override. Inherits from `ThemeConfigService` when `null`. Default: `null`.                                                                                                                |
| `view`              | `DatePickerView`          | `DATE_PICKER_DEFAULTS.View`              | The calendar view to open by default. `'date'` shows the day grid; `'month'` shows month selection; `'year'` shows year selection. Default: `'date'`.                                                    |
| `yearNavigator`     | `boolean`                 | `false`                                  | When `true`, a year dropdown is rendered in the calendar header for quick year navigation. Default: `false`.                                                                                             |
| `yearRange`         | `string`                  | `'1970:2030'`                            | Colon-separated year range available in the year navigator. Format: `'startYear:endYear'`. Default: `'1970:2030'`.                                                                                       |

### Outputs

| Name              | Type                         | Description                                                                                                                   |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `clear`           | `void`                       | Emitted when the selected value is cleared (via the clear button or the Today/Clear footer bar).                              |
| `datePickerBlur`  | `FocusEvent`                 | Emitted when the date picker input loses focus.                                                                               |
| `datePickerFocus` | `FocusEvent`                 | Emitted when the date picker input receives focus.                                                                            |
| `dateSelect`      | `DatePickerChangeEvent`      | Emitted when a date (or date range) is selected. Payload includes the selected value and its formatted string representation. |
| `hide`            | `void`                       | Emitted when the calendar overlay panel closes.                                                                               |
| `monthChange`     | `DatePickerMonthChangeEvent` | Emitted when the calendar navigates to a different month. Payload contains the new year and month indices.                    |
| `show`            | `void`                       | Emitted when the calendar overlay panel opens.                                                                                |
| `yearChange`      | `DatePickerYearChangeEvent`  | Emitted when the calendar navigates to a different year. Payload contains the new year value.                                 |

## Content Projection

| Selector                | Notes |
| ----------------------- | ----- |
| `[datePickerButtonBar]` | —     |

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                  |
| ----------------------------------------------------------------- |
| ArrowDown on input opens the calendar                             |
| ArrowRight moves day focus to the next day                        |
| Enter key selects the focused date                                |
| Escape on panel closes the calendar                               |
| Space key selects the focused date                                |
| applies variant, size, filled, and fluid classes                  |
| closes panel on Escape key                                        |
| day aria-label includes                                           |
| disabled date cells have aria-disabled=                           |
| does not open panel on input focus when disabled                  |
| each columnheader has an aria-label with the full day name        |
| each day button inside gridcell has an aria-label                 |
| each gridcell has aria-selected attribute                         |
| exposes expected ARIA roles and attributes                        |
| grid has an aria-label describing the current month               |
| handles other-month visibility and selectability                  |
| has a live region inside the panel for month change announcements |
| has aria-expanded=                                                |
| has aria-haspopup=                                                |
| has aria-modal=                                                   |
| has no aria-controls when panel is closed                         |
| has role=                                                         |
| moves focus to selected date when panel opens with a value        |
| next-month button aria-label includes a month name                |
| next-month button has an aria-label containing the word           |
| opens panel on input focus                                        |
| opens with a focused date cell (tabindex=0) visible               |
| passes axe in inline mode                                         |
| passes axe in popup mode (closed state)                           |
| passes axe in popup mode (open state)                             |
| passes axe with a selected date                                   |
| passes axe with disabled dates (min/max constraints)              |
| prev-month button aria-label includes a month name                |
| prev-month button has an aria-label containing the word           |
| selected date cell has aria-selected=                             |
| sets aria-controls to the panel id when open                      |
| supports day-cell keyboard navigation and selection               |
| the focused day button has tabindex=                              |

## Usage Examples

```html
<!-- minimal single-date picker -->
<ui-lib-date-picker [(ngModel)]="date" />

<!-- range selection with time -->
<ui-lib-date-picker
  selectionMode="range"
  [showTime]="true"
  [showButtonBar]="true"
  [(ngModel)]="dateRange"
  (select)="onRangeSelect($event)"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#date-picker)
- [Demo page](/components/date-picker)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/date-picker/README.md)

