import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';

import { IconButton } from './icon-button';

describe('IconButton', (): void => {
  let fixture: ComponentFixture<IconButton>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [IconButton],
      providers: [provideIcons({ lucideAlertCircle })],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButton);
    fixture.componentRef.setInput('icon', 'lucideAlertCircle');
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('creates with namespaced base classes', (): void => {
    const host: HTMLElement = hostEl();
    expect(host.classList.contains('ui-lib-icon-button')).toBeTruthy();
    expect(host.className).toContain('ui-lib-icon-button--material');
    expect(host.className).toContain('ui-lib-icon-button--size-md');
  });

  it('applies disabled modifier and aria-disabled', (): void => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const host: HTMLElement = hostEl();
    expect(host.classList.contains('ui-lib-icon-button--disabled')).toBeTruthy();
    expect(host.getAttribute('aria-disabled')).toBe('true');
  });

  it('applies color and size modifiers', (): void => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();

    const host: HTMLElement = hostEl();
    expect(host.className).toContain('ui-lib-icon-button--size-lg');
    expect(host.className).toContain('ui-lib-icon-button--color-danger');
  });

  it('renders namespaced icon element class', (): void => {
    const iconEl: HTMLElement | null = hostEl().querySelector('.ui-lib-icon-button__icon');
    expect(iconEl).toBeTruthy();
  });
});
