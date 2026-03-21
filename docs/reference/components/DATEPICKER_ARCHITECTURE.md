# DatePicker Architecture

## Purpose and Scope

This document defines the planned architecture for `ui-lib-custom` DatePicker, including public API contracts, core utility responsibilities, CVA flow, keyboard/a11y behavior, and deferred scope.

Current status:

- API/type/constants/util foundations are defined in:
  - `projects/ui-lib-custom/src/lib/date-picker/date-picker.types.ts`
  - `projects/ui-lib-custom/src/lib/date-picker/date-picker.constants.ts`
  - `projects/ui-lib-custom/src/lib/date-picker/date-utils.ts`
  - `projects/ui-lib-custom/src/lib/date-picker/date-format.ts`
- Full component implementation (`date-picker.ts/.html/.scss`) is planned in the next phase.

## Public API (Planned)

## Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| `selectionMode` | `'single' | 'multiple' | 'range'` | `'single'` | v1 implementation starts with single selection; other modes are staged. |
| `view` | `'date' | 'month' | 'year'` | `'date'` | v1 focuses on day-grid. |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Library-standard size scale. |
| `variant` | `'material' | 'bootstrap' | 'minimal'` | `'material'` | Theme variant override. |
| `filled` | `boolean` | `false` | Matches library convention. |
| `inline` | `boolean` | `false` | Popup vs inline panel. |
| `disabled` | `boolean` | `false` | Disables input and interaction. |
| `readonlyInput` | `boolean` | `false` | Prevents free text typing while still allowing panel selection. |
| `showIcon` | `boolean` | `false` | Shows trigger icon/button. |
| `placeholder` | `string` | `''` | Input placeholder text. |
| `dateFormat` | `string` | `'mm/dd/yy'` | Uses `date-format.ts` grammar. |
| `firstDayOfWeek` | `number` | `0` | 0=Sunday ... 6=Saturday. |
| `showOtherMonths` | `boolean` | `true` | Controls rendering of out-of-month dates. |
| `selectOtherMonths` | `boolean` | `false` | Controls selectability of out-of-month dates. |
| `showWeek` | `boolean` | `false` | Optional week number column (deferred behavior details). |
| `showButtonBar` | `boolean` | `false` | Shows Today/Clear actions in footer. |
| `minDate` | `Date | null` | `null` | Lower bound. |
| `maxDate` | `Date | null` | `null` | Upper bound. |
| `disabledDates` | `Date[] | null` | `null` | Explicit disabled day list. |
| `disabledDays` | `number[] | null` | `null` | Disabled weekday indices. |
| `yearRange` | `string` | `'1900:2100'` | Parsed by `getYearRange()`. |
| `keepInvalid` | `boolean` | `false` | Keeps invalid typed text in input for manual correction flows. |
| `inputId` | `string` | `''` | Optional deterministic id. |
| `name` | `string` | `''` | Native form field name. |
| `required` | `boolean` | `false` | Native required semantics. |
| `tabIndex` | `number` | `0` | Focus order control. |
| `appendTo` | `'self' | 'body' | HTMLElement` | `'self'` | Overlay portal target (initially optional). |

## Outputs

| Output | Payload | Purpose |
|---|---|---|
| `onChange` | `DatePickerChangeEvent` | Emits value changes from user interaction. |
| `onSelect` | `DatePickerChangeEvent` | Emits when a date is explicitly selected. |
| `onOpen` | `void` | Panel became visible. |
| `onClose` | `void` | Panel closed. |
| `onClear` | `void` | Clear action invoked. |
| `onMonthChange` | `DatePickerMonthChangeEvent` | Month navigation changed current calendar month/year. |
| `onYearChange` | `DatePickerYearChangeEvent` | Year navigation changed current month/year context. |
| `onFocus` | `FocusEvent` | Input focus event forwarding. |
| `onBlur` | `FocusEvent` | Input blur event forwarding. |

## Template Slots (Planned)

| Slot | Context | Purpose | Priority |
|---|---|---|---|
| `date` | `{ $implicit: DatePickerDateMeta }` | Custom day cell rendering | P1 |
| `header` | none | Replace header area | P1 |
| `footer` | none | Custom footer content | P1 |
| `inputIcon` | `{ clickCallback: (event: Event) => void }` | Custom trigger icon | P1 |
| `buttonBar` | `{ todayCallback, clearCallback }` | Custom Today/Clear controls | P1 |

## CVA Integration Flow

1. `writeValue()` receives external model and normalizes by `selectionMode`.
2. Internal signal state updates selected value and navigation anchor date.
3. `updateInputText()` formats model using `formatDate()` and locale settings.
4. User selection/typing path emits:
   - `onModelChange(normalizedValue)` for forms
   - `onChange`/`onSelect` outputs for component events
5. `onModelTouched()` fires on blur/close pathways.

Normalization strategy:

- `single`: `Date | null`
- `multiple`: `Date[]`
- `range`: `[Date | null, Date | null]` (typed internally, emitted as `Date[]` shape in event value union)

## Internal State Model

Core signals:

- `panelVisible: signal<boolean>`
- `navigationState: signal<DatePickerNavigationState>`
- `focusedDate: signal<Date | null>`
- `selectedValue: signal<Date | Date[] | null>`
- `inputText: signal<string>`
- `localeState: signal<DatePickerLocale>`

Derived signals:

- `monthGrid: computed<DatePickerDateMeta[]>` from `getMonthDates()`
- `isDateDisabled(date)` via `isDateDisabled()`
- `isDateSelected(date)` mode-aware matcher
- `activeDescendantId` for roving grid focus

## Component Structure Diagram

```text
ui-lib-date-picker (host)
├─ input trigger region
│  ├─ text input (combobox)
│  └─ icon/button trigger (optional)
└─ panel (popup or inline)
   ├─ header
   │  ├─ prev navigation button
   │  ├─ month/year title (and optional view switch)
   │  └─ next navigation button
   ├─ calendar grid
   │  ├─ weekday header row
   │  └─ 6x7 day cells (DatePickerDateMeta)
   └─ footer (optional)
      ├─ today button
      └─ clear button
```

## Utility Responsibilities

- `date-utils.ts`
  - pure day/month/year operations
  - date comparison without DOM/framework coupling
  - month-grid and year-range generation
- `date-format.ts`
  - PrimeNG-compatible token formatting/parsing (`d`, `dd`, `o`, `oo`, `D`, `DD`, `m`, `mm`, `M`, `MM`, `y`, `yy`, `@`, `!`, quoted literals)
- `date-picker.constants.ts`
  - defaults, CSS classes, token map, default locale
- `date-picker.types.ts`
  - public and shared internal type contracts

## CSS Variable Contract

Proposed token namespace:

- `--uilib-datepicker-bg`
- `--uilib-datepicker-color`
- `--uilib-datepicker-border-color`
- `--uilib-datepicker-border-radius`
- `--uilib-datepicker-shadow`
- `--uilib-datepicker-z-index`
- `--uilib-datepicker-input-bg`
- `--uilib-datepicker-input-color`
- `--uilib-datepicker-input-border-color`
- `--uilib-datepicker-icon-color`
- `--uilib-datepicker-panel-bg`
- `--uilib-datepicker-panel-border-color`
- `--uilib-datepicker-header-bg`
- `--uilib-datepicker-header-color`
- `--uilib-datepicker-nav-button-size`
- `--uilib-datepicker-day-size`
- `--uilib-datepicker-day-radius`
- `--uilib-datepicker-day-color`
- `--uilib-datepicker-day-bg-hover`
- `--uilib-datepicker-day-bg-selected`
- `--uilib-datepicker-day-color-selected`
- `--uilib-datepicker-day-bg-today`
- `--uilib-datepicker-day-color-muted`
- `--uilib-datepicker-day-color-disabled`
- `--uilib-datepicker-focus-ring`
- `--uilib-datepicker-invalid-border-color`
- `--uilib-datepicker-filled-bg`

## Keyboard Interaction Table

| Context | Key | Behavior |
|---|---|---|
| Input | `Enter` / `ArrowDown` | Open panel and focus active date |
| Input | `Escape` | Close panel if open |
| Grid | `ArrowLeft` / `ArrowRight` | Move focus by day |
| Grid | `ArrowUp` / `ArrowDown` | Move focus by week |
| Grid | `Home` / `End` | Jump to month boundary target |
| Grid | `PageUp` / `PageDown` | Move to previous/next month, preserve day when possible |
| Grid | `Enter` / `Space` | Select focused date |
| Grid | `Escape` | Close panel and restore input focus |
| Popup | `Tab` / `Shift+Tab` | Follow normal tab order (no hard trap in standard popup mode) |

## Accessibility Model

- Input has `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`.
- Calendar container uses `role="dialog"` in popup mode.
- Grid semantics:
  - `role="grid"` + `row` + `gridcell`
  - `aria-selected` and `aria-disabled` on date elements
- Live announcements:
  - Focused date
  - Selected date
  - Month/year transitions
  - Implemented through `LiveAnnouncerService` with polite politeness for navigation updates.

## Deferred Features and Rationale

| Feature | Priority | Rationale |
|---|---|---|
| Time picker (`showTime`, `timeOnly`, seconds, 12/24h) | P2 | High complexity and increased interaction matrix; isolate after stable date grid. |
| Touch UI modal mode | P2 | Requires mask layering, scroll-lock/focus-trap integration and mobile UX tuning. |
| Full PrimeNG template parity | P2 | Keep initial API smaller and easier to stabilize. |
| Responsive multi-month panel | P2 | Adds layout + keyboard complexity; defer until core navigation hardening. |
| Advanced format tolerance modes | P2 | Strict parse/format parity is enough for initial ship; user-friendly heuristics can come later. |

## Implementation Notes for Next Phase

- Build the component with:
  - `standalone: true`
  - `ChangeDetectionStrategy.OnPush`
  - `ViewEncapsulation.None`
  - signal-based inputs/models
- Reuse existing overlay close patterns from `color-picker`, `select`, and `autocomplete`.
- Keep pure date operations inside utilities; component should orchestrate state and UI only.

