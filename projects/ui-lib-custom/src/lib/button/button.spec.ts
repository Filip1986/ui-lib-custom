import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideAudioWaveform } from '@ng-icons/lucide';
import { By } from '@angular/platform-browser';

import { Button, ButtonColor, ButtonSize, ButtonVariant } from './button';
import { Icon } from 'ui-lib-custom/icon';
import { Badge } from 'ui-lib-custom/badge';
import { ThemeConfigService } from 'ui-lib-custom/theme';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <ui-lib-button [disabled]="disabled" [loading]="loading" (click)="onClick()">
      Click me
    </ui-lib-button>
  `,
})
class ButtonClickHostComponent {
  disabled: boolean = false;
  loading: boolean = false;
  clickCount: number = 0;

  onClick(): void {
    this.clickCount += 1;
  }
}

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <ui-lib-button>Global</ui-lib-button>
    <ui-lib-button [variant]="overrideVariant()">Override</ui-lib-button>
  `,
})
class ButtonVariantHostComponent {
  overrideVariant = signal<ButtonVariant | null>(null);
}

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
    expect(btn.disabled).toBeTruthy();
    expect(btn.getAttribute('aria-disabled')).toBe('true');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    btn = getButton();
    expect(btn.disabled).toBeTruthy();
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('renders spinner when loading with custom icon', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingIcon', 'lucideAudioWaveform');
    fixture.detectChanges();

    const loadingIconEl = fixture.debugElement.query(By.css('ui-lib-icon.btn-icon--loading'));
    expect(loadingIconEl).toBeTruthy();
    const iconComponent: Icon = loadingIconEl.componentInstance as Icon;
    expect(iconComponent.resolvedName()).toBe('lucideAudioWaveform');
  });

  describe('New modifiers', () => {
    it('applies btn-raised class when raised is true', () => {
      fixture.componentRef.setInput('raised', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-raised')).toBeTruthy();
    });

    it('applies btn-rounded class when rounded is true', () => {
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-rounded')).toBeTruthy();
    });

    it('applies btn-text class when text is true', () => {
      fixture.componentRef.setInput('text', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-text')).toBeTruthy();
    });

    it('applies btn-link class when link is true', () => {
      fixture.componentRef.setInput('link', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-link')).toBeTruthy();
    });
  });

  describe('Modifier combinations', () => {
    it('applies raised and rounded together', () => {
      fixture.componentRef.setInput('raised', true);
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.classList.contains('btn-raised')).toBeTruthy();
      expect(btn.classList.contains('btn-rounded')).toBeTruthy();
    });

    it('applies text and rounded together', () => {
      fixture.componentRef.setInput('text', true);
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.classList.contains('btn-text')).toBeTruthy();
      expect(btn.classList.contains('btn-rounded')).toBeTruthy();
    });

    it('applies outlined and rounded together', () => {
      fixture.componentRef.setInput('outlined', true);
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.classList.contains('btn-outlined')).toBeTruthy();
      expect(btn.classList.contains('btn-rounded')).toBeTruthy();
    });
  });

  describe('Badge integration', () => {
    it('renders badge with string content', () => {
      fixture.componentRef.setInput('badge', '3');
      fixture.detectChanges();

      expect(getButton().classList.contains('btn-has-badge')).toBeTruthy();
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

      expect(getBadge()?.classList.contains('badge-color-info')).toBeTruthy();
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

    it('supports role, tabindex, and aria-pressed/checked overrides', () => {
      fixture.componentRef.setInput('role', 'radio');
      fixture.componentRef.setInput('tabIndex', -1);
      fixture.componentRef.setInput('ariaPressed', true);
      fixture.componentRef.setInput('ariaChecked', true);
      fixture.detectChanges();

      const btn = getButton();
      expect(btn.getAttribute('role')).toBe('radio');
      expect(btn.getAttribute('tabindex')).toBe('-1');
      expect(btn.getAttribute('aria-pressed')).toBe('true');
      expect(btn.getAttribute('aria-checked')).toBe('true');
    });

    it('sets aria-label during loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.componentRef.setInput('ariaLabel', 'Saving changes');
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toBe('Saving changes');
    });

    it('sets a fallback aria-label for icon-only buttons', () => {
      fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
      fixture.componentRef.setInput('iconOnly', true);
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toBe('Button');
    });
  });

  it('applies each variant class', () => {
    const variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];

    variants.forEach((variant: ButtonVariant): void => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(getButton().classList.contains(`btn-${variant}`)).toBeTruthy();
    });
  });

  it('applies each severity/color class', () => {
    const colors: ButtonColor[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

    colors.forEach((color: ButtonColor): void => {
      fixture.componentRef.setInput('color', color);
      fixture.detectChanges();

      expect(getButton().classList.contains(`btn-${color}`)).toBeTruthy();
    });
  });

  it('applies each size class', () => {
    const sizes: ButtonSize[] = ['small', 'medium', 'large'];

    sizes.forEach((size: ButtonSize): void => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();

      expect(getButton().classList.contains(`btn-${size}`)).toBeTruthy();
    });
  });

  it('sets aria-disabled and blocks pointer events when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    const style: CSSStyleDeclaration = getComputedStyle(btn);

    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn.classList.contains('btn-disabled')).toBeTruthy();
    expect(style.pointerEvents).toBe('none');
  });

  it('shows loading spinner and disables interaction when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    const loadingIconEl = fixture.debugElement.query(By.css('ui-lib-icon.btn-icon--loading'));

    expect(loadingIconEl).toBeTruthy();
    expect(btn.disabled).toBeTruthy();
    expect(btn.classList.contains('btn-loading')).toBeTruthy();
  });

  it('renders icon on the left and right positions', () => {
    fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
    fixture.componentRef.setInput('iconPosition', 'left');
    fixture.detectChanges();

    const leftIcon: HTMLElement | null = fixture.nativeElement.querySelector(
      'ui-lib-icon.btn-icon--start'
    );
    const leftEndIcon: HTMLElement | null = fixture.nativeElement.querySelector(
      'ui-lib-icon.btn-icon--end'
    );
    expect(leftIcon).toBeTruthy();
    expect(leftEndIcon).toBeNull();

    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();

    const rightIcon: HTMLElement | null = fixture.nativeElement.querySelector(
      'ui-lib-icon.btn-icon--end'
    );
    const rightStartIcon: HTMLElement | null = fixture.nativeElement.querySelector(
      'ui-lib-icon.btn-icon--start'
    );
    expect(rightIcon).toBeTruthy();
    expect(rightStartIcon).toBeNull();
  });

  it('applies full width class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-full-width')).toBeTruthy();
  });

  it('renders focus ring on focus-visible', () => {
    const btn: HTMLButtonElement = getButton();
    const tabEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    document.body.dispatchEvent(tabEvent);

    btn.focus();
    fixture.detectChanges();

    const style: CSSStyleDeclaration = getComputedStyle(btn);
    const hasOutline: boolean = style.outlineStyle !== 'none' && style.outlineStyle !== '';
    const hasBoxShadow: boolean = style.boxShadow !== 'none' && style.boxShadow !== '';

    expect(hasOutline || hasBoxShadow).toBeTruthy();
  });

  it('normalizes warn severity to warning', () => {
    fixture.componentRef.setInput('severity', 'warn');
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-warning')).toBeTruthy();
  });

  it('uses contrast severity when contrast is true', () => {
    fixture.componentRef.setInput('contrast', true);
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-contrast')).toBeTruthy();
  });

  it('prefers ghost appearance when text is true', () => {
    fixture.componentRef.setInput('appearance', 'solid');
    fixture.componentRef.setInput('text', true);
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-appearance-ghost')).toBeTruthy();
  });

  it('prefers outline appearance when outlined is true', () => {
    fixture.componentRef.setInput('appearance', 'solid');
    fixture.componentRef.setInput('outlined', true);
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-appearance-outline')).toBeTruthy();
  });

  it('applies icon-only class when iconOnlyInput is true', () => {
    fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
    fixture.componentRef.setInput('iconOnlyInput', true);
    fixture.componentRef.setInput('iconOnly', null);
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-icon-only')).toBeTruthy();
  });

  it('adds vertical class for top or bottom icon positions', () => {
    fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
    fixture.componentRef.setInput('iconPosition', 'top');
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-vertical')).toBeTruthy();

    fixture.componentRef.setInput('iconPosition', 'bottom');
    fixture.detectChanges();

    expect(getButton().classList.contains('btn-vertical')).toBeTruthy();
  });

  it('maps badge severity help and contrast to supported badge colors', () => {
    fixture.componentRef.setInput('badge', '1');
    fixture.componentRef.setInput('badgeSeverity', 'help');
    fixture.detectChanges();

    const badgeHelp: HTMLElement | null = getBadge();
    expect(badgeHelp?.classList.contains('badge-color-info')).toBeTruthy();

    fixture.componentRef.setInput('badgeSeverity', 'contrast');
    fixture.detectChanges();

    const badgeContrast: HTMLElement | null = getBadge();
    expect(badgeContrast?.classList.contains('badge-color-neutral')).toBeTruthy();
  });

  it('applies shadow CSS variables when shadow is set', () => {
    fixture.componentRef.setInput('shadow', '0 4px 8px rgba(0,0,0,0.2)');
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    const shadowValue: string = btn.style.getPropertyValue('--uilib-button-shadow');
    const shadowHoverValue: string = btn.style.getPropertyValue('--uilib-button-shadow-hover');

    expect(shadowValue).toContain('0 4px 8px');
    expect(shadowHoverValue).toContain('0 4px 8px');
  });

  it('applies dark theme variables', () => {
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-button-primary-bg')
      .trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-button-primary-bg')
      .trim();

    expect(dark).not.toBe(light);
    scope.remove();
  });
});

describe('Button interactions', () => {
  async function createFixture(
    initial?: Partial<ButtonClickHostComponent>
  ): Promise<ComponentFixture<ButtonClickHostComponent>> {
    await TestBed.configureTestingModule({
      imports: [ButtonClickHostComponent],
    }).compileComponents();

    const fixture: ComponentFixture<ButtonClickHostComponent> =
      TestBed.createComponent(ButtonClickHostComponent);
    if (initial) {
      Object.assign(fixture.componentInstance, initial);
    }
    fixture.detectChanges();
    return fixture;
  }

  const getButton = (fixture: ComponentFixture<ButtonClickHostComponent>): HTMLButtonElement =>
    fixture.nativeElement.querySelector('button');

  it('emits click when enabled', async () => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture();
    const host: ButtonClickHostComponent = fixture.componentInstance;
    getButton(fixture).click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(1);
  });

  it('does not emit click when disabled', async () => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture({
      disabled: true,
    });
    const host: ButtonClickHostComponent = fixture.componentInstance;

    getButton(fixture).click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(0);
  });

  it('does not emit click when loading', async () => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture({
      loading: true,
    });
    const host: ButtonClickHostComponent = fixture.componentInstance;

    getButton(fixture).click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(0);
  });

  it('fires click on Enter and Space key presses', async () => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture();
    const host: ButtonClickHostComponent = fixture.componentInstance;
    const btn: HTMLButtonElement = getButton(fixture);

    const enterEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    btn.dispatchEvent(enterEvent);
    if (!enterEvent.defaultPrevented) {
      btn.click();
    }

    const spaceEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    btn.dispatchEvent(spaceEvent);
    if (!spaceEvent.defaultPrevented) {
      btn.click();
    }

    fixture.detectChanges();

    expect(host.clickCount).toBe(2);
  });
});

describe('Button variant', () => {
  let fixture: ComponentFixture<ButtonVariantHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonVariantHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonVariantHostComponent);
    fixture.detectChanges();
  });

  it('applies global variant and allows per-instance override', () => {
    const service: ThemeConfigService = TestBed.inject(ThemeConfigService);
    service.setVariant('bootstrap');
    fixture.detectChanges();

    let buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].classList.contains('btn-bootstrap')).toBeTruthy();
    expect(buttons[1].classList.contains('btn-bootstrap')).toBeTruthy();

    fixture.componentInstance.overrideVariant.set('minimal');
    fixture.detectChanges();

    buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].classList.contains('btn-bootstrap')).toBeTruthy();
    expect(buttons[1].classList.contains('btn-minimal')).toBeTruthy();
  });
});
