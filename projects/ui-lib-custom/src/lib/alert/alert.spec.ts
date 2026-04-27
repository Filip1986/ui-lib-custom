import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Alert } from './alert';
import type { AlertSeverity, AlertVariant } from './alert.types';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { provideUiLibIcons } from '../icon/icon.providers';

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [Alert],
  template: `
    <ui-lib-alert
      [severity]="severity()"
      [variant]="variant()"
      [dismissible]="dismissible()"
      (dismissed)="dismissCount = dismissCount + 1"
    >
      Alert content
    </ui-lib-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AlertHostComponent {
  public readonly severity: WritableSignal<AlertSeverity> = signal<AlertSeverity>('info');
  public readonly variant: WritableSignal<AlertVariant | null> = signal<AlertVariant | null>(null);
  public readonly dismissible: WritableSignal<boolean> = signal<boolean>(false);

  public dismissCount: number = 0;
}

// ---------------------------------------------------------------------------
// Setup helper
// ---------------------------------------------------------------------------

function setup(
  overrides: Partial<{
    severity: AlertSeverity;
    variant: AlertVariant | null;
    dismissible: boolean;
  }> = {}
): {
  fixture: ComponentFixture<AlertHostComponent>;
  host: AlertHostComponent;
  component: Alert;
} {
  TestBed.configureTestingModule({
    imports: [AlertHostComponent],
    providers: [provideZonelessChangeDetection(), ...provideUiLibIcons()],
  });

  const fixture: ComponentFixture<AlertHostComponent> = TestBed.createComponent(AlertHostComponent);
  const host: AlertHostComponent = fixture.componentInstance;

  if (overrides.severity !== undefined) host.severity.set(overrides.severity);
  if (overrides.variant !== undefined) host.variant.set(overrides.variant);
  if (overrides.dismissible !== undefined) host.dismissible.set(overrides.dismissible);

  fixture.detectChanges();

  const component: Alert = fixture.debugElement.query(By.directive(Alert))
    .componentInstance as Alert;

  return { fixture, host, component };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Alert', (): void => {
  describe('creation', (): void => {
    it('creates successfully', (): void => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
  });

  describe('severities', (): void => {
    const severities: AlertSeverity[] = ['success', 'error', 'warning', 'info'];

    severities.forEach((severity: AlertSeverity): void => {
      it(`applies severity class for "${severity}"`, (): void => {
        const { component } = setup({ severity });
        expect(component.hostClasses()).toContain(`ui-lib-alert--${severity}`);
      });
    });

    it('statusIcon is "success" for success severity', (): void => {
      const { component } = setup({ severity: 'success' });
      expect(component.statusIcon()).toBe('success');
    });

    it('statusIcon is "error" for error severity', (): void => {
      const { component } = setup({ severity: 'error' });
      expect(component.statusIcon()).toBe('error');
    });

    it('statusIcon is "warning" for warning severity', (): void => {
      const { component } = setup({ severity: 'warning' });
      expect(component.statusIcon()).toBe('warning');
    });

    it('statusIcon falls back to "info" for unknown severity', (): void => {
      const { component } = setup({ severity: 'unknown' as AlertSeverity });
      expect(component.statusIcon()).toBe('info');
    });
  });

  describe('effectiveVariant', (): void => {
    it('uses explicit variant input when provided', (): void => {
      const { component } = setup({ variant: 'bootstrap' });
      expect(component.effectiveVariant()).toBe('bootstrap');
    });

    it('uses global theme variant when no variant input provided', (): void => {
      const { component } = setup({ variant: null });
      const service: ThemeConfigService = TestBed.inject(ThemeConfigService);
      service.setVariant('minimal');
      expect(component.effectiveVariant()).toBe('minimal');
    });
  });

  describe('hostClasses', (): void => {
    it('contains base class', (): void => {
      const { component } = setup();
      expect(component.hostClasses()).toContain('ui-lib-alert');
    });

    (['material', 'bootstrap', 'minimal'] as AlertVariant[]).forEach(
      (variant: AlertVariant): void => {
        it(`includes variant class for "${variant}"`, (): void => {
          const { component } = setup({ variant });
          expect(component.hostClasses()).toContain(`ui-lib-alert--${variant}`);
        });
      }
    );
  });

  describe('global variant fallback', (): void => {
    it('uses global variant when no variant input provided', (): void => {
      const { component } = setup({ variant: null });
      const service: ThemeConfigService = TestBed.inject(ThemeConfigService);
      service.setVariant('minimal');
      expect(component.hostClasses()).toContain('ui-lib-alert--minimal');
    });
  });

  describe('dismissible', (): void => {
    it('does not render close button when dismissible is false', (): void => {
      const { fixture } = setup({ dismissible: false });
      const closeBtn: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-alert__close'
      );
      expect(closeBtn).toBeNull();
    });

    it('renders close button when dismissible is true', (): void => {
      const { fixture } = setup({ dismissible: true });
      const closeBtn: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-alert__close'
      );
      expect(closeBtn).toBeTruthy();
    });

    it('close button has role=button and aria-label', (): void => {
      const { fixture } = setup({ dismissible: true });
      const closeBtn: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-alert__close'
      );
      expect(closeBtn?.getAttribute('role')).toBe('button');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Dismiss alert');
    });

    it('emits dismissed event when onDismiss is called', (): void => {
      const { host, component } = setup({ dismissible: true });
      component.onDismiss();
      expect(host.dismissCount).toBe(1);
    });
  });

  describe('legacy direct component test', (): void => {
    let fixture: ComponentFixture<Alert>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [Alert],
        providers: [...provideUiLibIcons()],
      }).compileComponents();

      fixture = TestBed.createComponent(Alert);
      fixture.detectChanges();
    });

    it('creates', (): void => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('applies dark theme variables', (): void => {
      const root: HTMLElement = document.documentElement;
      root.setAttribute('data-theme', 'light');
      root.style.setProperty('--uilib-alert-bg', 'light-bg');
      const light: string = getComputedStyle(root).getPropertyValue('--uilib-alert-bg').trim();

      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--uilib-alert-bg', 'dark-bg');
      const dark: string = getComputedStyle(root).getPropertyValue('--uilib-alert-bg').trim();

      expect(dark).not.toBe(light);
      root.removeAttribute('data-theme');
    });

    it('uses global variant when no variant input provided', (): void => {
      const service: ThemeConfigService = TestBed.inject(ThemeConfigService);
      service.setVariant('minimal');
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.className).toContain('ui-lib-alert--minimal');
    });

    it('adds accessible dismiss control when dismissible', (): void => {
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const closeIcon: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-alert__close'
      );
      expect(closeIcon).toBeTruthy();
      expect(closeIcon?.getAttribute('role')).toBe('button');
      expect(closeIcon?.getAttribute('aria-label')).toBe('Dismiss alert');
    });
  });
});
