import type { InputSignal, Signal, TemplateRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  ViewEncapsulation,
} from '@angular/core';

/**
 * StepperPanel — a single step within a Stepper.
 *
 * Provides a header (string or custom projected template), optional content, and optional footer.
 * The parent `Stepper` queries all `StepperPanel` children and renders the active panel's templates.
 *
 * @example
 * <ui-lib-stepper-panel header="Account Details">
 *   <ng-template #stepperContent>
 *     <p>Fill in your account details here.</p>
 *   </ng-template>
 *   <ng-template #stepperFooter>
 *     <button (click)="stepper.nextStep()">Next</button>
 *   </ng-template>
 * </ui-lib-stepper-panel>
 */
@Component({
  selector: 'ui-lib-stepper-panel',
  standalone: true,
  templateUrl: './stepper-panel.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperPanel {
  /** Text to render as the step header label. */
  public readonly header: InputSignal<string> = input<string>('');

  /** Whether this step is disabled. In linear mode, disabled state is ignored. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Whether this step is currently in an error state. */
  public readonly error: InputSignal<boolean> = input<boolean>(false);

  /** Template rendered as the step's main content. Reference with `#stepperContent`. */
  public readonly contentTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('stepperContent');

  /** Template rendered in the step footer area. Reference with `#stepperFooter`. */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('stepperFooter');

  /** Custom template for the step header label. Reference with `#stepperHeader`. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('stepperHeader');
}
