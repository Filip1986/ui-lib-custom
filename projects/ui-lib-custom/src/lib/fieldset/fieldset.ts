import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type InputSignal,
  model,
  type ModelSignal,
  output,
  type OutputEmitterRef,
  type Signal,
  ViewEncapsulation,
} from '@angular/core';

import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { FieldsetToggleEvent, FieldsetVariant } from './fieldset.types';

export type { FieldsetToggleEvent, FieldsetVariant } from './fieldset.types';

let fieldsetIdCounter: number = 0;

/**
 * Fieldset — a labelled content container that optionally collapses its body.
 *
 * Supports three design variants (material / bootstrap / minimal) and a
 * toggleable collapse animation driven by the CSS grid-row trick.
 *
 * @example
 * <!-- Basic fieldset -->
 * <ui-lib-fieldset legend="Personal Info">
 *   <p>Content here</p>
 * </ui-lib-fieldset>
 *
 * <!-- Toggleable with two-way binding -->
 * <ui-lib-fieldset legend="Advanced" [toggleable]="true" [(collapsed)]="isCollapsed">
 *   <p>Collapsible content</p>
 * </ui-lib-fieldset>
 *
 * <!-- Custom legend via content projection -->
 * <ui-lib-fieldset [toggleable]="true">
 *   <span fieldsetLegend>Custom <strong>Legend</strong></span>
 *   <p>Body content</p>
 * </ui-lib-fieldset>
 */
@Component({
  selector: 'ui-lib-fieldset',
  standalone: true,
  templateUrl: './fieldset.html',
  styleUrl: './fieldset.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'group',
    '[attr.aria-labelledby]': 'legendId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Fieldset {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  private readonly componentId: string = `ui-lib-fieldset-${(fieldsetIdCounter += 1)}`;

  /** ID connecting host aria-labelledby to the legend element. */
  public readonly legendId: string = `${this.componentId}-legend`;
  /** ID connecting legend aria-controls to the content wrapper. */
  public readonly contentId: string = `${this.componentId}-content`;

  /** Text to render in the legend area. Use `[fieldsetLegend]` projection for custom HTML. */
  public readonly legend: InputSignal<string> = input<string>('');

  /** Whether the fieldset body can be collapsed/expanded by the user. */
  public readonly toggleable: InputSignal<boolean> = input<boolean>(false);

  /** Two-way binding for the collapsed state. Only meaningful when toggleable is true. */
  public readonly collapsed: ModelSignal<boolean> = model<boolean>(false);

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<FieldsetVariant | null> = input<FieldsetVariant | null>(
    null,
  );

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted after the collapsed state changes when toggleable is true. */
  public readonly toggled: OutputEmitterRef<FieldsetToggleEvent> = output<FieldsetToggleEvent>();

  private readonly effectiveVariant: Signal<FieldsetVariant> = computed<FieldsetVariant>(
    (): FieldsetVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-fieldset',
      `ui-lib-fieldset--variant-${this.effectiveVariant()}`,
    ];
    if (this.toggleable()) {
      classes.push('ui-lib-fieldset--toggleable');
    }
    if (this.toggleable() && this.collapsed()) {
      classes.push('ui-lib-fieldset--collapsed');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Toggle the collapsed state and emit the toggled event. */
  public toggle(): void {
    const nextCollapsed: boolean = !this.collapsed();
    this.collapsed.set(nextCollapsed);
    this.toggled.emit({ collapsed: nextCollapsed });
  }

  public handleClick(): void {
    if (!this.toggleable()) {
      return;
    }
    this.toggle();
  }

  public handleKeydown(event: Event): void {
    if (!this.toggleable()) {
      return;
    }
    event.preventDefault();
    this.toggle();
  }
}
