import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  ViewEncapsulation,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ChipSize, ChipVariant } from './chip.types';

export type { ChipSize, ChipVariant } from './chip.types';

/**
 * Chip — compact element representing an attribute, tag, or action.
 *
 * Supports an optional icon, image, label, and a removable close button.
 * Three sizes (sm / md / lg) and three design variants (material / bootstrap / minimal).
 * Falls back to content projection when no label, icon, or image is set.
 *
 * @example
 * <ui-lib-chip label="Angular" />
 * <ui-lib-chip label="React" icon="pi pi-times" [removable]="true" (onRemove)="onRemove()" />
 * <ui-lib-chip label="Vue" image="/assets/vue.png" imageAlt="Vue logo" />
 */
@Component({
  selector: 'ui-lib-chip',
  standalone: true,
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'label() ?? null',
    role: 'option',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Chip {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Text label displayed inside the chip. */
  public readonly label: InputSignal<string | null> = input<string | null>(null);

  /** CSS class string for a PrimeIcons icon (e.g. "pi pi-user"). */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);

  /** URL of an image to display at the start of the chip. */
  public readonly image: InputSignal<string | null> = input<string | null>(null);

  /** Alt text for the chip image. */
  public readonly imageAlt: InputSignal<string> = input<string>('Chip');

  /** When true, a remove button is rendered at the end of the chip. */
  public readonly removable: InputSignal<boolean> = input<boolean>(false);

  /** CSS class for the remove icon (defaults to "pi pi-times"). */
  public readonly removeIcon: InputSignal<string> = input<string>('pi pi-times');

  /** Size of the chip. */
  public readonly size: InputSignal<ChipSize> = input<ChipSize>('md');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ChipVariant | null> = input<ChipVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted when the remove button is clicked. */
  public readonly removed: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ChipVariant> = computed<ChipVariant>(
    (): ChipVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-chip',
      `ui-lib-chip--size-${this.size()}`,
      `ui-lib-chip--variant-${this.effectiveVariant()}`,
    ];
    if (this.removable()) {
      classes.push('ui-lib-chip--removable');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Whether to show the image slot. */
  public readonly showImage: Signal<boolean> = computed<boolean>(
    (): boolean => this.image() !== null
  );

  /** Whether to show the icon slot (only when no image is set). */
  public readonly showIcon: Signal<boolean> = computed<boolean>(
    (): boolean => this.image() === null && this.icon() !== null
  );

  /** Accessible label for the remove button. */
  public readonly removeAriaLabel: Signal<string> = computed<string>((): string => {
    const chipLabel: string | null = this.label();
    return chipLabel ? `Remove ${chipLabel}` : 'Remove';
  });

  /** Handles remove button click — emits the originating MouseEvent. */
  public onRemoveClick(event: MouseEvent): void {
    this.removed.emit(event);
  }
}
