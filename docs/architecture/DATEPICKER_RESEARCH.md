# DatePicker Research (PrimeNG Deep-Dive + ui-lib-custom Gap Analysis)

## Scope and Evidence

This research is based on PrimeNG package artifacts from npm (not website docs), then mapped to current `ui-lib-custom` architecture and conventions.

- PrimeNG package inspected: `primeng@21.1.3`
- Artifact sources:
  - `tmp_primeng/extracted/package/types/primeng-datepicker.d.ts`
  - `tmp_primeng/extracted/package/types/primeng-types-datepicker.d.ts`
  - `tmp_primeng/extracted/package/fesm2022/primeng-datepicker.mjs`
- Internal library references reviewed:
  - `projects/ui-lib-custom/src/lib/dialog/`
  - `projects/ui-lib-custom/src/lib/select/`
  - `projects/ui-lib-custom/src/lib/autocomplete/`
  - `projects/ui-lib-custom/src/lib/color-picker/`
  - `projects/ui-lib-custom/src/lib/input/`
  - `projects/ui-lib-custom/src/lib/core/`
  - `projects/ui-lib-custom/src/lib/a11y/live-announcer.service.ts`

## PrimeNG DatePicker API Surface (Observed)

PrimeNG DatePicker is broad and includes:

- Modes:
  - `selectionMode: 'single' | 'multiple' | 'range'`
  - `inline`, popup overlay, `touchUI` modal mode
  - `view: 'date' | 'month' | 'year'`
  - `numberOfMonths` + `responsiveOptions`
- Time support:
  - `showTime`, `timeOnly`, `showSeconds`, `hourFormat`, `stepHour|Minute|Second`
- Constraints:
  - `minDate`, `maxDate`, `disabledDates`, `disabledDays`, `maxDateCount`
- Input/formatting:
  - `dateFormat`, `shortYearCutoff`, `dataType` (`date` vs `string`), separators
  - keyboard/manual typing parse path (`parseValueFromString`, `parseDateTime`, `parseDate`, `parseTime`)
- Overlay and interaction:
  - `appendTo`, z-index controls, outside click close, resize/scroll listeners, focus trap
- Templates and slots:
  - date, disabledDate, decade, header, footer, input icon, trigger/prev/next/clear/increment/decrement icons, button bar
- Events:
  - focus/blur/show/close/select/clear/input/today/clearClick/monthChange/yearChange/clickOutside
- Locale:
  - locale-based day/month names, first day of week, strings (`today`, `clear`, `weekHeader`, etc.)

Implementation details confirmed in `primeng-datepicker.mjs` include:

- Calendar grid construction (`createMonths`, `createMonth`, `getWeekNumber`)
- Selectability rules (`isSelectable`, `isDateDisabled`, `isDayDisabled`)
- Full keyboard matrix (`onDateCellKeydown`, month/year cell keydown)
- Custom date parse/format engine (`formatDate`, `parseDate`, `daylightSavingAdjust`)
- Overlay lifecycle (`showOverlay`, `hideOverlay`, click-outside, scroll/resize handling)

## Feature Inventory and Gap Analysis

Legend:

- Status today:
  - `Exists` = implemented in current library infrastructure
  - `Partial` = reusable building blocks exist, DatePicker feature itself does not
  - `Missing` = no implementation support yet
- Priority:
  - `P0` = must ship in DatePicker v1
  - `P1` = nice-to-have for v1
  - `P2` = defer

| Capability | PrimeNG Evidence | ui-lib-custom Today | Priority | Gap / Notes |
|---|---|---|---|---|
| Single-date selection | `selectionMode='single'` | Missing | P0 | Core DatePicker behavior; no existing date component. |
| Popup panel + inline mode | `inline`, overlay lifecycle | Partial | P0 | Reuse popup/inline split from `color-picker`; add DatePicker-specific overlay state. |
| CVA + forms integration | DatePicker extends `BaseInput`, write/control methods | Partial | P0 | Reuse CVA patterns from `select`, `autocomplete`, `color-picker`, `input`. |
| Month navigation (prev/next) | `navBackward`, `navForward` | Missing | P0 | New calendar navigation state/utilities needed. |
| Calendar month grid generation | `createMonth`, `createMonths` | Missing | P0 | New date-grid utility module required. |
| Min/max date constraints | `minDate`, `maxDate`, `isSelectable` | Missing | P0 | Add robust comparators at day-level (local time-safe). |
| Disabled dates / disabled weekdays | `disabledDates`, `disabledDays` | Missing | P0 | Add utility-driven checks in grid metadata generation. |
| Keyboard day-grid navigation | `onDateCellKeydown` (arrows, PgUp/PgDn, Home/End, Enter, Esc) | Partial | P0 | Existing keyboard constants cover arrows/Home/End/Escape; add PageUp/PageDown and date-grid focus logic. |
| ARIA combobox + dialog/grid semantics | Template uses combobox + dialog relations | Partial | P0 | Reuse host ARIA patterns from `select`/`autocomplete`; add full grid roles/states. |
| Live date announcement | Hidden live artifacts + interaction model | Partial | P0 | Reuse `LiveAnnouncerService` for focused-date narration. |
| Click-outside close | `bindDocumentClickListener`, `isOutsideClicked` | Exists | P0 | Reuse HostListener/doc-click pattern from `select`, `autocomplete`, `color-picker`. |
| Escape-close + focus return | keyboard handlers and `hideOverlay` | Exists | P0 | Reuse from `dialog` and `color-picker`. |
| Theme variants + size + filled | PrimeNG has variant/size analogs | Partial | P0 | Must follow library conventions: `variant` union + sizes `sm/md/lg` + `filled: boolean`. |
| Month/year quick view switching | `view: date|month|year`, view switch methods | Missing | P1 | Useful for parity; can ship after stable day view. |
| Range selection | `selectionMode='range'` | Missing | P1 | Requires range hover/preview/endpoint logic and ARIA updates. |
| Multiple date selection | `selectionMode='multiple'` | Missing | P1 | Requires tokenized display and max count constraints. |
| Multi-month display | `numberOfMonths` + responsive options | Missing | P1 | Defer responsive slicing until base grid is stable. |
| Show week numbers | `showWeek`, `getWeekNumber` | Missing | P1 | Add optional week-number column and locale rules. |
| Manual text parse + custom date format | `parseDate`, `formatDate`, `dateFormat` | Missing | P1 | Build internal parser/formatter; avoid huge v1 locale surface. |
| Today/Clear button bar | `showButtonBar`, today/clear handlers | Missing | P1 | Straightforward after base model exists. |
| `appendTo` overlay portal | `appendTo` input | Partial | P1 | Existing components define `appendTo`; DatePicker may start with in-place overlay then extend. |
| Time picker (`showTime`, `timeOnly`, seconds, 12/24h) | Dedicated time methods (`constrainTime`, increment/decrement) | Missing | P2 | Significant complexity; separate internal module recommended. |
| TouchUI modal mask + body scroll lock | `touchUI`, mask lifecycle | Partial | P2 | Reuse `dialog` scroll lock + focus trap concepts if added later. |
| Full template slot parity | Many icon/date/header/footer templates | Partial | P2 | Start with minimal slots (day cell, footer actions), expand later. |
| PrimeNG pass-through (`pt`) API | `DatePickerPassThrough*` types | Missing | P2 | Not required for current library API strategy. |

## Reusable Infrastructure Assessment

## 1) Overlay/popup lifecycle

Best reusable patterns:

- `color-picker`:
  - popup + inline dual mode
  - click-outside close
  - Escape close + focus return
  - panel placement update on resize
- `select` / `autocomplete`:
  - combobox ARIA host conventions
  - panel open/close + active option management
  - document click close

Recommendation:

- Start DatePicker overlay with the `color-picker` interaction skeleton, then layer calendar-specific keyboard/focus behavior.

## 2) Focus management and trap

Reusable pieces:

- `core/a11y/focus-trap.ts` reusable class
- `dialog` activation/deactivation lifecycle and scroll-lock discipline

Recommendation:

- For popup DatePicker: do not hard-trap focus by default (combobox pattern usually allows tab out).
- For future modal/touch mode: reuse `FocusTrap` + dialog-like scroll lock.

## 3) CVA + model normalization

Reusable pieces:

- `select` and `autocomplete` CVA method structure
- `color-picker` signal + CVA synchronization

Recommendation:

- Use explicit model helpers for mode-safe value normalization:
  - `single` -> `Date | null`
  - `range` -> `[Date | null, Date | null]`
  - `multiple` -> `Date[]`

## 4) Keyboard handling foundations

Reusable pieces:

- `KEYBOARD_KEYS` constants in `core`
- option-list keyboard patterns in `select` / `autocomplete`

Gap:

- `PageUp` and `PageDown` are not in shared constants and will be needed for calendar parity.

## 5) A11y announcements

Reusable piece:

- `a11y/LiveAnnouncerService`

Recommendation:

- Announce focused date and selection changes in polite live region for screen-reader clarity.

## New Utility Modules Needed

Recommended new internal utility files under DatePicker component folder first (promote to `core` only if reused by 3+ components):

1. `date-picker-date-utils.ts`
- `startOfDayLocal(date: Date): Date`
- `isSameDay(a: Date, b: Date): boolean`
- `compareDay(a: Date, b: Date): -1 | 0 | 1`
- `addDays(date: Date, days: number): Date`
- `addMonths(date: Date, months: number): Date`
- `daysInMonth(year: number, monthIndex: number): number`

2. `date-picker-grid-utils.ts`
- calendar cell metadata generation (including out-of-month cells)
- first-day-of-week offset logic
- optional week number computation hook

3. `date-picker-format-utils.ts`
- initial formatter/parser scope for v1:
  - default format (ISO-like or locale-short)
  - strict parse for single mode
- define extension seam for future tokenized custom formats

4. `date-picker-locale.ts`
- lightweight locale structure (day names, month names, firstDayOfWeek, labels)
- default from browser locale + input overrides

## Architecture Recommendations

## Component and internal structure

Public component:

- `projects/ui-lib-custom/src/lib/date-picker/date-picker.ts`
- standalone, `OnPush`, `ViewEncapsulation.None`, signal API, CVA

Internal split (recommended):

- `date-picker.ts` (public API, CVA, high-level state)
- `date-picker-calendar-panel.ts` (internal calendar grid view and keyboard grid)
- `date-picker-date-utils.ts` / `date-picker-grid-utils.ts` / `date-picker-format-utils.ts`

Time picker decision:

- Keep time picking out of P0.
- If introduced later, implement as a separate internal unit (`date-picker-time-panel.ts`) so date-grid complexity stays isolated.

## State model (signals)

Recommended DatePicker state shape:

- `isOpen: signal<boolean>`
- `activeView: signal<'day' | 'month' | 'year'>`
- `displayMonth: signal<number>` (0-11)
- `displayYear: signal<number>`
- `focusedDate: signal<Date | null>` (roving focus target)
- `selectedValue` (mode-dependent normalized model)
- `hoveredDate` (for future range preview)
- `inputText` (formatted text mirror)

Derived signals:

- `visibleGrid: computed<CalendarWeek[]>`
- `canNavigatePrev/canNavigateNext`
- `ariaActiveDescendantId`
- `isDateDisabled(date)`
- `isDateSelected(date)`

## API shape recommendations (v1)

Align to library conventions (not PrimeNG naming where conflicting):

- `size: 'sm' | 'md' | 'lg'`
- `filled: boolean`
- `variant: 'material' | 'bootstrap' | 'minimal'`

Suggested P0 inputs:

- `modelValue` via CVA (`Date | null` in v1)
- `placeholder?: string`
- `disabled: boolean`
- `readonlyInput: boolean`
- `inline: boolean`
- `showIcon: boolean`
- `minDate?: Date | null`
- `maxDate?: Date | null`
- `disabledDates?: Date[]`
- `disabledDays?: number[]`
- `firstDayOfWeek?: number`
- `size`, `filled`, `variant`

Suggested P0 outputs:

- `onSelect`
- `onOpen`
- `onClose`
- `onClear`
- `onMonthChange`
- `onYearChange`

## CSS Variable Contract Proposal

Prefix: `--uilib-datepicker-*`

Foundational tokens:

- `--uilib-datepicker-bg`
- `--uilib-datepicker-color`
- `--uilib-datepicker-border-color`
- `--uilib-datepicker-border-radius`
- `--uilib-datepicker-shadow`
- `--uilib-datepicker-z-index`

Input/trigger:

- `--uilib-datepicker-input-bg`
- `--uilib-datepicker-input-color`
- `--uilib-datepicker-input-border-color`
- `--uilib-datepicker-input-padding-y`
- `--uilib-datepicker-input-padding-x`
- `--uilib-datepicker-icon-color`

Panel/header:

- `--uilib-datepicker-panel-bg`
- `--uilib-datepicker-panel-border-color`
- `--uilib-datepicker-header-bg`
- `--uilib-datepicker-header-color`
- `--uilib-datepicker-nav-button-size`

Day grid:

- `--uilib-datepicker-day-size`
- `--uilib-datepicker-day-radius`
- `--uilib-datepicker-day-color`
- `--uilib-datepicker-day-bg-hover`
- `--uilib-datepicker-day-bg-selected`
- `--uilib-datepicker-day-color-selected`
- `--uilib-datepicker-day-bg-today`
- `--uilib-datepicker-day-color-muted`
- `--uilib-datepicker-day-color-disabled`

State tokens:

- `--uilib-datepicker-focus-ring`
- `--uilib-datepicker-invalid-border-color`
- `--uilib-datepicker-filled-bg`

## Accessibility Plan (Required Behavior)

## Roles and relationships

Input trigger (popup mode):

- input role: `combobox`
- `aria-haspopup="dialog"`
- `aria-expanded` bound to panel open state
- `aria-controls` -> calendar panel id

Panel:

- role: `dialog` (or region if inline)
- labelled by month/year heading id

Calendar table:

- role: `grid`
- row: `row`
- day cell wrapper: `gridcell`
- selected day: `aria-selected="true"`
- disabled day: `aria-disabled="true"`
- today: expose via label or description

## Keyboard requirements (P0)

In day view:

- `ArrowLeft/Right`: previous/next day
- `ArrowUp/Down`: minus/plus 7 days
- `Home/End`: first/last day of current month row or month boundary (choose and document)
- `PageUp/PageDown`: previous/next month
- `Enter/Space`: select focused date
- `Escape`: close popup and restore focus to input
- `Tab/Shift+Tab`: natural tab order; no trap in standard popup mode

In input:

- `ArrowDown` or `Enter`: open panel
- `Escape`: close if open

## Live announcements

Use `LiveAnnouncerService` for:

- focused date changes during keyboard navigation
- selected date confirmation
- month/year navigation changes (e.g., "April 2026")

Politeness:

- use `polite` for routine navigation/selection
- reserve `assertive` for hard validation errors only

## Deferred Feature List (P2)

- Time picking (`showTime`, `timeOnly`, seconds, 12/24h)
- TouchUI modal mask mode
- PrimeNG-level pass-through/template breadth
- Responsive multi-month display rules
- Advanced free-form date format grammar compatibility
- Full parity of specialized icon template slots

## Recommended v1 Cut (Execution Summary)

Ship DatePicker v1 as a high-confidence single-date picker with strong accessibility and keyboard support:

- P0 deliverables:
  - single-date model + CVA
  - popup + inline modes
  - month navigation and day grid
  - min/max + disabled date/day constraints
  - core ARIA roles and keyboard grid navigation
  - live announcements and clear/open/close/select events
  - variant/size/filled integration with `--uilib-datepicker-*` tokens
- P1 staged after P0 stabilization:
  - range and multiple modes
  - month/year picker views
  - week numbers and button bar
  - richer parse/format options
- P2 deferred:
  - time/touchUI/full template parity

