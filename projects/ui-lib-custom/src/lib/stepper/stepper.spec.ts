import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Stepper } from './stepper';
import { StepperPanel } from './stepper-panel';
import type { StepChangeEvent, StepperOrientation, StepperVariant } from './stepper.types';

// ── Helpers ─────────────────────────────────────────────────────────────────

function getNativeElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function getStepperElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return getNativeElement(fixture).querySelector('ui-lib-stepper') as HTMLElement;
}

function getStepHeaders(fixture: ComponentFixture<unknown>): NodeListOf<HTMLButtonElement> {
  return getStepperElement(fixture).querySelectorAll<HTMLButtonElement>(
    '.ui-lib-stepper__step-header'
  );
}

function getStepLabels(fixture: ComponentFixture<unknown>): NodeListOf<HTMLElement> {
  return getStepperElement(fixture).querySelectorAll<HTMLElement>('.ui-lib-stepper__step-label');
}

function getPanelElement(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getStepperElement(fixture).querySelector('.ui-lib-stepper__panel');
}

function getPanelContent(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getStepperElement(fixture).querySelector('.ui-lib-stepper__panel-content');
}

function getPanelFooter(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getStepperElement(fixture).querySelector('.ui-lib-stepper__panel-footer');
}

// ── Test host components ─────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Stepper, StepperPanel],
  template: `
    <ui-lib-stepper
      [(activeStep)]="currentStep"
      [linear]="linearMode()"
      [orientation]="orientation()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      (stepChange)="lastStepChange = $event"
      #stepper
    >
      <ui-lib-stepper-panel header="Step One">
        <ng-template #stepperContent>
          <p class="content-one">Content for step one</p>
        </ng-template>
        <ng-template #stepperFooter>
          <button class="next-btn" type="button" (click)="stepper.nextStep()">Next</button>
        </ng-template>
      </ui-lib-stepper-panel>

      <ui-lib-stepper-panel header="Step Two">
        <ng-template #stepperContent>
          <p class="content-two">Content for step two</p>
        </ng-template>
        <ng-template #stepperFooter>
          <button class="prev-btn" type="button" (click)="stepper.prevStep()">Back</button>
          <button class="next-btn-two" type="button" (click)="stepper.nextStep()">Next</button>
        </ng-template>
      </ui-lib-stepper-panel>

      <ui-lib-stepper-panel header="Step Three">
        <ng-template #stepperContent>
          <p class="content-three">Content for step three</p>
        </ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly currentStep: WritableSignal<number> = signal<number>(0);
  public readonly linearMode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly orientation: WritableSignal<StepperOrientation> =
    signal<StepperOrientation>('horizontal');
  public readonly variant: WritableSignal<StepperVariant | null> = signal<StepperVariant | null>(
    null
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public lastStepChange: StepChangeEvent | null = null;

  public readonly stepperRef: WritableSignal<Stepper | undefined> = signal<Stepper | undefined>(
    undefined
  );
}

@Component({
  standalone: true,
  imports: [Stepper, StepperPanel],
  template: `
    <ui-lib-stepper [(activeStep)]="currentStep" [linear]="true" #stepper>
      <ui-lib-stepper-panel header="First">
        <ng-template #stepperContent><p>First content</p></ng-template>
        <ng-template #stepperFooter>
          <button class="next" type="button" (click)="stepper.nextStep()">Next</button>
        </ng-template>
      </ui-lib-stepper-panel>
      <ui-lib-stepper-panel header="Second">
        <ng-template #stepperContent><p>Second content</p></ng-template>
      </ui-lib-stepper-panel>
      <ui-lib-stepper-panel [disabled]="isThirdDisabled()" header="Third">
        <ng-template #stepperContent><p>Third content</p></ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LinearHostComponent {
  public readonly currentStep: WritableSignal<number> = signal<number>(0);
  public readonly isThirdDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly stepper: Signal<Stepper | undefined> = viewChild<Stepper>('stepper');
}

@Component({
  standalone: true,
  imports: [Stepper, StepperPanel],
  template: `
    <ui-lib-stepper orientation="vertical" #stepper>
      <ui-lib-stepper-panel header="Alpha">
        <ng-template #stepperContent><p class="alpha-content">Alpha</p></ng-template>
      </ui-lib-stepper-panel>
      <ui-lib-stepper-panel header="Beta">
        <ng-template #stepperContent><p class="beta-content">Beta</p></ng-template>
      </ui-lib-stepper-panel>
    </ui-lib-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class VerticalHostComponent {}

// ── Test suites ──────────────────────────────────────────────────────────────

describe('Stepper', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', (): void => {
    it('should render the stepper element', (): void => {
      const stepper: HTMLElement = getStepperElement(fixture);
      expect(stepper).toBeTruthy();
    });

    it('should render the correct number of step headers', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      expect(headers.length).toBe(3);
    });

    it('should render step labels from header input', (): void => {
      const labels: NodeListOf<HTMLElement> = getStepLabels(fixture);
      expect(labels[0]!.textContent!.trim()).toBe('Step One');
      expect(labels[1]!.textContent!.trim()).toBe('Step Two');
      expect(labels[2]!.textContent!.trim()).toBe('Step Three');
    });

    it('should render active panel content for step 0', (): void => {
      const content: HTMLElement | null = getPanelContent(fixture);
      expect(content).toBeTruthy();
      expect(content!.querySelector('.content-one')).toBeTruthy();
    });

    it('should render panel footer for the active step', (): void => {
      const footer: HTMLElement | null = getPanelFooter(fixture);
      expect(footer).toBeTruthy();
      expect(footer!.querySelector('.next-btn')).toBeTruthy();
    });

    it('should apply material variant class by default', (): void => {
      const stepper: HTMLElement = getStepperElement(fixture);
      expect(stepper.className).toContain('ui-lib-stepper--material');
    });

    it('should apply horizontal orientation class by default', (): void => {
      const stepper: HTMLElement = getStepperElement(fixture);
      expect(stepper.className).toContain('ui-lib-stepper--horizontal');
    });
  });

  describe('Input bindings', (): void => {
    it('should apply custom styleClass', (): void => {
      host.styleClass.set('custom-stepper');
      fixture.detectChanges();
      const stepper: HTMLElement = getStepperElement(fixture);
      expect(stepper.className).toContain('custom-stepper');
    });

    it('should apply variant class when variant input is set', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      const stepper: HTMLElement = getStepperElement(fixture);
      expect(stepper.className).toContain('ui-lib-stepper--bootstrap');
    });

    it('should switch to vertical orientation class', (): void => {
      host.orientation.set('vertical');
      fixture.detectChanges();
      const stepper: HTMLElement = getStepperElement(fixture);
      expect(stepper.className).toContain('ui-lib-stepper--vertical');
    });

    it('should reflect activeStep model change', (): void => {
      host.currentStep.set(1);
      fixture.detectChanges();
      const content: HTMLElement | null = getPanelContent(fixture);
      expect(content!.querySelector('.content-two')).toBeTruthy();
    });
  });

  describe('Step navigation', (): void => {
    it('should mark step 0 as active by default', (): void => {
      const steps: NodeListOf<HTMLElement> =
        getStepperElement(fixture).querySelectorAll('.ui-lib-stepper__step');
      expect(steps[0]!.classList.contains('ui-lib-stepper__step--active')).toBe(true);
      expect(steps[1]!.classList.contains('ui-lib-stepper__step--active')).toBe(false);
    });

    it('should navigate to step 2 when clicked', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[2]!.click();
      fixture.detectChanges();
      expect(host.currentStep()).toBe(2);
    });

    it('should update the active step class on navigation', (): void => {
      host.currentStep.set(1);
      fixture.detectChanges();
      const steps: NodeListOf<HTMLElement> =
        getStepperElement(fixture).querySelectorAll('.ui-lib-stepper__step');
      expect(steps[1]!.classList.contains('ui-lib-stepper__step--active')).toBe(true);
    });

    it('should mark previous steps as completed', (): void => {
      host.currentStep.set(2);
      fixture.detectChanges();
      const steps: NodeListOf<HTMLElement> =
        getStepperElement(fixture).querySelectorAll('.ui-lib-stepper__step');
      expect(steps[0]!.classList.contains('ui-lib-stepper__step--completed')).toBe(true);
      expect(steps[1]!.classList.contains('ui-lib-stepper__step--completed')).toBe(true);
      expect(steps[2]!.classList.contains('ui-lib-stepper__step--completed')).toBe(false);
    });

    it('should show checkmark icon on completed steps', (): void => {
      host.currentStep.set(2);
      fixture.detectChanges();
      const stepper: HTMLElement = getStepperElement(fixture);
      const checkmarks: NodeListOf<SVGElement> = stepper.querySelectorAll<SVGElement>(
        '.ui-lib-stepper__checkmark'
      );
      expect(checkmarks.length).toBe(2);
    });

    it('should emit stepChange event on navigation', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[1]!.click();
      fixture.detectChanges();
      expect(host.lastStepChange).toEqual({ activeStep: 1, previousStep: 0 });
    });

    it('should not emit if already on the target step', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[0]!.click();
      fixture.detectChanges();
      expect(host.lastStepChange).toBeNull();
    });
  });

  describe('Accessibility', (): void => {
    it('should have role=tablist on the nav element', (): void => {
      const nav: HTMLElement | null = getStepperElement(fixture).querySelector('[role="tablist"]');
      expect(nav).toBeTruthy();
    });

    it('should have role=tab on step header buttons', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers.forEach((header: HTMLButtonElement): void => {
        expect(header.getAttribute('role')).toBe('tab');
      });
    });

    it('should set aria-selected=true on the active step', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      expect(headers[0]!.getAttribute('aria-selected')).toBe('true');
      expect(headers[1]!.getAttribute('aria-selected')).toBe('false');
    });

    it('should set aria-current=step on the active header', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      expect(headers[0]!.getAttribute('aria-current')).toBe('step');
      expect(headers[1]!.getAttribute('aria-current')).toBeNull();
    });

    it('should have role=tabpanel on the active panel', (): void => {
      const panel: HTMLElement | null = getPanelElement(fixture);
      expect(panel!.getAttribute('role')).toBe('tabpanel');
    });

    it('should connect panel aria-labelledby to the active step id', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      const panel: HTMLElement | null = getPanelElement(fixture);
      expect(panel!.getAttribute('aria-labelledby')).toBe(headers[0]!.id);
    });

    it('should set tabindex=0 only on the active step header', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      expect(headers[0]!.getAttribute('tabindex')).toBe('0');
      expect(headers[1]!.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Keyboard navigation', (): void => {
    it('should move to the next step on ArrowRight', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();
      expect(host.currentStep()).toBe(1);
    });

    it('should move to the previous step on ArrowLeft', (): void => {
      host.currentStep.set(2);
      fixture.detectChanges();
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[2]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      fixture.detectChanges();
      expect(host.currentStep()).toBe(1);
    });

    it('should jump to the first step on Home key', (): void => {
      host.currentStep.set(2);
      fixture.detectChanges();
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[2]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      expect(host.currentStep()).toBe(0);
    });

    it('should jump to the last step on End key', (): void => {
      const headers: NodeListOf<HTMLButtonElement> = getStepHeaders(fixture);
      headers[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      expect(host.currentStep()).toBe(2);
    });
  });
});

// ── Linear mode tests ────────────────────────────────────────────────────────

describe('Stepper — linear mode', (): void => {
  let fixture: ComponentFixture<LinearHostComponent>;
  let host: LinearHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [LinearHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LinearHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not allow skipping ahead in linear mode', (): void => {
    const steps: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.ui-lib-stepper__step-header');
    steps[2]!.click();
    fixture.detectChanges();
    expect(host.currentStep()).toBe(0);
  });

  it('should allow navigating to completed steps in linear mode', (): void => {
    host.currentStep.set(2);
    fixture.detectChanges();
    const steps: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.ui-lib-stepper__step-header');
    steps[0]!.click();
    fixture.detectChanges();
    expect(host.currentStep()).toBe(0);
  });

  it('should mark step as disabled when panel disabled input is true', (): void => {
    host.isThirdDisabled.set(true);
    fixture.detectChanges();
    const stepElements: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.ui-lib-stepper__step');
    expect(stepElements[2]!.classList.contains('ui-lib-stepper__step--disabled')).toBe(true);
  });

  it('should not navigate to a disabled step', (): void => {
    host.currentStep.set(1);
    host.isThirdDisabled.set(true);
    fixture.detectChanges();
    const steps: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.ui-lib-stepper__step-header');
    steps[2]!.click();
    fixture.detectChanges();
    expect(host.currentStep()).toBe(1);
  });
});

// ── Vertical orientation tests ────────────────────────────────────────────────

describe('Stepper — vertical orientation', (): void => {
  let fixture: ComponentFixture<VerticalHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [VerticalHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalHostComponent);
    fixture.detectChanges();
  });

  it('should render vertical layout container', (): void => {
    const verticalList: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-stepper__vertical-list'
    );
    expect(verticalList).toBeTruthy();
  });

  it('should apply vertical orientation class', (): void => {
    const stepper: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-stepper'
    ) as HTMLElement;
    expect(stepper.className).toContain('ui-lib-stepper--vertical');
  });

  it('should show active panel content inline in vertical mode', (): void => {
    const content: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.alpha-content'
    );
    expect(content).toBeTruthy();
  });

  it('should not render inactive panel content in vertical mode', (): void => {
    const betaContent: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.beta-content'
    );
    expect(betaContent).toBeNull();
  });

  it('should use step-indicator buttons in vertical mode', (): void => {
    const indicators: NodeListOf<HTMLButtonElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.ui-lib-stepper__step-indicator');
    expect(indicators.length).toBe(2);
  });

  it('should navigate on ArrowDown in vertical mode', (): void => {
    const indicators: NodeListOf<HTMLButtonElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.ui-lib-stepper__step-indicator');
    indicators[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    const betaContent: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.beta-content'
    );
    expect(betaContent).toBeTruthy();
  });
});
