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
