import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Stack } from './stack';
import type { StackAlign, StackJustify } from './stack';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { SpacingToken, StackToken } from 'ui-lib-custom/tokens';

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <ui-lib-stack
      [direction]="direction"
      [gap]="gap"
      [spacing]="spacing"
      [align]="align"
      [justify]="justify"
    >
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public direction: 'vertical' | 'horizontal' = 'vertical';
  public gap: SpacingToken = 4;
  public spacing: StackToken | SpacingToken | number | null = null;
  public align: StackAlign = 'stretch';
  public justify: StackJustify = 'start';
}

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <ui-lib-stack>
      <div>Only Item</div>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

describe('Stack', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    component: TestHostComponent;
    stackElement: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component: TestHostComponent = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const stackElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-stack'
    ) as HTMLElement;
    return { fixture, component, stackElement };
  }

  function bootstrapDefault(): ComponentFixture<DefaultHostComponent> {
    const fixture: ComponentFixture<DefaultHostComponent> =
      TestBed.createComponent(DefaultHostComponent);
    fixture.detectChanges();
    return fixture;
  }

  function getRequiredItem(elements: NodeListOf<Element>, index: number): Element {
    const element: Element | undefined = elements[index];
    if (!element) {
      throw new Error(`Expected stack item at index ${index}.`);
    }
    return element;
  }

  it('should create', (): void => {
    const { stackElement } = bootstrap();
    expect(stackElement).toBeTruthy();
  });

  it('should render vertical stack by default', (): void => {
    const { stackElement } = bootstrap();
    expect(stackElement.style.flexDirection).toBe('column');
  });

  it('should render horizontal stack when direction is horizontal', (): void => {
    const { stackElement } = bootstrap({ direction: 'horizontal' });
    expect(stackElement.style.flexDirection).toBe('row');
  });

  it('should apply gap from design tokens', (): void => {
    const { stackElement } = bootstrap();
    expect(stackElement.style.gap).toContain('1rem'); // gap 4 = 1rem fallback
  });

  it('should apply different gap tokens', (): void => {
    const { stackElement } = bootstrap({ gap: 2 });
    expect(stackElement.style.gap).toContain('0.5rem'); // gap 2 = 0.5rem fallback
  });

  it('should apply align-items', (): void => {
    const { stackElement } = bootstrap({ align: 'center' });
    expect(stackElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', (): void => {
    const { stackElement } = bootstrap({ justify: 'center' });
    expect(stackElement.style.justifyContent).toBe('center');
  });

  it('should project content', (): void => {
    const { stackElement } = bootstrap();
    const items: NodeListOf<Element> = stackElement.querySelectorAll('div');
    expect(items.length).toBe(3);
    expect(getRequiredItem(items, 0).textContent).toBe('Item 1');
  });

  it('creates with no inputs', (): void => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const stackElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-stack'
    ) as HTMLElement;
    expect(stackElement).toBeTruthy();
  });

  it('uses semantic spacing tokens when spacing is set', (): void => {
    const { stackElement } = bootstrap({ spacing: 'lg' });
    expect(stackElement.style.gap).toContain('1.5rem');
  });

  it('accepts numeric spacing when spacing is a number', (): void => {
    const { stackElement } = bootstrap({ spacing: 2 });
    expect(stackElement.style.gap).toContain('0.5rem');
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-stack-fg').trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-stack-fg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
