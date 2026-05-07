/** Supported design variants for ConfirmPopup. */
export type ConfirmPopupVariant = 'material' | 'bootstrap' | 'minimal';

/** Supported button severity levels for accept/reject actions. */
export type ConfirmPopupButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

/** Which button receives initial keyboard focus when the popup opens. */
export type ConfirmPopupDefaultFocus = 'accept' | 'reject' | 'none';

/** Vertical placement of the popup relative to the target element. */
export type ConfirmPopupPlacement = 'above' | 'below';

/** Configuration object passed to ConfirmPopupService.confirm(). */
export interface ConfirmPopupConfig {
  /** Targets a specific ConfirmPopup by key when multiple exist on the page. */
  key?: string;
  /** The DOM element that triggered the popup — used for anchoring. */
  target?: HTMLElement | EventTarget | null;
  /** Confirmation message displayed in the popup body. */
  message?: string;
  /** CSS class for the icon rendered before the message. */
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
  acceptSeverity?: ConfirmPopupButtonSeverity;
  /** Visual severity applied to the reject button. */
  rejectSeverity?: ConfirmPopupButtonSeverity;
  /** Which button receives focus when the popup first opens. */
  defaultFocus?: ConfirmPopupDefaultFocus;
  /** Callback invoked when the user clicks the accept button. */
  accept?: () => void;
  /** Callback invoked when the user clicks the reject button or dismisses the popup. */
  reject?: () => void;
}
