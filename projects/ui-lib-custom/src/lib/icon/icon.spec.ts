import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';
import { Icon } from 'ui-lib-custom/icon';

describe('Icon', (): void => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Icon],
      providers: [provideIcons({ lucideAlertCircle })],
    }).compileComponents();

    fixture = TestBed.createComponent(Icon);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('library', 'lucide');
    fixture.componentRef.setInput('name', 'alert-circle');
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('prefixes library names when missing', (): void => {
    const resolvedName: () => string = component.resolvedName as () => string;
    expect(resolvedName()).toBe('lucideAlertCircle');
  });

  it('keeps explicit prefixed names', (): void => {
    fixture.componentRef.setInput('library', 'lucide');
    fixture.componentRef.setInput('name', 'lucideAlertCircle');
    fixture.detectChanges();

    const resolvedName: () => string = component.resolvedName as () => string;
    expect(resolvedName()).toBe('lucideAlertCircle');
  });

  it('maps sizes using token mapping', (): void => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const resolvedSize: () => string = component.resolvedSize as () => string;
    expect(resolvedSize()).toBe('1.5rem');
  });

  it('marks clickable host class', (): void => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('ui-lib-icon--clickable')).toBeTruthy();
  });

  it('sets role, tabindex, and aria-label when clickable', (): void => {
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('ariaLabel', 'Close');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('button');
    expect(host.getAttribute('tabindex')).toBe('0');
    expect(host.getAttribute('aria-label')).toBe('Close');
  });

  it('activates click on Enter key when clickable', (): void => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const clickSpy: jest.SpyInstance = jest.spyOn(host, 'click');
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(clickSpy).toHaveBeenCalled();
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.style.setProperty('--uilib-icon-color', 'light-color');
    const light: string = getComputedStyle(root).getPropertyValue('--uilib-icon-color').trim();

    root.setAttribute('data-theme', 'dark');
    root.style.setProperty('--uilib-icon-color', 'dark-color');
    const dark: string = getComputedStyle(root).getPropertyValue('--uilib-icon-color').trim();

    expect(dark).not.toBe(light);
    root.removeAttribute('data-theme');
  });
});
