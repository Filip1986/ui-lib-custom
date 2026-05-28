import type { UiLibTranslationBundle } from './i18n.types';

/** Default English translation bundle. Keys follow the pattern: `<component>.<token>`. */
export const UI_LIB_EN: UiLibTranslationBundle = {
  // ── Global ────────────────────────────────────────────────────────────────
  'global.close': 'Close',
  'global.clear': 'Clear',
  'global.search': 'Search',
  'global.loading': 'Loading',
  'global.empty': 'No results found',
  'global.error': 'An error occurred',
  'global.required': 'Required',
  'global.optional': 'Optional',

  // ── Select / Autocomplete / Listbox ───────────────────────────────────────
  'select.placeholder': 'Select an option',
  'select.clear': 'Clear selection',
  'select.toggle': 'Toggle dropdown',
  'select.empty': 'No options available',
  'select.search.placeholder': 'Search options',
  'select.search.aria': 'Search options',
  'select.selected.count': '{count} items selected',

  // ── AutoComplete ──────────────────────────────────────────────────────────
  'autocomplete.chips-label': 'Selected items',
  'autocomplete.clear': 'Clear',

  // ── CascadeSelect ─────────────────────────────────────────────────────────
  'cascade-select.clear': 'Clear selection',
  'cascade-select.sublevel-label': 'Options for {label}',

  // ── Listbox ───────────────────────────────────────────────────────────────
  'listbox.select-all': 'Select all options',

  // ── DatePicker ────────────────────────────────────────────────────────────
  'datepicker.toggle': 'Open calendar',
  'datepicker.prev.month': 'Previous month',
  'datepicker.next.month': 'Next month',
  'datepicker.prev.year': 'Previous year',
  'datepicker.next.year': 'Next year',
  'datepicker.prev.decade': 'Previous decade',
  'datepicker.next.decade': 'Next decade',
  'datepicker.today': 'Today',
  'datepicker.clear': 'Clear date',
  'datepicker.month-picker': 'Month picker',
  'datepicker.year-picker': 'Year picker',
  'datepicker.time-panel': 'Time picker',
  'datepicker.time.hour': 'Hour',
  'datepicker.time.minute': 'Minute',
  'datepicker.time.second': 'Second',
  'datepicker.time.inc.hour': 'Increase hour',
  'datepicker.time.dec.hour': 'Decrease hour',
  'datepicker.time.inc.minute': 'Increase minute',
  'datepicker.time.dec.minute': 'Decrease minute',
  'datepicker.time.inc.second': 'Increase second',
  'datepicker.time.dec.second': 'Decrease second',
  'datepicker.day.today': 'today',
  'datepicker.day.selected': 'selected',
  'datepicker.day.range': 'in selected range',

  // ── Dialog / Drawer / BottomSheet / Popover / ConfirmDialog / DynamicDialog
  'dialog.close': 'Close dialog',
  'dialog.minimize': 'Minimize',
  'dialog.maximize': 'Maximize',
  'drawer.close': 'Close',
  'drawer.label': 'Drawer',
  'bottom-sheet.close': 'Close',
  'popover.close': 'Close',
  'popover.label': 'Popover',
  'confirm-dialog.close': 'Close',
  'confirm-dialog.accept': 'Yes',
  'confirm-dialog.reject': 'No',
  'confirm-dialog.header': 'Confirmation',
  'confirm-dialog.message': 'Are you sure you want to proceed?',
  'dynamic-dialog.label': 'Dialog',
  'dynamic-dialog.close': 'Close',
  'message.close': 'Close message',
  'panel.toggle': 'Toggle panel',

  // ── Paginator ─────────────────────────────────────────────────────────────
  'paginator.first': 'First page',
  'paginator.prev': 'Previous page',
  'paginator.next': 'Next page',
  'paginator.last': 'Last page',
  'paginator.rows.label': 'Rows per page',
  'paginator.page.report': 'Page {currentPage} of {totalPages}',
  'paginator.jump': 'Jump to page, press Enter to navigate',
  'paginator.nav': 'Pagination',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.drop.hint': 'Drag and drop files here, or click to browse',
  'upload.remove': 'Remove file',
  'upload.browse': 'Browse files',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.label': 'Rating: {value} out of {max}',
  'rating.star': 'Star {n}',

  // ── Table ─────────────────────────────────────────────────────────────────
  'table.sort.asc': 'Sort ascending',
  'table.sort.desc': 'Sort descending',
  'table.sort.none': 'No sort applied',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.expand': 'Expand node',
  'tree.collapse': 'Collapse node',

  // ── ColorPicker ───────────────────────────────────────────────────────────
  'colorpicker.toggle': 'Open color picker',
  'colorpicker.trigger': 'Color: {color}, click to open picker',
  'colorpicker.panel': 'Color picker',
  'colorpicker.hue': 'Hue slider',
  'colorpicker.hex.input': 'Hex color value',
  'colorpicker.red.input': 'Red channel',
  'colorpicker.green.input': 'Green channel',
  'colorpicker.blue.input': 'Blue channel',
  'colorpicker.alpha.input': 'Alpha channel',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.label': '{value}% complete',

  // ── Carousel / Galleria ───────────────────────────────────────────────────
  'carousel.prev': 'Previous slide',
  'carousel.next': 'Next slide',
  'carousel.indicator': 'Go to slide {n}',
  'carousel.slide.status': 'Slide {current} of {total}',
  'carousel.region': 'Carousel',
  'carousel.indicators-label': 'Slide indicators',

  // ── OrderList / PickList ──────────────────────────────────────────────────
  'orderlist.move.up': 'Move up',
  'orderlist.move.down': 'Move down',
  'orderlist.move.top': 'Move to top',
  'orderlist.move.bottom': 'Move to bottom',
  'picklist.add': 'Add to list',
  'picklist.remove': 'Remove from list',
  'picklist.add.all': 'Add all',
  'picklist.remove.all': 'Remove all',

  // ── Toast ─────────────────────────────────────────────────────────────────
  'toast.region': 'Notifications',
  'toast.close': 'Close notification',
  'toast.dismiss': 'Close: {title}',

  // ── Chip / AutoComplete ───────────────────────────────────────────────────
  'chip.remove': 'Remove {label}',
  'autocomplete.dropdown': 'Show suggestions',
  'autocomplete.remove-chip': 'Remove {label}',

  // ── Paginator (dynamic) ───────────────────────────────────────────────────
  'paginator.empty': 'No pages available',
  'paginator.page.current': 'Page {page}, current page',
  'paginator.page.go': 'Go to page {page}',

  // ── DataView (dynamic) ────────────────────────────────────────────────────
  'data-view.go.page': 'Go to page {page}',

  // ── Meter Group (dynamic) ─────────────────────────────────────────────────
  'meter-group.segment.default': 'Segment {index}',
  'meter-group.segment': '{label}: {value} of {max}',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.value': 'Rating: {current} out of {total} stars',
  'rating.star.singular': '{star} star out of {total}',
  'rating.star.plural': '{star} stars out of {total}',

  // ── Tree Select (dynamic) ─────────────────────────────────────────────────
  'tree-select.options': 'Select options',
  'tree-select.none-selected': 'No item selected',
  'tree-select.selected.one': '{label} selected',
  'tree-select.selected.count': '{count} items selected',

  // ── Table / TreeTable ─────────────────────────────────────────────────────
  'table.expand-row': 'Row expansion',
  'table.select-all': 'Select all rows',
  'tree-table.filter': 'Filter table',
  'tree-table.select-row': 'Select row',
  'tree-table.select-all': 'Select all rows',

  // ── Tabs ──────────────────────────────────────────────────────────────────
  'tabs.close': 'Close tab',

  // ── Menubar ───────────────────────────────────────────────────────────────
  'menubar.toggle': 'Toggle navigation menu',

  // ── Input ─────────────────────────────────────────────────────────────────
  'input.clear': 'Clear input',
  'input.password-toggle': 'Toggle password visibility',
  'input-mask.clear': 'Clear',
  'password.clear': 'Clear password',

  // ── Meter Group ───────────────────────────────────────────────────────────
  'meter-group.legend': 'Legend',
  'meter-group.label': 'Meter group',
  'meter-group.total': 'Total: {value}',

  // ── Terminal ──────────────────────────────────────────────────────────────
  'terminal.input': 'Terminal command input',
  'terminal.output': 'Terminal output',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.filter-placeholder': 'Filter tree nodes',
  'tree-select.clear': 'Clear selection',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.area': 'File upload area',
  'upload.toolbar': 'Upload actions',
  'upload.files-list': 'Files to upload',
  'upload.dismiss': 'Dismiss validation messages',

  // ── Image ─────────────────────────────────────────────────────────────────
  'image.controls': 'Image controls',

  // ── DataView ─────────────────────────────────────────────────────────────
  'data-view.pagination': 'Pagination',
  'data-view.view-mode': 'View mode',
  'data-view.label': 'Data list',
  'data-view.controls': 'Data view controls',
  'data-view.filter': 'Filter items',
  'data-view.sort': 'Sort items',
  'data-view.list-view': 'Show list view',
  'data-view.grid-view': 'Show grid view',
  'data-view.layout.list': 'List view selected',
  'data-view.layout.grid': 'Grid view selected',

  // ── Editor ────────────────────────────────────────────────────────────────
  'editor.toolbar': 'Formatting options',

  // ── Stepper ───────────────────────────────────────────────────────────────
  'stepper.label': 'Progress',
  'stepper.step': 'Step {current} of {total}: {label}',
  'stepper.step.error': 'Step {current} of {total}: {label} — error, please fix',
  'stepper.step.completed': 'Step {current} of {total}: {label} — completed',
  'stepper.step.current': 'Step {current} of {total}: {label} — current',
  'stepper.step.unavailable-linear':
    'Step {current} of {total}: {label} — unavailable until previous steps are complete',
  'stepper.step.unavailable': 'Step {current} of {total}: {label} — unavailable',
  'stepper.step.fallback-label': 'Step {n}',

  // ── Alert ─────────────────────────────────────────────────────────────────
  'alert.dismiss': 'Dismiss alert',

  // ── Galleria ──────────────────────────────────────────────────────────────
  'galleria.label': 'Image gallery',
  'galleria.item': 'Image {current} of {total}',
  'galleria.go-to': 'Go to image {n}',
  'galleria.nav': 'Image navigation',
  'galleria.close': 'Close gallery',
  'galleria.fullscreen': 'View fullscreen',
  'galleria.thumbnail.prev': 'Previous thumbnails',
  'galleria.thumbnail.next': 'Next thumbnails',
  'galleria.prev': 'Previous image',
  'galleria.next': 'Next image',

  // ── OrganizationChart ─────────────────────────────────────────────────────
  'organization-chart.label': 'Organization',
  'organization-chart.expand': 'Expand',
  'organization-chart.collapse': 'Collapse',

  // ── PickList ──────────────────────────────────────────────────────────────
  'picklist.source': 'Source list',
  'picklist.target': 'Target list',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.complete': 'Complete',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.clear': 'Clear rating',

  // ── Slider ────────────────────────────────────────────────────────────────
  'slider.min': 'Minimum value',
  'slider.max': 'Maximum value',

  // ── Knob ──────────────────────────────────────────────────────────────────
  'knob.dial': 'Dial',

  // ── Avatar ────────────────────────────────────────────────────────────────
  'avatar.label': 'Avatar',

  // ── Timeline ─────────────────────────────────────────────────────────────
  'timeline.label': 'Timeline',

  // ── SplitButton ───────────────────────────────────────────────────────────
  'split-button.more': 'More options',
  'split-button.menu': 'Menu',

  // ── InputNumber ───────────────────────────────────────────────────────────
  'input-number.increment': 'Increment {label}',
  'input-number.decrement': 'Decrement {label}',
  'input-number.value': 'value',

  // ── ScrollTop ─────────────────────────────────────────────────────────────
  'scroll-top.label': 'Scroll to top',

  // ── Dock ──────────────────────────────────────────────────────────────────
  'dock.label': 'Dock',

  // ── Inplace ───────────────────────────────────────────────────────────────
  'inplace.display': 'Click to edit',
  'inplace.close': 'Close editor',

  // ── ToggleButton ──────────────────────────────────────────────────────────
  'toggle-button.on': 'Yes',
  'toggle-button.off': 'No',

  // ── Chart ─────────────────────────────────────────────────────────────────
  'chart.label': 'Chart',

  // ── InputOtp ──────────────────────────────────────────────────────────────
  'input-otp.label': 'One-time passcode',
  'input-otp.digit': 'Digit',
  'input-otp.of': 'of',
  'input-otp.paste': 'Code entered.',

  // ── DataGrid ──────────────────────────────────────────────────────────────
  'data-grid.select-all': 'Select all rows',
  'data-grid.deselect-all': 'Deselect all rows',
  'data-grid.select-row': 'Select row',
  'data-grid.deselect-row': 'Deselect row',
  'data-grid.filter-placeholder': 'Filter',
  'data-grid.filter-column': 'Filter by {column}',
  'data-grid.edit-cell': 'Edit cell',
  'data-grid.sort-asc': 'Sort ascending',
  'data-grid.sort-desc': 'Sort descending',
  'data-grid.sort-none': 'Remove sort',
  'data-grid.empty': 'No records found.',
};
