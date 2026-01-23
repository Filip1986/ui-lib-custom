import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Inline } from './inline';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline [gap]="gap" [align]="align" [justify]="justify">
      <span>Tag 1</span>
      <span>Tag 2</span>
      <span>Tag 3</span>
    </ui-lib-inline>
  `,
})
class TestHostComponent {
  gap: any = 2;
  align: any = 'center';
  justify: any = 'start';
}

describe('Inline', () => {
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
    const inlineElement: HTMLElement = fixture.nativeElement.querySelector('ui-lib-inline');
    return { fixture, component, inlineElement };
  }

  it('should create', () => {
    const { inlineElement } = bootstrap();
    expect(inlineElement).toBeTruthy();
  });

  it('should render as horizontal flex container with wrap', () => {
    const { inlineElement } = bootstrap();
    expect(inlineElement.style.flexDirection).toBe('row');
    expect(inlineElement.style.flexWrap).toBe('wrap');
  });

  it('should apply gap from design tokens', () => {
    const { inlineElement } = bootstrap();
    expect(inlineElement.style.gap).toContain('0.5rem'); // gap 2 = 0.5rem fallback
  });

  it('should apply align-items', () => {
    const { inlineElement } = bootstrap();
    expect(inlineElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', () => {
    const { inlineElement } = bootstrap({ justify: 'space-between' });
    expect(inlineElement.style.justifyContent).toBe('space-between');
  });

  it('should project content', () => {
    const { inlineElement } = bootstrap();
    const items = inlineElement.querySelectorAll('span');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Tag 1');
  });
});
