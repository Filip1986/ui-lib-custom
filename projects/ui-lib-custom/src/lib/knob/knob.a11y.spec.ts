import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { KnobComponent } from './knob.component';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-knob
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [showValue]="showValue()"
      [valueTemplate]="valueTemplate()"
      [ariaLabel]="ariaLabel()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
})
class KnobA11yHostComponent {
  public value: number = 50;
  public readonly min: WritableSignal<number> = signal<number>(0);
  public readonly max: WritableSignal<number> = signal<number>(100);
  public readonly step: WritableSignal<number> = signal<number>(1);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showValue: WritableSignal<boolean> = signal<boolean>(true);
  public readonly valueTemplate: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Volume');
}

async function createFixture(
  initialValue: number = 50,
): Promise<ComponentFixture<KnobA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [KnobA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<KnobA11yHostComponent> =
    TestBed.createComponent(KnobA11yHostComponent);
  fixture.componentInstance.value = initialValue;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getHostElement(fixture: ComponentFixture<KnobA11yHostComponent>): HTMLElement {
  const hostElement: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-knob',
  );
  if (!hostElement) {
    throw new Error('Expected knob host element');
  }
  return hostElement;
}

function getSvgElement(fixture: ComponentFixture<KnobA11yHostComponent>): SVGElement {
  const svgElement: SVGElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-knob-svg',
  );
  if (!svgElement) {
    throw new Error('Expected knob svg element');
  }
  return svgElement;
}

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

describe('Knob Accessibility', (): void => {
  it('host exposes role="slider"', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    expect(getHostElement(fixture).getAttribute('role')).toBe('slider');
  });

  it('aria-valuenow reflects current value', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture(73);
    expect(getHostElement(fixture).getAttribute('aria-valuenow')).toBe('73');
  });

  it('aria-valuemin and aria-valuemax reflect configured bounds', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.min.set(10);
    fixture.componentInstance.max.set(90);
    fixture.detectChanges();
    const hostElement: HTMLElement = getHostElement(fixture);
    expect(hostElement.getAttribute('aria-valuemin')).toBe('10');
    expect(hostElement.getAttribute('aria-valuemax')).toBe('90');
  });

  it('aria-valuetext provides a human-readable value', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.valueTemplate.set('{value}%');
    fixture.detectChanges();
    expect(getHostElement(fixture).getAttribute('aria-valuetext')).toBe('50%');
  });

  it('ArrowRight increments by step', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    dispatchKey(getHostElement(fixture), 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(51);
  });

  it('ArrowUp increments by step', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    dispatchKey(getHostElement(fixture), 'ArrowUp');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(51);
  });

  it('ArrowLeft decrements by step', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    dispatchKey(getHostElement(fixture), 'ArrowLeft');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(49);
  });

  it('ArrowDown decrements by step', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    dispatchKey(getHostElement(fixture), 'ArrowDown');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(49);
  });

  it('PageUp increases by large step (step * 10)', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.step.set(2);
    fixture.detectChanges();
    dispatchKey(getHostElement(fixture), 'PageUp');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(70);
  });

  it('PageDown decreases by large step (step * 10)', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.step.set(2);
    fixture.detectChanges();
    dispatchKey(getHostElement(fixture), 'PageDown');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(30);
  });

  it('Home sets value to min', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.value = 42;
    fixture.componentInstance.min.set(5);
    fixture.detectChanges();
    dispatchKey(getHostElement(fixture), 'Home');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(5);
  });

  it('End sets value to max', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.value = 42;
    fixture.componentInstance.max.set(77);
    fixture.detectChanges();
    dispatchKey(getHostElement(fixture), 'End');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(77);
  });

  it('disabled state sets aria-disabled="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(getHostElement(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('disabled state prevents keyboard interaction', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    dispatchKey(getHostElement(fixture), 'ArrowUp');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(50);
  });

  it('decorative svg is aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    expect(getSvgElement(fixture).getAttribute('aria-hidden')).toBe('true');
  });

  it('decorative svg is not focusable', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    expect(getSvgElement(fixture).getAttribute('focusable')).toBe('false');
  });

  it('value label is visual-only and not a live region', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    const valueLabelElement: SVGTextElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.ui-lib-knob-value-label');
    expect((valueLabelElement?.textContent ?? '').trim()).toBe('50');
    expect(valueLabelElement?.getAttribute('aria-live')).toBeNull();
  });

  it('axe passes in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes at minimum value', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.value = 0;
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes at maximum value', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.value = 100;
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<KnobA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
