import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let containerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    containerElement = fixture.nativeElement.querySelector('uilib-container');
  });

  it('should create', () => {
    expect(containerElement).toBeTruthy();
  });

  it('should apply max-width from size token', () => {
    expect(containerElement.style.maxWidth).toBe('1024px'); // lg = 1024px
  });

  it('should apply different sizes', () => {
    component.size = 'sm';
    fixture.detectChanges();
    expect(containerElement.style.maxWidth).toBe('640px');
  });

  it('should center container by default', () => {
    expect(containerElement.style.marginLeft).toBe('auto');
    expect(containerElement.style.marginRight).toBe('auto');
  });

  it('should not center when centered is false', () => {
    component.centered = false;
    fixture.detectChanges();
    expect(containerElement.style.marginLeft).toBe('');
    expect(containerElement.style.marginRight).toBe('');
  });

  it('should apply padding from design tokens', () => {
    expect(containerElement.style.paddingLeft).toBe('1rem'); // padding 4 = 1rem
    expect(containerElement.style.paddingRight).toBe('1rem');
  });

  it('should apply full width', () => {
    expect(containerElement.style.width).toBe('100%');
  });

  it('should project content', () => {
    const paragraph = containerElement.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toBe('Container content');
  });
});
