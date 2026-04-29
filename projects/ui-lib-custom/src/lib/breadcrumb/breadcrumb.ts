import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  output,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type TemplateRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  BreadcrumbItem,
  BreadcrumbItemClickEvent,
  BreadcrumbSize,
  BreadcrumbVariant,
} from './breadcrumb.types';

export type {
  BreadcrumbItem,
  BreadcrumbItemClickEvent,
  BreadcrumbSize,
  BreadcrumbVariant,
} from './breadcrumb.types';

/** Default value exported for entry-point test assertions. */
export const BREADCRUMB_DEFAULT_ARIA_LABEL: string = 'Breadcrumb';

/**
 * Breadcrumb component for displaying hierarchical navigation trails.
 * Supports URL links, Angular Router links, and command callbacks.
 * Fully accessible with ARIA landmark, `aria-current="page"` on the
 * active item, and keyboard activation for command-only items.
 */
@Component({
  selector: 'ui-lib-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'hostClasses()',
  },
})
export class Breadcrumb {
  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Array of navigation items to display after the optional home item. */
  public readonly items: InputSignal<BreadcrumbItem[]> = input<BreadcrumbItem[]>([]);

  /** Optional home item pinned as the first crumb. */
  public readonly home: InputSignal<BreadcrumbItem | null> = input<BreadcrumbItem | null>(null);

  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<BreadcrumbVariant | null> = input<BreadcrumbVariant | null>(
    null
  );

  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<BreadcrumbSize> = input<BreadcrumbSize>('md');

  /** Extra CSS class appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the `<nav>` landmark element. */
  public readonly ariaLabel: InputSignal<string> = input<string>(BREADCRUMB_DEFAULT_ARIA_LABEL);

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when any breadcrumb item is clicked or activated via keyboard. */
  public readonly itemClick: OutputEmitterRef<BreadcrumbItemClickEvent> =
    output<BreadcrumbItemClickEvent>();

  // ── Content children ─────────────────────────────────────────────────────

  /**
   * Custom separator template.
   * Usage: `<ng-template #separator>›</ng-template>`
   */
  public readonly separatorTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('separator');

  // ── Dependencies ─────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<BreadcrumbVariant> = computed<BreadcrumbVariant>(
    (): BreadcrumbVariant => this.variant() ?? (this.themeConfig.variant() as BreadcrumbVariant)
  );

  /**
   * Combined item list: home item (if provided) prepended to `items()`.
   * The `_isHome` flag is used internally only and not part of the public type.
   */
  public readonly allItems: Signal<BreadcrumbItem[]> = computed<BreadcrumbItem[]>(
    (): BreadcrumbItem[] => {
      const homeItem: BreadcrumbItem | null = this.home();
      return homeItem ? [homeItem, ...this.items()] : [...this.items()];
    }
  );

  /** Host CSS classes derived from current variant, size, and optional styleClass. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-breadcrumb',
      `ui-lib-breadcrumb--variant-${this.effectiveVariant()}`,
      `ui-lib-breadcrumb--size-${this.size()}`,
    ];

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  // ── Public template helpers ───────────────────────────────────────────────

  /** Returns true when the item at the given index is the last (active) crumb. */
  public isLastItem(index: number): boolean {
    return index === this.allItems().length - 1;
  }

  /**
   * Returns true when the item is clickable (has `url`, `routerLink`, or `command`)
   * and is not disabled.
   */
  public isClickable(item: BreadcrumbItem): boolean {
    if (item.disabled) {
      return false;
    }

    return Boolean(item.url ?? item.routerLink ?? item.command);
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  /** Handles click events on a breadcrumb item. */
  public onItemClick(event: MouseEvent, item: BreadcrumbItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit({ item, originalEvent: event });

    if (item.command) {
      item.command({ item, originalEvent: event });
    }
  }

  /** Handles keyboard events on command-only button items (Enter / Space). */
  public onItemKeyDown(event: KeyboardEvent, item: BreadcrumbItem): void {
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
