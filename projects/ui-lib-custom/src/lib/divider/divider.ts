import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  DividerAlign,
  DividerOrientation,
  DividerType,
  DividerVariant,
} from './divider.types';

export type {
  DividerAlign,
  DividerOrientation,
  DividerType,
  DividerVariant,
} from './divider.types';

/**
 * Divider — a visual separator that can be horizontal or vertical, with
 * optional label/icon content projected into the middle.
 *
 * Supports three line types (solid / dashed / dotted), five alignment
 * options, three sizes, and three design variants (material / bootstrap / minimal).
 *
 * @example
 * <!-- Basic horizontal divider -->
 * <ui-lib-divider />
 *
 * <!-- With label -->
 * <ui-lib-divider>OR</ui-lib-divider>
 *
 * <!-- Dashed, aligned left -->
 * <ui-lib-divider type="dashed" align="left">Section A</ui-lib-divider>
 *
 * <!-- Vertical -->
 * <ui-lib-divider orientation="vertical" />
 */
@Component({
  selector: 'ui-lib-divider',
  standalone: true,
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Divider {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /**
   * Direction of the divider line.
   * Defaults to `'horizontal'`.
   */
  public readonly orientation: InputSignal<DividerOrientation> =
    input<DividerOrientation>('horizontal');

  /**
   * Visual style of the divider line.
   * Defaults to `'solid'`.
   */
  public readonly type: InputSignal<DividerType> = input<DividerType>('solid');

  /**
   * Alignment of the projected content along the divider.
   *
   * - Horizontal: `'left'` | `'center'` | `'right'` (default: `'center'`)
   * - Vertical:   `'top'`  | `'center'` | `'bottom'` (default: `'center'`)
   *
   * Defaults to `null`, which resolves to `'center'`.
   */
  public readonly align: InputSignal<DividerAlign | null> = input<DividerAlign | null>(null);

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<DividerVariant | null> = input<DividerVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<DividerVariant> = computed<DividerVariant>(
    (): DividerVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Resolved alignment — direct input wins, then defaults to `'center'`. */
  private readonly effectiveAlign: Signal<DividerAlign> = computed<DividerAlign>(
    (): DividerAlign => this.align() ?? 'center'
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-divider',
      `ui-lib-divider--${this.orientation()}`,
      `ui-lib-divider--type-${this.type()}`,
      `ui-lib-divider--align-${this.effectiveAlign()}`,
      `ui-lib-divider--variant-${this.effectiveVariant()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
}
