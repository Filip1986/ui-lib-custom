import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Dock } from './dock';
import type { DockItem } from './dock.types';

// ── Host components ─────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock
      ariaLabel="Application dock"
      [items]="[
        { label: 'Home', icon: 'lucideAlertCircle', command: noop },
        { label: 'Search', icon: 'lucideAlertCircle', command: noop },
        { label: 'Settings', icon: 'lucideAlertCircle', command: noop },
      ]"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultDockHost {
  public noop: () => void = (): void => {};
}

@Component({
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock
      [items]="[
        { label: 'Home', icon: 'lucideAlertCircle', command: noop },
        { label: 'Disabled', icon: 'lucideAlertCircle', command: noop, disabled: true },
      ]"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledItemDockHost {
  public noop: () => void = (): void => {};
}

@Component({
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock
      ariaLabel="Link dock"
      [items]="[
        { label: 'GitHub', icon: 'lucideAlertCircle', url: 'https://github.com' },
        { label: 'Docs', icon: 'lucideAlertCircle', url: 'https://example.com', target: '_blank' },
      ]"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class UrlItemDockHost {}

@Component({
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock
      ariaLabel="Router dock"
      [items]="[
        { label: 'Home', icon: 'lucideAlertCircle', routerLink: '/' },
        { label: 'About', icon: 'lucideAlertCircle', routerLink: '/about' },
      ]"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RouterLinkDockHost {}

@Component({
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock
      [items]="[
        {
          label: 'Home tooltip',
          ariaLabel: 'Navigate to home page',
          icon: 'lucideAlertCircle',
          command: noop,
        },
      ]"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AriaLabelOverrideDockHost {
  public noop: () => void = (): void => {};
}

@Component({
  standalone: true,
  imports: [Dock],
  template: ` <ui-lib-dock [items]="[{ icon: 'lucideAlertCircle', command: noop }]" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NoLabelDockHost {
  public noop: () => void = (): void => {};
}

@Component({
  standalone: true,
  imports: [Dock],
  template: ` <ui-lib-dock [items]="[]" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyDockHost {}

@Component({
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock ariaLabel="Template dock" [items]="[{ label: 'Custom', command: noop }]">
      <ng-template #dockItemTemplate let-item let-index="index">
        <span class="custom-content" [attr.data-label]="item.label" [attr.data-index]="index">
          {{ item.label }}
        </span>
      </ng-template>
    </ui-lib-dock>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CustomTemplateDockHost {
  public noop: () => void = (): void => {};
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      provideIcons({ lucideAlertCircle }),
    ],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getNav(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-dock__container',
  ) as HTMLElement;
}

function getInteractiveItems(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-dock__item-link:not(.ui-lib-dock__item-link--static)',
    ),
  );
}

function getIcons(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-icon'),
  );
}

function getTooltips(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-dock__tooltip'),
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Dock Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  // ── axe-core automated checks ─────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('default dock with labeled command items has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('dock with a disabled item has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledItemDockHost> = await setup(DisabledItemDockHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('dock with URL anchor items has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<UrlItemDockHost> = await setup(UrlItemDockHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('dock with routerLink items has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<RouterLinkDockHost> = await setup(RouterLinkDockHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── Container ARIA structure ──────────────────────────────────────────────

  describe('container ARIA structure', (): void => {
    it('container is a <nav> element', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const nav: HTMLElement = getNav(fixture);
      expect(nav.tagName.toLowerCase()).toBe('nav');
    });

    it('nav has an aria-label attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const nav: HTMLElement = getNav(fixture);
      expect(nav.getAttribute('aria-label')).toBeTruthy();
    });

    it('nav aria-label defaults to "Dock" when ariaLabel input is not provided', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyDockHost> = await setup(EmptyDockHost);
      const nav: HTMLElement = getNav(fixture);
      expect(nav.getAttribute('aria-label')).toBe('Dock');
    });

    it('custom ariaLabel input is reflected on the nav element', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const nav: HTMLElement = getNav(fixture);
      expect(nav.getAttribute('aria-label')).toBe('Application dock');
    });
  });

  // ── Item accessible names ─────────────────────────────────────────────────

  describe('item accessible names', (): void => {
    it('button item gets aria-label from item.label', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const items: HTMLElement[] = getInteractiveItems(fixture);
      expect(items[0]?.getAttribute('aria-label')).toBe('Home');
      expect(items[1]?.getAttribute('aria-label')).toBe('Search');
    });

    it('URL anchor item gets aria-label from item.label', async (): Promise<void> => {
      const fixture: ComponentFixture<UrlItemDockHost> = await setup(UrlItemDockHost);
      const items: HTMLElement[] = getInteractiveItems(fixture);
      expect(items[0]?.getAttribute('aria-label')).toBe('GitHub');
    });

    it('routerLink anchor item gets aria-label from item.label', async (): Promise<void> => {
      const fixture: ComponentFixture<RouterLinkDockHost> = await setup(RouterLinkDockHost);
      const items: HTMLElement[] = getInteractiveItems(fixture);
      expect(items[0]?.getAttribute('aria-label')).toBe('Home');
    });

    it('item.ariaLabel takes priority over item.label for accessible name', async (): Promise<void> => {
      const fixture: ComponentFixture<AriaLabelOverrideDockHost> =
        await setup(AriaLabelOverrideDockHost);
      const items: HTMLElement[] = getInteractiveItems(fixture);
      expect(items[0]?.getAttribute('aria-label')).toBe('Navigate to home page');
    });

    it('item with no label and no ariaLabel has no aria-label attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<NoLabelDockHost> = await setup(NoLabelDockHost);
      const items: HTMLElement[] = getInteractiveItems(fixture);
      expect(items[0]?.getAttribute('aria-label')).toBeNull();
    });
  });

  // ── Icon accessibility ────────────────────────────────────────────────────

  describe('icon accessibility', (): void => {
    it('icons inside interactive items have aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const icons: HTMLElement[] = getIcons(fixture);
      expect(icons.length).toBeGreaterThan(0);
      icons.forEach((icon: HTMLElement): void => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('icons inside URL anchors have aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<UrlItemDockHost> = await setup(UrlItemDockHost);
      const icons: HTMLElement[] = getIcons(fixture);
      expect(icons.length).toBeGreaterThan(0);
      icons.forEach((icon: HTMLElement): void => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('tooltip labels have aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const tooltips: HTMLElement[] = getTooltips(fixture);
      expect(tooltips.length).toBeGreaterThan(0);
      tooltips.forEach((tooltip: HTMLElement): void => {
        expect(tooltip.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  // ── Disabled state ────────────────────────────────────────────────────────

  describe('disabled state', (): void => {
    it('disabled button has aria-disabled="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledItemDockHost> = await setup(DisabledItemDockHost);
      const items: HTMLElement[] = getInteractiveItems(fixture);
      const disabledButton: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean =>
          item.tagName.toLowerCase() === 'button' && item.hasAttribute('disabled'),
      );
      expect(disabledButton).toBeDefined();
      expect(disabledButton?.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled button has the disabled HTML attribute (not tabbable)', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledItemDockHost> = await setup(DisabledItemDockHost);
      const disabledButtons: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('button[disabled]'),
      );
      expect(disabledButtons.length).toBeGreaterThan(0);
    });

    it('disabled item wrapper has the disabled CSS class', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledItemDockHost> = await setup(DisabledItemDockHost);
      const disabledItems: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-dock__item--disabled',
        ),
      );
      expect(disabledItems.length).toBeGreaterThan(0);
    });
  });

  // ── Keyboard / Tab navigation ─────────────────────────────────────────────

  describe('keyboard / Tab navigation', (): void => {
    it('enabled button items are focusable (no tabindex=-1 or disabled attr by default)', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const buttons: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          'button:not([disabled])',
        ),
      );
      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach((btn: HTMLElement): void => {
        expect(btn.getAttribute('tabindex')).not.toBe('-1');
        expect(btn.hasAttribute('disabled')).toBe(false);
      });
    });

    it('disabled buttons are not focusable (have disabled attribute)', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledItemDockHost> = await setup(DisabledItemDockHost);
      const disabledButtons: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('button[disabled]'),
      );
      expect(disabledButtons.length).toBeGreaterThan(0);
    });

    it('static span items do not have interactive role', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDockHost> = await setup(DefaultDockHost);
      const staticSpans: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-dock__item-link--static',
        ),
      );
      staticSpans.forEach((span: HTMLElement): void => {
        expect(span.getAttribute('role')).toBeNull();
        expect(span.hasAttribute('tabindex')).toBe(false);
      });
    });
  });

  // ── Empty and edge cases ──────────────────────────────────────────────────

  describe('empty and edge cases', (): void => {
    it('dock with no items renders nav with an empty list', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyDockHost> = await setup(EmptyDockHost);
      const nav: HTMLElement = getNav(fixture);
      expect(nav).not.toBeNull();
      const list: HTMLElement | null = nav.querySelector('ul');
      expect(list).not.toBeNull();
      expect(list?.children.length).toBe(0);
    });
  });

  // ── Custom item template (Phase 5 — Composability) ───────────────────────

  describe('custom item template', (): void => {
    it('renders custom dockItemTemplate when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomTemplateDockHost> = await setup(CustomTemplateDockHost);
      const customContent: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.custom-content');
      expect(customContent).not.toBeNull();
    });

    it('custom template receives item as implicit context', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomTemplateDockHost> = await setup(CustomTemplateDockHost);
      const customContent: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.custom-content');
      expect(customContent?.getAttribute('data-label')).toBe('Custom');
    });

    it('custom template receives index in context', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomTemplateDockHost> = await setup(CustomTemplateDockHost);
      const customContent: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.custom-content');
      expect(customContent?.getAttribute('data-index')).toBe('0');
    });

    it('default icon is not rendered when custom template is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomTemplateDockHost> = await setup(CustomTemplateDockHost);
      const icons: HTMLElement[] = getIcons(fixture);
      expect(icons.length).toBe(0);
    });
  });

  // ── DockItem.ariaLabel API ────────────────────────────────────────────────

  describe('DockItem.ariaLabel type field', (): void => {
    it('DockItem accepts ariaLabel property', (): void => {
      const item: DockItem = {
        label: 'Home tooltip',
        ariaLabel: 'Go to home page',
        icon: 'lucideAlertCircle',
        command: (): void => {},
      };
      expect(item.ariaLabel).toBe('Go to home page');
    });
  });
});
