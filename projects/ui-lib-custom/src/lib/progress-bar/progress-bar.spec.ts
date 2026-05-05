import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { DebugElement, WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBar } from './progress-bar';
import type { ProgressBarMode, ProgressBarSize, ProgressBarVariant } from './progress-bar.types';

// ---- Helpers ---------------------------------------------------------

function query<T extends HTMLElement>(fixture: ComponentFixture<unknown>, selector: string): T {
  return fixture.debugElement.query(By.css(selector)).nativeElement as T;
}

function queryMaybe<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  const debug: DebugElement | null = fixture.debugElement.query(
    By.css(selector)
  ) as DebugElement | null;
  return debug === null ? null : (debug.nativeElement as T);
}

// ---- Test host -------------------------------------------------------

@Component({
  standalone: true,
  imports: [ProgressBar],
  template: `
    <ui-lib-progress-bar
      [value]="valueSignal()"
      [mode]="modeSignal()"
      [showValue]="showValueSignal()"
      [label]="labelSignal()"
      [size]="sizeSignal()"
      [variant]="variantSignal()"
      [color]="colorSignal()"
      [styleClass]="styleClassSignal()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly valueSignal: WritableSignal<number> = signal<number>(50);
  public readonly modeSignal: WritableSignal<ProgressBarMode> =
    signal<ProgressBarMode>('determinate');
  public readonly showValueSignal: WritableSignal<boolean> = signal<boolean>(true);
  public readonly labelSignal: WritableSignal<string | null> = signal<string | null>(null);
  public readonly sizeSignal: WritableSignal<ProgressBarSize> = signal<ProgressBarSize>('md');
  public readonly variantSignal: WritableSignal<ProgressBarVariant | null> =
    signal<ProgressBarVariant | null>(null);
  public readonly colorSignal: WritableSignal<string | null> = signal<string | null>(null);
  public readonly styleClassSignal: WritableSignal<string | null> = signal<string | null>(null);
}

function setup(): { fixture: ComponentFixture<TestHostComponent>; host: TestHostComponent } {
  TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  return { fixture, host: fixture.componentInstance };
}

// ---- Tests -----------------------------------------------------------

describe('ProgressBar', (): void => {
  it('should create', (): void => {
    const { fixture } = setup();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element).toBeTruthy();
  });

  it('should apply base class on host', (): void => {
    const { fixture } = setup();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('ui-lib-progress-bar');
  });

  it('should apply default size class', (): void => {
    const { fixture } = setup();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('ui-lib-progress-bar--size-md');
  });

  it('should have role="progressbar" on the host', (): void => {
    const { fixture } = setup();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow to the clamped value in determinate mode', (): void => {
    const { fixture } = setup();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should set aria-valuemin and aria-valuemax', (): void => {
    const { fixture } = setup();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.getAttribute('aria-valuemin')).toBe('0');
    expect(element.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should render the fill bar with correct width percentage', (): void => {
    const { fixture } = setup();
    const fill: HTMLElement = query(fixture, '.ui-lib-progress-bar__fill');
    expect(fill.style.width).toBe('50%');
  });

  it('should display the percentage label by default', (): void => {
    const { fixture } = setup();
    const label: HTMLElement = query(fixture, '.ui-lib-progress-bar__label');
    expect(label.textContent!.trim()).toBe('50%');
  });

  it('should hide the label when showValue is false', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.showValueSignal.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const label: HTMLElement | null = queryMaybe(fixture, '.ui-lib-progress-bar__label');
    expect(label).toBeNull();
  });

  it('should display a custom label when label input is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.labelSignal.set('Uploading…');
    fixture.detectChanges();
    await fixture.whenStable();
    const label: HTMLElement = query(fixture, '.ui-lib-progress-bar__label');
    expect(label.textContent!.trim()).toBe('Uploading…');
  });

  it('should clamp value above 100', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.valueSignal.set(150);
    fixture.detectChanges();
    await fixture.whenStable();
    const fill: HTMLElement = query(fixture, '.ui-lib-progress-bar__fill');
    expect(fill.style.width).toBe('100%');
  });

  it('should clamp value below 0', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.valueSignal.set(-10);
    fixture.detectChanges();
    await fixture.whenStable();
    const fill: HTMLElement = query(fixture, '.ui-lib-progress-bar__fill');
    expect(fill.style.width).toBe('0%');
  });

  it('should apply indeterminate class in indeterminate mode', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.modeSignal.set('indeterminate');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('ui-lib-progress-bar--indeterminate');
  });

  it('should not set aria-valuenow in indeterminate mode', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.modeSignal.set('indeterminate');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.getAttribute('aria-valuenow')).toBeNull();
  });

  it('should set aria-busy in indeterminate mode', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.modeSignal.set('indeterminate');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.getAttribute('aria-busy')).toBe('true');
  });

  it('should set aria-label to "Loading" in indeterminate mode', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.modeSignal.set('indeterminate');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.getAttribute('aria-label')).toBe('Loading');
  });

  it('should not render the label in indeterminate mode', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.modeSignal.set('indeterminate');
    fixture.detectChanges();
    await fixture.whenStable();
    const label: HTMLElement | null = queryMaybe(fixture, '.ui-lib-progress-bar__label');
    expect(label).toBeNull();
  });

  it('should not set fill width in indeterminate mode', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.modeSignal.set('indeterminate');
    fixture.detectChanges();
    await fixture.whenStable();
    const fill: HTMLElement = query(fixture, '.ui-lib-progress-bar__fill');
    expect(fill.style.width).toBe('');
  });

  it('should apply sm size class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.sizeSignal.set('sm');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('ui-lib-progress-bar--size-sm');
  });

  it('should apply lg size class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.sizeSignal.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('ui-lib-progress-bar--size-lg');
  });

  it('should apply variant class when variant is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.variantSignal.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('ui-lib-progress-bar--variant-bootstrap');
  });

  it('should apply custom color to the fill element', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.colorSignal.set('#ff0000');
    fixture.detectChanges();
    await fixture.whenStable();
    const fill: HTMLElement = query(fixture, '.ui-lib-progress-bar__fill');
    expect(fill.style.backgroundColor).toBeTruthy();
  });

  it('should apply extra styleClass to host', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.styleClassSignal.set('my-custom-class');
    fixture.detectChanges();
    await fixture.whenStable();
    const element: HTMLElement = query(fixture, 'ui-lib-progress-bar');
    expect(element.className).toContain('my-custom-class');
  });

  it('should update fill width reactively when value changes', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.valueSignal.set(80);
    fixture.detectChanges();
    await fixture.whenStable();
    const fill: HTMLElement = query(fixture, '.ui-lib-progress-bar__fill');
    expect(fill.style.width).toBe('80%');
  });
});
