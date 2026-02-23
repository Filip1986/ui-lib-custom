import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Grid } from './grid';
import { Component } from '@angular/core';

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
})
class TestHostComponent {
  columns: any = 12;
  gap: any = 4;
  spacing: any = null;
  align: any = 'stretch';
  justify: any = 'stretch';
  minColumnWidth: string | undefined = undefined;
}

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <ui-lib-grid>
      <div>Cell A</div>
    </ui-lib-grid>
  `,
})
class DefaultHostComponent {}

describe('Grid', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>) {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const gridElement: HTMLElement = fixture.nativeElement.querySelector('ui-lib-grid');
    return { fixture, component, gridElement };
  }

  function bootstrapDefault(): ComponentFixture<DefaultHostComponent> {
    const fixture: ComponentFixture<DefaultHostComponent> =
      TestBed.createComponent(DefaultHostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const { gridElement } = bootstrap();
    expect(gridElement).toBeTruthy();
  });

  it('should render as grid container', () => {
    const { gridElement } = bootstrap();
    expect(gridElement.style.display).toBe('grid');
  });

  it('should apply fixed column count by default', () => {
    const { gridElement } = bootstrap();
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(12, 1fr)');
  });

  it('should apply different column counts', () => {
    const { gridElement } = bootstrap({ columns: 4 });
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('should apply responsive grid with minColumnWidth', () => {
    const { gridElement } = bootstrap({ minColumnWidth: '200px' });
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
  });

  it('should apply gap from design tokens', () => {
    const { gridElement } = bootstrap();
    expect(gridElement.style.gap).toContain('1rem'); // gap 4 = 1rem fallback
  });

  it('should project content', () => {
    const { gridElement } = bootstrap();
    const items = gridElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Cell 1');
  });

  it('creates with no inputs', () => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const gridElement: HTMLElement = fixture.nativeElement.querySelector('ui-lib-grid');
    expect(gridElement).toBeTruthy();
  });

  it('should apply align-items', () => {
    const { gridElement } = bootstrap({ align: 'center' });
    expect(gridElement.style.alignItems).toBe('center');
  });

  it('should apply justify-items', () => {
    const { gridElement } = bootstrap({ justify: 'end' });
    expect(gridElement.style.justifyItems).toBe('end');
  });

  it('uses semantic spacing tokens when spacing is set', () => {
    const { gridElement } = bootstrap({ spacing: 'md' });
    expect(gridElement.style.gap).toContain('1rem');
  });

  it('accepts numeric spacing when spacing is a number', () => {
    const { gridElement } = bootstrap({ spacing: 2 });
    expect(gridElement.style.gap).toContain('0.5rem');
  });

  it('applies dark theme variables', () => {
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
