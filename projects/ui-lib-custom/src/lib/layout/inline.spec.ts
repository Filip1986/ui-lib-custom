import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inline } from './inline';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <uilib-inline [gap]="gap" [align]="align" [justify]="justify">
      <span>Tag 1</span>
      <span>Tag 2</span>
      <span>Tag 3</span>
    </uilib-inline>
  `,
})
class TestHostComponent {
  gap: any = 2;
  align: any = 'center';
  justify: any = 'start';
}

describe('Inline', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inlineElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inlineElement = fixture.nativeElement.querySelector('uilib-inline');
  });

  it('should create', () => {
    expect(inlineElement).toBeTruthy();
  });

  it('should render as horizontal flex container with wrap', () => {
    expect(inlineElement.style.flexDirection).toBe('row');
    expect(inlineElement.style.flexWrap).toBe('wrap');
  });

  it('should apply gap from design tokens', () => {
    expect(inlineElement.style.gap).toBe('0.5rem'); // gap 2 = 0.5rem
  });

  it('should apply align-items', () => {
    expect(inlineElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', () => {
    component.justify = 'space-between';
    fixture.detectChanges();
    expect(inlineElement.style.justifyContent).toBe('space-between');
  });

  it('should project content', () => {
    const items = inlineElement.querySelectorAll('span');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Tag 1');
  });
});
