import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideBadgeX, lucideBan } from '@ng-icons/lucide';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Icon } from './icon';

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon name="alert-circle" library="lucide" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DecorativeIconHost {}

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon name="alert-circle" library="lucide" ariaLabel="Alert status" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InformativeIconHost {}

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon name="alert-circle" library="lucide" ariaLabel="   " />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BlankLabelIconHost {}

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon name="alert-circle" library="lucide" [clickable]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ClickableIconHost {}

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon
    name="alert-circle"
    library="lucide"
    [clickable]="true"
    ariaLabel="Close"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ClickableInformativeIconHost {}

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon name="close" library="lucide" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CloseSemanticIconHost {}

@Component({
  standalone: true,
  imports: [Icon],
  template: `<ui-lib-icon name="trash" library="lucide" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TrashAliasIconHost {}

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [
      provideZonelessChangeDetection(),
      provideIcons({ lucideAlertCircle, lucideBadgeX, lucideBan }),
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-icon') as HTMLElement;
}

function getGlyph(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ng-icon') as HTMLElement;
}

describe('Icon Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  describe('axe-core', (): void => {
    it('decorative icon has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeIconHost> = await setup(DecorativeIconHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('informative icon has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconHost> = await setup(InformativeIconHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('blank ariaLabel icon (treated as decorative) has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<BlankLabelIconHost> = await setup(BlankLabelIconHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('ARIA semantics', (): void => {
    it('is aria-hidden by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeIconHost> = await setup(DecorativeIconHost);
      expect(getHost(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('does not expose an accessible name by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeIconHost> = await setup(DecorativeIconHost);
      expect(getHost(fixture).getAttribute('aria-label')).toBeNull();
      expect(getHost(fixture).getAttribute('role')).toBeNull();
    });

    it('uses role="img" when ariaLabel is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconHost> = await setup(InformativeIconHost);
      expect(getHost(fixture).getAttribute('role')).toBe('img');
    });

    it('uses the provided ariaLabel and removes aria-hidden when informative', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconHost> = await setup(InformativeIconHost);
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Alert status');
      expect(getHost(fixture).getAttribute('aria-hidden')).toBeNull();
    });

    it('treats blank ariaLabel values as decorative', async (): Promise<void> => {
      const fixture: ComponentFixture<BlankLabelIconHost> = await setup(BlankLabelIconHost);
      expect(getHost(fixture).getAttribute('aria-label')).toBeNull();
      expect(getHost(fixture).getAttribute('role')).toBeNull();
      expect(getHost(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('treats whitespace-only ariaLabel as decorative (trims to empty)', async (): Promise<void> => {
      const fixture: ComponentFixture<BlankLabelIconHost> = await setup(BlankLabelIconHost);
      const host: HTMLElement = getHost(fixture);
      // whitespace-only ariaLabel must not produce an accessible name
      expect(host.getAttribute('aria-label')).toBeNull();
      expect(host.getAttribute('aria-hidden')).toBe('true');
    });

    it('keeps the inner ng-icon glyph hidden from assistive technology in informative mode', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconHost> = await setup(InformativeIconHost);
      expect(getGlyph(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('keeps the inner ng-icon glyph hidden from assistive technology in decorative mode', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeIconHost> = await setup(DecorativeIconHost);
      expect(getGlyph(fixture).getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('focus behavior', (): void => {
    it('is not keyboard-focusable by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeIconHost> = await setup(DecorativeIconHost);
      expect(getHost(fixture).getAttribute('tabindex')).toBe('-1');
      expect(getHost(fixture).tabIndex).toBe(-1);
    });

    it('is not keyboard-focusable in informative mode', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconHost> = await setup(InformativeIconHost);
      expect(getHost(fixture).getAttribute('tabindex')).toBe('-1');
      expect(getHost(fixture).tabIndex).toBe(-1);
    });

    it('never becomes focusable when clickable is set', async (): Promise<void> => {
      const fixture: ComponentFixture<ClickableIconHost> = await setup(ClickableIconHost);
      expect(getHost(fixture).getAttribute('tabindex')).toBe('-1');
      expect(getHost(fixture).tabIndex).toBe(-1);
      expect(getHost(fixture).getAttribute('role')).toBeNull();
    });
  });

  describe('DEV mode warnings', (): void => {
    it('logs a warning when clickable=true without ariaLabel', async (): Promise<void> => {
      const warnSpy: jest.SpyInstance = jest
        .spyOn(console, 'warn')
        .mockImplementation((): void => {});
      await setup(ClickableIconHost);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[ui-lib-icon]'));
      warnSpy.mockRestore();
    });

    it('does not log a warning when clickable=true with ariaLabel provided', async (): Promise<void> => {
      const warnSpy: jest.SpyInstance = jest
        .spyOn(console, 'warn')
        .mockImplementation((): void => {});
      await setup(ClickableInformativeIconHost);
      expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('[ui-lib-icon]'));
      warnSpy.mockRestore();
    });
  });

  describe('semantic name resolution', (): void => {
    it('renders the semantic "close" icon without error', async (): Promise<void> => {
      const fixture: ComponentFixture<CloseSemanticIconHost> = await setup(CloseSemanticIconHost);
      expect(getHost(fixture)).toBeTruthy();
      expect(getGlyph(fixture)).toBeTruthy();
    });

    it('resolves the "trash" alias to the "delete" semantic icon without error', async (): Promise<void> => {
      const fixture: ComponentFixture<TrashAliasIconHost> = await setup(TrashAliasIconHost);
      expect(getHost(fixture)).toBeTruthy();
      expect(getGlyph(fixture)).toBeTruthy();
    });
  });
});
