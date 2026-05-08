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
import type { ToolbarVariant, ToolbarSize } from './toolbar.types';

export type { ToolbarVariant, ToolbarSize } from './toolbar.types';

/**
 * Toolbar — a horizontal container with start, center, and end content projection slots.
 *
 * Use the `uiToolbarStart`, `uiToolbarCenter`, and `uiToolbarEnd` attribute selectors
 * to project content into the corresponding slot.
 *
 * @example
 * <!-- Basic toolbar -->
 * <ui-lib-toolbar>
 *   <div uiToolbarStart>
 *     <button>Home</button>
 *   </div>
 *   <div uiToolbarCenter>
 *     <span>My App</span>
 *   </div>
 *   <div uiToolbarEnd>
 *     <button>Settings</button>
 *   </div>
 * </ui-lib-toolbar>
 *
 * <!-- Material variant, large size -->
 * <ui-lib-toolbar variant="material" size="lg">
 *   <div uiToolbarStart><button>Back</button></div>
 * </ui-lib-toolbar>
 */
@Component({
  selector: 'ui-lib-toolbar',
  standalone: true,
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'toolbar',
    '[attr.aria-label]': 'ariaLabel()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Toolbar {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ToolbarVariant | null> = input<ToolbarVariant | null>(null);

  /** Size modifier for the toolbar. Defaults to `'md'`. */
  public readonly size: InputSignal<ToolbarSize> = input<ToolbarSize>('md');

  /** Accessible label for the toolbar (recommended when multiple toolbars are on one page). */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ToolbarVariant> = computed<ToolbarVariant>(
    (): ToolbarVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-toolbar',
      `ui-lib-toolbar--${this.size()}`,
      `ui-lib-toolbar--variant-${this.effectiveVariant()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
}
