import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
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
    const stackElement: HTMLElement = fixture.nativeElement.querySelector('uilib-stack');
    return { fixture, component, stackElement };
  }

  it('should create', () => {
    const { stackElement } = bootstrap();
    expect(stackElement).toBeTruthy();
  });

  it('should render vertical stack by default', () => {
    const { stackElement } = bootstrap();
    expect(stackElement.style.flexDirection).toBe('column');
  });

  it('should render horizontal stack when direction is horizontal', () => {
    const { stackElement } = bootstrap({ direction: 'horizontal' });
    expect(stackElement.style.flexDirection).toBe('row');
  });

  it('should apply gap from design tokens', () => {
    const { stackElement } = bootstrap();
    expect(stackElement.style.gap).toContain('1rem'); // gap 4 = 1rem fallback
  });

  it('should apply different gap tokens', () => {
    const { stackElement } = bootstrap({ gap: 2 });
    expect(stackElement.style.gap).toContain('0.5rem'); // gap 2 = 0.5rem fallback
  });

  it('should apply align-items', () => {
    const { stackElement } = bootstrap({ align: 'center' });
    expect(stackElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', () => {
    const { stackElement } = bootstrap({ justify: 'center' });
    expect(stackElement.style.justifyContent).toBe('center');
  });

  it('should project content', () => {
    const { stackElement } = bootstrap();
    const items = stackElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Item 1');
  });
});
