/** Supported design variants for ConfirmDialog. */
export type ConfirmDialogVariant = 'material' | 'bootstrap' | 'minimal';

/** Supported button severity levels for accept/reject actions. */
export type ConfirmDialogButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

/** Supported viewport positions for the dialog. */
export type ConfirmDialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

/** Which button receives initial keyboard focus when the dialog opens. */
export type ConfirmDialogDefaultFocus = 'accept' | 'reject' | 'none';

/** Configuration object passed to ConfirmationService.confirm(). */
export interface ConfirmationConfig {
  /** Targets a specific ConfirmDialog by key when multiple dialogs exist on the page. */
  key?: string;
  /** Dialog header / title text. */
  header?: string;
  /** Confirmation message displayed in the dialog body. */
  message?: string;
  /** CSS class for the icon rendered before the message (e.g. "pi pi-exclamation-triangle"). */
  icon?: string;
  /** Label for the accept (confirm) button. */
  acceptLabel?: string;
  /** Label for the reject (cancel) button. */
  rejectLabel?: string;
  /** CSS class for an icon inside the accept button. */
  acceptIcon?: string | null;
  /** CSS class for an icon inside the reject button. */
  rejectIcon?: string | null;
  /** Visual severity applied to the accept button. */
  acceptSeverity?: ConfirmDialogButtonSeverity;
  /** Visual severity applied to the reject button. */
  rejectSeverity?: ConfirmDialogButtonSeverity;
  /** Whether the close (×) button is rendered in the header. */
  closable?: boolean;
  /** Whether clicking the backdrop closes the dialog (triggering reject). */
  dismissableMask?: boolean;
  /** Whether body scroll is locked while the dialog is open. */
  blockScroll?: boolean;
  /** Viewport position of the dialog panel. */
  position?: ConfirmDialogPosition;
  /** Which button receives focus when the dialog first opens. */
  defaultFocus?: ConfirmDialogDefaultFocus;
  /** Callback invoked when the user clicks the accept button. */
  accept?: () => void;
  /** Callback invoked when the user clicks the reject button or closes the dialog. */
  reject?: () => void;
}
