/** Event emitted when the editor's content changes. */
export interface EditorTextChangeEvent {
  /** Current value as HTML string. */
  readonly htmlValue: string;
  /** Current value as plain text. */
  readonly textValue: string;
  /** The native InputEvent if available, null for programmatic changes. */
  readonly originalEvent: Event | null;
}

/** Event emitted when the text selection changes. */
export interface EditorSelectionChangeEvent {
  /** The current Selection object. */
  readonly selection: Selection | null;
  /** The native Event. */
  readonly originalEvent: Event;
}

/** Represents the active formatting state of the current selection. */
export interface EditorToolbarState {
  readonly bold: boolean;
  readonly italic: boolean;
  readonly underline: boolean;
  readonly strikeThrough: boolean;
  readonly orderedList: boolean;
  readonly unorderedList: boolean;
  readonly alignLeft: boolean;
  readonly alignCenter: boolean;
  readonly alignRight: boolean;
  readonly alignJustify: boolean;
  /** Current block format value (`p`, `h1`, `h2`, `h3`, `pre`, etc.). */
  readonly blockFormat: string;
}

/**
 * Supported formatting commands that can be passed to `executeCommand()`.
 * Maps to `document.execCommand()` command names.
 */
export type EditorCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'insertOrderedList'
  | 'insertUnorderedList'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'justifyFull'
  | 'formatBlock'
  | 'createLink'
  | 'unlink'
  | 'insertImage'
  | 'removeFormat'
  | 'foreColor'
  | 'backColor'
  | 'insertHTML';
