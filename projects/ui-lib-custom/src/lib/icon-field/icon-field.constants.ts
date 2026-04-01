import { type IconPosition } from './icon-field.types';

export const ICON_FIELD_DEFAULTS: {
  readonly iconPosition: IconPosition;
} = {
  iconPosition: 'right' as const,
} as const;

export const ICON_FIELD_CLASSES: {
  readonly IconField: 'ui-lib-icon-field';
  readonly IconFieldLeft: 'ui-lib-icon-field--left';
  readonly IconFieldRight: 'ui-lib-icon-field--right';
  readonly InputIcon: 'ui-lib-input-icon';
} = {
  IconField: 'ui-lib-icon-field',
  IconFieldLeft: 'ui-lib-icon-field--left',
  IconFieldRight: 'ui-lib-icon-field--right',
  InputIcon: 'ui-lib-input-icon',
} as const;
