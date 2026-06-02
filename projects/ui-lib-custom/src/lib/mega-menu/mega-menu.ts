import { DOCUMENT } from '@angular/common';
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
  type InputSignal,
  type OnDestroy,
  output,
  type OutputEmitterRef,
  type Signal,
  signal,
  ViewEncapsulation,
  type WritableSignal,
} from '@angular/core';

import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';

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

/** Auto-incrementing counter to generate unique IDs for each MegaMenu instance. */
let nextMegaMenuId: number = 0;

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
    null,
  );

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<MegaMenuSize> = input<MegaMenuSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /**
   * Accessible label for the navigation landmark (`aria-label` on the `<nav>`).
   * Defaults to the i18n `mega-menu.aria-label` key when not provided.
   */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a non-disabled sub-item is activated. */
  public readonly itemClick: OutputEmitterRef<MegaMenuCommandEvent> =
    output<MegaMenuCommandEvent>();

  /** Emitted when a mega panel opens. Carries the top-level item that triggered it. */
  public readonly panelOpened: OutputEmitterRef<MegaMenuItem> = output<MegaMenuItem>();

  /** Emitted when the currently open mega panel closes. */
  public readonly panelClosed: OutputEmitterRef<void> = output<void>();

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

  /**
   * Unique ID for this MegaMenu instance — used for ARIA relationships.
   * @example 'ui-lib-mega-menu-1'
   */
  public readonly menuId: string = `ui-lib-mega-menu-${++nextMegaMenuId}`;

  /**
   * ID assigned to the open mega-panel `<div>`.
   * Root items with sub-items set `aria-controls` to this value.
   */
  public readonly panelId: string = `${this.menuId}-panel`;

  /**
   * Index of the root item that holds the tab stop (roving tabindex pattern).
   * Only this item gets `tabindex="0"`; all others get `"-1"`.
   */
  public readonly rovingIndex: WritableSignal<number> = signal<number>(0);

  // ── Dependencies ──────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<MegaMenuVariant> = computed<MegaMenuVariant>(
    (): MegaMenuVariant => this.variant() ?? (this.themeConfig.variant() as MegaMenuVariant),
  );

  /** Resolved aria-label — i18n fallback when ariaLabel input is null. */
  public readonly effectiveAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() ?? this.i18n.translate('mega-menu.aria-label'),
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
      this.model().filter((item: MegaMenuItem): boolean => item.visible !== false),
  );

  // ── Event listener bound methods ──────────────────────────────────────────

  private readonly clickOutsideHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closePanel(false);
    }
  };

  private readonly keydownGlobalHandler: (event: KeyboardEvent) => void = (
    event: KeyboardEvent,
  ): void => {
    if (event.key === KEYBOARD_KEYS.Escape) {
      this.closePanel(true);
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
          { injector: this.injector },
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

  /**
   * Returns the tabindex for a root item link (roving tabindex pattern).
   * Only the item at `rovingIndex` gets `"0"`; all others get `"-1"`.
   * Disabled items always get `"-1"`.
   */
  public getRootTabIndex(item: MegaMenuItem, index: number): string {
    if (item.disabled) {
      return '-1';
    }
    return this.rovingIndex() === index ? '0' : '-1';
  }

  /**
   * Returns the CSS classes for a root-level `<li>` item.
   */
  public getRootItemClass(item: MegaMenuItem, index: number): string {
    const classes: string[] = ['ui-lib-mega-menu__root-item'];
    if (item.disabled) {
      classes.push('ui-lib-mega-menu__root-item--disabled');
    }
    if (this.isPanelOpen(index)) {
      classes.push('ui-lib-mega-menu__root-item--active');
    }
    if (item.styleClass) {
      classes.push(item.styleClass);
    }
    return classes.join(' ');
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

    this.rovingIndex.set(index);

    if (item.items?.length) {
      // Toggle the mega panel
      event.preventDefault();
      if (this.activeIndex() === index) {
        this.closePanel(false);
        this.panelClosed.emit();
      } else {
        this.activeIndex.set(index);
        this.panelOpened.emit(item);
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
    this.closePanel(false);
  }

  /** Handles keydown events on a top-level item link. */
  public onTopItemKeyDown(event: KeyboardEvent, item: MegaMenuItem, index: number): void {
    const isHorizontal: boolean = this.orientation() === 'horizontal';

    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (item.disabled) {
          return;
        }
        this.rovingIndex.set(index);
        if (item.items?.length) {
          if (this.activeIndex() === index) {
            this.closePanel(true);
            this.panelClosed.emit();
          } else {
            this.activeIndex.set(index);
            this.panelOpened.emit(item);
            afterNextRender(
              (): void => {
                this.focusFirstPanelItem();
              },
              { injector: this.injector },
            );
          }
        } else if (item.command) {
          item.command({ item: item as unknown as MegaMenuSubItem, originalEvent: event });
          this.closePanel(false);
        }
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.closePanel(true);
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        if (isHorizontal && item.items?.length) {
          event.preventDefault();
          this.rovingIndex.set(index);
          this.activeIndex.set(index);
          this.panelOpened.emit(item);
          afterNextRender(
            (): void => {
              this.focusFirstPanelItem();
            },
            { injector: this.injector },
          );
        } else if (!isHorizontal) {
          // Vertical: ArrowDown navigates to the next root item
          event.preventDefault();
          this.focusRootItem(index + 1);
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        if (!isHorizontal) {
          // Vertical: ArrowUp navigates to the previous root item
          event.preventDefault();
          this.focusRootItem(index - 1);
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowRight: {
        event.preventDefault();
        if (isHorizontal) {
          this.focusRootItem(index + 1);
        } else if (item.items?.length) {
          // Vertical: ArrowRight opens the panel
          this.rovingIndex.set(index);
          this.activeIndex.set(index);
          this.panelOpened.emit(item);
          afterNextRender(
            (): void => {
              this.focusFirstPanelItem();
            },
            { injector: this.injector },
          );
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowLeft: {
        event.preventDefault();
        if (isHorizontal) {
          this.focusRootItem(index - 1);
        }
        break;
      }
      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        this.focusRootItem(0);
        break;
      }
      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        this.focusRootItem(this.visibleItems().length - 1);
        break;
      }
    }
  }

  /**
   * Handles keyboard events on sub-items inside the mega panel.
   * Supports ArrowUp/Down within a column, ArrowLeft/Right between columns,
   * and Escape to close and restore focus to the triggering root item.
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
        this.closePanel(true);
        break;
      }
      case KEYBOARD_KEYS.Tab: {
        // Close panel on Tab to let focus leave naturally (do not restore focus)
        this.closePanel(false);
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.focusPanelItemInDirection('down', event.target as HTMLElement);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.focusPanelItemInDirection('up', event.target as HTMLElement);
        break;
      }
      case KEYBOARD_KEYS.ArrowRight: {
        event.preventDefault();
        this.focusPanelItemInDirection('right', event.target as HTMLElement);
        break;
      }
      case KEYBOARD_KEYS.ArrowLeft: {
        event.preventDefault();
        this.focusPanelItemInDirection('left', event.target as HTMLElement);
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
    this.closePanel(false);
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /**
   * Closes the currently open mega panel.
   *
   * @param returnFocus - When `true` (Escape / keyboard), focuses the root item
   *   at the previously active index. Pass `false` when closing on click-outside
   *   or sub-item activation so focus stays where the user clicked/navigated.
   */
  private closePanel(returnFocus: boolean = true): void {
    const previousIndex: number = this.activeIndex();
    this.activeIndex.set(-1);
    if (returnFocus && previousIndex !== -1) {
      const links: HTMLElement[] = Array.from(
        this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
          '.ui-lib-mega-menu__root-item > .ui-lib-mega-menu__root-link',
        ),
      );
      const link: HTMLElement | undefined = links[previousIndex];
      link?.focus();
    }
  }

  /**
   * Focuses the root-level item at the given index (roving tabindex helper).
   * Wraps around at either end of the list.
   * Updates `rovingIndex` so the tab stop follows focus.
   */
  private focusRootItem(index: number): void {
    const items: MegaMenuItem[] = this.visibleItems();
    if (items.length === 0) {
      return;
    }
    const wrappedIndex: number = ((index % items.length) + items.length) % items.length;
    this.rovingIndex.set(wrappedIndex);
    const links: HTMLElement[] = Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
        '.ui-lib-mega-menu__root-item > .ui-lib-mega-menu__root-link',
      ),
    );
    const link: HTMLElement | undefined = links[wrappedIndex];
    link?.focus();
  }

  /** Focuses the first focusable sub-item link in the currently open panel. */
  private focusFirstPanelItem(): void {
    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-mega-menu__panel--open .ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
    );
    if (panel) {
      panel.focus();
    }
  }

  /**
   * Moves focus within the open mega panel in the given direction.
   *
   * - `up` / `down`: navigate within the same column (wrapping).
   * - `left` / `right`: jump to the first focusable item in the adjacent column (wrapping).
   */
  private focusPanelItemInDirection(
    direction: 'up' | 'down' | 'left' | 'right',
    fromEl: HTMLElement,
  ): void {
    const panel: HTMLElement | null = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.ui-lib-mega-menu__panel--open',
    );
    if (!panel) {
      return;
    }

    const columns: HTMLElement[] = Array.from(
      panel.querySelectorAll<HTMLElement>('ul[role="menu"]'),
    );
    const colIndex: number = columns.findIndex((col: HTMLElement): boolean => col.contains(fromEl));
    if (colIndex === -1) {
      return;
    }

    if (direction === 'down' || direction === 'up') {
      const column: HTMLElement | undefined = columns[colIndex];
      if (!column) {
        return;
      }
      const items: HTMLElement[] = Array.from(
        column.querySelectorAll<HTMLElement>(
          '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
        ),
      );
      const currentItemIndex: number = items.indexOf(fromEl);
      if (currentItemIndex === -1) {
        return;
      }
      const nextItemIndex: number =
        direction === 'down'
          ? (currentItemIndex + 1) % items.length
          : (currentItemIndex - 1 + items.length) % items.length;
      items[nextItemIndex]?.focus();
    } else {
      const totalColumns: number = columns.length;
      const nextColIndex: number =
        direction === 'right'
          ? (colIndex + 1) % totalColumns
          : (colIndex - 1 + totalColumns) % totalColumns;
      const firstItem: HTMLElement | null =
        columns[nextColIndex]?.querySelector<HTMLElement>(
          '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
        ) ?? null;
      firstItem?.focus();
    }
  }
}
