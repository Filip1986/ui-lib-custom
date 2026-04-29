import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  DockItem,
  DockItemCommandEvent,
  DockPosition,
  DockSize,
  DockVariant,
} from './dock.types';

export type {
  DockItem,
  DockItemCommandEvent,
  DockPosition,
  DockSize,
  DockVariant,
} from './dock.types';

/**
 * Maximum scale factor applied to the directly hovered dock item when
 * magnification is enabled and `magnificationLevel` is not explicitly set.
 */
export const DOCK_DEFAULT_MAGNIFICATION_LEVEL: number = 1.5;

/**
 * Number of neighbouring items on each side of the hovered item that
 * receive a reduced (cascading) magnification effect.
 */
export const DOCK_MAGNIFICATION_SPREAD: number = 2;

/**
 * Dock component — a macOS-style icon bar with a hover magnification effect.
 *
 * Items magnify when hovered: the directly hovered item scales to
 * `magnificationLevel`, and up to `DOCK_MAGNIFICATION_SPREAD` neighbours on
 * each side scale proportionally. Supports bottom / top / left / right
 * positioning, three design variants, and three size tokens.
 */
@Component({
  selector: 'ui-lib-dock',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dock.html',
  styleUrl: './dock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Dock {
  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Items to display in the dock. */
  public readonly items: InputSignal<DockItem[]> = input<DockItem[]>([]);

  /** Position of the dock relative to its container. */
  public readonly position: InputSignal<DockPosition> = input<DockPosition>('bottom');

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<DockVariant | null> = input<DockVariant | null>(null);

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<DockSize> = input<DockSize>('md');

  /**
   * Whether the magnification effect is active on hover.
   * Set to false for a static, non-animating dock.
   */
  public readonly magnification: InputSignal<boolean> = input<boolean>(true);

  /**
   * Maximum scale factor applied to the directly hovered item.
   * Values between 1.2 and 2.5 work well visually.
   */
  public readonly magnificationLevel: InputSignal<number> = input<number>(
    DOCK_DEFAULT_MAGNIFICATION_LEVEL
  );

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a dock item is clicked or activated via keyboard. */
  public readonly itemClick: OutputEmitterRef<DockItemCommandEvent> =
    output<DockItemCommandEvent>();

  // ── Dependencies ─────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ── State ─────────────────────────────────────────────────────────────────

  /**
   * Index of the currently hovered item, or -1 when no item is hovered.
   * Drives the magnification scale calculations.
   */
  public readonly hoveredIndex: WritableSignal<number> = signal<number>(-1);

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<DockVariant> = computed<DockVariant>(
    (): DockVariant => this.variant() ?? (this.themeConfig.variant() as DockVariant)
  );

  /** Filtered items — only those where `visible` is not explicitly false. */
  public readonly visibleItems: Signal<DockItem[]> = computed<DockItem[]>((): DockItem[] =>
    this.items().filter((item: DockItem): boolean => item.visible !== false)
  );

  /** Host CSS classes derived from current variant, size, position, and optional styleClass. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-dock',
      `ui-lib-dock--variant-${this.effectiveVariant()}`,
      `ui-lib-dock--size-${this.size()}`,
      `ui-lib-dock--position-${this.position()}`,
    ];

    if (!this.magnification()) {
      classes.push('ui-lib-dock--no-magnification');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  // ── Public template helpers ───────────────────────────────────────────────

  /**
   * Computes the CSS `transform: scale(...)` value for the item at the given
   * index based on its distance from the currently hovered item.
   *
   * When magnification is disabled or no item is hovered, returns an empty
   * string (no inline style applied).
   */
  public itemScale(index: number): string {
    if (!this.magnification()) {
      return '';
    }

    const hovered: number = this.hoveredIndex();
    if (hovered === -1) {
      return '';
    }

    const distance: number = Math.abs(index - hovered);
    if (distance > DOCK_MAGNIFICATION_SPREAD) {
      return '';
    }

    const level: number = this.magnificationLevel();
    // Scale falls off linearly from full magnification at distance 0 to 1 at spread+1.
    const scale: number = 1 + (level - 1) * (1 - distance / (DOCK_MAGNIFICATION_SPREAD + 1));

    return `scale(${scale.toFixed(3)})`;
  }

  /**
   * Returns true when the item is clickable (has `url`, `routerLink`, or
   * `command`) and is not disabled.
   */
  public isClickable(item: DockItem): boolean {
    if (item.disabled) {
      return false;
    }

    return Boolean(item.url ?? item.routerLink ?? item.command);
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  /** Sets the hovered index when the pointer enters an item. */
  public onItemMouseEnter(index: number): void {
    this.hoveredIndex.set(index);
  }

  /** Clears the hovered index when the pointer leaves an item. */
  public onItemMouseLeave(): void {
    this.hoveredIndex.set(-1);
  }

  /** Handles click events on a dock item. */
  public onItemClick(event: MouseEvent, item: DockItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit({ item, originalEvent: event });

    if (item.command) {
      item.command({ item, originalEvent: event });
    }
  }

  /** Handles keyboard activation (Enter / Space) on button-style dock items. */
  public onItemKeyDown(event: KeyboardEvent, item: DockItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!item.disabled) {
        this.itemClick.emit({ item, originalEvent: event });
        if (item.command) {
          item.command({ item, originalEvent: event });
        }
      }
    }
  }
}
