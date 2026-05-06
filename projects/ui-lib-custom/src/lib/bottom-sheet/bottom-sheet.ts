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
import type { BottomSheetVariant } from './bottom-sheet.types';
export type { BottomSheetVariant } from './bottom-sheet.types';

/**
 * BottomSheet — a slide-up overlay panel anchored to the bottom of the viewport.
 *
 * Bind `[(visible)]` to open/close the sheet. Project your content inside the component;
 * use the `[bottomSheetFooter]` attribute on a child element for a sticky footer slot.
 *
 * @example
 * <ui-lib-bottom-sheet [(visible)]="isOpen" header="Share">
 *   <p>Sheet content here.</p>
 *   <div bottomSheetFooter>
 *     <ui-lib-button (click)="isOpen.set(false)">Done</ui-lib-button>
 *   </div>
 * </ui-lib-bottom-sheet>
 */
@Component({
  selector: 'ui-lib-bottom-sheet',
  standalone: true,
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-hidden]': '!visible()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BottomSheet implements OnDestroy {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly injector: Injector = inject(Injector);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  /** Whether the sheet is open. Supports two-way binding via `[(visible)]`. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);
  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<BottomSheetVariant | null> =
    input<BottomSheetVariant | null>(null);
  /** Optional header text rendered in the sheet header bar. */
  public readonly header: InputSignal<string> = input<string>('');
  /** Whether to render the semi-transparent backdrop behind the sheet. */
  public readonly showBackdrop: InputSignal<boolean> = input<boolean>(true);
  /** Whether a click on the backdrop closes the sheet. */
  public readonly closeOnBackdrop: InputSignal<boolean> = input<boolean>(true);
  /** Whether pressing Escape closes the sheet. */
  public readonly closeOnEscape: InputSignal<boolean> = input<boolean>(true);
  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emits after the sheet finishes opening. */
  public readonly shown: OutputEmitterRef<void> = output<void>();
  /** Emits after the sheet finishes closing. */
  public readonly hidden: OutputEmitterRef<void> = output<void>();

  private readonly effectiveVariant: Signal<BottomSheetVariant> = computed<BottomSheetVariant>(
    (): BottomSheetVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-bottom-sheet',
      `ui-lib-bottom-sheet--variant-${this.effectiveVariant()}`,
    ];
    if (this.visible()) classes.push('ui-lib-bottom-sheet--open');
    const extra: string | null = this.styleClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  constructor() {
    let previousVisible: boolean | null = null;

    effect((): void => {
      const isVisible: boolean = this.visible();

      if (isVisible) {
        this.document.body.classList.add('ui-lib-bottom-sheet-scroll-lock');
        if (previousVisible === false) {
          this.shown.emit();
          afterNextRender(
            (): void => {
              const panel: HTMLElement | null =
                this.elementRef.nativeElement.querySelector<HTMLElement>(
                  '.ui-lib-bottom-sheet__panel'
                );
              panel?.focus();
            },
            { injector: this.injector }
          );
        }
      } else {
        this.document.body.classList.remove('ui-lib-bottom-sheet-scroll-lock');
        if (previousVisible === true) {
          this.hidden.emit();
        }
      }

      previousVisible = isVisible;
    });
  }

  public ngOnDestroy(): void {
    this.document.body.classList.remove('ui-lib-bottom-sheet-scroll-lock');
  }

  /** Close the sheet. */
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
