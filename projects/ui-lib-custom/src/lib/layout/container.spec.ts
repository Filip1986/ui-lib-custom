import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Container } from './container';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <uilib-container [size]="size" [centered]="centered" [padding]="padding">
      <p>Container content</p>
    </uilib-container>
  `,
})
class TestHostComponent {
  size: any = 'lg';
  centered = true;
  padding: any = 4;
}

describe('Container', () => {
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
    const containerElement: HTMLElement = fixture.nativeElement.querySelector('uilib-container');
    return { fixture, component, containerElement };
  }

  it('should create', () => {
    const { containerElement } = bootstrap();
    expect(containerElement).toBeTruthy();
  });

  it('should apply max-width from size token', () => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.maxWidth).toBe('1024px'); // lg = 1024px
  });

  it('should apply different sizes', () => {
    const { containerElement } = bootstrap({ size: 'sm' });
    expect(containerElement.style.maxWidth).toBe('640px');
  });

  it('should center container by default', () => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.marginLeft).toBe('auto');
    expect(containerElement.style.marginRight).toBe('auto');
  });

  it('should not center when centered is false', () => {
    const { containerElement } = bootstrap({ centered: false });
    expect(containerElement.style.marginLeft).toBe('');
    expect(containerElement.style.marginRight).toBe('');
  });

  it('should apply padding from design tokens', () => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.paddingLeft).toBe('1rem'); // padding 4 = 1rem
    expect(containerElement.style.paddingRight).toBe('1rem');
  });

  it('should apply full width', () => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.width).toBe('100%');
  });

  it('should project content', () => {
    const { containerElement } = bootstrap();
    const paragraph = containerElement.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toBe('Container content');
  });
});
