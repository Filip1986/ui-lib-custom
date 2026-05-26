import { UiLibCascadeSelect } from './cascade-select';

export { UiLibCascadeSelect };
export const CascadeSelect: typeof UiLibCascadeSelect = UiLibCascadeSelect;

export type {
  CascadeSelectVariant,
  CascadeSelectSize,
  CascadeSelectChangeEvent,
  CascadeSelectShowEvent,
  CascadeSelectHideEvent,
  CascadeSelectGroupChangeEvent,
  CascadeSelectOptionContext,
  CascadeSelectValueContext,
  CascadeSelectOptionGroupIconContext,
} from './cascade-select.types';

export * from './cascade-select.constants';
export * from './directives/cascade-select-templates.directive';
