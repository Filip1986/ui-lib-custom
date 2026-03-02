import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Inline } from './inline';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline [gap]="gap" [spacing]="spacing" [align]="align" [justify]="justify">
      <span>Tag 1</span>
      <span>Tag 2</span>
      <span>Tag 3</span>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public gap: number = 2;
  public spacing: number | null = null;
  public align: string = 'center';
  public justify: string = 'start';
}

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline>
      <span>Only Tag</span>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

describe('Inline', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    component: TestHostComponent;
    inlineElement: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const inlineElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-inline'
    ) as HTMLElement;
    return { fixture, component, inlineElement };
  }

  function bootstrapDefault(): ComponentFixture<DefaultHostComponent> {
    const fixture: ComponentFixture<DefaultHostComponent> =
      TestBed.createComponent(DefaultHostComponent);
    fixture.detectChanges();
    return fixture;
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

  it('creates with no inputs', () => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const inlineElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-inline'
    ) as HTMLElement;
    expect(inlineElement).toBeTruthy();
  });

  it('uses semantic spacing tokens when spacing is set', () => {
    const { inlineElement } = bootstrap({ spacing: 'sm' });
    expect(inlineElement.style.gap).toContain('0.5rem');
  });

  it('accepts numeric spacing when spacing is a number', () => {
    const { inlineElement } = bootstrap({ spacing: 4 });
    expect(inlineElement.style.gap).toContain('1rem');
  });

  it('applies dark theme variables', () => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-inline-fg').trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-inline-fg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
