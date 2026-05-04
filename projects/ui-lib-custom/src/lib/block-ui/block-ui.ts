import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  ViewEncapsulation,
  type InputSignal,
  type ModelSignal,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { BlockUIVariant } from './block-ui.types';
export type { BlockUIVariant } from './block-ui.types';

/**
 * BlockUI - Blocks user interaction on a section of the page by overlaying a mask.
 *
 * Wrap any content in `<ui-lib-block-ui>` and bind `[blocked]` to toggle the mask.
 * Project custom mask content (e.g. a spinner) using the `blockTemplate` attribute selector.
 *
 * @example
 * <ui-lib-block-ui [(blocked)]="isBlocked">
 *   <p>Protected content</p>
 *   <span blockTemplate>Loading…</span>
 * </ui-lib-block-ui>
 */
@Component({
  selector: 'ui-lib-block-ui',
  standalone: true,
  templateUrl: './block-ui.html',
  styleUrl: './block-ui.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-busy]': 'blocked()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BlockUI {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Whether the content is blocked from user interaction. Supports two-way binding. */
  public readonly blocked: ModelSignal<boolean> = model<boolean>(false);
  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<BlockUIVariant | null> = input<BlockUIVariant | null>(null);
  /** Additional CSS classes to apply to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);
  /** Base z-index for the mask layer. When 0 uses the CSS variable default. */
  public readonly baseZIndex: InputSignal<number> = input<number>(0);

  private readonly effectiveVariant: Signal<BlockUIVariant> = computed<BlockUIVariant>(
    (): BlockUIVariant => {
      const direct: BlockUIVariant | null = this.variant();
      if (direct) return direct;
      return this.themeConfig.variant();
    }
  );

  /** Computed host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-block-ui',
      `ui-lib-block-ui--variant-${this.effectiveVariant()}`,
    ];
    if (this.blocked()) {
      classes.push('ui-lib-block-ui--blocked');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Computed z-index string for the mask element. */
  public readonly maskZIndex: Signal<string> = computed<string>((): string => {
    const base: number = this.baseZIndex();
    return base > 0 ? String(base) : 'auto';
  });
}
