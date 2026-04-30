import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { PANEL_MENU_CONTEXT } from './panel-menu-context';
import type { PanelMenuContext } from './panel-menu-context';
import type { PanelMenuItem } from './panel-menu.types';

/**
 * Internal recursive sub-component that renders items within an expanded
 * PanelMenu panel. Not exported from the public API.
 */
@Component({
  selector: 'ui-lib-panel-menu-sub',
  standalone: true,
  imports: [PanelMenuSubComponent],
  templateUrl: './panel-menu-sub.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PanelMenuSubComponent {
  protected readonly context: PanelMenuContext = inject(PANEL_MENU_CONTEXT);

  /** Items to render at this sub-level. */
  public readonly items: InputSignal<PanelMenuItem[]> = input<PanelMenuItem[]>([]);

  /**
   * Path prefix for item keys at this level.
   * Root sub-lists use the root-item index (e.g. `"0"`);
   * deeper levels extend the prefix (e.g. `"0-2"`).
   */
  public readonly parentKey: InputSignal<string> = input<string>('');

  /** Nesting depth: 1 for direct children of a root panel, 2+ for deeper nesting. */
  public readonly depth: InputSignal<number> = input<number>(1);

  /** Items with `visible !== false`. */
  public readonly visibleItems: Signal<PanelMenuItem[]> = computed<PanelMenuItem[]>(
    (): PanelMenuItem[] =>
      this.items().filter((item: PanelMenuItem): boolean => item.visible !== false)
  );

  /** Builds a unique path key for the item at `index` within this sub-list. */
  public getItemKey(index: number): string {
    const prefix: string = this.parentKey();
    return prefix !== '' ? `${prefix}-${index}` : `${index}`;
  }

  /** Whether the item at `index` is currently expanded. */
  public isItemExpanded(index: number): boolean {
    return this.context.isItemExpanded(this.getItemKey(index));
  }

  /** Handles a toggle click or keyboard activation on a sub-group header. */
  public onToggle(event: MouseEvent | KeyboardEvent, item: PanelMenuItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    this.context.toggleItem(this.getItemKey(index), item);
  }

  /** Handles a click or keyboard activation on a leaf item. */
  public onActivate(event: MouseEvent | KeyboardEvent, item: PanelMenuItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    this.context.onItemActivate(item, event);
  }

  /** Handles keyboard events on sub-group headers and leaf links. */
  public onItemKeyDown(
    event: KeyboardEvent,
    item: PanelMenuItem,
    index: number,
    isGroup: boolean
  ): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (item.disabled) {
          return;
        }
        if (isGroup) {
          this.context.toggleItem(this.getItemKey(index), item);
        } else {
          this.context.onItemActivate(item, event);
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.moveFocus(event.currentTarget as HTMLElement, 1);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.moveFocus(event.currentTarget as HTMLElement, -1);
        break;
      }
    }
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /**
   * Moves focus to the next/previous interactive element (button or link)
   * within the same `<ul>` list.
   */
  private moveFocus(current: HTMLElement, direction: 1 | -1): void {
    const list: HTMLElement | null = current.closest('ul.ui-lib-panel-menu__sub-list');
    if (!list) {
      return;
    }
    const focusables: HTMLElement[] = Array.from(
      list.querySelectorAll<HTMLElement>(
        ':scope > li > .ui-lib-panel-menu__sub-header:not([disabled]),' +
          ':scope > li > .ui-lib-panel-menu__sub-link:not([aria-disabled="true"])'
      )
    );
    const currentIndex: number = focusables.indexOf(current);
    if (currentIndex === -1) {
      return;
    }
    const nextIndex: number = (currentIndex + direction + focusables.length) % focusables.length;
    focusables[nextIndex]?.focus();
  }
}
