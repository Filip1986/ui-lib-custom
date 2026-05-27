import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import type { InputSignal, ModelSignal, OutputEmitterRef, Signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { StepperPanel } from './stepper-panel';
import type {
  StepChangeEvent,
  StepperItem,
  StepperOrientation,
  StepperVariant,
} from './stepper.types';

export type {
  StepChangeEvent,
  StepperItem,
  StepperOrientation,
  StepperVariant,
} from './stepper.types';

interface StepperRenderItem extends StepperItem {
  readonly id: string;
  readonly contentId: string;
  readonly panel: StepperPanel;
  readonly active: boolean;
  readonly accessible: boolean;
}

export const STEPPER_DEFAULT_ARIA_LABEL: string = 'Progress';

let nextStepperId: number = 0;

/**
 * Stepper — a multi-step wizard component for guided sequential workflows.
 *
 * Manages step navigation, active-step state, and optional linear (sequential) enforcement.
 * Supports horizontal and vertical orientations, and three design variants.
 *
 * @example
 * <!-- Basic horizontal stepper -->
 * <ui-lib-stepper [(activeStep)]="currentStep">
 *   <ui-lib-stepper-panel header="Account Info">
 *     <ng-template #stepperContent>
 *       <p>Fill in your account information.</p>
 *     </ng-template>
 *     <ng-template #stepperFooter>
 *       <button (click)="stepper.nextStep()">Next</button>
 *     </ng-template>
 *   </ui-lib-stepper-panel>
 *   <ui-lib-stepper-panel header="Confirmation">
 *     <ng-template #stepperContent><p>Review your details.</p></ng-template>
 *     <ng-template #stepperFooter>
 *       <button (click)="stepper.prevStep()">Back</button>
 *       <button (click)="submit()">Submit</button>
 *     </ng-template>
 *   </ui-lib-stepper-panel>
 * </ui-lib-stepper>
 */
@Component({
  selector: 'ui-lib-stepper',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Stepper {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  public readonly stepperId: string = `ui-lib-stepper-${(nextStepperId += 1)}`;

  /** Currently active step index (0-based). Two-way bindable. */
  public readonly activeStep: ModelSignal<number> = model<number>(0);

  /**
   * When true, users can only advance to the next step sequentially.
   * Skipping to later steps is blocked until prior steps have been visited.
   */
  public readonly linear: InputSignal<boolean> = input<boolean>(false);

  /** Accessible label announced for the step navigation container. When empty the active locale's 'stepper.label' translation is used. */
  public readonly ariaLabel: InputSignal<string> = input<string>('');

  /** Layout orientation: 'horizontal' (default) or 'vertical'. */
  public readonly orientation: InputSignal<StepperOrientation> =
    input<StepperOrientation>('horizontal');

  /** Visual variant — inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<StepperVariant | null> = input<StepperVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted after the active step changes. */
  public readonly stepChange: OutputEmitterRef<StepChangeEvent> = output<StepChangeEvent>();

  /** All projected StepperPanel children. */
  public readonly panels: Signal<readonly StepperPanel[]> = contentChildren(StepperPanel);

  private readonly effectiveVariant: Signal<StepperVariant> = computed<StepperVariant>(
    (): StepperVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Computed CSS classes for the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-stepper',
      `ui-lib-stepper--${this.effectiveVariant()}`,
      `ui-lib-stepper--${this.orientation()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Whether the component is in horizontal orientation. */
  public readonly isHorizontal: Signal<boolean> = computed<boolean>(
    (): boolean => this.orientation() === 'horizontal',
  );

  /** Resolved aria-label for the step navigation container — falls back to i18n default. */
  public readonly effectiveAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() || this.i18n.translate('stepper.label'),
  );

  /** Computed step metadata used for rendering, styling, and accessibility. */
  public readonly stepItems: Signal<readonly StepperRenderItem[]> = computed<
    readonly StepperRenderItem[]
  >((): readonly StepperRenderItem[] =>
    this.panels().map(
      (panel: StepperPanel, index: number): StepperRenderItem => this.buildStepItem(panel, index),
    ),
  );

  /** Stable DOM id for a step header element. */
  public stepId(index: number): string {
    return `${this.stepperId}-step-${index}`;
  }

  /** Stable DOM id for a step content panel. */
  public contentId(index: number): string {
    return `${this.stepperId}-content-${index}`;
  }

  /** Returns true when the given step index is the active step. */
  public isStepActive(index: number): boolean {
    return this.stepItems()[index]?.active ?? false;
  }

  /** Returns true when the given step has already been passed (index < activeStep). */
  public isStepCompleted(index: number): boolean {
    return this.stepItems()[index]?.completed ?? false;
  }

  /**
   * Returns true when the given step can be navigated to.
   * In linear mode, only steps up to the current active step are accessible.
   */
  public isStepAccessible(index: number, panel: StepperPanel): boolean {
    return this.buildStepItem(panel, index).accessible;
  }

  /** Returns true when the given step is unavailable for interaction. */
  public isStepDisabled(index: number): boolean {
    return this.stepItems()[index]?.disabled ?? false;
  }

  /** Builds a rich screen-reader label for a step header. */
  public getStepAriaLabel(step: StepperItem, index: number, total: number): string {
    const params: { current: number; total: number; label: string } = {
      current: index + 1,
      total,
      label: step.label ?? '',
    };

    if (step.error) {
      return this.i18n.translate('stepper.step.error', params);
    }
    if (step.completed) {
      return this.i18n.translate('stepper.step.completed', params);
    }
    if (this.isStepActive(index)) {
      return this.i18n.translate('stepper.step.current', params);
    }
    if (step.disabled && this.linear()) {
      return this.i18n.translate('stepper.step.unavailable-linear', params);
    }
    if (step.disabled) {
      return this.i18n.translate('stepper.step.unavailable', params);
    }
    return this.i18n.translate('stepper.step', params);
  }

  /** Computes the CSS classes for a step element. */
  public stepClasses(step: StepperRenderItem): string {
    const classes: string[] = ['ui-lib-stepper__step'];
    if (step.active) {
      classes.push('ui-lib-stepper__step--active');
    }
    if (step.completed) {
      classes.push('ui-lib-stepper__step--completed');
    }
    if (step.error) {
      classes.push('ui-lib-stepper__step--error');
    }
    if (step.disabled) {
      classes.push('ui-lib-stepper__step--disabled');
    }
    return classes.join(' ');
  }

  /** Navigates to the given step index if it is accessible. */
  public goToStep(targetIndex: number): void {
    const targetStep: StepperRenderItem | undefined = this.stepItems()[targetIndex];
    if (!targetStep) {
      return;
    }
    if (!targetStep.accessible) {
      return;
    }
    const previousStep: number = this.activeStep();
    if (previousStep === targetIndex) {
      return;
    }
    this.activeStep.set(targetIndex);
    this.stepChange.emit({ activeStep: targetIndex, previousStep });
  }

  /** Advances to the next step if one exists. */
  public nextStep(): void {
    const next: number = this.activeStep() + 1;
    if (next < this.panels().length) {
      this.goToStep(next);
    }
  }

  /** Returns to the previous step if one exists. */
  public prevStep(): void {
    const previous: number = this.activeStep() - 1;
    if (previous >= 0) {
      this.goToStep(previous);
    }
  }

  /** Whether the current step is the first step. */
  public isFirstStep(): boolean {
    return this.activeStep() === 0;
  }

  /** Whether the current step is the last step. */
  public isLastStep(): boolean {
    return this.activeStep() === this.panels().length - 1;
  }

  /** Handles keyboard navigation on step header buttons. */
  public onKeydown(event: KeyboardEvent, currentIndex: number): void {
    const allPanels: readonly StepperPanel[] = this.panels();
    const horizontal: boolean = this.isHorizontal();

    const forwardKey: string = horizontal ? 'ArrowRight' : 'ArrowDown';
    const backwardKey: string = horizontal ? 'ArrowLeft' : 'ArrowUp';

    if (event.key === forwardKey) {
      event.preventDefault();
      for (let index: number = currentIndex + 1; index < allPanels.length; index++) {
        const panel: StepperPanel | undefined = allPanels[index];
        if (panel && this.isStepAccessible(index, panel)) {
          this.goToStep(index);
          break;
        }
      }
      return;
    }

    if (event.key === backwardKey) {
      event.preventDefault();
      for (let index: number = currentIndex - 1; index >= 0; index--) {
        const panel: StepperPanel | undefined = allPanels[index];
        if (panel && this.isStepAccessible(index, panel)) {
          this.goToStep(index);
          break;
        }
      }
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const firstIndex: number = allPanels.findIndex(
        (panel: StepperPanel, index: number): boolean => this.isStepAccessible(index, panel),
      );
      if (firstIndex !== -1) {
        this.goToStep(firstIndex);
      }
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      for (let index: number = allPanels.length - 1; index >= 0; index--) {
        const panel: StepperPanel | undefined = allPanels[index];
        if (panel && this.isStepAccessible(index, panel)) {
          this.goToStep(index);
          break;
        }
      }
    }
  }

  private buildStepItem(panel: StepperPanel, index: number): StepperRenderItem {
    const isActive: boolean = this.activeStep() === index;
    const isCompleted: boolean = index < this.activeStep();
    const isAccessible: boolean = this.isPanelAccessible(index, panel);

    return {
      id: this.stepId(index),
      contentId: this.contentId(index),
      panel,
      label: this.getStepLabel(panel, index),
      completed: isCompleted,
      disabled: !isAccessible,
      error: panel.error(),
      active: isActive,
      accessible: isAccessible,
    };
  }

  private getStepLabel(panel: StepperPanel, index: number): string {
    const trimmedHeader: string = panel.header().trim();
    if (trimmedHeader) {
      return trimmedHeader;
    }
    return this.i18n.translate('stepper.step.fallback-label', { n: index + 1 });
  }

  private isPanelAccessible(index: number, panel: StepperPanel): boolean {
    if (panel.disabled()) {
      return false;
    }
    if (!this.linear()) {
      return true;
    }
    return index <= this.activeStep();
  }
}
