/** Visual design variant for the Stepper component. */
export type StepperVariant = 'material' | 'bootstrap' | 'minimal';

/** Layout orientation for the Stepper. */
export type StepperOrientation = 'horizontal' | 'vertical';

/** Accessible state metadata for an individual step. */
export interface StepperItem {
  /** Screen-reader friendly label for the step. */
  label: string;
  /** Whether this step has already been completed. */
  completed: boolean;
  /** Whether this step is currently unavailable. */
  disabled: boolean;
  /** Whether this step is in an error state. */
  error: boolean;
}

/** Emitted when the active step changes. */
export interface StepChangeEvent {
  /** Index of the newly active step (0-based). */
  activeStep: number;
  /** Index of the previously active step (0-based). */
  previousStep: number;
}
