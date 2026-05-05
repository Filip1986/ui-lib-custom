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
import type * as UiLibKnob from 'ui-lib-custom/knob';
import type * as UiLibListbox from 'ui-lib-custom/listbox';
import type * as UiLibPassword from 'ui-lib-custom/password';
import type * as UiLibRadioButton from 'ui-lib-custom/radio-button';
import type * as UiLibRating from 'ui-lib-custom/rating';
import type * as UiLibSlider from 'ui-lib-custom/slider';
import type * as UiLibTextarea from 'ui-lib-custom/textarea';
import type * as UiLibToggleButton from 'ui-lib-custom/toggle-button';
import type * as UiLibToggleSwitch from 'ui-lib-custom/toggle-switch';
import type * as UiLibTreeSelect from 'ui-lib-custom/tree-select';
import type * as UiLibGalleria from 'ui-lib-custom/galleria';
import type * as UiLibImage from 'ui-lib-custom/image';
import type * as UiLibImageCompare from 'ui-lib-custom/image-compare';
import type * as UiLibBreadcrumb from 'ui-lib-custom/breadcrumb';
import type * as UiLibContextMenu from 'ui-lib-custom/context-menu';
import type * as UiLibDock from 'ui-lib-custom/dock';
import type * as UiLibMenu from 'ui-lib-custom/menu';
import type * as UiLibMegaMenu from 'ui-lib-custom/mega-menu';
import type * as UiLibMenubar from 'ui-lib-custom/menubar';
import type * as UiLibPanelMenu from 'ui-lib-custom/panel-menu';
import type * as UiLibTieredMenu from 'ui-lib-custom/tiered-menu';
import type * as UiLibMessage from 'ui-lib-custom/message';
import type * as UiLibToast from 'ui-lib-custom/toast';
import type * as UiLibAnimateOnScroll from 'ui-lib-custom/animate-on-scroll';
import type * as UiLibAutoFocus from 'ui-lib-custom/auto-focus';
import type * as UiLibAvatar from 'ui-lib-custom/avatar';
import type * as UiLibBind from 'ui-lib-custom/bind';
import type * as UiLibBlockUI from 'ui-lib-custom/block-ui';
import type * as UiLibChip from 'ui-lib-custom/chip';
import type * as UiLibClassNames from 'ui-lib-custom/class-names';
import type * as UiLibFocusTrap from 'ui-lib-custom/focus-trap';
import type * as UiLibFluid from 'ui-lib-custom/fluid';
import type * as UiLibInplace from 'ui-lib-custom/inplace';
import type * as UiLibMeterGroup from 'ui-lib-custom/meter-group';
import type * as UiLibProgressBar from 'ui-lib-custom/progress-bar';
import type * as UiLibProgressSpinner from 'ui-lib-custom/progress-spinner';
import type * as UiLibRipple from 'ui-lib-custom/ripple';
import type * as UiLibScrollTop from 'ui-lib-custom/scroll-top';
import type * as UiLibStyleClass from 'ui-lib-custom/style-class';
import type * as UiLibDivider from 'ui-lib-custom/divider';
import type * as UiLibTag from 'ui-lib-custom/tag';
import type * as UiLibTerminal from 'ui-lib-custom/terminal';

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

  it('should import from knob', async (): Promise<void> => {
    const mod: typeof UiLibKnob = await import('ui-lib-custom/knob');
    expect(mod.KnobComponent).toBeDefined();
    expect(mod.KNOB_DEFAULTS).toBeDefined();
    expect(mod.KNOB_SVG).toBeDefined();
  });

  it('should import from listbox', async (): Promise<void> => {
    const mod: typeof UiLibListbox = await import('ui-lib-custom/listbox');
    expect(mod.ListboxComponent).toBeDefined();
    expect(mod.LISTBOX_DEFAULTS).toBeDefined();
    expect(mod.LISTBOX_ROLE).toBeDefined();
  });

  it('should import from password', async (): Promise<void> => {
    const mod: typeof UiLibPassword = await import('ui-lib-custom/password');
    expect(mod.PasswordComponent).toBeDefined();
    expect(mod.PASSWORD_DEFAULTS).toBeDefined();
  });

  it('should import from radio-button', async (): Promise<void> => {
    const mod: typeof UiLibRadioButton = await import('ui-lib-custom/radio-button');
    expect(mod.RadioButton).toBeDefined();
  });

  it('should import from rating', async (): Promise<void> => {
    const mod: typeof UiLibRating = await import('ui-lib-custom/rating');
    expect(mod.Rating).toBeDefined();
    // RatingRateEvent is a type-only export -- verify the module resolves without error
    const _typeCheck: typeof mod = mod;
    void _typeCheck;
  });

  it('should import from slider', async (): Promise<void> => {
    const mod: typeof UiLibSlider = await import('ui-lib-custom/slider');
    expect(mod.Slider).toBeDefined();
    expect(mod.SLIDER_DEFAULTS).toBeDefined();
  });

  it('should import from toggle-button', async (): Promise<void> => {
    const mod: typeof UiLibToggleButton = await import('ui-lib-custom/toggle-button');
    expect(mod.ToggleButton).toBeDefined();
  });

  it('should import from toggle-switch', async (): Promise<void> => {
    const mod: typeof UiLibToggleSwitch = await import('ui-lib-custom/toggle-switch');
    expect(mod.ToggleSwitch).toBeDefined();
  });

  it('should import from textarea', async (): Promise<void> => {
    const mod: typeof UiLibTextarea = await import('ui-lib-custom/textarea');
    expect(mod.UiLibTextarea).toBeDefined();
    expect(mod.TEXTAREA_DEFAULTS).toBeDefined();
  });

  it('should import from tree-select', async (): Promise<void> => {
    const mod: typeof UiLibTreeSelect = await import('ui-lib-custom/tree-select');
    expect(mod.TreeSelect).toBeDefined();
    expect(mod.TREE_SELECT_DEFAULTS).toBeDefined();
  });

  it('should import from galleria', async (): Promise<void> => {
    const mod: typeof UiLibGalleria = await import('ui-lib-custom/galleria');
    expect(mod.GalleriaComponent).toBeDefined();
    expect(mod.Galleria).toBeDefined();
    expect(mod.GALLERIA_DEFAULT_NUM_VISIBLE).toBeDefined();
  });

  it('should import from image', async (): Promise<void> => {
    const mod: typeof UiLibImage = await import('ui-lib-custom/image');
    expect(mod.ImageComponent).toBeDefined();
    expect(mod.Image).toBeDefined();
    expect(mod.IMAGE_ZOOM_MAX).toBeDefined();
  });

  it('should import from image-compare', async (): Promise<void> => {
    const mod: typeof UiLibImageCompare = await import('ui-lib-custom/image-compare');
    expect(mod.ImageCompareComponent).toBeDefined();
    expect(mod.ImageCompare).toBeDefined();
    expect(mod.IMAGE_COMPARE_DEFAULT_VALUE).toBeDefined();
  });

  it('should import from breadcrumb', async (): Promise<void> => {
    const mod: typeof UiLibBreadcrumb = await import('ui-lib-custom/breadcrumb');
    expect(mod.Breadcrumb).toBeDefined();
    expect(mod.BREADCRUMB_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from context-menu', async (): Promise<void> => {
    const mod: typeof UiLibContextMenu = await import('ui-lib-custom/context-menu');
    expect(mod.ContextMenu).toBeDefined();
    expect(mod.CONTEXT_MENU_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from dock', async (): Promise<void> => {
    const mod: typeof UiLibDock = await import('ui-lib-custom/dock');
    expect(mod.Dock).toBeDefined();
    expect(mod.DOCK_DEFAULT_MAGNIFICATION_LEVEL).toBeDefined();
    expect(mod.DOCK_MAGNIFICATION_SPREAD).toBeDefined();
  });

  it('should import from menu', async (): Promise<void> => {
    const mod: typeof UiLibMenu = await import('ui-lib-custom/menu');
    expect(mod.Menu).toBeDefined();
    expect(mod.MENU_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from mega-menu', async (): Promise<void> => {
    const mod: typeof UiLibMegaMenu = await import('ui-lib-custom/mega-menu');
    expect(mod.MegaMenu).toBeDefined();
    expect(mod.MEGA_MENU_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from menubar', async (): Promise<void> => {
    const mod: typeof UiLibMenubar = await import('ui-lib-custom/menubar');
    expect(mod.Menubar).toBeDefined();
    expect(mod.MENUBAR_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from panel-menu', async (): Promise<void> => {
    const mod: typeof UiLibPanelMenu = await import('ui-lib-custom/panel-menu');
    expect(mod.PanelMenu).toBeDefined();
    expect(mod.PANEL_MENU_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from tiered-menu', async (): Promise<void> => {
    const mod: typeof UiLibTieredMenu = await import('ui-lib-custom/tiered-menu');
    expect(mod.TieredMenu).toBeDefined();
    expect(mod.TieredMenu).toBeDefined();
    expect(mod.TIERED_MENU_DEFAULT_ARIA_LABEL).toBeDefined();
  });

  it('should import from message', async (): Promise<void> => {
    const mod: typeof UiLibMessage = await import('ui-lib-custom/message');
    expect(mod.Message).toBeDefined();
  });

  it('should import from toast', async (): Promise<void> => {
    const mod: typeof UiLibToast = await import('ui-lib-custom/toast');
    expect(mod.Toast).toBeDefined();
    expect(mod.ToastService).toBeDefined();
  });

  it('should import from animate-on-scroll', async (): Promise<void> => {
    const mod: typeof UiLibAnimateOnScroll = await import('ui-lib-custom/animate-on-scroll');
    expect(mod.AnimateOnScroll).toBeDefined();
  });

  it('should import from auto-focus', async (): Promise<void> => {
    const mod: typeof UiLibAutoFocus = await import('ui-lib-custom/auto-focus');
    expect(mod.AutoFocus).toBeDefined();
  });
  it('should import from avatar', async (): Promise<void> => {
    const mod: typeof UiLibAvatar = await import('ui-lib-custom/avatar');
    expect(mod.Avatar).toBeDefined();
    expect(mod.AvatarGroup).toBeDefined();
  });

  it('should import from bind', async (): Promise<void> => {
    const mod: typeof UiLibBind = await import('ui-lib-custom/bind');
    expect(mod.Bind).toBeDefined();
  });

  it('should import from block-ui', async (): Promise<void> => {
    const mod: typeof UiLibBlockUI = await import('ui-lib-custom/block-ui');
    expect(mod.BlockUI).toBeDefined();
  });

  it('should import from chip', async (): Promise<void> => {
    const mod: typeof UiLibChip = await import('ui-lib-custom/chip');
    expect(mod.Chip).toBeDefined();
  });

  it('should import from class-names', async (): Promise<void> => {
    const mod: typeof UiLibClassNames = await import('ui-lib-custom/class-names');
    expect(mod.classNames).toBeDefined();
    expect(mod.ClassNamesPipe).toBeDefined();
  });

  it('should import from focus-trap', async (): Promise<void> => {
    const mod: typeof UiLibFocusTrap = await import('ui-lib-custom/focus-trap');
    expect(mod.FocusTrapDirective).toBeDefined();
  });

  it('should import from fluid', async (): Promise<void> => {
    const mod: typeof UiLibFluid = await import('ui-lib-custom/fluid');
    expect(mod.Fluid).toBeDefined();
    expect(mod.FluidDirective).toBeDefined();
  });

  it('should import from inplace', async (): Promise<void> => {
    const mod: typeof UiLibInplace = await import('ui-lib-custom/inplace');
    expect(mod.Inplace).toBeDefined();
  });

  it('should import from meter-group', async (): Promise<void> => {
    const mod: typeof UiLibMeterGroup = await import('ui-lib-custom/meter-group');
    expect(mod.MeterGroup).toBeDefined();
  });

  it('should import from progress-bar', async (): Promise<void> => {
    const mod: typeof UiLibProgressBar = await import('ui-lib-custom/progress-bar');
    expect(mod.ProgressBar).toBeDefined();
  });

  it('should import from progress-spinner', async (): Promise<void> => {
    const mod: typeof UiLibProgressSpinner = await import('ui-lib-custom/progress-spinner');
    expect(mod.ProgressSpinner).toBeDefined();
  });

  it('should import from ripple', async (): Promise<void> => {
    const mod: typeof UiLibRipple = await import('ui-lib-custom/ripple');
    expect(mod.Ripple).toBeDefined();
  });

  it('should import from scroll-top', async (): Promise<void> => {
    const mod: typeof UiLibScrollTop = await import('ui-lib-custom/scroll-top');
    expect(mod.ScrollTop).toBeDefined();
  });

  it('should import from style-class', async (): Promise<void> => {
    const mod: typeof UiLibStyleClass = await import('ui-lib-custom/style-class');
    expect(mod.StyleClass).toBeDefined();
  });

  it('should import from divider', async (): Promise<void> => {
    const mod: typeof UiLibDivider = await import('ui-lib-custom/divider');
    expect(mod.Divider).toBeDefined();
  });

  it('should import from tag', async (): Promise<void> => {
    const mod: typeof UiLibTag = await import('ui-lib-custom/tag');
    expect(mod.Tag).toBeDefined();
  });

  it('should import from terminal', async (): Promise<void> => {
    const mod: typeof UiLibTerminal = await import('ui-lib-custom/terminal');
    expect(mod.Terminal).toBeDefined();
    expect(mod.TerminalService).toBeDefined();
  });
});
