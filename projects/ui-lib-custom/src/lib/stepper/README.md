# Stepper

A multi-step wizard component for guiding users through sequential workflows.

## Package path

```ts
import { Stepper, StepperPanel } from 'ui-lib-custom/stepper';
import type {
  StepChangeEvent,
  StepperItem,
  StepperOrientation,
  StepperVariant,
} from 'ui-lib-custom/stepper';
```

## Selector

- `ui-lib-stepper` — parent container
- `ui-lib-stepper-panel` — individual step (child)

## Basic usage

```html
<ui-lib-stepper [(activeStep)]="currentStep" #stepper>
  <ui-lib-stepper-panel header="Personal Info">
    <ng-template #stepperContent>
      <p>Enter your personal details.</p>
    </ng-template>
    <ng-template #stepperFooter>
      <button (click)="stepper.nextStep()">Next</button>
    </ng-template>
  </ui-lib-stepper-panel>

  <ui-lib-stepper-panel header="Address">
    <ng-template #stepperContent>
      <p>Provide your address.</p>
    </ng-template>
    <ng-template #stepperFooter>
      <button (click)="stepper.prevStep()">Back</button>
      <button (click)="stepper.nextStep()">Next</button>
    </ng-template>
  </ui-lib-stepper-panel>

  <ui-lib-stepper-panel header="Review">
    <ng-template #stepperContent>
      <p>Confirm and submit.</p>
    </ng-template>
    <ng-template #stepperFooter>
      <button (click)="stepper.prevStep()">Back</button>
      <button (click)="submit()">Submit</button>
    </ng-template>
  </ui-lib-stepper-panel>
</ui-lib-stepper>
```

## Stepper inputs

| Input         | Type                                             | Default        | Description                                                          |
| ------------- | ------------------------------------------------ | -------------- | -------------------------------------------------------------------- |
| `activeStep`  | `number`                                         | `0`            | Active step index (0-based). Two-way bindable with `[(activeStep)]`. |
| `linear`      | `boolean`                                        | `false`        | When true, users must progress sequentially; skipping is blocked.    |
| `ariaLabel`   | `string`                                         | `'Progress'`   | Accessible label announced for the step navigation container.        |
| `orientation` | `'horizontal' \| 'vertical'`                     | `'horizontal'` | Layout orientation.                                                  |
| `variant`     | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`         | Visual variant. Falls back to ThemeConfigService when null.          |
| `styleClass`  | `string \| null`                                 | `null`         | Additional CSS classes for the host element.                         |

## Stepper outputs

| Output       | Payload           | Description                                                                                    |
| ------------ | ----------------- | ---------------------------------------------------------------------------------------------- |
| `stepChange` | `StepChangeEvent` | Emitted when the active step changes. Payload: `{ activeStep: number, previousStep: number }`. |

`[(activeStep)]` also provides the standard Angular model output `(activeStepChange)`.

## Stepper public methods

Call via template reference (`#stepper`):

| Method            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `nextStep()`      | Advances to the next step if one exists.         |
| `prevStep()`      | Returns to the previous step.                    |
| `goToStep(index)` | Navigates directly to the given step index.      |
| `isFirstStep()`   | Returns true when on the first step.             |
| `isLastStep()`    | Returns true when on the last step.              |
| `stepId(index)`   | Returns the stable DOM id for a step header/tab. |

## StepperPanel inputs

| Input      | Type      | Default | Description                                                                     |
| ---------- | --------- | ------- | ------------------------------------------------------------------------------- |
| `header`   | `string`  | `''`    | Text label for the step header.                                                 |
| `disabled` | `boolean` | `false` | Prevents navigation to this step.                                               |
| `error`    | `boolean` | `false` | Marks the step as invalid and announces an error state to assistive technology. |

## Step metadata

`Stepper` derives accessible state for each rendered step using the exported `StepperItem` shape:

```ts
interface StepperItem {
  label: string;
  completed: boolean;
  disabled: boolean;
  error: boolean;
}
```

## StepperPanel content projection

Content is projected via `ng-template` with named template reference variables:

| Template variable | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `#stepperContent` | Main body content rendered in the active step's panel area.       |
| `#stepperFooter`  | Footer area — typically Back/Next navigation buttons.             |
| `#stepperHeader`  | Custom HTML label for the step header (overrides `header` input). |

## Variants

```html
<ui-lib-stepper variant="material">...</ui-lib-stepper>
<ui-lib-stepper variant="bootstrap">...</ui-lib-stepper>
<ui-lib-stepper variant="minimal">...</ui-lib-stepper>
```

## Vertical orientation

```html
<ui-lib-stepper orientation="vertical"> ... </ui-lib-stepper>
```

## Linear mode

```html
<ui-lib-stepper [linear]="true" [(activeStep)]="step"> ... </ui-lib-stepper>
```

In linear mode, future steps are announced with `aria-disabled="true"`, removed from pointer interaction,
and remain out of reach until earlier steps are completed.

## Accessibility

Stepper uses the **tablist/tab/tabpanel** ARIA pattern because non-linear steppers allow direct navigation
between steps. In linear mode, future tabs remain visibly present but are disabled until unlocked.

- Step navigation bar has `role="tablist"` with a configurable `ariaLabel` (`'Progress'` by default).
- Each step header button has `role="tab"`, `aria-selected`, `aria-current="step"` (when active),
  and `aria-controls` pointing to the active panel.
- Active content has `role="tabpanel"` with `aria-labelledby` pointing to its step header.
- Each step exposes a rich screen reader label in this format:
  - `Step 2 of 5: Shipping Address — current`
  - `Step 1 of 5: Contact Info — completed`
  - `Step 3 of 5: Payment — error, please fix`
- Completed steps render an inline SVG checkmark; error steps keep the step number and use error colours.
- Focus ring is visible via `:focus-visible`, and reduced-motion users get transitions disabled.

## Keyboard support

| Key                        | Behavior                                                        |
| -------------------------- | --------------------------------------------------------------- |
| `Tab` / `Shift+Tab`        | Moves focus into or out of the active step tab.                 |
| `ArrowRight` / `ArrowLeft` | In horizontal mode, moves to the next/previous accessible step. |
| `ArrowDown` / `ArrowUp`    | In vertical mode, moves to the next/previous accessible step.   |
| `Home`                     | Jumps to the first accessible step.                             |
| `End`                      | Jumps to the last accessible step.                              |

## CSS custom properties

| Property                                 | Description                                       |
| ---------------------------------------- | ------------------------------------------------- |
| `--uilib-stepper-indicator-size`         | Size of the step number circle (default: `2rem`). |
| `--uilib-stepper-indicator-bg-active`    | Background of the active step indicator.          |
| `--uilib-stepper-indicator-bg-completed` | Background of completed step indicators.          |
| `--uilib-stepper-indicator-bg-error`     | Background of error step indicators.              |
| `--uilib-stepper-label-color-active`     | Label colour for the active step.                 |
| `--uilib-stepper-label-color-error`      | Label colour for errored steps.                   |
| `--uilib-stepper-separator-color`        | Colour of the connector line between steps.       |
| `--uilib-stepper-separator-thickness`    | Thickness of the connector line (default: `2px`). |
| `--uilib-stepper-content-padding`        | Padding around step content area.                 |
