import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Grid } from './grid';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Grid],
  template: `
    <uilib-grid [columns]="columns" [gap]="gap" [minColumnWidth]="minColumnWidth">
      <div>Cell 1</div>
      <div>Cell 2</div>
      <div>Cell 3</div>
    </uilib-grid>
  `,
})
class TestHostComponent {
  columns: any = 12;
  gap: any = 4;
  minColumnWidth: string | undefined = undefined;
}

describe('Grid', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>) {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const gridElement: HTMLElement = fixture.nativeElement.querySelector('uilib-grid');
    return { fixture, component, gridElement };
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
    expect(gridElement.style.gap).toBe('1rem'); // gap 4 = 1rem
  });

  it('should project content', () => {
    const { gridElement } = bootstrap();
    const items = gridElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Cell 1');
  });
});
