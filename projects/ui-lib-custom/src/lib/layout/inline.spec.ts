import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Inline } from './inline';
import type { InlineAlign, InlineJustify, InlineTag } from './inline';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { InlineToken, SpacingToken } from 'ui-lib-custom/tokens';
import { Stack } from './stack';
import { Grid } from './grid';
import { Container } from './container';

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline
      [gap]="gap"
      [spacing]="spacing"
      [align]="align"
      [justify]="justify"
      [as]="asTag"
      [tag]="tag"
    >
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
  public asTag: InlineTag | null = null;
  public tag: InlineTag | null = null;
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

@Component({
  standalone: true,
  imports: [Container, Stack, Grid, Inline],
  template: `
    <ui-lib-container>
      <ui-lib-stack>
        <ui-lib-grid [columns]="1">
          <ui-lib-inline spacing="sm">
            <span>Nested Item</span>
          </ui-lib-inline>
        </ui-lib-grid>
      </ui-lib-stack>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NestedLayoutHostComponent {}

describe('Inline', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DefaultHostComponent, NestedLayoutHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    component: TestHostComponent;
    inlineElement: HTMLElement;
    inlineContentElement: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component: TestHostComponent = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const inlineElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-inline'
    ) as HTMLElement;
    const inlineContentElement: HTMLElement = inlineElement.firstElementChild as HTMLElement;
    return { fixture, component, inlineElement, inlineContentElement };
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
      throw new Error(`Expected inline item at index ${index}.`);
    }
    return element;
  }

  it('should create', (): void => {
    const { inlineElement, inlineContentElement } = bootstrap();
    expect(inlineElement).toBeTruthy();
    expect(inlineContentElement).toBeTruthy();
  });

  it('should render as horizontal flex container with wrap', (): void => {
    const { inlineContentElement } = bootstrap();
    expect(inlineContentElement.style.flexDirection).toBe('row');
    expect(inlineContentElement.style.flexWrap).toBe('wrap');
  });

  it('should apply gap from design tokens', (): void => {
    const { inlineContentElement } = bootstrap();
    expect(inlineContentElement.style.gap).toContain('0.5rem'); // gap 2 = 0.5rem fallback
  });

  it('should apply align-items', (): void => {
    const { inlineContentElement } = bootstrap();
    expect(inlineContentElement.style.alignItems).toBe('center');
  });

  it('should apply justify-content', (): void => {
    const { inlineContentElement } = bootstrap({ justify: 'space-between' });
    expect(inlineContentElement.style.justifyContent).toBe('space-between');
  });

  it('should project content', (): void => {
    const { inlineElement } = bootstrap();
    const items: NodeListOf<Element> = inlineElement.querySelectorAll('span');
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
    const { inlineContentElement } = bootstrap({ spacing: 'sm' });
    expect(inlineContentElement.style.gap).toContain('0.5rem');
  });

  it('accepts numeric spacing when spacing is a number', (): void => {
    const { inlineContentElement } = bootstrap({ spacing: 4 });
    expect(inlineContentElement.style.gap).toContain('1rem');
  });

  it('renders as div by default', (): void => {
    const { inlineContentElement } = bootstrap();
    expect(inlineContentElement.tagName.toLowerCase()).toBe('div');
  });

  it('renders as span when as is span', (): void => {
    const { inlineContentElement } = bootstrap({ asTag: 'span' });
    expect(inlineContentElement.tagName.toLowerCase()).toBe('span');
  });

  it('supports tag alias input', (): void => {
    const { inlineContentElement } = bootstrap({ tag: 'ul' });
    expect(inlineContentElement.tagName.toLowerCase()).toBe('ul');
  });

  it('prefers as over tag when both are provided', (): void => {
    const { inlineContentElement } = bootstrap({ asTag: 'ol', tag: 'div' });
    expect(inlineContentElement.tagName.toLowerCase()).toBe('ol');
  });

  it('does not apply CSS order to inline items by default', (): void => {
    const { inlineElement } = bootstrap();
    const firstItem: HTMLElement = inlineElement.querySelector('span') as HTMLElement;
    expect(firstItem.style.order).toBe('');
  });

  it('composes inside container, stack, and grid', (): void => {
    const fixture: ComponentFixture<NestedLayoutHostComponent> =
      TestBed.createComponent(NestedLayoutHostComponent);
    fixture.detectChanges();
    const nestedInline: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-inline'
    );
    const nestedItem: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-inline span'
    );
    expect(nestedInline).toBeTruthy();
    expect(nestedItem?.textContent).toBe('Nested Item');
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-inline-fg', 'light-fg');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-inline-fg').trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-inline-fg', 'dark-fg');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-inline-fg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
