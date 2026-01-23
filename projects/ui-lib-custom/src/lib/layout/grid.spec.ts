import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let gridElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    gridElement = fixture.nativeElement.querySelector('uilib-grid');
  });

  it('should create', () => {
    expect(gridElement).toBeTruthy();
  });

  it('should render as grid container', () => {
    expect(gridElement.style.display).toBe('grid');
  });

  it('should apply fixed column count by default', () => {
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(12, 1fr)');
  });

  it('should apply different column counts', () => {
    component.columns = 4;
    fixture.detectChanges();
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('should apply responsive grid with minColumnWidth', () => {
    component.minColumnWidth = '200px';
    fixture.detectChanges();
    expect(gridElement.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
  });

  it('should apply gap from design tokens', () => {
    expect(gridElement.style.gap).toBe('1rem'); // gap 4 = 1rem
  });

  it('should project content', () => {
    const items = gridElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Cell 1');
  });
});
