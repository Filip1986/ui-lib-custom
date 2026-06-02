# Internationalisation (i18n) Guide

`ui-lib-custom` ships every user-visible string — ARIA labels, placeholders, empty
states, status announcements — through a single signal-based service,
`UiLibI18nService`. Components never hard-code English; they resolve strings by key
at render time, so swapping the active bundle re-localises the whole library
reactively.

This guide covers how to localise the library, override individual strings, add
your own keys, and the complete catalogue of every key the library ships.

> **Package:** `ui-lib-custom/i18n` · **Service:** `UiLibI18nService` (root-provided)

---

## Quick start

The service is `providedIn: 'root'`, so there is nothing to register — just inject
it. It defaults to the built-in English bundle, with the active locale seeded from
Angular's `LOCALE_ID`.

```ts
import { Component, inject } from '@angular/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';

@Component({
  /* … */
})
export class MyComponent {
  private readonly i18n = inject(UiLibI18nService);

  protected readonly clearLabel = this.i18n.translate('select.clear'); // → "Clear selection"
}
```

`translate()` falls back to the key itself when no translation is found, so a
missing key renders a visible, debuggable string rather than throwing.

---

## Switching to a built-in locale

The library bundles four locales: **English (`UI_LIB_EN`)**, **German (`UI_LIB_DE`)**,
**French (`UI_LIB_FR`)**, and **Spanish (`UI_LIB_ES`)**. Call `setBundle()` once at
app startup (or whenever the user changes language):

```ts
import { inject } from '@angular/core';
import { UiLibI18nService, UI_LIB_FR } from 'ui-lib-custom/i18n';

inject(UiLibI18nService).setBundle(UI_LIB_FR, 'fr');
```

`setBundle()` merges the supplied bundle **over the English base**, so any key the
bundle omits still renders its English default rather than the raw key.

---

## Overriding individual keys

To tweak a handful of strings without replacing the whole bundle, use `extend()`.
It merges the given keys into the _currently active_ bundle:

```ts
inject(UiLibI18nService).extend({
  'select.clear': 'Reset',
  'autocomplete.empty': 'Nothing matched your search',
});
```

This is also how you register **your own custom keys** for use in app code:

```ts
const i18n = inject(UiLibI18nService);
i18n.extend({ 'myapp.welcome': 'Welcome, {name}' });
i18n.translate('myapp.welcome', { name: 'Ada' }); // → "Welcome, Ada"
```

---

## Placeholders & interpolation

Values may contain `{token}` placeholders, filled by the second argument to
`translate()`. Tokens with no matching parameter are left intact (so they're easy
to spot):

```ts
i18n.translate('autocomplete.results.count', { count: 5 }); // → "5 results available"
```

The [catalogue below](#key-catalogue) lists the exact placeholders each key
accepts. When you translate a key, **preserve every placeholder** — the parity
test (see below) fails the build if a locale drops or renames one.

---

## Right-to-left (RTL) locales

The service derives text direction from the active locale via the `dir` computed
signal (`'ltr' | 'rtl'`). Arabic, Hebrew, Persian, Urdu and related locale tags
resolve to `'rtl'` automatically:

```ts
const i18n = inject(UiLibI18nService);
i18n.setBundle(myArabicBundle, 'ar');
i18n.dir(); // → 'rtl'
```

Bind it to your document or a container to flip layout direction:

```ts
@Component({
  host: { '[attr.dir]': 'i18n.dir()' },
})
```

Because the library uses logical CSS properties throughout, components mirror
correctly once `dir` is applied — no per-component RTL overrides needed.

---

## Reacting to locale changes

`locale`, `bundle`, and `dir` are all signals, so anything derived from
`translate()` inside a `computed()` re-evaluates automatically when you call
`setBundle()`:

```ts
protected readonly heading = computed(() => this.i18n.translate('galleria.label'));
```

You can also read or set the active locale tag directly: `i18n.locale()` /
`i18n.locale.set('de')`. (Setting `locale` alone changes `dir` and the reported
tag but does **not** swap translations — use `setBundle()` for that.)

---

## Type safety

`UiLibTranslationKey` is a union of every built-in key, derived directly from
`UI_LIB_EN`. `translate()` autocompletes and type-checks known keys while still
accepting any string for custom keys you registered via `extend()`:

```ts
i18n.translate('select.clear'); // ✓ autocompleted
i18n.translate('myapp.welcome'); // ✓ accepted (custom key)
```

The built-in locale bundles are typed `UiLibTranslationBundle`
(`Record<UiLibTranslationKey, string>`), so **a key missing from any locale is a
compile error**. Consumer-supplied bundles use the looser `UiLibPartialBundle`,
which allows partial coverage plus arbitrary custom keys.

| Type                     | Meaning                                                 |
| ------------------------ | ------------------------------------------------------- |
| `UiLibTranslationKey`    | Union of all built-in keys (from `UI_LIB_EN`)           |
| `UiLibTranslationBundle` | Complete bundle — every key required (built-in locales) |
| `UiLibPartialBundle`     | Partial + custom keys allowed (consumer input)          |
| `UiLibLocale`            | BCP 47 locale tag string                                |
| `UiLibTranslateParams`   | `Record<string, string \| number>` for interpolation    |

---

## Keeping locales in sync

Two guards keep the bundles honest:

- **Compile time** — the `UiLibTranslationBundle` type makes a missing key in any
  built-in locale a build error.
- **Runtime** — [`i18n.bundles.spec.ts`](../../projects/ui-lib-custom/src/lib/i18n/i18n.bundles.spec.ts)
  asserts every locale has exactly the English key set, no empty values, and the
  same `{placeholder}` tokens per key.

The catalogue below is generated from `en.ts`. After adding or changing a key,
regenerate it (and `npm run docs:i18n:check` verifies it's current in CI):

```bash
npm run docs:i18n
```

---

## Key catalogue

<!-- AUTO-GENERATED:i18n-keys:start -->

> **324 keys** across 69 groups. Generated from `en.ts` —
> do not edit by hand. Run `npm run docs:i18n` after editing the bundle.

#### Global

| Key               | English default   | Placeholders |
| ----------------- | ----------------- | ------------ |
| `global.close`    | Close             | —            |
| `global.clear`    | Clear             | —            |
| `global.search`   | Search            | —            |
| `global.loading`  | Loading           | —            |
| `global.empty`    | No results found  | —            |
| `global.error`    | An error occurred | —            |
| `global.required` | Required          | —            |
| `global.optional` | Optional          | —            |

#### Select / Autocomplete / Listbox

| Key                         | English default        | Placeholders |
| --------------------------- | ---------------------- | ------------ |
| `select.placeholder`        | Select an option       | —            |
| `select.clear`              | Clear selection        | —            |
| `select.toggle`             | Toggle dropdown        | —            |
| `select.empty`              | No options available   | —            |
| `select.search.placeholder` | Search options         | —            |
| `select.search.aria`        | Search options         | —            |
| `select.selected.count`     | {count} items selected | `{count}`    |

#### AutoComplete

| Key                          | English default           | Placeholders |
| ---------------------------- | ------------------------- | ------------ |
| `autocomplete.chips-label`   | Selected items            | —            |
| `autocomplete.clear`         | Clear                     | —            |
| `autocomplete.suggestions`   | Suggestions               | —            |
| `autocomplete.empty`         | No results found          | —            |
| `autocomplete.results.one`   | 1 result available        | —            |
| `autocomplete.results.count` | {count} results available | `{count}`    |

#### CascadeSelect

| Key                             | English default     | Placeholders |
| ------------------------------- | ------------------- | ------------ |
| `cascade-select.placeholder`    | Select              | —            |
| `cascade-select.clear`          | Clear selection     | —            |
| `cascade-select.sublevel-label` | Options for {label} | `{label}`    |
| `cascade-select.loading`        | Loading...          | —            |

#### Listbox

| Key                          | English default               | Placeholders |
| ---------------------------- | ----------------------------- | ------------ |
| `listbox.select-all`         | Select all options            | —            |
| `listbox.label`              | List                          | —            |
| `listbox.empty`              | No items found.               | —            |
| `listbox.empty.filter`       | No results match your filter. | —            |
| `listbox.filter.placeholder` | Search...                     | —            |
| `listbox.filter.label`       | Filter options                | —            |

#### DatePicker

| Key                           | English default               | Placeholders |
| ----------------------------- | ----------------------------- | ------------ |
| `datepicker.toggle`           | Open calendar                 | —            |
| `datepicker.prev.month`       | Previous month                | —            |
| `datepicker.prev.month.label` | Previous month, {month}       | `{month}`    |
| `datepicker.next.month`       | Next month                    | —            |
| `datepicker.next.month.label` | Next month, {month}           | `{month}`    |
| `datepicker.prev.year`        | Previous year                 | —            |
| `datepicker.next.year`        | Next year                     | —            |
| `datepicker.prev.decade`      | Previous decade               | —            |
| `datepicker.next.decade`      | Next decade                   | —            |
| `datepicker.today`            | Today                         | —            |
| `datepicker.clear`            | Clear date                    | —            |
| `datepicker.month-picker`     | Month picker                  | —            |
| `datepicker.year-picker`      | Year picker                   | —            |
| `datepicker.time-panel`       | Time picker                   | —            |
| `datepicker.time.hour`        | Hour                          | —            |
| `datepicker.time.minute`      | Minute                        | —            |
| `datepicker.time.second`      | Second                        | —            |
| `datepicker.time.inc.hour`    | Increase hour                 | —            |
| `datepicker.time.dec.hour`    | Decrease hour                 | —            |
| `datepicker.time.inc.minute`  | Increase minute               | —            |
| `datepicker.time.dec.minute`  | Decrease minute               | —            |
| `datepicker.time.inc.second`  | Increase second               | —            |
| `datepicker.time.dec.second`  | Decrease second               | —            |
| `datepicker.day.today`        | today                         | —            |
| `datepicker.day.selected`     | selected                      | —            |
| `datepicker.day.range`        | in selected range             | —            |
| `datepicker.panel.label`      | Date picker                   | —            |
| `datepicker.ampm.toggle`      | Toggle AM/PM, current {value} | `{value}`    |

#### Dialog / Drawer / BottomSheet / Popover / ConfirmDialog / DynamicDialog

| Key                      | English default                   | Placeholders |
| ------------------------ | --------------------------------- | ------------ |
| `dialog.close`           | Close dialog                      | —            |
| `dialog.minimize`        | Minimize                          | —            |
| `dialog.maximize`        | Maximize                          | —            |
| `drawer.close`           | Close                             | —            |
| `drawer.label`           | Drawer                            | —            |
| `bottom-sheet.close`     | Close                             | —            |
| `popover.close`          | Close                             | —            |
| `popover.label`          | Popover                           | —            |
| `confirm-dialog.close`   | Close                             | —            |
| `confirm-dialog.accept`  | Yes                               | —            |
| `confirm-dialog.reject`  | No                                | —            |
| `confirm-dialog.header`  | Confirmation                      | —            |
| `confirm-dialog.message` | Are you sure you want to proceed? | —            |
| `dynamic-dialog.label`   | Dialog                            | —            |
| `dynamic-dialog.close`   | Close                             | —            |
| `message.close`          | Close message                     | —            |
| `panel.toggle`           | Toggle panel                      | —            |

#### Paginator

| Key                          | English default                       | Placeholders                    |
| ---------------------------- | ------------------------------------- | ------------------------------- |
| `paginator.first`            | First page                            | —                               |
| `paginator.prev`             | Previous page                         | —                               |
| `paginator.next`             | Next page                             | —                               |
| `paginator.last`             | Last page                             | —                               |
| `paginator.rows.label`       | Rows per page                         | —                               |
| `paginator.page.report`      | Page {currentPage} of {totalPages}    | `{currentPage}`, `{totalPages}` |
| `paginator.jump`             | Jump to page, press Enter to navigate | —                               |
| `paginator.jump.placeholder` | Page                                  | —                               |
| `paginator.nav`              | Pagination                            | —                               |

#### Upload

| Key                | English default                              | Placeholders |
| ------------------ | -------------------------------------------- | ------------ |
| `upload.drop.hint` | Drag and drop files here, or click to browse | —            |
| `upload.remove`    | Remove file                                  | —            |
| `upload.browse`    | Browse files                                 | —            |

#### Rating

| Key            | English default              | Placeholders       |
| -------------- | ---------------------------- | ------------------ |
| `rating.label` | Rating: {value} out of {max} | `{value}`, `{max}` |
| `rating.star`  | Star {n}                     | `{n}`              |

#### Table

| Key               | English default | Placeholders |
| ----------------- | --------------- | ------------ |
| `table.sort.asc`  | Sort ascending  | —            |
| `table.sort.desc` | Sort descending | —            |
| `table.sort.none` | No sort applied | —            |

#### Tree

| Key             | English default | Placeholders |
| --------------- | --------------- | ------------ |
| `tree.expand`   | Expand node     | —            |
| `tree.collapse` | Collapse node   | —            |

#### ColorPicker

| Key                       | English default                      | Placeholders |
| ------------------------- | ------------------------------------ | ------------ |
| `colorpicker.toggle`      | Open color picker                    | —            |
| `colorpicker.trigger`     | Color: {color}, click to open picker | `{color}`    |
| `colorpicker.panel`       | Color picker                         | —            |
| `colorpicker.hue`         | Hue slider                           | —            |
| `colorpicker.hex.input`   | Hex color value                      | —            |
| `colorpicker.red.input`   | Red channel                          | —            |
| `colorpicker.green.input` | Green channel                        | —            |
| `colorpicker.blue.input`  | Blue channel                         | —            |
| `colorpicker.alpha.input` | Alpha channel                        | —            |
| `colorpicker.label.hex`   | Hex                                  | —            |
| `colorpicker.label.h`     | H                                    | —            |
| `colorpicker.label.s`     | S                                    | —            |
| `colorpicker.label.b`     | B                                    | —            |

#### ProgressBar / ProgressSpinner

| Key                      | English default   | Placeholders |
| ------------------------ | ----------------- | ------------ |
| `progressbar.label`      | {value}% complete | `{value}`    |
| `progress-spinner.label` | Loading           | —            |

#### Tag

| Key                     | English default    | Placeholders |
| ----------------------- | ------------------ | ------------ |
| `tag.remove`            | Remove {value} tag | `{value}`    |
| `tag.remove-unlabelled` | Remove tag         | —            |

#### Checkbox

| Key                  | English default | Placeholders |
| -------------------- | --------------- | ------------ |
| `checkbox.label`     | Checkbox        | —            |
| `checkbox.checked`   | checked         | —            |
| `checkbox.unchecked` | unchecked       | —            |

#### ToggleSwitch

| Key                   | English default | Placeholders |
| --------------------- | --------------- | ------------ |
| `toggle-switch.label` | Toggle switch   | —            |
| `toggle-switch.on`    | on              | —            |
| `toggle-switch.off`   | off             | —            |

#### Carousel / Galleria

| Key                         | English default            | Placeholders           |
| --------------------------- | -------------------------- | ---------------------- |
| `carousel.prev`             | Previous slide             | —                      |
| `carousel.next`             | Next slide                 | —                      |
| `carousel.pause`            | Pause autoplay             | —                      |
| `carousel.play`             | Resume autoplay            | —                      |
| `carousel.indicator`        | Go to slide {n}            | `{n}`                  |
| `carousel.slide.status`     | Slide {current} of {total} | `{current}`, `{total}` |
| `carousel.region`           | Carousel                   | —                      |
| `carousel.indicators-label` | Slide indicators           | —                      |

#### OrderList / PickList

| Key                     | English default  | Placeholders |
| ----------------------- | ---------------- | ------------ |
| `orderlist.move.up`     | Move up          | —            |
| `orderlist.move.down`   | Move down        | —            |
| `orderlist.move.top`    | Move to top      | —            |
| `orderlist.move.bottom` | Move to bottom   | —            |
| `picklist.add`          | Add to list      | —            |
| `picklist.remove`       | Remove from list | —            |
| `picklist.add.all`      | Add all          | —            |
| `picklist.remove.all`   | Remove all       | —            |

#### Toast

| Key             | English default    | Placeholders |
| --------------- | ------------------ | ------------ |
| `toast.region`  | Notifications      | —            |
| `toast.close`   | Close notification | —            |
| `toast.dismiss` | Close: {title}     | `{title}`    |

#### Badge

| Key                      | English default  | Placeholders |
| ------------------------ | ---------------- | ------------ |
| `badge.status-indicator` | Status indicator | —            |

#### Chip / AutoComplete

| Key                        | English default  | Placeholders |
| -------------------------- | ---------------- | ------------ |
| `chip.remove`              | Remove {label}   | `{label}`    |
| `chip.remove-unlabelled`   | Remove           | —            |
| `chip.image-alt`           | Chip             | —            |
| `autocomplete.dropdown`    | Show suggestions | —            |
| `autocomplete.remove-chip` | Remove {label}   | `{label}`    |

#### Paginator (dynamic)

| Key                      | English default           | Placeholders |
| ------------------------ | ------------------------- | ------------ |
| `paginator.empty`        | No pages available        | —            |
| `paginator.page.current` | Page {page}, current page | `{page}`     |
| `paginator.page.go`      | Go to page {page}         | `{page}`     |

#### DataView (dynamic)

| Key                 | English default   | Placeholders |
| ------------------- | ----------------- | ------------ |
| `data-view.go.page` | Go to page {page} | `{page}`     |

#### Meter Group (dynamic)

| Key                           | English default           | Placeholders                  |
| ----------------------------- | ------------------------- | ----------------------------- |
| `meter-group.segment.default` | Segment {index}           | `{index}`                     |
| `meter-group.segment`         | {label}: {value} of {max} | `{label}`, `{value}`, `{max}` |

#### Rating

| Key                    | English default                        | Placeholders           |
| ---------------------- | -------------------------------------- | ---------------------- |
| `rating.value`         | Rating: {current} out of {total} stars | `{current}`, `{total}` |
| `rating.star.singular` | {star} star out of {total}             | `{star}`, `{total}`    |
| `rating.star.plural`   | {star} stars out of {total}            | `{star}`, `{total}`    |

#### Tree Select (dynamic)

| Key                              | English default        | Placeholders |
| -------------------------------- | ---------------------- | ------------ |
| `tree-select.options`            | Select options         | —            |
| `tree-select.none-selected`      | No item selected       | —            |
| `tree-select.selected.one`       | {label} selected       | `{label}`    |
| `tree-select.selected.count`     | {count} items selected | `{count}`    |
| `tree-select.placeholder`        | Select a node...       | —            |
| `tree-select.filter.placeholder` | Search...              | —            |
| `tree-select.empty`              | No results found       | —            |

#### Table / TreeTable

| Key                             | English default   | Placeholders |
| ------------------------------- | ----------------- | ------------ |
| `table.expand-row`              | Row expansion     | —            |
| `table.select-all`              | Select all rows   | —            |
| `table.empty`                   | No records found. | —            |
| `table.filter.placeholder`      | Search...         | —            |
| `tree-table.label`              | Tree table        | —            |
| `tree-table.filter`             | Filter table      | —            |
| `tree-table.select-row`         | Select row        | —            |
| `tree-table.select-all`         | Select all rows   | —            |
| `tree-table.filter.placeholder` | Search...         | —            |

#### Tabs

| Key                | English default | Placeholders |
| ------------------ | --------------- | ------------ |
| `tabs.close`       | Close tab       | —            |
| `tabs.scroll.prev` | Previous tabs   | —            |
| `tabs.scroll.next` | Next tabs       | —            |

#### Menubar

| Key              | English default        | Placeholders |
| ---------------- | ---------------------- | ------------ |
| `menubar.toggle` | Toggle navigation menu | —            |
| `menubar.label`  | Navigation             | —            |

#### Menu / ContextMenu / TieredMenu / MegaMenu / PanelMenu / Breadcrumb

| Key                       | English default | Placeholders |
| ------------------------- | --------------- | ------------ |
| `breadcrumb.aria-label`   | Breadcrumb      | —            |
| `context-menu.aria-label` | Context Menu    | —            |
| `menu.aria-label`         | Menu            | —            |
| `tiered-menu.aria-label`  | Menu            | —            |
| `mega-menu.aria-label`    | Navigation      | —            |
| `mega-menu.submenu`       | {label} submenu | `{label}`    |
| `panel-menu.aria-label`   | Panel Menu      | —            |

#### Button / IconButton / SelectButton

| Key                   | English default      | Placeholders |
| --------------------- | -------------------- | ------------ |
| `button.loading`      | Loading              | —            |
| `button.icon-only`    | Button               | —            |
| `icon-button.loading` | Loading, please wait | —            |
| `select-button.label` | Select options       | —            |

#### OrderList

| Key                             | English default | Placeholders |
| ------------------------------- | --------------- | ------------ |
| `order-list.filter-placeholder` | Filter          | —            |

#### Input

| Key                     | English default                                       | Placeholders |
| ----------------------- | ----------------------------------------------------- | ------------ |
| `input.clear`           | Clear input                                           | —            |
| `input.password-toggle` | Toggle password visibility                            | —            |
| `input-mask.clear`      | Clear                                                 | —            |
| `input-mask.incomplete` | Please complete the required format.                  | —            |
| `input-mask.invalid`    | The entered value does not match the required format. | —            |

#### KeyFilter

| Key                        | English default                                           | Placeholders |
| -------------------------- | --------------------------------------------------------- | ------------ |
| `key-filter.paste-filter`  | Characters not matching the allowed pattern were removed. | —            |
| `password.clear`           | Clear password                                            | —            |
| `password.show`            | Show password                                             | —            |
| `password.hide`            | Hide password                                             | —            |
| `password.prompt`          | Enter a password                                          | —            |
| `password.weak`            | Weak                                                      | —            |
| `password.medium`          | Medium                                                    | —            |
| `password.strong`          | Strong                                                    | —            |
| `password.strength.none`   | Password strength: None                                   | —            |
| `password.strength.weak`   | Password strength: Weak                                   | —            |
| `password.strength.medium` | Password strength: Medium                                 | —            |
| `password.strength.strong` | Password strength: Strong                                 | —            |

#### Meter Group

| Key                  | English default | Placeholders |
| -------------------- | --------------- | ------------ |
| `meter-group.legend` | Legend          | —            |
| `meter-group.label`  | Meter group     | —            |
| `meter-group.total`  | Total: {value}  | `{value}`    |

#### Terminal

| Key               | English default        | Placeholders |
| ----------------- | ---------------------- | ------------ |
| `terminal.input`  | Terminal command input | —            |
| `terminal.output` | Terminal output        | —            |

#### Tree

| Key                       | English default     | Placeholders |
| ------------------------- | ------------------- | ------------ |
| `tree.label`              | Tree                | —            |
| `tree.filter-placeholder` | Filter tree nodes   | —            |
| `tree.empty`              | No items to display | —            |
| `tree-select.clear`       | Clear selection     | —            |

#### Upload

| Key                 | English default                     | Placeholders |
| ------------------- | ----------------------------------- | ------------ |
| `upload.area`       | File upload area                    | —            |
| `upload.toolbar`    | Upload actions                      | —            |
| `upload.files-list` | Files to upload                     | —            |
| `upload.dismiss`    | Dismiss validation messages         | —            |
| `upload.choose`     | Choose                              | —            |
| `upload.upload`     | Upload                              | —            |
| `upload.cancel`     | Cancel                              | —            |
| `upload.empty`      | Drag and drop files here to upload. | —            |

#### Image

| Key                  | English default      | Placeholders |
| -------------------- | -------------------- | ------------ |
| `image.controls`     | Image controls       | —            |
| `image.preview`      | Preview image        | —            |
| `image.error`        | Image failed to load | —            |
| `image.zoom-in`      | Zoom in              | —            |
| `image.zoom-out`     | Zoom out             | —            |
| `image.rotate-left`  | Rotate left          | —            |
| `image.rotate-right` | Rotate right         | —            |
| `image.close`        | Close preview        | —            |

#### DataView

| Key                            | English default    | Placeholders |
| ------------------------------ | ------------------ | ------------ |
| `data-view.pagination`         | Pagination         | —            |
| `data-view.view-mode`          | View mode          | —            |
| `data-view.label`              | Data list          | —            |
| `data-view.controls`           | Data view controls | —            |
| `data-view.filter`             | Filter items       | —            |
| `data-view.sort`               | Sort items         | —            |
| `data-view.list-view`          | Show list view     | —            |
| `data-view.grid-view`          | Show grid view     | —            |
| `data-view.layout.list`        | List view selected | —            |
| `data-view.layout.grid`        | Grid view selected | —            |
| `data-view.empty`              | No records found.  | —            |
| `data-view.filter.placeholder` | Filter items       | —            |

#### Editor

| Key              | English default    | Placeholders |
| ---------------- | ------------------ | ------------ |
| `editor.toolbar` | Formatting options | —            |

#### Stepper

| Key                               | English default                                                                    | Placeholders                      |
| --------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------- |
| `stepper.label`                   | Progress                                                                           | —                                 |
| `stepper.step`                    | Step {current} of {total}: {label}                                                 | `{current}`, `{total}`, `{label}` |
| `stepper.step.error`              | Step {current} of {total}: {label} — error, please fix                             | `{current}`, `{total}`, `{label}` |
| `stepper.step.completed`          | Step {current} of {total}: {label} — completed                                     | `{current}`, `{total}`, `{label}` |
| `stepper.step.current`            | Step {current} of {total}: {label} — current                                       | `{current}`, `{total}`, `{label}` |
| `stepper.step.unavailable-linear` | Step {current} of {total}: {label} — unavailable until previous steps are complete | `{current}`, `{total}`, `{label}` |
| `stepper.step.unavailable`        | Step {current} of {total}: {label} — unavailable                                   | `{current}`, `{total}`, `{label}` |
| `stepper.step.fallback-label`     | Step {n}                                                                           | `{n}`                             |

#### Alert

| Key             | English default | Placeholders |
| --------------- | --------------- | ------------ |
| `alert.dismiss` | Dismiss alert   | —            |

#### Galleria

| Key                       | English default            | Placeholders           |
| ------------------------- | -------------------------- | ---------------------- |
| `galleria.label`          | Image gallery              | —                      |
| `galleria.item`           | Image {current} of {total} | `{current}`, `{total}` |
| `galleria.go-to`          | Go to image {n}            | `{n}`                  |
| `galleria.nav`            | Image navigation           | —                      |
| `galleria.close`          | Close gallery              | —                      |
| `galleria.fullscreen`     | View fullscreen            | —                      |
| `galleria.thumbnail.prev` | Previous thumbnails        | —                      |
| `galleria.thumbnail.next` | Next thumbnails            | —                      |
| `galleria.prev`           | Previous image             | —                      |
| `galleria.next`           | Next image                 | —                      |

#### OrganizationChart

| Key                           | English default | Placeholders |
| ----------------------------- | --------------- | ------------ |
| `organization-chart.label`    | Organization    | —            |
| `organization-chart.expand`   | Expand          | —            |
| `organization-chart.collapse` | Collapse        | —            |

#### PickList

| Key               | English default | Placeholders |
| ----------------- | --------------- | ------------ |
| `picklist.source` | Source list     | —            |
| `picklist.target` | Target list     | —            |

#### ProgressBar

| Key                    | English default | Placeholders |
| ---------------------- | --------------- | ------------ |
| `progressbar.complete` | Complete        | —            |

#### Rating

| Key            | English default | Placeholders |
| -------------- | --------------- | ------------ |
| `rating.clear` | Clear rating    | —            |

#### Slider

| Key          | English default | Placeholders |
| ------------ | --------------- | ------------ |
| `slider.min` | Minimum value   | —            |
| `slider.max` | Maximum value   | —            |

#### Knob

| Key         | English default | Placeholders |
| ----------- | --------------- | ------------ |
| `knob.dial` | Dial            | —            |

#### Skeleton

| Key              | English default | Placeholders |
| ---------------- | --------------- | ------------ |
| `skeleton.label` | Loading content | —            |

#### Avatar

| Key            | English default | Placeholders |
| -------------- | --------------- | ------------ |
| `avatar.label` | Avatar          | —            |

#### Timeline

| Key              | English default | Placeholders |
| ---------------- | --------------- | ------------ |
| `timeline.label` | Timeline        | —            |

#### SplitButton

| Key                 | English default | Placeholders |
| ------------------- | --------------- | ------------ |
| `split-button.more` | More options    | —            |
| `split-button.menu` | Menu            | —            |

#### InputNumber

| Key                      | English default   | Placeholders |
| ------------------------ | ----------------- | ------------ |
| `input-number.increment` | Increment {label} | `{label}`    |
| `input-number.decrement` | Decrement {label} | `{label}`    |
| `input-number.value`     | value             | —            |

#### ScrollTop

| Key                | English default | Placeholders |
| ------------------ | --------------- | ------------ |
| `scroll-top.label` | Scroll to top   | —            |

#### Dock

| Key          | English default | Placeholders |
| ------------ | --------------- | ------------ |
| `dock.label` | Dock            | —            |

#### Inplace

| Key               | English default | Placeholders |
| ----------------- | --------------- | ------------ |
| `inplace.display` | Click to edit   | —            |
| `inplace.close`   | Close editor    | —            |

#### ToggleButton

| Key                 | English default | Placeholders |
| ------------------- | --------------- | ------------ |
| `toggle-button.on`  | Yes             | —            |
| `toggle-button.off` | No              | —            |

#### Chart

| Key           | English default | Placeholders |
| ------------- | --------------- | ------------ |
| `chart.label` | Chart           | —            |

#### InputOtp

| Key               | English default   | Placeholders |
| ----------------- | ----------------- | ------------ |
| `input-otp.label` | One-time passcode | —            |
| `input-otp.digit` | Digit             | —            |
| `input-otp.of`    | of                | —            |
| `input-otp.paste` | Code entered.     | —            |

#### DataGrid

| Key                            | English default    | Placeholders |
| ------------------------------ | ------------------ | ------------ |
| `data-grid.select-all`         | Select all rows    | —            |
| `data-grid.deselect-all`       | Deselect all rows  | —            |
| `data-grid.select-row`         | Select row         | —            |
| `data-grid.deselect-row`       | Deselect row       | —            |
| `data-grid.filter-placeholder` | Filter             | —            |
| `data-grid.filter-column`      | Filter by {column} | `{column}`   |
| `data-grid.edit-cell`          | Edit cell          | —            |
| `data-grid.sort-asc`           | Sort ascending     | —            |
| `data-grid.sort-desc`          | Sort descending    | —            |
| `data-grid.sort-none`          | Remove sort        | —            |
| `data-grid.empty`              | No records found.  | —            |

#### ConfirmPopup

| Key                     | English default                   | Placeholders |
| ----------------------- | --------------------------------- | ------------ |
| `confirm-popup.message` | Are you sure you want to proceed? | —            |
| `confirm-popup.accept`  | Yes                               | —            |
| `confirm-popup.reject`  | No                                | —            |

#### SpeedDial

| Key                  | English default | Placeholders |
| -------------------- | --------------- | ------------ |
| `speed-dial.trigger` | Open speed dial | —            |

#### ImageCompare

| Key                        | English default         | Placeholders |
| -------------------------- | ----------------------- | ------------ |
| `image-compare.aria-label` | Image comparison slider | —            |

#### VirtualScroller

| Key                             | English default      | Placeholders |
| ------------------------------- | -------------------- | ------------ |
| `virtual-scroller.list-label`   | Scrollable list      | —            |
| `virtual-scroller.grid-label`   | Scrollable grid      | —            |
| `virtual-scroller.loading`      | Loading items…       | —            |
| `virtual-scroller.loading-more` | Loading more items.  | —            |
| `virtual-scroller.empty`        | No items to display. | —            |
| `virtual-scroller.available`    | item(s) available.   | —            |

#### CodeSnippet

| Key                             | English default                     | Placeholders |
| ------------------------------- | ----------------------------------- | ------------ |
| `code-snippet.tabs`             | File tabs                           | —            |
| `code-snippet.copy`             | Copy code to clipboard              | —            |
| `code-snippet.copied`           | Copied!                             | —            |
| `code-snippet.label.language`   | {language} code snippet             | `{language}` |
| `code-snippet.label.file`       | Code snippet: {filename}            | `{filename}` |
| `code-snippet.label.multi-file` | Code snippet with {count} file tabs | `{count}`    |

#### Accessible-name fallbacks (applied when no ariaLabel/ariaLabelledBy is set)

| Key                        | English default  | Placeholders |
| -------------------------- | ---------------- | ------------ |
| `datepicker.input.label`   | Choose date      | —            |
| `input-number.input.label` | Numeric input    | —            |
| `cascade-select.label`     | Select           | —            |
| `tree-select.label`        | Select           | —            |
| `editor.content.label`     | Rich text editor | —            |
| `orderlist.label`          | Reorderable list | —            |
| `autocomplete.input.label` | Search           | —            |
| `input-mask.input.label`   | Masked input     | —            |

<!-- AUTO-GENERATED:i18n-keys:end -->
