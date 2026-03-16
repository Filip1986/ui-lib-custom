import type { DialogPosition } from './dialog.types';

/**
 * Internal default values for Dialog component inputs.
 */
export const DIALOG_DEFAULTS: {
  readonly Visible: false;
  readonly Header: '';
  readonly Modal: false;
  readonly Closable: true;
  readonly CloseOnEscape: true;
  readonly DismissableMask: false;
  readonly Draggable: false;
  readonly Maximizable: false;
  readonly BlockScroll: true;
  readonly Position: DialogPosition;
  readonly Breakpoints: Readonly<Record<string, string>>;
  readonly Headless: false;
} = {
  Visible: false,
  Header: '',
  Modal: false,
  Closable: true,
  CloseOnEscape: true,
  DismissableMask: false,
  Draggable: false,
  Maximizable: false,
  BlockScroll: true,
  Position: 'center',
  Breakpoints: {},
  Headless: false,
} as const;

/**
 * Maps a dialog position to the corresponding host class.
 */
export const DIALOG_POSITION_CLASS_MAP: Readonly<Record<DialogPosition, string>> = {
  center: 'ui-lib-dialog--position-center',
  top: 'ui-lib-dialog--position-top',
  bottom: 'ui-lib-dialog--position-bottom',
  left: 'ui-lib-dialog--position-left',
  right: 'ui-lib-dialog--position-right',
  'top-left': 'ui-lib-dialog--position-top-left',
  'top-right': 'ui-lib-dialog--position-top-right',
  'bottom-left': 'ui-lib-dialog--position-bottom-left',
  'bottom-right': 'ui-lib-dialog--position-bottom-right',
} as const;
