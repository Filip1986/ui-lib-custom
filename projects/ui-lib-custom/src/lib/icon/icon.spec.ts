import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideAlignHorizontalSpaceAround } from '@ng-icons/lucide';

import { Icon } from 'ui-lib-custom/icon';

describe('Icon', (): void => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Icon],
      providers: [
        provideZonelessChangeDetection(),
        provideIcons({ lucideAlertCircle, lucideAlignHorizontalSpaceAround }),
      ],
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

  it('maps more-horizontal alias to semantic more icon', (): void => {
    fixture.componentRef.setInput('library', 'lucide');
    fixture.componentRef.setInput('name', 'more-horizontal');
    fixture.detectChanges();

    const resolvedName: () => string = component.resolvedName as () => string;
    expect(resolvedName()).toBe('lucideAlignHorizontalSpaceAround');
  });

  it('maps sizes using token mapping', (): void => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const resolvedSize: () => string = component.resolvedSize as () => string;
    expect(resolvedSize()).toBe('1.25em');
  });

  it('defaults to a decorative aria-hidden icon', (): void => {
    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.getAttribute('role')).toBeNull();
  });

  it('sets informative semantics when ariaLabel is provided', (): void => {
    fixture.componentRef.setInput('ariaLabel', 'Close');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-hidden')).toBeNull();
    expect(host.getAttribute('aria-label')).toBe('Close');
  });

  it('trims blank ariaLabel values back to decorative mode', (): void => {
    fixture.componentRef.setInput('ariaLabel', '   ');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.getAttribute('role')).toBeNull();
  });

  it('never becomes keyboard-focusable even when clickable is requested', (): void => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('tabindex')).toBe('-1');
    expect(host.tabIndex).toBe(-1);
    expect(host.getAttribute('role')).toBeNull();
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

  it('renders namespaced glyph element class', (): void => {
    const glyph: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-icon__glyph',
    );
    expect(glyph).toBeTruthy();
  });

  it('binds color input to the host CSS variable token', (): void => {
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const token: string = host.style.getPropertyValue('--uilib-icon-color').trim();
    expect(token).toBe('#ff0000');
  });
});
