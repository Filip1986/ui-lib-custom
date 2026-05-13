import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Inline } from './inline';

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline>
      <span>Alpha</span>
      <span>Beta</span>
      <span>Gamma</span>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultInlineHostComponent {}

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline as="span">
      <span>One</span>
      <span>Two</span>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SpanInlineHostComponent {}

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline as="ul">
      <li>Item 1</li>
      <li>Item 2</li>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ListInlineHostComponent {}

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline tag="ol">
      <li>First</li>
      <li>Second</li>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TagAliasInlineHostComponent {}

@Component({
  standalone: true,
  imports: [Inline],
  template: `
    <ui-lib-inline as="div" tag="span">
      <span>As wins over tag</span>
    </ui-lib-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AsPrecedenceInlineHostComponent {}

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getInlineHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-inline') as HTMLElement;
}

function getInlineContentElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return getInlineHost(fixture).firstElementChild as HTMLElement;
}

describe('Inline (a11y)', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  it('default: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultInlineHostComponent> = await setup(
      DefaultInlineHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('as span: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<SpanInlineHostComponent> = await setup(SpanInlineHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('default: renders div content element', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultInlineHostComponent> = await setup(
      DefaultInlineHostComponent
    );
    expect(getInlineContentElement(fixture).tagName.toLowerCase()).toBe('div');
  });

  it('default: has no spurious role on host or content element', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultInlineHostComponent> = await setup(
      DefaultInlineHostComponent
    );
    const host: HTMLElement = getInlineHost(fixture);
    const contentElement: HTMLElement = getInlineContentElement(fixture);
    expect(host.getAttribute('role')).toBeNull();
    expect(contentElement.getAttribute('role')).toBeNull();
  });

  it('as span: renders span for inline flow semantics', async (): Promise<void> => {
    const fixture: ComponentFixture<SpanInlineHostComponent> = await setup(SpanInlineHostComponent);
    expect(getInlineContentElement(fixture).tagName.toLowerCase()).toBe('span');
  });

  it('as ul: renders list element for semantic list content', async (): Promise<void> => {
    const fixture: ComponentFixture<ListInlineHostComponent> = await setup(ListInlineHostComponent);
    expect(getInlineContentElement(fixture).tagName.toLowerCase()).toBe('ul');
  });

  it('tag alias: renders requested tag when as is omitted', async (): Promise<void> => {
    const fixture: ComponentFixture<TagAliasInlineHostComponent> = await setup(
      TagAliasInlineHostComponent
    );
    expect(getInlineContentElement(fixture).tagName.toLowerCase()).toBe('ol');
  });

  it('as takes precedence over tag alias when both are provided', async (): Promise<void> => {
    const fixture: ComponentFixture<AsPrecedenceInlineHostComponent> = await setup(
      AsPrecedenceInlineHostComponent
    );
    expect(getInlineContentElement(fixture).tagName.toLowerCase()).toBe('div');
  });

  it('projects items in DOM order to preserve reading order when wrapping', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultInlineHostComponent> = await setup(
      DefaultInlineHostComponent
    );
    const items: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-inline span')
    );
    expect(items.map((item: HTMLElement): string | null => item.textContent)).toEqual([
      'Alpha',
      'Beta',
      'Gamma',
    ]);
  });

  it('does not add order style that could desync visual and reading order', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultInlineHostComponent> = await setup(
      DefaultInlineHostComponent
    );
    const items: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-inline span')
    );
    items.forEach((item: HTMLElement): void => {
      expect(item.style.order).toBe('');
    });
  });

  it('renders a single semantic content element (no unnecessary wrapper chain)', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultInlineHostComponent> = await setup(
      DefaultInlineHostComponent
    );
    const host: HTMLElement = getInlineHost(fixture);
    expect(host.children.length).toBe(1);
  });
});
