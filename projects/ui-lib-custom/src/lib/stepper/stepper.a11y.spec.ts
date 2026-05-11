import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Stepper, STEPPER_DEFAULT_ARIA_LABEL } from './stepper';
import { StepperPanel } from './stepper-panel';

function queryElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryElements<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function getHorizontalTabs(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return queryElements<HTMLButtonElement>(fixture, '.ui-lib-stepper__step-header');
}

function getVerticalTabs(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return queryElements<HTMLButtonElement>(fixture, '.ui-lib-stepper__step-indicator');
}

@Component({
  standalone: true,
  imports: [Stepper, StepperPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-stepper [ariaLabel]="ariaLabel()" [(activeStep)]="activeStep" [linear]="linear()">
      <ui-lib-stepper-panel header="Account">
        <ng-template #stepperContent><p>Account details</p></ng-template>
      </ui-lib-stepper-panel>
      <ui-lib-stepper-panel header="Shipping">
        <ng-template #stepperContent><p>Shipping details</p></ng-template>
      </ui-lib-stepper-panel>
      <ui-lib-stepper-panel header="Payment" [error]="paymentError()">
        <ng-template #stepperContent><p>Payment details</p></ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
  `,
})
class StepperA11yHostComponent {
  public readonly activeStep: WritableSignal<number> = signal<number>(0);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(STEPPER_DEFAULT_ARIA_LABEL);
  public readonly linear: WritableSignal<boolean> = signal<boolean>(false);
  public readonly paymentError: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Stepper, StepperPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-stepper ariaLabel="ignored by Angular">
      <ui-lib-stepper-panel header="One">
        <ng-template #stepperContent><p>One</p></ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
    <ui-lib-stepper>
      <ui-lib-stepper-panel header="Two">
        <ng-template #stepperContent><p>Two</p></ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
  `,
})
class StepperMultiInstanceHostComponent {}

@Component({
  standalone: true,
  imports: [Stepper, StepperPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-stepper [ariaLabel]="ariaLabel()" orientation="vertical">
      <ui-lib-stepper-panel header="Profile">
        <ng-template #stepperContent><p>Profile content</p></ng-template>
      </ui-lib-stepper-panel>
      <ui-lib-stepper-panel header="Security">
        <ng-template #stepperContent><p>Security content</p></ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
  `,
})
class VerticalStepperA11yHostComponent {
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Profile progress');
}

async function createFixture<T>(hostComponent: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

describe('Stepper Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  describe('tablist semantics', (): void => {
    it('uses role="tablist" and the default aria-label on the step navigation container', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      const tablist: HTMLElement | null = queryElement<HTMLElement>(fixture, '[role="tablist"]');
      expect(tablist?.getAttribute('aria-label')).toBe(STEPPER_DEFAULT_ARIA_LABEL);
    });

    it('applies a custom ariaLabel input value to the step navigation container', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.ariaLabel.set('Checkout progress');
      fixture.detectChanges();

      const tablist: HTMLElement | null = queryElement<HTMLElement>(fixture, '[role="tablist"]');
      expect(tablist?.getAttribute('aria-label')).toBe('Checkout progress');
    });

    it('renders each step indicator as a tab', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs.length).toBe(3);
      for (const tab of tabs) {
        expect(tab.getAttribute('role')).toBe('tab');
      }
    });

    it('marks only the active step with aria-current="step"', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.activeStep.set(1);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[0]?.getAttribute('aria-current')).toBeNull();
      expect(tabs[1]?.getAttribute('aria-current')).toBe('step');
      expect(tabs[2]?.getAttribute('aria-current')).toBeNull();
    });

    it('reflects the active step with aria-selected', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.activeStep.set(2);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[0]?.getAttribute('aria-selected')).toBe('false');
      expect(tabs[1]?.getAttribute('aria-selected')).toBe('false');
      expect(tabs[2]?.getAttribute('aria-selected')).toBe('true');
    });

    it('links the active tab to its tabpanel via aria-controls and aria-labelledby', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.activeStep.set(1);
      fixture.detectChanges();

      const activeTab: HTMLButtonElement | undefined = getHorizontalTabs(fixture)[1];
      const panel: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '[role="tabpanel"]:not([hidden])'
      );
      expect(panel?.id).toBe(activeTab?.getAttribute('aria-controls'));
      expect(panel?.getAttribute('aria-labelledby')).toBe(activeTab?.id);
    });
  });

  describe('screen reader labels', (): void => {
    it('includes the step number and label in each tab aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[0]?.getAttribute('aria-label')).toBe('Step 1 of 3: Account — current');
      expect(tabs[1]?.getAttribute('aria-label')).toBe('Step 2 of 3: Shipping');
      expect(tabs[2]?.getAttribute('aria-label')).toBe('Step 3 of 3: Payment');
    });

    it('announces completed steps in the aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.activeStep.set(2);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[0]?.getAttribute('aria-label')).toContain('completed');
      expect(tabs[1]?.getAttribute('aria-label')).toContain('completed');
      expect(tabs[2]?.getAttribute('aria-label')).toContain('current');
    });

    it('announces error steps in the aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.paymentError.set(true);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[2]?.getAttribute('aria-label')).toBe('Step 3 of 3: Payment — error, please fix');
    });

    it('preserves error announcements when the errored step is active', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.paymentError.set(true);
      fixture.componentInstance.activeStep.set(2);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[2]?.getAttribute('aria-label')).toContain('error, please fix');
      expect(tabs[2]?.getAttribute('aria-label')).not.toContain('current');
    });
  });

  describe('linear mode enforcement', (): void => {
    it('marks future steps as aria-disabled in linear mode', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.linear.set(true);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[1]?.getAttribute('aria-disabled')).toBe('true');
      expect(tabs[2]?.getAttribute('aria-disabled')).toBe('true');
    });

    it('removes future steps from interaction in linear mode', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.linear.set(true);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[1]?.getAttribute('tabindex')).toBe('-1');
      expect(tabs[2]?.getAttribute('tabindex')).toBe('-1');
      expect(tabs[1]?.disabled).toBe(true);
      expect(tabs[2]?.disabled).toBe(true);
    });

    it('keeps previously completed steps available in linear mode', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.linear.set(true);
      fixture.componentInstance.activeStep.set(2);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[0]?.getAttribute('aria-disabled')).toBeNull();
      expect(tabs[1]?.getAttribute('aria-disabled')).toBeNull();
      expect(tabs[0]?.disabled).toBe(false);
      expect(tabs[1]?.disabled).toBe(false);
    });

    it('announces future steps as unavailable until earlier steps are complete', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.linear.set(true);
      fixture.detectChanges();

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[1]?.getAttribute('aria-label')).toContain(
        'unavailable until previous steps are complete'
      );
      expect(tabs[2]?.getAttribute('aria-label')).toContain(
        'unavailable until previous steps are complete'
      );
    });
  });

  describe('non-linear mode', (): void => {
    it('does not mark future steps as disabled when linear mode is off', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      expect(tabs[1]?.getAttribute('aria-disabled')).toBeNull();
      expect(tabs[2]?.getAttribute('aria-disabled')).toBeNull();
    });

    it('keeps future steps clickable when linear mode is off', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      const tabs: HTMLButtonElement[] = getHorizontalTabs(fixture);
      tabs[2]?.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.activeStep()).toBe(2);
      expect(tabs[2]?.disabled).toBe(false);
    });
  });

  describe('multi-instance ids', (): void => {
    it('generates unique ids for each stepper instance and its step ids', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperMultiInstanceHostComponent> = await createFixture(
        StepperMultiInstanceHostComponent
      );

      const steppers: HTMLElement[] = queryElements<HTMLElement>(fixture, 'ui-lib-stepper');
      expect(steppers.length).toBe(2);
      expect(steppers[0]?.id).toBe('');
      expect(steppers[1]?.id).toBe('');

      const tabs: HTMLButtonElement[] = queryElements<HTMLButtonElement>(fixture, '[role="tab"]');
      expect(tabs[0]?.id).toMatch(/^ui-lib-stepper-\d+-step-0$/);
      expect(tabs[1]?.id).toMatch(/^ui-lib-stepper-\d+-step-0$/);
      expect(tabs[0]?.id).not.toBe(tabs[1]?.id);
    });
  });

  describe('vertical orientation', (): void => {
    it('exposes a vertical tablist with the provided aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<VerticalStepperA11yHostComponent> = await createFixture(
        VerticalStepperA11yHostComponent
      );

      const tablist: HTMLElement | null = queryElement<HTMLElement>(fixture, '[role="tablist"]');
      expect(tablist?.getAttribute('aria-orientation')).toBe('vertical');
      expect(tablist?.getAttribute('aria-label')).toBe('Profile progress');
    });

    it('applies rich aria-labels to vertical step indicators', async (): Promise<void> => {
      const fixture: ComponentFixture<VerticalStepperA11yHostComponent> = await createFixture(
        VerticalStepperA11yHostComponent
      );

      const tabs: HTMLButtonElement[] = getVerticalTabs(fixture);
      expect(tabs[0]?.getAttribute('aria-label')).toBe('Step 1 of 2: Profile — current');
      expect(tabs[1]?.getAttribute('aria-label')).toBe('Step 2 of 2: Security');
    });
  });

  describe('axe accessibility', (): void => {
    it('has no axe violations on the initial step', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('has no axe violations with mid-progress state', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.activeStep.set(1);
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('has no axe violations with the last step active', async (): Promise<void> => {
      const fixture: ComponentFixture<StepperA11yHostComponent> =
        await createFixture(StepperA11yHostComponent);

      fixture.componentInstance.activeStep.set(2);
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
