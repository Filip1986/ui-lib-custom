import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
  type InputSignal,
  type OnDestroy,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { TieredMenuSubComponent } from './tiered-menu-sub';
import type {
  TieredMenuItem,
  TieredMenuItemCommandEvent,
  TieredMenuSize,
  TieredMenuVariant,
} from './tiered-menu.types';

export type {
  TieredMenuItem,
  TieredMenuItemCommandEvent,
  TieredMenuSize,
  TieredMenuVariant,
} from './tiered-menu.types';

/** Default accessible label exported for test assertions. */
export const TIERED_MENU_DEFAULT_ARIA_LABEL: string = 'Menu';

/**
 * TieredMenu component — a nested flyout menu supporting arbitrarily deep
 * hierarchies. Works in two modes:
 *
 * - **Inline mode** (`popup="false"`, the default): the menu panel is always
 *   rendered in the document flow. Useful for sidebars or inline navigation.
 * - **Popup mode** (`popup="true"`): the menu panel is a floating overlay
 *   anchored to a trigger element. Control visibility via `toggle(event)`,
 *   `show(event)`, and `hide()`.
 *
 * Usage (inline):
 * ```html
 * <ui-lib-tiered-menu [model]="items" />
 * ```
 *
 * Usage (popup):
 * ```html
 * <button (click)="menu.toggle($event)">Open menu</button>
 * <ui-lib-tiered-menu #menu [model]="items" [popup]="true" />
 * ```
 */
@Component({
  selector: 'ui-lib-tiered-menu',
  standalone: true,
  imports: [TieredMenuSubComponent],
  templateUrl: './tiered-menu.html',
  styleUrl: './tiered-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class TieredMenu implements OnDestroy {
  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Array of menu items to display. */
  public readonly model: InputSignal<TieredMenuItem[]> = input<TieredMenuItem[]>([]);

  /**
   * When true, the menu renders as a floating popup anchored to the trigger
   * element passed to `toggle(event)` or `show(event)`.
   * When false (default), the menu is rendered inline in the document flow.
   */
  public readonly popup: InputSignal<boolean> = input<boolean>(false);

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<TieredMenuVariant | null> = input<TieredMenuVariant | null>(
    null
  );

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<TieredMenuSize> = input<TieredMenuSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the menu panel (aria-label). */
  public readonly ariaLabel: InputSignal<string> = input<string>(TIERED_MENU_DEFAULT_ARIA_LABEL);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a non-disabled leaf item is clicked or activated via keyboard. */
  public readonly itemClick: OutputEmitterRef<TieredMenuItemCommandEvent> =
    output<TieredMenuItemCommandEvent>();

  /** Emitted when the popup panel becomes visible. */
  public readonly menuShow: OutputEmitterRef<MouseEvent | KeyboardEvent> = output<
    MouseEvent | KeyboardEvent
  >();

  /** Emitted when the popup panel is hidden. */
  public readonly menuHide: OutputEmitterRef<void> = output<void>();

  // ── Internal state ────────────────────────────────────────────────────────

  /** Whether the popup panel is currently visible (popup mode only). */
  public readonly isVisible: WritableSignal<boolean> = signal<boolean>(false);

  /** Guards against a one-frame flash at the un-adjusted popup position. */
  public readonly isPositioned: WritableSignal<boolean> = signal<boolean>(false);

  /** Horizontal position of the popup panel (CSS `left`, in px). */
  public readonly panelX: WritableSignal<number> = signal<number>(0);

  /** Vertical position of the popup panel (CSS `top`, in px). */
  public readonly panelY: WritableSignal<number> = signal<number>(0);

  // ── Dependencies ──────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);

  // ── View children ─────────────────────────────────────────────────────────

  /** Reference to the floating panel element for position adjustment. */
  private readonly panelRef: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('panelRef');

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<TieredMenuVariant> = computed<TieredMenuVariant>(
    (): TieredMenuVariant => this.variant() ?? (this.themeConfig.variant() as TieredMenuVariant)
  );

  /** Combined CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-tiered-menu',
      `ui-lib-tiered-menu--variant-${this.effectiveVariant()}`,
      `ui-lib-tiered-menu--size-${this.size()}`,
    ];
    if (this.popup()) {
      classes.push('ui-lib-tiered-menu--popup');
    } else {
      classes.push('ui-lib-tiered-menu--inline');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  // ── Event listener bound methods ──────────────────────────────────────────

  private readonly clickOutsideHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.hide();
    }
  };

  private readonly keydownHandler: (event: KeyboardEvent) => void = (
    event: KeyboardEvent
  ): void => {
    if (event.key === KEYBOARD_KEYS.Escape) {
      this.hide();
    }
  };

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor() {
    // Manage click-outside and keydown listeners while popup panel is open
    effect((): void => {
      this.documentRef.removeEventListener('click', this.clickOutsideHandler);
      this.documentRef.removeEventListener('keydown', this.keydownHandler);
      if (this.isVisible()) {
        this.documentRef.addEventListener('click', this.clickOutsideHandler);
        this.documentRef.addEventListener('keydown', this.keydownHandler);
      }
    });

    // After popup panel renders: adjust viewport position and focus first item
    effect((): void => {
      if (this.popup() && this.isVisible()) {
        afterNextRender(
          (): void => {
            this.adjustPanelPosition();
            this.isPositioned.set(true);
            this.focusFirstItem();
          },
          { injector: this.injector }
        );
      } else {
        this.isPositioned.set(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.documentRef.removeEventListener('click', this.clickOutsideHandler);
    this.documentRef.removeEventListener('keydown', this.keydownHandler);
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Shows the popup menu anchored below the trigger element.
   * No-op in inline mode.
   */
  public show(event: MouseEvent | KeyboardEvent): void {
    if (!this.popup()) {
      return;
    }
    const trigger: HTMLElement = event.currentTarget as HTMLElement;
    const rect: DOMRect = trigger.getBoundingClientRect();
    this.panelX.set(rect.left + window.scrollX);
    this.panelY.set(rect.bottom + window.scrollY);
    this.isVisible.set(true);
    this.menuShow.emit(event);
  }

  /** Hides the popup menu. No-op when already hidden or in inline mode. */
  public hide(): void {
    if (!this.popup() || !this.isVisible()) {
      return;
    }
    this.isVisible.set(false);
    this.menuHide.emit();
  }

  /** Toggles the popup menu. No-op in inline mode. */
  public toggle(event: MouseEvent | KeyboardEvent): void {
    if (!this.popup()) {
      return;
    }
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show(event);
    }
  }

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Whether the root menu list should be rendered. */
  public readonly shouldRenderPanel: Signal<boolean> = computed<boolean>(
    (): boolean => !this.popup() || this.isVisible()
  );

  // ── Event handlers (called from template) ────────────────────────────────

  /** Handles a leaf-item activation bubbled up from TieredMenuSubComponent. */
  public onItemActivated(commandEvent: TieredMenuItemCommandEvent): void {
    this.itemClick.emit(commandEvent);
    if (this.popup()) {
      this.hide();
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /** Focuses the first non-separator, non-disabled item in the root panel. */
  private focusFirstItem(): void {
    const panel: HTMLElement | null = this.panelRef()?.nativeElement ?? null;
    if (!panel) {
      return;
    }
    const firstLink: HTMLElement | null = panel.querySelector<HTMLElement>(
      '.ui-lib-tiered-menu__link:not([aria-disabled="true"])'
    );
    firstLink?.focus();
  }

  /**
   * Reads the panel's bounding rect after rendering and adjusts its position
   * to prevent overflow beyond the viewport edges.
   */
  private adjustPanelPosition(): void {
    const panel: HTMLElement | null = this.panelRef()?.nativeElement ?? null;
    if (!panel) {
      return;
    }
    const rect: DOMRect = panel.getBoundingClientRect();
    const viewportWidth: number = this.documentRef.defaultView?.innerWidth ?? 0;
    const viewportHeight: number = this.documentRef.defaultView?.innerHeight ?? 0;

    let adjustedX: number = this.panelX();
    let adjustedY: number = this.panelY();

    if (adjustedX + rect.width > viewportWidth) {
      adjustedX = Math.max(0, viewportWidth - rect.width);
    }
    if (adjustedY + rect.height > viewportHeight) {
      adjustedY = Math.max(0, adjustedY - rect.height - (adjustedY - rect.top));
    }

    this.panelX.set(adjustedX);
    this.panelY.set(adjustedY);
  }
}
