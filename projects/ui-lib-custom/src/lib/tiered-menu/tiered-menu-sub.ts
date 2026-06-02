import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type InputSignal,
  output,
  type OutputEmitterRef,
  type Signal,
  signal,
  ViewEncapsulation,
  type WritableSignal,
} from '@angular/core';

import { KEYBOARD_KEYS } from 'ui-lib-custom/core';

import type { TieredMenuItem, TieredMenuItemCommandEvent } from './tiered-menu.types';

/**
 * Internal recursive sub-component that renders a single flyout submenu panel.
 * Not exported from the public API — consumed only by `TieredMenu` and itself.
 */
@Component({
  selector: 'ui-lib-tiered-menu-sub',
  standalone: true,
  imports: [TieredMenuSubComponent],
  templateUrl: './tiered-menu-sub.html',
  styleUrl: './tiered-menu-sub.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TieredMenuSubComponent {
  // ── Inputs ───────────────────────────────────────────────────────────────

  /** Items to render at this submenu level. */
  public readonly items: InputSignal<TieredMenuItem[]> = input<TieredMenuItem[]>([]);

  /**
   * Nesting depth: 0 = root list, 1 = first flyout, 2+ = deeper flyouts.
   * Used for ARIA `aria-level` and CSS depth-scoped positioning.
   */
  public readonly level: InputSignal<number> = input<number>(0);

  /**
   * Accessible name for the `<ul role="menu">` at this level.
   * - Root level: passed from `TieredMenu.ariaLabel` input (e.g. `'Menu'`).
   * - Nested levels: the parent item's label (e.g. `'File'`).
   */
  public readonly ariaLabel: InputSignal<string> = input<string>('');

  // ── Outputs ──────────────────────────────────────────────────────────────

  /** Emitted when a leaf item is activated; bubbles up to the root `TieredMenu`. */
  public readonly itemActivated: OutputEmitterRef<TieredMenuItemCommandEvent> =
    output<TieredMenuItemCommandEvent>();

  /**
   * Emitted when Escape or Tab is pressed inside this sub or any of its
   * descendants. The root `TieredMenu` listens to this on the level-0 sub and
   * calls `hide(true)` to close the popup and restore focus to the trigger.
   * Intermediate sub-levels relay this upward via `onNestedEscapeMenu()`.
   */
  public readonly escapeMenu: OutputEmitterRef<void> = output<void>();

  // ── Internal state ────────────────────────────────────────────────────────

  /** Index of the item whose nested flyout panel is currently open (-1 = none). */
  public readonly activeIndex: WritableSignal<number> = signal<number>(-1);

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Items filtered to `visible !== false`. */
  public readonly visibleItems: Signal<TieredMenuItem[]> = computed<TieredMenuItem[]>(
    (): TieredMenuItem[] =>
      this.items().filter((item: TieredMenuItem): boolean => item.visible !== false),
  );

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Computes the CSS class string for an item `<li>`. */
  public getItemClasses(item: TieredMenuItem, index: number): string {
    const classes: string[] = ['ui-lib-tiered-menu__item'];
    if (item.disabled) {
      classes.push('ui-lib-tiered-menu__item--disabled');
    }
    if (this.activeIndex() === index) {
      classes.push('ui-lib-tiered-menu__item--active');
    }
    if (item.items?.length) {
      classes.push('ui-lib-tiered-menu__item--has-submenu');
    }
    if (item.styleClass) {
      classes.push(item.styleClass);
    }
    return classes.join(' ');
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  /**
   * Opens the flyout for items with children when the mouse enters.
   * Closes any open flyout if the hovered item is a leaf.
   */
  public onItemMouseEnter(index: number, item: TieredMenuItem): void {
    if (item.disabled || item.separator) {
      this.activeIndex.set(-1);
      return;
    }
    this.activeIndex.set(item.items?.length ? index : -1);
  }

  /** Handles a click event on a menu item. */
  public onItemClick(event: MouseEvent, item: TieredMenuItem, index: number): void {
    if (item.disabled || item.separator) {
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

    this.itemActivated.emit({ item, originalEvent: event });
    if (item.command) {
      item.command({ item, originalEvent: event });
    }
  }

  /** Handles keyboard events on item links. */
  public onItemKeyDown(event: KeyboardEvent, item: TieredMenuItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (item.disabled || item.separator) {
          return;
        }
        if (item.items?.length) {
          this.activeIndex.set(this.activeIndex() === index ? -1 : index);
        } else {
          this.itemActivated.emit({ item, originalEvent: event });
          if (item.command) {
            item.command({ item, originalEvent: event });
          }
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowRight: {
        if (item.items?.length && !item.disabled) {
          event.preventDefault();
          this.activeIndex.set(index);
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowLeft: {
        event.preventDefault();
        this.activeIndex.set(-1);
        break;
      }
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.activeIndex.set(-1);
        this.escapeMenu.emit();
        break;
      }
      case KEYBOARD_KEYS.Tab: {
        // Do NOT prevent default — Tab must move browser focus naturally.
        // Signal the root TieredMenu to close the popup panel.
        this.escapeMenu.emit();
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.focusAdjacentItem(event.currentTarget as HTMLElement, 1);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.focusAdjacentItem(event.currentTarget as HTMLElement, -1);
        break;
      }
      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        this.focusFirstOrLastItem(event.currentTarget as HTMLElement, 'first');
        break;
      }
      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        this.focusFirstOrLastItem(event.currentTarget as HTMLElement, 'last');
        break;
      }
    }
  }

  /** Re-emits an `itemActivated` event from a deeper sub-level. */
  public onNestedItemActivated(commandEvent: TieredMenuItemCommandEvent): void {
    this.itemActivated.emit(commandEvent);
  }

  /**
   * Handles `escapeMenu` relayed from a nested sub-level.
   * Closes the active child flyout at this level and propagates the signal upward.
   */
  public onNestedEscapeMenu(_index: number): void {
    this.activeIndex.set(-1);
    this.escapeMenu.emit();
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /**
   * Moves focus to the next/previous focusable item link within the same
   * `<ul role="menu">` list.
   */
  private focusAdjacentItem(current: HTMLElement, direction: 1 | -1): void {
    const list: HTMLElement | null = current.closest('ul[role="menu"]');
    if (!list) {
      return;
    }
    const links: NodeListOf<HTMLElement> = list.querySelectorAll<HTMLElement>(
      ':scope > li > a.ui-lib-tiered-menu__link:not([aria-disabled="true"])',
    );
    const linksArray: HTMLElement[] = Array.from(links);
    const currentIndex: number = linksArray.indexOf(current);
    if (currentIndex === -1) {
      return;
    }
    const nextIndex: number = (currentIndex + direction + linksArray.length) % linksArray.length;
    linksArray[nextIndex]?.focus();
  }

  /** Focuses the first or last focusable item link within the same `<ul>`. */
  private focusFirstOrLastItem(current: HTMLElement, position: 'first' | 'last'): void {
    const list: HTMLElement | null = current.closest('ul[role="menu"]');
    if (!list) {
      return;
    }
    const links: NodeListOf<HTMLElement> = list.querySelectorAll<HTMLElement>(
      ':scope > li > a.ui-lib-tiered-menu__link:not([aria-disabled="true"])',
    );
    const linksArray: HTMLElement[] = Array.from(links);
    if (position === 'first') {
      linksArray[0]?.focus();
    } else {
      linksArray[linksArray.length - 1]?.focus();
    }
  }
}
