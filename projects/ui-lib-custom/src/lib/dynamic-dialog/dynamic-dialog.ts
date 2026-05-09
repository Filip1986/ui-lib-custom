import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  Injector,
  signal,
  ViewContainerRef,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import type { InputSignal, OnDestroy, Signal, Type, WritableSignal } from '@angular/core';
import { FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DYNAMIC_DIALOG_CONFIG } from './dynamic-dialog.types';
import type {
  DynamicDialogConfig,
  DynamicDialogPosition,
  DynamicDialogVariant,
} from './dynamic-dialog.types';

/**
 * Internal shell component rendered by DialogService.open().
 *
 * This component is NOT intended to be placed in templates directly.
 * Use DialogService.open(SomeComponent, config) instead.
 */
@Component({
  selector: 'ui-lib-dynamic-dialog',
  standalone: true,
  templateUrl: './dynamic-dialog.html',
  styleUrl: './dynamic-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class DynamicDialog implements OnDestroy {
  private readonly config: DynamicDialogConfig = inject(DYNAMIC_DIALOG_CONFIG);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly injector: Injector = inject(Injector);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly contentVcr: Signal<ViewContainerRef> = viewChild.required('dynamicContent', {
    read: ViewContainerRef,
  });

  private focusTrap: FocusTrap | null = null;
  private readonly previousBodyOverflow: WritableSignal<string | null> = signal<string | null>(
    null
  );

  private static nextId: number = 0;
  private readonly componentId: string = DynamicDialog.generateId();

  /** @internal — set by DialogService via ComponentRef.setInput(). */
  public readonly componentType: InputSignal<Type<unknown> | null> = input<Type<unknown> | null>(
    null
  );

  // ---- Resolved config values ----

  /** Resolved header text. */
  public readonly resolvedHeader: Signal<string> = computed<string>(
    (): string => this.config.header ?? ''
  );

  /** Whether a backdrop is rendered. */
  public readonly resolvedModal: Signal<boolean> = computed<boolean>(
    (): boolean => this.config.modal ?? true
  );

  /** Whether the × close button is shown. */
  public readonly resolvedClosable: Signal<boolean> = computed<boolean>(
    (): boolean => this.config.closable ?? true
  );

  /** Whether clicking the backdrop closes the dialog. */
  public readonly resolvedDismissableMask: Signal<boolean> = computed<boolean>(
    (): boolean => this.config.dismissableMask ?? false
  );

  /** Whether body scroll is locked while open. */
  public readonly resolvedBlockScroll: Signal<boolean> = computed<boolean>(
    (): boolean => this.config.blockScroll ?? true
  );

  /** Dialog panel anchor position. */
  public readonly resolvedPosition: Signal<DynamicDialogPosition> = computed<DynamicDialogPosition>(
    (): DynamicDialogPosition => this.config.position ?? 'center'
  );

  /** CSS width for the panel, or null when unset. */
  public readonly resolvedWidth: Signal<string | null> = computed<string | null>(
    (): string | null => this.config.width ?? null
  );

  /** CSS height for the panel, or null when unset. */
  public readonly resolvedHeight: Signal<string | null> = computed<string | null>(
    (): string | null => this.config.height ?? null
  );

  /** Effective variant — config wins, falls back to ThemeConfigService. */
  public readonly effectiveVariant: Signal<DynamicDialogVariant> = computed<DynamicDialogVariant>(
    (): DynamicDialogVariant => this.config.variant ?? this.themeConfig.variant()
  );

  /** Whether the header row should be rendered (needs title text OR close button). */
  public readonly showHeader: Signal<boolean> = computed<boolean>(
    (): boolean => Boolean(this.resolvedHeader()) || this.resolvedClosable()
  );

  /** ID for aria-labelledby on the panel. */
  public readonly headerId: string = `${this.componentId}-header`;

  /** Host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-dynamic-dialog',
      `ui-lib-dynamic-dialog--${this.resolvedPosition()}`,
    ];

    const extra: string | null | undefined = this.config.styleClass;
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });

  /** Panel CSS classes. */
  public readonly panelClasses: Signal<string> = computed<string>((): string =>
    [
      'ui-lib-dynamic-dialog__panel',
      `ui-lib-dynamic-dialog--variant-${this.effectiveVariant()}`,
    ].join(' ')
  );

  constructor() {
    if (this.resolvedBlockScroll()) {
      const body: HTMLElement = this.document.body;
      this.previousBodyOverflow.set(body.style.overflow);
      body.style.overflow = 'hidden';
    }

    afterNextRender(
      (): void => {
        this.renderGuestComponent();
        this.activateFocusTrap();
      },
      { injector: this.injector }
    );
  }

  public ngOnDestroy(): void {
    this.releaseScrollLock();
    this.deactivateFocusTrap();
  }

  /** Close the dialog — releases scroll lock, releases focus trap, and signals the service. */
  public close(data?: unknown): void {
    this.releaseScrollLock();
    this.deactivateFocusTrap();
    this.ref.close(data);
  }

  /** Handle backdrop click — closes when dismissableMask is enabled. */
  public onBackdropClick(): void {
    if (this.resolvedDismissableMask()) {
      this.close();
    }
  }

  /** Handle keydown on the panel — closes on Escape. */
  public onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Escape) {
      event.preventDefault();
      event.stopPropagation();
      this.close();
    }
  }

  private renderGuestComponent(): void {
    const type: Type<unknown> | null = this.componentType();
    if (!type) {
      return;
    }
    this.contentVcr().createComponent(type, { injector: this.injector });
  }

  private activateFocusTrap(): void {
    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-dynamic-dialog__panel'
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

  private releaseScrollLock(): void {
    if (!this.resolvedBlockScroll()) {
      return;
    }
    const previousOverflow: string | null = this.previousBodyOverflow();
    if (previousOverflow === null) {
      return;
    }
    this.document.body.style.overflow = previousOverflow;
    this.previousBodyOverflow.set(null);
  }

  private static generateId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `ui-lib-dynamic-dialog-${globalThis.crypto.randomUUID()}`;
    }
    DynamicDialog.nextId += 1;
    return `ui-lib-dynamic-dialog-${DynamicDialog.nextId}`;
  }
}
