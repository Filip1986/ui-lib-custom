import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Grid } from './grid';
import type { GridAlign, GridJustify } from './grid';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { GridColumns, SpacingToken, StackToken } from 'ui-lib-custom/tokens';

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid
      [columns]="columns"
      [gap]="gap"
      [spacing]="spacing"
      [align]="align"
      [justify]="justify"
      [minColumnWidth]="minColumnWidth"
    >
      <div>Cell 1</div>
      <div>Cell 2</div>
      <div>Cell 3</div>
    </ui-lib-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public columns: GridColumns = 12;
  public gap: SpacingToken = 4;
  public spacing: StackToken | SpacingToken | number | null = null;
  public align: GridAlign = 'stretch';
  public justify: GridJustify = 'stretch';
  public minColumnWidth: string | undefined = undefined;
}

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid>
      <div>Cell A</div>
    </ui-lib-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

describe('Grid', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    component: TestHostComponent;
    gridElement: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component: TestHostComponent = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const gridElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-grid'
    ) as HTMLElement;
    return { fixture, component, gridElement };
  }

  function bootstrapDefault(): ComponentFixture<DefaultHostComponent> {
    const fixture: ComponentFixture<DefaultHostComponent> =
      TestBed.createComponent(DefaultHostComponent);
    fixture.detectChanges();
    return fixture;
  }

  function getRequiredItem(elements: NodeListOf<Element>, index: number): Element {
    const element = elements[index];
    if (!element) {
      throw new Error(`Expected grid item at index ${index}.`);
    }
    return element;
  }

  it('should create', (): void => {
    const { gridElement } = bootstrap();
    expect(gridElement).toBeTruthy();
  });

  it('should render as grid container', (): void => {
    const { gridElement } = bootstrap();
    expect(gridElement.style.display).toBe('grid');
  });

  it('should apply fixed column count by default', (): void => {
    const { gridElement } = bootstrap();
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(12, 1fr)');
  });

  it('should apply different column counts', (): void => {
    const { gridElement } = bootstrap({ columns: 4 });
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('should apply responsive grid with minColumnWidth', (): void => {
    const { gridElement } = bootstrap({ minColumnWidth: '200px' });
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
  });

  it('should apply gap from design tokens', (): void => {
    const { gridElement } = bootstrap();
    expect(gridElement.style.gap).toContain('1rem'); // gap 4 = 1rem fallback
  });

  it('should project content', (): void => {
    const { gridElement } = bootstrap();
    const items = gridElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(getRequiredItem(items, 0).textContent).toBe('Cell 1');
  });

  it('creates with no inputs', (): void => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const gridElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-grid'
    ) as HTMLElement;
    expect(gridElement).toBeTruthy();
  });

  it('should apply align-items', (): void => {
    const { gridElement } = bootstrap({ align: 'center' });
    expect(gridElement.style.alignItems).toBe('center');
  });

  it('should apply justify-items', (): void => {
    const { gridElement } = bootstrap({ justify: 'end' });
    expect(gridElement.style.justifyItems).toBe('end');
  });

  it('uses semantic spacing tokens when spacing is set', (): void => {
    const { gridElement } = bootstrap({ spacing: 'md' });
    expect(gridElement.style.gap).toContain('1rem');
  });

  it('accepts numeric spacing when spacing is a number', (): void => {
    const { gridElement } = bootstrap({ spacing: 2 });
    expect(gridElement.style.gap).toContain('0.5rem');
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-grid-fg').trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-grid-fg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
