import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import {
  Breadcrumb,
  BREADCRUMB_DEFAULT_ARIA_LABEL,
  BREADCRUMB_DEFAULT_HOME_ARIA_LABEL,
} from './breadcrumb';
import type { BreadcrumbItem } from './breadcrumb.types';

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

@Component({
  standalone: true,
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-breadcrumb [items]="items()" [home]="home()" [ariaLabel]="ariaLabel()" />`,
})
class BreadcrumbA11yHostComponent {
  public readonly items: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'Section', url: '/section' },
    { label: 'Page' },
  ]);
  public readonly home: WritableSignal<BreadcrumbItem | null> = signal<BreadcrumbItem | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(BREADCRUMB_DEFAULT_ARIA_LABEL);
}

@Component({
  standalone: true,
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-breadcrumb
      [home]="{ icon: 'pi pi-home', url: '/' }"
      [items]="items()"
      [ariaLabel]="ariaLabel()"
    />
  `,
})
class BreadcrumbHomeIconHostComponent {
  public readonly items: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'Section', url: '/section' },
    { label: 'Page' },
  ]);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(BREADCRUMB_DEFAULT_ARIA_LABEL);
}

@Component({
  standalone: true,
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-breadcrumb
      [home]="{ icon: 'pi pi-home', url: '/', iconAriaLabel: 'Dashboard' }"
      [items]="items()"
    />
  `,
})
class BreadcrumbHomeIconCustomLabelHostComponent {
  public readonly items: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'Section', url: '/section' },
    { label: 'Page' },
  ]);
}

@Component({
  standalone: true,
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-breadcrumb [home]="{ icon: 'pi pi-home', url: '/' }" [items]="items()">
      <ng-template #firstItem let-item>
        <span class="custom-first-item">{{ item.iconAriaLabel ?? 'Home' }}</span>
      </ng-template>
    </ui-lib-breadcrumb>
  `,
})
class BreadcrumbFirstItemTemplateHostComponent {
  public readonly items: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'Section', url: '/section' },
    { label: 'Page' },
  ]);
}

@Component({
  standalone: true,
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-breadcrumb [items]="firstItems()" />
    <ui-lib-breadcrumb [items]="secondItems()" />
  `,
})
class BreadcrumbMultiInstanceHostComponent {
  public readonly firstItems: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'A', url: '/a' },
    { label: 'B' },
  ]);
  public readonly secondItems: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'One', url: '/one' },
    { label: 'Two' },
  ]);
}

async function createFixture<T>(hostComponent: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostComponent],
    providers: [provideZonelessChangeDetection(), provideRouter([])],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

describe('Breadcrumb Accessibility', (): void => {
  describe('landmark semantics', (): void => {
    it('has role="navigation" and default aria-label on host', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      const host: HTMLElement | null = queryEl<HTMLElement>(fixture, 'ui-lib-breadcrumb');
      expect(host?.getAttribute('role')).toBe('navigation');
      expect(host?.getAttribute('aria-label')).toBe(BREADCRUMB_DEFAULT_ARIA_LABEL);
    });

    it('uses custom ariaLabel input value on host landmark', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      fixture.componentInstance.ariaLabel.set('Account trail');
      fixture.detectChanges();

      const host: HTMLElement | null = queryEl<HTMLElement>(fixture, 'ui-lib-breadcrumb');
      expect(host?.getAttribute('aria-label')).toBe('Account trail');
    });

    it('generates unique host ids for multiple breadcrumb instances', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbMultiInstanceHostComponent> = await createFixture(
        BreadcrumbMultiInstanceHostComponent,
      );

      const hosts: HTMLElement[] = queryAllEl<HTMLElement>(fixture, 'ui-lib-breadcrumb');
      expect(hosts.length).toBe(2);
      expect(hosts[0]?.id).toMatch(/^ui-lib-breadcrumb-\d+$/);
      expect(hosts[1]?.id).toMatch(/^ui-lib-breadcrumb-\d+$/);
      expect(hosts[0]?.id).not.toBe(hosts[1]?.id);
    });
  });

  describe('ordered list and current page semantics', (): void => {
    it('renders breadcrumbs inside an ordered list and does not render an unordered list', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      expect(queryEl<HTMLOListElement>(fixture, '.ui-lib-breadcrumb__list')).toBeTruthy();
      expect(queryEl<HTMLUListElement>(fixture, 'ul.ui-lib-breadcrumb__list')).toBeNull();
    });

    it('renders non-last items as links with visible text', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      const links: HTMLAnchorElement[] = queryAllEl<HTMLAnchorElement>(
        fixture,
        '.ui-lib-breadcrumb__item:not(.ui-lib-breadcrumb__item--active) a.ui-lib-breadcrumb__link',
      );
      expect(links.length).toBe(1);
      expect((links[0]?.textContent ?? '').trim()).toBe('Section');
    });

    it('renders the last item as non-interactive span with aria-current="page"', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      const current: HTMLElement | null = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-breadcrumb__item--active .ui-lib-breadcrumb__current',
      );
      expect(current?.tagName).toBe('SPAN');
      expect(current?.getAttribute('aria-current')).toBe('page');
    });

    it('does not render anchor or button in the last breadcrumb item', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      expect(
        queryEl<HTMLElement>(
          fixture,
          '.ui-lib-breadcrumb__item--active a, .ui-lib-breadcrumb__item--active button',
        ),
      ).toBeNull();
    });

    it('does not apply aria-current to non-last items', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      expect(
        queryEl<HTMLElement>(
          fixture,
          '.ui-lib-breadcrumb__item:not(.ui-lib-breadcrumb__item--active) [aria-current="page"]',
        ),
      ).toBeNull();
    });
  });

  describe('separator and icon semantics', (): void => {
    it('renders separators only between items', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      const separators: HTMLElement[] = queryAllEl<HTMLElement>(
        fixture,
        '.ui-lib-breadcrumb__separator',
      );
      expect(separators.length).toBe(1);
    });

    it('marks separators as aria-hidden', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      const separators: HTMLElement[] = queryAllEl<HTMLElement>(
        fixture,
        '.ui-lib-breadcrumb__separator',
      );
      expect(separators.length).toBeGreaterThan(0);
      for (const separator of separators) {
        expect(separator.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('marks icon spans as aria-hidden', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbHomeIconHostComponent> = await createFixture(
        BreadcrumbHomeIconHostComponent,
      );

      const icon: HTMLElement | null = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-breadcrumb__item-icon',
      );
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('home icon naming', (): void => {
    it('applies aria-label="Home" to icon-only home link by default', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbHomeIconHostComponent> = await createFixture(
        BreadcrumbHomeIconHostComponent,
      );

      const firstLink: HTMLAnchorElement | null = queryEl<HTMLAnchorElement>(
        fixture,
        '.ui-lib-breadcrumb__item:first-child a.ui-lib-breadcrumb__link',
      );
      expect(firstLink?.getAttribute('aria-label')).toBe(BREADCRUMB_DEFAULT_HOME_ARIA_LABEL);
    });

    it('uses iconAriaLabel for icon-only home link when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbHomeIconCustomLabelHostComponent> =
        await createFixture(BreadcrumbHomeIconCustomLabelHostComponent);

      const firstLink: HTMLAnchorElement | null = queryEl<HTMLAnchorElement>(
        fixture,
        '.ui-lib-breadcrumb__item:first-child a.ui-lib-breadcrumb__link',
      );
      expect(firstLink?.getAttribute('aria-label')).toBe('Dashboard');
    });
  });

  describe('composability', (): void => {
    it('renders firstItem template projection for the home item', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbFirstItemTemplateHostComponent> =
        await createFixture(BreadcrumbFirstItemTemplateHostComponent);

      const projected: HTMLElement | null = queryEl<HTMLElement>(fixture, '.custom-first-item');
      expect(projected).toBeTruthy();
      expect((projected?.textContent ?? '').trim()).toBe('Home');
    });
  });

  describe('axe-core', (): void => {
    it('passes axe for a 2-item breadcrumb', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for a 3-item breadcrumb', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbA11yHostComponent> = await createFixture(
        BreadcrumbA11yHostComponent,
      );

      fixture.componentInstance.items.set([
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Product A' },
      ]);
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for home-icon-first breadcrumb', async (): Promise<void> => {
      const fixture: ComponentFixture<BreadcrumbHomeIconHostComponent> = await createFixture(
        BreadcrumbHomeIconHostComponent,
      );

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
