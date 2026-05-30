import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Container } from './container';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [Container],
  template: `<ui-lib-container><p>Default content</p></ui-lib-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultContainerHost {}

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container id="main-content">
      <p>Skip-link target content</p>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ContainerWithIdHost {}

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container [centered]="true" size="xl">
      <p>Centered content</p>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CenteredContainerHost {}

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container inset="md">
      <p>Inset padded content</p>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InsetContainerHost {}

@Component({
  standalone: true,
  imports: [Container],
  template: `
    <ui-lib-container id="section-a">
      <p>Section A</p>
    </ui-lib-container>
    <ui-lib-container id="section-b">
      <p>Section B</p>
    </ui-lib-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoNamedContainersHost {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function getContainer(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-container') as HTMLElement;
}

function getAllContainers(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-container'),
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Container (a11y)', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => f.destroy());
    createdFixtures.length = 0;
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  it('default: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultContainerHost> = await setup(DefaultContainerHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('with id: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<ContainerWithIdHost> = await setup(ContainerWithIdHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('centered: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<CenteredContainerHost> = await setup(CenteredContainerHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('inset padding: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<InsetContainerHost> = await setup(InsetContainerHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('default: renders as custom element with no landmark role', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultContainerHost> = await setup(DefaultContainerHost);
    const container: HTMLElement = getContainer(fixture);
    expect(container.tagName.toLowerCase()).toBe('ui-lib-container');
    expect(container.getAttribute('role')).toBeNull();
  });

  it('default: no tabindex attribute when id is not set', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultContainerHost> = await setup(DefaultContainerHost);
    const container: HTMLElement = getContainer(fixture);
    expect(container.getAttribute('tabindex')).toBeNull();
  });

  it('with id: has tabindex="-1" for skip-link target compatibility', async (): Promise<void> => {
    const fixture: ComponentFixture<ContainerWithIdHost> = await setup(ContainerWithIdHost);
    const container: HTMLElement = getContainer(fixture);
    expect(container.getAttribute('tabindex')).toBe('-1');
  });

  it('with id: is programmatically focusable without entering natural tab order', async (): Promise<void> => {
    const fixture: ComponentFixture<ContainerWithIdHost> = await setup(ContainerWithIdHost);
    const container: HTMLElement = getContainer(fixture);
    expect((): void => container.focus()).not.toThrow();
    expect(container.getAttribute('tabindex')).toBe('-1');
  });

  it('default: no overflow:hidden — content is never clipped', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultContainerHost> = await setup(DefaultContainerHost);
    const container: HTMLElement = getContainer(fixture);
    const overflow: string = container.style.overflow;
    expect(overflow).not.toBe('hidden');
  });

  it('default: max-width CSS custom property is applied', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultContainerHost> = await setup(DefaultContainerHost);
    const container: HTMLElement = getContainer(fixture);
    expect(container.style.maxInlineSize).toContain('1024px');
  });

  it('default: projected content is reachable in the DOM', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultContainerHost> = await setup(DefaultContainerHost);
    const paragraph: HTMLParagraphElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toBe('Default content');
  });

  it('two named containers: both receive tabindex="-1"', async (): Promise<void> => {
    const fixture: ComponentFixture<TwoNamedContainersHost> = await setup(TwoNamedContainersHost);
    const containers: HTMLElement[] = getAllContainers(fixture);
    expect(containers.length).toBe(2);
    containers.forEach((c: HTMLElement): void => {
      expect(c.getAttribute('tabindex')).toBe('-1');
    });
  });
});
