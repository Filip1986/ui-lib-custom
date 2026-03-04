import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Container } from './container';
import type { ContainerSize, InsetToken, SpacingToken } from 'ui-lib-custom/tokens';
import { ChangeDetectionStrategy, Component } from '@angular/core';

type ContainerSizeInput = Exclude<ContainerSize, 'xs' | '2xl' | 'full'>;
type ContainerInsetInput = Exclude<InsetToken, 'xs'>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container [size]="size" [centered]="centered" [padding]="padding" [inset]="inset">
      <p>Container content</p>
    </ui-lib-container>
  `,
})
class TestHostComponent {
  public size: ContainerSizeInput = 'lg';
  public centered: boolean = false;
  public padding: SpacingToken = 4;
  public inset: ContainerInsetInput | null = null;
}

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container>
      <p>Default content</p>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

describe('Container', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    component: TestHostComponent;
    containerElement: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component: TestHostComponent = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const containerElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-container'
    ) as HTMLElement;
    return { fixture, component, containerElement };
  }

  function bootstrapDefault(): ComponentFixture<DefaultHostComponent> {
    const fixture: ComponentFixture<DefaultHostComponent> =
      TestBed.createComponent(DefaultHostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', (): void => {
    const { containerElement } = bootstrap();
    expect(containerElement).toBeTruthy();
  });

  it('should apply max-width from size token', (): void => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.maxWidth).toContain('1024px'); // lg = 1024px fallback
  });

  it('should apply different sizes', (): void => {
    const { containerElement } = bootstrap({ size: 'sm' });
    expect(containerElement.style.maxWidth).toContain('640px');
  });

  it('should not center container by default', (): void => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.marginLeft).toBe('');
    expect(containerElement.style.marginRight).toBe('');
  });

  it('should not center when centered is false', (): void => {
    const { containerElement } = bootstrap({ centered: false });
    expect(containerElement.style.marginLeft).toBe('');
    expect(containerElement.style.marginRight).toBe('');
  });

  it('should center when centered is true', (): void => {
    const { containerElement } = bootstrap({ centered: true });
    expect(containerElement.style.marginLeft).toBe('auto');
    expect(containerElement.style.marginRight).toBe('auto');
  });

  it('should apply padding from design tokens', (): void => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.paddingLeft).toContain('1rem'); // padding 4 = 1rem fallback
    expect(containerElement.style.paddingRight).toContain('1rem');
  });

  it('should apply full width', (): void => {
    const { containerElement } = bootstrap();
    expect(containerElement.style.width).toBe('100%');
  });

  it('should project content', (): void => {
    const { containerElement } = bootstrap();
    const paragraph: HTMLParagraphElement | null = containerElement.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toBe('Container content');
  });

  it('creates with no inputs', (): void => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const containerElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-container'
    ) as HTMLElement;
    expect(containerElement).toBeTruthy();
  });

  it('uses inset tokens when inset is set', (): void => {
    const { containerElement } = bootstrap({ inset: 'lg' });
    expect(containerElement.style.paddingLeft).toContain('1.5rem');
    expect(containerElement.style.paddingRight).toContain('1.5rem');
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-container-fg', 'light-fg');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-container-fg').trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-container-fg', 'dark-fg');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-container-fg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
