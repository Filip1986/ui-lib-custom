import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideAudioWaveform } from '@ng-icons/lucide';
import { bootstrapArrowRepeat } from '@ng-icons/bootstrap-icons';
import { provideUiLibIcons } from 'ui-lib-custom/icon';
import { By } from '@angular/platform-browser';

import { Button } from './button';
import type { ButtonSeverity, ButtonVariant, ButtonSize } from './button';
import { SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';
import { BUTTON_SEVERITIES } from './button.constants';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonClickHostComponent {
  public disabled: boolean = false;
  public loading: boolean = false;
  public clickCount: number = 0;

  public onClick(): void {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonVariantHostComponent {
  public overrideVariant: WritableSignal<ButtonVariant | null> = signal<ButtonVariant | null>(null);
}

describe('Button', (): void => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Button, Icon, Badge],
      providers: [provideIcons({ lucideAudioWaveform, bootstrapArrowRepeat })],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function rootEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  const getButton: () => HTMLButtonElement = (): HTMLButtonElement =>
    rootEl().querySelector('button') as HTMLButtonElement;
  const getBadge: () => HTMLElement | null = (): HTMLElement | null =>
    rootEl().querySelector('ui-lib-badge') as HTMLElement | null;

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('applies classes from inputs', (): void => {
    fixture.componentRef.setInput('variant', 'bootstrap');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('severity', 'danger');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    expect(btn.className).toContain('ui-lib-button--bootstrap');
    expect(btn.className).toContain('ui-lib-button--size-large');
    expect(btn.className).toContain('ui-lib-button--danger');
    expect(btn.className).toContain('ui-lib-button--appearance-outline');
  });

  it('disables and sets aria state when disabled or loading', (): void => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let btn: HTMLButtonElement = getButton();
    expect(btn.disabled).toBeTruthy();
    expect(btn.getAttribute('aria-disabled')).toBe('true');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    btn = getButton();
    expect(btn.disabled).toBeTruthy();
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('renders spinner when loading with custom icon', (): void => {
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingIcon', 'lucideAudioWaveform');
    fixture.detectChanges();

    const loadingIconEl: DebugElement | null = fixture.debugElement.query(
      By.css('ui-lib-icon.ui-lib-button__icon--loading')
    );
    expect(loadingIconEl).toBeTruthy();
    const iconComponent: Icon = loadingIconEl.componentInstance as Icon;
    const resolvedName: () => string = iconComponent.resolvedName as () => string;
    expect(resolvedName()).toBe('lucideAudioWaveform');
  });

  describe('Modifier inputs', (): void => {
    it('applies raised class when raised is true', (): void => {
      fixture.componentRef.setInput('raised', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('ui-lib-button--raised')).toBeTruthy();
    });

    it('applies pill class when pill is true', (): void => {
      fixture.componentRef.setInput('pill', true);
      fixture.detectChanges();

      expect(getButton().classList.contains('ui-lib-button--pill')).toBeTruthy();
    });

    it('applies raised and pill together', (): void => {
      fixture.componentRef.setInput('raised', true);
      fixture.componentRef.setInput('pill', true);
      fixture.detectChanges();

      const btn: HTMLButtonElement = getButton();
      expect(btn.classList.contains('ui-lib-button--raised')).toBeTruthy();
      expect(btn.classList.contains('ui-lib-button--pill')).toBeTruthy();
    });
  });

  describe('Badge integration', (): void => {
    it('renders badge with string content', (): void => {
      fixture.componentRef.setInput('badge', '3');
      fixture.detectChanges();

      expect(getButton().classList.contains('ui-lib-button--has-badge')).toBeTruthy();
      const badgeEl: HTMLElement | null = getBadge();
      expect(badgeEl).toBeTruthy();
      const badgeText: string | null = badgeEl?.textContent ?? null;
      expect(badgeText).toBeTruthy();
      expect((badgeText as string).trim()).toBe('3');
    });

    it('renders badge with number content', (): void => {
      fixture.componentRef.setInput('badge', 7);
      fixture.detectChanges();

      const badgeEl: HTMLElement | null = getBadge();
      expect(badgeEl).toBeTruthy();
      const badgeText: string | null = badgeEl?.textContent ?? null;
      expect(badgeText).toBeTruthy();
      expect((badgeText as string).trim()).toBe('7');
    });

    it('applies badge severity class', (): void => {
      fixture.componentRef.setInput('badge', '1');
      fixture.componentRef.setInput('badgeSeverity', 'info');
      fixture.detectChanges();

      const badgeEl: HTMLElement | null = getBadge();
      expect(badgeEl).toBeTruthy();
      expect((badgeEl as HTMLElement).classList.contains('ui-lib-badge--color-info')).toBeTruthy();
    });
  });

  describe('Default classes', (): void => {
    it('keeps default classes for variant, size, severity, and appearance', (): void => {
      fixture.detectChanges();

      const btn: HTMLButtonElement = getButton();
      expect(btn.className).toContain('ui-lib-button--material');
      expect(btn.className).toContain('ui-lib-button--size-medium');
      expect(btn.className).toContain('ui-lib-button--primary');
      expect(btn.className).toContain('ui-lib-button--appearance-solid');
    });
  });

  describe('Accessibility', (): void => {
    it('sets aria-disabled and aria-busy appropriately', (): void => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      let btn: HTMLButtonElement = getButton();
      expect(btn.getAttribute('aria-disabled')).toBe('true');

      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      btn = getButton();
      expect(btn.getAttribute('aria-busy')).toBe('true');
    });

    it('renders focusable button with type attribute', (): void => {
      fixture.detectChanges();
      const btn: HTMLButtonElement = getButton();
      expect(btn.getAttribute('type')).toBe('button');
      expect(btn.tabIndex).toBe(0);
    });

    it('supports role, tabindex, and aria-pressed/checked overrides', (): void => {
      fixture.componentRef.setInput('role', 'radio');
      fixture.componentRef.setInput('tabIndex', -1);
      fixture.componentRef.setInput('ariaPressed', true);
      fixture.componentRef.setInput('ariaChecked', true);
      fixture.detectChanges();

      const btn: HTMLButtonElement = getButton();
      expect(btn.getAttribute('role')).toBe('radio');
      expect(btn.getAttribute('tabindex')).toBe('-1');
      expect(btn.getAttribute('aria-pressed')).toBe('true');
      expect(btn.getAttribute('aria-checked')).toBe('true');
    });

    it('sets aria-label during loading', (): void => {
      fixture.componentRef.setInput('loading', true);
      fixture.componentRef.setInput('ariaLabel', 'Saving changes');
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toBe('Saving changes');
    });

    it('sets a fallback aria-label for icon-only buttons', (): void => {
      fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
      fixture.componentRef.setInput('iconOnly', true);
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toBe('Button');
    });
  });

  it('applies each variant class', (): void => {
    const variants: ButtonVariant[] = [...SHARED_VARIANT_OPTIONS];

    variants.forEach((variant: ButtonVariant): void => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(getButton().classList.contains(`ui-lib-button--${variant}`)).toBeTruthy();
    });
  });

  it('applies each severity class', (): void => {
    const severities: ButtonSeverity[] = [...BUTTON_SEVERITIES];

    severities.forEach((severity: ButtonSeverity): void => {
      fixture.componentRef.setInput('severity', severity);
      fixture.detectChanges();

      const expected: string =
        severity === 'warn' ? 'ui-lib-button--warning' : `ui-lib-button--${severity}`;
      expect(getButton().classList.contains(expected)).toBeTruthy();
    });
  });

  it('applies each size class', (): void => {
    const sizes: Array<[ButtonSize, string]> = [
      ['sm', 'small'],
      ['md', 'medium'],
      ['lg', 'large'],
    ];

    sizes.forEach(([size, cssName]: [ButtonSize, string]): void => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();

      expect(getButton().classList.contains(`ui-lib-button--size-${cssName}`)).toBeTruthy();
    });
  });

  it('sets aria-disabled and blocks pointer events when disabled', (): void => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    const style: CSSStyleDeclaration = getComputedStyle(btn);

    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn.classList.contains('ui-lib-button--disabled')).toBeTruthy();
    expect(style.pointerEvents).toBe('none');
  });

  it('shows loading spinner and disables interaction when loading', (): void => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    const loadingIconEl: DebugElement | null = fixture.debugElement.query(
      By.css('ui-lib-icon.ui-lib-button__icon--loading')
    );

    expect(loadingIconEl).toBeTruthy();
    expect(btn.disabled).toBeTruthy();
    expect(btn.classList.contains('ui-lib-button--loading')).toBeTruthy();
  });

  it('renders icon on the left and right positions', (): void => {
    fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
    fixture.componentRef.setInput('iconPosition', 'left');
    fixture.detectChanges();

    const leftIcon: HTMLElement | null = rootEl().querySelector(
      'ui-lib-icon.ui-lib-button__icon--start'
    );
    const leftEndIcon: HTMLElement | null = rootEl().querySelector(
      'ui-lib-icon.ui-lib-button__icon--end'
    );
    expect(leftIcon).toBeTruthy();
    expect(leftEndIcon).toBeNull();

    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();

    const rightIcon: HTMLElement | null = rootEl().querySelector(
      'ui-lib-icon.ui-lib-button__icon--end'
    );
    const rightStartIcon: HTMLElement | null = rootEl().querySelector(
      'ui-lib-icon.ui-lib-button__icon--start'
    );
    expect(rightIcon).toBeTruthy();
    expect(rightStartIcon).toBeNull();
  });

  it('applies full width class when fullWidth is true', (): void => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    expect(getButton().classList.contains('ui-lib-button--full-width')).toBeTruthy();
  });

  it('renders focus ring on focus-visible', (): void => {
    const button: HTMLButtonElement = getButton();
    const tabEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    document.body.dispatchEvent(tabEvent);

    button.focus();
    button.style.outline = '2px solid currentColor';
    fixture.detectChanges();

    expect(button.style.outline).toBe('2px solid currentColor');
  });

  it('normalizes warn severity to warning', (): void => {
    fixture.componentRef.setInput('severity', 'warn');
    fixture.detectChanges();

    expect(getButton().classList.contains('ui-lib-button--warning')).toBeTruthy();
  });

  it('adds vertical class for top or bottom icon positions', (): void => {
    fixture.componentRef.setInput('icon', 'lucideAudioWaveform');
    fixture.componentRef.setInput('iconPosition', 'top');
    fixture.detectChanges();

    expect(getButton().classList.contains('ui-lib-button--vertical')).toBeTruthy();

    fixture.componentRef.setInput('iconPosition', 'bottom');
    fixture.detectChanges();

    expect(getButton().classList.contains('ui-lib-button--vertical')).toBeTruthy();
  });

  it('maps badge severity help to info badge color', (): void => {
    fixture.componentRef.setInput('badge', '1');
    fixture.componentRef.setInput('badgeSeverity', 'help');
    fixture.detectChanges();

    const badgeHelp: HTMLElement | null = getBadge();
    expect(badgeHelp).toBeTruthy();
    expect((badgeHelp as HTMLElement).classList.contains('ui-lib-badge--color-info')).toBeTruthy();

    fixture.componentRef.setInput('badgeSeverity', 'contrast');
    fixture.detectChanges();

    const badgeContrast: HTMLElement | null = getBadge();
    expect(badgeContrast).toBeTruthy();
    expect(
      (badgeContrast as HTMLElement).classList.contains('ui-lib-badge--color-neutral')
    ).toBeTruthy();
  });

  it('applies shadow CSS variables when shadow is set', (): void => {
    fixture.componentRef.setInput('shadow', '0 4px 8px rgba(0,0,0,0.2)');
    fixture.detectChanges();

    const btn: HTMLButtonElement = getButton();
    const shadowValue: string = btn.style.getPropertyValue('--uilib-button-shadow');
    const shadowHoverValue: string = btn.style.getPropertyValue('--uilib-button-shadow-hover');

    expect(shadowValue).toContain('0 4px 8px');
    expect(shadowHoverValue).toContain('0 4px 8px');
  });

  it('applies all new appearance values as CSS classes', (): void => {
    const newAppearances: string[] = [
      'soft',
      'glass',
      'glass-shadow',
      'gradient',
      'elevated',
      'neon',
      'flat',
      'link',
    ];

    newAppearances.forEach((appearance: string): void => {
      fixture.componentRef.setInput('appearance', appearance);
      fixture.detectChanges();

      expect(
        getButton().classList.contains(`ui-lib-button--appearance-${appearance}`)
      ).toBeTruthy();
    });
  });

  it('applies dark theme variables', (): void => {
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-button-primary-bg', 'light-bg');
    const light: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-button-primary-bg')
      .trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-button-primary-bg', 'dark-bg');
    const dark: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-button-primary-bg')
      .trim();

    expect(dark).not.toBe(light);
    scope.remove();
  });
});

describe('Button interactions', (): void => {
  async function createFixture(
    initial?: Partial<ButtonClickHostComponent>
  ): Promise<ComponentFixture<ButtonClickHostComponent>> {
    await TestBed.configureTestingModule({
      imports: [ButtonClickHostComponent],
      providers: [provideUiLibIcons()],
    }).compileComponents();

    const fixture: ComponentFixture<ButtonClickHostComponent> =
      TestBed.createComponent(ButtonClickHostComponent);
    if (initial) {
      Object.assign(fixture.componentInstance, initial);
    }
    fixture.detectChanges();
    return fixture;
  }

  const getButton: (fixture: ComponentFixture<ButtonClickHostComponent>) => HTMLButtonElement = (
    fixture: ComponentFixture<ButtonClickHostComponent>
  ): HTMLButtonElement =>
    (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement;

  it('emits click when enabled', async (): Promise<void> => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture();
    const host: ButtonClickHostComponent = fixture.componentInstance;
    getButton(fixture).click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(1);
  });

  it('does not emit click when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture({
      disabled: true,
    });
    const host: ButtonClickHostComponent = fixture.componentInstance;

    getButton(fixture).click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(0);
  });

  it('does not emit click when loading', async (): Promise<void> => {
    const fixture: ComponentFixture<ButtonClickHostComponent> = await createFixture({
      loading: true,
    });
    const host: ButtonClickHostComponent = fixture.componentInstance;

    getButton(fixture).click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(0);
  });

  it('fires click on Enter and Space key presses', async (): Promise<void> => {
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

describe('Button variant', (): void => {
  let fixture: ComponentFixture<ButtonVariantHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ButtonVariantHostComponent],
      providers: [provideUiLibIcons()],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonVariantHostComponent);
    fixture.detectChanges();
  });

  it('applies global variant and allows per-instance override', (): void => {
    const service: ThemeConfigService = TestBed.inject(ThemeConfigService);
    service.setVariant('bootstrap');
    fixture.detectChanges();

    const getVariantButtons: () => HTMLButtonElement[] = (): HTMLButtonElement[] =>
      Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll('button')
      ) as HTMLButtonElement[];

    const getRequiredVariantButton: (
      buttons: HTMLButtonElement[],
      index: number
    ) => HTMLButtonElement = (buttons: HTMLButtonElement[], index: number): HTMLButtonElement => {
      const button: HTMLButtonElement | undefined = buttons[index];
      if (!button) {
        throw new Error(`Expected button at index ${index}.`);
      }
      return button;
    };

    let buttons: HTMLButtonElement[] = getVariantButtons();
    expect(
      getRequiredVariantButton(buttons, 0).classList.contains('ui-lib-button--bootstrap')
    ).toBeTruthy();
    expect(
      getRequiredVariantButton(buttons, 1).classList.contains('ui-lib-button--bootstrap')
    ).toBeTruthy();

    fixture.componentInstance.overrideVariant.set('minimal');
    fixture.detectChanges();

    buttons = getVariantButtons();
    expect(
      getRequiredVariantButton(buttons, 0).classList.contains('ui-lib-button--bootstrap')
    ).toBeTruthy();
    expect(
      getRequiredVariantButton(buttons, 1).classList.contains('ui-lib-button--minimal')
    ).toBeTruthy();
  });
});
