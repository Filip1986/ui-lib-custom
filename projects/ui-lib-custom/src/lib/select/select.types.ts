export type SelectVariant = 'material' | 'bootstrap' | 'minimal';
export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectValueObject = Record<string, string | number | boolean | null>;
export type SelectValue = string | number | boolean | null | SelectValueObject;
export type SelectCvaValue = SelectValue | SelectValue[] | null;

export interface SelectOption {
  label: string;
  value: SelectValue;
  group?: string;
  disabled?: boolean;
}

/** Template context passed to `#optionTemplate` content children. */
export interface SelectOptionTemplateContext {
  /** The option object itself. */
  $implicit: SelectOption;
  /** Zero-based index of the option in the filtered list. */
  index: number;
  /** Whether the option is currently selected. */
  selected: boolean;
  /** Whether the option is disabled. */
  disabled: boolean;
  /** Whether the option has keyboard focus (active descendant). */
  active: boolean;
}
