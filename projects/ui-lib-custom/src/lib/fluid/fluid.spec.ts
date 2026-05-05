import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Fluid, FluidDirective } from './fluid';

// ── Component test host ───────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Fluid],
  template: `<ui-lib-fluid [styleClass]="extraClass()">Projected</ui-lib-fluid>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidHostComponent {
  public readonly extraClass: WritableSignal<string | null> = signal<string | null>(null);
}

// ── Directive test host ───────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [FluidDirective],
  template: `<div class="target" [uiLibFluid]="isFluid()">Content</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidDirectiveHostComponent {
  public readonly isFluid: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  standalone: true,
  imports: [FluidDirective],
  template: `<div class="attr-target" uiLibFluid>Attr</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidDirectiveAttrHostComponent {}

// ── Setup helpers ─────────────────────────────────────────────────────────────

function setupFluid(): {
  fixture: ComponentFixture<FluidHostComponent>;
  host: FluidHostComponent;
} {
  TestBed.configureTestingModule({
    imports: [FluidHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<FluidHostComponent> = TestBed.createComponent(FluidHostComponent);
  fixture.detectChanges();
  return { fixture, host: fixture.componentInstance };
}

function setupDirective(): {
  fixture: ComponentFixture<FluidDirectiveHostComponent>;
  host: FluidDirectiveHostComponent;
} {
  TestBed.configureTestingModule({
    imports: [FluidDirectiveHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<FluidDirectiveHostComponent> = TestBed.createComponent(
    FluidDirectiveHostComponent
  );
  fixture.detectChanges();
  return { fixture, host: fixture.componentInstance };
}

function setupDirectiveAttr(): ComponentFixture<FluidDirectiveAttrHostComponent> {
  TestBed.configureTestingModule({
    imports: [FluidDirectiveAttrHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<FluidDirectiveAttrHostComponent> = TestBed.createComponent(
    FluidDirectiveAttrHostComponent
  );
  fixture.detectChanges();
  return fixture;
}

// ── Fluid component tests ─────────────────────────────────────────────────────

describe('Fluid component', (): void => {
  it('should render the host element with the ui-lib-fluid class', (): void => {
    const { fixture } = setupFluid();
    const host: HTMLElement = fixture.debugElement.query(By.css('ui-lib-fluid'))
      .nativeElement as HTMLElement;
    expect(host.classList.contains('ui-lib-fluid')).toBe(true);
  });

  it('should project content inside the host', (): void => {
    const { fixture } = setupFluid();
    const host: HTMLElement = fixture.debugElement.query(By.css('ui-lib-fluid'))
      .nativeElement as HTMLElement;
    expect(host.textContent!.trim()).toBe('Projected');
  });

  it('should add extra classes from the styleClass input', async (): Promise<void> => {
    const { fixture, host } = setupFluid();
    host.extraClass.set('my-custom-fluid');
    fixture.detectChanges();
    await fixture.whenStable();

    const element: HTMLElement = fixture.debugElement.query(By.css('ui-lib-fluid'))
      .nativeElement as HTMLElement;
    expect(element.classList.contains('ui-lib-fluid')).toBe(true);
    expect(element.classList.contains('my-custom-fluid')).toBe(true);
  });

  it('should include only ui-lib-fluid class when styleClass is null', (): void => {
    const { fixture } = setupFluid();
    const element: HTMLElement = fixture.debugElement.query(By.css('ui-lib-fluid'))
      .nativeElement as HTMLElement;
    expect(element.getAttribute('class')).toBe('ui-lib-fluid');
  });
});

// ── FluidDirective tests ──────────────────────────────────────────────────────

describe('FluidDirective', (): void => {
  it('should add ui-lib-fluid class when attribute is present (attribute-only)', (): void => {
    const fixture: ComponentFixture<FluidDirectiveAttrHostComponent> = setupDirectiveAttr();
    const div: HTMLElement = fixture.debugElement.query(By.css('.attr-target'))
      .nativeElement as HTMLElement;
    expect(div.classList.contains('ui-lib-fluid')).toBe(true);
  });

  it('should add ui-lib-fluid class when [uiLibFluid]="true"', (): void => {
    const { fixture, host } = setupDirective();
    host.isFluid.set(true);
    fixture.detectChanges();

    const div: HTMLElement = fixture.debugElement.query(By.css('.target'))
      .nativeElement as HTMLElement;
    expect(div.classList.contains('ui-lib-fluid')).toBe(true);
  });

  it('should remove ui-lib-fluid class when [uiLibFluid]="false"', (): void => {
    const { fixture, host } = setupDirective();
    host.isFluid.set(false);
    fixture.detectChanges();

    const div: HTMLElement = fixture.debugElement.query(By.css('.target'))
      .nativeElement as HTMLElement;
    expect(div.classList.contains('ui-lib-fluid')).toBe(false);
  });

  it('should toggle ui-lib-fluid class reactively', async (): Promise<void> => {
    const { fixture, host } = setupDirective();
    const div: HTMLElement = fixture.debugElement.query(By.css('.target'))
      .nativeElement as HTMLElement;

    host.isFluid.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(div.classList.contains('ui-lib-fluid')).toBe(true);

    host.isFluid.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(div.classList.contains('ui-lib-fluid')).toBe(false);

    host.isFluid.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(div.classList.contains('ui-lib-fluid')).toBe(true);
  });
});
