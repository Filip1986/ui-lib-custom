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

  // ── Dialog / Drawer / BottomSheet / Popover / ConfirmDialog / DynamicDialog
  'dialog.close': 'Close dialog',
  'drawer.close': 'Close',
  'bottom-sheet.close': 'Close',
  'popover.close': 'Close',
  'confirm-dialog.close': 'Close',
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
  'toast.close': 'Close notification',

  // ── Chip / AutoComplete ───────────────────────────────────────────────────
  'chip.remove': 'Remove {label}',
  'autocomplete.dropdown': 'Show suggestions',

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

  // ── Editor ────────────────────────────────────────────────────────────────
  'editor.toolbar': 'Formatting options',
};
