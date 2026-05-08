/** Visual design variant for the Stepper component. */
export type StepperVariant = 'material' | 'bootstrap' | 'minimal';

/** Layout orientation for the Stepper. */
export type StepperOrientation = 'horizontal' | 'vertical';

/** Emitted when the active step changes. */
export interface StepChangeEvent {
  /** Index of the newly active step (0-based). */
  activeStep: number;
  /** Index of the previously active step (0-based). */
  previousStep: number;
}
