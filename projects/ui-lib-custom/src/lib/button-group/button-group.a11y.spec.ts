import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Button } from '../button/button';
import { ButtonGroup } from './button-group';

@Component({
  standalone: true,
  imports: [ButtonGroup, Button],
  template: `
    <ui-lib-button-group ariaLabel="Formatting actions">
      <ui-lib-button>Bold</ui-lib-button>
      <ui-lib-button>Italic</ui-lib-button>
    </ui-lib-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LabeledButtonsHost {}

@Component({
  standalone: true,
  imports: [ButtonGroup, Button],
  template: `
    <ui-lib-button-group>
      <ui-lib-button>Cut</ui-lib-button>
      <ui-lib-button>Copy</ui-lib-button>
    </ui-lib-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NoGroupLabelHost {}

@Component({
  standalone: true,
  imports: [ButtonGroup, Button],
  template: `
    <ui-lib-button-group ariaLabel="Editor actions">
      <ui-lib-button iconOnly="true" icon="save" ariaLabel="Save"></ui-lib-button>
      <ui-lib-button iconOnly="true" icon="trash" ariaLabel="Delete"></ui-lib-button>
    </ui-lib-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconOnlyButtonsHost {}

@Component({
  standalone: true,
  imports: [ButtonGroup, Button],
  template: `
    <ui-lib-button-group ariaLabel="Stacked actions" orientation="vertical">
      <ui-lib-button>Up</ui-lib-button>
      <ui-lib-button>Down</ui-lib-button>
    </ui-lib-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class VerticalHost {}

@Component({
  standalone: true,
  imports: [ButtonGroup],
  template: `<ui-lib-button-group />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyGroupHost {}

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

function getGroupElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-button-group__group',
  ) as HTMLElement;
}

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-button-group') as HTMLElement;
}

function getRequiredButton(buttons: HTMLButtonElement[], index: number): HTMLButtonElement {
  const button: HTMLButtonElement | undefined = buttons[index];
  if (!button) {
    throw new Error(`Expected button at index ${index}.`);
  }
  return button;
}

describe('ButtonGroup Accessibility', (): void => {
  let consoleWarnSpy: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]]>;

  beforeEach((): void => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation((): void => {});
  });

  afterEach((): void => {
    consoleWarnSpy.mockRestore();
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe checks for labeled buttons', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledButtonsHost> = await setup(LabeledButtonsHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('group semantics', (): void => {
    it('container has role="group"', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledButtonsHost> = await setup(LabeledButtonsHost);
      expect(getGroupElement(fixture).getAttribute('role')).toBe('group');
    });

    it('container receives aria-label when ariaLabel is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledButtonsHost> = await setup(LabeledButtonsHost);
      expect(getGroupElement(fixture).getAttribute('aria-label')).toBe('Formatting actions');
    });

    it('container has no aria-label when ariaLabel is omitted', async (): Promise<void> => {
      const fixture: ComponentFixture<NoGroupLabelHost> = await setup(NoGroupLabelHost);
      expect(getGroupElement(fixture).getAttribute('aria-label')).toBeNull();
    });

    it('default orientation keeps horizontal layout class unset', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledButtonsHost> = await setup(LabeledButtonsHost);
      expect(
        getHostElement(fixture).classList.contains('ui-lib-button-group--vertical'),
      ).toBeFalsy();
    });

    it('vertical orientation adds vertical host class', async (): Promise<void> => {
      const fixture: ComponentFixture<VerticalHost> = await setup(VerticalHost);
      expect(
        getHostElement(fixture).classList.contains('ui-lib-button-group--vertical'),
      ).toBeTruthy();
    });
  });

  describe('individual button accessible names', (): void => {
    it('text buttons keep their own accessible text labels', async (): Promise<void> => {
      const fixture: ComponentFixture<LabeledButtonsHost> = await setup(LabeledButtonsHost);
      const buttons: HTMLButtonElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
      );
      expect(getRequiredButton(buttons, 0).textContent.trim()).toBe('Bold');
      expect(getRequiredButton(buttons, 1).textContent.trim()).toBe('Italic');
    });

    it('icon-only buttons retain individual aria-labels', async (): Promise<void> => {
      const fixture: ComponentFixture<IconOnlyButtonsHost> = await setup(IconOnlyButtonsHost);
      const buttons: HTMLButtonElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
      );
      expect(getRequiredButton(buttons, 0).getAttribute('aria-label')).toBe('Save');
      expect(getRequiredButton(buttons, 1).getAttribute('aria-label')).toBe('Delete');
    });
  });

  describe('developer warning for unlabeled groups', (): void => {
    it('warns in dev mode when projected content exists and ariaLabel is missing', async (): Promise<void> => {
      consoleWarnSpy.mockClear();
      await setup(NoGroupLabelHost);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[ui-lib-button-group] Missing ariaLabel. Provide ariaLabel when grouping related actions for assistive technologies.',
      );
    });

    it('does not warn when ariaLabel is provided', async (): Promise<void> => {
      consoleWarnSpy.mockClear();
      await setup(LabeledButtonsHost);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('does not warn when group has no projected content', async (): Promise<void> => {
      consoleWarnSpy.mockClear();
      await setup(EmptyGroupHost);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });
});
