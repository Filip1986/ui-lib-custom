# Date Picker

**Selector:** `ui-lib-date-picker`
**Entry point:** `import { DatePicker } from 'ui-lib-custom/date-picker'`

---

## Overview

**Selector:** `ui-lib-date-picker` **Package:** `ui-lib-custom/date-picker` **Content projection:** no — none

## API

### Inputs

| Name                | Type                      | Default                                  | Description |
| ------------------- | ------------------------- | ---------------------------------------- | ----------- |
| `appendTo`          | `DatePickerAppendTo`      | `DATE_PICKER_DEFAULTS.AppendTo`          | —           |
| `ariaLabel`         | `string | null`           | `null`                                   | —           |
| `ariaLabelledBy`    | `string | null`           | `null`                                   | —           |
| `dateFormat`        | `string`                  | `DATE_PICKER_DEFAULTS.DateFormat`        | —           |
| `disabled`          | `boolean`                 | `DATE_PICKER_DEFAULTS.Disabled`          | —           |
| `disabledDates`     | `Date[]`                  | `[]`                                     | —           |
| `disabledDays`      | `number[]`                | `[]`                                     | —           |
| `filled`            | `boolean`                 | `DATE_PICKER_DEFAULTS.Filled`            | —           |
| `firstDayOfWeek`    | `number`                  | `DATE_PICKER_DEFAULTS.FirstDayOfWeek`    | —           |
| `fluid`             | `boolean`                 | `false`                                  | —           |
| `hourFormat`        | `'12' | '24'`             | `'24'`                                   | —           |
| `iconDisplay`       | `'input' | 'button'`      | `'input'`                                | —           |
| `inline`            | `boolean`                 | `DATE_PICKER_DEFAULTS.Inline`            | —           |
| `inputId`           | `string`                  | `DATE_PICKER_DEFAULTS.InputId`           | —           |
| `invalid`           | `boolean`                 | `false`                                  | —           |
| `locale`            | `DatePickerLocale`        | `DEFAULT_LOCALE`                         | —           |
| `maxDate`           | `Date | null`             | `DATE_PICKER_DEFAULTS.MaxDate`           | —           |
| `minDate`           | `Date | null`             | `DATE_PICKER_DEFAULTS.MinDate`           | —           |
| `monthNavigator`    | `boolean`                 | `false`                                  | —           |
| `name`              | `string`                  | `DATE_PICKER_DEFAULTS.Name`              | —           |
| `numberOfMonths`    | `number`                  | `1`                                      | —           |
| `placeholder`       | `string`                  | `DATE_PICKER_DEFAULTS.Placeholder`       | —           |
| `selectionMode`     | `DatePickerSelectionMode` | `DATE_PICKER_DEFAULTS.SelectionMode`     | —           |
| `selectOtherMonths` | `boolean`                 | `DATE_PICKER_DEFAULTS.SelectOtherMonths` | —           |
| `showButtonBar`     | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowButtonBar`     | —           |
| `showClear`         | `boolean`                 | `false`                                  | —           |
| `showIcon`          | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowIcon`          | —           |
| `showOtherMonths`   | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowOtherMonths`   | —           |
| `showSeconds`       | `boolean`                 | `false`                                  | —           |
| `showTime`          | `boolean`                 | `false`                                  | —           |
| `showWeek`          | `boolean`                 | `DATE_PICKER_DEFAULTS.ShowWeek`          | —           |
| `size`              | `DatePickerSize`          | `DATE_PICKER_DEFAULTS.Size`              | —           |
| `stepHour`          | `number`                  | `1`                                      | —           |
| `stepMinute`        | `number`                  | `1`                                      | —           |
| `stepSecond`        | `number`                  | `1`                                      | —           |
| `tabindex`          | `number`                  | `DATE_PICKER_DEFAULTS.TabIndex`          | —           |
| `timeOnly`          | `boolean`                 | `false`                                  | —           |
| `variant`           | `ThemeVariant | null`     | `null`                                   | —           |
| `view`              | `DatePickerView`          | `DATE_PICKER_DEFAULTS.View`              | —           |
| `yearNavigator`     | `boolean`                 | `false`                                  | —           |
| `yearRange`         | `string`                  | `'1970:2030'`                            | —           |

### Outputs

| Name              | Type                        | Description |
| ----------------- | --------------------------- | ----------- |
| `clear`           | `void`                      | —           |
| `datePickerBlur`  | `FocusEvent`                | —           |
| `datePickerFocus` | `FocusEvent`                | —           |
| `hide`            | `void`                      | —           |
| `show`            | `void`                      | —           |
| `yearChange`      | `DatePickerYearChangeEvent` | —           |

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
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/date-picker/README.md)

