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
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { ChipSize, ChipVariant } from './chip.types';

export type { ChipSize, ChipVariant } from './chip.types';

let nextChipId: number = 0;

/**
 * Chip — compact element representing an attribute, tag, or action.
 *
 * Supports an optional icon, image, label, and a removable close button.
 * Three sizes (sm / md / lg) and three design variants (material / bootstrap / minimal).
 * Falls back to content projection when no label, icon, or image is set.
 *
 * @example
 * <ui-lib-chip label="Angular" />
 * <ui-lib-chip label="React" [removable]="true" (removed)="onRemove()" />
 * <ui-lib-chip label="Vue" image="/assets/vue.png" imageAlt="Vue logo" />
 * <ui-lib-chip label="Tag" [selectable]="true" [selected]="isSelected" (selectedChange)="isSelected = $event" />
 */
@Component({
  selector: 'ui-lib-chip',
  standalone: true,
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'label() ?? null',
    '[attr.role]': 'hostRole()',
    '[attr.aria-selected]': 'ariaSelected()',
    '[attr.tabindex]': 'tabIndex()',
    '[id]': 'chipId',
    '(click)': 'onHostClick()',
    '(keydown)': 'onHostKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Chip {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** Stable unique ID for this chip instance. */
  public readonly chipId: string = `ui-lib-chip-${++nextChipId}`;

  /** Text label displayed inside the chip. */
  public readonly label: InputSignal<string | null> = input<string | null>(null);

  /** CSS class string for a PrimeIcons icon (e.g. "pi pi-user"). */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);

  /** URL of an image to display at the start of the chip. */
  public readonly image: InputSignal<string | null> = input<string | null>(null);

  /**
   * Alt text for the chip image. Defaults to the i18n `chip.image-alt` key when not provided.
   * Pass `null` explicitly to fall back to the i18n default.
   */
  public readonly imageAlt: InputSignal<string | null> = input<string | null>(null);

  /** When true, a remove button is rendered at the end of the chip. */
  public readonly removable: InputSignal<boolean> = input<boolean>(false);

  /** CSS class for the remove icon (defaults to "pi pi-times"). */
  public readonly removeIcon: InputSignal<string> = input<string>('pi pi-times');

  /** When true, the chip can be toggled via click or Space / Enter. */
  public readonly selectable: InputSignal<boolean> = input<boolean>(false);

  /** Selected state when the chip is selectable. Pair with (selectedChange) for two-way binding. */
  public readonly selected: InputSignal<boolean> = input<boolean>(false);

  /** Size of the chip. */
  public readonly size: InputSignal<ChipSize> = input<ChipSize>('md');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ChipVariant | null> = input<ChipVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted when the remove button is clicked. */
  public readonly removed: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /** Emitted when a selectable chip is toggled; provides the new selected value. */
  public readonly selectedChange: OutputEmitterRef<boolean> = output<boolean>();

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ChipVariant> = computed<ChipVariant>(
    (): ChipVariant => this.variant() ?? this.themeConfig.variant(),
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
    if (this.selectable()) {
      classes.push('ui-lib-chip--selectable');
    }
    if (this.selected()) {
      classes.push('ui-lib-chip--selected');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Whether to show the image slot. */
  public readonly showImage: Signal<boolean> = computed<boolean>(
    (): boolean => this.image() !== null,
  );

  /** Whether to show the icon slot (only when no image is set). */
  public readonly showIcon: Signal<boolean> = computed<boolean>(
    (): boolean => this.image() === null && this.icon() !== null,
  );

  /** Accessible label for the remove button — reactive to locale changes. */
  public readonly removeAriaLabel: Signal<string> = computed<string>((): string => {
    const chipLabel: string | null = this.label();
    return chipLabel
      ? this.i18n.translate('chip.remove', { label: chipLabel })
      : this.i18n.translate('chip.remove-unlabelled');
  });

  /**
   * Host role.
   * Removable chips use role="group" (to allow a nested button without violating
   * the "nested-interactive" ARIA rule). Non-removable chips use role="option"
   * for use inside a role="listbox" container.
   */
  public readonly hostRole: Signal<string> = computed<string>((): string =>
    this.removable() ? 'group' : 'option',
  );

  /**
   * aria-selected attribute value.
   * String 'true' or 'false' for non-removable selectable chips; null otherwise.
   * (aria-selected is not valid on role="group" used by removable chips.)
   */
  public readonly ariaSelected: Signal<string | null> = computed<string | null>(
    (): string | null => (this.selectable() && !this.removable() ? String(this.selected()) : null),
  );

  /**
   * tabindex attribute value.
   * 0 for selectable chips (keyboard-reachable); null (attribute omitted) otherwise.
   */
  public readonly tabIndex: Signal<number | null> = computed<number | null>((): number | null =>
    this.selectable() ? 0 : null,
  );

  /** Handles host click — toggles selection for selectable chips. */
  public onHostClick(): void {
    if (!this.selectable()) {
      return;
    }
    this.selectedChange.emit(!this.selected());
  }

  /** Handles remove button click — stops propagation and emits the originating MouseEvent. */
  public onRemoveClick(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit(event);
  }

  /** Handles keydown on the host for selectable chips — Space / Enter toggles selection. */
  public onHostKeyDown(event: KeyboardEvent): void {
    if (!this.selectable()) {
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.selectedChange.emit(!this.selected());
    }
  }
}
