import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { provideUiLibIcons } from 'ui-lib-custom/icon';
import { IconButton } from './icon-button';

describe('IconButton', (): void => {
  let fixture: ComponentFixture<IconButton>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [IconButton],
      providers: [provideZonelessChangeDetection(), provideUiLibIcons()],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButton);
    fixture.componentRef.setInput('icon', 'settings');
    fixture.componentRef.setInput('ariaLabel', 'Settings');
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function buttonEl(): HTMLButtonElement {
    return hostEl().querySelector('button') as HTMLButtonElement;
  }

  it('creates with namespaced base classes', (): void => {
    const button: HTMLButtonElement = buttonEl();
    expect(button.classList.contains('ui-lib-icon-button')).toBeTruthy();
    expect(button.className).toContain('ui-lib-icon-button--material');
    expect(button.className).toContain('ui-lib-icon-button--size-md');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('applies disabled modifier and native disabled attributes', (): void => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = buttonEl();
    expect(button.classList.contains('ui-lib-icon-button--disabled')).toBeTruthy();
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.disabled).toBe(true);
  });

  it('applies color and size modifiers', (): void => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();

    const button: HTMLButtonElement = buttonEl();
    expect(button.className).toContain('ui-lib-icon-button--size-lg');
    expect(button.className).toContain('ui-lib-icon-button--color-danger');
  });

  it('renders namespaced icon element class with aria-hidden', (): void => {
    const iconEl: HTMLElement | null = hostEl().querySelector('.ui-lib-icon-button__icon');
    expect(iconEl).toBeTruthy();
    expect(iconEl?.getAttribute('aria-hidden')).toBe('true');
  });

  it('switches to loading semantics and spinner icon', (): void => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = buttonEl();
    expect(button.className).toContain('ui-lib-icon-button--loading');
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('aria-label')).toBe('Loading, please wait');
    expect(button.disabled).toBe(true);
  });

  it('logs a development error when ariaLabel is empty', (): void => {
    const consoleErrorSpy: jest.SpyInstance = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {});

    const emptyLabelFixture: ComponentFixture<IconButton> = TestBed.createComponent(IconButton);
    emptyLabelFixture.componentRef.setInput('icon', 'settings');
    emptyLabelFixture.componentRef.setInput('ariaLabel', '');
    emptyLabelFixture.detectChanges();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[ui-lib-icon-button] ariaLabel must not be empty for accessibility.',
    );

    consoleErrorSpy.mockRestore();
  });
});
