import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Inline } from './inline';
import type { InlineAlign, InlineJustify } from './inline';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { InlineToken, SpacingToken } from 'ui-lib-custom/tokens';

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
  public gap: SpacingToken = 2;
  public spacing: InlineToken | SpacingToken | number | null = null;
  public align: InlineAlign = 'center';
  public justify: InlineJustify = 'start';
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

describe('Inline', (): void => {
  beforeEach(async (): Promise<void> => {
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
    const component: TestHostComponent = fixture.componentInstance;
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

  function getRequiredItem(elements: NodeListOf<Element>, index: number): Element {
    const element = elements[index];
    if (!element) {
      throw new Error(`Expected inline item at index ${index}.`);
    }
    return element;
  }

  it('should create', (): void => {
    const { inlineElement } = bootstrap();
    expect(inlineElement).toBeTruthy();
  });

  it('should render as horizontal flex container with wrap', (): void => {
    const { inlineElement } = bootstrap();
    expect(inlineElement.style.flexDirection).toBe('row');
    expect(inlineElement.style.flexWrap).toBe('wrap');
  });

  it('should apply gap from design tokens', (): void => {
    const { inlineElement } = bootstrap();
    expect(inlineElement.style.gap).toContain('0.5rem'); // gap 2 = 0.5rem fallback
  });

  it('should apply align-items', (): void => {
    const { inlineElement } = bootstrap();
    expect(inlineElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', (): void => {
    const { inlineElement } = bootstrap({ justify: 'space-between' });
    expect(inlineElement.style.justifyContent).toBe('space-between');
  });

  it('should project content', (): void => {
    const { inlineElement } = bootstrap();
    const items = inlineElement.querySelectorAll('span');
    expect(items.length).toBe(3);
    expect(getRequiredItem(items, 0).textContent).toBe('Tag 1');
  });

  it('creates with no inputs', (): void => {
    const fixture: ComponentFixture<DefaultHostComponent> = bootstrapDefault();
    const inlineElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-inline'
    ) as HTMLElement;
    expect(inlineElement).toBeTruthy();
  });

  it('uses semantic spacing tokens when spacing is set', (): void => {
    const { inlineElement } = bootstrap({ spacing: 'sm' });
    expect(inlineElement.style.gap).toContain('0.5rem');
  });

  it('accepts numeric spacing when spacing is a number', (): void => {
    const { inlineElement } = bootstrap({ spacing: 4 });
    expect(inlineElement.style.gap).toContain('1rem');
  });

  it('applies dark theme variables', (): void => {
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
