/** Severity level of a toast notification. */
export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

/** Screen position of the toast container. */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

/** Visual design variant — maps to the library theming system. */
export type ToastVariant = 'material' | 'bootstrap' | 'minimal';

/** A single toast notification message. */
export interface ToastMessage {
  /** Unique identifier — auto-generated when omitted. */
  id?: string;
  /** Optional key to target a specific Toast container instance. */
  key?: string;
  /** Severity level — controls colour palette and default icon. */
  severity?: ToastSeverity;
  /** Bold summary headline shown above the detail text. */
  summary?: string;
  /** Body text for the notification. */
  detail?: string;
  /** Auto-dismiss duration in milliseconds. Defaults to the container life input. */
  life?: number;
  /** When true the toast never auto-dismisses. */
  sticky?: boolean;
  /** When false the close button is hidden. Defaults to true. */
  closable?: boolean;
  /** Custom icon name — overrides the default severity icon. */
  icon?: string;
  /** Additional CSS class(es) to attach to the item element. */
  styleClass?: string;
}
