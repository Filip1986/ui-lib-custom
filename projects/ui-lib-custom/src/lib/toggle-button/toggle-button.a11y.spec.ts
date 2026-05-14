import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideUiLibIcons } from 'ui-lib-custom/icon';
import { ToggleButton } from './toggle-button';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button onLabel="On" offLabel="Off" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button [pressed]="true" onLabel="On" offLabel="Off" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PressedHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `
    <ui-lib-toggle-button
      onLabel=""
      offLabel=""
      onIcon="heart"
      offIcon="heart"
      ariaLabel="Favorite"
      [pressed]="pressed()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconOnlyWithLabelHostComponent {
  public readonly pressed: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button onLabel="" offLabel="" onIcon="heart" offIcon="heart" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconOnlyWithoutLabelHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button [disabled]="true" onLabel="On" offLabel="Off" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button ariaLabelledBy="external-label" onLabel="On" offLabel="Off" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AriaLabelledByHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button ariaLabel="   " onLabel="On" offLabel="Off" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyAriaLabelHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `
    <div role="group" aria-label="Formatting toggles">
      <ui-lib-toggle-button onLabel="Bold on" offLabel="Bold off" [pressed]="true" />
      <ui-lib-toggle-button onLabel="Italic on" offLabel="Italic off" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GroupUsageHostComponent {}

function getButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement;
}

async function createFixture<T>(hostType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostType],
    providers: [provideZonelessChangeDetection(), provideUiLibIcons()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

describe('ToggleButton Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-toggle-button').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
  });

  it('sets aria-pressed="false" when not pressed', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).getAttribute('aria-pressed')).toBe('false');
  });

  it('sets aria-pressed="true" when pressed', async (): Promise<void> => {
    const fixture: ComponentFixture<PressedHostComponent> =
      await createFixture(PressedHostComponent);
    expect(getButton(fixture).getAttribute('aria-pressed')).toBe('true');
  });

  it('does not set aria-checked on the button', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).getAttribute('aria-checked')).toBeNull();
  });

  it('uses type=button', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).getAttribute('type')).toBe('button');
  });

  it('icon-only mode uses aria-label when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<IconOnlyWithLabelHostComponent> = await createFixture(
      IconOnlyWithLabelHostComponent
    );
    const button: HTMLButtonElement = getButton(fixture);
    expect(button.getAttribute('aria-label')).toBe('Favorite');
    expect(button.querySelector('.ui-lib-toggle-button__label')).toBeNull();
  });

  it('icon-only mode without aria-label logs a dev-mode error', async (): Promise<void> => {
    const errorSpy: jest.SpyInstance = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {});
    const fixture: ComponentFixture<IconOnlyWithoutLabelHostComponent> = await createFixture(
      IconOnlyWithoutLabelHostComponent
    );
    expect(fixture).toBeTruthy();
    expect(errorSpy).toHaveBeenCalledWith(
      '[ui-lib-toggle-button] ariaLabel is required when the toggle button renders icon-only content.'
    );
    errorSpy.mockRestore();
  });

  it('icon-only mode without aria-label leaves aria-label unset', async (): Promise<void> => {
    const errorSpy: jest.SpyInstance = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {});
    const fixture: ComponentFixture<IconOnlyWithoutLabelHostComponent> = await createFixture(
      IconOnlyWithoutLabelHostComponent
    );
    expect(getButton(fixture).getAttribute('aria-label')).toBeNull();
    errorSpy.mockRestore();
  });

  it('disabled state sets native disabled=true', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).disabled).toBe(true);
  });

  it('disabled state renders disabled attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).hasAttribute('disabled')).toBe(true);
  });

  it('disabled state removes button from keyboard tab order', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).getAttribute('tabindex')).toBe('-1');
  });

  it('enabled state does not render disabled attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).hasAttribute('disabled')).toBe(false);
  });

  it('applies aria-labelledby when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<AriaLabelledByHostComponent> = await createFixture(
      AriaLabelledByHostComponent
    );
    expect(getButton(fixture).getAttribute('aria-labelledby')).toBe('external-label');
  });

  it('treats whitespace-only ariaLabel as unset', async (): Promise<void> => {
    const fixture: ComponentFixture<EmptyAriaLabelHostComponent> = await createFixture(
      EmptyAriaLabelHostComponent
    );
    expect(getButton(fixture).getAttribute('aria-label')).toBeNull();
  });

  it('supports grouped usage with role=group', async (): Promise<void> => {
    const fixture: ComponentFixture<GroupUsageHostComponent> =
      await createFixture(GroupUsageHostComponent);
    const group: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="group"]'
    );
    expect(group).not.toBeNull();
    expect(group?.getAttribute('aria-label')).toBe('Formatting toggles');
  });

  it('grouped buttons expose aria-pressed state', async (): Promise<void> => {
    const fixture: ComponentFixture<GroupUsageHostComponent> =
      await createFixture(GroupUsageHostComponent);
    const buttons: NodeListOf<HTMLButtonElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false');
  });

  it('axe: default state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: pressed state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<PressedHostComponent> =
      await createFixture(PressedHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: icon-only with aria-label passes', async (): Promise<void> => {
    const fixture: ComponentFixture<IconOnlyWithLabelHostComponent> = await createFixture(
      IconOnlyWithLabelHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: disabled state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: grouped usage passes', async (): Promise<void> => {
    const fixture: ComponentFixture<GroupUsageHostComponent> =
      await createFixture(GroupUsageHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
