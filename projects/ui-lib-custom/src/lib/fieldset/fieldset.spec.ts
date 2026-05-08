import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Fieldset } from './fieldset';
import type { FieldsetVariant } from './fieldset.types';

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset
      [legend]="legend()"
      [toggleable]="toggleableState()"
      [(collapsed)]="collapsedState"
      [variant]="variant()"
      [styleClass]="styleClass()"
      (toggled)="lastToggleEvent = $event"
    >
      <p class="test-body">Body content</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly legend: WritableSignal<string> = signal<string>('Test Legend');
  public readonly toggleableState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly collapsedState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<FieldsetVariant | null> = signal<FieldsetVariant | null>(
    null
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public lastToggleEvent: { collapsed: boolean } | null = null;
}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset [toggleable]="true">
      <span fieldsetLegend class="custom-legend">Custom <strong>Legend</strong></span>
      <p class="test-body">Body content</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProjectionHostComponent {}

describe('Fieldset', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getFieldset(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-fieldset') as HTMLElement;
  }

  function getLegend(): HTMLElement {
    return getFieldset().querySelector('.ui-lib-fieldset__legend') as HTMLElement;
  }

  function getContentWrapper(): HTMLElement {
    return getFieldset().querySelector('.ui-lib-fieldset__content-wrapper') as HTMLElement;
  }

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (): void => {
    expect(getFieldset()).toBeTruthy();
  });

  it('should apply the base ui-lib-fieldset class', (): void => {
    expect(getFieldset().classList).toContain('ui-lib-fieldset');
  });

  it('should have role="group" on the host', (): void => {
    expect(getFieldset().getAttribute('role')).toBe('group');
  });

  it('should have aria-labelledby pointing to the legend element', (): void => {
    const labelledBy: string | null = getFieldset().getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(getLegend().getAttribute('id')).toBe(labelledBy);
  });

  it('should render the legend text from the legend input', (): void => {
    const legendText: Element | null = getLegend().querySelector('.ui-lib-fieldset__legend-text');
    expect(legendText?.textContent!.trim()).toBe('Test Legend');
  });

  it('should not render legend-text span when legend is empty', (): void => {
    host.legend.set('');
    fixture.detectChanges();
    const legendText: Element | null = getLegend().querySelector('.ui-lib-fieldset__legend-text');
    expect(legendText).toBeNull();
  });

  it('should render content inside the content-inner element', (): void => {
    const inner: Element | null = getFieldset().querySelector('.ui-lib-fieldset__content-inner');
    expect(inner?.querySelector('.test-body')).toBeTruthy();
  });

  it('should not have toggleable class by default', (): void => {
    expect(getFieldset().classList).not.toContain('ui-lib-fieldset--toggleable');
  });

  it('should add toggleable class when toggleable is true', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    expect(getFieldset().classList).toContain('ui-lib-fieldset--toggleable');
  });

  it('should not have role="button" on legend when not toggleable', (): void => {
    expect(getLegend().getAttribute('role')).toBeNull();
  });

  it('should set role="button" on legend when toggleable', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    expect(getLegend().getAttribute('role')).toBe('button');
  });

  it('should set tabindex="0" on legend when toggleable', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    expect(getLegend().getAttribute('tabindex')).toBe('0');
  });

  it('should set aria-expanded="true" when toggleable and not collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(false);
    fixture.detectChanges();
    expect(getLegend().getAttribute('aria-expanded')).toBe('true');
  });

  it('should set aria-expanded="false" when toggleable and collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getLegend().getAttribute('aria-expanded')).toBe('false');
  });

  it('should show toggle icon when toggleable', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    const icon: Element | null = getLegend().querySelector('.ui-lib-fieldset__toggle-icon');
    expect(icon).toBeTruthy();
  });

  it('should not show toggle icon when not toggleable', (): void => {
    const icon: Element | null = getLegend().querySelector('.ui-lib-fieldset__toggle-icon');
    expect(icon).toBeNull();
  });

  it('should add collapsed modifier class to toggle icon when collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    const icon: Element | null = getLegend().querySelector('.ui-lib-fieldset__toggle-icon');
    expect(icon?.classList).toContain('ui-lib-fieldset__toggle-icon--collapsed');
  });

  it('should collapse content wrapper when collapsed and toggleable', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getContentWrapper().classList).toContain('ui-lib-fieldset__content-wrapper--collapsed');
  });

  it('should not collapse content wrapper when not toggleable even if collapsed is true', (): void => {
    host.toggleableState.set(false);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getContentWrapper().classList).not.toContain(
      'ui-lib-fieldset__content-wrapper--collapsed'
    );
  });

  it('should set aria-hidden on content wrapper when collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getContentWrapper().getAttribute('aria-hidden')).toBe('true');
  });

  it('should not set aria-hidden when not collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(false);
    fixture.detectChanges();
    expect(getContentWrapper().getAttribute('aria-hidden')).toBeNull();
  });

  it('should toggle collapsed state on legend click when toggleable', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(false);
    fixture.detectChanges();

    getLegend().click();
    fixture.detectChanges();

    expect(host.collapsedState()).toBe(true);
  });

  it('should not toggle on click when not toggleable', (): void => {
    host.collapsedState.set(false);
    fixture.detectChanges();

    getLegend().click();
    fixture.detectChanges();

    expect(host.collapsedState()).toBe(false);
  });

  it('should emit toggled event on click when toggleable', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(false);
    fixture.detectChanges();

    getLegend().click();
    fixture.detectChanges();

    expect(host.lastToggleEvent).toEqual({ collapsed: true });
  });

  it('should add ui-lib-fieldset--collapsed class when collapsed and toggleable', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getFieldset().classList).toContain('ui-lib-fieldset--collapsed');
  });

  it('should apply variant class when provided', (): void => {
    const variants: FieldsetVariant[] = ['material', 'bootstrap', 'minimal'];
    for (const variant of variants) {
      host.variant.set(variant);
      fixture.detectChanges();
      expect(getFieldset().classList).toContain(`ui-lib-fieldset--variant-${variant}`);
    }
  });

  it('should apply extra styleClass when provided', (): void => {
    host.styleClass.set('my-custom-fieldset');
    fixture.detectChanges();
    expect(getFieldset().classList).toContain('my-custom-fieldset');
  });

  it('should connect legend aria-controls to content wrapper id', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    const controls: string | null = getLegend().getAttribute('aria-controls');
    const contentId: string | null = getContentWrapper().getAttribute('id');
    expect(controls).toBe(contentId);
  });
});

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="A"></ui-lib-fieldset>
    <ui-lib-fieldset legend="B"></ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoFieldsetsHost {}

describe('Fieldset — unique IDs', (): void => {
  let twoFixture: ComponentFixture<TwoFieldsetsHost>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TwoFieldsetsHost],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    twoFixture = TestBed.createComponent(TwoFieldsetsHost);
    twoFixture.detectChanges();
  });

  it('should give different legend IDs to separate fieldset instances', (): void => {
    const legends: NodeListOf<HTMLElement> = (
      twoFixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.ui-lib-fieldset__legend');

    expect(legends[0]?.getAttribute('id')).not.toBe(legends[1]?.getAttribute('id'));
  });
});

describe('Fieldset — content projection', (): void => {
  it('should project custom legend via [fieldsetLegend] attribute', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ProjectionHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const projFixture: ComponentFixture<ProjectionHostComponent> =
      TestBed.createComponent(ProjectionHostComponent);
    projFixture.detectChanges();

    const legend: Element | null = (projFixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-fieldset__legend'
    );
    expect(legend?.querySelector('.custom-legend')).toBeTruthy();
  });
});
