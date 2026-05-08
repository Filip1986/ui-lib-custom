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
import { CommonModule } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { StepperPanel } from './stepper-panel';
import type { StepChangeEvent, StepperOrientation, StepperVariant } from './stepper.types';

export type { StepChangeEvent, StepperOrientation, StepperVariant } from './stepper.types';

let stepperIdCounter: number = 0;

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
  imports: [CommonModule, StepperPanel],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Stepper {
  private readonly componentId: string = `ui-lib-stepper-${(stepperIdCounter += 1)}`;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Currently active step index (0-based). Two-way bindable. */
  public readonly activeStep: ModelSignal<number> = model<number>(0);

  /**
   * When true, users can only advance to the next step sequentially.
   * Skipping to later steps is blocked until prior steps have been visited.
   */
  public readonly linear: InputSignal<boolean> = input<boolean>(false);

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
    (): StepperVariant => this.variant() ?? this.themeConfig.variant()
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
    (): boolean => this.orientation() === 'horizontal'
  );

  /** Stable DOM id for a step header element. */
  public stepId(index: number): string {
    return `${this.componentId}-step-${index}`;
  }

  /** Stable DOM id for a step content panel. */
  public contentId(index: number): string {
    return `${this.componentId}-content-${index}`;
  }

  /** Returns true when the given step index is the active step. */
  public isStepActive(index: number): boolean {
    return this.activeStep() === index;
  }

  /** Returns true when the given step has already been passed (index < activeStep). */
  public isStepCompleted(index: number): boolean {
    return index < this.activeStep();
  }

  /**
   * Returns true when the given step can be navigated to.
   * In linear mode, only steps up to the current active step are accessible.
   */
  public isStepAccessible(index: number, panel: StepperPanel): boolean {
    if (panel.disabled()) {
      return false;
    }
    if (!this.linear()) {
      return true;
    }
    return index <= this.activeStep();
  }

  /** Computes the CSS classes for a step element. */
  public stepClasses(index: number, panel: StepperPanel): string {
    const classes: string[] = ['ui-lib-stepper__step'];
    if (this.isStepActive(index)) {
      classes.push('ui-lib-stepper__step--active');
    }
    if (this.isStepCompleted(index)) {
      classes.push('ui-lib-stepper__step--completed');
    }
    if (!this.isStepAccessible(index, panel)) {
      classes.push('ui-lib-stepper__step--disabled');
    }
    return classes.join(' ');
  }

  /** Navigates to the given step index if it is accessible. */
  public goToStep(targetIndex: number): void {
    const allPanels: readonly StepperPanel[] = this.panels();
    const panel: StepperPanel | undefined = allPanels[targetIndex];
    if (!panel) {
      return;
    }
    if (!this.isStepAccessible(targetIndex, panel)) {
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
        (panel: StepperPanel, index: number): boolean => this.isStepAccessible(index, panel)
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
}
