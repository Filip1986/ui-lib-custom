# DatePicker Component

## Overview

`DatePickerComponent` provides date and time selection with popup or inline rendering.
It supports `single`, `multiple`, and `range` selection modes, month/year picker views,
keyboard navigation, and Angular forms (`ControlValueAccessor`).

**Import**

```typescript
import { DatePickerComponent } from 'ui-lib-custom/date-picker';
```

**Selector:** `ui-lib-date-picker`

**Location:** `projects/ui-lib-custom/src/lib/date-picker/date-picker.ts`

---

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `selectionMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection behavior and model shape. |
| `dateFormat` | `string` | `'mm/dd/yy'` | Date display/parse format tokens. |
| `locale` | `DatePickerLocale` | `DEFAULT_LOCALE` | Labels for day/month names and button text. |
| `inline` | `boolean` | `false` | Keeps panel always visible; hides text trigger input. |
| `showIcon` | `boolean` | `false` | Shows input icon/trigger affordance. |
| `iconDisplay` | `'input' \| 'button'` | `'input'` | Renders icon as passive glyph or trigger button. |
| `showClear` | `boolean` | `false` | Shows clear button in trigger input when value exists. |
| `placeholder` | `string` | `''` | Trigger input placeholder. |
| `inputId` | `string` | `''` | Input id used for label/control wiring. |
| `name` | `string` | `''` | Input/form name. |
| `minDate` | `Date \| null` | `null` | Lower selectable date bound. |
| `maxDate` | `Date \| null` | `null` | Upper selectable date bound. |
| `disabledDates` | `Date[]` | `[]` | Explicitly disabled date list. |
| `disabledDays` | `number[]` | `[]` | Disabled weekdays (`0=Sunday ... 6=Saturday`). |
| `showOtherMonths` | `boolean` | `true` | Shows filler days from adjacent months. |
| `selectOtherMonths` | `boolean` | `false` | Allows selecting adjacent-month filler days. |
| `view` | `'date' \| 'month' \| 'year'` | `'date'` | Initial/primary panel view. |
| `numberOfMonths` | `number` | `1` | Number of visible month panels in date view. |
| `yearRange` | `string` | `'1970:2030'` | Year navigator range (e.g. `"2000:2040"`). |
| `monthNavigator` | `boolean` | `false` | Replaces month label with select dropdown. |
| `yearNavigator` | `boolean` | `false` | Replaces year label with select dropdown. |
| `showTime` | `boolean` | `false` | Shows time controls below calendar grid. |
| `timeOnly` | `boolean` | `false` | Hides calendar and renders only time controls. |
| `hourFormat` | `'12' \| '24'` | `'24'` | Time display format. |
| `showSeconds` | `boolean` | `false` | Shows seconds spinner in time panel. |
| `stepHour` | `number` | `1` | Hour increment/decrement step. |
| `stepMinute` | `number` | `1` | Minute increment/decrement step. |
| `stepSecond` | `number` | `1` | Second increment/decrement step. |
| `showButtonBar` | `boolean` | `false` | Shows Today/Clear actions at panel bottom. |
| `showWeek` | `boolean` | `false` | Shows ISO-like week number column. |
| `firstDayOfWeek` | `number` | `0` | Start day index (`0=Sunday`). |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant override; falls back to theme variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger/input and calendar sizing. |
| `filled` | `boolean` | `false` | Filled trigger appearance. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `invalid` | `boolean` | `false` | Invalid state styling. |
| `fluid` | `boolean` | `false` | Expands host width to container. |
| `ariaLabel` | `string \| null` | `null` | Accessible name override. |
| `ariaLabelledBy` | `string \| null` | `null` | Accessible name linkage id. |
| `tabindex` | `number` | `0` | Trigger input tab order. |

---

## Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `onSelect` | `DatePickerChangeEvent` | Emitted on date/month/year selection changes. |
| `onMonthChange` | `DatePickerMonthChangeEvent` | Emitted after month navigation changes. |
| `onYearChange` | `DatePickerYearChangeEvent` | Emitted after year navigation changes. |
| `onShow` | `void` | Emitted when popup panel opens. |
| `onHide` | `void` | Emitted when popup panel closes. |
| `onClear` | `void` | Emitted when value is cleared. |
| `onFocus` | `FocusEvent` | Trigger input focus event. |
| `onBlur` | `FocusEvent` | Trigger input blur event. |

### Output Types

```typescript
export type DatePickerValue = Date | Date[] | null;

export interface DatePickerChangeEvent {
  originalEvent: Event;
  value: DatePickerValue;
}

export interface DatePickerMonthChangeEvent {
  month: number;
  year: number;
}

export interface DatePickerYearChangeEvent {
  month: number;
  year: number;
}
```

---

## Template Slots

| Slot | Selector | Description |
| --- | --- | --- |
| Button Bar | `[datePickerButtonBar]` | Custom projected content before default Today/Clear buttons. |

---

## CSS Variables (Selected)

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-datepicker-input-bg` | `var(--uilib-input-bg, var(--uilib-surface, #ffffff))` | Trigger input background. |
| `--uilib-datepicker-input-border-color` | `var(--uilib-input-border, var(--uilib-border, #d1d5db))` | Trigger input border color. |
| `--uilib-datepicker-input-border-color-focus` | `var(--uilib-input-border-focus, var(--uilib-color-primary-600, #1e88e5))` | Focus border color. |
| `--uilib-datepicker-panel-bg` | `var(--uilib-surface, #ffffff)` | Panel background. |
| `--uilib-datepicker-panel-border-color` | `var(--uilib-border, #d1d5db)` | Panel border color. |
| `--uilib-datepicker-panel-shadow` | `var(--uilib-shadow-lg, 0 12px 28px rgb(0 0 0 / 16%))` | Panel elevation. |
| `--uilib-datepicker-day-cell-size` | `2.25rem` | Day cell size. |
| `--uilib-datepicker-day-bg-selected` | `var(--uilib-color-primary-600, #1e88e5)` | Selected day background. |
| `--uilib-datepicker-day-bg-range-between` | `color-mix(...)` | Range middle background. |
| `--uilib-datepicker-time-input-width` | `2.5rem` | Time spinner input width. |
| `--uilib-datepicker-buttonbar-gap` | `var(--uilib-space-2, 0.5rem)` | Button bar spacing. |

For full list, see `projects/ui-lib-custom/src/lib/date-picker/date-picker.scss`.

---

## Usage Examples

### Basic

```html
<ui-lib-date-picker [(ngModel)]="selectedDate" />
```

### Multiple and Range

```html
<ui-lib-date-picker [(ngModel)]="multipleDates" selectionMode="multiple" />
<ui-lib-date-picker [(ngModel)]="dateRange" selectionMode="range" />
```

### Time

```html
<ui-lib-date-picker [(ngModel)]="meetingAt" [showTime]="true" hourFormat="24" />
<ui-lib-date-picker [(ngModel)]="alarmAt" [timeOnly]="true" hourFormat="12" />
```

### Reactive Forms

```html
<form [formGroup]="form">
  <ui-lib-date-picker formControlName="appointment" />
</form>
```

```typescript
form = new FormGroup({
  appointment: new FormControl<Date | null>(null),
});
```

---

## Date Format Tokens

| Token | Meaning | Example |
| --- | --- | --- |
| `d` / `dd` | Day of month | `3` / `03` |
| `o` / `oo` | Day of year | `7` / `007` |
| `D` / `DD` | Day name short/long | `Mon` / `Monday` |
| `m` / `mm` | Month number | `8` / `08` |
| `M` / `MM` | Month name short/long | `Aug` / `August` |
| `y` / `yy` | Year short/long | `26` / `2026` |
| `@` | Unix timestamp (ms) | `1773888000000` |
| `!` | .NET ticks | `638462592000000000` |
| `'...'` | Literal text | `'Date:' mm/dd/yy` |

---

## Keyboard Interaction

| Context | Key | Behavior |
| --- | --- | --- |
| Trigger input | `Enter`, `ArrowDown` | Open popup panel |
| Trigger input/panel | `Escape` | Close popup panel |
| Day grid | `Arrow` keys | Move focused day by 1/7 increments |
| Day grid | `PageUp` / `PageDown` | Navigate month |
| Day grid | `Shift+PageUp` / `Shift+PageDown` | Navigate year |
| Day grid | `Home` / `End` | Jump to first/last day of month |
| Day grid | `Enter`, `Space` | Select focused date |
| Month/Year grid | `Arrow` keys + `Home`/`End` | Move focused month/year cell |
| Month/Year grid | `Enter`, `Space` | Select focused month/year |
| Time spinner | `ArrowUp`, `ArrowDown` | Increase/decrease by configured step |

---

## Accessibility

- Trigger input uses `role="combobox"` with `aria-haspopup="dialog"`.
- Calendar panel uses `role="dialog"`; date table uses `role="grid"`.
- Day cells expose `role="gridcell"`, `aria-selected`, and `aria-disabled`.
- Range middle dates include `in selected range` wording in `aria-label`.
- Time controls expose grouped labels and `role="spinbutton"` metadata.

---

## Known Limitations / Deferred Features

- No timezone conversion layer; values use native `Date` semantics.
- No timezone/UTC formatting mode in built-in formatter.
- No built-in holiday provider or locale-service registry yet.
- Advanced panel positioning (`appendTo`, smart collision handling) is deferred.
- Custom templating for day/month/year cell content is not yet exposed.

