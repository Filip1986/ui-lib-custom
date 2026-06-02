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
  viewChild,
  ViewEncapsulation,
  type WritableSignal,
} from '@angular/core';

import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { MenuItem, MenuItemCommandEvent, MenuSize, MenuVariant } from './menu.types';

export type { MenuItem, MenuItemCommandEvent, MenuSize, MenuVariant } from './menu.types';

/** Default accessible label exported for test assertions. */
export const MENU_DEFAULT_ARIA_LABEL: string = 'Menu';

/** Auto-incrementing counter to generate unique IDs for each Menu instance. */
let nextMenuId: number = 0;

/**
 * Menu component — a panel of navigable items. Supports both static (inline)
 * and popup modes. Items can be grouped under labelled headers, separated by
 * dividers, or rendered as direct entries with icons and command callbacks.
 *
 * **Static usage:**
 * ```html
 * <ui-lib-menu [model]="items" />
 * ```
 *
 * **Popup usage (attach to a button):**
 * ```html
 * <ui-lib-button label="Options" (click)="menu.toggle($event)" />
 * <ui-lib-menu #menu [model]="items" [popup]="true" />
 * ```
 */
@Component({
  selector: 'ui-lib-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Menu implements OnDestroy {
  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Array of menu items or group-header items to display. */
  public readonly model: InputSignal<MenuItem[]> = input<MenuItem[]>([]);

  /**
   * When true, the menu renders as a floating popup anchored to the trigger
   * element. Use `toggle(event)`, `show(event)`, or `hide()` to control it.
   * When false (default), the panel is always visible inline.
   */
  public readonly popup: InputSignal<boolean> = input<boolean>(false);

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<MenuVariant | null> = input<MenuVariant | null>(null);

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<MenuSize> = input<MenuSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /**
   * Accessible label for the menu panel (`aria-label`).
   * Defaults to the i18n `menu.aria-label` key when not provided.
   */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a non-disabled leaf item is clicked or activated via keyboard. */
  public readonly itemClick: OutputEmitterRef<MenuItemCommandEvent> =
    output<MenuItemCommandEvent>();

  /** Emitted when the popup menu becomes visible. */
  public readonly menuShow: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /** Emitted when the popup menu is hidden. */
  public readonly menuHide: OutputEmitterRef<void> = output<void>();

  // ── Internal state ────────────────────────────────────────────────────────

  /** Whether the popup panel is currently rendered (only relevant in popup mode). */
  public readonly isVisible: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Guards against a one-frame opacity flash before the popup panel is
   * positioned correctly after first render.
   */
  public readonly isPositioned: WritableSignal<boolean> = signal<boolean>(false);

  /** Horizontal position of the popup panel (CSS `left`, in px). */
  public readonly menuX: WritableSignal<number> = signal<number>(0);

  /** Vertical position of the popup panel (CSS `top`, in px). */
  public readonly menuY: WritableSignal<number> = signal<number>(0);

  /** Index within `flatFocusableItems()` of the currently focused item. */
  public readonly focusedFlatIndex: WritableSignal<number> = signal<number>(-1);

  /**
   * Index of the item that currently holds the tab stop (roving tabindex).
   * Only this item gets `tabindex="0"`; all others get `-1`.
   */
  public readonly rovingIndex: WritableSignal<number> = signal<number>(0);

  /** Unique ID for this Menu instance. */
  public readonly menuId: string = this.generateId();

  // ── Dependencies ──────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private previousFocusEl: HTMLElement | null = null;

  // ── View children ─────────────────────────────────────────────────────────

  /** Reference to the panel `<div>` for popup position adjustment. */
  private readonly panelRef: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('panelRef');

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<MenuVariant> = computed<MenuVariant>(
    (): MenuVariant => this.variant() ?? (this.themeConfig.variant() as MenuVariant),
  );

  /** Resolved aria-label — i18n fallback when ariaLabel input is null. */
  public readonly effectiveAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() ?? this.i18n.translate('menu.aria-label'),
  );

  /** Combined CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-menu',
      `ui-lib-menu--variant-${this.effectiveVariant()}`,
      `ui-lib-menu--size-${this.size()}`,
    ];
    if (this.popup()) {
      classes.push('ui-lib-menu--popup');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Top-level items with `visible !== false`. */
  public readonly visibleItems: Signal<MenuItem[]> = computed<MenuItem[]>((): MenuItem[] =>
    this.model().filter((item: MenuItem): boolean => item.visible !== false),
  );

  /**
   * Flat list of all focusable leaf items (non-separator, non-disabled,
   * non-group-header) in document order. Used for keyboard navigation.
   */
  public readonly flatFocusableItems: Signal<MenuItem[]> = computed<MenuItem[]>((): MenuItem[] => {
    const focusable: MenuItem[] = [];
    for (const item of this.visibleItems()) {
      if (item.items?.length) {
        // Group header — collect its visible, focusable children
        for (const child of item.items ?? []) {
          if (child.visible !== false && !child.separator && !child.disabled) {
            focusable.push(child);
          }
        }
      } else if (!item.separator && !item.disabled) {
        focusable.push(item);
      }
    }
    return focusable;
  });

  /** Whether the panel should be rendered (static: always; popup: only when visible). */
  public readonly isPanelRendered: Signal<boolean> = computed<boolean>(
    (): boolean => !this.popup() || this.isVisible(),
  );

  // ── Event listener bound methods ──────────────────────────────────────────

  private readonly clickOutsideHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.hide(false);
    }
  };

  private readonly keydownGlobalHandler: (event: KeyboardEvent) => void = (
    event: KeyboardEvent,
  ): void => {
    if (event.key === KEYBOARD_KEYS.Escape) {
      this.hide(true);
    }
  };

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor() {
    // Manage click-outside and global keydown listeners for popup mode
    effect((): void => {
      this.documentRef.removeEventListener('click', this.clickOutsideHandler);
      this.documentRef.removeEventListener('keydown', this.keydownGlobalHandler);
      if (this.popup() && this.isVisible()) {
        this.documentRef.addEventListener('click', this.clickOutsideHandler);
        this.documentRef.addEventListener('keydown', this.keydownGlobalHandler);
      }
    });

    // After popup panel renders: adjust viewport position and focus first item
    effect((): void => {
      if (this.popup() && this.isVisible()) {
        afterNextRender(
          (): void => {
            this.adjustPopupPosition();
            this.isPositioned.set(true);
            this.focusByFlatIndex(0);
          },
          { injector: this.injector },
        );
      } else {
        this.isPositioned.set(false);
        this.focusedFlatIndex.set(-1);
      }
    });
  }

  public ngOnDestroy(): void {
    this.documentRef.removeEventListener('click', this.clickOutsideHandler);
    this.documentRef.removeEventListener('keydown', this.keydownGlobalHandler);
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Toggles the popup menu open/closed, anchoring it to the trigger element.
   * No-op when `popup` is false.
   */
  public toggle(event: MouseEvent): void {
    if (!this.popup()) {
      return;
    }
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show(event);
    }
  }

  /**
   * Shows the popup menu anchored to the bounding rect of `event.currentTarget`
   * (or falls back to cursor position). No-op when `popup` is false.
   */
  public show(event: MouseEvent): void {
    if (!this.popup()) {
      return;
    }
    event.stopPropagation();
    const target: EventTarget | null = event.currentTarget;
    this.capturePreviousFocus(target);
    if (target instanceof HTMLElement) {
      const rect: DOMRect = target.getBoundingClientRect();
      this.menuX.set(rect.left);
      this.menuY.set(rect.bottom + 4);
    } else {
      this.menuX.set(event.clientX);
      this.menuY.set(event.clientY);
    }
    this.isVisible.set(true);
    this.menuShow.emit(event);
  }

  /** Hides the popup menu. No-op when already hidden or when `popup` is false. */
  public hide(restoreFocus: boolean = false): void {
    if (!this.popup() || !this.isVisible()) {
      return;
    }
    this.isVisible.set(false);
    if (restoreFocus) {
      this.restoreFocus();
    } else {
      this.previousFocusEl = null;
    }
    this.menuHide.emit();
  }

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Returns the visible sub-items of a group header item. */
  public getVisibleGroupItems(item: MenuItem): MenuItem[] {
    return (item.items ?? []).filter((child: MenuItem): boolean => child.visible !== false);
  }

  /**
   * Returns the flat index of a leaf item within `flatFocusableItems()`.
   * Used to synchronise `focusedFlatIndex` when focus moves into an item.
   */
  public getFlatIndex(item: MenuItem): number {
    return this.flatFocusableItems().indexOf(item);
  }

  /** Returns the correct tabindex value for a menu item (roving tabindex). */
  public getTabIndex(item: MenuItem, flatIndex: number): string {
    if (item.disabled) {
      return '-1';
    }
    return flatIndex === this.rovingIndex() ? '0' : '-1';
  }

  // ── Event handlers (called from template) ────────────────────────────────

  /**
   * Handles a click or keyboard activation on any menu item.
   * Emits `itemClick`, invokes `command`, then hides the popup (if applicable).
   */
  public onItemActivate(event: MouseEvent | KeyboardEvent, item: MenuItem): void {
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
    if (this.popup()) {
      this.hide();
    }
  }

  /** Handles keyboard events on menu item links. */
  public onItemKeyDown(event: KeyboardEvent, item: MenuItem): void {
    const currentFlatIndex: number = this.getFlatIndex(item);

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.moveFocus(currentFlatIndex, 1);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.moveFocus(currentFlatIndex, -1);
        break;
      }
      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        this.focusByFlatIndex(0);
        break;
      }
      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        this.focusByFlatIndex(this.flatFocusableItems().length - 1);
        break;
      }
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        this.onItemActivate(event, item);
        break;
      }
      case KEYBOARD_KEYS.Tab: {
        if (this.popup()) {
          this.hide(false);
        }
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        if (this.popup()) {
          event.preventDefault();
          this.hide(true);
        }
        break;
      }
    }
  }

  /** Tracks focus changes to update `focusedFlatIndex`. */
  public onItemFocus(item: MenuItem): void {
    const flatIndex: number = this.getFlatIndex(item);
    this.focusedFlatIndex.set(flatIndex);
    this.rovingIndex.set(flatIndex);
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /** Moves keyboard focus forward or backward through the flat focusable list. */
  private moveFocus(fromIndex: number, direction: 1 | -1): void {
    const total: number = this.flatFocusableItems().length;
    if (total === 0) {
      return;
    }
    const nextIndex: number = (fromIndex + direction + total) % total;
    this.focusByFlatIndex(nextIndex);
  }

  /**
   * Focuses the link element corresponding to `index` in the flat focusable
   * list. Queries the panel DOM for `.ui-lib-menu__link` elements in order.
   */
  private focusByFlatIndex(index: number): void {
    const panel: HTMLElement | null = this.panelRef()?.nativeElement ?? null;
    if (!panel) {
      return;
    }
    const links: NodeListOf<HTMLElement> = panel.querySelectorAll<HTMLElement>(
      '.ui-lib-menu__link:not([aria-disabled="true"])',
    );
    const link: HTMLElement | undefined = links[index];
    if (link) {
      this.rovingIndex.set(index);
      this.focusedFlatIndex.set(index);
      link.focus();
    }
  }

  /** Restores focus to the previously focused trigger element. */
  private restoreFocus(): void {
    this.previousFocusEl?.focus();
    this.previousFocusEl = null;
  }

  /** Captures the best focus restoration target before the popup opens. */
  private capturePreviousFocus(target: EventTarget | null): void {
    const activeElement: HTMLElement | null = this.documentRef.activeElement as HTMLElement | null;
    if (activeElement && activeElement !== this.documentRef.body) {
      this.previousFocusEl = activeElement;
      return;
    }
    if (target instanceof HTMLElement) {
      this.previousFocusEl = target;
      return;
    }
    this.previousFocusEl = null;
  }

  /** Generates a stable unique ID for this Menu instance. */
  private generateId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `uilib-menu-${globalThis.crypto.randomUUID()}`;
    }
    nextMenuId += 1;
    return `uilib-menu-${Date.now()}-${nextMenuId}-${Math.random().toString(36).slice(2, 8)}`;
  }

  /**
   * After the popup panel renders, adjusts its `left`/`top` to prevent it
   * from overflowing the viewport edges.
   */
  private adjustPopupPosition(): void {
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
      adjustedX = Math.max(0, viewportWidth - rect.width - 4);
    }
    if (adjustedY + rect.height > viewportHeight) {
      adjustedY = Math.max(0, this.menuY() - rect.height - 4);
    }

    this.menuX.set(adjustedX);
    this.menuY.set(adjustedY);
  }
}
