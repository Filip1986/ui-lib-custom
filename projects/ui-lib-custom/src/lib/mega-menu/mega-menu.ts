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
import type {
  MegaMenuCommandEvent,
  MegaMenuItem,
  MegaMenuOrientation,
  MegaMenuSize,
  MegaMenuSubColumn,
  MegaMenuSubItem,
  MegaMenuVariant,
} from './mega-menu.types';

export type {
  MegaMenuCommandEvent,
  MegaMenuItem,
  MegaMenuOrientation,
  MegaMenuSize,
  MegaMenuSubColumn,
  MegaMenuSubItem,
  MegaMenuVariant,
} from './mega-menu.types';

/** Default accessible label exported for test assertions. */
export const MEGA_MENU_DEFAULT_ARIA_LABEL: string = 'Navigation';

/**
 * MegaMenu component — a horizontal (or vertical) navigation bar where
 * top-level items can open multi-column mega panels of sub-items.
 *
 * **Basic horizontal usage:**
 * ```html
 * <ui-lib-mega-menu [model]="navItems" />
 * ```
 *
 * **Vertical usage:**
 * ```html
 * <ui-lib-mega-menu [model]="navItems" orientation="vertical" />
 * ```
 */
@Component({
  selector: 'ui-lib-mega-menu',
  standalone: true,
  imports: [],
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class MegaMenu implements OnDestroy {
  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Array of top-level navigation items. */
  public readonly model: InputSignal<MegaMenuItem[]> = input<MegaMenuItem[]>([]);

  /** Layout orientation of the navigation bar. */
  public readonly orientation: InputSignal<MegaMenuOrientation> =
    input<MegaMenuOrientation>('horizontal');

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<MegaMenuVariant | null> = input<MegaMenuVariant | null>(
    null
  );

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<MegaMenuSize> = input<MegaMenuSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the navigation landmark (aria-label on the `<nav>`). */
  public readonly ariaLabel: InputSignal<string> = input<string>(MEGA_MENU_DEFAULT_ARIA_LABEL);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a non-disabled sub-item is activated. */
  public readonly itemClick: OutputEmitterRef<MegaMenuCommandEvent> =
    output<MegaMenuCommandEvent>();

  // ── Internal state ────────────────────────────────────────────────────────

  /**
   * Index (within `visibleItems()`) of the currently active top-level item
   * whose mega panel is open. -1 means no panel is open.
   */
  public readonly activeIndex: WritableSignal<number> = signal<number>(-1);

  /**
   * Guards a one-frame opacity flash before an opened mega panel is
   * positioned correctly after first render.
   */
  public readonly isPanelPositioned: WritableSignal<boolean> = signal<boolean>(false);

  // ── Dependencies ──────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<MegaMenuVariant> = computed<MegaMenuVariant>(
    (): MegaMenuVariant => this.variant() ?? (this.themeConfig.variant() as MegaMenuVariant)
  );

  /** Combined CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-mega-menu',
      `ui-lib-mega-menu--variant-${this.effectiveVariant()}`,
      `ui-lib-mega-menu--size-${this.size()}`,
      `ui-lib-mega-menu--${this.orientation()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Top-level items filtered to `visible !== false`. */
  public readonly visibleItems: Signal<MegaMenuItem[]> = computed<MegaMenuItem[]>(
    (): MegaMenuItem[] =>
      this.model().filter((item: MegaMenuItem): boolean => item.visible !== false)
  );

  // ── Event listener bound methods ──────────────────────────────────────────

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

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor() {
    // Manage click-outside and global keydown listeners when a panel is open
    effect((): void => {
      this.documentRef.removeEventListener('click', this.clickOutsideHandler);
      this.documentRef.removeEventListener('keydown', this.keydownGlobalHandler);
      if (this.activeIndex() !== -1) {
        this.documentRef.addEventListener('click', this.clickOutsideHandler);
        this.documentRef.addEventListener('keydown', this.keydownGlobalHandler);
      }
    });

    // After a panel opens: mark it as positioned so it becomes visible
    effect((): void => {
      if (this.activeIndex() !== -1) {
        this.isPanelPositioned.set(false);
        afterNextRender(
          (): void => {
            this.isPanelPositioned.set(true);
          },
          { injector: this.injector }
        );
      } else {
        this.isPanelPositioned.set(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.documentRef.removeEventListener('click', this.clickOutsideHandler);
    this.documentRef.removeEventListener('keydown', this.keydownGlobalHandler);
  }

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Whether the mega panel for the item at the given index is currently open. */
  public isPanelOpen(index: number): boolean {
    return this.activeIndex() === index;
  }

  /** Returns visible sub-items within a column, excluding hidden entries. */
  public getVisibleColumnItems(column: MegaMenuSubColumn): MegaMenuSubItem[] {
    return column.items.filter((item: MegaMenuSubItem): boolean => item.visible !== false);
  }

  // ── Event handlers (called from template) ────────────────────────────────

  /**
   * Handles a click on a top-level item.
   * Items with a panel toggle it; items without navigate or invoke command.
   */
  public onTopItemClick(event: MouseEvent, item: MegaMenuItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.items?.length) {
      // Toggle the mega panel
      event.preventDefault();
      if (this.activeIndex() === index) {
        this.closePanel();
      } else {
        this.activeIndex.set(index);
      }
      return;
    }

    // Simple item — invoke command, let default navigation happen for url items
    if (!item.url) {
      event.preventDefault();
    }
    if (item.command) {
      // Top-level items with no sub-items and a command get a synthetic event
      // Sub-items use the full MegaMenuCommandEvent; top-level commands receive
      // a placeholder sub-item derived from the top-level item itself.
      item.command({ item: item as unknown as MegaMenuSubItem, originalEvent: event });
    }
    this.closePanel();
  }

  /** Handles keydown events on a top-level item link. */
  public onTopItemKeyDown(event: KeyboardEvent, item: MegaMenuItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (item.disabled) {
          return;
        }
        if (item.items?.length) {
          if (this.activeIndex() === index) {
            this.closePanel();
          } else {
            this.activeIndex.set(index);
          }
        } else if (item.command) {
          item.command({ item: item as unknown as MegaMenuSubItem, originalEvent: event });
          this.closePanel();
        }
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.closePanel();
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        if (this.orientation() === 'horizontal' && item.items?.length) {
          event.preventDefault();
          this.activeIndex.set(index);
          // Focus the first sub-item after panel opens
          afterNextRender(
            (): void => {
              this.focusFirstPanelItem();
            },
            { injector: this.injector }
          );
        }
        break;
      }
    }
  }

  /**
   * Handles keyboard events on sub-items inside the mega panel.
   * Supports ArrowUp/Down within a column, Escape to close.
   */
  public onSubItemKeyDown(event: KeyboardEvent, item: MegaMenuSubItem): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        this.onSubItemActivate(event, item);
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.closePanel();
        break;
      }
      case KEYBOARD_KEYS.Tab: {
        // Close panel on Tab to let focus leave naturally
        this.closePanel();
        break;
      }
    }
  }

  /** Handles a click or keyboard activation on a sub-item inside the mega panel. */
  public onSubItemActivate(event: MouseEvent | KeyboardEvent, item: MegaMenuSubItem): void {
    if (item.disabled || item.separator) {
      event.preventDefault();
      return;
    }

    if (!item.url) {
      event.preventDefault();
    }

    this.itemClick.emit({ item, originalEvent: event });
    if (item.command) {
      item.command({ item, originalEvent: event });
    }
    this.closePanel();
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /** Closes the currently open mega panel. */
  private closePanel(): void {
    this.activeIndex.set(-1);
  }

  /** Focuses the first focusable sub-item link in the currently open panel. */
  private focusFirstPanelItem(): void {
    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-mega-menu__panel--open .ui-lib-mega-menu__sub-link:not([aria-disabled="true"])'
    );
    if (panel) {
      panel.focus();
    }
  }
}
