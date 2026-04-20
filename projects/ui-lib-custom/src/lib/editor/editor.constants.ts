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
