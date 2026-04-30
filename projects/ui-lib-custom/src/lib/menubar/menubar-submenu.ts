import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import type { MenubarCommandEvent, MenubarItem } from './menubar.types';

/**
 * Internal recursive sub-component that renders a single dropdown submenu panel.
 * Not exported from the public API — consumed only by `Menubar` and itself.
 */
@Component({
  selector: 'ui-lib-menubar-sub',
  standalone: true,
  imports: [MenubarSubComponent],
  templateUrl: './menubar-submenu.html',
  styleUrl: './menubar-submenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenubarSubComponent {
  // ── Inputs ──────────────────────────────────────────────────────────────

  /** Items to render at this submenu level. */
  public readonly items: InputSignal<MenubarItem[]> = input<MenubarItem[]>([]);

  /**
   * Nesting depth: 1 = first dropdown below the menubar bar,
   * 2+ = nested sub-panel opening to the right of a parent item.
   */
  public readonly level: InputSignal<number> = input<number>(1);

  // ── Outputs ─────────────────────────────────────────────────────────────

  /** Emitted when a leaf item is activated; bubbles up to the root `Menubar`. */
  public readonly itemActivated: OutputEmitterRef<MenubarCommandEvent> =
    output<MenubarCommandEvent>();

  // ── Internal state ───────────────────────────────────────────────────────

  /** Index of the item whose nested sub-panel is open (-1 = none). */
  public readonly activeIndex: WritableSignal<number> = signal<number>(-1);

  // ── Computed ─────────────────────────────────────────────────────────────

  /** Items filtered to `visible !== false`. */
  public readonly visibleItems: Signal<MenubarItem[]> = computed<MenubarItem[]>((): MenubarItem[] =>
    this.items().filter((item: MenubarItem): boolean => item.visible !== false)
  );

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Computes the CSS class string for a submenu item `<li>`. */
  public getSubItemClasses(item: MenubarItem, index: number): string {
    const classes: string[] = ['ui-lib-menubar__sub-item'];
    if (item.disabled) {
      classes.push('ui-lib-menubar__sub-item--disabled');
    }
    if (this.activeIndex() === index) {
      classes.push('ui-lib-menubar__sub-item--active');
    }
    if (item.items?.length) {
      classes.push('ui-lib-menubar__sub-item--has-submenu');
    }
    if (item.styleClass) {
      classes.push(item.styleClass);
    }
    return classes.join(' ');
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  /**
   * Opens the nested sub-panel for items that have children when the mouse
   * enters. Closes any open sub-panel if the hovered item is a leaf node.
   */
  public onItemMouseEnter(index: number, item: MenubarItem): void {
    if (item.disabled || item.separator) {
      this.activeIndex.set(-1);
      return;
    }
    this.activeIndex.set(item.items?.length ? index : -1);
  }

  /** Handles a click event on a submenu item. */
  public onItemClick(event: MouseEvent, item: MenubarItem, index: number): void {
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

  /** Handles keyboard events on submenu item links. */
  public onItemKeyDown(event: KeyboardEvent, item: MenubarItem, index: number): void {
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
        if (item.items?.length) {
          event.preventDefault();
          this.activeIndex.set(index);
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowLeft:
      case KEYBOARD_KEYS.Escape: {
        event.preventDefault();
        this.activeIndex.set(-1);
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.focusNextItem(event.currentTarget as HTMLElement, 1);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.focusNextItem(event.currentTarget as HTMLElement, -1);
        break;
      }
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /**
   * Moves focus to the next/previous focusable item link within the same
   * `<ul role="menu">` list.
   */
  private focusNextItem(current: HTMLElement, direction: 1 | -1): void {
    const list: HTMLElement | null = current.closest('ul[role="menu"]');
    if (!list) {
      return;
    }
    const links: NodeListOf<HTMLElement> = list.querySelectorAll<HTMLElement>(
      ':scope > li > a.ui-lib-menubar__sub-link:not([aria-disabled="true"])'
    );
    const linksArray: HTMLElement[] = Array.from(links);
    const currentIndex: number = linksArray.indexOf(current);
    if (currentIndex === -1) {
      return;
    }
    const nextIndex: number = (currentIndex + direction + linksArray.length) % linksArray.length;
    linksArray[nextIndex]?.focus();
  }
}
