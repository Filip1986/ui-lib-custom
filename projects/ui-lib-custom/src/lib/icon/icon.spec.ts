import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';
import { Icon } from 'ui-lib-custom/icon';

describe('Icon', () => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prefixes library names when missing', () => {
    expect(component.resolvedName()).toBe('lucideAlertCircle');
  });

  it('keeps explicit prefixed names', () => {
    fixture.componentRef.setInput('library', 'lucide');
    fixture.componentRef.setInput('name', 'lucideAlertCircle');
    fixture.detectChanges();

    expect(component.resolvedName()).toBe('lucideAlertCircle');
  });

  it('maps sizes using token mapping', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(component.resolvedSize()).toBe('1.5rem');
  });

  it('marks clickable host class', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ui-lib-icon--clickable')).toBeTruthy();
  });

  it('sets role, tabindex, and aria-label when clickable', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('ariaLabel', 'Close');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('button');
    expect(host.getAttribute('tabindex')).toBe('0');
    expect(host.getAttribute('aria-label')).toBe('Close');
  });

  it('activates click on Enter key when clickable', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const clickSpy: jasmine.Spy = spyOn(host, 'click');
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(clickSpy).toHaveBeenCalled();
  });

  it('applies dark theme variables', () => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(root).getPropertyValue('--uilib-icon-color').trim();

    root.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(root).getPropertyValue('--uilib-icon-color').trim();

    expect(dark).not.toBe(light);
    root.removeAttribute('data-theme');
  });
});
