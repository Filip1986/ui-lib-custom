import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { provideUiLibIcons } from 'ui-lib-custom/icon';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { IconButton } from './icon-button';

@Component({
  standalone: true,
  imports: [IconButton],
  template: `<ui-lib-icon-button icon="settings" ariaLabel="Open settings" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [IconButton],
  template: `<ui-lib-icon-button icon="settings" ariaLabel="Open settings" [disabled]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {}

@Component({
  standalone: true,
  imports: [IconButton],
  template: `<ui-lib-icon-button icon="refresh" ariaLabel="Refresh data" [loading]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoadingHostComponent {}

@Component({
  standalone: true,
  imports: [IconButton],
  template: `<ui-lib-icon-button icon="edit" ariaLabel="" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyLabelHostComponent {}

@Component({
  standalone: true,
  imports: [IconButton],
  template: `<ui-lib-icon-button icon="settings" ariaLabel="Open settings" size="sm" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SmHostComponent {}

@Component({
  standalone: true,
  imports: [IconButton],
  template: `<ui-lib-icon-button icon="settings" ariaLabel="Open settings" size="lg" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LgHostComponent {}

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

function getButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement;
}

function getIcon(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-icon') as HTMLElement;
}

describe('IconButton Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-icon-button').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
    jest.restoreAllMocks();
  });

  it('uses the provided aria-label on the native button', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Open settings');
  });

  it('renders a native button element', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).tagName).toBe('BUTTON');
  });

  it('sets type="button" by default', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).getAttribute('type')).toBe('button');
  });

  it('keeps enabled buttons keyboard discoverable', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).disabled).toBe(false);
    expect(getButton(fixture).tabIndex).toBe(0);
  });

  it('marks the inner icon as aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getIcon(fixture).getAttribute('aria-hidden')).toBe('true');
  });

  it('does not expose aria-busy when not loading', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).getAttribute('aria-busy')).toBeNull();
  });

  it('applies the native disabled attribute when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).disabled).toBe(true);
  });

  it('mirrors disabled state with aria-disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('removes disabled buttons from normal keyboard interaction via native disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).hasAttribute('disabled')).toBe(true);
  });

  it('announces loading state through the aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Loading, please wait');
  });

  it('marks the button busy while loading', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).getAttribute('aria-busy')).toBe('true');
  });

  it('disables the native button while loading', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).disabled).toBe(true);
  });

  it('mirrors loading state with aria-disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('logs a development error when ariaLabel is empty', async (): Promise<void> => {
    const consoleErrorSpy: jest.SpyInstance = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {});

    await createFixture(EmptyLabelHostComponent);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[ui-lib-icon-button] ariaLabel must not be empty for accessibility.',
    );
  });

  it('does not log a development error when ariaLabel is present', async (): Promise<void> => {
    const consoleErrorSpy: jest.SpyInstance = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {});

    await createFixture(DefaultHostComponent);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('axe: default state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: disabled state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: loading state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('renders a button element for sm size', async (): Promise<void> => {
    const fixture: ComponentFixture<SmHostComponent> = await createFixture(SmHostComponent);
    expect(getButton(fixture).tagName).toBe('BUTTON');
  });

  it('renders a button element for md size (default)', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    expect(getButton(fixture).tagName).toBe('BUTTON');
  });

  it('renders a button element for lg size', async (): Promise<void> => {
    const fixture: ComponentFixture<LgHostComponent> = await createFixture(LgHostComponent);
    expect(getButton(fixture).tagName).toBe('BUTTON');
  });
});
