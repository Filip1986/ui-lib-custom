/** Default values used by InputMask APIs and engine integration. */
export const INPUT_MASK_DEFAULTS: Readonly<{
  slotChar: '_';
  autoClear: true;
  keepBuffer: false;
  unmask: false;
  showClear: false;
  type: 'text';
  characterPattern: '[A-Za-z]';
}> = {
  slotChar: '_',
  autoClear: true,
  keepBuffer: false,
  unmask: false,
  showClear: false,
  type: 'text',
  characterPattern: '[A-Za-z]',
} as const;

/** Supported size variants for InputMask. */
export type InputMaskSize = 'sm' | 'md' | 'lg';

/** Maps mask definition tokens to regex-source strings. */
export type MaskDefinitions = Record<string, string>;

/** Represents one parsed mask position. */
export type MaskTestEntry = {
  /** Regex for editable positions; null for literal positions. */
  regex: RegExp | null;
  /** True when the position is a literal, false when editable. */
  literal: boolean;
  /** Source mask character for this position. */
  char: string;
};

/** Caret range for selection-aware input handling. */
export interface Caret {
  /** Selection start index. */
  begin: number;
  /** Selection end index. */
  end: number;
}

/** Payload emitted when mask entry reaches completion. */
export interface InputMaskCompleteEvent {
  /** Browser event that completed the mask. */
  originalEvent: Event;
  /** Current model value at completion time. */
  value: string;
}
