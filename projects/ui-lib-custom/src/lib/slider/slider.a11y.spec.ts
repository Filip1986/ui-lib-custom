import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Slider } from './slider';

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-slider
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [range]="range()"
      [orientation]="orientation()"
      [disabled]="disabled()"
      [ariaLabel]="ariaLabel()"
      [valueTextFn]="valueTextFn()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
})
class SliderA11yHostComponent {
  public value: number | [number, number] = 50;
  public readonly min: WritableSignal<number> = signal<number>(0);
  public readonly max: WritableSignal<number> = signal<number>(100);
  public readonly step: WritableSignal<number> = signal<number>(1);
  public readonly range: WritableSignal<boolean> = signal<boolean>(false);
  public readonly orientation: WritableSignal<'horizontal' | 'vertical'> = signal<
    'horizontal' | 'vertical'
  >('horizontal');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>('Volume');
  public readonly valueTextFn: WritableSignal<(value: number) => string> = signal<
    (value: number) => string
  >((value: number): string => String(value));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function createFixture(
  initialValue: number | [number, number] = 50
): Promise<ComponentFixture<SliderA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [SliderA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<SliderA11yHostComponent> =
    TestBed.createComponent(SliderA11yHostComponent);
  fixture.componentInstance.value = initialValue;
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getHandle(fixture: ComponentFixture<SliderA11yHostComponent>): HTMLElement {
  const handle: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-slider__handle'
  );
  if (!handle) {
    throw new Error('Expected slider handle element');
  }
  return handle;
}

function getStartHandle(fixture: ComponentFixture<SliderA11yHostComponent>): HTMLElement {
  const handle: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-slider__handle--start'
  );
  if (!handle) {
    throw new Error('Expected slider start handle element');
  }
  return handle;
}

function getEndHandle(fixture: ComponentFixture<SliderA11yHostComponent>): HTMLElement {
  const handle: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-slider__handle--end'
  );
  if (!handle) {
    throw new Error('Expected slider end handle element');
  }
  return handle;
}

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Slider Accessibility', (): void => {
  afterEach((): void => {
    const fixture: HTMLElement | null = document.body.querySelector('div[ng-version]');
    if (fixture) {
      document.body.removeChild(fixture);
    }
  });

  // ── ARIA role ─────────────────────────────────────────────────────────────

  it('handle has role="slider"', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    expect(getHandle(fixture).getAttribute('role')).toBe('slider');
  });

  // ── ARIA value attributes ─────────────────────────────────────────────────

  it('aria-valuenow reflects the current value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(42);
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('42');
  });

  it('aria-valuenow updates when value changes via keyboard', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowRight');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('51');
  });

  it('aria-valuemin reflects the min input', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    fixture.componentInstance.min.set(10);
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuemin')).toBe('10');
  });

  it('aria-valuemax reflects the max input', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    fixture.componentInstance.max.set(200);
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuemax')).toBe('200');
  });

  it('aria-valuetext provides a human-readable string of the value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(67);
    expect(getHandle(fixture).getAttribute('aria-valuetext')).toBe('67');
  });

  it('aria-valuetext uses valueTextFn formatting', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(67);
    fixture.componentInstance.valueTextFn.set((value: number): string => `${value} percent`);
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuetext')).toBe('67 percent');
  });

  // ── ARIA orientation ──────────────────────────────────────────────────────

  it('aria-orientation is "horizontal" by default', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    expect(getHandle(fixture).getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('aria-orientation is "vertical" when orientation input is vertical', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-orientation')).toBe('vertical');
  });

  // ── Keyboard navigation — single handle ───────────────────────────────────

  it('ArrowRight increments the value by step', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(51);
  });

  it('ArrowUp increments the value by step', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowUp');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(51);
  });

  it('ArrowLeft decrements the value by step', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowLeft');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(49);
  });

  it('ArrowDown decrements the value by step', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowDown');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(49);
  });

  it('PageUp increments by step × 10', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    fixture.componentInstance.step.set(2);
    fixture.detectChanges();
    dispatchKey(getHandle(fixture), 'PageUp');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(70);
  });

  it('PageDown decrements by step × 10', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    fixture.componentInstance.step.set(2);
    fixture.detectChanges();
    dispatchKey(getHandle(fixture), 'PageDown');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(30);
  });

  it('Home jumps to the minimum value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(60);
    fixture.componentInstance.min.set(5);
    fixture.detectChanges();
    dispatchKey(getHandle(fixture), 'Home');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(5);
  });

  it('End jumps to the maximum value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(40);
    fixture.componentInstance.max.set(80);
    fixture.detectChanges();
    dispatchKey(getHandle(fixture), 'End');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(80);
  });

  // ── Decorative elements excluded from a11y tree ───────────────────────────

  it('fill element has aria-hidden="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    const fill: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-slider__fill'
    );
    expect(fill?.getAttribute('aria-hidden')).toBe('true');
  });

  // ── Disabled state ────────────────────────────────────────────────────────

  it('disabled state sets aria-disabled="true" on the handle', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('disabled state prevents keyboard interaction', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(50);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    dispatchKey(getHandle(fixture), 'ArrowUp');
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(50);
  });

  // ── Range mode ────────────────────────────────────────────────────────────

  it('range mode: start handle has aria-label="Minimum value"', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([20, 80]);
    fixture.componentInstance.range.set(true);
    fixture.componentInstance.ariaLabel.set(null);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getStartHandle(fixture).getAttribute('aria-label')).toBe('Minimum value');
  });

  it('range mode: end handle has aria-label="Maximum value"', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([20, 80]);
    fixture.componentInstance.range.set(true);
    fixture.componentInstance.ariaLabel.set(null);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getEndHandle(fixture).getAttribute('aria-label')).toBe('Maximum value');
  });

  it('range mode: start handle aria-valuemax is the current end value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([20, 70]);
    fixture.componentInstance.range.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getStartHandle(fixture).getAttribute('aria-valuemax')).toBe('70');
  });

  it('range mode: end handle aria-valuemin is the current start value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([30, 80]);
    fixture.componentInstance.range.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getEndHandle(fixture).getAttribute('aria-valuemin')).toBe('30');
  });

  it('range mode: handles use valueTextFn formatting independently', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([30, 80]);
    fixture.componentInstance.range.set(true);
    fixture.componentInstance.valueTextFn.set((value: number): string => `Value ${value}`);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getStartHandle(fixture).getAttribute('aria-valuetext')).toBe('Value 30');
    expect(getEndHandle(fixture).getAttribute('aria-valuetext')).toBe('Value 80');
  });

  it('range mode: start handle responds to ArrowRight independently', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([20, 80]);
    fixture.componentInstance.range.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    dispatchKey(getStartHandle(fixture), 'ArrowRight');
    fixture.detectChanges();
    const updated: number | [number, number] = fixture.componentInstance.value;
    expect(Array.isArray(updated) && updated[0]).toBe(21);
  });

  it('range mode: end handle responds to ArrowLeft independently', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([20, 80]);
    fixture.componentInstance.range.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    dispatchKey(getEndHandle(fixture), 'ArrowLeft');
    fixture.detectChanges();
    const updated: number | [number, number] = fixture.componentInstance.value;
    expect(Array.isArray(updated) && updated[1]).toBe(79);
  });

  // ── axe automated checks ──────────────────────────────────────────────────

  it('axe passes in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes at minimum value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(0);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes at maximum value', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture(100);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes with vertical orientation', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture();
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes in range mode', async (): Promise<void> => {
    const fixture: ComponentFixture<SliderA11yHostComponent> = await createFixture([25, 75]);
    fixture.componentInstance.range.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
