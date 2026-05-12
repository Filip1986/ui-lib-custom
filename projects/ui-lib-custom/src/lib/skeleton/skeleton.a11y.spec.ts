import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Skeleton } from './skeleton';

function queryElement<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

@Component({
  standalone: true,
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-skeleton [loading]="loading()" [ariaLabel]="ariaLabel()">
      <button class="loaded-button" type="button">Loaded action</button>
      <span class="loaded-text">Loaded content</span>
    </ui-lib-skeleton>
  `,
})
class SkeletonA11yHostComponent {
  public readonly loading: WritableSignal<boolean> = signal<boolean>(true);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Loading content');
}

@Component({
  standalone: true,
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-skeleton ariaLabel="Loading profile" />
    <ui-lib-skeleton ariaLabel="Loading chart" />
  `,
})
class SkeletonTwoInstancesHostComponent {}

async function createFixture(
  loading: boolean = true
): Promise<ComponentFixture<SkeletonA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [SkeletonA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<SkeletonA11yHostComponent> =
    TestBed.createComponent(SkeletonA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.componentInstance.loading.set(loading);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createTwoInstancesFixture(): Promise<
  ComponentFixture<SkeletonTwoInstancesHostComponent>
> {
  await TestBed.configureTestingModule({
    imports: [SkeletonTwoInstancesHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<SkeletonTwoInstancesHostComponent> = TestBed.createComponent(
    SkeletonTwoInstancesHostComponent
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return queryElement<HTMLElement>(fixture, 'ui-lib-skeleton') as HTMLElement;
}

describe('Skeleton Accessibility', (): void => {
  afterEach((): void => {
    document.body
      .querySelectorAll('app-root, [id^="ui-lib-skeleton-"]')
      .forEach((node: Element): void => {
        node.parentElement?.removeChild(node);
      });
    TestBed.resetTestingModule();
  });

  describe('ARIA structure', (): void => {
    it('announces loading with role="status"', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      expect(getHost(fixture).getAttribute('role')).toBe('status');
    });

    it('sets aria-busy="true" while loading', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      expect(getHost(fixture).getAttribute('aria-busy')).toBe('true');
    });

    it('uses the default loading label', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Loading content');
    });

    it('updates a custom loading label reactively', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      fixture.componentInstance.ariaLabel.set('Loading user profile');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Loading user profile');
    });

    it('marks the loading region as polite and atomic', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      const host: HTMLElement = getHost(fixture);
      expect(host.getAttribute('aria-live')).toBe('polite');
      expect(host.getAttribute('aria-atomic')).toBe('true');
    });

    it('applies a unique host id', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      expect(getHost(fixture).id).toMatch(/^ui-lib-skeleton-\d+$/);
    });

    it('hides the placeholder container from assistive technology', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      const placeholder: HTMLElement = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-skeleton__placeholder'
      ) as HTMLElement;
      expect(placeholder.getAttribute('aria-hidden')).toBe('true');
    });

    it('hides the shimmer decoration from assistive technology', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      const shimmer: HTMLElement = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-skeleton__shimmer'
      ) as HTMLElement;
      expect(shimmer.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('loading completion', (): void => {
    it('sets aria-busy="false" when loading is complete', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(false);
      expect(getHost(fixture).getAttribute('aria-busy')).toBe('false');
    });

    it('removes loading semantics when content is ready', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(false);
      const host: HTMLElement = getHost(fixture);
      expect(host.getAttribute('role')).toBeNull();
      expect(host.getAttribute('aria-label')).toBeNull();
      expect(host.getAttribute('aria-live')).toBeNull();
    });

    it('removes the placeholder from the DOM when loading completes', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(false);
      expect(queryElement(fixture, '.ui-lib-skeleton__placeholder')).toBeNull();
    });

    it('reveals projected content when loading completes', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(false);
      const content: HTMLElement = queryElement<HTMLElement>(
        fixture,
        '.loaded-text'
      ) as HTMLElement;
      const contentText: string = content.textContent as string;
      expect(contentText.trim()).toBe('Loaded content');
    });
  });

  describe('focus and instance behaviour', (): void => {
    it('keeps the host element out of the tab order while loading', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      expect(getHost(fixture).hasAttribute('tabindex')).toBe(false);
    });

    it('allows projected interactive content to receive focus when loaded', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(false);
      const button: HTMLButtonElement = queryElement<HTMLButtonElement>(
        fixture,
        '.loaded-button'
      ) as HTMLButtonElement;
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('generates unique ids for multiple skeleton instances', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonTwoInstancesHostComponent> =
        await createTwoInstancesFixture();
      const skeletons: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll('ui-lib-skeleton');
      expect(skeletons).toHaveLength(2);
      expect(skeletons[0]?.id).toMatch(/^ui-lib-skeleton-\d+$/);
      expect(skeletons[1]?.id).toMatch(/^ui-lib-skeleton-\d+$/);
      expect(skeletons[0]?.id).not.toBe(skeletons[1]?.id);
    });
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe in the default loading state', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with a custom loading label', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(true);
      fixture.componentInstance.ariaLabel.set('Loading analytics card');
      fixture.detectChanges();
      await fixture.whenStable();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when the loaded content is displayed', async (): Promise<void> => {
      const fixture: ComponentFixture<SkeletonA11yHostComponent> = await createFixture(false);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
