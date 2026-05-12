import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Divider } from './divider';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Divider],
  template: `<ui-lib-divider />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultDividerHost {}

@Component({
  standalone: true,
  imports: [Divider],
  template: `<ui-lib-divider orientation="vertical" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class VerticalDividerHost {}

@Component({
  standalone: true,
  imports: [Divider],
  template: `<ui-lib-divider [decorative]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DecorativeDividerHost {}

@Component({
  standalone: true,
  imports: [Divider],
  template: `<ui-lib-divider ariaLabel="Section divider">OR</ui-lib-divider>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LabeledDividerHost {}

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

function getDivider(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-divider') as HTMLElement;
}

describe('Divider Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  describe('axe-core', (): void => {
    it('default divider has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDividerHost> = await setup(DefaultDividerHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('vertical divider has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<VerticalDividerHost> = await setup(VerticalDividerHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('decorative divider has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeDividerHost> = await setup(DecorativeDividerHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('labeled divider has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledDividerHost> = await setup(LabeledDividerHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('ARIA semantics', (): void => {
    it('uses role="separator"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDividerHost> = await setup(DefaultDividerHost);
      expect(getDivider(fixture).getAttribute('role')).toBe('separator');
    });

    it('defaults to horizontal orientation', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDividerHost> = await setup(DefaultDividerHost);
      expect(getDivider(fixture).getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('sets vertical orientation when configured', async (): Promise<void> => {
      const fixture: ComponentFixture<VerticalDividerHost> = await setup(VerticalDividerHost);
      expect(getDivider(fixture).getAttribute('aria-orientation')).toBe('vertical');
    });

    it('hides decorative divider from accessibility tree', async (): Promise<void> => {
      const fixture: ComponentFixture<DecorativeDividerHost> = await setup(DecorativeDividerHost);
      expect(getDivider(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-label for labeled divider', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledDividerHost> = await setup(LabeledDividerHost);
      expect(getDivider(fixture).getAttribute('aria-label')).toBe('Section divider');
      expect(getDivider(fixture).getAttribute('aria-hidden')).toBeNull();
    });

    it('assigns a unique generated host id', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDividerHost> = await setup(DefaultDividerHost);
      expect(getDivider(fixture).getAttribute('id')).toMatch(/^ui-lib-divider-\d+$/);
    });
  });

  describe('keyboard and announcements', (): void => {
    it('is not keyboard-focusable by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDividerHost> = await setup(DefaultDividerHost);
      expect(getDivider(fixture).tabIndex).toBe(-1);
    });

    it('does not expose live-region announcements', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultDividerHost> = await setup(DefaultDividerHost);
      expect(getDivider(fixture).getAttribute('aria-live')).toBeNull();
    });
  });
});
