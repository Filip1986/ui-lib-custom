import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { InplaceVariant } from './inplace.types';

export type { InplaceVariant } from './inplace.types';

/**
 * Inplace — inline editing component that toggles between a display and content slot.
 *
 * Click the display slot to activate the editor; use the optional close button
 * (or set `active` programmatically) to deactivate.  Supports three design variants
 * (material / bootstrap / minimal) and falls back to the global ThemeConfigService.
 *
 * @example
 * <ui-lib-inplace>
 *   <span inplaceDisplay>Click to edit</span>
 *   <input inplaceContent type="text" />
 * </ui-lib-inplace>
 */
@Component({
  selector: 'ui-lib-inplace',
  standalone: true,
  templateUrl: './inplace.html',
  styleUrl: './inplace.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Inplace {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Whether the inplace editor is currently active (two-way bindable). */
  public readonly active: ModelSignal<boolean> = model<boolean>(false);

  /** When true, no interaction is allowed and the display slot appears disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** When true, a close button is rendered inside the content slot to deactivate. */
  public readonly closable: InputSignal<boolean> = input<boolean>(false);

  /** Icon class for the close button (e.g. "pi pi-times"). */
  public readonly closeIcon: InputSignal<string> = input<string>('pi pi-times');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<InplaceVariant | null> = input<InplaceVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted when the inplace editor transitions to the active (editing) state. */
  public readonly activated: OutputEmitterRef<void> = output<void>();

  /** Emitted when the inplace editor transitions back to the display (inactive) state. */
  public readonly deactivated: OutputEmitterRef<void> = output<void>();

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<InplaceVariant> = computed<InplaceVariant>(
    (): InplaceVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-inplace',
      `ui-lib-inplace--variant-${this.effectiveVariant()}`,
    ];
    if (this.active()) {
      classes.push('ui-lib-inplace--active');
    }
    if (this.disabled()) {
      classes.push('ui-lib-inplace--disabled');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Activates the inplace editor when the display slot is clicked (if not disabled). */
  public onDisplayClick(): void {
    if (!this.disabled()) {
      this.activate();
    }
  }

  /** Activates the inplace editor on Enter or Space keydown (if not disabled). */
  public onDisplayKeydown(event: KeyboardEvent): void {
    if (!this.disabled() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.activate();
    }
  }

  /** Switches to the active (editing) state and emits `activated`. */
  public activate(): void {
    this.active.set(true);
    this.activated.emit();
  }

  /** Switches back to the display (inactive) state and emits `deactivated`. */
  public deactivate(): void {
    this.active.set(false);
    this.deactivated.emit();
  }
}
