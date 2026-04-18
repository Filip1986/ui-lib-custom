import type {
  SplitButtonSeverity,
  SplitButtonSize,
  SplitButtonVariant,
} from './split-button.types';

export const SPLIT_BUTTON_DEFAULTS: Readonly<{
  severity: SplitButtonSeverity;
  size: SplitButtonSize;
  variant: SplitButtonVariant;
  icon: string;
  dropdownIcon: string;
  disabled: boolean;
  buttonDisabled: boolean;
  menuButtonDisabled: boolean;
  raised: boolean;
  rounded: boolean;
  text: boolean;
  outlined: boolean;
}> = {
  severity: 'primary',
  size: 'md',
  variant: 'material',
  icon: 'plus',
  dropdownIcon: 'chevron-down',
  disabled: false,
  buttonDisabled: false,
  menuButtonDisabled: false,
  raised: false,
  rounded: false,
  text: false,
  outlined: false,
} as const;

export const SPLIT_BUTTON_CLASSNAMES: Readonly<{
  Host: 'ui-lib-split-button';
  MainButton: 'ui-lib-split-button__main';
  MenuButton: 'ui-lib-split-button__menu';
  Panel: 'ui-lib-split-button__panel';
  List: 'ui-lib-split-button__list';
  Item: 'ui-lib-split-button__item';
  Separator: 'ui-lib-split-button__separator';
  ActiveItem: 'ui-lib-split-button__item--active';
  DisabledItem: 'ui-lib-split-button__item--disabled';
}> = {
  Host: 'ui-lib-split-button',
  MainButton: 'ui-lib-split-button__main',
  MenuButton: 'ui-lib-split-button__menu',
  Panel: 'ui-lib-split-button__panel',
  List: 'ui-lib-split-button__list',
  Item: 'ui-lib-split-button__item',
  Separator: 'ui-lib-split-button__separator',
  ActiveItem: 'ui-lib-split-button__item--active',
  DisabledItem: 'ui-lib-split-button__item--disabled',
} as const;

export function splitButtonId(counter: number): string {
  return `ui-lib-split-button-${counter}`;
}
