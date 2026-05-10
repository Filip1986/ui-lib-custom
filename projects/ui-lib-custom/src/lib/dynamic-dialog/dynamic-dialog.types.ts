import { InjectionToken } from '@angular/core';

/** Supported design variants for DynamicDialog. */
export type DynamicDialogVariant = 'material' | 'bootstrap' | 'minimal';

/** Viewport anchor position for the dialog panel. */
export type DynamicDialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

/**
 * Configuration object passed to DialogService.open().
 * All fields are optional; defaults are applied by the service.
 */
export interface DynamicDialogConfig {
  /** Dialog header / title text. */
  header?: string;
  /** CSS width value for the dialog panel (e.g. "40rem", "600px"). */
  width?: string;
  /** CSS height value for the dialog panel (e.g. "80vh"). */
  height?: string;
  /** Whether a semi-transparent backdrop is rendered. Default: true. */
  modal?: boolean;
  /** Whether the × close button is shown in the header. Default: true. */
  closable?: boolean;
  /** Whether clicking the backdrop closes the dialog. Default: false. */
  dismissableMask?: boolean;
  /** Whether body scroll is locked while the dialog is open. Default: true. */
  blockScroll?: boolean;
  /** Additional CSS class(es) applied to the host element. */
  styleClass?: string | null;
  /** Arbitrary data passed to the dynamically-loaded component via DYNAMIC_DIALOG_CONFIG. */
  data?: unknown;
  /** Design variant override; falls back to ThemeConfigService when not set. */
  variant?: DynamicDialogVariant | null;
  /** Viewport anchor position of the dialog panel. Default: 'center'. */
  position?: DynamicDialogPosition;
  /**
   * Accessible label for the dialog panel used when no visible header text is rendered.
   * When `header` is provided this is ignored (aria-labelledby takes precedence).
   * Defaults to 'Dialog' when neither `header` nor `ariaLabel` are provided.
   */
  ariaLabel?: string;
  /**
   * ID of an element that describes the dialog purpose (maps to aria-describedby).
   * The referenced element must exist in the DOM when the dialog is open.
   */
  ariaDescribedby?: string;
}

/** Injection token used by guest components to read DynamicDialogConfig. */
export const DYNAMIC_DIALOG_CONFIG: InjectionToken<DynamicDialogConfig> =
  new InjectionToken<DynamicDialogConfig>('DYNAMIC_DIALOG_CONFIG');
