import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Stack } from './stack';

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <ui-lib-stack>
      <div>Alpha</div>
      <div>Beta</div>
      <div>Gamma</div>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultStackHostComponent {}

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <ui-lib-stack as="ul">
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ListStackHostComponent {}

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <ui-lib-stack as="nav" ariaLabel="Primary navigation">
      <a href="#one">One</a>
      <a href="#two">Two</a>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NavStackHostComponent {}

@Component({
  standalone: true,
  imports: [Stack],
  template: `
    <ui-lib-stack role="list" wrap="wrap">
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ListRoleStackHostComponent {}

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

function getStackHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-stack') as HTMLElement;
}

function getStackContentElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return getStackHost(fixture).firstElementChild as HTMLElement;
}

describe('Stack (a11y)', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  it('default: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultStackHostComponent> =
      await setup(DefaultStackHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('as nav with aria-label: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<NavStackHostComponent> = await setup(NavStackHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('default: does not create spurious landmark elements', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultStackHostComponent> =
      await setup(DefaultStackHostComponent);
    const landmarks: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('main, nav, aside, section');
    expect(landmarks.length).toBe(0);
  });

  it('default: renders neutral div content element', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultStackHostComponent> =
      await setup(DefaultStackHostComponent);
    expect(getStackContentElement(fixture).tagName.toLowerCase()).toBe('div');
  });

  it('as ul: renders semantic list container', async (): Promise<void> => {
    const fixture: ComponentFixture<ListStackHostComponent> = await setup(ListStackHostComponent);
    expect(getStackContentElement(fixture).tagName.toLowerCase()).toBe('ul');
  });

  it('as ul: keeps native list semantics without overriding role', async (): Promise<void> => {
    const fixture: ComponentFixture<ListStackHostComponent> = await setup(ListStackHostComponent);
    const stackContentElement: HTMLElement = getStackContentElement(fixture);
    expect(stackContentElement.tagName.toLowerCase()).toBe('ul');
    expect(stackContentElement.getAttribute('role')).toBeNull();
  });

  it('as nav: applies aria-label to semantic nav container', async (): Promise<void> => {
    const fixture: ComponentFixture<NavStackHostComponent> = await setup(NavStackHostComponent);
    const stackContentElement: HTMLElement = getStackContentElement(fixture);
    expect(stackContentElement.tagName.toLowerCase()).toBe('nav');
    expect(stackContentElement.getAttribute('aria-label')).toBe('Primary navigation');
  });

  it('role list: supports explicit role when used as non-list container', async (): Promise<void> => {
    const fixture: ComponentFixture<ListRoleStackHostComponent> = await setup(
      ListRoleStackHostComponent,
    );
    expect(getStackContentElement(fixture).getAttribute('role')).toBe('list');
  });

  it('applies flex gap via CSS custom property value', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultStackHostComponent> =
      await setup(DefaultStackHostComponent);
    expect(getStackContentElement(fixture).style.gap).toContain('1rem');
  });

  it('applies wrap behavior', async (): Promise<void> => {
    const fixture: ComponentFixture<ListRoleStackHostComponent> = await setup(
      ListRoleStackHostComponent,
    );
    expect(getStackContentElement(fixture).style.flexWrap).toBe('wrap');
  });

  it('projects content in DOM order to preserve reading order with wrap', async (): Promise<void> => {
    const fixture: ComponentFixture<ListRoleStackHostComponent> = await setup(
      ListRoleStackHostComponent,
    );
    const items: HTMLElement[] = Array.from(
      getStackContentElement(fixture).querySelectorAll<HTMLElement>('div'),
    );
    expect(items.map((item: HTMLElement): string => item.textContent.trim())).toEqual([
      'First',
      'Second',
      'Third',
    ]);
  });

  it('does not set per-item CSS order that would desync reading order', async (): Promise<void> => {
    const fixture: ComponentFixture<ListRoleStackHostComponent> = await setup(
      ListRoleStackHostComponent,
    );
    const items: HTMLElement[] = Array.from(
      getStackContentElement(fixture).querySelectorAll<HTMLElement>('div'),
    );
    items.forEach((item: HTMLElement): void => {
      expect(item.style.order).toBe('');
    });
  });
});
