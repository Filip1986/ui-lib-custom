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
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { DrawerPosition, DrawerVariant } from './drawer.types';
export type { DrawerPosition, DrawerVariant } from './drawer.types';

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
    '[attr.aria-hidden]': '!visible()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Drawer implements OnDestroy {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
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
  /** Visual design variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<DrawerVariant | null> = input<DrawerVariant | null>(null);
  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emits after the drawer finishes opening. */
  public readonly shown: OutputEmitterRef<void> = output<void>();
  /** Emits after the drawer finishes closing. */
  public readonly hidden: OutputEmitterRef<void> = output<void>();

  private readonly effectiveVariant: Signal<DrawerVariant> = computed<DrawerVariant>(
    (): DrawerVariant => this.variant() ?? this.themeConfig.variant()
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

  constructor() {
    let previousVisible: boolean | null = null;

    effect((): void => {
      const isVisible: boolean = this.visible();

      if (isVisible) {
        if (this.blockScroll()) {
          this.document.body.classList.add('ui-lib-drawer-scroll-lock');
        }
        if (previousVisible === false) {
          this.shown.emit();
          afterNextRender(
            (): void => {
              const panel: HTMLElement | null =
                this.elementRef.nativeElement.querySelector<HTMLElement>('.ui-lib-drawer__panel');
              panel?.focus();
            },
            { injector: this.injector }
          );
        }
      } else {
        this.document.body.classList.remove('ui-lib-drawer-scroll-lock');
        if (previousVisible === true) {
          this.hidden.emit();
        }
      }

      previousVisible = isVisible;
    });
  }

  public ngOnDestroy(): void {
    this.document.body.classList.remove('ui-lib-drawer-scroll-lock');
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
