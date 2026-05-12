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
import type { ScrollPanelVariant } from './scroll-panel.types';

export type { ScrollPanelVariant } from './scroll-panel.types';

let nextScrollPanelId: number = 0;

/**
 * ScrollPanel — a styled scrollable container with custom CSS scrollbar theming.
 *
 * Wraps projected content in an overflow container and applies variant-aware
 * custom scrollbar styles via CSS custom properties. Width and height should be
 * constrained by the consumer via CSS or inline styles on the host element.
 *
 * The scrollable content region exposes `role="region"` and `tabindex="0"` so
 * keyboard users can focus it and scroll with Arrow / Page keys. Provide
 * `ariaLabel` to give the region a meaningful accessible name.
 *
 * @example
 * <!-- Basic usage — constrain height via CSS -->
 * <ui-lib-scroll-panel ariaLabel="Product description" style="height: 250px;">
 *   <p>Long content...</p>
 * </ui-lib-scroll-panel>
 *
 * <!-- With explicit variant -->
 * <ui-lib-scroll-panel [variant]="'material'" ariaLabel="Gallery" style="height: 300px; width: 400px;">
 *   <img src="large-image.jpg" />
 * </ui-lib-scroll-panel>
 */
@Component({
  selector: 'ui-lib-scroll-panel',
  standalone: true,
  templateUrl: './scroll-panel.html',
  styleUrl: './scroll-panel.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ScrollPanel {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  private readonly componentId: string = `ui-lib-scroll-panel-${(nextScrollPanelId += 1)}`;

  /** Stable ID applied to the inner scrollable content wrapper. */
  public readonly contentId: string = `${this.componentId}-content`;

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ScrollPanelVariant | null> =
    input<ScrollPanelVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /**
   * Accessible label for the scrollable region (`aria-label` on the inner
   * content wrapper). Recommended whenever the panel is a meaningful landmark.
   * Falls back to `null` (no label) when omitted.
   */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  private readonly effectiveVariant: Signal<ScrollPanelVariant> = computed<ScrollPanelVariant>(
    (): ScrollPanelVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-scroll-panel',
      `ui-lib-scroll-panel--variant-${this.effectiveVariant()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
}
