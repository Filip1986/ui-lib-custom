export const EDITOR_DEFAULTS: {
  readonly variant: null;
  readonly size: 'md';
  readonly readonly: false;
  readonly placeholder: '';
  readonly filled: false;
  readonly disabled: false;
} = {
  variant: null,
  size: 'md',
  readonly: false,
  placeholder: '',
  filled: false,
  disabled: false,
} as const;

export const EDITOR_CSS_CLASSES: {
  readonly Host: 'ui-lib-editor';
  readonly Toolbar: 'ui-lib-editor-toolbar';
  readonly Content: 'ui-lib-editor-content';
  readonly Disabled: 'ui-lib-editor--disabled';
  readonly Readonly: 'ui-lib-editor--readonly';
  readonly Focused: 'ui-lib-editor--focused';
  readonly Filled: 'ui-lib-editor--filled';
  readonly Empty: 'ui-lib-editor--empty';
  readonly VariantPrefix: 'ui-lib-editor--';
  readonly SizePrefix: 'ui-lib-editor--size-';
  readonly ToolbarButton: 'ui-lib-editor-toolbar-button';
  readonly ToolbarButtonActive: 'ui-lib-editor-toolbar-button--active';
  readonly ToolbarSeparator: 'ui-lib-editor-toolbar-separator';
  readonly ToolbarSelect: 'ui-lib-editor-toolbar-select';
} = {
  Host: 'ui-lib-editor',
  Toolbar: 'ui-lib-editor-toolbar',
  Content: 'ui-lib-editor-content',
  Disabled: 'ui-lib-editor--disabled',
  Readonly: 'ui-lib-editor--readonly',
  Focused: 'ui-lib-editor--focused',
  Filled: 'ui-lib-editor--filled',
  Empty: 'ui-lib-editor--empty',
  VariantPrefix: 'ui-lib-editor--',
  SizePrefix: 'ui-lib-editor--size-',
  ToolbarButton: 'ui-lib-editor-toolbar-button',
  ToolbarButtonActive: 'ui-lib-editor-toolbar-button--active',
  ToolbarSeparator: 'ui-lib-editor-toolbar-separator',
  ToolbarSelect: 'ui-lib-editor-toolbar-select',
} as const;

export const EDITOR_TOKENS: {
  readonly ToolbarBackground: '--uilib-editor-toolbar-bg';
  readonly ToolbarBorderColor: '--uilib-editor-toolbar-border-color';
  readonly ToolbarItemColor: '--uilib-editor-toolbar-item-color';
  readonly ToolbarItemHoverColor: '--uilib-editor-toolbar-item-hover-color';
  readonly ToolbarItemHoverBackground: '--uilib-editor-toolbar-item-hover-bg';
  readonly ToolbarItemActiveColor: '--uilib-editor-toolbar-item-active-color';
  readonly ToolbarItemActiveBackground: '--uilib-editor-toolbar-item-active-bg';
  readonly ToolbarSeparatorColor: '--uilib-editor-toolbar-separator-color';
  readonly ToolbarPadding: '--uilib-editor-toolbar-padding';
  readonly ToolbarGap: '--uilib-editor-toolbar-gap';
  readonly ToolbarBorderRadius: '--uilib-editor-toolbar-border-radius';
  readonly ContentBackground: '--uilib-editor-content-bg';
  readonly ContentBorderColor: '--uilib-editor-content-border-color';
  readonly ContentFontFamily: '--uilib-editor-content-font-family';
  readonly ContentFontSize: '--uilib-editor-content-font-size';
  readonly ContentLineHeight: '--uilib-editor-content-line-height';
  readonly ContentColor: '--uilib-editor-content-color';
  readonly ContentPadding: '--uilib-editor-content-padding';
  readonly ContentMinHeight: '--uilib-editor-content-min-height';
  readonly PlaceholderColor: '--uilib-editor-placeholder-color';
  readonly BorderRadius: '--uilib-editor-border-radius';
  readonly FocusRingColor: '--uilib-editor-focus-ring-color';
  readonly FocusRingWidth: '--uilib-editor-focus-ring-width';
  readonly DisabledOpacity: '--uilib-editor-disabled-opacity';
} = {
  ToolbarBackground: '--uilib-editor-toolbar-bg',
  ToolbarBorderColor: '--uilib-editor-toolbar-border-color',
  ToolbarItemColor: '--uilib-editor-toolbar-item-color',
  ToolbarItemHoverColor: '--uilib-editor-toolbar-item-hover-color',
  ToolbarItemHoverBackground: '--uilib-editor-toolbar-item-hover-bg',
  ToolbarItemActiveColor: '--uilib-editor-toolbar-item-active-color',
  ToolbarItemActiveBackground: '--uilib-editor-toolbar-item-active-bg',
  ToolbarSeparatorColor: '--uilib-editor-toolbar-separator-color',
  ToolbarPadding: '--uilib-editor-toolbar-padding',
  ToolbarGap: '--uilib-editor-toolbar-gap',
  ToolbarBorderRadius: '--uilib-editor-toolbar-border-radius',
  ContentBackground: '--uilib-editor-content-bg',
  ContentBorderColor: '--uilib-editor-content-border-color',
  ContentFontFamily: '--uilib-editor-content-font-family',
  ContentFontSize: '--uilib-editor-content-font-size',
  ContentLineHeight: '--uilib-editor-content-line-height',
  ContentColor: '--uilib-editor-content-color',
  ContentPadding: '--uilib-editor-content-padding',
  ContentMinHeight: '--uilib-editor-content-min-height',
  PlaceholderColor: '--uilib-editor-placeholder-color',
  BorderRadius: '--uilib-editor-border-radius',
  FocusRingColor: '--uilib-editor-focus-ring-color',
  FocusRingWidth: '--uilib-editor-focus-ring-width',
  DisabledOpacity: '--uilib-editor-disabled-opacity',
} as const;

export const EDITOR_TOOLBAR_ARIA_LABELS: {
  readonly heading: 'Heading level';
  readonly bold: 'Bold';
  readonly italic: 'Italic';
  readonly underline: 'Underline';
  readonly strikeThrough: 'Strikethrough';
  readonly textColor: 'Text color';
  readonly backgroundColor: 'Background color';
  readonly orderedList: 'Ordered list';
  readonly unorderedList: 'Unordered list';
  readonly alignLeft: 'Align left';
  readonly alignCenter: 'Align center';
  readonly alignRight: 'Align right';
  readonly alignJustify: 'Justify';
  readonly createLink: 'Insert link';
  readonly unlink: 'Remove link';
  readonly insertImage: 'Insert image';
  readonly codeBlock: 'Insert code block';
  readonly removeFormat: 'Remove formatting';
} = {
  heading: 'Heading level',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikeThrough: 'Strikethrough',
  textColor: 'Text color',
  backgroundColor: 'Background color',
  orderedList: 'Ordered list',
  unorderedList: 'Unordered list',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  alignJustify: 'Justify',
  createLink: 'Insert link',
  unlink: 'Remove link',
  insertImage: 'Insert image',
  codeBlock: 'Insert code block',
  removeFormat: 'Remove formatting',
} as const;

export const DANGEROUS_TAGS: readonly string[] = [
  'script',
  'iframe',
  'object',
  'embed',
  'form',
  'input',
  'textarea',
  'select',
  'button',
  'style',
  'link',
  'meta',
] as const;

export const DANGEROUS_ATTRIBUTES: readonly string[] = [
  'on',
  'style',
  'class',
  'srcdoc',
  'formaction',
] as const;
