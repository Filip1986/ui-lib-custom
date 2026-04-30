import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { PANEL_MENU_CONTEXT } from './panel-menu-context';
import type { PanelMenuContext } from './panel-menu-context';
import { PanelMenuSubComponent } from './panel-menu-sub';
import type {
  PanelMenuCommandEvent,
  PanelMenuItem,
  PanelMenuPanelToggleEvent,
  PanelMenuSize,
  PanelMenuVariant,
} from './panel-menu.types';

export type {
  PanelMenuCommandEvent,
  PanelMenuItem,
  PanelMenuPanelToggleEvent,
  PanelMenuSize,
  PanelMenuVariant,
} from './panel-menu.types';

/** Default accessible label exported for test assertions. */
export const PANEL_MENU_DEFAULT_ARIA_LABEL: string = 'Panel Menu';

/**
 * PanelMenu — a vertical, accordion-style navigation menu driven by a
 * `model` array. Root items with an `items` array act as collapsible panels;
 * leaf items (no `items`) are directly activatable.
 *
 * ```html
 * <ui-lib-panel-menu [model]="items" />
 * ```
 */
@Component({
  selector: 'ui-lib-panel-menu',
  standalone: true,
  imports: [PanelMenuSubComponent],
  templateUrl: './panel-menu.html',
  styleUrl: './panel-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
  providers: [
    {
      provide: PANEL_MENU_CONTEXT,
      useExisting: PanelMenu,
    },
  ],
})
export class PanelMenu implements PanelMenuContext {
  // ── Dependencies ──────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Array of root-level items. */
  public readonly model: InputSignal<PanelMenuItem[]> = input<PanelMenuItem[]>([]);

  /**
   * When `true`, multiple root panels can be expanded simultaneously.
   * When `false` (default) expanding one panel collapses all others.
   */
  public readonly multiple: InputSignal<boolean> = input<boolean>(false);

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<PanelMenuVariant | null> = input<PanelMenuVariant | null>(
    null
  );

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<PanelMenuSize> = input<PanelMenuSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label applied to the root container (aria-label). */
  public readonly ariaLabel: InputSignal<string> = input<string>(PANEL_MENU_DEFAULT_ARIA_LABEL);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a leaf item is activated (clicked or keyboard-activated). */
  public readonly itemClick: OutputEmitterRef<PanelMenuCommandEvent> =
    output<PanelMenuCommandEvent>();

  /** Emitted when a root panel's expansion state changes. */
  public readonly panelToggle: OutputEmitterRef<PanelMenuPanelToggleEvent> =
    output<PanelMenuPanelToggleEvent>();

  // ── Internal state ────────────────────────────────────────────────────────

  /** Set of path keys whose panels are currently expanded. */
  private readonly expandedKeys: WritableSignal<Set<string>> = signal<Set<string>>(
    new Set<string>()
  );

  /** Whether the initial-expansion effect has already run. */
  private initialised: boolean = false;

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when `variant` is null. */
  public readonly resolvedVariant: Signal<PanelMenuVariant> = computed<PanelMenuVariant>(
    (): PanelMenuVariant => this.variant() ?? (this.themeConfig.variant() as PanelMenuVariant)
  );

  /** Combined CSS host classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-panel-menu',
      `ui-lib-panel-menu--variant-${this.resolvedVariant()}`,
      `ui-lib-panel-menu--size-${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Root items with `visible !== false`. */
  public readonly visibleRootItems: Signal<PanelMenuItem[]> = computed<PanelMenuItem[]>(
    (): PanelMenuItem[] =>
      this.model().filter((item: PanelMenuItem): boolean => item.visible !== false)
  );

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor() {
    // Initialise expanded keys from items marked `expanded: true` on first render.
    effect((): void => {
      const items: PanelMenuItem[] = this.model();
      if (this.initialised || items.length === 0) {
        return;
      }
      this.initialised = true;
      const initial: Set<string> = new Set<string>();
      items.forEach((item: PanelMenuItem, index: number): void => {
        if (item.expanded) {
          initial.add(`${index}`);
        }
      });
      if (initial.size > 0) {
        this.expandedKeys.set(initial);
      }
    });
  }

  // ── PanelMenuContext implementation ───────────────────────────────────────

  /** Returns whether the item with path `key` is expanded. */
  public isItemExpanded(key: string): boolean {
    return this.expandedKeys().has(key);
  }

  /**
   * Toggles expansion of the item identified by `key`.
   * In single mode (`multiple=false`) all sibling items at the same depth are
   * collapsed before the target is expanded.
   */
  public toggleItem(key: string, item: PanelMenuItem): void {
    if (item.disabled) {
      return;
    }
    const current: Set<string> = this.expandedKeys();
    const wasExpanded: boolean = current.has(key);
    const next: Set<string> = new Set<string>(current);

    if (wasExpanded) {
      // Collapse the item and all descendants.
      for (const existingKey of next) {
        if (existingKey === key || existingKey.startsWith(`${key}-`)) {
          next.delete(existingKey);
        }
      }
    } else {
      if (!this.multiple()) {
        // Collapse all items at the same depth level.
        const levelPrefix: string = this.getLevelPrefix(key);
        for (const existingKey of next) {
          if (this.getLevelPrefix(existingKey) === levelPrefix) {
            for (const k of next) {
              if (k === existingKey || k.startsWith(`${existingKey}-`)) {
                next.delete(k);
              }
            }
          }
        }
      }
      next.add(key);
    }

    this.expandedKeys.set(next);

    // Emit panelToggle only for root-level items (keys without a dash).
    if (!key.includes('-')) {
      this.panelToggle.emit({ item, expanded: !wasExpanded, key });
    }
  }

  /** Emits `itemClick` output and invokes the item's `command` callback. */
  public onItemActivate(item: PanelMenuItem, event: MouseEvent | KeyboardEvent): void {
    if (item.disabled) {
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
  }

  // ── Template helpers ──────────────────────────────────────────────────────

  /** Returns the path key string for a root item at `index`. */
  public getRootKey(index: number): string {
    return `${index}`;
  }

  // ── Event handlers (called from the root template) ────────────────────────

  /** Handles a click on a root panel header button. */
  public onRootItemClick(event: MouseEvent, item: PanelMenuItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (item.items && item.items.length > 0) {
      event.preventDefault();
      this.toggleItem(this.getRootKey(index), item);
    } else {
      this.onItemActivate(item, event);
    }
  }

  /** Handles keyboard events on root panel header buttons. */
  public onRootItemKeyDown(event: KeyboardEvent, item: PanelMenuItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (item.disabled) {
          return;
        }
        if (item.items && item.items.length > 0) {
          this.toggleItem(this.getRootKey(index), item);
        } else {
          this.onItemActivate(item, event);
        }
        break;
      }
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        this.focusRootHeader(event.currentTarget as HTMLElement, 1);
        break;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        this.focusRootHeader(event.currentTarget as HTMLElement, -1);
        break;
      }
      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        this.focusFirstRootHeader(event.currentTarget as HTMLElement);
        break;
      }
      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        this.focusLastRootHeader(event.currentTarget as HTMLElement);
        break;
      }
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /** Returns the level prefix of `key` (everything before the last `-`). */
  private getLevelPrefix(key: string): string {
    const lastDash: number = key.lastIndexOf('-');
    return lastDash === -1 ? '__root__' : key.substring(0, lastDash);
  }

  /** Focuses the next/previous root header relative to `current`. */
  private focusRootHeader(current: HTMLElement, direction: 1 | -1): void {
    const host: HTMLElement | null = current.closest('ui-lib-panel-menu');
    if (!host) {
      return;
    }
    const headers: HTMLElement[] = Array.from(
      host.querySelectorAll<HTMLElement>(
        ':scope > .ui-lib-panel-menu__container > .ui-lib-panel-menu__panel' +
          ' > .ui-lib-panel-menu__header:not([disabled])'
      )
    );
    const currentIndex: number = headers.indexOf(current);
    if (currentIndex === -1) {
      return;
    }
    const nextIndex: number = (currentIndex + direction + headers.length) % headers.length;
    headers[nextIndex]?.focus();
  }

  /** Focuses the first non-disabled root header. */
  private focusFirstRootHeader(current: HTMLElement): void {
    const host: HTMLElement | null = current.closest('ui-lib-panel-menu');
    if (!host) {
      return;
    }
    const first: HTMLElement | null = host.querySelector<HTMLElement>(
      ':scope > .ui-lib-panel-menu__container > .ui-lib-panel-menu__panel' +
        ' > .ui-lib-panel-menu__header:not([disabled])'
    );
    first?.focus();
  }

  /** Focuses the last non-disabled root header. */
  private focusLastRootHeader(current: HTMLElement): void {
    const host: HTMLElement | null = current.closest('ui-lib-panel-menu');
    if (!host) {
      return;
    }
    const headers: HTMLElement[] = Array.from(
      host.querySelectorAll<HTMLElement>(
        ':scope > .ui-lib-panel-menu__container > .ui-lib-panel-menu__panel' +
          ' > .ui-lib-panel-menu__header:not([disabled])'
      )
    );
    headers.at(-1)?.focus();
  }
}
