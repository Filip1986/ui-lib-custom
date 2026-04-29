/** Design variant for the textarea -- maps to the active global theme when null. */
export type TextareaVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token controlling padding and font size. */
export type TextareaSize = 'sm' | 'md' | 'lg';

/** CSS resize behaviour exposed on the host textarea element. */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';

/** Default values used across the Textarea component. */
export const TEXTAREA_DEFAULTS: Readonly<{
  size: TextareaSize;
  resize: TextareaResize;
  rows: number;
  cols: number | null;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  autoResize: boolean;
  showCounter: boolean;
  maxLength: number | null;
  placeholder: string;
  variant: TextareaVariant | null;
}> = {
  size: 'md',
  resize: 'vertical',
  rows: 3,
  cols: null,
  disabled: false,
  readonly: false,
  required: false,
  autoResize: false,
  showCounter: false,
  maxLength: null,
  placeholder: '',
  variant: null,
} as const;
