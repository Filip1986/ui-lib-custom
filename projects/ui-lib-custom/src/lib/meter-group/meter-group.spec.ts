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
import { MeterGroup } from './meter-group';
import type {
  MeterGroupLabelPosition,
  MeterGroupOrientation,
  MeterGroupSize,
  MeterGroupVariant,
  MeterItem,
} from './meter-group.types';

// ---- Helpers ---------------------------------------------------------

function queryAll<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return fixture.debugElement
    .queryAll(By.css(selector))
    .map((de: DebugElement): T => de.nativeElement as T);
}

function query<T extends HTMLElement>(fixture: ComponentFixture<unknown>, selector: string): T {
  return fixture.debugElement.query(By.css(selector)).nativeElement as T;
}

// ---- Test host -------------------------------------------------------

@Component({
  standalone: true,
  imports: [MeterGroup],
  template: `
    <ui-lib-meter-group
      [values]="values()"
      [min]="min()"
      [max]="max()"
      [orientation]="orientation()"
      [showLabels]="showLabels()"
      [labelPosition]="labelPosition()"
      [size]="size()"
      [variant]="variant()"
      [styleClass]="styleClass()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly values: WritableSignal<MeterItem[]> = signal<MeterItem[]>([
    { label: 'Apps', value: 20, color: '#34d399' },
    { label: 'Media', value: 30, color: '#818cf8' },
  ]);
  public readonly min: WritableSignal<number> = signal<number>(0);
  public readonly max: WritableSignal<number> = signal<number>(100);
  public readonly orientation: WritableSignal<MeterGroupOrientation> =
    signal<MeterGroupOrientation>('horizontal');
  public readonly showLabels: WritableSignal<boolean> = signal<boolean>(true);
  public readonly labelPosition: WritableSignal<MeterGroupLabelPosition> =
    signal<MeterGroupLabelPosition>('end');
  public readonly size: WritableSignal<MeterGroupSize> = signal<MeterGroupSize>('md');
  public readonly variant: WritableSignal<MeterGroupVariant | null> =
    signal<MeterGroupVariant | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
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

describe('MeterGroup', (): void => {
  it('should create', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el).toBeTruthy();
  });

  it('should apply base class on host', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group');
  });

  it('should apply default orientation class', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--orientation-horizontal');
  });

  it('should apply default size class', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--size-md');
  });

  it('should render one segment per value', (): void => {
    const { fixture } = setup();
    const segments: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(segments.length).toBe(2);
  });

  it('should set background-color on each segment', (): void => {
    const { fixture } = setup();
    const [first, second]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.style.backgroundColor).toBeTruthy();
    expect(second!.style.backgroundColor).toBeTruthy();
  });

  it('should set correct width as percentage for horizontal segments', (): void => {
    const { fixture } = setup();
    const [first, second]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.style.width).toBe('20%');
    expect(second!.style.width).toBe('30%');
  });

  it('should set role="meter" on each segment', (): void => {
    const { fixture } = setup();
    const segments: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    segments.forEach((segment: HTMLElement): void => {
      expect(segment.getAttribute('role')).toBe('meter');
    });
  });

  it('should set aria-valuenow/min/max on each segment', (): void => {
    const { fixture } = setup();
    const [first]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.getAttribute('aria-valuenow')).toBe('20');
    expect(first!.getAttribute('aria-valuemin')).toBe('0');
    expect(first!.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should set aria-label on each segment', (): void => {
    const { fixture } = setup();
    const [first]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.getAttribute('aria-label')).toContain('Apps');
  });

  it('should render legend labels when showLabels is true', (): void => {
    const { fixture } = setup();
    const labelItems: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__label-item');
    expect(labelItems.length).toBe(2);
  });

  it('should hide legend when showLabels is false', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.showLabels.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const labelItems: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__label-item');
    expect(labelItems.length).toBe(0);
  });

  it('should show label text and value in legend', (): void => {
    const { fixture } = setup();
    const [firstLabel, secondLabel]: HTMLElement[] = queryAll(
      fixture,
      '.ui-lib-meter-group__label-text'
    );
    expect(firstLabel!.textContent!.trim()).toBe('Apps');
    expect(secondLabel!.textContent!.trim()).toBe('Media');
  });

  it('should apply variant class when variant is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--variant-bootstrap');
  });

  it('should apply size class when size is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--size-lg');
  });

  it('should apply orientation class when changed to vertical', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.orientation.set('vertical');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--orientation-vertical');
  });

  it('should set height as percentage for vertical segments', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.orientation.set('vertical');
    fixture.detectChanges();
    await fixture.whenStable();
    const [first]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.style.height).toBe('20%');
  });

  it('should apply label-position class', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--label-end');
  });

  it('should apply label-start class when labelPosition is start', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.labelPosition.set('start');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('ui-lib-meter-group--label-start');
  });

  it('should apply extra styleClass to host', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.styleClass.set('custom-class');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = query(fixture, 'ui-lib-meter-group');
    expect(el.className).toContain('custom-class');
  });

  it('should recalculate percentages when max changes', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.max.set(200);
    fixture.detectChanges();
    await fixture.whenStable();
    const [first]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.style.width).toBe('10%');
  });

  it('should render no segments when values is empty', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.values.set([]);
    fixture.detectChanges();
    await fixture.whenStable();
    const segments: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(segments.length).toBe(0);
  });

  it('should clamp segment value to max', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.values.set([{ label: 'Over', value: 150, color: '#f00' }]);
    fixture.detectChanges();
    await fixture.whenStable();
    const [first]: HTMLElement[] = queryAll(fixture, '.ui-lib-meter-group__meter');
    expect(first!.style.width).toBe('100%');
  });

  it('should show segment icon in legend when icon is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.values.set([{ label: 'Apps', value: 20, color: '#34d399', icon: 'pi pi-star' }]);
    fixture.detectChanges();
    await fixture.whenStable();
    const iconDebug: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-meter-group__label-swatch .pi-star')
    );
    expect(iconDebug).toBeTruthy();
  });
});
