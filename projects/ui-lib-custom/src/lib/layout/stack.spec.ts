import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Stack } from './stack';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <uilib-stack [direction]="direction" [gap]="gap" [align]="align" [justify]="justify">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </uilib-stack>
  `,
})
class TestHostComponent {
  direction: 'vertical' | 'horizontal' = 'vertical';
  gap: any = 4;
  align: any = 'stretch';
  justify: any = 'start';
}

describe('Stack', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let stackElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stackElement = fixture.nativeElement.querySelector('uilib-stack');
  });

  it('should create', () => {
    expect(stackElement).toBeTruthy();
  });

  it('should render vertical stack by default', () => {
    expect(stackElement.style.flexDirection).toBe('column');
  });

  it('should render horizontal stack when direction is horizontal', () => {
    component.direction = 'horizontal';
    fixture.detectChanges();
    expect(stackElement.style.flexDirection).toBe('row');
  });

  it('should apply gap from design tokens', () => {
    expect(stackElement.style.gap).toBe('1rem'); // gap 4 = 1rem
  });

  it('should apply different gap tokens', () => {
    component.gap = 2;
    fixture.detectChanges();
    expect(stackElement.style.gap).toBe('0.5rem'); // gap 2 = 0.5rem
  });

  it('should apply align-items', () => {
    component.align = 'center';
    fixture.detectChanges();
    expect(stackElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', () => {
    component.justify = 'center';
    fixture.detectChanges();
    expect(stackElement.style.justifyContent).toBe('center');
  });

  it('should project content', () => {
    const items = stackElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Item 1');
  });
});
