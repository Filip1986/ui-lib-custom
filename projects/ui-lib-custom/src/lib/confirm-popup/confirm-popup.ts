import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { DOCUMENT } from '@angular/common';
import { FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { ConfirmPopupService } from './confirm-popup.service';
import type {
  ConfirmPopupButtonSeverity,
  ConfirmPopupConfig,
  ConfirmPopupDefaultFocus,
  ConfirmPopupPlacement,
  ConfirmPopupVariant,
} from './confirm-popup.types';

// Module-level fallback counter for environments without crypto.randomUUID().
let nextConfirmPopupId: number = 0;

/**
 * ConfirmPopup — a lightweight anchored confirmation popup with accept/reject actions.
 *
 * Unlike ConfirmDialog, ConfirmPopup has no modal backdrop and anchors near the element
 * that triggered it, with an arrow pointing at that element. Drive it programmatically via
 * ConfirmPopupService or declaratively via inputs/outputs.
 *
 * @example
 * <!-- In template — place once in your layout -->
 * <ui-lib-confirm-popup />
 *
 * <!-- In component — trigger from a button click -->
 * onDeleteClick(event: MouseEvent): void {
 *   this.confirmPopupService.confirm({
 *     target: event.currentTarget as HTMLElement,
 *     message: 'Are you sure?',
 *     accept: () => this.delete(),
 *   });
 * }
 */
@Component({
  selector: 'ui-lib-confirm-popup',
  standalone: true,
  templateUrl: './confirm-popup.html',
  styleUrl: './confirm-popup.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmPopup implements OnDestroy {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly injector: Injector = inject(Injector);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document: Document = inject(DOCUMENT);

  private focusTrap: FocusTrap | null = null;
  private lastVisible: boolean = false;
  private previousFocusEl: HTMLElement | null = null;

  private readonly serviceConfig: WritableSignal<ConfirmPopupConfig | null> =
    signal<ConfirmPopupConfig | null>(null);
  private readonly acceptCallback: WritableSignal<(() => void) | null> = signal<
    (() => void) | null
  >(null);
  private readonly rejectCallback: WritableSignal<(() => void) | null> = signal<
    (() => void) | null
  >(null);
  private readonly targetElement: WritableSignal<HTMLElement | null> = signal<HTMLElement | null>(
    null,
  );

  private readonly componentId: string = this.generateId();

  /** ID used for aria-describedby on the panel. */
  public readonly messageId: string = `${this.componentId}-message`;

  /** Computed top position (px) for the popup panel. */
  public readonly panelTop: WritableSignal<number> = signal<number>(-9999);
  /** Computed left position (px) for the popup panel. */
  public readonly panelLeft: WritableSignal<number> = signal<number>(-9999);
  /** Horizontal arrow offset (px) relative to the panel's left edge. */
  public readonly arrowLeftOffset: WritableSignal<number> = signal<number>(16);
  /** Whether the popup is placed above or below the target element. */
  public readonly placement: WritableSignal<ConfirmPopupPlacement> =
    signal<ConfirmPopupPlacement>('above');
  /** True once position has been computed and the panel should be visible. */
  public readonly positionReady: WritableSignal<boolean> = signal<boolean>(false);

  // ---- Inputs ----

  /** Two-way visibility binding. Use `[(visible)]` for declarative control. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);

  /** Key that matches incoming ConfirmPopupService calls to this specific instance. */
  public readonly key: InputSignal<string> = input<string>('');

  /** Confirmation message text (declarative fallback); uses i18n default when null. */
  public readonly message: InputSignal<string | null> = input<string | null>(null);

  /** CSS class for the icon rendered before the message. */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);

  /** Accept button label; uses i18n default when null. */
  public readonly acceptLabel: InputSignal<string | null> = input<string | null>(null);

  /** Reject button label; uses i18n default when null. */
  public readonly rejectLabel: InputSignal<string | null> = input<string | null>(null);

  /** CSS class for an icon inside the accept button. */
  public readonly acceptIcon: InputSignal<string | null> = input<string | null>(null);

  /** CSS class for an icon inside the reject button. */
  public readonly rejectIcon: InputSignal<string | null> = input<string | null>(null);

  /** Visual severity applied to the accept button. */
  public readonly acceptSeverity: InputSignal<ConfirmPopupButtonSeverity> =
    input<ConfirmPopupButtonSeverity>('primary');

  /** Visual severity applied to the reject button. */
  public readonly rejectSeverity: InputSignal<ConfirmPopupButtonSeverity> =
    input<ConfirmPopupButtonSeverity>('secondary');

  /** Which button receives initial focus when the popup opens. */
  public readonly defaultFocus: InputSignal<ConfirmPopupDefaultFocus> =
    input<ConfirmPopupDefaultFocus>('accept');

  /** Design variant override; inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ConfirmPopupVariant | null> =
    input<ConfirmPopupVariant | null>(null);

  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---- Outputs ----

  /** Emitted when the user clicks the accept button. */
  public readonly accepted: OutputEmitterRef<void> = output<void>();

  /** Emitted when the user clicks the reject button or dismisses the popup. */
  public readonly rejected: OutputEmitterRef<void> = output<void>();

  // ---- Computed resolved values (service config takes precedence over direct inputs) ----

  /** Resolved message — service config wins, then the `message` input, then i18n default. */
  public readonly resolvedMessage: Signal<string> = computed<string>(
    (): string =>
      this.serviceConfig()?.message ??
      this.message() ??
      this.i18n.translate('confirm-popup.message'),
  );

  /** Resolved icon — service config wins over the `icon` input. */
  public readonly resolvedIcon: Signal<string | null> = computed<string | null>(
    (): string | null => this.serviceConfig()?.icon ?? this.icon(),
  );

  /** Resolved accept label — service config wins, then the `acceptLabel` input, then i18n default. */
  public readonly resolvedAcceptLabel: Signal<string> = computed<string>(
    (): string =>
      this.serviceConfig()?.acceptLabel ??
      this.acceptLabel() ??
      this.i18n.translate('confirm-popup.accept'),
  );

  /** Resolved reject label — service config wins, then the `rejectLabel` input, then i18n default. */
  public readonly resolvedRejectLabel: Signal<string> = computed<string>(
    (): string =>
      this.serviceConfig()?.rejectLabel ??
      this.rejectLabel() ??
      this.i18n.translate('confirm-popup.reject'),
  );

  /** Resolved accept icon. */
  public readonly resolvedAcceptIcon: Signal<string | null> = computed<string | null>(
    (): string | null => this.serviceConfig()?.acceptIcon ?? this.acceptIcon(),
  );

  /** Resolved reject icon. */
  public readonly resolvedRejectIcon: Signal<string | null> = computed<string | null>(
    (): string | null => this.serviceConfig()?.rejectIcon ?? this.rejectIcon(),
  );

  /** Resolved accept button severity. */
  public readonly resolvedAcceptSeverity: Signal<ConfirmPopupButtonSeverity> =
    computed<ConfirmPopupButtonSeverity>(
      (): ConfirmPopupButtonSeverity =>
        this.serviceConfig()?.acceptSeverity ?? this.acceptSeverity(),
    );

  /** Resolved reject button severity. */
  public readonly resolvedRejectSeverity: Signal<ConfirmPopupButtonSeverity> =
    computed<ConfirmPopupButtonSeverity>(
      (): ConfirmPopupButtonSeverity =>
        this.serviceConfig()?.rejectSeverity ?? this.rejectSeverity(),
    );

  /** Resolved defaultFocus. */
  public readonly resolvedDefaultFocus: Signal<ConfirmPopupDefaultFocus> =
    computed<ConfirmPopupDefaultFocus>(
      (): ConfirmPopupDefaultFocus => this.serviceConfig()?.defaultFocus ?? this.defaultFocus(),
    );

  /** Accessible name for the panel — the message text serves as the alertdialog label. */
  public readonly panelAriaLabel: Signal<string> = computed<string>((): string =>
    this.resolvedMessage(),
  );

  /** Effective variant — falls back to ThemeConfigService. */
  public readonly effectiveVariant: Signal<ConfirmPopupVariant> = computed<ConfirmPopupVariant>(
    (): ConfirmPopupVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-confirm-popup'];

    if (this.visible()) {
      classes.push('ui-lib-confirm-popup--open');
    }

    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });

  /** Panel CSS classes combining variant, placement, and visibility state. */
  public readonly panelClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-confirm-popup__panel',
      `ui-lib-confirm-popup--variant-${this.effectiveVariant()}`,
      `ui-lib-confirm-popup__panel--placement-${this.placement()}`,
    ];

    if (this.positionReady()) {
      classes.push('ui-lib-confirm-popup__panel--visible');
    }

    return classes.join(' ');
  });

  /** Accept button CSS classes combining base and severity modifier. */
  public readonly acceptBtnClasses: Signal<string> = computed<string>(
    (): string =>
      `ui-lib-confirm-popup__accept-btn ui-lib-confirm-popup__btn--${this.resolvedAcceptSeverity()}`,
  );

  /** Reject button CSS classes combining base and severity modifier. */
  public readonly rejectBtnClasses: Signal<string> = computed<string>(
    (): string =>
      `ui-lib-confirm-popup__reject-btn ui-lib-confirm-popup__btn--${this.resolvedRejectSeverity()}`,
  );

  constructor() {
    this.lastVisible = this.visible();

    // Sync ConfirmPopupService state into this instance.
    effect((): void => {
      const config: ConfirmPopupConfig | null = this.confirmPopupService.confirmation();
      const componentKey: string = this.key();

      if (!config) {
        if (this.visible() && this.serviceConfig() !== null) {
          this.clearServiceState();
          this.visible.set(false);
        }
        return;
      }

      const configKey: string = config.key ?? '';

      if (componentKey && configKey !== componentKey) {
        return;
      }
      if (!componentKey && configKey) {
        return;
      }

      const target: EventTarget | null = config.target ?? null;
      this.targetElement.set(target instanceof HTMLElement ? target : null);
      this.serviceConfig.set(config);
      this.acceptCallback.set(config.accept ?? null);
      this.rejectCallback.set(config.reject ?? null);
      this.visible.set(true);
    });

    // Visibility side effects: position computation + focus management.
    effect((): void => {
      const isVisible: boolean = this.visible();
      if (isVisible === this.lastVisible) {
        return;
      }
      this.lastVisible = isVisible;

      if (isVisible) {
        // Capture current focus before the popup takes it over.
        // Prefer document.activeElement (keyboard-triggered clicks), fall back to targetElement
        // (mouse-triggered clicks where activeElement may still be body from the programmatic open).
        const active: HTMLElement | null = this.document.activeElement as HTMLElement | null;
        this.previousFocusEl =
          active && active !== this.document.body ? active : (this.targetElement() ?? null);

        this.positionReady.set(false);
        afterNextRender(
          (): void => {
            if (this.visible()) {
              this.computeAndSetPosition();
              this.positionReady.set(true);
              this.activateFocusTrap();
              this.focusDefaultButton();
            }
          },
          { injector: this.injector },
        );
      } else {
        this.positionReady.set(false);
        this.deactivateFocusTrap();
        // Restore focus to the element that had it (or triggered the popup).
        this.previousFocusEl?.focus();
        this.previousFocusEl = null;
      }
    });
  }

  public ngOnDestroy(): void {
    this.deactivateFocusTrap();
    this.previousFocusEl = null;
  }

  /** Handle click on the transparent overlay — dismisses the popup. */
  public onOverlayClick(): void {
    this.handleReject();
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

  /** Close the popup without invoking accept or reject callbacks. */
  public close(): void {
    this.clearServiceState();
    this.visible.set(false);
    this.confirmPopupService.close(this.key() || undefined);
  }

  private clearServiceState(): void {
    this.acceptCallback.set(null);
    this.rejectCallback.set(null);
    this.serviceConfig.set(null);
    this.targetElement.set(null);
  }

  private computeAndSetPosition(): void {
    const target: HTMLElement | null = this.targetElement();
    if (!target) {
      return;
    }

    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-confirm-popup__panel',
    );
    if (!panel) {
      return;
    }

    const targetRect: DOMRect = target.getBoundingClientRect();
    const panelRect: DOMRect = panel.getBoundingClientRect();
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;
    const gap: number = 10;

    const spaceAbove: number = targetRect.top;
    const spaceBelow: number = viewportHeight - targetRect.bottom;
    const fitsAbove: boolean = spaceAbove >= panelRect.height + gap;
    const fitsBelow: boolean = spaceBelow >= panelRect.height + gap;

    const showAbove: boolean = fitsAbove || (!fitsBelow && spaceAbove >= spaceBelow);

    let top: number;
    if (showAbove) {
      top = targetRect.top - panelRect.height - gap;
      this.placement.set('above');
    } else {
      top = targetRect.bottom + gap;
      this.placement.set('below');
    }

    // Center popup on target, clamped to viewport padding.
    const targetCenter: number = targetRect.left + targetRect.width / 2;
    let left: number = targetCenter - panelRect.width / 2;
    const viewportPadding: number = 8;
    left = Math.max(
      viewportPadding,
      Math.min(left, viewportWidth - panelRect.width - viewportPadding),
    );

    // Arrow points at target center, offset relative to panel left.
    const rawArrowLeft: number = targetCenter - left;
    const arrowHalfWidth: number = 8;
    const clampedArrowLeft: number = Math.max(
      arrowHalfWidth + 4,
      Math.min(rawArrowLeft, panelRect.width - arrowHalfWidth - 4),
    );

    this.panelTop.set(top);
    this.panelLeft.set(left);
    this.arrowLeftOffset.set(clampedArrowLeft);
  }

  private activateFocusTrap(): void {
    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-confirm-popup__panel',
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
    const focus: ConfirmPopupDefaultFocus = this.resolvedDefaultFocus();
    if (focus === 'none') {
      return;
    }

    const selector: string =
      focus === 'accept'
        ? '.ui-lib-confirm-popup__accept-btn'
        : '.ui-lib-confirm-popup__reject-btn';

    const button: HTMLElement | null =
      this.elementRef.nativeElement.querySelector<HTMLElement>(selector);
    button?.focus();
  }

  private generateId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `ui-lib-confirm-popup-${globalThis.crypto.randomUUID()}`;
    }
    nextConfirmPopupId += 1;
    return `ui-lib-confirm-popup-${nextConfirmPopupId}`;
  }
}
