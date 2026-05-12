import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { MeterGroup } from './meter-group';
import type { MeterGroupOrientation, MeterItem } from './meter-group.types';

@Component({
  standalone: true,
  imports: [MeterGroup],
  template: `
    <ui-lib-meter-group
      [values]="values()"
      [min]="min()"
      [max]="max()"
      [showLabels]="showLabels()"
      [orientation]="orientation()"
      [ariaLabel]="ariaLabel()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MeterGroupA11yHostComponent {
  public readonly values: WritableSignal<MeterItem[]> = signal<MeterItem[]>([
    { label: 'Apps', value: 20, color: '#34d399' },
    { label: 'Media', value: 30, color: '#818cf8', icon: 'pi pi-star' },
  ]);
  public readonly min: WritableSignal<number> = signal<number>(0);
  public readonly max: WritableSignal<number> = signal<number>(100);
  public readonly showLabels: WritableSignal<boolean> = signal<boolean>(true);
  public readonly orientation: WritableSignal<MeterGroupOrientation> =
    signal<MeterGroupOrientation>('horizontal');
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Storage usage');
}

@Component({
  standalone: true,
  imports: [MeterGroup],
  template: `
    <ui-lib-meter-group [values]="values" />
    <ui-lib-meter-group [values]="values" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MeterGroupDualHostComponent {
  public readonly values: MeterItem[] = [{ label: 'Only', value: 10, color: '#34d399' }];
}

async function createFixture(): Promise<ComponentFixture<MeterGroupA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [MeterGroupA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<MeterGroupA11yHostComponent> = TestBed.createComponent(
    MeterGroupA11yHostComponent
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

describe('MeterGroup Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-meter-group').forEach((element: Element): void => {
      element.remove();
    });
  });

  it('should expose role="group" on the meter container', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const container: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__meters'
    );
    expect(container?.getAttribute('role')).toBe('group');
  });

  it('should apply aria-label to the meter container', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const container: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__meters'
    );
    expect(container?.getAttribute('aria-label')).toBe('Storage usage');
  });

  it('should expose role="meter" on each segment', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const segments: NodeListOf<HTMLElement> = getHostElement(fixture).querySelectorAll(
      '.ui-lib-meter-group__meter'
    );
    segments.forEach((segment: HTMLElement): void => {
      expect(segment.getAttribute('role')).toBe('meter');
    });
  });

  it('should expose aria-valuenow/min/max on each segment', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const first: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__meter'
    );
    expect(first?.getAttribute('aria-valuenow')).toBe('20');
    expect(first?.getAttribute('aria-valuemin')).toBe('0');
    expect(first?.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should expose descriptive aria-label text on each segment', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const first: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__meter'
    );
    expect(first?.getAttribute('aria-label')).toBe('Apps: 20 of 100');
  });

  it('should generate fallback segment label when item label is empty', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    fixture.componentInstance.values.set([{ label: '', value: 7, color: '#000' }]);
    fixture.detectChanges();
    await fixture.whenStable();
    const first: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__meter'
    );
    expect(first?.getAttribute('aria-label')).toBe('Segment 1: 7 of 100');
  });

  it('should render the legend with aria-label when labels are visible', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const legend: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__labels'
    );
    expect(legend?.getAttribute('aria-label')).toBe('Legend');
  });

  it('should not render legend markup when labels are hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    fixture.componentInstance.showLabels.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const legend: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__labels'
    );
    expect(legend).toBeNull();
  });

  it('should keep decorative swatch and icon elements hidden from assistive tech', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const swatch: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__label-swatch'
    );
    const icon: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__label-swatch .pi'
    );
    expect(swatch?.getAttribute('aria-hidden')).toBe('true');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render a polite total live region', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const total: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__sr-total'
    );
    expect(total?.getAttribute('aria-live')).toBe('polite');
    expect(total?.getAttribute('aria-atomic')).toBe('true');
  });

  it('should announce the initial total value', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const total: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__sr-total'
    );
    expect((total?.textContent ?? '').trim()).toBe('Total: 50');
  });

  it('should update announced total when values change', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    fixture.componentInstance.values.set([
      { label: 'Apps', value: 25, color: '#34d399' },
      { label: 'Media', value: 35, color: '#818cf8' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const total: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__sr-total'
    );
    expect((total?.textContent ?? '').trim()).toBe('Total: 60');
  });

  it('should announce totals using clamped segment values', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    fixture.componentInstance.values.set([
      { label: 'Apps', value: -5, color: '#34d399' },
      { label: 'Media', value: 120, color: '#818cf8' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const total: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__sr-total'
    );
    expect((total?.textContent ?? '').trim()).toBe('Total: 100');
  });

  it('should render non-focusable segments for keyboard users', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const segments: NodeListOf<HTMLElement> = getHostElement(fixture).querySelectorAll(
      '.ui-lib-meter-group__meter'
    );
    segments.forEach((segment: HTMLElement): void => {
      expect(segment.getAttribute('tabindex')).toBeNull();
    });
  });

  it('should keep the group container non-focusable', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    const container: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-meter-group__meters'
    );
    expect(container?.getAttribute('tabindex')).toBeNull();
  });

  it('should generate unique host ids for multiple component instances', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [MeterGroupDualHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    const fixture: ComponentFixture<MeterGroupDualHostComponent> = TestBed.createComponent(
      MeterGroupDualHostComponent
    );
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();
    const hosts: NodeListOf<HTMLElement> =
      getHostElement(fixture).querySelectorAll('ui-lib-meter-group');
    expect(hosts[0]?.id).toMatch(/^ui-lib-meter-group-\d+$/);
    expect(hosts[1]?.id).toMatch(/^ui-lib-meter-group-\d+$/);
    expect(hosts[0]?.id).not.toBe(hosts[1]?.id);
  });

  it('should pass axe checks in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe checks in vertical state with hidden labels', async (): Promise<void> => {
    const fixture: ComponentFixture<MeterGroupA11yHostComponent> = await createFixture();
    fixture.componentInstance.orientation.set('vertical');
    fixture.componentInstance.showLabels.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
