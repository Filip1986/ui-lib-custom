import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ScrollTop } from './scroll-top';
import type { ScrollTopBehavior } from './scroll-top.types';

@Component({
  standalone: true,
  imports: [ScrollTop],
  template: `<ui-lib-scroll-top />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [ScrollTop],
  template: `
    <ui-lib-scroll-top
      [threshold]="threshold()"
      [buttonAriaLabel]="buttonAriaLabel()"
      [behavior]="behavior()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableHostComponent {
  public readonly threshold: WritableSignal<number> = signal<number>(400);
  public readonly buttonAriaLabel: WritableSignal<string> = signal<string>('Scroll to top');
  public readonly behavior: WritableSignal<ScrollTopBehavior> = signal<ScrollTopBehavior>('smooth');
}

@Component({
  standalone: true,
  imports: [ScrollTop],
  template: `
    <div class="scroll-top-parent-target">
      <ui-lib-scroll-top target="parent" [threshold]="threshold()" />
      <div style="height: 1200px;"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ParentTargetHostComponent {
  public readonly threshold: WritableSignal<number> = signal<number>(100);
}

@Component({
  standalone: true,
  imports: [ScrollTop],
  template: `
    <ui-lib-scroll-top />
    <ui-lib-scroll-top />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoInstancesHostComponent {}

async function createDefaultFixture(): Promise<ComponentFixture<DefaultHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [DefaultHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<DefaultHostComponent> =
    TestBed.createComponent(DefaultHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createConfigurableFixture(): Promise<ComponentFixture<ConfigurableHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ConfigurableHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<ConfigurableHostComponent> =
    TestBed.createComponent(ConfigurableHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createParentTargetFixture(): Promise<ComponentFixture<ParentTargetHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ParentTargetHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<ParentTargetHostComponent> =
    TestBed.createComponent(ParentTargetHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createTwoInstancesFixture(): Promise<ComponentFixture<TwoInstancesHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TwoInstancesHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<TwoInstancesHostComponent> =
    TestBed.createComponent(TwoInstancesHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function getScrollTopElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return getHostElement(fixture).querySelector('ui-lib-scroll-top') as HTMLElement;
}

function getButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return getHostElement(fixture).querySelector('.ui-lib-scroll-top__button') as HTMLButtonElement;
}

function getComponentInstance(fixture: ComponentFixture<unknown>): ScrollTop {
  return fixture.debugElement.query(By.directive(ScrollTop)).componentInstance as ScrollTop;
}

describe('ScrollTop Accessibility', (): void => {
  let originalScrollY: PropertyDescriptor | undefined;
  let mockScrollY: number = 0;

  beforeEach((): void => {
    mockScrollY = 0;
    originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: (): number => mockScrollY,
    });
  });

  afterEach((): void => {
    if (originalScrollY) {
      Object.defineProperty(window, 'scrollY', originalScrollY);
    }
    document.body.querySelectorAll('ui-lib-scroll-top').forEach((element: Element): void => {
      element.remove();
    });
    document.body
      .querySelectorAll('.scroll-top-parent-target')
      .forEach((element: Element): void => {
        element.remove();
      });
    TestBed.resetTestingModule();
  });

  it('should render a button with the default aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Scroll to top');
  });

  it('should reactively update a custom aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<ConfigurableHostComponent> = await createConfigurableFixture();
    fixture.componentInstance.buttonAriaLabel.set('Return to start');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Return to start');
  });

  it('should fall back to the default aria-label when the input is blank', async (): Promise<void> => {
    const fixture: ComponentFixture<ConfigurableHostComponent> = await createConfigurableFixture();
    fixture.componentInstance.buttonAriaLabel.set('   ');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Scroll to top');
  });

  it('should hide the decorative icon from assistive technology', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    const icon: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-scroll-top__button span'
    );
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should keep the hidden button out of the keyboard tab order', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    const button: HTMLButtonElement = getButton(fixture);
    expect(button.getAttribute('tabindex')).toBe('-1');
    expect(button.getAttribute('aria-hidden')).toBe('true');
    expect(getScrollTopElement(fixture).getAttribute('aria-hidden')).toBe('true');
  });

  it('should restore keyboard focusability when the button becomes visible', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    const component: ScrollTop = getComponentInstance(fixture);
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = getButton(fixture);
    expect(button.getAttribute('tabindex')).toBeNull();
    expect(button.getAttribute('aria-hidden')).toBeNull();
    expect(getScrollTopElement(fixture).getAttribute('aria-hidden')).toBeNull();
  });

  it('should allow focus on the visible button for keyboard users', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    const component: ScrollTop = getComponentInstance(fixture);
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = getButton(fixture);
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('should expose a unique host id', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    expect(getScrollTopElement(fixture).id).toMatch(/^ui-lib-scroll-top-\d+$/);
  });

  it('should generate unique ids for multiple instances', async (): Promise<void> => {
    const fixture: ComponentFixture<TwoInstancesHostComponent> = await createTwoInstancesFixture();
    const hosts: NodeListOf<HTMLElement> =
      getHostElement(fixture).querySelectorAll('ui-lib-scroll-top');
    expect(hosts[0]?.id).toMatch(/^ui-lib-scroll-top-\d+$/);
    expect(hosts[1]?.id).toMatch(/^ui-lib-scroll-top-\d+$/);
    expect(hosts[0]?.id).not.toBe(hosts[1]?.id);
  });

  it('should become visible when the window scroll position exceeds the threshold', async (): Promise<void> => {
    const fixture: ComponentFixture<ConfigurableHostComponent> = await createConfigurableFixture();
    fixture.componentInstance.threshold.set(120);
    fixture.detectChanges();
    await fixture.whenStable();
    mockScrollY = 240;
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getButton(fixture).getAttribute('tabindex')).toBeNull();
  });

  it('should become visible when the parent scroll position exceeds the threshold', async (): Promise<void> => {
    const fixture: ComponentFixture<ParentTargetHostComponent> = await createParentTargetFixture();
    const parentContainer: HTMLElement | null = getHostElement(fixture).querySelector(
      '.scroll-top-parent-target'
    );
    parentContainer!.scrollTop = 180;
    parentContainer!.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getButton(fixture).getAttribute('tabindex')).toBeNull();
  });

  it('should pass axe checks while hidden by default', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe checks when visible', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
    const component: ScrollTop = getComponentInstance(fixture);
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe checks for the parent target variant', async (): Promise<void> => {
    const fixture: ComponentFixture<ParentTargetHostComponent> = await createParentTargetFixture();
    const component: ScrollTop = getComponentInstance(fixture);
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
