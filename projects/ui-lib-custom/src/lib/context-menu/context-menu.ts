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
import type {
  ContextMenuItem,
  ContextMenuItemCommandEvent,
  ContextMenuSize,
  ContextMenuVariant,
} from './context-menu.types';

export type {
  ContextMenuItem,
  ContextMenuItemCommandEvent,
  ContextMenuSize,
  ContextMenuVariant,
} from './context-menu.types';

/** Default accessible label exported for test assertions. */
export const CONTEXT_MENU_DEFAULT_ARIA_LABEL: string = 'Context Menu';

/**
 * ContextMenu component — an overlay menu triggered on right-click (or programmatically
 * via `show(event)` / `toggle(event)`). Supports nested submenus, keyboard navigation,
 * disabled items, separators, and three design-system variants.
 *
 * Usage:
 * ```html
 * <div (contextmenu)="menu.show($event)">Right-click me</div>
 * <ui-lib-context-menu #menu [model]="items" />
 * ```
 */
@Component({
  selector: 'ui-lib-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ContextMenu implements OnDestroy {
  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Array of menu items to display in the context menu. */
  public readonly model: InputSignal<ContextMenuItem[]> = input<ContextMenuItem[]>([]);

  /**
   * When true, the component automatically listens to the `contextmenu` event
   * on the document, showing the menu on any right-click in the page.
   * Defaults to false; use `show(event)` / `toggle(event)` for targeted control.
   */
  public readonly global: InputSignal<boolean> = input<boolean>(false);

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<ContextMenuVariant | null> =
    input<ContextMenuVariant | null>(null);

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<ContextMenuSize> = input<ContextMenuSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the menu panel (aria-label). */
  public readonly ariaLabel: InputSignal<string> = input<string>(CONTEXT_MENU_DEFAULT_ARIA_LABEL);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a non-disabled leaf item is clicked or activated via keyboard. */
  public readonly itemClick: OutputEmitterRef<ContextMenuItemCommandEvent> =
    output<ContextMenuItemCommandEvent>();

  /** Emitted when the menu becomes visible. */
  public readonly menuShow: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /** Emitted when the menu is hidden. */
  public readonly menuHide: OutputEmitterRef<void> = output<void>();

  // ── Internal state ────────────────────────────────────────────────────────

  /** Whether the menu panel is currently rendered. */
  public readonly isVisible: WritableSignal<boolean> = signal<boolean>(false);

  /** Guards against a one-frame flash at the un-adjusted position. */
  public readonly isPositioned: WritableSignal<boolean> = signal<boolean>(false);

  /** Horizontal position of the panel (CSS `left`, in px). */
  public readonly menuX: WritableSignal<number> = signal<number>(0);

  /** Vertical position of the panel (CSS `top`, in px). */
  public readonly menuY: WritableSignal<number> = signal<number>(0);

  /**
   * Index (within `visibleItems()`) of the top-level item whose submenu
   * is currently expanded. `null` means no submenu is open.
   */
  public readonly activeSubmenuIndex: WritableSignal<number | null> = signal<number | null>(null);

  /** Index of the most-recently focused top-level menu item (-1 = none). */
  public readonly focusedIndex: WritableSignal<number> = signal<number>(-1);

  // ── Dependencies ──────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);

  // ── View children ─────────────────────────────────────────────────────────

  /** Reference to the floating panel `<div>` for position adjustment. */
  private readonly panelRef: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('panelRef');

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<ContextMenuVariant> = computed<ContextMenuVariant>(
    (): ContextMenuVariant => this.variant() ?? (this.themeConfig.variant() as ContextMenuVariant)
  );

  /** Combined CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-context-menu',
      `ui-lib-context-menu--variant-${this.effectiveVariant()}`,
      `ui-lib-context-menu--size-${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Top-level items with `visible !== false`. */
  public readonly visibleItems: Signal<ContextMenuItem[]> = computed<ContextMenuItem[]>(
    (): ContextMenuItem[] =>
      this.model().filter((item: ContextMenuItem): boolean => item.visible !== false)
  );

  // ── Event listener bound methods ──────────────────────────────────────────

  private readonly contextMenuHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
    this.show(event);
  };

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
    // Manage global contextmenu listener reactively
    effect((): void => {
      this.documentRef.removeEventListener('contextmenu', this.contextMenuHandler);
      if (this.global()) {
        this.documentRef.addEventListener('contextmenu', this.contextMenuHandler);
      }
    });

    // Manage click-outside and keydown listeners while the panel is open
    effect((): void => {
      this.documentRef.removeEventListener('click', this.clickOutsideHandler);
      this.documentRef.removeEventListener('keydown', this.keydownHandler);
      if (this.isVisible()) {
        this.documentRef.addEventListener('click', this.clickOutsideHandler);
        this.documentRef.addEventListener('keydown', this.keydownHandler);
      }
    });

    // After panel renders: adjust viewport position and focus first item
    effect((): void => {
      if (this.isVisible()) {
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
    this.documentRef.removeEventListener('contextmenu', this.contextMenuHandler);
    this.documentRef.removeEventListener('click', this.clickOutsideHandler);
    this.documentRef.removeEventListener('keydown', this.keydownHandler);
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Shows the context menu anchored at the cursor position of the given event.
   * Calls `event.preventDefault()` to suppress the native browser context menu.
   */
  public show(event: MouseEvent): void {
    event.preventDefault();
    this.menuX.set(event.clientX);
    this.menuY.set(event.clientY);
    this.activeSubmenuIndex.set(null);
    this.focusedIndex.set(-1);
    this.isVisible.set(true);
    this.menuShow.emit(event);
  }

  /** Hides the context menu. No-op when already hidden. */
  public hide(): void {
    if (!this.isVisible()) {
      return;
    }
    this.isVisible.set(false);
    this.activeSubmenuIndex.set(null);
    this.focusedIndex.set(-1);
    this.menuHide.emit();
  }

  /** Toggles the context menu at the cursor position of the given event. */
  public toggle(event: MouseEvent): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show(event);
    }
  }

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Returns the visible sub-items of a parent item (filters `visible === false`). */
  public getVisibleSubItems(item: ContextMenuItem): ContextMenuItem[] {
    return (item.items ?? []).filter((sub: ContextMenuItem): boolean => sub.visible !== false);
  }

  // ── Event handlers (called from the template) ─────────────────────────────

  /**
   * Handles a click or keyboard activation on a top-level menu item.
   * - If the item has children: toggles the submenu.
   * - Otherwise: emits `itemClick`, invokes `command`, then hides the menu.
   */
  public onItemActivate(
    event: MouseEvent | KeyboardEvent,
    item: ContextMenuItem,
    index: number
  ): void {
    if (item.disabled || item.separator) {
      event.preventDefault();
      return;
    }

    if (item.items?.length) {
      const current: number | null = this.activeSubmenuIndex();
      this.activeSubmenuIndex.set(current === index ? null : index);
      this.focusedIndex.set(index);
      return;
    }

    this.itemClick.emit({ item, originalEvent: event });
    if (item.command) {
      item.command({ item, originalEvent: event });
    }
    this.hide();
  }

  /** Handles a click or keyboard activation on a nested submenu item. */
  public onSubItemActivate(event: MouseEvent | KeyboardEvent, subItem: ContextMenuItem): void {
    if (subItem.disabled || subItem.separator) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit({ item: subItem, originalEvent: event });
    if (subItem.command) {
      subItem.command({ item: subItem, originalEvent: event });
    }
    this.hide();
  }

  /**
   * Handles `mouseenter` on top-level items.
   * Opens the submenu for items with children; closes it for leaf items.
   */
  public onItemMouseEnter(item: ContextMenuItem, index: number): void {
    if (item.items?.length && !item.disabled) {
      this.activeSubmenuIndex.set(index);
    } else {
      this.activeSubmenuIndex.set(null);
    }
    this.focusedIndex.set(index);
  }

  /** Handles keyboard events on top-level menu item links. */
  public onItemKeyDown(event: KeyboardEvent, item: ContextMenuItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.moveFocus(index, 1);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.moveFocus(index, -1);
        break;
      }
      case KEYBOARD_KEYS.ArrowRight: {
        event.preventDefault();
        if (item.items?.length && !item.disabled) {
          this.activeSubmenuIndex.set(index);
          this.focusedIndex.set(index);
          afterNextRender(
            (): void => {
              const panel: HTMLElement | null = this.panelRef()?.nativeElement ?? null;
              const firstSubLink: HTMLElement | null =
                panel?.querySelector<HTMLElement>(
                  '.ui-lib-context-menu__item--active .ui-lib-context-menu__submenu' +
                    ' .ui-lib-context-menu__link:not([aria-disabled="true"])'
                ) ?? null;
              firstSubLink?.focus();
            },
            { injector: this.injector }
          );
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowLeft: {
        event.preventDefault();
        this.activeSubmenuIndex.set(null);
        break;
      }
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        this.onItemActivate(event, item, index);
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.hide();
        break;
      }
      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        this.focusByVisibleIndex(0);
        break;
      }
      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        this.focusByVisibleIndex(this.visibleItems().length - 1);
        break;
      }
    }
  }

  /** Handles keyboard events on nested submenu item links. */
  public onSubItemKeyDown(event: KeyboardEvent, subItem: ContextMenuItem): void {
    const target: HTMLElement = event.target as HTMLElement;

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.getAdjacentSubmenuLink(target, 1)?.focus();
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.getAdjacentSubmenuLink(target, -1)?.focus();
        break;
      }
      case KEYBOARD_KEYS.ArrowLeft:
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.activeSubmenuIndex.set(null);
        this.focusByVisibleIndex(this.focusedIndex());
        break;
      }
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        this.onSubItemActivate(event, subItem);
        break;
      }
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /** Moves keyboard focus to the next or previous navigable top-level item. */
  private moveFocus(fromIndex: number, direction: 1 | -1): void {
    const items: ContextMenuItem[] = this.visibleItems();
    let next: number = fromIndex + direction;
    while (next >= 0 && next < items.length) {
      if (!items[next]?.separator && !items[next]?.disabled) {
        this.focusByVisibleIndex(next);
        return;
      }
      next += direction;
    }
  }

  /** Focuses the first non-separator, non-disabled top-level item. */
  private focusFirstItem(): void {
    const items: ContextMenuItem[] = this.visibleItems();
    for (let index: number = 0; index < items.length; index++) {
      if (!items[index]?.separator && !items[index]?.disabled) {
        this.focusByVisibleIndex(index);
        break;
      }
    }
  }

  /**
   * Focuses the top-level link element at visible-item index `index`.
   * Uses a direct DOM query within the panel for minimal coupling.
   */
  private focusByVisibleIndex(index: number): void {
    const panel: HTMLElement | null = this.panelRef()?.nativeElement ?? null;
    if (!panel) {
      return;
    }
    const links: NodeListOf<HTMLElement> = panel.querySelectorAll<HTMLElement>(
      ':scope > .ui-lib-context-menu__list > .ui-lib-context-menu__item > .ui-lib-context-menu__link'
    );
    const link: HTMLElement | undefined = links[index];
    if (link) {
      this.focusedIndex.set(index);
      link.focus();
    }
  }

  /**
   * Returns the adjacent (next or previous) focusable link within the
   * currently open submenu, relative to `currentLink`.
   */
  private getAdjacentSubmenuLink(currentLink: HTMLElement, direction: 1 | -1): HTMLElement | null {
    const submenu: HTMLElement | null = currentLink.closest<HTMLElement>(
      '.ui-lib-context-menu__submenu'
    );
    if (!submenu) {
      return null;
    }
    const links: HTMLElement[] = Array.from(
      submenu.querySelectorAll<HTMLElement>(
        '.ui-lib-context-menu__link:not([aria-disabled="true"])'
      )
    );
    const currentIndex: number = links.indexOf(currentLink);
    const nextIndex: number = currentIndex + direction;
    return nextIndex >= 0 && nextIndex < links.length ? (links[nextIndex] ?? null) : null;
  }

  /**
   * Reads the panel's bounding rect after it is rendered and flips the position
   * if it would overflow the viewport.
   */
  private adjustPanelPosition(): void {
    const panel: HTMLElement | null = this.panelRef()?.nativeElement ?? null;
    if (!panel) {
      return;
    }
    const rect: DOMRect = panel.getBoundingClientRect();
    const viewportWidth: number = this.documentRef.defaultView?.innerWidth ?? 0;
    const viewportHeight: number = this.documentRef.defaultView?.innerHeight ?? 0;

    let adjustedX: number = this.menuX();
    let adjustedY: number = this.menuY();

    if (adjustedX + rect.width > viewportWidth) {
      adjustedX = Math.max(0, adjustedX - rect.width);
    }
    if (adjustedY + rect.height > viewportHeight) {
      adjustedY = Math.max(0, adjustedY - rect.height);
    }

    this.menuX.set(adjustedX);
    this.menuY.set(adjustedY);
  }
}
