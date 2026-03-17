import { SHARED_DEFAULTS } from 'ui-lib-custom/core';

export const CASCADE_SELECT_DEFAULTS: {
  readonly Placeholder: '';
  readonly Size: 'sm' | 'md' | 'lg';
} = {
  Placeholder: '',
  Size: SHARED_DEFAULTS.Size,
} as const;

export const CASCADE_SELECT_IDS: {
  readonly Prefix: 'ui-lib-cascade-select';
} = {
  Prefix: 'ui-lib-cascade-select',
} as const;

export const CASCADE_SELECT_CLASSNAMES: {
  readonly Root: 'ui-lib-cascade-select';
  readonly Disabled: 'ui-lib-cascade-select--disabled';
  readonly Invalid: 'ui-lib-cascade-select--invalid';
  readonly Loading: 'ui-lib-cascade-select--loading';
  readonly Fluid: 'ui-lib-cascade-select--fluid';
  readonly Filled: 'ui-lib-cascade-select--filled';
  readonly Open: 'ui-lib-cascade-select--open';
} = {
  Root: 'ui-lib-cascade-select',
  Disabled: 'ui-lib-cascade-select--disabled',
  Invalid: 'ui-lib-cascade-select--invalid',
  Loading: 'ui-lib-cascade-select--loading',
  Fluid: 'ui-lib-cascade-select--fluid',
  Filled: 'ui-lib-cascade-select--filled',
  Open: 'ui-lib-cascade-select--open',
} as const;
