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
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, ModelSignal, OnDestroy, OutputEmitterRef, Signal } from '@angular/core';
import { claimOverlayZIndex, FocusTrap, releaseOverlayZIndex } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { DrawerPosition, DrawerVariant } from './drawer.types';
export type { DrawerPosition, DrawerVariant } from './drawer.types';

// ── Module-level ID counter (avoids static class field + prefer-readonly lint) ──
let nextDrawerId: number = 0;

function generateDrawerId(): string {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return `ui-lib-drawer-${globalThis.crypto.randomUUID()}`;
  }
  nextDrawerId += 1;
  return `ui-lib-drawer-${nextDrawerId}`;
}

/**
 * Drawer — a panel that slides in from the edge of the viewport.
 *
 * Bind `[(visible)]` to open/close. Project content inside; use `[drawerHeader]`
 * for a custom header or `[drawerFooter]` for a sticky footer.
 *
 * @example
 * <ui-lib-drawer [(visible)]="isOpen" header="Settings" position="right">
 *   <p>Drawer content here.</p>
 *   <div drawerFooter>
 *     <ui-lib-button (click)="isOpen.set(false)">Close</ui-lib-button>
 *   </div>
 * </ui-lib-drawer>
 */
@Component({
  selector: 'ui-lib-drawer',
  standalone: true,
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.--uilib-drawer-size]': 'size()',
    // aria-hidden="true" hides all children from AT when closed; null (removed) when open
    '[attr.aria-hidden]': '!visible() ? true : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Drawer implements OnDestroy {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly injector: Injector = inject(Injector);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  /** Whether the drawer is open. Supports two-way binding via `[(visible)]`. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);
  /** Optional header text. Omit to hide the built-in header bar. */
  public readonly header: InputSignal<string> = input<string>('');
  /** Which edge the drawer slides in from. */
  public readonly position: InputSignal<DrawerPosition> = input<DrawerPosition>('right');
  /** Panel width (left/right) or height (top/bottom). Accepts any CSS length. */
  public readonly size: InputSignal<string> = input<string>('300px');
  /** Whether to render the semi-transparent backdrop behind the drawer. */
  public readonly modal: InputSignal<boolean> = input<boolean>(true);
  /** Whether a click on the backdrop closes the drawer. */
  public readonly closeOnBackdrop: InputSignal<boolean> = input<boolean>(true);
  /** Whether pressing Escape closes the drawer. */
  public readonly closeOnEscape: InputSignal<boolean> = input<boolean>(true);
  /** Whether to lock body scroll while the drawer is open. */
  public readonly blockScroll: InputSignal<boolean> = input<boolean>(true);
  /** Whether to show the built-in close button in the header. */
  public readonly showCloseButton: InputSignal<boolean> = input<boolean>(true);
  /**
   * `id` of an element that describes the drawer panel.
   * When provided, the value is set on the panel's `aria-describedby` attribute.
   */
  public readonly ariaDescribedby: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );
  /** Visual design variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<DrawerVariant | null> = input<DrawerVariant | null>(null);
  /**
   * Accessible label for the close button. Falls back to the i18n `drawer.close` key when null.
   * Use to localise the label outside the built-in locale bundles.
   */
  public readonly closeAriaLabel: InputSignal<string | null> = input<string | null>(null);
  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emits after the drawer finishes opening. */
  public readonly shown: OutputEmitterRef<void> = output<void>();
  /** Emits after the drawer finishes closing. */
  public readonly hidden: OutputEmitterRef<void> = output<void>();

  /** Unique id for this drawer instance. */
  private readonly drawerId: string = generateDrawerId();

  /** Stable title element id for `aria-labelledby`. */
  public readonly titleId: Signal<string> = computed<string>(
    (): string => `${this.drawerId}-title`,
  );

  private readonly effectiveVariant: Signal<DrawerVariant> = computed<DrawerVariant>(
    (): DrawerVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Resolved aria-label for the close button — falls back to the i18n `drawer.close` key. */
  public readonly effectiveCloseAriaLabel: Signal<string> = computed<string>(
    (): string => this.closeAriaLabel() ?? this.i18n.translate('drawer.close'),
  );

  /** Computed host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-drawer',
      `ui-lib-drawer--${this.position()}`,
      `ui-lib-drawer--variant-${this.effectiveVariant()}`,
    ];
    if (this.visible()) classes.push('ui-lib-drawer--open');
    const extra: string | null = this.styleClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  /** Focus trap — created lazily on first open, reused across open/close cycles. */
  private focusTrap: FocusTrap | null = null;

  constructor() {
    let previousVisible: boolean | null = null;

    effect((): void => {
      const isVisible: boolean = this.visible();

      if (isVisible) {
        if (this.blockScroll()) {
          this.document.body.classList.add('ui-lib-drawer-scroll-lock');
        }
        if (previousVisible === false) {
          claimOverlayZIndex(this.elementRef.nativeElement);
          this.shown.emit();
          // Use afterNextRender with injector so it is safe when the effect re-runs
          // outside the constructor (avoids NG0203 injection context errors).
          afterNextRender(
            (): void => {
              const panel: HTMLElement | null =
                this.elementRef.nativeElement.querySelector<HTMLElement>('.ui-lib-drawer__panel');
              if (panel) {
                // Create FocusTrap once; reuse across open/close cycles.
                if (!this.focusTrap) {
                  this.focusTrap = new FocusTrap(panel);
                }
                // activate() saves prior focus and moves focus inside the panel.
                this.focusTrap.activate();
              }
            },
            { injector: this.injector },
          );
        }
      } else {
        this.document.body.classList.remove('ui-lib-drawer-scroll-lock');
        if (previousVisible === true) {
          releaseOverlayZIndex(this.elementRef.nativeElement);
          // deactivate() restores focus to the element that was focused when activate() was called.
          this.focusTrap?.deactivate();
          this.hidden.emit();
        }
      }

      previousVisible = isVisible;
    });
  }

  public ngOnDestroy(): void {
    this.document.body.classList.remove('ui-lib-drawer-scroll-lock');
    this.focusTrap?.deactivate();
  }

  /** Close the drawer. */
  public close(): void {
    this.visible.set(false);
  }

  /** Handle backdrop click — closes only when `closeOnBackdrop` is true. */
  public onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }

  /** Handle Escape keydown on the panel — closes only when `closeOnEscape` is true. */
  public onEscapeKey(): void {
    if (this.closeOnEscape() && this.visible()) {
      this.close();
    }
  }
}
