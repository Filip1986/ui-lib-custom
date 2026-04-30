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
  type InputSignal,
  type OnDestroy,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { MenubarSubComponent } from './menubar-submenu';
import type {
  MenubarCommandEvent,
  MenubarItem,
  MenubarSize,
  MenubarVariant,
} from './menubar.types';

export type {
  MenubarCommandEvent,
  MenubarItem,
  MenubarSize,
  MenubarVariant,
} from './menubar.types';

/** Default accessible label exported for test assertions. */
export const MENUBAR_DEFAULT_ARIA_LABEL: string = 'Navigation';

/**
 * Menubar component — a PrimeNG-inspired horizontal navigation bar where
 * top-level items can open single-column dropdown submenus. Submenus support
 * arbitrary nesting depth (nested panels open to the right).
 *
 * **Basic usage:**
 * ```html
 * <ui-lib-menubar [model]="items" />
 * ```
 *
 * **With start/end slots:**
 * ```html
 * <ui-lib-menubar [model]="items">
 *   <img menubarStart src="logo.png" alt="Logo" />
 *   <button menubarEnd>Sign in</button>
 * </ui-lib-menubar>
 * ```
 */
@Component({
  selector: 'ui-lib-menubar',
  standalone: true,
  imports: [MenubarSubComponent],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Menubar implements OnDestroy {
  // ── Inputs ──────────────────────────────────────────────────────────────────

  /** Array of top-level navigation items. */
  public readonly model: InputSignal<MenubarItem[]> = input<MenubarItem[]>([]);

  /** Design-system variant; falls back to `ThemeConfigService` when `null`. */
  public readonly variant: InputSignal<MenubarVariant | null> = input<MenubarVariant | null>(null);

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<MenubarSize> = input<MenubarSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the navigation landmark (`aria-label` on the `<nav>`). */
  public readonly ariaLabel: InputSignal<string> = input<string>(MENUBAR_DEFAULT_ARIA_LABEL);

  // ── Outputs ─────────────────────────────────────────────────────────────────

  /** Emitted when a non-disabled leaf item is activated. */
  public readonly itemClick: OutputEmitterRef<MenubarCommandEvent> = output<MenubarCommandEvent>();

  // ── Internal state ───────────────────────────────────────────────────────────

  /**
   * Index (within `visibleItems()`) of the root-level item whose dropdown
   * panel is currently open. -1 means no panel is open.
   */
  public readonly activeIndex: WritableSignal<number> = signal<number>(-1);

  /** Whether the mobile navigation menu is expanded. */
  public readonly mobileMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  // ── Dependencies ─────────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);

  // ── Computed ─────────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to the global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<MenubarVariant> = computed<MenubarVariant>(
    (): MenubarVariant => this.variant() ?? (this.themeConfig.variant() as MenubarVariant)
  );

  /** Combined CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-menubar',
      `ui-lib-menubar--variant-${this.effectiveVariant()}`,
      `ui-lib-menubar--size-${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Root-level items filtered to `visible !== false`. */
  public readonly visibleItems: Signal<MenubarItem[]> = computed<MenubarItem[]>((): MenubarItem[] =>
    this.model().filter((item: MenubarItem): boolean => item.visible !== false)
  );

  // ── Event listener bound methods ─────────────────────────────────────────────

  private readonly clickOutsideHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  };

  private readonly keydownGlobalHandler: (event: KeyboardEvent) => void = (
    event: KeyboardEvent
  ): void => {
    if (event.key === KEYBOARD_KEYS.Escape) {
      this.closePanel();
    }
  };

  // ── Constructor ──────────────────────────────────────────────────────────────

  constructor() {
    effect((): void => {
      this.documentRef.removeEventListener('click', this.clickOutsideHandler);
      this.documentRef.removeEventListener('keydown', this.keydownGlobalHandler);
      if (this.activeIndex() !== -1) {
        this.documentRef.addEventListener('click', this.clickOutsideHandler);
        this.documentRef.addEventListener('keydown', this.keydownGlobalHandler);
      }
    });
  }

  public ngOnDestroy(): void {
    this.documentRef.removeEventListener('click', this.clickOutsideHandler);
    this.documentRef.removeEventListener('keydown', this.keydownGlobalHandler);
  }

  // ── Template helpers ─────────────────────────────────────────────────────────

  /** Whether the dropdown panel for the root item at `index` is open. */
  public isPanelOpen(index: number): boolean {
    return this.activeIndex() === index;
  }

  /** Computes the CSS class string for a root-level item `<li>`. */
  public getRootItemClasses(item: MenubarItem, index: number): string {
    const classes: string[] = ['ui-lib-menubar__root-item'];
    if (item.disabled) {
      classes.push('ui-lib-menubar__root-item--disabled');
    }
    if (this.isPanelOpen(index)) {
      classes.push('ui-lib-menubar__root-item--active');
    }
    if (item.styleClass) {
      classes.push(item.styleClass);
    }
    return classes.join(' ');
  }

  // ── Event handlers ────────────────────────────────────────────────────────────

  /** Handles a click on a root-level navigation item. */
  public onRootItemClick(event: MouseEvent, item: MenubarItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.items?.length) {
      event.preventDefault();
      this.activeIndex.set(this.activeIndex() === index ? -1 : index);
      return;
    }

    if (!item.url) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({ item, originalEvent: event });
    }
    this.closePanel();
  }

  /** Handles keyboard events on a root-level navigation item link. */
  public onRootItemKeyDown(event: KeyboardEvent, item: MenubarItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (item.disabled) {
          return;
        }
        if (item.items?.length) {
          this.activeIndex.set(this.activeIndex() === index ? -1 : index);
          if (this.activeIndex() === index) {
            afterNextRender(
              (): void => {
                this.focusFirstPanelItem();
              },
              { injector: this.injector }
            );
          }
        } else if (item.command) {
          item.command({ item, originalEvent: event });
          this.closePanel();
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        if (item.items?.length) {
          event.preventDefault();
          this.activeIndex.set(index);
          afterNextRender(
            (): void => {
              this.focusFirstPanelItem();
            },
            { injector: this.injector }
          );
        }
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.closePanel();
        break;
      }
    }
  }

  /**
   * Called by the `MenubarSubComponent` when a leaf item is activated.
   * Emits the `itemClick` output and closes all open panels.
   */
  public onItemActivated(event: MenubarCommandEvent): void {
    this.itemClick.emit(event);
    this.closePanel();
  }

  /** Toggles the mobile navigation menu. */
  public toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open: boolean): boolean => !open);
    if (!this.mobileMenuOpen()) {
      this.activeIndex.set(-1);
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────────

  /** Closes the currently open dropdown panel. */
  private closePanel(): void {
    this.activeIndex.set(-1);
  }

  /** Focuses the first focusable link in the currently open dropdown panel. */
  private focusFirstPanelItem(): void {
    const firstLink: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-menubar__panel:not(.ui-lib-menubar__panel--nested) .ui-lib-menubar__sub-link:not([aria-disabled="true"])'
    );
    if (firstLink) {
      firstLink.focus();
    }
  }
}
