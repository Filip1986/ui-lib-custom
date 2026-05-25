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
  'select.selected.count': '{count} items selected',

  // ── DatePicker ────────────────────────────────────────────────────────────
  'datepicker.toggle': 'Open calendar',
  'datepicker.prev.month': 'Previous month',
  'datepicker.next.month': 'Next month',
  'datepicker.prev.year': 'Previous year',
  'datepicker.next.year': 'Next year',
  'datepicker.today': 'Today',
  'datepicker.clear': 'Clear date',

  // ── Dialog ────────────────────────────────────────────────────────────────
  'dialog.close': 'Close dialog',

  // ── Paginator ─────────────────────────────────────────────────────────────
  'paginator.first': 'First page',
  'paginator.prev': 'Previous page',
  'paginator.next': 'Next page',
  'paginator.last': 'Last page',
  'paginator.rows.label': 'Rows per page',
  'paginator.page.report': 'Page {currentPage} of {totalPages}',

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
  'carousel.region': 'Carousel',

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
};
