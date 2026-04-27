import type * as UiLibCustom from 'ui-lib-custom';
import type * as UiLibAccordion from 'ui-lib-custom/accordion';
import type * as UiLibBadge from 'ui-lib-custom/badge';
import type * as UiLibButton from 'ui-lib-custom/button';
import type * as UiLibCard from 'ui-lib-custom/card';
import type * as UiLibCheckbox from 'ui-lib-custom/checkbox';
import type * as UiLibChart from 'ui-lib-custom/chart';
import type * as UiLibColorPicker from 'ui-lib-custom/color-picker';
import type * as UiLibCore from 'ui-lib-custom/core';
import type * as UiLibDataView from 'ui-lib-custom/data-view';
import type * as UiLibOrderList from 'ui-lib-custom/order-list';
import type * as UiLibDatePicker from 'ui-lib-custom/date-picker';
import type * as UiLibEditor from 'ui-lib-custom/editor';
import type * as UiLibFloatLabel from 'ui-lib-custom/float-label';
import type * as UiLibIconField from 'ui-lib-custom/icon-field';
import type * as UiLibIcon from 'ui-lib-custom/icon';
import type * as UiLibInput from 'ui-lib-custom/input';
import type * as UiLibInputGroup from 'ui-lib-custom/input-group';
import type * as UiLibInputNumber from 'ui-lib-custom/input-number';
import type * as UiLibLayout from 'ui-lib-custom/layout';
import type * as UiLibSelect from 'ui-lib-custom/select';
import type * as UiLibSelectButton from 'ui-lib-custom/select-button';
import type * as UiLibSplitButton from 'ui-lib-custom/split-button';
import type * as UiLibSpeedDial from 'ui-lib-custom/speed-dial';
import type * as UiLibTabs from 'ui-lib-custom/tabs';
import type * as UiLibTheme from 'ui-lib-custom/theme';
import type * as UiLibTokens from 'ui-lib-custom/tokens';
import type * as UiLibInputMask from 'ui-lib-custom/input-mask';
import type * as UiLibOrganizationChart from 'ui-lib-custom/organization-chart';
import type * as UiLibPaginator from 'ui-lib-custom/paginator';
import type * as UiLibPickList from 'ui-lib-custom/pick-list';
import type * as UiLibTable from 'ui-lib-custom/table';
import type * as UiLibTimeline from 'ui-lib-custom/timeline';

import type * as UiLibTree from 'ui-lib-custom/tree';
import type * as UiLibTreeTable from 'ui-lib-custom/tree-table';
import type * as UiLibVirtualScroller from 'ui-lib-custom/virtual-scroller';
import type * as UiLibUpload from 'ui-lib-custom/upload';
import type * as UiLibCarousel from 'ui-lib-custom/carousel';
import type * as UiLibInputOtp from 'ui-lib-custom/input-otp';
import type * as UiLibKeyFilter from 'ui-lib-custom/key-filter';

describe('Secondary Entry Points', (): void => {
  it('should import from primary', async (): Promise<void> => {
    const lib: typeof UiLibCustom = await import('ui-lib-custom');
    expect(lib.ButtonGroup).toBeDefined();
    expect((lib as { DatePickerComponent?: unknown }).DatePickerComponent).toBeUndefined();
  });

  it('should import from accordion', async (): Promise<void> => {
    const mod: typeof UiLibAccordion = await import('ui-lib-custom/accordion');
    expect(mod.Accordion).toBeDefined();
  });

  it('should import from badge', async (): Promise<void> => {
    const mod: typeof UiLibBadge = await import('ui-lib-custom/badge');
    expect(mod.Badge).toBeDefined();
  });

  it('should import from button', async (): Promise<void> => {
    const mod: typeof UiLibButton = await import('ui-lib-custom/button');
    expect(mod.Button).toBeDefined();
  });

  it('should import from card', async (): Promise<void> => {
    const mod: typeof UiLibCard = await import('ui-lib-custom/card');
    expect(mod.Card).toBeDefined();
  });

  it('should import from checkbox', async (): Promise<void> => {
    const mod: typeof UiLibCheckbox = await import('ui-lib-custom/checkbox');
    expect(mod.Checkbox).toBeDefined();
  });

  it('should import from chart', async (): Promise<void> => {
    const mod: typeof UiLibChart = await import('ui-lib-custom/chart');
    expect(mod.ChartComponent).toBeDefined();
    expect(mod.BarChartComponent).toBeDefined();
  });

  it('should import from color-picker', async (): Promise<void> => {
    const mod: typeof UiLibColorPicker = await import('ui-lib-custom/color-picker');
    expect(mod.ColorPicker).toBeDefined();
  });

  it('should import from core', async (): Promise<void> => {
    const mod: typeof UiLibCore = await import('ui-lib-custom/core');
    expect(mod.ICON_SIZES).toBeDefined();
  });

  it('should import from data-view', async (): Promise<void> => {
    const mod: typeof UiLibDataView = await import('ui-lib-custom/data-view');
    expect(mod.DataViewComponent).toBeDefined();
    expect(mod.DATA_VIEW_DEFAULT_ROWS_PER_PAGE).toBeDefined();
  });

  it('should import from date-picker', async (): Promise<void> => {
    const mod: typeof UiLibDatePicker = await import('ui-lib-custom/date-picker');
    expect(mod.DatePickerComponent).toBeDefined();
  });

  it('should import from editor', async (): Promise<void> => {
    const mod: typeof UiLibEditor = await import('ui-lib-custom/editor');
    expect(mod.EditorComponent).toBeDefined();
  });

  it('should import from float-label', async (): Promise<void> => {
    const mod: typeof UiLibFloatLabel = await import('ui-lib-custom/float-label');
    expect(mod.FloatLabelComponent).toBeDefined();
  });

  it('should import from icon-field', async (): Promise<void> => {
    const mod: typeof UiLibIconField = await import('ui-lib-custom/icon-field');
    expect(mod.IconFieldComponent).toBeDefined();
    expect(mod.InputIconComponent).toBeDefined();
  });

  it('should import from icon', async (): Promise<void> => {
    const mod: typeof UiLibIcon = await import('ui-lib-custom/icon');
    expect(mod.Icon).toBeDefined();
  });

  it('should import from input', async (): Promise<void> => {
    const mod: typeof UiLibInput = await import('ui-lib-custom/input');
    expect(mod.UiLibInput).toBeDefined();
  });

  it('should import from input-group', async (): Promise<void> => {
    const mod: typeof UiLibInputGroup = await import('ui-lib-custom/input-group');
    expect(mod.InputGroupComponent).toBeDefined();
    expect(mod.InputGroupAddonComponent).toBeDefined();
  });

  it('should import from input-number', async (): Promise<void> => {
    const mod: typeof UiLibInputNumber = await import('ui-lib-custom/input-number');
    expect(mod.InputNumberComponent).toBeDefined();
    expect(mod.NumberFormatService).toBeDefined();
  });

  it('should import from layout', async (): Promise<void> => {
    const mod: typeof UiLibLayout = await import('ui-lib-custom/layout');
    expect(mod.Stack).toBeDefined();
  });

  it('should import from select', async (): Promise<void> => {
    const mod: typeof UiLibSelect = await import('ui-lib-custom/select');
    expect(mod.UiLibSelect).toBeDefined();
  });

  it('should import from select-button', async (): Promise<void> => {
    const mod: typeof UiLibSelectButton = await import('ui-lib-custom/select-button');
    expect(mod.SelectButton).toBeDefined();
  });

  it('should import from split-button', async (): Promise<void> => {
    const mod: typeof UiLibSplitButton = await import('ui-lib-custom/split-button');
    expect(mod.SplitButtonComponent).toBeDefined();
    expect(mod.SPLIT_BUTTON_DEFAULTS).toBeDefined();
  });

  it('should import from speed-dial', async (): Promise<void> => {
    const mod: typeof UiLibSpeedDial = await import('ui-lib-custom/speed-dial');
    expect(mod.SpeedDialComponent).toBeDefined();
    expect(mod.SPEED_DIAL_DEFAULTS).toBeDefined();
  });

  it('should import from tabs', async (): Promise<void> => {
    const mod: typeof UiLibTabs = await import('ui-lib-custom/tabs');
    expect(mod.Tabs).toBeDefined();
  });

  it('should import from theme', async (): Promise<void> => {
    const mod: typeof UiLibTheme = await import('ui-lib-custom/theme');
    expect(mod.ThemeConfigService).toBeDefined();
  });

  it('should import from tokens', async (): Promise<void> => {
    const mod: typeof UiLibTokens = await import('ui-lib-custom/tokens');
    expect(mod.SPACING_TOKENS).toBeDefined();
  });

  it('should import from input-mask', async (): Promise<void> => {
    const mod: typeof UiLibInputMask = await import('ui-lib-custom/input-mask');
    expect(mod.InputMaskComponent).toBeDefined();
    expect(mod.MaskEngine).toBeDefined();
  });

  it('should import from order-list', async (): Promise<void> => {
    const mod: typeof UiLibOrderList = await import('ui-lib-custom/order-list');
    expect(mod.OrderListComponent).toBeDefined();
    expect(mod.OrderListItemDirective).toBeDefined();
    expect(mod.OrderListHeaderDirective).toBeDefined();
    expect(mod.OrderListEmptyDirective).toBeDefined();
    expect(mod.OrderListFilterDirective).toBeDefined();
    expect(mod.ORDER_LIST_DEFAULTS).toBeDefined();
  });

  it('should import from organization-chart', async (): Promise<void> => {
    const mod: typeof UiLibOrganizationChart = await import('ui-lib-custom/organization-chart');
    expect(mod.OrganizationChart).toBeDefined();
    expect(mod.OrgChartNodeTemplateDirective).toBeDefined();
  });

  it('should import from paginator', async (): Promise<void> => {
    const mod: typeof UiLibPaginator = await import('ui-lib-custom/paginator');
    expect(mod.PaginatorComponent).toBeDefined();
    expect(mod.PAGINATOR_DEFAULTS).toBeDefined();
  });

  it('should import from pick-list', async (): Promise<void> => {
    const mod: typeof UiLibPickList = await import('ui-lib-custom/pick-list');
    expect(mod.PickListComponent).toBeDefined();
    expect(mod.PickListItemDirective).toBeDefined();
    expect(mod.PickListSourceHeaderDirective).toBeDefined();
    expect(mod.PickListTargetHeaderDirective).toBeDefined();
    expect(mod.PickListEmptyDirective).toBeDefined();
    expect(mod.PICK_LIST_DEFAULTS).toBeDefined();
  });

  it('should import from table', async (): Promise<void> => {
    const mod: typeof UiLibTable = await import('ui-lib-custom/table');
    expect(mod.TableComponent).toBeDefined();
    expect(mod.TableColumnComponent).toBeDefined();
    expect(mod.TableCaptionDirective).toBeDefined();
    expect(mod.TableColumnBodyDirective).toBeDefined();
    expect(mod.TableExpansionDirective).toBeDefined();
    expect(mod.TABLE_DEFAULTS).toBeDefined();
  });

  it('should import from timeline', async (): Promise<void> => {
    const mod: typeof UiLibTimeline = await import('ui-lib-custom/timeline');
    expect(mod.TimelineComponent).toBeDefined();
    expect(mod.TimelineContentDirective).toBeDefined();
    expect(mod.TimelineMarkerDirective).toBeDefined();
    expect(mod.TimelineOppositeDirective).toBeDefined();
    expect(mod.TIMELINE_DEFAULTS).toBeDefined();
  });

  it('should import from tree', async (): Promise<void> => {
    const mod: typeof UiLibTree = await import('ui-lib-custom/tree');
    expect(mod.Tree).toBeDefined();
    expect(mod.TreeNodeTemplateDirective).toBeDefined();
    expect(mod.TREE_CONTEXT).toBeDefined();
  });

  it('should import from tree-table', async (): Promise<void> => {
    const mod: typeof UiLibTreeTable = await import('ui-lib-custom/tree-table');
    expect(mod.TreeTableComponent).toBeDefined();
    expect(mod.TreeTableColumnComponent).toBeDefined();
    expect(mod.TreeTableColumnBodyDirective).toBeDefined();
    expect(mod.TREE_TABLE_DEFAULTS).toBeDefined();
  });

  it('should import from virtual-scroller', async (): Promise<void> => {
    const mod: typeof UiLibVirtualScroller = await import('ui-lib-custom/virtual-scroller');
    expect(mod.VirtualScrollerComponent).toBeDefined();
    expect(mod.ScrollerItemDirective).toBeDefined();
    expect(mod.ScrollerContentDirective).toBeDefined();
    expect(mod.ScrollerLoaderDirective).toBeDefined();
    expect(mod.ScrollerLoaderIconDirective).toBeDefined();
  });

  it('should import from upload', async (): Promise<void> => {
    const mod: typeof UiLibUpload = await import('ui-lib-custom/upload');
    expect(mod.UploadComponent).toBeDefined();
    expect(mod.UploadHeaderDirective).toBeDefined();
    expect(mod.UploadContentDirective).toBeDefined();
    expect(mod.UploadEmptyDirective).toBeDefined();
    expect(mod.UploadFileDirective).toBeDefined();
    expect(mod.UPLOAD_DEFAULT_CHOOSE_LABEL).toBeDefined();
  });

  it('should import from carousel', async (): Promise<void> => {
    const mod: typeof UiLibCarousel = await import('ui-lib-custom/carousel');
    expect(mod.CarouselComponent).toBeDefined();
    expect(mod.CAROUSEL_DEFAULT_NUM_VISIBLE).toBeDefined();
    expect(mod.CAROUSEL_DEFAULT_NUM_SCROLL).toBeDefined();
  });

  it('should import from input-otp', async (): Promise<void> => {
    const mod: typeof UiLibInputOtp = await import('ui-lib-custom/input-otp');
    expect(mod.InputOtpComponent).toBeDefined();
    expect(mod.INPUT_OTP_DEFAULTS).toBeDefined();
  });

  it('should import from key-filter', async (): Promise<void> => {
    const mod: typeof UiLibKeyFilter = await import('ui-lib-custom/key-filter');
    expect(mod.KeyFilterDirective).toBeDefined();
    expect(mod.KEY_FILTER_PRESET_PATTERNS).toBeDefined();
    expect(mod.KEY_FILTER_DEFAULTS).toBeDefined();
  });
});
