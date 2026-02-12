import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAudioWaveform } from '@ng-icons/lucide';

import { Button } from './button';
import { Icon } from '../icon/icon';
import { Badge } from '../badge/badge';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button, Icon, Badge],
      providers: [provideIcons({ lucideAudioWaveform })],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');
  const getBadge = (): HTMLElement | null => fixture.nativeElement.querySelector('ui-lib-badge');

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies classes from inputs', () => {
    fixture.componentRef.setInput('variant', 'bootstrap');
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('severity', 'danger');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    const btn = getButton();
    expect(btn.className).toContain('btn-bootstrap');
    expect(btn.className).toContain('btn-large');
    expect(btn.className).toContain('btn-danger');
    expect(btn.className).toContain('btn-appearance-outline');
  });

  it('disables and sets aria state when disabled or loading', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let btn = getButton();
    expect(btn.disabled).toBeTrue();
    expect(btn.getAttribute('aria-disabled')).toBe('true');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    btn = getButton();
    expect(btn.disabled).toBeTrue();
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('renders spinner when loading with custom icon', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingIcon', 'lucideAudioWaveform');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.btn-icon--loading');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('ng-reflect-name')).toContain('lucideAudioWaveform');
  });

  describe('New modifiers', () => {
    it('applies btn-raised class when raised is true', () => {
      fixture.componentRef.setInput('raised', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-raised')).toBeTrue();
    });

    it('applies btn-rounded class when rounded is true', () => {
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-rounded')).toBeTrue();
    });

    it('applies btn-text class when text is true', () => {
      fixture.componentRef.setInput('text', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-text')).toBeTrue();
    });

    it('applies btn-link class when link is true', () => {
      fixture.componentRef.setInput('link', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-link')).toBeTrue();
    });
  });

  describe('Modifier combinations', () => {
    it('applies raised and rounded together', () => {
      fixture.componentRef.setInput('raised', true);
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.classList.contains('btn-raised')).toBeTrue();
      expect(btn.classList.contains('btn-rounded')).toBeTrue();
    });

    it('applies text and rounded together', () => {
      fixture.componentRef.setInput('text', true);
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.classList.contains('btn-text')).toBeTrue();
      expect(btn.classList.contains('btn-rounded')).toBeTrue();
    });

    it('applies outlined and rounded together', () => {
      fixture.componentRef.setInput('outlined', true);
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.classList.contains('btn-outlined')).toBeTrue();
      expect(btn.classList.contains('btn-rounded')).toBeTrue();
    });
  });

  describe('Badge integration', () => {
    it('renders badge with string content', () => {
      fixture.componentRef.setInput('badge', '3');
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-has-badge')).toBeTrue();
      expect(getBadge()).toBeTruthy();
      expect(getBadge()?.textContent?.trim()).toBe('3');
    });

    it('renders badge with number content', () => {
      fixture.componentRef.setInput('badge', 7);
      fixture.detectChanges();

      expect(getBadge()?.textContent?.trim()).toBe('7');
    });

    it('hides badge when null or undefined', () => {
      fixture.componentRef.setInput('badge', null);
      fixture.detectChanges();

      expect(getBadge()).toBeNull();

      fixture.componentRef.setInput('badge', undefined as unknown as number);
      fixture.detectChanges();

      expect(getBadge()).toBeNull();
    });

    it('applies badge color class', () => {
      fixture.componentRef.setInput('badge', '1');
      fixture.componentRef.setInput('badgeColor', 'info');
      fixture.detectChanges();

      expect(getBadge()?.classList.contains('badge-color-info')).toBeTrue();
    });
  });

  describe('Backward compatibility defaults', () => {
    it('keeps default classes for variant, size, severity, and appearance', () => {
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.className).toContain('btn-material');
      expect(btn.className).toContain('btn-medium');
      expect(btn.className).toContain('btn-primary');
      expect(btn.className).toContain('btn-appearance-solid');
    });
  });

  describe('Accessibility', () => {
    it('sets aria-disabled and aria-busy appropriately', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      let btn = getButton();
      expect(btn.getAttribute('aria-disabled')).toBe('true');

      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      btn = getButton();
      expect(btn.getAttribute('aria-busy')).toBe('true');
    });

    it('renders focusable button with type attribute', () => {
      fixture.detectChanges();
      const btn = getButton();
      expect(btn.getAttribute('type')).toBe('button');
      expect(btn.tabIndex).toBe(0);
    });
  });
});
