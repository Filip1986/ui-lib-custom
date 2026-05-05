import { TestBed } from '@angular/core/testing';
import { type ComponentFixture } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProgressSpinner } from './progress-spinner';
import type { ProgressSpinnerSize, ProgressSpinnerVariant } from './progress-spinner.types';

// ---------------------------------------------------------------------------
// Test host
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-test-host',
  standalone: true,
  imports: [ProgressSpinner],
  template: `
    <ui-lib-progress-spinner
      [strokeWidth]="strokeWidth()"
      [fill]="fill()"
      [animationDuration]="animationDuration()"
      [size]="sizeValue()"
      [variant]="variantValue()"
      [styleClass]="styleClassValue()"
      [ariaLabel]="ariaLabelValue()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly strokeWidth: WritableSignal<string> = signal<string>('2');
  public readonly fill: WritableSignal<string> = signal<string>('none');
  public readonly animationDuration: WritableSignal<string> = signal<string>('2s');
  public readonly sizeValue: WritableSignal<ProgressSpinnerSize> =
    signal<ProgressSpinnerSize>('md');
  public readonly variantValue: WritableSignal<ProgressSpinnerVariant | null> =
    signal<ProgressSpinnerVariant | null>(null);
  public readonly styleClassValue: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabelValue: WritableSignal<string> = signal<string>('Loading...');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSpinnerEl(fixture: ComponentFixture<TestHostComponent>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-progress-spinner'
  ) as HTMLElement;
}

function getSvgEl(fixture: ComponentFixture<TestHostComponent>): SVGElement {
  return (fixture.nativeElement as HTMLElement).querySelector('svg') as SVGElement;
}

function getCircleEl(fixture: ComponentFixture<TestHostComponent>): SVGCircleElement {
  return (fixture.nativeElement as HTMLElement).querySelector('circle') as SVGCircleElement;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ProgressSpinner', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner).toBeTruthy();
  });

  it('should apply default host classes', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('ui-lib-progress-spinner');
    expect(spinner.classList).toContain('ui-lib-progress-spinner--size-md');
  });

  it('should set role="status" on the host', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.getAttribute('role')).toBe('status');
  });

  it('should set aria-busy="true" on the host', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.getAttribute('aria-busy')).toBe('true');
  });

  it('should set default aria-label', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.getAttribute('aria-label')).toBe('Loading...');
  });

  it('should reflect a custom ariaLabel', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    fixture.componentInstance.ariaLabelValue.set('Fetching data');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.getAttribute('aria-label')).toBe('Fetching data');
  });

  it('should apply size class sm', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.sizeValue.set('sm');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('ui-lib-progress-spinner--size-sm');
  });

  it('should apply size class lg', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.sizeValue.set('lg');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('ui-lib-progress-spinner--size-lg');
  });

  it('should apply variant class material', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.variantValue.set('material');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('ui-lib-progress-spinner--variant-material');
  });

  it('should apply variant class bootstrap', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.variantValue.set('bootstrap');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('ui-lib-progress-spinner--variant-bootstrap');
  });

  it('should apply variant class minimal', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.variantValue.set('minimal');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('ui-lib-progress-spinner--variant-minimal');
  });

  it('should apply an extra styleClass', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.styleClassValue.set('my-custom-class');
    fixture.detectChanges();
    const spinner: HTMLElement = getSpinnerEl(fixture);
    expect(spinner.classList).toContain('my-custom-class');
  });

  it('should render the SVG element', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const svg: SVGElement = getSvgEl(fixture);
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('viewBox')).toBe('25 25 50 50');
  });

  it('should render the circle element', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const circle: SVGCircleElement = getCircleEl(fixture);
    expect(circle).toBeTruthy();
  });

  it('should apply strokeWidth to the circle', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.strokeWidth.set('4');
    fixture.detectChanges();
    const circle: SVGCircleElement = getCircleEl(fixture);
    expect(circle.getAttribute('stroke-width')).toBe('4');
  });

  it('should apply fill to the circle', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.fill.set('#ff0000');
    fixture.detectChanges();
    const circle: SVGCircleElement = getCircleEl(fixture);
    expect(circle.getAttribute('fill')).toBe('#ff0000');
  });

  it('should apply animationDuration to the SVG element', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.animationDuration.set('1s');
    fixture.detectChanges();
    const svg: SVGElement = getSvgEl(fixture);
    expect((svg as unknown as HTMLElement).style.animationDuration).toBe('1s');
  });

  it('should apply animationDuration to the circle element', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.animationDuration.set('750ms');
    fixture.detectChanges();
    const circle: SVGCircleElement = getCircleEl(fixture);
    expect((circle as unknown as HTMLElement).style.animationDuration).toBe('750ms');
  });

  it('should have the correct viewBox on SVG', (): void => {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const svg: SVGElement = getSvgEl(fixture);
    expect(svg.getAttribute('viewBox')).toBe('25 25 50 50');
  });
});
