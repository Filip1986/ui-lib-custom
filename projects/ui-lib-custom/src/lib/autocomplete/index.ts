import { UiLibAutoComplete } from './autocomplete';

export { UiLibAutoComplete };
export const AutoComplete: typeof UiLibAutoComplete = UiLibAutoComplete;

export type {
  AutoCompleteVariant,
  AutoCompleteSize,
  AutoCompleteDropdownMode,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
  AutoCompleteUnselectEvent,
  AutoCompleteDropdownClickEvent,
  AutoCompleteOptionGroup,
} from './autocomplete.types';
export * from './autocomplete.template-directives';
