import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  ModelSignal,
  OnDestroy,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { ConfirmationService } from './confirm-dialog.service';
import type {
  ConfirmationConfig,
  ConfirmDialogButtonSeverity,
  ConfirmDialogDefaultFocus,
  ConfirmDialogPosition,
  ConfirmDialogVariant,
} from './confirm-dialog.types';

/**
 * ConfirmDialog — a modal confirmation overlay with configurable accept/reject actions.
 *
 * Can be driven declaratively via inputs/outputs or programmatically via ConfirmationService.
 * Place `<ui-lib-confirm-dialog>` once in your layout; trigger it from any component using
 * `ConfirmationService.confirm({ ... })`.
 *
 * @example
 * <!-- In template -->
 * <ui-lib-confirm-dialog />
 *
 * <!-- In component -->
 * this.confirmationService.confirm({
 *   header: 'Confirm Delete',
 *   message: 'This action cannot be undone.',
 *   accept: () => this.delete(),
 * });
 */
@Component({
  selector: 'ui-lib-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmDialog implements OnDestroy {
  private static nextId: number = 0;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly injector: Injector = inject(Injector);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  private focusTrap: FocusTrap | null = null;
  private readonly previousBodyOverflow: WritableSignal<string | null> = signal<string | null>(
    null
  );
  private lastVisible: boolean = false;

  private readonly serviceConfig: WritableSignal<ConfirmationConfig | null> =
    signal<ConfirmationConfig | null>(null);
  private readonly acceptCallback: WritableSignal<(() => void) | null> = signal<
    (() => void) | null
  >(null);
  private readonly rejectCallback: WritableSignal<(() => void) | null> = signal<
    (() => void) | null
  >(null);

  private readonly componentId: string = this.generateId();

  /** ID used for aria-labelledby on the panel. */
  public readonly headerId: string = `${this.componentId}-header`;
  /** ID used for aria-describedby on the panel. */
  public readonly messageId: string = `${this.componentId}-message`;

  // ---- Inputs ----

  /** Two-way visibility binding. Use `[(visible)]` for declarative control. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);

  /** Key that matches incoming ConfirmationService calls to this specific dialog instance. */
  public readonly key: InputSignal<string> = input<string>('');

  /** Dialog header / title text (declarative fallback). */
  public readonly header: InputSignal<string> = input<string>('Confirmation');

  /** Confirmation message text (declarative fallback). */
  public readonly message: InputSignal<string> = input<string>('Are you sure you want to proceed?');

  /** CSS class for the icon rendered before the message. */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);

  /** Accept button label. */
  public readonly acceptLabel: InputSignal<string> = input<string>('Yes');

  /** Reject button label. */
  public readonly rejectLabel: InputSignal<string> = input<string>('No');

  /** CSS class for an icon inside the accept button. */
  public readonly acceptIcon: InputSignal<string | null> = input<string | null>(null);

  /** CSS class for an icon inside the reject button. */
  public readonly rejectIcon: InputSignal<string | null> = input<string | null>(null);

  /** Visual severity applied to the accept button. */
  public readonly acceptSeverity: InputSignal<ConfirmDialogButtonSeverity> =
    input<ConfirmDialogButtonSeverity>('primary');

  /** Visual severity applied to the reject button. */
  public readonly rejectSeverity: InputSignal<ConfirmDialogButtonSeverity> =
    input<ConfirmDialogButtonSeverity>('secondary');

  /** Whether the close (×) button is rendered in the header. */
  public readonly closable: InputSignal<boolean> = input<boolean>(true);

  /** Whether clicking the backdrop closes the dialog (invoking reject). */
  public readonly dismissableMask: InputSignal<boolean> = input<boolean>(false);

  /** Whether body scroll is locked while the dialog is open. */
  public readonly blockScroll: InputSignal<boolean> = input<boolean>(true);

  /** Viewport position of the dialog panel. */
  public readonly position: InputSignal<ConfirmDialogPosition> =
    input<ConfirmDialogPosition>('center');

  /** Which button receives initial focus when the dialog opens. */
  public readonly defaultFocus: InputSignal<ConfirmDialogDefaultFocus> =
    input<ConfirmDialogDefaultFocus>('accept');

  /** Design variant override; inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ConfirmDialogVariant | null> =
    input<ConfirmDialogVariant | null>(null);

  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---- Outputs ----

  /** Emitted when the user clicks the accept button. */
  public readonly accepted: OutputEmitterRef<void> = output<void>();

  /** Emitted when the user clicks the reject button or closes the dialog. */
  public readonly rejected: OutputEmitterRef<void> = output<void>();

  // ---- Computed resolved values (service config takes precedence over direct inputs) ----

  /** Resolved header — service config wins over the `header` input. */
  public readonly resolvedHeader: Signal<string> = computed<string>(
    (): string => this.serviceConfig()?.header ?? this.header()
  );

  /** Resolved message — service config wins over the `message` input. */
  public readonly resolvedMessage: Signal<string> = computed<string>(
    (): string => this.serviceConfig()?.message ?? this.message()
  );

  /** Resolved icon — service config wins over the `icon` input. */
  public readonly resolvedIcon: Signal<string | null> = computed<string | null>(
    (): string | null => this.serviceConfig()?.icon ?? this.icon()
  );

  /** Resolved accept label. */
  public readonly resolvedAcceptLabel: Signal<string> = computed<string>(
    (): string => this.serviceConfig()?.acceptLabel ?? this.acceptLabel()
  );

  /** Resolved reject label. */
  public readonly resolvedRejectLabel: Signal<string> = computed<string>(
    (): string => this.serviceConfig()?.rejectLabel ?? this.rejectLabel()
  );

  /** Resolved accept icon. */
  public readonly resolvedAcceptIcon: Signal<string | null> = computed<string | null>(
    (): string | null => this.serviceConfig()?.acceptIcon ?? this.acceptIcon()
  );

  /** Resolved reject icon. */
  public readonly resolvedRejectIcon: Signal<string | null> = computed<string | null>(
    (): string | null => this.serviceConfig()?.rejectIcon ?? this.rejectIcon()
  );

  /** Resolved accept button severity. */
  public readonly resolvedAcceptSeverity: Signal<ConfirmDialogButtonSeverity> =
    computed<ConfirmDialogButtonSeverity>(
      (): ConfirmDialogButtonSeverity =>
        this.serviceConfig()?.acceptSeverity ?? this.acceptSeverity()
    );

  /** Resolved reject button severity. */
  public readonly resolvedRejectSeverity: Signal<ConfirmDialogButtonSeverity> =
    computed<ConfirmDialogButtonSeverity>(
      (): ConfirmDialogButtonSeverity =>
        this.serviceConfig()?.rejectSeverity ?? this.rejectSeverity()
    );

  /** Resolved closable flag. */
  public readonly resolvedClosable: Signal<boolean> = computed<boolean>(
    (): boolean => this.serviceConfig()?.closable ?? this.closable()
  );

  /** Resolved dismissableMask flag. */
  public readonly resolvedDismissableMask: Signal<boolean> = computed<boolean>(
    (): boolean => this.serviceConfig()?.dismissableMask ?? this.dismissableMask()
  );

  /** Resolved position. */
  public readonly resolvedPosition: Signal<ConfirmDialogPosition> = computed<ConfirmDialogPosition>(
    (): ConfirmDialogPosition => this.serviceConfig()?.position ?? this.position()
  );

  /** Resolved defaultFocus. */
  public readonly resolvedDefaultFocus: Signal<ConfirmDialogDefaultFocus> =
    computed<ConfirmDialogDefaultFocus>(
      (): ConfirmDialogDefaultFocus => this.serviceConfig()?.defaultFocus ?? this.defaultFocus()
    );

  /** Resolved blockScroll flag. */
  public readonly resolvedBlockScroll: Signal<boolean> = computed<boolean>(
    (): boolean => this.serviceConfig()?.blockScroll ?? this.blockScroll()
  );

  /** Effective variant — falls back to ThemeConfigService. */
  public readonly effectiveVariant: Signal<ConfirmDialogVariant> = computed<ConfirmDialogVariant>(
    (): ConfirmDialogVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Host CSS classes for the overlay container. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-confirm-dialog',
      `ui-lib-confirm-dialog--${this.resolvedPosition()}`,
    ];

    if (this.visible()) {
      classes.push('ui-lib-confirm-dialog--visible');
    }

    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });

  /** Panel CSS classes combining base, variant, and state modifiers. */
  public readonly panelClasses: Signal<string> = computed<string>((): string =>
    [
      'ui-lib-confirm-dialog__panel',
      `ui-lib-confirm-dialog--variant-${this.effectiveVariant()}`,
    ].join(' ')
  );

  /** Accept button CSS classes combining base and severity modifier. */
  public readonly acceptBtnClasses: Signal<string> = computed<string>(
    (): string =>
      `ui-lib-confirm-dialog__accept-btn ui-lib-confirm-dialog__btn--${this.resolvedAcceptSeverity()}`
  );

  /** Reject button CSS classes combining base and severity modifier. */
  public readonly rejectBtnClasses: Signal<string> = computed<string>(
    (): string =>
      `ui-lib-confirm-dialog__reject-btn ui-lib-confirm-dialog__btn--${this.resolvedRejectSeverity()}`
  );

  constructor() {
    this.lastVisible = this.visible();

    // Sync ConfirmationService state into this component instance.
    effect((): void => {
      const config: ConfirmationConfig | null = this.confirmationService.confirmation();
      const componentKey: string = this.key();

      if (!config) {
        // Only close if this dialog was opened via the service (not declaratively).
        if (this.visible() && this.serviceConfig() !== null) {
          this.clearServiceState();
          this.visible.set(false);
        }
        return;
      }

      const configKey: string = config.key ?? '';

      // Key matching: component with a key only accepts configs with that key.
      // Component without a key only accepts configs without a key.
      if (componentKey && configKey !== componentKey) {
        return;
      }
      if (!componentKey && configKey) {
        return;
      }

      this.serviceConfig.set(config);
      this.acceptCallback.set(config.accept ?? null);
      this.rejectCallback.set(config.reject ?? null);
      this.visible.set(true);
    });

    // Visibility side effects: scroll lock + focus trap.
    effect((): void => {
      const isVisible: boolean = this.visible();
      if (isVisible === this.lastVisible) {
        return;
      }
      this.lastVisible = isVisible;

      if (isVisible) {
        this.applyScrollLock();
        afterNextRender(
          (): void => {
            if (this.visible()) {
              this.activateFocusTrap();
              this.focusDefaultButton();
            }
          },
          { injector: this.injector }
        );
      } else {
        this.releaseScrollLock();
        this.deactivateFocusTrap();
      }
    });
  }

  public ngOnDestroy(): void {
    this.releaseScrollLock();
    this.deactivateFocusTrap();
  }

  /** Handle backdrop clicks — rejects and closes when dismissableMask is enabled. */
  public onBackdropClick(): void {
    if (this.resolvedDismissableMask()) {
      this.handleReject();
    }
  }

  /** Handle keydown on the panel — closes on Escape. */
  public onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Escape) {
      event.preventDefault();
      event.stopPropagation();
      this.handleReject();
    }
  }

  /** Accept the confirmation: emit, invoke callback, then close. */
  public handleAccept(): void {
    const callback: (() => void) | null = this.acceptCallback();
    this.accepted.emit();
    callback?.();
    this.close();
  }

  /** Reject the confirmation: emit, invoke callback, then close. */
  public handleReject(): void {
    const callback: (() => void) | null = this.rejectCallback();
    this.rejected.emit();
    callback?.();
    this.close();
  }

  /** Close the dialog without invoking accept or reject callbacks. */
  public close(): void {
    this.clearServiceState();
    this.visible.set(false);
    this.confirmationService.close(this.key() || undefined);
  }

  private clearServiceState(): void {
    this.acceptCallback.set(null);
    this.rejectCallback.set(null);
    this.serviceConfig.set(null);
  }

  private activateFocusTrap(): void {
    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-confirm-dialog__panel'
    );
    if (!panel) {
      return;
    }
    this.deactivateFocusTrap();
    this.focusTrap = new FocusTrap(panel);
    this.focusTrap.activate();
  }

  private deactivateFocusTrap(): void {
    this.focusTrap?.deactivate();
    this.focusTrap = null;
  }

  private focusDefaultButton(): void {
    const focus: ConfirmDialogDefaultFocus = this.resolvedDefaultFocus();
    if (focus === 'none') {
      return;
    }

    const selector: string =
      focus === 'accept'
        ? '.ui-lib-confirm-dialog__accept-btn'
        : '.ui-lib-confirm-dialog__reject-btn';

    const button: HTMLElement | null =
      this.elementRef.nativeElement.querySelector<HTMLElement>(selector);
    button?.focus();
  }

  private applyScrollLock(): void {
    if (!this.resolvedBlockScroll()) {
      return;
    }
    const body: HTMLElement = this.document.body;
    this.previousBodyOverflow.set(body.style.overflow);
    body.style.overflow = 'hidden';
  }

  private releaseScrollLock(): void {
    if (!this.resolvedBlockScroll()) {
      return;
    }
    const body: HTMLElement = this.document.body;
    body.style.overflow = this.previousBodyOverflow() ?? '';
    this.previousBodyOverflow.set(null);
  }

  private generateId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `ui-lib-confirm-dialog-${globalThis.crypto.randomUUID()}`;
    }
    ConfirmDialog.nextId += 1;
    return `ui-lib-confirm-dialog-${ConfirmDialog.nextId}`;
  }
}
