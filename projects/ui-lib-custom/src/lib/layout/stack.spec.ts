import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Stack } from './stack';
import type { StackAlign, StackJustify, StackTag, StackWrap } from './stack';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { SpacingToken, StackToken } from 'ui-lib-custom/tokens';
import { Grid } from './grid';
import { Container } from './container';

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
      [as]="asTag"
      [tag]="tag"
      [wrap]="wrap"
      [ariaLabel]="ariaLabel"
      [role]="role"
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
  public asTag: StackTag | null = null;
  public tag: StackTag | null = null;
  public wrap: StackWrap = 'nowrap';
  public ariaLabel: string | null = null;
  public role: string | null = null;
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

@Component({
  standalone: true,
  imports: [Container, Stack, Grid],
  template: `
    <ui-lib-container>
      <ui-lib-stack>
        <ui-lib-grid [columns]="1">
          <div>Nested content</div>
        </ui-lib-grid>
      </ui-lib-stack>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NestedLayoutHostComponent {}

describe('Stack', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent, NestedLayoutHostComponent],
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
      'ui-lib-stack',
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
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.flexDirection).toBe('column');
  });

  it('should render horizontal stack when direction is horizontal', (): void => {
    const { stackElement } = bootstrap({ direction: 'horizontal' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.flexDirection).toBe('row');
  });

  it('should apply gap from design tokens', (): void => {
    const { stackElement } = bootstrap();
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.gap).toContain('1rem'); // gap 4 = 1rem fallback
  });

  it('should apply different gap tokens', (): void => {
    const { stackElement } = bootstrap({ gap: 2 });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.gap).toContain('0.5rem'); // gap 2 = 0.5rem fallback
  });

  it('should apply align-items', (): void => {
    const { stackElement } = bootstrap({ align: 'center' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', (): void => {
    const { stackElement } = bootstrap({ justify: 'center' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.justifyContent).toBe('center');
  });

  it('should apply wrap mode', (): void => {
    const { stackElement } = bootstrap({ wrap: 'wrap-reverse' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.flexWrap).toBe('wrap-reverse');
  });

  it('renders as div by default', (): void => {
    const { stackElement } = bootstrap();
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.tagName.toLowerCase()).toBe('div');
  });

  it('supports semantic as input', (): void => {
    const { stackElement } = bootstrap({ asTag: 'ul' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.tagName.toLowerCase()).toBe('ul');
  });

  it('supports tag alias input', (): void => {
    const { stackElement } = bootstrap({ tag: 'nav', ariaLabel: 'Site links' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.tagName.toLowerCase()).toBe('nav');
    expect(stackContentElement.getAttribute('aria-label')).toBe('Site links');
  });

  it('supports role passthrough for non-list tags', (): void => {
    const { stackElement } = bootstrap({ role: 'list' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.getAttribute('role')).toBe('list');
  });

  it('prefers as over tag when both are provided', (): void => {
    const { stackElement } = bootstrap({ asTag: 'ol', tag: 'ul' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.tagName.toLowerCase()).toBe('ol');
  });

  it('should project content', (): void => {
    const { stackElement } = bootstrap();
    const items: NodeListOf<Element> = stackElement.querySelectorAll(
      '.ui-lib-stack__content > div',
    );
    expect(items.length).toBe(3);
    expect(getRequiredItem(items, 0).textContent).toBe('Item 1');
  });

  it('creates with no inputs', (): void => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const stackElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-stack',
    ) as HTMLElement;
    expect(stackElement).toBeTruthy();
  });

  it('uses semantic spacing tokens when spacing is set', (): void => {
    const { stackElement } = bootstrap({ spacing: 'lg' });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.gap).toContain('1.5rem');
  });

  it('accepts numeric spacing when spacing is a number', (): void => {
    const { stackElement } = bootstrap({ spacing: 2 });
    const stackContentElement: HTMLElement = stackElement.firstElementChild as HTMLElement;
    expect(stackContentElement.style.gap).toContain('0.5rem');
  });

  it('composes inside container and grid', (): void => {
    const fixture: ComponentFixture<NestedLayoutHostComponent> =
      TestBed.createComponent(NestedLayoutHostComponent);
    fixture.detectChanges();
    const nestedStack: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-stack',
    );
    const nestedGrid: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-grid',
    );
    expect(nestedStack).toBeTruthy();
    expect(nestedGrid).toBeTruthy();
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-stack-fg', 'light-fg');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-stack-fg').trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-stack-fg', 'dark-fg');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-stack-fg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
