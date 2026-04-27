import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginForm } from './login-form';
import type { LoginFormVariant, SocialProvider } from './login-form.types';

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [LoginForm],
  template: `
    <ui-lib-login-form
      [variant]="variant()"
      [showSocialLogin]="showSocialLogin()"
      [showRememberMe]="showRememberMe()"
      (login)="lastLogin = $event"
      (forgotPassword)="forgotCalled = true"
      (socialLogin)="lastSocial = $event"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoginFormHostComponent {
  public readonly variant: WritableSignal<LoginFormVariant> = signal<LoginFormVariant>('centered');
  public readonly showSocialLogin: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showRememberMe: WritableSignal<boolean> = signal<boolean>(false);

  public lastLogin: { email: string; password: string; remember: boolean } | null = null;
  public forgotCalled: boolean = false;
  public lastSocial: SocialProvider | null = null;
}

// ---------------------------------------------------------------------------
// Setup helper
// ---------------------------------------------------------------------------

function setup(
  overrides: Partial<{
    variant: LoginFormVariant;
    showSocialLogin: boolean;
    showRememberMe: boolean;
  }> = {}
): {
  fixture: ComponentFixture<LoginFormHostComponent>;
  host: LoginFormHostComponent;
  component: LoginForm;
} {
  TestBed.configureTestingModule({
    imports: [LoginFormHostComponent],
    providers: [provideZonelessChangeDetection()],
  });

  const fixture: ComponentFixture<LoginFormHostComponent> =
    TestBed.createComponent(LoginFormHostComponent);
  const host: LoginFormHostComponent = fixture.componentInstance;

  if (overrides.variant !== undefined) host.variant.set(overrides.variant);
  if (overrides.showSocialLogin !== undefined) host.showSocialLogin.set(overrides.showSocialLogin);
  if (overrides.showRememberMe !== undefined) host.showRememberMe.set(overrides.showRememberMe);

  fixture.detectChanges();

  const component: LoginForm = fixture.debugElement.query(By.directive(LoginForm))
    .componentInstance as LoginForm;

  return { fixture, host, component };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('LoginForm', (): void => {
  describe('creation', (): void => {
    it('creates successfully', (): void => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
  });

  describe('layoutClass', (): void => {
    (['centered', 'split', 'minimal'] as LoginFormVariant[]).forEach(
      (variant: LoginFormVariant): void => {
        it(`returns "login-${variant}" for variant "${variant}"`, (): void => {
          const { component } = setup({ variant });
          expect(component.layoutClass()).toBe(`login-${variant}`);
        });
      }
    );
  });

  describe('initial state', (): void => {
    it('email signal defaults to empty string', (): void => {
      const { component } = setup();
      expect(component.email()).toBe('');
    });

    it('password signal defaults to empty string', (): void => {
      const { component } = setup();
      expect(component.password()).toBe('');
    });

    it('remember signal defaults to true', (): void => {
      const { component } = setup();
      expect(component.remember()).toBe(true);
    });
  });

  describe('onSubmit', (): void => {
    it('emits login event with current email and password', (): void => {
      const { host, component } = setup();
      component.email.set('user@example.com');
      component.password.set('secret');
      component.remember.set(false);

      component.onSubmit();

      expect(host.lastLogin).toEqual({
        email: 'user@example.com',
        password: 'secret',
        remember: false,
      });
    });

    it('trims email whitespace before emitting', (): void => {
      const { host, component } = setup();
      component.email.set('  spaced@test.com  ');
      component.password.set('pw');
      component.remember.set(true);

      component.onSubmit();

      expect(host.lastLogin?.email).toBe('spaced@test.com');
    });

    it('includes remember=true when remember is set', (): void => {
      const { host, component } = setup();
      component.email.set('a@b.com');
      component.password.set('pw');
      component.remember.set(true);

      component.onSubmit();

      expect(host.lastLogin?.remember).toBe(true);
    });
  });

  describe('onForgot', (): void => {
    it('emits forgotPassword event', (): void => {
      const { host, component } = setup();
      component.onForgot();
      expect(host.forgotCalled).toBe(true);
    });
  });

  describe('onSocial', (): void => {
    const providers: SocialProvider[] = ['google', 'github', 'microsoft'];

    providers.forEach((provider: SocialProvider): void => {
      it(`emits socialLogin with provider "${provider}"`, (): void => {
        const { host, component } = setup();
        component.onSocial(provider);
        expect(host.lastSocial).toBe(provider);
      });
    });
  });

  describe('dynamic variant update', (): void => {
    it('updates layoutClass when variant input changes', (): void => {
      const { fixture, host, component } = setup({ variant: 'centered' });
      host.variant.set('split');
      fixture.detectChanges();
      expect(component.layoutClass()).toBe('login-split');
    });
  });
});
