# Stepper

A multi-step wizard component for guiding users through sequential workflows.

## Package path

```ts
import { Stepper, StepperPanel } from 'ui-lib-custom/stepper';
import type { StepChangeEvent, StepperOrientation, StepperVariant } from 'ui-lib-custom/stepper';
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

| Input | Type | Default | Description |
|---|---|---|---|
| `activeStep` | `number` | `0` | Active step index (0-based). Two-way bindable with `[(activeStep)]`. |
| `linear` | `boolean` | `false` | When true, users must progress sequentially; skipping is blocked. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant. Falls back to ThemeConfigService when null. |
| `styleClass` | `string \| null` | `null` | Additional CSS classes for the host element. |

## Stepper outputs

| Output | Payload | Description |
|---|---|---|
| `stepChange` | `StepChangeEvent` | Emitted when the active step changes. Payload: `{ activeStep: number, previousStep: number }`. |

## Stepper public methods

Call via template reference (`#stepper`):

| Method | Description |
|---|---|
| `nextStep()` | Advances to the next step if one exists. |
| `prevStep()` | Returns to the previous step. |
| `goToStep(index)` | Navigates directly to the given step index. |
| `isFirstStep()` | Returns true when on the first step. |
| `isLastStep()` | Returns true when on the last step. |

## StepperPanel inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `header` | `string` | `''` | Text label for the step header. |
| `disabled` | `boolean` | `false` | Prevents navigation to this step. |

## StepperPanel content projection

Content is projected via `ng-template` with named template reference variables:

| Template variable | Description |
|---|---|
| `#stepperContent` | Main body content rendered in the active step's panel area. |
| `#stepperFooter` | Footer area — typically Back/Next navigation buttons. |
| `#stepperHeader` | Custom HTML label for the step header (overrides `header` input). |

## Variants

```html
<ui-lib-stepper variant="material">...</ui-lib-stepper>
<ui-lib-stepper variant="bootstrap">...</ui-lib-stepper>
<ui-lib-stepper variant="minimal">...</ui-lib-stepper>
```

## Vertical orientation

```html
<ui-lib-stepper orientation="vertical">
  ...
</ui-lib-stepper>
```

## Linear mode

```html
<ui-lib-stepper [linear]="true" [(activeStep)]="step">
  ...
</ui-lib-stepper>
```

## Accessibility

- Step navigation bar has `role="tablist"` with `aria-label="Steps"`.
- Each step header button has `role="tab"`, `aria-selected`, `aria-current="step"` (when active), and `aria-controls` pointing to the panel.
- Active panel has `role="tabpanel"` with `aria-labelledby` pointing to its step header.
- Keyboard: `ArrowRight`/`ArrowLeft` (horizontal) or `ArrowDown`/`ArrowUp` (vertical) navigate between accessible steps. `Home`/`End` jump to first/last.
- Focus ring visible via `:focus-visible` on step headers.

## CSS custom properties

| Property | Description |
|---|---|
| `--uilib-stepper-indicator-size` | Size of the step number circle (default: `2rem`). |
| `--uilib-stepper-indicator-bg-active` | Background of the active step indicator. |
| `--uilib-stepper-indicator-bg-completed` | Background of completed step indicators. |
| `--uilib-stepper-label-color-active` | Label colour for the active step. |
| `--uilib-stepper-separator-color` | Colour of the connector line between steps. |
| `--uilib-stepper-separator-thickness` | Thickness of the connector line (default: `2px`). |
| `--uilib-stepper-content-padding` | Padding around step content area. |
