import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { Grid } from './grid';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid [columns]="4" [gap]="3">
      <div>Cell A</div>
      <div>Cell B</div>
      <div>Cell C</div>
    </ui-lib-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GridA11yHostComponent {}

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid columns="2fr minmax(200px, 1fr)" spacing="md" rowGap="sm" columnGap="lg">
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    </ui-lib-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GridCustomVarsHostComponent {}

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid [columns]="3" minColumnWidth="320px">
      <div>Reading 1</div>
      <div>Reading 2</div>
      <div>Reading 3</div>
    </ui-lib-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GridResponsiveHostComponent {}

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid [columns]="2" spacing="md">
      <div>Item A</div>
      <div>Item B</div>
      <div>Item C</div>
      <div>Item D</div>
    </ui-lib-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GridTwoColumnHostComponent {}

describe('Grid (a11y)', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        GridA11yHostComponent,
        GridCustomVarsHostComponent,
        GridResponsiveHostComponent,
        GridTwoColumnHostComponent,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
  });

  function createFixture<T>(componentType: new () => T): ComponentFixture<T> {
    const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    return fixture;
  }

  function getGridElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-grid') as HTMLElement;
  }

  function getGridDebugElement(fixture: ComponentFixture<unknown>): DebugElement {
    return fixture.debugElement.query(By.directive(Grid));
  }

  it('passes axe in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('renders as ui-lib-grid with no landmark role', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.tagName.toLowerCase()).toBe('ui-lib-grid');
    expect(gridElement.getAttribute('role')).toBeNull();
  });

  it('does not create spurious landmark elements', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const landmarks: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('main, nav, aside, header, footer');
    expect(landmarks.length).toBe(0);
  });

  it('applies columns through CSS custom property', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.getPropertyValue('--uilib-grid-columns')).toBe('repeat(4, 1fr)');
  });

  it('applies gap through CSS custom property', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.getPropertyValue('--uilib-grid-gap')).toContain('0.75rem');
  });

  it('applies row/column gap fallback CSS variables when no overrides are set', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.getPropertyValue('--uilib-grid-row-gap')).toContain('0.75rem');
    expect(gridElement.style.getPropertyValue('--uilib-grid-column-gap')).toContain('0.75rem');
  });

  it('applies explicit row/column gap overrides when provided', (): void => {
    const fixture: ComponentFixture<GridCustomVarsHostComponent> = createFixture(
      GridCustomVarsHostComponent
    );
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.getPropertyValue('--uilib-grid-row-gap')).toContain(
      'var(--uilib-stack-sm'
    );
    expect(gridElement.style.getPropertyValue('--uilib-grid-column-gap')).toContain(
      'var(--uilib-stack-lg'
    );
  });

  it('uses CSS custom properties as host style sources', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.gridTemplateColumns).toBe('var(--uilib-grid-columns)');
    expect(gridElement.style.gap).toBe('var(--uilib-grid-gap)');
    expect(gridElement.style.rowGap).toBe('var(--uilib-grid-row-gap)');
    expect(gridElement.style.columnGap).toBe('var(--uilib-grid-column-gap)');
  });

  it('supports responsive auto-fit columns while keeping DOM order', (): void => {
    const fixture: ComponentFixture<GridResponsiveHostComponent> = createFixture(
      GridResponsiveHostComponent
    );
    const gridElement: HTMLElement = getGridElement(fixture);
    const contentOrder: string[] = Array.from(
      gridElement.querySelectorAll<HTMLDivElement>('div')
    ).map((element: HTMLDivElement): string => {
      return element.textContent.trim();
    });
    expect(gridElement.style.getPropertyValue('--uilib-grid-columns')).toBe(
      'repeat(auto-fit, minmax(320px, 1fr))'
    );
    expect(contentOrder).toEqual(['Reading 1', 'Reading 2', 'Reading 3']);
  });

  it('supports custom grid template string input', (): void => {
    const fixture: ComponentFixture<GridCustomVarsHostComponent> = createFixture(
      GridCustomVarsHostComponent
    );
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.getPropertyValue('--uilib-grid-columns')).toBe(
      '2fr minmax(200px, 1fr)'
    );
  });

  it('does not expose an order input on the Grid API', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridDebugElement: DebugElement = getGridDebugElement(fixture);
    const componentInstance: Record<string, unknown> = gridDebugElement.componentInstance as Record<
      string,
      unknown
    >;
    expect(componentInstance['order']).toBeUndefined();
  });

  it('has display:grid applied to host', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(getComputedStyle(gridElement).display).toBe('grid');
  });

  it('does not apply overflow:hidden or overflow:clip to grid host', (): void => {
    const fixture: ComponentFixture<GridA11yHostComponent> = createFixture(GridA11yHostComponent);
    const gridElement: HTMLElement = getGridElement(fixture);
    const computed: CSSStyleDeclaration = getComputedStyle(gridElement);
    expect(computed.overflow).not.toBe('hidden');
    expect(computed.overflow).not.toBe('clip');
    expect(computed.overflowX).not.toBe('hidden');
    expect(computed.overflowX).not.toBe('clip');
    expect(computed.overflowY).not.toBe('hidden');
    expect(computed.overflowY).not.toBe('clip');
  });

  it('spacing input produces a stack token CSS var for grid gap', (): void => {
    const fixture: ComponentFixture<GridCustomVarsHostComponent> = createFixture(
      GridCustomVarsHostComponent
    );
    const gridElement: HTMLElement = getGridElement(fixture);
    expect(gridElement.style.getPropertyValue('--uilib-grid-gap')).toContain(
      'var(--uilib-stack-md'
    );
  });

  it('passes axe with 2-column layout', async (): Promise<void> => {
    const fixture: ComponentFixture<GridTwoColumnHostComponent> = createFixture(
      GridTwoColumnHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with responsive auto-fit layout', async (): Promise<void> => {
    const fixture: ComponentFixture<GridResponsiveHostComponent> = createFixture(
      GridResponsiveHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
