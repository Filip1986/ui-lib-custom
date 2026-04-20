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

export function splitButtonId(counter: number): string {
  return `ui-lib-split-button-${counter}`;
}
