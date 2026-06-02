import { UiLibAutoComplete } from './autocomplete';

export { UiLibAutoComplete };
export const AutoComplete: typeof UiLibAutoComplete = UiLibAutoComplete;

export * from './autocomplete.template-directives';
export type {
  AutoCompleteCompleteEvent,
  AutoCompleteDropdownClickEvent,
  AutoCompleteDropdownMode,
  AutoCompleteGroupContext,
  AutoCompleteItemContext,
  AutoCompleteOptionGroup,
  AutoCompleteSelectedItemContext,
  AutoCompleteSelectEvent,
  AutoCompleteSize,
  AutoCompleteUnselectEvent,
  AutoCompleteVariant,
} from './autocomplete.types';
