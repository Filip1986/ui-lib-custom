import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Container } from './container';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container [size]="size" [centered]="centered" [padding]="padding" [inset]="inset">
      <p>Container content</p>
    </ui-lib-container>
  `,
})
class TestHostComponent {
  size: any = 'lg';
  centered = true;
  padding: any = 4;
  inset: any = null;
}

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container>
      <p>Default content</p>
    </ui-lib-container>
  `,
})
class DefaultHostComponent {}

describe('Container', () => {
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
    const containerElement: HTMLElement = fixture.nativeElement.querySelector('ui-lib-container');
    return { fixture, component, containerElement };
  }

  function bootstrapDefault(): ComponentFixture<DefaultHostComponent> {
    const fixture: ComponentFixture<DefaultHostComponent> =
      TestBed.createComponent(DefaultHostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const { containerElement } = bootstrap();
    expect(containerElement).toBeTruthy();
  });

  it('should apply max-width from size token', () => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.maxWidth).toContain('1024px'); // lg = 1024px fallback
  });

  it('should apply different sizes', () => {
    const { containerElement } = bootstrap({ size: 'sm' });
    expect(containerElement.style.maxWidth).toContain('640px');
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
    expect(containerElement.style.paddingLeft).toContain('1rem'); // padding 4 = 1rem fallback
    expect(containerElement.style.paddingRight).toContain('1rem');
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

  it('creates with no inputs', () => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const containerElement: HTMLElement = fixture.nativeElement.querySelector('ui-lib-container');
    expect(containerElement).toBeTruthy();
  });

  it('uses inset tokens when inset is set', () => {
    const { containerElement } = bootstrap({ inset: 'lg' });
    expect(containerElement.style.paddingLeft).toContain('1.5rem');
    expect(containerElement.style.paddingRight).toContain('1.5rem');
  });

  it('applies dark theme variables', () => {
    const { containerElement } = bootstrap();
    const light: string = getComputedStyle(containerElement)
      .getPropertyValue('--uilib-container-fg')
      .trim();

    containerElement.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(containerElement)
      .getPropertyValue('--uilib-container-fg')
      .trim();

    expect(dark).not.toBe(light);
    containerElement.removeAttribute('data-theme');
  });
});
